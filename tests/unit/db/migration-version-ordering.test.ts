/**
 * Migration version ordering (Phase 3 — timestamped migrations).
 *
 * New migrations are named `YYYYMMDDHHMMSS_description.sql` (UTC, 14 digits) while
 * the legacy set stays `NNN_description.sql` (frozen at 239). Plain text order puts
 * `20261113120000` BEFORE `235`, so every place that orders versions must compare
 * the prefix by numeric value. This file pins:
 *
 *   1. the comparator itself (legacy < timestamp, arbitrary precision, `ee-` after
 *      the main set, anything else last, deterministic ties);
 *   2. that the new order does NOT move any existing migration: for the real
 *      `src/lib/db/migrations` directory the runner's order is identical, file by
 *      file, to the previous `readdirSync().sort()` text order.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const REAL_MIGRATIONS_DIR = path.join(REPO_ROOT, "src", "lib", "db", "migrations");

// The runner resolves its directory once at module load. This file wants the real one.
delete process.env.OMNIROUTE_MIGRATIONS_DIR;
delete process.env.OMNIROUTE_EXTRA_MIGRATIONS_DIRS;

const ordering = await import("../../../src/lib/db/migrationRunner/ordering.ts");
const runner = await import("../../../src/lib/db/migrationRunner.ts");

const { compareMigrationVersions, compareMigrationFiles, compareDigitStrings } = ordering;

function sorted(versions: string[]): string[] {
  return [...versions].sort(compareMigrationVersions);
}

test("legacy three-digit versions sort before every timestamped version", () => {
  assert.deepEqual(sorted(["20261113120000", "235", "001", "239", "20261113115959"]), [
    "001",
    "235",
    "239",
    "20261113115959",
    "20261113120000",
  ]);
  assert.ok(compareMigrationVersions("239", "20261113120000") < 0);
  assert.ok(compareMigrationVersions("20261113120000", "239") > 0);
});

test("three-digit versions keep their numeric (== text) order", () => {
  const legacy = ["010", "002", "099", "100", "001", "239", "121", "026"];
  assert.deepEqual(sorted(legacy), [...legacy].sort());
});

test("14-digit timestamps sort by value across days, months and years", () => {
  assert.deepEqual(
    sorted(["20270101000000", "20261231235959", "20261113120001", "20261113120000"]),
    ["20261113120000", "20261113120001", "20261231235959", "20270101000000"]
  );
});

test("values beyond Number.MAX_SAFE_INTEGER are compared exactly", () => {
  // Both parse to the same IEEE-754 double; a Number-based comparator would tie.
  const a = "9007199254740993";
  const b = "9007199254740992";
  assert.equal(Number(a), Number(b));
  assert.ok(compareMigrationVersions(b, a) < 0);
  assert.ok(compareMigrationVersions(a, b) > 0);
  assert.ok(compareDigitStrings("123456789012345678901234567890", "99999999999999999999") > 0);
});

test("namespaced versions compare numerically inside their namespace", () => {
  assert.deepEqual(sorted(["ee-10", "ee-2", "ee-001", "ee-134"]), [
    "ee-001",
    "ee-2",
    "ee-10",
    "ee-134",
  ]);
  assert.ok(compareMigrationVersions("ee-2", "ee-10") < 0);
});

test("namespaced versions come after every main-set version, then by namespace", () => {
  assert.deepEqual(sorted(["ee-001", "20991231235959", "zz-1", "001", "ab-500", "239"]), [
    "001",
    "239",
    "20991231235959",
    "ab-500",
    "ee-001",
    "zz-1",
  ]);
});

test("any other ledger value (legacy-*, malformed) sorts last by plain string order", () => {
  assert.deepEqual(
    sorted(["legacy-081-inspector_custom_hosts", "ee-1", "legacy-074-discovery_results", "999"]),
    ["999", "ee-1", "legacy-074-discovery_results", "legacy-081-inspector_custom_hosts"]
  );
  assert.deepEqual(sorted(["", "Ee-1", "ee-1", "1"]), ["1", "ee-1", "", "Ee-1"]);
});

test("equal values written differently tie-break deterministically on the raw string", () => {
  assert.ok(compareMigrationVersions("001", "1") < 0);
  assert.ok(compareMigrationVersions("1", "001") > 0);
  assert.equal(compareMigrationVersions("001", "001"), 0);
  assert.ok(compareMigrationVersions("ee-01", "ee-1") < 0);
  // Same result whatever the input order.
  assert.deepEqual(sorted(["1", "01", "001"]), sorted(["001", "1", "01"]));
});

test("the comparator is a consistent total order (antisymmetric, transitive)", () => {
  const sample = [
    "001",
    "1",
    "010",
    "239",
    "20261113120000",
    "20261113000000",
    "9007199254740993",
    "ee-1",
    "ee-01",
    "ee-10",
    "aa-3",
    "legacy-074-discovery_results",
    "",
  ];
  for (const a of sample) {
    for (const b of sample) {
      // `+ 0` folds -0 into 0: strict equal uses Object.is.
      assert.equal(
        Math.sign(compareMigrationVersions(a, b)) + 0,
        -Math.sign(compareMigrationVersions(b, a)) + 0,
        `antisymmetry broken for ${JSON.stringify(a)} / ${JSON.stringify(b)}`
      );
      assert.equal(
        compareMigrationVersions(a, b) === 0,
        a === b,
        `only identical strings may tie: ${JSON.stringify(a)} / ${JSON.stringify(b)}`
      );
      for (const c of sample) {
        if (compareMigrationVersions(a, b) < 0 && compareMigrationVersions(b, c) < 0) {
          assert.ok(compareMigrationVersions(a, c) < 0, `transitivity: ${a} < ${b} < ${c}`);
        }
      }
    }
  }
});

test("files sharing a version slot keep the previous file-name order", () => {
  const files = [
    {
      version: "041",
      name: "session_account_affinity",
      path: "/m/041_session_account_affinity.sql",
    },
    { version: "20261113120000", name: "x", path: "/m/20261113120000_x.sql" },
    { version: "041", name: "compression_receipts", path: "/m/041_compression_receipts.sql" },
    { version: "040", name: "z", path: "/m/040_z.sql" },
  ];
  assert.deepEqual(
    [...files].sort(compareMigrationFiles).map((file) => path.basename(file.path)),
    [
      "040_z.sql",
      "041_compression_receipts.sql",
      "041_session_account_affinity.sql",
      "20261113120000_x.sql",
    ]
  );
});

test("the real migrations directory keeps exactly its previous text order", () => {
  const textOrder = fs
    .readdirSync(REAL_MIGRATIONS_DIR)
    .filter((file) => file.endsWith(".sql"))
    .sort()
    .filter((file) => /^(\d+)_(.+)\.sql$/.test(file));
  assert.ok(textOrder.length >= 236, `expected the full legacy set, got ${textOrder.length}`);

  const runnerOrder = runner.getMigrationFiles().map((file) => path.basename(file.path));
  assert.deepEqual(
    runnerOrder,
    textOrder,
    "the numeric ordering must not move any legacy migration: every legacy file has a " +
      "three-digit prefix, so numeric order and text order have to match file by file"
  );
});

test("the legacy set is exactly three digits, so numeric order equals text order", () => {
  const legacy = fs
    .readdirSync(REAL_MIGRATIONS_DIR)
    .filter((file) => file.endsWith(".sql"))
    .map((file) => /^(\d+)_/.exec(file)?.[1])
    .filter((prefix): prefix is string => prefix !== undefined && prefix.length < 14);
  for (const prefix of legacy) {
    assert.equal(prefix.length, 3, `legacy prefix ${prefix} is not three digits`);
  }
  assert.deepEqual([...legacy].sort(compareMigrationVersions), [...legacy].sort());
});

test("compareMigrationFiles orders a mixed legacy/timestamp listing numerically", () => {
  const listing = ["20261113120000_b.sql", "235_a.sql", "001_init.sql", "20261112000000_c.sql"];
  const parsed = listing.map((file) => {
    const match = /^(\d+)_(.+)\.sql$/.exec(file)!;
    return { version: match[1], name: match[2], path: `/m/${file}` };
  });
  assert.deepEqual(
    parsed.sort(compareMigrationFiles).map((file) => path.basename(file.path)),
    ["001_init.sql", "235_a.sql", "20261112000000_c.sql", "20261113120000_b.sql"]
  );
});
