/**
 * Combo step references after a provider connection is deleted.
 *
 * A step that pins an account keeps that pin. Dropping it would turn the step
 * into "any account of this provider", which silently widens where traffic can
 * go after the user only asked to remove one account. The pinned id no longer
 * resolving is a loud, local failure: the target is reported ineligible and the
 * combo moves to its next step, and the dashboard says the account is gone.
 *
 * Scope allowlists are pruned, but this never writes an empty list: downstream
 * (comboStructure keeps a non-empty allowlist, auth filters the connection pool
 * by the ids it names) an empty list means "no restriction", i.e. the whole
 * active pool. When every scoped id was deleted the step keeps the original
 * list, so it names only dead ids and selects nothing.
 */

function normalizeDeletedIds(deletedConnectionIds: Iterable<string>): Set<string> {
  const deleted = new Set<string>();
  for (const id of deletedConnectionIds) {
    if (typeof id !== "string") continue;
    const trimmed = id.trim();
    if (trimmed.length > 0) deleted.add(trimmed);
  }
  return deleted;
}

function isPlainStep(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export interface PruneDeletedComboConnectionRefsResult<T> {
  steps: T[];
  changed: boolean;
}

export function pruneDeletedComboConnectionRefs<T>(
  steps: readonly T[],
  deletedConnectionIds: Iterable<string>
): PruneDeletedComboConnectionRefsResult<T> {
  const deleted = normalizeDeletedIds(deletedConnectionIds);
  if (deleted.size === 0) return { steps: [...steps], changed: false };

  let changed = false;
  const pruned = steps.map((step) => {
    if (!isPlainStep(step)) return step;

    const allowlist = step.allowedConnectionIds;
    if (!Array.isArray(allowlist)) return step;

    // Non-string entries are not connection ids; they are dropped rather than
    // left for the scope filter to compare against nothing.
    const surviving = allowlist.filter((id) => typeof id === "string" && !deleted.has(id));
    if (surviving.length === allowlist.length) return step;

    if (surviving.length === 0) {
      // Every scoped id is gone. Keep the list as it is (it still names the
      // dead ids) so the scope stays in place and selects nothing. Returning
      // a step with allowedConnectionIds: [] would be a different value, and
      // downstream that value means "no restriction".
      return step;
    }

    changed = true;
    return { ...step, allowedConnectionIds: surviving } as T;
  });

  return { steps: changed ? pruned : [...steps], changed };
}
