/**
 * Parser/scrubber for Dots Studio's `<dots_function_call>` tool-call markup.
 *
 * Dots models emit tool calls as inline text inside `<dots_function_call>` blocks
 * rather than structured `tool_calls`. Two shapes appear:
 *
 *   1. Structured invoke with parameter tags:
 *        <dots_function_call>
 *          <invoke name="get_current_weather">
 *            <parameter name="city">Boston</parameter>
 *            <parameter name="unit">celsius</parameter>
 *          </invoke>
 *        </dots_function_call>
 *
 *   2. Pure-JSON fallback:
 *        <dots_function_call>{"name":"search","arguments":{"query":"tables"}}</dots_function_call>
 *
 * The parser converts complete blocks into OpenAI `tool_calls` records and scrubs
 * them from content. It accepts request tool schemas for type-aware coercion;
 * unknown tool names (when tools are declared) are left as content. Incomplete
 * blocks, and a trailing partial `<dots_function_call` opener, are buffered for
 * streaming; with `final: true` (non-streaming bodies) they stay in the content.
 */

import { findDeclaredToolName } from "../services/declaredToolCasing.ts";

const DOTS_OPEN_RE = /<dots_function_call\b[^>]*>/i;
const DOTS_CLOSE_RE = /<\/dots_function_call>/i;
const DOTS_OPEN_TAG = "<dots_function_call";
// A complete tag name whose `>` has not arrived yet (optionally with attributes).
const DOTS_UNCLOSED_OPEN_RE = /<dots_function_call(?:\s[^<>]*)?$/i;

// Opening/closing markers for invoke blocks inside dots_function_call
const INVOKE_OPEN_RE = /<invoke\s+name="([^"]+)"[^>]*>/i;
const INVOKE_CLOSE_RE = /<\/invoke>/i;
const PARAMETER_RE = /<parameter\s+name="([^"]+)"[^>]*>([\s\S]*?)<\/parameter>/gi;

// For JSON fallback inside dots_function_call
const DOTS_JSON_RE = /\{[\s\S]*\}/;

export interface DotsToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
}

export interface ParseDotsResult {
  content: string;
  toolCalls: DotsToolCall[];
  holdback: string;
}

/**
 * Request tool declarations in either shape: OpenAI (`function.name` +
 * `function.parameters`) or Anthropic (`name` + `input_schema`). Declared names
 * resolve through `findDeclaredToolName`; a tool without any schema is still
 * "declared".
 */
export interface DotsParseOptions {
  tools?: unknown[];
  final?: boolean;
}

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function isJsonContainerText(text: string): boolean {
  return (
    (text.startsWith("{") && text.endsWith("}")) || (text.startsWith("[") && text.endsWith("]"))
  );
}

function tryParseJson(text: string, fallback: unknown): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return fallback;
  }
}

function coerceScalarGuess(trimmed: string, raw: string): unknown {
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "null") return null;
  if (/^-?\d+$/.test(trimmed)) return parseInt(trimmed, 10);
  if (/^-?\d+\.\d+$/.test(trimmed)) return parseFloat(trimmed);
  return raw;
}

/** Best-effort typing when the tool schema says nothing about the parameter. */
function coerceUntyped(value: string): unknown {
  const trimmed = value.trim();
  if (isJsonContainerText(trimmed)) return tryParseJson(trimmed, value);
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return tryParseJson(trimmed, trimmed.slice(1, -1));
  }
  return coerceScalarGuess(trimmed, value);
}

function coerceNumeric(trimmed: string, raw: string, integer: boolean): unknown {
  const n = integer ? parseInt(trimmed, 10) : parseFloat(trimmed);
  return isNaN(n) ? raw : n;
}

function coerceBoolean(trimmed: string, raw: string): unknown {
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  return raw;
}

function coerceTyped(value: string, type: unknown): unknown {
  const trimmed = value.trim();
  switch (type) {
    case "integer":
      return coerceNumeric(trimmed, value, true);
    case "number":
      return coerceNumeric(trimmed, value, false);
    case "boolean":
      return coerceBoolean(trimmed, value);
    case "null":
      return null;
    case "array":
    case "object":
      return tryParseJson(trimmed, value);
    default:
      return value;
  }
}

function coerceValue(value: string, schema: unknown): unknown {
  const schemaObj = asRecord(schema);
  if (!schemaObj) return coerceUntyped(value);
  return coerceTyped(value, schemaObj.type);
}

