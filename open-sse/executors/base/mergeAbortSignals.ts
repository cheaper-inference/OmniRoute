// Abort-signal merges. Extracted from base.ts so the frozen executor host does not grow
// past its file-size cap.

/**
 * Merge two abort signals into one that fires when either does, with that source's reason.
 *
 * `AbortSignal.any` keeps no listener on the inputs. The old manual merge removed its
 * listeners only after an abort, so a merge that never aborted (the usual case: one per
 * fetch attempt or retry) left two listeners on the long-lived combo/client signal.
 *
 * Do not use this for a signal that outlives a request holding a listener: Node pins an
 * `AbortSignal.any` composite while it has an abort listener (see
 * `mergeAbortSignalsUnpinned`).
 */
export function mergeAbortSignals(primary: AbortSignal, secondary: AbortSignal): AbortSignal {
  return AbortSignal.any([primary, secondary]);
}

/**
 * Same contract as `mergeAbortSignals`, built on a plain controller instead of
 * `AbortSignal.any`.
 *
 * Node keeps every `AbortSignal.any` composite that carries an abort listener in a
 * module-level set until it aborts or its sources are collected. The stream deadline paths
 * hand the merged signal to downstream listeners that close over the request, so a request
 * that completed without aborting stayed reachable forever together with its wire body.
 * A plain controller is an ordinary object: it is collected with the request. Its two
 * input listeners are removed on abort; both inputs are request-scoped on these paths.
 */
export function mergeAbortSignalsUnpinned(
  primary: AbortSignal,
  secondary: AbortSignal
): AbortSignal {
  const controller = new AbortController();

  const cleanup = () => {
    primary.removeEventListener("abort", onPrimaryAbort);
    secondary.removeEventListener("abort", onSecondaryAbort);
  };

  const abortFrom = (source: AbortSignal) => {
    if (!controller.signal.aborted) {
      controller.abort(source.reason);
    }
    cleanup();
  };

  const onPrimaryAbort = () => abortFrom(primary);
  const onSecondaryAbort = () => abortFrom(secondary);

  if (primary.aborted) {
    abortFrom(primary);
    return controller.signal;
  }
  if (secondary.aborted) {
    abortFrom(secondary);
    return controller.signal;
  }

  primary.addEventListener("abort", onPrimaryAbort, { once: true });
  secondary.addEventListener("abort", onSecondaryAbort, { once: true });
  return controller.signal;
}
