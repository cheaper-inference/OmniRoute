import { parseCodeBuddyConfig } from "./catalog.ts";
import { CODEBUDDY_INTL_CLI_USER_AGENT } from "./cliProfile.ts";

/**
 * Runtime fetch of the authoritative CodeBuddy International model catalog.
 *
 * `GET /v3/config?repos[]=` requires the account's bearer token, so it cannot be
 * mirrored at build time: it is fetched on demand, cached in memory for a short
 * TTL, and merged into the curated registry list. A failure is NEVER fatal — the
 * curated list stays authoritative for that request (offline fallback).
 */

export const CODEBUDDY_CONFIG_PATH = "/v3/config";
export const CODEBUDDY_DEFAULT_BASE_URL = "https://www.codebuddy.ai";

const DEFAULT_TTL_MS = 30 * 60 * 1000;
const DEFAULT_TIMEOUT_MS = 10_000;

interface CacheEntry {
  models: ReturnType<typeof parseCodeBuddyConfig>;
  fetchedAtMs: number;
}

const cache = new Map<string, CacheEntry>();

export interface FetchCatalogOptions {
  accessToken?: string | null;
  baseUrl?: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
  ttlMs?: number;
  now?: number;
  /** Cache key — one catalog per account, since models can be plan-specific. */
  accountKey?: string;
}

export interface FetchCatalogResult {
  models: ReturnType<typeof parseCodeBuddyConfig>;
  ok: boolean;
  cached: boolean;
  status?: number;
  error?: string;
}

/** Reset the in-memory catalog cache (tests and account removal). */
export function clearCodeBuddyCatalogCache(): void {
  cache.clear();
}

function normalizeBaseUrl(baseUrl?: string): string {
  return (baseUrl || CODEBUDDY_DEFAULT_BASE_URL).replace(/\/+$/, "");
}

/**
 * Fetch and cache the catalog. Never throws: a network/HTTP failure returns
 * `ok: false` with an empty model list so the caller keeps the curated lineup.
 */
export async function fetchCodeBuddyCatalog(
  options: FetchCatalogOptions = {}
): Promise<FetchCatalogResult> {
  const now = options.now ?? Date.now();
  const ttlMs = options.ttlMs ?? DEFAULT_TTL_MS;
  const accountKey = options.accountKey || "default";

  const cached = cache.get(accountKey);
  if (cached && now - cached.fetchedAtMs < ttlMs) {
    return { models: cached.models, ok: true, cached: true };
  }

  const fetchImpl = options.fetchImpl ?? fetch;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options.timeoutMs ?? DEFAULT_TIMEOUT_MS);

  try {
    const headers: Record<string, string> = {
      "User-Agent": CODEBUDDY_INTL_CLI_USER_AGENT,
      Accept: "application/json",
      "X-IDE-Type": "CLI",
      "X-IDE-Name": "CLI",
      "X-IDE-Version": "2.175.0",
      "X-Domain": "www.codebuddy.ai",
      "X-Product": "SaaS",
    };
    if (options.accessToken) headers.Authorization = `Bearer ${options.accessToken}`;

    const response = await fetchImpl(
      `${normalizeBaseUrl(options.baseUrl)}${CODEBUDDY_CONFIG_PATH}?repos[]=`,
      { method: "GET", headers, signal: controller.signal }
    );

    if (!response.ok) {
      return { models: [], ok: false, cached: false, status: response.status };
    }

    const payload: unknown = await response.json();
    const models = parseCodeBuddyConfig(payload);
    if (models.length > 0) cache.set(accountKey, { models, fetchedAtMs: now });
    return { models, ok: true, cached: false };
  } catch (error) {
    // Narrow: message only, never a response body.
    return {
      models: [],
      ok: false,
      cached: false,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    clearTimeout(timer);
  }
}
