import type { DesiredCombo } from "../graph.ts";

export function validateDesiredDag(combos: DesiredCombo[], maxDepth = 6): void {
  const byName = new Map(combos.map((combo) => [combo.name, combo]));
  for (const combo of combos) {
    for (const step of combo.models) {
      if (step.kind === "combo-ref" && !byName.has(step.comboName)) {
        throw new Error(`missing combo reference: ${combo.name} -> ${step.comboName}`);
      }
    }
  }

  // Cycle detection and depth are separate: a node visited earlier still
  // contributes its full descendant depth, cached once per node.
  const visiting = new Set<string>();
  const longestDepth = new Map<string, number>();
  const depthBelow = (name: string): number => {
    const cached = longestDepth.get(name);
    if (cached !== undefined) return cached;
    if (visiting.has(name)) throw new Error(`combo cycle detected at ${name}`);
    visiting.add(name);
    let depth = 0;
    for (const step of byName.get(name)!.models) {
      if (step.kind === "combo-ref") depth = Math.max(depth, depthBelow(step.comboName) + 1);
    }
    visiting.delete(name);
    longestDepth.set(name, depth);
    return depth;
  };
  for (const name of byName.keys()) {
    if (depthBelow(name) > maxDepth) throw new Error(`combo depth exceeds ${maxDepth}: ${name}`);
  }
}

export function deletionOrder(
  live: Array<{ name: string; models?: Array<{ kind?: string; comboName?: string }> }>,
  staleNames: Set<string>
): string[] {
  const byName = new Map(live.map((combo) => [combo.name, combo]));
  const incoming = new Map([...staleNames].map((name) => [name, 0]));
  const children = new Map<string, string[]>();
  for (const name of staleNames) {
    const refs = (byName.get(name)?.models ?? [])
      .filter(
        (step) => step.kind === "combo-ref" && step.comboName && staleNames.has(step.comboName)
      )
      .map((step) => step.comboName!);
    children.set(name, refs);
    for (const child of refs) incoming.set(child, (incoming.get(child) ?? 0) + 1);
  }
  const ready = [...incoming.entries()]
    .filter(([, count]) => count === 0)
    .map(([name]) => name)
    .sort();
  const order: string[] = [];
  while (ready.length) {
    const name = ready.shift()!;
    order.push(name);
    for (const child of children.get(name) ?? []) {
      const count = (incoming.get(child) ?? 0) - 1;
      incoming.set(child, count);
      if (count === 0) ready.push(child);
    }
    ready.sort();
  }
  if (order.length !== staleNames.size)
    throw new Error("stale combo deletion graph contains cycle");
  return order;
}
