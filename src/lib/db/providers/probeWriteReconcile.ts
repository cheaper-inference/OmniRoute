import { parseCooldownUntilMs as parseStoredCooldown } from "./rateLimit";
import { isParkedTestStatus } from "@/shared/utils/parkedStatus";

type JsonRecord = Record<string, unknown>;

/**
 * Reconcile a probe report with the row the persistence transaction read. The probe saw the row as
 * it was before it started, so a verdict parked while it was in flight outlives it.
 */
export function applyProbeWriteOutcome(
  merged: JsonRecord,
  existingCamel: JsonRecord,
  probe: { outcome: "success" | "failure"; startedAt: string } | undefined
): void {
  if (!probe) return;
  const parked = isParkedTestStatus(existingCamel.testStatus);
  const parkedAt = parseStoredCooldown(
    existingCamel.lastErrorAt as string | number | null | undefined
  );
  const probeStartedAt = parseStoredCooldown(probe.startedAt);
  if (parked && probe.outcome === "failure") preserveParkedOnFailure(merged, existingCamel);
  if (parked && outranksProbe(parkedAt, probeStartedAt)) {
    preserveVerdictThatOutlivesProbe(merged, existingCamel, parkedAt);
  }
  if (probe.outcome === "success") preserveFutureCooldown(merged, existingCamel);
}

/**
 * A verdict stamped no earlier than the probe start is newer evidence than the probe's own result.
 * When either stamp cannot be read, the verdict counts as newer: a probe may only clear a verdict
 * it can prove predates it.
 */
function outranksProbe(parkedAt: number | null, probeStartedAt: number | null): boolean {
  if (parkedAt === null || probeStartedAt === null) return true;
  return parkedAt >= probeStartedAt;
}

/**
 * A failed probe never replaces a parked verdict, whichever status it would write: it observed one
 * request, not the ban. Its own diagnosis still lands in the error fields.
 */
function preserveParkedOnFailure(merged: JsonRecord, existingCamel: JsonRecord): void {
  const genericFailure = String(merged.testStatus ?? "").toLowerCase() === "error";
  merged.testStatus = existingCamel.testStatus;
  // The retry window a generic failure would write is outranked by the parked cooldown.
  if (genericFailure) merged.rateLimitedUntil = existingCamel.rateLimitedUntil ?? merged.rateLimitedUntil;
}

/**
 * A verdict parked while the probe was in flight outlives it, evidence included: the probe reports
 * on a row that no longer exists.
 */
function preserveVerdictThatOutlivesProbe(
  merged: JsonRecord,
  existingCamel: JsonRecord,
  parkedAt: number | null
): void {
  merged.testStatus = existingCamel.testStatus;
  merged.isActive = existingCamel.isActive;
  // Only a verdict that carries its own stamp has evidence worth protecting; without one there is
  // nothing to preserve and the probe's own report is the better record.
  if (parkedAt === null) return;
  for (const field of ["lastError", "lastErrorAt", "lastErrorType", "lastErrorSource", "errorCode"]) {
    if (existingCamel[field] !== undefined) merged[field] = existingCamel[field];
  }
}

/**
 * A passing probe proves the credential authenticates; it does not overrule a quota statement, and a
 * later incoming deadline still wins.
 */
function preserveFutureCooldown(merged: JsonRecord, existingCamel: JsonRecord): void {
  const storedUntil = parseStoredCooldown(
    existingCamel.rateLimitedUntil as string | number | null | undefined
  );
  const incomingUntil = parseStoredCooldown(
    merged.rateLimitedUntil as string | number | null | undefined
  );
  const storedIsFuture = storedUntil !== null && storedUntil > Date.now();
  const incomingOutranks =
    storedUntil !== null && incomingUntil !== null && incomingUntil >= storedUntil;
  if (storedIsFuture && !incomingOutranks) merged.rateLimitedUntil = existingCamel.rateLimitedUntil;
}
