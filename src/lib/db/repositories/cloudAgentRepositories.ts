import type { CloudAgentCredentialRepository } from "@/domain/persistence/cloudAgentCredentialRepository";
import {
  sqliteCloudAgentCredentialLegacySync,
  sqliteCloudAgentCredentialRepository,
} from "./sqliteCloudAgentCredentialRepository";

export interface CloudAgentRepositories {
  credentials: CloudAgentCredentialRepository;
  legacySync: {
    credentials: typeof sqliteCloudAgentCredentialLegacySync;
  };
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * Legacy synchronous access is explicitly separate from the Promise contract;
 * it does not pretend to support a future network database synchronously.
 */
export const cloudAgentRepositories: CloudAgentRepositories = {
  credentials: sqliteCloudAgentCredentialRepository,
  legacySync: {
    credentials: sqliteCloudAgentCredentialLegacySync,
  },
};