function resolveSchemaRef(schema: unknown, defs: Record<string, unknown>): unknown {
  const schemaObj = asRecord(schema);
  if (!schemaObj || typeof schemaObj.$ref !== "string") return schema;
  const ref = schemaObj.$ref;
  for (const prefix of ["#/$defs/", "#/definitions/"]) {
    if (ref.startsWith(prefix)) return defs[ref.slice(prefix.length)] || schema;
  }
  return schema;
}

function getParameterSchema(
  rootSchema: unknown,
  paramName: string,
  defs: Record<string, unknown>
): unknown {
  if (!rootSchema || typeof rootSchema !== "object") return undefined;
  const schema = asRecord(resolveSchemaRef(rootSchema, defs));
  const properties = asRecord(schema?.properties);
  const paramSchema = properties?.[paramName];
  if (!paramSchema) return undefined;
  return resolveSchemaRef(paramSchema, defs);
}

function collectDefs(schema: unknown, defs: Record<string, unknown>): void {
  const schemaObj = asRecord(schema);
  if (!schemaObj) return;
  for (const key of ["$defs", "definitions"]) {
    const group = asRecord(schemaObj[key]);
    if (group) Object.assign(defs, group);
  }
  for (const key of ["anyOf", "oneOf", "allOf"]) {
    const branches = schemaObj[key];
    if (Array.isArray(branches)) for (const s of branches) collectDefs(s, defs);
  }
}

export function hasDotsToolCalls(text: string): boolean {
  if (!text || typeof text !== "string") return false;
  return /<dots_function_call\b/i.test(text);
}

/**
 * Index where a trailing, still-incomplete `<dots_function_call` opener starts
 * (a prefix of the tag name, or the full name before its `>`), or -1.
 */
function partialOpenerStart(text: string): number {
  const unclosed = DOTS_UNCLOSED_OPEN_RE.exec(text);
  if (unclosed) return unclosed.index;
  const lastLt = text.lastIndexOf("<");
  if (lastLt === -1) return -1;
  return DOTS_OPEN_TAG.startsWith(text.slice(lastLt).toLowerCase()) ? lastLt : -1;
}

/** True when a streaming delta must go through the parser: a block, or a trailing partial opener. */
export function needsDotsParsing(text: string): boolean {
  if (!text || typeof text !== "string") return false;
  return hasDotsToolCalls(text) || partialOpenerStart(text) !== -1;
}

