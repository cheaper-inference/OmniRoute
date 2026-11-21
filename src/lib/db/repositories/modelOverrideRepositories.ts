import type {
  AutoCandidateOverrideRepository,
  ModelCapabilityOverrideRepository,
  ModelContextOverrideRepository,
} from "@/domain/persistence/modelOverrideRepositories";
import { sqliteAutoCandidateOverrideRepository } from "./sqliteAutoCandidateOverrideRepository";
import {
  sqliteModelCapabilityOverrideLegacySync,
  sqliteModelCapabilityOverrideRepository,
} from "./sqliteModelCapabilityOverrideRepository";
import {
  sqliteModelContextOverrideLegacySync,
  sqliteModelContextOverrideRepository,
} from "./sqliteModelContextOverrideRepository";

export interface ModelOverrideRepositories {
  autoCandidates: AutoCandidateOverrideRepository;
  capabilities: ModelCapabilityOverrideRepository;
  contexts: ModelContextOverrideRepository;
  legacySync: {
    capabilities: typeof sqliteModelCapabilityOverrideLegacySync;
    contexts: typeof sqliteModelContextOverrideLegacySync;
  };
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * Capability and context overrides are read synchronously on the request hot path
 * (capability resolution and catalog snapshots), so that access stays explicitly
 * separate from the Promise contract instead of pretending to be backend-neutral.
 */
export const modelOverrideRepositories: ModelOverrideRepositories = {
  autoCandidates: sqliteAutoCandidateOverrideRepository,
  capabilities: sqliteModelCapabilityOverrideRepository,
  contexts: sqliteModelContextOverrideRepository,
  legacySync: {
    capabilities: sqliteModelCapabilityOverrideLegacySync,
    contexts: sqliteModelContextOverrideLegacySync,
  },
};
