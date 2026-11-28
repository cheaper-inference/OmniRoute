import { mergeCodexQuotaObservation } from "@/lib/providers/codexQuotaDisplay";
import { isCompleteUsageReading } from "@/lib/usage/usageReading";
import { backupDbFile } from "../backup";
import { getDbInstance, rowToCamel } from "../core";
import { invalidateDbCache } from "../readCache";
import { toRecord } from "./columns";
import { mayWriteCodexConnection } from "../codexConnectionFences";
import { unblockAccount } from "@omniroute/open-sse/services/accountSemaphore.ts";

type RecordValue = Record<string, unknown>;
type Scope = "codex" | "spark";

function clearScope(data: RecordValue, scope: Scope): void {
  for (const key of [
    "codexScopeRateLimitedUntil",
    "codexScopeRateLimitSource",
    "codexExhaustedWindowByScope",
  ]) {
    const values = { ...toRecord(data[key]) };
    delete values[scope];
    data[key] = values;
  }
  if (toRecord(data.codexQuotaState).scope === scope) delete data.codexExhaustedWindow;
}

/**
 * Open the account's in-memory semaphore gate once no Codex scope cooldown is
 * left. A quota 429 blocks the gate until the upstream reset; an early reset
 * clears the persisted cooldown, and the gate has to follow.
 */
function releaseGateWhenNoScopeCooldown(id: string, data: RecordValue | null): void {
  if (!data) return;
  const cooldowns = toRecord(data.codexScopeRateLimitedUntil);
  if (hasActiveCodexScopeCooldown(cooldowns, toRecord(data.codexScopeRateLimitSource))) return;
  unblockAccount({ provider: "codex", accountKey: id });
}

/** Grace window absorbing clock skew against the upstream quota server. */
export const QUOTA_RESET_CLOCK_SKEW_GRACE_MS = 30_000;

/**
 * True when any scope deadline is still in the future. A deadline that already
 * passed is not a cooldown, except an upstream `quota_reset` deadline inside
 * the clock-skew grace; an unparseable one is treated as active.
 */
export function hasActiveCodexScopeCooldown(
  cooldowns: RecordValue,
  sources: RecordValue = {},
  now = Date.now()
): boolean {
  return Object.entries(cooldowns).some(([scope, until]) => {
    const ms = typeof until === "string" ? Date.parse(until) : NaN;
    const grace = sources[scope] === "quota_reset" ? QUOTA_RESET_CLOCK_SKEW_GRACE_MS : 0;
    return !Number.isFinite(ms) || ms > now - grace;
  });
}

/**
 * Open the in-memory semaphore gate of a connection whose persisted quota
 * state was just cleared as recovered. The Codex gate is shared by both
 * scopes, so a scope cooldown still parked on the row keeps it closed.
 */
export function releaseRecoveredAccountGate(connection: {
  id: string;
  provider: string;
  providerSpecificData?: RecordValue;
}): void {
  if (connection.provider === "codex") {
    releaseGateWhenNoScopeCooldown(connection.id, toRecord(connection.providerSpecificData));
    return;
  }
  unblockAccount({ provider: connection.provider, accountKey: connection.id });
}

/** Atomic, account-scoped release. Credentials and terminal account states are untouched. */
export async function clearCodexAccountCooldown(id: string, scope: Scope = "codex") {
  const data = mutate(id, (next) => clearScope(next, scope));
  releaseGateWhenNoScopeCooldown(id, data);
  return data;
}

function mutate(id: string, apply: (data: RecordValue) => void): RecordValue | null {
  const db = getDbInstance();
  const result = db.transaction(() => {
    if (!mayWriteCodexConnection(id)) return null;
    const row = db.prepare("SELECT * FROM provider_connections WHERE id = ?").get(id);
    if (!row) return null;
    const connection = toRecord(rowToCamel(row));
    if (connection.provider !== "codex") return null;
    const data = { ...toRecord(connection.providerSpecificData) };
    const previous = JSON.stringify(data);
    apply(data);
    if (JSON.stringify(data) === previous) return data;
    backupDbFile("pre-write");
    db.prepare(
      "UPDATE provider_connections SET provider_specific_data = ?, updated_at = ? WHERE id = ?"
    ).run(JSON.stringify(data), new Date().toISOString(), id);
    return data;
  })();
  // #13389: codex quota/cooldown observations are routing/health-only writes;
  // the model catalog never reads them, so don't bust the /v1/models cache.
  if (result) invalidateDbCache("connections", undefined, { skipModelCatalog: true });
  return result;
}

/**
 * A scope has recovered when every window it has is below its limit. A complete reading lists
 * all of them, so a plan with a single window (no 5-hour session) recovers on that window alone;
 * otherwise both the session and weekly windows must be shown recovered.
 */
function scopeRecovered(
  windows: readonly RecordValue[],
  valid: (window: RecordValue) => boolean,
  complete: boolean
): boolean {
  const present = complete ? windows.filter(valid) : windows;
  return (
    present.length > 0 &&
    present.every((window) => valid(window) && Number(window.used) < Number(window.total))
  );
}

/** A live usage response hydrates display and releases only fully recovered quota scopes.
 * Compare the pre-fetch state inside the transaction so newer failures win.
 */
export async function syncCodexQuotaObservation(id: string, usage: RecordValue, expected: unknown) {
  if (usage.message) return null;
  const quotas = toRecord(usage.quotas);
  if (!Object.keys(quotas).length) return null;
  const complete = isCompleteUsageReading(usage);
  let released = false;
  const result = mutate(id, (data) => {
    const before = toRecord(expected);
    for (const scope of ["codex", "spark"] as const) {
      const prefix = scope === "spark" ? "gpt_5_3_codex_spark_" : "";
      const session = toRecord(quotas[`${prefix}session`]);
      const weekly = toRecord(quotas[`${prefix}weekly`]);
      const valid = (window: RecordValue) =>
        typeof window.used === "number" &&
        Number.isFinite(window.used) &&
        window.used >= 0 &&
        typeof window.total === "number" &&
        Number.isFinite(window.total) &&
        window.total > 0;
      if (!valid(session) && !valid(weekly)) continue;
      const keys = [
        "codexScopeRateLimitedUntil",
        "codexScopeRateLimitSource",
        "codexExhaustedWindowByScope",
        "codexQuotaStateByScope",
      ];
      if (
        keys.some(
          (key) =>
            JSON.stringify(toRecord(data[key])[scope]) !==
            JSON.stringify(toRecord(before[key])[scope])
        )
      )
        continue;
      const byScope = { ...toRecord(data.codexQuotaStateByScope) };
      const snapshot: RecordValue = { observedAt: new Date().toISOString() };
      for (const [window, suffix] of [
        [session, "5h"],
        [weekly, "7d"],
      ] as const) {
        if (!valid(window)) continue;
        Object.assign(snapshot, {
          [`usage${suffix}`]: window.used,
          [`limit${suffix}`]: window.total,
          [`resetAt${suffix}`]: window.resetAt ?? null,
        });
      }
      const merged = mergeCodexQuotaObservation(toRecord(byScope[scope]), snapshot, { complete });
      if (!merged) continue;
      byScope[scope] = merged;
      data.codexQuotaStateByScope = byScope;
      if (scopeRecovered([session, weekly], valid, complete)) {
        clearScope(data, scope);
        released = true;
      }
    }
  });
  if (released) releaseGateWhenNoScopeCooldown(id, result);
  return result;
}
