// Phase C — runtime catalog fetch and merge.
//
// The catalog endpoint needs the account's bearer token, so it is fetched on
// demand and cached. A failure must NEVER remove models: the curated list stays
// authoritative so routing keeps working offline.
import test from "node:test";
import assert from "node:assert/strict";

import {
  fetchCodeBuddyCatalog,
  clearCodeBuddyCatalogCache,
  CODEBUDDY_CONFIG_PATH,
} from "../../open-sse/executors/codebuddy-intl/catalogFetch.ts";
import { discoverCodeBuddyIntlModels } from "../../open-sse/services/codebuddyIntlCatalog.ts";

const payload = {
  code: 0,
  data: {
    models: [
      { id: "kimi-k3.1-pro", name: "Kimi K3.1 Pro", capabilities: { reasoning: true } },
      { id: "brand-new-model", name: "Brand New" },
    ],
  },
};

function jsonFetch(calls: Array<{ url: string; init: RequestInit }>, body: unknown, status = 200) {
  return (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init: init ?? {} });
    return new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json" },
    });
  }) as unknown as typeof fetch;
}

test("fetches the catalog from /v3/config with the account token", async () => {
  clearCodeBuddyCatalogCache();
  const calls: Array<{ url: string; init: RequestInit }> = [];

  const result = await fetchCodeBuddyCatalog({
    accessToken: "tok",
    fetchImpl: jsonFetch(calls, payload),
    accountKey: "acct-1",
  });

  assert.equal(result.ok, true);
  assert.equal(result.models.length, 2);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, `https://www.codebuddy.ai${CODEBUDDY_CONFIG_PATH}?repos[]=`);
  const headers = calls[0].init.headers as Record<string, string>;
  assert.equal(headers.Authorization, "Bearer tok");
  assert.equal(headers["X-IDE-Type"], "CLI");
});

test("a cached catalog is served without a second request", async () => {
  clearCodeBuddyCatalogCache();
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const opts = { fetchImpl: jsonFetch(calls, payload), accountKey: "acct-cache", now: 1_000 };

  await fetchCodeBuddyCatalog(opts);
  const second = await fetchCodeBuddyCatalog(opts);

  assert.equal(calls.length, 1);
  assert.equal(second.cached, true);
});

test("the cache expires after the TTL", async () => {
  clearCodeBuddyCatalogCache();
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const fetchImpl = jsonFetch(calls, payload);

  await fetchCodeBuddyCatalog({ fetchImpl, accountKey: "acct-ttl", now: 1_000, ttlMs: 100 });
  await fetchCodeBuddyCatalog({ fetchImpl, accountKey: "acct-ttl", now: 2_000, ttlMs: 100 });

  assert.equal(calls.length, 2);
});

test("accounts do not share a cached catalog", async () => {
  clearCodeBuddyCatalogCache();
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const fetchImpl = jsonFetch(calls, payload);

  await fetchCodeBuddyCatalog({ fetchImpl, accountKey: "a", now: 1_000 });
  await fetchCodeBuddyCatalog({ fetchImpl, accountKey: "b", now: 1_000 });

  assert.equal(calls.length, 2);
});

test("an HTTP failure is reported and caches nothing", async () => {
  clearCodeBuddyCatalogCache();
  const calls: Array<{ url: string; init: RequestInit }> = [];

  const result = await fetchCodeBuddyCatalog({
    fetchImpl: jsonFetch(calls, { message: "nope" }, 401),
    accountKey: "acct-401",
  });

  assert.equal(result.ok, false);
  assert.equal(result.status, 401);
  assert.deepEqual(result.models, []);
});

test("a network failure never throws", async () => {
  clearCodeBuddyCatalogCache();
  const failing = (async () => {
    throw new Error("ENOTFOUND");
  }) as unknown as typeof fetch;

  const result = await fetchCodeBuddyCatalog({ fetchImpl: failing, accountKey: "acct-net" });
  assert.equal(result.ok, false);
  assert.match(String(result.error), /ENOTFOUND/);
});

test("a fetch failure leaves the curated list untouched", async () => {
  clearCodeBuddyCatalogCache();
  const curated = [
    { id: "glm-5.2", name: "GLM-5.2" },
    { id: "kimi-k3", name: "Kimi-K3" },
  ];
  const failing = (async () => {
    throw new Error("offline");
  }) as unknown as typeof fetch;

  const resolved = await discoverCodeBuddyIntlModels({
    accessToken: "tok",
    curatedModels: curated,
    fetchImpl: failing,
    accountKey: "acct-offline",
  });

  // `ok: false` is what tells the route to keep its own curated fallback; the
  // list here must stay empty so nothing is persisted over the good rows.
  assert.equal(resolved.ok, false);
  assert.deepEqual(resolved.models, []);
});

test("a successful fetch adds gateway-only models and keeps curated ones", async () => {
  clearCodeBuddyCatalogCache();
  const curated = [{ id: "kimi-k3.1-pro", name: "Kimi (curated)", contextLength: 256000 }];

  const resolved = await discoverCodeBuddyIntlModels({
    accessToken: "tok",
    curatedModels: curated,
    fetchImpl: jsonFetch([], payload),
    accountKey: "acct-merge",
  });

  const ids = resolved.models.map((model) => model.id);
  assert.equal(ids.includes("kimi-k3.1-pro"), true);
  assert.equal(ids.includes("brand-new-model"), true);
  assert.deepEqual(resolved.added, ["brand-new-model"]);
  // The curated metadata survives the merge.
  const curatedRow = resolved.models.find((model) => model.id === "kimi-k3.1-pro");
  assert.equal(curatedRow?.contextLength, 256000);
});
