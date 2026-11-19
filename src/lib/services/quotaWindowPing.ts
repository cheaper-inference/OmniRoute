/**
 * quotaWindowPing.ts — quota window ping evaluation: reset fingerprint and skip matrix.
 *
 * The evaluation is deterministic and side-effect free from the caller's view:
 * time arrives as `nowMs`, and every external input (settings, connection,
 * circuit breaker, exclusive lease, model catalog, usage read) is injected
 * through `deps`. Phase A (skip-matrix rows 1-8) never touches the network;
 * Phase B (rows 9-13) performs the one throttled usage read inside the
 * connection proxy context. Every skip reason is a named row of this module's ordered
 * matrix, and nothing is skipped outside it.
 */
import type { BaseExecutor } from "@omniroute/open-sse/executors/base";
import { splitCodexReasoningSuffix } from "@omniroute/open-sse/executors/codex/reasoningSuffix.ts";
import { isModelSelectable } from "@omniroute/open-sse/services/modelLifecycle.ts";
import { TERMINAL_CONNECTION_STATUSES } from "@/lib/quota/connectionRecovery";
import {
  QUOTA_WINDOW_PING_FAILURE_COOLDOWN_MS,
  QUOTA_WINDOW_PING_MIN_SUCCESS_INTERVAL_MS,
  QUOTA_WINDOW_PING_PING_TIMEOUT_MS,
  QUOTA_WINDOW_PING_WINDOW_ACTIVE_TOLERANCE_MS,
  getQuotaWindowDescriptor,
  isQuotaWindowPingEnabled,
  isTargetableDescriptor,
} from "@/shared/constants/quotaWindowPing";
import type {
  QuotaWindowDescriptor,
  QuotaWindowPingDecision,
  QuotaWindowPingEligibility,
  QuotaWindowPingReason,
  QuotaWindowPingRunStatus,
  QuotaWindowPingSkipReason,
  QuotaWindowPingTrigger,
  QuotaWindowUsageReading,
  QuotaWindowUsageWindow,
  WindowPingClaimResult,
  WindowPingRun,
  WindowPingSchedule,
  WindowPingTarget,
} from "@/shared/types/quotaWindowPing";
import { normalizeResetKey } from "./quotaAutoPing";
import { getProviderConnectionById, updateProviderConnection } from "@/lib/db/providers";
import { QuotaWindowPingStoreError, createDbQuotaWindowPingStore } from "@/lib/db/quotaWindowPing";
import { getSettings, resolveProxyForConnection } from "@/lib/db/settings";
import { isConnectionUnavailableToAuxiliaryActivity } from "@/lib/exclusiveLeaseIsolation";
import { saveCallLog } from "@/lib/usage/callLogs";
import {
  refreshAndUpdateCredentialsWithResolver,
  type ProviderConnectionLike,
} from "@/lib/usage/providerLimits/credentialRefresh";
import { getCircuitBreaker } from "@/shared/utils/circuitBreaker";
import { getExecutor } from "@omniroute/open-sse/executors/index.ts";
import { getClaudeUsage } from "@omniroute/open-sse/services/usage/claude.ts";
import { getCodexUsage } from "@omniroute/open-sse/services/usage/codex.ts";
import { throttleQuotaFetch } from "@omniroute/open-sse/services/quotaFetchThrottle.ts";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import { nextWakeupAt } from "./codexWakeupSchedule";
import { executeQuotaWindowPing } from "./quotaWindowPingExecutor";

export { normalizeResetKey } from "./quotaAutoPing";

export interface QuotaWindowPingConnection {
  id: string;
  provider: string;
  authType?: string;
  isActive?: boolean | null;
  testStatus?: string | null;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string | null;
  tokenExpiresAt?: string | null;
  providerSpecificData?: Record<string, unknown>;
  rateLimitedUntil?: string | null;
  lastPingAt?: string | null;
  lastPingedResetKey?: string | null;
}

