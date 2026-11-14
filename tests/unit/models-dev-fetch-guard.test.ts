/**
 * models.dev catalog fetch guard (src/lib/modelsDevSync.ts):
 *  - a response that is not a usable catalog never replaces the cache or the stored pricing
 *  - a declared body above 16 MiB is refused before it is read
 *  - after the cache expires, the last ETag is sent as If-None-Match and a 304 keeps the cache
 */
import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-models-dev-guard-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");

const modulePath = path.join(process.cwd(), "src/lib/modelsDevSync.ts");
const originalFetch = globalThis.fetch;

const CATALOG = {
  openai: {
    id: "openai",
    models: {
      "gpt-4o": {
        id: "gpt-4o",
        name: "GPT-4o",
        tool_call: true,
        cost: { input: 2.5, output: 10 },
        limit: { context: 128000, output: 16384 },
      },
    },
  },
};

async function importFresh(label: string) {
  return await import(
    `${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}-${Math.random()}`
  );
}

function json(body: unknown, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json", ...headers },
  });
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  mock.timers.reset();
  core.resetDbInstance();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("an empty catalog response keeps the stored pricing", async () => {
  const good = await importFresh("guard-good");
  globalThis.fetch = (async () => json(CATALOG)) as typeof fetch;
  assert.equal((await good.syncModelsDev({ maxRetries: 0 })).success, true);
  assert.ok(good.getModelsDevPricing().openai["gpt-4o"], "pricing stored by the good sync");

  const bad = await importFresh("guard-empty");
  globalThis.fetch = (async () => json({})) as typeof fetch;
  const result = await bad.syncModelsDev({ maxRetries: 0 });

  assert.equal(result.success, false);
  assert.ok(good.getModelsDevPricing().openai["gpt-4o"], "a bad response must not wipe pricing");
});

test("non-catalog JSON bodies are rejected", async () => {
  for (const body of [[], null, "text", 42, { openai: "nope" }, { openai: { id: "openai" } }]) {
    const mod = await importFresh("guard-shape");
    globalThis.fetch = (async () => json(body)) as typeof fetch;
    await assert.rejects(() => mod.fetchModelsDev(), /unusable catalog/, JSON.stringify(body));
  }
});

test("a declared body above 16 MiB is refused before it is read", async () => {
  const mod = await importFresh("guard-size");
  const response = json(CATALOG, { "content-length": String(17 * 1024 * 1024) });
  globalThis.fetch = (async () => response) as typeof fetch;

  await assert.rejects(() => mod.fetchModelsDev(), /too large/);
  assert.equal(response.bodyUsed, false, "the oversized body must not be read");
});

test("a body above 16 MiB with no declared length is refused before parsing", async () => {
  const mod = await importFresh("guard-size-undeclared");
  const big = "x".repeat(16 * 1024 * 1024 + 1);
  globalThis.fetch = (async () => new Response(big, { status: 200 })) as typeof fetch;

  await assert.rejects(() => mod.fetchModelsDev(), /too large/);
});

test("an expired cache revalidates with If-None-Match and a 304 keeps the data", async () => {
  mock.timers.enable({ apis: ["Date"], now: Date.now() });
  const mod = await importFresh("guard-etag");
  const sent: Array<string | null> = [];
  let status = 200;
  globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
    sent.push(new Headers(init?.headers).get("if-none-match"));
    return status === 304 ? new Response(null, { status: 304 }) : json(CATALOG, { etag: '"v1"' });
  }) as typeof fetch;

  const first = await mod.fetchModelsDev();
  assert.deepEqual(sent, [null], "no validator on the first request");

  mock.timers.tick(25 * 60 * 60 * 1000);
  status = 304;
  const second = await mod.fetchModelsDev();
  assert.equal(second, first, "304 keeps the same catalog object");
  assert.deepEqual(sent, [null, '"v1"']);

  await mod.fetchModelsDev();
  assert.equal(sent.length, 2, "a 304 renews the cache window");
});
