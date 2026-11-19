/**
 * Combo-level payload-logging opt-out.
 *
 * A combo carries `config.noLog === true` when the operator wants every request
 * routed through it to withhold request/response message content from call logs.
 * The flag lives in the combo's persisted `data` JSON (no migration) and is read
 * here from the shared combo cache, so the hot path pays no extra DB query.
 *
 * Precedence: this is one more opt-out rung in the chain, never a re-enable.
 * `true` withholds; `false`/absent falls through to the other rungs (key,
 * request header, global, connection, model).
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
 * Matches by id first (a combo can be renamed mid-flight; the routing layer
 * keeps the id), then by name. Returns false when this is not a combo request
 * or when the combo is not in the list.
 *
 * @param args.comboName  Combo name passed into the chat handler, if any.
 * @param args.comboId    Routing combo id, when the caller pinned one.
 * @param args.combos     The shared cached combo list (`getCombosCached()`).
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
    // Combo names are unique case-insensitively in the store; match the same way
    // so a differently-cased client alias does not silently lose the opt-out.
    const lowered = name.toLowerCase();
    const insensitive = rows.find(
      (row) => typeof row.name === "string" && row.name.toLowerCase() === lowered
    );
    if (insensitive) return readNoLogFlag(insensitive);
  }
  return false;
}
