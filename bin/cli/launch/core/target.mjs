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
  const resolveContext = deps.resolveContext ?? resolveActiveContext;
  const credentialFor = deps.credentialFor ?? contextCredentialFor;
  const contextName = flags.context ?? env.OMNIROUTE_CONTEXT ?? undefined;

  let context = null;
  const loadContext = () => {
    if (context !== null) return context || null;
    try {
      context = resolveContext(contextName) || false;
    } catch {
      context = false;
    }
    return context || null;
  };

  const explicit = flags.remote ?? flags.baseUrl;
  let rootUrl;
  let kind;
  let port;
  if (!isBlank(explicit)) {
    const flag = flags.remote !== undefined ? "--remote" : "--base-url";
    parseUrl(String(explicit).trim(), flag);
    rootUrl = normalizeRootUrl(explicit);
    kind = "remote";
  } else {
    const ctx = isBlank(flags.port) ? loadContext() : null;
    if (ctx && !isBlank(ctx.baseUrl) && !isLoopbackUrl(ctx.baseUrl)) {
      parseUrl(String(ctx.baseUrl), "context baseUrl");
      rootUrl = normalizeRootUrl(ctx.baseUrl);
      kind = "remote";
    } else {
      port = parsePort(flags.port, env);
      rootUrl = `http://127.0.0.1:${port}`;
      kind = "local";
    }
  }

  return { rootUrl, kind, port, contextName, credential: resolveCredential(flags, env, rootUrl) };

  function resolveCredential(f, e, url) {
    const direct = f.apiKey ?? f.token;
    if (!isBlank(direct)) return { value: String(direct).trim(), source: "option" };
    if (!isBlank(f.apiKeyEnv)) {
      const name = String(f.apiKeyEnv).trim();
      if (!ENV_NAME.test(name)) {
        throw new LaunchError("UsageError", `--api-key-env must be an env var name: ${name}`);
      }
      if (isBlank(e[name])) {
        throw new LaunchError("UsageError", `--api-key-env ${name} is not set`);
      }
      return { value: String(e[name]).trim(), source: "env" };
    }
    const ctx = loadContext();
    if (ctx) {
      let fromContext;
      try {
        fromContext = credentialFor(ctx, url);
      } catch {
        fromContext = undefined;
      }
      if (!isBlank(fromContext)) return { value: String(fromContext), source: "context" };
    }
    if (!isBlank(e.OMNIROUTE_API_KEY)) {
      return { value: String(e.OMNIROUTE_API_KEY).trim(), source: "env" };
    }
    return { value: undefined, source: "none" };
  }
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
