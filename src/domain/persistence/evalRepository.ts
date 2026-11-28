/**
 * Persistence contract for eval records: custom suites with their ordered cases
 * (`eval_suites`, `eval_cases`) and the history of suite runs against a target
 * (`eval_runs`). Running a suite and grading its cases stay in the eval services.
 */

export type EvalTargetType = "suite-default" | "model" | "combo";
export type EvalCaseStrategy = "contains" | "exact" | "regex" | "custom";

export interface EvalMessage {
  role: string;
  content: string;
}

export interface EvalCaseRecord {
  id: string;
  suiteId: string;
  name: string;
  model?: string;
  input: {
    messages: EvalMessage[];
    max_tokens?: number;
  };
  expected: {
    strategy: EvalCaseStrategy;
    value?: string;
  };
  tags: string[];
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface EvalSuiteRecord {
  id: string;
  name: string;
  description?: string;
  source: "custom";
  caseCount: number;
  cases: EvalCaseRecord[];
  createdAt: string;
  updatedAt: string;
}

export interface EvalTargetDescriptor {
  type: EvalTargetType;
  id: string | null;
  key: string;
  label: string;
}

export interface EvalRunSummary {
  total: number;
  passed: number;
  failed: number;
  passRate: number;
}

export interface PersistedEvalRun {
  id: string;
  runGroupId: string | null;
  suiteId: string;
  suiteName: string;
  target: EvalTargetDescriptor;
  apiKeyId: string | null;
  avgLatencyMs: number;
  summary: EvalRunSummary;
  results: Array<Record<string, unknown>>;
  outputs: Record<string, string>;
  createdAt: string;
}

export interface EvalRoutingRunQuery {
  targetIds: string[];
  suiteIds?: string[];
  maxAgeHours?: number;
  limit?: number;
}

export interface SaveEvalRunInput {
  runGroupId?: string | null;
  suiteId: string;
  suiteName: string;
  target: { type: EvalTargetType; id?: string | null; label: string };
  apiKeyId?: string | null;
  avgLatencyMs?: number;
  summary: EvalRunSummary;
  results: Array<Record<string, unknown>>;
  outputs?: Record<string, string>;
  createdAt?: string;
}

export interface EvalRunListQuery {
  suiteId?: string;
  runGroupId?: string;
  limit?: number;
}

export interface SaveEvalSuiteInput {
  id?: string;
  name: string;
  description?: string;
  cases: Array<{
    id?: string;
    name: string;
    model?: string;
    input: {
      messages: EvalMessage[];
      max_tokens?: number;
    };
    expected: {
      strategy: EvalCaseStrategy;
      value?: string;
    };
    tags?: string[];
  }>;
}

/** Stable key for a run target; a missing or blank id becomes `__default__`. */
export function serializeEvalTargetKey(type: EvalTargetType, id?: string | null): string {
  return `${type}:${typeof id === "string" && id.trim().length > 0 ? id.trim() : "__default__"}`;
}

export interface EvalRunRepository {
  /** Appends one run with a fresh id; createdAt defaults to now. */
  save(input: SaveEvalRunInput): Promise<PersistedEvalRun>;
  /** Newest first; limit defaults to 20 and is clamped to 1..200. */
  list(options?: EvalRunListQuery): Promise<PersistedEvalRun[]>;
  /**
   * Newest-first `model` runs for the given target ids (deduplicated, at most 200),
   * optionally limited to suites (at most 50) and to runs younger than maxAgeHours.
   * An empty target list returns no runs without touching storage.
   */
  listModelRunsForRouting(query: EvalRoutingRunQuery): Promise<PersistedEvalRun[]>;
}

export interface EvalSuiteRepository {
  /** Most recently updated first; each suite carries its cases in sort order. */
  list(): Promise<EvalSuiteRecord[]>;
  /** The id is trimmed; a blank id returns null. */
  findById(suiteId: string): Promise<EvalSuiteRecord | null>;
  /**
   * Validates and writes the suite and replaces all of its cases in one
   * transaction; created_at is kept when the suite already exists. Throws on a
   * missing name, no cases, or an invalid case, leaving storage unchanged.
   */
  save(input: SaveEvalSuiteInput): Promise<EvalSuiteRecord>;
  /** Removes the suite and its cases; false for a blank or unknown id. */
  deleteById(suiteId: string): Promise<boolean>;
}
