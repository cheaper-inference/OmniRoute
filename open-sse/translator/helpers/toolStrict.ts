// Function-tool `strict` handling across OpenAI wire formats.
//
// The same omitted field means different things per format:
// - Chat Completions (and Claude): omitted `strict` = non-strict, optional properties
//   stay optional.
// - Responses: omitted `strict` = the API strict-normalizes the schema when it can, so
//   every property becomes required and the model has to invent values for optional
//   ones (e.g. `"id": ""`). Explicit `false` and `null` both opt out; `true` on a
//   schema with optional properties is rejected with a 400.
//
// Rule: routing through OmniRoute must give the same result as calling the target
// directly with the source format's own semantics.

type ToolLike = Record<string, unknown> | null | undefined;

// Values a client may declare. LangChain sends `null` to opt out of strict mode.
function isDeclaredStrict(value: unknown): value is boolean | null {
  return typeof value === "boolean" || value === null;
}

function hasOwn(obj: unknown, key: string): obj is Record<string, unknown> {
  return (
    !!obj &&
    typeof obj === "object" &&
    !Array.isArray(obj) &&
    Object.prototype.hasOwnProperty.call(obj, key)
  );
}

/**
 * Read the declared `strict` from a flat Responses tool or a nested Chat tool
 * (`tool.function.strict`). The top-level value wins. Returns `undefined` when the
 * client did not declare one (or declared a non-boolean, non-null value).
 */
export function readToolStrict(tool: unknown): boolean | null | undefined {
  if (hasOwn(tool, "strict") && isDeclaredStrict(tool.strict)) return tool.strict;
  const fn = hasOwn(tool, "function") ? tool.function : undefined;
  if (hasOwn(fn, "strict") && isDeclaredStrict(fn.strict)) return fn.strict;
  return undefined;
}

/**
 * Chat -> Responses: an omitted (or `null`) Chat `strict` is non-strict, which on
 * Responses has to be spelled out as `false`.
 */
export function chatStrictForResponses(fn: ToolLike): boolean {
  return typeof fn?.strict === "boolean" ? fn.strict : false;
}

/**
 * Responses/Claude -> Chat: only booleans carry over (spread into the `function`
 * object). `null` and omitted both mean non-strict on Chat, so the field is left out
 * instead of leaking `null` to Chat providers.
 */
export function chatStrictFrom(tool: ToolLike): { strict?: boolean } {
  return typeof tool?.strict === "boolean" ? { strict: tool.strict } : {};
}

/**
 * Re-attach a strict value captured with `readToolStrict()` after a tool rebuild.
 * Undeclared stays absent so native Responses clients keep native semantics.
 */
export function restoreToolStrict<T extends Record<string, unknown>>(
  tool: T,
  strict: boolean | null | undefined
): T {
  if (strict !== undefined) (tool as Record<string, unknown>).strict = strict;
  return tool;
}
