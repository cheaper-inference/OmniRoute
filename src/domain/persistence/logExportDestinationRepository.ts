export interface LogExportDestinationRow {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  config: Record<string, unknown>;
  batchSize: number;
  includeBodies: boolean;
  maxBodyBytes: number;
  maxRowsPerRun: number;
  cursorRowId: number;
  exportedTotal: number;
  lastRunAt: string | null;
  lastStatus: "success" | "failure" | null;
  lastError: string | null;
  createdAt: string;
  updatedAt: string;
}

/** The editable settings of one destination, every value resolved. */
export interface LogExportDestinationSettings {
  name: string;
  enabled: boolean;
  /** Secret keys are already ciphertext; encryption belongs to src/lib/logExport/secrets.ts. */
  config: Record<string, unknown>;
  batchSize: number;
  includeBodies: boolean;
  maxBodyBytes: number;
  maxRowsPerRun: number;
}

export interface NewLogExportDestination extends LogExportDestinationSettings {
  id: string;
  type: string;
  /** Used for both created_at and updated_at; cursor and exported total start at 0. */
  now: string;
}

/** Persistence only; the DB facade owns ids, timestamps, defaults and update merging. */
export interface LogExportDestinationRepository {
  /** Oldest first. */
  list(): Promise<LogExportDestinationRow[]>;
  /** Oldest first. */
  listEnabled(): Promise<LogExportDestinationRow[]>;
  findById(id: string): Promise<LogExportDestinationRow | null>;
  insert(destination: NewLogExportDestination): Promise<void>;
  /** Replaces every editable setting and stamps updated_at. */
  updateSettings(id: string, settings: LogExportDestinationSettings, now: string): Promise<void>;
  deleteById(id: string): Promise<boolean>;
  /** Sets the cursor and adds `exported` to the running total. */
  advanceCursor(id: string, cursorRowId: number, exported: number, now: string): Promise<void>;
  /** Sets the cursor without touching the running total. */
  resetCursor(id: string, cursorRowId: number, now: string): Promise<void>;
  recordRun(
    id: string,
    status: "success" | "failure",
    error: string | null,
    now: string
  ): Promise<void>;
}
