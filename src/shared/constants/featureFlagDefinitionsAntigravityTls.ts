import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** Kept in its own module so featureFlagDefinitions.ts stays under the file-size cap. */
export const ANTIGRAVITY_GO_TLS_TRANSPORT_ENABLED_FLAG: FeatureFlagDefinition = {
  key: "ANTIGRAVITY_GO_TLS_TRANSPORT_ENABLED",
  label: "Antigravity CLI: Go crypto/tls HTTP/1.1 Transport",
  description:
    "Route Antigravity and agy cli profile outbound HTTPS requests through an optional Go net/http crypto/tls HTTP/1.1 sidecar bridge when the compiled helper binary is present. Preserves Go HTTP/1.1 TLS fingerprinting, gzip auto-negotiation, and cli-profile headers while silently falling back to standard fetch if the helper is unavailable or fails pre-response. Off by default.",
  descriptionI18nKey: "featureFlags.definitions.ANTIGRAVITY_GO_TLS_TRANSPORT_ENABLED.description",
  category: "network",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "info",
};
