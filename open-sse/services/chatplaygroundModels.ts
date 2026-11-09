/**
 * ChatPlayground Models Service
 *
 * Provides dynamic model discovery from app.chatplayground.ai/api/models,
 * fallback catalog definitions, endpoint routing, and model ID resolution.
 */

export type ChatPlaygroundEndpoint = "azure" | "lmsys" | "perplexity";

export interface ChatPlaygroundModel {
  id: string;
  name: string;
  modelName: string;
  /** Upstream vendor as reported by /api/models (e.g. "google", "OpenAI"). Azure model routing uses it. */
  provider?: string;
  endpoint: ChatPlaygroundEndpoint;
  active: boolean;
  creditWeight: number;
  premiumOnly: boolean;
  contextLength?: number;
}

export const CHATPLAYGROUND_API_BASE = "https://app.chatplayground.ai/api";
export const CHATPLAYGROUND_MODELS_URL = `${CHATPLAYGROUND_API_BASE}/models`;
export const CHATPLAYGROUND_USER_URL = `${CHATPLAYGROUND_API_BASE}/user`;
export const CHATPLAYGROUND_WEB_ORIGIN = "https://web.chatplayground.ai";

export const CHATPLAYGROUND_DEFAULT_CONTEXT = 128_000;

/**
 * Offline fallback catalog — mirrors GET /api/models (botId / modelName / endpoint /
 * creditWeight) captured 2026-10-20. Runtime discovery overrides this list; keep it in
 * sync with the live catalog because routing decisions (endpoint, upstream model name)
 * are derived from these rows when discovery is unavailable.
 */
