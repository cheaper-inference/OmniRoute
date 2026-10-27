/**
 * Cloudflare AI Playground Tool Call Translation
 *
 * The Cloudflare Playground does not have native tool/function calling. Instead,
 * we emulate tool calling by serializing OpenAI `tools[]` into a compact prompt
 * contract (sent as its own user message — the server-side persona drops system
 * messages and rejects any single message over 6000 chars) and parsing the
 * model's text reply back into OpenAI `tool_calls`.
 *
 * Real-world shapes observed from the playground:
 *   - `<tool>{"command": "ls"}</tool>` — no name field, infer from schema
 *   - `<tool name="bash">{"command": "ls"}</tool>` — explicit name attribute
 *   - `<tool:name>...</tool:name>` — name as the tag suffix
 *   - `<bash>{"command": "ls"}</bash>` — any declared tool name as the tag
 *   - `<read="{...}"></read>` — payload inside a tag attribute
 *   - `bash({"command": "ls"})` — function-call style
 *   - `bash(command="ls")` — Python/named-argument style
 *   - `{"name": "bash", "arguments": {...}}` — wrapped payload
 *
 * Payloads are normalized leniently (unquoted keys/values, single quotes,
 * trailing commas, double-escaped newlines) so a small model's sloppy JSON
 * still becomes a valid tool call.
 */
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import type { ChatCompletionTool } from "openai/resources/chat/completions";

/**
 * OpenAI tool definition (subset we care about).
 */
export interface CfToolDef {
  name: string;
  description?: string;
  parameters: Record<string, unknown>;
}

/**
 * Parsed tool call from the model's text output.
 */
export interface CfParsedToolCall {
  id: string;
  name: string;
  arguments: string; // JSON string
}

/**
 * The Cloudflare Playground rejects any single message longer than 6000
 * characters ("Prompt too long (max 6000 characters)"). Keep a safety margin.
 */
export const CF_MAX_MESSAGE_CHARS = 5800;

/**
 * Render a JSON schema as a compact TypeScript-ish signature.
 * Keeps the model-oriented information (names, types, required flags, enums)
 * while dropping descriptions/annotations that blow up the prompt budget.
 */
function renderCompactSchema(schema: unknown): string {
  if (!schema || typeof schema !== "object") return "any";
  const s = schema as Record<string, unknown>;
  if (Array.isArray(s.enum)) {
    return s.enum.map((v) => JSON.stringify(v)).join("|");
  }
  if (s.type === "array") return `${renderCompactSchema(s.items)}[]`;
  if (s.type === "object" || s.properties) {
    const props = s.properties as Record<string, unknown> | undefined;
    if (!props) return "object";
    const required = new Set(Array.isArray(s.required) ? (s.required as string[]) : []);
    const inner = Object.entries(props)
      .map(([key, value]) => `${key}${required.has(key) ? "" : "?"}: ${renderCompactSchema(value)}`)
      .join(", ");
    return `{${inner}}`;
  }
  if (typeof s.type === "string") return s.type;
  return "any";
}

/**
 * Serialize OpenAI `tools[]` into a compact contract block the model can read.
 * The Cloudflare Playground caps each message at 6000 chars, so the block is
 * deliberately terse — one line per tool, no pretty-printed JSON.
 */
export function serializeCfToolPrompt(tools: ChatCompletionTool[]): string {
  if (!tools || tools.length === 0) return "";

  const lines = [
    "# Tools",
    'To call a tool, reply with <tool name="NAME">{"arg": value}</tool>. Arguments must be valid JSON. Emit no other text when calling a tool.',
    "",
    "Tools:",
  ];

  for (const tool of tools) {
    const fn = tool.function;
    const signature = renderCompactSchema(fn.parameters);
    const description = (fn.description ?? "").replace(/\s+/g, " ").trim().slice(0, 160);
    lines.push(`- ${fn.name}(${signature})${description ? ` — ${description}` : ""}`);
  }

  return lines.join("\n");
}