export interface QuotaWindowPingStore {
  listWindowPingTargets: () => WindowPingTarget[];
  getWindowPingTarget: (id: string) => WindowPingTarget | null;
  countEnabledWindowPingTargets: () => number;
  claimWindowPingRun: (
    targetId: string,
    trigger: QuotaWindowPingTrigger,
    nowMs: number,
    computeNextRunAt: (schedule: WindowPingSchedule, after: number) => string | null
  ) => WindowPingClaimResult;
  finishWindowPingRun: (
    runId: string,
    nowMs: number,
    outcome: {
      status: Exclude<QuotaWindowPingRunStatus, "running">;
      reason: QuotaWindowPingReason;
      fingerprint: string | null;
      dryRun?: boolean;
      detail?: string | null;
    }
  ) => WindowPingRun | null;
  recoverWindowPingRuns: (nowMs: number) => number;
  renewWindowPingRunLease: (runId: string, nowMs: number) => boolean;
  listWindowPingRuns: (limit?: number) => WindowPingRun[];
  markWindowPingTargetPinged: (targetId: string, fingerprint: string, nowMs: number) => void;
  markWindowPingTargetFailed: (targetId: string, nowMs: number) => void;
}

export interface QuotaWindowPingDeps {
  getSettings: () => Promise<Record<string, unknown>>;
  getProviderConnectionById: (id: string) => Promise<QuotaWindowPingConnection | null>;
  updateProviderConnection: (id: string, data: Record<string, unknown>) => Promise<unknown>;
  refreshAndUpdateCredentials: (
    connection: QuotaWindowPingConnection
  ) => Promise<{ connection: QuotaWindowPingConnection }>;
  /** Fresh, un-cached-as-much-as-the-provider-allows window reading. */
  fetchUsage: (connection: QuotaWindowPingConnection) => Promise<QuotaWindowUsageReading>;
  throttleQuotaFetch: () => Promise<void>;
  resolveProxyForConnection: (connectionId: string) => Promise<{ proxy?: unknown } | null>;
  runWithProxyContext: <T>(proxyConfig: unknown, callback: () => Promise<T>) => Promise<T>;
  /** The normal chat-path executor registry; never a feature-local HTTP client. */
  getExecutor: (provider: string) => Promise<BaseExecutor>;
  resolvePingModel: (
    provider: string,
    descriptor: QuotaWindowDescriptor,
    asOfMs: number,
    overrideModel?: string | null
  ) => Promise<string | null>;
  canExecuteProvider: (provider: string) => boolean;
  isConnectionUnavailableToAuxiliaryActivity: (connectionId: string) => Promise<boolean>;
  saveCallLog: (entry: Record<string, unknown>, metadataOnly?: boolean) => Promise<void>;
  store: QuotaWindowPingStore;
}

export interface QuotaWindowPingEvaluationContext {
  target: WindowPingTarget;
  descriptor: QuotaWindowDescriptor;
  connection: QuotaWindowPingConnection | null;
  trigger: QuotaWindowPingTrigger;
  nowMs: number;
  /** true only for the explicit manual `run` action. */
  ignoreEnabled?: boolean;
  /**
   * Skip-matrix row 7: a live `running` row holds the target lease. The claim path
   * returns `in_flight` before evaluation; this flag covers a direct evaluation.
   */
  inFlight?: boolean;
}

/** null in, null out; otherwise the one legacy minute-rounded scheme. */
export function resetFingerprint(resetAt: string | null): string | null {
  if (resetAt === null) return null;
  return normalizeResetKey(resetAt);
}

function skipDecision(
  reason: QuotaWindowPingSkipReason,
  fingerprint: string | null = null,
  window: QuotaWindowUsageWindow | null = null
): QuotaWindowPingDecision {
  return { action: "skip", reason, fingerprint, window };
}

function isRateLimited(connection: QuotaWindowPingConnection, nowMs: number): boolean {
  if (!connection.rateLimitedUntil) return false;
  const untilMs = new Date(connection.rateLimitedUntil).getTime();
  return Number.isFinite(untilMs) && untilMs > nowMs;
}

