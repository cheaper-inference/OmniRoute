import type {
  ReasoningRoutingRule,
  ReasoningRoutingRuleInput,
} from "@/domain/persistence/reasoningRoutingRuleRepository";
import {
  getSqliteReasoningRoutingRuleReferenceErrors,
  sqliteReasoningRoutingRuleRepository as repository,
} from "./repositories/sqliteReasoningRoutingRuleRepository";
import { registerDbStateResetter } from "./stateReset";

export type {
  ReasoningBudgetAction,
  ReasoningEffort,
  ReasoningEffortMode,
  ReasoningRoutingRule,
  ReasoningRoutingRuleInput,
  ReasoningRuleScope,
  ReasoningSourceEffort,
  ReasoningTargetKind,
} from "@/domain/persistence/reasoningRoutingRuleRepository";

let cache: { version: number; rules: ReasoningRoutingRule[] } | null = null;
let version = 0;

function invalidate(): void {
  version += 1;
  cache = null;
}

export function getReasoningRoutingRuleReferenceErrors(rule: ReasoningRoutingRuleInput): string[] {
  return getSqliteReasoningRoutingRuleReferenceErrors(rule);
}

export async function getReasoningRoutingRules(
  options: { enabledOnly?: boolean } = {}
): Promise<ReasoningRoutingRule[]> {
  while (!cache || cache.version !== version) {
    const readVersion = version;
    const rules = await repository.list();
    // A reset or external deletion during the await must not repopulate stale rows.
    if (readVersion === version) cache = { version: readVersion, rules };
  }
  const rules = options.enabledOnly ? cache.rules.filter((rule) => rule.enabled) : cache.rules;
  return rules.map((rule) => ({ ...rule, requestTags: [...rule.requestTags] }));
}

export async function getReasoningRoutingRuleById(
  id: string
): Promise<ReasoningRoutingRule | null> {
  return repository.findById(id);
}

export async function createReasoningRoutingRule(
  rule: ReasoningRoutingRuleInput
): Promise<ReasoningRoutingRule> {
  const created = await repository.create(rule);
  invalidate();
  return created;
}

export async function updateReasoningRoutingRule(
  id: string,
  patch: Partial<ReasoningRoutingRuleInput>
): Promise<ReasoningRoutingRule | null> {
  const updated = await repository.update(id, patch);
  if (updated) invalidate();
  return updated;
}

export async function deleteReasoningRoutingRule(id: string): Promise<boolean> {
  const deleted = await repository.deleteById(id);
  if (deleted) invalidate();
  return deleted;
}

export function invalidateReasoningRoutingRuleCache(): void {
  invalidate();
}

registerDbStateResetter(invalidateReasoningRoutingRuleCache);
