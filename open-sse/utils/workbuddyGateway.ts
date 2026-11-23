import { createHash, randomBytes } from "node:crypto";

/**
 * WorkBuddy gateway compliance utilities (Issue #16978).
 *
 * Enforces mandatory headers, stable turn/conversation tracking, system prompt
 * injection, tool schema normalization (preventing upstream 11133 errors on DeepSeek/Kimi/GLM),
 * and competitor prompt anti-ban sanitization (preventing 11128 errors).
 */

export const WORKBUDDY_UA_VERSION = "5.5.6";
export const WORKBUDDY_USER_AGENT = `WorkBuddy/${WORKBUDDY_UA_VERSION}`;

export const WORKBUDDY_DEFAULT_HEADERS: Record<string, string> = {
  "User-Agent": WORKBUDDY_USER_AGENT,
  "X-Product": "SaaS",
  "X-IDE-Type": "WorkBuddy",
  "X-IDE-Name": "WorkBuddy",
  "X-IDE-Version": WORKBUDDY_UA_VERSION,
  "X-Requested-With": "XMLHttpRequest",
  "X-Agent-Intent": "craft",
  "X-Agent-Purpose": "conversation",
  "X-Agent-Type": "main",
};

const SALT = randomBytes(16).toString("hex");

function idFor(kind: string, key: string): string {
  return createHash("sha256").update(`${SALT}|${kind}|${key}`).digest("hex").slice(0, 32);
}

function hex32(): string {
  return randomBytes(16).toString("hex");
}

function signatureOf(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  let out = "";
  for (const part of content) {
    if (!part || typeof part !== "object") continue;
    const p = part as Record<string, unknown>;
    const type = typeof p.type === "string" ? p.type : "";
    if (type === "" || type === "text") {
      out += typeof p.text === "string" ? p.text : "";
    } else if (type !== "tool_result" && type !== "tool-result") {
      out += `[${type}:${createHash("sha256").update(JSON.stringify(part)).digest("hex").slice(0, 8)}]`;
    }
  }
  return out;
}

function answeredBefore(msgs: Array<Record<string, unknown>>, i: number): boolean {
  const prev = msgs[i - 1];
  if (!prev || typeof prev !== "object") return false;
  if (prev.role === "tool") return true;
  return prev.role === "assistant" && Array.isArray(prev.tool_calls) && prev.tool_calls.length > 0;
}

export function turnKey(chat: Record<string, unknown> | null): string {
  const msgs = Array.isArray(chat?.messages)
    ? (chat.messages as Array<Record<string, unknown>>)
    : [];
  for (let i = msgs.length - 1; i >= 0; i--) {
    if (msgs[i]?.role !== "user" || answeredBefore(msgs, i)) continue;
    const sig = signatureOf(msgs[i].content);
    return sig ? `u${i}:${sig}` : "";
  }
  return "";
}

export function conversationKey(chat: Record<string, unknown> | null, session?: string): string {
  if (session) return `session:${session}`;
  const msgs = Array.isArray(chat?.messages)
    ? (chat.messages as Array<Record<string, unknown>>)
    : [];
  for (const m of msgs) {
    if (m?.role !== "user") continue;
    const sig = signatureOf(m?.content);
    if (sig) return `first:${sig}`;
  }
  return "";
}

/**
 * Attach conversation-tracking headers to pass Tencent's gateway attribution.
 */
export function withWorkbuddyHeaders<T extends Record<string, string> | Headers>(
  headers: T,
  body: unknown = null,
  session?: string
): T {
  const b = body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  const sess =
    session ||
    (typeof b?.session_id === "string" ? b.session_id : undefined) ||
    (typeof b?.prompt_cache_key === "string" ? b.prompt_cache_key : undefined);

  const conv = conversationKey(b, sess);
  const msg = hex32();

  const write = (name: string, val: string) => {
    if (typeof (headers as Headers)?.set === "function") {
      (headers as Headers).set(name, val);
    } else {
      (headers as Record<string, string>)[name] = val;
    }
  };

  const has = (name: string): boolean => {
    if (typeof (headers as Headers)?.has === "function") {
      return (headers as Headers).has(name);
    }
    return Boolean((headers as Record<string, string>)[name]);
  };

  write("X-Conversation-Message-ID", msg);
  write("X-Request-ID", msg);

  if (!has("X-Conversation-Request-ID")) {
    const turn = turnKey(b);
    write("X-Conversation-Request-ID", turn ? idFor("turn", `${conv}|${turn}`) : hex32());
  }

  if (conv && !has("X-Conversation-ID")) {
    write("X-Conversation-ID", idFor("conversation", conv));
  }

  return headers;
}

