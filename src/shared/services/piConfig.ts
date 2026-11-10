/**
 * Read and mutate Pi Coding Agent's custom-provider config.
 *
 * Pi (>= 1.0, badlogic/pi) discovers user-defined providers from
 * `<agent-dir>/models.json`, where `agent-dir` is `~/.pi/agent` by default and
 * can be relocated with `PI_CODING_AGENT_DIR`. The root schema is
 * `{ providers: Record<providerName, ProviderConfig> }` and each provider entry
 * accepts `baseUrl`, `apiKey`, `api` (`openai-completions` for OmniRoute) plus an
 * explicit `models` list — Pi never auto-discovers models for custom endpoints,
 * they have to be listed. Unknown keys (e.g. `piGuiCustomEndpoint`) are tolerated
 * by the TypeBox validator, which has no `additionalProperties: false`, so we use
 * `omnirouteManaged: true` as a stable ownership marker on our own provider.
 *
 * Everything here is pure file I/O — the owning API route adds auth, the
 * container write guard, backups and last-configured bookkeeping.
 *
 * Reference: packages/coding-agent/src/core/model-config.ts in
 * @earendil-works/pi-coding-agent (ProviderConfigSchema / ModelsConfigSchema).
 */

import fs from "fs/promises";
import os from "os";
import path from "path";
import process from "process";

/** Tool id used for backups + last-configured bookkeeping. */
export const PI_TOOL_ID = "pi";

/** Provider name Pi addresses OmniRoute by in models.json. */
export const OMNIROUTE_PROVIDER_KEY = "omniroute";

/**
 * Ownership marker written onto our own provider entry.
 *
 * The real Pi schema is TypeBox-compiled without `additionalProperties: false`,
 * so an unknown boolean key is accepted by `ModelConfig.load()` and survives
 * round-trips. It is the least invasive way to distinguish a provider we own
 * from a same-named entry the user hand-edited.
 */
export const OMNIROUTE_PROVIDER_MARKER = "omnirouteManaged";

/**
 * Pi is OpenAI-compatible from OmniRoute's point of view: we serve
 * `/v1/chat/completions` and Pi speaks `openai-completions`.
 */
export const OMNIROUTE_PROVIDER_API = "openai-completions";

type ProviderEntry = Record<string, unknown>;

interface ModelsJson {
  providers: Record<string, ProviderEntry>;
  [extra: string]: unknown;
}

/**
 * Resolve Pi's agent dir, honouring the same env override Pi itself reads
 * (`PI_CODING_AGENT_DIR`, tilde-expanded) and falling back to `~/.pi/agent`.
 *
 * Mirrors `getAgentDir()` in pi-coding-agent/dist/config.js. Only an absolute
 * path is honoured — a relative value would resolve against the server's cwd
 * and land somewhere the user never intended.
 */
export function getPiAgentDir(env: NodeJS.ProcessEnv = process.env): string {
  const override = String(env.PI_CODING_AGENT_DIR || "").trim();
  if (override) {
    const expanded = expandTilde(override, env);
    if (path.isAbsolute(expanded)) return path.normalize(expanded);
  }
  return path.join(getPiHome(env), "agent");
}

/** Path to the models.json Pi actually loads custom providers from. */
export function getPiModelsPath(env: NodeJS.ProcessEnv = process.env): string {
  return path.join(getPiAgentDir(env), "models.json");
}

/** Path to the agent-level settings.json (theme, changelog, …). Read-only here. */
export function getPiSettingsPath(env: NodeJS.ProcessEnv = process.env): string {
  return path.join(getPiAgentDir(env), "settings.json");
}

function getPiHome(env: NodeJS.ProcessEnv = process.env): string {
  // Prefer $HOME (what the API routes and Pi agree on); os.homedir() is the
  // fallback for platforms that leave it unset.
  const home = typeof env.HOME === "string" && env.HOME.trim() ? env.HOME : os.homedir();
  return path.join(home, ".pi");
}

