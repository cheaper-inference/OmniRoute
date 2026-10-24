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
 * blocks are buffered for streaming.
 */


const DOTS_OPEN_RE = /<dots_function_call\b[^>]*>/i;
const DOTS_CLOSE_RE = /<\/dots_function_call>/i;

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

export interface DotsParseOptions {
  tools?: Array<{ type?: string; function?: { name?: string; parameters?: unknown } }>;
  final?: boolean;
}

function coerceValue(value: string, schema: unknown): unknown {
  if (!schema || typeof schema !== "object") {
    const trimmed = value.trim();
    // Try to parse as JSON if it looks like JSON
    if (
      (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
      (trimmed.startsWith("[") && trimmed.endsWith("]"))
    ) {
      try {
        return JSON.parse(trimmed);
      } catch {
        return value;
      }
    }
    // Try to parse quoted strings
    if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
      try {
        return JSON.parse(trimmed);
      } catch {
        return trimmed.slice(1, -1);
      }
    }
    // Try numbers/booleans/null
    if (trimmed === "true") return true;
    if (trimmed === "false") return false;
    if (trimmed === "null") return null;
    if (/^-?\d+$/.test(trimmed)) return parseInt(trimmed, 10);
    if (/^-?\d+\.\d+$/.test(trimmed)) return parseFloat(trimmed);
    return value;
  }

  const schemaObj = schema as Record<string, unknown>;
  const trimmed = value.trim();

  if (schemaObj.type === "integer") {
    const n = parseInt(trimmed, 10);
    return isNaN(n) ? value : n;
  }
  if (schemaObj.type === "number") {
    const n = parseFloat(trimmed);
    return isNaN(n) ? value : n;
  }
  if (schemaObj.type === "boolean") {
    if (trimmed === "true") return true;
    if (trimmed === "false") return false;
    return value;
  }
  if (schemaObj.type === "null") {
    return null;
  }
  if (schemaObj.type === "array" || schemaObj.type === "object") {
    try {
      return JSON.parse(trimmed);
    } catch {
      return value;
    }
  }
  // string or unknown
  return value;
}

function resolveSchemaRef(schema: unknown, defs: Record<string, unknown>): unknown {
  if (!schema || typeof schema !== "object") return schema;
  const schemaObj = schema as Record<string, unknown>;
  if (typeof schemaObj.$ref === "string") {
    const ref = schemaObj.$ref;
    if (ref.startsWith("#/$defs/")) {
      const key = ref.slice("#/$defs/".length);
      return defs[key] || schema;
    }
    if (ref.startsWith("#/definitions/")) {
      const key = ref.slice("#/definitions/".length);
      return defs[key] || schema;
    }
    return schema;
  }
  return schema;
}

function getParameterSchema(
  rootSchema: unknown,
  paramName: string,
  defs: Record<string, unknown>
): unknown {
  if (!rootSchema || typeof rootSchema !== "object") return undefined;
  let schema = rootSchema as Record<string, unknown>;
  schema = resolveSchemaRef(schema, defs) as Record<string, unknown>;
  const properties = schema.properties as Record<string, unknown> | undefined;
  if (!properties) return undefined;
  let paramSchema = properties[paramName];
  if (!paramSchema) return undefined;
  paramSchema = resolveSchemaRef(paramSchema, defs);
  return paramSchema;
}

function collectDefs(schema: unknown, defs: Record<string, unknown>): void {
  if (!schema || typeof schema !== "object") return;
  const schemaObj = schema as Record<string, unknown>;
  if (schemaObj.$defs && typeof schemaObj.$defs === "object") {
    Object.assign(defs, schemaObj.$defs as Record<string, unknown>);
  }
  if (schemaObj.definitions && typeof schemaObj.definitions === "object") {
    Object.assign(defs, schemaObj.definitions as Record<string, unknown>);
  }
  if (Array.isArray(schemaObj.anyOf)) {
    for (const s of schemaObj.anyOf) collectDefs(s, defs);
  }
  if (Array.isArray(schemaObj.oneOf)) {
    for (const s of schemaObj.oneOf) collectDefs(s, defs);
  }
  if (Array.isArray(schemaObj.allOf)) {
    for (const s of schemaObj.allOf) collectDefs(s, defs);
  }
}

