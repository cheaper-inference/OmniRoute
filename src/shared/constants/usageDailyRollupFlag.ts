import type { FeatureFlagDefinition } from "./featureFlagTypes";

/**
 * Opt-in daily usage rollup. Lives next to its siblings but outside
 * `featureFlagDefinitions.ts`, which is already at its size cap.
 */
export const USAGE_DAILY_ROLLUP_FLAG: FeatureFlagDefinition = {
  key: "USAGE_DAILY_ROLLUP_ENABLED",
  label: "Daily Usage Rollup",
  description:
    "Publish closed usage days into usage_daily_summary ahead of retention, so long analytics windows read daily totals instead of raw rows. Off by default: published days lose their per-connection, per-API-key, success and latency detail in analytics, and their cost stays as priced when published.",
  descriptionI18nKey: "featureFlagUsageDailyRollupEnabledDescription",
  category: "runtime",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "caution",
};