// Tool schema normalization
const NAME_OK = /^[A-Za-z0-9_-]+$/;
const NUL_ESCAPE = /\\\\|\\0(?![0-9])/g;
const TYPES = new Set(["string", "number", "integer", "boolean", "object", "array", "null"]);
const SUB_ONE = [
  "items",
  "additionalItems",
  "unevaluatedItems",
  "contains",
  "not",
  "if",
  "then",
  "else",
  "propertyNames",
  "additionalProperties",
  "unevaluatedProperties",
];
const SUB_LIST = ["anyOf", "oneOf", "allOf", "prefixItems"];
const SUB_MAP = ["properties", "patternProperties", "$defs", "definitions", "dependentSchemas"];
const BOOL_OK = new Set(["additionalProperties", "unevaluatedProperties"]);

function safeToolName(name: string, taken: Set<string>): string {
  const base = String(name).replace(/[^A-Za-z0-9_-]/g, "_") || "tool";
  let n = base;
  for (let i = 2; taken.has(n); i++) n = `${base}_${i}`;
  taken.add(n);
  return n;
}

function fitNulPattern(obj: Record<string, unknown>): boolean {
  if (typeof obj.pattern !== "string" || !obj.pattern.includes("\\0")) return false;
  const p = obj.pattern.replace(NUL_ESCAPE, (m) => (m === "\\\\" ? m : "\\u0000"));
  if (p === obj.pattern) return false;
  obj.pattern = p;
  return true;
}

function fitTupleItems(obj: Record<string, unknown>): boolean {
  if (!Array.isArray(obj.items)) return false;
  const list = obj.items.filter((v) => v && typeof v === "object");
  obj.items = list.length === 0 ? {} : list.length === 1 ? list[0] : { anyOf: list };
  delete obj.additionalItems;
  return true;
}

function fitSchemaEach(values: unknown[], depth: number): boolean {
  let changed = false;
  for (const v of values) if (fitSchema(v, depth)) changed = true;
  return changed;
}

export function fitSchema(s: unknown, depth = 0): boolean {
  if (!s || typeof s !== "object" || depth > 64) return false;
  if (Array.isArray(s)) return fitSchemaEach(s, depth + 1);
  const obj = s as Record<string, unknown>;
  const pattern = fitNulPattern(obj);
  const items = fitTupleItems(obj);
  const nested = fitSchemaEach(Object.values(obj), depth + 1);
  return pattern || items || nested;
}

function valueType(v: unknown): string {
  if (v === null) return "null";
  if (Array.isArray(v)) return "array";
  if (typeof v === "number") return Number.isInteger(v) ? "integer" : "number";
  return typeof v;
}

function listedTypes(s: Record<string, unknown>): unknown[] {
  if (Array.isArray(s.type)) return s.type;
  return typeof s.type === "string" ? [s.type] : [];
}

function groupEnumByType(values: unknown[]): Map<string, unknown[]> {
  const byType = new Map<string, unknown[]>();
  for (const v of values) {
    const t = valueType(v);
    const group = byType.get(t);
    if (group) group.push(v);
    else byType.set(t, [v]);
  }
  if (byType.has("integer") && byType.has("number")) {
    byType.get("number")!.push(...byType.get("integer")!);
    byType.delete("integer");
  }
  return byType;
}

function setSingleEnumType(
  s: Record<string, unknown>,
  byType: Map<string, unknown[]>,
  hasNull: boolean
): boolean {
  const [t] = byType.keys();
  const want = t === undefined ? "null" : hasNull ? [t, "null"] : t;
  if (JSON.stringify(want) === JSON.stringify(s.type)) return false;
  s.type = want;
  return true;
}

function splitEnumByType(
  s: Record<string, unknown>,
  byType: Map<string, unknown[]>,
  hasNull: boolean
): boolean {
  const split: unknown[] = [...byType].map(([t, vs]) => ({ type: t, enum: vs }));
  if (hasNull) split.push({ type: "null" });
  delete s.enum;
  delete s.type;
  if (Array.isArray(s.anyOf)) {
    s.allOf = [...(Array.isArray(s.allOf) ? s.allOf : []), { anyOf: split }];
  } else {
    s.anyOf = split;
  }
  return true;
}

