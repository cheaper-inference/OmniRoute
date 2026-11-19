/**
 * Work a provider route starts for a connection after it has answered: the auto-test of a new
 * connection, and its opt-in model auto-sync. Each runs as a tracked follow-up instead of a bare
 * `void promise`, so a caller can wait for every follow-up to settle:
 *
 * - graceful shutdown waits for them before it closes the database, instead of cutting an
 *   auto-test off halfway through persisting its result;
 * - tests that create connections wait for them before the next test resets the database, instead
 *   of sleeping and hoping (a follow-up that outlives its test calls `fetch` and writes state
 *   during the next one).
 *
 * The set lives on globalThis so every bundled copy of this module shares it.
 */
type FollowUpRegistry = Set<Promise<void>>;

const REGISTRY_KEY = Symbol.for("omniroute.connectionFollowUps");

function registry(): FollowUpRegistry {
  const holder = globalThis as typeof globalThis & { [REGISTRY_KEY]?: FollowUpRegistry };
  holder[REGISTRY_KEY] ??= new Set();
  return holder[REGISTRY_KEY];
}

function describeError(error: unknown): unknown {
  return (error as { message?: string } | null)?.message || error;
}

/**
 * Start `task` now, as the route used to with `void task()`, and track it until it settles. A
 * rejection is logged under `failureLabel` (e.g. "Auto-test failed for <id>") and never surfaces
 * as an unhandled rejection; a task that throws synchronously is handled the same way.
 */
export function runConnectionFollowUp(failureLabel: string, task: () => Promise<unknown>): void {
  const followUps = registry();
  let started: Promise<unknown>;
  try {
    started = Promise.resolve(task());
  } catch (error) {
    started = Promise.reject(error);
  }
  const tracked: Promise<void> = started
    .then(
      () => undefined,
      (error: unknown) => {
        console.log(`[providers] ${failureLabel}:`, describeError(error));
      }
    )
    .finally(() => {
      followUps.delete(tracked);
    });
  followUps.add(tracked);
}

/** How many follow-ups are still running. */
export function getPendingConnectionFollowUpCount(): number {
  return registry().size;
}

/**
 * Resolve once every follow-up has settled, including follow-ups started while waiting. With a
 * timeout, resolve `false` as soon as it elapses with work still running; `true` means drained.
 */
export async function waitForConnectionFollowUps(timeoutMs?: number): Promise<boolean> {
  const followUps = registry();
  const deadline = timeoutMs === undefined ? Infinity : Date.now() + Math.max(0, timeoutMs);
  while (followUps.size > 0) {
    const remaining = deadline - Date.now();
    if (remaining <= 0) return false;
    const settled = Promise.allSettled([...followUps]).then(() => true);
    if (remaining === Infinity) {
      await settled;
      continue;
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    const expired = new Promise<boolean>((resolve) => {
      timer = setTimeout(() => resolve(false), remaining);
    });
    const drainedInTime = await Promise.race([settled, expired]);
    clearTimeout(timer);
    if (!drainedInTime) return false;
  }
  return true;
}
