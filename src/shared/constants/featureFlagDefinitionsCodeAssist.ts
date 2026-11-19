import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** #18060 — kept in its own module so the definitions registry stays under the file-size cap. */
export const CODE_ASSIST_LEGACY_TIER_FLAG: FeatureFlagDefinition = {
  key: "CODE_ASSIST_INELIGIBLE_ONBOARD_LEGACY_TIER",
  label: "Code Assist: Legacy Tier for Ineligible Onboarding",
  description:
    "For Antigravity / Code Assist onboarding, an account whose loadCodeAssist answer lists ineligibleTiers and marks no allowed tier as default onboards with legacy-tier instead of its currentTier (#18060), matching the Antigravity-Manager fetch_project_id order. Not yet confirmed on a real restricted account. Off by default: such an account keeps onboarding with its currentTier.",
  descriptionI18nKey: "featureFlagCodeAssistIneligibleOnboardLegacyTierDescription",
  category: "runtime",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "caution",
};
