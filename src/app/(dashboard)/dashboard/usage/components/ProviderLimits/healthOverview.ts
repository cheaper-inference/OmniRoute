import { resolveProviderAvailability, type ProviderAvailability } from "@/lib/providerAvailability";
import { parseRuntimeTimestamp, runtimeCooldownEvidence } from "./runtimeCooldown";
import type { CodexPaidCredits } from "@/lib/providers/codexPaidCredits";
import { quotaPercentage, type QuotaBypass } from "./quotaEligibility";
import type { ConnectionQuotaAvailability } from "@/lib/usage/availabilityTypes";

// Retain persisted filter identifiers; every layout uses the same account projection.
export type HealthStatus = "critical" | "alert" | "ok" | "paused" | "empty";
export type QuotaLayout = "overview" | "full" | "compact";
export interface HealthQuota {
  name: string;
  displayName?: string;
  used?: number;
  total?: number;
  remainingPercentage?: number;
  resetAt?: string | null;
  unlimited?: boolean;
  isCredits?: boolean;
  isResetCredits?: boolean;
  modelKey?: string;
  modelScoped?: boolean;
  window?: string;
  windowSeconds?: number | null;
  quotaGroupId?: string;
  staleAfterReset?: boolean;
  fractionReported?: boolean;
}
export interface HealthData {
  quotas?: HealthQuota[];
  stale?: unknown;
  raw?: {
    fetchedAt?: string;
    _stale?: boolean;
    paidCredits?: CodexPaidCredits;
    quotas?: Record<string, Partial<HealthQuota>>;
    quotaGroups?: Array<{
      id: string;
      displayName?: string;
      models?: string[];
      windows?: Record<string, Partial<HealthQuota>>;
    }>;
  };
}
export interface HealthConnection {
  provider: string;
  quotaWindowThresholds?: Record<string, number> | null;
  providerSpecificData?: {
    quotaPreflightEnabled?: boolean;
    blockExtraUsage?: boolean;
    allowPaidCredits?: boolean;
    limitPolicy?: { enabled?: boolean };
  };
  id: string;
  name?: string;
  displayName?: string;
  email?: string;
  isActive?: boolean;
  testStatus?: string | null;
  rateLimitedUntil?: string | number | null;
  lastErrorAt?: string | number | null;
  lastErrorType?: string | null;
  updatedAt?: string;
  runtimeObservedAt?: string;
}
export interface HealthCooldown {
  id: string;
  status: string;
  isActive?: boolean;
  testStatus?: string | null;
  rateLimitedUntil?: string | number | null;
  lastErrorAt?: string | number | null;
  cooldownRemainingMs?: number;
  lastErrorType?: string | null;
  lockouts: Array<{ model: string; remainingMs: number; reason: string }>;
}
export interface AvailabilityEvidence {
  activeConfirmation?: { isActive: boolean; confirmedAt: string };
  availability?: ConnectionQuotaAvailability;
  availabilityObservedAt?: string | number;
  cooldown?: HealthCooldown;
  /** First local observation of this connection + cooldown-until pair. */
  cooldownObservedAt?: number;
  cooldownDeadline?: number;
  cooldownStartedAt?: number;
  summaryFailed?: boolean;
  observedAt?: string | number;
  error?: string | null;
}
export type HealthScope = "account" | "group" | "scoped";
export interface HealthReason {
  type:
    | "paused"
    | "terminal"
    | "cooldown"
    | "scopeCooldown"
    | "peakHour"
    | "quota"
    | "quotaBypass"
    | "cutoffNotEvaluated"
    | "lockout"
    | "previousFailure"
    | "awaitingSync"
    | "verdictUnavailable"
    | "previousSnapshot"
    | "noQuota"
    | "quotaError"
    | "noRuntime";
  bypass?: QuotaBypass;
  scope?: HealthScope;
  scopeId?: string;
  window?: string;
  percent?: number;
  cutoff?: number;
  resetAt?: string | null;
  /** Fixed total runtime cooldown duration; never recomputed from the ticking clock. */
  durationMs?: number;
  terminal?: string;
  error?: string;
}
export interface HealthCell {
  name: string;
  displayName?: string;
  percent: number;
  resetAt: string | null;
  scope: HealthScope;
  scopeId?: string;
  window: "fiveHour" | "overall" | null;
  awaitingSync: boolean;
  quotaIgnored?: boolean;
}
export interface HealthAccount {
  quotaAvailability?: ConnectionQuotaAvailability;
  quotaAvailabilityValidUntil?: number;
  runtimeAvailability?: ProviderAvailability;
  quotaPools?: Array<{ id: string; models?: string[] }>;
  connection: HealthConnection;
  cells: HealthCell[];
  reasons: HealthReason[];
  status: HealthStatus;
  partial: boolean;
  recoverAt?: string;
  quotaObservedAt?: string;
  runtimeObservedAt?: string;
}
const RANK = { critical: 0, alert: 1, ok: 2, paused: 3, empty: 4 };
export function resolveQuotaLayout(saved: string | null): QuotaLayout {
  return saved === "full" || saved === "compact" ? saved : "overview";
}
function textWindow(value: string): "fiveHour" | "overall" | null {
  if (/week|month|overall|total|7\s*d\b|seven[_\s-]?day/i.test(value)) return "overall";
  if (/session|five[_\s-]?hour|5\s*(?:h\b|hours?)/i.test(value)) return "fiveHour";
  return null;
}
/** Display labels/durations outrank legacy keys: Codex's `session` can actually be Weekly.
 * Time-to-reset only disproves a short window; a weekly window near reset is NOT a 5h window.
 * Use the fixed capture time, never the ticking UI clock, to keep topology stable on refresh.
 */
