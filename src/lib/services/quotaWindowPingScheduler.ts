/**
 * quotaWindowPingScheduler.ts — the lazy 30 s scheduler for quota window ping targets.
 *
 * Default-off and lazy: `startQuotaWindowPingScheduler()` reads the kill switch once and
 * returns without a timer or a target query unless the switch is on AND at least one
 * enabled target exists. The tick re-reads the switch (so a process that missed a
 * settings write disarms itself within one tick), recovers orphaned `running` rows, and
 * claims each enabled, due target through the runner (whose DB claim is the cross-process
 * lease). A module-level set is the per-process in-flight guard.
 */
import { logger } from "@omniroute/open-sse/utils/logger.ts";
import {
  QUOTA_WINDOW_PING_TICK_INTERVAL_MS,
  isQuotaWindowPingEnabled,
} from "@/shared/constants/quotaWindowPing";
import {
  createDefaultQuotaWindowPingDeps,
  runWindowPingTarget,
  type QuotaWindowPingDeps,
} from "./quotaWindowPing";

const log = logger("QuotaWindowPingScheduler");

export interface QuotaWindowPingSchedulerState {
  ticking: boolean;
  interval: ReturnType<typeof setInterval> | null;
}

export function createQuotaWindowPingSchedulerState(): QuotaWindowPingSchedulerState {
  return { ticking: false, interval: null };
}

const sharedState = createQuotaWindowPingSchedulerState();

/** Per-process in-flight guard; the DB claim covers other processes. */
const inFlightTargets = new Set<string>();

async function isKillSwitchOn(deps: QuotaWindowPingDeps): Promise<boolean> {
  try {
    return isQuotaWindowPingEnabled(await deps.getSettings());
  } catch {
    // Fail closed: without a readable switch there is nothing to arm.
    return false;
  }
}

/**
 * One tick: recover orphaned running rows, then claim and run every enabled due target.
 * Returns the number of claims started.
 */
export async function runQuotaWindowPingTick(
  deps: QuotaWindowPingDeps = createDefaultQuotaWindowPingDeps(),
  state: QuotaWindowPingSchedulerState = sharedState,
  now: () => number = Date.now
): Promise<number> {
  if (state.ticking) return 0;
  state.ticking = true;
  const nowMs = now();
  let started = 0;
  try {
    deps.store.recoverWindowPingRuns(nowMs);
    if (!(await isKillSwitchOn(deps))) {
      stopQuotaWindowPingScheduler(state);
      return 0;
    }
    for (const target of deps.store.listWindowPingTargets()) {
      if (!target.enabled || !target.nextRunAt) continue;
      const dueMs = Date.parse(target.nextRunAt);
      if (!Number.isFinite(dueMs) || dueMs > nowMs) continue;
      if (inFlightTargets.has(target.id)) continue;
      inFlightTargets.add(target.id);
      try {
        const outcome = await runWindowPingTarget(target.id, "scheduled", deps, now);
        // An in_flight claim writes an audit row but starts no ping.
        if (outcome && outcome.decision.reason !== "in_flight") started += 1;
      } catch {
        log.warn("target run failed", { target: target.id });
      } finally {
        inFlightTargets.delete(target.id);
      }
    }
  } catch {
    log.warn("tick failed");
  } finally {
    state.ticking = false;
  }
  return started;
}

/** Lazy boot: no timer, no tick, no polling unless the switch is on and a target exists. */
export async function startQuotaWindowPingScheduler(
  deps: QuotaWindowPingDeps = createDefaultQuotaWindowPingDeps(),
  state: QuotaWindowPingSchedulerState = sharedState,
  now: () => number = Date.now
): Promise<void> {
  if (state.interval !== null) return;
  if (!(await isKillSwitchOn(deps))) return;
  if (deps.store.countEnabledWindowPingTargets() <= 0) return;
  state.interval = setInterval(() => {
    void runQuotaWindowPingTick(deps, state, now).catch(() => undefined);
  }, QUOTA_WINDOW_PING_TICK_INTERVAL_MS);
  state.interval.unref?.();
  log.info("scheduler armed");
  void runQuotaWindowPingTick(deps, state, now).catch(() => undefined);
}

export function stopQuotaWindowPingScheduler(
  state: QuotaWindowPingSchedulerState = sharedState
): void {
  if (state.interval === null) return;
  clearInterval(state.interval);
  state.interval = null;
  log.info("scheduler stopped");
}

/** Called on every settings write and target CRUD write: arm or disarm. */
export async function refreshQuotaWindowPingScheduler(
  deps: QuotaWindowPingDeps = createDefaultQuotaWindowPingDeps(),
  state: QuotaWindowPingSchedulerState = sharedState,
  now: () => number = Date.now
): Promise<void> {
  stopQuotaWindowPingScheduler(state);
  await startQuotaWindowPingScheduler(deps, state, now);
}

export function isQuotaWindowPingSchedulerArmed(
  state: QuotaWindowPingSchedulerState = sharedState
): boolean {
  return state.interval !== null;
}
