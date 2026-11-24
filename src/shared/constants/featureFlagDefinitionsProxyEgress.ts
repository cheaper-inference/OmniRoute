import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** Kept in its own module so the definitions registry stays under the file-size cap. */
export const PROXY_REEGRESS_ON_QUOTA_429_FLAG: FeatureFlagDefinition = {
  key: "PROXY_REEGRESS_ON_QUOTA_429",
  label: "Proxy Pool: Re-send After a Per-IP 429",
  description:
    "After a 429 that the provider meters per egress address, received through a connection pool member, re-send the same request with the same account through another pool member that was not tried yet, before the account is marked or another account is tried. Only for pool egress (not a per-key, legacy single, direct or edge-relay proxy), only before any response byte reached the client, never on a daily or subscription quota message, and at most PROXY_REEGRESS_MAX_ATTEMPTS re-sends (default 3). A pool with no other member to offer returns the 429 as before. Needs PROXY_SKIP_RECENTLY_FAILED, which sets the refused member aside. Off by default: a per-IP 429 is handled exactly as before.",
  descriptionI18nKey: "featureFlagProxyReEgressOnQuota429Description",
  category: "network",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "caution",
};
