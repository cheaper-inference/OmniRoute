import { listAgentSessions, getAgentSessionRecentUsage } from "@/lib/db/agentSessions";
import { getCostBySessionTag } from "@/lib/db/costLedger";
import { getDbInstance } from "@/lib/db/core";
import {
  LAUNCH_ANONYMOUS_API_KEY_ID,
  setLaunchSessionAgentSessionId,
  type LaunchSessionRecord,
} from "@/lib/db/launchSessions";

/** Wire shape of `GET /api/launch/sessions/:id/usage`. */
export interface LaunchUsageSummary {
  sessionId: string;
  toolId: string;
  sessionTag: string;
  agentSessionId: string | null;
  startedAt: string;
  endedAt?: string;
  requests: number;
  errors: number;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
  reasoningTokens: number;
  costUsd?: number;
  unpricedRequests: number;
  models: Array<{ id: string; requests: number }>;
  fallbacks: number;
}

/** The api_key_id the request pipeline stamps on this session's usage rows. */
function usageKeyId(session: LaunchSessionRecord): string {
  return session.parentKeyId ?? LAUNCH_ANONYMOUS_API_KEY_ID;
}

function countModels(
  ids: Array<string | null | undefined>
): Array<{ id: string; requests: number }> {
  const counts = new Map<string, number>();
  for (const id of ids) {
    if (!id) continue;
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([id, requests]) => ({ id, requests }))
    .sort((a, b) => b.requests - a.requests || a.id.localeCompare(b.id));
}

export function buildLaunchUsageSummary(session: LaunchSessionRecord): LaunchUsageSummary {
  const db = getDbInstance();
  const { sessions } = listAgentSessions(db as never, {
    apiKeyId: usageKeyId(session),
    clientSessionId: session.id,
    limit: 1,
  });
  const agent = sessions[0] ?? null;
  if (agent && agent.id !== session.agentSessionId) {
    setLaunchSessionAgentSessionId(session.id, agent.id);
  }

  const costRows = getCostBySessionTag(session.sessionTag);
  let models = countModels(costRows.map((row) => row.model));
  if (models.length === 0 && agent) {
    models = countModels(
      getAgentSessionRecentUsage(db as never, agent.id, 100).map((r) => r.model)
    );
  }

  const summary: LaunchUsageSummary = {
    sessionId: session.id,
    toolId: session.toolId,
    sessionTag: session.sessionTag,
    agentSessionId: agent?.id ?? null,
    startedAt: session.createdAt,
    requests: agent?.requestCount ?? 0,
    errors: agent?.errorCount ?? 0,
    inputTokens: agent?.tokens.input ?? 0,
    outputTokens: agent?.tokens.output ?? 0,
    cacheReadTokens: agent?.tokens.cacheRead ?? 0,
    cacheCreationTokens: agent?.tokens.cacheCreation ?? 0,
    reasoningTokens: agent?.tokens.reasoning ?? 0,
    unpricedRequests: agent?.unpricedCount ?? 0,
    models,
    // Not tracked per session yet; reported as 0 rather than omitted so the shape is stable.
    fallbacks: 0,
  };
  if (agent) summary.costUsd = agent.costUsd;
  else if (costRows.length > 0) {
    summary.costUsd = costRows.reduce((sum, row) => sum + row.amountUsd, 0);
  }
  if (session.revokedAt) summary.endedAt = session.revokedAt;
  return summary;
}
