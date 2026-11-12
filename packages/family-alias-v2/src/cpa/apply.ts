import { cpaStateHash, type CpaPlan, type CpaProvider } from "./plan.ts";

export type CpaApplyClient = {
  getProviders(): Promise<CpaProvider[]>;
  putProviders(providers: CpaProvider[]): Promise<void>;
};

export async function applyCpa(opts: {
  plan: CpaPlan;
  client: CpaApplyClient;
  expectedPlanHash: string;
}): Promise<
  | { target: "cpa"; status: "success"; aliases: number; readbackHash: string }
  | { target: "cpa"; status: "refused"; reason: string }
> {
  if (opts.expectedPlanHash !== opts.plan.planHash) {
    return { target: "cpa", status: "refused", reason: "plan hash mismatch" };
  }
  const before = await opts.client.getProviders();
  if (cpaStateHash(before) !== opts.plan.preconditionHash) {
    return { target: "cpa", status: "refused", reason: "live state changed since planning" };
  }
  await opts.client.putProviders(opts.plan.nextProviders);
  const after = await opts.client.getProviders();
  if (cpaStateHash(after) !== cpaStateHash(opts.plan.nextProviders)) {
    throw new Error("CPA readback mismatch");
  }
  return {
    target: "cpa",
    status: "success",
    aliases: opts.plan.managedProvider.models.length,
    readbackHash: cpaStateHash(after),
  };
}