function isCoolingDown(failureAt: string | null, nowMs: number): boolean {
  if (!failureAt) return false;
  const failureMs = new Date(failureAt).getTime();
  return Number.isFinite(failureMs) && nowMs - failureMs < QUOTA_WINDOW_PING_FAILURE_COOLDOWN_MS;
}

/** Legacy parity: a successful ping holds a minimum interval even if resetAt slides. */
function wasPingedRecently(lastPingAt: string | null, nowMs: number): boolean {
  if (!lastPingAt) return false;
  const lastMs = new Date(lastPingAt).getTime();
  return Number.isFinite(lastMs) && nowMs - lastMs < QUOTA_WINDOW_PING_MIN_SUCCESS_INTERVAL_MS;
}

export async function evaluateQuotaWindowPingSkip(
  context: QuotaWindowPingEvaluationContext,
  deps: QuotaWindowPingDeps
): Promise<QuotaWindowPingDecision> {
  const { target, descriptor, nowMs } = context;

  // Row 1: target_disabled.
  if (target.enabled !== true && context.ignoreEnabled !== true) {
    return skipDecision("target_disabled");
  }

  // Row 2: kill_switch_off.
  const settings = await deps.getSettings();
  if (!isQuotaWindowPingEnabled(settings)) return skipDecision("kill_switch_off");

  // Row 3: account_disabled.
  const connection = context.connection;
  if (
    !connection ||
    connection.isActive === false ||
    (connection.testStatus != null &&
      TERMINAL_CONNECTION_STATUSES.has(connection.testStatus.toLowerCase()))
  ) {
    return skipDecision("account_disabled");
  }

  // Row 4: breaker_open.
  if (!deps.canExecuteProvider(descriptor.provider)) return skipDecision("breaker_open");

  // Row 5: breaker_cooling.
  if (isRateLimited(connection, nowMs) || isCoolingDown(target.failureAt, nowMs)) {
    return skipDecision("breaker_cooling");
  }

  // Row 6: exclusive_lease.
  if (await deps.isConnectionUnavailableToAuxiliaryActivity(connection.id)) {
    return skipDecision("exclusive_lease");
  }

  // Row 7: in_flight.
  if (context.inFlight === true) return skipDecision("in_flight");

  // Row 8: no_model (live catalog, no network I/O).
  const pingModel = await deps.resolvePingModel(
    descriptor.provider,
    descriptor,
    nowMs,
    target.model ?? null
  );
  if (pingModel === null) return skipDecision("no_model");

  // Phase B: the one throttled usage read, inside the connection proxy context.
  const proxy = await deps.resolveProxyForConnection(connection.id);
  const reading = await deps.runWithProxyContext(proxy?.proxy ?? null, async () => {
    await deps.throttleQuotaFetch();
    return deps.fetchUsage(connection);
  });

  const window = reading.windows[descriptor.windowId] ?? null;
  const fingerprint = resetFingerprint(window?.resetAt ?? null);
  const stale = (): QuotaWindowPingDecision => skipDecision("telemetry_stale", fingerprint, window);

  // Row 9: telemetry_stale.
  if (reading.stale || reading.message !== null) return stale();
  if (!window || !window.reported || window.resetAt === null || window.remainingPct === null) {
    return stale();
  }
  const longer = descriptor.longerWindow
    ? (reading.windows[descriptor.longerWindow.windowId] ?? null)
    : null;
  if (descriptor.longerWindow && (!longer || !longer.reported || longer.remainingPct === null)) {
    return stale();
  }

  // Row 10: window_exhausted (a 0% target window cannot be warmed).
  if (window.exhausted === true) return skipDecision("window_exhausted", fingerprint, window);

  // Row 11: window_active (reset-horizon evidence only). The provider-reported
  // windowSeconds wins over the descriptor duration when both are known.
  if (descriptor.windowActiveEvidence === "reset-horizon" && descriptor.durationSeconds !== null) {
    const durationMs =
      window.windowSeconds !== null
        ? window.windowSeconds * 1000
        : descriptor.durationSeconds * 1000;
    const resetAtMs = new Date(window.resetAt).getTime();
    const horizonMs = durationMs - QUOTA_WINDOW_PING_WINDOW_ACTIVE_TOLERANCE_MS;
    if (Number.isFinite(resetAtMs) && resetAtMs - nowMs < horizonMs) {
      return skipDecision("window_active", fingerprint, window);
    }
  }

  // Row 12: longer_window_exhausted.
  if (descriptor.longerWindow && longer?.exhausted === true) {
    return skipDecision("longer_window_exhausted", fingerprint, window);
  }

  // Row 13: longer_window_below_threshold (equal to the threshold passes).
  if (
    descriptor.longerWindow &&
    longer &&
    longer.remainingPct !== null &&
    target.minLongerWindowRemainingPct > 0 &&
    longer.remainingPct < target.minLongerWindowRemainingPct
  ) {
    return skipDecision("longer_window_below_threshold", fingerprint, window);
  }

  // Row 14: already_pinged_reset, including the legacy cross-feature key and the
  // minimum interval since the last successful ping of this target.
  if (
    fingerprint !== null &&
    (target.lastPingedFingerprint === fingerprint ||
      (descriptor.provider === "codex" && connection.lastPingedResetKey === fingerprint) ||
      wasPingedRecently(target.lastPingAt, nowMs))
  ) {
    return skipDecision("already_pinged_reset", fingerprint, window);
  }

  return { action: "execute", reason: "would_ping", fingerprint, window };
}
/**
 * Pure descriptor gate: the fixed targetable predicate plus the reason the API
 * and the UI show. `excluded` is checked first so a deliberately excluded
 * window reports `descriptor_excluded`, not the generic `descriptor_not_targetable`.
 */
