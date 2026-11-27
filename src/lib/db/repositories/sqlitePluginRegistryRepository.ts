/**
 * SQLite implementation for the plugin registry (`plugins`) and the plugin
 * execution log (`plugin_analytics`).
 *
 * The async repositories and the SQLite-only legacy helpers share these
 * private operations. SQL text, parameter order, JSON encoding, timestamps,
 * row mapping and log lines are unchanged from the original `db/plugins.ts`.
 * Resolve the database at call time.
 */
import type {
  PluginAnalyticsSummary,
  PluginCreateInput,
  PluginExecutionLogRepository,
  PluginExecutionRow,
  PluginRegistryRepository,
  PluginRow,
} from "@/domain/persistence/pluginRegistryRepositories";
import { getDbInstance } from "../core";
import { logger } from "../../../../open-sse/utils/logger.ts";

const log = logger("DB_PLUGINS");

function rowToPlugin(row: any): PluginRow {
  return {
    id: row.id,
    name: row.name,
    version: row.version,
    description: row.description,
    author: row.author,
    license: row.license,
    main: row.main,
    source: row.source,
    tags: row.tags,
    status: row.status,
    enabled: row.enabled,
    manifest: row.manifest,
    config: row.config,
    configSchema: row.config_schema,
    hooks: row.hooks,
    permissions: row.permissions,
    pluginDir: row.plugin_dir,
    errorMessage: row.error_message,
    installedAt: row.installed_at,
    updatedAt: row.updated_at,
    activatedAt: row.activated_at,
  };
}

// ── plugins ──

function insertPluginSync(input: PluginCreateInput): PluginRow {
  const db = getDbInstance();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO plugins (
      id, name, version, description, author, license, main, source, tags,
      status, enabled, manifest, config, config_schema, hooks, permissions,
      plugin_dir, installed_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    input.id,
    input.name,
    input.version,
    input.description ?? null,
    input.author ?? null,
    input.license ?? "MIT",
    input.main,
    input.source ?? "local",
    JSON.stringify(input.tags ?? []),
    input.status ?? "installed",
    input.enabled ? 1 : 0,
    JSON.stringify(input.manifest),
    JSON.stringify(input.config ?? {}),
    JSON.stringify(input.configSchema ?? {}),
    JSON.stringify(input.hooks ?? []),
    JSON.stringify(input.permissions ?? []),
    input.pluginDir,
    now,
    now
  );

  log.info("plugin.inserted", { id: input.id, name: input.name });
  const plugin = getPluginByNameSync(input.name);
  if (!plugin) {
    throw new Error(`Failed to retrieve plugin '${input.name}' after insertion`);
  }
  return plugin;
}

function getPluginByIdSync(id: string): PluginRow | null {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM plugins WHERE id = ?").get(id);
  return row ? rowToPlugin(row) : null;
}

function getPluginByNameSync(name: string): PluginRow | null {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM plugins WHERE name = ?").get(name);
  return row ? rowToPlugin(row) : null;
}

function listPluginsSync(status?: PluginRow["status"]): PluginRow[] {
  const db = getDbInstance();
  const rows = status
    ? db.prepare("SELECT * FROM plugins WHERE status = ? ORDER BY name").all(status)
    : db.prepare("SELECT * FROM plugins ORDER BY name").all();
  return rows.map(rowToPlugin);
}

function updatePluginStatusSync(
  name: string,
  status: PluginRow["status"],
  errorMessage?: string
): boolean {
  const db = getDbInstance();
  const now = new Date().toISOString();
  const activatedAt = status === "active" ? now : null;

  // `activated_at` records the most-recent activation timestamp and is intentionally
  // preserved on deactivation via COALESCE (activatedAt is null when status != "active").
  // Callers should treat it as "last activated at", not "currently active since".
  const result = db
    .prepare(
      `UPDATE plugins SET status = ?, enabled = ?, error_message = ?,
       updated_at = ?, activated_at = COALESCE(?, activated_at)
       WHERE name = ?`
    )
    .run(status, status === "active" ? 1 : 0, errorMessage ?? null, now, activatedAt, name);

  if (result.changes > 0) {
    log.info("plugin.status_updated", { name, status });
  }
  return result.changes > 0;
}

function updatePluginManifestSync(
  name: string,
  manifest: Record<string, unknown>,
  hooks: string[]
): boolean {
  const db = getDbInstance();
  const now = new Date().toISOString();

  const result = db
    .prepare("UPDATE plugins SET manifest = ?, hooks = ?, updated_at = ? WHERE name = ?")
    .run(JSON.stringify(manifest), JSON.stringify(hooks), now, name);

  if (result.changes > 0) {
    log.info("plugin.manifest_updated", { name });
  }
  return result.changes > 0;
}

