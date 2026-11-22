// Identity sanitizer (opt-in via OMNIROUTE_SANITIZE_IDENTITY=1): neutralises "OpenClaw"/"OmniRoute" in system-prompt text and
// tool descriptions sent upstream. Pure, deterministic, idempotent, fail-safe.
// Never touches user/assistant/tool messages, tool names, or tool-call arguments.
// Paths/commands (~/.openclaw, `openclaw ...`, lowercase tokens) are left as-is on purpose.

type Json = unknown;
type Rec = Record<string, unknown>;

const isRec = (v: Json): v is Rec => typeof v === "object" && v !== null && !Array.isArray(v);

const LITERALS: Array<[string, string]> = [
  [" running inside OpenClaw.", "."],
  ["## OpenClaw Control", "## Control"],
  ["[OmniRoute Output Styles]", "[Output Styles]"],
  ["OpenClaw&apos;s", "the platform&apos;s"],
  ["OpenClaw’s", "the platform’s"],
  ["OpenClaw\x27s", "the platform\x27s"],
];

function wordSweep(s: string, word: string, repl: string): string {
  let from = s.indexOf(word);
  if (from < 0) return s;
  let out = "";
  let last = 0;
  const n = word.length;
  while (from >= 0) {
    const p = from > 0 ? s.charCodeAt(from - 1) : 32;
    const q = from + n < s.length ? s.charCodeAt(from + n) : 32;
    const bad = (c: number, after: boolean) =>
      (c >= 48 && c <= 57) ||
      (c >= 65 && c <= 90) ||
      (c >= 97 && c <= 122) ||
      c === 95 ||
      c === 45 ||
      c === 47 ||
      (!after && (c === 46 || c === 126 || c === 64 || c === 58 || c === 96));
    if (!bad(p, false) && !bad(q, true)) {
      out += s.slice(last, from) + repl;
      last = from + n;
    }
    from = s.indexOf(word, from + n);
  }
  return out + s.slice(last);
}

function stripMarkers(s: string): string {
  if (s.indexOf("openclaw:attempt:") < 0) return s;
  let out = "";
  let i = 0;
  for (;;) {
    const a = s.indexOf("<!--", i);
    if (a < 0) break;
    const b = s.indexOf("-->", a);
    if (b < 0) break;
    const body = s.slice(a + 4, b);
    if (body.length < 80 && /^\s*\/?openclaw:attempt:[A-Z]+\s*$/.test(body)) {
      out += s.slice(i, a);
      i = b + 3;
      if (s.charCodeAt(i) === 10) i++;
    } else {
      out += s.slice(i, b + 3);
      i = b + 3;
    }
  }
  return out + s.slice(i);
}

function stripUrls(s: string): string {
  if (s.indexOf(".openclaw.ai") < 0) return s;
  return s.replace(
    /https?:\/\/(?:docs|community|www)?\.?openclaw\.ai[^\s)"<>`\]]*/g,
    "(link omitted)"
  );
}

export function sanitizeText(s: string): string {
  if (s.length < 8) return s;
  const lower =
    s.indexOf("OpenClaw") >= 0 ||
    s.indexOf("OmniRoute") >= 0 ||
    s.indexOf("openclaw") >= 0 ||
    s.indexOf("OPENCLAW") >= 0;
  if (!lower) return s;
  let t = stripMarkers(s);
  t = stripUrls(t);
  for (const [a, b] of LITERALS) if (t.indexOf(a) >= 0) t = t.split(a).join(b);
  t = wordSweep(t, "OpenClaw", "the platform");
  t = wordSweep(t, "OmniRoute", "the gateway");
  t = wordSweep(t, "OPENCLAW", "PLATFORM");
  return t;
}

function textBlocks(v: Json): Json {
  if (typeof v === "string") return sanitizeText(v);
  if (Array.isArray(v)) {
    let changed = false;
    const out = v.map((b) => {
      if (typeof b === "string") {
        const r = sanitizeText(b);
        if (r !== b) changed = true;
        return r;
      }
      if (isRec(b) && typeof b.text === "string") {
        const r = sanitizeText(b.text);
        if (r !== b.text) {
          changed = true;
          return { ...b, text: r };
        }
      }
      return b;
    });
    return changed ? out : v;
  }
  return v;
}

