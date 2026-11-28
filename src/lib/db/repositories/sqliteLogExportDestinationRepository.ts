/**
 * SQLite implementation for log_export_destinations (migration 170).
 *
 * snake_case in SQLite, camelCase in the returned objects. `config` is a JSON string whose
 * secret keys are already ciphertext when they reach this module.
 *
 * Async repository and SQLite-only legacy helpers share these private operations.
 * Resolve the database at call time so reset/restore never leaves a captured handle.
 */

import type {
  LogExportDestinationRepository,
  LogExportDestinationRow,
  LogExportDestinationSettings,
  NewLogExportDestination,
} from "@/domain/persistence/logExportDestinationRepository";
import { getDbInstance } from "../core";

function mapRow(row: any): LogExportDestinationRow {
  let config: Record<string, unknown> = {};
  if (row.config) {
    try {
      const parsed = JSON.parse(row.config);
      if (parsed && typeof parsed === "object") config = parsed as Record<string, unknown>;
    } catch {
      config = {};
    }
  }
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    enabled: row.enabled === 1,
    config,
    batchSize: row.batch_size,
    includeBodies: row.include_bodies === 1,
    maxBodyBytes: row.max_body_bytes ?? 262_144,
    maxRowsPerRun: row.max_rows_per_run,
    cursorRowId: row.cursor_row_id ?? 0,
    exportedTotal: row.exported_total ?? 0,
    lastRunAt: row.last_run_at ?? null,
    lastStatus: row.last_status ?? null,
    lastError: row.last_error ?? null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function listDestinations(): LogExportDestinationRow[] {
  const db = getDbInstance();
  const rows = db.prepare("SELECT * FROM log_export_destinations ORDER BY created_at ASC").all();
  return rows.map(mapRow);
}

function listEnabledDestinations(): LogExportDestinationRow[] {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT * FROM log_export_destinations WHERE enabled = 1 ORDER BY created_at ASC")
    .all();
  return rows.map(mapRow);
}

function findDestination(id: string): LogExportDestinationRow | null {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM log_export_destinations WHERE id = ?").get(id);
  return row ? mapRow(row) : null;
}

function insertDestination(destination: NewLogExportDestination): void {
  const db = getDbInstance();
  db.prepare(
    `INSERT INTO log_export_destinations
       (id, name, type, enabled, config, batch_size, include_bodies, max_body_bytes,
        max_rows_per_run, cursor_row_id, exported_total, created_at, updated_at)
     VALUES (@id, @name, @type, @enabled, @config, @batchSize, @includeBodies, @maxBodyBytes,
             @maxRowsPerRun, 0, 0, @now, @now)`
  ).run({
    id: destination.id,
    name: destination.name,
    type: destination.type,
    enabled: destination.enabled ? 1 : 0,
    config: JSON.stringify(destination.config),
    batchSize: destination.batchSize,
    includeBodies: destination.includeBodies ? 1 : 0,
    maxBodyBytes: destination.maxBodyBytes,
    maxRowsPerRun: destination.maxRowsPerRun,
    now: destination.now,
  });
}

function updateDestinationSettings(
  id: string,
  settings: LogExportDestinationSettings,
  now: string
): void {
  const db = getDbInstance();
  db.prepare(
    `UPDATE log_export_destinations
        SET name = @name,
            enabled = @enabled,
            config = @config,
            batch_size = @batchSize,
            include_bodies = @includeBodies,
            max_body_bytes = @maxBodyBytes,
            max_rows_per_run = @maxRowsPerRun,
            updated_at = @now
      WHERE id = @id`
  ).run({
    id,
    name: settings.name,
    enabled: settings.enabled ? 1 : 0,
    config: JSON.stringify(settings.config),
    batchSize: settings.batchSize,
    includeBodies: settings.includeBodies ? 1 : 0,
    maxBodyBytes: settings.maxBodyBytes,
    maxRowsPerRun: settings.maxRowsPerRun,
    now,
  });
}

function deleteDestination(id: string): boolean {
  const db = getDbInstance();
  const result = db.prepare("DELETE FROM log_export_destinations WHERE id = ?").run(id);
  return result.changes > 0;
}

function advanceCursor(id: string, cursorRowId: number, exported: number, now: string): void {
  const db = getDbInstance();
  db.prepare(
    `UPDATE log_export_destinations
        SET cursor_row_id = @cursorRowId,
            exported_total = exported_total + @exported,
            updated_at = @now
      WHERE id = @id`
  ).run({ id, cursorRowId, exported, now });
}

function resetCursor(id: string, cursorRowId: number, now: string): void {
  const db = getDbInstance();
  db.prepare(
    `UPDATE log_export_destinations
        SET cursor_row_id = @cursorRowId, updated_at = @now
      WHERE id = @id`
  ).run({ id, cursorRowId, now });
}

function recordRun(
  id: string,
  status: "success" | "failure",
  error: string | null,
  now: string
): void {
  const db = getDbInstance();
  db.prepare(
    `UPDATE log_export_destinations
        SET last_run_at = @now, last_status = @status, last_error = @error, updated_at = @now
      WHERE id = @id`
  ).run({ id, status, error, now });
}

export const sqliteLogExportDestinationRepository: LogExportDestinationRepository = {
  list: async () => listDestinations(),
  listEnabled: async () => listEnabledDestinations(),
  findById: async (id) => findDestination(id),
  insert: async (destination) => insertDestination(destination),
  updateSettings: async (id, settings, now) => updateDestinationSettings(id, settings, now),
  deleteById: async (id) => deleteDestination(id),
  advanceCursor: async (id, cursorRowId, exported, now) =>
    advanceCursor(id, cursorRowId, exported, now),
  resetCursor: async (id, cursorRowId, now) => resetCursor(id, cursorRowId, now),
  recordRun: async (id, status, error, now) => recordRun(id, status, error, now),
};

/**
 * Synchronous compatibility is SQLite-only, not part of the portable contract: the
 * management routes and the export runner call the DB facade without awaiting.
 */
export const sqliteLogExportDestinationLegacySync = {
  list: listDestinations,
  listEnabled: listEnabledDestinations,
  findById: findDestination,
  insert: insertDestination,
  updateSettings: updateDestinationSettings,
  deleteById: deleteDestination,
  advanceCursor,
  resetCursor,
  recordRun,
};
