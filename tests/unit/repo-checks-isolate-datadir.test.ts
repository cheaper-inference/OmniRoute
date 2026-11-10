import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * Repository quality checks must not open the operator database.
 *
 * The three checks load application modules whose import opens SQLite. Outside
 * a test context they resolve the default data directory, so running them on a
 * machine where the instance runs migrates and prunes the live database. Each
 * check now loads the existing test isolation first, which fills in a
 * throwaway DATA_DIR when none was chosen.
 */

const REPO_ROOT = process.cwd();
const BUN_BIN = path.join(REPO_ROOT, "node_modules", ".bin", "bun");

function checkScriptFiles(): Array<{ name: string; file: string }> {
  const pkg = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "package.json"), "utf8")) as {
    scripts: Record<string, string>;
  };
  const out: Array<{ name: string; file: string }> = [];
  const seen = new Set<string>();
  for (const [name, command] of Object.entries(pkg.scripts ?? {})) {
    if (!name.startsWith("check:")) continue;
    const match = /(?:^|\s)(scripts\/[^\s"']+?\.(?:ts|mjs|js|cjs))/.exec(command);
    if (!match) continue;
    const file = match[1];
    const key = `${name} ${file}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ name, file });
  }
  out.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  return out;
}

const CHECK_KNOWN_SYMBOLS = "scripts/check/check-known-symbols.ts";
const CHECK_COMPRESSION_BUDGET = "scripts/check/check-compression-budget.ts";
const CHECK_ROUTE_GUARD = "scripts/check/check-route-guard-membership.ts";

function trackTempDir(dirs: string[]): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-checks-"));
  dirs.push(dir);
  return dir;
}

test.after(() => {});

const TEMP_DIRS: string[] = [];
test.after(() => {
  for (const dir of TEMP_DIRS) {
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

function makeFakeHome(): { scratch: string; fakeHome: string } {
  const scratch = trackTempDir(TEMP_DIRS);
  const fakeHome = path.join(scratch, "home");
  const dataDir = path.join(fakeHome, ".omniroute");
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(path.join(dataDir, "storage.sqlite"), "sentinel-bytes-do-not-open");
  fs.writeFileSync(path.join(dataDir, "sentinel.txt"), "sentinel");
  return { scratch, fakeHome };
}

function scrubbedEnv(
  fakeHome: string,
  overrides: Record<string, string | undefined> = {}
): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...process.env };
  env.HOME = fakeHome;
  env.USERPROFILE = fakeHome;
  delete env.XDG_CONFIG_HOME;
  delete env.APPDATA;
  delete env.DATA_DIR;
  env.NODE_ENV = "production";
  env.VITEST = "";
  env.NODE_TEST_CONTEXT = "";
  env.OMNIROUTE_ALLOW_DEFAULT_DATA_DIR = "";
  env.XDG_CACHE_HOME = path.join(fakeHome, ".cache");
  env.BUN_INSTALL = path.join(fakeHome, ".bun");
  for (const [key, value] of Object.entries(overrides)) {
    if (value === undefined) delete env[key];
    else env[key] = value;
  }
  if (!("DATA_DIR" in overrides)) delete env.DATA_DIR;
  return env;
}

type Manifest = Map<string, string>;

function snapshotDataDir(fakeHome: string): Manifest {
  const root = path.join(fakeHome, ".omniroute");
  const out: Manifest = new Map();
  const walk = (dir: string): void => {
    let entries: string[];
    try {
      entries = fs.readdirSync(dir);
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(dir, entry);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else {
        const content = fs.readFileSync(full);
        const hash = crypto.createHash("sha256").update(content).digest("hex");
        out.set(path.relative(root, full), `${stat.size}:${Math.floor(stat.mtimeMs)}:${hash}`);
      }
    }
  };
  walk(root);
  return out;
}

function assertManifestEqual(before: Manifest, after: Manifest, label: string): void {
  const beforeKeys = [...before.keys()].sort();
  const afterKeys = [...after.keys()].sort();
  assert.deepEqual(
    afterKeys,
    beforeKeys,
    `${label}: files created or removed under the default data dir`
  );
  for (const key of beforeKeys) {
    assert.equal(
      after.get(key),
      before.get(key),
      `${label}: ${key} modified under the default data dir`
    );
  }
}

function runCheck(
  command: string,
  args: string[],
  fakeHome: string,
  overrides: Record<string, string | undefined> = {}
): { status: number | null; stdout: string; stderr: string } {
  const result = spawnSync(command, args, {
    cwd: REPO_ROOT,
    encoding: "utf8",
    timeout: 300000,
    env: scrubbedEnv(fakeHome, overrides),
  });
  return { status: result.status, stdout: result.stdout ?? "", stderr: result.stderr ?? "" };
}

test("known-symbols check leaves the default data dir untouched", () => {
  const { fakeHome } = makeFakeHome();
  const before = snapshotDataDir(fakeHome);
  const result = runCheck(BUN_BIN, [CHECK_KNOWN_SYMBOLS], fakeHome);
  assert.equal(result.status, 0, result.stderr);
  assertManifestEqual(before, snapshotDataDir(fakeHome), "check:known-symbols");
});

test("compression-budget check leaves the default data dir untouched", () => {
  const { fakeHome } = makeFakeHome();
  const before = snapshotDataDir(fakeHome);
  const result = runCheck(BUN_BIN, [CHECK_COMPRESSION_BUDGET], fakeHome);
  assert.equal(result.status, 0, result.stderr);
  assertManifestEqual(before, snapshotDataDir(fakeHome), "check:compression-budget");
});

test("route-guard-membership check leaves the default data dir untouched", () => {
  const { fakeHome } = makeFakeHome();
  const before = snapshotDataDir(fakeHome);
  const result = runCheck(process.execPath, ["--import", "tsx", CHECK_ROUTE_GUARD], fakeHome);
  assert.equal(result.status, 0, result.stderr);
  assertManifestEqual(before, snapshotDataDir(fakeHome), "check:route-guard-membership");
});

test("explicit DATA_DIR is used as is", () => {
  const { fakeHome } = makeFakeHome();
  const explicit = path.join(trackTempDir(TEMP_DIRS), "explicit-data");
  fs.mkdirSync(explicit, { recursive: true });
  const before = snapshotDataDir(fakeHome);
  for (const [command, args] of [
    [BUN_BIN, [CHECK_KNOWN_SYMBOLS]],
    [BUN_BIN, [CHECK_COMPRESSION_BUDGET]],
    [process.execPath, ["--import", "tsx", CHECK_ROUTE_GUARD]],
  ] as Array<[string, string[]]>) {
    const result = runCheck(command, args, fakeHome, { DATA_DIR: explicit });
    assert.equal(result.status, 0, `${command} ${args.join(" ")}: ${result.stderr}`);
  }
  assertManifestEqual(before, snapshotDataDir(fakeHome), "explicit DATA_DIR");
  assert.ok(
    fs.existsSync(path.join(explicit, "storage.sqlite")),
    "the explicit DATA_DIR holds the database, not the default dir"
  );
});

test("blank DATA_DIR is treated as unset", () => {
  const { fakeHome } = makeFakeHome();
  const before = snapshotDataDir(fakeHome);
  const result = runCheck(BUN_BIN, [CHECK_KNOWN_SYMBOLS], fakeHome, { DATA_DIR: "   " });
  assert.equal(result.status, 0, result.stderr);
  assertManifestEqual(before, snapshotDataDir(fakeHome), "blank DATA_DIR");
});

test("isolation fills in a throwaway DATA_DIR when none is chosen", () => {
  const script = [
    'await import("./tests/_setup/isolateDataDir.ts");',
    "console.log('ISOLATED_DATA_DIR=' + process.env.DATA_DIR);",
  ].join("\n");
  const { fakeHome } = makeFakeHome();
  const result = spawnSync(
    process.execPath,
    ["--import", "tsx", "--input-type=module", "-e", script],
    {
      cwd: REPO_ROOT,
      encoding: "utf8",
      timeout: 300000,
      env: scrubbedEnv(fakeHome),
    }
  );
  assert.equal(result.status, 0, result.stderr);
  const line = result.stdout.split("\n").find((entry) => entry.startsWith("ISOLATED_DATA_DIR="));
  const isolated = line?.slice("ISOLATED_DATA_DIR=".length) ?? "";
  assert.ok(
    path.resolve(isolated).startsWith(`${path.resolve(os.tmpdir())}${path.sep}`),
    `expected a throwaway temp dir, got ${isolated}`
  );
  assert.ok(
    path.basename(isolated).startsWith("omniroute-test-"),
    `unexpected prefix: ${isolated}`
  );
  assert.notEqual(path.resolve(isolated), path.join(fakeHome, ".omniroute"));
  fs.rmSync(isolated, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the default data dir opt-out resolves the operator dir", () => {
  const { fakeHome } = makeFakeHome();
  const script = [
    'const { resolveWritableDataDir } = await import("./src/lib/dataPaths.ts");',
    "console.log('RESOLVED_DATA_DIR=' + resolveWritableDataDir());",
  ].join("\n");
  const result = spawnSync(
    process.execPath,
    ["--import", "tsx", "--input-type=module", "-e", script],
    {
      cwd: REPO_ROOT,
      encoding: "utf8",
      timeout: 300000,
      env: scrubbedEnv(fakeHome, { OMNIROUTE_ALLOW_DEFAULT_DATA_DIR: "1" }),
    }
  );
  assert.equal(result.status, 0, result.stderr);
  const line = result.stdout.split("\n").find((entry) => entry.startsWith("RESOLVED_DATA_DIR="));
  const resolved = line?.slice("RESOLVED_DATA_DIR=".length) ?? "";
  assert.equal(path.resolve(resolved), path.join(fakeHome, ".omniroute"));
});

const STATIC_IMPORT_LINE = /^\s*import\b(?!\s*type\b)(?!\s*\()[\s\S]*?\bfrom\s*["']([^"']+)["']/;
const EXPORT_FROM_LINE = /^\s*export\b[\s\S]*?\bfrom\s*["']([^"']+)["']/;

function findStaticAppImports(source: string, filePath: string): string[] {
  const hits: string[] = [];
  const lines = source.split("\n");
  let block = "";
  let inBlock = false;
  const flush = (statement: string): void => {
    const match = statement.match(STATIC_IMPORT_LINE) ?? statement.match(EXPORT_FROM_LINE);
    if (!match) return;
    const specifier = match[1];
    if (specifier.startsWith("node:")) return;
    if (specifier.startsWith("scripts/check/lib/")) return;
    if (
      specifier.startsWith("src/") ||
      specifier.startsWith("open-sse/") ||
      specifier.startsWith("bin/") ||
      specifier.startsWith("electron/") ||
      specifier.startsWith("@/") ||
      specifier.startsWith("@omniroute/")
    ) {
      hits.push(`${filePath}: ${specifier}`);
      return;
    }
    if (specifier.startsWith(".")) {
      const resolved = path.normalize(path.join(path.dirname(filePath), specifier));
      if (
        resolved === "src" ||
        resolved.startsWith("src/") ||
        resolved === "open-sse" ||
        resolved.startsWith("open-sse/") ||
        resolved === "bin" ||
        resolved.startsWith("bin/") ||
        resolved === "electron" ||
        resolved.startsWith("electron/")
      ) {
        hits.push(`${filePath}: ${specifier}`);
      }
    }
  };
  for (const line of lines) {
    if (!inBlock && /^\s*(import|export)\b/.test(line)) {
      inBlock = true;
      block = line;
      if (/(["'];?\s*)$/.test(line.trim()) || /from\s*["'][^"']*["']\s*;?\s*$/.test(line)) {
        flush(block);
        inBlock = false;
        block = "";
      }
      continue;
    }
    if (inBlock) {
      block += `\n${line}`;
      if (/from\s*["'][^"']*["']\s*;?\s*$/.test(line)) {
        flush(block);
        inBlock = false;
        block = "";
      }
      continue;
    }
  }
  return hits;
}

test("check scripts run in an isolated data directory", () => {
  const entries = checkScriptFiles();
  assert.ok(entries.length > 0, "expected check:* scripts in package.json");
  const names = entries.map((entry) => entry.name);
  for (const expected of [
    "check:known-symbols",
    "check:compression-budget",
    "check:route-guard-membership",
  ]) {
    assert.ok(
      names.includes(expected),
      `expected ${expected} in package.json, got ${names.join(", ")}`
    );
  }
  // Checks that statically import application modules but predate this
  // isolation and stay outside its scope. Each entry names the check and the
  // reason it stays unisolated; remove an entry once the check is isolated.
  // Any check outside this list that loads application modules without
  // isolation fails below, named.
  const grandfathered = new Set([
    // Pure version pins and header profiles: no database access on import.
    "check:cli-fingerprint-drift scripts/check/check-cli-fingerprint-drift.ts",
    // Pure runtime range tables: no database access on import.
    "check:node-runtime scripts/check/check-supported-node-runtime.ts",
    // A budget table plus a JSON snapshot: no database access on import.
    "check:nvidia-catalog-drift scripts/check/check-nvidia-catalog-drift.ts",
    // Reads the provider registry and catalog: no database access on import.
    "check:provider-consistency scripts/check/check-provider-consistency.ts",
  ]);
  const offenders: string[] = [];
  for (const { name, file } of entries) {
    const source = fs.readFileSync(path.join(REPO_ROOT, file), "utf8");
    if (findStaticAppImports(source, file).length > 0 && !source.includes("isolateDataDir")) {
      offenders.push(`${name} ${file}`);
    }
  }
  const unexpected = offenders.filter((entry) => !grandfathered.has(entry));
  assert.deepEqual(
    unexpected,
    [],
    `checks load application modules without isolation: ${unexpected.join(", ")}`
  );
  const stale = [...grandfathered].filter((entry) => !offenders.includes(entry));
  assert.deepEqual(
    stale,
    [],
    `checks listed above are now isolated, remove them: ${stale.join(", ")}`
  );
});

test("no check under test loads application modules through a static import", () => {
  const offenders: string[] = [];
  for (const check of [CHECK_KNOWN_SYMBOLS, CHECK_COMPRESSION_BUDGET, CHECK_ROUTE_GUARD]) {
    const source = fs.readFileSync(path.join(REPO_ROOT, check), "utf8");
    offenders.push(...findStaticAppImports(source, check));
  }
  assert.deepEqual(
    offenders,
    [],
    `static application imports reach past isolation: ${offenders.join(", ")}`
  );
});

test("the static import scan names an unisolated check", () => {
  const source = [
    'import { isLocalOnlyPath } from "@/server/authz/routeGuard.ts";',
    "",
    "export function run(): boolean {",
    "  return isLocalOnlyPath('/api/x');",
    "}",
    "",
    "function main(): void {",
    "  run();",
    "}",
  ].join("\n");
  const hits = findStaticAppImports(source, "scripts/check/check-fake.ts");
  assert.equal(hits.length, 1, `expected the scan to name the file, got ${JSON.stringify(hits)}`);
  assert.ok(hits[0].includes("scripts/check/check-fake.ts"));
});
