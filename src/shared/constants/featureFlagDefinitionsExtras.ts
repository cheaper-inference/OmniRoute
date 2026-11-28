import type { FeatureFlagDefinition } from "./featureFlagTypes";
import { CLAUDE_CODE_META_FEATURE_FLAG_DEFINITIONS } from "./featureFlagDefinitionsClaudeCodeMeta";
import { QUOTA_SELF_PANEL_FLAG } from "./featureFlagDefinitionsQuotaSelf";
import { PROXY_REEGRESS_ON_QUOTA_429_FLAG } from "./featureFlagDefinitionsProxyEgress";
import { QUOTA_DAILY_REVALIDATION_FLAG } from "./featureFlagDefinitionsQuotaRevalidation";
import { CODEBUDDY_TELEMETRY_ENABLED_FLAG } from "./featureFlagDefinitionsCodebuddy";
import { AGENT_SESSION_MESSAGES_ENABLED_FLAG } from "./agentSessionFeatureFlagDefinitions";

/**
 * Flags kept out of featureFlagDefinitions.ts because that file sits at its file-size cap.
 * New flag modules join this list, so the registry file grows by one import and one spread
 * in total, however many modules land. Spread at the end of FEATURE_FLAG_DEFINITIONS.
 */
export const EXTRA_FEATURE_FLAG_DEFINITIONS: FeatureFlagDefinition[] = [
  QUOTA_SELF_PANEL_FLAG,
  ...CLAUDE_CODE_META_FEATURE_FLAG_DEFINITIONS,
  PROXY_REEGRESS_ON_QUOTA_429_FLAG,
  QUOTA_DAILY_REVALIDATION_FLAG,
  CODEBUDDY_TELEMETRY_ENABLED_FLAG,
  AGENT_SESSION_MESSAGES_ENABLED_FLAG,
  {
    key: "AIHORDE_CATALOG_BACKGROUND_REFRESH_ENABLED",
    label: "AI Horde Image Catalog Background Refresh",
    description:
      "List AI Horde image models from the last successful snapshot while the catalog refreshes in the background. AI Horde image models are absent from the list until the first refresh succeeds. Off by default.",
    descriptionI18nKey:
      "featureFlags.definitions.AIHORDE_CATALOG_BACKGROUND_REFRESH_ENABLED.description",
    category: "runtime",
    defaultValue: "false",
    type: "boolean",
    requiresRestart: false,
    warningLevel: "info",
  },
  {
    key: "SEMANTIC_CACHE_PROVIDER_KEY_ENABLED",
    label: "Semantic Cache: Provider In Key",
    description:
      "Add the answering provider to the default semantic cache key, so two providers that serve one model id no longer share an entry. Off by default: the key has no provider and existing entries stay valid.",
    descriptionI18nKey: "featureFlags.definitions.SEMANTIC_CACHE_PROVIDER_KEY_ENABLED.description",
    type: "boolean",
    defaultValue: "false",
    category: "runtime",
    requiresRestart: false,
  },
];
