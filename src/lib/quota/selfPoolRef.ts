import { createHmac } from "node:crypto";

const POOL_REF_PREFIX = "qpr_";
const POOL_REF_CONTEXT = "quota-pool-ref:v1\0";
const POOL_REF_LENGTH = 22;

/**
 * Opaque, per-key reference to a quota pool.
 *
 * "qpr_" + first 22 base64url chars of HMAC-SHA256(secret, "quota-pool-ref:v1\0" + apiKeyId +
 * "\0" + poolId). It is bound to the key (the ref given to key A does not resolve for key B) and
 * cannot be computed or confirmed without the server secret. Throws on an empty secret.
 */
export function buildPoolRef(apiKeyId: string, poolId: string, secret: string): string {
  if (!secret) {
    throw new Error("buildPoolRef requires a non-empty secret");
  }
  const digest = createHmac("sha256", secret)
    .update(`${POOL_REF_CONTEXT}${apiKeyId}\0${poolId}`)
    .digest("base64url");
  return `${POOL_REF_PREFIX}${digest.slice(0, POOL_REF_LENGTH)}`;
}
