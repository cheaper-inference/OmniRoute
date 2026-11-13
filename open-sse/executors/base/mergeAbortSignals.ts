// Abort-signal merge. Extracted from base.ts so the frozen executor host does not grow
// past its file-size cap.

/**
 * Merge two abort signals into one that fires when either does, with that source's reason.
 *
 * `AbortSignal.any` keeps no listener on the inputs. The old manual merge removed its
 * listeners only after an abort, so a merge that never aborted (the usual case: one per
 * fetch attempt or retry) left two listeners on the long-lived combo/client signal.
 */
export function mergeAbortSignals(primary: AbortSignal, secondary: AbortSignal): AbortSignal {
  return AbortSignal.any([primary, secondary]);
}
