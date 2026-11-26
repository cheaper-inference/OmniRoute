import type { FeatureFlagDefinition } from "./featureFlagTypes";

/**
 * Default-off flags for the local replies to Claude Code helper requests
 * (open-sse/utils/claudeCodeMetaRequests.ts::detectClaudeCodeMetaReply, wired in
 * open-sse/utils/bypassHandler.ts). Spread at the end of FEATURE_FLAG_DEFINITIONS;
 * kept apart only because featureFlagDefinitions.ts is at its file-size cap.
 */
type MetaFlagFields = Pick<
  FeatureFlagDefinition,
  "key" | "label" | "description" | "descriptionI18nKey" | "warningLevel"
>;

/** Every flag here is a restart-free boolean in the cli category that ships off. */
function defaultOffCliFlag(fields: MetaFlagFields): FeatureFlagDefinition {
  return {
    ...fields,
    category: "cli",
    defaultValue: "false",
    type: "boolean",
    requiresRestart: false,
  };
}

export const CLAUDE_CODE_META_FEATURE_FLAG_DEFINITIONS: FeatureFlagDefinition[] = [
  defaultOffCliFlag({
    key: "CLAUDE_CODE_LOCAL_COMMAND_PREFIX_ENABLED",
    label: "Claude Code: Local Command Prefix Replies",
    description:
      "Answer Claude Code's bash command-prefix classification request (a single user turn with a <policy_spec> and a Command: line, no tools declared) locally with a rule-based prefix, without calling the provider. Applies only to requests from the claude-cli client. The prefix feeds Claude Code's permission prompt, so a wrong prefix can allow more than the user approved. Off by default because the current client request format has not been confirmed against a live capture.",
    descriptionI18nKey: "featureFlagClaudeCodeLocalCommandPrefixDescription",
    warningLevel: "caution",
  }),
  defaultOffCliFlag({
    key: "CLAUDE_CODE_LOCAL_SUGGESTION_ENABLED",
    label: "Claude Code: Local Suggestion-Mode Replies",
    description:
      "Answer Claude Code's next-prompt suggestion request (the last user message opens a text block with [SUGGESTION MODE:) locally with an empty reply, without calling the provider. Applies only to requests from the claude-cli client. Off by default because the current client request format has not been confirmed against a live capture.",
    descriptionI18nKey: "featureFlagClaudeCodeLocalSuggestionDescription",
    warningLevel: "info",
  }),
  defaultOffCliFlag({
    key: "CLAUDE_CODE_LOCAL_FILEPATHS_ENABLED",
    label: "Claude Code: Local File-Path Extraction Replies",
    description:
      "Answer Claude Code's file-path extraction request (a single user turn Command: ... Output: ... asking for <filepaths>, no tools declared) locally, without calling the provider, but only for commands understood without reading their output: plain file readers, listings and simple grep. Other commands still go to the provider. Applies only to requests from the claude-cli client. Off by default because the current client request format has not been confirmed against a live capture.",
    descriptionI18nKey: "featureFlagClaudeCodeLocalFilepathsDescription",
    warningLevel: "info",
  }),
];