export const CHATPLAYGROUND_FALLBACK_MODELS: ChatPlaygroundModel[] = [
  // Azure Endpoint Models
  {
    id: "gpt-6.1-sol",
    name: "ChatGPT-6.1 Sol",
    modelName: "gpt-6.1-sol",
    provider: "OpenAI",
    endpoint: "azure",
    active: true,
    creditWeight: 5,
    premiumOnly: true,
    contextLength: 128_000,
  },
  {
    id: "gpt-6-luna",
    name: "ChatGPT-6 Luna",
    modelName: "gpt-6-luna",
    provider: "OpenAI",
    endpoint: "azure",
    active: true,
    creditWeight: 1,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "gemini-3.8-flash-l",
    name: "Gemini (Latest Model)",
    modelName: "gemini-3.8-flash",
    provider: "google",
    endpoint: "azure",
    active: true,
    creditWeight: 2,
    premiumOnly: false,
    contextLength: 1_000_000,
  },
  {
    id: "gemini-3.8-flash",
    name: "Gemini 3.8 Flash",
    modelName: "gemini-3.8-flash",
    provider: "google",
    endpoint: "azure",
    active: false,
    creditWeight: 3,
    premiumOnly: true,
    contextLength: 1_000_000,
  },
  {
    id: "gemini-3.1-pro",
    name: "Gemini 3.1 Pro",
    modelName: "gemini-3.1-pro-preview",
    provider: "google",
    endpoint: "azure",
    active: false,
    creditWeight: 3,
    premiumOnly: true,
    contextLength: 1_000_000,
  },
  {
    id: "claude-opus-5-5",
    name: "Claude Opus 5.5",
    modelName: "claude-opus-5-5",
    provider: "anthropic",
    endpoint: "azure",
    active: false,
    creditWeight: 10,
    premiumOnly: true,
    contextLength: 200_000,
  },
  {
    id: "claude-haiku-5-5",
    name: "Claude (Latest Model)",
    modelName: "claude-haiku-5-5",
    provider: "anthropic",
    endpoint: "azure",
    active: true,
    creditWeight: 7,
    premiumOnly: false,
    contextLength: 200_000,
  },
  {
    id: "claude-sonnet-5-5",
    name: "Claude Sonnet 5.5",
    modelName: "claude-sonnet-5-5",
    provider: "anthropic",
    endpoint: "azure",
    active: true,
    creditWeight: 10,
    premiumOnly: true,
    contextLength: 200_000,
  },
  {
    id: "claude-fable-5-1",
    name: "Claude Fable 5.1",
    modelName: "claude-fable-5-1",
    provider: "anthropic",
    endpoint: "azure",
    active: false,
    creditWeight: 10,
    premiumOnly: true,
    contextLength: 200_000,
  },
  // kimi-k2.6 is served through the Azure endpoint (unlike kimi-k3 on lmsys)
  {
    id: "kimi-k2.6",
    name: "Kimi K",
    modelName: "kimi-k2.6",
    provider: "kimi",
    endpoint: "azure",
    active: true,
    creditWeight: 1,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    modelName: "deepseek-v4-pro",
    provider: "deepseek",
    endpoint: "azure",
    active: true,
    creditWeight: 1,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "deepseek-v4-flash",
    name: "DeepSeek V4 Flash",
    modelName: "deepseek-v4-flash",
    provider: "deepseek",
    endpoint: "azure",
    active: true,
    creditWeight: 1,
    premiumOnly: false,
    contextLength: 128_000,
  },
  // grok-4.6 retired from the live catalog (2026-10-21); grok-4.7 is now served on azure
  {
    id: "grok-4.6",
    name: "Grok 4.6",
    modelName: "grok-4.6",
    provider: "xAI",
    endpoint: "azure",
    active: false,
    creditWeight: 2,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "mistral-large-3",
    name: "Mistral Large 3",
    modelName: "mistral-large-3",
    provider: "mistral",
    endpoint: "azure",
    active: true,
    creditWeight: 1,
    premiumOnly: false,
    contextLength: 128_000,
  },

  // LMSYS Endpoint Models
  {
    id: "kimi-k3",
    name: "Kimi K3",
    modelName: "kimi-k3",
    provider: "kimi",
    endpoint: "lmsys",
    active: true,
    creditWeight: 5,
    premiumOnly: true,
    contextLength: 128_000,
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    modelName: "deepseek/deepseek-r1-0528",
    provider: "deepseek",
    endpoint: "lmsys",
    active: false,
    creditWeight: 1,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "llama-4-maverick",
    name: "Llama 4 Maverick",
    modelName: "meta-llama/llama-4-maverick",
    provider: "meta",
    endpoint: "lmsys",
    active: false,
    creditWeight: 1,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "llama-4-scout",
    name: "Llama 4 Scout",
    modelName: "meta-llama/llama-4-scout-17b-16e-instruct",
    provider: "meta",
    endpoint: "lmsys",
    active: true,
    creditWeight: 1,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "command-a",
    name: "Command A",
    modelName: "cohere/command-a",
    provider: "Cohere",
    endpoint: "lmsys",
    active: true,
    creditWeight: 1,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "command-r-plus",
    name: "Command R Plus",
    modelName: "cohere/command-r-plus-08-2024",
    provider: "cohere",
    endpoint: "lmsys",
    active: false,
    creditWeight: 1,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "minimax-m3",
    name: "MiniMax M3",
    modelName: "minimax/minimax-m3",
    provider: "MiniMax",
    endpoint: "lmsys",
    active: false,
    creditWeight: 1,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "qwen3.8-max",
    name: "Qwen 3.8 Max",
    modelName: "qwen/qwen3.8-max",
    provider: "Qwen",
    endpoint: "lmsys",
    active: true,
    creditWeight: 1,
    premiumOnly: true,
    contextLength: 128_000,
  },
  {
    id: "qwen3.7-plus",
    name: "Qwen 3.7 Plus",
    modelName: "qwen/qwen3.7-plus",
    provider: "Qwen",
    endpoint: "lmsys",
    active: true,
    creditWeight: 1,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "qwen3.6-flash",
    name: "Qwen 3.6 Flash",
    modelName: "qwen/qwen3.6-flash",
    provider: "Qwen",
    endpoint: "lmsys",
    active: false,
    creditWeight: 1,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "nova-2-lite-v1",
    name: "Nova 2 Lite",
    modelName: "amazon/nova-2-lite-v1",
    provider: "Amazon",
    endpoint: "lmsys",
    active: true,
    creditWeight: 1,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "mimo-v2.6-pro",
    name: "MiMo V2.6 Pro",
    modelName: "xiaomi/mimo-v2.6-pro",
    provider: "Xiaomi",
    endpoint: "lmsys",
    active: false,
    creditWeight: 1,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "hy3",
    name: "HY3",
    modelName: "tencent/hy3",
    provider: "Tencent",
    endpoint: "lmsys",
    active: false,
    creditWeight: 1,
    premiumOnly: false,
    contextLength: 128_000,
  },
  // grok-4.7 moved from lmsys to azure in the live catalog (2026-10-21)
  {
    id: "grok-4.7",
    name: "Grok 4.7",
    modelName: "grok-4.7",
    provider: "xAI",
    endpoint: "azure",
    active: true,
    creditWeight: 2,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "glm-5.3",
    name: "GLM 5.3",
    modelName: "z-ai/glm-5.3",
    provider: "XAi",
    endpoint: "lmsys",
    active: true,
    creditWeight: 2,
    premiumOnly: true,
    contextLength: 128_000,
  },
  {
    id: "glm-5.3-flash",
    name: "GLM 5.3 Flash",
    modelName: "z-ai/glm-5.3-flash",
    provider: "ZAi",
    endpoint: "lmsys",
    active: true,
    creditWeight: 2,
    premiumOnly: false,
    contextLength: 128_000,
  },

  // Perplexity Endpoint Models
  {
    id: "perplexity-sonar-reasoning-pro",
    name: "Sonar Reasoning Pro",
    modelName: "sonar-reasoning-pro",
    provider: "perplexity",
    endpoint: "perplexity",
    active: false,
    creditWeight: 1,
    premiumOnly: true,
    contextLength: 128_000,
  },
  {
    id: "perplexity-sonar-pro",
    name: "Sonar Pro",
    modelName: "sonar-pro",
    provider: "perplexity",
    endpoint: "perplexity",
    active: true,
    creditWeight: 1,
    premiumOnly: true,
    contextLength: 128_000,
  },
  {
    id: "perplexity-sonar",
    name: "Sonar",
    modelName: "sonar",
    provider: "perplexity",
    endpoint: "perplexity",
    active: false,
    creditWeight: 1,
    premiumOnly: false,
    contextLength: 128_000,
  },
];

