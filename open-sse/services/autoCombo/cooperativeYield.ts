const DEFAULT_SLICE_MS = 6;
let defaultSliceMs = DEFAULT_SLICE_MS;

/**
 * Test seam: pin the default slice so yield counts are deterministic. `0` yields on every
 * check (work-proportional); `Infinity` never yields on time (only `ensureYielded` does).
 * `null` restores the production default.
 */
export function __setCooperativeYieldSliceMsForTest(sliceMs: number | null): void {
  defaultSliceMs = sliceMs ?? DEFAULT_SLICE_MS;
}

export interface CooperativeYieldBudget {
  yieldIfDue(): Promise<void> | null;
  ensureYielded(): Promise<void>;
}

/** Time-budgeted event-loop fairness without fixed per-item scheduler overhead. */
export function createCooperativeYieldBudget(sliceMs = defaultSliceMs): CooperativeYieldBudget {
  let deadline = performance.now() + sliceMs;
  let yielded = false;

  const yieldTurn = () =>
    new Promise<void>((resolve) =>
      setImmediate(() => {
        yielded = true;
        deadline = performance.now() + sliceMs;
        resolve();
      })
    );

  return {
    yieldIfDue() {
      return performance.now() >= deadline ? yieldTurn() : null;
    },
    ensureYielded() {
      return yielded ? Promise.resolve() : yieldTurn();
    },
  };
}
