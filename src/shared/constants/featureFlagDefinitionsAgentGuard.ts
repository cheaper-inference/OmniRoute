import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** Kept in its own module so the definitions registry stays under the file-size cap. */
export const AGENT_GUARD_MODE_FLAG: FeatureFlagDefinition = {
  key: "AGENT_GUARD_MODE",
  label: "Agent Guard Mode",
  description:
    "Observe which client agents call the claude and anthropic providers. monitor logs requests whose client is not an official agent (Claude Code or an official Anthropic SDK); it never blocks. Only model ids with the provider prefix (cc/, claude/, anthropic/ or a quota-share id) are observed; bare model ids and combos are not. Client headers can be forged, so this is observation, not access control.",
  descriptionI18nKey: "featureFlagAgentGuardModeDescription",
  category: "security",
  defaultValue: "off",
  type: "enum",
  enumValues: ["off", "monitor"],
  requiresRestart: false,
  warningLevel: "info",
};
