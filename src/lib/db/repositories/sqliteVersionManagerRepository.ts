/**
 * SQLite implementation for the `version_manager` table (migrations 017, 071, 137).
 *
 * The async repository and the SQLite-only legacy helpers share these private
 * operations. SQL text, the camelCase → snake_case column mapping, the updatable
 * column list and the row decoding defaults are unchanged from the original
 * `versionManager.ts`. Resolve the database at call time so reset/restore never
 * leaves a captured handle.
 */
import type {
  VersionManagerRepository,
  VersionManagerTool,
  VersionManagerToolChanges,
  VersionManagerToolUpsert,
  VersionManagerVersionColumn,
} from "@/domain/persistence/versionManagerRepository";
import { getDbInstance } from "../core";

interface VersionManagerRow {
  id?: unknown;
  tool?: unknown;
  current_version?: unknown;
  installed_version?: unknown;
  pinned_version?: unknown;
  binary_path?: unknown;
  status?: unknown;
  pid?: unknown;
  port?: unknown;
  api_key?: unknown;
  management_key?: unknown;
  auto_update?: unknown;
  auto_start?: unknown;
  auto_restart_adopted?: unknown;
  last_health_check?: unknown;
  last_update_check?: unknown;
  health_status?: unknown;
  config_overrides?: unknown;
  error_message?: unknown;
  created_at?: unknown;
  updated_at?: unknown;
  logs_buffer_path?: unknown;
  provider_expose?: unknown;
  last_sync_at?: unknown;
}

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function parseConfigOverrides(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "string" || value.trim() === "") return null;
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === "object" && parsed !== null ? parsed : null;
  } catch {
    return null;
  }
}

function stringifyConfigOverrides(value: Record<string, unknown> | null): string | null {
  if (value === null) return null;
  try {
    return JSON.stringify(value);
  } catch {
    return null;
  }
}

