/**
 * Claude Code CCH (Client Content Hash) signing.
 *
 * Real Claude Code uses Bun/Zig to compute an xxHash64 integrity token over
 * the serialized request body. The server verifies this to confirm the request
 * came from a genuine Claude Code client.
 *
 * Algorithm:
 *   1. Serialize request body with cch=00000 placeholder
 *   2. xxHash64(body_bytes, seed) & 0xFFFFF
 *   3. Zero-padded 5-char lowercase hex
 *   4. Replace cch=00000 with computed value
 */

import xxhashInit from "xxhash-wasm";

const CCH_SEED = 0x6e52736ac806831en;
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
  const encoder = new TextEncoder();
  const bodyBytes = encoder.encode(bodyString);
  const token = await computeCCH(bodyBytes);
  return (
    bodyString.slice(0, placeholderAt) +
    `cch=${token};` +
    bodyString.slice(placeholderAt + CCH_PLACEHOLDER.length)
  );
}

export { CCH_PATTERN };
