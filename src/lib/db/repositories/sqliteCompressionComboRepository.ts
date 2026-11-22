/**
 * SQLite implementation of compression combos and their routing-combo assignments
 * (tables compression_combos / compression_combo_assignments, migration 042).
 *
 * The async repository and the SQLite-only synchronous helpers share these private
 * operations. The database is resolved at call time so reset/restore never leaves a
 * captured handle.
 */

import { v4 as uuidv4 } from "uuid";
import type { CompressionPipelineStep } from "@omniroute/open-sse/services/compression/types.ts";
import type { OutputStyleSelectionEntry } from "@omniroute/open-sse/services/compression/outputStyles/apply.ts";
import {
  COMPRESSION_COMBO_ENGINE_IDS,
  defaultCompressionComboPipeline,
  type CompressionCombo,
  type CompressionComboAssignment,
  type CompressionComboRepository,
} from "@/domain/persistence/compressionRepositories";
import { getDbInstance, rowToCamel } from "../core";

type JsonRecord = Record<string, unknown>;

const DEFAULT_COMPRESSION_COMBO_ID = "default-caveman";
const DEFAULT_COMPRESSION_COMBO_NAME = "Standard Savings";
const DEFAULT_COMPRESSION_COMBO_DESCRIPTION = "Default lossless dedup and whitespace compression";
const LEGACY_RTK_CAVEMAN_DESCRIPTION = "Default RTK + Caveman compression pipeline";
const LEGACY_DEFAULT_COMPRESSION_COMBO_DESCRIPTION = "Default Caveman compression pipeline";

function isPreviousLossySeedPipeline(pipeline: CompressionPipelineStep[]): boolean {
  return (
    pipeline.length === 2 &&
    pipeline[0]?.engine === "rtk" &&
    pipeline[0]?.intensity === "standard" &&
    pipeline[1]?.engine === "caveman" &&
    pipeline[1]?.intensity === "full"
  );
}

