/**
 * The sweep half of the daily quota revalidation (#20343).
 *
 * `quotaDailyRevalidation.ts` decides which locks are due (pure, tested without a
 * store). This module applies that decision to the real model-lockout store and
 * the upstream: it probes the selected locks, clears the ones that answer and
 * leaves the rest exactly as they were.
 *
 * Opt-in: nothing happens without the QUOTA_DAILY_REVALIDATION flag (default off),
 * mirroring `autoDisabledRevalidation` — a deployment that never opts in keeps the
 * behaviour it had, and no extra upstream request is ever made.
 *
 * Store notes: application, not speculation. `getAllModelLockouts()` returns
 * `lockedAt` as an ISO string and `until` as epoch ms; probes are remembered in a
 * module-local map so a lock probed moments ago is not hammered by the next sweep
 * (the lockout store itself has no "last probed" field, and adding one would mean
 * a migration for a value only this pass reads).
 */
import {
  clearModelLock,
  getAllModelLockouts,
  type ModelLockoutInfo,
} from "@omniroute/open-sse/services/accountFallback.ts";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";

import {
  MAX_DAILY_REVALIDATIONS_PER_SWEEP,
  selectDailyRevalidations,
  type DailyRevalidationCandidate,
} from "@omniroute/open-sse/services/quotaDailyRevalidation.ts";

export const QUOTA_DAILY_REVALIDATION_FLAG = "QUOTA_DAILY_REVALIDATION";

/** What one probe concluded. Only `recovered` unlocks the model. */
export type DailyRevalidationVerdict = "recovered" | "still-locked" | "unknown";

export type DailyRevalidationResult = {
  /** Locks the selector considered due on this sweep. */
  selected: number;
  /** Locks actually probed (a probe may throw; that is not a recovery). */
  probed: number;
  /** Locks cleared because the probe proved the quota was back. */
  recovered: number;
};

/** Probe one lock. Injected so the pass is testable without an upstream call. */
export type DailyRevalidationProbe = (
  candidate: DailyRevalidationCandidate
) => Promise<DailyRevalidationVerdict>;

/**
 * When each lock key was last probed, by this pass, in this process.
 *
 * Keyed by provider/connection/model, the lock's own identity. Bounded by the
 * number of distinct locks the process has probed, and pruned whenever an entry
 * is older than a day (the same interval the selector uses).
 */
const lastProbedAt = new Map<string, number>();

function candidateKey(candidate: DailyRevalidationCandidate): string {
  return `${candidate.provider}\u0000${candidate.connectionId}\u0000${candidate.model ?? ""}`;
}

function pruneProbed(nowMs: number, intervalMs: number): void {
  for (const [key, at] of lastProbedAt) {
    if (nowMs - at > intervalMs) lastProbedAt.delete(key);
  }
}

/** The connection fields that decide whether its locks may be probed. */
type DailyRevalidationConnection = {
  id: string;
  isActive?: boolean | null;
  healthCheckInterval?: number | null;
};

/**
 * Connections whose locks the pass may probe: active, and not opted out of
 * health checks (`healthCheckInterval <= 0`). A probe goes through the regular
 * connection test, which switches a connection back on when it passes, so a
 * lock on an inactive connection (operator-disabled, ban-disabled or switched
 * off by the gateway) must never be probed from here; the capped auto-disabled
 * retest is the only path that may bring such a connection back.
 */
function eligibleConnectionIds(
  connections: readonly DailyRevalidationConnection[] | null | undefined
): Set<string> {
  const ids = new Set<string>();
  for (const connection of Array.isArray(connections) ? connections : []) {
    if (!connection || typeof connection.id !== "string" || connection.id.length === 0) continue;
    if (connection.isActive !== true) continue;
    const interval = connection.healthCheckInterval;
    if (typeof interval === "number" && interval <= 0) continue;
    ids.add(connection.id);
  }
  return ids;
}

/**
 * The active rows, through the shared connection read cache: a state read only.
 * The probe itself goes through testSingleConnection, which defers while an
 * exclusive session lease is active, so this pass never selects a connection.
 */
async function loadActiveConnections(): Promise<DailyRevalidationConnection[]> {
  const { getCachedProviderConnections } = await import("@/lib/db/readCache");
  const rows = await getCachedProviderConnections({ isActive: true });
  return (Array.isArray(rows) ? rows : []) as DailyRevalidationConnection[];
}

/**
 * Whether the operator turned the pass on.
 *
 * Reading the flag can throw (settings unavailable mid-boot); an unreadable flag
 * is treated as off, which is the safe direction: no upstream request.
 */
function isEnabled(): boolean {
  try {
    return isFeatureFlagEnabled(QUOTA_DAILY_REVALIDATION_FLAG);
  } catch {
    return false;
  }
}

/** The store's locks as the selector expects them. */
function toCandidates(nowMs: number): DailyRevalidationCandidate[] {
  return getAllModelLockouts().map((lock: ModelLockoutInfo) => {
    const candidate: DailyRevalidationCandidate = {
      provider: lock.provider,
      connectionId: lock.connectionId,
      model: lock.model,
      until: lock.until,
      lockedAt: Date.parse(lock.lockedAt),
    };
    const probedAt = lastProbedAt.get(candidateKey(candidate));
    if (typeof probedAt === "number") candidate.lastRevalidatedAt = probedAt;
    // `lockedAt` is an ISO string; an unparseable one would make every order
    // comparison NaN, so fall back to the sweep's clock (still oldest-first
    // among the parseable ones).
    if (!Number.isFinite(candidate.lockedAt)) candidate.lockedAt = nowMs;
    return candidate;
  });
}

