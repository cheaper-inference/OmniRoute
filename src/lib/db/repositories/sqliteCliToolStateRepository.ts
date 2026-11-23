/**
 * SQLite implementation for CLI tool state in `key_value`
 * (namespaces `cliToolLastConfig` and `cliToolInitialConfig`).
 *
 * The async repository and the SQLite-only legacy helpers share these private
 * operations. SQL text, JSON encoding, the build-phase / cloud early returns
 * and the first-write-wins snapshot check are unchanged from the original
 * `cliToolState.ts`. Resolve the database at call time so reset/restore never
 * leaves a captured handle.
 */
import type {
  CliToolConfigSnapshot,
  CliToolStateRepository,
} from "@/domain/persistence/localToolStateRepositories";
import { getDbInstance, isBuildPhase, isCloud } from "../core";

const LAST_CONFIG_NAMESPACE = "cliToolLastConfig";
const INITIAL_CONFIG_NAMESPACE = "cliToolInitialConfig";

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes?: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
}

interface KeyValueRow {
  key: string;
  value: string;
}

function db(): DbLike {
  return getDbInstance() as unknown as DbLike;
}

function parseJsonValue(raw: string): unknown {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

function toRecord(value: unknown): CliToolConfigSnapshot | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as CliToolConfigSnapshot)
    : null;
}

function saveLastConfiguredSync(toolId: string, timestamp: string): void {
  if (isBuildPhase || isCloud) return;
  db()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(LAST_CONFIG_NAMESPACE, toolId, JSON.stringify(timestamp));
}

function getLastConfiguredSync(toolId: string): string | null {
  if (isBuildPhase || isCloud) return null;
  const row = db()
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(LAST_CONFIG_NAMESPACE, toolId);
  if (!row) return null;
  const parsed = parseJsonValue((row as KeyValueRow).value);
  return typeof parsed === "string" ? parsed : null;
}

function listLastConfiguredSync(): Record<string, string> {
  if (isBuildPhase || isCloud) return {};
  const rows = db()
    .prepare("SELECT key, value FROM key_value WHERE namespace = ?")
    .all(LAST_CONFIG_NAMESPACE) as KeyValueRow[];
  const result: Record<string, string> = {};
  for (const row of rows) {
    const parsed = parseJsonValue(row.value);
    if (typeof parsed === "string") {
      result[row.key] = parsed;
    }
  }
  return result;
}

function deleteLastConfiguredSync(toolId: string): void {
  if (isBuildPhase || isCloud) return;
  db()
    .prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?")
    .run(LAST_CONFIG_NAMESPACE, toolId);
}

function saveInitialConfigSync(toolId: string, config: CliToolConfigSnapshot): boolean {
  if (isBuildPhase || isCloud) return false;
  const database = db();
  // Only save if not already stored
  const existing = database
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(INITIAL_CONFIG_NAMESPACE, toolId);
  if (existing) return false;

  database
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(INITIAL_CONFIG_NAMESPACE, toolId, JSON.stringify(config));
  return true;
}

function getInitialConfigSync(toolId: string): CliToolConfigSnapshot | null {
  if (isBuildPhase || isCloud) return null;
  const row = db()
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(INITIAL_CONFIG_NAMESPACE, toolId);
  if (!row) return null;
  const parsed = parseJsonValue((row as KeyValueRow).value);
  return toRecord(parsed);
}

function deleteInitialConfigSync(toolId: string): void {
  if (isBuildPhase || isCloud) return;
  db()
    .prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?")
    .run(INITIAL_CONFIG_NAMESPACE, toolId);
}

export const sqliteCliToolStateRepository: CliToolStateRepository = {
  async getLastConfigured(toolId) {
    return getLastConfiguredSync(toolId);
  },
  async listLastConfigured() {
    return listLastConfiguredSync();
  },
  async saveLastConfigured(toolId, timestamp) {
    saveLastConfiguredSync(toolId, timestamp);
  },
  async deleteLastConfigured(toolId) {
    deleteLastConfiguredSync(toolId);
  },
  async saveInitialConfig(toolId, config) {
    return saveInitialConfigSync(toolId, config);
  },
  async getInitialConfig(toolId) {
    return getInitialConfigSync(toolId);
  },
  async deleteInitialConfig(toolId) {
    deleteInitialConfigSync(toolId);
  },
};

/**
 * SQLite-only synchronous access retained for existing callers: the cli-tools
 * settings and status routes call these synchronously.
 */
export const sqliteCliToolStateLegacySync = {
  getLastConfigured: getLastConfiguredSync,
  listLastConfigured: listLastConfiguredSync,
  saveLastConfigured: saveLastConfiguredSync,
  deleteLastConfigured: deleteLastConfiguredSync,
  saveInitialConfig: saveInitialConfigSync,
  getInitialConfig: getInitialConfigSync,
  deleteInitialConfig: deleteInitialConfigSync,
};
