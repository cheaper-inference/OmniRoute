export type ReasoningRuleScope = "global" | "apiKey" | "combo" | "model" | "connection";
export type ReasoningEffort = "none" | "low" | "medium" | "high" | "xhigh" | "max" | "ultra";
export type ReasoningSourceEffort = "any" | "missing" | ReasoningEffort;
export type ReasoningEffortMode = "inherit" | "default" | "force";
export type ReasoningTargetKind = "keep" | "model" | "combo";
export type ReasoningBudgetAction = "preserve" | "remove" | "set";

export interface ReasoningRoutingRule {
  id: string;
  name: string;
  description: string;
  scope: ReasoningRuleScope;
  apiKeyId: string | null;
  comboId: string | null;
  connectionId: string | null;
  modelPattern: string | null;
  sourceEffort: ReasoningSourceEffort;
  requestTags: string[];
  tagMatchMode: "any" | "all";
  effortMode: ReasoningEffortMode;
  targetEffort: ReasoningEffort | null;
  targetKind: ReasoningTargetKind;
  targetModel: string | null;
  targetComboId: string | null;
  budgetAction: ReasoningBudgetAction;
  budgetTokens: number | null;
  priority: number;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ReasoningRoutingRuleInput = Omit<
  ReasoningRoutingRule,
  "id" | "createdAt" | "updatedAt"
>;

/** Persistence only; the DB facade owns caching and external invalidation. */
export interface ReasoningRoutingRuleRepository {
  /** Priority descending, then creation time and id ascending; returns independent values. */
  list(options?: { enabledOnly?: boolean }): Promise<ReasoningRoutingRule[]>;
  findById(id: string): Promise<ReasoningRoutingRule | null>;
  /** Rejects invalid owner/target references; normalizes tags and directive fields. */
  create(input: ReasoningRoutingRuleInput): Promise<ReasoningRoutingRule>;
  /** Merges the patch before validating references; missing ids return null. */
  update(
    id: string,
    patch: Partial<ReasoningRoutingRuleInput>
  ): Promise<ReasoningRoutingRule | null>;
  deleteById(id: string): Promise<boolean>;
}