/**
 * Strip client/routing prefixes like `chatplayground/`, `cpl/`, `cpl.`, `cp.` from model IDs.
 * Loops so chained prefixes (e.g. `cpl/chatplayground/gpt-4o`) collapse fully.
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

type ChatPlaygroundEndpointHints = {
  endpoint: string;
  provider: string;
  botId: string;
};

const EXPLICIT_ENDPOINTS = new Set<ChatPlaygroundEndpoint>(["azure", "lmsys", "perplexity"]);
const LMSYS_PROVIDERS = [
  "lmsys",
  "together",
  "anyscale",
  "groq",
  "meta",
  "mistral",
  "qwen",
  "deepseek",
];
const LMSYS_KEYWORDS = ["llama", "qwen", "glm", "minimax", "command", "kimi"];

function readEndpointHints(
  modelInfo:
    | {
        endpoint?: string;
        provider?: string;
        botId?: string;
        modelName?: string;
      }
    | string
): ChatPlaygroundEndpointHints {
  if (typeof modelInfo === "string") {
    return { endpoint: "", provider: "", botId: modelInfo.toLowerCase().trim() };
  }
  if (!modelInfo || typeof modelInfo !== "object") {
    return { endpoint: "", provider: "", botId: "" };
  }
  return {
    endpoint: (modelInfo.endpoint || "").toLowerCase().trim(),
    provider: (modelInfo.provider || "").toLowerCase().trim(),
    botId: (modelInfo.botId || modelInfo.modelName || "").toLowerCase().trim(),
  };
}

function isPerplexityHint(provider: string, botId: string): boolean {
  return provider === "perplexity" || botId.includes("sonar") || botId.includes("perplexity");
}

function isLmsysHint(provider: string, botId: string): boolean {
  return (
    LMSYS_PROVIDERS.some((p) => provider.includes(p)) ||
    LMSYS_KEYWORDS.some((k) => botId.includes(k))
  );
}

/**
 * Determine the upstream ChatPlayground endpoint for a model.
 */
