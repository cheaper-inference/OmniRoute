import { createHash } from "node:crypto";
import {
  AUTHZ_HEADER_TRUSTED_CLIENT_IP,
  AUTHZ_HEADER_TRUSTED_PEER_IP,
} from "@/server/authz/headers";

// Forensic-only sanitization: client IP / user-agent come from untrusted
// headers and feed recordRelayUsage() rows. Strip CR/LF so a malicious header
// cannot forge log lines, and cap length.
export function sanitizeForensicHeader(value: string | null, max = 256): string {
  if (!value) return "unknown";
  return value.replace(/[\r\n]+/g, " ").slice(0, max);
}

/**
 * The client address the relay works with.
 *
 * - `throttleKey` feeds the per-(token, client) throttle. It is the address the authz
 *   pipeline stamped after resolving it at the trust boundary: the TCP peer on a direct
 *   connection, or the client a trusted proxy reported for it (so clients behind one reverse
 *   proxy are told apart), falling back to the stamped socket peer. When neither stamp exists
 *   (plain `next dev` without the custom server, or no stamp token) every caller of a token
 *   shares ONE bucket: X-Forwarded-For / X-Real-IP are client-controlled on a direct
 *   connection, so keying on them would let a caller reset the bucket by rotating the header.
 *   The DB-backed per-token limit is the real control in that case.
 * - `forensic` is the best-known address for recordRelayUsage() rows: the trusted value when
 *   stamped, otherwise the forwarding headers — log-only, never a decision input.
 */
export interface RelayClientIp {
  throttleKey: string;
  forensic: string;
}

/** Throttle key shared by every caller whose address the server could not vouch for. */
export const UNTRUSTED_CLIENT_BUCKET = "untrusted";

export function getClientIp(request: Request): RelayClientIp {
  const trusted =
    request.headers.get(AUTHZ_HEADER_TRUSTED_CLIENT_IP) ||
    request.headers.get(AUTHZ_HEADER_TRUSTED_PEER_IP);
  if (trusted) {
    const ip = sanitizeForensicHeader(trusted);
    return { throttleKey: ip, forensic: ip };
  }
  return {
    throttleKey: UNTRUSTED_CLIENT_BUCKET,
    forensic: sanitizeForensicHeader(
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        null
    ),
  };
}

export function extractToken(request: Request): string | null {
  const auth = request.headers.get("authorization") || "";
  const match = auth.match(/^Bearer\s+(.+)$/i);
  if (match) return match[1];

  // Also check X-Relay-Token header.
  return request.headers.get("x-relay-token");
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

// ── In-memory per-(token,IP) rate limit ─────────────────────────────────────
// Defence-in-depth on top of the DB-backed per-token limit: a leaked relay
// token redistributed across N IPs would otherwise consume the per-token quota
// in parallel. This second gate caps a *single* IP using a token to
// RELAY_IP_PER_MINUTE req/min.
//
// In-memory by design: cheap, no DB round-trip, no extra migration. Per
// instance only — if you run multiple relay replicas behind a load balancer,
// the effective ceiling is RELAY_IP_PER_MINUTE * replicas.
const RELAY_IP_PER_MINUTE = Number(process.env.RELAY_IP_PER_MINUTE || "30");
const ipBuckets = new Map<string, { count: number; windowStart: number }>();

export function checkIpRateLimit(
  tokenId: string,
  ip: string
): { allowed: boolean; resetIn: number } {
  if (!Number.isFinite(RELAY_IP_PER_MINUTE) || RELAY_IP_PER_MINUTE <= 0) {
    return { allowed: true, resetIn: 0 };
  }

  const now = Math.floor(Date.now() / 1000);
  const windowStart = Math.floor(now / 60) * 60;
  const key = tokenId + "|" + ip;
  const bucket = ipBuckets.get(key);

  if (!bucket || bucket.windowStart !== windowStart) {
    ipBuckets.set(key, { count: 1, windowStart });
    if (ipBuckets.size > 10_000) {
      // Bound memory: drop stale buckets when the table grows past 10k.
      const cutoff = windowStart - 60;
      for (const [k, b] of ipBuckets) {
        if (b.windowStart < cutoff) ipBuckets.delete(k);
      }
    }
    return { allowed: true, resetIn: 60 - (now % 60) };
  }

  if (bucket.count >= RELAY_IP_PER_MINUTE) {
    return { allowed: false, resetIn: 60 - (now % 60) };
  }

  bucket.count++;
  return { allowed: true, resetIn: 60 - (now % 60) };
}
