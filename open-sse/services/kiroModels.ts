/**
 * Kiro (AWS CodeWhisperer / Amazon Q) live model discovery.
 *
 * Kiro's model catalog is per-account / per-tier — the free tier, Pro, Pro+ and
 * Power plans expose different model sets, and AWS IAM Identity Center (enterprise)
 * orgs further restrict it to an admin-curated "approved models" list. The Kiro
 * IDE / CLI populates its model picker by calling the CodeWhisperer
 * `ListAvailableModels` operation:
 *
 *   GET https://q.{region}.amazonaws.com/ListAvailableModels?origin=AI_EDITOR
 *   Authorization: Bearer <accessToken>
 *   → { models: [ { modelId, modelName?, tokenLimits?: { maxInputTokens, maxOutputTokens } } ] }
 *
 * Requests mirror the Kiro IDE (1.4.178): the same Kiro IDE identity as inference,
 * `profileArn` sent whenever the connection has one, and `nextToken` pages followed
 * (see fetchKiroAvailableModels for the attempt order):
 *   - `origin=AI_EDITOR` alone serves Builder ID / social logins without a profileArn.
 *   - The endpoint is region-matched (IdC tokens are region-bound, e.g.
 *     eu-central-1) with a us-east-1 fallback (the legacy CodeWhisperer home region).
 *   - Kiro filters the list by egress region; the list returned is the one to keep.
 *
 * A safe fallback to the static registry catalog is preserved so model import
 * never breaks when the account is offline / unauthenticated / token-expired.
 */

import { createHash } from "node:crypto";

/**
 * Why the live catalog was not used: a code of the closed vocabulary, or an
 * HTTP status. Never a message, a body or an URL — the reason is published to
 * the operator, so it must not carry what the upstream sent.
 */
type DiscoveryFailure = { status?: number; code?: string };

import { v4 as uuidv4 } from "uuid";

import {
  isExternalIdpAuthMethod,
  KIRO_EXTERNAL_IDP_TOKEN_TYPE_HEADER,
  KIRO_EXTERNAL_IDP_TOKEN_TYPE_VALUE,
} from "./kiroExternalIdp.ts";
import { discoverKiroProfileArnAcrossRegions, resolveKiroRuntimeRegion } from "./kiroRegion.ts";
import { kiroMachineId } from "./kiroMachineId.ts";
import { fixedKiroProfileArn } from "./kiroFixedProfile.ts";
import { buildKiroUserAgentHeaders } from "../config/kiroClientIdentity.ts";
import { supportsKiroAdaptiveThinking } from "../translator/request/openai-to-kiro/adaptiveThinking.ts";

type RawRecord = Record<string, unknown>;

// The Kiro IDE stops after 10 pages (agent extension 1.1.939).
const KIRO_CATALOG_MAX_PAGES = 10;
// Auth methods bound to a Q Developer profile that may have been stored without its ARN.
const KIRO_PROFILE_LOOKUP_AUTH_METHODS = new Set(["idc", "imported"]);
// Builder ID and GitHub/Google logins use the Kiro IDE's fixed profile (kiroFixedProfile.ts).
const CACHE_TTL_MS = 5 * 60 * 1000;

const catalogCache = new Map<string, { expiresAt: number; models: KiroModel[] }>();

function asRecord(value: unknown): RawRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as RawRecord) : {};
}

function toNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export type KiroPromptCaching = {
  supportsPromptCaching: boolean;
  minimumTokensPerCacheCheckpoint: number | null;
  maximumCacheCheckpointsPerRequest: number | null;
};

export type KiroModel = {
  id: string;
  name: string;
  owned_by: string;
  capabilities?: {
    thinking: boolean;
    agentic: boolean;
  };
  contextLength?: number;
  outputTokenLimit?: number;
  rateMultiplier?: number;
  upstreamModelId?: string;
  description?: string;
  promptCaching?: KiroPromptCaching;
};

function toNonNegativeInteger(value: unknown): number | null {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 ? value : null;
}

function parsePromptCaching(value: unknown): KiroPromptCaching | undefined {
  const promptCaching = asRecord(value);
  if (typeof promptCaching.supportsPromptCaching !== "boolean") return undefined;

  return {
    supportsPromptCaching: promptCaching.supportsPromptCaching,
    minimumTokensPerCacheCheckpoint: toNonNegativeInteger(
      promptCaching.minimumTokensPerCacheCheckpoint
    ),
    maximumCacheCheckpointsPerRequest: toNonNegativeInteger(
      promptCaching.maximumCacheCheckpointsPerRequest
    ),
  };
}

export type KiroModelsResult = {
  models: KiroModel[];
  /** "api" = live discovery; "fallback" = static catalog (offline/unauthed/error). */
  source: "api" | "fallback";
  /** Why the live catalog was not used — a code or an HTTP status, never a message. */
  failure?: DiscoveryFailure;
};

