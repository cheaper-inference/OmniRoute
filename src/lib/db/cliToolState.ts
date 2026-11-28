/**
 * CLI Tool State Persistence
 *
 * Stores last-configured timestamps and initial config snapshots
 * for CLI tools in the key_value table.
 *
 * Namespaces:
 *   - cliToolLastConfig: ISO timestamp of last configuration
 *   - cliToolInitialConfig: JSON snapshot of pre-OmniRoute configuration
 *
 * Persistence lives in `repositories/sqliteCliToolStateRepository.ts`. These
 * exports stay synchronous (SQLite-only legacy access) because the cli-tools
 * settings and status routes call them synchronously.
 *
 * @module lib/db/cliToolState
 */

import type { CliToolStateRepository } from "@/domain/persistence/localToolStateRepositories";
import { localToolStateRepositories } from "./repositories/localToolStateRepositories";

type JsonRecord = Record<string, unknown>;

const cliToolState = localToolStateRepositories.legacySync.cliTools;

/** Async persistence contract for CLI tool state. */
export function getCliToolStateRepository(): CliToolStateRepository {
  return localToolStateRepositories.cliTools;
}

// ──────────────── Last Configured Timestamp ────────────────

/**
 * Save last-configured timestamp for a CLI tool.
 */
export function saveCliToolLastConfigured(
  toolId: string,
  timestamp: string = new Date().toISOString()
): void {
  cliToolState.saveLastConfigured(toolId, timestamp);
}

/**
 * Get last-configured timestamp for a CLI tool.
 * @returns ISO timestamp string or null if never configured.
 */
export function getCliToolLastConfigured(toolId: string): string | null {
  return cliToolState.getLastConfigured(toolId);
}

/**
 * Get all CLI tool last-configured timestamps.
 * @returns Record<toolId, ISO timestamp>
 */
export function getAllCliToolLastConfigured(): Record<string, string> {
  return cliToolState.listLastConfigured();
}

/**
 * Delete last-configured timestamp for a CLI tool.
 */
export function deleteCliToolLastConfigured(toolId: string): void {
  cliToolState.deleteLastConfigured(toolId);
}

// ──────────────── Initial Config Snapshot ────────────────

/**
 * Save the initial (pre-OmniRoute) config snapshot for a CLI tool.
 * Only saves if no snapshot exists yet (first-time only).
 * @returns true if saved, false if snapshot already exists.
 */
export function saveCliToolInitialConfig(toolId: string, config: JsonRecord): boolean {
  return cliToolState.saveInitialConfig(toolId, config);
}

/**
 * Get the initial config snapshot for a CLI tool.
 * @returns Config object or null if no snapshot exists.
 */
export function getCliToolInitialConfig(toolId: string): JsonRecord | null {
  return cliToolState.getInitialConfig(toolId);
}

/**
 * Delete the initial config snapshot for a CLI tool.
 */
export function deleteCliToolInitialConfig(toolId: string): void {
  cliToolState.deleteInitialConfig(toolId);
}
