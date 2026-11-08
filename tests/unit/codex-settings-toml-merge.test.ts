/**
 * The Codex settings route merges OmniRoute keys into the user's ~/.codex/config.toml. Every other
 * value must survive as TOML: multi-line arrays, inline tables, quoted keys and arrays of tables
 * (the old line parser turned an array into the string "[" and wrote invalid TOML).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";
import { parse } from "smol-toml";

const TEST_HOME = path.join(os.tmpdir(), `omniroute-codex-toml-merge-${process.pid}-${Date.now()}`);
const CONFIG_PATH = path.join(TEST_HOME, ".codex", "config.toml");
const originalHome = os.homedir;
const originalJwtSecret = process.env.JWT_SECRET;
const originalWriteFlag = process.env.CLI_ALLOW_CONFIG_WRITES;
const originalDataDir = process.env.DATA_DIR;

os.homedir = () => TEST_HOME;
process.env.CLI_ALLOW_CONFIG_WRITES = "true";
process.env.DATA_DIR = path.join(TEST_HOME, "data");

const route = await import("../../src/app/api/cli-tools/codex-settings/route.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

// Valid TOML the user wrote: none of it belongs to OmniRoute.
const USER_CONFIG = `
approval_policy = "never"
notify = ["notify-send", "codex"]

[mcp_servers.fs]
command = "npx"
args = [
  "-y",
  "@modelcontextprotocol/server-filesystem",
]
env = { ROOT = "/srv/data", MODE = "ro" }

[projects."/home/u/my.proj"]
trust_level = "trusted"

[[hooks.pre_tool]]
cmd = "lint"

[[hooks.pre_tool]]
cmd = "audit"
`;

type Toml = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const authCookie = async (): Promise<string> => {
  process.env.JWT_SECRET = "codex-toml-merge-test-secret";
  const token = await new SignJWT({ authenticated: true, sub: "codex-toml-merge-test" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return `auth_token=${token}`;
};

const call = async (method: "POST" | "DELETE", body?: Record<string, unknown>) =>
  route[method](
    new Request("http://localhost/api/cli-tools/codex-settings", {
      method,
      headers: { cookie: await authCookie(), "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    })
  );

const post = (extra: Record<string, unknown> = {}) =>
  call("POST", {
    baseUrl: "http://localhost:20128/v1",
    apiKey: "sk-test-only-toml-merge",
    model: "cx/gpt-5.5",
    ...extra,
  });

const readToml = async () => parse(await fs.readFile(CONFIG_PATH, "utf8")) as Toml;

test.beforeEach(async () => {
  await fs.rm(TEST_HOME, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  await fs.mkdir(path.dirname(CONFIG_PATH), { recursive: true });
  await fs.writeFile(CONFIG_PATH, USER_CONFIG);
});

test.after(async () => {
  resetDbInstance();
  os.homedir = originalHome;
  await fs.rm(TEST_HOME, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalJwtSecret === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = originalJwtSecret;
  if (originalWriteFlag === undefined) delete process.env.CLI_ALLOW_CONFIG_WRITES;
  else process.env.CLI_ALLOW_CONFIG_WRITES = originalWriteFlag;
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

test("POST keeps arrays, inline tables, quoted keys and arrays of tables", async () => {
  const before = parse(USER_CONFIG) as Toml;
  assert.equal((await post()).status, 200);

  const after = await readToml(); // the file must still be valid TOML
  assert.deepEqual(after.mcp_servers, before.mcp_servers);
  assert.deepEqual(after.projects, before.projects);
  assert.deepEqual(after.hooks, before.hooks);
  assert.deepEqual(after.notify, before.notify);
  assert.equal(after.approval_policy, "never");
});

test("POST sets only the OmniRoute keys", async () => {
  assert.equal((await post({ reasoningEffort: "high" })).status, 200);

  const after = await readToml();
  assert.equal(after.model, "cx/gpt-5.5");
  assert.equal(after.model_provider, "omniroute");
  assert.equal(after.model_reasoning_effort, "high");
  assert.equal(after.model_providers.omniroute.base_url, "http://localhost:20128/v1");
  assert.equal(after.model_providers.omniroute.wire_api, "responses");
});

test("POST adds model mappings next to the notice keys the user already has", async () => {
  await fs.writeFile(
    CONFIG_PATH,
    `${USER_CONFIG}\n[notice]\nhide_rate_limit_model_nudge = true\n\n[notice.model_migrations]\nold = "older"\n`
  );
  assert.equal((await post({ modelMappings: { "gpt-5": "cx/gpt-5.5" } })).status, 200);

  const after = await readToml();
  assert.equal(after.notice.hide_rate_limit_model_nudge, true);
  assert.deepEqual({ ...after.notice.model_migrations }, { old: "older", "gpt-5": "cx/gpt-5.5" });
});

test("DELETE removes the OmniRoute keys and keeps every other value", async () => {
  const before = parse(USER_CONFIG) as Toml;
  assert.equal((await post()).status, 200);
  assert.equal((await call("DELETE")).status, 200);

  const after = await readToml();
  assert.equal(after.model, undefined);
  assert.equal(after.model_provider, undefined);
  assert.equal(after.model_providers, undefined);
  assert.deepEqual(after.mcp_servers, before.mcp_servers);
  assert.deepEqual(after.projects, before.projects);
  assert.deepEqual(after.hooks, before.hooks);
});

test("DELETE refuses a config.toml it cannot parse and leaves it byte-identical", async () => {
  const broken = 'model = "o3"\n[model_providers.mine\nbase_url = "http://x"\n';
  await fs.writeFile(CONFIG_PATH, broken);
  const res = await call("DELETE");
  assert.equal(res.status, 409);
  assert.equal(await fs.readFile(CONFIG_PATH, "utf8"), broken);
});
