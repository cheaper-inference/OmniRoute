/**
 * Model Health Check Scheduler (#11777)
 *
 * Periodically probes the models of every provider connection that opted in
 * (`providerSpecificData.autoHealthCheck === true`) and keeps `GET /v1/models`
 * honest without an operator babysitting "Test all models":
 *
 *   - a hard, model-level failure (e.g. 404 / 400) hides the model and records which
 *     connection's probe hid it (`modelHealthAutoHidden` marks);
 *   - a passing probe restores a model ONLY when that same connection's health check
 *     hid it. A model the user hid (no mark, or the user touched it afterwards and
 *     the mark was cleared) or another connection hid is never un-hidden;
 *   - rate limits, timeouts, transient errors, quota exhaustion, skipped probes and
 *     connection-level failures (401/402/403, 5xx, thrown runner errors) change
 *     nothing: an expired key or a provider outage must not blank a catalog;
 *   - a pass stops early after a run of same-class connection-level failures.
 *
 * Probes run in-process through `runSingleModelTest()` with the connection id, so
 * they go through the same per-connection rate limiter as live traffic and need no
 * HTTP round-trip to the dashboard (no internal URL, no SSRF surface). The same
 * stop rules as Test-all apply: stop a connection's pass after a 429 storm, and
 * after repeated bot/Cloudflare blocks on slow-probe providers.
 *
 * Modelled on `modelSyncScheduler.ts`: startup delay, fixed interval, timers
 * unref'd, a single-flight guard so cycles never overlap.
 * Interval override: MODEL_HEALTH_CHECK_INTERVAL_HOURS (default 12h).
 */
import {
  DEFAULT_MODEL_TEST_TIMEOUT_MS,
  runSingleModelTest,
  type SingleModelTestResult,
} from "@/lib/api/modelTestRunner";
import {
  CONSECUTIVE_BOT_STOP_THRESHOLD,
  CONSECUTIVE_RATE_LIMIT_STOP_THRESHOLD,
  SLOW_PROBE_DELAY_MS,
  SLOW_PROBE_PROVIDERS,
  isBotBlockedOutcome,
  isHealthyOutcome,
  isSchedulerHideWorthyFailure,
  advanceConnectionFailureStreak,
  CONSECUTIVE_CONNECTION_FAILURE_STOP_THRESHOLD,
  type ConnectionFailureStreak,
  type ProbeOutcome,
} from "@/lib/api/modelHealthClassification";
import {
  clearHealthCheckHiddenMarks,
  isHiddenByHealthCheck,
  markHiddenByHealthCheck,
} from "@/lib/db/modelHealthAutoHidden";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export const MODEL_HEALTH_CHECK_DEFAULT_INTERVAL_MS = 12 * 60 * 60 * 1000; // 12 hours
/** Start after model sync's first pass (90s) so the catalog is fresh. */
export const MODEL_HEALTH_CHECK_STARTUP_DELAY_MS = 5 * 60 * 1000;
/** Hard cap per connection per cycle so a huge catalog cannot run for hours. */
export const MODEL_HEALTH_CHECK_MAX_MODELS_PER_CONNECTION = 200;

export interface HealthCheckConnection {
  id: string;
  provider: string;
  name?: string;
}

export type HealthCheckAction = "hidden" | "restored" | "unchanged" | "skipped";

export interface ConnectionHealthCheckResult {
  connectionId: string;
  provider: string;
  tested: number;
  hidden: string[];
  restored: string[];
  stoppedEarly?: "consecutive_rate_limits" | "consecutive_bot_blocks" | "connection_level_failures";
}

/** Injected seams — production defaults below, tests pass fakes. */
export interface HealthCheckDeps {
  listModelIds: (provider: string, connectionId: string) => Promise<string[]>;
  probe: (provider: string, modelId: string, connectionId: string) => Promise<ProbeOutcome>;
  isHidden: (provider: string, modelId: string) => boolean;
  setHidden: (provider: string, modelId: string, hidden: boolean) => void;
  sleep: (ms: number) => Promise<void>;
  log: (message: string) => void;
}

export function isHealthCheckEnabled(psd: Record<string, unknown> | null | undefined): boolean {
  return psd?.autoHealthCheck === true;
}

function defaultSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function defaultListModelIds(provider: string, connectionId: string): Promise<string[]> {
  const { getSyncedAvailableModelsForConnection } = await import("@/lib/db/models");
  const models = await getSyncedAvailableModelsForConnection(provider, connectionId);
  return models.map((m) => m.id).filter((id) => typeof id === "string" && id.length > 0);
}

