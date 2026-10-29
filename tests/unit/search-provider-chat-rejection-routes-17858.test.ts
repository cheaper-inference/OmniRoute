import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #17858 follow-up: the search-provider rejection is converted once in chatCore, so the
// other handleChat entry points (/v1/messages and /v1/responses) must also answer with the
// typed 400 and the POST /v1/search hint instead of rethrowing into an empty 500.

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-search-reject-routes-"));
process.env.DATA_DIR = dataDir;
process.env.REQUIRE_API_KEY = "false";

const originalFetch = globalThis.fetch;
let fetchCalls = 0;
globalThis.fetch = async () => {
  fetchCalls += 1;
  throw new Error("Unexpected upstream request in the search-provider rejection test");
};

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const messagesRoute = await import("../../src/app/api/v1/messages/route.ts");
const responsesRoute = await import("../../src/app/api/v1/responses/route.ts");

test.before(async () => {
  await providersDb.createProviderConnection({
    provider: "anysearch-search",
    authType: "apikey",
    name: "synthetic-search-provider",
    apiKey: "test-only-search-key",
    isActive: true,
    testStatus: "active",
  });
});

test.after(async () => {
  await new Promise((resolve) => setImmediate(resolve));
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function jsonRequest(url: string, body: Record<string, unknown>): Request {
  return new Request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
}

async function assertTypedRejection(response: Response) {
  assert.equal(response.status, 400);
  const text = await response.text();
  assert.ok(text.length > 0, "the rejection must carry a body, not an empty 500");
  assert.match(text, /POST \/v1\/search/);
  assert.match(text, /search_provider_not_chat/);
  assert.doesNotMatch(text, /test-only-search-key|node:internal|\bat .+\(/);
  assert.equal(fetchCalls, 0, "a rejected search provider must never dispatch upstream");
}

test("#17858: /v1/messages returns the typed 400 for a search-only model", async () => {
  fetchCalls = 0;
  const response = await messagesRoute.POST(
    jsonRequest("http://localhost/v1/messages", {
      model: "anysearch-search/web",
      max_tokens: 16,
      messages: [{ role: "user", content: "Reply with OK." }],
      stream: false,
    })
  );
  await assertTypedRejection(response);
});

test("#17858: /v1/responses returns the typed 400 for a search-only model", async () => {
  fetchCalls = 0;
  const response = await responsesRoute.POST(
    jsonRequest("http://localhost/v1/responses", {
      model: "anysearch-search/web",
      input: "Reply with OK.",
      stream: false,
    })
  );
  await assertTypedRejection(response);
});
