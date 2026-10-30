// Drop the synthetic `reason` argument from Gemini/Antigravity tool calls.
//
// cleanJSONSchemaForAntigravity() gives every object schema without properties a
// required `reason` property (Phase 6), because the upstream rejects the empty form.
// The model then fills it, and a strict client rejects the call: Claude Code answers
// "InputValidationError: An unexpected parameter 'reason' was provided" for its
// parameter-less tools (TaskList, CronList, ...). The request keeps the placeholder;
// this removes the argument again, only at the object positions where the cleaner
// added it for that tool's CLIENT schema. A `reason` the client declared is kept.

import {
  cleanJSONSchemaForAntigravity,
  GEMINI_PLACEHOLDER_KEY,
  GEMINI_PLACEHOLDER_SCHEMA,
} from "./geminiHelper.ts";
import { toGeminiParametersSchema } from "./geminiToolsSanitizer.ts";

type JsonRecord = Record<string, unknown>;

/** Client parameter schema → the schema actually sent upstream (null when it cannot be built). */
const sentSchemaCache = new WeakMap<object, unknown>();

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasOwn(record: JsonRecord, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(record, key);
}

function declaredName(tool: JsonRecord): string {
  const fn = isRecord(tool.function) ? tool.function : null;
  const name = typeof fn?.name === "string" ? fn.name : tool.name;
  return typeof name === "string" ? name.trim() : "";
}

/** The client's tools[] entry for `name`: exact spelling first, then case-insensitive. */
function findClientTool(clientTools: unknown, name: string): JsonRecord | null {
  if (!Array.isArray(clientTools) || !name) return null;
  const lower = name.toLowerCase();
  let caseInsensitive: JsonRecord | null = null;
  for (const tool of clientTools) {
    if (!isRecord(tool)) continue;
    const declared = declaredName(tool);
    if (declared === name) return tool;
    if (!caseInsensitive && declared && declared.toLowerCase() === lower) caseInsensitive = tool;
  }
  return caseInsensitive;
}

/** Same root coercion + cleaning as buildGeminiTools(), cached per client schema object. */
function sentParametersSchema(tool: JsonRecord): unknown {
  const fn = isRecord(tool.function) ? tool.function : null;
  const raw = fn ? fn.parameters : (tool.parameters ?? tool.input_schema);
  const cacheKey = isRecord(raw) ? raw : tool;
  if (sentSchemaCache.has(cacheKey)) return sentSchemaCache.get(cacheKey);
  let sent: unknown = null;
  try {
    sent = cleanJSONSchemaForAntigravity(toGeminiParametersSchema(raw), { location: "tools" });
  } catch {
    // The request already cleaned this schema; if it cannot be rebuilt here, leave args as-is.
    sent = null;
  }
  sentSchemaCache.set(cacheKey, sent);
  return sent;
}

function isPlaceholderProperties(properties: JsonRecord): boolean {
  const keys = Object.keys(properties);
  if (keys.length !== 1 || keys[0] !== GEMINI_PLACEHOLDER_KEY) return false;
  const placeholder = properties[GEMINI_PLACEHOLDER_KEY];
  return (
    isRecord(placeholder) &&
    placeholder.type === GEMINI_PLACEHOLDER_SCHEMA.type &&
    placeholder.description === GEMINI_PLACEHOLDER_SCHEMA.description
  );
}

/** Array arm of stripAt(): each item against `items`; a copy only when an item changed. */
function stripArrayItems(itemsSchema: unknown, value: unknown[]): unknown[] {
  if (!isRecord(itemsSchema)) return value;
  let changed = false;
  const next = value.map((item) => {
    const stripped = stripAt(itemsSchema, item);
    if (stripped !== item) changed = true;
    return stripped;
  });
  return changed ? next : value;
}

/** Walk `value` alongside the sent schema; returns a copy only where something was removed. */
function stripAt(schema: unknown, value: unknown): unknown {
  if (!isRecord(schema)) return value;
  if (Array.isArray(value)) return stripArrayItems(schema.items, value);
  if (!isRecord(value) || !isRecord(schema.properties)) return value;

  const properties = schema.properties;
  let out = value;
  if (isPlaceholderProperties(properties) && hasOwn(value, GEMINI_PLACEHOLDER_KEY)) {
    out = { ...value };
    delete out[GEMINI_PLACEHOLDER_KEY];
  }
  for (const [key, child] of Object.entries(out)) {
    if (!hasOwn(properties, key)) continue;
    const stripped = stripAt(properties[key], child);
    if (stripped === child) continue;
    if (out === value) out = { ...value };
    out[key] = stripped;
  }
  return out;
}

/**
 * Remove the synthetic `reason` argument from a Gemini-family tool call. `clientTools`
 * is the CLIENT request's tools[] (Anthropic `input_schema` or OpenAI `function.parameters`).
 * Returns `args` unchanged when the tool is unknown or nothing was injected.
 */
export function stripGeminiPlaceholderArgs(
  toolName: string,
  args: unknown,
  clientTools: unknown
): unknown {
  if (!isRecord(args)) return args;
  const tool = findClientTool(clientTools, toolName);
  if (!tool) return args;
  return stripAt(sentParametersSchema(tool), args);
}
