import { resolveRegisteredFeatureFlag } from "@/shared/utils/featureFlagResolverBridge";

/**
 * #17386: Cursor's docs list exactly four Grok 4.7 effort levels (low/medium/high/xhigh), but
 * the catalog code was earlier verified live with `max` returning HTTP 200 through
 * AgentService/Run. Conflicting evidence, so dropping `max` (catalog fallback aliases and the
 * forwarded effort parameter) is opt-in behind this flag; default off keeps `max` as before.
 */
export const CURSOR_GROK_47_DROP_MAX_EFFORT_FLAG = "CURSOR_GROK_47_DROP_MAX_EFFORT";

export function isCursorGrok47MaxEffortDropped(): boolean {
  try {
    // #10692 client-boundary (regressed by #17388): this helper sits in the
    // provider-catalog chain compiled into "use client" bundles (provider detail
    // page -> mergeProviderModelListing -> cursorAutoCatalog), so it must not
    // statically import the DB-backed @/shared/utils/featureFlags — that drags
    // @/lib/db/*, executors and node builtins into the browser graph. The bridge
    // resolves through the server-registered resolver (DB override > env >
    // definition default) and falls back to env only, with the same truthiness
    // and fail-closed semantics as before.
    return resolveRegisteredFeatureFlag(CURSOR_GROK_47_DROP_MAX_EFFORT_FLAG);
  } catch {
    // Unreadable flag store fails closed: keep the old behavior (max stays).
    return false;
  }
}
