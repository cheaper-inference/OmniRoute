/**
 * Row types for F2 DB modules (AgentBridge + Inspector).
 * These are local type definitions used by the CRUD modules in this directory.
 * F1 will create canonical Zod schemas in src/shared/schemas/; F10 reconciles them.
 */

// Agent bridge state, bypass and custom-host rows are defined with their
// repository contracts; re-exported here for existing imports.
export type {
  AgentBridgeBypassRow,
  AgentBridgeStateRow,
  InspectorCustomHostRow,
} from "@/domain/persistence/agentBridgeRepositories";

export interface AgentBridgeMappingRow {
  agent_id: string;
  source_model: string;
  target_model: string;
  updated_at: string;
}

export interface InspectorSessionRow {
  id: string;
  name: string | null;
  started_at: string;
  ended_at: string | null;
  request_count: number;
  profile: "llm" | "custom" | "all" | null;
}
