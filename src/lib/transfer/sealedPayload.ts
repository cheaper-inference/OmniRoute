/**
 * Passphrase-sealed JSON envelope for files that leave this install.
 *
 * A provider-account transfer file carries API keys, OAuth tokens and session
 * cookies. Those must never sit in a downloaded file in plaintext, so the whole
 * payload is sealed with AES-256-GCM under a key derived from an operator-chosen
 * passphrase (scrypt). The passphrase is never stored or sent back; without it
 * the file is opaque, and a wrong passphrase or a tampered file fails the GCM
 * authentication check instead of yielding garbage.
 *
 * The KDF cost is bounded on the way in (`sealedEnvelopeSchema`) so a crafted
 * file cannot make the server spend unbounded CPU/memory before the
 * authentication check runs.
 */
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from "node:crypto";
import type { SealedEnvelope } from "@/shared/validation/schemas/providerTransfer";

const ALGORITHM = "aes-256-gcm";
const KEY_LENGTH = 32;
const IV_LENGTH = 12;
const SALT_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
export const DEFAULT_SCRYPT_N = 2 ** 15;

/** Wrong passphrase, or a file whose ciphertext/header was altered. */
export class SealedPayloadError extends Error {
  readonly code = "SEALED_PAYLOAD_UNREADABLE" as const;

  constructor() {
    super("The passphrase is wrong or the file was modified.");
    this.name = "SealedPayloadError";
  }
}

function deriveKey(passphrase: string, salt: Buffer, n: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(
      passphrase.normalize("NFC"),
      salt,
      KEY_LENGTH,
      { N: n, r: SCRYPT_R, p: SCRYPT_P, maxmem: 256 * n * SCRYPT_R },
      (error, key) => (error ? reject(error) : resolve(key))
    );
  });
}

/**
 * Seal `value` as JSON. `associatedData` is authenticated but not encrypted:
 * bind the file's format/version string so a payload cannot be replayed under
 * a different envelope header.
 */
export async function sealJson(
  value: unknown,
  passphrase: string,
  associatedData: string,
  n: number = DEFAULT_SCRYPT_N
): Promise<SealedEnvelope> {
  const salt = randomBytes(SALT_LENGTH);
  const iv = randomBytes(IV_LENGTH);
  const key = await deriveKey(passphrase, salt, n);
  const cipher = createCipheriv(ALGORITHM, key, iv, { authTagLength: AUTH_TAG_LENGTH });
  cipher.setAAD(Buffer.from(associatedData, "utf8"));
  const data = Buffer.concat([cipher.update(JSON.stringify(value), "utf8"), cipher.final()]);
  return {
    alg: ALGORITHM,
    kdf: "scrypt",
    n,
    r: SCRYPT_R,
    p: SCRYPT_P,
    salt: salt.toString("base64"),
    iv: iv.toString("base64"),
    tag: cipher.getAuthTag().toString("base64"),
    data: data.toString("base64"),
  };
}

/** Open an envelope produced by `sealJson`. Throws `SealedPayloadError` on any mismatch. */
export async function openSealedJson(
  envelope: SealedEnvelope,
  passphrase: string,
  associatedData: string
): Promise<unknown> {
  const salt = Buffer.from(envelope.salt, "base64");
  const iv = Buffer.from(envelope.iv, "base64");
  const tag = Buffer.from(envelope.tag, "base64");
  if (salt.length !== SALT_LENGTH || iv.length !== IV_LENGTH || tag.length !== AUTH_TAG_LENGTH) {
    throw new SealedPayloadError();
  }
  const key = await deriveKey(passphrase, salt, envelope.n);
  try {
    const decipher = createDecipheriv(ALGORITHM, key, iv, { authTagLength: AUTH_TAG_LENGTH });
    decipher.setAAD(Buffer.from(associatedData, "utf8"));
    decipher.setAuthTag(tag);
    const plain = Buffer.concat([
      decipher.update(Buffer.from(envelope.data, "base64")),
      decipher.final(),
    ]);
    return JSON.parse(plain.toString("utf8"));
  } catch {
    throw new SealedPayloadError();
  }
}
