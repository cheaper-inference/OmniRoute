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
 *
 * The bindings are read through getters because core.ts imports the flag facade
 * (via the shared flag resolver), which imports this root, while the SQLite
 * implementations import core.ts: whichever module of that cycle loads first,
 * nothing here is dereferenced before it has initialized.
 */
const legacySync: ProductPolicyRepositories["legacySync"] = {
  get featureFlagOverrides() {
    return sqliteFeatureFlagOverrideLegacySync;
  },
  get piiSettings() {
    return sqlitePiiSettingsLegacySync;
  },
};

export const productPolicyRepositories: ProductPolicyRepositories = {
  get featureFlagOverrides() {
    return sqliteFeatureFlagOverrideRepository;
  },
  get piiSettings() {
    return sqlitePiiSettingsRepository;
  },
  legacySync,
};
