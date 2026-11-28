import type {
  CliToolStateRepository,
  ConductorCursorRepository,
  LocalCorpusRootRepository,
} from "@/domain/persistence/localToolStateRepositories";
import {
  sqliteCliToolStateLegacySync,
  sqliteCliToolStateRepository,
} from "./sqliteCliToolStateRepository";
import {
  sqliteConductorCursorLegacySync,
  sqliteConductorCursorRepository,
} from "./sqliteConductorCursorRepository";
import {
  sqliteLocalCorpusRootLegacySync,
  sqliteLocalCorpusRootRepository,
} from "./sqliteLocalCorpusRootRepository";

export interface LocalToolStateRepositories {
  cliTools: CliToolStateRepository;
  conductorCursor: ConductorCursorRepository;
  localCorpusRoot: LocalCorpusRootRepository;
  legacySync: {
    cliTools: typeof sqliteCliToolStateLegacySync;
    conductorCursor: typeof sqliteConductorCursorLegacySync;
    localCorpusRoot: typeof sqliteLocalCorpusRootLegacySync;
  };
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * Other `key_value` namespaces (settings and friends) stay in their own
 * modules. Legacy synchronous access is explicitly separate from the Promise
 * contract.
 */
export const localToolStateRepositories: LocalToolStateRepositories = {
  cliTools: sqliteCliToolStateRepository,
  conductorCursor: sqliteConductorCursorRepository,
  localCorpusRoot: sqliteLocalCorpusRootRepository,
  legacySync: {
    cliTools: sqliteCliToolStateLegacySync,
    conductorCursor: sqliteConductorCursorLegacySync,
    localCorpusRoot: sqliteLocalCorpusRootLegacySync,
  },
};
