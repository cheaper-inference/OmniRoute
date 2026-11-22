/**
 * SQLite implementation for radar_local_model_state (migration 153).
 *
 * The async repository and the SQLite-only legacy helpers share these private
 * operations. Read-modify-write updates run inside one SQLite transaction.
 * Resolve the database at call time so reset/restore never leaves a captured handle.
 */
import type {
  RadarLocalMergeState,
  RadarLocalModelOverridePatch,
  RadarLocalModelState,
  RadarLocalModelStateRepository,
  RadarModelIdentity,
} from "@/domain/persistence/radarLocalModelStateRepository";
import {
  normalizeRadarIdentity,
  normalizeRadarOverridePatch,
  toRadarLocalMergeState,
} from "@/domain/persistence/radarLocalModelStateRepository";
import { getDbInstance } from "../core";

interface RadarLocalModelStateRow {
  provider: string;
  model_id: string;
  display_name: string | null;
  enabled: number | null;
  tombstoned: number;
  updated_at: string;
}

function rowToState(row: RadarLocalModelStateRow): RadarLocalModelState {
  return {
    provider: row.provider,
    modelId: row.model_id,
    displayName: row.display_name,
    enabled: row.enabled === null ? null : row.enabled === 1,
    tombstoned: row.tombstoned === 1,
    updatedAt: row.updated_at,
  };
}

function readRow(identity: RadarModelIdentity): RadarLocalModelStateRow | null {
  return (
    (getDbInstance()
      .prepare(
        `SELECT provider, model_id, display_name, enabled, tombstoned, updated_at
         FROM radar_local_model_state WHERE provider = ? AND model_id = ?`
      )
      .get(identity.provider, identity.modelId) as RadarLocalModelStateRow | undefined) ?? null
  );
}

function rowEnabled(row: RadarLocalModelStateRow | null): boolean | null {
  return row?.enabled === null || row?.enabled === undefined ? null : row.enabled === 1;
}

function persist(input: {
  provider: string;
  modelId: string;
  displayName: string | null;
  enabled: boolean | null;
  tombstoned: boolean;
}): void {
  const db = getDbInstance();
  if (input.displayName === null && input.enabled === null && !input.tombstoned) {
    db.prepare("DELETE FROM radar_local_model_state WHERE provider = ? AND model_id = ?").run(
      input.provider,
      input.modelId
    );
    return;
  }

  db.prepare(
    `INSERT INTO radar_local_model_state
       (provider, model_id, display_name, enabled, tombstoned, updated_at)
     VALUES (?, ?, ?, ?, ?, datetime('now'))
     ON CONFLICT(provider, model_id) DO UPDATE SET
       display_name = excluded.display_name,
       enabled = excluded.enabled,
       tombstoned = excluded.tombstoned,
       updated_at = excluded.updated_at`
  ).run(
    input.provider,
    input.modelId,
    input.displayName,
    input.enabled === null ? null : input.enabled ? 1 : 0,
    input.tombstoned ? 1 : 0
  );
}

function listSync(): RadarLocalModelState[] {
  const rows = getDbInstance()
    .prepare(
      `SELECT provider, model_id, display_name, enabled, tombstoned, updated_at
       FROM radar_local_model_state ORDER BY provider, model_id`
    )
    .all() as RadarLocalModelStateRow[];
  return rows.map(rowToState);
}

function setOverrideSync(
  provider: unknown,
  modelId: unknown,
  patch: RadarLocalModelOverridePatch
): boolean {
  const identity = normalizeRadarIdentity(provider, modelId);
  if (!identity) return false;
  const normalized = normalizeRadarOverridePatch(patch);
  if (!normalized) return false;

  getDbInstance().transaction(() => {
    const current = readRow(identity);
    persist({
      ...identity,
      displayName: Object.hasOwn(normalized, "displayName")
        ? (normalized.displayName ?? null)
        : (current?.display_name ?? null),
      enabled: Object.hasOwn(normalized, "enabled")
        ? (normalized.enabled ?? null)
        : rowEnabled(current),
      tombstoned: current?.tombstoned === 1,
    });
  })();
  return true;
}

function clearOverrideSync(provider: unknown, modelId: unknown): boolean {
  const identity = normalizeRadarIdentity(provider, modelId);
  if (!identity) return false;

  getDbInstance().transaction(() => {
    const current = readRow(identity);
    persist({
      ...identity,
      displayName: null,
      enabled: null,
      tombstoned: current?.tombstoned === 1,
    });
  })();
  return true;
}

function setTombstoneSync(provider: unknown, modelId: unknown, tombstoned: boolean): boolean {
  const identity = normalizeRadarIdentity(provider, modelId);
  if (!identity || typeof tombstoned !== "boolean") return false;

  getDbInstance().transaction(() => {
    const current = readRow(identity);
    persist({
      ...identity,
      displayName: current?.display_name ?? null,
      enabled: rowEnabled(current),
      tombstoned,
    });
  })();
  return true;
}

function getMergeStateSync(): RadarLocalMergeState {
  return toRadarLocalMergeState(listSync());
}

export const sqliteRadarLocalModelStateRepository: RadarLocalModelStateRepository = {
  async list() {
    return listSync();
  },
  async setOverride(provider, modelId, patch) {
    return setOverrideSync(provider, modelId, patch);
  },
  async clearOverride(provider, modelId) {
    return clearOverrideSync(provider, modelId);
  },
  async setTombstone(provider, modelId, tombstoned) {
    return setTombstoneSync(provider, modelId, tombstoned);
  },
  async getMergeState() {
    return getMergeStateSync();
  },
};

/**
 * SQLite-only synchronous access retained for existing callers: the management
 * route and the Radar catalog merge, which runs synchronously per catalog request.
 */
export const sqliteRadarLocalModelStateLegacySync = {
  list: listSync,
  setOverride: setOverrideSync,
  clearOverride: clearOverrideSync,
  setTombstone: setTombstoneSync,
  getMergeState: getMergeStateSync,
};
