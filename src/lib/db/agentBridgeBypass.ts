/**
 * Database module: AgentBridgeBypass
 * Synchronous compatibility facade for the agent_bridge_bypass table.
 *
 * Persistence lives in `repositories/sqliteAgentBridgeBypassRepository.ts`. These
 * exports stay synchronous (SQLite-only legacy access) because the agent-bridge
 * routes, the MITM manager and inspector config import/export call them
 * synchronously.
 */

import type { AgentBridgeBypassRepository } from "@/domain/persistence/agentBridgeRepositories";
import type { AgentBridgeBypassRow } from "./_rowTypes.ts";
import { agentBridgeRepositories } from "./repositories/agentBridgeRepositories";

const agentBridgeBypass = agentBridgeRepositories.legacySync.bypass;

/** Async persistence contract for the bypass pattern list. */
export function getAgentBridgeBypassRepository(): AgentBridgeBypassRepository {
  return agentBridgeRepositories.bypass;
}

export function getAllBypassPatterns(): AgentBridgeBypassRow[] {
  return agentBridgeBypass.listAll();
}

export function getUserBypassPatterns(): string[] {
  return agentBridgeBypass.listUserPatterns();
}

export function replaceUserBypassPatterns(patterns: string[]): void {
  agentBridgeBypass.replaceUserPatterns(patterns);
}

/**
 * Seeds default bypass patterns — idempotent.
 * Only inserts a pattern if it does not already exist in the table.
 * Called at app boot by the AgentBridge manager (F3 will wire this).
 */
export function seedDefaultBypassPatterns(defaults: string[]): void {
  agentBridgeBypass.seedDefaults(defaults);
}
