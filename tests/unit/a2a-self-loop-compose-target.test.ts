/**
 * docs/guides/DOCKER_GUIDE.md documents BASE_URL=http://omniroute:20128 as the
 * internal self-fetch URL: plain http that never leaves the Docker network. The
 * A2A skills must keep working on it, with the caller's key.
 * The skills read the base URL at import, so it is set before they load.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-a2a-compose-target-"));
const ENV_KEY = "sk-env-a2a-compose-target";
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  OMNIROUTE_DISABLE_REDIS_AUTH_CACHE: process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE,
  REQUIRE_API_KEY: process.env.REQUIRE_API_KEY,
  OMNIROUTE_API_KEY: process.env.OMNIROUTE_API_KEY,
  OMNIROUTE_BASE_URL: process.env.OMNIROUTE_BASE_URL,
  BASE_URL: process.env.BASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "a2a-compose-target-secret";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";
process.env.REQUIRE_API_KEY = "true";
process.env.OMNIROUTE_API_KEY = ENV_KEY;
process.env.JWT_SECRET = "a2a-compose-target-jwt-secret";
delete process.env.OMNIROUTE_BASE_URL;
process.env.BASE_URL = "http://omniroute:20128";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const route = await import("../../src/app/a2a/route.ts");
const { SignJWT } = await import("jose");

await settingsDb.updateSettings({ a2aEnabled: true });
const restricted = await apiKeysDb.createApiKey("a2a-compose", "a2a-compose-target", []);
const sessionToken = await new SignJWT({ authenticated: true })
  .setProtectedHeader({ alg: "HS256" })
  .setExpirationTime("1h")
  .sign(new TextEncoder().encode(process.env.JWT_SECRET));

const originalFetch = globalThis.fetch;
const captured: { url: string; auth: string | null }[] = [];
globalThis.fetch = (async (input: RequestInfo | URL, init: RequestInit = {}) => {
  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  captured.push({ url, auth: new Headers(init.headers).get("authorization") });
  const body = url.includes("/v1/chat/completions")
    ? { model: "openai/gpt-cheap", choices: [{ message: { content: "ok" } }] }
    : {};
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}) as typeof fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [name, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
});

function callA2A(skill: string, headers: Record<string, string>) {
  return route.POST(
    new Request("http://localhost/a2a", {
      method: "POST",
      headers: { "content-type": "application/json", ...headers },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "message/send",
        params: { skill, messages: [{ role: "user", content: "hi" }] },
      }),
    }) as never
  );
}

const CALLERS = [
  {
    name: "API key",
    headers: { authorization: `Bearer ${restricted.key}` },
    expected: `Bearer ${restricted.key}`,
  },
  {
    name: "dashboard session",
    headers: { cookie: `auth_token=${sessionToken}` },
    expected: `Bearer ${ENV_KEY}`,
  },
];

for (const skill of ["smart-routing", "cost-analysis", "quota-management", "health-report"]) {
  for (const caller of CALLERS) {
    test(`${skill} reaches the Compose BASE_URL for a ${caller.name}`, async () => {
      captured.length = 0;
      const text = await (await callA2A(skill, caller.headers)).text();
      const body = JSON.parse(text);
      assert.equal(body.error, undefined, text);
      assert.equal(body.result?.task?.state, "completed", text);
      assert.ok(captured.length > 0, "the self-loop goes out");
      for (const call of captured) {
        assert.ok(call.url.startsWith("http://omniroute:20128/"), call.url);
        assert.equal(call.auth, caller.expected, call.url);
      }
    });
  }
}