/**
 * Parse a CodeWhisperer `ListAvailableModels` response into managed model rows.
 * Only ids present in the live response are returned, which gives the exact
 * per-account / per-tier entitlement filtering.
 */
export function parseKiroModels(data: unknown): KiroModel[] {
  const payload = asRecord(data);
  const items = Array.isArray(payload.models)
    ? (payload.models as unknown[])
    : Array.isArray(payload.availableModels)
      ? (payload.availableModels as unknown[])
      : [];

  const seen = new Set<string>();
  const models: KiroModel[] = [];

  for (const value of items) {
    const item = asRecord(value);
    const id = toNonEmptyString(item.modelId) || toNonEmptyString(item.id);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    const name = toNonEmptyString(item.modelName) || toNonEmptyString(item.name) || id;
    const promptCaching = parsePromptCaching(item.promptCaching);
    models.push({ id, name, owned_by: "kiro", ...(promptCaching && { promptCaching }) });
  }

  return models;
}

function formatDisplayName(modelName: unknown, modelId: string, rateMultiplier: unknown): string {
  const base = toNonEmptyString(modelName) || modelId;
  const rate = Number(rateMultiplier);
  if (!Number.isFinite(rate) || Math.abs(rate - 1.0) < 1e-9 || rate <= 0) {
    return `Kiro ${base}`;
  }
  return `Kiro ${base} (${rate.toFixed(1)}x credit)`;
}

function buildVariants(upstream: string, displayName: string): KiroModel[] {
  const display = displayName || `Kiro ${upstream}`;
  const variants: KiroModel[] = [
    {
      id: upstream,
      name: display,
      owned_by: "kiro",
      capabilities: { thinking: false, agentic: false },
    },
  ];

  if (supportsKiroAdaptiveThinking(upstream)) {
    variants.push({
      id: `${upstream}-thinking`,
      name: `${display} (Thinking)`,
      owned_by: "kiro",
      capabilities: { thinking: true, agentic: false },
    });
  }

  return variants;
}

export function isObsoleteKiroModelAlias(modelId: unknown): boolean {
  if (typeof modelId !== "string") return false;
  if (modelId === "auto-kiro" || modelId.endsWith("-agentic")) return true;
  if (!modelId.endsWith("-thinking")) return false;
  const upstream = modelId.slice(0, -"-thinking".length);
  return !supportsKiroAdaptiveThinking(upstream);
}

function expandKiroModels(data: unknown): KiroModel[] {
  const payload = asRecord(data);
  const items = Array.isArray(payload.models)
    ? (payload.models as unknown[])
    : Array.isArray(payload.availableModels)
      ? (payload.availableModels as unknown[])
      : [];
  const expanded: KiroModel[] = [];
  const seen = new Set<string>();

  for (const value of items) {
    const item = asRecord(value);
    const upstreamId = toNonEmptyString(item.modelId) || toNonEmptyString(item.id);
    if (!upstreamId) continue;
    const display = formatDisplayName(item.modelName || item.name, upstreamId, item.rateMultiplier);
    const tokenLimits = asRecord(item.tokenLimits);
    // Only the upstream number. Stamping a 200k default here would be persisted as the
    // discovered window and pinned as an auto:discovery override over the registry /
    // models.dev window (claude-sonnet-5 is 1M).
    const maxInputTokens = Number(tokenLimits.maxInputTokens);
    const contextLength =
      Number.isFinite(maxInputTokens) && maxInputTokens > 0 ? maxInputTokens : undefined;
    const maxOutputTokens = Number(tokenLimits.maxOutputTokens);
    const outputTokenLimit =
      Number.isFinite(maxOutputTokens) && maxOutputTokens > 0 ? maxOutputTokens : undefined;
    const rateMultiplier = Number(item.rateMultiplier);
    const promptCaching = parsePromptCaching(item.promptCaching);

    for (const variant of buildVariants(upstreamId, display)) {
      if (seen.has(variant.id)) continue;
      seen.add(variant.id);
      expanded.push({
        ...variant,
        ...(contextLength ? { contextLength } : {}),
        ...(outputTokenLimit ? { outputTokenLimit } : {}),
        rateMultiplier: Number.isFinite(rateMultiplier) ? rateMultiplier : 1.0,
        upstreamModelId: upstreamId,
        description: toNonEmptyString(item.description) || "",
        ...(promptCaching && { promptCaching }),
      });
    }
  }

  return expanded;
}

/**
 * Derive the RUNTIME AWS region for a Kiro connection's model discovery. Delegates to the shared
 * resolver: the profileArn region wins (that is where the Q Developer profile + ListAvailableModels
 * live — us-east-1 / eu-central-1), then a valid stored profile region, else us-east-1. The IdC
 * token region (e.g. eu-north-1) is deliberately not used as a runtime region.
 */
