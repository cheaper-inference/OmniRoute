import type { FeatureFlagDefinition } from "./featureFlagTypes";

// Web-search feature flags, spread at the end of FEATURE_FLAG_DEFINITIONS (catalog order is
// unchanged). Kept in their own module so featureFlagDefinitions.ts stays under the file-size cap.
export const SEARCH_FEATURE_FLAG_DEFINITIONS: FeatureFlagDefinition[] = [
  {
    key: "CODEX_SEARCH_AUTO_FALLBACK_ENABLED",
    label: "Codex Web Search: Automatic Fallback",
    description:
      "Let an automatic web search (no explicit provider) use a connected Codex (ChatGPT) account through codex-search: as the last resort ahead of the keyless providers when no credentialed search provider is usable, and as the failover alternate. Each such search spends ChatGPT subscription quota and takes about 10-40 s. Off by default: codex-search runs only when a request names it explicitly.",
    descriptionI18nKey: "featureFlagCodexSearchAutoFallbackEnabledDescription",
    category: "runtime",
    defaultValue: "false",
    type: "boolean",
    requiresRestart: false,
    warningLevel: "caution",
  },
];
