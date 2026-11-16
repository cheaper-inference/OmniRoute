/**
 * ChatPlayground Models & Wire Contract
 *
 * Unified web API (verified live 2026-11-16): the per-endpoint surface
 * (`app.chatplayground.ai/api/chat/{azure,lmsys,perplexity}`) was replaced by a
 * single route `POST https://web.chatplayground.ai/api/chat` whose body is
 * `{modelSlug, submissionId, message:{text,attachments?}, noSave?, conversationId?}`
 * and whose reply is an AI-SDK JSON stream (`start`/`text-delta`/`finish` + `[DONE]`)
 * on both `accept: application/json` and `accept: text/event-stream`.
 *
 * The live catalog (`GET /api/models`, unauthenticated) now returns
 * `{slug, displayName, provider, group, tier, capabilities, ...}` rows — the
 * `botId`/`modelName`/`endpoint`/`creditWeight` schema is gone, and the only
 * non-chat rows are `group:"image"` models which `/api/chat` rejects
 * (`MODEL_NOT_FOUND`), so discovery keeps `group:"chat"` rows only.
 */

import type { UsageQuota } from "./usage/quota.ts";

/** Catalog group as reported by the live GET /api/models rows ("chat"/"image" today; legacy rows used others, e.g. "audio"). */
export type ChatPlaygroundGroup = "chat" | "image" | (string & {});
/** Catalog tier as reported by the live GET /api/models rows. */
export type ChatPlaygroundTier = "basic" | "advanced";
export interface ChatPlaygroundCapabilities {
  vision: boolean;
  fileInput: boolean;
  reasoning: boolean;
  imageGen: boolean;
}

export interface ChatPlaygroundModel {
  /** Current wire id (the live `slug`). */
  slug: string;
  displayName: string;
  provider: string;
  group: ChatPlaygroundGroup;
  tier: ChatPlaygroundTier;
  active: boolean;
  premiumOnly: boolean;
  capabilities: ChatPlaygroundCapabilities;
  /** Legacy `botId` value when the row predates the unified API, else slug. */
  id: string;
  /** Legacy `modelName` value when the row predates the unified API, else slug. */
  modelName: string;
  contextLength?: number;
  /** Legacy cost weight from the pre-unified catalog rows. */
  creditWeight?: number;
}

export const CHATPLAYGROUND_API_BASE = "https://web.chatplayground.ai/api";
export const CHATPLAYGROUND_CHAT_URL = `${CHATPLAYGROUND_API_BASE}/chat`;
export const CHATPLAYGROUND_MODELS_URL = `${CHATPLAYGROUND_API_BASE}/models`;
export const CHATPLAYGROUND_ME_URL = `${CHATPLAYGROUND_API_BASE}/me`;
export const CHATPLAYGROUND_WEB_ORIGIN = "https://web.chatplayground.ai";

export const CHATPLAYGROUND_DEFAULT_CONTEXT = 128_000;
const CHATPLAYGROUND_VISION_CONTEXT = 1_000_000;
const CHATPLAYGROUND_IMAGE_GEN_CONTEXT = 65_536;
const LEGACY_CONTEXT_BY_SLUG: Record<string, number> = { "claude-fable-5-1": 200_000 };

function contextForCapabilities(caps: ChatPlaygroundCapabilities): number {
  if (caps.imageGen) return CHATPLAYGROUND_IMAGE_GEN_CONTEXT;
  if (caps.vision) return CHATPLAYGROUND_VISION_CONTEXT;
  return CHATPLAYGROUND_DEFAULT_CONTEXT;
}

