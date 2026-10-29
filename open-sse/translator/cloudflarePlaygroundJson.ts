/**
 * The Cloudflare Playground's JSON tool-call protocol.
 *
 * The contract asks for a bare JSON envelope instead of an invented markup
 * dialect, so this module owns the whole JSON side of emulated tool calling:
 * locating JSON values in a reply, reading them as calls, and stripping them
 * back out of the content. The XML-tag ladder in cloudflarePlaygroundTools.ts
 * stays as a recovery net and reuses the lenient JSON repair that lives here.
 *
 * Split out of cloudflarePlaygroundTools.ts to keep that file under the
 * file-size ratchet.
 */
import type { CfParsedToolCall, CfToolDef } from "./cloudflarePlaygroundTools.ts";
import {
  applyToolNameHint,
  inferToolName,
  resolveDeclaredToolName,
} from "./cloudflarePlaygroundNameResolution.ts";
import { parseLooseJsonObject } from "./webTools.ts";

/**
 * Repair the most common JSON mistakes models make in tool payloads:
 * double-escaped whitespace (`{\n"command": "ls"}` where `\n` is two literal
 * characters) and backslash-escaped quotes (`{\"path\": \".\"}` — models escape
 * quotes when embedding JSON inside an XML-ish tag). Single quotes / unquoted
 * keys / bare values are handled by the lenient parser below.
 *
 * Only called after strict `JSON.parse` fails, so valid escapes in well-formed
 * payloads are never rewritten.
 */
function repairJson(text: string): string {
  return text
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'");
}

/**
 * Escape double quotes that appear *inside* a JSON string value.
 *
 * Playground models routinely emit shell commands and code carrying quoted
 * paths/globs/patterns without escaping the inner quotes:
 *
 *   `<tool name="bash">{"command":"find . -name "*.py" 2>/dev/null"}</tool>`
 *
 * Strict `JSON.parse` rejects that, and when the whole call was discarded the
 * model's markup leaked to the client as plain assistant text — so the agent
 * never received a tool result and retried the same turn.
 *
 * A quote inside a string is treated as a terminator only when the next
 * non-whitespace character can legally follow one (`:`, `,`, `}`, `]` or end of
 * input). Anything else is a literal inner quote and is escaped.
 *
 * Known limitation: a quoted phrase immediately followed by a comma inside a
 * value (`"echo "hi", stop"`) stays ambiguous and is left unparsed — the same
 * outcome as before this repair existed. Only ever applied after strict
 * `JSON.parse` has already failed, so well-formed payloads are never rewritten.
 */
function repairUnescapedInnerQuotes(text: string): string {
  let out = "";
  let inString = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === "\\") {
      out += ch + (text[i + 1] ?? "");
      i++;
      continue;
    }
    if (ch !== '"') {
      out += ch;
      continue;
    }
    if (!inString) {
      inString = true;
      out += ch;
      continue;
    }
    let j = i + 1;
    while (j < text.length && /\s/.test(text[j])) j++;
    const next = text[j];
    const closes =
      next === undefined || next === "," || next === ":" || next === "}" || next === "]";
    if (closes) {
      inString = false;
      out += ch;
    } else {
      out += '\\"';
    }
  }
  return out;
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
 * Return the first balanced `{...}` / `[...]` slice of `text`, leaving escapes
 * intact.
 *
 * Unlike `extractEmbeddedJson` (which unescapes before scanning, for payloads
 * embedded in tag attributes) this never rewrites the text, so an otherwise
 * valid object followed by junk is recovered verbatim. Models routinely emit a
 * stray extra closing brace — `{"path":"a","content":"...{str(e)}"}}` — which
 * makes `JSON.parse` reject a payload that is 99% correct.
 */
export function extractBalancedJson(text: string): string | null {
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
 * Normalize tool-call arguments into a valid JSON string.
 * Returns the original text when it already parses (preserving formatting),
 * otherwise the repaired-and-restringified payload, or null when unparseable.
 */
export function normalizeToolArguments(content: string): string | null {
  const trimmed = content.trim();
  try {
    JSON.parse(trimmed);
    return trimmed;
  } catch {
    /* fall through to the repair passes */
  }
  // Candidates are tried in order of fidelity. The unrepaired payload and the
  // balanced slice come first: `repairJson` below unescapes `\"`/`\n`, which is
  // what a payload embedded in markup needs but which destroys an
  // otherwise-valid object that merely has trailing junk.
  const balanced = extractBalancedJson(trimmed);
  const candidates = [
    trimmed,
    balanced,
    repairJson(trimmed),
    balanced ? repairJson(balanced) : null,
    repairUnescapedInnerQuotes(trimmed),
    repairUnescapedInnerQuotes(repairJson(trimmed)),
    balanced ? repairUnescapedInnerQuotes(repairJson(balanced)) : null,
  ];
  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      const parsed = parseLooseJson(candidate);
      if (parsed !== null && typeof parsed === "object") return JSON.stringify(parsed);
    } catch {
      /* try the next candidate */
    }
  }
  return null;
}

