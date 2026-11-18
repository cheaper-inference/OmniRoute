/**
 * Cloudflare Workers AI model discovery (`/accounts/{id}/ai/models/search`).
 *
 * The endpoint is page-numbered (`page` / `per_page`, answered with
 * `result_info.page` / `total_pages` / `total_count`) and lists every Workers AI
 * model, including embeddings, speech and classifiers that cannot serve chat.
 */

export const CLOUDFLARE_MODELS_PER_PAGE = 100;

export const CLOUDFLARE_MODELS_SEARCH_URL = `https://api.cloudflare.com/client/v4/accounts/{accountId}/ai/models/search?per_page=${CLOUDFLARE_MODELS_PER_PAGE}`;

// `task.name` values that never serve chat completions (embeddings, ASR, TTS,
// text/image classification, object detection, translation, rerankers).
const NON_CHAT_TASK =
  /embedding|speech|classification|object.detection|translation|rerank|audio|text.to.speech/i;

// Second net for rows without task metadata, or whose task label drifts. Llama
// Guard is published as "Text Generation" but is a safety classifier.
const NON_CHAT_ID =
  /\/bge-|embedding|deepgram\/|melotts|whisper|pipecat|smart-turn|resnet|distilbert|m2m100|indictrans|llama-guard|reranker|image-classif|speech/i;

const IMAGE_TASK = /text.to.image|image.generation/i;
const IMAGE_ID = /flux|stable-diffusion|dreamshaper|sdxl|phoenix|lucid-origin/i;

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" ? (value as JsonRecord) : {};
}

function positiveNumber(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/**
 * Next page URL for `/ai/models/search`, derived from the current one, or null
 * when the response is the last (or an empty) page.
 */
export function nextCloudflareModelsPageUrl(data: unknown, currentUrl: string): string | null {
  const body = asRecord(data);
  if (!body.result_info || typeof body.result_info !== "object") return null;
  if (!Array.isArray(body.result) || body.result.length === 0) return null;
  const info = asRecord(body.result_info);

  const current = new URL(currentUrl);
  const page = positiveNumber(info.page) || positiveNumber(current.searchParams.get("page")) || 1;
  const perPage = positiveNumber(info.per_page) || CLOUDFLARE_MODELS_PER_PAGE;
  const totalPages =
    positiveNumber(info.total_pages) || Math.ceil(positiveNumber(info.total_count) / perPage);
  if (!totalPages || page >= totalPages) return null;

  current.searchParams.set("page", String(page + 1));
  current.searchParams.set("per_page", String(CLOUDFLARE_MODELS_PER_PAGE));
  return current.toString();
}

/**
 * Maps one `/ai/models/search` page to discovery rows. #4259: `name` is the
 * callable `@cf/...` slug, `id` is an internal UUID. Non-chat kinds are dropped;
 * text-to-image models are tagged so they stay out of chat catalogs.
 */
export function parseCloudflareModelsSearch(data: unknown): JsonRecord[] {
  const rows = asRecord(data).result;
  if (!Array.isArray(rows)) return [];
  return rows.flatMap((row: unknown) => {
    const model = asRecord(row);
    const slug = typeof model.name === "string" ? model.name : "";
    if (!slug) return [];
    const taskName = asRecord(model.task).name;
    const task = typeof taskName === "string" ? taskName : "";
    if (NON_CHAT_TASK.test(task) || NON_CHAT_ID.test(slug)) return [];
    const isImage = IMAGE_TASK.test(task) || IMAGE_ID.test(slug);
    return [
      {
        id: slug,
        name: slug,
        ...(typeof model.description === "string" && model.description
          ? { description: model.description }
          : {}),
        ...(isImage ? { supportedEndpoints: ["images"], modelType: "image" } : {}),
      },
    ];
  });
}