/** Coerce one live or legacy catalog row into the normalized model shape. */
function readChatPlaygroundRowFields(rec: Record<string, unknown>): {
  key: string;
  displayName: string;
  provider: string;
  group: ChatPlaygroundGroup;
  tier: ChatPlaygroundTier;
  legacyModelName: string;
  creditWeight: number | undefined;
  capabilities: ChatPlaygroundCapabilities;
} | null {
  const slug = typeof rec.slug === "string" ? rec.slug.trim() : "";
  const legacyId = typeof rec.botId === "string" ? rec.botId.trim() : "";
  const key = slug || legacyId;
  if (!key) return null;
  const legacyModelName = (typeof rec.modelName === "string" ? rec.modelName.trim() : "") || key;
  const display = typeof rec.displayName === "string" ? rec.displayName.trim() : "";
  const caps = (rec.capabilities || {}) as Record<string, unknown>;
  return {
    key,
    displayName: display || legacyModelName,
    provider: typeof rec.provider === "string" ? rec.provider.trim() : "",
    group:
      typeof rec.group === "string" && rec.group.trim()
        ? rec.group.trim().toLowerCase()
        : "chat",
    tier: rec.tier === "advanced" ? "advanced" : "basic",
    legacyModelName,
    creditWeight: typeof rec.creditWeight === "number" ? rec.creditWeight : undefined,
    capabilities: {
      vision: caps.vision === true,
      fileInput: caps.fileInput === true,
      reasoning: caps.reasoning === true,
      imageGen: caps.imageGen === true,
    },
  };
}

/**
 * Build one catalog row. Accepts both the current live schema (`slug`,
 * `displayName`, `group`, `tier`, `capabilities`) and the legacy schema
 * (`botId`, `modelName`, `endpoint`, `creditWeight`), so rows from either API
 * generation normalize to the same shape. The legacy pair (id, modelName) is
 * preserved for old client traffic until the deprecation window closes.
 */
export function buildChatPlaygroundRow(item: unknown): ChatPlaygroundModel | null {
  if (!item || typeof item !== "object" || Array.isArray(item)) return null;
  const fields = readChatPlaygroundRowFields(item as Record<string, unknown>);
  if (!fields) return null;
  const rec = item as Record<string, unknown>;
  return {
    slug: fields.key,
    displayName: fields.displayName,
    provider: fields.provider,
    group: fields.group,
    tier: fields.tier,
    active: rec.active === undefined ? true : rec.active === true,
    premiumOnly: rec.premiumOnly === true,
    capabilities: fields.capabilities,
    id: fields.key,
    modelName: fields.legacyModelName,
    contextLength:
      typeof rec.contextWindow === "number"
        ? rec.contextWindow
        : LEGACY_CONTEXT_BY_SLUG[fields.key] ?? contextForCapabilities(fields.capabilities),
    creditWeight: fields.creditWeight,
  };
}

function legacyRow(
  slug: string,
  displayName: string,
  provider: string,
  group: ChatPlaygroundGroup,
  tier: ChatPlaygroundTier,
  premiumOnly: boolean,
  capabilities: ChatPlaygroundCapabilities
): ChatPlaygroundModel {
  return buildChatPlaygroundRow({
    slug,
    displayName,
    provider,
    group,
    tier,
    premiumOnly,
    capabilities,
  }) as ChatPlaygroundModel;
}

const c = (vision: boolean, fileInput: boolean, reasoning: boolean, imageGen: boolean) => ({
  vision,
  fileInput,
  reasoning,
  imageGen,
});

/**
 * Offline fallback catalog — mirrors `GET /api/models` captured 2026-11-16
 * (28 chat + 2 image rows). Runtime discovery overrides this list; keep it in
 * sync with the live catalog because `resolveChatPlaygroundModel` uses it
 * whenever discovery is unavailable.
 */