function parseJsonArray<T>(value: unknown, fallback: T[]): T[] {
  if (Array.isArray(value)) return value as T[];
  if (typeof value !== "string") return fallback;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

function normalizePipeline(value: unknown): CompressionPipelineStep[] {
  return parseJsonArray<CompressionPipelineStep>(value, []).filter((step) => {
    return (
      step && typeof step === "object" && COMPRESSION_COMBO_ENGINE_IDS.includes(String(step.engine))
    );
  });
}

function normalizeLanguagePacks(value: unknown): string[] {
  const packs = parseJsonArray<string>(value, ["en"]).filter(
    (pack): pack is string => typeof pack === "string" && pack.trim().length > 0
  );
  return [...new Set(packs.length > 0 ? packs.map((pack) => pack.trim()) : ["en"])];
}

function normalizeOutputStyles(value: unknown): OutputStyleSelectionEntry[] {
  return parseJsonArray<OutputStyleSelectionEntry>(value, []).filter(
    (entry): entry is OutputStyleSelectionEntry =>
      Boolean(entry) &&
      typeof entry === "object" &&
      typeof entry.id === "string" &&
      entry.id.trim().length > 0 &&
      ["lite", "full", "ultra"].includes(entry.level)
  );
}

function isLegacySeededDefaultPipeline(pipeline: CompressionPipelineStep[]): boolean {
  if (pipeline.length !== 1) return false;
  const [step] = pipeline;
  return step.engine === "caveman" && (step.intensity === undefined || step.intensity === "full");
}

function upgradeLegacySeededDefaultCompressionCombo(): void {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT name, description, pipeline FROM compression_combos WHERE id = ?")
    .get(DEFAULT_COMPRESSION_COMBO_ID) as
    { name?: string; description?: string; pipeline?: string } | undefined;

  if (!row) return;

  const description = String(row.description ?? "");
  const isSeededMetadata =
    String(row.name ?? "") === DEFAULT_COMPRESSION_COMBO_NAME &&
    (description === LEGACY_DEFAULT_COMPRESSION_COMBO_DESCRIPTION ||
      description === LEGACY_RTK_CAVEMAN_DESCRIPTION ||
      description === DEFAULT_COMPRESSION_COMBO_DESCRIPTION);

  const pipeline = normalizePipeline(row.pipeline);
  const untouchedSeed =
    isLegacySeededDefaultPipeline(pipeline) || isPreviousLossySeedPipeline(pipeline);
  if (!isSeededMetadata || !untouchedSeed) return;

  db.prepare(
    `
    UPDATE compression_combos
    SET description = ?, pipeline = ?, updated_at = ?
    WHERE id = ?
  `
  ).run(
    DEFAULT_COMPRESSION_COMBO_DESCRIPTION,
    JSON.stringify(defaultCompressionComboPipeline()),
    new Date().toISOString(),
    DEFAULT_COMPRESSION_COMBO_ID
  );
}

// Bootstrap once per DB instance: listCompressionCombos() runs on every chat request,
// and the INSERT OR IGNORE seed takes the write lock even when the row exists. Keyed
// by instance so a restore/reset (new instance) bootstraps again.
const bootstrappedDbs = new WeakSet<object>();

function ensureCompressionComboTables(): void {
  const db = getDbInstance();
  if (bootstrappedDbs.has(db)) return;
  db.exec(`
    CREATE TABLE IF NOT EXISTS compression_combos (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT DEFAULT '',
      pipeline TEXT NOT NULL DEFAULT '[]',
      language_packs TEXT DEFAULT '["en"]',
      output_mode INTEGER DEFAULT 0,
      output_mode_intensity TEXT DEFAULT 'full',
      output_styles TEXT DEFAULT '[]',
      is_default INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS compression_combo_assignments (
      id TEXT PRIMARY KEY,
      compression_combo_id TEXT NOT NULL REFERENCES compression_combos(id) ON DELETE CASCADE,
      routing_combo_id TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE(routing_combo_id)
    );

    CREATE INDEX IF NOT EXISTS idx_compression_combos_default
      ON compression_combos(is_default);
    CREATE INDEX IF NOT EXISTS idx_compression_combo_assignments_combo
      ON compression_combo_assignments(compression_combo_id);
    CREATE INDEX IF NOT EXISTS idx_compression_combo_assignments_routing
      ON compression_combo_assignments(routing_combo_id);
  `);
  db.prepare(
    `
    INSERT OR IGNORE INTO compression_combos (
      id, name, description, pipeline, language_packs, output_mode, output_mode_intensity, is_default
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    DEFAULT_COMPRESSION_COMBO_ID,
    DEFAULT_COMPRESSION_COMBO_NAME,
    DEFAULT_COMPRESSION_COMBO_DESCRIPTION,
    JSON.stringify(defaultCompressionComboPipeline()),
    JSON.stringify(["en"]),
    0,
    "full",
    1
  );
  upgradeLegacySeededDefaultCompressionCombo();
  bootstrappedDbs.add(db);
}

function rowToCompressionCombo(row: unknown): CompressionCombo | null {
  if (!row) return null;
  const camel = rowToCamel(row as Record<string, unknown>) as JsonRecord;
  return {
    id: String(camel.id),
    name: String(camel.name ?? ""),
    description: String(camel.description ?? ""),
    pipeline: normalizePipeline(camel.pipeline),
    languagePacks: normalizeLanguagePacks(camel.languagePacks),
    outputMode: Boolean(camel.outputMode),
    outputModeIntensity: String(camel.outputModeIntensity ?? "full"),
    outputStyles: normalizeOutputStyles(camel.outputStyles),
    isDefault: Boolean(camel.isDefault),
    createdAt: String(camel.createdAt ?? ""),
    updatedAt: String(camel.updatedAt ?? ""),
  };
}

function rowToAssignment(row: unknown): CompressionComboAssignment | null {
  if (!row) return null;
  const camel = rowToCamel(row as Record<string, unknown>) as JsonRecord;
  return {
    id: String(camel.id),
    compressionComboId: String(camel.compressionComboId),
    routingComboId: String(camel.routingComboId),
    createdAt: String(camel.createdAt ?? ""),
  };
}

function listCombos(): CompressionCombo[] {
  ensureCompressionComboTables();
  return getDbInstance()
    .prepare("SELECT * FROM compression_combos ORDER BY is_default DESC, name COLLATE NOCASE ASC")
    .all()
    .map(rowToCompressionCombo)
    .filter((combo): combo is CompressionCombo => combo !== null);
}

function findCombo(id: string): CompressionCombo | null {
  ensureCompressionComboTables();
  const row = getDbInstance().prepare("SELECT * FROM compression_combos WHERE id = ?").get(id);
  return rowToCompressionCombo(row);
}

function findDefaultCombo(): CompressionCombo | null {
  ensureCompressionComboTables();
  const row = getDbInstance()
    .prepare(
      "SELECT * FROM compression_combos WHERE is_default = 1 ORDER BY updated_at DESC LIMIT 1"
    )
    .get();
  return rowToCompressionCombo(row);
}

function insertCombo(combo: CompressionCombo): void {
  ensureCompressionComboTables();
  const db = getDbInstance();
  db.transaction(() => {
    if (combo.isDefault) db.prepare("UPDATE compression_combos SET is_default = 0").run();
    db.prepare(
      `
      INSERT INTO compression_combos (
        id, name, description, pipeline, language_packs, output_mode, output_mode_intensity,
        output_styles, is_default, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    ).run(
      combo.id,
      combo.name,
      combo.description,
      JSON.stringify(combo.pipeline),
      JSON.stringify(combo.languagePacks),
      combo.outputMode ? 1 : 0,
      combo.outputModeIntensity,
      JSON.stringify(combo.outputStyles),
      combo.isDefault ? 1 : 0,
      combo.createdAt,
      combo.updatedAt
    );
  })();
}

