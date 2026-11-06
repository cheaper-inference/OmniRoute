/**
 * bin/restore-policies.sh reads table names out of a snapshot and splices them,
 * together with the snapshot and backup paths, into SQL for the sqlite3 CLI.
 * A snapshot is not necessarily trusted (the script accepts any path), so these
 * tests feed it crafted snapshots and check that nothing in them runs as SQL.
 *
 * The payloads use the sqlite3 CLI's writefile() to drop a marker file; if the
 * marker appears, the injected statement ran. Payloads that end up in a
 * directory name write a relative marker (the script runs with cwd set to the
 * test's work dir): an absolute path spelled out with char() would make the
 * name longer than 255 bytes under a long TMPDIR such as macOS's.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const BIN = path.join(ROOT, "bin");
const hasSqlite3 = spawnSync("sqlite3", ["--version"], { stdio: "ignore" }).status === 0;
const skip = hasSqlite3 ? false : "sqlite3 CLI not installed";

/**
 * Skip reason when the sqlite3 CLI was built without a virtual-table module:
 * zipfile() needs zlib and fts4 is a compile-time option. Only a "no such
 * module" error counts, so any other failure still runs the tests.
 */
function skipWithout(module: string, args: string): string | false {
  if (skip) return skip;
  const r = spawnSync("sqlite3", ["-init", "/dev/null", ":memory:"], {
    input: `CREATE VIRTUAL TABLE temp.probe USING ${module}(${args});`,
    encoding: "utf8",
  });
  const missing = r.status !== 0 && r.stderr.includes(`no such module: ${module}`);
  return missing ? `sqlite3 CLI built without ${module}` : false;
}
const skipNoZipfile = skipWithout("zipfile", "'probe.zip'");
const skipNoFts4 = skipWithout("fts4", "x");
const skipNoRtree = skipWithout("rtree", "id, a, b");
const isRoot = process.getuid?.() === 0 ? "running as root" : false;
const realSqlite3 = hasSqlite3
  ? spawnSync("bash", ["-c", "command -v sqlite3"], { encoding: "utf8" }).stdout.trim()
  : "";

function sqlite(db: string, sql: string, env: Record<string, string> = {}): string {
  // Same flags as ops_sqlite: the fixtures and read-backs must not depend on a
  // developer's ~/.sqliterc. The rcEnv probe below runs without them on purpose.
  const args = ["-init", "/dev/null", "-batch", "-noheader", "-list", "-bail", db];
  const r = spawnSync("sqlite3", args, {
    input: sql,
    encoding: "utf8",
    env: { ...process.env, ...env },
  });
  assert.equal(r.status, 0, `sqlite3 ${db} failed: ${r.stderr}`);
  return r.stdout.trim();
}

function runScript(script: string, args: string[], env: Record<string, string>, cwd?: string) {
  return spawnSync("bash", [path.join(BIN, script), ...args], {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, ...env },
  });
}

/** runScript, with the script started under the given umask (e.g. "022"). */
function runScriptWithUmask(
  umask: string,
  script: string,
  args: string[],
  env: Record<string, string>
) {
  return spawnSync(
    "bash",
    ["-c", 'umask "$1"; shift; exec bash "$@"', "bash", umask, path.join(BIN, script), ...args],
    { encoding: "utf8", env: { ...process.env, ...env } }
  );
}

/** SQL expression for a string without using any quote characters. */
function chars(s: string): string {
  return `char(${[...s].map((c) => c.codePointAt(0)).join(",")})`;
}

/** writefile() call that drops a relative PWNED marker in the script's cwd. */
const WRITE_MARKER = `writefile(${chars("PWNED")},${chars("x")})`;

/** SQL string literal; works for any test path, including one with quotes. */
function sqlStr(s: string): string {
  return `'${s.replaceAll("'", "''")}'`;
}

function quoteIdent(name: string): string {
  return `"${name.replaceAll('"', '""')}"`;
}

const LIVE_SCHEMA = "CREATE TABLE api_keys (id TEXT PRIMARY KEY, name TEXT);";

