import type { AntigravityHealthAttempt } from "@omniroute/open-sse/services/antigravityHealth";
import { createStreamContentWatcher } from "@omniroute/open-sse/utils/streamReadiness";

export function bindAntigravityHealthAttempt(
  attempt: AntigravityHealthAttempt,
  signal?: AbortSignal | null
): AntigravityHealthAttempt {
  const onAbort = () => finish("ignored");
  const finish: AntigravityHealthAttempt["finish"] = (outcome) => {
    signal?.removeEventListener("abort", onAbort);
    attempt.finish(signal?.aborted ? "ignored" : outcome);
  };
  if (signal?.aborted) finish("ignored");
  else signal?.addEventListener("abort", onAbort, { once: true });
  return { probe: attempt.probe, finish };
}

/** Count a successful stream only when it completes, never at HTTP 200 headers. */
export function holdAntigravityHealthThroughResponse(
  response: Response,
  attempt: AntigravityHealthAttempt
): Response {
  if (!response.body) {
    attempt.finish("success");
    return response;
  }
  const reader = response.body.getReader();
  const watcher = createStreamContentWatcher();
  const decoder = new TextDecoder();
  const body = new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const chunk = await reader.read();
        if (chunk.done) {
          watcher.note(decoder.decode());
          watcher.finish();
          attempt.finish(watcher.sawContent() && !watcher.sawError() ? "success" : "ignored");
          controller.close();
          reader.releaseLock();
        } else {
          watcher.note(decoder.decode(chunk.value, { stream: true }));
          controller.enqueue(chunk.value);
        }
      } catch (error) {
        attempt.finish("ignored");
        controller.error(error);
        reader.releaseLock();
      }
    },
    async cancel(reason) {
      attempt.finish("ignored");
      try { await reader.cancel(reason); } finally { reader.releaseLock(); }
    },
  });
  return new Response(body, {
    status: response.status, statusText: response.statusText, headers: response.headers,
  });
}
