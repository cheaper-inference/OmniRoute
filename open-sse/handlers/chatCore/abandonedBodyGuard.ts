/**
 * Backstop for a provider slot held by a response body nobody finishes.
 *
 * The slot of a streamed provider response is released on EOF, error or cancel of the client
 * body. A client that never reads the body, or stops pulling it and never cancels, leaves the
 * slot held for the process life. This wrapper cancels the upstream body and errors the client
 * body when it is never read for `unreadMs`, or when it was read and then is not pulled for
 * `inactivityMs`. A timer runs only while NO read is pending, so a slow upstream is never cut:
 * silence from the upstream (a pending read) is governed by the stream idle timeout elsewhere.
 * A limit of 0 turns that timer off.
 */

export interface AbandonedBodyLimits {
  unreadMs: number;
  inactivityMs: number;
}

function readLimit(raw: string | undefined, fallbackMs: number): number {
  if (raw === undefined || raw.trim() === "") return fallbackMs;
  const value = Number(raw);
  return Number.isFinite(value) && value >= 0 ? Math.floor(value) : fallbackMs;
}

export function resolveAbandonedBodyLimits(): AbandonedBodyLimits {
  return {
    unreadMs: readLimit(process.env.PROVIDER_BODY_UNREAD_TIMEOUT_MS, 30_000),
    inactivityMs: readLimit(process.env.PROVIDER_BODY_INACTIVITY_TIMEOUT_MS, 300_000),
  };
}

export function guardAbandonedBody(
  readable: ReadableStream<Uint8Array>,
  finalize: () => void,
  limits: AbandonedBodyLimits = resolveAbandonedBodyLimits()
): ReadableStream<Uint8Array> {
  const reader = readable.getReader();
  let finalized = false;
  let expired: Error | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let hasRead = false;

  const runFinalize = () => {
    if (finalized) return;
    finalized = true;
    finalize();
  };
  const stopTimer = () => {
    if (timer) clearTimeout(timer);
    timer = null;
  };
  // Armed whenever no read is pending: before the first read, and between reads.
  const armTimer = () => {
    stopTimer();
    if (finalized) return;
    const ms = hasRead ? limits.inactivityMs : limits.unreadMs;
    if (ms <= 0) return;
    timer = setTimeout(() => {
      expired = new Error(
        hasRead
          ? `Provider response body abandoned: not pulled for ${ms}ms`
          : `Provider response body abandoned: never read within ${ms}ms`
      );
      runFinalize();
      void reader.cancel(expired).catch(() => undefined);
    }, ms);
    timer.unref?.();
  };

  const body = new ReadableStream<Uint8Array>(
    {
      async pull(controller) {
        if (expired) return controller.error(expired);
        stopTimer();
        hasRead = true;
        try {
          const { done, value } = await reader.read();
          if (expired) return controller.error(expired);
          if (done) {
            runFinalize();
            return controller.close();
          }
          controller.enqueue(value);
          armTimer();
        } catch (error) {
          stopTimer();
          runFinalize();
          controller.error(expired ?? error);
        }
      },
      async cancel(reason) {
        stopTimer();
        runFinalize();
        await reader.cancel(reason).catch(() => undefined);
      },
    },
    { highWaterMark: 0 }
  );
  armTimer();
  return body;
}
