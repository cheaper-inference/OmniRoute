import type { ComboEndpoint } from "@/shared/constants/comboEndpoints";

const MAX_STATE_ENTRIES = 2048;
const roundRobinCounters = new Map<string, number>();
const targetUseCounts = new Map<string, number>();

function boundedSet(map: Map<string, number>, key: string, value: number): void {
  if (!map.has(key) && map.size >= MAX_STATE_ENTRIES) {
    const oldest = map.keys().next().value;
    if (typeof oldest === "string") map.delete(oldest);
  }
  map.set(key, value);
}

function rotate<T>(targets: readonly T[], index: number): T[] {
  if (targets.length < 2) return [...targets];
  const offset = ((index % targets.length) + targets.length) % targets.length;
  return [...targets.slice(offset), ...targets.slice(0, offset)];
}

export type CapabilityOrderTarget = {
  modelStr: string;
  weight?: number;
};

/** Deterministic/non-chat-safe strategy ordering for modal endpoint executors. */
export function orderCapabilityTargets<T extends CapabilityOrderTarget>(options: {
  comboName: string;
  endpoint: ComboEndpoint;
  strategy?: string | null;
  targets: readonly T[];
  random?: () => number;
}): T[] {
  const { comboName, endpoint, targets } = options;
  const strategy = options.strategy || "priority";
  const random = options.random || Math.random;
  if (targets.length < 2 || strategy === "priority" || strategy === "fill-first") {
    return [...targets];
  }

  const routeKey = `${comboName}:${endpoint}`;
  if (strategy === "round-robin") {
    const index = roundRobinCounters.get(routeKey) || 0;
    boundedSet(roundRobinCounters, routeKey, index + 1);
    return rotate(targets, index);
  }

  if (strategy === "random" || strategy === "strict-random") {
    const shuffled = [...targets];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(random() * (index + 1));
      [shuffled[index], shuffled[swap]] = [shuffled[swap], shuffled[index]];
    }
    return shuffled;
  }

  if (strategy === "weighted") {
    const total = targets.reduce((sum, target) => sum + Math.max(0, target.weight || 0), 0);
    if (total <= 0) return [...targets];
    let point = random() * total;
    const winner =
      targets.find((target) => {
        point -= Math.max(0, target.weight || 0);
        return point <= 0;
      }) || targets[targets.length - 1];
    return [winner, ...targets.filter((target) => target !== winner)];
  }

  if (strategy === "least-used" || strategy === "p2c") {
    const candidates =
      strategy === "p2c" && targets.length > 2
        ? [
            targets[Math.floor(random() * targets.length)],
            targets[Math.floor(random() * targets.length)],
          ]
        : [...targets];
    const winner = candidates.reduce((best, target) => {
      const currentCount = targetUseCounts.get(`${routeKey}:${target.modelStr}`) || 0;
      const bestCount = targetUseCounts.get(`${routeKey}:${best.modelStr}`) || 0;
      return currentCount < bestCount ? target : best;
    });
    const usageKey = `${routeKey}:${winner.modelStr}`;
    boundedSet(targetUseCounts, usageKey, (targetUseCounts.get(usageKey) || 0) + 1);
    return [winner, ...targets.filter((target) => target !== winner)];
  }

  return [...targets];
}

export function resetCapabilityTargetOrderForTests(): void {
  roundRobinCounters.clear();
  targetUseCounts.clear();
}