// Only `description` strings; names/required/type/enum untouched.
function schemaDesc(v: Json, depth = 0): Json {
  if (depth > 40) return v;
  if (Array.isArray(v)) {
    let changed = false;
    const out = v.map((x) => {
      const r = schemaDesc(x, depth + 1);
      if (r !== x) changed = true;
      return r;
    });
    return changed ? out : v;
  }
  if (!isRec(v)) return v;
  let out: Rec | null = null;
  for (const k of Object.keys(v)) {
    const x = v[k];
    let r: Json = x;
    if (k === "description" && typeof x === "string") r = sanitizeText(x);
    else if (isRec(x) || Array.isArray(x)) r = schemaDesc(x, depth + 1);
    if (r !== x) {
      if (!out) out = { ...v };
      out[k] = r;
    }
  }
  return out ?? v;
}

function sanitizeOne(body: Rec): Rec {
  let out: Rec | null = null;
  const set = (k: string, v: Json) => {
    if (v !== body[k]) {
      if (!out) out = { ...body };
      out[k] = v;
    }
  };

  if (Array.isArray(body.messages)) {
    let ch = false;
    const m = body.messages.map((x) => {
      if (isRec(x) && (x.role === "system" || x.role === "developer")) {
        const c = textBlocks(x.content);
        if (c !== x.content) {
          ch = true;
          return { ...x, content: c };
        }
      }
      return x;
    });
    if (ch) set("messages", m);
  }
  if (Array.isArray(body.input)) {
    let ch = false;
    const m = body.input.map((x) => {
      if (isRec(x) && (x.role === "system" || x.role === "developer")) {
        const c = textBlocks(x.content);
        if (c !== x.content) {
          ch = true;
          return { ...x, content: c };
        }
      }
      return x;
    });
    if (ch) set("input", m);
  }
  if (body.system !== undefined) set("system", textBlocks(body.system));
  if (typeof body.instructions === "string") set("instructions", sanitizeText(body.instructions));
  for (const k of ["systemInstruction", "system_instruction"]) {
    const si = body[k];
    if (isRec(si) && Array.isArray(si.parts)) {
      const p = textBlocks(si.parts);
      if (p !== si.parts) set(k, { ...si, parts: p });
    }
  }
  if (Array.isArray(body.tools)) set("tools", schemaDesc(body.tools));
  // Kiro: tool specs live under conversationState.currentMessage.userInputMessage.userInputMessageContext.tools
  const cs = body.conversationState;
  if (isRec(cs) && isRec(cs.currentMessage) && isRec(cs.currentMessage.userInputMessage)) {
    const uim = cs.currentMessage.userInputMessage;
    const ctx = uim.userInputMessageContext;
    if (isRec(ctx) && Array.isArray(ctx.tools)) {
      const t = schemaDesc(ctx.tools);
      if (t !== ctx.tools)
        set("conversationState", {
          ...cs,
          currentMessage: {
            ...cs.currentMessage,
            userInputMessage: { ...uim, userInputMessageContext: { ...ctx, tools: t } },
          },
        });
    }
  }
  return out ?? body;
}

// Opt-in: set OMNIROUTE_SANITIZE_IDENTITY=1 (or true/on/yes) to enable.
export function isEnabled(env: Record<string, string | undefined> = process.env): boolean {
  const v = (env.OMNIROUTE_SANITIZE_IDENTITY ?? "").trim().toLowerCase();
  return v === "1" || v === "true" || v === "on" || v === "yes";
}

export function sanitizeIdentity<T>(body: T): T {
  try {
    if (!isEnabled() || !isRec(body)) return body;
    let r = sanitizeOne(body);
    if (isRec(r.request)) {
      // antigravity / Cloud Code envelope
      const inner = sanitizeOne(r.request);
      if (inner !== r.request) r = { ...r, request: inner };
    }
    return r as unknown as T;
  } catch {
    return body;
  }
}