export const CHATPLAYGROUND_FALLBACK_MODELS: ChatPlaygroundModel[] = [
  legacyRow("gpt-6.1-sol", "ChatGPT-6.1 Sol", "openai", "chat", "advanced", true, c(true, false, false, false)),
  legacyRow("gpt-6-luna", "ChatGPT-6 Luna", "openai", "chat", "basic", false, c(true, false, false, false)),
  legacyRow("gemini-3.5-flash-lite", "Gemini (Latest Model)", "google", "chat", "basic", false, c(true, false, false, false)),
  legacyRow("gemini-3.8-flash", "Gemini 3.8 Flash", "google", "chat", "basic", true, c(true, false, false, false)),
  legacyRow("gemini-3.1-pro", "Gemini 3.1 Pro", "google", "chat", "advanced", true, c(true, false, false, false)),
  legacyRow("claude-opus-5-5", "Claude Opus 5.5", "anthropic", "chat", "advanced", true, c(true, false, false, false)),
  legacyRow("claude-haiku-5-5", "Claude (Latest Model)", "anthropic", "chat", "basic", false, c(true, false, false, false)),
  legacyRow("claude-sonnet-5-5", "Claude Sonnet 5.5", "anthropic", "chat", "advanced", true, c(true, false, false, false)),
  legacyRow("claude-fable-5-2", "Claude Fable 5.2", "anthropic", "chat", "advanced", true, c(true, false, false, false)),
  legacyRow("kimi-k3", "Kimi K3", "kimi", "chat", "advanced", true, c(true, false, true, false)),
  legacyRow("deepseek-v4-pro", "DeepSeek V4 Pro", "deepseek", "chat", "basic", false, c(false, false, true, false)),
  legacyRow("deepseek-v4.1-flash", "DeepSeek V4.1 Flash", "deepseek", "chat", "basic", false, c(false, false, true, false)),
  legacyRow("deepseek-r1", "DeepSeek R1", "deepseek", "chat", "basic", false, c(false, false, true, false)),
  legacyRow("llama-4-maverick", "Llama 4 Maverick", "meta", "chat", "basic", false, c(true, false, false, false)),
  legacyRow("llama-4-scout", "Llama 4 Scout", "meta", "chat", "basic", false, c(true, false, false, false)),
  legacyRow("minimax-m3", "MiniMax M3", "minimax", "chat", "basic", false, c(false, false, false, false)),
  legacyRow("qwen3.8-max", "Qwen3.8 Max", "qwen", "chat", "advanced", true, c(false, false, true, false)),
  legacyRow("qwen3.7-plus", "Qwen3.7 Plus", "qwen", "chat", "basic", false, c(false, false, true, false)),
  legacyRow("qwen3.6-flash", "Qwen3.6 Flash", "qwen", "chat", "basic", false, c(false, false, true, false)),
  legacyRow("nova-2-lite-v1", "Nova 2 Lite", "amazon", "chat", "basic", false, c(true, false, false, false)),
  legacyRow("mimo-v2.6-pro", "MiMo V2.6 Pro", "xiaomi", "chat", "basic", false, c(false, false, false, false)),
  legacyRow("hy3", "Hy3", "tencent", "chat", "basic", false, c(false, false, false, false)),
  legacyRow("grok-4.7", "Grok 4.7", "xai", "chat", "basic", false, c(true, false, false, false)),
  legacyRow("glm-5.3", "GLM 5.3", "xai", "chat", "basic", true, c(false, false, false, false)),
  legacyRow("glm-5.3-flash", "GLM 5.3 Flash", "zai", "chat", "basic", false, c(false, false, false, false)),
  legacyRow("perplexity-sonar-pro", "Perplexity Sonar Pro", "perplexity", "chat", "advanced", true, c(false, false, false, false)),
  legacyRow("perplexity-sonar", "Perplexity Sonar", "perplexity", "chat", "basic", false, c(false, false, false, false)),
  legacyRow("command-a-plus", "Command A+", "cohere", "chat", "basic", false, c(false, false, false, false)),
];

/**
 * Strip client/routing prefixes like `chatplayground/`, `cpl/`, `cpl.`, `cp.` from model IDs.
 * Loops so chained prefixes (e.g. `cpl/chatplayground/gpt-6-luna`) collapse fully.
 */
export function stripChatPlaygroundPrefix(model: string): string {
  let cleaned = (model || "").trim();
  let changed = true;

  while (changed) {
    changed = false;
    for (const prefix of ["chatplayground/", "cpl/", "cpl.", "cp.", "cpl:", "cp:"]) {
      if (cleaned.toLowerCase().startsWith(prefix)) {
        cleaned = cleaned.slice(prefix.length);
        changed = true;
      }
    }
  }

  return cleaned;
}

function asUnknownArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function extractRawModelList(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== "object") return [];
  const rec = data as Record<string, unknown>;
  const fromData = asUnknownArray(rec.data);
  if (fromData.length > 0) return fromData;
  return asUnknownArray(rec.models);
}

/**
 * Build a full ChatPlaygroundModel from one catalog item (either schema).
 * Returns null for unusable rows or duplicates; image-group rows are dropped
 * for chat routing (`/api/chat` rejects them with MODEL_NOT_FOUND).
 */
