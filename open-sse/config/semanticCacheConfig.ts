/**
 * Semantic Cache Configuration
 *
 * Configurable options for OmniRoute's dual-layer semantic caching system.
 * Supports environment variable overrides via OMNIROUTE_SEMANTIC_CACHE_*.
 *
 * @module config/semanticCacheConfig
 */

export type SemanticCacheBackend = "memory" | "redis";
export type SemanticCacheType = "direct" | "semantic" | "both";

export interface SemanticCacheConfig {
  /**
   * Master toggle for the dual-layer (in-memory/Redis vector) manager. OFF by default:
   * the legacy SQLite exact-match cache (`semanticCacheEnabled`) keeps working on its
   * own; this layer is opt-in via the `semanticCacheVectorEnabled` setting or
   * `OMNIROUTE_SEMANTIC_CACHE_ENABLED=true`, because enabling it calls an embedding
   * endpoint on every cacheable request (#14159 re-land of #12630).
   */
  enabled: boolean;
  /** Storage and vector backend. Defaults to "memory". */
  backend: SemanticCacheBackend;
  /** Cosine similarity threshold (0.0 - 1.0) for semantic hits. Defaults to 0.8. */
  similarityThreshold: number;
  /** Time-to-live for cached entries in milliseconds. Defaults to 30 minutes (1800000 ms). */
  ttlMs: number;
  /** Maximum number of entries stored in memory. Defaults to 1000. */
  maxEntries: number;
  /** Embedding provider to use for semantic embeddings. Defaults to "openai". */
  embeddingProvider: string;
  /** Embedding model name. Defaults to "text-embedding-3-small". */
  embeddingModel: string;
  /** Vector dimension of the embedding model (e.g. 1536). Optional/auto-detected. */
  embeddingDimension?: number;
  /** Maximum milliseconds to wait for embedding generation before failing open. Defaults to 3000 ms. */
  embeddingTimeoutMs: number;
  /** If true, cache entries are isolated per model name. Defaults to true. */
  cacheByModel: boolean;
  /** If true, cache entries are isolated per provider name. Defaults to true. */
  cacheByProvider: boolean;
  /** Number of recent conversation turns embedded and checked. Defaults to 3. */
  conversationHistoryDepth: number;
  /** Maximum message turns in conversation allowed before bypassing caching. Defaults to 50. */
  conversationHistoryThreshold: number;
  /** If true, system prompt messages are excluded from embedding and cache keys. Defaults to false. */
  excludeSystemPrompt: boolean;
  /** Optional custom base URL for embedding provider (e.g. http://192.168.31.147:13305/v1/embeddings). */
  embeddingBaseUrl?: string;
  /** Optional custom API key / Bearer token for embedding provider. */
  embeddingApiKey?: string;
  /** Redis connection URL when backend is "redis". */
  redisUrl?: string;
  /** Key prefix for Redis cache keys. Defaults to "omniroute:semcache:". */
  redisPrefix: string;
  /** If true, only temperature=0 requests are cacheable. Defaults to true for strict determinism. */
  requireZeroTemperature: boolean;
}

export const DEFAULT_SEMANTIC_CACHE_CONFIG: SemanticCacheConfig = {
  enabled: false,
  backend: "memory",
  similarityThreshold: 0.8,
  ttlMs: 1800000, // 30 minutes
  maxEntries: 1000,
  embeddingProvider: "openai",
  embeddingModel: "text-embedding-3-small",
  embeddingDimension: 1536,
  embeddingTimeoutMs: 3000,
  cacheByModel: true,
  cacheByProvider: true,
  conversationHistoryDepth: 3,
  conversationHistoryThreshold: 50,
  excludeSystemPrompt: false,
  redisUrl: undefined,
  redisPrefix: "omniroute:semcache:",
  requireZeroTemperature: true,
};

function parseBoolean(val: string | undefined, fallback: boolean): boolean {
  if (val === undefined || val === "") return fallback;
  const lower = val.toLowerCase().trim();
  if (lower === "true" || lower === "1" || lower === "yes") return true;
  if (lower === "false" || lower === "0" || lower === "no") return false;
  return fallback;
}

