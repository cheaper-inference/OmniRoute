/**
 * db/modelHealthAutoHidden.ts — ownership marks for models hidden by the scheduled
 * model health check (#11777).
 *
 * `isHidden` itself lives on the custom-model / model-compat-override rows and does
 * not say who set it. This module records, per provider, the model ids the health
 * check hid. The scheduler may only un-hide a model that carries this mark, so a
 * model the user hid is never restored automatically.
 *
 * Storage: one `key_value` row per provider in the `modelHealthAutoHidden`
 * namespace, value = JSON array of model ids. No migration needed — `key_value`
 * already exists and the namespace is new.
 */
import { getDbInstance } from "./core";

const NAMESPACE = "modelHealthAutoHidden";

function readIds(providerId: string): Set<string> {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(NAMESPACE, providerId) as { value: string | null } | undefined;
  if (!row?.value) return new Set();
  try {
    const parsed: unknown = JSON.parse(row.value);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id): id is string => typeof id === "string" && id.length > 0));
  } catch {
    return new Set();
  }
}

function writeIds(providerId: string, ids: Set<string>): void {
  const db = getDbInstance();
  if (ids.size === 0) {
    db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(NAMESPACE, providerId);
    return;
  }
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    NAMESPACE,
    providerId,
    JSON.stringify([...ids].sort())
  );
}

/** Model ids of `providerId` currently hidden by the health check. */
export function getHealthCheckHiddenModelIds(providerId: string): Set<string> {
  if (!providerId) return new Set();
  return readIds(providerId);
}

/** True when the health check (not the user) hid this model. */
export function isHiddenByHealthCheck(providerId: string, modelId: string): boolean {
  if (!providerId || !modelId) return false;
  return readIds(providerId).has(modelId);
}

/** Record that the health check hid this model. */
export function markHiddenByHealthCheck(providerId: string, modelId: string): void {
  if (!providerId || !modelId) return;
  const ids = readIds(providerId);
  if (ids.has(modelId)) return;
  ids.add(modelId);
  writeIds(providerId, ids);
}

/**
 * Drop the health-check mark for these models. Called when the scheduler restores
 * a model, and whenever the user hides or un-hides a model by hand: a manual write
 * makes the user the owner of that visibility state.
 */
export function clearHealthCheckHiddenMarks(providerId: string, modelIds: Iterable<string>): void {
  if (!providerId) return;
  const ids = readIds(providerId);
  let changed = false;
  for (const modelId of modelIds) {
    if (ids.delete(modelId)) changed = true;
  }
  if (changed) writeIds(providerId, ids);
}
