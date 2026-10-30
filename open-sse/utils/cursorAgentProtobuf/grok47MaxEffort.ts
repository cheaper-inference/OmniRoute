import { isRegisteredFeatureFlagEnabled } from "../registeredFeatureFlag.ts";

/**
 * #17386: Cursor's docs list exactly four Grok 4.7 effort levels (low/medium/high/xhigh), but
 * the catalog code was earlier verified live with `max` returning HTTP 200 through
 * AgentService/Run. Conflicting evidence, so dropping `max` (catalog fallback aliases and the
 * forwarded effort parameter) is opt-in behind this flag; default off keeps `max` as before.
 */
export const CURSOR_GROK_47_DROP_MAX_EFFORT_FLAG = "CURSOR_GROK_47_DROP_MAX_EFFORT";

export function isCursorGrok47MaxEffortDropped(): boolean {
  return isRegisteredFeatureFlagEnabled(CURSOR_GROK_47_DROP_MAX_EFFORT_FLAG);
}
