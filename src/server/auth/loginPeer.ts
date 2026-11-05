/**
 * Where a login attempt comes from, judged from the socket peer the authz pipeline stamps
 * on the request. Per-client limits use the client address validated by the pipeline;
 * locality gates still use the socket peer. Raw forwarding headers never decide either.
 */
import { classifyIpScope, type IpScope } from "@/lib/ipUtils";
import {
  AUTHZ_HEADER_TRUSTED_CLIENT_IP,
  AUTHZ_HEADER_TRUSTED_PEER_IP,
} from "@/server/authz/headers";
import { classifyHostLocality } from "@/server/authz/routeGuard";
import { getRequestPeerLocality } from "@/shared/utils/apiAuth";

const UNKNOWN_PEER_KEY = "__unknown_peer__";

/**
 * Key failed attempts by the pipeline-validated client so visitors behind one proxy
 * retain separate budgets. The pipeline strips caller-supplied trusted headers and
 * validates the server's client stamp before adding this address. If it is absent,
 * fall back to the validated socket peer or one fail-closed unknown bucket; never
 * fall back to raw forwarding headers while peer stamping is enabled.
 */
export function getLoginLockoutKey(request: Request, forwardedIp: string | null): string | null {
  if (!process.env.OMNIROUTE_PEER_STAMP_TOKEN) return forwardedIp;
  return (
    request.headers.get(AUTHZ_HEADER_TRUSTED_CLIENT_IP) ||
    request.headers.get(AUTHZ_HEADER_TRUSTED_PEER_IP) ||
    UNKNOWN_PEER_KEY
  );
}

/** Origin tag for audit rows, from the stamped peer rather than a forwarded address. */
export function getLoginSourceScope(request: Request, forwardedIp: string | null): IpScope {
  if (!process.env.OMNIROUTE_PEER_STAMP_TOKEN) return classifyIpScope(forwardedIp);
  const locality = getRequestPeerLocality(request);
  return locality === "loopback" ? "loopback" : locality === "lan" ? "private" : "public";
}

/**
 * True for the operator sitting at the host: a loopback socket peer with no proxy hop,
 * addressed by a loopback name. A proxy on the same host that adds no forwarding headers
 * looks like a loopback peer, but it normally passes the public Host through. The Host
 * header is caller-controlled, so it can only narrow this check, never widen it.
 */
export function isHostOperatorRequest(request: Request): boolean {
  if (getRequestPeerLocality(request) !== "loopback") return false;
  let host = request.headers.get("host");
  if (!host) {
    try {
      host = new URL(request.url).host;
    } catch {
      return false;
    }
  }
  return classifyHostLocality(host) === "loopback";
}
