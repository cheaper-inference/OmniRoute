/** OpenRouter binary TTS carries its billing identity in a header, not in the audio bytes. */
const usageByResponse = new WeakMap<Response, Promise<Record<string, number> | null>>();

export function speechUsage(
  response: Response
): Promise<Record<string, number> | null> | undefined {
  return usageByResponse.get(response);
}

function generationUrl(baseUrl: string, id: string): URL | null {
  try {
    const url = new URL(baseUrl);
    if (
      url.protocol !== "https:" ||
      url.port ||
      url.username ||
      url.password ||
      !["openrouter.ai", "eu.openrouter.ai"].includes(url.hostname) ||
      url.pathname !== "/api/v1/audio/speech" ||
      !/^[\w-]{1,160}$/.test(id)
    )
      return null;
    url.pathname = "/api/v1/generation";
    url.search = "";
    url.searchParams.set("id", id);
    return url;
  } catch {
    return null;
  }
}

interface GenerationData {
  id?: unknown;
  total_cost?: unknown;
  native_tokens_prompt?: unknown;
  native_tokens_completion?: unknown;
}

/** Bound the metadata read independently of the streamed audio payload. */
async function readGenerationData(response: Response): Promise<GenerationData | null> {
  const reader = response.body?.getReader();
  if (!reader) return null;
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const next = await reader.read();
    if (next.done) break;
    size += next.value.byteLength;
    if (size > 65_536) {
      await reader.cancel();
      return null;
    }
    chunks.push(next.value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes))?.data;
}

function generationBillingUsage(
  data: GenerationData | null,
  id: string | null
): Record<string, number> | null {
  const cost = data?.total_cost;
  if (data?.id !== id || typeof cost !== "number" || !Number.isFinite(cost) || cost < 0)
    return null;
  const usage: Record<string, number> = { cost_usd: cost };
  for (const [target, source] of [
    ["input_tokens", data?.native_tokens_prompt],
    ["output_tokens", data?.native_tokens_completion],
  ] as const) {
    if (typeof source === "number" && Number.isSafeInteger(source) && source >= 0)
      usage[target] = source;
  }
  return usage;
}

async function generationUsage(url: URL, token: string): Promise<Record<string, number> | null> {
  // Only the existing generation is queried. Never retry a paid synthesis, switch
  // providers, or send an EU key to the global endpoint. No credentials/payloads in logs.
  // Generation billing is eventually consistent after the audio finishes. Keep
  // this off the audio delivery path; eight reads + deadlines stay below 52s.
  const delays = [0, 250, 500, 1_500, 3_000, 5_000, 10_000, 15_000];
  for (const delay of delays) {
    if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(2_000),
        redirect: "error",
      });
      if (response.status === 404) {
        await response.body?.cancel();
        continue;
      }
      if (!response.ok) {
        await response.body?.cancel();
        return null;
      }
      const data = await readGenerationData(response);
      const id = url.searchParams.get("id");
      if (data?.id === id && data?.total_cost == null) continue;
      return generationBillingUsage(data, id);
    } catch {
      return null;
    }
  }
  console.warn("[Speech accounting] Generation billing remained unavailable after bounded retries");
  return null;
}

/** Backpressure-preserving passthrough; reconciliation starts only after completion/cancellation. */
export function trackOpenRouterSpeech(
  upstream: Response,
  response: Response,
  baseUrl: string,
  token: string | null
): Response {
  const id = upstream.headers.get("X-Generation-Id");
  const url = id ? generationUrl(baseUrl, id) : null;
  if (!url || !token || !response.body) return response;
  const reader = response.body.getReader();
  let finish!: () => void;
  const completed = new Promise<void>((resolve) => {
    finish = resolve;
  });
  const body = new ReadableStream<Uint8Array>(
    {
      async pull(controller) {
        try {
          const next = await reader.read();
          if (next.done) {
            finish();
            controller.close();
          } else controller.enqueue(next.value);
        } catch (error) {
          finish();
          controller.error(error);
        }
      },
      async cancel(reason) {
        finish();
        await reader.cancel(reason);
      },
    },
    { highWaterMark: 0 }
  );
  const result = new Response(body, { status: response.status, headers: response.headers });
  result.headers.set("X-Generation-Id", id!);
  usageByResponse.set(
    result,
    completed.then(() => generationUsage(url, token))
  );
  return result;
}
