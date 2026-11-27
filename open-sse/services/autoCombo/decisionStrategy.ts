/**
 * `decision` auto-router strategy: a decider picks the model, `rules` picks the connection.
 *
 * The combo's decision block (`config.auto.decision`, decision/schema.ts) names the decider:
 *   - `systemone`   — TypeSafe System One (base client, #15278);
 *   - `http`        — an operator URL on the System One or OpenAI-chat wire (#18555, #15641);
 *   - `combo-model` — one of the operator's own models, in process (fusion-judge style).
 *
 * The answer narrows the pool to the chosen model and the fallback (`rules`) picks the
 * connection. Every failure — flag off, missing or invalid config, missing credential,
 * timeout, HTTP error, bad answer, out-of-menu choice, low confidence, recursion — returns
 * the `rules` decision with `decision(<kind>): fallback (<reason>)` in the reason. The log
 * line never carries a URL, key, prompt or upstream body.
 *
 * COMBO_DECISION_ROUTER_ENABLED (default off) gates every decider: while it is off no
 * decider is built, so no credential is read and nothing is fetched.
 */
import { isRegisteredFeatureFlagEnabled } from "../../utils/registeredFeatureFlag.ts";
import { createDeciderForConfig, type DecisionRoutingContext } from "../decision/factory.ts";
import {
  buildDecisionMenu,
  describeDecisionMenu,
  extractDecisionUserText,
} from "../decision/menu.ts";
import type { DecisionRoutingConfig } from "../decision/schema.ts";
import { decisionDepth } from "../decision/scope.ts";
import type {
  Decider,
  DecisionChoiceFailure,
  DecisionChoiceResult,
  DecisionChoiceSuccess,
} from "../decision/types.ts";
import type { ProviderCandidate } from "./scoring.ts";
import type { RouterStrategy, RoutingContext, RoutingDecision } from "./routerStrategy.ts";

export const DECISION_ROUTER_FLAG = "COMBO_DECISION_ROUTER_ENABLED";

export interface DecisionStrategyOptions {
  fallback: RouterStrategy;
  /** Flag seam (tests). */
  isEnabled?: () => boolean;
  /** Decider seam (tests). */
  createDecider?: (config: DecisionRoutingConfig, context: DecisionRoutingContext) => Decider;
}

type Prepared =
  | { skip: string; kind?: string }
  | {
      config: DecisionRoutingConfig;
      decision: DecisionRoutingContext;
      options: Record<string, string>;
      state: string;
      menuSize: number;
    };

/** Why a decider answer cannot route, or `null` when it can. */
function rejectionReason(
  result: DecisionChoiceResult,
  options: Record<string, string>,
  minConfidence: number | undefined
): string | null {
  // `strict: false` does not narrow the `ok` union, so name each variant.
  if (!result.ok) return (result as DecisionChoiceFailure).reason;
  const chosen = result as DecisionChoiceSuccess;
  if (!Object.prototype.hasOwnProperty.call(options, chosen.choice)) return "out_of_menu";
  if (minConfidence !== undefined && chosen.confidence < minConfidence) return "low_confidence";
  return null;
}

/** Score rounded to four decimals for the log. */
function formatScore(value: number): string {
  return String(Number(value.toFixed(4)));
}

export class DecisionStrategyImpl implements RouterStrategy {
  readonly name = "decision";
  readonly description =
    "Asks the configured decider (TypeSafe, an operator URL or one of the combo's own models) which model in the pool fits the request; connection choice and every failure fall back to the rules strategy";

  private readonly fallback: RouterStrategy;
  private readonly isEnabled: () => boolean;
  private readonly createDecider: NonNullable<DecisionStrategyOptions["createDecider"]>;

  constructor(options: DecisionStrategyOptions) {
    this.fallback = options.fallback;
    this.isEnabled =
      options.isEnabled ?? (() => isRegisteredFeatureFlagEnabled(DECISION_ROUTER_FLAG));
    this.createDecider = options.createDecider ?? createDeciderForConfig;
  }

  select(pool: ProviderCandidate[], context: RoutingContext): RoutingDecision {
    return this.fallbackDecision(pool, context, "sync_caller");
  }

  async selectAsync(pool: ProviderCandidate[], context: RoutingContext): Promise<RoutingDecision> {
    const healthy = pool.filter((item) => item.circuitBreakerState !== "OPEN");
    const candidates = healthy.length ? healthy : pool;
    if (!candidates.length) throw new Error(`[${this.name}] No candidates available`);
    const prepared = this.prepare(candidates, context);
    if ("skip" in prepared) {
      return this.fallbackDecision(candidates, context, prepared.skip, prepared.kind);
    }
    const { config, decision, options, state, menuSize } = prepared;
    const kind = config.decider;
    const result = await this.createDecider(
      config,
      decision
    )({
      state,
      options,
      signal: decision.signal,
    });
    const rejected = rejectionReason(result, options, config.minConfidence);
    if (rejected) return this.fallbackDecision(candidates, context, rejected, kind);
    const chosen = result as DecisionChoiceSuccess;

    const matching = candidates.filter((item) => item.model === chosen.choice);
    const picked = this.fallback.select(matching, context);
    const model = chosen.backendModel
      ? `; decision model ${JSON.stringify(chosen.backendModel)}`
      : "";
    return {
      ...picked,
      strategy: this.name,
      candidatesConsidered: candidates.length,
      reason: `decision(${kind}): selected ${chosen.choice} from ${menuSize}; confidence ${formatScore(
        chosen.confidence
      )}${model} (${picked.reason})`,
    };
  }

  /** Every check that happens before a decider is built; the flag comes first. */
  private prepare(candidates: ProviderCandidate[], context: RoutingContext): Prepared {
    // Off means no credential read and no fetch: nothing below runs.
    if (!this.isEnabled()) return { skip: "disabled" };
    if (decisionDepth() > 0) return { skip: "recursion" };
    const decision = context.decision;
    const resolved = decision?.config;
    if (!decision || !resolved?.valid) return { skip: "not_configured" };
    const { config } = resolved;
    const menu = buildDecisionMenu(candidates);
    if (menu.length < 2) return { skip: "single_option", kind: config.decider };
    const state = extractDecisionUserText(decision.body ?? { messages: context.messages });
    if (!state) return { skip: "no_user_text", kind: config.decider };
    const options = describeDecisionMenu(menu, candidates, config.descriptions);
    return { config, decision, options, state, menuSize: menu.length };
  }

  private fallbackDecision(
    pool: ProviderCandidate[],
    context: RoutingContext,
    reason: string,
    kind?: string
  ): RoutingDecision {
    const decision = this.fallback.select(pool, context);
    const label = kind ? `decision(${kind})` : "decision";
    return { ...decision, reason: `${label}: fallback (${reason}); ${decision.reason}` };
  }
}