/** Split text into chunks no longer than `maxChars`, preferring line breaks. */
function chunkPrompt(text: string, maxChars: number): string[] {
  if (text.length <= maxChars) return [text];
  const chunks: string[] = [];
  let current = "";
  for (const line of text.split("\n")) {
    if (current.length + line.length + 1 > maxChars && current) {
      chunks.push(current);
      current = "";
    }
    current = current ? `${current}\n${line}` : line;
    // A single line can still be huge — hard-split it.
    while (current.length > maxChars) {
      chunks.push(current.slice(0, maxChars));
      current = current.slice(maxChars);
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

/**
 * Check if the text contains what looks like a tool call attempt but is
 * malformed (e.g., unclosed tags, invalid JSON). This helps us decide whether
 * to treat the response as a tool call or regular text.
 */
export function hasMalformedCfToolIntent(text: string): boolean {
  if (!text) return false;
  // Look for tool-like tags that don't parse cleanly
  const toolTagRegex = /<\s*tool\b[^>]*>|<\s*\/\s*tool\s*>/i;
  const shellTagRegex = /<\s*shell\b[^>]*>|<\s*\/\s*shell\s*>/i;
  const hasToolTag = toolTagRegex.test(text);
  const hasShellTag = shellTagRegex.test(text);
  if (!hasToolTag && !hasShellTag) return false;
  // If it has tags but parseCfToolCalls returns empty, it's malformed
  // Use a dummy tool list so name inference works for <tool> without name
  const parsed = parseCfToolCalls(text, [{ name: "dummy", parameters: {} }]);
  return parsed.length === 0;
}

/**
 * Parse tool calls from the model's text output.
 *
 * Handles the following shapes:
 *   1. `<tool>{"arg": "val"}</tool>` — name omitted, infer from schema
 *   2. `<tool name="bash">{"arg": "val"}</tool>` — explicit name attribute
 *   3. `<tool:bash>{"arg": "val"}</tool:bash>` — name as tag suffix
 *   4. `<shell>...</shell>` — tool name IS the tag (discovered live)
 *   5. `bash({"command": "ls"})` — function-call style (discovered live)
 *   6. `<bash>...</bash>` — any declared tool name as the tag (discovered live)
 *
 * @param text - The model's full text response
 * @param availableTools - List of tool definitions (for name inference when omitted)
 * @returns Array of parsed tool calls with generated IDs
 */
/**
 * Repair the most common JSON mistakes models make in tool payloads:
 * double-escaped whitespace (`{\n"command": "ls"}` where `\n` is two literal
 * characters). Single quotes / unquoted keys / bare values are handled by the
 * lenient parser below.
 */
function repairJson(text: string): string {
  return text
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\n")
    .replace(/\\t/g, "\t");
}

/**
 * Lenient JSON parser for model output: accepts unquoted keys, single-quoted
 * strings, bare (unquoted) string values, trailing commas and real newlines.
 * Only used when strict `JSON.parse` fails, so it never changes well-formed
 * payloads.
 */
function parseLooseJson(input: string): unknown {
  let i = 0;
  const s = input;
  const skipWs = () => {
    while (i < s.length && /\s/.test(s[i])) i++;
  };

  const parseString = (quote: string): string => {
    i++; // opening quote
    let out = "";
    while (i < s.length) {
      const c = s[i];
      if (c === "\\") {
        const next = s[i + 1] ?? "";
        i += 2;
        if (next === "n") out += "\n";
        else if (next === "t") out += "\t";
        else if (next === "r") out += "\r";
        else if (next === "u") {
          out += String.fromCharCode(parseInt(s.slice(i, i + 4), 16));
          i += 4;
        } else out += next;
        continue;
      }
      if (c === quote) {
        i++;
        return out;
      }
      out += c;
      i++;
    }
    throw new Error("unterminated string");
  };

  const parseBare = (): unknown => {
    const start = i;
    while (i < s.length && !/[,}\]:]/.test(s[i])) i++;
    const raw = s.slice(start, i).trim();
    if (!raw) throw new Error("empty value");
    if (raw === "true") return true;
    if (raw === "false") return false;
    if (raw === "null") return null;
    if (/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(raw)) return Number(raw);
    return raw;
  };

  const parseObject = (): Record<string, unknown> => {
    i++; // {
    const obj: Record<string, unknown> = {};
    skipWs();
    if (s[i] === "}") {
      i++;
      return obj;
    }
    while (i < s.length) {
      skipWs();
      let key: string;
      if (s[i] === '"' || s[i] === "'") {
        key = parseString(s[i]);
      } else {
        const start = i;
        while (i < s.length && !/[:}\s]/.test(s[i])) i++;
        key = s.slice(start, i).trim();
      }
      skipWs();
      if (s[i] !== ":") throw new Error("expected ':'");
      i++;
      obj[key] = parseValue();
      skipWs();
      if (s[i] === ",") {
        i++;
        skipWs();
        if (s[i] === "}") {
          i++;
          return obj;
        }
        continue;
      }
      if (s[i] === "}") {
        i++;
        return obj;
      }
      throw new Error("expected ',' or '}'");
    }
    throw new Error("unterminated object");
  };

  const parseArray = (): unknown[] => {
    i++; // [
    const arr: unknown[] = [];
    skipWs();
    if (s[i] === "]") {
      i++;
      return arr;
    }
    while (i < s.length) {
      arr.push(parseValue());
      skipWs();
      if (s[i] === ",") {
        i++;
        skipWs();
        if (s[i] === "]") {
          i++;
          return arr;
        }
        continue;
      }
      if (s[i] === "]") {
        i++;
        return arr;
      }
      throw new Error("expected ',' or ']'");
    }
    throw new Error("unterminated array");
  };

  function parseValue(): unknown {
    skipWs();
    const ch = s[i];
    if (ch === "{") return parseObject();
    if (ch === "[") return parseArray();
    if (ch === '"' || ch === "'") return parseString(ch);
    return parseBare();
  }

  const value = parseValue();
  skipWs();
  if (i !== s.length) throw new Error("trailing data");
  return value;
}

