/**
 * Read a CLI tool's own config file so a settings writer can merge into it and
 * write it back — without ever mistaking an unreadable file for an empty one.
 *
 * The settings writers used to do:
 *
 *     let data = {};
 *     try { data = JSON.parse(await fs.readFile(file, "utf-8")); } catch {}
 *     data.someKey = ours;
 *     await fs.writeFile(file, JSON.stringify(data));
 *
 * A malformed file, a permission error or a directory where a file was expected
 * all looked like "absent", so the user's file was replaced by OmniRoute's few
 * keys (for `~/.codex/auth.json` that drops the ChatGPT OAuth tokens; for a
 * `models.yml` it drops every other provider) and the route still answered
 * `success: true`.
 *
 * `readExistingConfig` returns `null` ONLY when the file does not exist — the
 * legitimate "start fresh" case. A read error is re-thrown as-is; a file that
 * reads but does not parse (or parses into the wrong shape) throws
 * `ConfigClobberRefusedError`, which `configClobberRefusalResponse` turns into
 * a 409 that names the file the user has to fix.
 *
 * Do NOT use this on GET/status paths — those intentionally tolerate a broken
 * file (see `readJsoncConfig` in `./jsoncConfig.ts`).
 */
import fs from "fs/promises";
import os from "os";
import path from "path";
import { NextResponse } from "next/server";
import { load as yamlLoad } from "js-yaml";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const CONFIG_UNPARSEABLE_CODE = "config_unparseable";

/** `~/.codex/auth.json` for files under the home directory, the basename otherwise. */
function displayConfigPath(filePath: string): string {
  const home = os.homedir();
  const relative = home ? path.relative(home, filePath) : "";
  if (relative && !relative.startsWith("..") && !path.isAbsolute(relative)) {
    return `~/${relative.split(path.sep).join("/")}`;
  }
  return path.basename(filePath);
}

export class ConfigClobberRefusedError extends Error {
  readonly filePath: string;

  constructor(filePath: string, options?: { cause?: unknown }) {
    super(
      `${displayConfigPath(filePath)} exists but could not be parsed; refusing to overwrite it. ` +
        "Fix or move the file, then apply again.",
      options
    );
    this.name = "ConfigClobberRefusedError";
    this.filePath = filePath;
  }
}

/**
 * Returns the parsed contents, or `null` when the file does not exist.
 * Throws the original error for any other read failure (EACCES, EISDIR, ...)
 * and `ConfigClobberRefusedError` when `parse` throws.
 */
export async function readExistingConfig<T>(
  filePath: string,
  parse: (raw: string) => T
): Promise<T | null> {
  let raw: string;
  try {
    raw = await fs.readFile(filePath, "utf-8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") return null;
    throw error;
  }

  try {
    return parse(raw);
  } catch (error) {
    throw new ConfigClobberRefusedError(filePath, { cause: error });
  }
}

function assertPlainObject(value: unknown, format: string): Record<string, any> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError(`expected a ${format} object at the top level`);
  }
  return value as Record<string, any>;
}

/** Strict JSON; the top level must be an object (an array or scalar is refused, not reset). */
export function parseJsonObject(raw: string): Record<string, any> {
  return assertPlainObject(JSON.parse(raw), "JSON");
}

/** JSON that tolerates trailing commas before `}` / `]` (JSONC-lite, like `parseJsoncOrNull`). */
export function parseJsoncObject(raw: string): Record<string, any> {
  return assertPlainObject(JSON.parse(raw.replace(/,(\s*[}\]])/g, "$1")), "JSON");
}

const hasYamlContent = (raw: string) =>
  raw.split(/\r?\n/).some((line) => {
    const trimmed = line.trim();
    return trimmed !== "" && !trimmed.startsWith("#");
  });

/**
 * YAML mapping; an empty (or comment-only) document is an empty config, any other
 * non-mapping is refused. js-yaml 5 throws on an empty input, so check first.
 */
export function parseYamlObject(raw: string): Record<string, any> {
  if (!hasYamlContent(raw)) return {};
  const parsed = yamlLoad(raw);
  if (parsed === undefined || parsed === null) return {};
  return assertPlainObject(parsed, "YAML");
}

/**
 * 409 response for a refused overwrite, or `null` when `error` is something else
 * (callers keep their generic 500 for that). The message is fixed text plus a
 * home-relative path, routed through `sanitizeErrorMessage` (Hard Rule #12).
 */
export function configClobberRefusalResponse(error: unknown): NextResponse | null {
  if (!(error instanceof ConfigClobberRefusedError)) return null;
  return NextResponse.json(
    {
      error: {
        message: sanitizeErrorMessage(error.message),
        code: CONFIG_UNPARSEABLE_CODE,
      },
    },
    { status: 409 }
  );
}