/**
 * One balanced JSON value found in the reply, with its offsets in the text.
 *
 * The JSON protocol means a call arrives as a bare value — a lone object, or an
 * array of them for a multi-call turn — so the parser has to locate JSON
 * *values*, not tags. Scanning is string-aware because argument values routinely
 * contain braces (`{"content": "function f() {}"}`).
 */
interface CfJsonSpan {
  start: number;
  end: number;
  raw: string;
}

/** Index just past the JSON value that opens at `start`, or -1 when unbalanced. */
function matchJsonEnd(text: string, start: number): number {
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
      if (depth === 0) return i + 1;
    }
  }
  return -1;
}

/** Every top-level JSON value in the text, in document order. */
function findCfJsonSpans(text: string): CfJsonSpan[] {
  const spans: CfJsonSpan[] = [];
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (ch !== "{" && ch !== "[") {
      i++;
      continue;
    }
    const end = matchJsonEnd(text, i);
    if (end === -1) {
      i++;
      continue;
    }
    spans.push({ start: i, end, raw: text.slice(i, end) });
    i = end;
  }
  return spans;
}

/**
 * True when the reply opens a JSON document that never closes — the shape a
 * multi-call turn has when the model ran out of tokens mid-array
 * (`[{...}, {...`).
 *
 * The scanner can still read every value that came before the cut, so without
 * this guard a truncated turn executes a *prefix* of its calls and drops the
 * rest without a word. Detected here, the turn parses to zero calls and the
 * executor's intent check turns it into the single repair retry.
 *
 * Only an opener that starts a JSON document counts (an object key, or an array
 * of them) — a stray brace inside prose must never suppress a reply that also
 * carried a well-formed call.
 */
function isIncompleteCfJsonDocument(text: string): boolean {
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (ch !== "{" && ch !== "[") {
      i++;
      continue;
    }
    const end = matchJsonEnd(text, i);
    if (end === -1) return /^\s*\{?\s*"/.test(text.slice(i + 1));
    i = end;
  }
  return false;
}

/** Parse one JSON span leniently (the same repairs the tag parser applies). */
function parseCfJsonPayload(raw: string): unknown {
  const normalized = normalizeToolArguments(raw);
  if (!normalized) return null;
  try {
    return JSON.parse(normalized);
  } catch {
    return null;
  }
}

/** The reply with code fences and surrounding whitespace removed. */
function cfJsonBody(text: string): string {
  return text
    .trim()
    .replace(/^```[a-zA-Z]*\s*/, "")
    .replace(/```$/, "")
    .trim();
}

