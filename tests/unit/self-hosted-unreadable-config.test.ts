/**
 * Fail-closed guard for the self-hosted unified entry: when the self-hosted
 * provider config file (or only its strategy file) cannot be read, the request
 * must be answered with a 500 — it must never fall through to the cloud
 * pipeline in `/v1/chat/completions` (which would also skip structural
 * admission, retirement checks, alias resolution and the injection guard).
 * The error body must not echo the configured file path.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-selfhosted-unreadable-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "self-hosted-unreadable-secret";

const CONFIG_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-selfhosted-cfg-"));
const MISSING_PROVIDERS_FILE = path.join(CONFIG_DIR, "secret-dir", "providers-missing.yaml");
const MISSING_STRATEGY_FILE = path.join(CONFIG_DIR, "secret-dir", "strategy-missing.yaml");
const PROVIDERS_FILE = path.join(CONFIG_DIR, "providers.yaml");
const SELF_HOSTED_BASE_URL = "http://127.0.0.1:59999/v1";
const THROWING_PROVIDERS_FILE = path.join(CONFIG_DIR, "providers-throwing.yaml");
const THROWING_BASE_URL = "http://127.0.0.1:59998/v1";
const providersYaml = (baseUrl: string) =>
  [
    "providers:",
    "  - id: stub",
    "    kind: openai",
    `    baseUrl: ${baseUrl}`,
    "    model: gpt-oss",
  ].join("\n");
fs.writeFileSync(PROVIDERS_FILE, providersYaml(SELF_HOSTED_BASE_URL));
fs.writeFileSync(THROWING_PROVIDERS_FILE, providersYaml(THROWING_BASE_URL));

const ENV_KEYS = [
  "OMNIROUTE_SELF_HOSTED_PROVIDERS",
  "OMNIROUTE_SELF_HOSTED_PROVIDERS_FILE",
  "OMNIROUTE_SELF_HOSTED_STRATEGY",
  "OMNIROUTE_SELF_HOSTED_STRATEGY_FILE",
  "OMNIROUTE_SELF_HOSTED_API_KEY",
];
for (const key of ENV_KEYS) delete process.env[key];

const coreDb = await import("../../src/lib/db/core.ts");
const selfHosted = await import("../../open-sse/services/selfHostedEntry.ts");
const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");

const originalFetch = globalThis.fetch;
const fetchCalls: string[] = [];
globalThis.fetch = (async (input: RequestInfo | URL) => {
  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  fetchCalls.push(url);
  if (url.startsWith(THROWING_BASE_URL)) {
    // A response object whose header access throws makes the self-hosted
    // handler reject after dispatch — exercises the route-level guard.
    return {
      ok: true,
      status: 200,
      get headers(): Headers {
        throw new Error(`unexpected failure reading ${CONFIG_DIR}/secret-dir`);
      },
    } as unknown as Response;
  }
  if (url.startsWith(SELF_HOSTED_BASE_URL)) {
    return new Response(
      JSON.stringify({
        id: "chatcmpl-stub",
        object: "chat.completion",
        model: "gpt-oss",
        choices: [
          { index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }
  return new Response(JSON.stringify({ error: { message: "unexpected outbound call" } }), {
    status: 599,
    headers: { "content-type": "application/json" },
  });
}) as typeof fetch;

test.afterEach(() => {
  for (const key of ENV_KEYS) delete process.env[key];
  fetchCalls.length = 0;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  coreDb.resetDbInstance();
  for (const dir of [TEST_DATA_DIR, CONFIG_DIR]) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      // best-effort cleanup
    }
  }
});

function chatRequest(model = "openai/gpt-4o") {
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ model, messages: [{ role: "user", content: "hi" }] }),
  });
}

async function assertFailClosed(response: Response) {
  assert.equal(response.status, 500, "unreadable self-hosted config must answer 500");
  const text = await response.text();
  assert.ok(!text.includes(CONFIG_DIR), `error body must not leak the config path: ${text}`);
  assert.ok(!text.includes("secret-dir"), `error body must not leak the config path: ${text}`);
  assert.ok(!/ENOENT/.test(text), `error body must not leak the raw fs error: ${text}`);
  assert.deepEqual(fetchCalls, [], "no outbound fetch may happen (no cloud fall-through)");
}

test("handler: unreadable providers file resolves to a 500, not a rejection", async () => {
  const response = await selfHosted.handleSelfHostedCompletions(
    chatRequest(),
    { model: "openai/gpt-4o", messages: [{ role: "user", content: "hi" }] },
    { providersFile: MISSING_PROVIDERS_FILE }
  );
  assert.ok(response, "a configured self-hosted entry must always answer");
  await assertFailClosed(response);
});

test("handler: unreadable strategy file only resolves to a 500", async () => {
  const response = await selfHosted.handleSelfHostedCompletions(
    chatRequest(),
    { model: "openai/gpt-4o", messages: [{ role: "user", content: "hi" }] },
    { providersFile: PROVIDERS_FILE, strategyFile: MISSING_STRATEGY_FILE }
  );
  assert.ok(response, "a configured self-hosted entry must always answer");
  await assertFailClosed(response);
});

test("route: unreadable providers file returns 500 and never reaches the cloud pipeline", async () => {
  process.env.OMNIROUTE_SELF_HOSTED_PROVIDERS_FILE = MISSING_PROVIDERS_FILE;
  const response = await chatRoute.POST(chatRequest());
  await assertFailClosed(response);
});

test("route: unreadable strategy file only returns 500 and never reaches the cloud pipeline", async () => {
  process.env.OMNIROUTE_SELF_HOSTED_PROVIDERS_FILE = PROVIDERS_FILE;
  process.env.OMNIROUTE_SELF_HOSTED_STRATEGY_FILE = MISSING_STRATEGY_FILE;
  const response = await chatRoute.POST(chatRequest());
  await assertFailClosed(response);
});

test("route: an unexpected throw from the self-hosted handler returns 500, no cloud fall-through", async () => {
  process.env.OMNIROUTE_SELF_HOSTED_PROVIDERS_FILE = THROWING_PROVIDERS_FILE;
  const response = await chatRoute.POST(chatRequest("stub/gpt-oss"));
  assert.equal(response.status, 500, "a throwing self-hosted divert must answer 500");
  const text = await response.text();
  assert.ok(!text.includes(CONFIG_DIR), `error body must not leak internals: ${text}`);
  assert.ok(
    fetchCalls.every((url) => url.startsWith(THROWING_BASE_URL)),
    `only the self-hosted provider may be called: ${fetchCalls.join(", ")}`
  );
});

test("route: a readable providers file still routes to the self-hosted provider", async () => {
  process.env.OMNIROUTE_SELF_HOSTED_PROVIDERS_FILE = PROVIDERS_FILE;
  const response = await chatRoute.POST(chatRequest("stub/gpt-oss"));
  assert.equal(response.status, 200, await response.clone().text());
  const body = await response.json();
  assert.equal(body.choices?.[0]?.message?.content, "ok");
  assert.equal(fetchCalls.length, 1);
  assert.ok(fetchCalls[0].startsWith(SELF_HOSTED_BASE_URL), fetchCalls[0]);
});
