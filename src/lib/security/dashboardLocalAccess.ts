import { AUTHZ_HEADER_PEER_LOCALITY } from "@/server/authz/headers";
import { isLocalOnlyBypassableByManageScope, isLocalOnlyPath } from "@/server/authz/routeGuard";
import { getTrustProxyMode } from "@/server/origin/trustProxyMode";
import {
  LOCAL_ONLY_DASHBOARD_PATHS,
  type LocalAccessLocality,
  type LocalOnlyAccessSnapshot,
} from "@/shared/constants/localOnlyFeatures";
import { getRequestPeerLocality } from "@/shared/utils/apiAuth";

/**
 * Tell a dashboard page, before it sends anything, which local-only features its session
 * cannot use.
 *
 * Read-only view of decisions the authz pipeline already made — it grants nothing and
 * reveals nothing the guard's 403 would not:
 *   - locality is the pipeline's own trusted verdict (`getRequestPeerLocality`, the
 *     token-stamped TCP peer; never the Host header while a stamping server is in front);
 *   - the blocked paths are judged by the route guard's own predicates, so a path that gains
 *     a GET exemption or a manage-scope bypass stops being reported with no change here.
 *
 * `headers` are the page request's headers as a server component reads them (`headers()`).
 */
export function resolveDashboardLocalAccess(headers: Headers): LocalOnlyAccessSnapshot {
  return {
    locality: resolveLocality(headers),
    remoteBlockedPaths: LOCAL_ONLY_DASHBOARD_PATHS.filter(
      (path) => isLocalOnlyPath(path, "GET") && !isLocalOnlyBypassableByManageScope(path)
    ),
  };
}

function resolveLocality(headers: Headers): LocalAccessLocality {
  // Only the pipeline's stamp on this very request says where the session comes from. If it
  // did not reach the page, do not let the fail-closed default ("remote") hide features from
  // a local operator: leave it undecided and let the first response settle it.
  if (headers.get(AUTHZ_HEADER_PEER_LOCALITY) === null) return "unknown";
  if (getRequestPeerLocality({ headers }) !== "remote") return "local";
  // The stamped verdict calls every request relayed by a reverse proxy "remote", but with
  // OMNIROUTE_TRUST_PROXY=private the guard still serves a private-LAN client behind a
  // private proxy (peerContext.isPrivateLanRequest). That decision needs headers the pipeline
  // strips before the page runs, so do not claim "remote" here: the first response decides.
  return getTrustProxyMode() === "private" ? "unknown" : "remote";
}
