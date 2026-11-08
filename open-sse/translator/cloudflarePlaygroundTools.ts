/**
 * Cloudflare AI Playground Tool Call Translation
 *
 * The Cloudflare Playground does not have native tool/function calling. Instead,
 * we emulate tool calling by serializing OpenAI `tools[]` into a compact prompt
 * contract (sent as its own user message — the server-side persona drops system
 * messages and rejects any single message over 6000 chars) and parsing the
 * model's text reply back into OpenAI `tool_calls`.
 *
 * The contract asks for bare JSON — `{"type": "tool_call", "name": ...,
 * "arguments": {...}, "_nonce": ...}`, or an array of those for a multi-call
 * turn — because models reproduce JSON far more reliably than an invented
 * markup dialect. The tag ladder below is kept as a recovery net for drift and
 * for history replayed from sessions that started before the JSON contract.
 *
 * Real-world shapes observed from the playground:
 *   - `{"type": "tool_call", "name": "bash", "arguments": {"command": "ls"}}` — the contract's shape
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
  matchJsonEnd,
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
    `{"type": "tool_call", "name": "${name}", "arguments": ${args}, "_nonce": "${nonce}"}`;
  const prompt = [
    "# Tool Calling Instructions",
    "",
    "## Response Format",
    "To use a tool, reply with raw JSON. The entire reply is the JSON value: an object `{...}` for one call, or an array `[{...}, {...}]` for several calls.",
    "",
    "Each call has these keys:",
    '- `type` (string, required): always `"tool_call"` — it marks the object as a call.',
    "- `name` (string, required): the exact tool name from the Tools list below.",
    "- `arguments` (object, required): the tool's declared argument keys with their values.",
    `- \`_nonce\` (string, required): the fixed value \`"${nonce}"\`, copied verbatim into every call.`,
    "",
    "Template:",
    call("<tool_name>", `{"arg": value}`),
    "",
    "## Rules",
    "- **One call:** reply with a single JSON object.",
    "- **Several calls:** reply with one JSON array containing every call.",
    '- **Type:** only `"type": "tool_call"` marks a call — no other value is a call.',
    "- **Argument names:** use the keys from the tool's declared schema, spelled exactly.",
    "- **Nonce:** every call, including each item inside an array, carries `_nonce`.",
    "- **No tool needed:** answer in plain prose.",
    "",
    "## Examples",
    "",
    "### One call",
    "User: Show me package.json.",
    `Assistant: ${call("read", '{"path": "package.json"}')}`,
    "",
    "### Several calls",
    "User: Check the contents of package.json and run the build script.",
    `Assistant: [${call("read", '{"path": "package.json"}')}, ${call("shell", '{"command": "npm run build"}')}]`,
    "",
    "### No tool needed",
    "User: Thanks, that's all I needed!",
    "Assistant: You're welcome! Let me know if anything else comes up.",
    "",
    "Tools:",
  ].join("\n");

  const toolLines: string[] = [];
  for (const tool of tools) {
    // ChatCompletionTool also covers custom tools, which carry no function schema.
    if (!("function" in tool)) continue;
    const fn = tool.function;
    const signature = renderCompactSchema(fn.parameters);
    const description = (fn.description ?? "").replace(/\s+/g, " ").trim().slice(0, 160);
    toolLines.push(`- ${fn.name}(${signature})${description ? ` — ${description}` : ""}`);
  }

  return [prompt, ...toolLines].join("\n");
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
    const finalized = finalizeCfToolCall(call, tools, nonce, requested, declared);
    if (!finalized) return null;
    accepted.push(finalized);
  }

  return accepted;
}

/** One call through `finalizeCfToolCalls`'s checks; null when any of them rejects it. */
function finalizeCfToolCall(
  call: CfParsedToolCall,
  tools: unknown,
  nonce: string,
  requested: ReturnType<typeof getRequestedToolNames>,
  declared: Set<string>
): CfParsedToolCall | null {
  const args = parseLooseJsonObject(call.arguments);
  if (!args) return null;

  let bound = false;
  if (args._nonce !== undefined) {
    if (args._nonce !== nonce) return null;
    delete args._nonce;
    bound = true;
  }

  let name: string | null = null;
  if (declared.has(call.name)) name = call.name;
  else if (requested.length > 0) name = resolveRequestedToolName(call.name, requested);
  if (!name) return null;

  if (!validateToolArguments(tools, name, args)) return null;

  // Only re-serialize when the binding was stripped; otherwise the model's
  // argument bytes reach the client untouched.
  return bound ? { ...call, name, arguments: JSON.stringify(args) } : { ...call, name };
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

  const jsonIntent = hasCfJsonToolIntent(text, toolNames);

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
 * True when the text carries a JSON tool-call attempt (see `hasMalformedCfToolIntent`).
 *
 * A JSON envelope that names a declared tool *and* looks like a call attempt
 * (it carries an arguments field, or it is the whole reply) is tool intent
 * even when the payload did not survive the parser — a truncated object, a
 * name the caller does not declare, arguments that are not an object. Prose
 * that merely quotes a tool's schema (`{"name": "read", "description": …}`)
 * must not trigger a retry.
 * Any `"type": <scalar>` pair counts: the contract marks calls with
 * `"tool_call"`, and a wrong discriminator (`"shell"`, `"gun"`, `5`) is the
 * same intent botched, not prose. Anchored to `{` or `,` and a JSON scalar
 * terminated by `,`/`}` so a sentence merely naming the `type` field does
 * not count. Only consulted when the parser read no call, so a reply that
 * carried a well-formed call is never retried.
 * JSON-schema type keywords never count (`{"type": "string"}` quoted in prose).
 * A quoted JSON *schema* is the exception: there `type` is a schema keyword
 * (`{"name":"bash","type":"object","properties":{…}}`), so a reply carrying
 * `properties` has its `type` pair ignored rather than read as a botched
 * discriminator — quoting a schema is prose, and retrying it forever would
 * starve the turn.
 */
function hasCfJsonToolIntent(text: string, toolNames: string[]): boolean {
  const quotedSchema = /"properties"\s*:/.test(text);
  return (
    /"tool_calls"\s*:/.test(text) ||
    /"_nonce"\s*:/.test(text) ||
    (!quotedSchema &&
      /[{\[,]\s*"type"\s*:\s*(?:"(?!(?:object|string|number|integer|boolean|array|null)")[^"]*"|[\d.]+|true|false|null)\s*[,}]/.test(
        text
      )) ||
    (toolNames.some((name) =>
      new RegExp(`"name"\\s*:\\s*"${escapeRegex(name)}"`, "i").test(text)
    ) &&
      (/"arguments"\s*:/.test(text) || isStandaloneCfJsonText(text))) ||
    // A standalone JSON object carrying an arguments field but no readable
    // name is a call that lost its envelope, not an answer.
    (isStandaloneCfJsonText(text) && /"(arguments|args|parameters|input)"\s*:/.test(text))
  );
}

/**
 * True when the reply *answers its own tool call*: it emits a `{"tool_result":
 * ...}` object alongside — or instead of — the call itself.
 *
 * Only the harness can produce a tool result, so this shape means the model
 * ran the tool in its head, invented the output, and stopped believing the
 * round trip had already happened. Observed on gpt-oss-120b
 * (session `ses_eb656f116ffepjVSWIWPkY1fZ2`): a fabricated `grep` result
 * shipped next to the call with `finish_reason: "stop"` and the real tool
 * never ran — the client saw a completed turn and the task silently stalled.
 *
 * Structural, not textual: a JSON object *keyed* `tool_result`. Prose merely
 * naming the field (`"the tool_result field"`) is not fabrication.
 */
export function hasFabricatedCfToolResult(text: string): boolean {
  if (!text || !text.includes("tool_result")) return false;
  return /\{\s*"tool_result"\s*:/.test(text);
}

/**
 * Remove fabricated `{"tool_result": ...}` objects from text. Used on the
 * reasoning channel, where the JSON would otherwise be surfaced to the client
 * as thinking and replayed into the next turn.
 *
 * Balanced-brace scanning (string aware) rather than a lazy regex: the payload
 * nests objects and routinely contains `}` inside its own strings.
 */
export function stripCfToolResults(text: string): string {
  if (!text || !text.includes("tool_result")) return text;

  const opener = /\{\s*"tool_result"\s*:/g;
  let out = "";
  let cursor = 0;
  let match = opener.exec(text);
  while (match !== null) {
    const start = match.index;
    const end = matchJsonEnd(text, start);
    if (end === -1) {
      // Never closed (cut off mid-object) — drop the opener and everything
      // after it rather than leaking a half-written object to the client.
      return out + text.slice(cursor, start);
    }
    out += text.slice(cursor, end);
    cursor = end;
    opener.lastIndex = end;
    match = opener.exec(text);
  }
  return out + text.slice(cursor);
}

/**
 * Models sometimes wrap the payload as `{"name": "shell", "arguments": {...}}`
 * instead of the raw argument object. Normalize both shapes.
 */
function unwrapToolPayload(content: string): { name: string | null; argsJson: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    return { name: null, argsJson: content }; // not the wrapped format
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { name: null, argsJson: content };
  }
  const obj = parsed as Record<string, unknown>;
  if (typeof obj.name !== "string" || obj.arguments === undefined) {
    return { name: null, argsJson: content };
  }
  const argsJson =
    typeof obj.arguments === "string" ? obj.arguments : JSON.stringify(obj.arguments);
  return { name: obj.name, argsJson: carryEnvelopeNonce(argsJson, obj._nonce) };
}

/**
 * An envelope-shaped call is self-contained (`{"name", "arguments"}`), so a
 * replayed one is indistinguishable from a fresh one. Carry its `_nonce` into
 * the arguments, where the binding check can see it — otherwise it would pass
 * as an unbound call and be executed again.
 */
function carryEnvelopeNonce(argsJson: string, envelopeNonce: unknown): string {
  if (envelopeNonce === undefined) return argsJson;
  const inner = parseLooseJsonObject(argsJson);
  if (!inner || inner._nonce !== undefined) return argsJson;
  return JSON.stringify({ ...inner, _nonce: envelopeNonce });
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
  return extractBalancedJson(raw.replace(/\\"/g, '"').replace(/\\'/g, "'"));
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
    args[key] = coerceXmlParam(rawValue, props?.[key]?.type);
  }
  return args;
}

/** Coerce one XML parameter by its declared JSON-schema type; strings stay strings. */
function coerceXmlParam(rawValue: string, type: unknown): unknown {
  if (type === "number") {
    const num = Number(rawValue);
    return Number.isFinite(num) ? num : rawValue;
  }
  if (type === "integer") {
    const num = Number.parseInt(rawValue, 10);
    return Number.isFinite(num) ? num : rawValue;
  }
  if (type === "boolean") return /^(true|1|yes)$/i.test(rawValue);
  return rawValue;
}

/**
 * State shared by the patterns of one `parseCfToolCalls` run: the calls read so
 * far and the spans already turned into a call, so a later pattern does not
 * emit duplicates. Each span is [start, end) into `text`.
 */
interface CfParseContext {
  text: string;
  availableTools: CfToolDef[];
  calls: CfParsedToolCall[];
  handledSpans: Array<[number, number]>;
  isHandled: (start: number, end: number) => boolean;
}

/** Declared tool tags (plus "shell") and the lookup that keeps the caller's spelling. */
interface CfKnownTags {
  names: Set<string>;
  resolve: (tagName: string) => string | null;
}

function newCfCallId(): string {
  return `call_${crypto.randomUUID().slice(0, 8)}`;
}

/** Record a call, and claim its span when one is given. */
function pushCfCall(
  ctx: CfParseContext,
  name: string,
  args: string,
  span?: [number, number]
): void {
  ctx.calls.push({ id: newCfCallId(), name, arguments: args });
  if (span) ctx.handledSpans.push(span);
}

/** The `name="..."` attribute of a tag, or null. */
function attrToolName(attrs: string): string | null {
  const match = attrs.match(/name\s*=\s*["']([^"']+)["']/i);
  return match ? match[1] : null;
}

/** A tag's payload: its body, else JSON carried in its attributes. */
function tagPayload(attrs: string, body: string): string {
  return body.trim() || extractPayloadFromAttrs(attrs) || extractEmbeddedJson(attrs) || "";
}

/**
 * Resolve the call name from a hint, falling back to inference from the
 * argument shape. Null when the hint is rejected or nothing can be inferred.
 */
function resolveHintedCall(
  hint: string | null,
  argsJson: string,
  availableTools: CfToolDef[]
): { name: string; argsJson: string } | null {
  const resolved = applyToolNameHint(hint, argsJson, availableTools);
  if (!resolved) return null;
  const name = resolved.name ?? inferToolName(resolved.argsJson, availableTools);
  return name ? { name, argsJson: resolved.argsJson } : null;
}

/**
 * Pattern 1 for a body that is not JSON: `<tool name="read"><path>a.py</path></tool>`
 * — XML-style arguments inside an explicit `<tool>` wrapper. Pattern 3b cannot
 * see this one because the tag is `tool`, not the tool's name.
 */
function readWrapperXmlCall(
  ctx: CfParseContext,
  match: RegExpExecArray,
  attrs: string,
  content: string
): void {
  const xmlName = attrToolName(attrs);
  const xmlParams = extractXmlParams(content);
  if (!xmlName || !xmlParams) return;
  const def = ctx.availableTools.find((t) => t.name === xmlName);
  pushCfCall(ctx, xmlName, JSON.stringify(xmlParamsToArguments(xmlParams, def)), [
    match.index,
    match.index + match[0].length,
  ]);
}

/** Pattern 1, one match. Returns the regex index to resume from, or null to go on. */
function readWrapperTagMatch(ctx: CfParseContext, match: RegExpExecArray): number | null {
  const attrs = match[1];
  const body = match[2];
  const content = tagPayload(attrs, body);
  // Only accept tool calls whose arguments normalize to valid JSON
  const normalized = normalizeToolArguments(content);
  if (!normalized) {
    readWrapperXmlCall(ctx, match, attrs, content);
    return null;
  }
  // Handle format: <tool>{"name": "shell", "arguments": {...}}</tool>
  const unwrapped = unwrapToolPayload(normalized);
  const attrName = attrToolName(attrs);

  // A nameless generic wrapper that carries a nested tool tag is a container,
  // not a call: step past its opener and let the loop match the inner tag.
  // Before this, the wrapper body was accepted as a nameless payload (the
  // embedded JSON was extracted from the markup), the inner name was never
  // read, and the call resolved to the caller's first tool.
  const nameless = !unwrapped.name && !attrName;
  if (nameless && !/^\s*[[{]/.test(body) && hasNestedToolTag(body, ctx.availableTools)) {
    return match.index + match[0].indexOf(">") + 1;
  }

  const call = resolveHintedCall(
    unwrapped.name ?? attrName,
    unwrapped.argsJson,
    ctx.availableTools
  );
  if (call) pushCfCall(ctx, call.name, call.argsJson, [match.index, match.index + match[0].length]);
  return null;
}

/**
 * Pattern 1: <tool name="...">...</tool> or <tool>...</tool>. Also accepts
 * the `<tool_call>` / `<tool-call>` / `<toolcall>` / `<function_call>`
 * spellings many models are trained on (e.g.
 * `<tool_call>{"name":"bash","arguments":{...}}</tool_call>`).
 */
function parseWrapperTagCalls(ctx: CfParseContext): void {
  const toolTagRegex = new RegExp(
    `<\\s*${CF_WRAPPER_TAG_SOURCE}\\b([^>]*)>([\\s\\S]*?)<\\s*\\/\\s*${CF_WRAPPER_TAG_SOURCE}\\s*>`,
    "gi"
  );
  let match: RegExpExecArray | null;
  while ((match = toolTagRegex.exec(ctx.text)) !== null) {
    const resumeAt = readWrapperTagMatch(ctx, match);
    if (resumeAt !== null) toolTagRegex.lastIndex = resumeAt;
  }
}

/**
 * Pattern 1b: recover malformed `<tool ...>` tags where a `>` inside the JSON
 * payload (e.g. `{"command": "ls > out.txt"}`) truncated the attribute scan
 * above. Re-scan the whole tag body for a balanced JSON payload.
 */
function parseLooseWrapperTagCalls(ctx: CfParseContext): void {
  const looseToolRegex = new RegExp(
    `<\\s*${CF_WRAPPER_TAG_SOURCE}\\b([\\s\\S]*?)<\\s*\\/\\s*${CF_WRAPPER_TAG_SOURCE}\\s*>`,
    "gi"
  );
  let match: RegExpExecArray | null;
  while ((match = looseToolRegex.exec(ctx.text)) !== null) {
    const start = match.index;
    const end = start + match[0].length;
    if (ctx.isHandled(start, end)) continue;
    const inner = match[1];
    const nameMatch = inner.match(/name\s*=\s*["']?([A-Za-z_][\w.-]*)/i);
    if (!nameMatch) continue;
    const embedded = extractEmbeddedJson(inner);
    const normalized = embedded ? normalizeToolArguments(embedded) : null;
    if (!normalized) continue;
    const unwrapped = unwrapToolPayload(normalized);
    pushCfCall(ctx, unwrapped.name ?? nameMatch[1], unwrapped.argsJson, [start, end]);
  }
}

/**
 * Pattern 1c: `<tool ...>` with no closing tag. Models hit their output
 * limit mid-payload, or simply omit `</tool>`; the call used to be dropped
 * and its markup leaked to the client as text. Deliberately narrow: only an
 * opening tag whose remainder carries no closing tag at all and whose body
 * starts with the JSON payload. A `<tool:name>` body belongs to Pattern 2, a
 * body with any closing tag belongs to Pattern 1, and prose that merely
 * mentions `<tool>` is left alone.
 */
function parseOpenOnlyWrapperCalls(ctx: CfParseContext): void {
  const openOnlyRegex = new RegExp(`<\\s*${CF_WRAPPER_TAG_SOURCE}\\b([^>]*)>([\\s\\S]*)$`, "gi");
  let match: RegExpExecArray | null;
  while ((match = openOnlyRegex.exec(ctx.text)) !== null) {
    const start = match.index;
    if (ctx.isHandled(start, start + 1)) continue;
    if (/^\s*:/.test(match[1])) continue;
    const body = match[2].trim();
    if (/<\s*\//.test(body) || !/^[[{]/.test(body)) continue;
    const normalized = normalizeToolArguments(body);
    if (!normalized) continue;
    const unwrapped = unwrapToolPayload(normalized);
    const call = resolveHintedCall(
      unwrapped.name ?? attrToolName(match[1]),
      unwrapped.argsJson,
      ctx.availableTools
    );
    if (call) pushCfCall(ctx, call.name, call.argsJson, [start, ctx.text.length]);
  }
}

/** Pattern 2: <tool:name>...</tool:name> (alternative form) */
function parseToolNameTagCalls(ctx: CfParseContext): void {
  const toolNameTagRegex = /<\s*tool:(\w+)>([\s\S]*?)<\s*\/\s*tool:\1\s*>/gi;
  let match: RegExpExecArray | null;
  while ((match = toolNameTagRegex.exec(ctx.text)) !== null) {
    const normalized = normalizeToolArguments(match[2].trim());
    if (!normalized) continue;
    const unwrapped = unwrapToolPayload(normalized);
    // Claimed, so Pattern 6 does not read the same block again through its
    // `<tool:name>` fallback.
    pushCfCall(ctx, unwrapped.name ?? match[1], unwrapped.argsJson, [
      match.index,
      match.index + match[0].length,
    ]);
  }
}

/**
 * Tags Pattern 3 accepts: any declared tool name, plus "shell", which the
 * playground models emit even when the caller named the tool differently.
 * Tags are matched case-insensitively (models write `<Read>`); the name handed
 * to the client must keep the caller's declared spelling.
 */
function knownCfToolTags(availableTools: CfToolDef[]): CfKnownTags {
  const names = new Set(availableTools.map((t) => t.name));
  names.add("shell");
  const resolve = (tagName: string): string | null =>
    names.has(tagName) ? tagName : resolveDeclaredToolName(tagName, availableTools);
  return { names, resolve };
}

/**
 * Pattern 3: <toolname>...</toolname> — the tool name IS the tag.
 * Observed live across models: <shell>, <bash>, <glob>, <read>, ...
 */
function parseKnownTagJsonCalls(ctx: CfParseContext, known: CfKnownTags): void {
  const anyToolTagRegex = /<\s*([a-zA-Z_][\w.-]*)\b([^>]*)>([\s\S]*?)<\s*\/\s*\1\s*>/gi;
  let match: RegExpExecArray | null;
  while ((match = anyToolTagRegex.exec(ctx.text)) !== null) {
    const tagName = known.resolve(match[1]);
    if (!tagName) continue;
    const start = match.index;
    if (ctx.isHandled(start, start + 1)) continue;
    const normalized = normalizeToolArguments(tagPayload(match[2], match[3]));
    if (!normalized) continue;
    const unwrapped = unwrapToolPayload(normalized);
    const resolved = applyToolNameHint(
      unwrapped.name ?? tagName,
      unwrapped.argsJson,
      ctx.availableTools
    );
    if (!resolved) continue;
    pushCfCall(ctx, resolved.name ?? tagName, resolved.argsJson, [start, start + match[0].length]);
  }
}

/**
 * Pattern 3b: <toolname><param>value</param></toolname> — XML-style arguments
 * instead of a JSON body, so Pattern 3 above (which needs JSON) drops them.
 * Observed live: a single turn carrying five calls at once —
 *   <read><path>a.py</path></read>
 *   <shell><command>ps aux | grep x</command></shell>
 * Every declared tool name is accepted, in document order, so a turn that
 * batches several reads keeps its ordering.
 */
function parseKnownTagXmlCalls(ctx: CfParseContext, known: CfKnownTags): void {
  const xmlToolRegex = /<\s*([a-zA-Z_][\w.-]*)\b([^>]*)>([\s\S]*?)<\s*\/\s*\1\s*>/gi;
  let match: RegExpExecArray | null;
  while ((match = xmlToolRegex.exec(ctx.text)) !== null) {
    const tagName = known.resolve(match[1]);
    if (!tagName) continue;
    const start = match.index;
    if (ctx.isHandled(start, start + 1)) continue;
    const body = match[3].trim();
    // A JSON body belongs to Pattern 3; do not also read it as XML params.
    if (!body || /^[[{]/.test(body)) continue;
    const params = extractXmlParams(body);
    if (!params) continue;
    const def = ctx.availableTools.find((t) => t.name === tagName);
    pushCfCall(ctx, tagName, JSON.stringify(xmlParamsToArguments(params, def)), [
      start,
      start + match[0].length,
    ]);
  }
}

/** Pattern 4: name({"arg": value}) — function-call style, observed live. */
function parseCallStyleCalls(ctx: CfParseContext, known: CfKnownTags): void {
  const callStyleRegex = /\b([a-zA-Z_][\w.-]*)\s*\(\s*(\{[\s\S]*?\}|\[[\s\S]*?\])\s*\)/g;
  let match: RegExpExecArray | null;
  while ((match = callStyleRegex.exec(ctx.text)) !== null) {
    const callName = match[1];
    if (!known.names.has(callName)) continue;
    const normalized = normalizeToolArguments(match[2]);
    if (!normalized) continue;
    const unwrapped = unwrapToolPayload(normalized);
    pushCfCall(ctx, unwrapped.name ?? callName, unwrapped.argsJson);
  }
}

/** Pattern 5: name(arg="value", flag=true) — Python/named-argument style. */
function parseNamedArgCalls(ctx: CfParseContext, known: CfKnownTags): void {
  const namedArgRegex = /\b([a-zA-Z_][\w.-]*)\s*\(([^()]*)\)/g;
  let match: RegExpExecArray | null;
  while ((match = namedArgRegex.exec(ctx.text)) !== null) {
    const callName = match[1];
    if (!known.names.has(callName)) continue;
    const inner = match[2].trim();
    if (!inner.includes("=")) continue;
    const parsed = parseNamedArgs(inner);
    if (parsed) pushCfCall(ctx, callName, JSON.stringify(parsed));
  }
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

  const handledSpans: Array<[number, number]> = [];
  const ctx: CfParseContext = {
    text,
    availableTools,
    calls: [],
    handledSpans,
    isHandled: (start, end) => handledSpans.some(([s, e]) => start < e && end > s),
  };

  parseWrapperTagCalls(ctx);
  parseLooseWrapperTagCalls(ctx);
  parseOpenOnlyWrapperCalls(ctx);
  parseToolNameTagCalls(ctx);
  const known = knownCfToolTags(availableTools);
  parseKnownTagJsonCalls(ctx, known);
  parseKnownTagXmlCalls(ctx, known);
  parseCallStyleCalls(ctx, known);
  parseNamedArgCalls(ctx, known);

  // Pattern 5b: the JSON protocol — the shape the contract asks for. A call
  // arrives as a bare JSON value (an object, or an array of them for a
  // multi-call turn) with no tag to anchor on. Runs after the tag ladder so a
  // tagged body is still read by the pattern that understands its wrapper, and
  // before the last-resort recovery so a recovered tag body is never counted
  // twice.
  const json = parseCfJsonCalls(text, availableTools, {
    nonce: options?.nonce,
    isHandled: ctx.isHandled,
  });
  ctx.calls.push(...json.calls);
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
  ctx.calls.push(...recoverCompleteBodiesWithWrongCloser(text, availableTools, ctx.isHandled));

  return ctx.calls;
}

/**
 * The call one wrong-closer opener carries, and where the scan resumes, or null
 * when the opener does not start a recoverable block.
 */
function recoverWrongCloserBlock(
  text: string,
  match: RegExpExecArray,
  availableTools: CfToolDef[]
): { call: CfParsedToolCall; resumeAt: number } | null {
  const tag = match[1];
  const declared = resolveDeclaredToolName(tag, availableTools);
  if (!declared && !CF_GENERIC_TOOL_TAGS.has(tag.toLowerCase())) return null;
  // The payload has to begin right after the opener.
  const bodyStart = match.index + match[0].length;
  const rest = text.slice(bodyStart);
  if (!/^\s*[[{]/.test(rest)) return null;
  const body = extractBalancedJson(rest);
  const normalized = body ? normalizeToolArguments(body) : null;
  if (!body || !normalized) return null;
  const unwrapped = unwrapToolPayload(normalized);
  // `<tool:read>` — the name lives in the attribute suffix, and Pattern 2
  // needs a matching closer this shape does not have.
  const colonName = match[2].match(/^\s*:\s*([A-Za-z_][\w.-]*)/);
  const hint =
    unwrapped.name ?? attrToolName(match[2]) ?? (colonName ? colonName[1] : null) ?? declared;
  const call = resolveHintedCall(hint, unwrapped.argsJson, availableTools);
  if (!call) return null;
  return {
    call: { id: newCfCallId(), name: call.name, arguments: call.argsJson },
    // Do not rescan the body: a `<` inside a JSON string is not an opener, and a
    // second recovery from inside this payload would double the call.
    resumeAt: text.indexOf(body, bodyStart) + body.length,
  };
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
    if (isHandled(match.index, match.index + 1)) continue;
    const block = recoverWrongCloserBlock(text, match, availableTools);
    if (!block) continue;
    recovered.push(block.call);
    openerRegex.lastIndex = block.resumeAt;
  }
  return recovered;
}

/**
 * Parse `key="value", flag=true, n=3` into an object. Returns null when the
 * text is not a well-formed named-argument list.
 */
function parseNamedArgs(inner: string): Record<string, unknown> | null {
  const args: Record<string, unknown> = {};
  for (const part of splitUnquotedCommas(inner)) {
    const eq = part.indexOf("=");
    if (eq === -1) return null;
    const key = part.slice(0, eq).trim();
    const rawValue = part.slice(eq + 1).trim();
    if (!key) return null;
    args[key] = parseScalar(rawValue);
  }
  return Object.keys(args).length > 0 ? args : null;
}

/** Split on commas that are not inside quotes. */
function splitUnquotedCommas(inner: string): string[] {
  const parts: string[] = [];
  let current = "";
  let quote: string | null = null;
  for (const ch of inner) {
    if (quote) {
      if (ch === quote) quote = null;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
    } else if (ch === ",") {
      parts.push(current);
      current = "";
      continue;
    }
    current += ch;
  }
  parts.push(current);
  return parts;
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
 * Build the conversation prompt with the tool contract inserted as its own
 * user message(s) before the first user turn (the playground drops system
 * messages, and rejects any single message longer than 6000 chars).
 *
 * Also enforces the playground's 10-user-message conversation cap: the contract,
 * the compacted history block and the verbatim turns together never exceed it.
 * Old turns are compacted into a single user message instead of being dropped.
 * Works with an empty `tools` list too — the caller can always route messages
 * through here and get a payload the playground will accept.
 */
export function buildCfToolConversationPrompt(
  messages: ChatCompletionMessageParam[],
  tools: ChatCompletionTool[]
): ChatCompletionMessageParam[] {
  const toolPrompt = tools && tools.length > 0 ? serializeCfToolPrompt(tools) : "";

  // The contract shares the 10-user-message budget with the conversation, so
  // budget for it first — but never let it consume the caller's own turn: at
  // least one slot always stays free for the latest message (a pathological
  // contract needing more than 9 messages is truncated to fit).
  const contractMessages: ChatCompletionMessageParam[] = toolPrompt
    ? chunkPrompt(toolPrompt, CF_MAX_MESSAGE_CHARS)
        .slice(0, CF_MAX_CONVERSATION_MESSAGES - 1)
        .map((chunk) => ({ role: "user" as const, content: chunk }))
    : [];

  const budget = CF_MAX_CONVERSATION_MESSAGES - contractMessages.length;

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

  return [...retained.slice(0, insertAt), ...contractMessages, ...retained.slice(insertAt)];
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
