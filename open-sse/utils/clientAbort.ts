/**
 * Client-abort primitives shared across token refresh, executor retry/proactive
 * refresh, and quota-share pre-hooks (#21276).
 *
 * Every helper guarantees:
 *  - immediate settlement when `signal` is already aborted or aborts mid-flight;
 *  - removal of its `"abort"` listener when the underlying operation settles first;
 *  - no unhandled rejection if an in-flight background promise settles after abort
 *    (so an already-started OAuth token refresh can finish persisting safely).
 */

export function isDeadlineAbortReason(reason: unknown): boolean {
  return (
    reason instanceof Error &&
    (reason.name === "TimeoutError" || reason.name === "BodyTimeoutError")
  );
}

export function createClientAbortError(signal?: AbortSignal | null): Error {
  const reason = signal?.reason;
  if (reason instanceof Error) {
    if (reason.name === "AbortError" || isDeadlineAbortReason(reason)) {
      return reason;
    }
    const err = new Error(reason.message || "Request aborted", { cause: reason });
    err.name = "AbortError";
    return err;
  }
  const err = new Error(
    typeof reason === "string" && reason.length > 0 ? reason : "Request aborted"
  );
  err.name = "AbortError";
  return err;
}

export function isClientAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === "AbortError";
}

export function raceClientAbort<T>(promise: Promise<T>, signal?: AbortSignal | null): Promise<T> {
  if (!signal) return promise;
  if (signal.aborted) {
    // Allow an already-started promise to finish in the background without
    // surfacing an unhandled rejection if it later fails.
    promise.catch(() => {});
    return Promise.reject(createClientAbortError(signal));
  }

  return new Promise<T>((resolve, reject) => {
    let settled = false;
    const onAbort = () => {
      if (settled) return;
      settled = true;
      reject(createClientAbortError(signal));
    };

    signal.addEventListener("abort", onAbort, { once: true });

    promise.then(
      (value) => {
        if (settled) return;
        settled = true;
        signal.removeEventListener("abort", onAbort);
        resolve(value);
      },
      (error) => {
        if (settled) return;
        settled = true;
        signal.removeEventListener("abort", onAbort);
        reject(error);
      }
    );
  });
}

export function sleepWithAbort(delayMs: number, signal?: AbortSignal | null): Promise<void> {
  if (signal?.aborted) {
    return Promise.reject(createClientAbortError(signal));
  }
  if (delayMs <= 0) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const onAbort = () => {
      clearTimeout(timer);
      reject(createClientAbortError(signal));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, delayMs);

    signal?.addEventListener("abort", onAbort, { once: true });
  });
}