function expandTilde(value: string, env: NodeJS.ProcessEnv): string {
  if (!value.startsWith("~")) return value;
  const home = typeof env.HOME === "string" && env.HOME.trim() ? env.HOME : os.homedir();
  return path.join(home, value.slice(1));
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

/** Why one `providers.<id>` entry is not loadable by Pi, or null when it is. */
function piProviderEntryError(providerId: string, provider: unknown): string | null {
  if (!isPlainObject(provider)) return `models.json provider "${providerId}" must be an object`;
  for (const field of ["name", "baseUrl", "apiKey", "api"]) {
    if (provider[field] !== undefined && typeof provider[field] !== "string") {
      return `models.json provider "${providerId}" field "${field}" must be a string`;
    }
  }
  if (provider.models === undefined) return null;
  if (!Array.isArray(provider.models)) {
    return `models.json provider "${providerId}" field "models" must be an array`;
  }
  const everyModelHasId = provider.models.every(
    (model) => isPlainObject(model) && typeof model.id === "string" && Boolean(model.id)
  );
  return everyModelHasId
    ? null
    : `models.json provider "${providerId}" models must contain objects with an id`;
}

/** Why a parsed document is not a models.json Pi can load, or null when it is. */
function piModelsJsonError(parsed: unknown): string | null {
  if (!isPlainObject(parsed)) return "models.json must be a JSON object";
  if (parsed.providers === undefined) {
    // A file without `providers` is not a models.json Pi can load — report it
    // rather than silently rewriting the user's unrelated file.
    return 'models.json has no "providers" object';
  }
  if (!isPlainObject(parsed.providers)) return 'models.json "providers" must be an object';
  for (const [providerId, provider] of Object.entries(parsed.providers)) {
    const error = piProviderEntryError(providerId, provider);
    if (error) return error;
  }
  return null;
}

/**
 * Read and parse models.json.
 *
 * Returns `{ config: null, error }` when the file exists but is not a valid
 * models.json object, so the route can surface the failure instead of silently
 * treating a corrupt file as "not configured yet". A missing file is the normal
 * pre-configuration state and yields `{ config: null, error: null }`.
 */
export async function readPiModelsJson(
  env: NodeJS.ProcessEnv = process.env
): Promise<{ config: ModelsJson | null; error: string | null }> {
  const modelsPath = getPiModelsPath(env);
  let content: string;
  try {
    content = await fs.readFile(modelsPath, "utf-8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return { config: null, error: null };
    throw error;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch (error) {
    return {
      config: null,
      error: `models.json is not valid JSON: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }

  const error = piModelsJsonError(parsed);
  if (error) return { config: null, error };
  return { config: parsed as ModelsJson, error: null };
}

/**
 * True when an OmniRoute-owned provider entry exists in models.json.
 *
 * The marker is authoritative; a same-named entry the user wrote by hand without
 * it is reported as not configured so we never clobber it silently.
 */
export function hasOmniRoutePiProvider(config: ModelsJson | null): boolean {
  if (!config) return false;
  const provider = config.providers?.[OMNIROUTE_PROVIDER_KEY];
  if (!provider || typeof provider !== "object") return false;
  return provider[OMNIROUTE_PROVIDER_MARKER] === true;
}

/**
 * True when an `omniroute` provider exists but was not written by us — e.g. the
 * user hand-edited models.json, or pi-gui's "Custom endpoints" UI created it.
 *
 * Such an entry is genuinely configured and points at this OmniRoute instance,
 * so the dashboard should report "configured" rather than "not configured".
 * We still never claim ownership of it: Apply only rewrites an entry that carries
 * our marker, Reset leaves it alone, and the ownership marker is added on the
 * next Apply.
 */
export function hasUnownedOmniRoutePiProvider(config: ModelsJson | null, apiPort: number): boolean {
  if (!config) return false;
  const provider = config.providers?.[OMNIROUTE_PROVIDER_KEY];
  if (!provider || typeof provider !== "object") return false;
  if (provider[OMNIROUTE_PROVIDER_MARKER] === true) return false;

  const baseUrl = typeof provider.baseUrl === "string" ? provider.baseUrl.trim() : "";
  if (!baseUrl) return false;
  if (!baseUrl.startsWith("http://") && !baseUrl.startsWith("https://")) return false;

  // Only claim a foreign entry points at *this* OmniRoute when the host/port
  // match our own bound port (loopback, a named local address, or a tunnel).
  try {
    const parsedUrl = new URL(baseUrl);
    const { hostname, port } = parsedUrl;
    const schemeDefaultPort = parsedUrl.protocol === "https:" ? "443" : "80";
    const portMatch = String(port || schemeDefaultPort) === String(apiPort);
    return (
      portMatch && ["localhost", "127.0.0.1", "::1", "0.0.0.0", os.hostname()].includes(hostname)
    );
  } catch {
    return false;
  }
}

/**
 * Read the OmniRoute provider entry, or null when absent/not owned.
 */
export function readOmniRoutePiProvider(config: ModelsJson | null): ProviderEntry | null {
  if (!hasOmniRoutePiProvider(config)) return null;
  return config?.providers?.[OMNIROUTE_PROVIDER_KEY] ?? null;
}

/**
 * Normalise a OmniRoute base URL to the `/v1` form Pi's OpenAI transport needs.
 * Idempotent, trims whitespace and collapses a trailing slash before `/v1`.
 */
export function ensurePiV1BaseUrl(baseUrl: string): string {
  const trimmed = String(baseUrl || "")
    .trim()
    .replace(/\/+$/, "");
  return trimmed.endsWith("/v1") ? trimmed : `${trimmed}/v1`;
}

/** Validate and normalize a user-entered OmniRoute endpoint for Pi. */
export function normalizePiBaseUrl(baseUrl: string): string {
  const normalized = ensurePiV1BaseUrl(baseUrl);
  let parsed: URL;
  try {
    parsed = new URL(normalized);
  } catch {
    throw new Error("Pi endpoint must be an absolute HTTP or HTTPS URL");
  }

  if (
    !["http:", "https:"].includes(parsed.protocol) ||
    parsed.username ||
    parsed.password ||
    parsed.search ||
    parsed.hash
  ) {
    throw new Error(
      "Pi endpoint must be an HTTP or HTTPS URL without credentials or query parameters"
    );
  }

  return normalized;
}

interface ApplyOptions {
  /** OmniRoute base URL, already validated non-empty by the caller. */
  baseUrl: string;
  /** Plaintext OmniRoute API key to persist. */
  apiKey: string;
  /** Model id (provider/model) Pi should request. */
  model: string;
  /** Human label for the model, optional — Pi shows `name` in its picker. */
  modelName?: string;
}

/**
 * Merge the OmniRoute provider into models.json.
 *
 * - Creates `~/.pi/agent/models.json` when absent.
 * - Preserves every other provider and every unrelated root key.
 * - Overwrites only our own entry (identified by the ownership marker or an
 *   existing `omniroute` key pointing at this OmniRoute instance).
 *
 * Returns the written path.
 */
export async function applyOmniRoutePiProvider(
  options: ApplyOptions,
  env: NodeJS.ProcessEnv = process.env
): Promise<string> {
  const modelsPath = getPiModelsPath(env);

  const { config, error } = await readPiModelsJson(env);
  if (error) throw new Error(error);

  const providers: Record<string, ProviderEntry> = {
    ...((config?.providers as Record<string, ProviderEntry> | undefined) ?? {}),
  };

  providers[OMNIROUTE_PROVIDER_KEY] = {
    ...(providers[OMNIROUTE_PROVIDER_KEY] ?? {}),
    baseUrl: normalizePiBaseUrl(options.baseUrl),
    api: OMNIROUTE_PROVIDER_API,
    apiKey: options.apiKey,
    [OMNIROUTE_PROVIDER_MARKER]: true,
    models: [
      {
        id: options.model,
        ...(options.modelName ? { name: options.modelName } : {}),
      },
    ],
  };

  const nextConfig: ModelsJson = {
    ...(config ?? {}),
    providers,
  };

  await fs.mkdir(path.dirname(modelsPath), { recursive: true });
  await fs.writeFile(modelsPath, JSON.stringify(nextConfig, null, 2), {
    encoding: "utf-8",
    mode: 0o600,
  });
  return modelsPath;
}

/**
 * Remove the OmniRoute-owned provider from models.json.
 *
 * Never touches other providers. Deletes the file only when it would otherwise
 * be left holding an empty `providers` object with nothing else in it.
 *
 * Returns `{ removed: true, modelsPath }`, or `{ removed: false }` when there
 * was nothing owned by OmniRoute to remove.
 */
export async function removeOmniRoutePiProvider(
  env: NodeJS.ProcessEnv = process.env
): Promise<{ removed: boolean; modelsPath: string }> {
  const modelsPath = getPiModelsPath(env);

  const { config } = await readPiModelsJson(env);
  if (!hasOmniRoutePiProvider(config)) {
    return { removed: false, modelsPath };
  }

  const providers = { ...(config?.providers ?? {}) };
  delete providers[OMNIROUTE_PROVIDER_KEY];

  const remainder: Record<string, unknown> = { ...config };
  if (Object.keys(providers).length === 0) {
    delete remainder.providers;
  } else {
    remainder.providers = providers;
  }

  if (Object.keys(remainder).length === 0) {
    await fs.rm(modelsPath, { force: true });
  } else {
    await fs.writeFile(modelsPath, JSON.stringify(remainder, null, 2), {
      encoding: "utf-8",
      mode: 0o600,
    });
  }

  return { removed: true, modelsPath };
}

/** Surface whether the agent dir + models.json exist, for the dashboard summary. */
export async function getPiconfigPresence(
  env: NodeJS.ProcessEnv = process.env
): Promise<{ modelsPath: string; agentDir: string; modelsFileExists: boolean }> {
  const agentDir = getPiAgentDir(env);
  const modelsPath = getPiModelsPath(env);
  return { modelsPath, agentDir, modelsFileExists: await fileExists(modelsPath) };
}
