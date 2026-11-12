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

  const visiting = new Set<string>();
  const visited = new Set<string>();
  const walk = (name: string, depth: number) => {
    if (depth > maxDepth) throw new Error(`combo depth exceeds ${maxDepth}: ${name}`);
    if (visiting.has(name)) throw new Error(`combo cycle detected at ${name}`);
    if (visited.has(name)) return;
    visiting.add(name);
    const combo = byName.get(name)!;
    for (const step of combo.models) {
      if (step.kind === "combo-ref") walk(step.comboName, depth + 1);
    }
    visiting.delete(name);
    visited.add(name);
  };
  for (const name of byName.keys()) walk(name, 0);
}

export function deletionOrder(
  live: Array<{ name: string; models?: Array<{ kind?: string; comboName?: string }> }>,
  staleNames: Set<string>,
): string[] {
  const byName = new Map(live.map((combo) => [combo.name, combo]));
  const incoming = new Map([...staleNames].map((name) => [name, 0]));
  const children = new Map<string, string[]>();
  for (const name of staleNames) {
    const refs = (byName.get(name)?.models ?? [])
      .filter((step) => step.kind === "combo-ref" && step.comboName && staleNames.has(step.comboName))
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
  if (order.length !== staleNames.size) throw new Error("stale combo deletion graph contains cycle");
  return order;
}