export function stripDotsToolCallBlocks(text: string): string {
  if (!text || typeof text !== "string") return text;
  return text
    .replace(/<dots_function_call\b[^>]*>[\s\S]*?<\/dots_function_call>/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function generateCallId(): string {
  const hex = crypto.randomUUID().replace(/-/g, "").slice(0, 24);
  return `call_${hex}`;
}

interface ToolIndex {
  declared: unknown[];
  schemas: Map<string, unknown>;
  defs: Record<string, unknown>;
}

/** Schema of one tools[] entry in either shape (OpenAI parameters / Anthropic input_schema). */
function schemaOfTool(tool: unknown): unknown {
  const item = asRecord(tool);
  if (!item) return undefined;
  const fn = asRecord(item.function);
  return fn?.parameters ?? item.input_schema ?? item.parameters ?? undefined;
}

function declaredNameOfTool(tool: unknown): string {
  const item = asRecord(tool);
  if (!item) return "";
  const fn = asRecord(item.function);
  const name = typeof fn?.name === "string" ? fn.name : item.name;
  return typeof name === "string" ? name.trim() : "";
}

function buildToolIndex(tools: unknown[]): ToolIndex {
  const index: ToolIndex = { declared: tools, schemas: new Map(), defs: {} };
  for (const tool of tools) {
    const name = declaredNameOfTool(tool);
    const schema = schemaOfTool(tool);
    if (!name || !schema) continue;
    index.schemas.set(name, schema);
    collectDefs(schema, index.defs);
  }
  return index;
}

/** The declared spelling of `name`; null when tools are declared but none matches; `name` as-is when no tools are declared. */
function resolveToolName(index: ToolIndex, name: string): string | null {
  if (index.declared.length === 0) return name;
  return findDeclaredToolName(index.declared, name);
}

function makeToolCall(name: string, args: string): DotsToolCall {
  return { id: generateCallId(), type: "function", function: { name, arguments: args } };
}

function parseInvokeArgs(
  invokeInner: string,
  rootSchema: unknown,
  defs: Record<string, unknown>
): Record<string, unknown> {
  const args: Record<string, unknown> = {};
  const paramRegex = new RegExp(PARAMETER_RE);
  let pm: RegExpExecArray | null;
  while ((pm = paramRegex.exec(invokeInner)) !== null) {
    args[pm[1]] = coerceValue(pm[2], getParameterSchema(rootSchema, pm[1], defs));
  }
  return args;
}

/** Structured `<invoke name=...>` body. null = no invoke here; undefined = invoke of an undeclared tool. */
function parseInvokeBody(inner: string, index: ToolIndex): DotsToolCall | null | undefined {
  const invokeMatch = inner.match(INVOKE_OPEN_RE);
  if (!invokeMatch) return null;
  const toolName = resolveToolName(index, invokeMatch[1]);
  if (toolName === null) return undefined;
  const invokeEndMatch = inner.match(INVOKE_CLOSE_RE);
  const invokeInner = invokeEndMatch
    ? inner.slice((invokeMatch.index ?? 0) + invokeMatch[0].length, invokeEndMatch.index)
    : "";
  const args = parseInvokeArgs(invokeInner, index.schemas.get(toolName), index.defs);
  return makeToolCall(toolName, JSON.stringify(args));
}

/** Pure-JSON body. undefined = not a usable call (keep as content). */
function parseJsonBody(inner: string, index: ToolIndex): DotsToolCall | undefined {
  const jsonMatch = inner.match(DOTS_JSON_RE);
  if (!jsonMatch) return undefined;
  const parsed = asRecord(tryParseJson(jsonMatch[0], null));
  if (!parsed) return undefined;
  const rawName = parsed.name || asRecord(parsed.function)?.name;
  if (typeof rawName !== "string" || !rawName) return undefined;
  const toolName = resolveToolName(index, rawName);
  if (toolName === null) return undefined;
  const rawArgs = parsed.arguments || parsed.args || parsed.parameters || {};
  return makeToolCall(toolName, typeof rawArgs === "string" ? rawArgs : JSON.stringify(rawArgs));
}

function parseBlockInner(inner: string, index: ToolIndex): DotsToolCall | undefined {
  const invoked = parseInvokeBody(inner, index);
  if (invoked !== null) return invoked;
  return parseJsonBody(inner, index);
}

/**
 * End of the parsed text: a held-back tail stays out of `content` while streaming,
 * but a final (non-streaming) parse can never complete it, so it is plain content.
 */
function finishParse(
  cleaned: string,
  tail: string,
  toolCalls: DotsToolCall[],
  options: DotsParseOptions
): ParseDotsResult {
  const start = options.final ? -1 : partialOpenerStart(tail);
  if (start === -1) return { content: cleaned + tail, toolCalls, holdback: "" };
  return { content: cleaned + tail.slice(0, start), toolCalls, holdback: tail.slice(start) };
}

export function parseDotsToolCalls(text: string, options: DotsParseOptions = {}): ParseDotsResult {
  if (!text || typeof text !== "string") {
    return { content: text || "", toolCalls: [], holdback: "" };
  }

  const index = buildToolIndex(Array.isArray(options.tools) ? options.tools : []);
  const toolCalls: DotsToolCall[] = [];
  let remaining = text;
  let cleaned = "";

  while (remaining.length > 0) {
    const openMatch = remaining.match(DOTS_OPEN_RE);
    if (!openMatch || openMatch.index === undefined) {
      return finishParse(cleaned, remaining, toolCalls, options);
    }
    cleaned += remaining.slice(0, openMatch.index);

    const afterOpen = remaining.slice(openMatch.index + openMatch[0].length);
    const closeMatch = DOTS_CLOSE_RE.exec(afterOpen);
    if (!closeMatch) {
      // Incomplete block - hold back while streaming; a final parse keeps it as content
      const block = openMatch[0] + afterOpen;
      if (options.final) return { content: cleaned + block, toolCalls, holdback: "" };
      return { content: cleaned, toolCalls, holdback: block };
    }

    const inner = afterOpen.slice(0, closeMatch.index);
    remaining = afterOpen.slice(closeMatch.index + closeMatch[0].length);

    const call = parseBlockInner(inner, index);
    if (call) toolCalls.push(call);
    else cleaned += openMatch[0] + inner + closeMatch[0]; // unparseable / undeclared: keep as content
  }

  return { content: cleaned, toolCalls, holdback: "" };
}
