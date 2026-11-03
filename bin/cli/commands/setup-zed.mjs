/**
 * omniroute setup-zed — point Zed's built-in agent at OmniRoute.
 *
 * Writes `language_models.openai_compatible.omniroute` into Zed's settings.json
 * (`$XDG_CONFIG_HOME/zed` or `~/.config/zed`; `%APPDATA%\Zed` on Windows) with
 * `api_url` (WITH /v1) and `available_models` pulled from /v1/models: combos
 * first, chat models with tool support only, capped at 25.
 *
 * The API key is never written. settings.json is plaintext, and Zed reads the
 * key from the env var derived from the provider id: `omniroute` →
 * `OMNIROUTE_API_KEY`. The file is JSONC, so it is edited in place with
 * jsonc-parser: comments survive, and a file that fails to parse is left alone.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import os from "node:os";
import { applyEdits, modify, parse, printParseErrorCode, stripComments } from "jsonc-parser";
import { printHeading, printInfo, printSuccess, printError } from "../io.mjs";
import { guardHostConfigTarget } from "../utils/config-home-guard.mjs";
import { resolveCrushTarget } from "./setup-crush.mjs";

export const ZED_PROVIDER_ID = "omniroute";
export const ZED_MODEL_CAP = 25;
export const ZED_DEFAULT_CONTEXT = 200000;

const PROVIDER_PATH = ["language_models", "openai_compatible", ZED_PROVIDER_ID];
const JSON_FORMATTING_OPTIONS = { insertSpaces: true, tabSize: 2 };

/** Zed's user settings file for this platform. */
export function resolveZedSettingsPath({
  env = process.env,
  platform = process.platform,
  homedir = os.homedir(),
} = {}) {
  if (platform === "win32") {
    return join(env.APPDATA || join(homedir, "AppData", "Roaming"), "Zed", "settings.json");
  }
  return join(env.XDG_CONFIG_HOME || join(homedir, ".config"), "zed", "settings.json");
}

function isAgentModel(m) {
  if (!m || typeof m.id !== "string" || !m.id) return false;
  // Non-chat endpoints (web search, TTS, embeddings, images, ...) are useless to an agent.
  if (m.kind) return false;
  if (typeof m.type === "string" && m.type !== "chat") return false;
  const caps = m.capabilities || {};
  return caps.tool_calling !== false && caps.tools !== false;
}

/** Combos first, then the other tool-capable chat models; capped at ZED_MODEL_CAP. */
export function pickZedModels(models) {
  const usable = (Array.isArray(models) ? models : []).filter(isAgentModel);
  const combos = usable.filter((m) => m.owned_by === "combo");
  const rest = usable.filter((m) => m.owned_by !== "combo");
  return [...combos, ...rest].slice(0, ZED_MODEL_CAP);
}

/** One `available_models` entry in Zed's openai_compatible schema. */
export function zedModelEntry(m) {
  const entry = {
    name: m.id,
    display_name: m.id,
    max_tokens: m.context_length || ZED_DEFAULT_CONTEXT,
  };
  const maxOutput = m.max_output_tokens || m.max_completion_tokens;
  if (maxOutput) entry.max_output_tokens = maxOutput;
  return entry;
}

/** The provider block. Deliberately has no api_key field. */
export function buildZedProvider(models, baseUrl) {
  return { api_url: baseUrl, available_models: pickZedModels(models).map(zedModelEntry) };
}

/** Parse settings.json (JSONC). Throws on anything that is not an object. */
export function parseZedSettings(text) {
  if (!stripComments(String(text || "")).trim()) return {};
  const errors = [];
  const value = parse(text, errors, { allowTrailingComma: true, disallowComments: false });
  if (errors.length > 0 || (value !== undefined && (!value || typeof value !== "object"))) {
    const details = errors
      .map((e) => `${printParseErrorCode(e.error)} at offset ${e.offset}`)
      .join(", ");
    throw new Error(`Zed settings.json is not a valid JSON object${details ? `: ${details}` : ""}`);
  }
  if (Array.isArray(value))
    throw new Error("Zed settings.json must be a JSON object, not an array");
  return value || {};
}

function finish(text) {
  return text.endsWith("\n") ? text : `${text}\n`;
}

function setPath(text, path, value) {
  return applyEdits(
    text,
    modify(text, path, value, { formattingOptions: JSON_FORMATTING_OPTIONS })
  );
}

/** Add/replace our provider in the settings text, keeping everything else (comments too). */
export function mergeZedSettings(text, provider) {
  parseZedSettings(text);
  const base = stripComments(String(text || "")).trim() ? text : "{}";
  return finish(setPath(base, PROVIDER_PATH, provider));
}

