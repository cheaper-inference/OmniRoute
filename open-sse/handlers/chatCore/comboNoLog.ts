/**
 * Combo-level payload-logging opt-out.
 *
 * A combo carries `config.noLog === true` when the operator wants every
 * request routed through it to withhold request/response message content
 * from call logs. The flag lives in the combo's persisted `data` JSON, so
 * no schema migration is required, and it is read from the shared combo
 * cache.
 *
 * This adds a rung to the existing no-log circuit breaker. It never changes
 * the existing API-key or request-header controls.
 */

/** Minimal shape read off a persisted combo record. */
type ComboLike = {
  id?: unknown;
  name?: unknown;
  config?: unknown;
};

function readNoLogFlag(combo: ComboLike | null | undefined): boolean {
  if (!combo || typeof combo !== "object") return false;
  const config = combo.config;
  if (!config || typeof config !== "object" || Array.isArray(config)) return false;
  return (config as Record<string, unknown>).noLog === true;
}

/**
 * Resolve whether the combo serving this request opts out of payload logging.
 *
 * Matching is by id first because a combo can be renamed after routing has
 * pinned it, then by exact name, then case-insensitively by name. Requests
 * that are not combo requests return false without reading the combo list.
 */
export function resolveComboNoLog(args: {
  comboName?: string | null;
  comboId?: string | null;
  combos: unknown[] | null | undefined;
}): boolean {
  const { comboName, comboId, combos } = args;
  if (!Array.isArray(combos) || combos.length === 0) return false;
  const id = typeof comboId === "string" && comboId.trim() ? comboId.trim() : null;
  const name = typeof comboName === "string" && comboName.trim() ? comboName.trim() : null;
  if (!id && !name) return false;

  const rows = combos.filter(
    (row): row is ComboLike => !!row && typeof row === "object" && !Array.isArray(row)
  );
  if (id) {
    const byId = rows.find((row) => row.id === id);
    if (byId) return readNoLogFlag(byId);
  }
  if (name) {
    const exact = rows.find((row) => row.name === name);
    if (exact) return readNoLogFlag(exact);
    // Combo names are unique case-insensitively in the store, so a client
    // alias with different casing should not lose the configured opt-out.
    const lowered = name.toLowerCase();
    const insensitive = rows.find(
      (row) => typeof row.name === "string" && row.name.toLowerCase() === lowered
    );
    if (insensitive) return readNoLogFlag(insensitive);
  }
  return false;
}

/**
 * Async wrapper for the chat hot path.
 *
 * Non-combo requests return immediately and never touch the combo cache.
 * A cache or database failure degrades to logging enabled so a request is
 * not failed for a diagnostics lookup.
 */
export async function resolveComboNoLogForRequest(args: {
  comboName?: string | null;
  comboId?: string | null;
  getCombos: () => Promise<unknown[]>;
}): Promise<boolean> {
  const name = typeof args.comboName === "string" && args.comboName.trim() ? args.comboName : null;
  const id = typeof args.comboId === "string" && args.comboId.trim() ? args.comboId : null;
  if (!name && !id) return false;
  try {
    return resolveComboNoLog({
      comboName: name,
      comboId: id,
      combos: await args.getCombos(),
    });
  } catch {
    return false;
  }
}
