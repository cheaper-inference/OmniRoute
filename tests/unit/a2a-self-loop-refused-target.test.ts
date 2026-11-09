/**
 * A self-loop base URL the A2A skills refuse to send a key to must fail the task
 * loudly on every skill, and the configured URL must stay out of what a caller or
 * the logs can see: it may hold proxy credentials or an internal hostname.
 * The skills read the base URL at import, so it is set before they load.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { inspect } from "node:util";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-a2a-refused-target-"));
const URL_PASSWORD = "s3cretpw-a2a-refused-target";
const URL_HOST = "gw.refused-target.example.com";
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
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "a2a-refused-target-secret";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";
process.env.REQUIRE_API_KEY = "true";
process.env.OMNIROUTE_API_KEY = "sk-env-a2a-refused-target";
process.env.JWT_SECRET = "a2a-refused-target-jwt-secret";
delete process.env.OMNIROUTE_BASE_URL;
process.env.BASE_URL = `https://proxyuser:${URL_PASSWORD}@${URL_HOST}`;

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const route = await import("../../src/app/a2a/route.ts");
const { getTaskManager } = await import("../../src/lib/a2a/taskManager.ts");
const { SignJWT } = await import("jose");

await settingsDb.updateSettings({ a2aEnabled: true });
const restricted = await apiKeysDb.createApiKey("a2a-refused", "a2a-refused-target", []);
const sessionToken = await new SignJWT({ authenticated: true })
  .setProtectedHeader({ alg: "HS256" })
  .setExpirationTime("1h")
  .sign(new TextEncoder().encode(process.env.JWT_SECRET));

const originalFetch = globalThis.fetch;
let fetchCalls = 0;
globalThis.fetch = (async () => {
  fetchCalls += 1;
  return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
}) as typeof fetch;

const CONSOLE_METHODS = ["error", "warn", "log", "info", "debug"] as const;
const originalConsole = CONSOLE_METHODS.map((name) => console[name]);
const logged: string[] = [];
for (const name of CONSOLE_METHODS) {
  console[name] = (...args: unknown[]) => {
    logged.push(args.map((arg) => inspect(arg, { depth: 6 })).join(" "));
  };
}

test.after(() => {
  CONSOLE_METHODS.forEach((name, i) => {
    console[name] = originalConsole[i];
  });
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [name, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
});

function callA2A(method: string, skill: string, headers: Record<string, string>) {
  return route.POST(
    new Request("http://localhost/a2a", {
      method: "POST",
      headers: { "content-type": "application/json", ...headers },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method,
        params: { skill, messages: [{ role: "user", content: "hi" }] },
      }),
    }) as never
  );
}

function storedTaskData(): string {
  const db = core.getDbInstance();
  return JSON.stringify([
    getTaskManager().listTasks({ limit: 10_000 }),
    db.prepare("SELECT * FROM a2a_tasks").all(),
    db.prepare("SELECT * FROM a2a_task_events").all(),
  ]);
}

/**
 * Occurrences of `literal` in `text`. A plain text search over rendered output (task records,
 * an inspected error): the text is not a URL, so there is no hostname to parse and compare.
 */
function occurrences(text: string, literal: string): number {
  return text.split(literal).length - 1;
}

function assertUrlHidden(where: string, text: string) {
  assert.equal(occurrences(text, URL_PASSWORD), 0, `${where} shows the URL password`);
  assert.equal(occurrences(text, URL_HOST), 0, `${where} shows the URL host`);
}

const SKILLS = ["smart-routing", "cost-analysis", "quota-management", "health-report"];
const CALLERS = [
  { name: "API key", headers: { authorization: `Bearer ${restricted.key}` } },
  { name: "dashboard session", headers: { cookie: `auth_token=${sessionToken}` } },
];

for (const skill of SKILLS) {
  for (const caller of CALLERS) {
    test(`${skill} fails on a refused base URL for a ${caller.name}, without showing it`, async () => {
      fetchCalls = 0;
      logged.length = 0;

      const sendText = await (await callA2A("message/send", skill, caller.headers)).text();
      const send = JSON.parse(sendText);
      assert.equal(send.error?.code, -32603, sendText);
      assert.equal(send.result, undefined, sendText);

      const streamText = await (await callA2A("message/stream", skill, caller.headers)).text();
      assert.match(streamText, /"state":"failed"/, streamText);
      assert.doesNotMatch(streamText, /"state":"completed"/, streamText);

      assert.equal(fetchCalls, 0, "no self-loop call goes out");
      assertUrlHidden("the JSON-RPC error", sendText);
      assertUrlHidden("the stream", streamText);
      assertUrlHidden("the stored task", storedTaskData());
      assertUrlHidden("the console", logged.join("\n"));
    });
  }
}
