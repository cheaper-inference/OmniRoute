import {
  CODEX_SPARK_QUOTA_SESSION,
  CODEX_SPARK_QUOTA_WEEKLY,
} from "@omniroute/open-sse/config/codexQuotaScopes.ts";
import type { ProviderLimitsCacheEntry } from "@/lib/db/providerLimits";

type JsonRecord = Record<string, unknown>;
type Scope = "codex" | "spark";
type WindowKey = "5h" | "7d";
const QUOTA_KEYS: Record<Scope, Record<WindowKey, string>> = {
  codex: { "5h": "session", "7d": "weekly" },
  spark: { "5h": CODEX_SPARK_QUOTA_SESSION, "7d": CODEX_SPARK_QUOTA_WEEKLY },
};
interface ObservedWindow {
  key: WindowKey;
  value: JsonRecord;
}

function record(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}
function time(value: unknown): number {
  return typeof value === "string" ? Date.parse(value) : NaN;
}
function finite(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
function windowTime(state: JsonRecord, key: WindowKey): unknown {
  return record(state.observedAtByWindow)[key] ?? state.observedAt;
}
function signalWindowKey(window: JsonRecord): WindowKey | null {
  if (!finite(window.percentUsed) || window.percentUsed < 0 || window.percentUsed > 1) return null;
  return window.windowSeconds === 18000 ? "5h" : window.windowSeconds === 604800 ? "7d" : null;
}

/** This reads accepted persistence DTOs, not raw HTTP/WS payloads or token estimates. */
function observedWindows(state: JsonRecord, scope: Scope): ObservedWindow[] {
  const result = new Map<WindowKey, JsonRecord>();
  for (const key of ["5h", "7d"] as const) {
    const used = state[`usage${key}`];
    const total = state[`limit${key}`];
    if (!finite(used) || !finite(total) || used < 0 || total <= 0) continue;
    result.set(key, {
      used,
      total,
      remainingPercentage: Math.max(0, (100 * (total - used)) / total),
      resetAt: state[`resetAt${key}`] ?? null,
    });
  }
  const signal = record(state.quotaSignal);
  if (signal.scope !== scope || !Array.isArray(signal.windows)) {
    return [...result].map(([key, value]) => ({ key, value }));
  }
  for (const raw of signal.windows) {
    const window = record(raw);
    const key = signalWindowKey(window);
    if (!key) continue;
    result.set(key, {
      used: 0,
      total: 0,
      isPercentageOnly: true,
      remainingPercentage: 100 - Number(window.percentUsed) * 100,
      resetAt: window.resetAt ?? null,
    });
  }
  return [...result].map(([key, value]) => ({ key, value }));
}

function mergeWindowTimes(previous: JsonRecord, next: JsonRecord): JsonRecord {
  const observedAtByWindow = { ...record(previous.observedAtByWindow) };
  // Upgrade existing snapshots lazily, preserving the age of an omitted sibling window.
  for (const scope of ["codex", "spark"] as const) {
    for (const { key } of observedWindows(previous, scope)) {
      observedAtByWindow[key] ??= previous.observedAt;
    }
    for (const { key } of observedWindows(next, scope)) {
      observedAtByWindow[key] = windowTime(next, key);
    }
  }
  return observedAtByWindow;
}

function validNumericPatch(next: JsonRecord): JsonRecord {
  const safeNext = { ...next };
  for (const key of ["5h", "7d"] as const) {
    const used = next[`usage${key}`];
    const total = next[`limit${key}`];
    if (finite(used) && used >= 0 && finite(total) && total > 0) continue;
    // Legacy Infinity/null defaults mean absence, not evidence replacing a known sibling.
    for (const prefix of ["usage", "limit", "resetAt"]) delete safeNext[`${prefix}${key}`];
  }
  return safeNext;
}

function addSignalWindows(windows: Map<WindowKey, unknown>, values: unknown): void {
  for (const value of Array.isArray(values) ? values : []) {
    const key = signalWindowKey(record(value));
    if (key) windows.set(key, value);
  }
}

function mergeSignalWindows(before: JsonRecord, after: JsonRecord, patch: JsonRecord): JsonRecord {
  const windows = new Map<WindowKey, unknown>();
  addSignalWindows(windows, before.windows);
  // A fresh numeric window replaces its old percentage signal, not its sibling.
  for (const key of ["5h", "7d"] as const) {
    if (patch[`limit${key}`] !== undefined) windows.delete(key);
  }
  addSignalWindows(windows, after.windows);
  return { ...before, ...after, windows: [...windows.values()] };
}

/** Keep sparse observations, but do not let a delayed snapshot clear newer scoped state. */
export function mergeCodexQuotaObservation(
  previous: JsonRecord,
  next: JsonRecord
): JsonRecord | null {
  if (time(next.observedAt) < time(previous.observedAt)) return null;
  const safeNext = validNumericPatch(next);
  const merged: JsonRecord = {
    ...previous,
    ...Object.fromEntries(Object.entries(safeNext).filter(([, value]) => value !== undefined)),
    observedAtByWindow: mergeWindowTimes(previous, next),
  };
  const before = record(previous.quotaSignal);
  const after = record(next.quotaSignal);
  if (Array.isArray(before.windows) || Array.isArray(after.windows)) {
    merged.quotaSignal = mergeSignalWindows(before, after, safeNext);
  }
  return merged;
}

type DisplayProjection = { quotas: JsonRecord; latest: number; changed: boolean };
function projectScopeWindows(
  projection: DisplayProjection,
  state: JsonRecord,
  scope: Scope,
  fetchedAt: string | undefined
): void {
  const { quotas } = projection;
  for (const { key, value } of observedWindows(state, scope)) {
    const name = QUOTA_KEYS[scope][key];
    const observedAt = windowTime(state, key);
    const observed = time(observedAt);
    const prior = time(
      record(quotas[name]).observedAt ?? (Object.hasOwn(quotas, name) ? fetchedAt : undefined)
    );
    if (!Number.isFinite(observed) || observed <= prior) continue;
    quotas[name] = { ...value, observedAt };
    projection.latest = Number.isFinite(projection.latest)
      ? Math.max(projection.latest, observed)
      : observed;
    projection.changed = true;
  }
}

function preserveUntouchedWindowTimes(quotas: JsonRecord, fetchedAt: string): void {
  // A later session update must not make an untouched weekly/reserve row look younger.
  for (const [name, raw] of Object.entries(quotas)) {
    const value = record(raw);
    if (!value.observedAt) quotas[name] = { ...value, observedAt: fetchedAt };
  }
}

/** Overlay only newer known windows; polling never writes or restamps their read time. */
export function projectCodexQuotaDisplay(
  cached: ProviderLimitsCacheEntry | null,
  providerSpecificData: unknown
): ProviderLimitsCacheEntry | null {
  const data = record(providerSpecificData);
  const byScope = record(data.codexQuotaStateByScope);
  const legacy = record(data.codexQuotaState);
  const projection: DisplayProjection = {
    quotas: { ...cached?.quotas },
    latest: time(cached?.fetchedAt),
    changed: false,
  };
  for (const scope of ["codex", "spark"] as const) {
    const state = record(byScope[scope] ?? (legacy.scope === scope ? legacy : undefined));
    projectScopeWindows(projection, state, scope, cached?.fetchedAt);
  }
  if (!projection.changed) return cached;
  if (cached) preserveUntouchedWindowTimes(projection.quotas, cached.fetchedAt);
  return {
    ...cached,
    quotas: projection.quotas,
    plan: cached?.plan ?? null,
    message: null,
    fetchedAt: new Date(projection.latest).toISOString(),
    source: "upstream-response",
  };
}
