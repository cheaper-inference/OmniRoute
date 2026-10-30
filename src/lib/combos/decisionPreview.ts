/**
 * Dashboard preview for decision-router combos (`decision-openai`, `decision-systemone`).
 *
 * Builds the same menu and generated choice descriptions the router sends at request
 * time, so the combo builder can show them as placeholders. With a prompt it also runs
 * one real decision call and returns the full answer (choice, probabilities, confidence)
 * instead of the log summary the router keeps.
 */
import { parseModel } from "@omniroute/open-sse/services/model.ts";
import {
  DECISION_STRATEGY_FORMATS,
  buildDecisionMenu,
  describeDecisionFailure,
  describeDecisionMenu,
  requestDecision,
  resolveDecisionEndpoint,
  resolveDecisionModelRoutingConfig,
  type DecisionModelTransport,
} from "@omniroute/open-sse/services/autoCombo/decisionModelStrategy.ts";
import {
  costKey,
  resolvePoolCosts,
  type PricingLookup,
} from "@omniroute/open-sse/services/combo/candidateCost.ts";

export interface DecisionPreviewInput {
  strategy: string;
  decisionModel?: unknown;
  models: string[];
  prompt?: string;
}

/**
 * `selected`/`unusable`: the service answered (choice in or outside the menu).
 * `skipped`/`failed`: no answer; `reason` is log-safe (no URL, key or upstream body).
 */
export interface DecisionPreviewTest {
  status: "selected" | "unusable" | "skipped" | "failed";
  reason?: string;
  choice?: string;
  refused?: boolean;
  confidence?: number;
  probabilities?: Record<string, number>;
  backendModel?: string;
  latencyMs?: number;
}

export interface DecisionPreviewResult {
  /** Unique model IDs in step order, capped like the request-time menu. */
  menu: string[];
  /** Generated text per menu entry, ignoring operator descriptions. */
  generated: Record<string, string>;
  test?: DecisionPreviewTest;
}

export interface DecisionPreviewDeps {
  getPricing: PricingLookup;
  transport?: DecisionModelTransport;
  now?: () => number;
}

export async function buildDecisionPreview(
  input: DecisionPreviewInput,
  deps: DecisionPreviewDeps
): Promise<DecisionPreviewResult> {
  const format = DECISION_STRATEGY_FORMATS[input.strategy];
  if (!format) throw new Error(`Unknown decision strategy: ${input.strategy}`);
  const now = deps.now ?? Date.now;

  // Same provider/model split the auto-combo candidate builder uses (combo.ts).
  const targets = input.models.map((modelStr) => {
    const parsed = parseModel(modelStr);
    return {
      provider: parsed.provider || parsed.providerAlias || "unknown",
      model: parsed.model || modelStr,
    };
  });
  const costs = await resolvePoolCosts(targets, deps.getPricing);
  const candidates = targets.map((target) => ({
    ...target,
    costPer1MTokens: costs.get(costKey(target.provider, target.model)) ?? Number.NaN,
  }));
  const menu = buildDecisionMenu(candidates);
  const generated = describeDecisionMenu(menu, candidates, undefined);
  if (!input.prompt) return { menu, generated };

  if (menu.length < 2)
    return {
      menu,
      generated,
      test: { status: "skipped", reason: "at least two distinct models are needed" },
    };
  const config = resolveDecisionModelRoutingConfig(input.decisionModel);
  const endpoint = resolveDecisionEndpoint(format, config);
  if ("error" in endpoint)
    return { menu, generated, test: { status: "skipped", reason: endpoint.error } };

  const described = describeDecisionMenu(menu, candidates, config?.descriptions);
  const startedAt = now();
  try {
    const answer = await requestDecision(
      format,
      endpoint,
      input.prompt,
      menu,
      described,
      deps.transport
    );
    const selected = answer.choice !== undefined && menu.includes(answer.choice);
    return {
      menu,
      generated,
      test: {
        status: selected ? "selected" : "unusable",
        ...answer,
        latencyMs: Math.max(0, now() - startedAt),
      },
    };
  } catch (error) {
    return {
      menu,
      generated,
      test: { status: "failed", reason: describeDecisionFailure(error, endpoint.timeoutMs) },
    };
  }
}
