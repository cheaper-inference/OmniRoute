import { createHash, createHmac } from "node:crypto";

/**
 * Opaque, non-reversible fingerprint of a high-entropy, machine-generated secret — an
 * API key, an OAuth access token, a Clerk `__client` JWT, a prompt-cache key — for use
 * as an in-memory Map/cache key, a routing fingerprint, a lookup hash or a log reference.
 *
 * This is deliberately a fast SHA-256 (HMAC-SHA-256 in keyed mode), NOT password
 * hashing. The inputs are random tokens with ≥128 bits of entropy that no dictionary
 * can guess; a slow KDF (bcrypt/scrypt/argon2) would add ~100 ms to every proxied
 * request for no security gain. Human-chosen passwords are a different thing and go
 * through bcrypt in `src/lib/auth/managementPassword.ts`.
 *
 * Keeping every such derivation on this one function gives CodeQL's
 * `js/insufficient-password-hash` a single sink: the query reports once here, with the
 * rationale above, instead of once per call site. New call sites must use this helper,
 * never an inline `createHash("sha256").update(token)`;
 * `tests/unit/opaque-token-fingerprint.test.ts` guards the migrated files.
 *
 * Output: lowercase hex, 64 chars (or the first `length` chars). Plain mode is
 * byte-for-byte the historical `createHash("sha256").update(token).digest("hex")`, so
 * persisted lookup hashes (`api_keys.key_hash`, registered keys) keep matching.
 */
export interface OpaqueTokenFingerprintOptions {
  /** Keep only the first `length` hex characters (1–64). Default: the full 64. */
  length?: number;
  /** Keyed mode: HMAC-SHA-256 under this key instead of a plain digest. */
  key?: string | Buffer;
}

const HEX_DIGEST_LENGTH = 64;

export function opaqueTokenFingerprint(
  token: string,
  options: OpaqueTokenFingerprintOptions = {}
): string {
  if (typeof token !== "string") {
    throw new TypeError("opaqueTokenFingerprint: token must be a string");
  }
  const length = options.length ?? HEX_DIGEST_LENGTH;
  if (!Number.isInteger(length) || length < 1 || length > HEX_DIGEST_LENGTH) {
    throw new RangeError(
      `opaqueTokenFingerprint: length must be an integer between 1 and ${HEX_DIGEST_LENGTH}`
    );
  }
  const hasher =
    options.key === undefined ? createHash("sha256") : createHmac("sha256", options.key);
  // lgtm[js/insufficient-password-hash] — fingerprint of a high-entropy token, see the module doc.
  const digest = hasher.update(token).digest("hex"); // nosemgrep: insufficient-password-hash
  return length === HEX_DIGEST_LENGTH ? digest : digest.slice(0, length);
}
