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
  ReasoningRoutingRule,
  ReasoningRoutingRuleInput,
  ReasoningSourceEffort,
} from "@/domain/persistence/reasoningRoutingRuleRepository";

let cache: { version: number; rules: ReasoningRoutingRule[] } | null = null;
let version = 0;
const pendingMutations = new Set<Promise<unknown>>();

function invalidate(): void {
  version += 1;
  cache = null;
}

async function mutate<T>(operation: () => Promise<T>): Promise<T> {
  invalidate();
  const pending = operation();
  pendingMutations.add(pending);
  try {
    return await pending;
  } finally {
    // Fence reads on both sides of persistence, even when a backend writes later.
    // Failed/no-op mutations only cost a re-read; their errors stay with the caller.
    invalidate();
    pendingMutations.delete(pending);
  }
}

export function getReasoningRoutingRuleReferenceErrors(rule: ReasoningRoutingRuleInput): string[] {
  return getSqliteReasoningRoutingRuleReferenceErrors(rule);
}

export async function getReasoningRoutingRules(
  options: { enabledOnly?: boolean } = {}
): Promise<ReasoningRoutingRule[]> {
  while (pendingMutations.size || !cache || cache.version !== version) {
    if (pendingMutations.size) {
      // Update already yields before writing; do not read a pre-write snapshot.
      await Promise.allSettled([...pendingMutations]);
      continue;
    }
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
  return mutate(() => repository.create(rule));
}

export async function updateReasoningRoutingRule(
  id: string,
  patch: Partial<ReasoningRoutingRuleInput>
): Promise<ReasoningRoutingRule | null> {
  return mutate(() => repository.update(id, patch));
}

export async function deleteReasoningRoutingRule(id: string): Promise<boolean> {
  return mutate(() => repository.deleteById(id));
}

export function invalidateReasoningRoutingRuleCache(): void {
  invalidate();
}

registerDbStateResetter(invalidateReasoningRoutingRuleCache);
