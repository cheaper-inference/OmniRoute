import { errorResponse } from "../../utils/error.ts";
import { BudgetExceededError } from "../autoCombo/engine.ts";
import {
  parseRequestBudgetCap,
  parseRequestBudgetFallback,
  type PerRequestAutoControls,
} from "../autoCombo/requestControls.ts";
import { estimateTokens } from "../contextManager.ts";
import type { ComboRelayOptions } from "./types.ts";

type PricedCandidate = { costPer1MTokens: number };

export function resolveCandidateBudget(
  config: Pick<PerRequestAutoControls, "budgetCap" | "budgetFallback">,
  request?: Pick<ComboRelayOptions, "budgetCap" | "budgetFallback"> | null
) {
  const requestBudgetCap = parseRequestBudgetCap(request?.budgetCap);
  const requestBudgetFallback = parseRequestBudgetFallback(request?.budgetFallback);
  return {
    budgetCap: requestBudgetCap ?? config.budgetCap,
    budgetFallback: requestBudgetFallback ?? config.budgetFallback,
    requestBudgetCap,
    requestBudgetFallback,
  };
}

export function estimateCandidateInputTokens(messages: unknown): number {
  return estimateTokens(
    typeof messages === "string" || (messages !== null && typeof messages === "object")
      ? messages
      : []
  );
}

export function estimateCandidateCost(candidate: PricedCandidate, estimatedInputTokens: number) {
  const tokens = estimatedInputTokens > 0 ? estimatedInputTokens : 1000;
  return (candidate.costPer1MTokens * tokens) / 1_000_000;
}

export function filterCandidatesByBudget<T extends PricedCandidate>(
  candidates: T[],
  budgetCap: number | undefined,
  strict: boolean,
  estimatedInputTokens: number
): T[] | Response {
  if (!budgetCap || candidates.length === 0) return candidates;
  const cost = (candidate: T) => estimateCandidateCost(candidate, estimatedInputTokens);
  const affordable = candidates.filter((candidate) => cost(candidate) <= budgetCap);
  if (affordable.length > 0) return affordable;

  const cheapest = Math.min(...candidates.map(cost));
  if (strict) return errorResponse(402, new BudgetExceededError(budgetCap, cheapest).message);
  return candidates.filter((candidate) => cost(candidate) === cheapest);
}
