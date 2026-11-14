import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** #18398 — kept in its own module so the definitions registry stays under the file-size cap. */
export const CODEBUDDY_TELEMETRY_ENABLED_FLAG: FeatureFlagDefinition = {
  key: "CODEBUDDY_TELEMETRY_ENABLED",
  label: "CodeBuddy International: Outbound Turn Reports",
  description:
    "Mirror the official CodeBuddy International CLI by reporting each finished turn to the provider's own POST /v2/report and POST /v1/traces endpoints: OmniRoute builds the events from the real correlation ids, timings and upstream token usage, then sends them on a non-blocking side channel that never affects the chat response. Off by default because it makes OmniRoute speak to a provider endpoint the operator did not ask for, carrying the account identity; the machine id is only forwarded when the connection itself carries one, never synthesised. Requires the codebuddy-intl provider.",
  descriptionI18nKey: "featureFlagCodebuddyTelemetryEnabledDescription",
  category: "runtime",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "caution",
};
