/**
 * Operator exact-value denylist for the credential masker (setting `credentialExactValues`).
 *
 * Some secrets have no recognisable shape (a passphrase, an internal token), so the pattern catalog
 * cannot find them. The operator lists them one per line; the masker replaces each exact occurrence
 * with `[REDACTED:exact_value]` before the pattern catalog runs. The setting is stored encrypted
 * (ENCRYPTED_SETTING_KEYS) and never returned by the settings API.
 *
 * Limits, checked on write (settings schema) and again on read: a value is 10 to 200 characters, at
 * most 50 values. A short value would mask ordinary words; a long one could outrun the streaming
 * window. Matching is exact and case sensitive.
 */

export const EXACT_VALUE_MIN_LENGTH = 10;
export const EXACT_VALUE_MAX_LENGTH = 200;
export const EXACT_VALUE_MAX_COUNT = 50;
export const EXACT_VALUE_PLACEHOLDER = "[REDACTED:exact_value]";

function lines(text: unknown): string[] {
  return typeof text === "string" ? text.split(/\r?\n/).map((l) => l.trim()) : [];
}

/** True when every non-empty line is 10 to 200 characters and there are at most 50 of them. */
export function isValidExactValueList(text: unknown): boolean {
  const entries = lines(text).filter(Boolean);
  return (
    entries.length <= EXACT_VALUE_MAX_COUNT &&
    entries.every((v) => v.length >= EXACT_VALUE_MIN_LENGTH && v.length <= EXACT_VALUE_MAX_LENGTH)
  );
}

let source = "";
let values: string[] = [];
let pattern: RegExp | null = null;

/** Load the list. Out-of-range entries are dropped, so a bad stored value can never mask words. */
export function setCredentialExactValues(text: unknown): void {
  const next = typeof text === "string" ? text : "";
  if (next === source) return;
  source = next;
  values = [
    ...new Set(
      lines(next).filter(
        (v) => v.length >= EXACT_VALUE_MIN_LENGTH && v.length <= EXACT_VALUE_MAX_LENGTH
      )
    ),
  ]
    .slice(0, EXACT_VALUE_MAX_COUNT)
    .sort((a, b) => b.length - a.length);
  pattern = values.length
    ? new RegExp(values.map((v) => v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "g")
    : null;
}

/** Global regex over the loaded values, or null when the list is empty (the default). */
export function exactValuePattern(): RegExp | null {
  return pattern;
}

export function redactExactValues(text: string): { text: string; count: number } {
  if (!pattern) return { text, count: 0 };
  let count = 0;
  pattern.lastIndex = 0;
  const redacted = text.replace(pattern, () => {
    count++;
    return EXACT_VALUE_PLACEHOLDER;
  });
  return { text: redacted, count };
}

/** Start of the longest buffer suffix that begins a listed value, or undefined. */
export function exactValuePartialTailIndex(buffer: string): number | undefined {
  let earliest: number | undefined;
  for (const value of values) {
    for (let k = Math.min(value.length - 1, buffer.length); k > 0; k--) {
      if (buffer.endsWith(value.slice(0, k))) {
        const at = buffer.length - k;
        if (earliest === undefined || at < earliest) earliest = at;
        break;
      }
    }
  }
  return earliest;
}
