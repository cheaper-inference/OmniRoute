/**
 * Same-account re-send through another pool member after a per-IP quota 429
 * (PROXY_REEGRESS_ON_QUOTA_429, default off).
 *
 * A 429 that a provider meters per egress address says nothing about the account: the same
 * credential may still succeed from another address. When the egress came from a live pool
 * (source "registry"), the chat loop may re-send the same request with the same account
 * through a member it has not tried yet, before it marks the account or falls back.
 *
 * Safety: the chat loop only reaches this decision with a failed result, so no response byte
 * has gone to the client; the number of re-sends is bounded; a pool that offers no new member
 * (one member, or all set aside) ends the re-sends and the original 429 flows on as before.
 * Pure helpers, no database access.
 */

import { rotatesEgressOnQuotaRefusal } from "@omniroute/open-sse/config/providerErrorRules.ts";

/** Re-sends (not sends) per request: 3 means up to four upstream calls through the pool. */
export const REEGRESS_MAX_ATTEMPTS_DEFAULT = 3;
const REEGRESS_MAX_ATTEMPTS_MIN = 1;
const REEGRESS_MAX_ATTEMPTS_MAX = 8;

/** PROXY_REEGRESS_MAX_ATTEMPTS, bounded to 1..8; anything else falls back to the default. */
export function reEgressLimit(env: Record<string, string | undefined> = process.env): number {
  const raw = env.PROXY_REEGRESS_MAX_ATTEMPTS;
  if (raw == null || raw.trim() === "") return REEGRESS_MAX_ATTEMPTS_DEFAULT;
  const parsed = Math.floor(Number(raw));
  if (
    !Number.isFinite(parsed) ||
    parsed < REEGRESS_MAX_ATTEMPTS_MIN ||
    parsed > REEGRESS_MAX_ATTEMPTS_MAX
  ) {
    return REEGRESS_MAX_ATTEMPTS_DEFAULT;
  }
  return parsed;
}

export type ReEgressCandidateInput = {
  enabled: boolean;
  status: unknown;
  /** Status the provider really returned through the proxy; absent for a local 429. */
  upstreamStatus: number | null | undefined;
  provider: string | null;
  proxySource: unknown;
  /** Egress key of the member that refused; null for direct egress or an edge relay. */
  refusedKey: string | null;
  attempt: number;
  limit: number;
  aborted: boolean;
  /** Daily or subscription quota text: the account is out, another egress will not help. */
  accountScopedQuota: boolean;
};

export function isReEgressCandidate(o: ReEgressCandidateInput): boolean {
  if (!o.enabled || o.aborted || o.accountScopedQuota) return false;
  if (Number(o.status) !== 429 || o.upstreamStatus !== 429) return false;
  if (o.proxySource !== "registry" || !o.refusedKey) return false;
  if (!(o.attempt < o.limit)) return false;
  return rotatesEgressOnQuotaRefusal(o.provider);
}

/** The pool offered an egress that differs from the refused one and was not tried before. */
export function isFreshEgressKey(
  nextKey: string | null,
  refusedKey: string | null,
  triedKeys: ReadonlySet<string>
): boolean {
  return !!nextKey && nextKey !== refusedKey && !triedKeys.has(nextKey);
}

export type PendingEgress = { connectionId: string; proxyInfo: unknown };

/**
 * The egress resolved for a re-send applies only to the account it was resolved for. When the
 * loop ends up on another connection (selection ignores the preselected account once one was
 * excluded), that connection resolves its own proxy. Reusing it also avoids a second pool
 * resolution, which would advance a round-robin cursor and could land on a tried member.
 */
export function takePendingEgress(
  pending: PendingEgress | null,
  connectionId: string
): { proxyInfo: unknown } | null {
  return pending && pending.connectionId === connectionId ? { proxyInfo: pending.proxyInfo } : null;
}
