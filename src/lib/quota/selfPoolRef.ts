import { opaqueTokenFingerprint } from "@omniroute/open-sse/utils/opaqueTokenFingerprint.ts";

const POOL_REF_PREFIX = "qpr_";
const POOL_REF_CONTEXT = "quota-pool-ref:v1";
const POOL_REF_LENGTH = 32;

/**
 * Opaque, per-key reference to a quota pool.
 *
 * "qpr_" + first 32 hex chars (128 bits) of HMAC-SHA256(secret,
 * JSON.stringify(["quota-pool-ref:v1", apiKeyId, poolId])). The JSON array encoding keeps the
 * boundary between the two ids unambiguous whatever characters they contain. The ref is bound to
 * the key (the ref given to key A does not resolve for key B) and cannot be computed or confirmed
 * without the server secret. Throws on an empty secret.
 *
 * The keyed digest goes through opaqueTokenFingerprint, the project's single helper for fast
 * digests of identifiers and high-entropy tokens: this derives a reference from two ids, it does
 * not store or verify a password.
 */
export function buildPoolRef(apiKeyId: string, poolId: string, secret: string): string {
  if (!secret) {
    throw new Error("buildPoolRef requires a non-empty secret");
  }
  const digest = opaqueTokenFingerprint(JSON.stringify([POOL_REF_CONTEXT, apiKeyId, poolId]), {
    key: secret,
    length: POOL_REF_LENGTH,
  });
  return `${POOL_REF_PREFIX}${digest}`;
}
