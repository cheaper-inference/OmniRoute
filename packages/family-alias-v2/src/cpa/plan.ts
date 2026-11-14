import type { DesiredGraph } from "../graph.ts";
import { stableHash } from "../ownership.ts";

export const CPA_MANAGED_PROVIDER = "Family Alias Maintainer v2";

export type CpaModel = {
  name: string;
  alias: string;
  "display-name"?: string;
  "force-mapping"?: boolean;
};

export type CpaProvider = {
  name: string;
  priority?: number;
  disabled?: boolean;
  prefix?: string;
  "base-url": string;
  "api-key-entries": Array<{ "api-key": string; weight?: number }>;
  models: CpaModel[];
};

export type PlannedCpaProvider = Omit<CpaProvider, "api-key-entries"> & {
  apiKeyRef: string;
};

export type CpaPlan = {
  target: "cpa";
  preconditionHash: string;
  planHash: string;
  managedProvider: PlannedCpaProvider;
  omitted: Array<{ alias: string; reason: string }>;
};

export function cpaStateHash(providers: CpaProvider[]): string {
  return stableHash(providers);
}

export function planCpa(opts: {
  desired: DesiredGraph;
  liveProviders: CpaProvider[];
  omnirouteBaseUrl: string;
  omnirouteApiKeyRef: string;
}): CpaPlan {
  const versionByName = new Map(opts.desired.combos.map((combo) => [combo.name, combo]));
  const models: CpaModel[] = [];
  const omitted: Array<{ alias: string; reason: string }> = [];

  for (const combo of opts.desired.combos) {
    const refs = combo.models.filter((step) => step.kind === "combo-ref");
    const direct = combo.models.filter((step) => step.kind === "model");
    if (direct.length === 1 && refs.length === 0) {
      models.push({
        name: combo.name,
        alias: combo.name,
        "display-name": combo.name,
        "force-mapping": true,
      });
      continue;
    }
    if (refs.length === 1 && direct.length === 0) {
      const target = versionByName.get(refs[0].comboName);
      if (target && target.models.filter((step) => step.kind === "model").length === 1) {
        models.push({
          name: combo.name,
          alias: combo.name,
          "display-name": combo.name,
          "force-mapping": true,
        });
        continue;
      }
    }
    omitted.push({ alias: combo.name, reason: "CPA cannot faithfully represent ordered fallback" });
  }

  const managedProvider: PlannedCpaProvider = {
    name: CPA_MANAGED_PROVIDER,
    priority: 100,
    disabled: false,
    "base-url": `${opts.omnirouteBaseUrl.replace(/\/$/, "")}/v1`,
    apiKeyRef: opts.omnirouteApiKeyRef,
    models: models.sort((a, b) => a.alias.localeCompare(b.alias)),
  };
  const preconditionHash = cpaStateHash(opts.liveProviders);
  const body = { target: "cpa" as const, preconditionHash, managedProvider, omitted };
  return { ...body, planHash: stableHash(body) };
}