export function normalizeHealthWindow(
  quota: HealthQuota,
  fetchedAt?: string
): "fiveHour" | "overall" | null {
  if (quota.windowSeconds != null && quota.windowSeconds > 0)
    return quota.windowSeconds <= 5 * 3600 ? "fiveHour" : "overall";
  const display = textWindow(quota.displayName || "");
  if (display) return display;
  const explicit = textWindow(quota.window || "");
  if (explicit) return explicit;
  const named = textWindow(quota.name);
  const duration = Date.parse(quota.resetAt || "") - Date.parse(fetchedAt || "");
  return named === "fiveHour" && duration > 5 * 3_600_000 + 60_000 ? "overall" : named;
}
function buildHealthQuotaMap(data: HealthData | undefined) {
  const quotas = new Map<string, HealthQuota>();
  for (const quota of data?.quotas || []) quotas.set(quota.name, quota);
  for (const [name, quota] of Object.entries(data?.raw?.quotas || {}))
    quotas.set(name, { ...quotas.get(name), ...quota, name });
  for (const group of data?.raw?.quotaGroups || [])
    for (const [window, quota] of Object.entries(group.windows || {})) {
      const name = `${group.id}_${window}`;
      quotas.set(name, { ...quotas.get(name), ...quota, name, window, quotaGroupId: group.id });
    }
  return quotas;
}
function availabilityDecisions(availability: ConnectionQuotaAvailability | undefined) {
  return availability
    ? [
        { scope: "account" as const, scopeId: undefined, decision: availability.account },
        ...availability.scopes.map((scope) => ({
          scope: scope.kind,
          scopeId: scope.id,
          decision: scope.decision,
        })),
      ]
    : [];
}
function appendDecisionBlockers(
  decision: ReturnType<typeof availabilityDecisions>[number],
  blocked: HealthReason[]
) {
  if (decision.decision.usable !== false) return;
  for (const blocker of decision.decision.blockers)
    blocked.push({
      type: blocker.reason === "modelLockout" ? "lockout" : blocker.reason || "quota",
      scope: decision.scope,
      scopeId: decision.scopeId,
      window: blocker.name,
      resetAt: blocker.resetAt,
      percent: blocker.remainingPercent,
      cutoff: blocker.cutoffPercent,
    });
}
function appendDecisionReasons(
  decision: ReturnType<typeof availabilityDecisions>[number],
  reasons: HealthReason[]
) {
  if (
    decision.decision.cutoffEvaluated === false &&
    !reasons.some((reason) => reason.type === "cutoffNotEvaluated")
  )
    reasons.push({ type: "cutoffNotEvaluated" });
  for (const bypass of decision.decision.allowanceReasons)
    if (!reasons.some((reason) => reason.type === "quotaBypass" && reason.bypass === bypass))
      reasons.push({ type: "quotaBypass", bypass });
}
function collectAvailabilityReasons(
  decisions: ReturnType<typeof availabilityDecisions>,
  reasons: HealthReason[],
  blocked: HealthReason[]
) {
  for (const decision of decisions) {
    appendDecisionReasons(decision, reasons);
    appendDecisionBlockers(decision, blocked);
  }
}
function quotaScope(
  connection: HealthConnection,
  quota: HealthQuota
): { scope: HealthScope; scopeId?: string } {
  if (quota.quotaGroupId) return { scope: "group", scopeId: quota.quotaGroupId };
  if (connection.provider === "claude" && quota.modelScoped === true)
    return { scope: "scoped", scopeId: quota.name };
  if (["antigravity", "agy"].includes(connection.provider) && quota.modelKey)
    return { scope: "scoped", scopeId: quota.modelKey };
  if (connection.provider === "openrouter" && ["free_daily", "free_rpm"].includes(quota.name))
    return { scope: "scoped", scopeId: ":free" };
  if (connection.provider === "codex" && Object.hasOwn(CODEX_SCOPED_WINDOWS, quota.name))
    return { scope: "scoped", scopeId: CODEX_SCOPED_WINDOWS[quota.name] };
  return { scope: "account" };
}
function shouldDisplayQuota(connection: HealthConnection, quota: HealthQuota): boolean {
  if (quota.isCredits || quota.isResetCredits || quota.fractionReported === false) return false;
  if (connection.provider === "codex" && ["reserve_session", "reserve_weekly"].includes(quota.name))
    return false;
  if (/^(extra_usage|banked_reset_credits)$/.test(quota.name)) return false;
  return (
    quota.name !== "credits" ||
    (connection.provider === "openrouter" && (quota.total ?? 0) > 0 && !quota.unlimited)
  );
}
function buildHealthCell(
  connection: HealthConnection,
  quota: HealthQuota,
  data: HealthData | undefined,
  decisions: ReturnType<typeof availabilityDecisions>,
  reasons: HealthReason[],
  groups: Set<string>,
  now: number
): HealthCell | null {
  if (!shouldDisplayQuota(connection, quota)) return null;
  const percent = quotaPercentage(quota);
  if (percent === null) return null;
  const { scope, scopeId } = quotaScope(connection, quota);
  if (scope === "group" && scopeId) groups.add(scopeId);
  const awaitingSync = !!quota.staleAfterReset || Date.parse(quota.resetAt || "") <= now;
  if (awaitingSync) reasons.push({ type: "awaitingSync", window: quota.name });
  return {
    name: quota.name,
    displayName: quota.displayName,
    percent,
    resetAt: quota.resetAt || null,
    scope,
    scopeId: scopeId || undefined,
    window: normalizeHealthWindow(quota, data?.raw?.fetchedAt),
    awaitingSync,
    quotaIgnored: decisions.some(({ decision }) =>
      decision.allowanceReasons.some(
        (reason) =>
          reason === "extraUsage" ||
          reason === "filteringDisabled" ||
          (reason === "paidCredits" && scopeId !== "spark")
      )
    ),
  };
}
function collectHealthCells(
  connection: HealthConnection,
  data: HealthData | undefined,
  quotas: Map<string, HealthQuota>,
  decisions: ReturnType<typeof availabilityDecisions>,
  reasons: HealthReason[],
  groups: Set<string>,
  now: number
) {
  const cells: HealthCell[] = [];
  for (const quota of quotas.values()) {
    const cell = buildHealthCell(connection, quota, data, decisions, reasons, groups, now);
    if (cell) cells.push(cell);
  }
  return cells;
}

