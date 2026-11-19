// Regression guard: every table the runtime creates with `CREATE TABLE IF NOT EXISTS` must also
// be created by a migration, unless this file lists it with a proof that it is not a landmine.
//
// A table created lazily inside a feature code path exists or not depending on whether that
// feature ran, so a clean install and an upgraded install diverge by TIMING.
// check:install-upgrade (scripts/check/check-install-upgrade.mjs) fails on that divergence,
// but only at npm publish time: it stopped the 3.8.54 publish on compression_run_telemetry
// (#20511), after model_capabilities had done the same on 3.8.50. This scan runs in
// milliseconds and fails on the PR that adds the next lazy CREATE.
//
// Fix for a failure: create the table through a migration (`npm run db:new-migration -- <name>`)
// with the same DDL as the lazy CREATE and keep the lazy CREATE as the self-heal path. See
// src/lib/db/migrations/20261118120853_compression_run_telemetry.sql. Add an entry below only
// when the CREATE provably runs on EVERY boot, and name the boot call site.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const MIGRATIONS_DIR = path.join(REPO_ROOT, "src", "lib", "db", "migrations");
const SCAN_ROOTS = ["src", "open-sse"];
const ALLOWLIST_PATH = path.join(REPO_ROOT, "config", "quality", "install-upgrade-allowlist.json");

/**
 * Tables created at runtime on every boot, before check:install-upgrade reads the schema, so a
 * clean and an upgraded install always both have them. `callSite` must contain `contains`.
 */
const BOOT_TIME_TABLES: Record<string, { why: string; callSite: string; contains: string }> = {
  _omniroute_migrations: {
    why: "the migration ledger itself; getDbInstance() creates it before runMigrations()",
    callSite: "src/lib/db/core.ts",
    contains: "CREATE TABLE IF NOT EXISTS _omniroute_migrations",
  },
  domain_budget_reset_logs: {
    why: "part of core.ts SCHEMA_SQL, which getDbInstance() runs on every open via SCHEMA_TABLES_SQL",
    callSite: "src/lib/db/core.ts",
    contains: "db.exec(SCHEMA_TABLES_SQL);",
  },
  audit_log: {
    why: "registerNodejs() calls initAuditLog() unconditionally on every server boot",
    callSite: "src/instrumentation-node.ts",
    contains: "initAuditLog();",
  },
};

/**
 * DDL that no runtime path executes: the module that holds it has no importer, so no install
 * has these tables. If someone wires the module up, `module` gains an importer, this guard fails,
 * and the tables need a migration before they ship.
 */
const DORMANT_TABLES: Record<string, { why: string; module: string }> = {
  model_assessments: {
    why: "runAssessmentMigration() is never called",
    module: "src/domain/assessment/migration.ts",
  },
  assessment_runs: {
    why: "runAssessmentMigration() is never called",
    module: "src/domain/assessment/migration.ts",
  },
  combo_health: {
    why: "runAssessmentMigration() is never called",
    module: "src/domain/assessment/migration.ts",
  },
  heal_actions: {
    why: "runAssessmentMigration() is never called",
    module: "src/domain/assessment/migration.ts",
  },
  prompt_templates: {
    why: "nothing imports the prompt-template store",
    module: "src/lib/db/prompts.ts",
  },
};

type RuntimeCreate = { table: string; file: string; line: number };

const CREATE_RE = /CREATE\s+TABLE\s+IF\s+NOT\s+EXISTS\s+["`]?(\$\{\s*(\w+)\s*\}|[A-Za-z_]\w*)/gi;

function lineOf(source: string, index: number): number {
  return source.slice(0, index).split("\n").length;
}

/** Runtime `CREATE TABLE IF NOT EXISTS` statements in one source file. */
function findRuntimeCreates(file: string, source: string): RuntimeCreate[] {
  const creates: RuntimeCreate[] = [];
  for (const match of source.matchAll(CREATE_RE)) {
    let table = match[1];
    const constName = match[2];
    if (constName) {
      // `CREATE TABLE IF NOT EXISTS ${TABLE}` — resolve the constant from the same file.
      const resolved = new RegExp(`const\\s+${constName}\\s*=\\s*["'\`](\\w+)["'\`]`).exec(source);
      table = resolved ? resolved[1] : `<unresolved \${${constName}}>`;
    }
    creates.push({ table, file, line: lineOf(source, match.index ?? 0) });
  }
  return creates;
}

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "__tests__") continue;
      walk(full, out);
    } else if (/\.(ts|tsx|js|mjs|cjs)$/.test(entry.name) && !/\.test\.\w+$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

type SourceFile = { rel: string; abs: string; source: string };

let sourceCache: SourceFile[] | null = null;

/** Every runtime source file under src/, open-sse/, bin/ and electron/, read once. */
function sourceFiles(): SourceFile[] {
  if (!sourceCache) {
    sourceCache = ["src", "open-sse", "bin", "electron"]
      .filter((root) => fs.existsSync(path.join(REPO_ROOT, root)))
      .flatMap((root) => walk(path.join(REPO_ROOT, root)))
      .map((abs) => ({
        abs,
        rel: path.relative(REPO_ROOT, abs),
        source: fs.readFileSync(abs, "utf8"),
      }));
  }
  return sourceCache;
}

let createsCache: RuntimeCreate[] | null = null;

function runtimeCreates(): RuntimeCreate[] {
  if (!createsCache) {
    createsCache = sourceFiles()
      .filter(
        ({ rel, abs }) =>
          SCAN_ROOTS.includes(rel.split(path.sep)[0]) && !abs.startsWith(MIGRATIONS_DIR + path.sep)
      )
      .filter(({ source }) => /CREATE\s+TABLE/i.test(source))
      .flatMap(({ rel, source }) => findRuntimeCreates(rel, source));
  }
  return createsCache;
}

function migrationTables(): Set<string> {
  const tables = new Set<string>();
  for (const file of fs.readdirSync(MIGRATIONS_DIR)) {
    if (!file.endsWith(".sql")) continue;
    const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), "utf8");
    for (const match of sql.matchAll(
      /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?["`]?([A-Za-z_]\w*)/gi
    )) {
      tables.add(match[1]);
    }
  }
  return tables;
}

