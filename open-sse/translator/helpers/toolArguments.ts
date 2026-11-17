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
// Strict tool-history mode replaces this repair with the historical helper below.
/** Construct a 400 admission error preserving the caller-provided message and classification. */
export function createToolHistoryError(message: string, errorType: string) {
  return Object.assign(new Error(message), { statusCode: 400, errorType });
}

/** Normalize streamed arguments, using an empty object for missing or invalid values. */
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

// Strict tool-history mode only. Historical zero-argument compatibility is intentional: missing/null/empty values
// become "{}", and serializable nonstrings are encoded once. Valid JSON strings,
// including scalars and arrays, retain their exact bytes. Supplied malformed or
// unserializable values must never be rewritten as a successful empty argument set.
/** Preserve valid historical JSON bytes and reject malformed supplied arguments. */
export function coerceHistoricalToolCallArguments(value: unknown, _callId: string): string {
  if (value === undefined || value === null || value === "") return "{}";
  try {
    if (typeof value !== "string") {
      const serialized = JSON.stringify(value);
      if (typeof serialized === "string") return serialized;
      throw new Error("Arguments are not serializable");
    }
    JSON.parse(value);
    return value;
  } catch {
    throw createToolHistoryError(
      "Historical tool call has malformed arguments",
      "invalid_tool_call_arguments"
    );
  }
}
