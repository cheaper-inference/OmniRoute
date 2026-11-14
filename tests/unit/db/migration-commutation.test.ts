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

/** Writes base/ and head/ with independent contents (a rename removes a base file). */
function scenarioDirs(base: Migrations, head: Migrations) {
  const dir = path.join(TEST_ROOT, `scenario-${++scenarioCounter}`);
  const baseDir = path.join(dir, "base");
  const headDir = path.join(dir, "head");
  writeDir(baseDir, base);
  writeDir(headDir, head);
  return { dir, baseDir, headDir };
}

const REAL_MIGRATIONS_DIR = path.join(REPO_ROOT, "src", "lib", "db", "migrations");

/**
 * base/ and head/ both start as copies of the real migration set; `renameInBase` maps a real
 * file name to the name it carries in base/ (an older name of the same content), and
 * `dropFromBase` removes files from base/ only.
 */
function realScenario(renameInBase: Record<string, string>, dropFromBase: string[] = []) {
  const dir = path.join(TEST_ROOT, `scenario-${++scenarioCounter}`);
  const baseDir = path.join(dir, "base");
  const headDir = path.join(dir, "head");
  fs.mkdirSync(baseDir, { recursive: true });
  fs.mkdirSync(headDir, { recursive: true });
  const realFiles = fs.readdirSync(REAL_MIGRATIONS_DIR).filter((f) => f.endsWith(".sql"));
  for (const file of [...Object.keys(renameInBase), ...dropFromBase]) {
    assert.ok(realFiles.includes(file), `the real migration set has no ${file}`);
  }
  for (const file of realFiles) {
    fs.copyFileSync(path.join(REAL_MIGRATIONS_DIR, file), path.join(headDir, file));
    if (dropFromBase.includes(file)) continue;
    fs.copyFileSync(
      path.join(REAL_MIGRATIONS_DIR, file),
      path.join(baseDir, renameInBase[file] ?? file)
    );
  }
  return { dir, baseDir, headDir };
}

