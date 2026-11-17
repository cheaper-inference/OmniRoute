import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** #18849 — kept in its own module so the definitions registry stays under the file-size cap. */
export const FAL_NATIVE_ENABLED_FLAG: FeatureFlagDefinition = {
  key: "FAL_NATIVE_ENABLED",
  label: "Fal: Native Gateway",
  description:
    "Enable the schema-driven Fal gateway: the /v1/fal routes, the /api/providers/{id}/fal schema routes, the Fal panel on the provider page, live Fal catalog discovery in the provider model list, and schema validation of Fal requests on the image, video and music routes. Off by default: those routes answer 404, the panel stays hidden, and Fal requests keep their established request shape, endpoint mapping and response format.",
  descriptionI18nKey: "featureFlagFalNativeEnabledDescription",
  category: "runtime",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "caution",
};