function updateCombo(combo: CompressionCombo): void {
  ensureCompressionComboTables();
  const db = getDbInstance();
  db.transaction(() => {
    if (combo.isDefault) db.prepare("UPDATE compression_combos SET is_default = 0").run();
    db.prepare(
      `
      UPDATE compression_combos
      SET name = ?, description = ?, pipeline = ?, language_packs = ?, output_mode = ?,
          output_mode_intensity = ?, output_styles = ?, is_default = ?, updated_at = ?
      WHERE id = ?
    `
    ).run(
      combo.name,
      combo.description,
      JSON.stringify(combo.pipeline),
      JSON.stringify(combo.languagePacks),
      combo.outputMode ? 1 : 0,
      combo.outputModeIntensity,
      JSON.stringify(combo.outputStyles),
      combo.isDefault ? 1 : 0,
      combo.updatedAt,
      combo.id
    );
  })();
}

function updateComboPipeline(
  id: string,
  pipeline: CompressionPipelineStep[],
  updatedAt: string
): void {
  ensureCompressionComboTables();
  getDbInstance()
    .prepare("UPDATE compression_combos SET pipeline = ?, updated_at = ? WHERE id = ?")
    .run(JSON.stringify(pipeline), updatedAt, id);
}

function setDefaultCombo(id: string, updatedAt: string): void {
  ensureCompressionComboTables();
  const db = getDbInstance();
  db.transaction(() => {
    db.prepare("UPDATE compression_combos SET is_default = 0").run();
    db.prepare("UPDATE compression_combos SET is_default = 1, updated_at = ? WHERE id = ?").run(
      updatedAt,
      id
    );
  })();
}

function deleteCombo(id: string): boolean {
  ensureCompressionComboTables();
  return getDbInstance().prepare("DELETE FROM compression_combos WHERE id = ?").run(id).changes > 0;
}

