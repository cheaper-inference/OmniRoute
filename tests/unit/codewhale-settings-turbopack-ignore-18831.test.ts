/**
 * /api/cli-tools/codewhale-settings — Turbopack tracing marks (#18831).
 *
 * The route builds its config paths from process.env.HOME and reads them at
 * runtime. Without `/* turbopackIgnore: true *\/` on those expressions, the
 * Turbopack file tracer tries to resolve them during `next build`. The marks
 * only exist at build time, so the second half pins that the resolved paths
 * did not move: HOME when it is set, a literal "~" segment when it is not.
 *
 * Runs against a throwaway HOME + DATA_DIR, never the real `~/.codewhale`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ROUTE_FILE = path.join(
  process.cwd(),
  "src",
  "app",
  "api",
  "cli-tools",
  "codewhale-settings",
  "route.ts"
);

const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omr-codewhale-tp-"));
const TEST_HOME = path.join(TEST_ROOT, "home");
const TEST_CWD = path.join(TEST_ROOT, "cwd");
const TEST_DATA_DIR = path.join(TEST_ROOT, "data");
fs.mkdirSync(TEST_HOME, { recursive: true });
fs.mkdirSync(TEST_CWD, { recursive: true });

const originalCwd = process.cwd();
const originalHomedir = os.homedir;
const savedEnv: Record<string, string | undefined> = {};
const ENV_OVERRIDES: Record<string, string | undefined> = {
  HOME: TEST_HOME,
  USERPROFILE: TEST_HOME,
  DATA_DIR: TEST_DATA_DIR,
  API_KEY_SECRET: "codewhale-tp-api-secret",
  JWT_SECRET: "codewhale-tp-jwt-secret",
  INITIAL_PASSWORD: undefined,
  CLI_CONFIG_HOME: undefined,
  CLI_ALLOW_CONFIG_WRITES: undefined,
};
for (const [key, value] of Object.entries(ENV_OVERRIDES)) {
  savedEnv[key] = process.env[key];
  if (value === undefined) delete process.env[key];
  else process.env[key] = value;
}
os.homedir = () => TEST_HOME;

const core = await import("../../src/lib/db/core.ts");
const { DELETE } = await import("../../src/app/api/cli-tools/codewhale-settings/route.ts");

const IGNORE_MARK = /^\s*\/\* turbopackIgnore: true \*\/\s*/;

function writeLegacyConfig(root: string): string {
  const legacyPath = path.join(root, ".deepseek", "config.toml");
  fs.mkdirSync(path.dirname(legacyPath), { recursive: true });
  fs.writeFileSync(legacyPath, "# managed by OmniRoute\n");
  return legacyPath;
}

async function deleteSettings(): Promise<void> {
  const res = await DELETE(
    new Request("http://localhost/api/cli-tools/codewhale-settings", { method: "DELETE" })
  );
  assert.equal(res.status, 200);
}

test.after(() => {
  process.chdir(originalCwd);
  core.resetDbInstance();
  os.homedir = originalHomedir;
  for (const [key, value] of Object.entries(savedEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  fs.rmSync(TEST_ROOT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("every HOME-based path.join carries the mark on its first argument", () => {
  const source = fs.readFileSync(ROUTE_FILE, "utf8");
  const joins = [...source.matchAll(/path\.join\(([^)]*process\.env\.HOME[^)]*)\)/g)];

  assert.equal(joins.length, 2, "expected the primary and the legacy config path");
  for (const [, args] of joins) {
    assert.match(args, IGNORE_MARK);
    assert.ok(args.replace(IGNORE_MARK, "").startsWith("process.env.HOME"), args);
  }
});

test("the runtime config read carries the mark on its path argument", () => {
  const source = fs.readFileSync(ROUTE_FILE, "utf8");
  const reads = [...source.matchAll(/fs\.readFile\(([^)]*)\)/g)];

  assert.equal(reads.length, 1, "expected the single candidate read in readConfig()");
  assert.match(reads[0][1], IGNORE_MARK);
});

test("the legacy config path resolves under HOME when HOME is set", async () => {
  const legacyPath = writeLegacyConfig(TEST_HOME);

  await deleteSettings();

  assert.equal(fs.existsSync(legacyPath), false);
});

test('the legacy config path falls back to a literal "~" segment when HOME is unset', async () => {
  const homeLegacyPath = writeLegacyConfig(TEST_HOME);
  const tildeLegacyPath = writeLegacyConfig(path.join(TEST_CWD, "~"));

  delete process.env.HOME;
  process.chdir(TEST_CWD);
  try {
    await deleteSettings();
  } finally {
    process.chdir(originalCwd);
    process.env.HOME = TEST_HOME;
  }

  assert.equal(fs.existsSync(tildeLegacyPath), false);
  assert.equal(fs.existsSync(homeLegacyPath), true);
});
