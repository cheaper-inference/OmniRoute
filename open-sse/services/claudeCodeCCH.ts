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
  const edits: Edit[] = [];
  let pos = 0;

  // Char codes, not one-character strings: bodies reach several MB.
  const isWs = (c: number) => c === 32 || c === 9 || c === 13 || c === 10;
  const skipWs = () => {
    while (pos < body.length && isWs(body.charCodeAt(pos))) pos++;
  };
  const consume = (ch: string) => (body[pos] === ch ? (pos++, true) : false);
  const parseString = (): Edit => {
    const start = pos;
    if (body[pos] !== '"') throw new Error("not a string");
    pos++;
    while (pos < body.length) {
      const c = body.charCodeAt(pos);
      if (c === 92) pos += 2;
      else if (c === 34) return [start, ++pos];
      else pos++;
    }
    throw new Error("unterminated string");
  };
  const addEdit = (start: number, end: number) => {
    if (start < end) edits.push([start, end]);
  };
  const parseValue = (collect: boolean): void => {
    skipWs();
    const ch = body[pos];
    if (ch === "{") return parseObject(collect);
    if (ch === "[") return parseArray(collect);
    if (ch === '"') {
      parseString();
      return;
    }
    const start = pos;
    while (pos < body.length) {
      const c = body.charCodeAt(pos);
      if (c === 44 || c === 125 || c === 93 || isWs(c)) break;
      pos++;
    }
    if (pos === start) throw new Error("missing value");
  };
  const parseArray = (collect: boolean): void => {
    pos++;
    skipWs();
    if (consume("]")) return;
    for (;;) {
      parseValue(collect);
      skipWs();
      if (consume(",")) continue;
      if (!consume("]")) throw new Error("unterminated array");
      return;
    }
  };
  const parseObject = (collect: boolean): void => {
    pos++;
    skipWs();
    if (consume("}")) return;
    const members: Member[] = [];
    let commaBefore = -1;
    for (;;) {
      skipWs();
      const start = pos;
      const [keyStart, keyEnd] = parseString();
      skipWs();
      if (!consume(":")) throw new Error("missing colon");
      skipWs();
      const key = body.slice(keyStart, keyEnd);
      const skip = collect && EXCLUDED_KEYS.has(key);
      if (collect && key === '"model"' && body[pos] === '"') {
        const [valueStart, valueEnd] = parseString();
        addEdit(valueStart + 1, valueEnd - 1);
      } else {
        parseValue(collect && !skip);
      }
      const end = pos;
      skipWs();
      const commaAfter = consume(",") ? pos - 1 : -1;
      members.push({ start, end, commaBefore, commaAfter, skip });
      if (commaAfter >= 0) {
        commaBefore = commaAfter;
        continue;
      }
      if (!consume("}")) throw new Error("unterminated object");
      break;
    }
    if (collect) addSkippedMemberEdits(members);
  };
  const addSkippedMemberEdits = (members: Member[]): void => {
    for (let first = 0; first < members.length;) {
      if (!members[first].skip) {
        first++;
        continue;
      }
      let last = first;
      while (last + 1 < members.length && members[last + 1].skip) last++;
      if (last + 1 < members.length) addEdit(members[first].start, members[last].commaAfter + 1);
      else if (first > 0 && last > first) addEdit(members[first].start, members[last].end);
      else if (first > 0) addEdit(members[first].commaBefore, members[last].end);
      else addEdit(members[first].start, members[last].end);
      first = last + 1;
    }
  };

  try {
    parseValue(true);
    skipWs();
    if (pos !== body.length) return body;
  } catch {
    return body;
  }

  edits.sort((a, b) => a[0] - b[0]);
  let out = "";
  let last = 0;
  for (const [start, end] of edits) {
    out += body.slice(last, start);
    last = end;
  }
  return out + body.slice(last);
}

export async function computeCCH(bodyBytes: Uint8Array): Promise<string> {
  await ensureXxhash();
  const hash = xxhash64Fn!(bodyBytes, CCH_SEED);
  const masked = hash & 0xfffffn;
  return masked.toString(16).padStart(5, "0");
}

export async function signRequestBody(bodyString: string): Promise<string> {
  if (!CCH_PATTERN.test(bodyString)) return bodyString;
  // The native client hashes with the five digits zeroed, so a body that is signed again
  // gets the same token.
  const unsigned = bodyString.replace(CCH_PATTERN, "cch=00000;");
  const bodyBytes = new TextEncoder().encode(normalizeCchInput(unsigned));
  const token = await computeCCH(bodyBytes);
  return bodyString.replace(CCH_PATTERN, `cch=${token};`);
}

export { CCH_PATTERN };