type DailyRevalidationLogger = { info?: (msg: string) => void; warn?: (msg: string) => void };

function describeError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/** Eligible connection ids, or null when they cannot be read (then nothing is probed). */
async function readEligibleConnectionIds(
  load: () => Promise<DailyRevalidationConnection[]>,
  logger: DailyRevalidationLogger
): Promise<Set<string> | null> {
  try {
    return eligibleConnectionIds(await load());
  } catch (error) {
    // Unreadable connections: probe nothing, the safe direction.
    logger.warn?.(
      `[quota-daily] could not load connections; no probe this sweep: ${describeError(error)}`
    );
    return null;
  }
}

/** Probe one due lock; true when it recovered and its lock was cleared. */
async function revalidateOne(
  candidate: DailyRevalidationCandidate,
  probe: DailyRevalidationProbe,
  nowMs: number,
  logger: DailyRevalidationLogger
): Promise<boolean> {
  const key = candidateKey(candidate);
  // Recorded before the probe: a probe that throws must not be retried in a
  // tight loop against an upstream that is already unhappy.
  lastProbedAt.set(key, nowMs);

  let verdict: DailyRevalidationVerdict;
  try {
    verdict = await probe(candidate);
  } catch (error) {
    logger.warn?.(
      `[quota-daily] probe of ${candidate.provider}/${candidate.model} failed: ${describeError(error)}`
    );
    return false;
  }

  if (verdict !== "recovered") return false;

  clearModelLock(candidate.provider, candidate.connectionId, candidate.model);
  lastProbedAt.delete(key);
  logger.info?.(
    `[quota-daily] ${candidate.provider}/${candidate.model} answered again; lock cleared early`
  );
  return true;
}

/**
 * Probe the quota locks that have outlived a day, once each per day.
 *
 * A passing probe clears the lock so the model returns to rotation; a failing or
 * inconclusive one leaves it untouched, because the upstream never confirmed the
 * quota was back. Only locks on active connections that keep their health
 * checks are probed, and nothing runs while the sweep cadence is 0.
 */
export async function runDailyQuotaRevalidation(
  deps: {
    nowMs?: number;
    /** Overrides the feature flag. Tests set it; production reads the flag. */
    enabled?: boolean;
    /** The sweep's global cadence; 0 means the operator turned the sweep off. */
    sweepIntervalMs?: number;
    /** Connections the locks belong to; production reads the active ones. */
    loadConnections?: () => Promise<DailyRevalidationConnection[]>;
    probe?: DailyRevalidationProbe;
    limit?: number;
    logger?: DailyRevalidationLogger;
  } = {}
): Promise<DailyRevalidationResult> {
  const result: DailyRevalidationResult = { selected: 0, probed: 0, recovered: 0 };
  const enabled = deps.enabled ?? isEnabled();
  if (!enabled) return result;
  // An operator who set the sweep cadence to 0 turned the sweep off: no probe.
  if (deps.sweepIntervalMs !== undefined && !(deps.sweepIntervalMs > 0)) return result;

  const probe = deps.probe ?? probeWithConnectionTest;

  const nowMs = deps.nowMs ?? Date.now();
  const logger = deps.logger ?? {
    info: (msg: string) => console.log(msg),
    warn: (msg: string) => console.warn(msg),
  };

  pruneProbed(nowMs, 24 * 60 * 60 * 1000);

  const eligible = await readEligibleConnectionIds(
    deps.loadConnections ?? loadActiveConnections,
    logger
  );
  if (!eligible) return result;

  const limit = deps.limit ?? MAX_DAILY_REVALIDATIONS_PER_SWEEP;
  const candidates = toCandidates(nowMs).filter((candidate) =>
    eligible.has(candidate.connectionId)
  );
  const due = selectDailyRevalidations(candidates, nowMs, limit, { enabled: true });
  result.selected = due.length;

  for (const candidate of due) {
    result.probed += 1;
    if (await revalidateOne(candidate, probe, nowMs, logger)) result.recovered += 1;
  }

  return result;
}

/**
 * The production probe: re-test the connection with the locked model.
 *
 * `testSingleConnection(id, model)` is the same path the operator's "test" button
 * takes, and the one `autoDisabledRevalidation` already uses, so a probe cannot
 * drift from what a real request would do. `valid` is the only verdict that says
 * the quota is back; a skipped (unverifiable) test must not unlock a model on a
 * guess.
 */
export const probeWithConnectionTest: DailyRevalidationProbe = async (candidate) => {
  const { testSingleConnection } = await import("@/app/api/providers/[id]/test/route");
  const outcome = await testSingleConnection(
    candidate.connectionId,
    candidate.model ?? undefined,
    // Never flip a connection on from here: this pass only decides whether the
    // quota recovered, and `isActive` is someone else's decision.
    { activateUnverified: false }
  );
  if (outcome?.skipped) return "unknown";
  return outcome?.valid ? "recovered" : "still-locked";
};