function fitEnum(s: Record<string, unknown>): boolean {
  if (!("enum" in s)) return false;
  if (!Array.isArray(s.enum) || s.enum.length === 0) {
    delete s.enum;
    return true;
  }
  if (listedTypes(s).filter((t) => t !== "null").length === 1) return false;
  const byType = groupEnumByType(s.enum);
  const hasNull = byType.delete("null");
  return byType.size <= 1
    ? setSingleEnumType(s, byType, hasNull)
    : splitEnumByType(s, byType, hasNull);
}

function subSchema(v: unknown, key: string): unknown {
  if (typeof v !== "boolean" || BOOL_OK.has(key)) return v;
  return v ? {} : { not: {} };
}

function fitType(obj: Record<string, unknown>): boolean {
  if (!("type" in obj)) return false;
  const list = (Array.isArray(obj.type) ? obj.type : [obj.type])
    .map((t) => (typeof t === "string" ? t.toLowerCase() : t))
    .filter((t) => TYPES.has(t as string));
  const uniq = [...new Set(list)];
  const want = uniq.length === 0 ? undefined : uniq.length === 1 ? uniq[0] : uniq;
  if (JSON.stringify(want) === JSON.stringify(obj.type)) return false;
  if (want === undefined) delete obj.type;
  else obj.type = want;
  return true;
}

function fitRequired(obj: Record<string, unknown>): boolean {
  if ("required" in obj && !Array.isArray(obj.required)) {
    delete obj.required;
    return true;
  }
  if (Array.isArray(obj.required) && obj.required.some((k) => typeof k !== "string")) {
    obj.required = obj.required.filter((k) => typeof k === "string");
    return true;
  }
  return false;
}

/** Normalize one sub-schema slot in place, then recurse into it. */
function fitSlot(
  container: Record<string | number, unknown>,
  slot: string | number,
  key: string,
  depth: number
): boolean {
  const v0 = container[slot];
  const v = subSchema(v0, key);
  const replaced = v !== v0;
  if (replaced) container[slot] = v;
  const nested = fitShape(v, depth + 1);
  return replaced || nested;
}

function fitSubOne(obj: Record<string, unknown>, depth: number): boolean {
  let changed = false;
  for (const k of SUB_ONE) {
    if (k in obj && fitSlot(obj, k, k, depth)) changed = true;
  }
  return changed;
}

function fitSubList(obj: Record<string, unknown>, depth: number): boolean {
  let changed = false;
  for (const k of SUB_LIST) {
    const list = obj[k];
    if (!Array.isArray(list)) continue;
    list.forEach((_, i) => {
      if (fitSlot(list as unknown as Record<number, unknown>, i, k, depth)) changed = true;
    });
  }
  return changed;
}

function fitSubMap(obj: Record<string, unknown>, depth: number): boolean {
  let changed = false;
  for (const k of SUB_MAP) {
    const m = obj[k];
    if (!m || typeof m !== "object" || Array.isArray(m)) continue;
    for (const name of Object.keys(m)) {
      if (fitSlot(m as Record<string, unknown>, name, k, depth)) changed = true;
    }
  }
  return changed;
}

export function fitShape(s: unknown, depth = 0): boolean {
  if (!s || typeof s !== "object" || Array.isArray(s) || depth > 64) return false;
  const obj = s as Record<string, unknown>;
  const results = [
    fitType(obj),
    fitRequired(obj),
    fitEnum(obj),
    fitSubOne(obj, depth),
    fitSubList(obj, depth),
    fitSubMap(obj, depth),
  ];
  return results.some(Boolean);
}

function collectValidToolNames(tools: Array<Record<string, unknown>>): Set<string> {
  const taken = new Set<string>();
  for (const t of tools) {
    const n = (t?.function as Record<string, unknown> | undefined)?.name;
    if (typeof n === "string" && NAME_OK.test(n)) taken.add(n);
  }
  return taken;
}

function toolFunction(t: Record<string, unknown>): Record<string, unknown> | null {
  const fn = t?.type === "function" || t?.function ? t.function : null;
  return fn && typeof fn === "object" ? (fn as Record<string, unknown>) : null;
}

function fitToolParameters(fn: Record<string, unknown>): boolean {
  if (fn.parameters === undefined) return false;
  if (!fn.parameters || typeof fn.parameters !== "object" || Array.isArray(fn.parameters)) {
    fn.parameters = { type: "object", properties: {} };
    return true;
  }
  const schema = fitSchema(fn.parameters);
  const shape = fitShape(fn.parameters);
  return schema || shape;
}

