/**
 * Opt-in guard (OMNIROUTE_REJECT_DUPLICATE_MODEL_MEMBER=1): a JSON body with two top-level `model`
 * members is routed by whichever parser reads it (first wins in one, last wins in another), so a
 * proxy in front and this router can pick different models. Count the top-level `model` members on
 * the raw bytes and let the caller answer 400 when there is more than one.
 *
 * Bytes, not text: in UTF-8 no byte of a multi-byte character equals a JSON structural byte, so the
 * scan never copies the (up to 50 MB) body. Only key strings are decoded, so an escaped spelling
 * such as "mod\u0065l" counts as the same key. Invalid JSON is not this guard's business: it returns
 * false and the normal parse path reports the error.
 */

const QUOTE = 0x22;
const BACKSLASH = 0x5c;
const COMMA = 0x2c;
const OPEN_OBJECT = 0x7b;
const CLOSE_OBJECT = 0x7d;
const OPEN_ARRAY = 0x5b;
const CLOSE_ARRAY = 0x5d;

export function isRejectDuplicateModelMemberEnabled(env = process.env): boolean {
  return ["1", "true", "yes"].includes(String(env.OMNIROUTE_REJECT_DUPLICATE_MODEL_MEMBER).trim());
}

function skipBomAndSpace(bytes: Uint8Array): number {
  let i = bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf ? 3 : 0;
  while (bytes[i] === 0x20 || bytes[i] === 0x09 || bytes[i] === 0x0a || bytes[i] === 0x0d) i++;
  return i;
}

/** Index of the closing quote of the string that opens at `open`. */
function closingQuote(bytes: Uint8Array, open: number): number {
  let end = open + 1;
  while (end < bytes.length && bytes[end] !== QUOTE) end += bytes[end] === BACKSLASH ? 2 : 1;
  return end;
}

/** Decoded key text, or null when the key is not a valid JSON string. */
function keyText(bytes: Uint8Array, open: number, close: number): string | null {
  try {
    return JSON.parse(new TextDecoder().decode(bytes.subarray(open, close + 1)));
  } catch {
    return null;
  }
}

type Scan = { depth: number; expectKey: boolean; modelMembers: number };

/** Update the nesting state for one structural byte. */
function stepStructure(scan: Scan, byte: number): void {
  if (byte === OPEN_OBJECT || byte === OPEN_ARRAY) scan.expectKey = ++scan.depth === 1;
  else if (byte === CLOSE_OBJECT || byte === CLOSE_ARRAY) scan.depth--;
  else if (byte === COMMA) scan.expectKey = scan.depth === 1;
}

/** Handle the string that opens at `open`; returns its closing quote, or -1 on a bad key. */
function stepString(scan: Scan, bytes: Uint8Array, open: number): number {
  const end = closingQuote(bytes, open);
  if (scan.depth === 1 && scan.expectKey) {
    const key = keyText(bytes, open, end);
    if (key === null) return -1;
    if (key === "model") scan.modelMembers++;
  }
  scan.expectKey = false;
  return end;
}

export function hasDuplicateModelMember(bytes: Uint8Array): boolean {
  const start = skipBomAndSpace(bytes);
  if (bytes[start] !== OPEN_OBJECT) return false;
  const scan: Scan = { depth: 0, expectKey: false, modelMembers: 0 };
  for (let i = start; i < bytes.length; i++) {
    if (bytes[i] !== QUOTE) {
      stepStructure(scan, bytes[i]);
      continue;
    }
    i = stepString(scan, bytes, i);
    if (i < 0) return false;
    if (scan.modelMembers > 1) return true;
  }
  return false;
}
