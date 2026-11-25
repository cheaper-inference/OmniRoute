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
 * namespace, value = JSON object `{ modelId: connectionId }` (a bare id array from earlier
 * builds is still read, as unowned marks). No migration needed — `key_value`
 * already exists and the namespace is new.
 */
import { getDbInstance } from "./core";

const NAMESPACE = "modelHealthAutoHidden";

/** Owner recorded for marks written before ownership was tracked: any connection may restore. */
const UNOWNED = "";

/** model id -> id of the connection whose probe hid it ("" = unowned legacy mark). */
type Marks = Map<string, string>;

function marksFromList(ids: unknown[]): Marks {
  // Legacy shape: a bare list of model ids with no owner.
  const marks: Marks = new Map();
  for (const id of ids) {
    if (typeof id === "string" && id.length > 0) marks.set(id, UNOWNED);
  }
  return marks;
}

function marksFromObject(record: Record<string, unknown>): Marks {
  const marks: Marks = new Map();
  for (const [id, owner] of Object.entries(record)) {
    if (id.length > 0) marks.set(id, typeof owner === "string" ? owner : UNOWNED);
  }
  return marks;
}

function parseMarks(raw: string): Marks {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return new Map(); // Corrupt value: treat as no marks.
  }
  if (Array.isArray(parsed)) return marksFromList(parsed);
  if (parsed && typeof parsed === "object")
    return marksFromObject(parsed as Record<string, unknown>);
  return new Map();
}

function readMarks(providerId: string): Marks {
  const row = getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(NAMESPACE, providerId) as { value: string | null } | undefined;
  return row?.value ? parseMarks(row.value) : new Map();
}

function writeMarks(providerId: string, marks: Marks): void {
  const db = getDbInstance();
  if (marks.size === 0) {
    db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(NAMESPACE, providerId);
    return;
  }
  const sorted = Object.fromEntries([...marks.entries()].sort(([a], [b]) => a.localeCompare(b)));
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    NAMESPACE,
    providerId,
    JSON.stringify(sorted)
  );
}

/** Model ids of `providerId` currently hidden by the health check (any connection). */
export function getHealthCheckHiddenModelIds(providerId: string): Set<string> {
  if (!providerId) return new Set();
  return new Set(readMarks(providerId).keys());
}

/**
 * True when the health check (not the user) hid this model. Visibility is stored per
 * provider/model, so with `connectionId` the answer is "hidden by THIS connection's
 * probe" (or by an unowned legacy mark): a connection never claims another's hide.
 */
export function isHiddenByHealthCheck(
  providerId: string,
  modelId: string,
  connectionId?: string
): boolean {
  if (!providerId || !modelId) return false;
  const owner = readMarks(providerId).get(modelId);
  if (owner === undefined) return false;
  if (connectionId === undefined) return true;
  return owner === connectionId || owner === UNOWNED;
}

/** Record that the health check hid this model, on behalf of `connectionId`. */
export function markHiddenByHealthCheck(
  providerId: string,
  modelId: string,
  connectionId: string = UNOWNED
): void {
  if (!providerId || !modelId) return;
  const marks = readMarks(providerId);
  if (marks.has(modelId)) return;
  marks.set(modelId, connectionId);
  writeMarks(providerId, marks);
}

/**
 * Drop the health-check mark for these models. Called when the scheduler restores
 * a model, and whenever the user hides or un-hides a model by hand: a manual write
 * makes the user the owner of that visibility state.
 */
export function clearHealthCheckHiddenMarks(providerId: string, modelIds: Iterable<string>): void {
  if (!providerId) return;
  const marks = readMarks(providerId);
  let changed = false;
  for (const modelId of modelIds) {
    if (marks.delete(modelId)) changed = true;
  }
  if (changed) writeMarks(providerId, marks);
}
