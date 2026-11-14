/**
 * Opt-in per-session complexity-tier floor (OMNIROUTE_SESSION_TIER_FLOOR).
 *
 * Complexity is classified per request, so a short follow-up ("yes") drops a session that
 * was just routed to a capable tier back to the cheapest one. With the flag on, a session's
 * tier only moves up; the floor expires after 24 h idle. In-memory and process-local.
 */
import type { ComplexityTier } from "./complexityRouter.ts";

const TTL_MS = 24 * 60 * 60 * 1000;
const MAX_SESSIONS = 10_000;
const RANK: Record<ComplexityTier, number> = { free: 0, cheap: 1, premium: 2 };

const floors = new Map<string, { tier: ComplexityTier; at: number }>();

export function isSessionTierFloorEnabled(): boolean {
  return /^(1|true|yes|on)$/i.test(process.env.OMNIROUTE_SESSION_TIER_FLOOR?.trim() ?? "");
}

/** Return max(previous tier of this session, `tier`) and remember it. */
export function applySessionTierFloor(sessionId: string, tier: ComplexityTier): ComplexityTier {
  const now = Date.now();
  const previous = floors.get(sessionId);
  const live = previous && now - previous.at <= TTL_MS ? previous.tier : null;
  const next = live && RANK[live] > RANK[tier] ? live : tier;
  floors.delete(sessionId); // re-insert so Map order stays least-recently-used first
  floors.set(sessionId, { tier: next, at: now });
  if (floors.size > MAX_SESSIONS) floors.delete(floors.keys().next().value as string);
  return next;
}

export function resetSessionTierFloor(): void {
  floors.clear();
}
