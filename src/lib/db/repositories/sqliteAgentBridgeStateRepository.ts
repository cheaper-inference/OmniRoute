/**
 * SQLite implementation for agent_bridge_state (migration 080).
 *
 * The async repository and the SQLite-only legacy helpers share these private
 * operations. SQL text and the read-then-write upsert are unchanged from the
 * original `agentBridgeState.ts`. Resolve the database at call time so
 * reset/restore never leaves a captured handle.
 */
import type {
  AgentBridgeStatePatch,
  AgentBridgeStateRepository,
  AgentBridgeStateRow,
} from "@/domain/persistence/agentBridgeRepositories";
import { getDbInstance } from "../core";

// SQLite stores booleans as 0/1 integers
interface AgentBridgeStateDbRow {
  agent_id: string;
  dns_enabled: number;
  cert_trusted: number;
  setup_completed: number;
  last_started_at: string | null;
  last_error: string | null;
}

function mapRow(row: AgentBridgeStateDbRow): AgentBridgeStateRow {
  return {
    agent_id: row.agent_id,
    dns_enabled: row.dns_enabled === 1,
    cert_trusted: row.cert_trusted === 1,
    setup_completed: row.setup_completed === 1,
    last_started_at: row.last_started_at,
    last_error: row.last_error,
  };
}

function listSync(): AgentBridgeStateRow[] {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT * FROM agent_bridge_state ORDER BY agent_id ASC")
    .all() as AgentBridgeStateDbRow[];
  return rows.map(mapRow);
}

function getSync(agentId: string): AgentBridgeStateRow | null {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM agent_bridge_state WHERE agent_id = ?").get(agentId) as
    AgentBridgeStateDbRow | undefined;
  return row ? mapRow(row) : null;
}

function upsertSync(row: AgentBridgeStatePatch): void {
  const db = getDbInstance();
  const existing = getSync(row.agent_id);

  if (!existing) {
    db.prepare(
      `INSERT INTO agent_bridge_state
         (agent_id, dns_enabled, cert_trusted, setup_completed, last_started_at, last_error)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(
      row.agent_id,
      row.dns_enabled !== undefined ? (row.dns_enabled ? 1 : 0) : 0,
      row.cert_trusted !== undefined ? (row.cert_trusted ? 1 : 0) : 0,
      row.setup_completed !== undefined ? (row.setup_completed ? 1 : 0) : 0,
      row.last_started_at ?? null,
      row.last_error ?? null
    );
  } else {
    const fields: string[] = [];
    const values: (string | number | null)[] = [];

    if (row.dns_enabled !== undefined) {
      fields.push("dns_enabled = ?");
      values.push(row.dns_enabled ? 1 : 0);
    }
    if (row.cert_trusted !== undefined) {
      fields.push("cert_trusted = ?");
      values.push(row.cert_trusted ? 1 : 0);
    }
    if (row.setup_completed !== undefined) {
      fields.push("setup_completed = ?");
      values.push(row.setup_completed ? 1 : 0);
    }
    if (row.last_started_at !== undefined) {
      fields.push("last_started_at = ?");
      values.push(row.last_started_at);
    }
    if (row.last_error !== undefined) {
      fields.push("last_error = ?");
      values.push(row.last_error);
    }

    if (fields.length === 0) return;

    values.push(row.agent_id);
    db.prepare(`UPDATE agent_bridge_state SET ${fields.join(", ")} WHERE agent_id = ?`).run(
      ...values
    );
  }
}

function setLastStartedSync(agentId: string, ts: string): void {
  const db = getDbInstance();
  db.prepare(
    `INSERT INTO agent_bridge_state (agent_id, last_started_at)
     VALUES (?, ?)
     ON CONFLICT(agent_id) DO UPDATE SET last_started_at = excluded.last_started_at`
  ).run(agentId, ts);
}

function setLastErrorSync(agentId: string, err: string | null): void {
  const db = getDbInstance();
  db.prepare(
    `INSERT INTO agent_bridge_state (agent_id, last_error)
     VALUES (?, ?)
     ON CONFLICT(agent_id) DO UPDATE SET last_error = excluded.last_error`
  ).run(agentId, err);
}

export const sqliteAgentBridgeStateRepository: AgentBridgeStateRepository = {
  async list() {
    return listSync();
  },
  async get(agentId) {
    return getSync(agentId);
  },
  async upsert(patch) {
    upsertSync(patch);
  },
  async setLastStarted(agentId, timestamp) {
    setLastStartedSync(agentId, timestamp);
  },
  async setLastError(agentId, error) {
    setLastErrorSync(agentId, error);
  },
};

/**
 * SQLite-only synchronous access retained for existing callers: the
 * agent-bridge routes, the MITM manager and DNS provisioning call these
 * synchronously.
 */
export const sqliteAgentBridgeStateLegacySync = {
  list: listSync,
  get: getSync,
  upsert: upsertSync,
  setLastStarted: setLastStartedSync,
  setLastError: setLastErrorSync,
};