export function evaluateDescriptorEligibility(
  descriptor: QuotaWindowDescriptor | undefined
): QuotaWindowPingEligibility {
  if (!descriptor) return { eligible: false, reason: "descriptor_unknown" };
  if (descriptor.policy === "excluded") return { eligible: false, reason: "descriptor_excluded" };
  if (!isTargetableDescriptor(descriptor)) {
    return { eligible: false, reason: "descriptor_not_targetable" };
  }
  return { eligible: true, reason: null };
}

export async function evaluateTargetEligibility(
  input: {
    connectionId: string;
    descriptorId: string;
    model?: string | null;
    excludeTargetId?: string;
  },
  deps: Pick<QuotaWindowPingDeps, "getProviderConnectionById" | "store">,
  now: () => number = Date.now
): Promise<QuotaWindowPingEligibility> {
  const descriptor = getQuotaWindowDescriptor(input.descriptorId);
  const descriptorEligibility = evaluateDescriptorEligibility(descriptor);
  if (!descriptorEligibility.eligible || !descriptor) return descriptorEligibility;

  const connection = await deps.getProviderConnectionById(input.connectionId);
  if (!connection) return { eligible: false, reason: "connection_missing" };
  if (connection.provider !== descriptor.provider) {
    return { eligible: false, reason: "provider_mismatch" };
  }
  if (connection.authType !== "oauth") return { eligible: false, reason: "unsupported_auth" };
  if (
    connection.isActive === false ||
    (connection.testStatus && TERMINAL_CONNECTION_STATUSES.has(connection.testStatus.toLowerCase()))
  ) {
    return { eligible: false, reason: "account_disabled" };
  }
  // The optional pin is checked with the same provider-scoped lifecycle
  // gate the request path uses; a dead pin is a model_unavailable 400.
  if (input.model && !isModelSelectable(descriptor.provider, input.model, { asOf: now() })) {
    return { eligible: false, reason: "model_unavailable" };
  }
  const duplicate = deps.store
    .listWindowPingTargets()
    .find(
      (target) =>
        target.connectionId === input.connectionId &&
        target.descriptorId === input.descriptorId &&
        target.id !== input.excludeTargetId
    );
  if (duplicate) return { eligible: false, reason: "duplicate_target" };

  return { eligible: true, reason: null };
}

