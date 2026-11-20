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
  if (getRequestPeerLocality({ headers }) !== "remote") return "local";
  // The stamped verdict calls every request relayed by a reverse proxy "remote", but with
  // OMNIROUTE_TRUST_PROXY=private the guard still serves a private-LAN client behind a
  // private proxy (peerContext.isPrivateLanRequest). That decision needs headers the pipeline
  // strips before the page runs, so do not claim "remote" here: the first response decides.
  return getTrustProxyMode() === "private" ? "unknown" : "remote";
}