function buildCatalogModel(item: unknown, seen: Set<string>): ChatPlaygroundModel | null {
  const row = buildChatPlaygroundRow(item);
  if (!row || row.group !== "chat" || seen.has(row.slug)) return null;
  seen.add(row.slug);
  return row;
}

/**
 * Live catalog cache (10-minute TTL). The live GET /api/models is
 * unauthenticated, so requests can build their routing row from the current
 * roster without shipping a static model list; the offline fallback catalog
 * covers discovery outages.
 */
const CATALOG_TTL_MS = 10 * 60_000;
let catalogCache: { models: ChatPlaygroundModel[]; fetchedAt: number } | null = null;
let catalogInflight: Promise<ChatPlaygroundModel[]> | null = null;

/**
 * Resolve the current live model catalog, with a 10-minute in-memory cache and
 * a single in-flight guard. On any fetch/parse failure it falls back to the
 * last good live catalog, or the offline fallback catalog if none was loaded.
 * The returned array is a safe reference — callers must not mutate it.
 */
export async function fetchChatPlaygroundModels(): Promise<ChatPlaygroundModel[]> {
  const now = Date.now();
  if (catalogCache && now - catalogCache.fetchedAt < CATALOG_TTL_MS) {
    return catalogCache.models;
  }
  if (catalogInflight) return catalogInflight;
  catalogInflight = (async () => {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 15_000);
      let res: Response;
      try {
        res = await fetch(CHATPLAYGROUND_MODELS_URL, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Origin: CHATPLAYGROUND_WEB_ORIGIN,
            Referer: `${CHATPLAYGROUND_WEB_ORIGIN}/`,
          },
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timer);
      }
      if (res.ok) {
        const data: unknown = await res.json();
        const seen = new Set<string>();
        const models = extractRawModelList(data)
          .map((item) => buildCatalogModel(item, seen))
          .filter((m): m is ChatPlaygroundModel => m !== null);
        if (models.length > 0) {
          catalogCache = { models, fetchedAt: Date.now() };
          return models;
        }
      }
    } catch {
      // discovery outage (network, timeout, malformed payload) — fall through
    }
    return catalogCache?.models ?? CHATPLAYGROUND_FALLBACK_MODELS;
  })();
  try {
    return await catalogInflight;
  } finally {
    catalogInflight = null;
  }
}

/** Drop the in-memory live catalog cache (testing / config changes). */
export function clearChatPlaygroundCatalogCache(): void {
  catalogCache = null;
  catalogInflight = null;
}

/** Test hook: age the cached catalog past its TTL so the next call refetches. */
export function expireChatPlaygroundCatalogForTest(): void {
  if (catalogCache) catalogCache.fetchedAt = 0;
}

/** A nested object section of a payload, or an empty record when absent. */
function section(rec: Record<string, unknown>, key: string): Record<string, unknown> {
  const value = rec[key];
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

/** The first value that is a non-empty string. */
function firstString(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === "string" && value) return value;
  }
  return "";
}

/**
 * Resolve the account view from a GET /api/me payload. The plan name lives on
 * `plan.displayName`, falling back to the entitlement and the user subscription.
 */
export function resolveChatPlaygroundAccount(data: unknown): {
  plan: string;
  user: Record<string, unknown>;
} {
  const rec = (data && typeof data === "object" ? data : {}) as Record<string, unknown>;
  const user = (
    rec.user && typeof rec.user === "object" ? rec.user : rec
  ) as Record<string, unknown>;
  const plan = firstString(
    section(rec, "plan").displayName,
    section(rec, "entitlement").planName,
    section(user, "subscription").name
  );
  return { plan: plan || "ChatPlayground", user };
}

/** One usage bucket (`used`/`limit`/`periodEnd`) as an OmniRoute quota entry. */
function quotaFromBucket(key: string, raw: unknown, plan: string): UsageQuota {
  const bucket = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const used = typeof bucket.used === "number" ? bucket.used : 0;
  const resetAt =
    typeof bucket.periodEnd === "string" || typeof bucket.periodEnd === "number"
      ? String(bucket.periodEnd)
      : null;
  const displayName = `${plan} ${key}`;
  if (typeof bucket.limit === "number") {
    const remaining = Math.max(0, bucket.limit - used);
    return {
      used,
      total: bucket.limit,
      remaining,
      remainingPercentage: bucket.limit > 0 ? Math.round((remaining / bucket.limit) * 1000) / 10 : 0,
      resetAt,
      unlimited: false,
      displayName,
    };
  }
  // "unlimited" (or an absent limit): report usage without inventing an allowance.
  return { used, total: 0, unlimited: true, resetAt, displayName };
}

