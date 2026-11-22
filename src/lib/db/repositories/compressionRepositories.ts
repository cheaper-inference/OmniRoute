import type {
  CompressionComboRepository,
  CompressionSettingsRepository,
} from "@/domain/persistence/compressionRepositories";
import {
  sqliteCompressionComboLegacySync,
  sqliteCompressionComboRepository,
} from "./sqliteCompressionComboRepository";
import {
  sqliteCompressionSettingsLegacySync,
  sqliteCompressionSettingsRepository,
} from "./sqliteCompressionSettingsRepository";

export interface CompressionRepositories {
  settings: CompressionSettingsRepository;
  combos: CompressionComboRepository;
  legacySync: {
    settings: typeof sqliteCompressionSettingsLegacySync;
    combos: typeof sqliteCompressionComboLegacySync;
  };
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * Compression combos are read synchronously on the chat request path, and the
 * proactive-compression threshold is read without awaiting, so that access stays
 * explicitly separate from the Promise contract instead of pretending to be
 * backend-neutral.
 */
export const compressionRepositories: CompressionRepositories = {
  settings: sqliteCompressionSettingsRepository,
  combos: sqliteCompressionComboRepository,
  legacySync: {
    settings: sqliteCompressionSettingsLegacySync,
    combos: sqliteCompressionComboLegacySync,
  },
};
