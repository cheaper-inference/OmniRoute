import type { PlaygroundPresetRepository } from "@/domain/persistence/playgroundPresetRepository";
import {
  sqlitePlaygroundPresetLegacySync,
  sqlitePlaygroundPresetRepository,
} from "./sqlitePlaygroundPresetRepository";

export interface PlaygroundRepositories {
  presets: PlaygroundPresetRepository;
  legacySync: typeof sqlitePlaygroundPresetLegacySync;
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * Legacy synchronous access is explicitly separate from the Promise contract;
 * it does not pretend to support a future network database synchronously.
 */
export const playgroundRepositories: PlaygroundRepositories = {
  presets: sqlitePlaygroundPresetRepository,
  legacySync: sqlitePlaygroundPresetLegacySync,
};
