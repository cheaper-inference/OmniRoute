/**
 * codexWakeups.ts — scheduled Codex account wakeups.
 *
 * The opt-in auto-ping in quotaAutoPing.ts reacts to a session window that slid while
 * idle. Wakeups are the operator-driven counterpart: a task pings chosen Codex OAuth
 * accounts at a fixed time (daily, in a timezone, on chosen weekdays) or every N minutes,
 * so a 5h window starts when the operator wants it to — e.g. before the workday.
 *
 * Each account is pinged in sequence through the same Codex executor and the same
 * `response.completed` check as the auto-ping (sendCodexPing). An account is skipped
 * without spending quota when the provider circuit breaker is open, the connection is in
 * cooldown or held by an exclusive lease, or its session/weekly quota is exhausted. One
 * ping per account at a time per process, 60s timeout per account. Outcomes are fixed
 * `{ status, reason }` codes — never upstream error text.
 *
 * The scheduler ticks every 30s (unref'd), with a re-entrancy guard and an injectable
 * clock; the DB claim (see src/lib/db/codexWakeups.ts) keeps two processes from running
 * the same task. No tasks exist until the operator creates one.
 */
import { logger } from "@omniroute/open-sse/utils/logger.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { getProviderConnectionById } from "@/lib/db/providers";
import {
  claimCodexWakeupRun,
  finishCodexWakeupRun,
  listCodexWakeupTasks,
  recordCodexWakeupResult,
  recoverCodexWakeupRuns,
  type CodexWakeupClaim,
  type CodexWakeupRun,
  type CodexWakeupRunResult,
  type CodexWakeupTask,
  type CodexWakeupTrigger,
} from "@/lib/db/codexWakeups";
import { QUOTA_AUTOPING_PROVIDERS } from "@/shared/constants/quotaAutoPing";
import type { CodexWakeupSchedule } from "@/shared/validation/codexWakeupSchemas";
import { nextWakeupAt } from "./codexWakeupSchedule";
import {
  createDefaultQuotaAutoPingDeps,
  hasExhaustedBlockingQuota,
  isQuotaExhausted,
  normalizeResetKey,
  sendCodexPing,
  type QuotaAutoPingConnection,
  type QuotaAutoPingDeps,
} from "./quotaAutoPing";

const log = logger("CodexWakeups");

export const CODEX_WAKEUP_TICK_INTERVAL_MS = 30_000;
export const CODEX_WAKEUP_PING_TIMEOUT_MS = 60_000;

export type CodexWakeupPingStatus = CodexWakeupRunResult["status"];
export type CodexWakeupPingReason =
  | "completed"
  | "not_found"
  | "unsupported"
  | "inactive"
  | "busy"
  | "unavailable"
  | "no_model"
  | "auth_failed"
  | "no_token"
  | "quota_unavailable"
  | "quota_exhausted"
  | "not_completed"
  | "timeout"
  | "error";

export interface CodexWakeupPingResult {
  status: CodexWakeupPingStatus;
  reason: CodexWakeupPingReason;
}

type WakeupConnection = QuotaAutoPingConnection & { isActive?: boolean | null };

export interface CodexWakeupStore {
  listTasks: () => CodexWakeupTask[];
  claimRun: (
    taskId: string,
    trigger: CodexWakeupTrigger,
    nowMs: number,
    computeNextRunAt: (schedule: CodexWakeupSchedule, after: number) => string | null
  ) => CodexWakeupClaim | null;
  recordResult: (runId: string, result: CodexWakeupRunResult) => void;
  finishRun: (runId: string, nowMs: number, interrupted?: boolean) => unknown;
  recoverRuns: (nowMs: number) => number;
}

export interface CodexWakeupDeps extends QuotaAutoPingDeps {
  getProviderConnectionById: (id: string) => Promise<WakeupConnection | null>;
  store: CodexWakeupStore;
}