/**
 * `runSingleModelTest()` rejects probes for connections under an exclusive lease with a
 * local 409 and no upstream status. That is the runner declining to dispatch, not a
 * model failure, so it must never hide a model.
 */
function isLocalLeaseRejection(result: SingleModelTestResult): boolean {
  return (
    result.httpStatus === 409 &&
    result.statusCode === undefined &&
    typeof result.error === "string" &&
    result.error.includes("managed lease")
  );
}

/** Map a runner result onto the shared ProbeOutcome. Exported for tests. */
export function mapSingleModelTestResult(result: SingleModelTestResult): ProbeOutcome {
  const skipped = result.skipped === true || isLocalLeaseRejection(result);
  return {
    status: result.status === "ok" ? "ok" : result.status === "slow" ? "slow" : "error",
    ...(result.statusCode !== undefined ? { statusCode: result.statusCode } : {}),
    ...(result.httpStatus !== undefined ? { httpStatus: result.httpStatus } : {}),
    ...(result.error !== undefined ? { error: result.error } : {}),
    ...(result.rateLimited === true ? { rateLimited: true } : {}),
    ...(result.isTransient === true ? { isTransient: true } : {}),
    ...(result.isQuota === true ? { isQuota: true } : {}),
    ...(result.isTimeout === true ? { isTimeout: true } : {}),
    ...(skipped ? { skipped: true } : {}),
  };
}

async function defaultProbe(
  provider: string,
  modelId: string,
  connectionId: string
): Promise<ProbeOutcome> {
  const result = await runSingleModelTest({
    providerId: provider,
    modelId,
    connectionId,
    timeoutMs: DEFAULT_MODEL_TEST_TIMEOUT_MS,
    streamChat: true,
  });
  return mapSingleModelTestResult(result);
}

async function buildDefaultDeps(): Promise<HealthCheckDeps> {
  const { getModelIsHidden, setModelIsHidden } = await import("@/lib/db/models");
  return {
    listModelIds: defaultListModelIds,
    probe: defaultProbe,
    isHidden: (provider, modelId) => getModelIsHidden(provider, modelId),
    setHidden: (provider, modelId, hidden) => setModelIsHidden(provider, modelId, hidden),
    sleep: defaultSleep,
    log: (message) => console.log(`[ModelHealthCheck] ${message}`),
  };
}

/**
 * Decide and apply the visibility change for one probe outcome. Exported for
 * tests; the ownership rule lives here. Ownership is read live from the marks
 * table on every call, so a manual hide/unhide that lands while a long pass is
 * running (and clears the mark) is respected instead of being overwritten.
 * Marks are per connection: visibility is stored per provider/model, so a
 * connection restores only what its own probe hid.
 */
export function applyHealthCheckOutcome(
  provider: string,
  modelId: string,
  outcome: ProbeOutcome,
  deps: Pick<HealthCheckDeps, "isHidden" | "setHidden">,
  connectionId?: string
): HealthCheckAction {
  const currentlyHidden = deps.isHidden(provider, modelId);

  if (isHealthyOutcome(outcome)) {
    const ownedByHealthCheck = isHiddenByHealthCheck(provider, modelId, connectionId);
    // Restore only what the health check itself hid. A user-hidden model has no mark.
    if (currentlyHidden && ownedByHealthCheck) {
      deps.setHidden(provider, modelId, false);
      clearHealthCheckHiddenMarks(provider, [modelId]);
      return "restored";
    }
    if (!currentlyHidden && ownedByHealthCheck) {
      // Someone made it visible already; drop the stale mark.
      clearHealthCheckHiddenMarks(provider, [modelId]);
    }
    return "unchanged";
  }

  if (isSchedulerHideWorthyFailure(outcome)) {
    // Already hidden (by the user or by us): leave ownership as it is.
    if (currentlyHidden) return "unchanged";
    deps.setHidden(provider, modelId, true);
    markHiddenByHealthCheck(provider, modelId, connectionId);
    return "hidden";
  }

  // Rate-limited, timeout, transient, quota, skipped or connection-level (auth/5xx):
  // not evidence about this model either way.
  return "skipped";
}

