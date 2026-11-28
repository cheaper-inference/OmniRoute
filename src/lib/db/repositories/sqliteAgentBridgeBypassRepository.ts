/**
 * SQLite implementation for agent_bridge_bypass (migration 080).
 *
 * The async repository and the SQLite-only legacy helpers share these private
 * operations. SQL text and both transactions are unchanged from the original
 * `agentBridgeBypass.ts`. Resolve the database at call time so reset/restore
 * never leaves a captured handle.
 */
import type {
  AgentBridgeBypassRepository,
  AgentBridgeBypassRow,
} from "@/domain/persistence/agentBridgeRepositories";
import { getDbInstance } from "../core";

// SQLite rows have source as plain string
interface AgentBridgeBypassDbRow {
  pattern: string;
  source: string;
  created_at: string;
}

function mapRow(row: AgentBridgeBypassDbRow): AgentBridgeBypassRow {
  return {
    pattern: row.pattern,
    source: row.source as "default" | "user",
    created_at: row.created_at,
  };
}

function listAllSync(): AgentBridgeBypassRow[] {
  const db = getDbInstance();
  const rows = db
    .prepare(
      "SELECT pattern, source, created_at FROM agent_bridge_bypass ORDER BY source ASC, pattern ASC"
    )
    .all() as AgentBridgeBypassDbRow[];
  return rows.map(mapRow);
}

function listUserPatternsSync(): string[] {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT pattern FROM agent_bridge_bypass WHERE source = 'user' ORDER BY pattern ASC")
    .all() as Array<{ pattern: string }>;
  return rows.map((r) => r.pattern);
}

function replaceUserPatternsSync(patterns: string[]): void {
  const db = getDbInstance();
  const now = new Date().toISOString();

  const deleteUserStmt = db.prepare("DELETE FROM agent_bridge_bypass WHERE source = 'user'");
  const insertStmt = db.prepare(
    `INSERT INTO agent_bridge_bypass (pattern, source, created_at) VALUES (?, 'user', ?)`
  );

  const runTransaction = db.transaction(() => {
    deleteUserStmt.run();
    for (const pattern of patterns) {
      insertStmt.run(pattern, now);
    }
  });

  runTransaction();
}

function seedDefaultsSync(defaults: string[]): void {
  const db = getDbInstance();
  const now = new Date().toISOString();

  const insertIfMissing = db.prepare(
    `INSERT OR IGNORE INTO agent_bridge_bypass (pattern, source, created_at) VALUES (?, 'default', ?)`
  );

  const runTransaction = db.transaction(() => {
    for (const pattern of defaults) {
      insertIfMissing.run(pattern, now);
    }
  });

  runTransaction();
}

export const sqliteAgentBridgeBypassRepository: AgentBridgeBypassRepository = {
  async listAll() {
    return listAllSync();
  },
  async listUserPatterns() {
    return listUserPatternsSync();
  },
  async replaceUserPatterns(patterns) {
    replaceUserPatternsSync(patterns);
  },
  async seedDefaults(defaults) {
    seedDefaultsSync(defaults);
  },
};

/**
 * SQLite-only synchronous access retained for existing callers: the
 * agent-bridge routes, the MITM manager and inspector config import/export call
 * these synchronously.
 */
export const sqliteAgentBridgeBypassLegacySync = {
  listAll: listAllSync,
  listUserPatterns: listUserPatternsSync,
  replaceUserPatterns: replaceUserPatternsSync,
  seedDefaults: seedDefaultsSync,
};