export interface SelectPingModelCandidatesOptions {
  /** Target pin; only wins when it is available, in scope and selectable. */
  overrideModel?: string | null;
  asOfMs?: number;
}

function isInDescriptorScope(descriptor: QuotaWindowDescriptor, modelId: string): boolean {
  if (descriptor.scope === "model")
    return descriptor.model !== null && modelId === descriptor.model;
  if (descriptor.scope === "family") {
    if (!descriptor.modelFamily) return false;
    // Family match is token containment on the bare id: "opus" selects
    // claude-opus-*, never claude-sonnet-*.
    const bare = modelId.slice(modelId.lastIndexOf("/") + 1).toLowerCase();
    const family = descriptor.modelFamily.toLowerCase();
    return bare.split(/[^a-z0-9]+/).includes(family);
  }
  return true;
}

/**
 * Ordered ping-model candidates for the fixed resolution order:
 * override, then descriptor.pingModelCandidates, then the available catalog.
 * Every candidate must be present in the catalog, match the descriptor scope
 * and pass the provider lifecycle gate. Missing or non-finite input yields no
 * candidates instead of throwing.
 */
export function selectPingModelCandidates(
  descriptor: QuotaWindowDescriptor,
  availableModels: readonly string[] | null | undefined,
  options: SelectPingModelCandidatesOptions = {}
): string[] {
  const { overrideModel = null, asOfMs = Date.now() } = options;
  if (!Array.isArray(availableModels) || availableModels.length === 0) return [];
  if (!Number.isFinite(asOfMs)) return [];
  const available = availableModels.filter(
    (modelId): modelId is string => typeof modelId === "string" && modelId.length > 0
  );
  if (available.length === 0) return [];

  const selected: string[] = [];
  for (const candidate of [overrideModel, ...descriptor.pingModelCandidates, ...available]) {
    if (typeof candidate !== "string" || candidate.length === 0) continue;
    if (selected.includes(candidate)) continue;
    if (!available.includes(candidate)) continue;
    if (!isInDescriptorScope(descriptor, candidate)) continue;
    if (descriptor.provider === "codex" && splitCodexReasoningSuffix(candidate).effort !== null) {
      continue;
    }
    if (!isModelSelectable(descriptor.provider, candidate, { asOf: asOfMs })) continue;
    selected.push(candidate);
  }
  return selected;
}

export interface QuotaWindowPingRunOutcome {
  run: WindowPingRun;
  /** For `in_flight` this is the synthesized skip decision; it is never null. */
  decision: QuotaWindowPingDecision;
}

// ---------------------------------------------------------------------------
// Runner: claim, evaluate, execute, persist exactly once per claimed run.
// ---------------------------------------------------------------------------

/** Per-process in-flight guard; the DB claim is the cross-process lease. */
const inFlightTargets = new Set<string>();

function toUsageWindow(quota: Record<string, unknown>): QuotaWindowUsageWindow {
  // `fractionReported === false` means the provider did not report the fraction;
  // it is unknown (null), never exhaustion.
  const remainingPct =
    quota.fractionReported !== false &&
    typeof quota.remaining === "number" &&
    Number.isFinite(quota.remaining)
      ? quota.remaining
      : null;
  return {
    reported: true,
    resetAt: typeof quota.resetAt === "string" ? quota.resetAt : null,
    remainingPct,
    exhausted: quota.unlimited !== true && remainingPct !== null && remainingPct <= 0,
    windowSeconds:
      typeof quota.windowSeconds === "number" && Number.isFinite(quota.windowSeconds)
        ? quota.windowSeconds
        : null,
  };
}

