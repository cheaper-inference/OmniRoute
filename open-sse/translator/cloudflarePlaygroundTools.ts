/**
 * Cloudflare AI Playground Tool Call Translation
 *
 * The Cloudflare Playground does not have native tool/function calling. Instead,
 * we emulate tool calling by serializing OpenAI `tools[]` into a compact prompt
 * contract (sent as its own user message — the server-side persona drops system
 * messages and rejects any single message over 6000 chars) and parsing the
 * model's text reply back into OpenAI `tool_calls`.
 *
 * The contract asks for bare JSON — `{"name": …, "arguments": {…}, "_nonce": …}`,
 * or an array of those for a multi-call turn — because models reproduce JSON
 * far more reliably than an invented markup dialect. The tag ladder below is
 * kept as a recovery net for drift and for history replayed from sessions that
 * started before the JSON contract.
 *
 * Real-world shapes observed from the playground:
 *   - `{"name": "bash", "arguments": {"command": "ls"}}` — the contract's shape
 *   - `{"name": "bash", "command": "ls"}` — flattened, arguments beside the name
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
 *
 * Three defences sit on top of the parser, matching the shared emulated
 * tool-calling core the other web providers use:
 *   - the contract asks for a per-request `_nonce` binding, and a call carrying
 *     a different one is treated as text (a replayed or injected envelope);
 *   - accepted arguments are validated against the tool's declared JSON schema;
 *   - a reply that expresses tool intent but fails either test is retried once in
 *     a fresh room instead of being returned as an answer with the call buried
 *     in it (`finalizeCfToolCalls`, `hasMalformedCfToolIntent`).
 */
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import type { ChatCompletionTool } from "openai/resources/chat/completions";

import {
  CF_MAX_MESSAGE_CHARS,
  compactCfConversation,
  countsTowardCfConversationCap,
} from "./cloudflarePlaygroundConversation.ts";
import {
  extractBalancedJson,
  isStandaloneCfJsonText,
  normalizeToolArguments,
  parseCfJsonCalls,
  stripCfJsonCalls,
} from "./cloudflarePlaygroundJson.ts";
import {
  CF_GENERIC_TOOL_TAGS,
  CF_WRAPPER_TAG_SOURCE,
  applyToolNameHint,
  hasNestedToolTag,
  inferToolName,
  resolveDeclaredToolName,
} from "./cloudflarePlaygroundNameResolution.ts";

// Nonce binding, schema validation and name aliasing come from the shared
// emulated-tool-calling core the other web providers use, so cfp cannot drift
// from them.
import {
  getRequestedToolNames,
  getToolNonce,
  parseLooseJsonObject,
  resolveRequestedToolName,
} from "./webTools.ts";
import { validateToolArguments } from "./toolArgValidation.ts";

