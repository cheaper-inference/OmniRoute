import { createHash } from "node:crypto";

/**
 * Fingerprint of the key material a verdict describes.
 *
 * The writer of a verdict and the transaction that merges it must agree byte for byte; when they
 * disagreed, every delta was dropped silently because the generations never matched.
 */
export function credentialFingerprint(material: string): string {
  return createHash("sha256").update(material).digest("hex").slice(0, 16);
}
