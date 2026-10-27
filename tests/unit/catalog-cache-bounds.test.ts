import assert from "node:assert/strict";
import test from "node:test";
import type {
  CatalogCacheOptions,
  CatalogPayload,
} from "../../src/app/api/v1/models/catalogCache.ts";
import { createTempDataDir } from "../_setup/tempDataDir.ts";

const { cleanup } = createTempDataDir("omniroute-catalog-bounds-");
const cache = await import("../../src/app/api/v1/models/catalogCache.ts");
const readCache = await import("../../src/lib/db/readCache.ts");

const headers = { corsHeaders: {}, diagnosticHeaders: {} };
function request(after: string) {
  return new Request(`http://localhost/v1/models?after=${after}`, {
    headers: { authorization: "Bearer catalog-bounds-fixture" },
  });
}
function payload(body: string): CatalogPayload {
  return { body, headers: { etag: '"fixture"' }, status: 200, cacheTTL: 60_000 };
}
async function resolve(after: string, body = after) {
  const response = await cache.resolveCachedCatalogResponse(request(after), headers, async () =>
    payload(body)
  );
  return response.text();
}
test.beforeEach(() => cache.__resetCatalogBuilderRunsForTest());
test.after(cleanup);

test("retention regression: response cache evicts after 64 distinct unknown cursors", async () => {
  for (let i = 0; i < 65; i++) await resolve(`unknown-${i}`);
  assert.equal(await resolve("unknown-0", "rebuilt"), "rebuilt");
});

const MAX_BYTES = 16 * 1024 * 1024;
function assertBounded() {
  for (const stats of Object.values(cache.__getCatalogCacheStatsForTest())) {
    assert.ok(stats.entries <= 64);
    assert.ok(stats.bytes >= 0 && stats.bytes <= MAX_BYTES);
  }
}

async function timeoutResponse(after: string) {
  let release!: (value: CatalogPayload) => void;
  const gate = new Promise<CatalogPayload>((done) => {
    release = done;
  });
  const previous = process.env.CATALOG_BUILD_TIMEOUT_MS;
  process.env.CATALOG_BUILD_TIMEOUT_MS = "20";
  try {
    return await cache.resolveCachedCatalogResponse(request(after), headers, () => gate);
  } finally {
    release(payload("completed-after-timeout"));
    await cache.__flushCatalogBackgroundRefreshForTest();
    if (previous === undefined) delete process.env.CATALOG_BUILD_TIMEOUT_MS;
    else process.env.CATALOG_BUILD_TIMEOUT_MS = previous;
  }
}

test("retention regression: last-good evicts after 64 distinct unknown cursors", async () => {
  for (let i = 0; i < 65; i++) await resolve(`unknown-${i}`);
  cache.__expireCatalogCacheForTest(60_000);
  assert.equal((await timeoutResponse("unknown-0")).status, 503);
});

test("retention regression: response cache evicts when retained strings exceed 16 MiB", async () => {
  const body = "界".repeat(3 * 1024 * 1024);
  for (let i = 0; i < 3; i++) await resolve(`bytes-${i}`, body);
  assert.equal((await resolve("bytes-0", "rebuilt")).length, "rebuilt".length);
});

test("retention regression: last-good evicts when retained strings exceed 16 MiB", async () => {
  const body = "界".repeat(3 * 1024 * 1024);
  for (let i = 0; i < 3; i++) await resolve(`bytes-${i}`, body);
  cache.__expireCatalogCacheForTest(60_000);
  assert.equal((await timeoutResponse("bytes-0")).status, 503);
});

test("both maps enforce cardinality and retain recently read entries", async () => {
  for (let i = 0; i < 64; i++) await resolve(`cursor-${i}`);
  assert.equal(await resolve("cursor-0", "unused"), "cursor-0");
  await resolve("cursor-64");
  assertBounded();
  assert.deepEqual(cache.__getCatalogCacheStatsForTest().cache.entries, 64);
  assert.deepEqual(cache.__getCatalogCacheStatsForTest().lastGood.entries, 64);
  cache.__expireCatalogCacheForTest(60_000);
  const retained = await timeoutResponse("cursor-0");
  assert.equal(await retained.text(), "cursor-0");
  assert.equal(retained.headers.get("x-omniroute-catalog"), "last-good");
  const evicted = await timeoutResponse("cursor-1");
  assert.equal(evicted.status, 503);
});

