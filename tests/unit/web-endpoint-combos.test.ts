import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-web-combos-"));
process.env.DATA_DIR = directory;
process.env.API_KEY_SECRET = "web-combo-test-secret";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const combos = await import("../../src/lib/db/combos.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const search = await import("../../src/app/api/v1/search/route.ts");
const fetchRoute = await import("../../src/app/api/v1/web/fetch/route.ts");

const originalFetch = globalThis.fetch;
test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(directory, { recursive: true });
});
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function connection(provider: string, key = "test-key") {
  return providers.createProviderConnection({
    provider,
    authType: "apikey",
    apiKey: key,
    name: `${provider}-${key}`,
    isActive: true,
    testStatus: "active",
  });
}
function request(endpoint: string, body: Record<string, unknown>, bearer?: string) {
  return new Request(`http://localhost/api/v1/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
    },
    body: JSON.stringify(body),
  });
}

test("search runs a named mixed combo in configured order and never calls chat", async () => {
  await connection("tavily-search");
  await connection("serper-search");
  await combos.createCombo({
    name: "mixed",
    strategy: "priority",
    models: ["openai/gpt-4o", "tavily-search/web", "serper-search/web"],
  });
  const calls: string[] = [];
  globalThis.fetch = async (url) => {
    const host = new URL(String(url)).hostname;
    calls.push(host);
    if (host === "api.tavily.com")
      return Response.json({ error: "plan exhausted" }, { status: 432 });
    if (host === "google.serper.dev")
      return Response.json({
        organic: [{ title: "Result", link: "https://example.com", snippet: "Useful evidence" }],
      });
    throw new Error(`Unexpected upstream ${host}`);
  };
  const response = await search.POST(request("search", { query: "test combo", model: "mixed" }));
  assert.equal(response.status, 200, await response.clone().text());
  assert.deepEqual(calls, ["api.tavily.com", "google.serper.dev"]);
  const body = await response.json();
  assert.equal(body.provider, "serper-search");
  assert.equal(body.results[0].url, "https://example.com");
});

test("fetch filters chat and search-only targets before selecting credentials", async () => {
  await connection("tavily-search");
  await connection("firecrawl");
  await combos.createCombo({
    name: "mixed",
    strategy: "priority",
    models: ["openai/gpt-4o", "serper-search/web", "tavily-search/web", "firecrawl/web"],
  });
  const calls: string[] = [];
  globalThis.fetch = async (url) => {
    const host = new URL(String(url)).hostname;
    calls.push(host);
    if (host === "api.tavily.com")
      return Response.json({ results: [{ raw_content: "Extracted page" }] });
    if (host === "api.firecrawl.dev")
      return Response.json({ success: true, data: { markdown: "Other page" } });
    throw new Error(`Unexpected upstream ${host}`);
  };
  const response = await fetchRoute.POST(
    request("web/fetch", { url: "https://example.com", model: "mixed" })
  );
  assert.equal(response.status, 200, await response.clone().text());
  assert.deepEqual(calls, ["api.tavily.com"]);
  assert.equal((await response.json()).content, "Extracted page");
});

test("direct search-only chat requests return actionable JSON rather than an empty 500", async () => {
  await connection("tavily-search");
  const chat = await import("../../src/app/api/v1/chat/completions/route.ts");
  const calls: string[] = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    throw new Error("No upstream is allowed for a search-only chat target");
  };
  const response = await chat.POST(
    request("chat/completions", {
      model: "tavily-search/web",
      messages: [{ role: "user", content: "test" }],
    })
  );
  assert.equal(response.status, 400);
  assert.match((await response.json()).error.message, /search/);
  assert.deepEqual(calls, []);
});

for (const endpoint of ["search", "web/fetch"] as const) {
  const route = endpoint === "search" ? search : fetchRoute;
  const payload =
    endpoint === "search" ? { query: "scoped combo" } : { url: "https://example.com" };
  test(`${endpoint} preserves account pins and never widens the API key scope`, async () => {
    const a = await connection("tavily-search", "secret-a");
    const b = await connection("tavily-search", "secret-b");
    await combos.createCombo({
      name: "pinned",
      strategy: "priority",
      models: [
        { id: "account-b", providerId: "tavily-search", model: "web", connectionId: b.id },
        { id: "account-a", providerId: "tavily-search", model: "web", connectionId: a.id },
      ],
    });
    const key = await apiKeys.createApiKey("scoped", "test", [], {
      allowedConnections: [a.id as string],
    });
    const calls: string[] = [];
    globalThis.fetch = async (_url, init) => {
      calls.push(`${JSON.stringify(init?.headers)} ${String(init?.body)}`);
      return endpoint === "search"
        ? Response.json({
            results: [{ title: "Result", url: "https://example.com", content: "Text" }],
          })
        : Response.json({ results: [{ raw_content: "Page" }] });
    };
    const response = await route.POST(
      request(endpoint, { ...payload, model: "pinned" }, key.key as string)
    );
    assert.equal(response.status, 200, await response.clone().text());
    assert.equal(calls.length, 1);
    assert.match(calls[0], /secret-a/);
    assert.doesNotMatch(calls[0], /secret-b/);
  });

  test(`${endpoint} validates named routing without making upstream calls`, async () => {
    const calls: string[] = [];
    globalThis.fetch = async (url) => {
      calls.push(String(url));
      throw new Error("No dispatch expected");
    };
    await combos.createCombo({
      name: "chat-only",
      strategy: "priority",
      models: ["openai/gpt-4o"],
    });
    await combos.createCombo({
      name: "unsupported",
      strategy: "round-robin",
      models: ["tavily-search/web"],
    });
    for (const [body, status] of [
      [{ ...payload, model: "absent" }, 404],
      [{ ...payload, model: "chat-only" }, 400],
      [{ ...payload, model: "unsupported" }, 400],
      [{ ...payload, model: "chat-only", provider: "tavily-search" }, 400],
    ] as const) {
      const response = await route.POST(request(endpoint, body));
      assert.equal(response.status, status, await response.clone().text());
      assert.ok((await response.json()).error);
    }
    assert.deepEqual(calls, []);
  });
}

test("nested execute-mode web combos retain endpoint capability", async () => {
  await connection("tavily-search");
  await combos.createCombo({
    name: "child",
    strategy: "priority",
    models: ["openai/gpt-4o", "tavily-search/web"],
  });
  await combos.createCombo({
    name: "parent",
    strategy: "priority",
    config: { nestedComboMode: "execute" },
    models: [{ id: "child-step", kind: "combo-ref", comboName: "child" }],
  });
  const calls: string[] = [];
  globalThis.fetch = async (url) => {
    calls.push(new URL(String(url)).hostname);
    return Response.json({
      results: [{ title: "Nested", url: "https://example.com", content: "Nested" }],
    });
  };
  const response = await search.POST(request("search", { query: "nested", model: "parent" }));
  assert.equal(response.status, 200, await response.clone().text());
  assert.deepEqual(calls, ["api.tavily.com"]);
});

test("search skips unconfigured combo entries with a named-combo key grant", async () => {
  await connection("serper-search");
  await combos.createCombo({
    name: "sparse",
    strategy: "priority",
    models: ["tavily-search/web", "serper-search/web"],
  });
  const key = await apiKeys.createApiKey("blocked", "test", []);
  const calls: string[] = [];
  globalThis.fetch = async (url) => {
    calls.push(new URL(String(url)).hostname);
    return Response.json({ organic: [{ title: "Allowed", link: "https://example.com" }] });
  };
  const response = await search.POST(
    request("search", { query: "sparse", model: "sparse" }, key.key as string)
  );
  assert.equal(response.status, 200, await response.clone().text());
  assert.deepEqual(calls, ["google.serper.dev"]);
});

test("a key without the requested combo grant cannot reach its providers", async () => {
  await connection("tavily-search");
  await combos.createCombo({
    name: "private-combo",
    strategy: "priority",
    models: ["tavily-search/web"],
  });
  const key = await apiKeys.createApiKey("denied", "test", [], {
    allowedCombos: ["different-combo"],
  });
  const calls: string[] = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    throw new Error("No dispatch expected");
  };
  const response = await search.POST(
    request("search", { query: "denied", model: "private-combo" }, key.key as string)
  );
  assert.equal(response.status, 403, await response.clone().text());
  assert.deepEqual(calls, []);
});

test("quota failure advances to the next pinned account of the same provider", async () => {
  const a = await connection("tavily-search", "exhausted-account");
  const b = await connection("tavily-search", "ready-account");
  await combos.createCombo({
    name: "accounts",
    strategy: "priority",
    models: [
      { id: "first", providerId: "tavily-search", model: "web", connectionId: a.id },
      { id: "second", providerId: "tavily-search", model: "web", connectionId: b.id },
    ],
  });
  const calls: string[] = [];
  globalThis.fetch = async (_url, init) => {
    const body = `${JSON.stringify(init?.headers)} ${String(init?.body)}`;
    calls.push(body);
    return body.includes("exhausted-account")
      ? Response.json({ error: "plan exhausted" }, { status: 432 })
      : Response.json({
          results: [{ title: "Recovered", url: "https://example.com", content: "Text" }],
        });
  };
  const response = await search.POST(
    request("search", { query: "account fallback", model: "accounts" })
  );
  assert.equal(response.status, 200, await response.clone().text());
  assert.equal(calls.length, 2);
  assert.match(calls[0], /exhausted-account/);
  assert.match(calls[1], /ready-account/);
});

test("fetch combo quota fallback stays within the configured provider order", async () => {
  await connection("tavily-search");
  await connection("firecrawl");
  await combos.createCombo({
    name: "fetch-fallback",
    strategy: "fill-first",
    models: ["tavily-search/web", "firecrawl/web"],
  });
  const calls: string[] = [];
  globalThis.fetch = async (url) => {
    const host = new URL(String(url)).hostname;
    calls.push(host);
    return host === "api.tavily.com"
      ? Response.json({ error: "quota exhausted" }, { status: 429 })
      : Response.json({ success: true, data: { markdown: "Recovered page" } });
  };
  const response = await fetchRoute.POST(
    request("web/fetch", { url: "https://example.com", model: "fetch-fallback" })
  );
  assert.equal(response.status, 200, await response.clone().text());
  assert.deepEqual(calls, ["api.tavily.com", "api.firecrawl.dev"]);
  assert.equal((await response.json()).provider, "firecrawl");
});
