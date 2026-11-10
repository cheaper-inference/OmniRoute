import type { FeatureFlagDefinition } from "./featureFlagTypes";

// PII flags kept out of featureFlagDefinitions.ts so that catalog stays under the file-size cap;
// both are listed there right after the other PII flags. The two data-mutating PII flags
// (Hard Rule 20) stay in the catalog itself; the vault flag also defaults to "false", guarded by
// tests/unit/pii-opt-in-default.test.ts.
export const PII_RESPONSE_SANITIZATION_MODE_FLAG: FeatureFlagDefinition = {
  key: "PII_RESPONSE_SANITIZATION_MODE",
  label: "PII Response Sanitization Mode",
  description:
    "Mode for PII response sanitization: redact (replace PII), warn (log only), block (reject), off (disable)",
  descriptionI18nKey: "featureFlagPiiResponseSanitizationModeDescription",
  category: "security",
  defaultValue: "redact",
  type: "enum",
  enumValues: ["redact", "warn", "block", "off"],
  requiresRestart: false,
  warningLevel: "info",
};

export const PII_REVERSIBLE_VAULT_FLAG: FeatureFlagDefinition = {
  key: "PII_REVERSIBLE_VAULT_ENABLED",
  label: "Reversible PII Token Vault",
  description:
    "With PII redaction on, replace detected PII in the request with per-request surrogate tokens instead of irreversible placeholders, and restore the original values in the 2xx response sent back to the client (streaming and JSON). The provider, logs and caches only see tokens. No effect while PII redaction is off.",
  descriptionI18nKey: "featureFlagPiiReversibleVaultEnabledDescription",
  category: "security",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "caution",
};
