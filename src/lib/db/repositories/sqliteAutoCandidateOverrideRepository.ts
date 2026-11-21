/**
 * SQLite implementation for auto_candidate_overrides (migration 128).
 * Resolve the database at call time so reset/restore never leaves a captured handle.
 */
import { randomUUID } from "node:crypto";
import type {
  AutoCandidateOverride,
  AutoCandidateOverrideRepository,
} from "@/domain/persistence/modelOverrideRepositories";
import { getDbInstance } from "../core";

type OverrideRow = {
  id: string;
  api_key_id: string;
  auto_channel: string;
  connection_id: string;
  excluded: number;
  created_at: string;
};

function rowToOverride(row: OverrideRow): AutoCandidateOverride {
  return {
    id: row.id,
    apiKeyId: row.api_key_id,
    autoChannel: row.auto_channel,
    connectionId: row.connection_id,
    excluded: row.excluded === 1,
    createdAt: row.created_at,
  };
}

async function listExcludedConnectionIds(
  apiKeyId: string,
  autoChannel: string
): Promise<Set<string>> {
  if (!apiKeyId || !autoChannel) return new Set();
  const rows = getDbInstance()
    .prepare(
      `SELECT connection_id FROM auto_candidate_overrides
       WHERE api_key_id = ? AND auto_channel = ? AND excluded = 1`
    )
    .all(apiKeyId, autoChannel) as Array<{ connection_id: string }>;
  return new Set(rows.map((row) => row.connection_id));
}

async function setExcluded(
  apiKeyId: string,
  autoChannel: string,
  connectionId: string,
  excluded: boolean
): Promise<AutoCandidateOverride> {
  const db = getDbInstance();
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  db.prepare(
    `INSERT INTO auto_candidate_overrides
       (id, api_key_id, auto_channel, connection_id, excluded, created_at)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(api_key_id, auto_channel, connection_id)
     DO UPDATE SET excluded = excluded.excluded`
  ).run(id, apiKeyId, autoChannel, connectionId, excluded ? 1 : 0, createdAt);

  const row = db
    .prepare(
      `SELECT id, api_key_id, auto_channel, connection_id, excluded, created_at
       FROM auto_candidate_overrides
       WHERE api_key_id = ? AND auto_channel = ? AND connection_id = ?`
    )
    .get(apiKeyId, autoChannel, connectionId) as OverrideRow;
  return rowToOverride(row);
}

async function list(apiKeyId: string, autoChannel: string): Promise<AutoCandidateOverride[]> {
  if (!apiKeyId || !autoChannel) return [];
  const rows = getDbInstance()
    .prepare(
      `SELECT id, api_key_id, auto_channel, connection_id, excluded, created_at
       FROM auto_candidate_overrides
       WHERE api_key_id = ? AND auto_channel = ?
       ORDER BY created_at ASC`
    )
    .all(apiKeyId, autoChannel) as OverrideRow[];
  return rows.map(rowToOverride);
}

export const sqliteAutoCandidateOverrideRepository: AutoCandidateOverrideRepository = {
  listExcludedConnectionIds,
  setExcluded,
  list,
};