function listAssignments(compressionComboId: string): CompressionComboAssignment[] {
  ensureCompressionComboTables();
  return getDbInstance()
    .prepare(
      "SELECT * FROM compression_combo_assignments WHERE compression_combo_id = ? ORDER BY routing_combo_id"
    )
    .all(compressionComboId)
    .map(rowToAssignment)
    .filter((assignment): assignment is CompressionComboAssignment => assignment !== null);
}

function findComboForRoutingCombo(routingComboId: string): CompressionCombo | null {
  ensureCompressionComboTables();
  const row = getDbInstance()
    .prepare(
      `
      SELECT c.*
      FROM compression_combos c
      JOIN compression_combo_assignments a ON a.compression_combo_id = c.id
      WHERE a.routing_combo_id = ?
      LIMIT 1
    `
    )
    .get(routingComboId);
  return rowToCompressionCombo(row);
}

function assignRoutingCombo(compressionComboId: string, routingComboId: string): void {
  ensureCompressionComboTables();
  getDbInstance()
    .prepare(
      `
      INSERT OR REPLACE INTO compression_combo_assignments (
        id, compression_combo_id, routing_combo_id, created_at
      )
      VALUES (?, ?, ?, ?)
    `
    )
    .run(uuidv4(), compressionComboId, routingComboId, new Date().toISOString());
}

function replaceAssignments(compressionComboId: string, routingComboIds: readonly string[]): void {
  ensureCompressionComboTables();
  const db = getDbInstance();
  db.transaction(() => {
    db.prepare("DELETE FROM compression_combo_assignments WHERE compression_combo_id = ?").run(
      compressionComboId
    );
    if (routingComboIds.length > 0) {
      const deleteExisting = db.prepare(
        "DELETE FROM compression_combo_assignments WHERE routing_combo_id = ?"
      );
      const insert = db.prepare(
        `
        INSERT INTO compression_combo_assignments (
          id, compression_combo_id, routing_combo_id, created_at
        )
        VALUES (?, ?, ?, ?)
      `
      );
      for (const routingComboId of routingComboIds) {
        deleteExisting.run(routingComboId);
        insert.run(uuidv4(), compressionComboId, routingComboId, new Date().toISOString());
      }
    }
  })();
}

export const sqliteCompressionComboRepository: CompressionComboRepository = {
  list: async () => listCombos(),
  findById: async (id) => findCombo(id),
  findDefault: async () => findDefaultCombo(),
  insert: async (combo) => insertCombo(combo),
  update: async (combo) => updateCombo(combo),
  updatePipeline: async (id, pipeline, updatedAt) => updateComboPipeline(id, pipeline, updatedAt),
  setDefault: async (id, updatedAt) => setDefaultCombo(id, updatedAt),
  deleteById: async (id) => deleteCombo(id),
  listAssignments: async (compressionComboId) => listAssignments(compressionComboId),
  findForRoutingCombo: async (routingComboId) => findComboForRoutingCombo(routingComboId),
  assign: async (compressionComboId, routingComboId) =>
    assignRoutingCombo(compressionComboId, routingComboId),
  replaceAssignments: async (compressionComboId, routingComboIds) =>
    replaceAssignments(compressionComboId, routingComboIds),
};

/**
 * Synchronous compatibility is SQLite-only, not part of the portable contract: the chat
 * request path, the settings read and the management routes call these without awaiting.
 */
export const sqliteCompressionComboLegacySync = {
  list: listCombos,
  findById: findCombo,
  findDefault: findDefaultCombo,
  insert: insertCombo,
  update: updateCombo,
  updatePipeline: updateComboPipeline,
  setDefault: setDefaultCombo,
  deleteById: deleteCombo,
  listAssignments,
  findForRoutingCombo: findComboForRoutingCombo,
  assign: assignRoutingCombo,
  replaceAssignments,
};
