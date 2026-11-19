/** Missing provenance is historical, not evidence that the value was reported. */
export function formatUsageCounter(
  value: number | null | undefined,
  evidence: { source: string; method?: string } | null | undefined,
  t: (key: string) => string
): string {
  if (evidence?.source === "unknown" || value == null || !Number.isFinite(value) || value < 0)
    return t("unknown");
  const source =
    evidence?.source === "reported" || evidence?.source === "estimated"
      ? evidence.source
      : "unknownSource";
  const method = source === "estimated" && evidence?.method ? `: ${evidence.method}` : "";
  return `${value.toLocaleString()} (${t(source)}${method})`;
}
