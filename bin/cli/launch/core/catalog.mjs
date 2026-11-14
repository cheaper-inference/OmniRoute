// bin/cli/launch/core/catalog.mjs: GET /v1/models through the session token, normalized to
// ViewCatalogRow (section 3.2; context normalization as configure.mjs contextWindowOf).

import { LaunchError } from "../contract.mjs";
import { httpError } from "./errors.mjs";

function positive(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : undefined;
}

/** Context window of a /v1/models entry: max_input_tokens, context_length, max_context_window_tokens. */
export function contextWindowOf(entry) {
  return (
    positive(entry?.max_input_tokens) ??
    positive(entry?.context_length) ??
    positive(entry?.max_context_window_tokens)
  );
}

/** Capabilities as a string list: object form keeps keys whose value is truthy. */
function capabilityList(value) {
  if (Array.isArray(value)) return value.filter((cap) => typeof cap === "string");
  if (value && typeof value === "object") {
    return Object.keys(value).filter((key) => {
      const v = value[key];
      return v === true || (Array.isArray(v) && v.length > 0);
    });
  }
  return [];
}

function kindOf(entry) {
  const id = String(entry.id);
  if (id === "auto" || id.startsWith("auto/") || entry.kind === "auto") return "auto";
  if (entry.owned_by === "combo" || entry.kind === "combo") return "combo";
  return "model";
}

/**
 * One /v1/models entry -> ViewCatalogRow, or null when it has no id.
 * @param {any} entry
 */
export function normalizeCatalogEntry(entry) {
  if (!entry || typeof entry !== "object" || typeof entry.id !== "string" || entry.id === "") {
    return null;
  }
  const row = {
    id: entry.id,
    capabilities: capabilityList(entry.capabilities),
    kind: kindOf(entry),
  };
  const label = [entry.display_name, entry.name, entry.label].find(
    (v) => typeof v === "string" && v !== ""
  );
  if (label) row.label = label;
  const context = contextWindowOf(entry);
  if (context) row.contextTokens = context;
  const maxOutput = positive(entry.max_output_tokens) ?? positive(entry.max_completion_tokens);
  if (maxOutput) row.maxOutputTokens = maxOutput;
  if (typeof entry.type === "string" && entry.type !== "") row.type = entry.type;
  if (row.kind === "model" && typeof entry.owned_by === "string" && entry.owned_by !== "") {
    row.provider = entry.owned_by;
  }
  if (Array.isArray(entry.protocols))
    row.protocols = entry.protocols.filter((p) => typeof p === "string");
  if (["ok", "degraded", "down"].includes(entry.availability))
    row.availability = entry.availability;
  return row;
}

/** Rows from a /v1/models body: `{data:[...]}` or a bare array. */
export function normalizeCatalog(body) {
  const list = Array.isArray(body) ? body : Array.isArray(body?.data) ? body.data : [];
  return list.map(normalizeCatalogEntry).filter(Boolean);
}

/**
 * Fetch the catalog the session token may see.
 * @param {{ rootUrl: string, token?: string, fetch?: typeof fetch, timeoutMs?: number }} options
 */
export async function fetchCatalog(options) {
  const doFetch = options.fetch ?? globalThis.fetch;
  let res;
  try {
    res = await doFetch(`${options.rootUrl}/v1/models`, {
      headers: {
        accept: "application/json",
        ...(options.token ? { authorization: `Bearer ${options.token}` } : {}),
      },
      signal: AbortSignal.timeout(options.timeoutMs ?? 10000),
    });
  } catch (error) {
    throw new LaunchError(
      "GatewayUnreachable",
      `model catalog: gateway not reachable at ${options.rootUrl}`,
      {
        cause: error,
      }
    );
  }
  const failure = httpError(res.status, "model catalog");
  if (failure) throw failure;
  let body;
  try {
    body = await res.json();
  } catch (error) {
    throw new LaunchError("GatewayUnreachable", "model catalog: gateway sent invalid JSON", {
      cause: error,
    });
  }
  return normalizeCatalog(body);
}

/**
 * GET /api/launch/providers: the id prefixes of providers the caller has an active stored
 * credential for (API key or OAuth; keyless providers are never listed).
 * Never throws: `{ ok: false, reason }` when the gateway lacks the route (older or remote
 * gateway) or the call fails, so the launcher can fall back to the full catalog.
 * @param {{ rootUrl: string, token?: string, fetch?: typeof fetch, timeoutMs?: number }} options
 * @returns {Promise<{ ok: true, prefixes: string[] } | { ok: false, reason: string }>}
 */
export async function fetchConnectedProviders(options) {
  const doFetch = options.fetch ?? globalThis.fetch;
  let res;
  try {
    res = await doFetch(`${options.rootUrl}/api/launch/providers`, {
      headers: {
        accept: "application/json",
        ...(options.token ? { authorization: `Bearer ${options.token}` } : {}),
      },
      signal: AbortSignal.timeout(options.timeoutMs ?? 10000),
    });
  } catch {
    return { ok: false, reason: "gateway not reachable" };
  }
  if (res.status === 404 || res.status === 405 || res.status === 501) {
    await res.body?.cancel?.().catch?.(() => {});
    return { ok: false, reason: "this gateway does not report connected providers" };
  }
  if (!res.ok) {
    await res.body?.cancel?.().catch?.(() => {});
    return { ok: false, reason: `connected providers: HTTP ${res.status}` };
  }
  let body;
  try {
    body = await res.json();
  } catch {
    return { ok: false, reason: "connected providers: invalid JSON" };
  }
  const prefixes = new Set();
  const add = (value) => {
    if (typeof value === "string" && value !== "") prefixes.add(value);
  };
  if (Array.isArray(body?.prefixes)) body.prefixes.forEach(add);
  if (Array.isArray(body?.providers)) {
    for (const provider of body.providers) {
      add(provider?.id);
      if (Array.isArray(provider?.prefixes)) provider.prefixes.forEach(add);
    }
  } else if (!Array.isArray(body?.prefixes)) {
    return { ok: false, reason: "connected providers: unexpected response" };
  }
  return { ok: true, prefixes: [...prefixes].sort() };
}
