import { toCodexBaseQuotaWindowName } from "@omniroute/open-sse/config/codexQuotaScopes.ts";

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function getCodexLimitPolicy(providerSpecificData: unknown) {
  const policy = asRecord(asRecord(providerSpecificData).codexLimitPolicy);
  return { use5h: policy.use5h !== false, useWeekly: policy.useWeekly !== false };
}

function normalizeCodexWindowName(windowName: string): string {
  const normalized = windowName.trim().toLowerCase();
  if (["session (5h)", "5h", "five_hour"].includes(normalized)) return "session";
  if (["weekly (7d)", "7d", "seven_day"].includes(normalized)) return "weekly";
  return toCodexBaseQuotaWindowName(normalized) ?? normalized;
}

function isWindowEnabled(windowName: string, policy: ReturnType<typeof getCodexLimitPolicy>) {
  const normalized = normalizeCodexWindowName(windowName);
  if (normalized === "session") return policy.use5h;
  if (normalized === "weekly") return policy.useWeekly;
  return true;
}

/** Shared tracking policy: disabled known windows stay disabled even with explicit cutoffs. */
export function applyCodexWindowPolicy(
  rawWindows: string[],
  providerSpecificData: unknown
): string[] {
  const policy = getCodexLimitPolicy(providerSpecificData);
  const windows = rawWindows
    .map(normalizeCodexWindowName)
    .filter(Boolean)
    .filter((name) => isWindowEnabled(name, policy));
  if (policy.use5h) windows.push("session");
  if (policy.useWeekly) windows.push("weekly");
  return [...new Set(windows)];
}

/**
 * Filter measured windows without renaming Spark keys or guessing unknown durations.
 * Preserve the input reference when nothing was excluded: the preflight uses that
 * distinction to retain unattributed upstream exhaustion unless a known window was disabled.
 */
export function filterCodexQuotaWindows<T>(
  windows: Record<string, T>,
  providerSpecificData: unknown
): Record<string, T> {
  const policy = getCodexLimitPolicy(providerSpecificData);
  const entries = Object.entries(windows);
  const selected = entries.filter(([name]) => isWindowEnabled(name, policy));
  return selected.length === entries.length ? windows : Object.fromEntries(selected);
}
