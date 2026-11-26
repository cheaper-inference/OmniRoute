import { createHash, randomBytes } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { z } from "zod";

import { resolveDataDir } from "@/lib/dataPaths";
import {
  ensureCliConfigWriteAllowed,
  getCodexClientConfigHome,
} from "@/shared/services/cliRuntime";

import { getHermesHome } from "./config-generator/hermesHome";
import { writePrivateConfigFile } from "./privateConfigFile";

export const MAX_CLIENT_INSTRUCTIONS_BYTES = 256 * 1024;
export const clientInstructionsId = z.enum(["codex", "hermes", "kimi-code", "codebuddy"]);
const revisionSchema = z.string().regex(/^[a-f0-9]{64}$/);
const contentSchema = z.string().max(MAX_CLIENT_INSTRUCTIONS_BYTES);
export const clientInstructionsUpdate = z.discriminatedUnion("action", [
  z.strictObject({
    action: z.literal("save"),
    client: clientInstructionsId,
    revision: revisionSchema,
    content: z.string(),
  }),
  z.strictObject({
    action: z.literal("restore"),
    client: clientInstructionsId,
    revision: revisionSchema,
  }),
]);
const undoEntry = z.strictObject({
  fingerprint: revisionSchema,
  revision: revisionSchema,
  undo: z.strictObject({ content: contentSchema.nullable() }).nullable(),
});
const undoJournal = z.array(undoEntry).min(1).max(2);
type Client = z.infer<typeof clientInstructionsId>;
const importedPrompts = z.object({
  source: z.literal("CC Switch"),
  version: z.literal(1),
  prompts: z
    .array(
      z.object({
        app_type: z.enum(["codex", "hermes", "kimi", "codebuddy"]),
        id: z.string().min(1),
        name: z.string().min(1).max(300),
        content: z.string().max(MAX_CLIENT_INSTRUCTIONS_BYTES),
      })
    )
    .max(100),
});

export class ClientInstructionsError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
  }
}

function clientFile(client: Client): string {
  switch (client) {
    case "codex":
      return path.join(getCodexClientConfigHome(), "AGENTS.md");
    case "hermes":
      return path.resolve(getHermesHome(), "SOUL.md");
    case "kimi-code":
      return path.resolve(
        process.env.KIMI_CODE_HOME?.trim() || path.join(os.homedir(), ".kimi-code"),
        "AGENTS.md"
      );
    case "codebuddy":
      return path.resolve(
        process.env.CODEBUDDY_CONFIG_DIR?.trim() || path.join(os.homedir(), ".codebuddy"),
        "CODEBUDDY.md"
      );
  }
}

