// Lossless line-oriented test events; no test-force-exit and no TAP scraping.
function encode(value, seen = new WeakSet(), depth = 0) {
  if (typeof value === "bigint") return String(value);
  if (!value || typeof value !== "object") return value;
  if (depth > 12) return "[depth limit]";
  if (seen.has(value)) return "[cycle]";
  seen.add(value);
  const result = Array.isArray(value) ? [] : {};
  const keys = value instanceof Error ? Object.getOwnPropertyNames(value) : Object.keys(value);
  for (const key of keys) {
    try {
      result[key] = encode(value[key], seen, depth + 1);
    } catch {
      result[key] = "[unreadable]";
    }
  }
  seen.delete(value);
  return result;
}

export default async function* report(events) {
  for await (const event of events) yield JSON.stringify(encode(event)) + "\n";
}