/** Contract C1 with the gate: a PR migration failed on the upgraded path. */
const C1_PHRASE = "não aplica depois de todas as migrations da base";
/** Contract C2 with the gate: a --must-not-apply file ran again on the upgraded database. */
const C2_PHRASE = "aplicada de novo no banco atualizado";

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
    // The hint is neutral: the gate also runs this check for edited and renamed migrations.
    assert.match(result.stderr, /fora de ordem → dê a ela um carimbo novo/);
    assert.match(result.stderr, /editada → devolva o conteúdo da base/);
    // R3B-3: never "keep the old stamp", which reads as "same stamp, new description", and the
    // runner re-applies a file whose version stays while its name changes.
    assert.match(result.stderr, /renomeada → desfaça a renomeação \(volte ao nome antigo\)/);
    assert.match(result.stderr, /nunca o mesmo carimbo com outro nome/);
    assert.doesNotMatch(result.stderr, /mantenha o carimbo antigo/);
    assert.doesNotMatch(result.stderr, /não aplica em nenhum dos dois caminhos/);
    // The gate prints the case-specific hint; this one must not tell a rename to regenerate.
    assert.doesNotMatch(result.stderr, /regere o nome/);
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

  test("(e2) a PR migration that fails on both paths → exit 1 naming the file and both paths", async () => {
    // Until V1-5 this was reported as an infrastructure error (exit 2), which the gate treats
    // as "did not run" and only warns about outside CI. A PR migration that cannot be applied
    // is a defect of the PR, so it now fails the check like any other divergence.
    const { baseDir, headDir } = scenario(
      { "20261113100000_create_t.sql": "CREATE TABLE t(id INTEGER PRIMARY KEY);" },
      { "20261113120000_broken.sql": "ALTER TABLE no_such_table ADD COLUMN z TEXT;" }
    );
    const result = await runScript(["--base-dir", baseDir, "--head-dir", headDir, "--json"]);
    assert.equal(result.code, 1, `${result.stdout}\n${result.stderr}`);
    const payload = JSON.parse(result.stdout) as {
      equal: boolean;
      differences: Array<{ kind: string; name: string; failedIn?: string; message: string }>;
    };
    assert.equal(payload.equal, false);
    assert.deepEqual(
      payload.differences.map((d) => [d.kind, d.name, d.failedIn]),
      [
        ["migration", "20261113120000_broken.sql", "upgraded"],
        ["migration", "20261113120000_broken.sql", "fresh"],
      ]
    );
    for (const difference of payload.differences) {
      assert.match(difference.message, /no_such_table/);
    }

    // Contract with the gate (check-migration-numbering.mjs): when every difference is a PR
    // migration failing on both paths, the text output carries this exact phrase, and the hint
    // is to fix the SQL, not to regenerate the name.
    const text = await runScript(["--base-dir", baseDir, "--head-dir", headDir]);
    assert.equal(text.code, 1, `${text.stdout}\n${text.stderr}`);
    assert.ok(
      `${text.stdout}\n${text.stderr}`.includes("não aplica em nenhum dos dois caminhos"),
      text.stderr
    );
    assert.match(text.stderr, /corrija o SQL/i);
    assert.doesNotMatch(text.stderr, /regere o nome/);
    // Contract C1: it also fails on the upgraded path.
    assert.ok(text.stderr.includes(C1_PHRASE), text.stderr);
  });

  test("(e3) a base that does not install on its own → still exit 2 (infrastructure)", async () => {
    // The base boot (upgraded 1/2) only runs base migrations: if one of them fails, the PR is
    // not what broke, so this stays an infrastructure error.
    const { baseDir, headDir } = scenario(
      { "20261113100000_broken_base.sql": "ALTER TABLE no_such_table ADD COLUMN z TEXT;" },
      { "20261113120000_create_t.sql": "CREATE TABLE t(id INTEGER PRIMARY KEY);" }
    );
    const result = await runScript(["--base-dir", baseDir, "--head-dir", headDir]);
    assert.equal(result.code, 2, `${result.stdout}\n${result.stderr}`);
    assert.match(result.stderr, /erro de infraestrutura: boot atualizado 1\/2 \(base\)/);
    assert.match(result.stderr, /20261113100000_broken_base\.sql/);
    assert.match(result.stderr, /no_such_table/);
  });

  // V1-5 of the adversarial review: B (base, newer) renames v to val; A (PR, older) indexes v.
  // Upgraded: C, B, A → A fails (no such column: v). Fresh: C, A, B → the rename carries the
  // index along. The pair does not commute; it must not be reported as an infrastructure error.
  test("(i) a PR migration that fails on one path only → exit 1 naming the path and the file", async () => {
    const { baseDir, headDir } = scenario(
      {
        "20261113120000_create_kv.sql": "CREATE TABLE v1_kv(k, v);",
        "20261113180000_rename_v.sql": "ALTER TABLE v1_kv RENAME COLUMN v TO val;",
      },
      { "20261113150000_index_v.sql": "CREATE INDEX idx_v1_kv_v ON v1_kv(v);" }
    );
    const result = await runScript(["--base-dir", baseDir, "--head-dir", headDir]);
    assert.equal(result.code, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(
      result.stderr,
      /migration 20261113150000_index_v\.sql falhou ao ser aplicada no caminho atualizado \(base, depois o PR\): .*no such column: v/
    );
    assert.doesNotMatch(result.stderr, /caminho novo/);
    assert.doesNotMatch(result.stderr, /erro de infraestrutura/);
    assert.doesNotMatch(result.stderr, /não aplica em nenhum dos dois caminhos/);
    // A-R1 of the third review: a new stamp does not help here (the upgraded path already
    // applies the PR migration after the whole base, and a fresh install with a new stamp would
    // do the same), so the hint is to fix the SQL against the base schema (contract C1).
    assert.ok(result.stderr.includes(C1_PHRASE), result.stderr);
    assert.match(result.stderr, /corrija o SQL contra o schema atual da base/);
    assert.match(
      result.stderr,
      /se ela depende de outra migration do PR com carimbo maior, dê a ela um carimbo novo com\s+`?npm run db:new-migration/
    );
    assert.doesNotMatch(result.stderr, /fora de ordem → dê a ela um carimbo novo/);
    assert.doesNotMatch(result.stderr, /dão um schema/);
  });

  // The (i) migration with a stamp after the base: it now fails on both paths, which proves
  // that a new stamp was never the fix for (i).
  test("(i_regen) the (i) migration stamped after the base fails on both paths → exit 1 with C1", async () => {
    const { baseDir, headDir } = scenario(
      {
        "20261113120000_create_kv.sql": "CREATE TABLE v1_kv(k, v);",
        "20261113180000_rename_v.sql": "ALTER TABLE v1_kv RENAME COLUMN v TO val;",
      },
      { "20261113190000_index_v.sql": "CREATE INDEX idx_v1_kv_v ON v1_kv(v);" }
    );
    const result = await runScript(["--base-dir", baseDir, "--head-dir", headDir]);
    assert.equal(result.code, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(
      result.stderr,
      /20261113190000_index_v\.sql falhou ao ser aplicada no caminho atualizado/
    );
    assert.match(
      result.stderr,
      /20261113190000_index_v\.sql falhou ao ser aplicada no caminho novo/
    );
    assert.ok(result.stderr.includes(C1_PHRASE), result.stderr);
    assert.ok(result.stderr.includes("não aplica em nenhum dos dois caminhos"), result.stderr);
    assert.match(result.stderr, /corrija o SQL contra o schema atual da base/);
  });

  // R2B-3 of the third review: a PR migration that depends on ANOTHER migration of the same PR
  // with a larger stamp fails on both paths, and regenerating its name does fix it.
  test("(i_pair) an index stamped before the PR table it needs → exit 1, hint names the new stamp", async () => {
    const { baseDir, headDir } = scenario(
      { "20261113000000_create_base_t.sql": "CREATE TABLE base_t(id INTEGER PRIMARY KEY);" },
      {
        "20261113000100_index_z.sql": "CREATE INDEX idx_z_t_v ON z_t(v);",
        "20261113000400_create_z.sql": "CREATE TABLE z_t(id INTEGER PRIMARY KEY, v TEXT);",
      }
    );
    const result = await runScript(["--base-dir", baseDir, "--head-dir", headDir]);
    assert.equal(result.code, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(
      result.stderr,
      /20261113000100_index_z\.sql falhou ao ser aplicada no caminho atualizado/
    );
    assert.match(
      result.stderr,
      /20261113000100_index_z\.sql falhou ao ser aplicada no caminho novo/
    );
    assert.ok(result.stderr.includes(C1_PHRASE), result.stderr);
    assert.match(
      result.stderr,
      /se ela depende de outra migration do PR com carimbo maior, dê a ela um carimbo novo com\s+`?npm run db:new-migration/
    );
    assert.doesNotMatch(result.stderr, /regerar o nome não resolve/);
  });

  // A PR migration dated before a base migration it depends on: the upgraded database has the
  // base object already, the fresh install does not yet. That is an order problem.
  test("(i_fresh) a PR migration that fails on the fresh path only → exit 1, new-stamp hint, no C1", async () => {
    const { baseDir, headDir } = scenario(
      {
        "20261113100000_create_t.sql": "CREATE TABLE t(id INTEGER PRIMARY KEY);",
        "20261113180000_create_u.sql": "CREATE TABLE u(id INTEGER PRIMARY KEY, x TEXT);",
      },
      { "20261113150000_index_u.sql": "CREATE INDEX idx_u_x ON u(x);" }
    );
    const result = await runScript(["--base-dir", baseDir, "--head-dir", headDir]);
    assert.equal(result.code, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(
      result.stderr,
      /migration 20261113150000_index_u\.sql falhou ao ser aplicada no caminho novo \(tudo em ordem\): .*no such table/
    );
    assert.doesNotMatch(result.stderr, /falhou ao ser aplicada no caminho atualizado/);
    assert.ok(!result.stderr.includes(C1_PHRASE), result.stderr);
    assert.doesNotMatch(result.stderr, /não aplica em nenhum dos dois caminhos/);
    assert.match(result.stderr, /fora de ordem → dê a ela um carimbo novo/);
    assert.match(result.stderr, /npm run db:new-migration/);
    // Only failures: no schema was produced, so no "dão um schema diferente".
    assert.doesNotMatch(result.stderr, /dão um schema/);
  });

  // R2B-1 of the third review (contract C2): a rename the runner does not recognize as a
  // relocation runs the migration a second time on upgraded databases.
  test("(m) a --must-not-apply file applied again on the upgraded database → exit 1 (C2)", async () => {
    const seed = "CREATE TABLE IF NOT EXISTS seed_t(id INTEGER); INSERT INTO seed_t VALUES (1);";
    // Another stamp and no compatibility entry the runner knows: the target is a new migration.
    const { baseDir, headDir } = scenarioDirs(
      { "20261113000100_seed_a.sql": seed },
      { "20261113000200_seed_b.sql": seed }
    );
    const args = ["--base-dir", baseDir, "--head-dir", headDir];

    // Without --must-not-apply the schemas are what is compared, and they are equal (today's
    // behavior: the duplicated row is data).
    const plain = await runScript(args);
    assert.equal(plain.code, 0, `${plain.stdout}\n${plain.stderr}`);

    const json = await runScript([
      ...args,
      "--must-not-apply",
      "20261113000200_seed_b.sql",
      "--json",
    ]);
    assert.equal(json.code, 1, `${json.stdout}\n${json.stderr}`);
    const payload = JSON.parse(json.stdout) as {
      equal: boolean;
      differences: Array<{ kind: string; name: string; message: string }>;
    };
    assert.equal(payload.equal, false);
    assert.deepEqual(
      payload.differences.map((d) => [d.kind, d.name]),
      [["reapplied", "20261113000200_seed_b.sql"]]
    );

    const text = await runScript([...args, "--must-not-apply=20261113000200_seed_b.sql"]);
    assert.equal(text.code, 1, `${text.stdout}\n${text.stderr}`);
    assert.ok(text.stderr.includes(C2_PHRASE), text.stderr);
    assert.match(text.stderr, new RegExp(`20261113000200_seed_b\\.sql ${C2_PHRASE}`));
    assert.ok(!text.stderr.includes(C1_PHRASE), text.stderr);
  });

  test("(m_fail) a --must-not-apply file that fails when it runs again → exit 1 with C1 and C2", async () => {
    // No IF NOT EXISTS: the second run on the upgraded database fails.
    const seed = "CREATE TABLE seed_f(id INTEGER);";
    const { baseDir, headDir } = scenarioDirs(
      { "20261113000100_seed_f_a.sql": seed },
      { "20261113000200_seed_f_b.sql": seed }
    );
    const result = await runScript([
      "--base-dir",
      baseDir,
      "--head-dir",
      headDir,
      "--must-not-apply",
      "20261113000200_seed_f_b.sql",
    ]);
    assert.equal(result.code, 1, `${result.stdout}\n${result.stderr}`);
    assert.ok(result.stderr.includes(C1_PHRASE), result.stderr);
    assert.match(result.stderr, new RegExp(`20261113000200_seed_f_b\\.sql ${C2_PHRASE}`));
  });

  // Same stamp, new description, and a REAL compatibility entry whose fromVersion equals its
  // toVersion (056 provider_default → 056 mcp_accessibility_compression): the runner treats it
  // as a slot replacement, deletes the old ledger row and runs the file again.
  test("(m_slot) a same-stamp rename the runner replaces in place → exit 1 (C2)", async () => {
    const { baseDir, headDir } = realScenario({
      "056_mcp_accessibility_compression.sql": "056_provider_default.sql",
    });
    const result = await runScript([
      "--base-dir",
      baseDir,
      "--head-dir",
      headDir,
      "--must-not-apply",
      "056_mcp_accessibility_compression.sql",
    ]);
    assert.equal(result.code, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(result.stderr, new RegExp(`056_mcp_accessibility_compression\\.sql ${C2_PHRASE}`));
  });

  // A rename the runner DOES recognize moves the ledger row (UPDATE keeps it) and must not be
  // reported. Real entry 236 usage_history_calculated_cost → 237. The suggested 022 → 025 pair
  // cannot be used: 025's content needs columns that 023/024 add, so the base does not install
  // with it at 022 ("no such column: error"). Slot 236 must hold the old name in base/, so the
  // file that holds it today (236_key_templates) arrives with head/, as a new migration.
  test("(m_ok) a rename the runner relocates through a real compatibility entry → exit 0", async () => {
    const { baseDir, headDir } = realScenario(
      { "237_usage_history_calculated_cost.sql": "236_usage_history_calculated_cost.sql" },
      ["236_key_templates.sql"]
    );
    const result = await runScript([
      "--base-dir",
      baseDir,
      "--head-dir",
      headDir,
      "--must-not-apply",
      "237_usage_history_calculated_cost.sql",
    ]);
    assert.equal(result.code, 0, `${result.stdout}\n${result.stderr}`);
    assert.ok(!`${result.stdout}\n${result.stderr}`.includes(C2_PHRASE));
  });

  test("(m_args) --must-not-apply takes a file name that exists in --head-dir → else exit 2", async () => {
    const { baseDir, headDir } = scenario(
      { "20261113100000_x.sql": "CREATE TABLE x(id INTEGER);" },
      {}
    );
    const args = ["--base-dir", baseDir, "--head-dir", headDir];
    const missing = await runScript([...args, "--must-not-apply", "20261113999999_nope.sql"]);
    assert.equal(missing.code, 2, `${missing.stdout}\n${missing.stderr}`);
    assert.match(
      missing.stderr,
      /--must-not-apply: 20261113999999_nope\.sql não existe em --head-dir/
    );
    const withPath = await runScript([...args, "--must-not-apply", "sub/20261113100000_x.sql"]);
    assert.equal(withPath.code, 2, `${withPath.stdout}\n${withPath.stderr}`);
    assert.match(withPath.stderr, /--must-not-apply exige o nome de um arquivo \.sql/);
    const noValue = await runScript([...args, "--must-not-apply"]);
    assert.equal(noValue.code, 2, `${noValue.stdout}\n${noValue.stderr}`);
    // R3A-3: a .sql the runner never loads (no numeric prefix) could never be applied, so the
    // check would pass blind even though the file exists in --head-dir.
    fs.writeFileSync(path.join(headDir, "notes.sql"), "-- not a migration\n");
    const notMigration = await runScript([...args, "--must-not-apply", "notes.sql"]);
    assert.equal(notMigration.code, 2, `${notMigration.stdout}\n${notMigration.stderr}`);
    assert.match(
      notMigration.stderr,
      /--must-not-apply exige o nome de um arquivo \.sql de migration/
    );
  });

  // V1-2 of the adversarial review: B (base, newer) and A (PR, older) both use CREATE TABLE IF
  // NOT EXISTS, so whichever runs first wins. Each table differs in something no pragma shows.
  test("(g) CHECK, COLLATE, generated column and AUTOINCREMENT differences → exit 1", async () => {
    const { baseDir, headDir } = scenario(
      {
        "20261113180000_create_four.sql": `
          CREATE TABLE IF NOT EXISTS v1_chk (x INTEGER CHECK (x > 0));
          CREATE TABLE IF NOT EXISTS v1_coll (x TEXT COLLATE NOCASE);
          CREATE TABLE IF NOT EXISTS v1_gen (x INTEGER, y INTEGER GENERATED ALWAYS AS (x * 2));
          CREATE TABLE IF NOT EXISTS v1_auto (id INTEGER PRIMARY KEY AUTOINCREMENT, v TEXT);`,
      },
      {
        "20261113150000_create_four_loose.sql": `
          CREATE TABLE IF NOT EXISTS v1_chk (x INTEGER);
          CREATE TABLE IF NOT EXISTS v1_coll (x TEXT);
          CREATE TABLE IF NOT EXISTS v1_gen (x INTEGER, y INTEGER GENERATED ALWAYS AS (x * 3));
          CREATE TABLE IF NOT EXISTS v1_auto (id INTEGER PRIMARY KEY, v TEXT);`,
      }
    );
    const result = await runScript(["--base-dir", baseDir, "--head-dir", headDir, "--json"]);
    assert.equal(result.code, 1, `${result.stdout}\n${result.stderr}`);
    const payload = JSON.parse(result.stdout) as {
      differences: Array<{ kind: string; table?: string; name: string; onlyIn?: string }>;
    };
    const definitions = payload.differences.filter((d) => d.kind === "definition");
    assert.deepEqual(
      [...new Set(definitions.map((d) => d.table))].sort(),
      ["v1_auto", "v1_chk", "v1_coll", "v1_gen"],
      JSON.stringify(payload.differences, null, 2)
    );
    assert.deepEqual(
      definitions
        .filter((d) => d.table === "v1_chk")
        .map((d) => [d.name, d.onlyIn])
        .sort(),
      [
        ["x integer check(x>0)", "upgraded"],
        ["x integer", "fresh"],
      ].sort()
    );

    const text = await runScript(["--base-dir", baseDir, "--head-dir", headDir]);
    assert.equal(text.code, 1, `${text.stdout}\n${text.stderr}`);
    for (const table of ["v1_auto", "v1_chk", "v1_coll", "v1_gen"]) {
      assert.match(text.stderr, new RegExp(`tabela ${table}: definição`));
    }
  });

  test("(h) differences of form only (case, spacing, quoting, rebuild + RENAME TO) → exit 0", async () => {
    const { baseDir, headDir } = scenario(
      {
        "20261113100000_create_f_two.sql": "CREATE TABLE f_two(id INTEGER PRIMARY KEY, v TEXT);",
        "20261113180000_create_f_one.sql": `
          CREATE TABLE IF NOT EXISTS f_one (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL DEFAULT 'A b', -- a comment, with a comma
            created TEXT DEFAULT CURRENT_TIMESTAMP,
            UNIQUE (name)
          );
          CREATE INDEX IF NOT EXISTS idx_f_one_name ON f_one(name);
          DROP TABLE IF EXISTS f_two;
          CREATE TABLE f_two(id INTEGER PRIMARY KEY, v TEXT);`,
      },
      {
        // The same objects written differently. f_two is rebuilt and renamed into place here,
        // so one path ends with CREATE TABLE f_two(...) and the other with CREATE TABLE "f_two"(...).
        "20261113150000_create_f_one_alt.sql": `
          create table if not exists "f_one"("id" integer primary key,  [name]   text not null
            default 'A b' /* same, default */ , \`created\` text default current_timestamp ,
            unique ( "name" ));
          create index if not exists "idx_f_one_name" on [f_one] ( "name" );
          CREATE TABLE f_two_new(id INTEGER PRIMARY KEY, v TEXT);
          INSERT INTO f_two_new(id, v) SELECT id, v FROM f_two;
          DROP TABLE f_two;
          ALTER TABLE f_two_new RENAME TO f_two;`,
      }
    );
    const result = await runScript(["--base-dir", baseDir, "--head-dir", headDir]);
    assert.equal(result.code, 0, `${result.stdout}\n${result.stderr}`);
  });

  // A-R1 of the second review: a "..." token after DEFAULT is a string literal in SQLite, so its
  // case is part of the value. The trigger compares with '...' literals: the supported drivers
  // run with double-quoted string literals (DQS) disabled, so new.v = "A" would be column A.
  test("(k) the case of a double-quoted DEFAULT and of a trigger literal counts → exit 1", async () => {
    const { baseDir, headDir } = scenario(
      {
        "20261113100000_create_dq_t.sql": "CREATE TABLE dq_t(v TEXT);",
        "20261113180000_create_dq.sql": `
          CREATE TABLE IF NOT EXISTS dq_lit (v TEXT DEFAULT "ABC");
          CREATE TRIGGER IF NOT EXISTS dq_trg AFTER INSERT ON dq_t WHEN new.v = 'A' BEGIN SELECT 1; END;`,
      },
      {
        "20261113150000_create_dq_lower.sql": `
          CREATE TABLE IF NOT EXISTS dq_lit (v TEXT DEFAULT "abc");
          CREATE TRIGGER IF NOT EXISTS dq_trg AFTER INSERT ON dq_t WHEN new.v = 'a' BEGIN SELECT 1; END;`,
      }
    );
    const result = await runScript(["--base-dir", baseDir, "--head-dir", headDir]);
    assert.equal(result.code, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(
      result.stderr,
      /tabela dq_lit: coluna v difere — atualizado: TEXT DEFAULT 'ABC'; novo: TEXT DEFAULT 'abc'/
    );
    assert.match(
      result.stderr,
      /gatilho dq_trg difere — atualizado: .*new\.v='A'.*; novo: .*new\.v='a'/
    );
  });

  // A-R3 of the third review: DEFAULT ABC stores the string 'ABC', DEFAULT abc stores 'abc'.
  test("(n) the case of a bare-word DEFAULT counts → exit 1", async () => {
    const { baseDir, headDir } = scenario(
      {
        "20261113180000_create_bw.sql":
          "CREATE TABLE IF NOT EXISTS bw_t (v TEXT DEFAULT ABC, w TEXT DEFAULT CURRENT_TIMESTAMP);",
      },
      {
        "20261113150000_create_bw_lower.sql":
          "CREATE TABLE IF NOT EXISTS bw_t (v TEXT DEFAULT abc, w TEXT DEFAULT current_timestamp);",
      }
    );
    const result = await runScript(["--base-dir", baseDir, "--head-dir", headDir, "--json"]);
    assert.equal(result.code, 1, `${result.stdout}\n${result.stderr}`);
    const payload = JSON.parse(result.stdout) as {
      differences: Array<{ kind: string; table?: string; name: string; message: string }>;
    };
    assert.deepEqual(
      payload.differences.map((d) => [d.kind, d.table, d.name]),
      [["column", "bw_t", "v"]],
      JSON.stringify(payload.differences, null, 2)
    );
    assert.match(
      payload.differences[0].message,
      /coluna v difere — atualizado: TEXT DEFAULT 'ABC'; novo: TEXT DEFAULT 'abc'/
    );
  });

  // A-R2 of the second review: the same table written another way (column FOREIGN KEY vs table
  // FOREIGN KEY, NOT NULL before or after DEFAULT, column UNIQUE vs table UNIQUE) keeps exit 1
  // on purpose: the definition text is what carries CHECK, COLLATE, generated columns,
  // AUTOINCREMENT and table options, and a false positive only costs a new stamp. The output
  // must say that columns and constraints agree, so nobody hunts for a missing column.
  test("(l) the same table written another way → exit 1, explained as a definition-only difference", async () => {
    const { baseDir, headDir } = scenario(
      {
        "20261113100000_create_fp2_parent.sql": "CREATE TABLE fp2_parent(id INTEGER PRIMARY KEY);",
        "20261113180000_create_fp2.sql": `
          CREATE TABLE IF NOT EXISTS fp2_fk (id INTEGER PRIMARY KEY, p INTEGER REFERENCES fp2_parent(id));
          CREATE TABLE IF NOT EXISTS fp2_order (k TEXT NOT NULL DEFAULT '');
          CREATE TABLE IF NOT EXISTS fp2_uq (a TEXT UNIQUE);`,
      },
      {
        "20261113150000_create_fp2_alt.sql": `
          CREATE TABLE IF NOT EXISTS fp2_fk (id INTEGER PRIMARY KEY, p INTEGER, FOREIGN KEY (p) REFERENCES fp2_parent(id));
          CREATE TABLE IF NOT EXISTS fp2_order (k TEXT DEFAULT '' NOT NULL);
          CREATE TABLE IF NOT EXISTS fp2_uq (a TEXT, UNIQUE (a));`,
      }
    );
    const json = await runScript(["--base-dir", baseDir, "--head-dir", headDir, "--json"]);
    assert.equal(json.code, 1, `${json.stdout}\n${json.stderr}`);
    const payload = JSON.parse(json.stdout) as {
      differences: Array<{ kind: string; table?: string; note?: string }>;
    };
    assert.deepEqual(
      [...new Set(payload.differences.map((d) => d.kind))],
      ["definition"],
      "the pragmas agree: only the definition text differs"
    );
    assert.deepEqual([...new Set(payload.differences.map((d) => d.table))].sort(), [
      "fp2_fk",
      "fp2_order",
      "fp2_uq",
    ]);

    const text = await runScript(["--base-dir", baseDir, "--head-dir", headDir]);
    assert.equal(text.code, 1, `${text.stdout}\n${text.stderr}`);
    for (const table of ["fp2_fk", "fp2_order", "fp2_uq"]) {
      assert.match(
        text.stderr,
        new RegExp(
          `tabela ${table}: colunas e constraints iguais; a diferença está no texto da definição ` +
            "\\(CHECK, COLLATE, coluna gerada, AUTOINCREMENT, opções da tabela\\) ou só na forma " +
            "de escrever a mesma tabela \\(ex\\.: FOREIGN KEY de coluna × de tabela\\)"
        )
      );
    }
  });

  test("(j) the real migration set plus an independent migration commutes → exit 0", async () => {
    // Guards the normalizer against false positives on the 236 real migrations, the inline
    // schema and the column healers of core.ts.
    const realDir = path.join(REPO_ROOT, "src", "lib", "db", "migrations");
    const dir = path.join(TEST_ROOT, `scenario-${++scenarioCounter}`);
    const headDir = path.join(dir, "head");
    fs.mkdirSync(headDir, { recursive: true });
    for (const file of fs.readdirSync(realDir).filter((f) => f.endsWith(".sql"))) {
      fs.copyFileSync(path.join(realDir, file), path.join(headDir, file));
    }
    writeDir(headDir, {
      "20261113120000_commutation_probe.sql":
        "CREATE TABLE commutation_probe(id INTEGER PRIMARY KEY, v TEXT NOT NULL DEFAULT '');",
    });
    const result = await runScript(["--base-dir", realDir, "--head-dir", headDir]);
    assert.equal(result.code, 0, `${result.stdout}\n${result.stderr}`);
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

describe("migration-commutation normalizer (pure)", () => {
  test("canonicalTableDefinition splits top-level items and ignores the header", async () => {
    const { canonicalTableDefinition } =
      await import("../../../scripts/check/lib/migrationSchemaBoot.ts");
    const direct = canonicalTableDefinition(
      "CREATE TABLE t(id INTEGER PRIMARY KEY, note TEXT DEFAULT 'a, B' /* c, d */, " +
        "y INTEGER GENERATED ALWAYS AS (coalesce(id, 0) * 2), CHECK (id > 0)) WITHOUT ROWID"
    );
    const renamed = canonicalTableDefinition(
      "CREATE TABLE \"t\" (  check(id>0) , [note] text default 'a, B',\n" +
        "  -- a comment, with a comma\n  `id` integer primary key,\n" +
        '  "y" integer generated always as ( COALESCE( id , 0 ) * 2 ) ) without rowid'
    );
    assert.deepEqual(direct, renamed);
    assert.deepEqual(direct, {
      items: [
        "check(id>0)",
        "id integer primary key",
        "note text default 'a, B'",
        "y integer generated always as(coalesce(id,0)*2)",
      ],
      options: "without rowid",
    });
    // String literals stay case-sensitive; a non-simple quoted identifier keeps its quotes.
    assert.notDeepEqual(
      canonicalTableDefinition("CREATE TABLE t(v TEXT DEFAULT 'A')"),
      canonicalTableDefinition("CREATE TABLE t(v TEXT DEFAULT 'a')")
    );
    assert.deepEqual(canonicalTableDefinition('CREATE TABLE t("my col" TEXT)')?.items, [
      '"my col" text',
    ]);
  });

  test("normalizeSqlText ignores keyword case, spacing and quotes on simple identifiers", async () => {
    const { normalizeSqlText } = await import("../../../scripts/check/lib/migrationSchemaBoot.ts");
    assert.equal(
      normalizeSqlText("CREATE INDEX idx_v1_kv_v ON v1_kv(v)"),
      normalizeSqlText('create index "idx_v1_kv_v" on [v1_kv] ( `v` )')
    );
    assert.notEqual(
      normalizeSqlText("CREATE INDEX i ON t(v) WHERE v = 'A'"),
      normalizeSqlText("CREATE INDEX i ON t(v) WHERE v = 'a'")
    );
  });
  test("a double-quoted token is a literal only in DEFAULT (DQS off elsewhere)", async () => {
    const { normalizeSqlText, canonicalTableDefinition, normalizeDefaultValue } =
      await import("../../../scripts/check/lib/migrationSchemaBoot.ts");
    // DEFAULT never references a column: any quoted token there is a string literal, so the
    // case counts and "ABC" is the same value as 'ABC'.
    assert.equal(normalizeDefaultValue('"ABC"'), "'ABC'");
    assert.equal(normalizeDefaultValue("'ABC'"), "'ABC'");
    assert.notEqual(normalizeDefaultValue('"ABC"'), normalizeDefaultValue('"abc"'));
    assert.notEqual(
      normalizeDefaultValue("(\"A\" || 'b')"),
      normalizeDefaultValue("(\"a\" || 'b')")
    );
    assert.equal(
      normalizeDefaultValue("CURRENT_TIMESTAMP"),
      normalizeDefaultValue("current_timestamp")
    );
    assert.deepEqual(canonicalTableDefinition('CREATE TABLE t(v TEXT DEFAULT "ABC")')?.items, [
      "v text default 'ABC'",
    ]);
    assert.notDeepEqual(
      canonicalTableDefinition('CREATE TABLE t(v TEXT DEFAULT "ABC")'),
      canonicalTableDefinition('CREATE TABLE t(v TEXT DEFAULT "abc")')
    );
    // A-R2 of the third review: better-sqlite3 and node:sqlite run with double-quoted string
    // literals (DQS) disabled, so outside DEFAULT a "..." token is ALWAYS an identifier (a
    // CHECK or partial index with v <> "A" fails with `no such column: "A"`). "A" and "a" name
    // the same column, so these normalize to the same text.
    assert.deepEqual(
      canonicalTableDefinition('CREATE TABLE t(v TEXT CHECK (v <> "A"))'),
      canonicalTableDefinition('CREATE TABLE t(v TEXT CHECK (v <> "a"))')
    );
    // A comparison operator (or an IN list) does not make a "..." token a value.
    for (const [upper, lower] of [
      ['WHEN new.v = "A"', 'WHEN new.v = "a"'],
      ['WHEN new.v == "A"', 'WHEN new.v == "a"'],
      ['WHEN new.v != "A"', 'WHEN new.v != "a"'],
      ['WHEN new.v <> "A"', 'WHEN new.v <> "a"'],
      ['WHEN new.v < "A"', 'WHEN new.v < "a"'],
      ['WHEN new.v <= "A"', 'WHEN new.v <= "a"'],
      ['WHEN new.v > "A"', 'WHEN new.v > "a"'],
      ['WHEN new.v >= "A"', 'WHEN new.v >= "a"'],
      ['WHEN new.v IS "A"', 'WHEN new.v IS "a"'],
      ['WHEN new.v IS NOT "A"', 'WHEN new.v IS NOT "a"'],
      ['WHEN new.v LIKE "A%"', 'WHEN new.v LIKE "a%"'],
      ['WHEN new.v GLOB "A*"', 'WHEN new.v GLOB "a*"'],
      ['WHEN new.v IN ("X", "A")', 'WHEN new.v IN ("X", "a")'],
      ['WHEN new.v NOT IN ("A")', 'WHEN new.v NOT IN ("a")'],
    ]) {
      const sql = (when: string) =>
        `CREATE TRIGGER g AFTER INSERT ON t ${when} BEGIN SELECT 1; END`;
      assert.equal(normalizeSqlText(sql(upper)), normalizeSqlText(sql(lower)), upper);
    }
    assert.equal(
      normalizeSqlText('CREATE INDEX i ON t(v) WHERE v = "A"'),
      normalizeSqlText('CREATE INDEX i ON t(v) WHERE v = "a"')
    );
    // The false positive of the third review: a view comparing with "C" and with "c".
    assert.equal(
      normalizeSqlText('CREATE VIEW v AS SELECT x FROM t WHERE x = "C"'),
      normalizeSqlText('CREATE VIEW v AS SELECT x FROM t WHERE x = "c"')
    );
    // String literals in '...' keep their case wherever they are.
    assert.notEqual(
      normalizeSqlText("CREATE TRIGGER g AFTER INSERT ON t WHEN new.v = 'A' BEGIN SELECT 1; END"),
      normalizeSqlText("CREATE TRIGGER g AFTER INSERT ON t WHEN new.v = 'a' BEGIN SELECT 1; END")
    );
    // Followed by "." or "(" it is a qualified name or a function call, not a value.
    assert.equal(
      normalizeSqlText('CREATE VIEW v AS SELECT 1 FROM t, u WHERE t.a = "U".b'),
      normalizeSqlText("CREATE VIEW v AS SELECT 1 FROM t, u WHERE t.a = u.b")
    );
    // Anywhere else a "..." token is still an identifier: case and quotes do not count.
    assert.equal(
      normalizeSqlText(
        'CREATE TRIGGER "G" AFTER INSERT ON "T" WHEN new."V" = 1 BEGIN SELECT 1; END'
      ),
      normalizeSqlText("CREATE TRIGGER g AFTER INSERT ON t WHEN new.v = 1 BEGIN SELECT 1; END")
    );
    assert.equal(
      normalizeSqlText('CREATE VIEW "V" AS SELECT "Col" FROM "T"'),
      normalizeSqlText("create view v as select col from t")
    );
  });

  // A-R3 of the third review: SQLite stores DEFAULT ABC as the string 'ABC' (pragma
  // table_info shows dflt_value ABC), so a bare word there keeps its case.
  test("a bare-word DEFAULT keeps its case; keywords, numbers and blobs do not", async () => {
    const { canonicalTableDefinition, normalizeDefaultValue } =
      await import("../../../scripts/check/lib/migrationSchemaBoot.ts");
    assert.equal(normalizeDefaultValue("ABC"), "'ABC'");
    assert.notEqual(normalizeDefaultValue("ABC"), normalizeDefaultValue("abc"));
    // A bare word, a double-quoted word and a '...' literal are the same value.
    assert.equal(normalizeDefaultValue("ABC"), normalizeDefaultValue("'ABC'"));
    assert.equal(normalizeDefaultValue("ABC"), normalizeDefaultValue('"ABC"'));
    for (const keyword of [
      "NULL",
      "TRUE",
      "FALSE",
      "CURRENT_TIME",
      "CURRENT_DATE",
      "CURRENT_TIMESTAMP",
    ]) {
      assert.equal(normalizeDefaultValue(keyword), keyword.toLowerCase(), keyword);
      assert.equal(
        normalizeDefaultValue(keyword),
        normalizeDefaultValue(keyword.toLowerCase()),
        keyword
      );
      assert.equal(
        normalizeDefaultValue(`${keyword[0]}${keyword.slice(1).toLowerCase()}`),
        keyword.toLowerCase(),
        keyword
      );
    }
    assert.equal(normalizeDefaultValue("0X1F"), "0x1f");
    assert.equal(normalizeDefaultValue("1E5"), "1e5");
    assert.equal(normalizeDefaultValue("X'AB'"), normalizeDefaultValue("x'AB'"));
    // R3A-1: SQLite reads blob hex digits case-insensitively, so x'AB' and x'ab' are one value;
    // a plain string literal keeps its case.
    assert.equal(normalizeDefaultValue("x'AB'"), normalizeDefaultValue("x'ab'"));
    assert.equal(normalizeDefaultValue("x'AB'"), "x'ab'");
    assert.notEqual(normalizeDefaultValue("'AB'"), normalizeDefaultValue("'ab'"));
    assert.deepEqual(
      canonicalTableDefinition("CREATE TABLE t(b BLOB DEFAULT X'AB', c BLOB CHECK (c <> x'0F'))")
        ?.items,
      canonicalTableDefinition("CREATE TABLE t(b BLOB DEFAULT x'ab', c BLOB CHECK (c <> x'0f'))")
        ?.items
    );
    // Inside an expression a word is a function or a keyword, not a value.
    assert.equal(normalizeDefaultValue("(DATETIME('now'))"), "(datetime('now'))");

    assert.deepEqual(canonicalTableDefinition("CREATE TABLE t(v TEXT DEFAULT ABC)")?.items, [
      "v text default 'ABC'",
    ]);
    assert.notDeepEqual(
      canonicalTableDefinition("CREATE TABLE t(v TEXT DEFAULT ABC)"),
      canonicalTableDefinition("CREATE TABLE t(v TEXT DEFAULT abc)")
    );
    assert.deepEqual(
      canonicalTableDefinition("CREATE TABLE t(v TEXT DEFAULT ABC)"),
      canonicalTableDefinition("CREATE TABLE t(v TEXT DEFAULT 'ABC')")
    );
    assert.deepEqual(
      canonicalTableDefinition(
        "CREATE TABLE t(a DEFAULT NULL, b DEFAULT TRUE, c DEFAULT CURRENT_TIMESTAMP, d DEFAULT 10, e DEFAULT X'0A')"
      )?.items,
      [
        "a default null",
        "b default true",
        "c default current_timestamp",
        "d default 10",
        "e default x'0a'", // blob hex digits are case-insensitive (R3A-1)
      ]
    );
  });
});
