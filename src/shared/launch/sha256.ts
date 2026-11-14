/**
 * sha256.ts: a self-contained SHA-256 (FIPS 180-4) over the UTF-8 bytes of a string.
 *
 * Pure and synchronous on purpose (no node:crypto, no async Web Crypto) so `viewSelect.ts`
 * runs unchanged in Node, the CLI bundle and the browser.
 */

const K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];

const INITIAL_HASH: readonly number[] = [
  0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
];

// ---------- UTF-8 encoding (lone surrogates become U+FFFD, as TextEncoder does) ----------

function isHighSurrogate(code: number): boolean {
  return code >= 0xd800 && code <= 0xdbff;
}

function isLowSurrogate(code: number): boolean {
  return code >= 0xdc00 && code <= 0xdfff;
}

function isSurrogate(code: number): boolean {
  return code >= 0xd800 && code <= 0xdfff;
}

/** The code point starting at `index` and the number of UTF-16 units it spans. */
function codePointAt(text: string, index: number): [number, number] {
  const code = text.charCodeAt(index);
  const next = text.charCodeAt(index + 1);
  if (isHighSurrogate(code) && isLowSurrogate(next)) {
    return [0x10000 + ((code - 0xd800) << 10) + (next - 0xdc00), 2];
  }
  return [isSurrogate(code) ? 0xfffd : code, 1];
}

/** A UTF-8 continuation byte carrying the 6 bits of `code` above `shift`. */
function continuation(code: number, shift: number): number {
  return 0x80 | ((code >> shift) & 63);
}

/** The 3 byte (BMP above U+07FF) and 4 byte (astral) UTF-8 forms. */
function encodeWide(code: number, bytes: number[]): void {
  const tail = [continuation(code, 6), continuation(code, 0)];
  if (code < 0x10000) bytes.push(0xe0 | (code >> 12), ...tail);
  else bytes.push(0xf0 | (code >> 18), continuation(code, 12), ...tail);
}

function encodeCodePoint(code: number, bytes: number[]): void {
  if (code < 0x80) bytes.push(code);
  else if (code < 0x800) bytes.push(0xc0 | (code >> 6), continuation(code, 0));
  else encodeWide(code, bytes);
}

function utf8Bytes(text: string): number[] {
  const bytes: number[] = [];
  let index = 0;
  while (index < text.length) {
    const [code, width] = codePointAt(text, index);
    encodeCodePoint(code, bytes);
    index += width;
  }
  return bytes;
}

// ---------- padding and message schedule ----------

/** Append `word` as 4 big-endian bytes. */
function pushWord(bytes: number[], word: number): void {
  bytes.push((word >>> 24) & 255, (word >>> 16) & 255, (word >>> 8) & 255, word & 255);
}

/** FIPS 180-4 padding: 0x80, zeros to 56 mod 64, then the 64-bit big-endian bit length. */
function padMessage(bytes: number[]): number[] {
  const bitLength = bytes.length * 8;
  bytes.push(0x80);
  while (bytes.length % 64 !== 56) bytes.push(0);
  pushWord(bytes, Math.floor(bitLength / 0x100000000));
  pushWord(bytes, bitLength >>> 0);
  return bytes;
}

function rotr(x: number, n: number): number {
  return (x >>> n) | (x << (32 - n));
}

function readWord(bytes: number[], at: number): number {
  return ((bytes[at] << 24) | (bytes[at + 1] << 16) | (bytes[at + 2] << 8) | bytes[at + 3]) >>> 0;
}

function smallSigma0(x: number): number {
  return rotr(x, 7) ^ rotr(x, 18) ^ (x >>> 3);
}

function smallSigma1(x: number): number {
  return rotr(x, 17) ^ rotr(x, 19) ^ (x >>> 10);
}

/** Fill `w` with the 64-word schedule of the block starting at `offset`. */
function messageSchedule(bytes: number[], offset: number, w: number[]): void {
  for (let i = 0; i < 16; i++) w[i] = readWord(bytes, offset + i * 4);
  for (let i = 16; i < 64; i++) {
    w[i] = (w[i - 16] + smallSigma0(w[i - 15]) + w[i - 7] + smallSigma1(w[i - 2])) >>> 0;
  }
}

// ---------- compression ----------

function bigSigma0(x: number): number {
  return rotr(x, 2) ^ rotr(x, 13) ^ rotr(x, 22);
}

function bigSigma1(x: number): number {
  return rotr(x, 6) ^ rotr(x, 11) ^ rotr(x, 25);
}

function choose(e: number, f: number, g: number): number {
  return (e & f) ^ (~e & g);
}

function majority(a: number, b: number, c: number): number {
  return (a & b) ^ (a & c) ^ (b & c);
}

/** One compression round over working state [a..h]; `kw` is K[i] + w[i]. */
function compressRound(state: number[], kw: number): number[] {
  const [a, b, c, d, e, f, g, h] = state;
  const t1 = (h + bigSigma1(e) + choose(e, f, g) + kw) >>> 0;
  const t2 = (bigSigma0(a) + majority(a, b, c)) >>> 0;
  return [(t1 + t2) >>> 0, a, b, c, (d + t1) >>> 0, e, f, g];
}

/** Run the 64 rounds over one scheduled block and fold the result into `hash`. */
function compressBlock(hash: number[], w: number[]): number[] {
  let state = hash.slice();
  for (let i = 0; i < 64; i++) state = compressRound(state, K[i] + w[i]);
  return hash.map((word, i) => (word + state[i]) >>> 0);
}

function toHex8(word: number): string {
  return word.toString(16).padStart(8, "0");
}

/** Lowercase hex SHA-256 of the UTF-8 encoding of `text`. */
export function sha256Hex(text: string): string {
  const bytes = padMessage(utf8Bytes(text));
  const w = new Array<number>(64);
  let hash = INITIAL_HASH.slice();
  for (let offset = 0; offset < bytes.length; offset += 64) {
    messageSchedule(bytes, offset, w);
    hash = compressBlock(hash, w);
  }
  return hash.map(toHex8).join("");
}
