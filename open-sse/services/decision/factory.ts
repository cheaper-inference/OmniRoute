/**
 * Builds the decider a combo's decision block names, plus the per-request context the
 * `decision` strategy reads (autoCombo/decisionStrategy.ts).
 */
import type { ComboCollectionLike, HandleSingleModel } from "../combo/types.ts";
import { createComboModelDecider } from "./comboModelDecider.ts";
import { clampDecisionTimeout } from "./config.ts";
import { createHttpDecider } from "./httpDecider.ts";
import type { DecisionConfigResolution, DecisionRoutingConfig } from "./schema.ts";
import { createSystemOneDecider } from "./systemOneDecider.ts";
import type { Decider } from "./types.ts";

/** Request-scoped seams the combo pipeline hands to the decision strategy. */
export interface DecisionRuntime {
  signal?: AbortSignal | null;
  /** The combo's `handleSingleModel` (for the `combo-model` decider). */
  dispatch?: HandleSingleModel;
  allCombos?: ComboCollectionLike;
}

export interface DecisionRoutingContext extends DecisionRuntime {
  config?: DecisionConfigResolution;
  /** The client request body; only the last user text and its wire shape are read. */
  body?: Record<string, unknown>;
  apiKeyAllowedConnections?: string[] | null;
}

/** `undefined` for combos without a decision block, so their routing context is unchanged. */
export function buildDecisionRoutingContext(
  config: DecisionConfigResolution | undefined,
  runtime: DecisionRuntime | null | undefined,
  body: Record<string, unknown>,
  apiKeyAllowedConnections: string[] | null | undefined
): DecisionRoutingContext | undefined {
  if (!config) return undefined;
  return { ...runtime, config, body, apiKeyAllowedConnections: apiKeyAllowedConnections ?? null };
}

export function createDeciderForConfig(
  config: DecisionRoutingConfig,
  context: DecisionRoutingContext
): Decider {
  const timeoutMs = clampDecisionTimeout(config.timeoutMs);
  const apiKeyAllowedConnections = context.apiKeyAllowedConnections ?? null;
  if (config.decider === "systemone") {
    return createSystemOneDecider({
      model: config.model,
      connectionId: config.connectionId,
      timeoutMs,
      apiKeyAllowedConnections,
    });
  }
  if (config.decider === "http") {
    return createHttpDecider({
      baseUrl: config.baseUrl,
      wire: config.wire,
      model: config.model,
      connectionId: config.connectionId,
      timeoutMs,
      apiKeyAllowedConnections,
    });
  }
  return createComboModelDecider({
    model: config.model,
    timeoutMs,
    dispatch: context.dispatch,
    allCombos: context.allCombos,
    clientBody: context.body ?? null,
  });
}
