import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

/**
 * Applying Codex settings writes config.toml and then auth.json. If the second write fails,
 * the first must not stay behind: new routing with old auth is a broken pair. The failure is
 * forced with a read-only auth.json (it reads fine, so the clobber guard does not fire; only
 * the write fails). A crash between the two writes is not covered.
 */

const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omr-codex-rollback-"));
const TEST_HOME = path.join(TEST_ROOT, "fake-home");
const CODEX_DIR = path.join(TEST_HOME, ".codex");
const CONFIG_PATH = path.join(CODEX_DIR, "config.toml");
const AUTH_PATH = path.join(CODEX_DIR, "auth.json");
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
  try {
    fs.chmodSync(AUTH_PATH, 0o644);
  } catch {
    /* already gone */
  }
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
const OLD_AUTH = JSON.stringify({ OPENAI_API_KEY: "old-key-value" }, null, 2);

test("a failed auth.json write puts config.toml back and keeps old auth", async (t) => {
  if (typeof process.getuid === "function" && process.getuid() === 0) {
    t.skip("root ignores file modes, so the write cannot be made to fail");
    return;
  }
  fs.writeFileSync(CONFIG_PATH, OLD_CONFIG);
  fs.writeFileSync(AUTH_PATH, OLD_AUTH);
  fs.chmodSync(AUTH_PATH, 0o444);

  const response = await post();

  assert.equal(response.status, 500);
  assert.equal(fs.readFileSync(CONFIG_PATH, "utf8"), OLD_CONFIG, "config.toml must be restored");
  assert.equal(fs.readFileSync(AUTH_PATH, "utf8"), OLD_AUTH, "auth.json must be untouched");
});

test("both files are written when nothing fails", async () => {
  try {
    fs.chmodSync(AUTH_PATH, 0o644);
  } catch {
    /* may not exist */
  }
  fs.writeFileSync(CONFIG_PATH, OLD_CONFIG);
  fs.writeFileSync(AUTH_PATH, OLD_AUTH);

  const response = await post();

  assert.equal(response.status, 200);
  assert.match(fs.readFileSync(CONFIG_PATH, "utf8"), /gpt-5\.6-sol/);
  assert.equal(JSON.parse(fs.readFileSync(AUTH_PATH, "utf8")).OPENAI_API_KEY, "new-key-value");
});

test("a failed write on a first-time setup removes the config.toml it created", async (t) => {
  if (typeof process.getuid === "function" && process.getuid() === 0) {
    t.skip("root ignores file modes, so the write cannot be made to fail");
    return;
  }
  try {
    fs.chmodSync(AUTH_PATH, 0o644);
  } catch {
    /* may not exist */
  }
  fs.rmSync(CONFIG_PATH, { force: true });
  fs.writeFileSync(AUTH_PATH, OLD_AUTH);
  fs.chmodSync(AUTH_PATH, 0o444);

  const response = await post();

  assert.equal(response.status, 500);
  assert.equal(fs.existsSync(CONFIG_PATH), false, "a config.toml that did not exist must not stay");
});
