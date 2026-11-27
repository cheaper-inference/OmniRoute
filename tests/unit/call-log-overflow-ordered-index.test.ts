// Overflow selection (selectOverflowArtifactPaths) must read newest-first from an ordered
// partial index, not sort every artifact row on each rotation pass.
import assert from "node:assert/strict";
import test from "node:test";

import { createTempDataDir } from "../_setup/tempDataDir.ts";

const { cleanup } = createTempDataDir("omniroute-overflow-index-");
const core = await import("../../src/lib/db/core.ts");
const queries = await import("../../src/lib/usage/callLogsBoundedQueries.ts");

test.after(cleanup);

const db = core.getDbInstance();
const insert = db.prepare(
  "INSERT INTO call_logs (id, timestamp, status, artifact_relpath) VALUES (?, ?, ?, ?)"
);
db.exec("BEGIN");
for (let i = 0; i < 3000; i++) {
  // Every 3rd row has an artifact; 100 rows share each timestamp, so id DESC breaks ties.
  const timestamp = new Date(1_700_000_000_000 + Math.floor(i / 100) * 1000).toISOString();
  insert.run(
    `id-${String(i).padStart(5, "0")}`,
    timestamp,
    200,
    i % 3 === 0 ? `a/${i}.json` : null
  );
}
db.exec("COMMIT");

/** The SQL selectOverflowArtifactPaths really runs, captured without hard-coding it here. */
function overflowSql(): string {
  let captured = "";
  const original = db.prepare.bind(db);
  (db as { prepare: unknown }).prepare = (sql: string) => {
    captured = sql;
    return original(sql);
  };
  try {
    queries.selectOverflowArtifactPaths(500, 100);
  } finally {
    (db as { prepare: unknown }).prepare = original;
  }
  return captured;
}

function plan(sql: string): string[] {
  const rows = db.prepare(`EXPLAIN QUERY PLAN ${sql}`).all(100, 500) as Array<{ detail: string }>;
  return rows.map((row) => row.detail);
}

test("overflow selection plan has no sort, with and without planner stats", () => {
  const sql = overflowSql();
  assert.match(sql, /artifact_relpath IS NOT NULL/);
  const cold = plan(sql);
  assert.deepEqual(
    cold.filter((detail) => detail.includes("TEMP B-TREE")),
    [],
    `cold plan sorts: ${cold.join(" | ")}`
  );
  db.exec("ANALYZE");
  const analyzed = plan(sql);
  assert.deepEqual(
    analyzed.filter((detail) => detail.includes("TEMP B-TREE")),
    [],
    `analyzed plan sorts: ${analyzed.join(" | ")}`
  );
});

test("overflow selection still returns artifacts newest first, ties by id DESC", () => {
  const paths = queries.selectOverflowArtifactPaths(500, 100);
  const expected = (
    db
      .prepare(
        `SELECT artifact_relpath FROM call_logs INDEXED BY idx_cl_timestamp
       WHERE artifact_relpath IS NOT NULL ORDER BY timestamp DESC, id DESC LIMIT 100 OFFSET 500`
      )
      .all() as Array<{ artifact_relpath: string }>
  ).map((row) => row.artifact_relpath);
  assert.equal(paths.length, 100);
  assert.deepEqual(paths, expected);
});
