/**
 * SQLite implementation for playground_presets (migration 084).
 * All queries use db.prepare() (better-sqlite3) — never raw db.exec() or
 * string interpolation of input values.
 *
 * Async repository and SQLite-only legacy helpers share these private operations.
 * Resolve the database at call time so reset/restore never leaves a captured handle.
 */

import { randomUUID } from "node:crypto";
import type {
  CreatePlaygroundPresetInput,
  PlaygroundPresetPage,
  PlaygroundPresetRecord,
  PlaygroundPresetRepository,
  UpdatePlaygroundPresetInput,
} from "@/domain/persistence/playgroundPresetRepository";
import { getDbInstance } from "../core";

type PlaygroundPresetRow = {
  id: string;
  name: string;
  endpoint: string;
  model: string;
  system: string | null;
  params_json: string;
  created_at: string;
};

function rowToItem(row: PlaygroundPresetRow): PlaygroundPresetRecord {
  let params: Record<string, unknown> = {};
  try {
    const parsed = JSON.parse(row.params_json);
    if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
      params = parsed as Record<string, unknown>;
    }
  } catch {
    params = {};
  }
  return {
    id: row.id,
    name: row.name,
    endpoint: row.endpoint,
    model: row.model,
    system: row.system,
    params,
    created_at: row.created_at,
  };
}

/**
 * Returns all presets ordered by created_at descending (newest first).
 * Accepts optional limit/offset for pagination.
 */
function listPlaygroundPresets(options?: {
  limit?: number;
  offset?: number;
}): PlaygroundPresetPage {
  const db = getDbInstance();
  const limit = options?.limit;
  const offset = options?.offset ?? 0;
  let sql = "SELECT * FROM playground_presets ORDER BY created_at DESC";
  const params: unknown[] = [];
  if (limit !== undefined) {
    sql += " LIMIT ? OFFSET ?";
    params.push(limit, offset);
  }
  const rows = db.prepare(sql).all(...params) as PlaygroundPresetRow[];
  const totalRow = db.prepare("SELECT count(*) as cnt FROM playground_presets").get() as {
    cnt: number;
  };
  return { items: rows.map(rowToItem), total: totalRow.cnt };
}

/**
 * Returns a single preset by id, or null when not found.
 */
function getPlaygroundPreset(id: string): PlaygroundPresetRecord | null {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM playground_presets WHERE id = ? LIMIT 1").get(id) as
    PlaygroundPresetRow | undefined;
  if (!row) return null;
  return rowToItem(row);
}

/**
 * Creates a new preset. Generates a UUID v4 for the id.
 * Returns the persisted row via getPlaygroundPreset.
 */
function createPlaygroundPreset(input: CreatePlaygroundPresetInput): PlaygroundPresetRecord {
  const db = getDbInstance();
  const id = randomUUID();
  const params_json = JSON.stringify(input.params ?? {});
  const system = input.system ?? null;

  db.prepare(
    "INSERT INTO playground_presets (id, name, endpoint, model, system, params_json) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(id, input.name, input.endpoint, input.model, system, params_json);

  const created = getPlaygroundPreset(id);
  // created cannot be null here — we just inserted the row
  return created as PlaygroundPresetRecord;
}

/**
 * Updates only the supplied fields on an existing preset.
 * Returns the updated row, or null when the id does not exist.
 */
function updatePlaygroundPreset(
  id: string,
  patch: UpdatePlaygroundPresetInput
): PlaygroundPresetRecord | null {
  const db = getDbInstance();

  // Verify row exists before building the dynamic UPDATE
  const existing = getPlaygroundPreset(id);
  if (!existing) return null;

  const setClauses: string[] = [];
  const values: unknown[] = [];

  if (patch.name !== undefined) {
    setClauses.push("name = ?");
    values.push(patch.name);
  }
  if (patch.endpoint !== undefined) {
    setClauses.push("endpoint = ?");
    values.push(patch.endpoint);
  }
  if (patch.model !== undefined) {
    setClauses.push("model = ?");
    values.push(patch.model);
  }
  if ("system" in patch) {
    setClauses.push("system = ?");
    values.push(patch.system ?? null);
  }
  if (patch.params !== undefined) {
    setClauses.push("params_json = ?");
    values.push(JSON.stringify(patch.params));
  }

  if (setClauses.length === 0) {
    // Empty patch — return current row unchanged
    return existing;
  }

  values.push(id);
  db.prepare(`UPDATE playground_presets SET ${setClauses.join(", ")} WHERE id = ?`).run(...values);

  return getPlaygroundPreset(id);
}

/**
 * Deletes a preset by id.
 * Returns true when a row was deleted, false when the id did not exist.
 */
function deletePlaygroundPreset(id: string): boolean {
  const db = getDbInstance();
  const result = db.prepare("DELETE FROM playground_presets WHERE id = ?").run(id);
  return result.changes > 0;
}

export const sqlitePlaygroundPresetRepository: PlaygroundPresetRepository = {
  list: async (options) => listPlaygroundPresets(options),
  findById: async (id) => getPlaygroundPreset(id),
  create: async (input) => createPlaygroundPreset(input),
  update: async (id, patch) => updatePlaygroundPreset(id, patch),
  deleteById: async (id) => deletePlaygroundPreset(id),
};

/** Synchronous compatibility is SQLite-only, not part of the portable contract. */
export const sqlitePlaygroundPresetLegacySync = {
  listPlaygroundPresets,
  getPlaygroundPreset,
  createPlaygroundPreset,
  updatePlaygroundPreset,
  deletePlaygroundPreset,
};
