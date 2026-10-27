import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";

/** Feature flag gating the #16190 retest of gateway-disabled connections (default off). */
export const RETEST_AUTO_DISABLED_FLAG = "CREDENTIAL_HEALTH_RETEST_AUTO_DISABLED";

/**
 * True when the operator turned on the retest of connections the gateway switched off by
 * itself. Fails closed: any error reading the flag keeps the pre-#16190 behavior (no marker
 * stamped, no retest, autopilot actions not recorded as operator intent).
 */
export function isRetestAutoDisabledEnabled(): boolean {
  try {
    return isFeatureFlagEnabled(RETEST_AUTO_DISABLED_FLAG);
  } catch {
    return false;
  }
}
