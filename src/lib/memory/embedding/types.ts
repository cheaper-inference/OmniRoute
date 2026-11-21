export type EmbeddingSource = "remote" | "static" | "transformers" | "auto";

export interface EmbeddingProviderListing {
  provider: string; // e.g. "openai"
  hasKey: boolean;
  models: Array<{
    id: string; // `provider/model` format, e.g. "openai/text-embedding-3-small"
    name: string;
    dimensions: number | null;
  }>;
}

export interface EmbeddingResolution {
  /** Active source after resolveEmbeddingSource(settings). null = none available → falls back to FTS5. */
  source: "remote" | "static" | "transformers" | null;
  /** Active model (provider/model format for remote, "potion-base-8M" for static, "Xenova/all-MiniLM-L6-v2" for transformers). */
  model: string | null;
  /** Dimension of the produced vector. null before the first call (lazy probe). */
  dimensions: number | null;
  /** Unique signature used as the vectorStore key to detect a model swap. */
  signature: string; // ${source}:${model}:${dim}
  /** Cache/signature identity when the same model ID can exist at multiple custom endpoints. */
  identity?: string;
  /** Reason for the choice (shown in the UI's Engine status). */
  reason: string; // e.g. "provider openai with key configured"
}

export interface EmbeddingResult {
  vector: Float32Array;
  source: "remote" | "static" | "transformers";
  model: string;
  dimensions: number;
  latencyMs: number;
  cached: boolean;
}

export interface EmbeddingError {
  source: "remote" | "static" | "transformers";
  model: string | null;
  reason:
    "no_key" | "model_load_failed" | "request_failed" | "rate_limited" | "timeout" | "unknown";
  message: string; // ALWAYS via sanitizeErrorMessage()
}
