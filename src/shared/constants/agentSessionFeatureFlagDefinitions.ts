import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** #14864 — kept in its own module so the definitions registry stays under the file-size cap. */
export const AGENT_SESSION_MESSAGES_ENABLED_FLAG: FeatureFlagDefinition = {
  key: "AGENT_SESSION_MESSAGES_ENABLED",
  label: "Agent Session Messages Capture",
  description:
    "Capture simplified conversation turns (user prompt, assistant response, called tools) for coding-agent sessions and expose them through GET /v1/me/sessions/{id}/messages to the session owner. Off by default: turns are not captured unless this flag is enabled. Never captured for noLog API keys.",
  descriptionI18nKey: "featureFlagAgentSessionMessagesEnabledDescription",
  category: "policies",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "caution",
};
