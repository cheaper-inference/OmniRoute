import type { StreamFailureSnapshot } from "./streamErrorFormat.ts";

type SummaryCollector = {
  getEventCount: () => number;
  getSummary: () => unknown;
};

export function buildStreamFailureSnapshot(
  providerCollector: SummaryCollector,
  eventCountOverride?: number
): StreamFailureSnapshot {
  let providerEventCount = 0;
  try {
    providerEventCount =
      typeof eventCountOverride === "number"
        ? eventCountOverride
        : providerCollector.getEventCount();
  } catch (error) {
    console.debug("[STREAM] stream failure event count error:", error);
  }
  let providerSummary: unknown;
  try {
    providerSummary = providerCollector.getSummary();
  } catch (error) {
    console.debug("[STREAM] stream failure summary error:", error);
  }
  return providerSummary === undefined || providerSummary === null
    ? { providerEventCount }
    : { providerEventCount, providerSummary };
}
