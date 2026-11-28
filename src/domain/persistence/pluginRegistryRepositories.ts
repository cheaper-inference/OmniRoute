/**
 * Plugin registry persistence: the `plugins` registration rows that the plugin
 * manager keeps in step with plugin directories, and the `plugin_analytics`
 * per-execution log that the MCP plugin tools read.
 *
 * Only registration, configuration and execution history live here. Loading
 * plugin code, running hooks and sandboxing stay in `src/lib/plugins`.
 */

export type PluginStatus = "installed" | "active" | "inactive" | "error";

/**
 * A stored plugin row. JSON columns (`tags`, `manifest`, `config`,
 * `configSchema`, `hooks`, `permissions`) are returned as the stored strings;
 * callers parse them.
 */
export interface PluginRow {
  id: string;
  name: string;
  version: string;
  description: string | null;
  author: string | null;
  license: string;
  main: string;
  source: string;
  tags: string; // JSON array
  status: PluginStatus;
  enabled: number; // 0 | 1
  manifest: string; // JSON
  config: string; // JSON
  configSchema: string; // JSON
  hooks: string; // JSON array
  permissions: string; // JSON array
  pluginDir: string;
  errorMessage: string | null;
  installedAt: string;
  updatedAt: string;
  activatedAt: string | null;
}

export interface PluginCreateInput {
  id: string;
  name: string;
  version: string;
  description?: string;
  author?: string;
  license?: string;
  main: string;
  source?: string;
  tags?: string[];
  status?: PluginStatus;
  enabled?: boolean;
  manifest: Record<string, unknown>;
  config?: Record<string, unknown>;
  configSchema?: Record<string, unknown>;
  hooks?: string[];
  permissions?: string[];
  pluginDir: string;
}

export interface PluginRegistryRepository {
  /**
   * Inserts a registration (defaults: license MIT, source local, status
   * installed, disabled, empty JSON collections) and returns the stored row.
   * Duplicate id or name is rejected by the store.
   */
  insert(input: PluginCreateInput): Promise<PluginRow>;
  findById(id: string): Promise<PluginRow | null>;
  findByName(name: string): Promise<PluginRow | null>;
  /** Ordered by name; optionally only rows with exactly this status. */
  list(status?: PluginStatus): Promise<PluginRow[]>;
  /**
   * Sets status and error message (cleared when omitted). `enabled` follows
   * `status === "active"`. Activation stamps `activatedAt`; other statuses keep
   * the previous value ("last activated at"). Returns false for an unknown name.
   */
  updateStatus(name: string, status: PluginStatus, errorMessage?: string): Promise<boolean>;
  /** Replaces the stored manifest snapshot and derived hook list only. */
  updateManifest(
    name: string,
    manifest: Record<string, unknown>,
    hooks: string[]
  ): Promise<boolean>;
  /** Replaces the stored config only. */
  updateConfig(name: string, config: Record<string, unknown>): Promise<boolean>;
  deleteByName(name: string): Promise<boolean>;
  exists(name: string): Promise<boolean>;
}

export interface PluginExecutionRow {
  pluginName: string;
  hook: string;
  durationMs: number;
  success: boolean;
  errorMessage: string | null;
  createdAt: string;
}

export interface PluginAnalyticsSummary {
  totalCalls: number;
  successCount: number;
  failureCount: number;
  avgDurationMs: number;
}

/** Append-only execution history; aggregates are computed on read. */
export interface PluginExecutionLogRepository {
  record(
    pluginName: string,
    hook: string,
    durationMs: number,
    success: boolean,
    errorMessage?: string
  ): Promise<void>;
  /** All rows for the plugin, newest first. */
  listForPlugin(pluginName: string): Promise<PluginExecutionRow[]>;
  /** Zeros when the plugin has no rows. */
  summarize(pluginName: string): Promise<PluginAnalyticsSummary>;
}
