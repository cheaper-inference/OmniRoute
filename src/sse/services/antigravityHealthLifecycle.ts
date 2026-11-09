import type { AntigravityHealthAttempt } from "@omniroute/open-sse/services/antigravityHealth";
import { createStreamContentWatcher } from "@omniroute/open-sse/utils/streamReadiness";
import { inheritTrustedLocalRateLimitResponse } from "@omniroute/open-sse/services/rateLimitManager/errors";
import { inheritResponsePolicies } from "../handlers/chat/responsePolicies";

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
export const ANTIGRAVITY_PROBE_STREAM_IDLE_TIMEOUT_MS = 300_000;

// A probe times out only while its stream is silent, not after a fixed total
// duration. Keep the timer/cancellation handling outside the stream wrapper.
function scheduleHealthProbeIdle(
  timeoutMs: number,
  reader: ReadableStreamDefaultReader<Uint8Array>,
  controller: () => ReadableStreamDefaultController<Uint8Array> | null,
  onExpired: () => void,
  releaseReader: () => void
): ReturnType<typeof setTimeout> {
  return setTimeout(
    () => {
      onExpired();
      controller()?.error(new Error("Antigravity recovery probe stream idle timeout"));
      void reader
        .cancel("Antigravity recovery probe stream idle timeout")
        .catch(() => {})
        .finally(releaseReader);
    },
    Math.max(1, Math.floor(timeoutMs))
  );
}

export function holdAntigravityHealthThroughResponse(
  response: Response,
  attempt: AntigravityHealthAttempt,
  probeIdleTimeoutMs = ANTIGRAVITY_PROBE_STREAM_IDLE_TIMEOUT_MS
): Response {
  if (!response.body) {
    attempt.finish("success");
    return response;
  }
  const reader = response.body.getReader();
  const watcher = createStreamContentWatcher();
  const decoder = new TextDecoder();
  let settled = false;
  let expired = false;
  let idleTimer: ReturnType<typeof setTimeout> | null = null;
  let streamController: ReadableStreamDefaultController<Uint8Array> | null = null;

  const clearIdle = () => {
    if (idleTimer !== null) clearTimeout(idleTimer);
    idleTimer = null;
  };
  const finish = (outcome: Parameters<AntigravityHealthAttempt["finish"]>[0]) => {
    if (settled) return;
    settled = true;
    clearIdle();
    attempt.finish(outcome);
  };
  const releaseReader = () => {
    try {
      reader.releaseLock();
    } catch {
      /* A pending cancel still owns the read. */
    }
  };
  const armProbeIdle = () => {
    if (
      !attempt.probe ||
      settled ||
      !Number.isFinite(probeIdleTimeoutMs) ||
      probeIdleTimeoutMs <= 0
    )
      return;
    clearIdle();
    idleTimer = scheduleHealthProbeIdle(
      probeIdleTimeoutMs,
      reader,
      () => streamController,
      () => {
        expired = true;
        finish("ignored");
      },
      releaseReader
    );
  };
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      streamController = controller;
      armProbeIdle();
    },
    async pull(controller) {
      if (expired) return;
      try {
        const chunk = await reader.read();
        if (expired) return;
        if (chunk.done) {
          watcher.note(decoder.decode());
          watcher.finish();
          finish(watcher.sawContent() && !watcher.sawError() ? "success" : "ignored");
          controller.close();
          releaseReader();
        } else {
          armProbeIdle();
          watcher.note(decoder.decode(chunk.value, { stream: true }));
          controller.enqueue(chunk.value);
        }
      } catch (error) {
        if (expired) return;
        finish("ignored");
        controller.error(error);
        releaseReader();
      }
    },
    async cancel(reason) {
      if (expired) return;
      finish("ignored");
      try {
        await reader.cancel(reason);
      } finally {
        releaseReader();
      }
    },
  });
  const wrapped = new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
  // Routing and local-limit provenance is attached to Response identity, not headers.
  return inheritResponsePolicies(response, inheritTrustedLocalRateLimitResponse(response, wrapped));
}
