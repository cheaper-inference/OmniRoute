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
 *      `src/lib/db/migrations` directory the runner lists the three-digit legacy
 *      files exactly in the previous `readdirSync().sort()` text order, then every
 *      timestamped file after them in numeric order;
 *   3. a guard that re-runs the runner, ordering and fresh-database test files against
 *      a copy of the directory with one real-looking timestamped migration added, so
 *      their assertions cannot silently depend on there being no real one yet.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const REAL_MIGRATIONS_DIR =
  process.env.OMNIROUTE_TEST_MIGRATIONS_SOURCE_DIR ||
  path.join(REPO_ROOT, "src", "lib", "db", "migrations");

// The runner resolves its directory once at module load. This file wants the real one.
if (process.env.OMNIROUTE_TEST_MIGRATIONS_SOURCE_DIR) {
  process.env.OMNIROUTE_MIGRATIONS_DIR = REAL_MIGRATIONS_DIR;
} else {
  delete process.env.OMNIROUTE_MIGRATIONS_DIR;
}
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

test('a NULL/undefined ledger version is coerced to "" and still ordered consistently', () => {
  // `version` is TEXT without NOT NULL; a row written without it reaches the comparator as
  // null. It must order exactly like "" (group 2, plain string order), never ambiguously.
  const nil = null as unknown as string;
  const undef = undefined as unknown as string;
  for (const other of ["legacy-074-discovery_results", "239", "ee-1", "", "20261113120000"]) {
    for (const missing of [nil, undef]) {
      assert.equal(
        Math.sign(compareMigrationVersions(missing, other)) + 0,
        Math.sign(compareMigrationVersions("", other)) + 0,
        `${String(missing)} vs ${other} must compare like ""`
      );
      assert.equal(
        Math.sign(compareMigrationVersions(missing, other)) + 0,
        -Math.sign(compareMigrationVersions(other, missing)) + 0,
        `antisymmetry broken for ${String(missing)} / ${other}`
      );
    }
  }
  assert.deepEqual(sorted(["legacy-x", nil, "239", "ee-1"]), ["239", "ee-1", nil, "legacy-x"]);
});

