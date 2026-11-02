import type { HealthAccount, HealthReason, HealthStatus } from "./healthOverview";
import { parseRuntimeTimestamp } from "./runtimeCooldown";

export type DisplayKind = "ok" | "cd5" | "cdw" | "act" | "paused" | "empty";
export type DisplayFilter = DisplayKind | "all" | "critical" | "alert";
export interface DisplayAccount extends HealthAccount {
  kind: DisplayKind;
  fill: number | null;
  remainingPct: number | null;
  waitMs: number | null;
  poolId?: string;
}
export const DISPLAY_KINDS: DisplayKind[] = ["ok", "cd5", "cdw", "act", "paused", "empty"];
export const DISPLAY_COLORS: Record<DisplayKind, string> = {
  ok: "var(--color-success)",
  cd5: "var(--color-warning)",
  cdw: "var(--color-error)",
  act: "var(--color-error)",
  paused: "var(--color-text-muted)",
  empty: "var(--color-text-muted)",
};
export const DISPLAY_LABELS = {
  ok: "usage.healthAvailable",
  cd5: "usage.healthCd5",
  cdw: "usage.healthCdw",
  act: "usage.healthAction",
  paused: "common.paused",
  empty: "usage.tierUnknown",
} as const;
const FIVE_HOURS = 5 * 3_600_000;
const WEEK = 7 * 24 * 3_600_000;
export function poolIds(account: HealthAccount): string[] {
  return [
    ...new Set([
      ...(account.quotaPools || []).map((g) => g.id),
      ...account.cells.filter((c) => c.scope === "group").map((c) => c.scopeId),
    ]),
  ]
    .filter((id): id is string => !!id)
    .sort();
}
function applicableModel(model: string, id: string, account: HealthAccount) {
  if (account.quotaPools?.find((g) => g.id === id)?.models?.includes(model)) return true;
  if (["agy", "antigravity"].includes(account.connection.provider)) {
    if (/^gemini/i.test(model)) return id === "gemini";
    if (/^(claude|gpt)/i.test(model)) return id === "claude_gpt";
  }
  return true;
}
function selectDisplayCells(account: HealthAccount, poolId?: string) {
  return poolId
    ? account.cells.filter((cell) =>
        cell.scope === "group"
          ? cell.scopeId === poolId
          : cell.scope === "scoped" && applicableModel(cell.name, poolId, account)
      )
    : account.cells;
}
function selectDisplayReasons(account: HealthAccount, poolId: string | undefined, now: number) {
  return account.reasons.filter(
    (reason) =>
      (reason.type !== "cooldown" || parseRuntimeTimestamp(reason.resetAt || "") > now) &&
      (!poolId ||
        (reason.type === "lockout" || reason.scope === "scoped"
          ? applicableModel(reason.window || "", poolId, account)
          : reason.scope !== "group" || reason.scopeId === poolId))
  );
}
function displayDecision(account: HealthAccount, now: number, poolId?: string) {
  const server =
    (account.quotaAvailabilityValidUntil ?? -Infinity) >= now
      ? account.quotaAvailability
      : undefined;
  return {
    server,
    decision: poolId
      ? server?.scopes.find((scope) => scope.kind === "group" && scope.id === poolId)?.decision
      : server?.account,
  };
}
function constraintKind(
  reason: HealthReason,
  blockers: NonNullable<ReturnType<typeof displayDecision>["decision"]>["blockers"]
): "cd5" | "cdw" {
  if (reason.type === "quota") {
    return blockers.find((blocker) => blocker.name === reason.window)?.kind === "fiveHour"
      ? "cd5"
      : "cdw";
  }
  return (reason.durationMs ?? Infinity) <= FIVE_HOURS ? "cd5" : "cdw";
}
function resolveRecovery(
  constraints: HealthReason[],
  blockers: NonNullable<ReturnType<typeof displayDecision>["decision"]>["blockers"],
  kind: DisplayKind,
  now: number
) {
  const unknown = constraints.filter(
    (reason) => !Number.isFinite(parseRuntimeTimestamp(reason.resetAt || ""))
  );
  const latest = [...constraints].sort(
    (a, b) =>
      (unknown.length
        ? 0
        : parseRuntimeTimestamp(b.resetAt!) - parseRuntimeTimestamp(a.resetAt!)) ||
      Number(constraintKind(b, blockers) === "cdw") - Number(constraintKind(a, blockers) === "cdw")
  )[0];
  const displayKind = latest ? constraintKind(latest, blockers) : "cdw";
  const duration =
    latest?.type === "cooldown" && latest.durationMs !== undefined && latest.durationMs > 0
      ? latest.durationMs
      : displayKind === "cd5"
        ? FIVE_HOURS
        : WEEK;
  return {
    kind: kind === "ok" ? displayKind : kind,
    recoverAt: !unknown.length && latest ? latest.resetAt || undefined : undefined,
    waitMs:
      !unknown.length && latest ? Math.max(0, parseRuntimeTimestamp(latest.resetAt!) - now) : null,
    waitDuration: duration,
  };
}
function selectWaterPercentages(
  cells: HealthAccount["cells"],
  decision: ReturnType<typeof displayDecision>["decision"],
  poolId?: string
) {
  const locallyLimited = cells.filter((cell) => !cell.quotaIgnored);
  const bypassed = cells.some((cell) => cell.quotaIgnored);
  const waterCells =
    poolId || bypassed ? locallyLimited : locallyLimited.filter((cell) => cell.scope !== "scoped");
  const alternatives = new Map<string, typeof waterCells>();
  for (const cell of waterCells) {
    const base = cell.name.replace(/_freetrial$/, "");
    const key = JSON.stringify([cell.scope, cell.scopeId, base]);
    alternatives.set(key, [...(alternatives.get(key) || []), cell]);
  }
  const percentages = [...alternatives.values()].map(
    (entries) =>
      [...entries].sort((a, b) => {
        const above = (cell: typeof a) =>
          Number(cell.percent > (decision?.displayCutoffs?.[cell.name] ?? 0) + 1e-9);
        return above(b) - above(a) || b.percent - a.percent;
      })[0].percent
  );
  return { percentages, bypassed };
}
function resolveDisplayState(
  account: HealthAccount,
  decision: ReturnType<typeof displayDecision>["decision"],
  server: ReturnType<typeof displayDecision>["server"],
  reasons: HealthReason[],
  recoveryBlockers: NonNullable<ReturnType<typeof displayDecision>["decision"]>["blockers"],
  constraints: HealthReason[],
  now: number
) {
  const accountBlocked = decision?.usable === false;
  const terminal = reasons.some((reason) => reason.type === "terminal");
  const cooldown = reasons.filter((reason) => reason.type === "cooldown");
  let kind: DisplayKind = account.status === "paused" ? "paused" : terminal ? "act" : "ok";
  let recoverAt: string | undefined;
  let waitMs: number | null = null;
  let waitDuration = WEEK;
  if (kind === "ok" && (accountBlocked || cooldown.length)) {
    const recovery = resolveRecovery(constraints, recoveryBlockers, kind, now);
    kind = recovery.kind;
    recoverAt = recovery.recoverAt;
    waitMs = recovery.waitMs;
    waitDuration = recovery.waitDuration;
  }
  const partial =
    kind === "ok" &&
    ((server?.scopes.some((scope) => scope.decision.usable !== true) ?? false) ||
      reasons.some((reason) => reason.type === "lockout"));
  if (
    kind === "ok" &&
    (decision?.usable !== true || reasons.some((reason) => reason.type === "noRuntime"))
  )
    kind = "empty";
  return { kind, partial, recoverAt, waitMs, waitDuration };
}
function displayFill(
  kind: DisplayKind,
  remainingPct: number | null,
  waitMs: number | null,
  waitDuration: number
) {
  if (kind === "ok") return remainingPct;
  if (kind !== "cd5" && kind !== "cdw") return null;
  return waitMs === null ? 0 : Math.max(0, Math.min(100, (1 - waitMs / waitDuration) * 100));
}
function project(account: HealthAccount, now: number, poolId?: string): DisplayAccount {
  const cells = selectDisplayCells(account, poolId);
  const reasons = selectDisplayReasons(account, poolId, now);
  const { server, decision } = displayDecision(account, now, poolId);
  const recoveryBlockers = decision?.recoveryWindow
    ? [decision.recoveryWindow]
    : decision?.blockers || [];
  const constraints: HealthReason[] = [
    ...recoveryBlockers.map((blocker) => ({
      type: "quota" as const,
      window: blocker.name,
      resetAt: blocker.resetAt,
    })),
    ...reasons.filter((reason) => reason.type === "cooldown"),
  ];
  const state = resolveDisplayState(
    account,
    decision,
    server,
    reasons,
    recoveryBlockers,
    constraints,
    now
  );
  const { percentages, bypassed } = selectWaterPercentages(cells, decision, poolId);
  const remainingPct = percentages.length ? Math.min(...percentages) : bypassed ? 100 : null;
  const fill = displayFill(state.kind, remainingPct, state.waitMs, state.waitDuration);
  return {
    ...account,
    cells,
    reasons,
    kind: state.kind,
    partial: state.partial,
    fill,
    remainingPct,
    waitMs: state.waitMs,
    recoverAt: state.recoverAt,
    poolId,
    status: displayStatus({ kind: state.kind, partial: state.partial }),
  };
}
export function displayAccount(account: HealthAccount, now = Date.now()): DisplayAccount {
  return project(account, now);
}
export function displayPool(account: HealthAccount, id: string, now = Date.now()): DisplayAccount {
  return project(account, now, id);
}
export function displayStatus(a: Pick<DisplayAccount, "kind" | "partial">): HealthStatus {
  if (a.kind === "ok") return a.partial ? "alert" : "ok";
  return ["cd5", "cdw", "act"].includes(a.kind) ? "critical" : (a.kind as HealthStatus);
}
export function matchesDisplayFilter(a: DisplayAccount, filter: DisplayFilter): boolean {
  if (filter === "all") return true;
  if (filter === "critical") return ["cd5", "cdw", "act"].includes(a.kind);
  if (filter === "alert") return a.kind === "ok" && a.partial;
  return a.kind === filter;
}
export function compareDisplayAccounts(a: DisplayAccount, b: DisplayAccount) {
  const rank = (x: DisplayAccount) =>
    x.kind === "ok" ? Number(x.partial) : DISPLAY_KINDS.indexOf(x.kind) + 1;
  const label = (x: DisplayAccount) =>
    x.connection.name || x.connection.displayName || x.connection.email || x.connection.id;
  return (
    rank(a) - rank(b) ||
    (b.fill ?? -1) - (a.fill ?? -1) ||
    label(a).localeCompare(label(b)) ||
    a.connection.id.localeCompare(b.connection.id)
  );
}
export function countDisplay(accounts: DisplayAccount[]) {
  const counts = {
    ok: 0,
    cd5: 0,
    cdw: 0,
    act: 0,
    paused: 0,
    empty: 0,
    partial: 0,
    all: accounts.length,
  };
  for (const a of accounts) {
    counts[a.kind]++;
    if (a.kind === "ok" && a.partial) counts.partial++;
  }
  return counts;
}