export function resolveChatPlaygroundEndpoint(
  modelInfo:
    | {
        endpoint?: string;
        provider?: string;
        botId?: string;
        modelName?: string;
      }
    | string
): ChatPlaygroundEndpoint {
  const { endpoint, provider, botId } = readEndpointHints(modelInfo);
  if (EXPLICIT_ENDPOINTS.has(endpoint as ChatPlaygroundEndpoint)) {
    return endpoint as ChatPlaygroundEndpoint;
  }
  if (isPerplexityHint(provider, botId)) return "perplexity";
  if (isLmsysHint(provider, botId)) return "lmsys";
  return "azure";
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

function trimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Resolve the context length from a live /api/models row, with a safe default. */
function resolveContextLength(rec: Record<string, unknown>): number {
  if (typeof rec.contextWindow === "number") return rec.contextWindow;
  if (typeof rec.maxTokens === "number") return rec.maxTokens;
  return CHATPLAYGROUND_DEFAULT_CONTEXT;
}

/**
 * Build a full ChatPlaygroundModel from one live /api/models item. Returns null
 * for unusable rows (missing botId, non-chat group).
 */
function buildCatalogModel(item: unknown, seen: Set<string>): ChatPlaygroundModel | null {
  if (!item || typeof item !== "object") return null;
  const rec = item as Record<string, unknown>;
  const botId = trimmedString(rec.botId);
  if (!botId || seen.has(botId)) return null;
  if (rec.group && rec.group !== "chat") return null;
  seen.add(botId);
  const modelName = trimmedString(rec.modelName) || botId;
  const name = trimmedString(rec.displayName) || modelName;
  const provider = trimmedString(rec.provider);
  const endpointHint = trimmedString(rec.endpoint).toLowerCase();
  const endpoint = resolveChatPlaygroundEndpoint({
    endpoint: endpointHint || undefined,
    provider: provider || undefined,
    botId,
  });
  const active = rec.active === undefined ? true : rec.active === true;
  return {
    id: botId,
    name,
    modelName,
    provider: provider || undefined,
    endpoint,
    active,
    creditWeight: typeof rec.creditWeight === "number" ? rec.creditWeight : 1,
    premiumOnly: rec.premiumOnly === true,
    contextLength: resolveContextLength(rec),
  };
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

function parseDiscoveryItem(
  item: unknown,
  seen: Set<string>
): { id: string; name: string; owned_by: string; provider?: string } | null {
  if (!item || typeof item !== "object") return null;
  const rec = item as Record<string, unknown>;
  const botId = trimmedString(rec.botId);
  if (!botId || seen.has(botId)) return null;
  if (rec.group && rec.group !== "chat") return null;
  seen.add(botId);
  const modelName = trimmedString(rec.modelName) || botId;
  const name = trimmedString(rec.displayName) || modelName;
  const provider = trimmedString(rec.provider);
  const entry: { id: string; name: string; owned_by: string; provider?: string } = {
    id: botId,
    name,
    owned_by: "chatplayground",
  };
  if (provider) entry.provider = provider;
  return entry;
}

/**
 * Parse raw /api/models JSON response into discovery catalog entries.
 */
export function parseChatPlaygroundDiscoveryModels(data: unknown): Array<{
  id: string;
  name: string;
  owned_by: string;
  provider?: string;
}> {
  const seen = new Set<string>();
  const models: Array<{ id: string; name: string; owned_by: string; provider?: string }> = [];
  for (const item of extractRawModelList(data)) {
    const parsed = parseDiscoveryItem(item, seen);
    if (parsed) models.push(parsed);
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
 * Validates against catalog and returns null for unrecognized/invalid models (no synthesis fallback).
 */
export function resolveChatPlaygroundModel(
  requestedModel: string,
  catalog: ChatPlaygroundModel[] = CHATPLAYGROUND_FALLBACK_MODELS
): ChatPlaygroundModel | null {
  const stripped = stripChatPlaygroundPrefix(requestedModel).toLowerCase();
  if (!stripped) return null;

  // 1. Direct ID match
  const byId = catalog.find((m) => m.id.toLowerCase() === stripped);
  if (byId) return byId;

  // 2. Direct modelName match
  const byModelName = catalog.find((m) => m.modelName.toLowerCase() === stripped);
  if (byModelName) return byModelName;

  // 3. Direct displayName match
  const byName = catalog.find((m) => m.name.toLowerCase() === stripped);
  if (byName) return byName;

  // 4. Suffix match (e.g. "openai/gpt-4o" -> "gpt-4o")
  if (stripped.includes("/")) {
    const afterSlash = stripped.split("/").pop()!;
    const match = resolveChatPlaygroundModel(afterSlash, catalog);
    if (match) return match;
  }

  // Reject unrecognized models without fallback synthesis
  return null;
}
