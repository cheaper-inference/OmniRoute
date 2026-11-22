/**
 * Log-export destination persistence (migration 170).
 *
 * snake_case in SQLite, camelCase in the returned objects. `config` is a JSON string
 * whose secret keys are already ciphertext when they reach this module — encryption
 * lives in src/lib/logExport/secrets.ts, next to the destination registry that knows
 * which keys are secret.
 *
 * Rows live behind LogExportDestinationRepository; this facade owns ids, timestamps,
 * create defaults and update merging, and keeps every export synchronous (SQLite-only
 * legacy access).
 */

import { randomUUID } from "node:crypto";
import type {
  LogExportDestinationRepository,
  LogExportDestinationRow,
} from "@/domain/persistence/logExportDestinationRepository";
import { webhookRepositories } from "./repositories/webhookRepositories";

export type { LogExportDestinationRow } from "@/domain/persistence/logExportDestinationRepository";

const legacy = webhookRepositories.legacySync.logExportDestinations;

/** Async persistence contract; it never fills defaults or timestamps on its own. */
export function getLogExportDestinationRepository(): LogExportDestinationRepository {
  return webhookRepositories.logExportDestinations;
}

export interface CreateLogExportDestinationInput {
  name: string;
  type: string;
  enabled?: boolean;
  config: Record<string, unknown>;
  batchSize?: number;
  includeBodies?: boolean;
  maxBodyBytes?: number;
  maxRowsPerRun?: number;
}

export interface UpdateLogExportDestinationInput {
  name?: string;
  enabled?: boolean;
  config?: Record<string, unknown>;
  batchSize?: number;
  includeBodies?: boolean;
  maxBodyBytes?: number;
  maxRowsPerRun?: number;
}

export function getLogExportDestinations(): LogExportDestinationRow[] {
  return legacy.list();
}

export function getEnabledLogExportDestinations(): LogExportDestinationRow[] {
  return legacy.listEnabled();
}

export function getLogExportDestination(id: string): LogExportDestinationRow | null {
  return legacy.findById(id);
}

export function createLogExportDestination(
  input: CreateLogExportDestinationInput
): LogExportDestinationRow {
  const now = new Date().toISOString();
  const id = randomUUID();
  legacy.insert({
    id,
    name: input.name,
    type: input.type,
    enabled: !!input.enabled,
    config: input.config ?? {},
    batchSize: input.batchSize ?? 500,
    includeBodies: !!input.includeBodies,
    maxBodyBytes: input.maxBodyBytes ?? 262_144,
    maxRowsPerRun: input.maxRowsPerRun ?? 10_000,
    now,
  });
  return getLogExportDestination(id) as LogExportDestinationRow;
}

export function updateLogExportDestination(
  id: string,
  input: UpdateLogExportDestinationInput
): LogExportDestinationRow | null {
  const existing = getLogExportDestination(id);
  if (!existing) return null;

  legacy.updateSettings(
    id,
    {
      name: input.name ?? existing.name,
      enabled: input.enabled ?? existing.enabled,
      config: input.config ?? existing.config,
      batchSize: input.batchSize ?? existing.batchSize,
      includeBodies: input.includeBodies ?? existing.includeBodies,
      maxBodyBytes: input.maxBodyBytes ?? existing.maxBodyBytes,
      maxRowsPerRun: input.maxRowsPerRun ?? existing.maxRowsPerRun,
    },
    new Date().toISOString()
  );
  return getLogExportDestination(id);
}

export function deleteLogExportDestination(id: string): boolean {
  return legacy.deleteById(id);
}

/** Advance the cursor after a batch is durably accepted by the destination. */
export function advanceLogExportCursor(id: string, cursorRowId: number, exported: number): void {
  legacy.advanceCursor(id, cursorRowId, exported, new Date().toISOString());
}

/**
 * Rewind the cursor. Used by the truncation guard: when `call_logs` has been purged
 * the surviving max(rowid) can be lower than the stored cursor, which would otherwise
 * make every future row invisible to the exporter.
 */
export function resetLogExportCursor(id: string, cursorRowId = 0): void {
  legacy.resetCursor(id, cursorRowId, new Date().toISOString());
}

export function recordLogExportRun(
  id: string,
  status: "success" | "failure",
  error: string | null
): void {
  legacy.recordRun(id, status, error, new Date().toISOString());
}
