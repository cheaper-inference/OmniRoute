// ENVIRONMENT NOTE (sandbox better-sqlite3 / glibc limitation, not a code defect):
// The script under test boots a real SQLite database through `src/lib/db/core.ts` in child
// processes. See tests/unit/_helpers/betterSqlite3Availability.ts if the native addon fails.
/**
 * scripts/check/migration-commutation.ts — "do the PR's migrations commute with the base?"
 *
 * The script is run as a process, exactly as the gate calls it, against SMALL synthetic
 * migration directories (the real install path accepts a directory holding only them: the
 * inline schema and the `001` seed come from core.ts). Each scenario writes a base directory
 * and a head directory (base + the PR's migrations, some dated before the newest base one).
 *
 * Isolation: the script process gets a sentinel DATA_DIR, a fake HOME and its own TMPDIR,
 * all under one temporary root. After every run the sentinel and the fake HOME must still be
 * empty (the boots never use the caller's DATA_DIR nor ~/.omniroute) and TMPDIR must hold no
 * leftover of the script's temporary root.
 */
import { describe, test, after } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const SCRIPT = path.join(REPO_ROOT, "scripts", "check", "migration-commutation.ts");
const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-commutation-test-"));

after(() => {
  fs.rmSync(TEST_ROOT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type Migrations = Record<string, string>;
type RunResult = { code: number | null; stdout: string; stderr: string; ms: number };

let scenarioCounter = 0;

function writeDir(dir: string, migrations: Migrations): void {
  fs.mkdirSync(dir, { recursive: true });
  for (const [file, sql] of Object.entries(migrations)) {
    fs.writeFileSync(path.join(dir, file), `${sql.trim()}\n`);
  }
}

/** Writes base/ and head/ (= base + prMigrations) for one scenario and returns their paths. */
function scenario(base: Migrations, prMigrations: Migrations) {
  const dir = path.join(TEST_ROOT, `scenario-${++scenarioCounter}`);
  const baseDir = path.join(dir, "base");
  const headDir = path.join(dir, "head");
  writeDir(baseDir, base);
  writeDir(headDir, { ...base, ...prMigrations });
  return { dir, baseDir, headDir };
}

/** Every entry under `dir`, never following symlinks; `ignore` skips top-level names. */
function listTree(dir: string, ignore: ReadonlySet<string> = new Set()): string[] {
  const entries: string[] = [];
  const walk = (current: string, prefix: string) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (!prefix && ignore.has(entry.name)) continue;
      const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
      entries.push(relative);
      if (entry.isDirectory()) walk(path.join(current, entry.name), relative);
    }
  };
  walk(dir, "");
  return entries.sort();
}

/**
 * tsx keeps its transpile cache in `<tmpdir>/tsx-<uid>`. Linking the caller's cache into the
 * sandbox TMPDIR keeps the runs warm (a cold cache costs ~20 s per boot) and lets the check
 * below ignore that one entry, which belongs to the loader, not to the script.
 */
const TSX_CACHE_NAME = typeof process.getuid === "function" ? `tsx-${process.getuid()}` : null;

/** Runs the script as the gate does and checks that nothing escaped the sandbox. */
async function runScript(args: string[]): Promise<RunResult> {
  const sandbox = fs.mkdtempSync(path.join(TEST_ROOT, "run-"));
  const sentinelDataDir = path.join(sandbox, "caller-data-dir");
  const fakeHome = path.join(sandbox, "home");
  const tmpDir = path.join(sandbox, "tmp");
  for (const dir of [sentinelDataDir, fakeHome, tmpDir]) fs.mkdirSync(dir);
  const ignoredInTmp = new Set<string>();
  if (TSX_CACHE_NAME) {
    const callerCache = path.join(os.tmpdir(), TSX_CACHE_NAME);
    if (fs.existsSync(callerCache)) {
      fs.symlinkSync(callerCache, path.join(tmpDir, TSX_CACHE_NAME), "dir");
      ignoredInTmp.add(TSX_CACHE_NAME);
    }
  }

  const started = Date.now();
  const result = await new Promise<RunResult>((resolve, reject) => {
    const child = spawn(process.execPath, ["--import", "tsx/esm", SCRIPT, ...args], {
      cwd: REPO_ROOT,
      env: {
        ...process.env,
        DATA_DIR: sentinelDataDir,
        HOME: fakeHome,
        USERPROFILE: fakeHome,
        TMPDIR: tmpDir,
        // Must never reach the boots: they build their environment from scratch.
        OMNIROUTE_EXTRA_MIGRATIONS_DIRS: `bogus=${path.join(sandbox, "does-not-exist")}`,
      },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk: Buffer) => (stdout += chunk.toString()));
    child.stderr.on("data", (chunk: Buffer) => (stderr += chunk.toString()));
    child.on("error", reject);
    child.on("close", (code) => resolve({ code, stdout, stderr, ms: Date.now() - started }));
  });

  assert.deepEqual(listTree(sentinelDataDir), [], "the caller's DATA_DIR must stay untouched");
  assert.deepEqual(listTree(fakeHome), [], "HOME (~/.omniroute) must stay untouched");
  assert.deepEqual(listTree(tmpDir, ignoredInTmp), [], "the script must remove its temporary root");
  // Unlink the cache link first so the cleanup never follows it into the caller's cache.
  if (ignoredInTmp.size > 0) fs.unlinkSync(path.join(tmpDir, TSX_CACHE_NAME as string));
  fs.rmSync(sandbox, { recursive: true, force: true });
  console.log(
    `[timing] migration-commutation ${args.join(" ")} → exit ${result.code} in ${result.ms} ms`
  );
  return result;
}

// R3-2 of the adversarial review: C creates the table; B (newer stamp, merged first) rebuilds
// it with a fixed column list; A (older stamp, arrives later) adds a column. Upgraded
// databases keep `d`, fresh installs lose it.
const NON_COMMUTING = {
  base: {
    "20261113100000_create_adv.sql": "CREATE TABLE adv_t(id INTEGER PRIMARY KEY, c INTEGER);",
    "20261113130000_rebuild_adv.sql": `
      CREATE TABLE adv_t_new(id INTEGER PRIMARY KEY, c INTEGER);
      INSERT INTO adv_t_new(id, c) SELECT id, c FROM adv_t;
      DROP TABLE adv_t;
      ALTER TABLE adv_t_new RENAME TO adv_t;`,
  },
  pr: { "20261113120000_add_adv_d.sql": "ALTER TABLE adv_t ADD COLUMN d TEXT;" },
};

describe("migration-commutation", { concurrency: 3 }, () => {
  test("(a) a rebuild merged first drops the older-dated ADD COLUMN → exit 1, diff cites it", async () => {
    const { baseDir, headDir } = scenario(NON_COMMUTING.base, NON_COMMUTING.pr);
    const result = await runScript(["--base-dir", baseDir, "--head-dir", headDir]);
    assert.equal(result.code, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(result.stderr, /tabela adv_t: coluna d \(TEXT\) só existe no caminho atualizado/);
    assert.match(result.stderr, /npm run db:new-migration/);
  });

  test("(b) out-of-order migrations on independent tables commute → exit 0", async () => {
    const { baseDir, headDir } = scenario(
      { "20261113130000_create_b.sql": "CREATE TABLE b_t(id INTEGER PRIMARY KEY, v TEXT);" },
      {
        "20261113120000_create_a.sql": `
          CREATE TABLE a_t(id INTEGER PRIMARY KEY, w TEXT);
          CREATE INDEX idx_a_t_w ON a_t(w);`,
      }
    );
    const result = await runScript(["--base-dir", baseDir, "--head-dir", headDir]);
    assert.equal(result.code, 0, `${result.stdout}\n${result.stderr}`);
    assert.match(result.stdout, /\[migration-commutation\] OK/);
  });

  test("(c) two ADD COLUMN on one table in opposite orders → exit 0 (column order ignored)", async () => {
    const { baseDir, headDir } = scenario(
      {
        "20261113100000_create_t.sql": "CREATE TABLE t(id INTEGER PRIMARY KEY);",
        "20261113130000_add_x.sql": "ALTER TABLE t ADD COLUMN x TEXT;",
      },
      { "20261113120000_add_y.sql": "ALTER TABLE t ADD COLUMN y INTEGER NOT NULL DEFAULT 0;" }
    );
    const result = await runScript(["--base-dir", baseDir, "--head-dir", headDir]);
    assert.equal(result.code, 0, `${result.stdout}\n${result.stderr}`);
  });

  test("(d) an index that exists on one path only → exit 1", async () => {
    // B (base) rebuilds t1, which drops its indexes; A (PR, older stamp) indexes t1. Upgraded:
    // C, B, A → the index exists. Fresh: C, A, B → the rebuild drops it.
    const { baseDir, headDir } = scenario(
      {
        "20261113100000_create_t1.sql": "CREATE TABLE t1(id INTEGER PRIMARY KEY, c INTEGER);",
        "20261113130000_rebuild_t1.sql": `
          CREATE TABLE t1_new(id INTEGER PRIMARY KEY, c INTEGER);
          INSERT INTO t1_new(id, c) SELECT id, c FROM t1;
          DROP TABLE t1;
          ALTER TABLE t1_new RENAME TO t1;`,
      },
      { "20261113120000_index_t1.sql": "CREATE INDEX idx_t1_c ON t1(c) WHERE c IS NOT NULL;" }
    );
    const result = await runScript(["--base-dir", baseDir, "--head-dir", headDir]);
    assert.equal(result.code, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(result.stderr, /índice idx_t1_c \(t1\(c\).*só existe no caminho atualizado/);
  });

  test("(d2) a table constraint that exists on one path only (same columns) → exit 1", async () => {
    // Both create t2 with IF NOT EXISTS; only the PR's older-stamped one declares k UNIQUE and a
    // foreign key. Columns are identical on both paths (UNIQUE/REFERENCES are not part of
    // table_info), so only the constraint comparison can see that the fresh install differs.
    const { baseDir, headDir } = scenario(
      {
        "20261113100000_create_parent.sql": "CREATE TABLE parent(id INTEGER PRIMARY KEY);",
        "20261113130000_create_t2.sql":
          "CREATE TABLE IF NOT EXISTS t2(id INTEGER PRIMARY KEY, k TEXT, p INTEGER);",
      },
      {
        "20261113120000_create_t2_strict.sql":
          "CREATE TABLE IF NOT EXISTS t2(id INTEGER PRIMARY KEY, k TEXT UNIQUE, " +
          "p INTEGER REFERENCES parent(id) ON DELETE CASCADE);",
      }
    );
    const result = await runScript(["--base-dir", baseDir, "--head-dir", headDir, "--json"]);
    assert.equal(result.code, 1, `${result.stdout}\n${result.stderr}`);
    const payload = JSON.parse(result.stdout) as {
      equal: boolean;
      differences: Array<{ kind: string; table?: string; name: string; onlyIn?: string }>;
    };
    assert.equal(payload.equal, false);
    const constraints = payload.differences.filter((d) => d.kind === "constraint");
    assert.deepEqual(
      constraints.map((d) => [d.table, d.name, d.onlyIn]),
      [
        [
          "t2",
          "FOREIGN KEY(p) REFERENCES parent(id) ON UPDATE NO ACTION ON DELETE CASCADE",
          "fresh",
        ],
        ["t2", "UNIQUE(k)", "fresh"],
      ]
    );
    assert.deepEqual(
      payload.differences.filter((d) => d.kind !== "constraint"),
      [],
      "columns and indexes are identical: without the constraint comparison this pair would " +
        "be reported as commuting"
    );
  });

  test("(e) a directory that does not exist → exit 2 with the cause (text and --json)", async () => {
    const { baseDir } = scenario({ "20261113100000_x.sql": "CREATE TABLE x(id INTEGER);" }, {});
    const missing = path.join(TEST_ROOT, "no-such-migrations-dir");

    const text = await runScript(["--base-dir", baseDir, "--head-dir", missing]);
    assert.equal(text.code, 2, `${text.stdout}\n${text.stderr}`);
    assert.match(text.stderr, /erro de infraestrutura: --head-dir não existe/);

    const json = await runScript(["--base-dir", missing, "--head-dir", baseDir, "--json"]);
    assert.equal(json.code, 2, `${json.stdout}\n${json.stderr}`);
    assert.match(JSON.parse(json.stdout).error, /--base-dir não existe/);

    const usage = await runScript(["--base-dir", baseDir]);
    assert.equal(usage.code, 2);
    assert.match(usage.stderr, /uso: migration-commutation\.ts/);
  });

  test("(e2) a boot that fails → exit 2 with the migration error", async () => {
    const { baseDir, headDir } = scenario(
      { "20261113100000_create_t.sql": "CREATE TABLE t(id INTEGER PRIMARY KEY);" },
      { "20261113120000_broken.sql": "ALTER TABLE no_such_table ADD COLUMN z TEXT;" }
    );
    const result = await runScript(["--base-dir", baseDir, "--head-dir", headDir]);
    assert.equal(result.code, 2, `${result.stdout}\n${result.stderr}`);
    assert.match(result.stderr, /boot .* falhou/);
    assert.match(result.stderr, /no_such_table/);
  });

  test("(f) --json prints { equal, differences } in the contract's shape", async () => {
    const { baseDir, headDir } = scenario(NON_COMMUTING.base, NON_COMMUTING.pr);
    const result = await runScript(["--base-dir", baseDir, "--head-dir", headDir, "--json"]);
    assert.equal(result.code, 1, result.stderr);
    const payload = JSON.parse(result.stdout);
    assert.deepEqual(Object.keys(payload).sort(), ["differences", "equal"]);
    assert.equal(payload.equal, false);
    assert.equal(payload.differences.length, 1);
    const [difference] = payload.differences;
    assert.equal(difference.kind, "column");
    assert.equal(difference.table, "adv_t");
    assert.equal(difference.name, "d");
    assert.equal(difference.onlyIn, "upgraded");
    assert.equal(difference.upgraded.type, "TEXT");
    assert.match(difference.message, /coluna d/);
  });
});
