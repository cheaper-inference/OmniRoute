// bin/cli/launch/core/catalog.mjs: GET /v1/models through the session token, normalized to
// ViewCatalogRow.

import { LaunchError } from "../contract.mjs";
import { httpError } from "./errors.mjs";

/**
 * A raw /v1/models entry as the gateway sends it. Every field is optional and unchecked: the
 * normalizer validates each one before copying it into a row.
 * @typedef {object} RawCatalogEntry
 * @property {string} [id]
 * @property {string} [display_name]
 * @property {string} [name]
 * @property {string} [label]
 * @property {string} [kind]
 * @property {string} [type]
 * @property {string} [owned_by]
 * @property {string} [parent]
 * @property {string[] | Record<string, boolean | string[]>} [capabilities]
 * @property {number} [max_input_tokens]
 * @property {number} [context_length]
 * @property {number} [max_context_window_tokens]
 * @property {number} [max_output_tokens]
 * @property {number} [max_completion_tokens]
 * @property {string[]} [protocols]
 * @property {string} [availability]
 */

const AVAILABILITY = ["ok", "degraded", "down"];

function positive(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : undefined;
}

function isNonEmptyString(value) {
  return typeof value === "string" && value !== "";
}

function nonEmptyString(value) {
  return isNonEmptyString(value) ? value : undefined;
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

function labelOf(entry) {
  return [entry.display_name, entry.name, entry.label].find(isNonEmptyString);
}

function maxOutputOf(entry) {
  return positive(entry.max_output_tokens) ?? positive(entry.max_completion_tokens);
}

function providerOf(entry, row) {
  return row.kind === "model" ? nonEmptyString(entry.owned_by) : undefined;
}

function protocolsOf(entry) {
  if (!Array.isArray(entry.protocols)) return undefined;
  return entry.protocols.filter((p) => typeof p === "string");
}

function availabilityOf(entry) {
  return AVAILABILITY.includes(entry.availability) ? entry.availability : undefined;
}

/**
 * Optional row fields, in row insertion order: [rowKey, read(entry, row)]. A field is set only
 * when its reader returns a value (never undefined).
 * @type {ReadonlyArray<[string, (entry: RawCatalogEntry, row: object) => string | number | string[] | undefined]>}
 */
const OPTIONAL_FIELDS = [
  ["label", labelOf],
  ["contextTokens", contextWindowOf],
  ["maxOutputTokens", maxOutputOf],
  ["type", (entry) => nonEmptyString(entry.type)],
  ["provider", providerOf],
  ["parent", (entry) => nonEmptyString(entry.parent)],
  ["protocols", protocolsOf],
  ["availability", availabilityOf],
];

/**
 * One /v1/models entry -> ViewCatalogRow, or null when it has no id.
 * @param {RawCatalogEntry | null | undefined} entry
 */
function normalizeCatalogEntry(entry) {
  if (!entry || typeof entry !== "object" || !isNonEmptyString(entry.id)) return null;
  const row = {
    id: entry.id,
    capabilities: capabilityList(entry.capabilities),
    kind: kindOf(entry),
  };
  for (const [key, read] of OPTIONAL_FIELDS) {
    const value = read(entry, row);
    if (value !== undefined) row[key] = value;
  }
  return row;
}

/** Rows from a /v1/models body: `{data:[...]}` or a bare array. */
export function normalizeCatalog(body) {
  const list = Array.isArray(body) ? body : Array.isArray(body?.data) ? body.data : [];
  return list.map(normalizeCatalogEntry).filter(Boolean);
}

/**
 * GET `path` on the gateway with JSON accept, the bearer token when set, and a timeout.
 * @param {{ rootUrl: string, token?: string, fetch?: typeof fetch, timeoutMs?: number }} options
 * @param {string} path
 */
function requestJson(options, path) {
  const doFetch = options.fetch ?? globalThis.fetch;
  const auth = options.token ? { authorization: `Bearer ${options.token}` } : {};
  return doFetch(`${options.rootUrl}${path}`, {
    headers: { accept: "application/json", ...auth },
    signal: AbortSignal.timeout(options.timeoutMs ?? 10000),
  });
}

/**
 * Fetch the catalog the session token may see.
 * @param {{ rootUrl: string, token?: string, fetch?: typeof fetch, timeoutMs?: number }} options
 */
export async function fetchCatalog(options) {
  let res;
  try {
    res = await requestJson(options, "/v1/models");
  } catch (error) {
    throw new LaunchError(
      "GatewayUnreachable",
      `model catalog: gateway not reachable at ${options.rootUrl}`,
      { cause: error }
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

/** Statuses meaning the gateway has no /api/launch/providers route (older or remote gateway). */
const UNSUPPORTED_STATUSES = new Set([404, 405, 501]);

/** The failure reason for a non-usable providers response, or null when it is ok. */
function providersStatusFailure(res) {
  if (UNSUPPORTED_STATUSES.has(res.status)) {
    return "this gateway does not report connected providers";
  }
  return res.ok ? null : `connected providers: HTTP ${res.status}`;
}

async function discardBody(res) {
  await res.body?.cancel?.().catch?.(() => {});
}

/** `value[key]` when it is an array, else null (null-safe on `value`). */
function arrayField(value, key) {
  const field = value?.[key];
  return Array.isArray(field) ? field : null;
}

/**
 * Sorted distinct prefixes from a providers body (`prefixes`, and `providers[].id` /
 * `providers[].prefixes`), or null when the body has neither list.
 */
function providerPrefixes(body) {
  const topLevel = arrayField(body, "prefixes");
  const providers = arrayField(body, "providers");
  if (!topLevel && !providers) return null;
  const prefixes = new Set();
  const add = (value) => {
    if (isNonEmptyString(value)) prefixes.add(value);
  };
  topLevel?.forEach(add);
  for (const provider of providers ?? []) {
    add(provider?.id);
    arrayField(provider, "prefixes")?.forEach(add);
  }
  return [...prefixes].sort();
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
  let res;
  try {
    res = await requestJson(options, "/api/launch/providers");
  } catch {
    return { ok: false, reason: "gateway not reachable" };
  }
  const failure = providersStatusFailure(res);
  if (failure) {
    await discardBody(res);
    return { ok: false, reason: failure };
  }
  let body;
  try {
    body = await res.json();
  } catch {
    return { ok: false, reason: "connected providers: invalid JSON" };
  }
  const prefixes = providerPrefixes(body);
  if (!prefixes) return { ok: false, reason: "connected providers: unexpected response" };
  return { ok: true, prefixes };
}