/**
 * Build the provider quotas map from a usage payload. The unified response
 * exposes `usage.{dailyQueries,pro,documents,images}` buckets whose `limit` may
 * be a number or the string `"unlimited"`. A payload without `usage` buckets
 * yields an empty map (no quota is reported rather than a fabricated one).
 */
export function buildChatPlaygroundUsageQuotas(data: unknown): Record<string, UsageQuota> {
  const rec = (data && typeof data === "object" ? data : {}) as Record<string, unknown>;
  const usage = (rec.usage && typeof rec.usage === "object" ? rec.usage : {}) as Record<
    string,
    unknown
  >;
  const quotas: Record<string, UsageQuota> = {};
  const plan = resolveChatPlaygroundAccount(data).plan;
  for (const [key, raw] of Object.entries(usage)) {
    quotas[key] = quotaFromBucket(key, raw, plan);
  }
  return quotas;
}

type DiscoveryEntry = { id: string; name: string; owned_by: string; provider?: string };

/**
 * Parse raw /api/models JSON (either schema) into discovery catalog entries
 * (chat rows only).
 */
export function parseChatPlaygroundDiscoveryModels(data: unknown): DiscoveryEntry[] {
  const seen = new Set<string>();
  const models: DiscoveryEntry[] = [];
  for (const item of extractRawModelList(data)) {
    const row = buildChatPlaygroundRow(item);
    if (!row || row.group !== "chat" || seen.has(row.slug)) continue;
    seen.add(row.slug);
    const entry: DiscoveryEntry = {
      id: row.slug,
      name: row.displayName,
      owned_by: "chatplayground",
    };
    if (row.provider) entry.provider = row.provider;
    models.push(entry);
  }
  return models;
}

/** Discovery config for `/api/providers/{id}/models` (chatplayground + cpl alias). */
export function buildChatPlaygroundModelsDiscoveryEntry(): {
  url: string;
  method: "GET";
  headers: Record<string, string>;
  parseResponse: typeof parseChatPlaygroundDiscoveryModels;
} {
  return {
    url: CHATPLAYGROUND_MODELS_URL,
    method: "GET",
    headers: {
      Accept: "application/json",
      Origin: CHATPLAYGROUND_WEB_ORIGIN,
      Referer: `${CHATPLAYGROUND_WEB_ORIGIN}/`,
    },
    parseResponse: parseChatPlaygroundDiscoveryModels,
  };
}

/**
 * Resolve client model string to a ChatPlayground model definition.
 * Validates against catalog and returns null for unrecognized/invalid models
 * (no synthesis fallback).
 */
export function resolveChatPlaygroundModel(
  requestedModel: string,
  catalog: ChatPlaygroundModel[] = CHATPLAYGROUND_FALLBACK_MODELS
): ChatPlaygroundModel | null {
  const stripped = stripChatPlaygroundPrefix(requestedModel).toLowerCase();
  if (!stripped) return null;

  // 1. Direct slug (current wire id) / legacy id / legacy modelName match
  const byId = catalog.find((m) => m.slug.toLowerCase() === stripped);
  if (byId) return byId;

  const byLegacyId = catalog.find((m) => m.id.toLowerCase() === stripped);
  if (byLegacyId) return byLegacyId;

  const byModelName = catalog.find((m) => m.modelName.toLowerCase() === stripped);
  if (byModelName) return byModelName;

  // 2. Direct displayName match
  const byName = catalog.find((m) => m.displayName.toLowerCase() === stripped);
  if (byName) return byName;

  // 3. Suffix match (e.g. "openai/gpt-6-luna" -> "gpt-6-luna")
  if (stripped.includes("/")) {
    const afterSlash = stripped.split("/").pop()!;
    const match = resolveChatPlaygroundModel(afterSlash, catalog);
    if (match) return match;
  }

  // Reject unrecognized models without fallback synthesis
  return null;
}
