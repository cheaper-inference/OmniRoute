import { stableHash } from "./ownership.ts";
import type { TargetPlan } from "./omniroute/plan.ts";
import type { CpaPlan } from "./cpa/plan.ts";
import type { RunReport } from "./report.ts";

export type SavedPlan = {
  version: 2;
  generatedAt: string;
  discoveryHash: string;
  omniroute: TargetPlan;
  cpa: CpaPlan | null;
  planHash: string;
};

export function createSavedPlan(opts: {
  discoveryHash: string;
  omniroute: TargetPlan;
  cpa: CpaPlan | null;
  now?: Date;
}): SavedPlan {
  const body = {
    version: 2 as const,
    generatedAt: (opts.now ?? new Date()).toISOString(),
    discoveryHash: opts.discoveryHash,
    omniroute: opts.omniroute,
    cpa: opts.cpa,
  };
  return { ...body, planHash: stableHash(body) };
}

export function verifySavedPlan(plan: SavedPlan): boolean {
  const { planHash, ...body } = plan;
  return plan.version === 2 && stableHash(body) === planHash;
}

export function makeRunReport(opts: {
  mode: "plan" | "apply";
  plan: SavedPlan;
  targets: RunReport["targets"];
  probesUsed?: number;
}): RunReport {
  return {
    mode: opts.mode,
    generatedAt: new Date().toISOString(),
    discoveryHash: opts.plan.discoveryHash,
    targets: opts.targets,
    probesUsed: opts.probesUsed ?? 0,
  };
}
