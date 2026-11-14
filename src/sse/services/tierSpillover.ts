/**
 * Opt-in tier spillover for the default fill-first account selection
 * (OMNIROUTE_TIER_SPILLOVER). Fill-first stays on the top priority tier until it fails; this
 * leaves that tier only when EVERY member of it is at or below the saturation threshold of
 * remaining quota. Headroom comes from the same quota source the eligibility checks read.
 * Unknown headroom counts as room, so missing data never causes a spill.
 */
const DEFAULT_THRESHOLD_PERCENT = 20;

export function isTierSpilloverEnabled(): boolean {
  return /^(1|true|yes|on)$/i.test(process.env.OMNIROUTE_TIER_SPILLOVER?.trim() ?? "");
}

/** Return the connection to use instead of the top tier, or null to keep fill-first. */
export function pickTierSpillover<T extends { priority?: number | null }>(
  connections: T[],
  headroomOf: (connection: T) => number | null,
  thresholdPercent = DEFAULT_THRESHOLD_PERCENT
): T | null {
  const priorityOf = (c: T) => c.priority || 999;
  const topPriority = Math.min(...connections.map(priorityOf));
  const top = connections.filter((c) => priorityOf(c) === topPriority);
  const rest = connections.filter((c) => priorityOf(c) !== topPriority);
  if (rest.length === 0) return null;
  const saturated = top.every((c) => {
    const headroom = headroomOf(c);
    return headroom !== null && headroom <= thresholdPercent;
  });
  if (!saturated) return null;
  let best: T | null = null;
  let bestHeadroom = -1;
  for (const c of rest) {
    const headroom = headroomOf(c) ?? 100;
    if (headroom > bestHeadroom) {
      best = c;
      bestHeadroom = headroom;
    }
  }
  return best;
}
