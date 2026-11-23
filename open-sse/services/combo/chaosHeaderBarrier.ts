import type { PerTargetAdmissionHook } from "../admission/types.ts";
import type { HandleSingleModel } from "./types.ts";

/**
 * Chaos creates its synthetic SSE Response before asynchronous admission/fan-out.
 * Hold that envelope at the combo boundary until accepted calls have returned
 * headers (and passed the shared safety latch), or chaos has cancelled them.
 * Do not read/buffer successful bodies or change chaos's existing timeout policy.
 */
export function createChaosHeaderBarrier(
  dispatch: HandleSingleModel,
  admission?: PerTargetAdmissionHook | null,
  signal?: AbortSignal | null
) {
  const admissions: Array<Promise<boolean>> = [];
  const headers: Array<Promise<void>> = [];
  const accepted = new Map<string, Array<() => void>>();
  const pendingHeaders = new Set<() => void>();
  let failed = false;
  const reserve = () => {
    let ready!: () => void;
    headers.push(
      new Promise<void>((resolve) => {
        ready = () => {
          pendingHeaders.delete(ready);
          resolve();
        };
        pendingHeaders.add(ready);
      })
    );
    return ready;
  };
  const perTargetAdmission: PerTargetAdmissionHook = (args) => {
    // Record the promise before invoking user code, including synchronous throws.
    const pending = Promise.resolve()
      .then(() => {
        signal?.throwIfAborted();
        return failed ? false : admission ? admission(args) : true;
      })
      .then((allowed) => {
        signal?.throwIfAborted();
        if (failed) return false;
        if (allowed) {
          const queue = accepted.get(args.modelStr) ?? [];
          queue.push(reserve());
          accepted.set(args.modelStr, queue);
        }
        return allowed;
      });
    admissions.push(pending);
    return pending;
  };
  const handleSingleModel: HandleSingleModel = async (body, model, target) => {
    // A single-member chaos panel bypasses admission; reserve its headers here.
    const ready = accepted.get(model)?.shift() ?? reserve();
    const signal = target?.modelAbortSignal;
    if (signal?.aborted) ready();
    else signal?.addEventListener("abort", ready, { once: true });
    try {
      return await dispatch(body, model, target);
    } finally {
      ready();
      signal?.removeEventListener("abort", ready);
    }
  };
  return {
    perTargetAdmission,
    handleSingleModel,
    async wait() {
      let onAbort: (() => void) | undefined;
      try {
        signal?.throwIfAborted();
        // Accepted calls reserve their slot BEFORE admission returns true.
        const ready = Promise.all(admissions).then(() => Promise.all(headers));
        if (!signal) {
          await ready;
          return;
        }
        await Promise.race([
          ready,
          new Promise<never>((_resolve, reject) => {
            onAbort = () => reject(signal.reason);
            signal.addEventListener("abort", onAbort, { once: true });
          }),
        ]);
      } catch (error) {
        failed = true;
        // Filtering can fail before any dispatch exists to release these slots.
        for (const ready of pendingHeaders) ready();
        accepted.clear();
        throw error;
      } finally {
        if (onAbort) signal?.removeEventListener("abort", onAbort);
      }
    },
  };
}
