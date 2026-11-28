import { v4 as uuidv4 } from "uuid";
import type {
  CompressionEngineId,
  CompressionPipelineStep,
} from "@omniroute/open-sse/services/compression/types.ts";
import {
  COMPRESSION_COMBO_ENGINE_IDS,
  defaultCompressionComboPipeline,
  type CompressionCombo,
  type CompressionComboAssignment,
  type CompressionComboRepository,
} from "@/domain/persistence/compressionRepositories";

import { backupDbFile } from "./backup";
import { compressionRepositories } from "./repositories/compressionRepositories";

export type {
  CompressionCombo,
  CompressionComboAssignment,
} from "@/domain/persistence/compressionRepositories";

/**
 * Persistence lives behind CompressionComboRepository. The exports below stay
 * synchronous (SQLite-only legacy access) because the chat request path reads them
 * without awaiting; this facade owns payload defaults, input validation and backups.
 */
const legacy = compressionRepositories.legacySync.combos;

/** Async persistence contract; it never takes backups on its own. */
export function getCompressionComboRepository(): CompressionComboRepository {
  return compressionRepositories.combos;
}

function buildComboPayload(
  data: Partial<CompressionCombo>,
  existing?: CompressionCombo
): CompressionCombo {
  const now = new Date().toISOString();
  return {
    id: existing?.id ?? data.id ?? uuidv4(),
    name: data.name?.trim() || existing?.name || "Compression Combo",
    description: data.description ?? existing?.description ?? "",
    pipeline:
      data.pipeline && data.pipeline.length > 0
        ? data.pipeline
        : existing?.pipeline && existing.pipeline.length > 0
          ? existing.pipeline
          : defaultCompressionComboPipeline(),
    languagePacks:
      data.languagePacks && data.languagePacks.length > 0
        ? data.languagePacks
        : existing?.languagePacks && existing.languagePacks.length > 0
          ? existing.languagePacks
          : ["en"],
    outputMode: data.outputMode ?? existing?.outputMode ?? false,
    outputModeIntensity: data.outputModeIntensity ?? existing?.outputModeIntensity ?? "full",
    // Explicit [] clears the combo's own selection (back to inheriting the global panel);
    // undefined leaves an existing selection untouched.
    outputStyles: data.outputStyles ?? existing?.outputStyles ?? [],
    isDefault: data.isDefault ?? existing?.isDefault ?? false,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
}

export function listCompressionCombos(): CompressionCombo[] {
  return legacy.list();
}

export function getCompressionCombo(id: string): CompressionCombo | null {
  return legacy.findById(id);
}

export function getDefaultCompressionCombo(): CompressionCombo | null {
  return legacy.findDefault();
}

export function createCompressionCombo(data: Partial<CompressionCombo>): CompressionCombo {
  const combo = buildComboPayload(data);
  legacy.insert(combo);
  backupDbFile("pre-write");
  return getCompressionCombo(combo.id) as CompressionCombo;
}

export function updateCompressionCombo(
  id: string,
  data: Partial<CompressionCombo>
): CompressionCombo | null {
  const existing = getCompressionCombo(id);
  if (!existing) return null;
  legacy.update(buildComboPayload(data, existing));
  backupDbFile("pre-write");
  return getCompressionCombo(id);
}

export function deleteCompressionCombo(id: string): boolean {
  const existing = getCompressionCombo(id);
  if (!existing || existing.isDefault) return false;
  const deleted = legacy.deleteById(id);
  if (deleted) backupDbFile("pre-write");
  return deleted;
}

export function setDefaultCompressionCombo(id: string): boolean {
  if (!getCompressionCombo(id)) return false;
  legacy.setDefault(id, new Date().toISOString());
  backupDbFile("pre-write");
  return true;
}

export function getAssignmentsForCompressionCombo(id: string): CompressionComboAssignment[] {
  return legacy.listAssignments(id);
}

export function getCompressionComboForRoutingCombo(
  routingComboId: string
): CompressionCombo | null {
  return legacy.findForRoutingCombo(routingComboId);
}

export function assignRoutingCombo(compressionComboId: string, routingComboId: string): boolean {
  if (!getCompressionCombo(compressionComboId) || !routingComboId.trim()) return false;
  legacy.assign(compressionComboId, routingComboId.trim());
  backupDbFile("pre-write");
  return true;
}
// Static stackPriority map — mirrors the values defined in each engine file.
// Using a static map avoids cross-workspace imports (open-sse → src/lib/db) that
// would introduce a circular dependency detected by check:cycles.
const ENGINE_STACK_PRIORITY: Record<string, number> = {
  "session-dedup": 3,
  ccr: 4,
  lite: 5,
  rtk: 10,
  headroom: 15,
  caveman: 20,
  aggressive: 30,
  llmlingua: 35,
  ultra: 40,
  "codex-responses": 12,
};

export function setEngineInDefaultCombo(
  engineId: string,
  enabled: boolean,
  config?: Record<string, unknown>
): CompressionCombo | null {
  if (!COMPRESSION_COMBO_ENGINE_IDS.includes(engineId)) return null;
  const existing = getDefaultCompressionCombo();
  if (!existing) return null;

  let newPipeline = [...existing.pipeline];
  if (enabled) {
    const idx = newPipeline.findIndex((s) => s.engine === engineId);
    if (idx >= 0) {
      if (config !== undefined) {
        newPipeline[idx] = { ...newPipeline[idx], config };
      }
    } else {
      newPipeline.push({ engine: engineId as CompressionEngineId, ...(config ? { config } : {}) });
    }
    // Sort by stackPriority ascending so the pipeline runs in the correct order.
    newPipeline.sort((a, b) => {
      const pa = ENGINE_STACK_PRIORITY[a.engine] ?? 50;
      const pb = ENGINE_STACK_PRIORITY[b.engine] ?? 50;
      return pa - pb;
    });
  } else {
    newPipeline = newPipeline.filter((s) => s.engine !== engineId);
  }

  // Direct pipeline write — preserves empty pipeline (Fix #2) without going through
  // buildComboPayload which falls back to defaultCompressionComboPipeline() when
  // the incoming array is empty.
  legacy.updatePipeline(
    existing.id,
    newPipeline as CompressionPipelineStep[],
    new Date().toISOString()
  );
  backupDbFile("pre-write");

  return getCompressionCombo(existing.id);
}

export function updateAssignments(compressionComboId: string, routingComboIds: string[]): boolean {
  if (!getCompressionCombo(compressionComboId)) return false;
  const cleanedIds = [...new Set(routingComboIds.map((id) => id.trim()).filter(Boolean))];
  legacy.replaceAssignments(compressionComboId, cleanedIds);
  backupDbFile("pre-write");
  return true;
}
