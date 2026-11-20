/**
 * Combo-builder preview for the `decision` auto-router (adapted from #18555).
 *
 * Without a prompt it builds the same menu and generated descriptions the router sends at
 * request time, so the builder can show them as placeholders: no decider, no credential
 * read, no fetch. With a prompt it runs one decision with the unsaved settings, behind the
 * same COMBO_DECISION_ROUTER_ENABLED flag as live routing. A `combo-model` decision only
 * exists inside a live request (it runs through the combo's own dispatcher), so the preview
 * skips it.
 */
import { parseModel } from "@omniroute/open-sse/services/model.ts";
import {
  costKey,
  resolvePoolCosts,
  type PricingLookup,
} from "@omniroute/open-sse/services/combo/candidateCost.ts";
import { DECISION_ROUTER_FLAG } from "@omniroute/open-sse/services/autoCombo/decisionStrategy.ts";
import {
  createDeciderForConfig,
  type DecisionRoutingContext,
} from "@omniroute/open-sse/services/decision/factory.ts";
import {
  MAX_DECISION_STATE_CHARS,
  buildDecisionMenu,
  describeDecisionMenu,
} from "@omniroute/open-sse/services/decision/menu.ts";
import type { DecisionRoutingConfig } from "@omniroute/open-sse/services/decision/schema.ts";
import type {
  Decider,
  DecisionChoiceFailure,
} from "@omniroute/open-sse/services/decision/types.ts";
import { isRegisteredFeatureFlagEnabled } from "@omniroute/open-sse/utils/registeredFeatureFlag.ts";

export interface DecisionPreviewInput {
  decision?: DecisionRoutingConfig;
  /** Combo step model strings (`provider/model`). */
  models: string[];
  prompt?: string;
}

/** `reason` is log-safe: never a URL, key, prompt or upstream body. */
export interface DecisionPreviewTest {
  status: "selected" | "skipped" | "failed";
  reason?: string;
  httpStatus?: number;
  choice?: string;
  confidence?: number;
  probabilities?: Record<string, number>;
  backendModel?: string;
  latencyMs?: number;
}

export interface DecisionPreviewResult {
  /** Unique model ids in step order, capped like the request-time menu. */
  menu: string[];
  /** Generated text per menu entry, ignoring operator descriptions. */
  generated: Record<string, string>;
  test?: DecisionPreviewTest;
}

export interface DecisionPreviewDeps {
  getPricing: PricingLookup;
  isEnabled?: () => boolean;
  createDecider?: (config: DecisionRoutingConfig, context: DecisionRoutingContext) => Decider;
}

export async function buildDecisionPreview(
  input: DecisionPreviewInput,
  deps: DecisionPreviewDeps
): Promise<DecisionPreviewResult> {
  // Same provider/model split the auto-combo candidate builder uses.
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
  const prompt = input.prompt?.trim();
  if (!prompt) return { menu, generated };

  const skipped = (reason: string) => ({ menu, generated, test: { status: "skipped", reason } });
  const isEnabled = deps.isEnabled ?? (() => isRegisteredFeatureFlagEnabled(DECISION_ROUTER_FLAG));
  if (!isEnabled()) return skipped("disabled") as DecisionPreviewResult;
  const config = input.decision;
  if (!config) return skipped("not_configured") as DecisionPreviewResult;
  if (config.decider === "combo-model")
    return skipped("live_request_only") as DecisionPreviewResult;
  if (menu.length < 2) return skipped("single_option") as DecisionPreviewResult;

  const createDecider = deps.createDecider ?? createDeciderForConfig;
  const decide = createDecider(config, {
    config: { valid: true, config },
    apiKeyAllowedConnections: null,
  });
  const result = await decide({
    state: prompt.slice(0, MAX_DECISION_STATE_CHARS),
    options: describeDecisionMenu(menu, candidates, config.descriptions),
  });
  if (!result.ok) {
    // `strict: false` does not narrow the `ok` union, so name the failure variant.
    const failure = result as DecisionChoiceFailure;
    return {
      menu,
      generated,
      test: {
        status: "failed",
        reason: failure.reason,
        ...(typeof failure.status === "number" ? { httpStatus: failure.status } : {}),
      },
    };
  }
  return {
    menu,
    generated,
    test: {
      status: "selected",
      choice: result.choice,
      confidence: result.confidence,
      probabilities: result.probabilities,
      ...(result.backendModel ? { backendModel: result.backendModel } : {}),
      latencyMs: result.latencyMs,
    },
  };
}
