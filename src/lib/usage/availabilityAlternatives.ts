import type { QuotaAvailabilityDecision, QuotaAvailabilityWindow } from "./availabilityTypes";

/** Within a request all blockers must clear; unknown deadlines cannot promise recovery. */
function recoveryWindow(decision: QuotaAvailabilityDecision): QuotaAvailabilityWindow | undefined {
  if (decision.recoveryWindow) return decision.recoveryWindow;
  const unknown = decision.blockers.filter((b) => !Number.isFinite(Date.parse(b.resetAt || "")));
  return [...(unknown.length ? unknown : decision.blockers)].sort(
    (a, b) =>
      (unknown.length ? 0 : Date.parse(b.resetAt!) - Date.parse(a.resetAt!)) ||
      Number(b.kind === "overall") - Number(a.kind === "overall") ||
      a.name.localeCompare(b.name)
  )[0];
}

/** Alternatives reuse routing verdicts: any usable request wins, otherwise first recovery wins. */
export function combineQuotaAlternatives(
  decisions: QuotaAvailabilityDecision[],
  fallback: QuotaAvailabilityDecision
): QuotaAvailabilityDecision {
  if (!decisions.length) return fallback;
  if (decisions.length === 1) return decisions[0];
  const usable = decisions.find((d) => d.usable === true);
  if (usable) return { ...usable, blockers: [] };
  const allBlocked = decisions.every((d) => d.usable === false);
  const recoveries = decisions.map(recoveryWindow).filter((b) => b !== undefined);
  const known = recoveries.filter((b) => Number.isFinite(Date.parse(b.resetAt || "")));
  const first = [...(known.length ? known : recoveries)].sort(
    (a, b) =>
      (known.length ? Date.parse(a.resetAt!) - Date.parse(b.resetAt!) : 0) ||
      Number(a.kind === "overall") - Number(b.kind === "overall") ||
      a.name.localeCompare(b.name)
  )[0];
  return {
    ...fallback,
    usable: allBlocked ? false : null,
    blockers: allBlocked ? decisions.flatMap((d) => d.blockers) : [],
    allowanceReasons: [],
    ...(allBlocked && first ? { recoveryWindow: first } : {}),
  };
}
