import type { FeatureFlagDefinition } from "./featureFlagTypes";

/**
 * Default-off flags for the System One decisions backends and the jev combo strategy
 * (#16676, #14667, #15279). Spread at the end of FEATURE_FLAG_DEFINITIONS;
 * kept apart only because featureFlagDefinitions.ts is at its file-size cap.
 */
export const SYSTEM_ONE_FEATURE_FLAG_DEFINITIONS: FeatureFlagDefinition[] = [
  {
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
  },
  {
    key: "SYSTEMONE_OLLAMA_LOCAL_BACKEND_ENABLED",
    label: "System One: Local Ollama Backend",
    description:
      "Let POST /v1/systemone serve ollama-local/<model> decisions models on the local Ollama configured in the existing ollama-local connection (its base URL, default http://localhost:11434/v1, never a request field) (#14667). Ollama's own limits apply before any upstream call: 2-26 candidates per choice/score question, at most 64 questions, no chat sampling fields, raw base64 images only. Off by default: ollama-local/* model ids are refused with a 400 and no upstream call.",
    descriptionI18nKey: "featureFlagSystemOneOllamaLocalBackendEnabledDescription",
    category: "runtime",
    defaultValue: "false",
    type: "boolean",
    requiresRestart: false,
    warningLevel: "info",
  },
  {
    key: "COMBO_JEV_STRATEGY_ENABLED",
    label: "Combo: Jev Strategy Calls TypeSafe",
    description:
      "Let combos that use the jev strategy ask TypeSafe System One (Jev) which of their models should answer each request (#15279). Every routed request then sends a bounded excerpt of the conversation to api.typesafe.ai and draws paid TypeSafe usage on the configured typesafe connection; a stored TypeSafe key alone never turns it on. Off by default: jev combos make no TypeSafe call and keep the operator's preference order.",
    descriptionI18nKey: "featureFlagComboJevStrategyEnabledDescription",
    category: "runtime",
    defaultValue: "false",
    type: "boolean",
    requiresRestart: false,
    warningLevel: "caution",
  },
];