export interface CodexWakeupState {
  /** Re-entrancy guard for the scheduler tick. */
  ticking: boolean;
  /** Connection ids with a wakeup ping in flight (per-process lock). */
  inFlight: Set<string>;
  /** Runs started by this process and not finished yet. */
  runs: Set<Promise<void>>;
  pingTimeoutMs: number;
}

export function createCodexWakeupState(): CodexWakeupState {
  return {
    ticking: false,
    inFlight: new Set(),
    runs: new Set(),
    pingTimeoutMs: CODEX_WAKEUP_PING_TIMEOUT_MS,
  };
}

export function createDbCodexWakeupStore(): CodexWakeupStore {
  return {
    listTasks: listCodexWakeupTasks,
    claimRun: claimCodexWakeupRun,
    recordResult: recordCodexWakeupResult,
    finishRun: finishCodexWakeupRun,
    recoverRuns: recoverCodexWakeupRuns,
  };
}

export function createDefaultCodexWakeupDeps(): CodexWakeupDeps {
  return {
    ...createDefaultQuotaAutoPingDeps(),
    // DB rows are untyped records; the wakeup only reads the WakeupConnection fields.
    getProviderConnectionById:
      getProviderConnectionById as unknown as CodexWakeupDeps["getProviderConnectionById"],
    store: createDbCodexWakeupStore(),
  };
}

const sharedState = createCodexWakeupState();

export function getSharedCodexWakeupState(): CodexWakeupState {
  return sharedState;
}

function outcome(status: CodexWakeupPingStatus, reason: CodexWakeupPingReason) {
  return { status, reason };
}

function warn(message: string, err: unknown): void {
  log.warn(message, { error: sanitizeErrorMessage((err as Error)?.message ?? String(err)) });
}

function isUsableAccount(connection: WakeupConnection | null): boolean {
  return Boolean(
    connection &&
    connection.provider === "codex" &&
    connection.authType === "oauth" &&
    connection.isActive !== false
  );
}

function rejectConnection(connection: WakeupConnection | null): CodexWakeupPingResult | null {
  if (!connection) return outcome("skipped", "not_found");
  if (connection.provider !== "codex" || connection.authType !== "oauth") {
    return outcome("skipped", "unsupported");
  }
  if (connection.isActive === false) return outcome("skipped", "inactive");
  return null;
}

function isCoolingDown(connection: WakeupConnection): boolean {
  const untilMs = connection.rateLimitedUntil ? Date.parse(connection.rateLimitedUntil) : NaN;
  return Number.isFinite(untilMs) && untilMs > Date.now();
}

async function isAccountBlocked(connection: WakeupConnection, deps: CodexWakeupDeps) {
  if (!deps.canExecuteProvider("codex")) return true; // provider circuit breaker OPEN
  if (isCoolingDown(connection)) return true; // connection cooldown
  return deps.isConnectionUnavailableToAuxiliaryActivity(connection.id); // exclusive lease
}

async function pingWithQuotaCheck(
  current: QuotaAutoPingConnection,
  pingModel: string,
  deps: CodexWakeupDeps,
  signal: AbortSignal
): Promise<CodexWakeupPingResult> {
  const providerConfig = { ...QUOTA_AUTOPING_PROVIDERS.codex, pingModel };
  await deps.throttleQuotaFetch();
  const usage = await deps.getCodexUsage(current.accessToken, current.providerSpecificData);
  const quotas = (usage?.quotas as Record<string, unknown> | undefined) || {};
  const quota = quotas[providerConfig.quotaKey] as Record<string, unknown> | undefined;
  if (!quota) return outcome("skipped", "quota_unavailable");
  if (isQuotaExhausted(quota) || hasExhaustedBlockingQuota(quotas, providerConfig.quotaKey)) {
    return outcome("skipped", "quota_exhausted");
  }
  signal.throwIfAborted();
  const ok = await sendCodexPing(current, providerConfig, deps, signal);
  signal.throwIfAborted();
  if (!ok) return outcome("failed", "not_completed");

  const resetAt = typeof quota.resetAt === "string" ? quota.resetAt : null;
  // Recording the window keeps the opt-in auto-ping from re-pinging the same window.
  await deps.updateProviderConnection(current.id, {
    lastPingAt: new Date().toISOString(),
    ...(resetAt ? { lastPingedResetKey: normalizeResetKey(resetAt) } : {}),
  });
  log.info(`codex:${current.id}: wakeup ping sent`, { model: pingModel });
  return outcome("succeeded", "completed");
}

