/**
 * Persistence contract for the `version_manager` table: one row per managed CLI
 * binary or embedded service (cliproxy, 9router, bifrost, dario, mux, ...).
 */

export interface VersionManagerTool {
  id: number;
  tool: string;
  currentVersion: string | null;
  installedVersion: string | null;
  pinnedVersion: string | null;
  binaryPath: string | null;
  status: string;
  pid: number | null;
  port: number;
  apiKey: string | null;
  managementKey: string | null;
  autoUpdate: boolean;
  autoStart: boolean;
  /**
   * When true, an adopted (unsupervised, pre-existing) process is
   * immediately killed and replaced with a fresh spawn this supervisor
   * actually owns — trading a brief restart for working log capture.
   * Defaults off: adoption alone is already the safe, non-disruptive choice.
   */
  autoRestartAdopted: boolean;
  lastHealthCheck: string | null;
  lastUpdateCheck: string | null;
  healthStatus: string;
  configOverrides: Record<string, unknown> | null;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
  logsBufferPath: string | null;
  providerExpose: boolean;
  lastSyncAt: string | null;
}

/** A full upsert row with every default already chosen by the caller. */
export interface VersionManagerToolUpsert {
  tool: string;
  currentVersion: string | null;
  installedVersion: string | null;
  pinnedVersion: string | null;
  binaryPath: string | null;
  status: string;
  pid: number | null;
  port: number;
  apiKey: string | null;
  managementKey: string | null;
  autoUpdate: boolean;
  autoStart: boolean;
  healthStatus: string;
  configOverrides: Record<string, unknown> | null;
  errorMessage: string | null;
}

/**
 * Partial update keyed by camelCase field names. Keys outside the updatable
 * column list are ignored; a null value clears the column, and the boolean
 * flags store 1 only for `true`.
 */
export type VersionManagerToolChanges = Record<string, unknown>;

export type VersionManagerVersionColumn = "current_version" | "installed_version";

export interface VersionManagerRepository {
  /** Every row in storage order. */
  list(): Promise<VersionManagerTool[]>;
  findByTool(tool: string): Promise<VersionManagerTool | null>;
  /** Inserts or overwrites the upsertable columns; created_at is kept on conflict. */
  upsert(row: VersionManagerToolUpsert): Promise<void>;
  /** Always stamps updated_at; does nothing when the tool row is missing. */
  update(tool: string, changes: VersionManagerToolChanges): Promise<void>;
  deleteByTool(tool: string): Promise<boolean>;
  /** Sets health_status and stamps last_health_check. */
  setHealth(tool: string, healthStatus: string): Promise<boolean>;
  setVersion(tool: string, column: VersionManagerVersionColumn, version: string): Promise<boolean>;
  /** Without a pid the stored pid is left untouched; the error message is always overwritten. */
  setStatus(tool: string, status: string, pid?: number, errorMessage?: string): Promise<boolean>;
}
