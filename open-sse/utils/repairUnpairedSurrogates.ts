/**
 * Anthropic parses the Claude request with serde_json. JSON.stringify emits a
 * lone UTF-16 surrogate as `\ud800`, and serde_json rejects that complete
 * escape as 400 "unexpected end of hex escape". The agent turn then stops.
 * A paired surrogate (an emoji) is well-formed and stays. U+FFFD is a real
 * character, so the following stringify no longer emits a lone `\u` escape.
 */

const HAS_SURROGATE = /[\uD800-\uDFFF]/;

function repairString(value: string): string {
  if (!HAS_SURROGATE.test(value)) return value;
  return value.toWellFormed();
}

function isPlainObject(value: object): boolean {
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function walk(value: unknown, seen: WeakSet<object>): void {
  if (Array.isArray(value)) {
    if (seen.has(value)) return;
    seen.add(value);
    for (let index = 0; index < value.length; index += 1) {
      const item = value[index];
      if (typeof item === "string") {
        const repaired = repairString(item);
        if (repaired !== item) value[index] = repaired;
      } else {
        walk(item, seen);
      }
    }
    return;
  }

  if (value === null || typeof value !== "object") return;
  if (!isPlainObject(value) || seen.has(value)) return;
  seen.add(value);

  const record = value as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    const item = record[key];
    if (typeof item === "string") {
      const repaired = repairString(item);
      if (repaired !== item) record[key] = repaired;
    } else {
      walk(item, seen);
    }
  }
}

/** Replace lone surrogates in string values. Keys, Buffers, and class instances stay. */
export function repairUnpairedSurrogates(value: unknown): void {
  walk(value, new WeakSet());
}
