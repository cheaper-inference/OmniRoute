// RENAMED_MIGRATION_COMPATIBILITY must not depend on the order of its entries.
//
// reconcileRenumberedMigrations() used to walk the entries once, in array order, and stop the
// boot when an entry's target slot held another migration's row, even when a later entry was
// about to move that row away. A database that ran old PR builds (for example 228 holding
// usage_history_calculated_cost and 237 holding call_logs_pending_detail_index) could then never
// boot. Converting the open NNN_ pull requests to timestamps adds more entries that empty
// 237–239, so the order had to stop mattering.
//
// These tests pin both halves of the fix:
// - a blocked entry waits for the entry that empties its slot (real entries and synthetic chains),
//   and every ledger that now finishes ends exactly where the entries say each row belongs;
// - nothing else changes. For every one- and two-row ledger built from the real entries where the
//   old single pass did not throw, the new result is identical to it (differential test against
//   the old algorithm). Where a real conflict remains (a slot held by a row no entry moves, or a
//   swap), the boot still stops with exactly the error the old pass gave.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import Database from "better-sqlite3";

import { RENAMED_MIGRATION_COMPATIBILITY } from "../../../src/lib/db/migrationRunner/constants.ts";
import {
  isCompatibilitySourceEligible,
  reconcileRenumberedMigrations,
} from "../../../src/lib/db/migrationRunner/schemaState.ts";

type Entry = { fromVersion: string; fromName: string; toVersion: string; toName: string };
type Row = { version: string; name: string };
type MigrationFile = { version: string; name: string; path: string };

const MIGRATIONS_DIR =
  process.env.OMNIROUTE_TEST_MIGRATIONS_SOURCE_DIR ||
  path.join(process.cwd(), "src", "lib", "db", "migrations");

function realFiles(): MigrationFile[] {
  return fs
    .readdirSync(MIGRATIONS_DIR)
    .map((file) => /^(\d+)_(.+)\.sql$/.exec(file))
    .filter((match): match is RegExpExecArray => match !== null)
    .map((match) => ({
      version: match[1],
      name: match[2],
      path: path.join(MIGRATIONS_DIR, match[0]),
    }));
}

function syntheticFiles(names: string[]): MigrationFile[] {
  return names.map((file) => {
    const [version, ...rest] = file.split("_");
    return { version, name: rest.join("_"), path: `/synthetic/${file}.sql` };
  });
}

