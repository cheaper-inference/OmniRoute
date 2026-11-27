import { AUTHZ_HEADER_DASHBOARD_LOCAL_ACCESS } from "@/server/authz/headers";
import { isLocalOnlyBypassableByManageScope, isLocalOnlyPath } from "@/server/authz/routeGuard";
import {
  LOCAL_ONLY_DASHBOARD_PATHS,
  type LocalAccessLocality,
  type LocalOnlyAccessSnapshot,
} from "@/shared/constants/localOnlyFeatures";

/**
 * Tell a dashboard page, before it sends anything, which local-only features its session
 * cannot use.
 *
 * Read-only view of decisions the authz pipeline already made — it grants nothing and
 * reveals nothing the guard's 403 would not:
 *   - locality is the same decision the LOCAL_ONLY gate makes from the original request,
 *     including the trusted private proxy exception;
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
  const verdict = headers.get(AUTHZ_HEADER_DASHBOARD_LOCAL_ACCESS);
  return verdict === "local" || verdict === "remote" ? verdict : "unknown";
}
