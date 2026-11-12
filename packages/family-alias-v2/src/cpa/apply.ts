import {
  CPA_MANAGED_PROVIDER,
  cpaStateHash,
  type CpaPlan,
  type CpaProvider,
} from "./plan.ts";

export type CpaApplyClient = {
  getProviders(): Promise<CpaProvider[]>;
  putProviders(providers: CpaProvider[]): Promise<void>;
};

export async function applyCpa(opts: {
  plan: CpaPlan;
  client: CpaApplyClient;
  expectedPlanHash: string;
  omnirouteApiKey: string;
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

  const managedProvider: CpaProvider = {
    name: opts.plan.managedProvider.name,
    priority: opts.plan.managedProvider.priority,
    disabled: opts.plan.managedProvider.disabled,
    prefix: opts.plan.managedProvider.prefix,
    "base-url": opts.plan.managedProvider["base-url"],
    "api-key-entries": [{ "api-key": opts.omnirouteApiKey, weight: 1 }],
    models: opts.plan.managedProvider.models,
  };
  const next = [
    ...before.filter((provider) => provider.name !== CPA_MANAGED_PROVIDER),
    managedProvider,
  ];
  await opts.client.putProviders(next);
  const after = await opts.client.getProviders();
  if (cpaStateHash(after) !== cpaStateHash(next)) {
    throw new Error("CPA readback mismatch");
  }
  return {
    target: "cpa",
    status: "success",
    aliases: managedProvider.models.length,
    readbackHash: cpaStateHash(after),
  };
}