test("large UTF-16 bodies hit the byte budget before the entry cap", async () => {
  const body = "界".repeat(3 * 1024 * 1024);
  for (let i = 0; i < 3; i++) {
    assert.equal((await resolve(`large-${i}`, body)).length, body.length);
    assertBounded();
  }
  const stats = cache.__getCatalogCacheStatsForTest();
  assert.equal(stats.cache.entries, 2);
  assert.equal(stats.lastGood.entries, 2);
  cache.__expireCatalogCacheForTest(60_000);
  const evicted = await timeoutResponse("large-0");
  assert.equal(evicted.status, 503);
  assert.equal(await resolve("large-0", "rebuilt"), "completed-after-timeout");
  assertBounded();
});

test("keys and response headers also count toward the byte budget", async () => {
  const hugeHeader = "h".repeat(9 * 1024 * 1024);
  const response = await cache.resolveCachedCatalogResponse(
    request("headers"),
    headers,
    async () => ({ ...payload("small"), headers: { "x-large": hugeHeader } })
  );
  assert.equal(await response.text(), "small");
  assert.deepEqual(cache.__getCatalogCacheStatsForTest(), {
    cache: { entries: 0, bytes: 0 },
    lastGood: { entries: 0, bytes: 0 },
  });
  const hugeCursor = "k".repeat(9 * 1024 * 1024);
  assert.equal(await resolve(hugeCursor, "small"), "small");
  assert.equal(cache.__getCatalogCacheStatsForTest().cache.entries, 0);
  assert.equal(cache.__getCatalogCacheStatsForTest().lastGood.entries, 0);
});

test("oversized successful payloads return normally without cache admission", async () => {
  const body = "x".repeat(9 * 1024 * 1024);
  assert.equal((await resolve("oversized", body)).length, body.length);
  assert.deepEqual(cache.__getCatalogCacheStatsForTest(), {
    cache: { entries: 0, bytes: 0 },
    lastGood: { entries: 0, bytes: 0 },
  });
  assert.equal(await resolve("oversized", "retry"), "retry");
});

test("unrelated accesses prune expired response entries but preserve timeout last-good", async (t) => {
  t.mock.timers.enable({ apis: ["Date"] });
  await resolve("old", "last-success");
  t.mock.timers.tick(90_001);
  await resolve("new");
  assert.equal(cache.__getCatalogCacheStatsForTest().cache.entries, 1);
  assert.equal(cache.__getCatalogCacheStatsForTest().lastGood.entries, 2);
  const response = await timeoutResponse("old");
  assert.equal(await response.text(), "last-success");
  assert.equal(response.headers.get("x-omniroute-catalog"), "last-good");
  assert.equal(response.headers.get("etag"), '"fixture"');
});

test("SWR remains eligible until its window ends, and expired errors are pruned", async (t) => {
  t.mock.timers.enable({ apis: ["Date"] });
  await resolve("swr", "stale");
  t.mock.timers.tick(60_001);
  const scheduled: Array<() => Promise<unknown>> = [];
  const response = await cache.resolveCachedCatalogResponse(
    request("swr"),
    headers,
    async () => payload("refresh"),
    { scheduleBackgroundRefresh: (task) => scheduled.push(task) }
  );
  assert.equal(await response.text(), "stale");
  assert.equal(scheduled.length, 1);
  await scheduled[0]();
  assert.equal(await resolve("swr"), "refresh");
  await cache.resolveCachedCatalogResponse(request("error"), headers, async () => ({
    ...payload("error"),
    status: 500,
    cacheTTL: 1,
  }));
  t.mock.timers.tick(2);
  await resolve("sweep");
  assert.equal(cache.__getCatalogCacheStatsForTest().cache.entries, 2);
  assertBounded();
});

test("replacement, expiration and generation invalidation reset accounting", async () => {
  await resolve("replace", "x".repeat(1024));
  cache.__expireCatalogCacheForTest(60_000);
  await resolve("replace", "small");
  const stats = cache.__getCatalogCacheStatsForTest();
  assert.equal(stats.cache.entries, 1);
  assert.equal(stats.lastGood.entries, 1);
  assert.equal(stats.cache.bytes, stats.lastGood.bytes);
  assert.ok(stats.cache.bytes < 1024);
  readCache.invalidateModelCatalogCache();
  const response = await timeoutResponse("replace");
  assert.equal(response.status, 503);
  cache.__resetCatalogBuilderRunsForTest();
  assert.deepEqual(cache.__getCatalogCacheStatsForTest(), {
    cache: { entries: 0, bytes: 0 },
    lastGood: { entries: 0, bytes: 0 },
  });
});

