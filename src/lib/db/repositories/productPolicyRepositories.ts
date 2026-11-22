import type {
  FeatureFlagOverrideRepository,
  PiiSettingsRepository,
} from "@/domain/persistence/productPolicyRepositories";
import {
  sqliteFeatureFlagOverrideLegacySync,
  sqliteFeatureFlagOverrideRepository,
} from "./sqliteFeatureFlagOverrideRepository";
import {
  sqlitePiiSettingsLegacySync,
  sqlitePiiSettingsRepository,
} from "./sqlitePiiSettingsRepository";

export interface ProductPolicyRepositories {
  featureFlagOverrides: FeatureFlagOverrideRepository;
  piiSettings: PiiSettingsRepository;
  legacySync: {
    featureFlagOverrides: typeof sqliteFeatureFlagOverrideLegacySync;
    piiSettings: typeof sqlitePiiSettingsLegacySync;
  };
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * Feature flags and PII settings are read synchronously on the request hot path
 * (sanitizers, guardrails, auth gates), so that access stays explicitly separate
 * from the Promise contract instead of pretending to be backend-neutral.
 */
export const productPolicyRepositories: ProductPolicyRepositories = {
  featureFlagOverrides: sqliteFeatureFlagOverrideRepository,
  piiSettings: sqlitePiiSettingsRepository,
  legacySync: {
    featureFlagOverrides: sqliteFeatureFlagOverrideLegacySync,
    piiSettings: sqlitePiiSettingsLegacySync,
  },
};