/**
 * Next window of at most MODEL_HEALTH_CHECK_MAX_MODELS_PER_CONNECTION models. A
 * catalog larger than the cap is walked across successive cycles (per-connection
 * rotating offset) so models past the cap are eventually probed too.
 */
const windowOffsets = new Map<string, number>();

export function selectModelWindow(connectionId: string, modelIds: string[]): string[] {
  const cap = MODEL_HEALTH_CHECK_MAX_MODELS_PER_CONNECTION;
  if (modelIds.length <= cap) {
    windowOffsets.delete(connectionId);
    return modelIds;
  }
  const start = (windowOffsets.get(connectionId) ?? 0) % modelIds.length;
  windowOffsets.set(connectionId, (start + cap) % modelIds.length);
  return Array.from({ length: cap }, (_, i) => modelIds[(start + i) % modelIds.length]);
}

async function probeSafely(
  conn: HealthCheckConnection,
  modelId: string,
  deps: HealthCheckDeps
): Promise<ProbeOutcome> {
  try {
    return await deps.probe(conn.provider, modelId, conn.id);
  } catch (error: unknown) {
    // An exception inside our own runner is not proof the model is broken.
    deps.log(`probe threw for ${conn.provider}/${modelId}: ${sanitizeErrorMessage(error)}`);
    return { status: "error", isTransient: true };
  }
}

function applySafely(
  conn: HealthCheckConnection,
  modelId: string,
  outcome: ProbeOutcome,
  deps: HealthCheckDeps,
  result: ConnectionHealthCheckResult
): void {
  try {
    const action = applyHealthCheckOutcome(conn.provider, modelId, outcome, deps, conn.id);
    if (action === "hidden") result.hidden.push(modelId);
    if (action === "restored") result.restored.push(modelId);
  } catch (error: unknown) {
    deps.log(
      `failed to update visibility for ${conn.provider}/${modelId}: ${sanitizeErrorMessage(error)}`
    );
  }
}

/**
 * Early-stop rules for one connection's pass. The same-class connection-level run
 * (every probe 401, or every probe 5xx) means the key or the provider is the
 * problem, not the individual models: stop probing instead of hammering it.
 */
function pickStopReason(
  rateLimits: number,
  botBlocks: number,
  failureStreak: ConnectionFailureStreak,
  slowProbe: boolean
): ConnectionHealthCheckResult["stoppedEarly"] {
  if (rateLimits >= CONSECUTIVE_RATE_LIMIT_STOP_THRESHOLD) return "consecutive_rate_limits";
  if (slowProbe && botBlocks >= CONSECUTIVE_BOT_STOP_THRESHOLD) return "consecutive_bot_blocks";
  if (failureStreak.count >= CONSECUTIVE_CONNECTION_FAILURE_STOP_THRESHOLD) {
    return "connection_level_failures";
  }
  return undefined;
}

/** Probe every model of one opted-in connection and apply the results. */
export async function runHealthCheckForConnection(
  conn: HealthCheckConnection,
  deps: HealthCheckDeps
): Promise<ConnectionHealthCheckResult> {
  const result: ConnectionHealthCheckResult = {
    connectionId: conn.id,
    provider: conn.provider,
    tested: 0,
    hidden: [],
    restored: [],
  };
  const modelIds = selectModelWindow(conn.id, await deps.listModelIds(conn.provider, conn.id));
  const slowProbe = SLOW_PROBE_PROVIDERS.has(conn.provider);
  let consecutiveRateLimits = 0;
  let consecutiveBotBlocks = 0;
  let failureStreak: ConnectionFailureStreak = { failureClass: null, count: 0 };

  for (const modelId of modelIds) {
    if (slowProbe && result.tested > 0 && SLOW_PROBE_DELAY_MS > 0) {
      await deps.sleep(SLOW_PROBE_DELAY_MS);
    }
    const outcome = await probeSafely(conn, modelId, deps);
    result.tested += 1;

    consecutiveRateLimits = outcome.rateLimited ? consecutiveRateLimits + 1 : 0;
    if (isBotBlockedOutcome(outcome)) consecutiveBotBlocks += 1;
    else if (outcome.status === "ok") consecutiveBotBlocks = 0;

    failureStreak = advanceConnectionFailureStreak(failureStreak, outcome);

    applySafely(conn, modelId, outcome, deps, result);

    const stop = pickStopReason(
      consecutiveRateLimits,
      consecutiveBotBlocks,
      failureStreak,
      slowProbe
    );
    if (stop) {
      result.stoppedEarly = stop;
      break;
    }
  }

  deps.log(
    `${conn.provider} (${conn.name ?? conn.id}): tested ${result.tested}, hidden ${result.hidden.length}, restored ${result.restored.length}` +
      (result.stoppedEarly ? `, stopped early (${result.stoppedEarly})` : "")
  );
  return result;
}

