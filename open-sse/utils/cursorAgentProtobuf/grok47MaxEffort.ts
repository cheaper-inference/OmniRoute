import { resolveRegisteredFeatureFlag } from "@/shared/utils/featureFlagResolverBridge.ts";

/**
 * #17386: Cursor's docs list exactly four Grok 4.7 effort levels (low/medium/high/xhigh), but
 * the catalog code was earlier verified live with `max` returning HTTP 200 through
 * AgentService/Run. Conflicting evidence, so dropping `max` (catalog fallback aliases and the
 * forwarded effort parameter) is opt-in behind this flag; default off keeps `max` as before.
 */
export const CURSOR_GROK_47_DROP_MAX_EFFORT_FLAG = "CURSOR_GROK_47_DROP_MAX_EFFORT";

/**
 * Resolved through the #10692 bridge, never by importing `@/shared/utils/featureFlags`
 * directly: `cursorAutoCatalog.ts` pulls this module into the provider-detail client bundle
 * (`ProviderDetailPageClient.tsx` → `mergeProviderModelListing.ts` → `cursorAutoCatalog.ts`),
 * and that module reads the SQLite override table through `@/lib/db/core`, so a static import
 * drags `fs`/`child_process`/`module` into the browser chunk and fails the production build.
 * On the server the bridge resolver IS `isFeatureFlagEnabled` (registered by `featureFlags.ts`,
 * which `@/lib/db/core` loads), so DB override > env > default still applies; in a client
 * bundle it falls back to the env var alone, which yields this flag's `false` default.
 */
export function isCursorGrok47MaxEffortDropped(): boolean {
  try {
    return resolveRegisteredFeatureFlag(CURSOR_GROK_47_DROP_MAX_EFFORT_FLAG);
  } catch {
    // Unreadable flag store fails closed: keep the old behavior (max stays).
    return false;
  }
}
