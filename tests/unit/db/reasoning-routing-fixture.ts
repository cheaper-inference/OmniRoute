import type { ReasoningRoutingRuleInput } from "../../../src/lib/db/reasoningRoutingRules.ts";

export function ruleInput(
  patch: Partial<ReasoningRoutingRuleInput> = {}
): ReasoningRoutingRuleInput {
  return {
    name: "Repository rule",
    description: "",
    scope: "global",
    apiKeyId: null,
    comboId: null,
    connectionId: null,
    modelPattern: null,
    sourceEffort: "any",
    requestTags: [],
    tagMatchMode: "any",
    effortMode: "inherit",
    targetEffort: null,
    targetKind: "keep",
    targetModel: null,
    targetComboId: null,
    budgetAction: "preserve",
    budgetTokens: null,
    priority: 0,
    enabled: true,
    ...patch,
  };
}
