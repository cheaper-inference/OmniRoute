import { hasEstimatedUsageEvidence, readUsageEvidence } from "./usageEvidence";

/** Only recorded evidence is read: never reinterpret historical token zeros. */
export function storedUsageEvidence(row: { usage_evidence?: unknown; usage_provenance?: unknown }) {
  const estimated =
    row.usage_provenance === "estimated" || hasEstimatedUsageEvidence(row.usage_evidence);
  return {
    usageEvidence: readUsageEvidence(row.usage_evidence),
    usageProvenance: typeof row.usage_provenance === "string" ? row.usage_provenance : null,
    estimated,
    costEstimated: estimated,
  };
}
export function serializeUsageEvidence(tokens: unknown): string | null {
  const evidence = readUsageEvidence(tokens);
  return evidence ? JSON.stringify(evidence) : null;
}
/** Bounded scalar receipt for live previews; no request or response payloads. */
export type PendingUsageTokens = Partial<ReturnType<typeof liveUsageEvidence>> & {
  in: number;
  out: number;
  cacheRead: number | null;
  cacheCreation: number | null;
  reasoning: number | null;
  compressed: number | null;
};
export function liveUsageEvidence(tokens: unknown) {
  const bag = tokens && typeof tokens === "object" ? (tokens as Record<string, unknown>) : {};
  return storedUsageEvidence({
    usage_evidence: readUsageEvidence(tokens),
    usage_provenance: bag.estimated === true ? "estimated" : bag.usageProvenance,
  });
}
