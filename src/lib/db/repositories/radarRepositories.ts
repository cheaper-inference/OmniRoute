import type { RadarLocalModelStateRepository } from "@/domain/persistence/radarLocalModelStateRepository";
import {
  sqliteRadarLocalModelStateLegacySync,
  sqliteRadarLocalModelStateRepository,
} from "./sqliteRadarLocalModelStateRepository";

export interface RadarRepositories {
  localModelState: RadarLocalModelStateRepository;
  legacySync: {
    localModelState: typeof sqliteRadarLocalModelStateLegacySync;
  };
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * Only operator-owned local model state is behind a repository here; the signed
 * feed caches and the opt-in/supporter-key settings row stay in `radar.ts`.
 * Legacy synchronous access is explicitly separate from the Promise contract.
 */
export const radarRepositories: RadarRepositories = {
  localModelState: sqliteRadarLocalModelStateRepository,
  legacySync: {
    localModelState: sqliteRadarLocalModelStateLegacySync,
  },
};
