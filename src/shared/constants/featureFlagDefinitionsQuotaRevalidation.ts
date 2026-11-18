import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** #20343 — kept in its own module so the definitions registry stays under the file-size cap. */
export const QUOTA_DAILY_REVALIDATION_FLAG: FeatureFlagDefinition = {
  key: "QUOTA_DAILY_REVALIDATION",
  label: "Resilience: Revalidate Long Quota Locks Daily",
  description:
    "Let the credential health sweep re-probe a model that a quota failure parked for more than a day, at most once a day per lock and 5 per sweep, so a quota that resets early (or a lock derived from a bad parse) stops parking the model until the announced window ends. Off by default: a long quota lock lasts exactly the window it announced, and no extra upstream request is made (#20343).",
  descriptionI18nKey: "featureFlagQuotaDailyRevalidationDescription",
  category: "health",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "caution",
};
