type JsonRecord = Record<string, unknown>;

type ClaudeExtraUsageConnectionState = {
  provider?: string | null;
  providerSpecificData?: unknown;
  testStatus?: string | null;
  lastError?: string | null;
  lastErrorAt?: string | null;
  lastErrorType?: string | null;
  lastErrorSource?: string | null;
  errorCode?: string | number | null;
  rateLimitedUntil?: string | null;
  backoffLevel?: number | null;
};

type ClaudeExtraUsageUpdate = {
  testStatus: string | null;
  lastError: string | null;
  lastErrorAt: string | null;
  lastErrorType: string | null;
  lastErrorSource: string | null;
  errorCode: number | null;
  rateLimitedUntil: string | null;
  backoffLevel: number;
};

const EXTRA_USAGE_FALLBACK_BLOCK_MS = 5 * 60 * 1000;
const SESSION_RESET_WINDOW_KEYS = ["session (5h)", "session", "five_hour"];

export const CLAUDE_EXTRA_USAGE_ERROR_SOURCE = "extra_usage";
export const CLAUDE_EXTRA_USAGE_ERROR_MESSAGE =
  "Claude extra usage was detected and blocked by this connection policy.";

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function toFutureIso(value: unknown): string | null {
  const raw = toStringOrNull(value);
  if (!raw) return null;
  const ms = new Date(raw).getTime();
  if (!Number.isFinite(ms) || ms <= Date.now()) return null;
  return raw;
}

export function isClaudeExtraUsageBlockEnabled(
  provider: string | null | undefined,
  providerSpecificData: unknown
): boolean {
  if (provider !== "claude") return false;
  return asRecord(providerSpecificData).blockExtraUsage !== false;
}

/** True only when the operator explicitly opted this Claude connection into extra usage. */
export function isClaudeExtraUsageAllowed(
  provider: string | null | undefined,
  providerSpecificData: unknown
): boolean {
  return provider === "claude" && asRecord(providerSpecificData).blockExtraUsage === false;
}

export function isClaudeExtraUsageQueued(usage: unknown): boolean {
  return asRecord(asRecord(usage).extraUsage).queued === true;
}

export function isClaudeExtraUsageState(connection: ClaudeExtraUsageConnectionState): boolean {
  return toStringOrNull(connection.lastErrorSource) === CLAUDE_EXTRA_USAGE_ERROR_SOURCE;
}

export function resolveClaudeExtraUsageResetAt(usage: unknown): string | null {
  const quotas = asRecord(asRecord(usage).quotas);

  for (const key of SESSION_RESET_WINDOW_KEYS) {
    const resetAt = toFutureIso(asRecord(quotas[key]).resetAt);
    if (resetAt) return resetAt;
  }

  let earliest: string | null = null;
  let earliestMs = Number.POSITIVE_INFINITY;

  for (const quota of Object.values(quotas)) {
    const resetAt = toFutureIso(asRecord(quota).resetAt);
    if (!resetAt) continue;
    const ms = new Date(resetAt).getTime();
    if (ms < earliestMs) {
      earliest = resetAt;
      earliestMs = ms;
    }
  }

  return earliest;
}

/**
 * Detects "extra usage is being (or is about to be) billed" for accounts whose usage API never
 * sends `extraUsage.queued` (e.g. Claude Team reports `{ is_enabled, monthly_limit, used_credits,
 * utilization, ... }` only). Once a plan window is used up, Claude keeps answering as pay-as-you-go
 * extra usage, so an enabled extra usage plus an exhausted plan window is the same condition.
 *
 * Only the windows in `quotas` count (the 5h session and the weekly all-models window): an exhausted
 * model-scoped weekly window does not stop the other models from being served by the plan.
 *
 * Returns `null` when extra usage is not enabled on the account or no plan window is exhausted.
 * Otherwise `resetAt` is the LATEST future reset among the exhausted windows (the connection stays
 * blocked until every one of them is back), or `null` when none of them reports a future reset.
 */
function findExhaustedPlanWindows(usage: unknown): { resetAt: string | null } | null {
  const record = asRecord(usage);
  if (asRecord(record.extraUsage).is_enabled !== true) return null;

  let exhausted = false;
  let latest: string | null = null;
  let latestMs = Number.NEGATIVE_INFINITY;

  for (const quota of Object.values(asRecord(record.quotas))) {
    const window = asRecord(quota);
    if (asRecord(window.claudeQuota).kind === "weekly_scoped") continue;
    const remaining = window.remainingPercentage ?? window.remaining;
    if (typeof remaining !== "number" || remaining > 0) continue;

    exhausted = true;
    const resetAt = toFutureIso(window.resetAt);
    if (!resetAt) continue;
    const ms = new Date(resetAt).getTime();
    if (ms > latestMs) {
      latest = resetAt;
      latestMs = ms;
    }
  }

  return exhausted ? { resetAt: latest } : null;
}

function hasClaudeUsageSnapshot(usage: unknown): boolean {
  const record = asRecord(usage);
  return Object.prototype.hasOwnProperty.call(record, "extraUsage") || !!record.quotas;
}

function buildClearUpdate(): ClaudeExtraUsageUpdate {
  return {
    testStatus: "active",
    lastError: null,
    lastErrorAt: null,
    lastErrorType: null,
    lastErrorSource: null,
    errorCode: null,
    rateLimitedUntil: null,
    backoffLevel: 0,
  };
}

export function buildClaudeExtraUsageStateClearUpdate(
  connection: ClaudeExtraUsageConnectionState
): ClaudeExtraUsageUpdate | null {
  return isClaudeExtraUsageState(connection) ? buildClearUpdate() : null;
}

export function buildClaudeExtraUsageConnectionUpdate(
  connection: ClaudeExtraUsageConnectionState,
  usage: unknown
): ClaudeExtraUsageUpdate | null {
  if (connection.provider !== "claude" || !hasClaudeUsageSnapshot(usage)) {
    return null;
  }

  const snapshot = asRecord(usage);
  const blockingEnabled = isClaudeExtraUsageBlockEnabled(
    connection.provider,
    connection.providerSpecificData
  );
  const currentIsExtraUsageState = isClaudeExtraUsageState(connection);

  if (!blockingEnabled) {
    return buildClaudeExtraUsageStateClearUpdate(connection);
  }

  const exhaustedPlan = findExhaustedPlanWindows(snapshot);
  if (!isClaudeExtraUsageQueued(snapshot) && !exhaustedPlan) {
    return buildClaudeExtraUsageStateClearUpdate(connection);
  }

  const rateLimitedUntil =
    exhaustedPlan?.resetAt ||
    resolveClaudeExtraUsageResetAt(snapshot) ||
    new Date(Date.now() + EXTRA_USAGE_FALLBACK_BLOCK_MS).toISOString();

  if (
    currentIsExtraUsageState &&
    toStringOrNull(connection.rateLimitedUntil) === rateLimitedUntil &&
    toStringOrNull(connection.testStatus) === "unavailable" &&
    toStringOrNull(connection.lastErrorType) === "quota_exhausted"
  ) {
    return null;
  }

  return {
    testStatus: "unavailable",
    lastError: CLAUDE_EXTRA_USAGE_ERROR_MESSAGE,
    lastErrorAt: new Date().toISOString(),
    lastErrorType: "quota_exhausted",
    lastErrorSource: CLAUDE_EXTRA_USAGE_ERROR_SOURCE,
    errorCode: 429,
    rateLimitedUntil,
    backoffLevel: Math.max(1, Number(connection.backoffLevel) || 0),
  };
}
