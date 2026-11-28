/**
 * Plugin DB module — CRUD operations for the plugins table.
 *
 * Persistence lives in `repositories/sqlitePluginRegistryRepository.ts`. These
 * exports stay synchronous (SQLite-only legacy access) because the plugin
 * manager, the plugin routes, the model-validation fence and the MCP plugin
 * tools call them synchronously.
 *
 * @module db/plugins
 */

import type {
  PluginAnalyticsSummary,
  PluginCreateInput,
  PluginExecutionLogRepository,
  PluginExecutionRow,
  PluginRegistryRepository,
  PluginRow,
} from "@/domain/persistence/pluginRegistryRepositories";
import { pluginRegistryRepositories } from "./repositories/pluginRegistryRepositories";

export type {
  PluginAnalyticsSummary,
  PluginCreateInput,
  PluginExecutionRow,
  PluginRow,
} from "@/domain/persistence/pluginRegistryRepositories";

const registry = pluginRegistryRepositories.legacySync.plugins;
const executions = pluginRegistryRepositories.legacySync.executions;

/** Async persistence contract for plugin registrations. */
export function getPluginRegistryRepository(): PluginRegistryRepository {
  return pluginRegistryRepositories.plugins;
}

/** Async persistence contract for the plugin execution log. */
export function getPluginExecutionLogRepository(): PluginExecutionLogRepository {
  return pluginRegistryRepositories.executions;
}

// ── CRUD ──

export function insertPlugin(input: PluginCreateInput): PluginRow {
  return registry.insertPlugin(input);
}

export function getPluginById(id: string): PluginRow | null {
  return registry.getPluginById(id);
}

export function getPluginByName(name: string): PluginRow | null {
  return registry.getPluginByName(name);
}

export function listPlugins(status?: PluginRow["status"]): PluginRow[] {
  return registry.listPlugins(status);
}

/**
 * `activated_at` records the most-recent activation timestamp and is kept on
 * deactivation. Callers should treat it as "last activated at", not
 * "currently active since".
 */
export function updatePluginStatus(
  name: string,
  status: PluginRow["status"],
  errorMessage?: string
): boolean {
  return registry.updatePluginStatus(name, status, errorMessage);
}

/**
 * Refresh the persisted manifest snapshot (and the derived hooks list) for a plugin.
 *
 * The `manifest` column is a snapshot validated by the Zod schema of the OmniRoute
 * version that INSTALLED the plugin; when a later version adds a manifest field
 * (e.g. hooks.onStreamComplete, #11934), activate() re-reads plugin.json from disk
 * and calls this to bring the row up to date without requiring a version-bump upgrade.
 */
export function updatePluginManifest(
  name: string,
  manifest: Record<string, unknown>,
  hooks: string[]
): boolean {
  return registry.updatePluginManifest(name, manifest, hooks);
}

export function updatePluginConfig(name: string, config: Record<string, unknown>): boolean {
  return registry.updatePluginConfig(name, config);
}

export function deletePlugin(name: string): boolean {
  return registry.deletePlugin(name);
}

export function pluginExists(name: string): boolean {
  return registry.pluginExists(name);
}

// ── Analytics ──

/**
 * Record a single plugin execution in plugin_analytics.
 */
export function recordPluginExecution(
  pluginName: string,
  hook: string,
  durationMs: number,
  success: boolean,
  errorMessage?: string
): void {
  executions.recordPluginExecution(pluginName, hook, durationMs, success, errorMessage);
}

/**
 * Return execution rows for a given plugin (most recent first).
 */
export function getPluginAnalytics(pluginName: string): PluginExecutionRow[] {
  return executions.getPluginAnalytics(pluginName);
}

/**
 * Return aggregate stats for a given plugin.
 */
export function getPluginAnalyticsSummary(pluginName: string): PluginAnalyticsSummary {
  return executions.getPluginAnalyticsSummary(pluginName);
}