function toUsageReading(provider: string, usage: Record<string, unknown>): QuotaWindowUsageReading {
  const windows: Record<string, QuotaWindowUsageWindow> = {};
  const quotas = usage.quotas;
  if (quotas && typeof quotas === "object" && !Array.isArray(quotas)) {
    for (const [key, value] of Object.entries(quotas as Record<string, unknown>)) {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        windows[key] = toUsageWindow(value as Record<string, unknown>);
      }
    }
  }
  return {
    provider,
    complete: usage.quotasComplete === true,
    stale: usage._stale === true,
    // Only used as a boolean gate (row 9); upstream text is never logged or stored.
    message: typeof usage.message === "string" ? usage.message : null,
    windows,
  };
}

async function fetchQuotaWindowPingUsage(
  connection: QuotaWindowPingConnection
): Promise<QuotaWindowUsageReading> {
  if (connection.provider === "claude") {
    // forceRefresh keeps the Claude cache floor but skips the 15 min success TTL.
    const usage = (await getClaudeUsage(connection.accessToken, connection.id, {
      forceRefresh: true,
    })) as unknown as Record<string, unknown>;
    return toUsageReading("claude", usage);
  }
  const usage = (await getCodexUsage(
    connection.accessToken,
    connection.providerSpecificData ?? {},
    connection.id
  )) as Record<string, unknown>;
  return toUsageReading(connection.provider, usage);
}

/**
 * Ping model per the fixed order: target override, descriptor candidates, then the
 * live provider catalog (Codex skips reasoning-suffix variants inside the selector).
 */
async function resolveQuotaWindowPingPingModel(
  provider: string,
  descriptor: QuotaWindowDescriptor,
  asOfMs: number,
  overrideModel: string | null = null
): Promise<string | null> {
  const { getProviderModels } = await import("@omniroute/open-sse/config/providerModels.ts");
  const available = getProviderModels(provider).map((model) => model.id);
  return selectPingModelCandidates(descriptor, available, { overrideModel, asOfMs })[0] ?? null;
}

export function createDefaultQuotaWindowPingDeps(): QuotaWindowPingDeps {
  return {
    getSettings,
    // DB rows are untyped records; the runner only reads QuotaWindowPingConnection fields.
    getProviderConnectionById:
      getProviderConnectionById as unknown as QuotaWindowPingDeps["getProviderConnectionById"],
    updateProviderConnection,
    refreshAndUpdateCredentials: async (connection) => {
      const refreshed = await refreshAndUpdateCredentialsWithResolver(
        connection as unknown as ProviderConnectionLike,
        getExecutor
      );
      return {
        connection: refreshed.connection as unknown as QuotaWindowPingConnection,
      };
    },
    fetchUsage: fetchQuotaWindowPingUsage,
    throttleQuotaFetch,
    resolveProxyForConnection,
    runWithProxyContext,
    getExecutor,
    resolvePingModel: resolveQuotaWindowPingPingModel,
    canExecuteProvider: (provider) => getCircuitBreaker(provider).canExecute(),
    isConnectionUnavailableToAuxiliaryActivity,
    saveCallLog,
    store: createDbQuotaWindowPingStore(),
  };
}

function isAccountUnusable(connection: QuotaWindowPingConnection | null): boolean {
  return (
    !connection ||
    connection.isActive === false ||
    (connection.testStatus != null &&
      TERMINAL_CONNECTION_STATUSES.has(connection.testStatus.toLowerCase()))
  );
}

async function loadConnection(
  deps: QuotaWindowPingDeps,
  connectionId: string
): Promise<QuotaWindowPingConnection | null> {
  try {
    return await deps.getProviderConnectionById(connectionId);
  } catch {
    // A connection that cannot be read is indistinguishable from a missing one.
    return null;
  }
}

async function finishRun(
  deps: QuotaWindowPingDeps,
  run: WindowPingRun,
  nowMs: number,
  outcome: {
    status: Exclude<QuotaWindowPingRunStatus, "running">;
    reason: QuotaWindowPingReason;
    fingerprint: string | null;
    dryRun?: boolean;
    detail?: string | null;
  }
): Promise<WindowPingRun> {
  return deps.store.finishWindowPingRun(run.id, nowMs, outcome) ?? run;
}

