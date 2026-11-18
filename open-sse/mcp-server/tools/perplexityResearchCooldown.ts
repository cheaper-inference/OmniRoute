const COOLDOWN_MS = 60_000;
const KEY = Symbol.for("omniroute.pplxResearchCooldowns");

function memory(): Map<string, number> {
  const g = globalThis as unknown as Record<symbol, Map<string, number>>;
  return (g[KEY] ??= new Map());
}

type Merge = (id: string, patch: Record<string, unknown>) => Promise<void>;

export async function recordResearchCooldown(input: {
  connectionId: string;
  nowMs: number;
  upstreamEnded: boolean;
  confirmed: boolean;
  merge: Merge;
}): Promise<void> {
  if (!input.upstreamEnded || !input.confirmed) return;
  const until = input.nowMs + COOLDOWN_MS;
  memory().set(input.connectionId, until);
  await input.merge(input.connectionId, { pplxResearchNextAllowedAt: until });
}

export function cooldownRemainingMs(
  data: Record<string, unknown>,
  nowMs: number,
  connectionId?: string
): number {
  const stored = data.pplxResearchNextAllowedAt;
  const fromDb = typeof stored === "number" ? stored : 0;
  const fromMemory = connectionId ? (memory().get(connectionId) ?? 0) : 0;
  return Math.max(0, Math.max(fromDb, fromMemory) - nowMs);
}
