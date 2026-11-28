import { createHash } from "node:crypto";
import { lstatSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { ensureCliConfigWriteAllowed } from "@/shared/services/cliRuntime";
import { isDeepStrictEqual } from "node:util";
import { applyEdits, modify } from "jsonc-parser";
import { parse } from "smol-toml";
import { z } from "zod";

import { readPrivateConfigFile, writePrivateConfigFile } from "./privateConfigFile";

export const modelConfigClient = z.enum(["kimi-code", "codebuddy"]);
const modelId = z
  .string()
  .min(1)
  .max(160)
  .regex(/^[\w .:/@+-]+$/u);
const modelList = z.array(modelId).max(256);
const revision = z.string().regex(/^[0-9a-f]{64}$/);
const base = { client: modelConfigClient, revision };
export const modelConfigChange = z.discriminatedUnion("action", [
  z.strictObject({ ...base, action: z.literal("save"), models: modelList }),
  z.strictObject({ ...base, action: z.literal("restore") }),
]);
const fileLimit = 1024 * 1024;
const backupsSchema = z.array(z.strictObject({ result: revision, before: z.string() })).max(2);
const mapping = z.record(z.string(), z.unknown());
type Client = z.infer<typeof modelConfigClient>;

export class ModelConfigError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
  }
}

function read(file: string, limit = fileLimit): string | undefined {
  for (let dir = path.dirname(file); dir !== path.dirname(dir); dir = path.dirname(dir)) {
    const item = lstatSync(dir, { throwIfNoEntry: false });
    if (item && !item.isDirectory())
      throw new ModelConfigError("Linked directories are unsupported", 422);
  }
  const item = lstatSync(file, { throwIfNoEntry: false });
  if (!item) return;
  if (!item.isFile() || item.size > limit)
    throw new ModelConfigError("Invalid model config file", 422);
  const content = readPrivateConfigFile(file);
  if (content.includes("\uFFFD") || Buffer.byteLength(content) > limit) {
    throw new ModelConfigError("Unsupported config encoding or size", 422);
  }
  return content;
}

function hash(source: string): string {
  return createHash("sha256").update(source).digest("hex");
}

function load(client: Client) {
  const kimi = client === "kimi-code";
  const file = path.resolve(
    kimi
      ? path.join(
          process.env.KIMI_CODE_HOME || path.join(os.homedir(), ".kimi-code"),
          "config.toml"
        )
      : path.join(
          process.env.CODEBUDDY_CONFIG_DIR || path.join(os.homedir(), ".codebuddy"),
          "models.json"
        )
  );
  const source = read(file);
  if (source === undefined)
    throw new ModelConfigError("Start the selected client to create its config", 404);
  const data = mapping.parse(kimi ? parse(source) : JSON.parse(source));
  const models = kimi
    ? data.default_model === undefined
      ? []
      : [modelId.parse(data.default_model)]
    : modelList.parse(data.availableModels ?? []);
  const options = kimi
    ? Object.keys(mapping.parse(data.models ?? {}))
    : z
        .array(z.object({ id: modelId }))
        .parse(data.models ?? [])
        .map((item) => item.id);
  const backup = `${file}.omniroute-models-backup`;
  const old = read(backup, fileLimit * 12 + 2048);
  const sourceHash = hash(source);
  const last = old
    ? backupsSchema.parse(JSON.parse(old)).find((entry) => entry.result === sourceHash)
    : undefined;
  const view = {
    client,
    file: path.basename(file),
    models,
    options,
    revision: hash(file + sourceHash),
    canRestore: Boolean(last),
  };
  return { file, source, data, backup, last, view };
}

export function getModelConfig(client: Client) {
  return load(client).view;
}

function patchKimiDefaultModel(state: ReturnType<typeof load>, models: string[]) {
  if (models.length !== 1 || !state.view.options.includes(models[0])) {
    throw new ModelConfigError("Select a configured Kimi model", 422);
  }
  const value = JSON.stringify(models[0]);
  const line =
    /^(default_model\s*=\s*)(?:"(?:[^"\\\r\n]|\\.)*"|'[^'\r\n]*')([ \t]*(?:#[^\r\n]*)?)\r?$/m;
  if (state.data.default_model !== undefined && !line.test(state.source)) {
    throw new ModelConfigError("Unsupported default model syntax", 422);
  }
  const newline = state.source.includes("\r\n") ? "\r\n" : "\n";
  const result =
    state.data.default_model !== undefined
      ? state.source.replace(
          line,
          (whole, prefix, suffix) => prefix + value + suffix + (whole.endsWith("\r") ? "\r" : "")
        )
      : `default_model = ${value}${newline}${state.source}`;
  if (!isDeepStrictEqual({ ...parse(result) }, { ...state.data, default_model: models[0] })) {
    throw new ModelConfigError("Could not preserve the Kimi config", 422);
  }
  return result;
}

function patchCodeBuddyModels(state: ReturnType<typeof load>, nextModels: string[]) {
  const models = [...new Set(nextModels)];
  const result = applyEdits(
    state.source,
    modify(state.source, ["availableModels"], models, {
      formattingOptions: {
        insertSpaces: true,
        tabSize: 2,
        eol: state.source.includes("\r\n") ? "\r\n" : "\n",
      },
    })
  );
  if (!isDeepStrictEqual(JSON.parse(result), { ...state.data, availableModels: models })) {
    throw new ModelConfigError("Could not preserve the CodeBuddy config", 422);
  }
  return result;
}

export function updateModelConfig(input: z.infer<typeof modelConfigChange>) {
  const state = load(input.client);
  const writeGuard = ensureCliConfigWriteAllowed(state.file);
  if (writeGuard) throw new ModelConfigError(writeGuard, 403);
  if (input.revision !== state.view.revision)
    throw new ModelConfigError("The config changed. Refresh first", 409);
  let result: string;
  if (input.action === "restore") {
    if (!state.last) throw new ModelConfigError("No current backup is available", 409);
    result = state.last.before;
  } else {
    result =
      input.client === "kimi-code"
        ? patchKimiDefaultModel(state, input.models)
        : patchCodeBuddyModels(state, input.models);
  }
  if (result === state.source) return state.view;
  if (input.action === "save") {
    writePrivateConfigFile(
      state.backup,
      JSON.stringify([
        { result: hash(result), before: state.source },
        ...(state.last ? [state.last] : []),
      ])
    );
  }
  if (read(state.file) !== state.source)
    throw new ModelConfigError("The config changed. Refresh first", 409);
  writePrivateConfigFile(state.file, result);
  return getModelConfig(input.client);
}
