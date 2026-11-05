// Normalize a tool call's `function.arguments` into the shape every strict
// OpenAI-compatible upstream accepts: a valid JSON string.
//
// Contract:
//   - a valid JSON string is returned byte-for-byte (no re-serialization);
//   - a non-string value (object/array/number) is serialized once with JSON.stringify;
//   - `undefined` / `null` / `""`, an unparseable string (partial streamed fragment,
//     freeform text) or an unserializable value collapse to `"{}"`.
//
// This permissive helper also repairs streamed fragments for existing callers.
// It is not historical request admission: replacing supplied arguments loses
// execution history. Use the historical helper below at the Responses boundary.
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

// Historical zero-argument compatibility is intentional: missing/null/empty values
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
