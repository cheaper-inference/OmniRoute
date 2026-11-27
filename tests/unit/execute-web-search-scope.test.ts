import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-builtin-search-scope-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "builtin-search-scope-test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const settings = await import("../../src/lib/db/settings.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const { executeWebSearch } = await import("../../src/lib/search/executeWebSearch.ts");
const { builtinSkills } = await import("../../src/lib/skills/builtins.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const locks = await import("../../open-sse/services/accountFallback.ts");

const originalFetch = globalThis.fetch;
const order = ["keenable-search", "ollama-search", "searxng-search"];
const hit = { title: "Docs", url: "https://example.com/docs", snippet: "Official documentation" };
let sequence = 0;
const query = (label: string) => label + " " + ++sequence;

async function seed(provider: string, apiKey: string | null, extra: Record<string, unknown> = {}) {
  return providers.createProviderConnection({
    provider,
    apiKey,
    name: provider,
    authType: apiKey ? "apikey" : "none",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
    ...extra,
  });
}

async function defaults() {
  await settings.updateSettings({ searchProviderOrder: order });
  await seed("ollama-cloud", "outside-key", { priority: 1 });
  await seed("searxng-search", null, {
    providerSpecificData: { baseUrl: "https://search.example.com" },
  });
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  await closeCallLogSaves(500);
  core.resetDbInstance();
  locks.clearAllModelLockouts();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(async () => {
  globalThis.fetch = originalFetch;
  await closeCallLogSaves(500);
  core.resetDbInstance();
  locks.clearAllModelLockouts();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("builtin search keeps primary, borrowed keys and fallback inside the caller connection scope", async () => {
  await defaults();
  const own = await seed("ollama-cloud", "allowed-key", { priority: 2 });
  const key = await keys.createApiKey("scoped tool search", "test-machine", [], {
    allowedConnections: [String(own.id)],
  });
  const calls: Array<{ host: string; key: string | null }> = [];
  globalThis.fetch = async (url, init) => {
    const host = new URL(String(url)).hostname;
    calls.push({ host, key: new Headers(init?.headers).get("Authorization") });
    return host === "ollama.com"
      ? Response.json({ error: "unavailable" }, { status: 503 })
      : Response.json({ results: [hit] });
  };
  await assert.rejects(
    executeWebSearch({ query: query("scoped failure"), apiKeyId: key.id }),
    /503/
  );
  assert.deepEqual(calls, [{ host: "ollama.com", key: "Bearer allowed-key" }]);
});

test("a noauth-scoped caller can explicitly admit anonymous Keenable", async () => {
  await defaults();
  const key = await keys.createApiKey("keyless search", "test-machine", [], {
    allowedConnections: ["noauth"],
  });
  const calls: string[] = [];
  globalThis.fetch = async (url, init) => {
    calls.push(String(url));
    assert.equal(new Headers(init?.headers).get("Authorization"), null);
    return Response.json({ results: [hit] });
  };
  const result = await executeWebSearch({
    query: query("allowed public search"),
    apiKeyId: key.id,
  });
  assert.equal(result.data.provider, "keenable-search");
  assert.deepEqual(calls, ["https://api.keenable.ai/v1/search/public"]);
});

test("explicit search cannot borrow a key outside the caller scope", async () => {
  await defaults();
  const key = await keys.createApiKey("explicit scoped search", "test-machine", [], {
    allowedConnections: ["unrelated-connection"],
  });
  const calls: string[] = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    return Response.json({ results: [hit] });
  };
  await assert.rejects(
    executeWebSearch({
      query: query("explicit forbidden"),
      provider: "ollama-search",
      apiKeyId: key.id,
    }),
    /No credentials/
  );
  assert.deepEqual(calls, []);
});

test("scoped search does not reuse an unscoped cached result from another connection", async () => {
  await seed("ollama-cloud", "outside-key", { priority: 1 });
  const calls: string[] = [];
  globalThis.fetch = async (_url, init) => {
    const token = (new Headers(init?.headers).get("Authorization") ?? "").replace(/^Bearer /, "");
    calls.push(token);
    return Response.json({ results: [{ ...hit, url: "https://example.com/" + token }] });
  };
  const input = { query: query("cache partition"), provider: "ollama-search" };
  await executeWebSearch(input);
  const own = await seed("ollama-cloud", "allowed-key", { priority: 2 });
  const key = await keys.createApiKey("cached scoped search", "test-machine", [], {
    allowedConnections: [String(own.id)],
  });
  const result = await executeWebSearch({ ...input, apiKeyId: key.id });
  assert.equal(result.cached, false);
  assert.equal(result.data.results[0].url, "https://example.com/allowed-key");
  assert.deepEqual(calls, ["outside-key", "allowed-key"]);
});

test("unknown and deleted API key ids fail closed before search or cache lookup", async () => {
  await defaults();
  const deleted = await keys.createApiKey("deleted tool caller", "test-machine");
  await keys.deleteApiKey(deleted.id);
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return Response.json({ results: [hit] });
  };
  for (const apiKeyId of ["missing-key", deleted.id]) {
    await assert.rejects(executeWebSearch({ query: query("unknown caller"), apiKeyId }), /API key/);
  }
  assert.equal(calls, 0);
});

test("the builtin maps the trusted local context to an unscoped internal search", async () => {
  await defaults();
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return Response.json({ results: [hit] });
  };
  const result = await builtinSkills.web_search(
    { query: query("local builtin") },
    { apiKeyId: "local", sessionId: "test-session" }
  );
  assert.equal(result.success, true);
  assert.equal(calls, 1);
});

test("a public caller base URL stays available without a stored search connection", async () => {
  const calls: string[] = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    return Response.json({ results: [hit] });
  };
  const result = await executeWebSearch({
    query: query("caller public URL"),
    provider: "searxng-search",
    provider_options: { baseUrl: "https://public-search.example.com" },
  });
  assert.equal(result.data.provider, "searxng-search");
  assert.equal(new URL(calls[0]).hostname, "public-search.example.com");
});

test("the configured overall timeout leaves SearXNG a budget after both primary timeouts", async (t) => {
  await defaults();
  await settings.updateSettings({
    searchTimeoutMs: 30000,
    searchProviderTimeoutsMs: {
      "keenable-search": 8000,
      "ollama-search": 8000,
      "searxng-search": 6000,
    },
  });
  let clock = Date.now();
  t.mock.method(Date, "now", () => clock);
  const hosts: string[] = [];
  globalThis.fetch = async (url) => {
    const host = new URL(String(url)).hostname;
    hosts.push(host);
    if (host !== "search.example.com") {
      clock += 8000;
      throw new DOMException("Timed out", "AbortError");
    }
    clock += 1000;
    return Response.json({ results: [hit] });
  };
  const result = await executeWebSearch({ query: query("timeout chain") });
  assert.equal(result.data.provider, "searxng-search");
  assert.deepEqual(hosts, ["api.keenable.ai", "ollama.com", "search.example.com"]);
});
