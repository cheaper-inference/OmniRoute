// OpenAI images `n` contract for providers whose upstream returns one image per call.
//
// `POST /v1/images/generations` (and `/edits`) promise `n` images in `data[]`. The formats
// below send a single upstream request and return a single image whatever `n` says, so a
// client asking for 4 got 1 back (and was cost-tracked for 4 by the route's
// `max(body.n, data.length)`). For them the dispatcher runs `n` independent single-image
// calls through a bounded pool and concatenates the results in call order.
//
// Formats that already forward `n` natively (openai, recraft, fal-ai, gemini, imagen3,
// minimax, segmind, sdwebui, comfyui, aihorde, …) or fan out themselves (codex-responses,
// cursor-agent-image) are deliberately absent.

type ImageLog = {
  info: (tag: string, message: string) => void;
  warn?: (tag: string, message: string) => void;
} | null;

type ImageResult = {
  success: boolean;
  data?: { created?: number; data?: unknown[] };
  [key: string]: unknown;
};

export const SINGLE_IMAGE_FANOUT_FORMATS: ReadonlySet<string> = new Set([
  // api.bfl.ai has no multi-image parameter: one task = one image
  // (https://docs.bfl.ai/quick_start/generating_images).
  "black-forest-labs",
  "stability-ai",
  "leonardo-image",
  "ideogram-image",
  "haiper-image",
  "hyperbolic",
  "magnific-image",
  "freepik-image",
  "nvidia-nim",
  "cloudflare-ai-image",
]);

// OpenAI documents `n` as 1-10 for the images API. Larger requests are clamped, not rejected.
export const IMAGE_FANOUT_MAX_N = 10;

// In-flight upstream calls per request. BFL allows 24 active tasks per account (6 for
// flux-kontext-max), shared with every other request on the same key, so stay well under.
export const IMAGE_FANOUT_CONCURRENCY = 4;

/** Requested image count: a positive integer (number or numeric string), else 1. */
export function resolveRequestedImageCount(n: unknown): number {
  const value = typeof n === "string" && n.trim() !== "" ? Number(n) : n;
  return typeof value === "number" && Number.isInteger(value) && value > 0 ? value : 1;
}

function offsetSeed(seed: unknown, index: number): unknown {
  if (index === 0 || seed === undefined || seed === null || seed === "") return seed;
  const numeric = Number(seed);
  // A fixed seed on every call would return N identical images; seed + i keeps the set
  // reproducible but distinct.
  return Number.isFinite(numeric) ? numeric + index : seed;
}

/**
 * Run `count` single-image calls (each with `n: 1`, seed offset by call index) through a
 * bounded pool. All-or-nothing: the first failure is returned as-is and no further calls are
 * started, because OpenAI-compatible clients read `data.length < n` as success and would
 * silently lose images.
 */
export async function fanOutSingleImageCalls({
  body,
  count,
  label,
  log = null,
  signal = null,
  concurrency = IMAGE_FANOUT_CONCURRENCY,
  generateOne,
}: {
  body: Record<string, unknown>;
  count: number;
  label: string;
  log?: ImageLog;
  signal?: AbortSignal | null;
  concurrency?: number;
  generateOne: (taskBody: Record<string, unknown>) => Promise<ImageResult>;
}): Promise<ImageResult> {
  if (log) {
    log.info("IMAGE", `${label} returns one image per call; n=${count} fans out`);
  }

  const results: ImageResult[] = new Array(count);
  let failure: ImageResult | null = null;
  let next = 0;

  const worker = async () => {
    while (!failure && !signal?.aborted && next < count) {
      const index = next++;
      const taskBody = { ...body, n: 1, seed: offsetSeed(body.seed, index) };
      if (taskBody.seed === undefined) delete taskBody.seed;
      const result = await generateOne(taskBody);
      if (!result?.success) {
        failure ??= result;
        return;
      }
      results[index] = result;
    }
  };

  await Promise.all(Array.from({ length: Math.min(count, concurrency) }, worker));

  if (failure) return failure;
  if (signal?.aborted) {
    return { success: false, status: 499, error: "Image generation aborted by client" };
  }

  return {
    success: true,
    data: {
      created: results[0]?.data?.created ?? Math.floor(Date.now() / 1000),
      data: results.flatMap((result) => result.data?.data ?? []),
    },
  };
}