function ledger(rows: Row[]): Database.Database {
  const db = new Database(":memory:");
  db.exec(`
    CREATE TABLE _omniroute_migrations (
      version TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  const insert = db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)");
  for (const row of rows) insert.run(row.version, row.name);
  return db;
}

function rowsOf(db: Database.Database): Row[] {
  return db
    .prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version, name")
    .all() as Row[];
}

// The single pass in array order that reconcileRenumberedMigrations() ran before this fix, kept
// here only as the oracle of the differential test. It uses the current eligibility rule, so the
// two implementations differ in nothing but the order handling.
function oneArrayOrderPass(
  db: Database.Database,
  files: MigrationFile[],
  entries: ReadonlyArray<Entry>
): boolean {
  let repaired = false;
  for (const compatibility of entries) {
    const hasTargetFile = files.some(
      (file) => file.version === compatibility.toVersion && file.name === compatibility.toName
    );
    const hasSourceFile = isCompatibilitySourceEligible(files, compatibility);
    if (!hasTargetFile || !hasSourceFile) continue;

    const legacyRow = db
      .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ? AND name = ?")
      .get(compatibility.fromVersion, compatibility.fromName) as Row | undefined;
    if (!legacyRow) continue;

    const targetRow = db
      .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ?")
      .get(compatibility.toVersion) as Row | undefined;
    const isSameSlotReplacement = compatibility.fromVersion === compatibility.toVersion;
    if (targetRow && !isSameSlotReplacement && targetRow.name !== compatibility.toName) {
      throw new Error(
        `[Migration] Cannot reconcile ${compatibility.fromVersion}_${compatibility.fromName}: ` +
          `target version ${compatibility.toVersion} is occupied by unknown migration ` +
          `"${targetRow.name}" (expected "${compatibility.toName}").`
      );
    }
    db.transaction(() => {
      if (targetRow) {
        db.prepare("DELETE FROM _omniroute_migrations WHERE version = ? AND name = ?").run(
          compatibility.fromVersion,
          compatibility.fromName
        );
      } else {
        db.prepare(
          "UPDATE _omniroute_migrations SET version = ?, name = ? WHERE version = ? AND name = ?"
        ).run(
          compatibility.toVersion,
          compatibility.toName,
          compatibility.fromVersion,
          compatibility.fromName
        );
      }
    })();
    repaired = true;
    const residualRow = db
      .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ?")
      .get(compatibility.fromVersion) as Row | undefined;
    if (residualRow) {
      db.prepare("DELETE FROM _omniroute_migrations WHERE version = ?").run(
        compatibility.fromVersion
      );
    }
  }
  return repaired;
}

function outcome(run: () => boolean): { repaired?: boolean; error?: string } {
  try {
    return { repaired: run() };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

test("real entries: 228 usage_history_calculated_cost waits until 237 call_logs_pending_detail_index moves to 239", () => {
  const db = ledger([
    { version: "228", name: "usage_history_calculated_cost" },
    { version: "237", name: "call_logs_pending_detail_index" },
  ]);
  try {
    // The runner's own default list (no third argument): the order of the real constant.
    assert.equal(reconcileRenumberedMigrations(db, realFiles()), true);
    assert.deepEqual(rowsOf(db), [
      { version: "237", name: "usage_history_calculated_cost" },
      { version: "239", name: "call_logs_pending_detail_index" },
    ]);
  } finally {
    db.close();
  }
});

test("real entries: 228 usage_history_calculated_cost waits until 237 codex_connection_fences moves to 238", () => {
  const db = ledger([
    { version: "228", name: "usage_history_calculated_cost" },
    { version: "237", name: "codex_connection_fences" },
  ]);
  try {
    reconcileRenumberedMigrations(db, realFiles());
    assert.deepEqual(rowsOf(db), [
      { version: "237", name: "usage_history_calculated_cost" },
      { version: "238", name: "codex_connection_fences" },
    ]);
  } finally {
    db.close();
  }
});

test(
  "a chain of blocked entries resolves whatever their order (A waits for B, B waits for C)",
  { timeout: 10_000 },
  () => {
    const entries: Entry[] = [
      { fromVersion: "201", fromName: "a", toVersion: "202", toName: "a" },
      { fromVersion: "202", fromName: "b", toVersion: "203", toName: "b" },
      { fromVersion: "203", fromName: "c", toVersion: "204", toName: "c" },
    ];
    const files = syntheticFiles(["201_x", "202_a", "203_b", "204_c"]);
    const db = ledger([
      { version: "201", name: "a" },
      { version: "202", name: "b" },
      { version: "203", name: "c" },
    ]);
    try {
      const result = reconcileRenumberedMigrations(db, files, entries);
      assert.equal(result, true);
      assert.deepEqual(rowsOf(db), [
        { version: "202", name: "a" },
        { version: "203", name: "b" },
        { version: "204", name: "c" },
      ]);
    } finally {
      db.close();
    }
  }
);

test(
  "two entries that swap slots still stop the boot with the old message",
  { timeout: 10_000 },
  () => {
    const entries: Entry[] = [
      { fromVersion: "201", fromName: "a", toVersion: "202", toName: "a" },
      { fromVersion: "202", fromName: "b", toVersion: "201", toName: "b" },
    ];
    const files = syntheticFiles(["201_b", "202_a"]);
    const rows = [
      { version: "201", name: "a" },
      { version: "202", name: "b" },
    ];
    const oldDb = ledger(rows);
    const newDb = ledger(rows);
    try {
      const before = outcome(() => oneArrayOrderPass(oldDb, files, entries));
      const after = outcome(() => reconcileRenumberedMigrations(newDb, files, entries));
      assert.equal(
        before.error,
        '[Migration] Cannot reconcile 201_a: target version 202 is occupied by unknown migration "b" (expected "a").'
      );
      assert.equal(after.error, before.error);
      assert.deepEqual(rowsOf(newDb), rows, "a swap must leave the ledger untouched");
    } finally {
      oldDb.close();
      newDb.close();
    }
  }
);

test(
  "a slot held by a row no entry moves still stops the boot at once, before any later entry runs",
  { timeout: 10_000 },
  () => {
    const entries: Entry[] = [
      { fromVersion: "201", fromName: "a", toVersion: "202", toName: "a" },
      { fromVersion: "205", fromName: "d", toVersion: "206", toName: "d" },
    ];
    const files = syntheticFiles(["201_x", "202_a", "205_y", "206_d"]);
    const rows = [
      { version: "201", name: "a" },
      { version: "202", name: "unknown_feature" },
      { version: "205", name: "d" },
    ];
    const oldDb = ledger(rows);
    const newDb = ledger(rows);
    try {
      const before = outcome(() => oneArrayOrderPass(oldDb, files, entries));
      const after = outcome(() => reconcileRenumberedMigrations(newDb, files, entries));
      assert.match(
        String(before.error),
        /target version 202 is occupied by unknown migration "unknown_feature"/
      );
      assert.equal(after.error, before.error);
      assert.deepEqual(
        rowsOf(newDb),
        rowsOf(oldDb),
        "205_d must not move: the old pass stopped first"
      );
    } finally {
      oldDb.close();
      newDb.close();
    }
  }
);

test(
  "real entries, three rows: when the entry that would empty the slot is stuck itself, the boot stops with the old error",
  { timeout: 30_000 },
  () => {
    // 236 usage_history_calculated_cost waits for 237 call_logs_pending_detail_index to move to 239,
    // but 239 holds a row no entry moves. The old pass stopped at 236; so must the new one, with the
    // same message, and without touching the ledger.
    const rows = [
      { version: "236", name: "usage_history_calculated_cost" },
      { version: "237", name: "call_logs_pending_detail_index" },
      { version: "239", name: "some_unknown_feature" },
    ];
    const files = realFiles();
    const oldDb = ledger(rows);
    const newDb = ledger(rows);
    try {
      const before = outcome(() =>
        oneArrayOrderPass(oldDb, files, RENAMED_MIGRATION_COMPATIBILITY as ReadonlyArray<Entry>)
      );
      const after = outcome(() => reconcileRenumberedMigrations(newDb, files));
      assert.equal(
        before.error,
        '[Migration] Cannot reconcile 236_usage_history_calculated_cost: target version 237 is occupied by unknown migration "call_logs_pending_detail_index" (expected "usage_history_calculated_cost").'
      );
      assert.equal(after.error, before.error);
      assert.deepEqual(rowsOf(newDb), rows, "nothing may move before the boot stops");
    } finally {
      oldDb.close();
      newDb.close();
    }
  }
);

test("every RENAMED_MIGRATION_COMPATIBILITY source (fromVersion, fromName) appears once", () => {
  // Order independence relies on it: two entries with the same source would race for one row,
  // and the first one in the array would win.
  const seen = new Map<string, number>();
  RENAMED_MIGRATION_COMPATIBILITY.forEach((entry, index) => {
    const key = `${entry.fromVersion}_${entry.fromName}`;
    assert.ok(!seen.has(key), `entries ${seen.get(key)} and ${index} share the source ${key}`);
    seen.set(key, index);
  });
});

test("differential: every one- and two-row ledger from the real entries matches the old single pass whenever it did not throw", () => {
  const files = realFiles();
  const entries = RENAMED_MIGRATION_COMPATIBILITY as ReadonlyArray<Entry>;
  const candidates = new Map<string, Row>();
  for (const entry of entries) {
    candidates.set(`${entry.fromVersion}\t${entry.fromName}`, {
      version: entry.fromVersion,
      name: entry.fromName,
    });
    candidates.set(`${entry.toVersion}\t${entry.toName}`, {
      version: entry.toVersion,
      name: entry.toName,
    });
  }
  const rows = [...candidates.values()];

  // An entry only reads and writes ledger rows at its fromVersion and toVersion. The slots a row
  // can reach are its own version plus every toVersion along the entries that move it (and
  // whatever they move it into). Two rows whose reachable slots are disjoint are reconciled
  // independently, so their pair says nothing a one-row ledger does not; only pairs that share a
  // slot are run. That keeps the test fast without leaving out any pair that can interact.
  const reachable = (start: Row): Set<string> => {
    const slots = new Set<string>([start.version]);
    const queue = [start];
    const seen = new Set<string>([`${start.version}\t${start.name}`]);
    while (queue.length > 0) {
      const row = queue.shift() as Row;
      for (const entry of entries) {
        if (entry.fromVersion !== row.version || entry.fromName !== row.name) continue;
        slots.add(entry.toVersion);
        const key = `${entry.toVersion}\t${entry.toName}`;
        if (!seen.has(key)) {
          seen.add(key);
          queue.push({ version: entry.toVersion, name: entry.toName });
        }
      }
    }
    return slots;
  };
  const slotsOf = rows.map(reachable);
  const states: Row[][] = rows.map((row) => [row]);
  let independentPairs = 0;
  for (let i = 0; i < rows.length; i += 1) {
    for (let j = i + 1; j < rows.length; j += 1) {
      if (rows[i].version === rows[j].version) continue;
      const shareASlot = [...slotsOf[i]].some((slot) => slotsOf[j].has(slot));
      if (shareASlot) states.push([rows[i], rows[j]]);
      else independentPairs += 1;
    }
  }

  // Rows only ever live in the slots their entries can reach, so an entry whose fromVersion and
  // toVersion are both outside those slots finds nothing to move. Both implementations get the
  // same order-preserving subset: the result is the one the full list gives, without ~107
  // statements per run.
  const slotsByRow = new Map(
    rows.map((row, index) => [`${row.version}\t${row.name}`, slotsOf[index]])
  );
  let identical = 0;
  let sameError = 0;
  let resolvedNow = 0;
  const resolved: Array<{ state: Row[]; slots: Set<string>; relevant: Entry[] }> = [];
  for (const state of states) {
    const slots = new Set<string>();
    for (const row of state) {
      for (const slot of slotsByRow.get(`${row.version}\t${row.name}`) ?? []) slots.add(slot);
    }
    const relevant = entries.filter(
      (entry) => slots.has(entry.fromVersion) || slots.has(entry.toVersion)
    );
    const oldDb = ledger(state);
    const newDb = ledger(state);
    try {
      const before = outcome(() => oneArrayOrderPass(oldDb, files, relevant));
      if (states.indexOf(state) % 10 === 0) {
        // Spot check of the subset argument: the full list gives the same outcome and ledger.
        const fullDb = ledger(state);
        try {
          const full = outcome(() => oneArrayOrderPass(fullDb, files, entries));
          assert.deepEqual(full, before, `subset changed the outcome: ${JSON.stringify(state)}`);
          assert.deepEqual(
            rowsOf(fullDb),
            rowsOf(oldDb),
            `subset changed the ledger: ${JSON.stringify(state)}`
          );
        } finally {
          fullDb.close();
        }
      }
      const after = outcome(() => reconcileRenumberedMigrations(newDb, files, relevant));
      const label = JSON.stringify(state);
      if (before.error === undefined) {
        assert.equal(after.error, undefined, `new run threw where the old pass did not: ${label}`);
        assert.equal(after.repaired, before.repaired, `repaired flag differs: ${label}`);
        assert.deepEqual(rowsOf(newDb), rowsOf(oldDb), `ledger differs: ${label}`);
        identical += 1;
      } else if (after.error !== undefined) {
        assert.equal(
          after.error,
          before.error,
          `a still-blocked state changed its message: ${label}`
        );
        sameError += 1;
      } else {
        // The old pass stopped the boot and the new run finished. Check the result against the
        // entries themselves, not against the algorithm: every row an eligible entry moves ends
        // at that entry's target (dropped if the target already holds the same name), every
        // other row stays put, and a second run changes nothing.
        const eligibleNow = relevant.filter(
          (entry) =>
            files.some((f) => f.version === entry.toVersion && f.name === entry.toName) &&
            isCompatibilitySourceEligible(files, entry)
        );
        const expected = new Map<string, Row>();
        for (const row of state) {
          const mover = eligibleNow.find(
            (entry) => entry.fromVersion === row.version && entry.fromName === row.name
          );
          const target = mover ? { version: mover.toVersion, name: mover.toName } : row;
          const already = expected.get(target.version);
          assert.ok(
            !already || already.name === target.name,
            `two rows claim slot ${target.version}: ${label}`
          );
          expected.set(target.version, target);
        }
        const settled = rowsOf(newDb);
        assert.deepEqual(
          settled,
          [...expected.values()].sort((a, b) =>
            a.version === b.version ? a.name.localeCompare(b.name) : a.version < b.version ? -1 : 1
          ),
          `a resolved ledger is not where the entries put it: ${label}`
        );
        reconcileRenumberedMigrations(newDb, files, relevant);
        assert.deepEqual(rowsOf(newDb), settled, `a second run changed the ledger: ${label}`);
        resolved.push({ state, slots, relevant });
        resolvedNow += 1;
      }
    } finally {
      oldDb.close();
      newDb.close();
    }
  }
  // The still-blocked branch: each pair that now resolves, plus a row no entry moves in one of
  // the slots it reaches. The old pass stopped; the new run must stop with exactly its error.
  let stillBlocked = 0;
  for (const { state, slots, relevant } of resolved) {
    for (const slot of slots) {
      if (state.some((row) => row.version === slot)) continue;
      const blocked = [...state, { version: slot, name: "unknown_feature" }];
      const oldDb = ledger(blocked);
      const newDb = ledger(blocked);
      try {
        const before = outcome(() => oneArrayOrderPass(oldDb, files, relevant));
        const after = outcome(() => reconcileRenumberedMigrations(newDb, files, relevant));
        const label = JSON.stringify(blocked);
        if (before.error === undefined) {
          assert.equal(
            after.error,
            undefined,
            `new run threw where the old pass did not: ${label}`
          );
          assert.deepEqual(rowsOf(newDb), rowsOf(oldDb), `ledger differs: ${label}`);
          continue;
        }
        if (after.error !== undefined) {
          assert.equal(
            after.error,
            before.error,
            `a still-blocked state changed its error: ${label}`
          );
          stillBlocked += 1;
        }
      } finally {
        oldDb.close();
        newDb.close();
      }
    }
  }
  assert.ok(stillBlocked > 0, "the still-blocked branch must actually run");

  assert.ok(rows.length > 100, `expected the real entries to give many rows, got ${rows.length}`);
  assert.ok(
    states.length > rows.length + 100,
    `expected many interacting pairs, got ${states.length - rows.length}`
  );
  assert.ok(resolvedNow > 0, "the real entries contain blocked pairs that now resolve");
  console.log(
    `[reconcile-order differential] rows=${rows.length} states=${states.length} ` +
      `(independent pairs skipped=${independentPairs}) identical=${identical} ` +
      `sameError=${sameError} resolvedNow=${resolvedNow} stillBlocked=${stillBlocked}`
  );
});