// src/domain/quotaCache.ts:isCodexQuotaExhausted uses the model filter in
// open-sse/config/codexQuotaScopes.ts; usage keys come from services/codexUsageQuotas.ts.
// Display-only reserve windows are excluded below, as in quotaCache.ts:setQuotaCache.
const CODEX_SCOPED_WINDOWS: Record<string, string> = {
  gpt_5_3_codex_spark_session: "spark",
  gpt_5_3_codex_spark_weekly: "spark",
  "codex-spark": "spark",
  "codex-spark-weekly": "spark",
  code_review: "code_review",
  code_review_weekly: "code_review",
};
/** All blocked is red, mixed usable/blocked is yellow, incomplete evidence is never green.
 * Paused accounts have their own count and never contribute to the available count.
 */
export function aggregateAvailability(statuses: HealthStatus[]): HealthStatus {
  if (statuses.length && statuses.every((s) => s === "paused")) return "paused";
  const active = statuses.filter((s) => s !== "paused");
  if (!active.length || active.every((s) => s === "empty")) return "empty";
  if (active.every((s) => s === "critical")) return "critical";
  if (active.every((s) => s === "ok")) return "ok";
  if (active.some((s) => s === "critical" || s === "alert")) return "alert";
  return "empty";
}
function resolveRuntimeDecision(
  runtime: ReturnType<typeof runtimeCooldownEvidence>["runtime"],
  evidence: AvailabilityEvidence,
  testStatus: string | undefined,
  now: number,
  reasons: HealthReason[],
  reportedUntil: number
) {
  const until = evidence.cooldownDeadline ?? reportedUntil;
  const errorAt = parseRuntimeTimestamp(runtime.lastErrorAt);
  const runtimeAvailability = resolveProviderAvailability(
    {
      isActive: true,
      testStatus,
      lastErrorType: runtime.lastErrorType,
      rateLimitedUntil: Number.isFinite(until) ? String(until) : null,
      lastErrorAt: Number.isFinite(errorAt) ? String(errorAt) : null,
    },
    now
  );
  const terminal = ["AUTH_EXPIRED", "QUOTA_EXHAUSTED", "DISABLED", "STALE_TERMINAL"].includes(
    runtimeAvailability.state
  )
    ? { type: "terminal" as const, terminal: testStatus }
    : null;
  const startedAt =
    evidence.cooldownStartedAt ??
    (evidence.cooldownObservedAt !== undefined
      ? Math.min(
          evidence.cooldownObservedAt,
          Number.isFinite(errorAt) && errorAt < until ? errorAt : Infinity
        )
      : Number.isFinite(errorAt) && errorAt < until
        ? errorAt
        : now);
  const cooldown: HealthReason | null =
    until > now
      ? {
          type: "cooldown",
          resetAt: new Date(until).toISOString(),
          durationMs: Math.max(1, until - startedAt),
        }
      : null;
  if (testStatus === "unavailable" && !cooldown) reasons.push({ type: "previousFailure" });
  return { runtimeAvailability, terminal, cooldown };
}
function runtimeLocks(
  lockouts: HealthCooldown["lockouts"],
  summaryTime: number,
  now: number
): HealthReason[] {
  return lockouts.flatMap((lock) => {
    const end = summaryTime + lock.remainingMs;
    return summaryTime && end > now
      ? [
          {
            type: "lockout" as const,
            scope: "scoped" as const,
            window: lock.model,
            resetAt: new Date(end).toISOString(),
          },
        ]
      : [];
  });
}
function resolveRuntimeFacts(
  connection: HealthConnection,
  evidence: AvailabilityEvidence,
  reasons: HealthReason[],
  now: number
) {
  const {
    row,
    runtime: selectedRuntime,
    summaryTime,
    lockouts,
    until: reportedUntil,
    isActive,
  } = runtimeCooldownEvidence(connection, evidence, now);
  const runtime = { ...selectedRuntime, isActive };
  const testStatus = runtime.testStatus?.trim().toLowerCase();
  const runtimeAvailable =
    !!row ||
    [connection.isActive, connection.testStatus, connection.rateLimitedUntil].some(
      (value) => value !== undefined
    );
  if (!runtimeAvailable) reasons.push({ type: "noRuntime" });
  const decision = resolveRuntimeDecision(
    runtime,
    evidence,
    testStatus,
    now,
    reasons,
    reportedUntil
  );
  const locks = runtimeLocks(lockouts, summaryTime, now);
  return {
    row,
    runtime,
    summaryTime,
    runtimeAvailable,
    runtimeAvailability: decision.runtimeAvailability,
    terminal: decision.terminal,
    cooldown: decision.cooldown,
    locks,
  };
}
function resolveHealthStatus(
  runtime: ReturnType<typeof resolveRuntimeFacts>,
  availability: ConnectionQuotaAvailability | undefined,
  groups: Set<string>,
  blocked: HealthReason[]
): HealthStatus {
  const allGroupsBlocked =
    groups.size > 0 &&
    [...groups].every((group) =>
      blocked.some((reason) => reason.scope === "group" && reason.scopeId === group)
    );
  if (runtime.runtime.isActive === false) return "paused";
  if (
    runtime.terminal ||
    runtime.cooldown ||
    availability?.account.usable === false ||
    allGroupsBlocked
  )
    return "critical";
  if (!availability || availability.account.usable === null) return "empty";
  if (blocked.length || runtime.locks.length) return "alert";
  if (!runtime.runtimeAvailable) return "empty";
  return "ok";
}
function healthRecoveryAt(
  status: HealthStatus,
  constraints: HealthReason[],
  now: number
): string | undefined {
  const times = constraints.map((reason) =>
    Date.parse("resetAt" in reason ? reason.resetAt || "" : "")
  );
  return ["critical", "alert"].includes(status) && times.length && times.every((time) => time > now)
    ? new Date(Math.max(...times)).toISOString()
    : undefined;
}
function appendQuotaEvidenceReasons(
  availability: ConnectionQuotaAvailability | undefined,
  cells: HealthCell[],
  data: HealthData | undefined,
  evidence: AvailabilityEvidence,
  reasons: HealthReason[]
) {
  if (!availability || availability.account.usable === null)
    reasons.push({ type: "verdictUnavailable" });
  if (cells.length && (data?.stale || data?.raw?._stale || evidence.error))
    reasons.push({ type: "previousSnapshot" });
  if (!cells.length)
    reasons.push(
      evidence.error ? { type: "quotaError", error: evidence.error } : { type: "noQuota" }
    );
}
function prependRuntimeReasons(
  status: HealthStatus,
  runtime: ReturnType<typeof resolveRuntimeFacts>,
  reasons: HealthReason[],
  blocked: HealthReason[]
) {
  if (status === "paused") reasons.unshift({ type: "paused" });
  if (runtime.cooldown) reasons.unshift(runtime.cooldown);
  if (runtime.terminal) reasons.unshift(runtime.terminal);
  reasons.push(...blocked, ...runtime.locks);
}
function healthConstraints(
  runtime: ReturnType<typeof resolveRuntimeFacts>,
  blocked: HealthReason[]
) {
  return [
    ...blocked,
    ...runtime.locks,
    ...(runtime.cooldown ? [runtime.cooldown] : []),
    ...(runtime.terminal ? [runtime.terminal] : []),
  ];
}
function buildHealthAccountResult(
  connection: HealthConnection,
  data: HealthData | undefined,
  cells: HealthCell[],
  reasons: HealthReason[],
  status: HealthStatus,
  recoverAt: string | undefined,
  availability: ConnectionQuotaAvailability | undefined,
  availabilityUntil: number,
  runtime: ReturnType<typeof resolveRuntimeFacts>
): HealthAccount {
  return {
    runtimeAvailability:
      runtime.runtime.isActive === false ? { state: "DISABLED" } : runtime.runtimeAvailability,
    quotaPools: data?.raw?.quotaGroups?.map(({ id, models }) => ({ id, models })),
    connection,
    cells,
    reasons,
    status,
    recoverAt,
    quotaAvailability: availability,
    quotaAvailabilityValidUntil: availabilityUntil,
    partial: !runtime.row || !availability,
    quotaObservedAt: availability?.account.fetchedAt || undefined,
    runtimeObservedAt: runtime.row
      ? new Date(runtime.summaryTime).toISOString()
      : connection.runtimeObservedAt || connection.updatedAt,
  };
}
/** Availability ignores ALL display hiding. Raw values also prevent reset-adjusted display 100% from fabricating a recovery. */
export function buildHealthAccount(
  connection: HealthConnection,
  data: HealthData | undefined,
  _visibility: Record<string, { hidden?: string[] }> = {},
  now = Date.now(),
  evidence: AvailabilityEvidence = {}
): HealthAccount {
  const quotas = buildHealthQuotaMap(data);
  const cells: HealthCell[] = [];
  const reasons: HealthReason[] = [];
  const blocked: HealthReason[] = [];
  // Explicit groups describe independent pools; a scoped model never becomes an extra account.
  const groups = new Set((data?.raw?.quotaGroups || []).map((group) => group.id));
  // Every quota below is display-only; constraints come exclusively from the server.
  const availabilityUntil = parseRuntimeTimestamp(evidence.availabilityObservedAt) + 90_000;
  const availability = availabilityUntil >= now ? evidence.availability : undefined;
  const decisions = availabilityDecisions(availability);
  collectAvailabilityReasons(decisions, reasons, blocked);
  cells.push(...collectHealthCells(connection, data, quotas, decisions, reasons, groups, now));
  appendQuotaEvidenceReasons(availability, cells, data, evidence, reasons);
  const runtime = resolveRuntimeFacts(connection, evidence, reasons, now);
  const status = resolveHealthStatus(runtime, availability, groups, blocked);
  prependRuntimeReasons(status, runtime, reasons, blocked);
  const constraints = healthConstraints(runtime, blocked);
  const recoverAt = healthRecoveryAt(status, constraints, now);
  return buildHealthAccountResult(
    connection,
    data,
    cells,
    reasons,
    status,
    recoverAt,
    availability,
    availabilityUntil,
    runtime
  );
}
/** Provider-only groups, exactly one row per account; no family or window buckets. */
export function buildHealthGroups(
  accounts: HealthAccount[],
  providerOrder: string[] | Record<string, number> = {}
) {
  const providers = new Map<string, HealthAccount[]>();
  for (const a of accounts)
    providers.set(a.connection.provider, [...(providers.get(a.connection.provider) || []), a]);
  const rank = (id: string) => {
    const n = Array.isArray(providerOrder) ? providerOrder.indexOf(id) : providerOrder[id];
    return n === undefined || n < 0 ? Infinity : n;
  };
  return [...providers]
    .sort(([a], [b]) => rank(a) - rank(b) || a.localeCompare(b))
    .map(([provider, list]) => {
      const counts: Record<HealthStatus, number> = {
        critical: 0,
        alert: 0,
        ok: 0,
        paused: 0,
        empty: 0,
      };
      const sorted = [...list].sort(
        (a, b) =>
          RANK[a.status] - RANK[b.status] ||
          (
            a.connection.name ||
            a.connection.displayName ||
            a.connection.email ||
            a.connection.id
          ).localeCompare(
            b.connection.name || b.connection.displayName || b.connection.email || b.connection.id
          ) ||
          a.connection.id.localeCompare(b.connection.id)
      );
      for (const a of sorted) counts[a.status]++;
      return {
        provider,
        total: list.length,
        counts,
        status: aggregateAvailability(list.map((a) => a.status)),
        accounts: sorted,
      };
    });
}
