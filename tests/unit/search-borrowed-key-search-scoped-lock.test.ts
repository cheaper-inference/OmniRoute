import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-search-lock-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "search-lock-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { executeWebSearch } = await import("../../src/lib/search/executeWebSearch.ts");
const searchRoute = await import("../../src/app/api/v1/search/route.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");

// ollama-search has no keys of its own: it borrows the ollama-cloud chat keys. A key that
// rate-limited a search must be skipped by search for a while, and chat must keep using it.
const originalFetch = globalThis.fetch;

/** The first key search uses answers `failStatus`; any other key answers 200. Order independent. */
function stubUpstream(failStatus = 429) {
  const used: string[] = [];
  globalThis.fetch = async (_url, init) => {
    const key = (new Headers(init?.headers).get("authorization") || "").replace("Bearer ", "");
    used.push(key);
    if (key === used[0]) {
      return new Response(JSON.stringify({ error: "upstream refused" }), {
        status: failStatus,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response(
      JSON.stringify({ results: [{ title: "hit", url: "https://example.com/x", content: "c" }] }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };
  return used;
}

async function seedChatKey(name: string, apiKey: string) {
  const row = await providersDb.createProviderConnection({
    provider: "ollama-cloud",
    authType: "apikey",
    name,
    apiKey,
    isActive: true,
    testStatus: "active",
  });
  return String(row.id);
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("executeWebSearch moves to another borrowed key after one rate-limited a search", async () => {
  await seedChatKey("chat-a", "search-lock-key-a");
  await seedChatKey("chat-b", "search-lock-key-b");
  const used = stubUpstream();

  await assert.rejects(
    executeWebSearch({ query: "first", provider: "ollama-search" }),
    (e: { statusCode?: number }) => e.statusCode === 429
  );
  const second = await executeWebSearch({ query: "second", provider: "ollama-search" });

  assert.equal(second.data.provider, "ollama-search");
  assert.equal(used.length, 2);
  assert.notEqual(used[1], used[0], "search must not retry the key that just rate-limited it");
});

test("/v1/search moves to another borrowed key after one rate-limited a search", async () => {
  await seedChatKey("chat-a", "search-lock-key-a");
  await seedChatKey("chat-b", "search-lock-key-b");
  const used = stubUpstream();
  const post = (query: string) =>
    searchRoute.POST(
      new Request("http://localhost/api/v1/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, search_type: "web", provider: "ollama-search" }),
      })
    );

  assert.equal((await post("first")).status, 429);
  assert.equal((await post("second")).status, 200);
  assert.equal(used.length, 2);
  assert.notEqual(used[1], used[0]);
});

test("a locked borrowed key gets no new search call, and chat can still select it", async () => {
  const onlyId = await seedChatKey("only", "search-lock-key-a");
  const used = stubUpstream();

  await assert.rejects(executeWebSearch({ query: "one", provider: "ollama-search" }));
  await assert.rejects(executeWebSearch({ query: "two", provider: "ollama-search" }));

  assert.equal(used.length, 1, "the locked key must not be called again by search");
  const chat = await getProviderCredentials("ollama-cloud");
  assert.equal((chat as { connectionId?: string }).connectionId, onlyId);
  const [row] = (await providersDb.getProviderConnections({
    provider: "ollama-cloud",
  })) as Array<{ testStatus?: string; rateLimitedUntil?: string | null }>;
  assert.equal(row.testStatus, "active");
  assert.ok(!row.rateLimitedUntil, "the search lock must not cool the chat connection");
});

test("a 503 from the search backend does not lock the borrowed key", async () => {
  await seedChatKey("chat-a", "search-lock-key-a");
  const used = stubUpstream(503);

  await assert.rejects(executeWebSearch({ query: "one", provider: "ollama-search" }));
  await assert.rejects(executeWebSearch({ query: "two", provider: "ollama-search" }));

  assert.equal(used.length, 2, "a server error is not a key problem: the key is tried again");
});
