/**
 * RFC 6238 TOTP (RFC 4226 HOTP over a time-derived counter) on `node:crypto`.
 *
 * Hand-rolled on purpose: the math is ~60 well-specified lines and every
 * authenticator app speaks the same defaults (SHA-1, 6 digits, 30 s step), so a
 * runtime dependency would add supply-chain surface for no behavioural gain.
 * Every comparison against a candidate code goes through `timingSafeEqual`.
 */
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const TOTP_STEP_SECONDS = 30;
export const TOTP_DIGITS = 6;
export const TOTP_ALGORITHM = "sha1";
/** Accept the previous, current and next step — ±30 s of clock drift. */
export const TOTP_SKEW_STEPS = 1;

const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const TOTP_CODE_PATTERN = /^\d{6}$/;

/** RFC 4648 base32, without padding (authenticator apps reject the "=" tail). */
export function base32Encode(buffer: Uint8Array): string {
  let bits = 0;
  let value = 0;
  let out = "";
  for (const byte of buffer) {
    value = ((value << 8) | byte) & 0xffff;
    bits += 8;
    while (bits >= 5) {
      out += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  return out;
}

/** RFC 4648 base32 decode. Tolerates lowercase, whitespace and "=" padding; throws on junk. */
export function base32Decode(input: string): Buffer {
  const clean = String(input || "")
    .toUpperCase()
    .replace(/[\s=]/g, "");
  let bits = 0;
  let value = 0;
  const bytes: number[] = [];
  for (const char of clean) {
    const index = BASE32_ALPHABET.indexOf(char);
    if (index === -1) throw new Error("Invalid base32 character in TOTP secret");
    value = ((value << 5) | index) & 0xffff;
    bits += 5;
    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return Buffer.from(bytes);
}

/** A fresh random secret: 20 bytes (160 bits), the RFC 4226 §4 recommendation for SHA-1. */
export function generateTotpSecret(byteLength = 20): string {
  return base32Encode(randomBytes(byteLength));
}

/** HOTP value for `counter` (RFC 4226 §5.3: HMAC, dynamic truncation, mod 10^digits). */
export function generateHotpCode(
  secret: string | Buffer,
  counter: number,
  options: { digits?: number; algorithm?: string } = {}
): string {
  const digits = options.digits ?? TOTP_DIGITS;
  const key = typeof secret === "string" ? base32Decode(secret) : secret;
  const message = Buffer.alloc(8);
  message.writeBigUInt64BE(BigInt(counter));
  const hmac = createHmac(options.algorithm ?? TOTP_ALGORITHM, key)
    .update(message)
    .digest();

  const offset = hmac[hmac.length - 1] & 0x0f;
  const binary =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  return String(binary % 10 ** digits).padStart(digits, "0");
}

/** The RFC 6238 time step that contains `atMs`. */
export function totpCounter(atMs: number = Date.now()): number {
  return Math.floor(atMs / 1000 / TOTP_STEP_SECONDS);
}

function constantTimeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a, "utf8");
  const right = Buffer.from(b, "utf8");
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

/** Strip the spaces/dashes people type into a 6-digit code ("123 456"). */
export function normalizeTotpInput(input: unknown): string {
  return String(input ?? "").replace(/[\s-]/g, "");
}

/** True when `input` has the shape of a TOTP code (as opposed to a backup code). */
export function looksLikeTotpCode(input: unknown): boolean {
  return TOTP_CODE_PATTERN.test(normalizeTotpInput(input));
}

/**
 * Check `token` against the steps in `[current - skew, current + skew]`.
 *
 * Returns the matched counter (so callers can refuse a replay of the same step) or
 * `null`. Never throws: a malformed secret or code is just "no match", which lets the
 * caller feed it to the brute-force guard like any other wrong code.
 */
export function matchTotpCode(
  secret: string,
  token: unknown,
  options: { skew?: number; atMs?: number } = {}
): number | null {
  const code = normalizeTotpInput(token);
  if (!secret || !TOTP_CODE_PATTERN.test(code)) return null;

  let key: Buffer;
  try {
    key = base32Decode(secret);
  } catch {
    return null;
  }
  if (key.length === 0) return null;

  const skew = options.skew ?? TOTP_SKEW_STEPS;
  const current = totpCounter(options.atMs ?? Date.now());
  let matched: number | null = null;
  // Walk every step even after a hit so the work done does not depend on which step matched.
  for (let drift = -skew; drift <= skew; drift += 1) {
    const counter = current + drift;
    if (counter < 0) continue;
    if (constantTimeEqual(generateHotpCode(key, counter), code) && matched === null) {
      matched = counter;
    }
  }
  return matched;
}

export function verifyTotpCode(
  secret: string,
  token: unknown,
  options: { skew?: number; atMs?: number } = {}
): boolean {
  return matchTotpCode(secret, token, options) !== null;
}

/** `otpauth://` URI understood by authenticator apps (and encoded into the enrollment QR). */
export function buildOtpAuthUri({
  secret,
  account = "admin",
  issuer = "OmniRoute",
}: {
  secret: string;
  account?: string;
  issuer?: string;
}): string {
  const label = encodeURIComponent(`${issuer}:${account}`);
  const params = new URLSearchParams({
    secret,
    issuer,
    algorithm: TOTP_ALGORITHM.toUpperCase(),
    digits: String(TOTP_DIGITS),
    period: String(TOTP_STEP_SECONDS),
  });
  return `otpauth://totp/${label}?${params.toString()}`;
}
