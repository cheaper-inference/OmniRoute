export type CodexQuotaScope = "codex" | "spark";

export const CODEX_SPARK_MODEL_ID = "gpt-5.3-codex-spark";
export const CODEX_SPARK_DISPLAY_NAME = "GPT-5.3-Codex-Spark";
export const CODEX_SPARK_METERED_FEATURE = "gpt_5_3_codex_spark";
export const CODEX_SPARK_QUOTA_SESSION = `${CODEX_SPARK_METERED_FEATURE}_session`;
export const CODEX_SPARK_QUOTA_WEEKLY = `${CODEX_SPARK_METERED_FEATURE}_weekly`;

/**
 * Codex reserve pool (e.g. `limit_name: "gpt-reserve"`, "Luna Reserve") that keeps
 * serving requests once the primary weekly limit is exhausted. Its rows are
 * DISPLAY-ONLY: they are kept out of the routing quota cache so account selection
 * is unchanged (see omitCodexDisplayOnlyQuotas).
 */
export const CODEX_RESERVE_DISPLAY_NAME = "Luna Reserve";
export const CODEX_RESERVE_QUOTA_SESSION = "reserve_session";
export const CODEX_RESERVE_QUOTA_WEEKLY = "reserve_weekly";

const CODEX_SCOPE_PATTERNS: Array<{ pattern: string; scope: CodexQuotaScope }> = [
  { pattern: "codex-spark", scope: "spark" },
  { pattern: "spark", scope: "spark" },
  { pattern: "bengalfox", scope: "spark" },
  { pattern: "codex", scope: "codex" },
  { pattern: "gpt-5", scope: "codex" },
];

export function getCodexModelScope(model: string | null | undefined): CodexQuotaScope {
  const lower = String(model || "").toLowerCase();
  for (const { pattern, scope } of CODEX_SCOPE_PATTERNS) {
    if (lower.includes(pattern)) return scope;
  }
  return "codex";
}

export function getCodexRateLimitKey(accountId: string, model: string): string {
  return `${accountId}:${getCodexModelScope(model)}`;
}

export function isCodexSparkQuotaKey(key: string | null | undefined): boolean {
  const normalized = String(key || "")
    .trim()
    .toLowerCase();
  if (!normalized) return false;
  return (
    normalized === CODEX_SPARK_QUOTA_SESSION ||
    normalized === CODEX_SPARK_QUOTA_WEEKLY ||
    normalized === "codex-spark" ||
    normalized === "codex-spark-weekly" ||
    normalized.includes("codex-spark") ||
    normalized.includes("codex_spark") ||
    normalized.includes(CODEX_SPARK_METERED_FEATURE)
  );
}

export function isCodexSparkLimitDescriptor(...values: unknown[]): boolean {
  return values.some((value) => {
    if (typeof value !== "string") return false;
    const normalized = value.trim().toLowerCase();
    return (
      normalized.includes("spark") ||
      normalized.includes("bengalfox") ||
      normalized.includes(CODEX_SPARK_METERED_FEATURE)
    );
  });
}

export function getCodexQuotaWindowFilterForModel(
  model: string | null | undefined
): ((windowName: string) => boolean) | undefined {
  if (!model) return undefined;
  const scope = getCodexModelScope(model);
  return (windowName: string) => {
    const isSpark = isCodexSparkQuotaKey(windowName);
    return scope === "spark" ? isSpark : !isSpark;
  };
}

export function toCodexScopedQuotaWindowName(
  baseWindowName: string,
  model: string | null | undefined
): string {
  if (!model || getCodexModelScope(model) !== "spark") return baseWindowName;
  const normalized = baseWindowName.trim().toLowerCase();
  if (normalized === "session") return CODEX_SPARK_QUOTA_SESSION;
  if (normalized === "weekly") return CODEX_SPARK_QUOTA_WEEKLY;
  return baseWindowName;
}

export function toCodexBaseQuotaWindowName(windowName: string | null): string | null {
  if (!windowName) return windowName;
  const normalized = windowName.trim().toLowerCase();
  if (normalized === CODEX_SPARK_QUOTA_SESSION || normalized === "codex-spark") return "session";
  if (normalized === CODEX_SPARK_QUOTA_WEEKLY || normalized === "codex-spark-weekly") {
    return "weekly";
  }
  return windowName;
}

export function isCodexReserveQuotaKey(key: string | null | undefined): boolean {
  const normalized = String(key || "")
    .trim()
    .toLowerCase();
  return normalized === CODEX_RESERVE_QUOTA_SESSION || normalized === CODEX_RESERVE_QUOTA_WEEKLY;
}

export function isCodexReserveLimitDescriptor(...values: unknown[]): boolean {
  if (isCodexSparkLimitDescriptor(...values)) return false;
  return values.some((value) => typeof value === "string" && /reserve/i.test(value));
}

/** Drops display-only Codex windows (reserve pool) so they never drive routing/exhaustion. */
export function omitCodexDisplayOnlyQuotas<T>(quotas: Record<string, T>): Record<string, T> {
  const keys = Object.keys(quotas);
  if (!keys.some(isCodexReserveQuotaKey)) return quotas;
  return Object.fromEntries(
    keys.filter((k) => !isCodexReserveQuotaKey(k)).map((k) => [k, quotas[k]])
  );
}
