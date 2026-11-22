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

function insertStateSync(db: ReturnType<typeof getDbInstance>, row: AgentBridgeStatePatch): void {
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
}

const BOOL_UPDATE_COLUMNS: ReadonlyArray<
  readonly [
    keyof Pick<AgentBridgeStatePatch, "dns_enabled" | "cert_trusted" | "setup_completed">,
    string,
  ]
> = [
  ["dns_enabled", "dns_enabled = ?"],
  ["cert_trusted", "cert_trusted = ?"],
  ["setup_completed", "setup_completed = ?"],
];

const TEXT_UPDATE_COLUMNS: ReadonlyArray<
  readonly [keyof Pick<AgentBridgeStatePatch, "last_started_at" | "last_error">, string]
> = [
  ["last_started_at", "last_started_at = ?"],
  ["last_error", "last_error = ?"],
];

function updateStateSync(db: ReturnType<typeof getDbInstance>, row: AgentBridgeStatePatch): void {
  const fields: string[] = [];
  const values: (string | number | null)[] = [];

  for (const [key, clause] of BOOL_UPDATE_COLUMNS) {
    const value = row[key];
    if (value !== undefined) {
      fields.push(clause);
      values.push(value ? 1 : 0);
    }
  }
  for (const [key, clause] of TEXT_UPDATE_COLUMNS) {
    const value = row[key];
    if (value !== undefined) {
      fields.push(clause);
      values.push(value);
    }
  }

  if (fields.length === 0) return;

  values.push(row.agent_id);
  db.prepare(`UPDATE agent_bridge_state SET ${fields.join(", ")} WHERE agent_id = ?`).run(
    ...values
  );
}

function upsertSync(row: AgentBridgeStatePatch): void {
  const db = getDbInstance();
  const existing = getSync(row.agent_id);

  if (!existing) {
    insertStateSync(db, row);
  } else {
    updateStateSync(db, row);
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
