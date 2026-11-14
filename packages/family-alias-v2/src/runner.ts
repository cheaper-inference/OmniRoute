import { enrichLocalEndpoints, type EnrichedEndpoint } from "./catalog.ts";
import { buildDesiredGraph } from "./graph.ts";
import {
  endpointHealthKey,
  shouldProbe,
  type HealthCache,
  type HealthCacheEntry,
} from "./health/cache.ts";
import { updateCacheFromProbe } from "./health/evaluate.ts";
import { consumeProbeBudget, type ProbeBudgetState } from "./health/probeBudget.ts";
import { planCpa, type CpaProvider } from "./cpa/plan.ts";
import { applyCpa, type CpaApplyClient } from "./cpa/apply.ts";
import { planOmniRoute, type LiveCombo } from "./omniroute/plan.ts";
import { applyOmniRoute, type OmniRouteApplyClient } from "./omniroute/apply.ts";
import { stableHash } from "./ownership.ts";
import type { LocalEndpoint, MetadataRecord } from "./types.ts";
import { createSavedPlan, makeRunReport, type SavedPlan } from "./run.ts";

export type ProbeResult = {
  ok: boolean;
  statusCode?: number;
  rateLimited?: boolean;
  retryAfterSeconds?: number;
  error?: string;
};

export type RunnerInput = {
  now: number;
  endpoints: LocalEndpoint[];
  metadata: MetadataRecord[];
  health: HealthCache;
  budget: ProbeBudgetState;
  liveCombos: LiveCombo[];
  liveCpaProviders: CpaProvider[];
  omnirouteBaseUrl: string;
  omnirouteApiKeyRef: string;
  omnirouteApiKey: string;
  dailyProbeLimit?: number;
};

export type RunnerClients = {
  probe(endpoint: LocalEndpoint): Promise<ProbeResult>;
  omniroute: OmniRouteApplyClient;
  cpa: CpaApplyClient;
};

export type RunnerResult = {
  plan: SavedPlan;
  health: HealthCache;
  budget: ProbeBudgetState;
  probesUsed: number;
  targets: Record<string, { status: string; reason?: string }>;
};

function candidates(endpoints: EnrichedEndpoint[], health: HealthCache, now: number): EnrichedEndpoint[] {
  return endpoints.filter((item) => {
    if (item.endpoint.billingClass !== "subscription" || !item.endpoint.active) return false;
    const key = endpointHealthKey(item.endpoint.connectionId, item.endpoint.modelId);
    return shouldProbe(health[key], now);
  });
}

export async function runProbePass(opts: {
  endpoints: EnrichedEndpoint[];
  health: HealthCache;
  budget: ProbeBudgetState;
  now: number;
  dailyProbeLimit?: number;
  probe: (endpoint: LocalEndpoint) => Promise<ProbeResult>;
}): Promise<{ health: HealthCache; budget: ProbeBudgetState; probesUsed: number }> {
  const health = { ...opts.health };
  let budget = opts.budget;
  let probesUsed = 0;
  for (const item of candidates(opts.endpoints, health, opts.now)) {
    const consumed = consumeProbeBudget(budget, opts.now, opts.dailyProbeLimit);
    budget = consumed.state;
    if (!consumed.allowed) break;
    const key = endpointHealthKey(item.endpoint.connectionId, item.endpoint.modelId);
    const result = await opts.probe(item.endpoint);
    const previous: HealthCacheEntry | undefined = health[key];
    health[key] = updateCacheFromProbe({ previous, key, now: opts.now, result });
    probesUsed += 1;
  }
  return { health, budget, probesUsed };
}

export async function runReconciliation(opts: {
  input: RunnerInput;
  clients: RunnerClients;
  mode: "plan" | "apply";
}): Promise<RunnerResult> {
  const enriched = enrichLocalEndpoints(opts.input.endpoints, opts.input.metadata);
  const probed = await runProbePass({
    endpoints: enriched,
    health: opts.input.health,
    budget: opts.input.budget,
    now: opts.input.now,
    dailyProbeLimit: opts.input.dailyProbeLimit,
    probe: opts.clients.probe,
  });
  const desired = buildDesiredGraph({ enriched, health: probed.health });
  const omniroute = planOmniRoute(desired, opts.input.liveCombos);
  const cpa = planCpa({
    desired,
    liveProviders: opts.input.liveCpaProviders,
    omnirouteBaseUrl: opts.input.omnirouteBaseUrl,
    omnirouteApiKeyRef: opts.input.omnirouteApiKeyRef,
  });
  const plan = createSavedPlan({
    discoveryHash: stableHash({ endpoints: opts.input.endpoints, probesUsed: probed.probesUsed }),
    omniroute,
    cpa,
    now: new Date(opts.input.now),
  });
  const targets: RunnerResult["targets"] = {
    omniroute: { status: "planned", reason: omniroute.conflicts.length ? "conflicts" : undefined },
    cpa: { status: "planned" },
  };
  if (opts.mode === "apply") {
    const omniResult = await applyOmniRoute({
      plan: omniroute,
      client: opts.clients.omniroute,
      expectedPlanHash: omniroute.planHash,
    });
    targets.omniroute = { status: omniResult.status, reason: omniResult.reason };
    try {
      const cpaResult = await applyCpa({
        plan: cpa,
        client: opts.clients.cpa,
        expectedPlanHash: cpa.planHash,
        omnirouteApiKey: opts.input.omnirouteApiKey,
      });
      targets.cpa = { status: cpaResult.status, reason: cpaResult.status === "refused" ? cpaResult.reason : undefined };
    } catch (error) {
      targets.cpa = { status: "failed", reason: error instanceof Error ? error.message : "cpa failed" };
    }
  }
  makeRunReport({ mode: opts.mode, plan, targets, probesUsed: probed.probesUsed });
  return {
    plan,
    health: probed.health,
    budget: probed.budget,
    probesUsed: probed.probesUsed,
    targets,
  };
}