function statIfPresent(file: string): fs.Stats | undefined {
  try {
    return fs.lstatSync(file);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
}

function checkPath(file: string): fs.Stats | undefined {
  const parent = path.dirname(file);
  const ancestors: string[] = [];
  for (
    let directory = parent;
    path.dirname(directory) !== directory;
    directory = path.dirname(directory)
  ) {
    ancestors.push(directory);
  }
  for (const directory of ancestors.reverse()) {
    const stat = statIfPresent(directory);
    if (!stat) return undefined;
    if (!stat.isDirectory() || stat.isSymbolicLink()) {
      throw new ClientInstructionsError(409, "Instructions path must use regular directories.");
    }
  }
  const stat = statIfPresent(file);
  if (stat && (!stat.isFile() || stat.isSymbolicLink() || stat.nlink !== 1)) {
    throw new ClientInstructionsError(
      409,
      "Instructions path must be a regular file without links."
    );
  }
  return stat;
}

function readText(file: string, limit: number): string | null {
  const existing = checkPath(file);
  if (!existing) return null;

  const fd = fs.openSync(
    file,
    fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW | fs.constants.O_NONBLOCK
  );
  try {
    const stat = fs.fstatSync(fd);
    if (
      !stat.isFile() ||
      stat.ino !== existing.ino ||
      stat.dev !== existing.dev ||
      stat.nlink !== 1
    ) {
      throw new ClientInstructionsError(
        409,
        "Instructions file changed while opening. Reload and retry."
      );
    }
    if (stat.size > limit) {
      throw new ClientInstructionsError(413, "Instructions file exceeds the size limit.");
    }

    const bytes = Buffer.alloc(limit + 1);
    let length = 0;
    while (length < bytes.length) {
      const count = fs.readSync(fd, bytes, length, bytes.length - length, null);
      if (count === 0) break;
      length += count;
    }
    if (length > limit) {
      throw new ClientInstructionsError(413, "Instructions file exceeds the size limit.");
    }
    try {
      return new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(
        bytes.subarray(0, length)
      );
    } catch {
      throw new ClientInstructionsError(422, "Instructions file must contain valid UTF-8 text.");
    }
  } finally {
    fs.closeSync(fd);
  }
}

function fingerprintOf(file: string, content: string | null): string {
  return createHash("sha256")
    .update(JSON.stringify([file, content]))
    .digest("hex");
}

function readState(client: Client) {
  const file = clientFile(client);
  const libraryDir = path.resolve(resolveDataDir(), "client-instructions");
  const journalPath = path.join(libraryDir, `${client}.json`);
  const library = readText(path.join(libraryDir, "library.json"), 1024 * 1024);
  const variants =
    library === null
      ? []
      : importedPrompts
          .parse(JSON.parse(library))
          .prompts.filter(({ app_type }) => app_type === (client === "kimi-code" ? "kimi" : client))
          .map(({ id, name, content }) => ({ id, name, content }));
  const content = readText(file, MAX_CLIENT_INSTRUCTIONS_BYTES);
  const fingerprint = fingerprintOf(file, content);
  // JSON can escape each byte into six characters. The journal retains two entries.
  const stored = readText(journalPath, MAX_CLIENT_INSTRUCTIONS_BYTES * 12 + 512);
  const active =
    stored === null
      ? undefined
      : undoJournal.parse(JSON.parse(stored)).find((entry) => entry.fingerprint === fingerprint);
  return {
    file,
    journalPath,
    content,
    fingerprint,
    revision: active?.revision ?? fingerprint,
    active,
    variants,
  };
}

function snapshot(client: Client, state: ReturnType<typeof readState>) {
  return {
    client,
    file: path.basename(state.file),
    exists: state.content !== null,
    content: state.content ?? "",
    revision: state.revision,
    canRestore: !!state.active?.undo,
    variants: state.variants,
  };
}

export function getClientInstructions(client: Client) {
  return snapshot(client, readState(client));
}

function validateContent(content: string) {
  const bytes = Buffer.from(content, "utf8");
  if (bytes.length > MAX_CLIENT_INSTRUCTIONS_BYTES) {
    throw new ClientInstructionsError(413, "Instructions file exceeds the size limit.");
  }
  if (bytes.toString("utf8") !== content) {
    throw new ClientInstructionsError(422, "Instructions must contain valid UTF-8 text.");
  }
}

export function updateClientInstructions(input: z.infer<typeof clientInstructionsUpdate>) {
  // Synchronous, so one server process cannot interleave its own mutations.
  const writeGuard = ensureCliConfigWriteAllowed(clientFile(input.client));
  if (writeGuard) throw new ClientInstructionsError(403, writeGuard);
  const state = readState(input.client);
  const conflict = () =>
    new ClientInstructionsError(409, "Instructions changed. Reload and retry.");
  if (input.revision !== state.revision) throw conflict();

  let content: string | null;
  if (input.action === "save") {
    content = input.content;
    validateContent(content);
    if (content === state.content) return snapshot(input.client, state);
  } else {
    if (!state.active?.undo) {
      throw new ClientInstructionsError(409, "No previous instructions are available to restore.");
    }
    content = state.active.undo.content;
  }

  const revision = randomBytes(32).toString("hex");
  const active = {
    revision,
    fingerprint: fingerprintOf(state.file, content),
    undo: input.action === "save" ? { content: state.content } : null,
  };
  // Keep the prior undo available if an instruction write fails after staging.
  checkPath(state.journalPath);
  writePrivateConfigFile(
    state.journalPath,
    JSON.stringify(state.active ? [active, state.active] : [active])
  );
  if (
    fingerprintOf(state.file, readText(state.file, MAX_CLIENT_INSTRUCTIONS_BYTES)) !==
    state.fingerprint
  ) {
    throw conflict();
  }

  // shortcut: the final compare and replacement cannot coordinate with external editors.
  if (content === null) fs.unlinkSync(state.file);
  else writePrivateConfigFile(state.file, content);
  return snapshot(input.client, { ...state, content, revision, active });
}
