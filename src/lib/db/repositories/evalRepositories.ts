import type { EvalRunRepository, EvalSuiteRepository } from "@/domain/persistence/evalRepository";
import {
  sqliteEvalLegacySync,
  sqliteEvalRunRepository,
  sqliteEvalSuiteRepository,
} from "./sqliteEvalRepository";

export interface EvalRepositories {
  runs: EvalRunRepository;
  suites: EvalSuiteRepository;
  legacySync: typeof sqliteEvalLegacySync;
}

/**
 * SQLite-only composition root for eval records. There is deliberately no backend
 * selection. Legacy synchronous access is kept explicitly separate from the
 * Promise contract instead of pretending to be backend-neutral.
 */
export const evalRepositories: EvalRepositories = {
  runs: sqliteEvalRunRepository,
  suites: sqliteEvalSuiteRepository,
  legacySync: sqliteEvalLegacySync,
};