function residualTables(): Set<string> {
  const allowlist = JSON.parse(fs.readFileSync(ALLOWLIST_PATH, "utf8")) as {
    residualTables?: Record<string, string>;
  };
  return new Set(Object.keys(allowlist.residualTables ?? {}));
}

/** Runtime-created tables with no migration and no justified entry: the landmines. */
function landmines(
  creates: RuntimeCreate[],
  migrated: Set<string>,
  residual: Set<string>
): RuntimeCreate[] {
  return creates.filter(
    ({ table }) =>
      !migrated.has(table) &&
      !(table in BOOT_TIME_TABLES) &&
      !(table in DORMANT_TABLES) &&
      !residual.has(table)
  );
}

function importersOf(modulePath: string): string[] {
  const stem = modulePath.replace(/\.(ts|tsx)$/, "");
  const alias = stem.replace(/^src\//, "@/");
  const basename = path.basename(stem);
  const importers: string[] = [];
  for (const { rel, abs, source } of sourceFiles()) {
    if (rel === modulePath || !source.includes(basename)) continue;
    for (const match of source.matchAll(/(?:from\s+|import\s*\(\s*)["']([^"']+)["']/g)) {
      const specifier = match[1].replace(/\.(ts|tsx|js)$/, "");
      const resolved = specifier.startsWith(".")
        ? path.relative(REPO_ROOT, path.resolve(path.dirname(abs), specifier))
        : specifier;
      if (resolved === stem || specifier === alias) importers.push(rel);
    }
  }
  return importers;
}

test("every runtime CREATE TABLE IF NOT EXISTS is backed by a migration or a justified entry", () => {
  const creates = runtimeCreates();
  assert.ok(creates.length > 20, `the scan found only ${creates.length} runtime CREATEs`);
  const found = landmines(creates, migrationTables(), residualTables()).map(
    ({ table, file, line }) => `${table} (${file}:${line})`
  );
  assert.deepEqual(
    found,
    [],
    "tables created lazily at runtime without a migration — a clean install and an upgrade " +
      "will diverge by timing and check:install-upgrade will stop the npm publish. Add a " +
      "migration with the same DDL (npm run db:new-migration -- <name>)."
  );
});

test("the guard flags a new lazy CREATE and resolves constant table names", () => {
  const source = [
    'const TABLE = "tier_config";',
    "db.exec(`CREATE TABLE IF NOT EXISTS ${TABLE} (key TEXT)`);",
    "db.exec(`CREATE TABLE IF NOT EXISTS brand_new_feature_table (id INTEGER)`);",
    "// `CREATE TABLE IF NOT EXISTS` in a comment names no table",
  ].join("\n");
  const creates = findRuntimeCreates("src/lib/fake.ts", source);
  assert.deepEqual(
    creates.map((c) => c.table),
    ["tier_config", "brand_new_feature_table"]
  );
  assert.deepEqual(
    landmines(creates, new Set(["tier_config"]), new Set()).map((c) => `${c.file}:${c.line}`),
    ["src/lib/fake.ts:3"]
  );
});

test("boot-time entries still match a runtime CREATE and their boot call site", () => {
  const created = new Set(runtimeCreates().map((c) => c.table));
  for (const [table, entry] of Object.entries(BOOT_TIME_TABLES)) {
    assert.ok(created.has(table), `${table}: no runtime CREATE left — drop the stale entry`);
    const source = fs.readFileSync(path.join(REPO_ROOT, entry.callSite), "utf8");
    assert.ok(
      source.includes(entry.contains),
      `${table}: ${entry.callSite} no longer contains "${entry.contains}" (${entry.why})`
    );
  }
});

test("dormant entries still have a runtime CREATE and their module still has no importer", () => {
  const creates = runtimeCreates();
  for (const [table, entry] of Object.entries(DORMANT_TABLES)) {
    assert.ok(
      creates.some((c) => c.table === table && c.file === entry.module),
      `${table}: no CREATE left in ${entry.module} — drop the stale entry`
    );
    assert.deepEqual(
      importersOf(entry.module),
      [],
      `${entry.module} is imported now, so ${table} can be created at runtime (${entry.why} ` +
        "no longer holds): create it through a migration and remove the entry"
    );
  }
});
