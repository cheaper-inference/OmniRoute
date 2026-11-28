/**
 * Small pieces of local-tool state kept in the shared `key_value` table, each
 * under its own namespace:
 *
 * - CLI tool state (`cliToolLastConfig`, `cliToolInitialConfig`): when each CLI
 *   tool was last configured by OmniRoute, and the tool's own configuration
 *   captured before OmniRoute first touched it.
 * - Conductor cursor (`conductor` / `last_event_id`): where the hub SSE mirror
 *   resumes.
 * - Local corpus root (`local_corpus` / `root_path`): the operator-chosen
 *   directory the local-corpus tools index.
 *
 * Values are JSON-encoded. Reads are tolerant: a malformed or wrongly typed
 * stored value reads as "not set" rather than throwing.
 */

export type CliToolConfigSnapshot = Record<string, unknown>;

export interface CliToolStateRepository {
  /** ISO timestamp of the last configuration, or null when never configured. */
  getLastConfigured(toolId: string): Promise<string | null>;
  /** Every tool with a readable timestamp; malformed rows are skipped. */
  listLastConfigured(): Promise<Record<string, string>>;
  /** Inserts or replaces the timestamp for `toolId`. */
  saveLastConfigured(toolId: string, timestamp: string): Promise<void>;
  deleteLastConfigured(toolId: string): Promise<void>;
  /**
   * Stores the snapshot only when no row exists for `toolId` (even a
   * malformed one). Returns true when stored, false when one already existed.
   */
  saveInitialConfig(toolId: string, config: CliToolConfigSnapshot): Promise<boolean>;
  /** The stored snapshot when it is a plain object; otherwise null. */
  getInitialConfig(toolId: string): Promise<CliToolConfigSnapshot | null>;
  deleteInitialConfig(toolId: string): Promise<void>;
}

export interface ConductorCursorRepository {
  /** The stored SSE cursor, or null when unset, malformed or not a string. */
  get(): Promise<string | null>;
  set(value: string): Promise<void>;
}

export interface LocalCorpusRootRepository {
  /**
   * The stored root exactly as saved, or null when unset, blank, malformed,
   * not a string, or when the read itself fails.
   */
  get(): Promise<string | null>;
  set(rootPath: string): Promise<void>;
  clear(): Promise<void>;
}
