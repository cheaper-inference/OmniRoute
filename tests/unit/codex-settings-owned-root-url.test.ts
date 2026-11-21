/**
 * OmniRoute may delete a root `openai_base_url` from config.toml only when the value is one it
 * wrote: the base_url of its own [model_providers.omniroute] section. Any other value is the
 * user's own route to the built-in OpenAI provider and must survive both Apply and Remove.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const TEST_HOME = path.join(os.tmpdir(), `omniroute-codex-owned-url-${process.pid}-${Date.now()}`);
const CONFIG_PATH = path.join(TEST_HOME, ".codex", "config.toml");
const originalHome = os.homedir;
const originalJwtSecret = process.env.JWT_SECRET;
const originalWriteFlag = process.env.CLI_ALLOW_CONFIG_WRITES;

os.homedir = () => TEST_HOME;
process.env.CLI_ALLOW_CONFIG_WRITES = "true";

const route = await import("../../src/app/api/cli-tools/codex-settings/route.ts");

const OMNIROUTE_URL = "http://localhost:20128/v1";
const USER_URL = "https://corp-proxy.example.com/openai/v1";

const authCookie = async (): Promise<string> => {
  process.env.JWT_SECRET = "codex-owned-root-url-test-secret";
  const token = await new SignJWT({ authenticated: true, sub: "codex-owned-root-url-test" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return `auth_token=${token}`;
};

const request = async (method: "POST" | "DELETE", body?: Record<string, unknown>) =>
  new Request("http://localhost/api/cli-tools/codex-settings", {
    method,
    headers: { cookie: await authCookie(), "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

const apply = async () =>
  route.POST(
    await request("POST", {
      baseUrl: OMNIROUTE_URL,
      apiKey: "sk_omniroute",
      model: "gpt-5.6-sol",
      wireApi: "responses",
    })
  );

const remove = async () => route.DELETE(await request("DELETE"));

const writeConfig = async (content: string) => {
  await fs.rm(TEST_HOME, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  await fs.mkdir(path.dirname(CONFIG_PATH), { recursive: true });
  await fs.writeFile(CONFIG_PATH, content);
};

const readConfig = () => fs.readFile(CONFIG_PATH, "utf8");

test.after(async () => {
  os.homedir = originalHome;
  await fs.rm(TEST_HOME, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalJwtSecret === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = originalJwtSecret;
  if (originalWriteFlag === undefined) delete process.env.CLI_ALLOW_CONFIG_WRITES;
  else process.env.CLI_ALLOW_CONFIG_WRITES = originalWriteFlag;
});

test("Apply keeps a root openai_base_url that OmniRoute did not write", async () => {
  await writeConfig(`openai_base_url = "${USER_URL}"\n`);
  assert.equal((await apply()).status, 200);

  const config = await readConfig();
  assert.match(config, new RegExp(`^openai_base_url = "${USER_URL}"$`, "m"));
  assert.match(config, /^model_provider = "omniroute"$/m);
});

test("Apply still removes a root openai_base_url that is the OmniRoute URL", async () => {
  await writeConfig(`openai_base_url = "${OMNIROUTE_URL}/"\n`);
  assert.equal((await apply()).status, 200);

  assert.doesNotMatch(await readConfig(), /openai_base_url/);
});

test("Apply removes the openai_base_url of an earlier OmniRoute Apply on another URL", async () => {
  await writeConfig(
    [
      'openai_base_url = "http://old-host:20128/v1"',
      "",
      "[model_providers.omniroute]",
      'name = "OmniRoute"',
      'base_url = "http://old-host:20128/v1"',
      "",
    ].join("\n")
  );
  assert.equal((await apply()).status, 200);

  assert.doesNotMatch(await readConfig(), /openai_base_url/);
});

test("Remove keeps a root openai_base_url that OmniRoute did not write", async () => {
  await writeConfig(
    [
      `openai_base_url = "${USER_URL}"`,
      'model_provider = "omniroute"',
      "",
      "[model_providers.omniroute]",
      'name = "OmniRoute"',
      `base_url = "${OMNIROUTE_URL}"`,
      "",
    ].join("\n")
  );
  assert.equal((await remove()).status, 200);

  const config = await readConfig();
  assert.match(config, new RegExp(`^openai_base_url = "${USER_URL}"$`, "m"));
  assert.doesNotMatch(config, /omniroute/);
});

test("Remove deletes the openai_base_url that matches the OmniRoute provider URL", async () => {
  await writeConfig(
    [
      `openai_base_url = "${OMNIROUTE_URL}"`,
      'model_provider = "omniroute"',
      "",
      "[model_providers.omniroute]",
      'name = "OmniRoute"',
      `base_url = "${OMNIROUTE_URL}"`,
      "",
    ].join("\n")
  );
  assert.equal((await remove()).status, 200);

  assert.doesNotMatch(await readConfig(), /openai_base_url/);
});

test("Remove keeps a root openai_base_url when OmniRoute has no provider section", async () => {
  await writeConfig(`openai_base_url = "${USER_URL}"\n`);
  assert.equal((await remove()).status, 200);

  assert.match(await readConfig(), new RegExp(`^openai_base_url = "${USER_URL}"$`, "m"));
});
