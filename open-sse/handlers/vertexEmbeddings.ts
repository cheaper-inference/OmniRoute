/**
 * Vertex AI text embedding transport (publisher `:predict`).
 *
 * Vertex serves text embeddings on `.../publishers/google/models/<model>:predict` with an
 * `instances` body and a `predictions` reply, not an OpenAI `/v1/embeddings` shape. This module
 * maps one onto the other. The access token comes from the service-account JSON the Vertex chat
 * executor already signs (`getAccessToken`).
 *
 * The reply carries no usage block, so prompt tokens are estimated locally. Express-mode API keys
 * are not supported here: the embedding route needs a project, which only a service account gives.
 */

import { getVertexHost } from "../config/vertexModels.ts";
import { estimateInputTokens } from "../utils/usageTracking.ts";

export const VERTEX_EMBEDDING_DEFAULT_REGION = "us-central1";
/** Task type sent for every instance. Vertex tunes the vector to it. */
export const VERTEX_EMBEDDING_TASK_TYPE = "RETRIEVAL_QUERY";
/** Hard cap on the reply body, in bytes. 256 inputs x 3072 floats stays far below it. */
export const VERTEX_EMBEDDING_MAX_RESPONSE_BYTES = 16 * 1024 * 1024;
const MAX_INSTANCES = 250;

export interface VertexEmbeddingPlan {
  /** Requested model id, echoed back in the merged OpenAI-shaped response. */
  model: string;
  itemCount: number;
  body: {
    instances: { content: string; task_type: string }[];
    parameters?: Record<string, number>;
  };
}

export function resolveVertexEmbeddingUrl(
  model: string,
  project: string,
  region: string | null | undefined
): string {
  const location = region || VERTEX_EMBEDDING_DEFAULT_REGION;
  const host = getVertexHost(location);
  return `https://${host}/v1/projects/${encodeURIComponent(project)}/locations/${encodeURIComponent(location)}/publishers/google/models/${encodeURIComponent(model)}:predict`;
}

/** Build the `:predict` body. Throws a plain Error for client mistakes (the handler maps it to 400). */
export function buildVertexEmbeddingPlan(
  model: string,
  input: unknown,
  dimensions: unknown
): VertexEmbeddingPlan {
  const items = typeof input === "string" ? [input] : input;
  if (!Array.isArray(items) || items.length === 0) throw new Error("Embedding input was empty");
  if (items.length > MAX_INSTANCES) {
    throw new Error(`Vertex embeddings accept at most ${MAX_INSTANCES} inputs per request`);
  }
  if (!items.every((item) => typeof item === "string" && item.length > 0)) {
    throw new Error("Vertex embeddings accept non-empty text inputs only");
  }
  const body: VertexEmbeddingPlan["body"] = {
    instances: items.map((content) => ({ content, task_type: VERTEX_EMBEDDING_TASK_TYPE })),
  };
  if (dimensions !== undefined) {
    const size = Number(dimensions);
    if (!Number.isInteger(size) || size <= 0)
      throw new Error("dimensions must be a positive integer");
    body.parameters = { outputDimensionality: size };
  }
  return { model, itemCount: items.length, body };
}

/** Map `predictions[].embeddings.values` to an OpenAI list; a count mismatch fails closed. */
export function mapVertexEmbeddingResponse(
  raw: unknown,
  plan: VertexEmbeddingPlan
): Record<string, unknown> {
  const predictions = (raw as { predictions?: unknown } | null)?.predictions;
  const vectors = (Array.isArray(predictions) ? predictions : []).map(
    (p) => (p as { embeddings?: { values?: unknown } } | null)?.embeddings?.values
  );
  if (
    vectors.length !== plan.itemCount ||
    !vectors.every((v) => Array.isArray(v) && v.every((n) => typeof n === "number"))
  ) {
    throw new Error(
      `Vertex returned ${vectors.length} usable embedding(s) for ${plan.itemCount} input item(s)`
    );
  }
  const promptTokens = plan.body.instances.reduce(
    (sum, instance) => sum + Math.max(1, estimateInputTokens({ input: instance.content })),
    0
  );
  return {
    object: "list",
    data: vectors.map((embedding, index) => ({ object: "embedding", index, embedding })),
    model: plan.model,
    usage: { prompt_tokens: promptTokens, total_tokens: promptTokens },
  };
}
