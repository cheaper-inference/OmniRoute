import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-search-borrowed-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "search-borrowed-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const searchProxy = await import("../../open-sse/handlers/search/searchProxy.ts");
const { SEARCH_PROVIDERS } = await import("../../open-sse/config/searchRegistry.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");

test.after(async () => {
  await closeCallLogSaves(500).catch(() => {});
  try {
    core.resetDbInstance();
  } catch {}
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {}
});

type ConnectionRow = {
  id?: string | number;
  testStatus?: string;
  rateLimitedUntil?: string | null;
};

async function failSearchCall(
  searchProviderId: string,
  connectionProvider: string,
  status: number
) {
  const server = http.createServer((_req, res) => {
    res.writeHead(status, { "Content-Type": "application/json", Connection: "close" });
    res.end(JSON.stringify({ error: "rate limit reached" }));
  });
  const port = await new Promise<number>((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve((server.address() as { port: number }).port));
  });
  const conn = await providersDb.createProviderConnection({
    provider: connectionProvider,
    authType: "apikey",
    name: `${connectionProvider}-key`,
    apiKey: "test-key-0001",
    isActive: true,
    testStatus: "active",
  });
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  timer.unref?.();
  try {
    const result = await searchProxy.executeProviderFetch({
      config: SEARCH_PROVIDERS[searchProviderId],
      url: `http://127.0.0.1:${port}/search`,
      init: { method: "POST", headers: { "Content-Type": "application/json" } },
      controller,
      timer,
      query: "test query",
      searchType: "web",
      maxResults: 5,
      startTime: Date.now(),
      connectionId: String(conn.id),
      proxy: null,
      proxyLevel: "none",
      normalize: () => ({ results: [], totalResults: 0 }),
    });
    assert.equal(result.success, false);
    assert.equal(result.status, status);
  } finally {
    clearTimeout(timer);
    await new Promise<void>((resolve) => {
      server.closeAllConnections?.();
      server.close(() => resolve());
    });
  }
  const rows = (await providersDb.getProviderConnections({
    provider: connectionProvider,
  })) as ConnectionRow[];
  return rows.find((row) => String(row.id) === String(conn.id));
}

test("a 429 on a borrowed chat key does not cool the shared chat connection", async () => {
  // ollama-search has no keys of its own: it reuses the ollama-cloud chat key.
  const chat = await failSearchCall("ollama-search", "ollama-cloud", 429);

  assert.ok(chat);
  assert.equal(chat.testStatus, "active", "chat connection must stay active");
  assert.ok(!chat.rateLimitedUntil, "chat connection must not get a cooldown from search");
});

test("a 429 on a search provider's own key still cools that connection", async () => {
  const own = await failSearchCall("tavily-search", "tavily-search", 429);

  assert.ok(own);
  assert.equal(own.testStatus, "unavailable");
  assert.ok(own.rateLimitedUntil, "own search key keeps its cooldown");
});
