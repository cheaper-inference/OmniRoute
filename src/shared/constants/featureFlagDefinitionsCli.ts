// The CLI section of the feature-flag catalog. Split out of featureFlagDefinitions.ts to keep
// that catalog under the file-size cap; featureFlagDefinitions.ts spreads it in place, so the
// catalog order is unchanged.
import type { FeatureFlagDefinition } from "./featureFlagTypes";

export const CLI_FEATURE_FLAG_DEFINITIONS: FeatureFlagDefinition[] = [
  {
    key: "CLI_COMPAT_ALL",
    label: "CLI Compat All",
    description: "Enable compatibility mode for all CLI clients",
    descriptionI18nKey: "featureFlagCliCompatAllDescription",
    category: "cli",
    defaultValue: "false",
    type: "boolean",
    requiresRestart: true,
    warningLevel: "info",
  },
  {
    key: "MODEL_ALIAS_COMPAT_ENABLED",
    label: "Model Alias Compat",
    description: "Enable model alias compatibility layer",
    descriptionI18nKey: "featureFlagModelAliasCompatEnabledDescription",
    category: "cli",
    defaultValue: "false",
    type: "boolean",
    requiresRestart: false,
    warningLevel: "info",
  },
  {
    key: "PRICING_SYNC_ENABLED",
    label: "Pricing Sync",
    description:
      "Enable automatic pricing data synchronization (requires the PRICING_SYNC_ENABLED environment variable to be set to true)",
    descriptionI18nKey: "featureFlagPricingSyncEnabledDescription",
    category: "cli",
    defaultValue: "false",
    type: "boolean",
    requiresRestart: false,
    warningLevel: "info",
  },
  {
    key: "OMNIROUTE_AUTO_SYNC_CODEX_PROFILES",
    label: "Auto-Sync Codex Profiles",
    description:
      "After a provider model sync, automatically (re)write ~/.codex/*.config.toml profile files from the live catalog. Never changes the active/default Codex config. Off by default.",
    descriptionI18nKey: "featureFlagOmnirouteAutoSyncCodexProfilesDescription",
    category: "cli",
    defaultValue: "false",
    type: "boolean",
    requiresRestart: false,
    warningLevel: "caution",
  },
  {
    key: "OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES",
    label: "Auto-Sync Claude Code Profiles",
    description:
      "After a provider model sync, automatically (re)write ~/.claude/profiles/'<name>'/settings.json Claude Code profiles from the live catalog. Never changes the active/default Claude config. Off by default.",
    descriptionI18nKey: "featureFlagOmnirouteAutoSyncClaudeProfilesDescription",
    category: "cli",
    defaultValue: "false",
    type: "boolean",
    requiresRestart: false,
    warningLevel: "caution",
  },
];