/** Active connections that opted in and are not leased to exclusive activity. */
export async function getHealthCheckConnections(): Promise<HealthCheckConnection[]> {
  const { getProviderConnections } = await import("@/lib/db/providers");
  const { isConnectionUnavailableToAuxiliaryActivity } =
    await import("@/lib/exclusiveLeaseIsolation");
  const connections = await getProviderConnections();
  const selected: HealthCheckConnection[] = [];
  for (const conn of connections) {
    if (!conn.isActive && conn.isActive !== undefined) continue;
    if (typeof conn.id !== "string" || typeof conn.provider !== "string") continue;
    const psd =
      conn.providerSpecificData && typeof conn.providerSpecificData === "object"
        ? (conn.providerSpecificData as Record<string, unknown>)
        : {};
    if (!isHealthCheckEnabled(psd)) continue;
    if (await isConnectionUnavailableToAuxiliaryActivity(conn.id)) continue;
    selected.push({
      id: conn.id,
      provider: conn.provider,
      ...(typeof conn.name === "string" ? { name: conn.name } : {}),
    });
  }
  return selected;
}

let cycleRunning = false;

/**
 * One pass over every opted-in connection, sequentially (one provider at a time is
 * the gentlest option for upstream rate limits). Overlapping cycles are skipped.
 */
export async function runHealthCheckCycle(
  overrides: Partial<HealthCheckDeps> & {
    getConnections?: () => Promise<HealthCheckConnection[]>;
  } = {}
): Promise<ConnectionHealthCheckResult[]> {
  if (cycleRunning) return [];
  cycleRunning = true;
  try {
    const { getConnections, ...depOverrides } = overrides;
    const deps: HealthCheckDeps = { ...(await buildDefaultDeps()), ...depOverrides };
    let connections: HealthCheckConnection[];
    try {
      connections = await (getConnections ?? getHealthCheckConnections)();
    } catch (error: unknown) {
      deps.log(`failed to load connections: ${sanitizeErrorMessage(error)}`);
      return [];
    }
    const results: ConnectionHealthCheckResult[] = [];
    for (const conn of connections) {
      try {
        results.push(await runHealthCheckForConnection(conn, deps));
      } catch (error: unknown) {
        deps.log(`${conn.provider} (${conn.id}) failed: ${sanitizeErrorMessage(error)}`);
      }
    }
    return results;
  } finally {
    cycleRunning = false;
  }
}

let startupTimer: ReturnType<typeof setTimeout> | null = null;
let intervalTimer: ReturnType<typeof setInterval> | null = null;

export function resolveHealthCheckIntervalMs(
  env: Record<string, string | undefined> = process.env,
  fallbackMs = MODEL_HEALTH_CHECK_DEFAULT_INTERVAL_MS
): number {
  const hours = Number.parseInt(env.MODEL_HEALTH_CHECK_INTERVAL_HOURS ?? "", 10);
  return Number.isFinite(hours) && hours > 0 ? hours * 60 * 60 * 1000 : fallbackMs;
}

export function startModelHealthCheckScheduler(
  intervalMs = MODEL_HEALTH_CHECK_DEFAULT_INTERVAL_MS
): void {
  if (startupTimer || intervalTimer) return;
  const effectiveIntervalMs = resolveHealthCheckIntervalMs(process.env, intervalMs);
  console.log(
    `[ModelHealthCheck] Scheduler started — interval: ${effectiveIntervalMs / 3_600_000}h (opt-in per connection)`
  );
  startupTimer = setTimeout(() => {
    startupTimer = null;
    void runHealthCheckCycle();
    intervalTimer = setInterval(() => void runHealthCheckCycle(), effectiveIntervalMs);
    intervalTimer.unref?.();
  }, MODEL_HEALTH_CHECK_STARTUP_DELAY_MS);
  startupTimer.unref?.();
}

export function stopModelHealthCheckScheduler(): void {
  if (startupTimer) {
    clearTimeout(startupTimer);
    startupTimer = null;
  }
  if (intervalTimer) {
    clearInterval(intervalTimer);
    intervalTimer = null;
  }
}