export function hasDotsToolCalls(text: string): boolean {
  if (!text || typeof text !== "string") return false;
  return /<dots_function_call\b/i.test(text);
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

export function parseDotsToolCalls(text: string, options: DotsParseOptions = {}): ParseDotsResult {
  if (!text || typeof text !== "string") {
    return { content: text || "", toolCalls: [], holdback: "" };
  }

  const { tools = [] } = options;

  // Build tool schema map
  const toolMap = new Map<string, unknown>();
  const allDefs: Record<string, unknown> = {};
  for (const tool of tools) {
    if (tool?.function?.name) {
      if (tool.function.parameters) {
        toolMap.set(tool.function.name, tool.function.parameters);
        collectDefs(tool.function.parameters, allDefs);
      }
    }
  }

  let remaining = text;
  const toolCalls: DotsToolCall[] = [];
  let cleaned = "";

  while (remaining.length > 0) {
    const openMatch = remaining.match(DOTS_OPEN_RE);
    if (!openMatch || openMatch.index === undefined) {
      // No more complete blocks
      cleaned += remaining;
      return { content: cleaned, toolCalls, holdback: "" };
    }

    // Emit text before this block
    const before = remaining.slice(0, openMatch.index);
    cleaned += before;

    const afterOpen = remaining.slice(openMatch.index + openMatch[0].length);
    const closeMatch = DOTS_CLOSE_RE.exec(afterOpen);
    if (!closeMatch) {
      // Incomplete block - hold back
      return { content: cleaned, toolCalls, holdback: openMatch[0] + afterOpen };
    }

    const inner = afterOpen.slice(0, closeMatch.index);
    remaining = afterOpen.slice(closeMatch.index + closeMatch[0].length);

    // Try structured invoke first
    const invokeMatch = inner.match(INVOKE_OPEN_RE);
    if (invokeMatch) {
      const toolName = invokeMatch[1];
      // Check if tool is declared
      if (tools.length > 0 && !toolMap.has(toolName)) {
        // Unknown tool - keep as content
        cleaned += openMatch[0] + inner + closeMatch[0];
        continue;
      }

      const invokeEndMatch = inner.match(INVOKE_CLOSE_RE);
      const invokeInner = invokeEndMatch
        ? inner.slice(invokeMatch.index! + invokeMatch[0].length, invokeEndMatch.index!)
        : "";

      const args: Record<string, unknown> = {};
      const paramRegex = new RegExp(PARAMETER_RE);
      let pm: RegExpExecArray | null;
      const rootSchema = toolMap.get(toolName);
      while ((pm = paramRegex.exec(invokeInner)) !== null) {
        const paramName = pm[1];
        const paramValue = pm[2];
        const paramSchema = getParameterSchema(rootSchema, paramName, allDefs);
        args[paramName] = coerceValue(paramValue, paramSchema);
      }

      toolCalls.push({
        id: generateCallId(),
        type: "function",
        function: {
          name: toolName,
          arguments: JSON.stringify(args),
        },
      });
      continue;
    }

    // Try JSON fallback
    const jsonMatch = inner.match(DOTS_JSON_RE);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        const toolName = parsed.name || parsed.function?.name;
        if (!toolName) {
          cleaned += openMatch[0] + inner + closeMatch[0];
          continue;
        }
        if (tools.length > 0 && !toolMap.has(toolName)) {
          cleaned += openMatch[0] + inner + closeMatch[0];
          continue;
        }
        const rawArgs = parsed.arguments || parsed.args || parsed.parameters || {};
        toolCalls.push({
          id: generateCallId(),
          type: "function",
          function: {
            name: toolName,
            arguments: typeof rawArgs === "string" ? rawArgs : JSON.stringify(rawArgs),
          },
        });
        continue;
      } catch {
        cleaned += openMatch[0] + inner + closeMatch[0];
        continue;
      }
    }

    // Couldn't parse - keep as content
    cleaned += openMatch[0] + inner + closeMatch[0];
  }

  return { content: cleaned, toolCalls, holdback: "" };
}
