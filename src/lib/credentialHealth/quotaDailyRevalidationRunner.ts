/**
 * The sweep half of the daily quota revalidation (#20343).
 *
 * `quotaDailyRevalidation.ts` decides which locks are due (pure, tested without a
 * store). This module applies that decision to the real model-lockout store and
 * the upstream: it probes the selected locks (`quotaRevalidationProbe.ts`: one
 * minimal request to the locked model on its connection), clears the ones whose
 * model answered and leaves the rest locked.
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
  probeLockedModel,
  type DailyRevalidationVerdict,
} from "@/lib/credentialHealth/quotaRevalidationProbe";
import { lockProviderAliases } from "@/lib/credentialHealth/lockProviderAliases";
import { releasePersistedFamilyLock } from "@/lib/credentialHealth/quotaProbeRecoveryRelease";

import {
  MAX_DAILY_REVALIDATIONS_PER_SWEEP,
  selectDailyRevalidations,
  type DailyRevalidationCandidate,
} from "@omniroute/open-sse/services/quotaDailyRevalidation.ts";

export const QUOTA_DAILY_REVALIDATION_FLAG = "QUOTA_DAILY_REVALIDATION";

export type { DailyRevalidationVerdict };

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
  // A family lock is installed under EVERY spelling its provider answers to
  // (`agy` AND `antigravity`, see lockAntigravityFamilyModel), so those keys are one
  // lock set: they get one probe and one throttle entry, not two of each for one quota.
  const providerKey =
    candidate.scope === "quota_family"
      ? (lockProviderAliases(candidate.provider)[0] ?? candidate.provider)
      : candidate.provider;
  return `${providerKey}\u0000${candidate.connectionId}\u0000${candidate.model ?? ""}`;
}

function pruneProbed(nowMs: number, intervalMs: number): void {
  for (const [key, at] of lastProbedAt) {
    if (nowMs - at > intervalMs) lastProbedAt.delete(key);
  }
}

/** The connection fields that decide whether its locks may be probed. */
type DailyRevalidationConnection = {
  id: string;
  provider?: string | null;
  isActive?: boolean | null;
  healthCheckInterval?: number | null;
};

/**
 * Connections whose locks the pass may probe: active, and not opted out of
 * health checks (`healthCheckInterval <= 0`). A lock on an inactive connection
 * (operator-disabled, ban-disabled or switched off by the gateway) is never
 * probed from here: a pinned request to an inactive connection is the explicit
 * re-activation probe, and the capped auto-disabled retest is the only path that
 * may bring such a connection back.
 *
 * Keyed by id so the sweep also learns each connection's OWN provider spelling.
 */
function eligibleConnections(
  connections: readonly DailyRevalidationConnection[] | null | undefined
): Map<string, DailyRevalidationConnection> {
  const byId = new Map<string, DailyRevalidationConnection>();
  for (const connection of Array.isArray(connections) ? connections : []) {
    if (!connection || typeof connection.id !== "string" || connection.id.length === 0) continue;
    if (connection.isActive !== true) continue;
    const interval = connection.healthCheckInterval;
    if (typeof interval === "number" && interval <= 0) continue;
    byId.set(connection.id, connection);
  }
  return byId;
}

/**
 * The active rows, through the shared connection read cache: a state read only.
 * The probe itself goes through the model-test runner, which refuses a connection
 * under an exclusive session lease, so this pass never selects a connection.
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

/**
 * The store's locks as the selector expects them, one per provider/connection/model.
 * A family key and an exact key are distinct entities (`family:gemini` covers the
 * bucket, `exact:gemini-3-pro` covers one model), so each keeps its own probe and its
 * own throttle entry — clearing one never clears the other.
 */
function toCandidates(nowMs: number): DailyRevalidationCandidate[] {
  const byKey = new Map<string, DailyRevalidationCandidate>();
  for (const lock of getAllModelLockouts()) {
    const candidate = toCandidate(lock, nowMs);
    const key = candidateKey(candidate);
    const seen = byKey.get(key);
    if (!seen || candidate.until > seen.until) byKey.set(key, candidate);
  }
  return [...byKey.values()];
}

