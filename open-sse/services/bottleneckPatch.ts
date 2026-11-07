/**
 * Monkey-patch for Bottleneck v2.19.5 doExpire bug.
 *
 * Bug (Job.js:162):
 *   `this._states.jobStatus(this.options.id === "RUNNING")`
 *   compares job ID to "RUNNING" (always false) instead of checking status.
 *   Should be: `this._states.jobStatus(this.options.id) === "RUNNING"`
 *
 * Impact: when a job's execution time exceeds `expiration`, doExpire fires but
 * fails to advance the job from RUNNING to EXECUTING. The _assertStatus throws
 * in a setTimeout (uncaught), and the job is permanently stuck in RUNNING state.
 * Bottleneck's internal _running counter never decrements -> capacity leak.
 *
 * This patch intercepts Bottleneck's _run method to fix job.doExpire before
 * the expiration timeout fires.
 */

import Bottleneck from "bottleneck";

/** Bottleneck LocalDatastore instance (internal, not exported). */
interface BottleneckLocalDatastore {
  heartbeat: ReturnType<typeof setInterval> | null | undefined;
  storeOptions: {
    reservoirRefreshInterval?: number | null;
    reservoirRefreshAmount?: number | null;
    reservoirIncreaseInterval?: number | null;
    reservoirIncreaseAmount?: number | null;
  };
  _startHeartbeat: () => unknown;
}

let heartbeatPatched = false;

/**
 * Monkey-patch for Bottleneck v2.19.5 LocalDatastore#_startHeartbeat bug.
 *
 * Bug (LocalDatastore.js:26-58): the guard `if (this.heartbeat == null && <config>)`
 * only creates the reservoir-refresh setInterval the FIRST time. Every later call —
 * including the one `updateSettings()` triggers via `__updateSettings__` — takes the
 * `else` branch and does `clearInterval(this.heartbeat)` WITHOUT resetting
 * `this.heartbeat` to null. The stale reference makes all future calls keep taking
 * the dead `else` branch: the periodic reservoir refresh is gone forever after the
 * first manual `updateSettings()` on a limiter that already had a heartbeat.
 *
 * Production symptom (#9529 / weighted.test.ts E2E): after a header-learned
 * updateSettings(), the reservoir zeroes and never refills — the request queue wedges
 * until the watchdog fires a synthetic 502.
 *
 * Fixed semantics:
 *  - refresh config present, no live interval → create (delegate to the original).
 *  - refresh config present, interval alive   → keep it (interval reads storeOptions
 *    live, so updated amounts are picked up) — upstream wrongly killed it here.
 *  - refresh config absent, interval alive    → clearInterval AND null the handle.
 */
export function applyBottleneckHeartbeatPatch(): void {
  if (heartbeatPatched) return;
  heartbeatPatched = true;

  // LocalDatastore is not exported; reach its prototype through a throwaway instance.
  const probe = new Bottleneck({});
  const store = (probe as unknown as { _store: BottleneckLocalDatastore })._store;
  const proto = Object.getPrototypeOf(store) as BottleneckLocalDatastore;
  void probe.disconnect();

  const originalStartHeartbeat = proto._startHeartbeat;
  if (typeof originalStartHeartbeat !== "function") {
    console.warn("[bottleneck-patch] _startHeartbeat not found on LocalDatastore, patch skipped");
    return;
  }

  proto._startHeartbeat = function patchedStartHeartbeat(this: BottleneckLocalDatastore) {
    const opts = this.storeOptions ?? {};
    const wantsHeartbeat =
      (opts.reservoirRefreshInterval != null && opts.reservoirRefreshAmount != null) ||
      (opts.reservoirIncreaseInterval != null && opts.reservoirIncreaseAmount != null);

    if (this.heartbeat != null) {
      if (wantsHeartbeat) return; // alive and still wanted — upstream wrongly cleared it here
      clearInterval(this.heartbeat);
      this.heartbeat = null; // upstream forgot this null-out — the core of the bug
      return;
    }
    return originalStartHeartbeat.call(this);
  };

  console.log("[bottleneck-patch] Applied _startHeartbeat fix for Bottleneck v2.19.5");
}

/** Bottleneck Job instance (internal, not exported). */
interface BottleneckJob {
  options: { id?: string; expiration?: number };
  doExpire: (clearGlobalState: () => void, run: () => void, free: () => void) => void;
  _states: { jobStatus: (id: string) => string | null; next: (id: string) => void };
}

let patched = false;

export function applyBottleneckDoExpirePatch(): void {
  if (patched) return;
  patched = true;

  const proto = Bottleneck.prototype as unknown as Record<string, unknown>;
  const originalRun = proto._run as
    ((index: string, job: BottleneckJob, wait: number) => unknown) | undefined;
  if (typeof originalRun !== "function") {
    console.warn("[bottleneck-patch] _run not found on prototype, patch skipped");
    return;
  }

  proto._run = function patchedRun(this: unknown, index: string, job: BottleneckJob, wait: number) {
    // Patch job.doExpire BEFORE calling originalRun.
    // originalRun passes job.doExpire to setTimeout by reference -- once captured,
    // reassigning the property later has no effect on the queued timer callback.
    //
    // Guard: _run is called twice for jobs with wait > 0 (first with the delay,
    // then with wait=0 when the timer fires). Without the flag, fixedDoExpire
    // would wrap itself recursively on the second call.
    if (typeof job?.doExpire === "function" && !(job as unknown as Record<string, unknown>)._doExpirePatched) {
      (job as unknown as Record<string, unknown>)._doExpirePatched = true;
      const originalDoExpire = job.doExpire.bind(job);
      // Bottleneck registers the job in _states under options.id (Job.js
      // states.start(this.options.id)); a bare `job.id` does not exist and
      // reading it makes the RUNNING check below always miss. options.id is
      // stable on the job and is the key the state machine uses.
      const jobId = job.options.id;

      job.doExpire = function fixedDoExpire(
        clearGlobalState: () => void,
        run: () => void,
        free: () => void
      ) {
        // Fix: check job status, not compare ID to string "RUNNING"
        const states = job._states;
        const currentStatus = states?.jobStatus?.(jobId);
        if (currentStatus === "RUNNING") {
          states?.next?.(jobId);
          console.warn(
            `[bottleneck-patch] doExpire bug triggered: job ${jobId} stuck in RUNNING, ` +
              `advanced to EXECUTING before expiry. This is the Bottleneck v2.19.5 capacity leak.`
          );
        }
        return originalDoExpire(clearGlobalState, run, free);
      };
    }

    // Now call original _run which captures the (now-patched) job.doExpire.
    return originalRun.call(this, index, job, wait);
  };

  console.log("[bottleneck-patch] Applied doExpire fix for Bottleneck v2.19.5");
}