function parseNumber(val: string | undefined, fallback: number): number {
  if (val === undefined || val === "") return fallback;
  const parsed = Number(val);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/** Where the effective embedding dimension came from. */
export type SemanticCacheEmbeddingDimensionSource = "env" | "db" | "default";

export interface ResolvedEmbeddingDimension {
  /** Dimension the runtime actually uses. */
  dimension: number;
  /** Winning layer: environment override, database setting, or the built-in default. */
  source: SemanticCacheEmbeddingDimensionSource;
}

export interface EmbeddingDimensionCheck {
  /** Dimension the runtime is configured with (env → db → default). */
  configured: number;
  source: SemanticCacheEmbeddingDimensionSource;
  /** Vector length a live embedding probe returned, when it returned one. */
  detected?: number;
  /** True when the probe returned a vector length the configured dimension does not match. */
  mismatch: boolean;
}

/** Accepts a positive integer (or its numeric string form); anything else is "not set". */
function normalizeDimension(value: unknown): number | undefined {
  const parsed = typeof value === "string" ? Number(value.trim()) : value;
  if (typeof parsed !== "number" || !Number.isFinite(parsed)) return undefined;
  const truncated = Math.trunc(parsed);
  return truncated > 0 ? truncated : undefined;
}

/**
 * Resolves the embedding dimension the runtime actually uses, with the same precedence as
 * `resolveSemanticCacheConfig()`: environment variable → database setting → built-in default.
 *
 * Reporting the source lets the settings API/UI show the effective value without copying an
 * environment override into the database.
 */
export function resolveSemanticCacheEmbeddingDimension(
  configuredDimension?: number | null
): ResolvedEmbeddingDimension {
  const defaultDimension = DEFAULT_SEMANTIC_CACHE_CONFIG.embeddingDimension as number;
  const rawEnv = process.env.OMNIROUTE_SEMANTIC_CACHE_EMBEDDING_DIMENSION;

  if (rawEnv !== undefined && rawEnv.trim() !== "") {
    const envDimension = normalizeDimension(rawEnv);
    // An unparsable or non-positive override keeps the historical 1536 fallback instead of
    // silently deferring to a database value the operator meant to override.
    return {
      dimension: envDimension ?? defaultDimension,
      source: envDimension !== undefined ? "env" : "default",
    };
  }

  const dbDimension = normalizeDimension(configuredDimension);
  if (dbDimension !== undefined) return { dimension: dbDimension, source: "db" };

  return { dimension: defaultDimension, source: "default" };
}

/**
 * Compares a live embedding probe with the configured dimension. A mismatch is reported, never
 * enforced: the configured value is the operator's decision and is kept as-is.
 */
export function checkEmbeddingDimension(
  detectedDimension: number | null | undefined,
  configuredDimension?: number | null
): EmbeddingDimensionCheck {
  const resolved = resolveSemanticCacheEmbeddingDimension(configuredDimension);
  const detected = normalizeDimension(detectedDimension);
  return {
    configured: resolved.dimension,
    source: resolved.source,
    detected,
    mismatch: detected !== undefined && detected !== resolved.dimension,
  };
}

type DynamicConfigResolver = () => Partial<SemanticCacheConfig> | null | undefined;
let dynamicResolver: DynamicConfigResolver | null = null;

export function registerSemanticCacheConfigResolver(resolver: DynamicConfigResolver): void {
  dynamicResolver = resolver;
}

/**
 * Resolves semantic cache configuration from environment variables, merged
 * with optional dynamic database settings and explicit overrides.
 */
export function resolveSemanticCacheConfig(
  overrides?: Partial<SemanticCacheConfig>
): SemanticCacheConfig {
  const dynamic = dynamicResolver ? dynamicResolver() : null;
  const env = process.env;

  const backendEnv = (env.OMNIROUTE_SEMANTIC_CACHE_BACKEND || "").toLowerCase().trim();
  const backend: SemanticCacheBackend =
    backendEnv === "redis"
      ? "redis"
      : backendEnv === "memory"
        ? "memory"
        : (dynamic?.backend ?? DEFAULT_SEMANTIC_CACHE_CONFIG.backend);

  const resolved: SemanticCacheConfig = {
    enabled:
      env.OMNIROUTE_SEMANTIC_CACHE_ENABLED !== undefined
        ? parseBoolean(env.OMNIROUTE_SEMANTIC_CACHE_ENABLED, DEFAULT_SEMANTIC_CACHE_CONFIG.enabled)
        : (dynamic?.enabled ?? DEFAULT_SEMANTIC_CACHE_CONFIG.enabled),
    backend,
    similarityThreshold:
      env.OMNIROUTE_SEMANTIC_CACHE_THRESHOLD !== undefined
        ? parseNumber(
            env.OMNIROUTE_SEMANTIC_CACHE_THRESHOLD,
            DEFAULT_SEMANTIC_CACHE_CONFIG.similarityThreshold
          )
        : (dynamic?.similarityThreshold ?? DEFAULT_SEMANTIC_CACHE_CONFIG.similarityThreshold),
    ttlMs:
      env.OMNIROUTE_SEMANTIC_CACHE_TTL_MS !== undefined
        ? parseNumber(env.OMNIROUTE_SEMANTIC_CACHE_TTL_MS, DEFAULT_SEMANTIC_CACHE_CONFIG.ttlMs)
        : (dynamic?.ttlMs ?? DEFAULT_SEMANTIC_CACHE_CONFIG.ttlMs),
    maxEntries:
      env.OMNIROUTE_SEMANTIC_CACHE_MAX_ENTRIES !== undefined
        ? parseNumber(
            env.OMNIROUTE_SEMANTIC_CACHE_MAX_ENTRIES,
            DEFAULT_SEMANTIC_CACHE_CONFIG.maxEntries
          )
        : (dynamic?.maxEntries ?? DEFAULT_SEMANTIC_CACHE_CONFIG.maxEntries),
    embeddingProvider:
      env.OMNIROUTE_SEMANTIC_CACHE_EMBEDDING_PROVIDER?.trim() ||
      dynamic?.embeddingProvider ||
      DEFAULT_SEMANTIC_CACHE_CONFIG.embeddingProvider,
    embeddingModel:
      env.OMNIROUTE_SEMANTIC_CACHE_EMBEDDING_MODEL?.trim() ||
      dynamic?.embeddingModel ||
      DEFAULT_SEMANTIC_CACHE_CONFIG.embeddingModel,
    embeddingDimension: resolveSemanticCacheEmbeddingDimension(dynamic?.embeddingDimension)
      .dimension,
    embeddingTimeoutMs: parseNumber(
      env.OMNIROUTE_SEMANTIC_CACHE_EMBEDDING_TIMEOUT_MS,
      dynamic?.embeddingTimeoutMs ?? DEFAULT_SEMANTIC_CACHE_CONFIG.embeddingTimeoutMs
    ),
    cacheByModel: parseBoolean(
      env.OMNIROUTE_SEMANTIC_CACHE_BY_MODEL,
      dynamic?.cacheByModel ?? DEFAULT_SEMANTIC_CACHE_CONFIG.cacheByModel
    ),
    cacheByProvider: parseBoolean(
      env.OMNIROUTE_SEMANTIC_CACHE_BY_PROVIDER,
      dynamic?.cacheByProvider ?? DEFAULT_SEMANTIC_CACHE_CONFIG.cacheByProvider
    ),
    conversationHistoryDepth: parseNumber(
      env.OMNIROUTE_SEMANTIC_CACHE_HISTORY_DEPTH,
      dynamic?.conversationHistoryDepth ?? DEFAULT_SEMANTIC_CACHE_CONFIG.conversationHistoryDepth
    ),
    conversationHistoryThreshold: parseNumber(
      env.OMNIROUTE_SEMANTIC_CACHE_HISTORY_THRESHOLD,
      dynamic?.conversationHistoryThreshold ??
        DEFAULT_SEMANTIC_CACHE_CONFIG.conversationHistoryThreshold
    ),
    excludeSystemPrompt: parseBoolean(
      env.OMNIROUTE_SEMANTIC_CACHE_EXCLUDE_SYSTEM,
      dynamic?.excludeSystemPrompt ?? DEFAULT_SEMANTIC_CACHE_CONFIG.excludeSystemPrompt
    ),
    embeddingBaseUrl:
      env.OMNIROUTE_SEMANTIC_CACHE_EMBEDDING_BASE_URL?.trim() ||
      dynamic?.embeddingBaseUrl ||
      overrides?.embeddingBaseUrl ||
      undefined,
    embeddingApiKey:
      env.OMNIROUTE_SEMANTIC_CACHE_EMBEDDING_API_KEY?.trim() ||
      dynamic?.embeddingApiKey ||
      overrides?.embeddingApiKey ||
      undefined,
    redisUrl:
      env.OMNIROUTE_SEMANTIC_CACHE_REDIS_URL || env.REDIS_URL || dynamic?.redisUrl || undefined,
    redisPrefix:
      env.OMNIROUTE_SEMANTIC_CACHE_REDIS_PREFIX?.trim() ||
      dynamic?.redisPrefix ||
      DEFAULT_SEMANTIC_CACHE_CONFIG.redisPrefix,
    requireZeroTemperature:
      env.OMNIROUTE_SEMANTIC_CACHE_REQUIRE_ZERO_TEMP !== undefined
        ? parseBoolean(
            env.OMNIROUTE_SEMANTIC_CACHE_REQUIRE_ZERO_TEMP,
            DEFAULT_SEMANTIC_CACHE_CONFIG.requireZeroTemperature
          )
        : (dynamic?.requireZeroTemperature ?? DEFAULT_SEMANTIC_CACHE_CONFIG.requireZeroTemperature),
    ...overrides,
  };

  // Clamp similarity threshold to [0.0, 1.0]
  if (resolved.similarityThreshold < 0) resolved.similarityThreshold = 0;
  if (resolved.similarityThreshold > 1) resolved.similarityThreshold = 1;

  return resolved;
}
