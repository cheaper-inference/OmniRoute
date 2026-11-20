import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** #20343 — kept in its own module so the definitions registry stays under the file-size cap. */
export const QUOTA_DAILY_REVALIDATION_FLAG: FeatureFlagDefinition = {
  key: "QUOTA_DAILY_REVALIDATION",
  label: "Resilience: Revalidate Long Quota Locks Daily",
  description:
    "Let the credential health sweep re-probe a model that a quota failure parked for more than a day. Cost: one minimal real request (one-token answer cap) to that model on its connection, at most once a day per locked model and 5 per sweep. If the model answers, its lock is cleared early, so a quota that resets early (or a lock derived from a bad parse) stops parking it; a quota answer keeps the lock, and any other outcome leaves it untouched. A probe only ever affects that model's lock, never the connection or its other models. Off by default: a long quota lock lasts exactly the window it announced, and no extra upstream request is made (#20343).",
  descriptionI18nKey: "featureFlagQuotaDailyRevalidationDescription",
  category: "health",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "caution",
};
