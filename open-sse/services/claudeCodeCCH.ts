/**
 * Claude Code CCH (Client Content Hash) signing.
 *
 * Real Claude Code uses Bun/Zig to compute an xxHash64 integrity token over
 * the serialized request body. The server verifies this to confirm the request
 * came from a genuine Claude Code client.
 *
 * Algorithm (matches the native client):
 *   1. Serialize request body with cch=00000 placeholder
 *   2. Build the hash view: drop `max_tokens`, `fallbacks` and
 *      `fallback_credit_token` members, empty every `model` string value
 *   3. xxHash64(view_bytes, seed) & 0xFFFFF
 *   4. Zero-padded 5-char lowercase hex
 *   5. Replace cch=00000 with computed value in the unmodified body
 */

import xxhashInit from "xxhash-wasm";

// Same value as the xxHash64 initial state stored next to the `cch=00000` routine of the
// Claude Code binary, and as the CLIProxyAPI signer.
const CCH_SEED = 0x4d659218e32a3268n;
const CCH_PATTERN = /\bcch=([0-9a-f]{5});/;

// The billing header is the only place a `cch=` value must be rewritten. It is
// injected as a text block of the top-level `system` array (or a legacy
// top-level key). The legacy anchor has unescaped quotes, so it cannot occur
// inside a JSON string value. The system text anchor can: a user message may
// start with the same words, and `messages` serialises before `system`. So
// that anchor only counts inside the top-level `system` value.
const LEGACY_ANCHOR = '"x-anthropic-billing-header":"';
const SYSTEM_TEXT_ANCHOR = '"text":"x-anthropic-billing-header';
const CCH_PLACEHOLDER = "cch=00000;";

/** Index of the closing quote of the JSON string that opens at `open`. */
function stringEnd(json: string, open: number): number {
  let end = open + 1;
  while (end < json.length && json[end] !== '"') end += json[end] === "\\" ? 2 : 1;
  return end;
}

/** Index of the first non-whitespace character at or after `from`. */
function skipWhitespace(json: string, from: number): number {
  let i = from;
  while (i < json.length && " \n\t".includes(json[i])) i++;
  return i;
}

/** The key a string token is, when a colon follows it: its name and where its value starts. */
function objectKeyAt(
  json: string,
  open: number,
  close: number
): { name: string; valueStart: number } | null {
  const colon = skipWhitespace(json, close + 1);
  return json[colon] === ":" ? { name: json.slice(open + 1, close), valueStart: colon + 1 } : null;
}

const BRACKET_DEPTH: Record<string, number> = { "{": 1, "[": 1, "}": -1, "]": -1 };

/** Top-level keys of a JSON object string, and the index of its closing brace (-1 if unclosed). */
function scanTopLevelKeys(json: string) {
  const keys: Array<{ name: string; keyStart: number; valueStart: number }> = [];
  let depth = 0;
  for (let i = 0; i < json.length; i++) {
    if (json[i] === '"') {
      const end = stringEnd(json, i);
      const key = depth === 1 ? objectKeyAt(json, i, end) : null;
      if (key) keys.push({ ...key, keyStart: i });
      i = end;
    } else {
      depth += BRACKET_DEPTH[json[i]] ?? 0;
      if (depth === 0 && json[i] === "}") return { keys, end: i };
    }
  }
  return { keys, end: -1 };
}

/** [start, end) of the value of the top-level `system` key in a JSON object string. */
function systemValueRange(json: string): [number, number] | null {
  const { keys, end } = scanTopLevelKeys(json);
  const at = keys.findIndex((key) => key.name === "system");
  if (at < 0) return null;
  const stop = keys[at + 1]?.keyStart ?? end;
  return stop >= 0 ? [keys[at].valueStart, stop] : null;
}

