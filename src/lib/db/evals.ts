/**
 * Eval record persistence facade.
 *
 * Custom suites, their cases and the run history live behind the Promise-based
 * EvalSuiteRepository and EvalRunRepository. The exports below stay synchronous,
 * SQLite-only legacy helpers that delegate through legacySync to the same SQL, so
 * the API routes, the suite runner and combo routing keep reading and writing in
 * the caller's turn. The history scorecard is derived here from listed runs.
 */

import type {
  EvalRoutingRunQuery,
  EvalRunListQuery,
  EvalRunRepository,
  EvalRunSummary,
  EvalSuiteRecord,
  EvalSuiteRepository,
  PersistedEvalRun,
  SaveEvalRunInput,
  SaveEvalSuiteInput,
} from "@/domain/persistence/evalRepository";
import { evalRepositories } from "./repositories/evalRepositories";

export type {
  EvalRoutingRunQuery,
  EvalRunSummary,
  EvalSuiteRecord,
  EvalTargetType,
  PersistedEvalRun,
} from "@/domain/persistence/evalRepository";
export { serializeEvalTargetKey } from "@/domain/persistence/evalRepository";

/** Async persistence contract for eval run history. */
export function getEvalRunRepository(): EvalRunRepository {
  return evalRepositories.runs;
}

/** Async persistence contract for custom eval suites and their cases. */
export function getEvalSuiteRepository(): EvalSuiteRepository {
  return evalRepositories.suites;
}

function createScorecardFromRuns(
  runs: Array<{
    suiteId: string;
    suiteName: string;
    summary: EvalRunSummary;
    results: Array<Record<string, unknown>>;
  }>
) {
  const totalCases = runs.reduce((sum, run) => sum + run.summary.total, 0);
  const totalPassed = runs.reduce((sum, run) => sum + run.summary.passed, 0);

  return {
    suites: runs.length,
    totalCases,
    totalPassed,
    overallPassRate: totalCases > 0 ? Math.round((totalPassed / totalCases) * 100) : 0,
    perSuite: runs.map((run) => ({
      id: run.suiteId,
      name: run.suiteName,
      passRate: run.summary.passRate,
    })),
  };
}

export function saveEvalRun(input: SaveEvalRunInput): PersistedEvalRun {
  return evalRepositories.legacySync.saveRun(input);
}

export function listEvalRuns(options: EvalRunListQuery = {}): PersistedEvalRun[] {
  return evalRepositories.legacySync.listRuns(options);
}

export function listModelEvalRunsForRouting(options: EvalRoutingRunQuery): PersistedEvalRun[] {
  return evalRepositories.legacySync.listModelRunsForRouting(options);
}

export function getEvalScorecard(
  options: {
    suiteId?: string;
    limit?: number;
  } = {}
) {
  const runs = listEvalRuns({ suiteId: options.suiteId, limit: options.limit || 50 });
  if (runs.length === 0) return null;

  const latestByScope = new Map<string, PersistedEvalRun>();
  for (const run of runs) {
    const scopeKey = `${run.suiteId}:${run.target.key}`;
    if (!latestByScope.has(scopeKey)) {
      latestByScope.set(scopeKey, run);
    }
  }

  return createScorecardFromRuns(
    Array.from(latestByScope.values()).map((run) => ({
      suiteId: `${run.suiteId}:${run.target.key}`,
      suiteName: `${run.suiteName} · ${run.target.label}`,
      results: run.results,
      summary: run.summary,
    }))
  );
}

export function listCustomEvalSuites(): EvalSuiteRecord[] {
  return evalRepositories.legacySync.listSuites();
}

export function getCustomEvalSuite(suiteId: string): EvalSuiteRecord | null {
  return evalRepositories.legacySync.findSuiteById(suiteId);
}

export function saveCustomEvalSuite(input: SaveEvalSuiteInput): EvalSuiteRecord {
  return evalRepositories.legacySync.saveSuite(input);
}

export function deleteCustomEvalSuite(suiteId: string): boolean {
  return evalRepositories.legacySync.deleteSuite(suiteId);
}
