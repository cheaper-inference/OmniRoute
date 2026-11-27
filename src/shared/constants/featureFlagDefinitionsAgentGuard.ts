import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** Kept in its own module so the definitions registry stays under the file-size cap. */
const AGENT_GUARD_MODE_FLAG: FeatureFlagDefinition = {
  key: "AGENT_GUARD_MODE",
  label: "Agent Guard Mode",
  description:
    "Client-agent policy for the claude and anthropic providers. monitor logs requests whose client is not an official agent (Claude Code or an official Anthropic SDK). block refuses known third-party agents on the provider the request resolved to. Unidentified clients are refused only with AGENT_GUARD_STRICT. monitor observes only model ids with the provider prefix (cc/, claude/, anthropic/ or a quota-share id), not bare model ids or combos. Client headers can be forged, so this is deterrence, not access control.",
  descriptionI18nKey: "featureFlagAgentGuardModeDescription",
  category: "security",
  defaultValue: "off",
  type: "enum",
  enumValues: ["off", "monitor", "block"],
  requiresRestart: false,
  warningLevel: "info",
};

const AGENT_GUARD_STRICT_FLAG: FeatureFlagDefinition = {
  key: "AGENT_GUARD_STRICT",
  label: "Agent Guard Strict",
  description:
    "With AGENT_GUARD_MODE=block, also refuse clients that cannot be identified, which includes browser-based clients and the dashboard playground. No effect in other modes.",
  descriptionI18nKey: "featureFlagAgentGuardStrictDescription",
  category: "security",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "caution",
};

export const AGENT_GUARD_FLAG_DEFINITIONS: FeatureFlagDefinition[] = [
  AGENT_GUARD_MODE_FLAG,
  AGENT_GUARD_STRICT_FLAG,
];
