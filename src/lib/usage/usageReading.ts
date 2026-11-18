/**
 * A complete usage reading is fresh upstream evidence of every quota window the account has
 * right now. Providers add and remove windows over time (OpenAI dropped the 5-hour Codex window
 * for some plans), so a window known from an earlier reading but absent from a complete one is
 * gone, not merely unobserved.
 *
 * Completeness is attested by the provider's usage adapter, which alone knows its wire format:
 * it sets `quotasComplete: true` only when the payload explicitly listed its windows (present or
 * `null`) and every listed window parsed. A parser that drops a window it cannot read must not
 * make that window look gone. A stale cached copy (served during a usage-endpoint 429 cooldown),
 * a failed fetch or partial evidence (response headers) never proves absence.
 */
export function isCompleteUsageReading(usage: unknown): boolean {
  if (!usage || typeof usage !== "object" || Array.isArray(usage)) return false;
  const record = usage as Record<string, unknown>;
  if (record.message || record._stale || record.quotasComplete !== true) return false;
  const quotas = record.quotas;
  return !!quotas && typeof quotas === "object" && !Array.isArray(quotas);
}