/** Text column: only strings survive, everything else (null included) decodes to null. */
function textOrNull(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

/** SQLite stores the flags as 0/1; legacy rows may also hold true or "1". */
function isTruthyFlag(value: unknown): boolean {
  return value === 1 || value === true || value === "1";
}

function rowToVersionManager(row: VersionManagerRow): VersionManagerTool {
  const record = toRecord(row);
  return {
    id: typeof record.id === "number" ? record.id : 0,
    tool: typeof record.tool === "string" ? record.tool : "",
    currentVersion: textOrNull(record.current_version),
    installedVersion: textOrNull(record.installed_version),
    pinnedVersion: textOrNull(record.pinned_version),
    binaryPath: textOrNull(record.binary_path),
    status: typeof record.status === "string" ? record.status : "not_installed",
    pid: typeof record.pid === "number" ? record.pid : null,
    port: typeof record.port === "number" ? record.port : 8317,
    apiKey: textOrNull(record.api_key),
    managementKey: textOrNull(record.management_key),
    autoUpdate: isTruthyFlag(record.auto_update),
    autoStart: isTruthyFlag(record.auto_start),
    autoRestartAdopted: isTruthyFlag(record.auto_restart_adopted),
    lastHealthCheck: textOrNull(record.last_health_check),
    lastUpdateCheck: textOrNull(record.last_update_check),
    healthStatus: typeof record.health_status === "string" ? record.health_status : "unknown",
    configOverrides: parseConfigOverrides(record.config_overrides),
    errorMessage: textOrNull(record.error_message),
    createdAt: typeof record.created_at === "string" ? record.created_at : "",
    updatedAt: typeof record.updated_at === "string" ? record.updated_at : "",
    logsBufferPath: textOrNull(record.logs_buffer_path),
    providerExpose: isTruthyFlag(record.provider_expose),
    lastSyncAt: textOrNull(record.last_sync_at),
  };
}

function listSync(): VersionManagerTool[] {
  const db = getDbInstance();
  const rows = db.prepare("SELECT * FROM version_manager").all() as VersionManagerRow[];
  return rows.map(rowToVersionManager);
}

function findByToolSync(tool: string): VersionManagerTool | null {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM version_manager WHERE tool = ?").get(tool) as
    VersionManagerRow | undefined;
  if (!row) return null;
  return rowToVersionManager(row);
}

function upsertSync(data: VersionManagerToolUpsert): void {
  const db = getDbInstance();
  db.prepare(
    `
    INSERT INTO version_manager (
      tool, current_version, installed_version, pinned_version, binary_path,
      status, pid, port, api_key, management_key, auto_update, auto_start,
      health_status, config_overrides, error_message, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    ON CONFLICT(tool) DO UPDATE SET
      current_version = excluded.current_version,
      installed_version = excluded.installed_version,
      pinned_version = excluded.pinned_version,
      binary_path = excluded.binary_path,
      status = excluded.status,
      pid = excluded.pid,
      port = excluded.port,
      api_key = excluded.api_key,
      management_key = excluded.management_key,
      auto_update = excluded.auto_update,
      auto_start = excluded.auto_start,
      health_status = excluded.health_status,
      config_overrides = excluded.config_overrides,
      error_message = excluded.error_message,
      updated_at = datetime('now')
  `
  ).run(
    data.tool,
    data.currentVersion,
    data.installedVersion,
    data.pinnedVersion,
    data.binaryPath,
    data.status,
    data.pid,
    data.port,
    data.apiKey,
    data.managementKey,
    data.autoUpdate ? 1 : 0,
    data.autoStart ? 1 : 0,
    data.healthStatus,
    stringifyConfigOverrides(data.configOverrides),
    data.errorMessage
  );
}

const ALLOWED_COLUMNS = new Set([
  "currentVersion",
  "installedVersion",
  "pinnedVersion",
  "binaryPath",
  "status",
  "pid",
  "port",
  "apiKey",
  "managementKey",
  "autoUpdate",
  "autoStart",
  "autoRestartAdopted",
  "healthStatus",
  "configOverrides",
  "errorMessage",
  "logsBufferPath",
  "providerExpose",
  "lastSyncAt",
]);

const BOOLEAN_COLUMNS = new Set([
  "autoUpdate",
  "autoStart",
  "autoRestartAdopted",
  "providerExpose",
]);

function updateSync(tool: string, updates: VersionManagerToolChanges): void {
  const db = getDbInstance();
  const sets: string[] = ["updated_at = datetime('now')"];
  const params: Record<string, unknown> = { tool };

  for (const [key, value] of Object.entries(updates)) {
    if (!ALLOWED_COLUMNS.has(key)) continue;
    const dbKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();

    if (key === "configOverrides") {
      sets.push("config_overrides = @configOverrides");
      params.configOverrides = stringifyConfigOverrides(value as Record<string, unknown> | null);
    } else if (BOOLEAN_COLUMNS.has(key)) {
      sets.push(`${dbKey} = @${key}`);
      params[key] = value === true ? 1 : 0;
    } else if (value === null) {
      sets.push(`${dbKey} = null`);
    } else {
      sets.push(`${dbKey} = @${key}`);
      params[key] = value;
    }
  }

  db.prepare(`UPDATE version_manager SET ${sets.join(", ")} WHERE tool = @tool`).run(params);
}

function deleteByToolSync(tool: string): boolean {
  const db = getDbInstance();
  const result = db.prepare("DELETE FROM version_manager WHERE tool = ?").run(tool);
  return result.changes > 0;
}

function setHealthSync(tool: string, healthStatus: string): boolean {
  const db = getDbInstance();
  const result = db
    .prepare(
      "UPDATE version_manager SET health_status = ?, last_health_check = datetime('now') WHERE tool = ?"
    )
    .run(healthStatus, tool);
  return result.changes > 0;
}

function setVersionSync(
  tool: string,
  field: VersionManagerVersionColumn,
  version: string
): boolean {
  const db = getDbInstance();
  const result = db
    .prepare(`UPDATE version_manager SET ${field} = ?, updated_at = datetime('now') WHERE tool = ?`)
    .run(version, tool);
  return result.changes > 0;
}

function setStatusSync(tool: string, status: string, pid?: number, errorMessage?: string): boolean {
  const db = getDbInstance();
  const result = db
    .prepare(
      pid !== undefined
        ? "UPDATE version_manager SET status = ?, pid = ?, error_message = ?, updated_at = datetime('now') WHERE tool = ?"
        : "UPDATE version_manager SET status = ?, error_message = ?, updated_at = datetime('now') WHERE tool = ?"
    )
    .run(
      ...(pid !== undefined
        ? [status, pid, errorMessage ?? null, tool]
        : [status, errorMessage ?? null, tool])
    );
  return result.changes > 0;
}

export const sqliteVersionManagerRepository: VersionManagerRepository = {
  async list() {
    return listSync();
  },
  async findByTool(tool) {
    return findByToolSync(tool);
  },
  async upsert(row) {
    upsertSync(row);
  },
  async update(tool, changes) {
    updateSync(tool, changes);
  },
  async deleteByTool(tool) {
    return deleteByToolSync(tool);
  },
  async setHealth(tool, healthStatus) {
    return setHealthSync(tool, healthStatus);
  },
  async setVersion(tool, column, version) {
    return setVersionSync(tool, column, version);
  },
  async setStatus(tool, status, pid, errorMessage) {
    return setStatusSync(tool, status, pid, errorMessage);
  },
};

/**
 * SQLite-only synchronous access for the `versionManager.ts` facade. The facade
 * exports are already async, but they run each statement in the caller's turn and
 * await only where the original code awaited (the read-back after a write), so the
 * supervisor, health monitor and service routes observe the same interleaving.
 */
export const sqliteVersionManagerLegacySync = {
  list: listSync,
  findByTool: findByToolSync,
  upsert: upsertSync,
  update: updateSync,
  deleteByTool: deleteByToolSync,
  setHealth: setHealthSync,
  setVersion: setVersionSync,
  setStatus: setStatusSync,
};
