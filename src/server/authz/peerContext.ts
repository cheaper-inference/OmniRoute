import { timingSafeEqual } from "node:crypto";

import { getLegacyCliTokenSync, getMachineTokenSync } from "../../lib/machineToken";
import type { PolicyContext } from "./context";
import { getTrustProxyMode } from "../origin/trustProxyMode";
import { CLI_TOKEN_HEADER, CLIENT_IP_HEADER, PEER_IP_HEADER, VIA_PROXY_HEADER } from "./headers";
import { resolveStampedPeer, resolveStampedViaProxy } from "./peerStamp";
import { isLoopbackHost, isPrivateLanHost } from "./routeGuard";

/**
 * Peer-locality + local-CLI-token helpers shared by the route policies.
 *
 * Extracted from `policies/management.ts` because the PUBLIC policy
 * needs the very same CLI-token verdict: `runAuthzPipeline` strips
 * CLI_TOKEN_HEADER from the forwarded headers for EVERY route class, so a route
 * handler can only learn that a local CLI authenticated from the subject stamp
 * the policy produced. Without this, a PUBLIC-classified route that still calls
 * `requireManagementAuth()` (e.g. GET /api/monitoring/health) can never see the
 * local CLI as a management principal.
 */

export function requestPeerAddress(ctx: PolicyContext): string | null {
  // The Next proxy runtime exposes no socket/.ip, so the only trustworthy
  // locality signal is the token-stamped PEER_IP_HEADER our custom server writes
  // from the real TCP peer (scripts/dev/peer-stamp.mjs). We NEVER read the Host
  // header here — it is client-controlled and spoofable. Absent/forged stamp →
  // null → isLoopbackRequest/isPrivateLanRequest return false → fail closed.
  const stamped = resolveStampedPeer(
    ctx.request.headers?.get?.(PEER_IP_HEADER) ?? null,
    process.env.OMNIROUTE_PEER_STAMP_TOKEN
  );
  if (stamped) return stamped;
  // Non-proxy callers (tests / direct Node) may carry a real socket peer.
  return ctx.request.ip ?? ctx.request.socket?.remoteAddress ?? null;
}

/**
 * True when the inbound TCP request carried forwarding headers
 * (`x-forwarded-for` / `x-real-ip`), as stamped by the custom Node server. When
 * set, the socket peer is the reverse-proxy hop, not the end-user — so a
 * loopback / private-LAN socket must NOT be trusted as local (Hard Rules #15 +
 * #17, port of decolua/9router da667836). Token-validated; an attacker who
 * knows the header name but not the per-process token cannot influence it.
 */
export function isViaProxyRequest(ctx: PolicyContext): boolean {
  return resolveStampedViaProxy(
    ctx.request.headers?.get?.(VIA_PROXY_HEADER) ?? null,
    process.env.OMNIROUTE_PEER_STAMP_TOKEN
  );
}

export function isLoopbackRequest(ctx: PolicyContext): boolean {
  if (isViaProxyRequest(ctx)) return false;
  const peerAddress = requestPeerAddress(ctx);
  return peerAddress ? isLoopbackHost(peerAddress) : false;
}

// Owner-authorized (2026-05-30): allow LOCAL_ONLY *paths* from a trusted private
// LAN, based on the real socket peer IP (not spoofable). Does NOT relax the
// CLI-token gate, which stays strictly loopback. When a reverse-proxy hop is
// detected the apparent LAN IP is the proxy, not the end-user (see
// isViaProxyRequest above), so the request is "not LAN" unless the operator
// trusts private proxies and the chain names a private client (see below).
export function isPrivateLanRequest(ctx: PolicyContext): boolean {
  const peerAddress = requestPeerAddress(ctx);
  if (!peerAddress) return false;
  if (!isViaProxyRequest(ctx)) return isPrivateLanHost(peerAddress);
  return isPrivateLanClientOfPrivateProxy(ctx, peerAddress);
}

/**
 * A request relayed by a reverse proxy is a private-LAN request only when the operator
 * opted in with `OMNIROUTE_TRUST_PROXY=private` and the whole chain vouches for it:
 *   - the immediate peer is itself on loopback or a private network (a Cloudflare edge or
 *     an OMNIROUTE_TRUSTED_PROXIES public proxy attributes client IPs, never locality);
 *   - the request did not enter through a Cloudflare tunnel (`cf-connecting-ip`), which
 *     always carries an internet client whatever the inner hops say;
 *   - the client the stamp resolved (peer-stamp.mjs `resolveClientIp`, right-most
 *     untrusted hop) is a private-network address and not loopback: a chain of loopback
 *     hops, or a proxy that overwrites X-Forwarded-For with `$remote_addr`, names no client;
 *   - that client is not the proxy itself: when the proxy reports no client address
 *     (only `Forwarded`, `Via`, `X-Forwarded-Proto`, ...), `resolveClientIp` falls back to
 *     the peer, and a private proxy must not vouch for its own address.
 * Loopback is never derived this way: the CLI-token gate stays socket-only.
 */
function isPrivateLanClientOfPrivateProxy(ctx: PolicyContext, peerAddress: string): boolean {
  if (getTrustProxyMode() !== "private") return false;
  if (!isLoopbackHost(peerAddress) && !isPrivateLanHost(peerAddress)) return false;
  if (ctx.request.headers?.get?.("cf-connecting-ip")) return false;
  const client = resolveStampedPeer(
    ctx.request.headers?.get?.(CLIENT_IP_HEADER) ?? null,
    process.env.OMNIROUTE_PEER_STAMP_TOKEN
  );
  if (!client || isLoopbackHost(client)) return false;
  if (comparableIp(client) === comparableIp(peerAddress)) return false;
  return isPrivateLanHost(client);
}

/** The same address however the stamp spelled it (`::ffff:` IPv4-mapped, `[v6]`, case). */
function comparableIp(address: string): string {
  return address
    .trim()
    .replace(/^\[([^\]]+)\]$/, "$1")
    .replace(/^::ffff:/i, "")
    .toLowerCase();
}

/** Strictly-loopback machine-token check (constant-time). */
export function hasValidLoopbackCliToken(ctx: PolicyContext): boolean {
  if (process.env.OMNIROUTE_DISABLE_CLI_TOKEN === "true") return false;
  if (!isLoopbackRequest(ctx)) return false;
  const headers = ctx.request.headers;
  const provided = headers.get(CLI_TOKEN_HEADER);
  if (!provided) return false;
  const expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()].filter(Boolean);
  return expectedTokens.some((expected) => {
    if (provided.length !== expected.length) return false;
    return timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
  });
}

/** The subject a validated local CLI request is stamped with. */
export const LOCAL_CLI_SUBJECT = Object.freeze({
  kind: "management_key" as const,
  id: "cli",
  label: "local-cli-token",
});
