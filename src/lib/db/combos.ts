/**
 * Compatibility facade for combo persistence.
 *
 * Application code keeps the existing function-level API while persistence is
 * delegated through the domain repository contract. Cross-cutting write effects
 * remain here instead of becoming part of the portable repository surface.
 */

import type { ComboRecord } from "@/domain/persistence/comboRepositories";
import { backupDbFile, backupDbFileAwaited } from "./backup";
import { pruneDeletedComboConnectionRefs } from "./comboConnectionRefs";
import { clearSessionModelHistoryForCombo } from "./contextHandoffs";
import { getDbInstance } from "./core";
import { invalidateCachedLKGP, invalidateDbCache, invalidateModelCatalogCache } from "./readCache";
import { invalidateReasoningRoutingRuleCache } from "./reasoningRoutingRules";
import { routingConfigRepositories } from "./repositories/routingConfigRepositories";

const repository = routingConfigRepositories.combos;

export function getCombos(limit?: number, offset?: number): Promise<ComboRecord[]> {
  return repository.list(limit, offset);
}

/** Keep the existing synchronous facade contract while repository APIs become async. */
export function getCombosCount(): number {
  return routingConfigRepositories.legacySync.getCombosCount();
}

export function getComboById(id: string): Promise<ComboRecord | null> {
  return repository.findById(id);
}

export function getComboByName(name: string): Promise<ComboRecord | null> {
  return repository.findByName(name);
}

export function getComboByNameInsensitive(name: string): Promise<ComboRecord | null> {
  return repository.findByNameInsensitive(name);
}

export async function createCombo(data: ComboRecord): Promise<ComboRecord> {
  const combo = await repository.create(data);
  invalidateDbCache("combos");
  backupDbFile("pre-write");
  return combo;
}

export async function updateCombo(id: string, data: ComboRecord): Promise<ComboRecord | null> {
  const result = await repository.update(id, data);
  if (!result) return null;

  if (result.modelsFieldProvided) {
    const cleared = clearSessionModelHistoryForCombo(result.previousName);
    if (cleared > 0 && result.currentName !== result.previousName) {
      clearSessionModelHistoryForCombo(result.currentName);
    }
  }

  invalidateDbCache("combos");
  backupDbFile("pre-write");
  return result.combo;
}

export async function reorderCombos(comboIds: string[]): Promise<ComboRecord[]> {
  const result = await repository.reorder(comboIds);
  if (result.rowsReordered > 0) {
    invalidateDbCache("combos");
    backupDbFile("pre-write");
  }
  return result.combos;
}

export async function deleteCombo(id: string): Promise<boolean> {
  // Snapshot BEFORE the delete and wait for it: a snapshot taken after would not hold the
  // combo. A failed routine snapshot is logged and must not block the delete.
  await backupDbFileAwaited("pre-write").catch((error: unknown) => {
    console.error("[DB] Pre-write backup failed:", error instanceof Error ? error.message : error);
  });
  const deleted = await repository.deleteById(id);
  if (!deleted) return false;

  invalidateDbCache("combos");
  invalidateReasoningRoutingRuleCache();
  return true;
}

export async function deleteComboByName(name: string): Promise<boolean> {
  const combo = await repository.findByName(name);
  if (!combo || typeof combo.id !== "string") return false;
  return deleteCombo(combo.id);
}

/**
 * Atomically import validated combos (combos-only export/import). With
 * `replaceVisible`, every user-visible combo is removed in the same
 * transaction; hidden system-managed combos are kept.
 */
export async function importCombos(
  entries: ComboRecord[],
  options: { replaceVisible: boolean }
): Promise<{ created: ComboRecord[]; removed: number }> {
  backupDbFile("pre-write");
  const result = routingConfigRepositories.legacySync.importComboBatch(entries, options);
  for (const key of result.lkgpKeys) invalidateCachedLKGP(key);
  if (result.removed > 0) invalidateReasoningRoutingRuleCache();
  if (result.revokedKeys > 0) {
    // Dynamic import: apiKeys pulls the combo policy back in (same as deleteCombo).
    const { clearApiKeyCaches } = await import("./apiKeys");
    clearApiKeyCaches();
    invalidateModelCatalogCache();
  }
  invalidateDbCache("combos");
  return { created: result.created, removed: result.removed };
}

export function setActiveCombo(name: string, db = getDbInstance()): void {
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', 'activeCombo', ?)"
  ).run(JSON.stringify(name));
}

/**
 * Drop references to deleted connections from combo steps.
 *
 * A step that pins an account keeps its `connectionId`: clearing it turned the
 * step into "any account of this provider", so deleting one account silently
 * rerouted that step's traffic to the remaining ones. The dead pin now fails
 * the target locally (ineligible), moves the combo to its next step, and the
 * dashboard reports the account as deleted.
 *
 * Scope allowlists are pruned, but never down to empty -- empty means "the whole
 * active pool" downstream, which would widen routing the same way.
 */
export async function cleanupComboConnectionRefs(connectionIds: string | string[]) {
  const deletedConnectionIds = (
    Array.isArray(connectionIds) ? connectionIds : [connectionIds]
  ).filter(Boolean);

  if (deletedConnectionIds.length === 0) return 0;

  const combos = await getCombos();
  let touched = 0;

  for (const combo of combos) {
    if (!Array.isArray(combo.models)) continue;

    const { steps, changed } = pruneDeletedComboConnectionRefs(
      combo.models as unknown as Record<string, unknown>[],
      deletedConnectionIds
    );

    if (changed && typeof combo.id === "string") {
      try {
        const { id, ...rest } = combo;
        await updateCombo(combo.id, {
          ...rest,
          models: steps,
        });
        touched++;
      } catch {
        // One combo failing should not block cleanup of the rest.
      }
    }
  }

  return touched;
}