async function runAccountPing(
  connection: WakeupConnection,
  deps: CodexWakeupDeps,
  signal: AbortSignal
): Promise<CodexWakeupPingResult> {
  if (await isAccountBlocked(connection, deps)) return outcome("skipped", "unavailable");
  const pingModel = await deps.resolvePingModel("codex", Date.now());
  if (!pingModel) return outcome("skipped", "no_model");

  let current: QuotaAutoPingConnection;
  try {
    current = (await deps.refreshAndUpdateCredentials(connection)).connection;
  } catch (err) {
    warn(`codex:${connection.id}: credential refresh failed`, err);
    return outcome("failed", "auth_failed");
  }
  if (!current?.accessToken) return outcome("skipped", "no_token");

  const proxyInfo = await deps.resolveProxyForConnection(current.id);
  return deps.runWithProxyContext(proxyInfo?.proxy ?? null, () =>
    pingWithQuotaCheck(current, pingModel, deps, signal)
  );
}

async function withTimeout(
  work: (signal: AbortSignal) => Promise<CodexWakeupPingResult>,
  timeoutMs: number,
  connectionId: string
): Promise<CodexWakeupPingResult> {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<CodexWakeupPingResult>((resolve) => {
    timer = setTimeout(() => {
      controller.abort();
      resolve(outcome("failed", "timeout"));
    }, timeoutMs);
  });
  const guarded = work(controller.signal).catch((err) => {
    if (controller.signal.aborted) return outcome("failed", "timeout");
    warn(`codex:${connectionId}: wakeup ping error`, err);
    return outcome("failed", "error");
  });
  try {
    return await Promise.race([guarded, timeout]);
  } finally {
    clearTimeout(timer);
  }
}

/** Ping one Codex account for a wakeup run. Never throws. */
export async function pingCodexAccountForWakeup(
  connectionId: string,
  deps: CodexWakeupDeps = createDefaultCodexWakeupDeps(),
  state: CodexWakeupState = sharedState
): Promise<CodexWakeupPingResult> {
  let connection: WakeupConnection | null;
  try {
    connection = await deps.getProviderConnectionById(connectionId);
  } catch (err) {
    warn(`codex:${connectionId}: connection lookup failed`, err);
    return outcome("failed", "error");
  }
  const rejected = rejectConnection(connection);
  if (rejected) return rejected;
  if (state.inFlight.has(connectionId)) return outcome("skipped", "busy");

  state.inFlight.add(connectionId);
  try {
    return await withTimeout(
      (signal) => runAccountPing(connection as WakeupConnection, deps, signal),
      state.pingTimeoutMs,
      connectionId
    );
  } finally {
    state.inFlight.delete(connectionId);
  }
}

/** Ping every account of a claimed run in sequence, recording each result. */
export async function executeCodexWakeupRun(
  claim: CodexWakeupClaim,
  deps: CodexWakeupDeps,
  state: CodexWakeupState,
  now: () => number = Date.now
): Promise<void> {
  try {
    for (const connectionId of claim.task.connectionIds) {
      const startedAt = Date.now();
      const result = await pingCodexAccountForWakeup(connectionId, deps, state);
      deps.store.recordResult(claim.run.id, {
        connectionId,
        ...result,
        durationMs: Date.now() - startedAt,
      });
    }
    deps.store.finishRun(claim.run.id, now());
  } catch (err) {
    warn(`run ${claim.run.id}: interrupted`, err);
    deps.store.finishRun(claim.run.id, now(), true);
  }
}