function withWorkdir(fn: (dir: string) => void) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-polsql-"));
  try {
    fn(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

/** Live data dir with one api_keys row ('k1','live'). */
function makeLive(dir: string, name = "data"): string {
  const dataDir = path.join(dir, name);
  fs.mkdirSync(dataDir, { recursive: true });
  sqlite(
    path.join(dataDir, "storage.sqlite"),
    `${LIVE_SCHEMA} INSERT INTO api_keys VALUES ('k1','live');`
  );
  return dataDir;
}

/** Snapshot dir with api_keys ('k1','snap') plus optional extra SQL. */
function makeSnapshot(dir: string, name: string, extraSql = ""): string {
  const snap = path.join(dir, name);
  fs.mkdirSync(snap, { recursive: true });
  sqlite(
    path.join(snap, "storage.sqlite"),
    `${LIVE_SCHEMA} INSERT INTO api_keys VALUES ('k1','snap'); ${extraSql}`
  );
  return snap;
}

function liveName(dataDir: string): string {
  return sqlite(path.join(dataDir, "storage.sqlite"), "SELECT name FROM api_keys WHERE id='k1';");
}

/**
 * Snapshot dir where storage.sqlite holds ('k1','old') and only
 * storage.sqlite-wal has the newer ('k1','snap'): the files are copied while
 * the writer still holds them, like snapshot-data.sh's cp fallback. The paths
 * reach sh through the environment, double-quoted, so they may hold any
 * character.
 */
function makeWalSnapshot(dir: string): string {
  const src = path.join(dir, "wal-src");
  const snap = path.join(dir, "wal-snap");
  fs.mkdirSync(src);
  fs.mkdirSync(snap);
  const db = path.join(src, "storage.sqlite");
  sqlite(
    db,
    `PRAGMA journal_mode=WAL; ${LIVE_SCHEMA} INSERT INTO api_keys VALUES ('k1','old');\n` +
      "PRAGMA wal_checkpoint(TRUNCATE); UPDATE api_keys SET name='snap';\n" +
      `.system cp '"$WAL_DB"' '"$WAL_DB-wal"' '"$WAL_SNAP/"'\n`,
    { WAL_DB: db, WAL_SNAP: snap }
  );
  assert.ok(fs.existsSync(path.join(snap, "storage.sqlite-wal")), "no WAL file in the snapshot");
  return snap;
}

/**
 * A sqlite3 shim that records the modes of every private copy it finds under
 * $TMPDIR, then runs the real sqlite3. By default it looks when the restore
 * transaction runs (the -bail call); with at = "first" it looks at the first
 * sqlite3 call, before anything has opened the copy and checkpointed its WAL
 * file away. seen() returns the modes.
 */
function copyProbe(dir: string, at: "bail" | "first" = "bail") {
  const shim = path.join(dir, "probe");
  const log = path.join(dir, "probe.log");
  fs.mkdirSync(shim);
  fs.writeFileSync(log, "");
  fs.writeFileSync(
    path.join(shim, "sqlite3"),
    "#!/usr/bin/env bash\n" +
      'if [ "$PROBE_AT" = first ]; then\n' +
      '  [ -e "$PROBE_LOG.done" ] || { : > "$PROBE_LOG.done"; hit=1; }\n' +
      "else\n" +
      '  case " $* " in *" -bail "*) hit=1 ;; esac\n' +
      "fi\n" +
      'if [ -n "${hit:-}" ]; then\n' +
      '  for d in "$TMPDIR"/omniroute-restore-policies.*; do\n' +
      '    [ -f "$d/storage.sqlite" ] || continue\n' +
      // Only the mode column, so a newline in $TMPDIR cannot split a record.
      '    rec="$(ls -ld "$d" | head -c 10) $(ls -ld "$d/storage.sqlite" | head -c 10)"\n' +
      '    [ ! -f "$d/storage.sqlite-wal" ] ||\n' +
      '      rec="$rec $(ls -ld "$d/storage.sqlite-wal" | head -c 10)"\n' +
      '    printf "%s\\n" "$rec" >> "$PROBE_LOG"\n' +
      "  done\n" +
      "fi\n" +
      'exec "$REAL" "$@"\n',
    { mode: 0o755 }
  );
  return {
    env: {
      PATH: `${shim}${path.delimiter}${process.env.PATH}`,
      REAL: realSqlite3,
      PROBE_LOG: log,
      PROBE_AT: at,
    },
    /**
     * [dir mode, file mode] for each copy seen, e.g. ["drwx------", "-rw-------"],
     * plus the -wal file's mode when the copy has one.
     */
    seen(): string[][] {
      // head -c 10 drops a trailing ACL/xattr flag such as "+" or "@".
      const lines = fs.readFileSync(log, "utf8").split("\n").filter(Boolean);
      return lines.map((l) => l.split(" "));
    },
  };
}

describe("restore-policies.sh does not run SQL taken from a snapshot", () => {
  for (const [label, makeName] of [
    [
      "double quote in a table name",
      // The trailing ' OR '1'='1 makes the live-DB existence check match.
      (writefile: string) => `api_keys"; SELECT ${writefile}; -- ' OR '1'='1`,
    ],
    ["single quote in a table name", (writefile: string) => `api_keys'; SELECT ${writefile}; --`],
    [
      "name that starts and ends like a policy table",
      // Ends in a plain identifier, so only the ^ anchor of the name check
      // stops it; the trailing ' OR ... makes both name='$t' checks match.
      (writefile: string) => `api_keys"; SELECT ${writefile}; --' OR name='api_keys' OR 'api_key`,
    ],
  ] as const) {
    it(`refuses a snapshot with a ${label}`, { skip }, () => {
      withWorkdir((dir) => {
        const marker = path.join(dir, "PWNED");
        const evil = makeName(`writefile(${chars(marker)},${chars("x")})`);
        const dataDir = makeLive(dir);
        const snap = makeSnapshot(dir, "evil-snap", `CREATE TABLE ${quoteIdent(evil)} (x);`);

        const r = runScript("restore-policies.sh", [snap, "--yes"], { DATA_DIR: dataDir });

        assert.equal(fs.existsSync(marker), false, "writefile() from the table name ran");
        assert.notEqual(r.status, 0, "restore must fail on a bad table name");
        assert.match(r.stderr, /not a plain identifier/);
        assert.equal(liveName(dataDir), "live", "live api_keys must be left alone");
      });
    });
  }

  // A double quote is the one character that could end the "..." identifier the
  // name is spliced into, so it must be refused on its own too.
  it("refuses a table name whose only unusual character is a double quote", { skip }, () => {
    withWorkdir((dir) => {
      const dataDir = makeLive(dir);
      const snap = makeSnapshot(dir, "quote-snap", `CREATE TABLE ${quoteIdent('api_keys"x')} (x);`);

      const r = runScript("restore-policies.sh", [snap, "--yes"], { DATA_DIR: dataDir });

      assert.notEqual(r.status, 0, "restore must fail on a bad table name");
      assert.match(r.stderr, /not a plain identifier/);
      assert.equal(liveName(dataDir), "live", "live api_keys must be left alone");
    });
  });

  // A directory name may hold quotes, backslashes, parentheses and semicolons
  // (not '/'). None of it may end up running as SQL.
  for (const [label, makeName] of [
    ["one quote", (w: string) => `s' AS x; SELECT ${w}; --`],
    ["two quotes", (w: string) => `a'b' AS x; SELECT ${w}; --`],
    ["a printf escape", (w: string) => `c\\047 AS y; SELECT ${w}; --`],
  ] as const) {
    it(`does not run a snapshot path as SQL (${label})`, { skip }, () => {
      withWorkdir((dir) => {
        const marker = path.join(dir, "PWNED");
        const dataDir = makeLive(dir);
        const snap = makeSnapshot(dir, makeName(WRITE_MARKER));

        const r = runScript("restore-policies.sh", [snap, "--yes"], { DATA_DIR: dataDir }, dir);

        assert.equal(fs.existsSync(marker), false, "writefile() from the snapshot path ran");
        assert.equal(r.status, 0, `restore failed: ${r.stderr}`);
        assert.equal(liveName(dataDir), "snap");
      });
    });
  }

  it("quotes the path of its private snapshot copy in ATTACH", { skip }, () => {
    withWorkdir((dir) => {
      const marker = path.join(dir, "PWNED");
      const dataDir = makeLive(dir);
      const snap = makeSnapshot(dir, "plain-snap");
      const tmp = path.join(dir, `t' AS x; SELECT ${WRITE_MARKER}; --`);
      fs.mkdirSync(tmp);
      const probe = copyProbe(dir);

      const r = runScript(
        "restore-policies.sh",
        [snap, "--yes"],
        { ...probe.env, DATA_DIR: dataDir, TMPDIR: tmp },
        dir
      );

      assert.equal(fs.existsSync(marker), false, "writefile() from TMPDIR ran");
      assert.equal(r.status, 0, `restore failed: ${r.stderr}`);
      assert.equal(liveName(dataDir), "snap");
      assert.equal(probe.seen().length, 1, "the private copy was not made in TMPDIR");
    });
  });

  it("works when the data and backup directories contain an apostrophe", { skip }, () => {
    withWorkdir((dir) => {
      const dataDir = makeLive(dir, "o'brien data");
      const snap = makeSnapshot(dir, "plain-snap");

      const r = runScript("restore-policies.sh", [snap, "--yes"], { DATA_DIR: dataDir });

      assert.equal(r.status, 0, `restore failed: ${r.stderr}`);
      assert.equal(liveName(dataDir), "snap");
      const backups = fs.readdirSync(path.join(dataDir, "db_backups"));
      const safety = backups.find((d) => d.startsWith("pre-policy-restore_"));
      assert.ok(safety, "safety snapshot dir missing");
      assert.ok(
        fs.existsSync(path.join(dataDir, "db_backups", safety, "storage.sqlite")),
        "safety copy of the live DB missing"
      );
    });
  });

  it("does not read a virtual table from the snapshot schema", { skip: skipNoZipfile }, () => {
    withWorkdir((dir) => {
      const zip = path.join(dir, "outside.zip");
      sqlite(
        ":memory:",
        `CREATE VIRTUAL TABLE temp.z USING zipfile(${sqlStr(zip)});` +
          "INSERT INTO temp.z(name, data) VALUES ('secret.txt', 'outside-file');"
      );
      const dataDir = makeLive(dir);
      const zipCols = "name, mode, mtime, sz, rawdata, data, method";
      sqlite(path.join(dataDir, "storage.sqlite"), `CREATE TABLE api_keys_zip (${zipCols});`);
      const snap = makeSnapshot(
        dir,
        "vtab-snap",
        `CREATE VIRTUAL TABLE api_keys_zip USING zipfile(${sqlStr(zip)});`
      );

      const r = runScript("restore-policies.sh", [snap, "--yes"], { DATA_DIR: dataDir });

      const rows = sqlite(
        path.join(dataDir, "storage.sqlite"),
        "SELECT COUNT(*) FROM api_keys_zip;"
      );
      assert.equal(rows, "0", "zip contents were copied into the live DB");
      assert.notEqual(r.status, 0, "restore must fail on an untrusted virtual table");
      assert.equal(liveName(dataDir), "live", "failed restore must roll back");
    });
  });

  // The check refuses every virtual table, not only zipfile(): a list of modules
  // that reach files would differ from one sqlite3 build to the next. fts4 reads
  // nothing outside the database, so this case fails only if virtual tables are
  // let through.
  it("does not read a virtual table whose module reads no files", { skip: skipNoFts4 }, () => {
    withWorkdir((dir) => {
      const dataDir = makeLive(dir);
      const live = path.join(dataDir, "storage.sqlite");
      sqlite(live, "CREATE TABLE api_keys_f (x);");
      const snap = makeSnapshot(
        dir,
        "fts-snap",
        "CREATE VIRTUAL TABLE api_keys_f USING fts4(x);" +
          "INSERT INTO api_keys_f VALUES ('from-vtab');"
      );
      const snapDb = path.join(snap, "storage.sqlite");
      assert.equal(sqlite(snapDb, "SELECT x FROM api_keys_f;"), "from-vtab");

      const r = runScript("restore-policies.sh", [snap, "--yes"], { DATA_DIR: dataDir });

      assert.equal(sqlite(live, "SELECT COUNT(*) FROM api_keys_f;"), "0", "vtab rows were copied");
      assert.notEqual(r.status, 0, "restore must fail on a virtual table");
      assert.match(r.stderr, /not an ordinary table/);
      assert.equal(liveName(dataDir), "live");
    });
  });

  // The snapshot's schema is not trusted either: with writable_schema its stored
  // SQL can be respelled, and SQLite still opens the table as a zipfile() table.
  // Each spelling below is one SQLite accepts (the test checks the table still
  // reads). Each of the gaps CREATE-VIRTUAL, VIRTUAL-TABLE, TABLE-name,
  // name-USING and USING-module is changed at least once (a tab, newline,
  // comment, quoted name or no space), and some spellings change the case of the
  // keywords or of the module name. A denylist that none of these spellings gets
  // past is not shown safe by these tests; the script checks for an ordinary
  // CREATE TABLE instead. Each spelling also runs with the table's rootpage set
  // to 2 (why rootpage matters is explained below), so a rootpage check paired
  // with a text check that one of these spellings gets past fails here too.
  const CV = "CREATE VIRTUAL";
  const VT = "VIRTUAL TABLE";
  const TN = "TABLE api_keys_zip";
  for (const [label, from, to] of [
    ["a tab", CV, "'CREATE' || char(9) || 'VIRTUAL'"],
    ["two spaces", CV, "'CREATE  VIRTUAL'"],
    ["three spaces", CV, "'CREATE   VIRTUAL'"],
    ["two tabs", CV, "'CREATE' || char(9, 9) || 'VIRTUAL'"],
    ["a space and a tab", CV, "'CREATE ' || char(9) || 'VIRTUAL'"],
    ["a newline", CV, "'CREATE' || char(10) || 'VIRTUAL'"],
    ["a carriage return", CV, "'CREATE' || char(13) || 'VIRTUAL'"],
    ["CRLF", CV, "'CREATE' || char(13, 10) || 'VIRTUAL'"],
    ["a form feed", CV, "'CREATE' || char(12) || 'VIRTUAL'"],
    ["an empty block comment", CV, "'CREATE/**/VIRTUAL'"],
    ["a block comment and spaces", CV, "'CREATE /* x */ VIRTUAL'"],
    ["a line comment", CV, "'CREATE -- x' || char(10) || 'VIRTUAL'"],
    ["lower-case keywords", CV, "'create virtual'"],
    ["mixed-case keywords", CV, "'CrEaTe ViRtUaL'"],
    ["a tab", VT, "'VIRTUAL' || char(9) || 'TABLE'"],
    ["an empty block comment", VT, "'VIRTUAL/**/TABLE'"],
    ["a newline", VT, "'VIRTUAL' || char(10) || 'TABLE'"],
    ["a carriage return", VT, "'VIRTUAL' || char(13) || 'TABLE'"],
    ["a form feed", VT, "'VIRTUAL' || char(12) || 'TABLE'"],
    ["a tab", TN, "'TABLE' || char(9) || 'api_keys_zip'"],
    ["a newline", TN, "'TABLE' || char(10) || 'api_keys_zip'"],
    ["an empty block comment", TN, "'TABLE/**/api_keys_zip'"],
    ["a quoted name and no space", TN, "'TABLE\"api_keys_zip\"'"],
    ["a quoted name and no space", "api_keys_zip USING", "'\"api_keys_zip\"USING'"],
    ["tabs", " USING ", "char(9) || 'USING' || char(9)"],
    ["an empty block comment", "USING zipfile", "'USING/**/zipfile'"],
    ["an upper-case module name", "USING zipfile", "'USING ZIPFILE'"],
  ] as const) {
    for (const rootpage of ["", "2"]) {
      it(
        `does not read a virtual table stored with ${label} (${from.trim()} respelled)` +
          (rootpage ? ` and rootpage set to ${rootpage}` : ""),
        { skip: skipNoZipfile },
        () => {
          withWorkdir((dir) => {
            const zip = path.join(dir, "outside.zip");
            sqlite(
              ":memory:",
              `CREATE VIRTUAL TABLE temp.z USING zipfile(${sqlStr(zip)});` +
                "INSERT INTO temp.z(name, data) VALUES ('secret.txt', 'outside-file');"
            );
            const dataDir = makeLive(dir);
            const live = path.join(dataDir, "storage.sqlite");
            sqlite(
              live,
              "CREATE TABLE api_keys_zip (name, mode, mtime, sz, rawdata, data, method);"
            );
            const snap = makeSnapshot(
              dir,
              "vtab-snap",
              `CREATE VIRTUAL TABLE api_keys_zip USING zipfile(${sqlStr(zip)});\n` +
                ".dbconfig defensive off\nPRAGMA writable_schema=ON;\n" +
                `UPDATE sqlite_master SET sql = replace(sql, ${sqlStr(from)}, ${to})` +
                (rootpage ? `, rootpage = ${rootpage}` : "") +
                " WHERE name = 'api_keys_zip';"
            );
            const snapDb = path.join(snap, "storage.sqlite");
            const stored = sqlite(
              snapDb,
              "SELECT sql FROM sqlite_master WHERE name = 'api_keys_zip';"
            );
            assert.ok(!stored.includes(from), `stored SQL was not respelled: ${stored}`);
            if (rootpage) {
              assert.equal(
                sqlite(snapDb, "SELECT rootpage FROM sqlite_master WHERE name = 'api_keys_zip';"),
                rootpage
              );
              assert.ok(Number(sqlite(snapDb, "PRAGMA page_count;")) >= Number(rootpage));
            }
            assert.equal(sqlite(snapDb, "SELECT name FROM api_keys_zip;"), "secret.txt");

            const r = runScript("restore-policies.sh", [snap, "--yes"], { DATA_DIR: dataDir });

            assert.equal(
              sqlite(live, "SELECT COUNT(*) FROM api_keys_zip;"),
              "0",
              "zip contents were copied"
            );
            assert.notEqual(r.status, 0, "restore must fail on an untrusted virtual table");
            assert.match(r.stderr, /not an ordinary table/);
            assert.equal(liveName(dataDir), "live");
          });
        }
      );
    }
  }

  // rootpage does not tell an ordinary table either: with writable_schema a
  // zipfile() table's rootpage can be set to a real page, and SQLite still opens
  // it as a virtual table.
  for (const rootpage of ["2", "3"]) {
    it(
      `does not read a virtual table whose rootpage was set to ${rootpage}`,
      { skip: skipNoZipfile },
      () => {
        withWorkdir((dir) => {
          const zip = path.join(dir, "outside.zip");
          sqlite(
            ":memory:",
            `CREATE VIRTUAL TABLE temp.z USING zipfile(${sqlStr(zip)});` +
              "INSERT INTO temp.z(name, data) VALUES ('secret.txt', 'outside-file');"
          );
          const dataDir = makeLive(dir);
          const live = path.join(dataDir, "storage.sqlite");
          sqlite(live, "CREATE TABLE api_keys_zip (name, mode, mtime, sz, rawdata, data, method);");
          const snap = makeSnapshot(
            dir,
            "vtab-snap",
            `CREATE VIRTUAL TABLE api_keys_zip USING zipfile(${sqlStr(zip)});\n` +
              ".dbconfig defensive off\nPRAGMA writable_schema=ON;\n" +
              `UPDATE sqlite_master SET rootpage = ${rootpage} WHERE name = 'api_keys_zip';`
          );
          const snapDb = path.join(snap, "storage.sqlite");
          assert.equal(
            sqlite(snapDb, "SELECT rootpage FROM sqlite_master WHERE name = 'api_keys_zip';"),
            rootpage
          );
          assert.ok(Number(sqlite(snapDb, "PRAGMA page_count;")) >= Number(rootpage));
          assert.equal(sqlite(snapDb, "SELECT name FROM api_keys_zip;"), "secret.txt");

          const r = runScript("restore-policies.sh", [snap, "--yes"], { DATA_DIR: dataDir });

          assert.equal(
            sqlite(live, "SELECT COUNT(*) FROM api_keys_zip;"),
            "0",
            "zip contents were copied"
          );
          assert.notEqual(r.status, 0, "restore must fail on an untrusted virtual table");
          assert.match(r.stderr, /not an ordinary table/);
          assert.equal(liveName(dataDir), "live");
        });
      }
    );
  }

  // The same with two other modules: fts4, whose stored SQL also gets a comment
  // between CREATE and VIRTUAL, and rtree. A rootpage check paired with a
  // denylist of zipfile(), of zipfile() and fts4, or of SQL starting with
  // CREATE VIRTUAL fails at least one of these two.
  for (const [mod, modSkip, name, cols, create, stored, read, row] of [
    [
      "fts4",
      skipNoFts4,
      "api_keys_f",
      "x",
      "CREATE VIRTUAL TABLE api_keys_f USING fts4(x); INSERT INTO api_keys_f VALUES ('from-vtab');",
      "CREATE/**/VIRTUAL TABLE api_keys_f USING fts4(x)",
      "SELECT x FROM api_keys_f;",
      "from-vtab",
    ],
    [
      "rtree",
      skipNoRtree,
      "api_keys_r",
      "id, a, b",
      "CREATE VIRTUAL TABLE api_keys_r USING rtree(id, a, b); INSERT INTO api_keys_r VALUES (1, 0, 1);",
      "CREATE VIRTUAL TABLE api_keys_r USING rtree(id, a, b)",
      "SELECT id FROM api_keys_r;",
      "1",
    ],
  ] as const) {
    it(`does not read an ${mod} table whose rootpage was set to 2`, { skip: modSkip }, () => {
      withWorkdir((dir) => {
        const dataDir = makeLive(dir);
        const live = path.join(dataDir, "storage.sqlite");
        sqlite(live, `CREATE TABLE ${name} (${cols});`);
        const snap = makeSnapshot(
          dir,
          "vtab-snap",
          `${create}\n` +
            ".dbconfig defensive off\nPRAGMA writable_schema=ON;\n" +
            "UPDATE sqlite_master SET rootpage = 2, sql = replace(sql, 'CREATE VIRTUAL', " +
            `${sqlStr(stored.slice(0, stored.indexOf(" TABLE")))}) WHERE name = ${sqlStr(name)};`
        );
        const snapDb = path.join(snap, "storage.sqlite");
        const where = ` FROM sqlite_master WHERE name = ${sqlStr(name)};`;
        assert.equal(sqlite(snapDb, `SELECT rootpage${where}`), "2");
        assert.equal(sqlite(snapDb, `SELECT sql${where}`), stored);
        assert.equal(sqlite(snapDb, read), row);

        const r = runScript("restore-policies.sh", [snap, "--yes"], { DATA_DIR: dataDir });

        assert.equal(sqlite(live, `SELECT COUNT(*) FROM ${name};`), "0", "vtab rows were copied");
        assert.notEqual(r.status, 0, "restore must fail on a virtual table");
        assert.match(r.stderr, /not an ordinary table/);
        assert.equal(liveName(dataDir), "live");
      });
    });
  }

  it("rolls back when a statement fails part-way", { skip }, () => {
    withWorkdir((dir) => {
      const dataDir = makeLive(dir);
      const snapDir = path.join(dir, "mismatch-snap");
      fs.mkdirSync(snapDir);
      // Column count differs from the live table, so the INSERT fails after the DELETE.
      sqlite(
        path.join(snapDir, "storage.sqlite"),
        "CREATE TABLE api_keys (id TEXT, name TEXT, extra TEXT);" +
          "INSERT INTO api_keys VALUES ('k1','snap','x');"
      );

      const r = runScript("restore-policies.sh", [snapDir, "--yes"], { DATA_DIR: dataDir });

      assert.notEqual(r.status, 0);
      assert.equal(liveName(dataDir), "live", "DELETE must not be committed");
    });
  });

  it("still restores several ordinary policy tables", { skip }, () => {
    withWorkdir((dir) => {
      const dataDir = makeLive(dir);
      const live = path.join(dataDir, "storage.sqlite");
      sqlite(
        live,
        "CREATE TABLE api_key_limits (id TEXT, n INT); INSERT INTO api_key_limits VALUES ('k1', 1);"
      );
      const snap = makeSnapshot(
        dir,
        "good-snap",
        "CREATE TABLE api_key_limits (id TEXT, n INT); INSERT INTO api_key_limits VALUES ('k1', 7);"
      );

      const r = runScript("restore-policies.sh", [snap, "--yes"], { DATA_DIR: dataDir });

      assert.equal(r.status, 0, `restore failed: ${r.stderr}`);
      assert.equal(liveName(dataDir), "snap");
      assert.equal(sqlite(live, "SELECT n FROM api_key_limits;"), "7");
    });
  });
});

describe("snapshot-data.sh and restore-data.sh quote the backup path", () => {
  it(
    "snapshot-data writes a VACUUM INTO copy under a data dir with an apostrophe",
    { skip },
    () => {
      withWorkdir((dir) => {
        const dataDir = makeLive(dir, "o'brien data");
        const r = runScript("snapshot-data.sh", [], { DATA_DIR: dataDir });
        assert.equal(r.status, 0, `snapshot failed: ${r.stderr}`);
        const id = r.stdout.trim();
        const copy = path.join(dataDir, "db_backups", `snapshot_${id}`, "storage.sqlite");
        assert.equal(liveName(path.dirname(copy)), "live");
      });
    }
  );

  it("restore-data takes its safety copy with VACUUM INTO, not the cp fallback", { skip }, () => {
    withWorkdir((dir) => {
      const dataDir = makeLive(dir, "o'brien data");
      const snap = makeSnapshot(dir, "plain-snap");
      const r = runScript("restore-data.sh", [snap, "--yes"], { DATA_DIR: dataDir });
      assert.equal(r.status, 0, `restore-data failed: ${r.stderr}`);
      assert.doesNotMatch(r.stderr, /error/i, "VACUUM INTO failed and fell back to cp");
      assert.equal(liveName(dataDir), "snap");
    });
  });
});

describe("ops_sql_str", () => {
  it("prints any value as an SQL string literal that reads back unchanged", { skip }, () => {
    const values = ["a'b'c", "''", "%s%d%%", "\\047", "x\\ny", "line1\nline2", "'; SELECT 1; --"];
    for (const value of values) {
      const r = spawnSync(
        "bash",
        ["-c", 'source "$1"; ops_sql_str "$2"', "bash", path.join(BIN, "_ops-common.sh"), value],
        { encoding: "utf8" }
      );
      assert.equal(r.status, 0, r.stderr);
      const hex = sqlite(":memory:", `SELECT hex(${r.stdout});`);
      assert.equal(hex, Buffer.from(value).toString("hex").toUpperCase(), `value ${value}`);
    }
  });
});

describe("the ops scripts ignore the operator's sqliterc", () => {
  // The CLI reads ~/.sqliterc from the passwd home directory, not $HOME, so the
  // file is also put under $XDG_CONFIG_HOME, which the CLI does honor.
  function rcEnv(dir: string, rc: string): Record<string, string> {
    const home = path.join(dir, "home");
    fs.mkdirSync(path.join(home, ".config", "sqlite3"), { recursive: true });
    fs.writeFileSync(path.join(home, ".sqliterc"), `${rc}\n`);
    fs.writeFileSync(path.join(home, ".config", "sqlite3", "sqliterc"), `${rc}\n`);
    const env = { HOME: home, XDG_CONFIG_HOME: path.join(home, ".config") };
    const probe = spawnSync("sqlite3", [":memory:", "SELECT 'probe' AS c;"], {
      encoding: "utf8",
      env: { ...process.env, ...env },
    });
    assert.notEqual(probe.stdout.trim(), "probe", `sqliterc ${rc} not picked up`);
    return env;
  }

  for (const rc of [
    ".headers on",
    ".mode column",
    ".mode box",
    ".headers on\n.mode csv",
    ".echo on",
  ]) {
    it(`restore-policies restores with sqliterc ${JSON.stringify(rc)}`, { skip }, () => {
      withWorkdir((dir) => {
        const env = rcEnv(dir, rc);
        const dataDir = makeLive(dir);
        const live = path.join(dataDir, "storage.sqlite");
        sqlite(
          live,
          "CREATE TABLE api_key_limits (id TEXT, n INT); INSERT INTO api_key_limits VALUES ('k1', 1);"
        );
        const snap = makeSnapshot(
          dir,
          "good-snap",
          "CREATE TABLE api_key_limits (id TEXT, n INT); INSERT INTO api_key_limits VALUES ('k1', 7);"
        );

        const r = runScript("restore-policies.sh", [snap, "--yes"], { ...env, DATA_DIR: dataDir });

        assert.equal(r.status, 0, `restore failed: ${r.stderr}`);
        assert.equal(r.stdout, "", "sqliterc output leaked into stdout");
        assert.equal(liveName(dataDir), "snap");
        assert.equal(sqlite(live, "SELECT n FROM api_key_limits;"), "7");
      });
    });
  }

  // With .echo on every query prints its own text, so a check that only asks
  // "did the query print anything?" would always pass.
  it("still refuses a virtual table with sqliterc .echo on", { skip: skipNoZipfile }, () => {
    withWorkdir((dir) => {
      const env = rcEnv(dir, ".echo on");
      const zip = path.join(dir, "outside.zip");
      sqlite(
        ":memory:",
        `CREATE VIRTUAL TABLE temp.z USING zipfile(${sqlStr(zip)});` +
          "INSERT INTO temp.z(name, data) VALUES ('secret.txt', 'outside-file');"
      );
      const dataDir = makeLive(dir);
      const live = path.join(dataDir, "storage.sqlite");
      sqlite(live, "CREATE TABLE api_keys_zip (name, mode, mtime, sz, rawdata, data, method);");
      const snap = makeSnapshot(
        dir,
        "vtab-snap",
        `CREATE VIRTUAL TABLE api_keys_zip USING zipfile(${sqlStr(zip)});`
      );

      const r = runScript("restore-policies.sh", [snap, "--yes"], { ...env, DATA_DIR: dataDir });

      assert.notEqual(r.status, 0, "restore must fail on a virtual table");
      assert.match(r.stderr, /not an ordinary table/);
      assert.equal(sqlite(live, "SELECT COUNT(*) FROM api_keys_zip;"), "0");
    });
  });

  it("still skips a policy table missing from the live DB with sqliterc .echo on", { skip }, () => {
    withWorkdir((dir) => {
      const env = rcEnv(dir, ".echo on");
      const dataDir = makeLive(dir);
      const snap = makeSnapshot(dir, "extra-snap", "CREATE TABLE api_key_new (v TEXT);");

      const r = runScript("restore-policies.sh", [snap, "--yes"], { ...env, DATA_DIR: dataDir });

      assert.equal(r.status, 0, `restore failed: ${r.stderr}`);
      assert.match(r.stderr, /skipping 'api_key_new'/);
      assert.equal(liveName(dataDir), "snap");
    });
  });

  it("snapshot-data prints only the snapshot id with sqliterc .echo on", { skip }, () => {
    withWorkdir((dir) => {
      const env = rcEnv(dir, ".echo on");
      const dataDir = makeLive(dir);
      const r = runScript("snapshot-data.sh", [], { ...env, DATA_DIR: dataDir });
      assert.equal(r.status, 0, `snapshot failed: ${r.stderr}`);
      assert.match(r.stdout, /^\d{8}T\d{6}Z\n$/, `unexpected stdout: ${r.stdout}`);
    });
  });

  it("restore-data prints nothing on stdout with sqliterc .echo on", { skip }, () => {
    withWorkdir((dir) => {
      const env = rcEnv(dir, ".echo on");
      const dataDir = makeLive(dir);
      const snap = makeSnapshot(dir, "plain-snap");
      const r = runScript("restore-data.sh", [snap, "--yes"], { ...env, DATA_DIR: dataDir });
      assert.equal(r.status, 0, `restore-data failed: ${r.stderr}`);
      assert.equal(r.stdout, "");
      assert.equal(liveName(dataDir), "snap");
    });
  });
});

describe("restore-policies.sh checks and restores the same snapshot file", () => {
  // Stand-in for someone who can write the snapshot directory: a sqlite3 shim
  // that swaps the snapshot file either at the first sqlite3 call (right after
  // the script copied it) or just before the restore transaction (after every
  // check). The evil file has a zipfile() table and one more policy table.
  for (const [when, label] of [
    ["first", "before the checks"],
    ["bail", "after the checks"],
  ] as const) {
    it(`is not fooled by a snapshot swapped ${label}`, { skip: skipNoZipfile }, () => {
      withWorkdir((dir) => {
        const zip = path.join(dir, "outside.zip");
        sqlite(
          ":memory:",
          `CREATE VIRTUAL TABLE temp.z USING zipfile(${sqlStr(zip)});` +
            "INSERT INTO temp.z(name, data) VALUES ('secret.txt', 'outside-file');"
        );
        const zipCols = "name, mode, mtime, sz, rawdata, data, method";
        const dataDir = makeLive(dir);
        const live = path.join(dataDir, "storage.sqlite");
        sqlite(
          live,
          `CREATE TABLE api_keys_zip (${zipCols}); CREATE TABLE api_key_extra (v TEXT);` +
            "INSERT INTO api_key_extra VALUES ('live');"
        );
        const snap = makeSnapshot(
          dir,
          "snap",
          `CREATE TABLE api_keys_zip (${zipCols}); INSERT INTO api_keys_zip (name) VALUES ('snap-row');`
        );
        const evil = makeSnapshot(
          dir,
          "evil",
          `CREATE VIRTUAL TABLE api_keys_zip USING zipfile(${sqlStr(zip)});` +
            "CREATE TABLE api_key_extra (v TEXT); INSERT INTO api_key_extra VALUES ('evil');"
        );
        const shim = path.join(dir, "shim");
        fs.mkdirSync(shim);
        fs.writeFileSync(
          path.join(shim, "sqlite3"),
          "#!/usr/bin/env bash\n" +
            'if [ ! -e "$FLAG" ]; then case " $* " in *" -bail "*) hit=1 ;; *) hit= ;; esac\n' +
            '  if [ "$WHEN" = first ] || [ -n "$hit" ]; then touch "$FLAG"; cp "$EVIL" "$TARGET"; fi\n' +
            "fi\n" +
            'exec "$REAL" "$@"\n',
          { mode: 0o755 }
        );

        const r = runScript("restore-policies.sh", [snap, "--yes"], {
          DATA_DIR: dataDir,
          PATH: `${shim}${path.delimiter}${process.env.PATH}`,
          REAL: realSqlite3,
          WHEN: when,
          FLAG: path.join(dir, "swapped"),
          EVIL: path.join(evil, "storage.sqlite"),
          TARGET: path.join(snap, "storage.sqlite"),
        });

        assert.ok(fs.existsSync(path.join(dir, "swapped")), "the shim did not swap the snapshot");
        assert.equal(r.status, 0, `restore failed: ${r.stderr}`);
        assert.equal(sqlite(live, "SELECT group_concat(name) FROM api_keys_zip;"), "snap-row");
        assert.equal(sqlite(live, "SELECT v FROM api_key_extra;"), "live");
        assert.equal(liveName(dataDir), "snap");
      });
    });
  }

  it("restores rows still in the snapshot's WAL file", { skip }, () => {
    withWorkdir((dir) => {
      const dataDir = makeLive(dir);
      const snap = makeWalSnapshot(dir);

      const r = runScript("restore-policies.sh", [snap, "--yes"], { DATA_DIR: dataDir });

      assert.equal(r.status, 0, `restore failed: ${r.stderr}`);
      assert.equal(liveName(dataDir), "snap");
    });
  });

  it("restores from a read-only snapshot directory", { skip: skip || isRoot }, () => {
    withWorkdir((dir) => {
      const dataDir = makeLive(dir);
      const snap = makeSnapshot(dir, "ro-snap");
      fs.chmodSync(path.join(snap, "storage.sqlite"), 0o444);
      fs.chmodSync(snap, 0o555);
      try {
        const r = runScript("restore-policies.sh", [snap, "--yes"], { DATA_DIR: dataDir });
        assert.equal(r.status, 0, `restore failed: ${r.stderr}`);
        assert.equal(liveName(dataDir), "snap");
        assert.deepEqual(fs.readdirSync(snap), ["storage.sqlite"]);
      } finally {
        fs.chmodSync(snap, 0o755);
      }
    });
  });

  it("keeps its private copy in TMPDIR, owner-only, and removes it", { skip }, () => {
    withWorkdir((dir) => {
      const tmp = path.join(dir, "tmp");
      fs.mkdirSync(tmp);
      const dataDir = makeLive(dir);
      const good = makeSnapshot(dir, "good-snap");
      const bad = makeSnapshot(dir, "bad-snap", 'CREATE TABLE "api_keys x" (x);');
      const probe = copyProbe(dir);
      const env = { ...probe.env, DATA_DIR: dataDir, TMPDIR: tmp };

      // umask 022 so a copy that only inherits the umask would be world-readable.
      const ok = runScriptWithUmask("022", "restore-policies.sh", [good, "--yes"], env);
      const refused = runScript("restore-policies.sh", [bad, "--yes"], env);

      assert.equal(ok.status, 0, `restore failed: ${ok.stderr}`);
      assert.notEqual(refused.status, 0);
      assert.deepEqual(probe.seen(), [["drwx------", "-rw-------"]]);
      assert.deepEqual(fs.readdirSync(tmp), []);
    });
  });

  it("makes the copy of the snapshot's WAL file owner-only too", { skip }, () => {
    withWorkdir((dir) => {
      const tmp = path.join(dir, "tmp");
      fs.mkdirSync(tmp);
      const dataDir = makeLive(dir);
      const snap = makeWalSnapshot(dir);
      const probe = copyProbe(dir, "first");

      const r = runScriptWithUmask("022", "restore-policies.sh", [snap, "--yes"], {
        ...probe.env,
        DATA_DIR: dataDir,
        TMPDIR: tmp,
      });

      assert.equal(r.status, 0, `restore failed: ${r.stderr}`);
      assert.equal(liveName(dataDir), "snap");
      assert.deepEqual(probe.seen(), [["drwx------", "-rw-------", "-rw-------"]]);
    });
  });

  // The safety snapshot of the live DB is written after the copy, so it must
  // get the caller's umask back, not 077 and not a fixed value. SQLite creates
  // files with at most 0644.
  for (const [umask, dirMode, fileMode] of [
    ["000", "777", "644"],
    ["022", "755", "644"],
    ["027", "750", "640"],
    ["077", "700", "600"],
  ] as const) {
    it(`writes the safety snapshot under the caller's umask ${umask}`, { skip }, () => {
      withWorkdir((dir) => {
        const dataDir = makeLive(dir);
        const snap = makeSnapshot(dir, "plain-snap");

        const r = runScriptWithUmask(umask, "restore-policies.sh", [snap, "--yes"], {
          DATA_DIR: dataDir,
        });

        assert.equal(r.status, 0, `restore failed: ${r.stderr}`);
        const backups = path.join(dataDir, "db_backups");
        const safety = fs.readdirSync(backups).find((d) => d.startsWith("pre-policy-restore_"));
        assert.ok(safety, "safety snapshot dir missing");
        const mode = (p: string) => (fs.statSync(p).mode & 0o777).toString(8);
        assert.equal(mode(backups), dirMode, "db_backups");
        assert.equal(mode(path.join(backups, safety)), dirMode, "safety snapshot dir");
        assert.equal(mode(path.join(backups, safety, "storage.sqlite")), fileMode, "safety copy");
      });
    });
  }

  it("stops before writing anything when TMPDIR is unusable", { skip }, () => {
    withWorkdir((dir) => {
      const dataDir = makeLive(dir);
      const snap = makeSnapshot(dir, "plain-snap");

      const r = runScript("restore-policies.sh", [snap, "--yes"], {
        DATA_DIR: dataDir,
        TMPDIR: path.join(dir, "missing"),
      });

      assert.notEqual(r.status, 0, "restore must fail when its copy cannot be made");
      assert.equal(liveName(dataDir), "live");
      assert.equal(fs.existsSync(path.join(dataDir, "db_backups")), false);
    });
  });

  // A cp shim fails for one file, like a full $TMPDIR or an unreadable WAL.
  // Losing only the WAL would restore the older rows in storage.sqlite.
  for (const file of ["storage.sqlite", "storage.sqlite-wal"]) {
    it(`stops before writing anything when copying ${file} fails`, { skip }, () => {
      withWorkdir((dir) => {
        const tmp = path.join(dir, "tmp");
        fs.mkdirSync(tmp);
        const dataDir = makeLive(dir);
        const snap = makeWalSnapshot(dir);
        const shim = path.join(dir, "cp-shim");
        fs.mkdirSync(shim);
        const realCp = spawnSync("bash", ["-c", "command -v cp"], { encoding: "utf8" });
        fs.writeFileSync(
          path.join(shim, "cp"),
          "#!/usr/bin/env bash\n" +
            'case "$1" in */"$FAIL_COPY") echo "cp: simulated failure" >&2; exit 1 ;; esac\n' +
            'exec "$REAL_CP" "$@"\n',
          { mode: 0o755 }
        );

        const r = runScript("restore-policies.sh", [snap, "--yes"], {
          DATA_DIR: dataDir,
          TMPDIR: tmp,
          PATH: `${shim}${path.delimiter}${process.env.PATH}`,
          REAL_CP: realCp.stdout.trim(),
          FAIL_COPY: file,
        });

        assert.notEqual(r.status, 0, "restore must fail when the copy fails");
        assert.ok(r.stderr.includes(`ERROR: cannot copy ${path.join(snap, file)} `), r.stderr);
        assert.equal(liveName(dataDir), "live", "live api_keys must be left alone");
        assert.equal(fs.existsSync(path.join(dataDir, "db_backups")), false);
        assert.deepEqual(fs.readdirSync(tmp), []);
      });
    });
  }
});
