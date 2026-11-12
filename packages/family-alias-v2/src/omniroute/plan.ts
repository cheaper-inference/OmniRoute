import type { DesiredCombo, DesiredGraph } from "../graph.ts";
import { OWNER, parseOwnership, stableHash } from "../ownership.ts";
import { deletionOrder, validateDesiredDag } from "./dag.ts";

export type LiveComboStep = {
  id?: string;
  kind?: string;
  comboName?: string;
  model?: string;
  providerId?: string;
  connectionId?: string;
  allowedConnectionIds?: string[];
  weight?: number;
};

export type LiveCombo = {
  id: string;
  name: string;
  description?: string | null;
  strategy?: string;
  allowedModelFamilies?: string[];
  models?: LiveComboStep[];
};

export type TargetPlan = {
  target: "omniroute";
  desiredGraphHash: string;
  preconditionHash: string;
  planHash: string;
  creates: DesiredCombo[];
  updates: Array<{ id: string; desired: DesiredCombo }>;
  deletes: Array<{ id: string; name: string }>;
  conflicts: Array<{ name: string; liveId: string; reason: string }>;
};

type ComparableCombo = {
  name: string;
  description: string | null;
  strategy: string | null;
  allowedModelFamilies: string[];
  models: unknown[];
};

function comparable(combo: LiveCombo | DesiredCombo): ComparableCombo {
  return {
    name: combo.name,
    description: combo.description ?? null,
    strategy: combo.strategy ?? null,
    allowedModelFamilies: combo.allowedModelFamilies ?? [],
    models: combo.models ?? [],
  };
}

export function liveStateHash(live: LiveCombo[]): string {
  return stableHash(
    [...live]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((combo) => ({ id: combo.id, ...comparable(combo) })),
  );
}

export function planOmniRoute(desired: DesiredGraph, live: LiveCombo[]): TargetPlan {
  validateDesiredDag(desired.combos);
  const liveByName = new Map(live.map((combo) => [combo.name, combo]));
  const desiredByName = new Map(desired.combos.map((combo) => [combo.name, combo]));
  const creates: DesiredCombo[] = [];
  const updates: Array<{ id: string; desired: DesiredCombo }> = [];
  const conflicts: Array<{ name: string; liveId: string; reason: string }> = [];

  for (const combo of desired.combos) {
    const current = liveByName.get(combo.name);
    if (!current) {
      creates.push(combo);
      continue;
    }
    const marker = parseOwnership(current.description);
    if (!marker || marker.owner !== OWNER) {
      conflicts.push({
        name: combo.name,
        liveId: current.id,
        reason: "desired name is owned by a manual/unmanaged combo",
      });
      continue;
    }
    if (stableHash(comparable(current)) !== stableHash(comparable(combo))) {
      updates.push({ id: current.id, desired: combo });
    }
  }

  const staleOwned = live.filter((combo) => {
    const marker = parseOwnership(combo.description);
    return marker?.owner === OWNER && !desiredByName.has(combo.name);
  });
  const staleNames = new Set(staleOwned.map((combo) => combo.name));

  // Refuse stale deletes if any unmanaged/live desired combo still references them.
  for (const combo of live) {
    if (staleNames.has(combo.name)) continue;
    for (const step of combo.models ?? []) {
      const record = step as { kind?: string; comboName?: string };
      if (record.kind === "combo-ref" && record.comboName && staleNames.has(record.comboName)) {
        conflicts.push({
          name: record.comboName,
          liveId: combo.id,
          reason: `stale owned combo is referenced by ${combo.name}`,
        });
        staleNames.delete(record.comboName);
      }
    }
  }

  const order = deletionOrder(live, staleNames);
  const staleByName = new Map(staleOwned.map((combo) => [combo.name, combo]));
  const deletes = order.map((name) => ({ id: staleByName.get(name)!.id, name }));
  const preconditionHash = liveStateHash(live);
  const body = {
    target: "omniroute" as const,
    desiredGraphHash: desired.graphHash,
    preconditionHash,
    creates,
    updates,
    deletes,
    conflicts,
  };
  return { ...body, planHash: stableHash(body) };
}
