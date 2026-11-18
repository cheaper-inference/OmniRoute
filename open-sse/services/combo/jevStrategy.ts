/**
 * Pure judge for the `jev` combo strategy.
 *
 * The user authors an ordered preference list. Jev (TypeSafe System One) picks
 * which of those entries this request may attempt. Among the admitted set, the
 * winner runs first; other admitted targets stay in the user's preference order.
 *
 * No DB, no fetch — call `evaluateSystemOneChoice` outside and pass the answer in.
 * Spec: #15276.
 */

export const JEV_PROBABILITY_FLOOR = 0.15;
export const JEV_CONFIDENCE_FLOOR = 0.65;
export const JEV_MAX_ADMITTED = 4;

export type JevHoldReason =
  "below_probability_floor" | "dominated" | "low_confidence" | "jev_unavailable";

export type JevCandidate = {
  /** Opaque, request-local option key. It must not expose model or account identifiers. */
  id: string;
  /** 0-based preference rank from the stored combo list. */
  userRank: number;
  /** Optional model label for criteria text (not used by the judge itself). */
  label?: string | null;
};

export type JevChoiceAnswer = {
  choice: string;
  probabilities: Record<string, number>;
  confidence: number;
};

export type JevVerdictRow = {
  id: string;
  userRank: number;
  verdict: "admitted" | "held";
  reason?: JevHoldReason;
  probability: number | null;
};

export type JudgeJevResult = {
  /** Admitted targets: winner first, then other admitted in userRank order. */
  admitted: JevVerdictRow[];
  /** Held targets that must not be attempted. */
  held: JevVerdictRow[];
  /** True when the judge fell open to full user order. */
  fellOpen: boolean;
  fallbackReason: "low_confidence" | "jev_unavailable" | null;
};

function byUserRank(a: { userRank: number }, b: { userRank: number }): number {
  return a.userRank - b.userRank;
}

function probabilityFor(answer: JevChoiceAnswer, id: string): number {
  const n = answer.probabilities[id];
  return typeof n === "number" && Number.isFinite(n) ? n : 0;
}

function admitCandidates(
  candidates: readonly JevCandidate[],
  winner: JevCandidate,
  answer: JevChoiceAnswer
): Pick<JudgeJevResult, "admitted" | "held"> {
  const admitted: JevVerdictRow[] = [
    {
      id: winner.id,
      userRank: winner.userRank,
      verdict: "admitted",
      probability: probabilityFor(answer, winner.id),
    },
  ];
  const held: JevVerdictRow[] = [];

  for (const candidate of [...candidates].sort(byUserRank)) {
    if (candidate.id === winner.id) continue;
    const probability = probabilityFor(answer, candidate.id);
    if (probability < JEV_PROBABILITY_FLOOR) {
      held.push({
        id: candidate.id,
        userRank: candidate.userRank,
        verdict: "held",
        reason: "below_probability_floor",
        probability,
      });
      continue;
    }
    if (admitted.length >= JEV_MAX_ADMITTED) {
      held.push({
        id: candidate.id,
        userRank: candidate.userRank,
        verdict: "held",
        reason: "dominated",
        probability,
      });
      continue;
    }
    admitted.push({
      id: candidate.id,
      userRank: candidate.userRank,
      verdict: "admitted",
      probability,
    });
  }
  return { admitted, held };
}

/**
 * Fall open: admit every candidate in user order, tagging each admitted row
 * with the fallback reason and setting fellOpen/fallbackReason — the attempt
 * loop walks the full preference list.
 */
function fallOpen(
  candidates: readonly JevCandidate[],
  reason: "low_confidence" | "jev_unavailable"
): JudgeJevResult {
  const admitted = [...candidates].sort(byUserRank).map((c) => ({
    id: c.id,
    userRank: c.userRank,
    verdict: "admitted" as const,
    reason,
    probability: null as number | null,
  }));
  return {
    admitted,
    held: [],
    fellOpen: true,
    fallbackReason: reason,
  };
}

/**
 * Pure judge. `answer === null` means the System One call was unavailable.
 *
 * Blocked targets must be filtered out by the caller before invoking this —
 * they are never offered to Jev and never appear in the result.
 */
export function judgeJev(
  candidates: readonly JevCandidate[],
  answer: JevChoiceAnswer | null
): JudgeJevResult {
  if (candidates.length === 0) {
    return { admitted: [], held: [], fellOpen: false, fallbackReason: null };
  }

  // One eligible target: skip the call (caller may still skip it) — admit as-is.
  if (candidates.length === 1) {
    const only = candidates[0];
    return {
      admitted: [
        {
          id: only.id,
          userRank: only.userRank,
          verdict: "admitted",
          probability: answer ? probabilityFor(answer, only.id) : null,
        },
      ],
      held: [],
      fellOpen: false,
      fallbackReason: null,
    };
  }

  if (!answer) {
    return fallOpen(candidates, "jev_unavailable");
  }

  if (!(answer.confidence >= JEV_CONFIDENCE_FLOOR)) {
    return fallOpen(candidates, "low_confidence");
  }

  const ids = new Set(candidates.map((c) => c.id));
  if (!ids.has(answer.choice)) {
    return fallOpen(candidates, "jev_unavailable");
  }

  const winner = candidates.find((c) => c.id === answer.choice);
  if (!winner) {
    return fallOpen(candidates, "jev_unavailable");
  }

  const { admitted, held } = admitCandidates(candidates, winner, answer);

  return {
    admitted,
    held,
    fellOpen: false,
    fallbackReason: null,
  };
}

/** Build System One choice criteria from candidates (id → label). */
export function buildJevCriteria(
  candidates: readonly JevCandidate[]
): Record<string, string | null> {
  const criteria: Record<string, string | null> = {};
  for (const candidate of candidates) {
    const label =
      typeof candidate.label === "string" && candidate.label.trim().length > 0
        ? candidate.label.trim()
        : candidate.id;
    criteria[candidate.id] = label;
  }
  return criteria;
}

/**
 * Reorder `targets` to match `admitted` order (winner first, then userRank).
 * Identity is `executionKey` when present, otherwise `stepId`. Targets that
 * were not admitted are dropped.
 */
export function orderTargetsByJevVerdicts<T extends { stepId?: string; executionKey?: string }>(
  targets: readonly T[],
  admitted: readonly JevVerdictRow[]
): T[] {
  const byId = new Map<string, T>();
  for (const target of targets) {
    const id = target.executionKey ?? target.stepId;
    if (id) byId.set(id, target);
  }
  const ordered: T[] = [];
  for (const row of admitted) {
    const target = byId.get(row.id);
    if (target) ordered.push(target);
  }
  return ordered;
}