/**
 * Normalize tool-call arguments into a valid JSON string.
 * Returns the original text when it already parses (preserving formatting),
 * otherwise the repaired-and-restringified payload, or null when unparseable.
 */
function normalizeToolArguments(content: string): string | null {
  const trimmed = content.trim();
  try {
    JSON.parse(trimmed);
    return trimmed;
  } catch {
    /* try the lenient path */
  }
  try {
    const parsed = parseLooseJson(repairJson(trimmed));
    if (parsed === null || typeof parsed !== "object") return null;
    return JSON.stringify(parsed);
  } catch {
    return null;
  }
}

/**
 * Models sometimes wrap the payload as `{"name": "shell", "arguments": {...}}`
 * instead of the raw argument object. Normalize both shapes.
 */
function unwrapToolPayload(content: string): { name: string | null; argsJson: string } {
  try {
    const parsed = JSON.parse(content);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const obj = parsed as Record<string, unknown>;
      if (typeof obj.name === "string" && obj.arguments !== undefined) {
        return {
          name: obj.name,
          argsJson:
            typeof obj.arguments === "string" ? obj.arguments : JSON.stringify(obj.arguments),
        };
      }
    }
  } catch {
    /* not the wrapped format */
  }
  return { name: null, argsJson: content };
}

/**
 * Extract a payload embedded in a tag attribute, e.g.
 * `<read="{path: \"/etc/hostname\"}"></read>`. Returns null when no quoted
 * attribute value looks like JSON.
 */
