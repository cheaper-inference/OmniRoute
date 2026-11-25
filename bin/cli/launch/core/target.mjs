// bin/cli/launch/core/target.mjs: resolve gateway root URL + parent credential
// (merges launch.mjs resolveLaunchTarget, launch-codex.mjs resolveCodexTarget, run.mjs auth).
// Pure given its inputs: env and the context resolver are injected.

import { LaunchError, stripTrailingSlash } from "../contract.mjs";
import { contextCredentialFor, resolveActiveContext } from "../../contexts.mjs";

const DEFAULT_PORT = 20128;
const ENV_NAME = /^[A-Za-z_][A-Za-z0-9_]*$/;
const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);

function isBlank(value) {
  return value === undefined || value === null || String(value).trim() === "";
}

/** Root URL: no trailing slash, no `/v1` suffix. */
export function normalizeRootUrl(value) {
  const stripped = stripTrailingSlash(String(value).trim());
  return stripped.endsWith("/v1") ? stripTrailingSlash(stripped.slice(0, -3)) : stripped;
}

function parseUrl(value, flag) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new LaunchError("UsageError", `${flag} must be an http(s) URL: ${JSON.stringify(value)}`);
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new LaunchError("UsageError", `${flag} must be an http(s) URL: ${JSON.stringify(value)}`);
  }
  if (url.username || url.password) {
    throw new LaunchError("UsageError", `${flag} must not contain credentials`);
  }
  return url;
}

/** True when the URL's host is loopback. */
export function isLoopbackUrl(value) {
  try {
    return LOOPBACK_HOSTS.has(new URL(value).hostname.toLowerCase());
  } catch {
    return false;
  }
}

function parsePort(value, env) {
  const raw = value ?? env.PORT;
  if (isBlank(raw)) return DEFAULT_PORT;
  const port = Number(raw);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new LaunchError(
      "UsageError",
      `--port must be an integer 1-65535: ${JSON.stringify(raw)}`
    );
  }
  return port;
}

/** Memoized context resolution: a resolver error or empty result reads as "no context". */
function contextLoader(resolveContext, contextName) {
  let context = null;
  return () => {
    if (context !== null) return context || null;
    try {
      context = resolveContext(contextName) || false;
    } catch {
      context = false;
    }
    return context || null;
  };
}

function isRemoteContext(ctx) {
  return Boolean(ctx) && !isBlank(ctx.baseUrl) && !isLoopbackUrl(ctx.baseUrl);
}

/** Root URL, kind and local port: flags > active context > local default. */
function resolveRoot(flags, env, loadContext) {
  const explicit = flags.remote ?? flags.baseUrl;
  if (!isBlank(explicit)) {
    const flag = flags.remote !== undefined ? "--remote" : "--base-url";
    parseUrl(String(explicit).trim(), flag);
    return { rootUrl: normalizeRootUrl(explicit), kind: "remote", port: undefined };
  }
  const ctx = isBlank(flags.port) ? loadContext() : null;
  if (isRemoteContext(ctx)) {
    parseUrl(String(ctx.baseUrl), "context baseUrl");
    return { rootUrl: normalizeRootUrl(ctx.baseUrl), kind: "remote", port: undefined };
  }
  const port = parsePort(flags.port, env);
  return { rootUrl: `http://127.0.0.1:${port}`, kind: "local", port };
}

function envVarCredential(apiKeyEnv, env) {
  const name = String(apiKeyEnv).trim();
  if (!ENV_NAME.test(name)) {
    throw new LaunchError("UsageError", `--api-key-env must be an env var name: ${name}`);
  }
  if (isBlank(env[name])) {
    throw new LaunchError("UsageError", `--api-key-env ${name} is not set`);
  }
  return { value: String(env[name]).trim(), source: "env" };
}

function contextCredential(loadContext, credentialFor, url) {
  const ctx = loadContext();
  if (!ctx) return undefined;
  let fromContext;
  try {
    fromContext = credentialFor(ctx, url);
  } catch {
    fromContext = undefined;
  }
  return isBlank(fromContext) ? undefined : { value: String(fromContext), source: "context" };
}

/** Credential: --api-key/--token > --api-key-env > context > OMNIROUTE_API_KEY. */
function resolveCredential(flags, env, url, loadContext, credentialFor) {
  const direct = flags.apiKey ?? flags.token;
  if (!isBlank(direct)) return { value: String(direct).trim(), source: "option" };
  if (!isBlank(flags.apiKeyEnv)) return envVarCredential(flags.apiKeyEnv, env);
  const fromContext = contextCredential(loadContext, credentialFor, url);
  if (fromContext) return fromContext;
  if (!isBlank(env.OMNIROUTE_API_KEY)) {
    return { value: String(env.OMNIROUTE_API_KEY).trim(), source: "env" };
  }
  return { value: undefined, source: "none" };
}

/**
 * @typedef {object} LaunchTarget
 * @property {string} rootUrl gateway root URL
 * @property {"local" | "remote"} kind remote = explicit URL or non-loopback context; no lifecycle
 * @property {number | undefined} port local port (local kind only)
 * @property {string | undefined} contextName
 * @property {{ value: string | undefined, source: "option" | "env" | "context" | "none" }} credential
 */

/**
 * Flags > active context > local default. The context credential is used only for the
 * context's own origin (contextCredentialFor).
 * @param {object} flags remote, baseUrl, port, context, apiKey, token, apiKeyEnv
 * @param {{ env?: Record<string,string|undefined>, resolveContext?: (name?: string) => object | null,
 *   credentialFor?: (ctx: object, url: string) => string | undefined }} [deps]
 * @returns {LaunchTarget}
 */
export function resolveTarget(flags = {}, deps = {}) {
  const env = deps.env ?? process.env;
  const credentialFor = deps.credentialFor ?? contextCredentialFor;
  const contextName = flags.context ?? env.OMNIROUTE_CONTEXT ?? undefined;
  const loadContext = contextLoader(deps.resolveContext ?? resolveActiveContext, contextName);
  const { rootUrl, kind, port } = resolveRoot(flags, env, loadContext);
  const credential = resolveCredential(flags, env, rootUrl, loadContext, credentialFor);
  return { rootUrl, kind, port, contextName, credential };
}

/** Target without the secret, safe to hand to gateway lifecycle, logs and dry-run. */
export function publicTarget(target) {
  return {
    rootUrl: target.rootUrl,
    kind: target.kind,
    port: target.port,
    contextName: target.contextName,
    credentialSource: target.credential.source,
  };
}
