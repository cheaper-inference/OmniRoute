import {
  advanceTeamBudgetWindow,
  getActiveBillingTeamForApiKey,
  getTeam,
  getTeamBudgetWindowStart,
} from "@/lib/db/teams";
import { loadTeamCostRows } from "@/lib/db/teamCostRows";
import {
  addTeamCosts,
  emptyTeamCosts,
  priceTeamCostRow,
  roundTeamUsd,
  type TeamCostTotals,
  type TeamPricingMemo,
} from "./teamCostAccounting";
import {
  getUnpricedUsageBudgetPolicy,
  type UnpricedUsageBudgetPolicy,
} from "@/shared/utils/featureFlags";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { isAnthropicMessagesRequest } from "@/shared/utils/anthropicErrorEnvelope";

export interface TeamUsageLimitStatus extends TeamCostTotals {
  teamId: string;
  teamName: string;
  enforcementMode: "soft_committed_usage";
  maxBudgetUsd: number;
  budgetDuration: "1d" | "7d" | "30d";
  windowStartIso: string;
  resetAtIso: string;
  subscriptionQuotaUsed: null;
  compressionSavingsUsd: null;
  unpricedUsagePolicy: UnpricedUsageBudgetPolicy;
  blockReason: "cap_exceeded" | "unpriced_usage" | "pricing_unavailable" | null;
  exceeded: boolean;
}

export async function getTeamUsageLimitStatusForApiKey(
  apiKeyId: string,
  nowMs = Date.now()
): Promise<TeamUsageLimitStatus | null> {
  const team = getActiveBillingTeamForApiKey(apiKeyId);
  return team ? getTeamUsageLimitStatusForTeam(team.id, nowMs) : null;
}

function teamBlockReason(
  spend: TeamCostTotals,
  maxBudgetUsd: number,
  policy: UnpricedUsageBudgetPolicy
): TeamUsageLimitStatus["blockReason"] {
  if (spend.accountedCostUsd >= maxBudgetUsd) return "cap_exceeded";
  if (spend.hasPricingFailure) return "pricing_unavailable";
  if (spend.hasUnpricedUsage && policy === "fail_closed") return "unpriced_usage";
  return null;
}

export async function getTeamUsageLimitStatusForTeam(
  teamId: string,
  nowMs = Date.now()
): Promise<TeamUsageLimitStatus | null> {
  let team = getTeam(teamId);
  if (team?.status !== "active") return null;
  if (!team?.maxBudgetUsd || !team.budgetDuration || !team.budgetResetAt) return null;
  team = advanceTeamBudgetWindow(team, nowMs);
  const { maxBudgetUsd, budgetDuration } = team;
  const windowStartIso = getTeamBudgetWindowStart(team);
  if (!maxBudgetUsd || !budgetDuration || !windowStartIso || !team.budgetResetAt) return null;
  const spend = emptyTeamCosts();
  const memo: TeamPricingMemo = new Map();
  for (const row of loadTeamCostRows(team.id, {
    startIso: windowStartIso,
    endIso: team.budgetResetAt,
    successfulOnly: true,
    endExclusive: true,
  }))
    addTeamCosts(spend, await priceTeamCostRow(row, memo));
  // Compare before display rounding; rounding must not create a cap overage.
  const unpricedUsagePolicy = getUnpricedUsageBudgetPolicy();
  const blockReason = teamBlockReason(spend, maxBudgetUsd, unpricedUsagePolicy);
  return {
    ...spend,
    estimatedListCostUsd: roundTeamUsd(spend.estimatedListCostUsd),
    accountedCostUsd: roundTeamUsd(spend.accountedCostUsd),
    actualProviderCostUsd:
      spend.actualProviderCostUsd === null ? null : roundTeamUsd(spend.actualProviderCostUsd),
    teamId: team.id,
    teamName: team.name,
    enforcementMode: "soft_committed_usage",
    maxBudgetUsd,
    budgetDuration,
    windowStartIso,
    resetAtIso: team.budgetResetAt,
    subscriptionQuotaUsed: null,
    compressionSavingsUsd: null,
    unpricedUsagePolicy,
    blockReason,
    exceeded: blockReason !== null,
  };
}

export async function buildTeamUsageLimitPolicyRejection(
  request: Request,
  apiKeyId: string
): Promise<Response | null> {
  const status = await getTeamUsageLimitStatusForApiKey(apiKeyId);
  if (!status?.exceeded) return null;
  const reason = status.blockReason ?? "cap_exceeded";
  const message = sanitizeErrorMessage(
    reason === "cap_exceeded"
      ? `This API key's team reached its shared usage quota. The soft committed-usage window resets at ${status.resetAtIso}.`
      : reason === "pricing_unavailable"
        ? "Team usage accounting or pricing is temporarily unavailable. The budget cannot be verified; retry later or contact an administrator."
        : `Team usage includes unpriced models with no configured price: ${status.unpricedModels.slice(0, 10).join(", ")}. An administrator must configure pricing or explicitly enable UNPRICED_USAGE_BUDGET_POLICY=count_as_zero to continue with unknown costs. This is not a confirmed budget overage.`
  );
  if (isAnthropicMessagesRequest(request)) {
    return new Response(
      JSON.stringify({
        type: "error",
        error: { type: "invalid_request_error", message },
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  return new Response(
    JSON.stringify(
      buildErrorBody(400, message, undefined, {
        code:
          reason === "cap_exceeded"
            ? "team_budget_exceeded"
            : reason === "unpriced_usage"
              ? "team_usage_unpriced"
              : "team_pricing_unavailable",
        reason,
      })
    ),
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
}