/** Remove only our provider; drop `openai_compatible` / `language_models` once empty. */
export function removeZedProvider(text) {
  const cfg = parseZedSettings(text);
  if (!cfg.language_models?.openai_compatible?.[ZED_PROVIDER_ID]) return finish(text);
  let out = setPath(text, PROVIDER_PATH, undefined);
  const lm = parseZedSettings(out).language_models;
  if (lm?.openai_compatible && Object.keys(lm.openai_compatible).length === 0) {
    out = setPath(out, ["language_models", "openai_compatible"], undefined);
  }
  const lmAfter = parseZedSettings(out).language_models;
  if (lmAfter && typeof lmAfter === "object" && Object.keys(lmAfter).length === 0) {
    out = setPath(out, ["language_models"], undefined);
  }
  return finish(out);
}

async function fetchModels(baseUrl, apiKey) {
  const headers = { "Content-Type": "application/json" };
  if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;
  const res = await fetch(`${baseUrl}/models`, { headers, signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const body = await res.json();
  const list = Array.isArray(body) ? body : (body.data ?? body.models ?? []);
  return list.map((m) => (typeof m === "string" ? { id: m } : m)).filter(Boolean);
}

function readSettings(configPath) {
  return existsSync(configPath) ? readFileSync(configPath, "utf8") : "";
}

export async function runSetupZedCommand(opts = {}) {
  const { baseUrl, apiKey } = resolveCrushTarget(opts);
  const dryRun = Boolean(opts.dryRun ?? opts["dry-run"]);
  const reset = Boolean(opts.reset);
  const only = opts.only
    ? String(opts.only)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : null;
  const configPath = opts.configPath ?? opts["config-path"] ?? resolveZedSettingsPath();

  const guard = await guardHostConfigTarget(configPath, {
    toolLabel: "Zed",
    hostCommand: "omniroute setup-zed",
    allowContainerWrite: Boolean(opts.allowContainerWrite ?? opts["allow-container-write"]),
    dryRun,
  });
  if (guard !== 0) return guard;

  printHeading("OmniRoute → Zed (openai_compatible)");
  const current = readSettings(configPath);

  let out;
  let summary;
  try {
    if (reset) {
      out = removeZedProvider(current);
      summary = `Removed language_models.openai_compatible.${ZED_PROVIDER_ID} from ${configPath}`;
    } else {
      parseZedSettings(current);
      printInfo(`api_url: ${baseUrl}`);
      let models;
      try {
        models = await fetchModels(baseUrl, apiKey);
      } catch (e) {
        printError(`Could not fetch models: ${e.message}`);
        printInfo("Make sure OmniRoute is running and --remote/--api-key are correct.");
        return 1;
      }
      if (only) models = models.filter((m) => only.some((f) => String(m.id).includes(f)));
      const provider = buildZedProvider(models, baseUrl);
      if (!provider.available_models.length) {
        printError("No tool-capable chat models found (try --only or check the server).");
        return 1;
      }
      out = mergeZedSettings(current, provider);
      summary = `Wrote ${configPath} (${provider.available_models.length} models under language_models.openai_compatible.${ZED_PROVIDER_ID})`;
    }
  } catch (e) {
    printError(`${e.message} — fix ${configPath} first; nothing was written.`);
    return 1;
  }

  if (dryRun) {
    console.log("\n" + (out.length > 3500 ? out.slice(0, 3500) + "\n… (truncated)" : out));
    printInfo(`[dry-run] ${summary.replace(/^(Wrote|Removed)/, "Would update")}`);
    return 0;
  }
  if (reset && !current) {
    printInfo(`Nothing to remove: ${configPath} does not exist.`);
    return 0;
  }
  mkdirSync(dirname(configPath), { recursive: true });
  writeFileSync(configPath, out, "utf8");
  printSuccess(summary);
  if (!reset) {
    printInfo("Zed reads the key from the environment (it is never written to settings.json):");
    printInfo("  export OMNIROUTE_API_KEY=...");
    printInfo("Then start Zed from that shell (e.g. `zed .`) and pick a model in the Agent Panel.");
  }
  return 0;
}

export function registerSetupZed(program) {
  program
    .command("setup-zed")
    .description("Add OmniRoute as an OpenAI-compatible provider in Zed's settings.json")
    .option("--port <port>", "Local OmniRoute port (ignored when --remote is set)", "20128")
    .option("--remote <url>", "Remote OmniRoute URL, e.g. http://192.168.0.15:20128")
    .option("--api-key <key>", "OmniRoute API key used to list models (never written to disk)")
    .option("--only <patterns>", "Comma-separated substrings — keep only matching model IDs")
    .option("--config-path <path>", "settings.json path (default: ~/.config/zed/settings.json)")
    .option("--reset", "Remove the OmniRoute provider from settings.json")
    .option("--dry-run", "Print what would be written without touching the filesystem")
    .option(
      "--allow-container-write",
      "Write even when the target is inside a container and not mounted from the host"
    )
    .action(async (opts) => {
      const code = await runSetupZedCommand(opts);
      if (code !== 0) process.exit(code);
    });
}
