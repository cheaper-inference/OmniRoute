import type { CompressionPipelineStep } from "@omniroute/open-sse/services/compression/types.ts";
import type { OutputStyleSelectionEntry } from "@omniroute/open-sse/services/compression/outputStyles/apply.ts";

// ── Compression settings (key/value rows in the "compression" namespace) ────

/** One stored settings row. `value` is passed through as persisted (JSON text, or a BLOB). */
export interface CompressionSettingRow {
  key: string;
  value: unknown;
}

/**
 * A settings write. A string is stored as-is; a function receives the value currently
 * stored for the same key (undefined when absent), read inside the write transaction,
 * and returns the JSON text to store.
 */
export interface CompressionSettingWrite {
  key: string;
  value: string | ((stored: unknown) => string);
}

/** Persistence only; the DB facade owns normalization, defaults and caching. */
export interface CompressionSettingsRepository {
  /** Every row of the namespace, in storage order, values untouched. */
  list(): Promise<CompressionSettingRow[]>;
  /** The stored value for one key, or undefined when no row exists. */
  get(key: string): Promise<unknown>;
  /** Upserts every entry in one transaction, in the given order. */
  write(entries: readonly CompressionSettingWrite[]): Promise<void>;
}

// ── Compression combos and their routing-combo assignments ──────────────────

export interface CompressionCombo {
  id: string;
  name: string;
  description: string;
  pipeline: CompressionPipelineStep[];
  languagePacks: string[];
  outputMode: boolean;
  outputModeIntensity: string;
  outputStyles: OutputStyleSelectionEntry[];
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CompressionComboAssignment {
  id: string;
  compressionComboId: string;
  routingComboId: string;
  createdAt: string;
}

/**
 * Engine ids a stored combo pipeline may reference. Keep in sync with
 * stackedPipelineStepSchema + ENGINE_CATALOG (#6747).
 */
export const COMPRESSION_COMBO_ENGINE_IDS: readonly string[] = [
  "lite",
  "caveman",
  "aggressive",
  "ultra",
  "rtk",
  "headroom",
  "session-dedup",
  "ccr",
  "llmlingua",
  "relevance",
  "codex-responses",
];

/** Pipeline of the seeded default combo; also the fallback for a combo saved without one. */
export function defaultCompressionComboPipeline(): CompressionPipelineStep[] {
  return [{ engine: "session-dedup" }, { engine: "lite" }];
}

/**
 * Persistence only. Reads return normalized combos (unknown engines, empty language packs
 * and malformed output styles dropped). The built-in default combo is seeded and its
 * untouched legacy pipeline upgraded before the first operation on a store.
 */
export interface CompressionComboRepository {
  /** Default first, then by name (case-insensitive). */
  list(): Promise<CompressionCombo[]>;
  findById(id: string): Promise<CompressionCombo | null>;
  /** The most recently updated combo flagged as default, or null. */
  findDefault(): Promise<CompressionCombo | null>;
  /** Inserts a complete record; when it is the default, every other combo is demoted. */
  insert(combo: CompressionCombo): Promise<void>;
  /** Rewrites a complete record (createdAt kept); demotes the others when it is the default. */
  update(combo: CompressionCombo): Promise<void>;
  /** Only rewrites the pipeline and updatedAt; an empty pipeline is stored as empty. */
  updatePipeline(id: string, pipeline: CompressionPipelineStep[], updatedAt: string): Promise<void>;
  /** Makes `id` the only default combo. */
  setDefault(id: string, updatedAt: string): Promise<void>;
  /** Deletes the row; assignment cleanup follows the store's foreign-key enforcement. */
  deleteById(id: string): Promise<boolean>;
  /** Ordered by routing combo id. */
  listAssignments(compressionComboId: string): Promise<CompressionComboAssignment[]>;
  findForRoutingCombo(routingComboId: string): Promise<CompressionCombo | null>;
  /** Points one routing combo at a compression combo, replacing its previous assignment. */
  assign(compressionComboId: string, routingComboId: string): Promise<void>;
  /**
   * Replaces the combo's assignment set in one transaction; each routing combo id is first
   * removed from whichever combo held it. Ids must already be trimmed and unique.
   */
  replaceAssignments(compressionComboId: string, routingComboIds: readonly string[]): Promise<void>;
}