function trackRun(
  claim: CodexWakeupClaim,
  deps: CodexWakeupDeps,
  state: CodexWakeupState,
  now: () => number
): void {
  const run: Promise<void> = executeCodexWakeupRun(claim, deps, state, now)
    .catch((err) => warn(`run ${claim.run.id}: failed to persist`, err))
    .finally(() => state.runs.delete(run));
  state.runs.add(run);
}

/**
 * One scheduler tick: recover runs orphaned by a dead process, then claim and start
 * every enabled task that is due. Returns how many runs were started.
 */
export async function runCodexWakeupTick(
  deps: CodexWakeupDeps = createDefaultCodexWakeupDeps(),
  state: CodexWakeupState = sharedState,
  now: () => number = Date.now
): Promise<number> {
  if (state.ticking) return 0;
  state.ticking = true;
  let started = 0;
  try {
    const nowMs = now();
    deps.store.recoverRuns(nowMs);
    for (const task of deps.store.listTasks()) {
      if (!task.enabled || !task.nextRunAt || Date.parse(task.nextRunAt) > nowMs) continue;
      const claim = deps.store.claimRun(task.id, "scheduled", nowMs, nextWakeupAt);
      if (!claim) continue;
      trackRun(claim, deps, state, now);
      started += 1;
    }
  } catch (err) {
    warn("tick error", err);
  } finally {
    state.ticking = false;
  }
  return started;
}

/**
 * Start a manual run of `taskId` now, without touching its schedule. Returns null when
 * another run of the task is still live. Throws `CodexWakeupStoreError("not_found")`.
 */
export function runCodexWakeupTaskNow(
  taskId: string,
  deps: CodexWakeupDeps = createDefaultCodexWakeupDeps(),
  state: CodexWakeupState = sharedState,
  now: () => number = Date.now
): CodexWakeupRun | null {
  const nowMs = now();
  deps.store.recoverRuns(nowMs);
  const claim = deps.store.claimRun(taskId, "manual", nowMs, nextWakeupAt);
  if (!claim) return null;
  trackRun(claim, deps, state, now);
  return claim.run;
}

/** Resolve once every run this process started has finished (tests, shutdown). */
export async function waitForCodexWakeupRuns(state: CodexWakeupState = sharedState) {
  while (state.runs.size > 0) {
    await Promise.allSettled([...state.runs]);
  }
}

/** Ids from `connectionIds` that are not active Codex OAuth connections. */
export async function findUnusableWakeupAccounts(
  connectionIds: string[],
  deps: Pick<CodexWakeupDeps, "getProviderConnectionById"> = createDefaultCodexWakeupDeps()
): Promise<string[]> {
  const unusable: string[] = [];
  for (const id of connectionIds) {
    if (!isUsableAccount(await deps.getProviderConnectionById(id))) unusable.push(id);
  }
  return unusable;
}

let schedulerInterval: ReturnType<typeof setInterval> | null = null;

function tick(): void {
  runCodexWakeupTick(createDefaultCodexWakeupDeps(), sharedState).catch(() => undefined);
}

/** Start the in-process scheduler. Idempotent; a no-op until a task exists and is due. */
export function startCodexWakeups(): void {
  if (schedulerInterval) return;
  log.info("scheduler started");
  tick();
  schedulerInterval = setInterval(tick, CODEX_WAKEUP_TICK_INTERVAL_MS);
  schedulerInterval.unref?.();
}

/** Stop the in-process scheduler. Idempotent. */
export function stopCodexWakeups(): void {
  if (!schedulerInterval) return;
  clearInterval(schedulerInterval);
  schedulerInterval = null;
  log.info("scheduler stopped");
}
