import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ag-generation-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-antigravity-generation";
process.env.ANTIGRAVITY_CREDITS = "off";

const { AntigravityExecutor } = await import("../../open-sse/executors/antigravity.ts");
const { PROVIDERS } = await import("../../open-sse/config/constants.ts");
const {
  ANTIGRAVITY_RUNTIME_BASE_URLS,
  getAntigravityModelsDiscoveryUrls,
  getAntigravityFetchAvailableModelsUrls,
  getAntigravityOnboardUrls,
} = await import("../../open-sse/config/antigravityUpstream.ts");
const { getAntigravityLoadCodeAssistUrls } =
  await import("../../open-sse/services/antigravityProjectBootstrap.ts");
const { seedAntigravityIdeVersionCache, clearAntigravityVersionCaches } =
  await import("../../open-sse/services/antigravityVersion.ts");
const core = await import("../../src/lib/db/core.ts");

const DAILY = "https://daily-cloudcode-pa.googleapis.com";
const REGULAR = "https://cloudcode-pa.googleapis.com";
const originalFetch = globalThis.fetch;
const input = {
  model: "gemini-2.5-flash",
  body: { request: { contents: [{ role: "user", parts: [{ text: "fixture" }] }] } },
  stream: false,
  credentials: { accessToken: "fixture-token", projectId: "fixture-project" },
};

function okSSE(): Response {
  return new Response(
    'data: {"response":{"candidates":[{"content":{"parts":[{"text":"OK"}]},"finishReason":"STOP"}]}}\n\n',
    { headers: { "Content-Type": "text/event-stream" } }
  );
}

function executorFor(provider: string) {
  const executor = new AntigravityExecutor();
  executor.provider = provider;
  executor.config = PROVIDERS[provider];
  return executor;
}

test.beforeEach(() => {
  seedAntigravityIdeVersionCache("2.1.1");
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  clearAntigravityVersionCaches();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const provider of ["antigravity", "agy"]) {
  test(`${provider} defaults complete generation on daily`, async () => {
    const hosts: string[] = [];
    globalThis.fetch = async (url) => {
      hosts.push(new URL(String(url)).origin);
      return okSSE();
    };
    const result = await executorFor(provider).execute(input);
    assert.equal(result.response.status, 200);
    assert.equal((await result.response.json()).choices[0].message.content, "OK");
    assert.deepEqual(hosts, [DAILY]);
  });

  test(`${provider} defaults preserve a network failure without sending to regular`, async () => {
    const hosts: string[] = [];
    const failure = new TypeError("fetch failed");
    globalThis.fetch = async (url) => {
      const host = new URL(String(url)).origin;
      hosts.push(host);
      if (host === DAILY) throw failure;
      return okSSE();
    };
    await assert.rejects(executorFor(provider).execute(input), (error) => error === failure);
    assert.deepEqual(hosts, [DAILY]);
  });

  test(`${provider} defaults return an eligible HTTP failure without sending to regular`, async () => {
    const hosts: string[] = [];
    globalThis.fetch = async (url) => {
      const host = new URL(String(url)).origin;
      hosts.push(host);
      return host === DAILY
        ? Response.json({ error: { message: "fixture gateway failure" } }, { status: 502 })
        : okSSE();
    };
    const result = await executorFor(provider).execute(input);
    assert.equal(result.response.status, 502);
    assert.deepEqual(hosts, [DAILY]);
  });
}

test("an explicit two-host configuration retains HTTP fallback", async () => {
  const executor = new AntigravityExecutor();
  executor.config = { ...executor.config, baseUrls: [DAILY, REGULAR] };
  const hosts: string[] = [];
  globalThis.fetch = async (url) => {
    hosts.push(new URL(String(url)).origin);
    return hosts.length === 1 ? new Response("gateway failure", { status: 502 }) : okSSE();
  };
  const result = await executor.execute(input);
  assert.equal(result.response.status, 200);
  assert.deepEqual(hosts, [DAILY, REGULAR]);
});

test("an explicit baseUrl remains the generation target", async () => {
  const executor = new AntigravityExecutor();
  const baseUrl = "https://generation.example.test";
  executor.config = { baseUrl };
  const hosts: string[] = [];
  globalThis.fetch = async (url) => {
    hosts.push(new URL(String(url)).origin);
    return okSSE();
  };
  const result = await executor.execute(input);
  assert.equal(result.response.status, 200);
  assert.deepEqual(hosts, [baseUrl]);
});

test("caller cancellation preserves its reason and does not dispatch to another host", async () => {
  const controller = new AbortController();
  const reason = new DOMException("fixture cancellation", "AbortError");
  const hosts: string[] = [];
  globalThis.fetch = async (url, init) => {
    hosts.push(new URL(String(url)).origin);
    controller.abort(reason);
    throw init?.signal?.reason;
  };
  await assert.rejects(
    new AntigravityExecutor().execute({ ...input, signal: controller.signal }),
    (error) => error === reason
  );
  assert.deepEqual(hosts, [DAILY]);
});

test("discovery, bootstrap and the quota/credit runtime list retain their hosts", () => {
  const discoveryHosts = [DAILY, REGULAR, "https://daily-cloudcode-pa.sandbox.googleapis.com"];
  const origins = (urls: readonly string[]) => urls.map((url) => new URL(url).origin);
  assert.deepEqual(origins(getAntigravityModelsDiscoveryUrls()), discoveryHosts);
  assert.deepEqual(origins(getAntigravityFetchAvailableModelsUrls()), discoveryHosts);
  assert.deepEqual(origins(getAntigravityLoadCodeAssistUrls()), [REGULAR]);
  assert.deepEqual(origins(getAntigravityOnboardUrls()), [REGULAR]);
  assert.deepEqual(ANTIGRAVITY_RUNTIME_BASE_URLS, [DAILY, REGULAR]);
});
