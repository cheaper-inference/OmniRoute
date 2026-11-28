import type { StartupSecretRepository } from "@/domain/persistence/startupSecretRepository";
import {
  sqliteStartupSecretLegacySync,
  sqliteStartupSecretRepository,
} from "./sqliteStartupSecretRepository";

export interface StartupSecretRepositories {
  secrets: StartupSecretRepository;
  legacySync: typeof sqliteStartupSecretLegacySync;
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * Startup reads and first-time writes stay synchronous through legacySync; that
 * access is explicitly separate from the Promise contract and does not pretend to
 * support a future network database synchronously.
 */
export const startupSecretRepositories: StartupSecretRepositories = {
  secrets: sqliteStartupSecretRepository,
  legacySync: sqliteStartupSecretLegacySync,
};
