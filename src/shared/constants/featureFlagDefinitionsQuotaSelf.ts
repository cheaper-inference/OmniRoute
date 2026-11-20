import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** Kept in its own module so the definitions registry stays under the file-size cap. */
export const QUOTA_SELF_PANEL_FLAG: FeatureFlagDefinition = {
  key: "QUOTA_SELF_PANEL",
  label: "Quota Share: Self-Service API",
  description:
    "Let an API key read its own quota-share position and usage: enables GET /v1/me/quota/{provider} and GET /v1/me/usage for keys with the self:usage scope. Pool names and schedule labels are shown to those keys as written. Off by default: those routes answer 404.",
  descriptionI18nKey: "featureFlagQuotaSelfPanelDescription",
  category: "security",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "caution",
};
