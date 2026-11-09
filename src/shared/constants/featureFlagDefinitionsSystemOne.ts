import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** #16676 — keep the SystemOne Cloudflare flag outside the capped registry module. */
export const SYSTEMONE_CLOUDFLARE_BACKEND_ENABLED_FLAG: FeatureFlagDefinition = {
  key: "SYSTEMONE_CLOUDFLARE_BACKEND_ENABLED",
  label: "System One: Cloudflare Workers AI Backend",
  description:
    "Let POST /v1/systemone serve the cloudflare-ai/<jev|clef|clef-flash> decisions models (alias cf/) on Cloudflare Workers AI through the existing cloudflare-ai connection (#16676). Jev on Cloudflare draws AI Gateway credits; Clef draws Workers AI neurons. Off by default: those model ids are refused with a 400 and no upstream call, as before.",
  descriptionI18nKey: "featureFlagSystemOneCloudflareBackendEnabledDescription",
  category: "runtime",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "info",
};