test("authorization, prefix, pagination and catalog-option keys stay isolated", async () => {
  const cases: Array<[Request, CatalogCacheOptions | undefined]> = [
    [request("shared"), undefined],
    [
      new Request("http://localhost/v1/models?after=shared", {
        headers: { authorization: "Bearer other-fixture" },
      }),
      undefined,
    ],
    [
      new Request("http://localhost/v1/models?after=shared&prefix=other", {
        headers: request("shared").headers,
      }),
      undefined,
    ],
    [
      new Request("http://localhost/v1/models?after=shared&limit=1", {
        headers: request("shared").headers,
      }),
      undefined,
    ],
    [
      new Request("http://localhost/v1/models?after=shared&configuredOnly=true", {
        headers: request("shared").headers,
      }),
      undefined,
    ],
    [
      new Request(request("shared"), {
        headers: { authorization: "Bearer catalog-bounds-fixture", originator: "codex_cli_rs" },
      }),
      undefined,
    ],
    [request("shared"), { hideAutoCombos: true }],
    [request("shared"), { hideNoThinkVariants: true }],
  ];
  for (let i = 0; i < cases.length; i++) {
    const [req, options] = cases[i];
    const response = await cache.resolveCachedCatalogResponse(
      req,
      headers,
      async () => payload(`body-${i}`),
      options
    );
    assert.equal(await response.text(), `body-${i}`);
  }
  for (let i = 0; i < cases.length; i++) {
    const [req, options] = cases[i];
    const response = await cache.resolveCachedCatalogResponse(
      req,
      headers,
      async () => payload("wrong"),
      options
    );
    assert.equal(await response.text(), `body-${i}`);
    assert.equal(response.headers.get("etag"), '"fixture"');
  }
  assert.equal(cache.__getCatalogBuilderRunsForTest(), cases.length);
});

test("parallel identical requests still coalesce under cache pressure", async () => {
  for (let i = 0; i < 64; i++) await resolve(`pressure-${i}`);
  let release!: () => void;
  const gate = new Promise<void>((done) => {
    release = done;
  });
  const build = async () => {
    await gate;
    return payload("shared-result");
  };
  const calls = Array.from({ length: 12 }, () =>
    cache.resolveCachedCatalogResponse(request("parallel"), headers, build)
  );
  release();
  for (const response of await Promise.all(calls))
    assert.equal(await response.text(), "shared-result");
  assert.equal(cache.__getCatalogBuilderRunsForTest(), 65);
  assertBounded();
});

for (const oversizedPart of ["body", "headers"] as const) {
  test(`oversized ${oversizedPart} refresh preserves an existing last-good response`, async () => {
    const key = `oversized-refresh-${oversizedPart}`;
    assert.equal(await resolve(key, "prior-last-good"), "prior-last-good");
    const prior = cache.__getCatalogCacheStatsForTest().lastGood;
    cache.__expireCatalogCacheForTest(60_000);
    const huge = "x".repeat(9 * 1024 * 1024);
    const replacement: CatalogPayload = {
      ...payload(oversizedPart === "body" ? huge : "new-large-header"),
      headers: oversizedPart === "headers" ? { etag: '"new"', "x-large": huge } : { etag: '"new"' },
    };
    const retainedSnapshots: Array<{ entries: number; bytes: number }> = [];
    for (let attempt = 0; attempt < 2; attempt++) {
      const response = await cache.resolveCachedCatalogResponse(
        request(key),
        headers,
        async () => replacement
      );
      assert.equal(response.status, 200);
      assert.equal(await response.text(), replacement.body);
      assert.equal(cache.__getCatalogBuilderRunsForTest(), attempt + 2);
      assert.equal(cache.__getCatalogCacheStatsForTest().cache.entries, 0);
      retainedSnapshots.push(cache.__getCatalogCacheStatsForTest().lastGood);
      assertBounded();
    }
    const fallback = await timeoutResponse(key);
    assert.equal(fallback.status, 200);
    assert.equal(await fallback.text(), "prior-last-good");
    assert.equal(fallback.headers.get("x-omniroute-catalog"), "last-good");
    assert.equal(fallback.headers.get("etag"), '"fixture"');
    for (const snapshot of retainedSnapshots) assert.deepEqual(snapshot, prior);
    assertBounded();
  });
}
