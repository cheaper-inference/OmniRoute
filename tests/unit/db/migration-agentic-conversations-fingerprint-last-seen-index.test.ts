// The conversation tracker reads a fingerprint bucket's most recently seen
// conversations on every tracked request (findAgenticConversationsByFingerprint
// and the bucket subquery of contentCandidatesSql). With only the single-column
// fingerprint index, SQLite reads the whole bucket and sorts it in a temp B-tree
// before LIMIT, so a large bucket stalls the event loop on every request.
// Migration 20261117112335 adds (fingerprint_hash, last_seen_at) so both queries
// read the newest rows straight from the index.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { SqliteAdapter } from "../../../src/lib/db/adapters/types.ts";
import { openMemorySqliteAdapter } from "../_helpers/memorySqliteAdapter.ts";

process.env.DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-migration-fp-last-seen-data-")
);

const repoMigrations = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../src/lib/db/migrations"
);
const MIGRATION = "20261117112335_agentic_conversations_fingerprint_last_seen_index.sql";
const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-fp-last-seen-"));
for (const file of [
  "155_agentic_conversations.sql",
  "156_conversation_turn_nodes.sql",
  "186_conversation_turn_nodes_last_seen_index.sql",
  "201_drop_unused_turn_node_indexes.sql",
  "211_recreate_turn_nodes_content_hash_index.sql",
  MIGRATION,
]) {
  fs.copyFileSync(path.join(repoMigrations, file), path.join(migrationsDir, file));
}
const originalMigrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;

const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");
const { contentCandidatesSql, RECENT_BY_FINGERPRINT_SQL } =
  await import("../../../src/lib/db/agenticConversations.ts");

test.after(() => {
  fs.rmSync(migrationsDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalMigrationsDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = originalMigrationsDir;
});

const NEW_INDEX = "idx_agentic_conversations_fingerprint_last_seen";
const BUCKETS = 10;
const PER_BUCKET = 200;

function conversationIndexes(db: SqliteAdapter): string[] {
  return (
    db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'index' AND tbl_name = 'agentic_conversations' AND sql IS NOT NULL"
      )
      .all() as Array<{ name: string }>
  ).map((row) => row.name);
}

function lastSeen(i: number): string {
  return new Date(Date.UTC(2026, 9, 1) + i * 60_000).toISOString();
}

// Several fingerprint buckets with interleaved last_seen_at values, so the
// planner sees a selective fingerprint and has to choose between sorting a
// bucket and reading it in last_seen_at order.
function seed(db: SqliteAdapter): void {
  const conv = db.prepare(
    "INSERT INTO agentic_conversations (id, api_key_id, fingerprint_hash, last_message_count, last_messages_hash, turn_count, first_seen_at, last_seen_at) VALUES (?, NULL, ?, 0, '', 1, '2026-10-01', ?)"
  );
  const node = db.prepare(
    "INSERT INTO conversation_turn_nodes (id, conversation_id, parent_id, role, content_hash, last_correlation_id, first_seen_at, last_seen_at) VALUES (?, ?, NULL, 'user', ?, NULL, '2026-10-01', '2026-10-01')"
  );
  for (let i = 0; i < BUCKETS * PER_BUCKET; i++) {
    const id = `c${i}`;
    conv.run(id, `fp${i % BUCKETS}`, lastSeen(i));
    node.run(`n${i}`, id, `hash${i}`);
  }
  db.prepare("ANALYZE").run();
}

function plan(db: SqliteAdapter, sql: string, params: unknown[]): string[] {
  return (db.prepare(`EXPLAIN QUERY PLAN ${sql}`).all(...params) as Array<{ detail: string }>).map(
    (row) => row.detail
  );
}

const tempSorts = (details: string[]) =>
  details.filter((detail) => detail.includes("USE TEMP B-TREE FOR ORDER BY")).length;

test("the migration adds the (fingerprint_hash, last_seen_at) index and drops the single-column one", () => {
  const db = openMemorySqliteAdapter();
  try {
    assert.equal(runMigrations(db, { isNewDb: true }), 6);
    const names = conversationIndexes(db);
    assert.ok(names.includes(NEW_INDEX), `missing index: ${names}`);
    assert.ok(
      !names.includes("idx_agentic_conversations_fingerprint"),
      `redundant single-column index still present: ${names}`
    );
    assert.equal(runMigrations(db, { isNewDb: true }), 0, "second run is a no-op");
  } finally {
    db.close();
  }
});

test("the recent-by-fingerprint lookup reads the bucket in index order without a sort", () => {
  const db = openMemorySqliteAdapter();
  try {
    runMigrations(db, { isNewDb: true });
    seed(db);
    const details = plan(db, RECENT_BY_FINGERPRINT_SQL, ["fp3"]);
    assert.ok(
      details.some((detail) => detail.includes(NEW_INDEX) && detail.includes("fingerprint_hash=?")),
      `expected a ${NEW_INDEX} search, got: ${JSON.stringify(details)}`
    );
    assert.equal(tempSorts(details), 0, `bucket is still sorted: ${JSON.stringify(details)}`);

    const rows = db.prepare(RECENT_BY_FINGERPRINT_SQL).all("fp3") as Array<{ id: string }>;
    const newest = Array.from({ length: 20 }, (_, k) => `c${(PER_BUCKET - 1 - k) * BUCKETS + 3}`);
    assert.deepEqual(
      rows.map((row) => row.id),
      newest
    );
  } finally {
    db.close();
  }
});

test("the content-candidate bucket subquery uses the index; only the hits ordering sorts", () => {
  const db = openMemorySqliteAdapter();
  try {
    runMigrations(db, { isNewDb: true });
    seed(db);
    const probes = [
      `hash${(PER_BUCKET - 1) * BUCKETS + 3}`,
      `hash${(PER_BUCKET - 2) * BUCKETS + 3}`,
    ];
    const params = [...probes, "fp3", 500, 20];
    const details = plan(db, contentCandidatesSql(probes.length), params);
    assert.ok(
      details.some((detail) => detail.includes(NEW_INDEX) && detail.includes("fingerprint_hash=?")),
      `expected a ${NEW_INDEX} search, got: ${JSON.stringify(details)}`
    );
    // The outer ORDER BY hits DESC, last_seen_at DESC needs one sort; the bucket must not.
    assert.equal(
      tempSorts(details),
      1,
      `bucket subquery is still sorted: ${JSON.stringify(details)}`
    );

    const rows = db.prepare(contentCandidatesSql(probes.length)).all(...params) as Array<{
      id: string;
      hits: number;
    }>;
    assert.deepEqual(
      rows.map((row) => [row.id, row.hits]),
      [
        [`c${(PER_BUCKET - 1) * BUCKETS + 3}`, 1],
        [`c${(PER_BUCKET - 2) * BUCKETS + 3}`, 1],
      ]
    );
  } finally {
    db.close();
  }
});
