import { liveStateHash, type LiveCombo, type TargetPlan } from "./plan.ts";
import { stableHash } from "../ownership.ts";

export type OmniRouteApplyClient = {
  list(): Promise<LiveCombo[]>;
  create(input: TargetPlan["creates"][number]): Promise<void>;
  update(id: string, input: TargetPlan["updates"][number]["desired"]): Promise<void>;
  delete(id: string): Promise<void>;
};

export type TargetResult = {
  target: "omniroute";
  status: "success" | "refused";
  creates: number;
  updates: number;
  deletes: number;
  readbackHash?: string;
  reason?: string;
};

export async function applyOmniRoute(opts: {
  plan: TargetPlan;
  client: OmniRouteApplyClient;
  expectedPlanHash: string;
}): Promise<TargetResult> {
  if (opts.expectedPlanHash !== opts.plan.planHash) {
    return {
      target: "omniroute",
      status: "refused",
      creates: 0,
      updates: 0,
      deletes: 0,
      reason: "plan hash mismatch",
    };
  }
  if (opts.plan.conflicts.length > 0) {
    return {
      target: "omniroute",
      status: "refused",
      creates: 0,
      updates: 0,
      deletes: 0,
      reason: "plan contains unresolved conflicts",
    };
  }

  const before = await opts.client.list();
  if (liveStateHash(before) !== opts.plan.preconditionHash) {
    return {
      target: "omniroute",
      status: "refused",
      creates: 0,
      updates: 0,
      deletes: 0,
      reason: "live state changed since planning",
    };
  }

  // Leaves before wrappers for create/update; wrappers before leaves for delete
  // (delete order is already encoded in the plan).
  const wrapperRank = (models: Array<{ kind: string }>) =>
    models.some((model) => model.kind === "combo-ref") ? 1 : 0;
  const creates = [...opts.plan.creates].sort(
    (a, b) => wrapperRank(a.models) - wrapperRank(b.models) || a.name.localeCompare(b.name),
  );
  const updates = [...opts.plan.updates].sort(
    (a, b) =>
      wrapperRank(a.desired.models) - wrapperRank(b.desired.models) ||
      a.desired.name.localeCompare(b.desired.name),
  );
  for (const item of creates) await opts.client.create(item);
  for (const item of updates) await opts.client.update(item.id, item.desired);
  for (const item of opts.plan.deletes) await opts.client.delete(item.id);

  const after = await opts.client.list();
  const byName = new Map(after.map((combo) => [combo.name, combo]));
  for (const desired of [...opts.plan.creates, ...opts.plan.updates.map((item) => item.desired)]) {
    const actual = byName.get(desired.name);
    if (!actual) throw new Error(`readback missing combo: ${desired.name}`);
    const actualHash = stableHash({
      name: actual.name,
      description: actual.description ?? null,
      strategy: actual.strategy ?? null,
      allowedModelFamilies: actual.allowedModelFamilies ?? [],
      models: actual.models ?? [],
    });
    const desiredHash = stableHash({
      name: desired.name,
      description: desired.description,
      strategy: desired.strategy,
      allowedModelFamilies: desired.allowedModelFamilies,
      models: desired.models,
    });
    if (actualHash !== desiredHash) {
      throw new Error(`readback mismatch: ${desired.name}`);
    }
  }
  for (const deleted of opts.plan.deletes) {
    if (byName.has(deleted.name)) throw new Error(`readback stale combo remains: ${deleted.name}`);
  }

  return {
    target: "omniroute",
    status: "success",
    creates: opts.plan.creates.length,
    updates: opts.plan.updates.length,
    deletes: opts.plan.deletes.length,
    readbackHash: liveStateHash(after),
  };
}
