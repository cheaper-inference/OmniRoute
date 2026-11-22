/**
 * Pure field normalizers for the Responses-API body, moved out of opencode.ts to keep that
 * file under its frozen size ceiling. Behavior unchanged.
 */
import { randomUUID } from "crypto";

export function clampResponsesCallId(callId: unknown): string {
  const s = String(callId || "").trim();
  return s || `call_${randomUUID().replace(/-/g, "").slice(0, 16)}`;
}

export function coerceResponsesArguments(args: unknown): string {
  if (typeof args === "string") return args;
  if (args && typeof args === "object") {
    try {
      return JSON.stringify(args);
    } catch {
      return "{}";
    }
  }
  return "{}";
}

export function coerceResponsesOutput(output: unknown): string {
  if (typeof output === "string") return output;
  if (output && typeof output === "object") {
    try {
      return JSON.stringify(output);
    } catch {
      return "";
    }
  }
  return String(output ?? "");
}

/**
 * Move a legacy max_tokens/max_completion_tokens value to the Responses API's
 * max_output_tokens field, in place. Extracted from sanitizeResponsesBody to
 * keep that function under the max-lines-per-function ratchet.
 */
export function normalizeResponsesTokenFields(body: Record<string, unknown>): void {
  if (body.max_output_tokens === undefined) {
    if (body.max_completion_tokens !== undefined) {
      body.max_output_tokens = body.max_completion_tokens;
    } else if (body.max_tokens !== undefined) {
      body.max_output_tokens = body.max_tokens;
    }
  }
  delete body.max_tokens;
  delete body.max_completion_tokens;
}

/**
 * Fold a legacy reasoning_effort field into the Responses API's reasoning
 * object, in place. Extracted from sanitizeResponsesBody (see above).
 */
export function normalizeResponsesReasoningField(body: Record<string, unknown>): void {
  if (body.reasoning_effort !== undefined && body.reasoning === undefined) {
    body.reasoning = { effort: body.reasoning_effort, summary: "auto" };
  }
  if (body.reasoning && typeof body.reasoning === "object" && !Array.isArray(body.reasoning)) {
    const r = body.reasoning as Record<string, unknown>;
    if (!r.summary) r.summary = "auto";
  }
  delete body.reasoning_effort;
}

const MAX_TOOL_NAME_LEN = 128;

/** Whether `value` is a non-array, non-null object. */
function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

/**
 * A string field on `toolObj`, falling back to the same field on a nested
 * Chat-Completions `function` object when `toolObj` itself does not have it.
 */
function pickToolStringField(
  toolObj: Record<string, unknown>,
  fn: Record<string, unknown> | null,
  key: "name" | "description"
): string {
  if (typeof toolObj[key] === "string") return toolObj[key] as string;
  const nested = fn?.[key];
  return typeof nested === "string" ? nested : "";
}

/**
 * The tool's JSON-schema parameters object, from `toolObj` or a nested
 * `function` object, defaulting to an empty object schema and always
 * carrying a `properties` map (the Responses API rejects one without it).
 */
function resolveToolParameters(
  toolObj: Record<string, unknown>,
  fn: Record<string, unknown> | null
): Record<string, unknown> {
  const parameters = (isPlainRecord(toolObj.parameters) ? toolObj.parameters : null) ??
    (isPlainRecord(fn?.parameters) ? (fn!.parameters as Record<string, unknown>) : null) ?? {
      type: "object",
      properties: {},
    };
  return parameters.type === "object" && !parameters.properties
    ? { ...parameters, properties: {} }
    : parameters;
}

/**
 * Normalize one Responses-API tool entry to the flat `{type, name, description,
 * parameters}` shape (accepting either that shape or a nested Chat-Completions
 * `{function: {...}}` shape as input), mutating it in place. Returns `null` for
 * an entry with no resolvable name, which the caller drops.
 */
function normalizeResponsesToolEntry(t: unknown): Record<string, unknown> | null {
  if (!isPlainRecord(t)) return null;
  const toolObj = t;
  const fn = isPlainRecord(toolObj.function) ? toolObj.function : null;
  const name = pickToolStringField(toolObj, fn, "name").trim();
  if (!name) return null;
  const description = pickToolStringField(toolObj, fn, "description");
  const parameters = resolveToolParameters(toolObj, fn);
  for (const k of Object.keys(toolObj)) delete toolObj[k];
  toolObj.type = "function";
  toolObj.name = name.slice(0, MAX_TOOL_NAME_LEN);
  if (description) toolObj.description = description;
  toolObj.parameters = parameters;
  return toolObj;
}

/** Whether a Responses-API reasoning item carries plaintext in `content` or `summary`. */
function hasReplayableReasoningText(item: Record<string, unknown>): boolean {
  return [item.content, item.summary].some(
    (parts) =>
      Array.isArray(parts) &&
      parts.some((part) => isPlainRecord(part) && typeof part.text === "string" && part.text !== "")
  );
}

/**
 * Whether a Responses-API `input` item should be kept, normalizing
 * function_call/function_call_output entries in place as a side effect.
 */
function shouldKeepResponsesInputItem(item: unknown): boolean {
  if (!item || typeof item !== "object" || Array.isArray(item)) return true;
  const rec = item as Record<string, unknown>;
  delete rec.encrypted_content;
  delete rec.reasoning_encrypted_content;
  // An opaque reasoning item means nothing to this upstream, but one with readable text is the
  // replayed thinking DeepSeek rejects a turn without (#13031).
  if (rec.type === "reasoning") return hasReplayableReasoningText(rec);
  if (rec.type === "function_call") {
    if (!rec.name || typeof rec.name !== "string" || (rec.name as string).trim() === "")
      return false;
    rec.name = (rec.name as string).trim().slice(0, MAX_TOOL_NAME_LEN);
    rec.call_id = clampResponsesCallId(rec.call_id);
    rec.arguments = coerceResponsesArguments(rec.arguments);
    return true;
  }
  if (rec.type === "function_call_output") {
    rec.call_id = clampResponsesCallId(rec.call_id);
    rec.output = coerceResponsesOutput(rec.output);
    return true;
  }
  return true;
}

/**
 * Sanitize body for OpenAI Responses API endpoint (/responses) (PR #4145).
 */
export function sanitizeResponsesBody(body: Record<string, unknown>): void {
  if (!body || typeof body !== "object") return;

  normalizeResponsesTokenFields(body);
  normalizeResponsesReasoningField(body);

  if (Array.isArray(body.tools)) {
    body.tools = body.tools
      .map((t: unknown) => normalizeResponsesToolEntry(t))
      .filter((t: Record<string, unknown> | null): t is Record<string, unknown> => t !== null);
  }

  if (Array.isArray(body.input)) {
    body.input = body.input.filter(shouldKeepResponsesInputItem);
  }
}