export function resolveKiroRegion(providerSpecificData: unknown): string {
  return resolveKiroRuntimeRegion(
    asRecord(providerSpecificData) as { region?: unknown; profileArn?: unknown }
  );
}

/**
 * Build the ordered list of `ListAvailableModels` base URLs to try: the
 * region-matched Amazon Q host first, then the us-east-1 home region as a
 * fallback (CodeWhisperer's canonical region).
 */
export function buildKiroModelsEndpoints(region: string): string[] {
  const normalized = (toNonEmptyString(region) || "us-east-1").toLowerCase();
  const urls: string[] = [`https://q.${normalized}.amazonaws.com/ListAvailableModels`];
  if (normalized !== "us-east-1") {
    urls.push("https://q.us-east-1.amazonaws.com/ListAvailableModels");
  }
  return urls;
}

export type FetchKiroModelsOptions = {
  /** Stored Kiro access token (Bearer). */
  accessToken: string | null | undefined;
  /** Connection id: seeds the per-connection machineId and scopes the catalog cache. */
  connectionId?: string | null;
  /**
   * Identifies the egress (proxy) the catalog request leaves through. Kiro filters the
   * catalog by egress region, so the cache keeps one list per egress: switching a proxy on
   * or off must not serve the list fetched through the other one. Only hashed into the
   * cache key, never logged.
   */
  egressKey?: string | null;
  /** Connection providerSpecificData (region, profileArn). */
  providerSpecificData?: unknown;
  /** Injectable fetch (defaults to global fetch). */
  fetchImpl?: typeof fetch;
  /** Static catalog to fall back to when live discovery is unavailable. */
  fallbackModels?: Array<{ id: string; name?: string }>;
};

function toFallbackResult(
  fallbackModels: Array<{ id: string; name?: string }> | undefined,
  failure?: DiscoveryFailure
): KiroModelsResult {
  const models = (fallbackModels || [])
    .map((model) => {
      const id = toNonEmptyString(model.id);
      if (!id) return null;
      return {
        id,
        name: toNonEmptyString(model.name) || id,
        owned_by: "kiro",
      };
    })
    .filter((model): model is KiroModel => Boolean(model));
  return { models, source: "fallback", ...(failure ? { failure } : {}) };
}

function buildKiroCatalogHeaders(providerSpecificData: unknown, connectionId: unknown) {
  const psd = asRecord(providerSpecificData);
  const headers: Record<string, string> = {
    // Same Kiro IDE identity as inference (the IDE uses one for both clients).
    ...buildKiroUserAgentHeaders({ client: "runtime", machineId: kiroMachineId(connectionId) }),
    "x-amzn-kiro-agent-mode": "vibe",
    "x-amzn-codewhisperer-optout": "true",
    "amz-sdk-request": "attempt=1; max=1",
    Accept: "application/json",
  };

  if (psd.authMethod === "api_key") {
    headers.tokentype = "API_KEY";
  }
  if (isExternalIdpAuthMethod(psd.authMethod)) {
    headers[KIRO_EXTERNAL_IDP_TOKEN_TYPE_HEADER] = KIRO_EXTERNAL_IDP_TOKEN_TYPE_VALUE;
  }

  return headers;
}

function cacheKey(
  accessToken: string,
  providerSpecificData: unknown,
  connectionId: unknown,
  egressKey: unknown
): string {
  const psd = asRecord(providerSpecificData);
  // Connection first: connections of one IdC org share a profileArn but can egress through
  // different proxies, and Kiro filters the catalog by egress region.
  const seed =
    toNonEmptyString(connectionId) ||
    toNonEmptyString(psd.profileArn) ||
    toNonEmptyString(psd.clientId) ||
    accessToken ||
    "anonymous";
  const authMethod = toNonEmptyString(psd.authMethod) || "unknown";
  const egress = toNonEmptyString(egressKey) || "";
  return createHash("sha256").update(`kiro:${authMethod}:${seed}:${egress}`).digest("hex");
}

/**
 * One discovery attempt, every page of it: either the live models, or the reason the
 * attempt produced none. The reason is a code or an HTTP status — never a message. A page
 * that fails fails the attempt, like the Kiro IDE (a partial list would silently drop models).
 */
