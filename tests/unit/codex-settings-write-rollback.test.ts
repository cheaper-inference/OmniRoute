import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

/**
 * Applying Codex settings writes config.toml and then the key into ~/.codex/.env. If the second
 * write fails, the first must not stay behind: new routing with old auth is a broken pair. The
 * failure is forced with a dangling .env symlink (it reads as absent, but the write cannot
 * create its target). A crash between the two writes is not covered.
 */

const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omr-codex-rollback-"));
const TEST_HOME = path.join(TEST_ROOT, "fake-home");
const CODEX_DIR = path.join(TEST_HOME, ".codex");
const CONFIG_PATH = path.join(CODEX_DIR, "config.toml");
const ENV_PATH = path.join(CODEX_DIR, ".env");
const DANGLING_TARGET = path.join(TEST_ROOT, "no-such-dir", "target.env");
fs.mkdirSync(CODEX_DIR, { recursive: true });

const originalHome = os.homedir;
const originalDataDir = process.env.DATA_DIR;
const originalJwtSecret = process.env.JWT_SECRET;
const originalWriteFlag = process.env.CLI_ALLOW_CONFIG_WRITES;

os.homedir = () => TEST_HOME;
process.env.DATA_DIR = path.join(TEST_ROOT, "data");
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "codex-rollback-api-secret";
process.env.CLI_ALLOW_CONFIG_WRITES = "true";

const core = await import("../../src/lib/db/core.ts");
const route = await import("../../src/app/api/cli-tools/codex-settings/route.ts");

test.after(() => {
  core.resetDbInstance();
  os.homedir = originalHome;
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  if (originalJwtSecret === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = originalJwtSecret;
  if (originalWriteFlag === undefined) delete process.env.CLI_ALLOW_CONFIG_WRITES;
  else process.env.CLI_ALLOW_CONFIG_WRITES = originalWriteFlag;
  fs.rmSync(TEST_ROOT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const post = async () => {
  process.env.JWT_SECRET = "codex-rollback-api-jwt";
  const token = await new SignJWT({ authenticated: true, sub: "codex-rollback-test" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return route.POST(
    new Request("http://localhost/api/cli-tools/codex-settings", {
      method: "POST",
      headers: { cookie: `auth_token=${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        baseUrl: "http://localhost:20128/api/v1",
        model: "gpt-5.6-sol",
        apiKey: "new-key-value",
      }),
    })
  );
};

const OLD_CONFIG = 'model = "old-model"\n\n[mcp_servers.keep]\ncommand = "keep-me"\n';
const OLD_ENV = "OMNIROUTE_API_KEY=old-key-value\n";
const breakEnvWrite = () => {
  fs.rmSync(ENV_PATH, { force: true });
  fs.symlinkSync(DANGLING_TARGET, ENV_PATH);
};
const canBreakEnvWrite = (t: { skip: (m: string) => void }) => {
  if (process.platform !== "win32") return true;
  t.skip("symlinks need privileges on Windows, so the write cannot be made to fail this way");
  return false;
};

test("a failed .env write puts config.toml back", async (t) => {
  if (!canBreakEnvWrite(t)) return;
  fs.writeFileSync(CONFIG_PATH, OLD_CONFIG);
  breakEnvWrite();

  const response = await post();

  assert.equal(response.status, 500);
  assert.equal(fs.readFileSync(CONFIG_PATH, "utf8"), OLD_CONFIG, "config.toml must be restored");
  assert.equal(fs.existsSync(DANGLING_TARGET), false, "the failed write must create nothing");
});

test("both files are written when nothing fails", async () => {
  fs.rmSync(ENV_PATH, { force: true });
  fs.writeFileSync(CONFIG_PATH, OLD_CONFIG);
  fs.writeFileSync(ENV_PATH, OLD_ENV);

  const response = await post();

  assert.equal(response.status, 200);
  assert.match(fs.readFileSync(CONFIG_PATH, "utf8"), /gpt-5\.6-sol/);
  assert.equal(fs.readFileSync(ENV_PATH, "utf8"), "OMNIROUTE_API_KEY=new-key-value\n");
});

test("a failed write on a first-time setup removes the config.toml it created", async (t) => {
  if (!canBreakEnvWrite(t)) return;
  fs.rmSync(CONFIG_PATH, { force: true });
  breakEnvWrite();

  const response = await post();

  assert.equal(response.status, 500);
  assert.equal(fs.existsSync(CONFIG_PATH), false, "a config.toml that did not exist must not stay");
});