// Re-exported so existing importers (the executor, the tests) keep one entry
// point for the provider's translation surface.
export {
  CF_COMPACT_HEADER,
  CF_MAX_MESSAGE_CHARS,
  cfMessageText,
  cfToolCallMarkup,
  compactCfConversation,
  flattenCfMessageContent,
  trimCfConversation,
  truncateCfMessage,
  type CfMessageLike,
} from "./cloudflarePlaygroundConversation.ts";

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
 * The Cloudflare Playground rejects a conversation carrying more than 10
 * user-role messages ("This demo is limited to 10 messages per conversation.
 * Start a new chat to continue."). Assistant messages do NOT count — measured
 * live: 10 user turns pass and 11 fail, whatever number of assistant replies
 * sits between them. Tool results are replayed as user messages and the tool
 * contract travels as a user message, so both share this budget.
 */
export const CF_MAX_CONVERSATION_MESSAGES = 10;

/**
 * How many messages from the end of the conversation the tool reminder is
 * re-stated at — a SillyTavern-style "author's note" for emulated tool calling.
 *
 * The contract travels as the *first* message, so by the time a long session is
 * mid-loop the format rule sits ~10 turns away from the generation point. The
 * reminder puts a short restatement back inside the recency window.
 *
 * `0` appends it last (most influential, but it can read as the newest user
 * turn); `1`–`3` sandwiches it a little upstream, which is why the default is 1.
 */
export const CF_TOOL_REMINDER_DEPTH = 1;

/**
 * Only spend a conversation slot on the reminder once the tail is long enough
 * that the contract at the top is no longer close to the generation point. On a
 * short conversation the reminder would only repeat what the model just read.
 */
export const CF_TOOL_REMINDER_MIN_MESSAGES = 6;

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

  const nonce = getToolNonce(tools);
  const call = (name: string, args: string) =>
    `{"name": "${name}", "arguments": ${args}, "_nonce": "${nonce}"}`;
  const lines = [
    "# Tool Calling Instructions",
    "To invoke a tool, reply with ONLY a JSON object — no XML tags, no prose, no code fences:",
    call("<tool_name>", `{"arg": value}`),
    "- `name` is the exact tool name from the list below.",
    "- `arguments` is one JSON object holding that tool's declared argument keys.",
    `- \`_nonce\` must be copied verbatim: \`"_nonce": "${nonce}"\`.`,
    "## Rules",
    "- **JSON Only:** One JSON object, or a JSON array of them when several calls are needed. Nothing before or after it.",
    "- **Parameter Match:** Argument names must precisely match the tool's declared schema.",
    '- **Multiple Calls:** Put every call in one array: [{"name": ...}, {"name": ...}].',
    "- **No Call Needed:** Answer normally in prose and emit no JSON object.",
    "",
    "## Examples & Common Mistakes",
    "",
    "### ✅ Correct Example",
    "User: Check the contents of package.json and run the build script.",
    `Assistant: [${call("read", '{"path": "package.json"}')},`,
    `${call("shell", '{"command": "npm run build"}')}]`,
    "",
    "### ❌ Incorrect Formats and How to Fix Them",
    "",
    "1. **XML Tags (the old format):**",
    `   ❌ WRONG: <read>{"path": "package.json", "_nonce": "${nonce}"}</read>`,
    `   ✅ CORRECT: ${call("read", '{"path": "package.json"}')}`,
    "",
    "2. **Markdown Code Fences:**",
    `   ❌ WRONG: \`\`\`json\n${call("read", '{"path": "package.json"}')}\n\`\`\``,
    `   ✅ CORRECT: ${call("read", '{"path": "package.json"}')}`,
    "",
    "3. **Missing Security Nonce:**",
    '   ❌ WRONG: {"name": "read", "arguments": {"path": "package.json"}}',
    `   ✅ CORRECT: ${call("read", '{"path": "package.json"}')}`,
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
/**
 * Render the short reminder that re-states the tool contract near the end of the
 * conversation (see `CF_TOOL_REMINDER_DEPTH`).
 *
 * Deliberately much shorter than the contract: it repeats only what a model
 * drifts on — the tag shape, the nonce, the escaping rule for long bodies — and
 * leaves the per-tool signatures to the contract at the top. Its length stays
 * bounded no matter how many tools the caller declares.
 */
export function buildCfToolReminder(tools: ChatCompletionTool[]): string {
  if (!tools || tools.length === 0) return "";

  const nonce = getToolNonce(tools);
  const names = tools.map((tool) => tool.function.name);
  const shown = names.slice(0, 6);
  const more = names.length > shown.length ? ` (+${names.length - shown.length} more)` : "";

  return [
    "# Tool Call Reminder",
    "To call a tool, reply ONLY with a JSON object:",
    `{"name": "<tool>", "arguments": {"arg": value}, "_nonce": "${nonce}"}`,
    "",
    "## Quick Example",
    `{"name": "read", "arguments": {"path": "src/index.js"}, "_nonce": "${nonce}"}`,
    "",
    "## Rules",
    `- **Allowed Tools:** Only these names are read: ${shown.join(", ")}${more}.`,
    "- **JSON Only:** Put the tool name in `name`, its arguments in `arguments`, and emit no XML tags, code fences or prose around the object.",
    ' - **JSON Escaping:** Inside the JSON, escape every double quote as \\" and every newline as \\n.',
    `- **Nonce:** Always include \`"_nonce": "${nonce}"\` inside the object.`,
    "- **Fallback:** If no tool call is needed, answer normally without any JSON object.",
  ].join("\n");
}
/**
 * The per-request nonce this provider binds tool calls with.
 *
 * Same source as the contract (`getToolNonce` is keyed on the tools array, which
 * flows unchanged from serialization to parsing), so the executor can verify a
 * reply against the exact value the model was given.
 */
export function cfToolNonce(tools: unknown): string {
  return getToolNonce(tools);
}

/**
 * Hold a parsed turn to the nonce + argument-schema contract before it is handed
 * back to the client.
 *
 * Returns the accepted calls, or `null` when the turn expressed tool intent but
 * failed the contract — the caller then treats it like any other malformed
 * envelope and retries once. Three rules, matching the shared core:
 *
 * - A call whose arguments carry `_nonce` must carry *this* request's value. A
 *   wrong one is a copy-attack or a hallucinated envelope replayed from an
 *   earlier turn; executing it would re-run a tool the user already answered.
 *   A missing `_nonce` is tolerated so shapes with no JSON body (XML argument
 *   tags) keep working.
 * - The name must be a declared tool. Names the parser accepted through an alias
 *   (a bare `<shell>` when the caller named the tool `bash`) are resolved with
 *   the shared fuzzy matcher before giving up.
 * - The arguments must satisfy the tool's declared JSON schema.
 *
 * `_nonce` is stripped from the accepted arguments so the client never sees it.
 */
export function finalizeCfToolCalls(
  calls: CfParsedToolCall[],
  tools: unknown,
  nonce: string
): CfParsedToolCall[] | null {
  if (!calls || calls.length === 0) return null;

  const requested = getRequestedToolNames(tools);
  const declared = new Set(requested.map((tool) => tool.original));
  const accepted: CfParsedToolCall[] = [];

  for (const call of calls) {
    const args = parseLooseJsonObject(call.arguments);
    if (!args) return null;

    let bound = false;
    if (args._nonce !== undefined) {
      if (args._nonce !== nonce) return null;
      delete args._nonce;
      bound = true;
    }

    const name = declared.has(call.name)
      ? call.name
      : requested.length > 0
        ? resolveRequestedToolName(call.name, requested)
        : null;
    if (!name) return null;

    if (!validateToolArguments(tools, name, args)) return null;

    // Only re-serialize when the binding was stripped; otherwise the model's
    // argument bytes reach the client untouched.
    accepted.push(bound ? { ...call, name, arguments: JSON.stringify(args) } : { ...call, name });
  }

  return accepted;
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

/** Escape a tool name so it can be embedded in a RegExp. */
function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Check if the text contains what looks like a tool call attempt but is
 * malformed (e.g., unclosed tags, invalid JSON). This helps us decide whether
 * to treat the response as a tool call or regular text.
 *
 * `toolNames` are the tools the client declared. They matter: the models write
 * `<read><path>a.py</path></read>` as often as they write `<tool ...>`, and a
 * *broken* one of those is exactly as much tool intent as a broken `<tool>`
 * one. Without them the five-call XML turn that motivated this check looked
 * like plain prose and was answered with no calls at all.
 *
 * A bare mention of a tag (`Wrap the payload in <tool> tags`) is not intent;
 * the tag has to open a block — be followed by a JSON/XML body, or have a
 * matching closing tag.
 */
export function hasMalformedCfToolIntent(
  text: string,
  toolNames: string[] = [],
  availableTools?: CfToolDef[]
): boolean {
  if (!text) return false;

  const candidates = [...CF_GENERIC_TOOL_TAGS, "shell", ...toolNames];
  const opensABlock = candidates.some((name) => {
    const tag = `<\\s*${escapeRegex(name)}\\b[^>]*>`;
    return (
      new RegExp(`${tag}\\s*[{\\[<]`, "i").test(text) ||
      new RegExp(`${tag}[\\s\\S]*?<\\s*\\/\\s*${escapeRegex(name)}\\s*>`, "i").test(text)
    );
  });

  // A call written as a function invocation — `read(path: "/")`, `shell("ls")`,
  // or the same thing right after a wrapper opener. No pattern reads the colon
  // form, and before this check the reply was returned as a plain text answer
  // with the call buried in it, so the client never learned the turn failed.
  // Anchored to a line start or an opening tag so a prose mention of `read(` is
  // not mistaken for intent.
  const callIntent =
    [...toolNames, "shell"].some((name) => {
      const escaped = escapeRegex(name);
      return new RegExp(`(^|\\n|<[^>\\n]*>)\\s*${escaped}\\s*\\(`, "i").test(text);
    }) ||
    // A call-looking identifier right after a generic wrapper: the tool may not
    // be declared at all (`<tool_call>list_directory(path: "/")`), and answering
    // with the markup as prose is worse than one retry.
    new RegExp(`<\\s*${CF_WRAPPER_TAG_SOURCE}\\b[^>]*>\\s*[A-Za-z_][\\w.-]*\\s*\\(`, "i").test(
      text
    );

  // A JSON envelope that names a declared tool *and* looks like a call attempt
  // (it carries an arguments field, or it is the whole reply) is tool intent
  // even when the payload did not survive the parser — a truncated object, a
  // name the caller does not declare, arguments that are not an object. Prose
  // that merely quotes a tool's schema (`{"name": "read", "description": …}`)
  // must not trigger a retry.
  const jsonIntent =
    /"tool_calls"\s*:/.test(text) ||
    (toolNames.some((name) =>
      new RegExp(`"name"\\s*:\\s*"${escapeRegex(name)}"`, "i").test(text)
    ) &&
      (/"arguments"\s*:/.test(text) || isStandaloneCfJsonText(text)));

  if (!opensABlock && !callIntent && !jsonIntent) return false;

  // If it has tags but parseCfToolCalls returns empty, it's malformed. The probe
  // list mirrors the real tool set so name inference and the declared-name
  // patterns behave exactly as they do in the executor. Without the real
  // schemas, a nameless payload looks ambiguous and would be retried forever.
  const probe: CfToolDef[] =
    availableTools && availableTools.length > 0
      ? availableTools
      : [{ name: "dummy", parameters: {} }, ...toolNames.map((name) => ({ name, parameters: {} }))];
  return parseCfToolCalls(text, probe).length === 0;
}

/**
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
        let argsJson =
          typeof obj.arguments === "string" ? obj.arguments : JSON.stringify(obj.arguments);
        // An envelope-shaped call is self-contained (`{"name", "arguments"}`), so a
        // replayed one is indistinguishable from a fresh one. Carry its `_nonce`
        // into the arguments, where the binding check can see it — otherwise it
        // would pass as an unbound call and be executed again.
        if (obj._nonce !== undefined) {
          const inner = parseLooseJsonObject(argsJson);
          if (inner && inner._nonce === undefined) {
            argsJson = JSON.stringify({ ...inner, _nonce: obj._nonce });
          }
        }
        return { name: obj.name, argsJson };
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
  const payload = attrMatch[2].replace(/\\"/g, '"').replace(/\\'/g, "'").trim();
  if (!payload || !/^[[{]/.test(payload)) return null;
  return payload;
}

/**
 * Extract the first balanced JSON object/array embedded anywhere in a string.
 * Handles malformed tags like `<tool name="read"{"path": "."}></tool>` where
 * the model forgot the closing quote and `>` before the payload, and payloads
 * that themselves contain `>` (e.g. `{"command": "ls > out.txt"}`).
 */
function extractEmbeddedJson(raw: string): string | null {
  // Payloads embedded in markup often have escaped quotes; unescape first so
  // the brace/quote scan below is not thrown off.
  const text = raw.replace(/\\"/g, '"').replace(/\\'/g, "'");
  const start = text.search(/[[{]/);
  if (start === -1) return null;
  const open = text[start];
  const close = open === "{" ? "}" : "]";
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === open) depth++;
    else if (ch === close) {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  return null;
}

/**
 * Decode the XML entities models emit when they escape markup inside a value.
 * `&amp;` is decoded last so a literal `&amp;lt;` does not become `<`.
 */
function decodeXmlEntities(value: string): string {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

/**
 * Read `<param>value</param>` pairs out of a tool tag body.
 *
 * Playground models sometimes emit XML-style arguments instead of the JSON the
 * contract asks for:
 *
 *   <read><path>a.py</path></read>
 *   <shell><command>ps aux | grep x</command></shell>
 *
 * Returns null when the body carries no such pair, so prose and JSON bodies are
 * left to the other patterns.
 */
function extractXmlParams(body: string): Array<[string, string]> | null {
  const paramRegex = /<\s*([a-zA-Z_][\w.-]*)\s*>([\s\S]*?)<\s*\/\s*\1\s*>/gi;
  const params: Array<[string, string]> = [];
  let match: RegExpExecArray | null;
  while ((match = paramRegex.exec(body)) !== null) {
    params.push([match[1], decodeXmlEntities(match[2].trim())]);
  }
  return params.length > 0 ? params : null;
}

/**
 * Map `<param>` names onto the tool's declared argument names and coerce
 * scalars using the declared JSON-schema type.
 *
 * When a tool declares exactly one property and the body carries exactly one
 * pair, the declared name wins regardless of the tag the model used — models
 * write `<read><file_path>…</file_path></read>` for a tool whose argument is
 * `path`. Only number/integer/boolean are coerced; everything else stays a
 * string, which is what every observed playground tool expects.
 */
function xmlParamsToArguments(
  params: Array<[string, string]>,
  def: CfToolDef | undefined
): Record<string, unknown> {
  const props =
    def && def.parameters && typeof def.parameters === "object"
      ? ((def.parameters as Record<string, unknown>).properties as
          Record<string, Record<string, unknown>> | undefined)
      : undefined;
  const declared = props ? Object.keys(props) : [];
  const single = declared.length === 1 && params.length === 1 ? declared[0] : null;
  const args: Record<string, unknown> = {};
  for (const [rawKey, rawValue] of params) {
    const key = single ?? rawKey;
    const type = props?.[key]?.type;
    if (type === "number") {
      const num = Number(rawValue);
      args[key] = Number.isFinite(num) ? num : rawValue;
    } else if (type === "integer") {
      const num = Number.parseInt(rawValue, 10);
      args[key] = Number.isFinite(num) ? num : rawValue;
    } else if (type === "boolean") {
      args[key] = /^(true|1|yes)$/i.test(rawValue);
    } else {
      args[key] = rawValue;
    }
  }
  return args;
}

/**
 * Parse tool calls out of the model's text reply.
 *
 * The contract asks for bare JSON (`{"name": …, "arguments": {…}, "_nonce": …}`,
 * or an array of those), so that is read first-class by Pattern 5b. The XML-tag
 * ladder below stays as a recovery net: models drift back to tags, and history
 * replayed from a session that started before the JSON contract still carries
 * them.
 *
 * `options.nonce` is this request's binding: a JSON value that names a declared
 * tool is accepted without it, while an unnamed one is only trusted when it
 * carries that exact nonce — which is what keeps prose JSON from being mistaken
 * for a call.
 */
export function parseCfToolCalls(
  text: string,
  availableTools: CfToolDef[],
  options?: { nonce?: string }
): CfParsedToolCall[] {
  if (!text) return [];

  const calls: CfParsedToolCall[] = [];
  // Spans already turned into a tool call, so the loose fallback below does not
  // emit duplicates. Each entry is [start, end) into `text`.
  const handledSpans: Array<[number, number]> = [];
  const isHandled = (start: number, end: number) =>
    handledSpans.some(([s, e]) => start < e && end > s);

  // Pattern 1: <tool name="...">...</tool> or <tool>...</tool>. Also accepts
  // the `<tool_call>` / `<tool-call>` / `<toolcall>` / `<function_call>`
  // spellings many models are trained on (e.g.
  // `<tool_call>{"name":"bash","arguments":{...}}</tool_call>`).
  const toolTagRegex = new RegExp(
    `<\\s*${CF_WRAPPER_TAG_SOURCE}\\b([^>]*)>([\\s\\S]*?)<\\s*\\/\\s*${CF_WRAPPER_TAG_SOURCE}\\s*>`,
    "gi"
  );
  let match: RegExpExecArray | null;
  while ((match = toolTagRegex.exec(text)) !== null) {
    const attrs = match[1];
    const content =
      match[2].trim() || extractPayloadFromAttrs(attrs) || extractEmbeddedJson(attrs) || "";
    // Only accept tool calls whose arguments normalize to valid JSON
    const normalized = normalizeToolArguments(content);
    if (!normalized) {
      // `<tool name="read"><path>a.py</path></tool>` — XML-style arguments
      // inside an explicit `<tool>` wrapper. Pattern 3b cannot see this one
      // because the tag is `tool`, not the tool's name.
      const xmlName = attrs.match(/name\s*=\s*["']([^"']+)["']/i);
      const xmlParams = extractXmlParams(content);
      if (xmlName && xmlParams) {
        const def = availableTools.find((t) => t.name === xmlName[1]);
        calls.push({
          id: `call_${crypto.randomUUID().slice(0, 8)}`,
          name: xmlName[1],
          arguments: JSON.stringify(xmlParamsToArguments(xmlParams, def)),
        });
        handledSpans.push([match.index, match.index + match[0].length]);
      }
      continue;
    }
    // Handle format: <tool>{"name": "shell", "arguments": {...}}</tool>
    const unwrapped = unwrapToolPayload(normalized);
    const nameMatch = attrs.match(/name\s*=\s*["']([^"']+)["']/i);

    // A nameless generic wrapper that carries a nested tool tag is a container,
    // not a call: step past its opener and let the loop match the inner tag.
    // Before this, the wrapper body was accepted as a nameless payload (the
    // embedded JSON was extracted from the markup), the inner name was never
    // read, and the call resolved to the caller's first tool.
    const body = match[2];
    if (
      !unwrapped.name &&
      !nameMatch &&
      !/^\s*[[{]/.test(body) &&
      hasNestedToolTag(body, availableTools)
    ) {
      toolTagRegex.lastIndex = match.index + match[0].indexOf(">") + 1;
      continue;
    }

    const resolved = applyToolNameHint(
      unwrapped.name ?? (nameMatch ? nameMatch[1] : null),
      unwrapped.argsJson,
      availableTools
    );
    if (!resolved) continue;
    const name = resolved.name ?? inferToolName(resolved.argsJson, availableTools);
    if (name) {
      calls.push({
        id: `call_${crypto.randomUUID().slice(0, 8)}`,
        name,
        arguments: resolved.argsJson,
      });
      handledSpans.push([match.index, match.index + match[0].length]);
    }
  }

  // Pattern 1b: recover malformed `<tool ...>` tags where a `>` inside the JSON
  // payload (e.g. `{"command": "ls > out.txt"}`) truncated the attribute scan
  // above. Re-scan the whole tag body for a balanced JSON payload.
  const looseToolRegex = new RegExp(
    `<\\s*${CF_WRAPPER_TAG_SOURCE}\\b([\\s\\S]*?)<\\s*\\/\\s*${CF_WRAPPER_TAG_SOURCE}\\s*>`,
    "gi"
  );
  while ((match = looseToolRegex.exec(text)) !== null) {
    const start = match.index;
    const end = start + match[0].length;
    if (isHandled(start, end)) continue;
    const inner = match[1];
    const nameMatch = inner.match(/name\s*=\s*["']?([A-Za-z_][\w.-]*)/i);
    if (!nameMatch) continue;
    const embedded = extractEmbeddedJson(inner);
    if (!embedded) continue;
    const normalized = normalizeToolArguments(embedded);
    if (!normalized) continue;
    const unwrapped = unwrapToolPayload(normalized);
    calls.push({
      id: `call_${crypto.randomUUID().slice(0, 8)}`,
      name: unwrapped.name ?? nameMatch[1],
      arguments: unwrapped.argsJson,
    });
    handledSpans.push([start, end]);
  }

  // Pattern 1c: `<tool ...>` with no closing tag. Models hit their output
  // limit mid-payload, or simply omit `</tool>`; the call used to be dropped
  // and its markup leaked to the client as text. Deliberately narrow: only an
  // opening tag whose remainder carries no closing tag at all and whose body
  // starts with the JSON payload. A `<tool:name>` body belongs to Pattern 2, a
  // body with any closing tag belongs to Pattern 1, and prose that merely
  // mentions `<tool>` is left alone.
  const openOnlyRegex = new RegExp(`<\\s*${CF_WRAPPER_TAG_SOURCE}\\b([^>]*)>([\\s\\S]*)$`, "gi");
  while ((match = openOnlyRegex.exec(text)) !== null) {
    const start = match.index;
    if (isHandled(start, start + 1)) continue;
    if (/^\s*:/.test(match[1])) continue;
    const body = match[2].trim();
    if (/<\s*\//.test(body) || !/^[[{]/.test(body)) continue;
    const normalized = normalizeToolArguments(body);
    if (!normalized) continue;
    const unwrapped = unwrapToolPayload(normalized);
    const attrName = match[1].match(/name\s*=\s*["']([^"']+)["']/i);
    const resolved = applyToolNameHint(
      unwrapped.name ?? (attrName ? attrName[1] : null),
      unwrapped.argsJson,
      availableTools
    );
    if (!resolved) continue;
    const name = resolved.name ?? inferToolName(resolved.argsJson, availableTools);
    if (!name) continue;
    calls.push({
      id: `call_${crypto.randomUUID().slice(0, 8)}`,
      name,
      arguments: resolved.argsJson,
    });
    handledSpans.push([start, text.length]);
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
    // Claimed, so Pattern 6 does not read the same block again through its
    // `<tool:name>` fallback.
    handledSpans.push([match.index, match.index + match[0].length]);
  }

  // Pattern 3: <toolname>...</toolname> — the tool name IS the tag.
  // Observed live across models: <shell>, <bash>, <glob>, <read>, ...
  // Accept any tag whose name matches a declared tool (plus "shell", which the
  // playground models emit even when the caller named the tool differently).
  const knownTagNames = new Set(availableTools.map((t) => t.name));
  knownTagNames.add("shell");
  // Tags are matched case-insensitively (models write `<Read>`); the name handed
  // to the client must keep the caller's declared spelling.
  const resolveKnownTag = (tagName: string): string | null => {
    if (knownTagNames.has(tagName)) return tagName;
    return resolveDeclaredToolName(tagName, availableTools);
  };
  const anyToolTagRegex = /<\s*([a-zA-Z_][\w.-]*)\b([^>]*)>([\s\S]*?)<\s*\/\s*\1\s*>/gi;
  while ((match = anyToolTagRegex.exec(text)) !== null) {
    const tagName = resolveKnownTag(match[1]);
    if (!tagName) continue;
    const start = match.index;
    if (isHandled(start, start + 1)) continue;
    const content =
      match[3].trim() || extractPayloadFromAttrs(match[2]) || extractEmbeddedJson(match[2]) || "";
    const normalized = normalizeToolArguments(content);
    if (!normalized) continue;
    const unwrapped = unwrapToolPayload(normalized);
    const resolved = applyToolNameHint(
      unwrapped.name ?? tagName,
      unwrapped.argsJson,
      availableTools
    );
    if (!resolved) continue;
    calls.push({
      id: `call_${crypto.randomUUID().slice(0, 8)}`,
      name: resolved.name ?? tagName,
      arguments: resolved.argsJson,
    });
    handledSpans.push([start, start + match[0].length]);
  }

  // Pattern 3b: <toolname><param>value</param></toolname> — XML-style arguments
  // instead of a JSON body, so Pattern 3 above (which needs JSON) drops them.
  // Observed live: a single turn carrying five calls at once —
  //   <read><path>a.py</path></read>
  //   <shell><command>ps aux | grep x</command></shell>
  // Every declared tool name is accepted, in document order, so a turn that
  // batches several reads keeps its ordering.
  const xmlToolRegex = /<\s*([a-zA-Z_][\w.-]*)\b([^>]*)>([\s\S]*?)<\s*\/\s*\1\s*>/gi;
  while ((match = xmlToolRegex.exec(text)) !== null) {
    const tagName = resolveKnownTag(match[1]);
    if (!tagName) continue;
    const start = match.index;
    if (isHandled(start, start + 1)) continue;
    const body = match[3].trim();
    // A JSON body belongs to Pattern 3; do not also read it as XML params.
    if (!body || /^[[{]/.test(body)) continue;
    const params = extractXmlParams(body);
    if (!params) continue;
    const def = availableTools.find((t) => t.name === tagName);
    calls.push({
      id: `call_${crypto.randomUUID().slice(0, 8)}`,
      name: tagName,
      arguments: JSON.stringify(xmlParamsToArguments(params, def)),
    });
    handledSpans.push([start, start + match[0].length]);
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

  // Pattern 5b: the JSON protocol — the shape the contract asks for. A call
  // arrives as a bare JSON value (an object, or an array of them for a
  // multi-call turn) with no tag to anchor on. Runs after the tag ladder so a
  // tagged body is still read by the pattern that understands its wrapper, and
  // before the last-resort recovery so a recovered tag body is never counted
  // twice.
  const json = parseCfJsonCalls(text, availableTools, {
    nonce: options?.nonce,
    isHandled,
  });
  calls.push(...json.calls);
  handledSpans.push(...json.spans);

  // Pattern 6 — last resort. An opening tool tag whose JSON body is complete but
  // whose closing tag is wrong (`</path>` instead of `</write>`) or missing
  // entirely. Every pattern above needs a matching closer, so three of the four
  // `write` calls in the live corpus were dropped even though their payload was
  // valid JSON. Runs after every other pattern, but is deliberately NOT gated on
  // "nothing else parsed": a turn can carry a well-formed call *and* a
  // wrong-closer one, and losing the second is silent — a parsed call suppresses
  // the repair retry. Spans the other patterns already consumed are skipped, so
  // this can only add calls, never change one, and it only accepts a body that
  // starts immediately after the opener (whitespace allowed) — never a JSON
  // object plucked out of prose.
  calls.push(...recoverCompleteBodiesWithWrongCloser(text, availableTools, isHandled));

  return calls;
}

/**
 * Recover every wrong-closer / unclosed tool block in the text — `<tag ...>
 * {...}</wrong-tag>`, `<tag ...>{...}` with no closer at all, and the same with
 * the name written as `<tool:name>`.
 *
 * The body must be a balanced, string-aware JSON object that normalizes, and the
 * name must come from the body's own `name`/hint key, a `name=` attribute, a
 * `<tool:name>` suffix, the tag itself, or the argument schema — in that order.
 * Anything less is left unparsed so the repair retry can ask again; accepting a
 * truncated payload here would ship a half-written file.
 */
function recoverCompleteBodiesWithWrongCloser(
  text: string,
  availableTools: CfToolDef[],
  isHandled: (start: number, end: number) => boolean
): CfParsedToolCall[] {
  const recovered: CfParsedToolCall[] = [];
  const openerRegex = /<\s*([A-Za-z_][\w.-]*)\b([^>]*)>/g;
  let match: RegExpExecArray | null;
  while ((match = openerRegex.exec(text)) !== null) {
    const start = match.index;
    if (isHandled(start, start + 1)) continue;
    const tag = match[1];
    const declared = resolveDeclaredToolName(tag, availableTools);
    const isWrapper = CF_GENERIC_TOOL_TAGS.has(tag.toLowerCase());
    if (!declared && !isWrapper) continue;
    // `<tool:read>` — the name lives in the attribute suffix, and Pattern 2
    // needs a matching closer this shape does not have.
    const colonName = match[2].match(/^\s*:\s*([A-Za-z_][\w.-]*)/);
    // The payload has to begin right after the opener.
    const bodyStart = start + match[0].length;
    const rest = text.slice(bodyStart);
    if (!/^\s*[[{]/.test(rest)) continue;
    const body = extractBalancedJson(rest);
    if (!body) continue;
    const normalized = normalizeToolArguments(body);
    if (!normalized) continue;
    const unwrapped = unwrapToolPayload(normalized);
    const attrName = match[2].match(/name\s*=\s*["']([^"']+)["']/i);
    const resolved = applyToolNameHint(
      unwrapped.name ??
        (attrName ? attrName[1] : null) ??
        (colonName ? colonName[1] : null) ??
        declared,
      unwrapped.argsJson,
      availableTools
    );
    if (!resolved) continue;
    const name = resolved.name ?? inferToolName(resolved.argsJson, availableTools);
    if (!name) continue;
    recovered.push({
      id: `call_${crypto.randomUUID().slice(0, 8)}`,
      name,
      arguments: resolved.argsJson,
    });
    // Do not rescan the body: a `<` inside a JSON string is not an opener, and a
    // second recovery from inside this payload would double the call.
    openerRegex.lastIndex = text.indexOf(body, bodyStart) + body.length;
  }
  return recovered;
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
 * Index at which the reminder goes, counted `depth` messages from the end, moved
 * forward if it would land inside a run of tool results — the assistant
 * tool-call that produced them and its results must stay adjacent.
 */
function cfReminderIndex(retained: ChatCompletionMessageParam[], depth: number): number {
  let index = Math.max(0, retained.length - Math.max(0, depth));
  while (index < retained.length && retained[index]?.role === "tool") index++;
  return index;
}

/**
 * Build the conversation prompt with the tool contract inserted as its own
 * user message(s) before the first user turn (the playground drops system
 * messages, and rejects any single message longer than 6000 chars).
 *
 * Also enforces the playground's 10-user-message conversation cap: the contract,
 * the reminder, the compacted history block and the verbatim turns together
 * never exceed it. Old turns are compacted into a single user message instead of
 * being dropped. Works with an empty `tools` list too — the caller can always
 * route messages through here and get a payload the playground will accept.
 */
export function buildCfToolConversationPrompt(
  messages: ChatCompletionMessageParam[],
  tools: ChatCompletionTool[]
): ChatCompletionMessageParam[] {
  const toolPrompt = tools && tools.length > 0 ? serializeCfToolPrompt(tools) : "";
  const reminder = toolPrompt ? buildCfToolReminder(tools) : "";

  // The reminder is only worth a conversation slot once the tail is long enough
  // that the contract at the top has left the recency window. Decided from the
  // caller's messages, not from the trimmed tail, so the slot count stays
  // deterministic in one pass.
  const wantsReminder =
    reminder !== "" &&
    (messages ?? []).filter((message) => countsTowardCfConversationCap(message.role)).length >=
      CF_TOOL_REMINDER_MIN_MESSAGES;

  // The contract shares the 10-user-message budget with the conversation, so
  // budget for it first — but never let it consume the caller's own turn: at
  // least one slot always stays free for the latest message (a pathological
  // contract needing more than 9 messages is truncated to fit).
  const contractMessages: ChatCompletionMessageParam[] = toolPrompt
    ? chunkPrompt(toolPrompt, CF_MAX_MESSAGE_CHARS)
        .slice(0, CF_MAX_CONVERSATION_MESSAGES - 1 - (wantsReminder ? 1 : 0))
        .map((chunk) => ({ role: "user" as const, content: chunk }))
    : [];

  const budget = CF_MAX_CONVERSATION_MESSAGES - contractMessages.length - (wantsReminder ? 1 : 0);

  // Everything that no longer fits verbatim is compacted into one user message
  // rather than dropped, so the model keeps the thread (and the original task).
  // The block itself costs a slot, so the verbatim window shrinks by one
  // whenever there is overflow.
  let { block, tail } = compactCfConversation(messages ?? [], budget);
  if (block) {
    ({ block, tail } = compactCfConversation(messages ?? [], budget - 1));
  }

  const retained: ChatCompletionMessageParam[] = block
    ? [{ role: "user" as const, content: block }, ...tail]
    : tail;

  if (contractMessages.length === 0) return retained;

  // Require an actual user turn to answer; a conversation made only of assistant
  // / system messages is left alone (the playground would reject it anyway).
  if (!retained.some((message) => message.role === "user")) return retained;

  // Insert before the first user turn — the compacted block, or the first tool
  // result when trimming dropped the tool call that produced it.
  const insertAt = retained.findIndex((message) => countsTowardCfConversationCap(message.role));

  const withContract = [
    ...retained.slice(0, insertAt),
    ...contractMessages,
    ...retained.slice(insertAt),
  ];
  if (!wantsReminder) return withContract;

  // Author's-note position: near the end, so the rule is fresh at generation
  // time, but not last, so it is not mistaken for the newest user turn.
  const reminderAt = cfReminderIndex(withContract, CF_TOOL_REMINDER_DEPTH);

  return [
    ...withContract.slice(0, reminderAt),
    { role: "user" as const, content: reminder },
    ...withContract.slice(reminderAt),
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

  // String-aware first: the per-tool removals below are lazy regexes, so a
  // `</write>` inside a JSON *string* (`{"content":"x</write>y"}`) ends the match
  // early and leaves the payload's tail behind. Removing the balanced block here
  // — opener, complete JSON body, closer — keeps that case clean and leaves the
  // XML-style bodies to the paired regexes below.
  let stripped = stripRecoveredBlocks(text, toolNames);

  // The JSON protocol's own shape: a bare envelope the parser read as a call
  // must not reach the client as prose next to its `tool_calls`.
  stripped = stripCfJsonCalls(stripped, toolNames);

  // Innermost first: a declared tool tag can sit inside a generic wrapper, and
  // removing the wrapper first would leave the inner tag's body behind.
  for (const toolName of toolNames) {
    const escaped = escapeRegex(toolName);
    stripped = stripped
      .replace(
        new RegExp(`<\\s*${escaped}\\b[^>]*>[\\s\\S]*?<\\s*\\/\\s*${escaped}\\s*>`, "gi"),
        ""
      )
      // function-call style: bash({"command": "ls"})
      .replace(new RegExp(`\\b${escaped}\\s*\\(\\s*\\{[\\s\\S]*?\\}\\s*\\)`, "gi"), "");
  }

  stripped = stripped
    .replace(/<\s*tool:(\w+)>[\s\S]*?<\s*\/\s*tool:\1\s*>/gi, "")
    .replace(/<\s*shell\b[^>]*>[\s\S]*?<\s*\/\s*shell\s*>/gi, "")
    .replace(/<\s*tool\b[^>]*>[\s\S]*?<\s*\/\s*tool\s*>/gi, "");

  stripped = stripped
    // The wrapper family, closed…
    .replace(
      new RegExp(
        `<\\s*${CF_WRAPPER_TAG_SOURCE}\\b[^>]*>[\\s\\S]*?<\\s*\\/\\s*${CF_WRAPPER_TAG_SOURCE}\\s*>`,
        "gi"
      ),
      ""
    )
    // …and any orphan opener/closer left behind by an unclosed or half-stripped
    // block. Without this a recovered call shipped `"<tool_call>"` as content
    // next to its `tool_calls`, re-priming the next turn with the banned shape.
    .replace(new RegExp(`<\\s*\\/?\\s*${CF_WRAPPER_TAG_SOURCE}\\b[^>]*>`, "gi"), "")
    .replace(/<\s*\/?\s*tool\b[^>]*>/gi, "");

  return stripped
    .replace(/^---+\s*\n?/m, "") // separator line
    .trimStart(); // only trim leading whitespace, preserve trailing for test
}

/**
 * Remove an opening tool tag whose JSON body is complete but whose closer is
 * missing or wrong — `<write>{...}</path>`, `<tool name="write">{...}`, and the
 * `<tool>{"path": "a"}` shape recovered without a closer at all.
 *
 * Uses the same shape rule the last-resort recovery accepts — a declared tool or
 * generic wrapper tag whose payload starts right after the opener — and
 * deliberately does not repeat its name resolution: a block whose shape is
 * recoverable is call markup either way, and leaving it in the content would
 * hand the client the raw call as prose. A tag with no readable body (prose, or
 * a payload the parser refused because it was truncated) is left untouched, so
 * nothing is hidden unless a call could have been read from it.
 */
function stripRecoveredBlocks(text: string, toolNames: string[]): string {
  const declared = new Set(toolNames.map((name) => name.toLowerCase()));
  declared.add("shell");
  const isToolTag = (tag: string) =>
    declared.has(tag.toLowerCase()) || CF_GENERIC_TOOL_TAGS.has(tag.toLowerCase());

  const opener = /<\s*([A-Za-z_][\w.-]*)\b([^>]*)>/g;
  let out = "";
  let cursor = 0;
  let match: RegExpExecArray | null;
  while ((match = opener.exec(text)) !== null) {
    if (!isToolTag(match[1])) continue;
    const bodyStart = match.index + match[0].length;
    const rest = text.slice(bodyStart);
    if (!/^\s*[[{]/.test(rest)) continue;
    const body = extractBalancedJson(rest);
    if (!body) continue;
    // Every closer immediately after the body is removed with it, whatever it
    // names. A model told to close the block with the last argument's tag often
    // emits the correct closer *and* that one (`</write></path>`), and the
    // leftover tag is the same leaked markup this pass exists to remove.
    const bodyEnd = text.indexOf(body, bodyStart) + body.length;
    const closerRe = /\s*<\s*\/\s*[A-Za-z_][\w.-]*\s*>/y;
    closerRe.lastIndex = bodyEnd;
    let end = bodyEnd;
    while (closerRe.exec(text) !== null) end = closerRe.lastIndex;
    out += text.slice(cursor, match.index);
    cursor = end;
    opener.lastIndex = end;
  }

  return cursor === 0 ? text : out + text.slice(cursor);
}