test("isTimestampVersion accepts exactly fourteen digits", () => {
  assert.equal(ordering.isTimestampVersion("20261113120000"), true);
  for (const value of ["239", "2026111312000", "202611131200000", "ee-20261113120000", ""]) {
    assert.equal(ordering.isTimestampVersion(value), false, value);
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

test("the real migrations directory keeps its legacy text order, timestamps after it", () => {
  const migrationFiles = fs
    .readdirSync(REAL_MIGRATIONS_DIR)
    .filter((file) => file.endsWith(".sql"))
    .sort()
    .filter((file) => /^(\d+)_(.+)\.sql$/.test(file));
  const legacyTextOrder = migrationFiles.filter((file) => /^\d{3}_/.test(file));
  // Same-length digit prefixes: text order IS numeric order among the timestamped files.
  const timestampTextOrder = migrationFiles.filter((file) => /^\d{14}_/.test(file));
  assert.ok(
    legacyTextOrder.length >= 236,
    `expected the full legacy set, got ${legacyTextOrder.length}`
  );
  assert.equal(
    legacyTextOrder.length + timestampTextOrder.length,
    migrationFiles.length,
    "every migration prefix is either three digits (legacy) or fourteen (timestamp)"
  );

  const runnerOrder = runner.getMigrationFiles().map((file) => path.basename(file.path));
  assert.deepEqual(
    runnerOrder.filter((file) => /^\d{3}_/.test(file)),
    legacyTextOrder,
    "the numeric ordering must not move any legacy migration: every legacy file has a " +
      "three-digit prefix, so numeric order and text order have to match file by file"
  );
  assert.deepEqual(
    runnerOrder,
    [...legacyTextOrder, ...timestampTextOrder],
    "every timestamped migration comes after the whole legacy set, in numeric order"
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

// ── guard: the properties above must survive the first REAL timestamped migration ──────────

const GUARDED_TEST_FILES = [
  "tests/unit/check-migration-numbering.test.ts",
  "tests/unit/db/migration-timestamp-runner.test.ts",
  "tests/unit/db/migration-version-ordering.test.ts",
  "tests/unit/db/migrations-fresh-database.test.ts",
];

function utcStamp(date: Date): string {
  return date.toISOString().replace(/[-:T]/g, "").slice(0, 14);
}

test(
  "guard: the runner, ordering and fresh-database tests stay green with a real timestamped migration",
  {
    // Inside the guard's own child run this file is one of the guarded files.
    skip: process.env.OMNIROUTE_TEST_MIGRATIONS_SOURCE_DIR ? "running inside the guard" : false,
    timeout: 600_000,
  },
  () => {
    // Copy the real directory and add one migration dated like a real one would be (a minute
    // ago), then run the three guarded files against that copy. Their assertions must hold
    // for whatever real timestamped migrations exist, not only for an empty timestamped set.
    const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), "mig-real-ts-guard-"));
    try {
      const source = path.join(sandbox, "migrations");
      fs.cpSync(REAL_MIGRATIONS_DIR, source, { recursive: true });
      let when = Date.now() - 60_000;
      const taken = () =>
        fs.readdirSync(source).some((file) => file.startsWith(utcStamp(new Date(when))));
      while (taken()) when -= 1000;
      const injected = `${utcStamp(new Date(when))}_guard_real_timestamped.sql`;
      fs.writeFileSync(
        path.join(source, injected),
        "CREATE TABLE IF NOT EXISTS guard_real_timestamped (id INTEGER PRIMARY KEY);\n"
      );

      const env: NodeJS.ProcessEnv = {
        ...process.env,
        OMNIROUTE_TEST_MIGRATIONS_SOURCE_DIR: source,
        DISABLE_SQLITE_AUTO_BACKUP: "true",
      };
      // A nested runner needs its own test context; each child picks its own DATA_DIR.
      delete env.NODE_TEST_CONTEXT;
      delete env.DATA_DIR;
      delete env.OMNIROUTE_MIGRATIONS_DIR;
      delete env.OMNIROUTE_EXTRA_MIGRATIONS_DIRS;

      // The nested runner's own stdout pipe can lose its tail under --test-force-exit
      // (see tests/unit/test-force-exit-report-flush.test.ts), so the report goes to a file.
      const reportPath = path.join(sandbox, "report.tap");
      const fd = fs.openSync(reportPath, "w");
      let result;
      try {
        result = spawnSync(
          process.execPath,
          [
            "--max-old-space-size=8192",
            "--import",
            "tsx/esm",
            "--import",
            "./open-sse/utils/setupPolyfill.ts",
            "--import",
            "./tests/_setup/isolateDataDir.ts",
            "--test",
            "--test-force-exit",
            "--test-concurrency=3",
            "--test-reporter=tap",
            ...GUARDED_TEST_FILES,
          ],
          {
            cwd: REPO_ROOT,
            env,
            encoding: "utf8",
            stdio: ["ignore", fd, "pipe"],
            timeout: 540_000,
          }
        );
      } finally {
        fs.closeSync(fd);
      }
      const report = fs.readFileSync(reportPath, "utf8");
      const count = (name: string) =>
        Number(new RegExp(`^# ${name} (\\d+)$`, "m").exec(report)?.[1]);
      const failures = report
        .split("\n")
        .filter((line) => /^\s*not ok \d+/.test(line))
        .join("\n");
      assert.equal(
        result.status,
        0,
        `guarded tests failed with ${injected} in the directory:\n${failures}\n${result.stderr}`
      );
      assert.equal(count("fail"), 0, failures);
      assert.ok(count("pass") >= 20, `expected the guarded tests to run, got ${count("pass")}`);
    } finally {
      fs.rmSync(sandbox, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  }
);
