import {
  listAgentSessions,
  getAgentSessionRecentUsage,
  type AgentSessionRecord,
} from "@/lib/db/agentSessions";
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

type Db = ReturnType<typeof getDbInstance>;
type AgentSession = AgentSessionRecord | null;
type CostRow = ReturnType<typeof getCostBySessionTag>[number];

/** The session's agent_sessions row (one launch = one row), linked back onto the session. */
function findAgentSession(db: Db, session: LaunchSessionRecord): AgentSession {
  const { sessions } = listAgentSessions(db as never, {
    apiKeyId: usageKeyId(session),
    clientSessionId: session.id,
    limit: 1,
  });
  const agent = sessions[0] ?? null;
  if (agent && agent.id !== session.agentSessionId) {
    setLaunchSessionAgentSessionId(session.id, agent.id);
  }
  return agent;
}

/** Per-model counts from the cost ledger, else from the agent session's recent usage. */
function resolveModels(db: Db, costRows: CostRow[], agent: AgentSession) {
  const models = countModels(costRows.map((row) => row.model));
  if (models.length > 0 || !agent) return models;
  return countModels(getAgentSessionRecentUsage(db as never, agent.id, 100).map((r) => r.model));
}

const orZero = (value: number | null | undefined) => value ?? 0;

function agentTotals(agent: AgentSession) {
  if (!agent) {
    return {
      requests: 0,
      errors: 0,
      inputTokens: 0,
      outputTokens: 0,
      cacheReadTokens: 0,
      cacheCreationTokens: 0,
      reasoningTokens: 0,
      unpricedRequests: 0,
    };
  }
  const { tokens } = agent;
  return {
    requests: orZero(agent.requestCount),
    errors: orZero(agent.errorCount),
    inputTokens: orZero(tokens.input),
    outputTokens: orZero(tokens.output),
    cacheReadTokens: orZero(tokens.cacheRead),
    cacheCreationTokens: orZero(tokens.cacheCreation),
    reasoningTokens: orZero(tokens.reasoning),
    unpricedRequests: orZero(agent.unpricedCount),
  };
}

/** The agent session's cost, else the ledger sum; undefined (omitted) when neither exists. */
function resolveCostUsd(agent: AgentSession, costRows: CostRow[]): number | undefined {
  if (agent) return agent.costUsd;
  if (costRows.length === 0) return undefined;
  return costRows.reduce((sum, row) => sum + row.amountUsd, 0);
}

export function buildLaunchUsageSummary(session: LaunchSessionRecord): LaunchUsageSummary {
  const db = getDbInstance();
  const agent = findAgentSession(db, session);
  const costRows = getCostBySessionTag(session.sessionTag);

  const summary: LaunchUsageSummary = {
    sessionId: session.id,
    toolId: session.toolId,
    sessionTag: session.sessionTag,
    agentSessionId: agent?.id ?? null,
    startedAt: session.createdAt,
    ...agentTotals(agent),
    models: resolveModels(db, costRows, agent),
    // Not tracked per session yet; reported as 0 rather than omitted so the shape is stable.
    fallbacks: 0,
  };
  const costUsd = resolveCostUsd(agent, costRows);
  if (costUsd !== undefined) summary.costUsd = costUsd;
  if (session.revokedAt) summary.endedAt = session.revokedAt;
  return summary;
}