async function tryFetchModels(
  fetchImpl: typeof fetch,
  base: string,
  profileArn: string | null,
  accessToken: string,
  headers: Record<string, string>
): Promise<{ models: KiroModel[]; failure?: DiscoveryFailure }> {
  const items: unknown[] = [];
  let nextToken: string | null = null;
  try {
    for (let page = 0; page < KIRO_CATALOG_MAX_PAGES; page++) {
      const query = new URLSearchParams({ origin: "AI_EDITOR" });
      if (profileArn) query.set("profileArn", profileArn);
      if (nextToken) query.set("nextToken", nextToken);
      const response = await fetchImpl(`${base}?${query.toString()}`, {
        method: "GET",
        headers: {
          ...headers,
          "amz-sdk-invocation-id": uuidv4(),
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) return { models: [], failure: { status: response.status } };
      const data = asRecord(await response.json());
      const pageItems = Array.isArray(data.models)
        ? data.models
        : Array.isArray(data.availableModels)
          ? data.availableModels
          : [];
      items.push(...pageItems);
      nextToken = toNonEmptyString(data.nextToken);
      if (!nextToken) break;
    }
  } catch {
    return { models: [], failure: {} };
  }
  const models = expandKiroModels({ models: items });
  if (models.length === 0) return { models: [], failure: { code: "EMPTY_CATALOG" } };
  return { models };
}

/**
 * Discover the Kiro model catalog live via `ListAvailableModels`, falling back
 * to the static catalog when no token is available or every attempt fails.
 *
 * Attempt order (stops at the first success), as the Kiro IDE asks:
 *   1. `origin=AI_EDITOR&profileArn=...` on the region-matched endpoint. The profileArn is
 *      the stored one, else the Kiro IDE's fixed one (Builder ID, GitHub/Google), else one
 *      looked up for IdC / kiro-cli imports. With a current Kiro IDE version the origin-only
 *      call answers 400 "Invalid profileArn." for every login tested (live, 2026-11-16).
 *   2. `origin=AI_EDITOR` on each region-matched endpoint — no profileArn found, or the
 *      upstream rejected it.
 *
 * Kiro filters this list by egress region: from a region where Kiro does not serve Claude, the
 * profileArn call answers 200 with no Claude model, and Claude inference from there answers
 * INVALID_MODEL_ID. That short list is the real catalog for the connection, so a 200 with
 * models is never retried.
 */
export async function fetchKiroAvailableModels(
  options: FetchKiroModelsOptions
): Promise<KiroModelsResult> {
  const {
    accessToken,
    connectionId,
    egressKey,
    providerSpecificData,
    fetchImpl = fetch,
    fallbackModels,
  } = options;

  const token = toNonEmptyString(accessToken);
  if (!token) {
    return toFallbackResult(fallbackModels, { code: "NO_CREDENTIAL" });
  }

  const key = cacheKey(token, providerSpecificData, connectionId, egressKey);
  const cached = catalogCache.get(key);
  if (cached && cached.expiresAt > Date.now()) {
    return { models: cached.models, source: "api" };
  }

  const psd = asRecord(providerSpecificData);
  // A stored profileArn wins (the Kiro IDE also prefers a social login's own). Builder ID and
  // GitHub/Google logins without one use the IDE's fixed Kiro profile.
  let profileArn = toNonEmptyString(psd.profileArn) ?? fixedKiroProfileArn(psd);
  // kiro-cli imports and some IdC logins store no profileArn, and the origin-only call answers
  // IdC accounts 400 "Invalid profileArn." with a current Kiro IDE version. Look it up the way
  // the usage fetcher does. API keys have none; unknown legacy methods keep the previous
  // origin-only behavior. Not persisted: the catalog cache spares the repeat lookups.
  if (!profileArn && KIRO_PROFILE_LOOKUP_AUTH_METHODS.has(String(psd.authMethod))) {
    profileArn = toNonEmptyString(
      await discoverKiroProfileArnAcrossRegions(token, toNonEmptyString(psd.region), fetchImpl)
    );
  }
  const region = resolveKiroRegion(profileArn ? { ...psd, profileArn } : psd);
  const endpoints = buildKiroModelsEndpoints(region);
  const headers = buildKiroCatalogHeaders(providerSpecificData, connectionId);
  // The first attempt that produced no model explains the fallback.
  let failure: DiscoveryFailure | undefined;

  const attempts: Array<{ base: string; profileArn: string | null }> = [
    ...(profileArn ? [{ base: endpoints[0], profileArn }] : []),
    ...endpoints.map((base) => ({ base, profileArn: null })),
  ];
  for (const { base, profileArn: arn } of attempts) {
    const attempt = await tryFetchModels(fetchImpl, base, arn, token, headers);
    if (attempt.models.length > 0) {
      catalogCache.set(key, { expiresAt: Date.now() + CACHE_TTL_MS, models: attempt.models });
      return { models: attempt.models, source: "api" };
    }
    failure = failure ?? attempt.failure;
  }

  return toFallbackResult(fallbackModels, failure ?? { code: "EMPTY_CATALOG" });
}

export function clearKiroModelCache(): void {
  catalogCache.clear();
}