function updatePluginConfigSync(name: string, config: Record<string, unknown>): boolean {
  const db = getDbInstance();
  const now = new Date().toISOString();

  const result = db
    .prepare("UPDATE plugins SET config = ?, updated_at = ? WHERE name = ?")
    .run(JSON.stringify(config), now, name);

  return result.changes > 0;
}

function deletePluginSync(name: string): boolean {
  const db = getDbInstance();
  const result = db.prepare("DELETE FROM plugins WHERE name = ?").run(name);
  if (result.changes > 0) {
    log.info("plugin.deleted", { name });
  }
  return result.changes > 0;
}

function pluginExistsSync(name: string): boolean {
  const db = getDbInstance();
  const row = db.prepare("SELECT 1 FROM plugins WHERE name = ?").get(name);
  return !!row;
}

// ── plugin_analytics ──

function recordPluginExecutionSync(
  pluginName: string,
  hook: string,
  durationMs: number,
  success: boolean,
  errorMessage?: string
): void {
  const db = getDbInstance();
  db.prepare(
    `INSERT INTO plugin_analytics (plugin_name, hook, duration_ms, success, error_message)
     VALUES (?, ?, ?, ?, ?)`
  ).run(pluginName, hook, durationMs, success ? 1 : 0, errorMessage ?? null);
}

function getPluginAnalyticsSync(pluginName: string): PluginExecutionRow[] {
  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT plugin_name, hook, duration_ms, success, error_message, created_at
       FROM plugin_analytics
       WHERE plugin_name = ?
       ORDER BY created_at DESC`
    )
    .all(pluginName) as any[];
  return rows.map((r) => ({
    pluginName: r.plugin_name,
    hook: r.hook,
    durationMs: r.duration_ms,
    success: r.success === 1,
    errorMessage: r.error_message,
    createdAt: r.created_at,
  }));
}

function getPluginAnalyticsSummarySync(pluginName: string): PluginAnalyticsSummary {
  const db = getDbInstance();
  const row = db
    .prepare(
      `SELECT
         COUNT(*) AS total,
         SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) AS successes,
         SUM(CASE WHEN success = 0 THEN 1 ELSE 0 END) AS failures,
         AVG(duration_ms) AS avg_duration
       FROM plugin_analytics
       WHERE plugin_name = ?`
    )
    .get(pluginName) as any;
  return {
    totalCalls: row?.total ?? 0,
    successCount: row?.successes ?? 0,
    failureCount: row?.failures ?? 0,
    avgDurationMs: row?.avg_duration ?? 0,
  };
}

export const sqlitePluginRegistryRepository: PluginRegistryRepository = {
  async insert(input) {
    return insertPluginSync(input);
  },
  async findById(id) {
    return getPluginByIdSync(id);
  },
  async findByName(name) {
    return getPluginByNameSync(name);
  },
  async list(status) {
    return listPluginsSync(status);
  },
  async updateStatus(name, status, errorMessage) {
    return updatePluginStatusSync(name, status, errorMessage);
  },
  async updateManifest(name, manifest, hooks) {
    return updatePluginManifestSync(name, manifest, hooks);
  },
  async updateConfig(name, config) {
    return updatePluginConfigSync(name, config);
  },
  async deleteByName(name) {
    return deletePluginSync(name);
  },
  async exists(name) {
    return pluginExistsSync(name);
  },
};

export const sqlitePluginExecutionLogRepository: PluginExecutionLogRepository = {
  async record(pluginName, hook, durationMs, success, errorMessage) {
    recordPluginExecutionSync(pluginName, hook, durationMs, success, errorMessage);
  },
  async listForPlugin(pluginName) {
    return getPluginAnalyticsSync(pluginName);
  },
  async summarize(pluginName) {
    return getPluginAnalyticsSummarySync(pluginName);
  },
};

/**
 * SQLite-only synchronous access retained for the plugin manager, the plugin
 * routes, the model-validation fence and the MCP plugin tools, which all call
 * the registry synchronously today.
 */
export const sqlitePluginRegistryLegacySync = {
  insertPlugin: insertPluginSync,
  getPluginById: getPluginByIdSync,
  getPluginByName: getPluginByNameSync,
  listPlugins: listPluginsSync,
  updatePluginStatus: updatePluginStatusSync,
  updatePluginManifest: updatePluginManifestSync,
  updatePluginConfig: updatePluginConfigSync,
  deletePlugin: deletePluginSync,
  pluginExists: pluginExistsSync,
};

export const sqlitePluginExecutionLogLegacySync = {
  recordPluginExecution: recordPluginExecutionSync,
  getPluginAnalytics: getPluginAnalyticsSync,
  getPluginAnalyticsSummary: getPluginAnalyticsSummarySync,
};