function finalDecision(
  action: "execute" | "skip",
  reason: QuotaWindowPingReason,
  fingerprint: string | null,
  window: QuotaWindowUsageWindow | null
): QuotaWindowPingDecision {
  return { action, reason, fingerprint, window };
}

function httpDetail(httpStatus: number | null): string | null {
  return httpStatus === null ? null : `http=${httpStatus}`;
}

async function failRun(
  deps: QuotaWindowPingDeps,
  target: WindowPingTarget,
  run: WindowPingRun,
  nowMs: number,
  reason: "auth_failed" | "error"
): Promise<QuotaWindowPingRunOutcome> {
  const finished = await finishRun(deps, run, nowMs, {
    status: "failed",
    reason,
    fingerprint: null,
  });
  deps.store.markWindowPingTargetFailed(target.id, nowMs);
  return { run: finished, decision: finalDecision("skip", reason, null, null) };
}

/**
 * Claim, evaluate, execute, persist. Returns null when a scheduled claim is not due.
 * Throws QuotaWindowPingStoreError("not_found") for an unknown target.
 */
export async function runWindowPingTarget(
  targetId: string,
  trigger: QuotaWindowPingTrigger,
  deps: QuotaWindowPingDeps = createDefaultQuotaWindowPingDeps(),
  now: () => number = Date.now
): Promise<QuotaWindowPingRunOutcome | null> {
  const nowMs = now();
  const existing = deps.store.getWindowPingTarget(targetId);
  if (!existing) throw new QuotaWindowPingStoreError("not_found");
  // Row 1 for scheduled enumeration: a disabled target is never claimed (and writes
  // no row). The explicit manual run deliberately ignores the enabled flag.
  if (trigger === "scheduled" && !existing.enabled) return null;

  const claimResult = deps.store.claimWindowPingRun(targetId, trigger, nowMs, nextWakeupAt);
  if (claimResult.kind === "not_due") return null;
  if (claimResult.kind === "in_flight") {
    return { run: claimResult.run, decision: skipDecision("in_flight") };
  }

  const run = claimResult.claim.run;
  const target = claimResult.claim.target;
  if (inFlightTargets.has(targetId)) {
    const finished = await finishRun(deps, run, nowMs, {
      status: "skipped",
      reason: "in_flight",
      fingerprint: null,
    });
    return { run: finished, decision: skipDecision("in_flight") };
  }

  inFlightTargets.add(targetId);
  try {
    const descriptor = getQuotaWindowDescriptor(target.descriptorId);
    if (!descriptor) {
      const finished = await finishRun(deps, run, nowMs, {
        status: "skipped",
        reason: "target_disabled",
        fingerprint: null,
        detail: "descriptor_removed",
      });
      return { run: finished, decision: skipDecision("target_disabled") };
    }

    const connection = await loadConnection(deps, target.connectionId);
    if (isAccountUnusable(connection)) {
      const finished = await finishRun(deps, run, nowMs, {
        status: "skipped",
        reason: "account_disabled",
        fingerprint: null,
      });
      return { run: finished, decision: skipDecision("account_disabled") };
    }

    let current: QuotaWindowPingConnection;
    try {
      current = (await deps.refreshAndUpdateCredentials(connection as QuotaWindowPingConnection))
        .connection;
    } catch {
      return await failRun(deps, target, run, nowMs, "auth_failed");
    }
    if (!current?.accessToken) {
      const finished = await finishRun(deps, run, nowMs, {
        status: "skipped",
        reason: "no_token",
        fingerprint: null,
      });
      return { run: finished, decision: finalDecision("skip", "no_token", null, null) };
    }

    let decision: QuotaWindowPingDecision;
    try {
      decision = await evaluateQuotaWindowPingSkip(
        {
          target,
          descriptor,
          connection: current,
          trigger,
          nowMs,
          ignoreEnabled: trigger === "manual",
        },
        deps
      );
    } catch {
      // A proxy/usage-read failure is fail-closed: no direct retry outside the context.
      return await failRun(deps, target, run, nowMs, "error");
    }

    if (decision.action === "skip") {
      const finished = await finishRun(deps, run, nowMs, {
        status: "skipped",
        reason: decision.reason,
        fingerprint: decision.fingerprint,
      });
      return { run: finished, decision };
    }

    if (target.dryRun) {
      const finished = await finishRun(deps, run, nowMs, {
        status: "skipped",
        reason: "would_ping",
        fingerprint: decision.fingerprint,
        dryRun: true,
      });
      return {
        run: finished,
        decision: finalDecision("skip", "would_ping", decision.fingerprint, decision.window),
      };
    }

    // The skip decision carries no model, so resolve it once more (catalog only,
    // no network) for the request body.
    const pingModel = await deps.resolvePingModel(
      descriptor.provider,
      descriptor,
      nowMs,
      target.model ?? null
    );
    if (pingModel === null) {
      const finished = await finishRun(deps, run, nowMs, {
        status: "skipped",
        reason: "no_model",
        fingerprint: decision.fingerprint,
      });
      return {
        run: finished,
        decision: skipDecision("no_model", decision.fingerprint, decision.window),
      };
    }

    // Resolve the connection proxy and run the ping inside that context: the executor
    // must never fall back to the default egress.
    let proxyInfo;
    try {
      proxyInfo = await deps.resolveProxyForConnection(current.id);
    } catch {
      return await failRun(deps, target, run, nowMs, "error");
    }
    // The claim lease starts at claim time, but the pre-ping phase (throttled usage
    // read) is unbounded. Renew at dispatch: false means another process recovered
    // this run and owns the target, so dispatching would ping the window twice.
    if (!deps.store.renewWindowPingRunLease(run.id, now())) {
      return { run, decision: skipDecision("in_flight") };
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), QUOTA_WINDOW_PING_PING_TIMEOUT_MS);
    let result;
    try {
      result = await deps.runWithProxyContext(proxyInfo?.proxy ?? null, () =>
        executeQuotaWindowPing(
          { target, descriptor, connection: current, pingModel, signal: controller.signal },
          deps
        )
      );
    } catch {
      // A proxy-context failure is fail-closed: never retry on the default egress.
      return await failRun(deps, target, run, nowMs, "error");
    } finally {
      clearTimeout(timer);
    }

    if (result.status === "succeeded") {
      const finished = await finishRun(deps, run, nowMs, {
        status: "succeeded",
        reason: "completed",
        fingerprint: decision.fingerprint,
      });
      if (decision.fingerprint) {
        deps.store.markWindowPingTargetPinged(targetId, decision.fingerprint, nowMs);
      }
      // The legacy key is the cross-feature dedupe channel: one quota window, one ping.
      await deps
        .updateProviderConnection(target.connectionId, {
          ...(decision.fingerprint ? { lastPingedResetKey: decision.fingerprint } : {}),
          lastPingAt: new Date(nowMs).toISOString(),
        })
        .catch(() => undefined);
      return {
        run: finished,
        decision: finalDecision("execute", "completed", decision.fingerprint, decision.window),
      };
    }

    if (result.status === "skipped") {
      const finished = await finishRun(deps, run, nowMs, {
        status: "skipped",
        reason: result.reason,
        fingerprint: decision.fingerprint,
      });
      return {
        run: finished,
        decision: skipDecision(
          result.reason as QuotaWindowPingSkipReason,
          decision.fingerprint,
          decision.window
        ),
      };
    }

    const finished = await finishRun(deps, run, nowMs, {
      status: "failed",
      reason: result.reason,
      fingerprint: decision.fingerprint,
      detail: httpDetail(result.httpStatus),
    });
    deps.store.markWindowPingTargetFailed(targetId, nowMs);
    return {
      run: finished,
      decision: finalDecision("skip", result.reason, decision.fingerprint, decision.window),
    };
  } finally {
    inFlightTargets.delete(targetId);
  }
}