function toCandidate(lock: ModelLockoutInfo, nowMs: number): DailyRevalidationCandidate {
  const candidate: DailyRevalidationCandidate = {
    provider: lock.provider,
    connectionId: lock.connectionId,
    model: lock.model,
    scope: lock.scope,
    reason: lock.reason,
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
}

type DailyRevalidationLogger = { info?: (msg: string) => void; warn?: (msg: string) => void };

function describeError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/** Eligible connections by id, or null when they cannot be read (then nothing is probed). */
async function readEligibleConnections(
  load: () => Promise<DailyRevalidationConnection[]>,
  logger: DailyRevalidationLogger
): Promise<Map<string, DailyRevalidationConnection> | null> {
  try {
    return eligibleConnections(await load());
  } catch (error) {
    // Unreadable connections: probe nothing, the safe direction.
    logger.warn?.(
      `[quota-daily] could not load connections; no probe this sweep: ${describeError(error)}`
    );
    return null;
  }
}

/** Release the connection-row record of a recovered family lock; injected so a sweep is testable without a DB. */
export type DailyRevalidationFamilyRelease = (
  candidate: DailyRevalidationCandidate
) => Promise<boolean>;

/** Probe one due lock; true when it recovered and its lock was cleared. */
async function revalidateOne(
  candidate: DailyRevalidationCandidate,
  probe: DailyRevalidationProbe,
  nowMs: number,
  logger: DailyRevalidationLogger,
  releaseFamilyLock: DailyRevalidationFamilyRelease
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

  // The same family is installed under every spelling the provider answers to
  // (`agy` AND `antigravity`), so a recovery has to clear all of them or the sibling
  // spelling keeps the family parked.
  for (const alias of lockProviderAliases(candidate.provider)) {
    clearModelLock(alias, candidate.connectionId, candidate.model);
  }
  // A family lock lives on the connection row too; the in-memory clear alone would be
  // rehydrated back on the next credential read. Both family providers persist it, and
  // the release is scoped to the family this lock recorded.
  if (candidate.scope === "quota_family") {
    await releaseFamilyLock(candidate);
  }
  lastProbedAt.delete(key);
  logger.info?.(
    `[quota-daily] ${candidate.provider}/${candidate.model} answered again; lock cleared early`
  );
  return true;
}

/**
 * Probe the quota locks that have outlived a day, once each per day.
 *
 * Each probe is one minimal request to the locked model on its connection. When
 * the model answers, its lock is cleared and it returns to rotation; a quota
 * answer keeps the lock (refreshed from the announced reset), and any other
 * outcome leaves it untouched, because the upstream never confirmed the quota was
 * back. Only that model's lock is ever affected. Only locks on active connections
 * that keep their health checks are probed, and nothing runs while the sweep
 * cadence is 0.
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
    /**
     * Drops the connection-row record of a recovered family lock (Codex scope cooldown,
     * Antigravity family cooldown). Injected so a sweep is testable without a DB; tests
     * override it to assert the release happens for family locks only.
     */
    releaseFamilyLock?: DailyRevalidationFamilyRelease;
    limit?: number;
    logger?: DailyRevalidationLogger;
  } = {}
): Promise<DailyRevalidationResult> {
  const result: DailyRevalidationResult = { selected: 0, probed: 0, recovered: 0 };
  const enabled = deps.enabled ?? isEnabled();
  if (!enabled) return result;
  // An operator who set the sweep cadence to 0 turned the sweep off: no probe.
  if (deps.sweepIntervalMs !== undefined && !(deps.sweepIntervalMs > 0)) return result;

  const nowMs = deps.nowMs ?? Date.now();
  const logger = deps.logger ?? {
    info: (msg: string) => console.log(msg),
    warn: (msg: string) => console.warn(msg),
  };
  const probe: DailyRevalidationProbe =
    deps.probe ?? ((candidate) => probeLockedModel(candidate, { logger, nowMs }));
  const releaseFamilyLock: DailyRevalidationFamilyRelease =
    deps.releaseFamilyLock ?? ((candidate) => releasePersistedFamilyLock(candidate, logger));

  pruneProbed(nowMs, 24 * 60 * 60 * 1000);

  const eligible = await readEligibleConnections(
    deps.loadConnections ?? loadActiveConnections,
    logger
  );
  if (!eligible) return result;

  const limit = deps.limit ?? MAX_DAILY_REVALIDATIONS_PER_SWEEP;
  const candidates = toCandidates(nowMs)
    .filter((candidate) => eligible.has(candidate.connectionId))
    // The lock records the spelling that failed; the probe must ask through the
    // connection's OWN provider, or a pinned request can name a provider id the
    // connection does not carry (`agy` vs `antigravity`).
    .map((candidate) => {
      const connectionProvider = eligible.get(candidate.connectionId)?.provider;
      return connectionProvider ? { ...candidate, provider: connectionProvider } : candidate;
    });
  const due = selectDailyRevalidations(candidates, nowMs, limit, { enabled: true });
  result.selected = due.length;

  for (const candidate of due) {
    result.probed += 1;
    if (await revalidateOne(candidate, probe, nowMs, logger, releaseFamilyLock))
      result.recovered += 1;
  }

  return result;
}
