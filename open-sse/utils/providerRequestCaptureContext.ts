import { AsyncLocalStorage } from "node:async_hooks";
import type { Capture } from "./providerRequestLogging.ts";
import type { HttpAttemptCollector } from "./providerHttpAttempts.ts";

/**
 * What AsyncLocalStorage holds for a dispatch. Sockets and streams created during the
 * dispatch keep the ALS store alive long after it settles, so the store must not
 * reference the Capture (and its multi-megabyte `latest` request body) directly: the
 * holder is emptied when the dispatch settles, while chatCore keeps the Capture itself
 * through its own closure and can still read `latest()`/`body()` after the dispatch.
 */
export type CaptureHolder = { capture: Capture | null };

type CaptureState = {
  context: AsyncLocalStorage<CaptureHolder>;
  wrappedFetch: typeof fetch | null;
  wrappedInnerFetch: typeof fetch | null;
};

const CAPTURE_STATE_KEY = Symbol.for("omniroute.providerRequestCapture.state");

function getCaptureState(): CaptureState {
  const scopedGlobal = globalThis as typeof globalThis & {
    [CAPTURE_STATE_KEY]?: CaptureState;
  };

  if (!scopedGlobal[CAPTURE_STATE_KEY]) {
    scopedGlobal[CAPTURE_STATE_KEY] = {
      context: new AsyncLocalStorage<CaptureHolder>(),
      wrappedFetch: null,
      wrappedInnerFetch: null,
    };
  }
  return scopedGlobal[CAPTURE_STATE_KEY];
}

export const captureState = getCaptureState();

const DISPATCH_STATE_KEY = Symbol.for("omniroute.providerRequestCapture.dispatch");
export const dispatchContext = ((
  globalThis as typeof globalThis & {
    [DISPATCH_STATE_KEY]?: AsyncLocalStorage<{ settled: boolean }>;
  }
)[DISPATCH_STATE_KEY] ??= new AsyncLocalStorage<{ settled: boolean }>());

export function currentHttpAttemptCollector(): HttpAttemptCollector | undefined {
  return captureState.context.getStore()?.capture?.httpAttempts;
}

/**
 * True while a provider request is being dispatched: inside runWithCapture and before its
 * fn settles. A fetch the executor leaves running after it returns (a background
 * bookkeeping call) keeps the async context but no longer counts as the dispatch.
 */
export function isProviderRequestCaptureActive(): boolean {
  const dispatch = dispatchContext.getStore();
  return dispatch !== undefined && !dispatch.settled;
}