/** True when the whole reply is a single JSON value (fences allowed). */
export function isStandaloneCfJsonText(text: string): boolean {
  const body = cfJsonBody(text);
  if (!/^[[{]/.test(body)) return false;
  return matchJsonEnd(body, 0) === body.length;
}

/** Envelope keys a JSON call may use for the tool name. */
const CF_JSON_NAME_KEYS = ["name", "tool", "tool_name", "toolName"] as const;

/** Envelope keys a JSON call may use for the argument object. */
const CF_JSON_ARG_KEYS = ["arguments", "args", "parameters", "input"] as const;

/** Envelope keys that are metadata, never arguments. */
const CF_JSON_META_KEYS = new Set<string>([
  ...CF_JSON_NAME_KEYS,
  ...CF_JSON_ARG_KEYS,
  "function",
  "tool_calls",
  "toolCalls",
  "type",
  "_nonce",
]);

/**
 * Values of the `type` discriminator the contract asks for. The contract sends
 * `"type": "tool_call"`; the plural spelling is accepted because a multi-call
 * turn is an array of calls and models sometimes label the array, not each
 * element.
 */
const CF_JSON_CALL_TYPES = new Set(["tool_call", "tool_calls"]);

/** True when the object carries the contract's `"type": "tool_call"` marker. */
function isCfCallTypeValue(obj: Record<string, unknown>): boolean {
  return typeof obj.type === "string" && CF_JSON_CALL_TYPES.has(obj.type.trim().toLowerCase());
}

/** True when at least one argument key is a property the tool declares. */
function hasDeclaredArgument(
  name: string,
  args: Record<string, unknown>,
  availableTools: CfToolDef[]
): boolean {
  const def = availableTools.find((tool) => tool.name === name);
  const parameters = (def?.parameters ?? {}) as Record<string, unknown>;
  const props =
    parameters.properties && typeof parameters.properties === "object"
      ? (parameters.properties as Record<string, unknown>)
      : null;
  if (!props) return false;
  return Object.keys(args).some((key) => key !== "_nonce" && key in props);
}

/**
 * Turn one parsed JSON value into tool calls.
 *
 * Accepts the canonical envelope (`{"name", "arguments", "_nonce"}`), the
 * OpenAI nesting (`{"function": {"name", "arguments"}}`), the wrapped form
 * (`{"tool_calls": [...]}`), an array of any of those, and the flattened form
 * models drift into (`{"name": "read", "path": "a"}` — every non-envelope key
 * is an argument).
 *
 * A bare JSON object is only a call when it *names a declared tool*, when it
 * proves it belongs to this request by carrying the nonce, or when it declares
 * the contract's `type: "tool_call"`. That gate keeps the JSON a model quotes
 * while explaining something (a config snippet, a tool schema) from being read
 * as a call and replacing the answer with a bogus retry.
 */
function cfCallsFromJsonValue(
  value: unknown,
  availableTools: CfToolDef[],
  nonce: string | undefined,
  standalone: boolean
): CfParsedToolCall[] {
  if (Array.isArray(value)) {
    // All-or-nothing: a multi-call turn that lost one element must be retried,
    // not silently executed with the calls that happened to survive.
    const mapped = value.map((item) =>
      cfCallsFromJsonValue(item, availableTools, nonce, standalone)
    );
    if (mapped.some((calls) => calls.length === 0)) return [];
    return mapped.flat();
  }
  if (!value || typeof value !== "object") return [];
  const obj = value as Record<string, unknown>;

  // `{"tool_calls": [...]}` — the OpenAI wrapper models reach for first.
  const nested = obj.tool_calls ?? obj.toolCalls;
  if (nested !== undefined) {
    return cfCallsFromJsonValue(nested, availableTools, nonce, standalone);
  }

  let name: string | null = null;
  let argsSource: unknown;

  // `{"function": {"name": ..., "arguments": ...}}` — the other OpenAI shape.
  const fn = obj.function;
  if (fn && typeof fn === "object" && !Array.isArray(fn)) {
    const record = fn as Record<string, unknown>;
    if (typeof record.name === "string") name = record.name;
    if (record.arguments !== undefined) argsSource = record.arguments;
  }

  if (name === null) {
    for (const key of CF_JSON_NAME_KEYS) {
      if (typeof obj[key] === "string") {
        name = obj[key] as string;
        break;
      }
    }
  }

  if (argsSource === undefined) {
    for (const key of CF_JSON_ARG_KEYS) {
      if (obj[key] !== undefined) {
        argsSource = obj[key];
        break;
      }
    }
  }

  const envelopeNonce = typeof obj._nonce === "string" ? obj._nonce : undefined;
  // The contract's discriminator. Optional on purpose: the envelope without it
  // is still the same three keys, and models drop fields. When present it is a
  // stronger signal than "the name happens to match a declared tool", so it
  // also makes an envelope with a fuzzy or unknown name a *call attempt* — the
  // finalizer then rejects it and the turn is retried instead of the reply being
  // returned as text with a call buried in it.
  const discriminated = isCfCallTypeValue(obj);
  let args: Record<string, unknown> | null = null;

  if (argsSource !== undefined) {
    if (typeof argsSource === "string") {
      const normalized = normalizeToolArguments(argsSource);
      args = normalized ? parseLooseJsonObject(normalized) : null;
    } else if (argsSource && typeof argsSource === "object" && !Array.isArray(argsSource)) {
      args = { ...(argsSource as Record<string, unknown>) };
    }
    if (!args) return [];
  } else {
    // Flattened form: every key that is not envelope metadata is an argument.
    args = {};
    for (const [key, entry] of Object.entries(obj)) {
      if (!CF_JSON_META_KEYS.has(key)) args[key] = entry;
    }
    if (Object.keys(args).length === 0) return [];
  }

  // Carry the envelope nonce into the arguments, where the binding check reads
  // it — the canonical shape keeps it beside `arguments`, not inside.
  if (envelopeNonce !== undefined && args._nonce === undefined) args._nonce = envelopeNonce;

  const argsJson = JSON.stringify(args);
  const resolved = applyToolNameHint(name, argsJson, availableTools);
  if (!resolved) return [];
  const resolvedName = resolved.name ?? inferToolName(resolved.argsJson, availableTools);
  if (!resolvedName) return [];
  const declared = resolveDeclaredToolName(resolvedName, availableTools);

  const boundToRequest = nonce !== undefined && envelopeNonce === nonce;
  // An unnamed payload is only trustworthy when it carries this request's nonce.
  if (name === null && !boundToRequest && !discriminated) return [];
  if (!declared && !boundToRequest && !discriminated) return [];
  // The flattened form is drift, so it needs a second signal before it is
  // executed: the whole reply is the envelope, the envelope is bound to this
  // request, it declares its own type, or it carries at least one argument the
  // tool actually declares. That is what separates
  // `{"name": "read", "path": "a.ts"}` from a schema the model quoted while
  // explaining (`{"name": "read", "description": ...}`).
  if (argsSource === undefined && !standalone && !boundToRequest && !discriminated) {
    const named = declared ?? resolvedName;
    if (!named || !hasDeclaredArgument(named, args, availableTools)) return [];
  }

  return [
    {
      id: `call_${crypto.randomUUID().slice(0, 8)}`,
      name: declared ?? resolvedName,
      arguments: resolved.argsJson,
    },
  ];
}

/**
 * True when a parsed JSON value looks like the call envelope rather than an
 * ordinary object the model happened to quote: it names a declared tool, is a
 * `tool_calls` wrapper, carries the request nonce, or declares the contract's
 * `"type": "tool_call"`.
 */
function isCfCallJsonValue(value: unknown, declared: Set<string>): boolean {
  if (Array.isArray(value)) return value.some((item) => isCfCallJsonValue(item, declared));
  if (!value || typeof value !== "object") return false;
  const obj = value as Record<string, unknown>;
  if (obj.tool_calls !== undefined || obj.toolCalls !== undefined) return true;
  if (typeof obj._nonce === "string") return true;
  if (isCfCallTypeValue(obj)) return true;
  const fn = obj.function;
  const candidates = [
    obj.name,
    obj.tool,
    obj.tool_name,
    obj.toolName,
    fn && typeof fn === "object" ? (fn as Record<string, unknown>).name : undefined,
  ];
  return candidates.some(
    (candidate) => typeof candidate === "string" && declared.has(candidate.toLowerCase())
  );
}

/**
 * Remove bare JSON call envelopes from the text, leaving the model's prose.
 *
 * Only call-shaped values are removed (see `isCfCallJsonValue`), so a JSON
 * snippet the assistant quoted while explaining something survives. An emptied
 * code fence is dropped with its payload — the contract forbids fences, but the
 * parser recovers a fenced call, and shipping the empty backticks back to the
 * client would only re-prime the next turn.
 */
export function stripCfJsonCalls(text: string, toolNames: string[]): string {
  const declared = new Set(toolNames.map((name) => name.toLowerCase()));
  declared.add("shell");
  const spans = findCfJsonSpans(text);
  if (spans.length === 0) return text;

  let out = "";
  let cursor = 0;
  for (const span of spans) {
    if (span.start < cursor) continue;
    const value = parseCfJsonPayload(span.raw);
    if (value === null || !isCfCallJsonValue(value, declared)) continue;
    out += text.slice(cursor, span.start);
    cursor = span.end;
  }
  if (cursor === 0) return text;
  return (out + text.slice(cursor)).replace(/```[a-zA-Z]*\s*```/g, "");
}

/**
 * Read the JSON protocol's calls out of a reply.
 *
 * Returns the calls plus the text spans they occupied, so the caller can mark
 * them handled and keep the tag ladder from reading the same bytes twice.
 */
export function parseCfJsonCalls(
  text: string,
  availableTools: CfToolDef[],
  options?: { nonce?: string; isHandled?: (start: number, end: number) => boolean }
): { calls: CfParsedToolCall[]; spans: Array<[number, number]> } {
  const calls: CfParsedToolCall[] = [];
  const spans: Array<[number, number]> = [];
  if (!text) return { calls, spans };
  // A turn cut off mid-document yields nothing rather than the calls that
  // happened to complete before the cut, so the executor retries it whole
  // instead of executing a prefix. See `isIncompleteCfJsonDocument`.
  if (isIncompleteCfJsonDocument(text)) return { calls, spans };

  const standalone = isStandaloneCfJsonText(text);
  for (const span of findCfJsonSpans(text)) {
    if (options?.isHandled?.(span.start, span.end)) continue;
    const value = parseCfJsonPayload(span.raw);
    if (value === null) continue;
    const parsed = cfCallsFromJsonValue(value, availableTools, options?.nonce, standalone);
    if (parsed.length === 0) continue;
    calls.push(...parsed);
    spans.push([span.start, span.end]);
  }
  return { calls, spans };
}
