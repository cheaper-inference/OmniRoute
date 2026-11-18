/**
 * Single-use recovery codes for dashboard two-factor login.
 *
 * Stored only as bcrypt hashes: the plaintext set is shown to the operator exactly once,
 * at enrollment, and can never be read back.
 */
import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";

export const BACKUP_CODE_COUNT = 10;
const GROUP_LENGTH = 5;
// No 0/O/1/I/L/U — codes are typed by hand from a printout.
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTVWXYZ23456789";
const BCRYPT_ROUNDS = 10;
// 240 = 8 * 30: bytes at or above it are dropped so `byte % 30` stays unbiased.
const UNBIASED_BYTE_LIMIT = 240;

function randomChars(length: number): string {
  const out: string[] = [];
  while (out.length < length) {
    for (const byte of randomBytes(length)) {
      if (byte >= UNBIASED_BYTE_LIMIT) continue;
      out.push(CODE_ALPHABET[byte % CODE_ALPHABET.length]);
      if (out.length === length) break;
    }
  }
  return out.join("");
}

/** One code, e.g. `A3F7K-QM29X` (10 symbols from a 30-letter alphabet, ~49 bits). */
export function generateBackupCode(): string {
  return `${randomChars(GROUP_LENGTH)}-${randomChars(GROUP_LENGTH)}`;
}

/** Uppercase and drop separators/whitespace so `a3f7k qm29x` matches `A3F7K-QM29X`. */
export function normalizeBackupCode(input: unknown): string {
  return String(input ?? "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

/** A fresh set: `codes` is displayed once and discarded, only `hashes` is persisted. */
export async function generateBackupCodes(
  count: number = BACKUP_CODE_COUNT
): Promise<{ codes: string[]; hashes: string[] }> {
  const codes = Array.from({ length: count }, () => generateBackupCode());
  const hashes = await Promise.all(
    codes.map((code) => bcrypt.hash(normalizeBackupCode(code), BCRYPT_ROUNDS))
  );
  return { codes, hashes };
}

/**
 * The stored hash that `input` matches, or null. Does not remove it — the caller burns
 * the hash atomically in storage so two concurrent requests cannot both spend one code.
 */
export async function findMatchingBackupCodeHash(
  input: unknown,
  hashes: readonly string[]
): Promise<string | null> {
  const candidate = normalizeBackupCode(input);
  if (!candidate) return null;
  for (const hash of hashes) {
    if (typeof hash !== "string" || !hash) continue;
    let ok = false;
    try {
      ok = await bcrypt.compare(candidate, hash);
    } catch {
      ok = false;
    }
    if (ok) return hash;
  }
  return null;
}
