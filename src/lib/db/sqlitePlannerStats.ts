import type { SqliteAdapter } from "./adapters/types";
import { getDbInstance } from "./core";

const DEFAULT_ANALYSIS_LIMIT = 400;
const MAX_ANALYSIS_LIMIT = 100_000;
const initializedHandles = new WeakSet<SqliteAdapter>();

/** Decimal integers only; malformed limits fall back rather than partially parsing. */
export function parseSqlitePlannerStatsEnv(env: NodeJS.ProcessEnv = process.env) {
  const enabled = !["false", "0"].includes(
    env.OMNIROUTE_SQLITE_OPTIMIZE_ENABLED?.trim().toLowerCase() ?? ""
  );
  const raw = env.OMNIROUTE_SQLITE_ANALYSIS_LIMIT?.trim() ?? "";
  const parsed = /^[+-]?\d+$/.test(raw) ? Number(raw) : NaN;
  const analysisLimit = Number.isFinite(parsed)
    ? Math.min(MAX_ANALYSIS_LIMIT, Math.max(0, parsed))
    : DEFAULT_ANALYSIS_LIMIT;
  return { enabled, analysisLimit };
}

/**
 * Background-only planner maintenance, following https://sqlite.org/pragma.html#pragma_optimize.
 * The first enabled pass checks all tables, including ones this connection has not queried;
 * later passes let SQLite select missing/stale statistics. Track connections, not processes,
 * so a reopened singleton gets the startup treatment too. Failed initialization is retried.
 */
export function maintainSqlitePlannerStats(database?: SqliteAdapter): void {
  try {
    const config = parseSqlitePlannerStatsEnv();
    if (!config.enabled) return;
    const db = database ?? getDbInstance();
    // No maintenance for build/cloud stubs, memory databases, or native read-only handles.
    if (db.driver === "sql.js" || !db.name || db.name === ":memory:") return;
    if ((db.raw as { readonly?: boolean } | null)?.readonly) return;

    db.pragma(`analysis_limit = ${config.analysisLimit}`);
    // Plain optimize enables SQLite's own sampling cap, even when analysis_limit is 0.
    // Clear only that cap bit for the explicit unlimited mode; keep table selection.
    const periodicOptimize = config.analysisLimit === 0 ? "optimize = 0x00002" : "optimize";
    db.pragma(initializedHandles.has(db) ? periodicOptimize : "optimize = 0x10002");
    initializedHandles.add(db);
  } catch (err: unknown) {
    console.warn("[DB] SQLite planner statistics maintenance failed:", err);
  }
}
