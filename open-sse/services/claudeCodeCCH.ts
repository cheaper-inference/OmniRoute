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
// injected as a system text block (or a legacy top-level key). Both anchors
// contain unescaped quotes, so they cannot occur inside a JSON string value —
// user text that merely looks like `cch=xxxxx;` can never match them.
const BILLING_ANCHORS = ['"text":"x-anthropic-billing-header', '"x-anthropic-billing-header":"'];
const CCH_PLACEHOLDER = "cch=00000;";

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
  let anchor = -1;
  for (const a of BILLING_ANCHORS) {
    const at = bodyString.indexOf(a);
    if (at >= 0 && (anchor < 0 || at < anchor)) anchor = at;
  }
  if (anchor < 0) return bodyString;
  const placeholderAt = bodyString.indexOf(CCH_PLACEHOLDER, anchor);
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
