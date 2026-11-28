import type { FeatureFlagDefinition } from "./featureFlagTypes";

export const MODEL_AVAILABILITY_EVIDENCE_ENABLED_FLAG: FeatureFlagDefinition = {
  key: "MODEL_AVAILABILITY_EVIDENCE_ENABLED",
  label: "Confirmed Model Unavailability",
  description:
    "Skip a model on an individual connection and upstream endpoint after two explicit upstream model-not-found responses within 24 hours. The evidence expires after 30 days or is cleared by an accepted response.",
  descriptionI18nKey: "featureFlagModelAvailabilityEvidenceEnabledDescription",
  category: "runtime",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "info",
};
