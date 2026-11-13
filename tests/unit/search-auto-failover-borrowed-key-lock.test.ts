// Goes to tests/unit/. Needs T100-searchProxy-lock.patch (open-sse/handlers/search/searchProxy.ts).
// Auto-select: the borrowed key rate-limits search, the alternate answers. The next request
// must not call the locked key again.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-search-auto-lock-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { executeWebSearch } = await import("../../src/lib/search/executeWebSearch.ts");
const originalFetch = globalThis.fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("auto-select does not retry a borrowed key that rate-limited search, even when the alternate answered", async () => {
  await providersDb.createProviderConnection({
    provider: "ollama-cloud",
    authType: "apikey",
    name: "chat-a",
    apiKey: "auto-lock-key",
    isActive: true,
    testStatus: "active",
  });
  await providersDb.createProviderConnection({
    provider: "brave-search",
    authType: "apikey",
    name: "brave",
    apiKey: "auto-lock-brave",
    isActive: true,
    testStatus: "active",
  });
  const calls: string[] = [];
  globalThis.fetch = async (url) => {
    const isOllama = String(url).includes("ollama");
    calls.push(isOllama ? "ollama" : "brave");
    if (isOllama) return new Response("rate limit", { status: 429 });
    return new Response(
      JSON.stringify({
        web: { results: [{ title: "b", url: "https://e.com", description: "d" }] },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  assert.equal((await executeWebSearch({ query: "first" })).data.provider, "brave-search");
  assert.equal((await executeWebSearch({ query: "second" })).data.provider, "brave-search");

  assert.deepEqual(calls, ["ollama", "brave", "brave"], "second request must skip the locked key");
});
