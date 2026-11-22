/**
 * Database module: AgentBridgeState
 * Synchronous compatibility facade for the agent_bridge_state table.
 *
 * Persistence lives in `repositories/sqliteAgentBridgeStateRepository.ts`. These
 * exports stay synchronous (SQLite-only legacy access) because the agent-bridge
 * routes, the MITM manager and DNS provisioning call them synchronously.
 */

import type { AgentBridgeStateRepository } from "@/domain/persistence/agentBridgeRepositories";
import type { AgentBridgeStateRow } from "./_rowTypes.ts";
import { agentBridgeRepositories } from "./repositories/agentBridgeRepositories";

const agentBridgeState = agentBridgeRepositories.legacySync.state;

/** Async persistence contract for per-agent bridge state. */
export function getAgentBridgeStateRepository(): AgentBridgeStateRepository {
  return agentBridgeRepositories.state;
}

export function getAllAgentBridgeStates(): AgentBridgeStateRow[] {
  return agentBridgeState.list();
}

export function getAgentBridgeState(agentId: string): AgentBridgeStateRow | null {
  return agentBridgeState.get(agentId);
}

export function upsertAgentBridgeState(
  row: Partial<AgentBridgeStateRow> & { agent_id: string }
): void {
  agentBridgeState.upsert(row);
}

export function setLastStarted(agentId: string, ts: string): void {
  agentBridgeState.setLastStarted(agentId, ts);
}

export function setLastError(agentId: string, err: string | null): void {
  agentBridgeState.setLastError(agentId, err);
}