function fitToolFunction(
  fn: Record<string, unknown>,
  taken: Set<string>,
  names: Map<string, string>,
  theirs: Map<string, string>
): boolean {
  let renamed = false;
  if (typeof fn.name === "string" && !NAME_OK.test(fn.name)) {
    const safe = safeToolName(fn.name, taken);
    names.set(safe, fn.name);
    theirs.set(fn.name, safe);
    fn.name = safe;
    renamed = true;
  }
  const params = fitToolParameters(fn);
  return renamed || params;
}

function renameMessageToolRefs(m: Record<string, unknown>, theirs: Map<string, string>): void {
  if (Array.isArray(m?.tool_calls)) {
    for (const c of m.tool_calls as Array<Record<string, unknown>>) {
      const fn = c?.function as Record<string, unknown> | undefined;
      const safe = theirs.get(fn?.name as string);
      if (safe && fn) fn.name = safe;
    }
  }
  if (m?.role === "tool" && typeof m.name === "string" && theirs.has(m.name)) {
    m.name = theirs.get(m.name)!;
  }
}

export function fitTools(body: Record<string, unknown>): {
  changed: boolean;
  names: Map<string, string>;
} {
  const names = new Map<string, string>();
  if (!Array.isArray(body?.tools) || !body.tools.length) return { changed: false, names };
  const tools = body.tools as Array<Record<string, unknown>>;
  const taken = collectValidToolNames(tools);
  const theirs = new Map<string, string>();
  let changed = false;
  for (const t of tools) {
    const fn = toolFunction(t);
    if (fn && fitToolFunction(fn, taken, names, theirs)) changed = true;
  }
  if (theirs.size && Array.isArray(body.messages)) {
    for (const m of body.messages as Array<Record<string, unknown>>)
      renameMessageToolRefs(m, theirs);
  }
  return { changed, names };
}

export function sanitizeToolChoice(body: Record<string, unknown>): boolean {
  if (!("tool_choice" in body)) return false;
  const choice = body.tool_choice;
  if (typeof choice === "string") {
    if (choice.trim().toLowerCase() === "none") {
      delete body.tool_choice;
      delete body.tools;
      delete body.functions;
      return true;
    }
    return false;
  }
  if (!choice || typeof choice !== "object" || Array.isArray(choice)) {
    delete body.tool_choice;
    return true;
  }
  const c = choice as Record<string, unknown>;
  const type = typeof c.type === "string" ? c.type.trim().toLowerCase() : "";
  if (type === "none") {
    delete body.tool_choice;
    delete body.tools;
    delete body.functions;
    return true;
  }
  if (type === "auto" || type === "required") {
    body.tool_choice = type;
    return true;
  }
  if (type === "function") {
    const fn = c.function as Record<string, unknown> | undefined;
    const name = typeof fn?.name === "string" ? fn.name.trim() : "";
    body.tool_choice = name || "auto";
    return true;
  }
  delete body.tool_choice;
  return true;
}

const BILLING_HEADER_RE = /x-anthropic-billing-header:[^\n]*\n?/gi;

export function sanitizeWorkbuddyBody(body: unknown): unknown {
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;
  const b = { ...(body as Record<string, unknown>) };

  // Normalize parameters
  if (b.max_completion_tokens !== undefined) {
    if (b.max_tokens === undefined) b.max_tokens = b.max_completion_tokens;
    delete b.max_completion_tokens;
  }

  // Normalize messages
  if (Array.isArray(b.messages) && b.messages.length > 0) {
    const msgs = (b.messages as Array<Record<string, unknown>>).map((m) => {
      if (!m || typeof m !== "object") return m;
      const msg = { ...m };
      if (msg.role === "developer") msg.role = "system";
      if (typeof msg.content === "string" && BILLING_HEADER_RE.test(msg.content)) {
        msg.content = msg.content.replace(BILLING_HEADER_RE, "").trim();
      }
      return msg;
    });

    // Enforce first message is system prompt
    if (msgs[0]?.role !== "system") {
      msgs.unshift({ role: "system", content: "You are a helpful assistant." });
    }

    // Gemini turn alignment (error 11153):
    // If ending with tool results followed by user messages, pad with an empty assistant message
    let i = msgs.length - 1;
    while (i >= 0 && msgs[i]?.role === "user") i--;
    if (i < msgs.length - 1 && i >= 0 && msgs[i]?.role === "tool") {
      msgs.splice(i + 1, 0, { role: "assistant", content: "" });
    }

    b.messages = msgs;
  }

  fitTools(b);
  sanitizeToolChoice(b);

  return b;
}
