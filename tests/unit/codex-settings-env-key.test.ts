import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

/**
 * Codex authenticates a custom provider only from `env_key` (or a header/command), never from
 * auth.json, which serves the built-in OpenAI provider. Apply used to write
 * `env_key = "OPENAI_API_KEY"` and put the key in auth.json, so the key never reached Codex
 * unless the user exported OPENAI_API_KEY by hand (and a real OpenAI key in that variable would
 * go to the gateway). Apply now names `OMNIROUTE_API_KEY` and keeps the key in ~/.codex/.env,
 * which Codex loads at startup. auth.json (the ChatGPT login) is left alone.
 */

const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omr-codex-env-key-"));
const TEST_HOME = path.join(TEST_ROOT, "fake-home");
const CODEX_DIR = path.join(TEST_HOME, ".codex");
const CONFIG_PATH = path.join(CODEX_DIR, "config.toml");
const AUTH_PATH = path.join(CODEX_DIR, "auth.json");
const ENV_PATH = path.join(CODEX_DIR, ".env");
fs.mkdirSync(CODEX_DIR, { recursive: true });

const originalHome = os.homedir;
const originalDataDir = process.env.DATA_DIR;
const originalJwtSecret = process.env.JWT_SECRET;
const originalWriteFlag = process.env.CLI_ALLOW_CONFIG_WRITES;

os.homedir = () => TEST_HOME;
process.env.DATA_DIR = path.join(TEST_ROOT, "data");
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "codex-env-key-api-secret";
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

test.beforeEach(() => {
  for (const file of [CONFIG_PATH, AUTH_PATH, ENV_PATH]) fs.rmSync(file, { force: true });
});

const call = async (method: "POST" | "DELETE", body?: Record<string, unknown>) => {
  process.env.JWT_SECRET = "codex-env-key-api-jwt";
  const token = await new SignJWT({ authenticated: true, sub: "codex-env-key-test" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return route[method](
    new Request("http://localhost/api/cli-tools/codex-settings", {
      method,
      headers: { cookie: `auth_token=${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        baseUrl: "http://localhost:20128/api/v1",
        model: "gpt-5.6-sol",
        ...body,
      }),
    })
  );
};

const mode = (file: string) => fs.statSync(file).mode & 0o777;
const CHATGPT_LOGIN = JSON.stringify({ tokens: { refresh_token: "rt-keep" } }, null, 2);

test("Apply names OMNIROUTE_API_KEY, keeps the key in ~/.codex/.env at 0600 and leaves auth.json alone", async () => {
  fs.writeFileSync(AUTH_PATH, CHATGPT_LOGIN);

  const response = await call("POST", { apiKey: "sk-test-env-key" });

  assert.equal(response.status, 200);
  const toml = fs.readFileSync(CONFIG_PATH, "utf8");
  assert.match(toml, /env_key = "OMNIROUTE_API_KEY"/);
  assert.doesNotMatch(toml, /OPENAI_API_KEY/);
  assert.doesNotMatch(toml, /sk-test-env-key/, "the key must never sit in config.toml");
  assert.equal(fs.readFileSync(ENV_PATH, "utf8"), "OMNIROUTE_API_KEY=sk-test-env-key\n");
  if (process.platform !== "win32") assert.equal(mode(ENV_PATH), 0o600);
  assert.equal(fs.readFileSync(AUTH_PATH, "utf8"), CHATGPT_LOGIN, "auth.json must be untouched");
});

test("a second Apply replaces the one key line, keeps the other .env lines and narrows a loose mode", async () => {
  fs.writeFileSync(ENV_PATH, "OTHER=keep\nOMNIROUTE_API_KEY=old\nLAST=keep-too\n", { mode: 0o644 });
  fs.chmodSync(ENV_PATH, 0o644);

  const response = await call("POST", { apiKey: "sk-test-second" });

  assert.equal(response.status, 200);
  assert.equal(
    fs.readFileSync(ENV_PATH, "utf8"),
    "OTHER=keep\nOMNIROUTE_API_KEY=sk-test-second\nLAST=keep-too\n"
  );
  if (process.platform !== "win32") assert.equal(mode(ENV_PATH), 0o600);
});

test("a key that .env syntax would change is refused and nothing is written", async () => {
  for (const apiKey of ["sk-a\nINJECTED=1", "sk-$HOME", 'sk-"quoted"', "sk with space"]) {
    const response = await call("POST", { apiKey });

    assert.equal(response.status, 400, JSON.stringify(apiKey));
    assert.equal(fs.existsSync(CONFIG_PATH), false);
    assert.equal(fs.existsSync(ENV_PATH), false);
  }
});

test("Reset drops the key line (and a legacy auth.json key), keeps everything else", async () => {
  fs.writeFileSync(AUTH_PATH, JSON.stringify({ OPENAI_API_KEY: "legacy", tokens: { id: "keep" } }));
  fs.writeFileSync(ENV_PATH, "OTHER=keep\n");
  await call("POST", { apiKey: "sk-test-reset" });
  assert.equal(fs.readFileSync(ENV_PATH, "utf8"), "OTHER=keep\nOMNIROUTE_API_KEY=sk-test-reset\n");

  const response = await call("DELETE");

  assert.equal(response.status, 200);
  assert.equal(fs.readFileSync(ENV_PATH, "utf8"), "OTHER=keep\n");
  assert.deepEqual(JSON.parse(fs.readFileSync(AUTH_PATH, "utf8")), { tokens: { id: "keep" } });
  assert.doesNotMatch(fs.readFileSync(CONFIG_PATH, "utf8"), /omniroute/i);
});

test("Reset removes a .env that held only the key", async () => {
  await call("POST", { apiKey: "sk-test-only" });
  assert.equal(fs.existsSync(ENV_PATH), true);

  const response = await call("DELETE");

  assert.equal(response.status, 200);
  assert.equal(fs.existsSync(ENV_PATH), false);
});