/** Index of the billing header's `cch=00000;` placeholder, or -1. */
function findBillingPlaceholder(body: string): number {
  // Cheap exit: most bodies carry no billing header, so skip the scan below.
  if (!body.includes("x-anthropic-billing-header")) return -1;
  let from = body.indexOf(LEGACY_ANCHOR);
  if (from >= 0) {
    from += LEGACY_ANCHOR.length;
  } else {
    const system = systemValueRange(body);
    const at = system ? body.indexOf(SYSTEM_TEXT_ANCHOR, system[0]) : -1;
    if (!system || at < 0 || at >= system[1]) return -1;
    from = at + SYSTEM_TEXT_ANCHOR.length;
  }
  // The placeholder must sit inside this one string value.
  const valueEnd = body.indexOf('"', from);
  const placeholderAt = body.indexOf(CCH_PLACEHOLDER, from);
  return placeholderAt >= 0 && (valueEnd < 0 || placeholderAt < valueEnd) ? placeholderAt : -1;
}

let xxhashPromise: Promise<void> | null = null;
let xxhash64Fn: ((input: Uint8Array, seed: bigint) => bigint) | null = null;

async function ensureXxhash() {
  if (xxhash64Fn) return;
  if (!xxhashPromise) {
    xxhashPromise = (async () => {
      const hasher = await xxhashInit();
      xxhash64Fn = hasher.h64Raw;
    })();
  }
  return xxhashPromise;
}

// ── Hash view ────────────────────────────────────────────────────────────────

const EXCLUDED_KEYS = new Set(['"max_tokens"', '"fallbacks"', '"fallback_credit_token"']);

type Edit = [start: number, end: number];
type Member = {
  start: number;
  end: number;
  commaBefore: number;
  commaAfter: number;
  skip: boolean;
};

/**
 * Build the string the native client hashes: the body with dispatch-only members
 * removed and `model` string values emptied, without re-serializing JSON. Quirk kept
 * from the native client: when an object ends with two or more removed members, the
 * comma before them stays. Input that is not well-formed JSON is returned unchanged.
 */
export function normalizeCchInput(body: string): string {
  try {
    return new CchViewBuilder(body).build();
  } catch {
    return body;
  }
}

// Char codes, not one-character strings: bodies reach several MB.
const isWs = (c: number) => c === 32 || c === 9 || c === 13 || c === 10;

/** One-pass JSON scanner that records the byte ranges the hash view removes. */
class CchViewBuilder {
  private pos = 0;
  private readonly edits: Edit[] = [];
  private readonly body: string;

  constructor(body: string) {
    this.body = body;
  }

  /** Throws on input that is not well-formed JSON. */
  build(): string {
    this.parseValue(true);
    this.skipWs();
    if (this.pos !== this.body.length) throw new Error("trailing data");
    this.edits.sort((a, b) => a[0] - b[0]);
    let out = "";
    let last = 0;
    for (const [start, end] of this.edits) {
      out += this.body.slice(last, start);
      last = end;
    }
    return out + this.body.slice(last);
  }

  private skipWs(): void {
    while (this.pos < this.body.length && isWs(this.body.charCodeAt(this.pos))) this.pos++;
  }

  private consume(ch: string): boolean {
    if (this.body[this.pos] !== ch) return false;
    this.pos++;
    return true;
  }

  private addEdit(start: number, end: number): void {
    if (start < end) this.edits.push([start, end]);
  }

  private parseString(): Edit {
    const start = this.pos;
    if (this.body[this.pos] !== '"') throw new Error("not a string");
    this.pos++;
    while (this.pos < this.body.length) {
      const c = this.body.charCodeAt(this.pos);
      if (c === 92) this.pos += 2;
      else if (c === 34) return [start, ++this.pos];
      else this.pos++;
    }
    throw new Error("unterminated string");
  }

