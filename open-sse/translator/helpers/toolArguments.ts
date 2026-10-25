// Normalize a tool call's `function.arguments` into the shape every strict
// OpenAI-compatible upstream accepts: a valid JSON string.
//
// Contract:
//   - a valid JSON string is returned byte-for-byte (no re-serialization);
//   - a non-string value (object/array/number) is serialized once with JSON.stringify;
//   - `undefined` / `null` / `""`, an unparseable string (partial streamed fragment,
//     freeform text) or an unserializable value collapse to `"{}"`.
//
// Clients replay zero-argument calls with the field missing/null/"" and Codex replays
// raw streamed fragments verbatim; strict upstreams reject the whole request with a 400
// ("missing required field arguments" / "function.arguments must be valid JSON"). The
// call already executed, so dropping an unparseable payload only loses cosmetic history.
export function coerceToolCallArguments(value: unknown): string {
  if (value === undefined || value === null || value === "") return "{}";
  if (typeof value !== "string") {
    try {
      const serialized = JSON.stringify(value);
      return typeof serialized === "string" ? serialized : "{}";
    } catch {
      return "{}";
    }
  }
  try {
    JSON.parse(value);
    return value;
  } catch {
    return "{}";
  }
}