function extractPayloadFromAttrs(attrs: string): string | null {
  const attrMatch = attrs.match(/=\s*(["'])([\s\S]*)\1\s*$/);
  if (!attrMatch) return null;
  let payload = attrMatch[2].replace(/\\"/g, '"').replace(/\\'/g, "'").trim();
  if (!payload || !/^[[{]/.test(payload)) return null;
  return payload;
}

export function parseCfToolCalls(text: string, availableTools: CfToolDef[]): CfParsedToolCall[] {
  if (!text) return [];

  const calls: CfParsedToolCall[] = [];

  // Pattern 1: <tool name="...">...</tool> or <tool>...</tool>
  const toolTagRegex = /<\s*tool\b([^>]*)>([\s\S]*?)<\s*\/\s*tool\s*>/gi;
  let match: RegExpExecArray | null;
  while ((match = toolTagRegex.exec(text)) !== null) {
    const attrs = match[1];
    const content = match[2].trim() || extractPayloadFromAttrs(attrs) || "";
    // Only accept tool calls whose arguments normalize to valid JSON
    const normalized = normalizeToolArguments(content);
    if (!normalized) continue;
    // Handle format: <tool>{"name": "shell", "arguments": {...}}</tool>
    const unwrapped = unwrapToolPayload(normalized);
    const nameMatch = attrs.match(/name\s*=\s*["']([^"']+)["']/i);
    const name =
      unwrapped.name ??
      (nameMatch ? nameMatch[1] : inferToolName(unwrapped.argsJson, availableTools));
    if (name) {
      calls.push({
        id: `call_${crypto.randomUUID().slice(0, 8)}`,
        name,
        arguments: unwrapped.argsJson,
      });
    }
  }

  // Pattern 2: <tool:name>...</tool:name> (alternative form)
  const toolNameTagRegex = /<\s*tool:(\w+)>([\s\S]*?)<\s*\/\s*tool:\1\s*>/gi;
  while ((match = toolNameTagRegex.exec(text)) !== null) {
    const tagName = match[1];
    const content = match[2].trim();
    const normalized = normalizeToolArguments(content);
    if (!normalized) continue;
    const unwrapped = unwrapToolPayload(normalized);
    calls.push({
      id: `call_${crypto.randomUUID().slice(0, 8)}`,
      name: unwrapped.name ?? tagName,
      arguments: unwrapped.argsJson,
    });
  }

  // Pattern 3: <toolname>...</toolname> — the tool name IS the tag.
  // Observed live across models: <shell>, <bash>, <glob>, <read>, ...
  // Accept any tag whose name matches a declared tool (plus "shell", which the
  // playground models emit even when the caller named the tool differently).
  const knownTagNames = new Set(availableTools.map((t) => t.name));
  knownTagNames.add("shell");
  const anyToolTagRegex = /<\s*([a-zA-Z_][\w.-]*)\b([^>]*)>([\s\S]*?)<\s*\/\s*\1\s*>/gi;
  while ((match = anyToolTagRegex.exec(text)) !== null) {
    const tagName = match[1];
    if (!knownTagNames.has(tagName)) continue;
    const content = match[3].trim() || extractPayloadFromAttrs(match[2]) || "";
    const normalized = normalizeToolArguments(content);
    if (!normalized) continue;
    const unwrapped = unwrapToolPayload(normalized);
    calls.push({
      id: `call_${crypto.randomUUID().slice(0, 8)}`,
      name: unwrapped.name ?? tagName,
      arguments: unwrapped.argsJson,
    });
  }

  // Pattern 4: name({"arg": value}) — function-call style, observed live.
  const callStyleRegex = /\b([a-zA-Z_][\w.-]*)\s*\(\s*(\{[\s\S]*?\}|\[[\s\S]*?\])\s*\)/g;
  while ((match = callStyleRegex.exec(text)) !== null) {
    const callName = match[1];
    if (!knownTagNames.has(callName)) continue;
    const normalized = normalizeToolArguments(match[2]);
    if (!normalized) continue;
    const unwrapped = unwrapToolPayload(normalized);
    calls.push({
      id: `call_${crypto.randomUUID().slice(0, 8)}`,
      name: unwrapped.name ?? callName,
      arguments: unwrapped.argsJson,
    });
  }

  // Pattern 5: name(arg="value", flag=true) — Python/named-argument style.
  const namedArgRegex = /\b([a-zA-Z_][\w.-]*)\s*\(([^()]*)\)/g;
  while ((match = namedArgRegex.exec(text)) !== null) {
    const callName = match[1];
    if (!knownTagNames.has(callName)) continue;
    const inner = match[2].trim();
    if (!inner.includes("=")) continue;
    const parsed = parseNamedArgs(inner);
    if (!parsed) continue;
    calls.push({
      id: `call_${crypto.randomUUID().slice(0, 8)}`,
      name: callName,
      arguments: JSON.stringify(parsed),
    });
  }

  return calls;
}

/**
 * Parse `key="value", flag=true, n=3` into an object. Returns null when the
 * text is not a well-formed named-argument list.
 */
function parseNamedArgs(inner: string): Record<string, unknown> | null {
  const args: Record<string, unknown> = {};
  // Split on commas that are not inside quotes.
  const parts: string[] = [];
  let current = "";
  let quote: string | null = null;
  for (const ch of inner) {
    if (quote) {
      current += ch;
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      current += ch;
      continue;
    }
    if (ch === ",") {
      parts.push(current);
      current = "";
      continue;
    }
    current += ch;
  }
  parts.push(current);

  for (const part of parts) {
    const eq = part.indexOf("=");
    if (eq === -1) return null;
    const key = part.slice(0, eq).trim();
    const rawValue = part.slice(eq + 1).trim();
    if (!key) return null;
    args[key] = parseScalar(rawValue);
  }
  return Object.keys(args).length > 0 ? args : null;
}

function parseScalar(raw: string): unknown {
  const value = raw.trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "null") return null;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  return value;
}

/**
 * Infer the tool name when the model omits it.
 * Strategy:
 *   1. If availableTools has exactly one tool, use that.
 *   2. If a hint is provided (e.g., "shell" for <shell> tags), use that if it matches.
 *   3. Otherwise, return the first tool's name.
 */
function inferToolName(
  _content: string,
  availableTools: CfToolDef[],
  hint?: string
): string | null {
  if (availableTools.length === 0) return null;

  // If hint provided and matches a tool, use it
  if (hint) {
    const hintTool = availableTools.find((t) => t.name === hint);
    if (hintTool) return hintTool.name;
  }

  // Single tool available — infer it
  if (availableTools.length === 1) {
    return availableTools[0].name;
  }

  // Multiple tools but no name given — default to first (best effort)
  return availableTools[0].name;
}

/**
 * Build the conversation prompt with the tool contract inserted as its own
 * user message(s) before the first user turn (the playground drops system
 * messages, and rejects any single message longer than 6000 chars).
 */
export function buildCfToolConversationPrompt(
  messages: ChatCompletionMessageParam[],
  tools: ChatCompletionTool[]
): ChatCompletionMessageParam[] {
  const toolPrompt = serializeCfToolPrompt(tools);
  if (!toolPrompt) return messages;

  // Find the first user message — the contract is inserted immediately before it.
  const firstUserIndex = messages.findIndex((m) => m.role === "user");
  if (firstUserIndex === -1) return messages;

  // The playground rejects any message >6000 chars, so the contract goes in as
  // its own user message(s) instead of being folded into the user's prompt.
  const contractMessages: ChatCompletionMessageParam[] = chunkPrompt(
    toolPrompt,
    CF_MAX_MESSAGE_CHARS
  ).map((chunk) => ({ role: "user" as const, content: chunk }));

  return [
    ...messages.slice(0, firstUserIndex),
    ...contractMessages,
    ...messages.slice(firstUserIndex),
  ];
}

/**
 * Strip tool-call markup from text, leaving only the conversational content.
 * Used when the model emits both text and tool calls in one response.
 *
 * @param text - Raw model text
 * @param toolNames - Optional declared tool names, so `<bash>…</bash>`-style
 *   tags (tool name as the tag) are stripped too.
 */
export function stripCfToolMarkup(text: string, toolNames: string[] = []): string {
  if (!text) return "";
  let stripped = text
    .replace(/<\s*tool\b[^>]*>[\s\S]*?<\s*\/\s*tool\s*>/gi, "")
    .replace(/<\s*tool:(\w+)>[\s\S]*?<\s*\/\s*tool:\1\s*>/gi, "")
    .replace(/<\s*shell\b[^>]*>[\s\S]*?<\s*\/\s*shell\s*>/gi, "");
  for (const toolName of toolNames) {
    const escaped = toolName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    stripped = stripped.replace(
      new RegExp(`<\\s*${escaped}\\b[^>]*>[\\s\\S]*?<\\s*\\/\\s*${escaped}\\s*>`, "gi"),
      ""
    );
    // function-call style: bash({"command": "ls"})
    stripped = stripped.replace(
      new RegExp(`\\b${escaped}\\s*\\(\\s*\\{[\\s\\S]*?\\}\\s*\\)`, "gi"),
      ""
    );
  }
  return stripped
    .replace(/^---+\s*\n?/m, "") // separator line
    .trimStart(); // only trim leading whitespace, preserve trailing for test
}