  private parseValue(collect: boolean): void {
    this.skipWs();
    const ch = this.body[this.pos];
    if (ch === "{") return this.parseObject(collect);
    if (ch === "[") return this.parseArray(collect);
    if (ch === '"') {
      this.parseString();
      return;
    }
    const start = this.pos;
    while (this.pos < this.body.length) {
      const c = this.body.charCodeAt(this.pos);
      if (c === 44 || c === 125 || c === 93 || isWs(c)) break;
      this.pos++;
    }
    if (this.pos === start) throw new Error("missing value");
  }

  private parseArray(collect: boolean): void {
    this.pos++;
    this.skipWs();
    if (this.consume("]")) return;
    for (;;) {
      this.parseValue(collect);
      this.skipWs();
      if (this.consume(",")) continue;
      if (!this.consume("]")) throw new Error("unterminated array");
      return;
    }
  }

  /** Parses `"key": value`; returns whether the member is left out of the hash view. */
  private parseKeyValue(collect: boolean): boolean {
    const [keyStart, keyEnd] = this.parseString();
    this.skipWs();
    if (!this.consume(":")) throw new Error("missing colon");
    this.skipWs();
    const key = this.body.slice(keyStart, keyEnd);
    const skip = collect && EXCLUDED_KEYS.has(key);
    if (collect && key === '"model"' && this.body[this.pos] === '"') {
      const [valueStart, valueEnd] = this.parseString();
      this.addEdit(valueStart + 1, valueEnd - 1);
    } else {
      this.parseValue(collect && !skip);
    }
    return skip;
  }

  private parseObject(collect: boolean): void {
    this.pos++;
    this.skipWs();
    if (this.consume("}")) return;
    const members: Member[] = [];
    let commaBefore = -1;
    for (;;) {
      this.skipWs();
      const start = this.pos;
      const skip = this.parseKeyValue(collect);
      const end = this.pos;
      this.skipWs();
      const commaAfter = this.consume(",") ? this.pos - 1 : -1;
      members.push({ start, end, commaBefore, commaAfter, skip });
      if (commaAfter >= 0) {
        commaBefore = commaAfter;
        continue;
      }
      if (!this.consume("}")) throw new Error("unterminated object");
      break;
    }
    if (collect) this.addSkippedMemberEdits(members);
  }

  private addSkippedMemberEdits(members: Member[]): void {
    for (let first = 0; first < members.length;) {
      if (!members[first].skip) {
        first++;
        continue;
      }
      let last = first;
      while (last + 1 < members.length && members[last + 1].skip) last++;
      if (last + 1 < members.length) {
        this.addEdit(members[first].start, members[last].commaAfter + 1);
      } else if (first > 0 && last > first) {
        this.addEdit(members[first].start, members[last].end);
      } else if (first > 0) {
        this.addEdit(members[first].commaBefore, members[last].end);
      } else {
        this.addEdit(members[first].start, members[last].end);
      }
      first = last + 1;
    }
  }
}

export async function computeCCH(bodyBytes: Uint8Array): Promise<string> {
  await ensureXxhash();
  const hash = xxhash64Fn!(bodyBytes, CCH_SEED);
  const masked = hash & 0xfffffn;
  return masked.toString(16).padStart(5, "0");
}

export async function signRequestBody(bodyString: string): Promise<string> {
  // Sign only the literal placeholder inside the billing header. A first-match
  // `cch=[0-9a-f]{5};` rewrite can hit user text (messages serialise before
  // system), leaving the real billing header unsigned.
  const placeholderAt = findBillingPlaceholder(bodyString);
  if (placeholderAt < 0) return bodyString;
  // The native client hashes the normalized view of the body, placeholder included.
  const bodyBytes = new TextEncoder().encode(normalizeCchInput(bodyString));
  const token = await computeCCH(bodyBytes);
  return (
    bodyString.slice(0, placeholderAt) +
    `cch=${token};` +
    bodyString.slice(placeholderAt + CCH_PLACEHOLDER.length)
  );
}

export { CCH_PATTERN };
