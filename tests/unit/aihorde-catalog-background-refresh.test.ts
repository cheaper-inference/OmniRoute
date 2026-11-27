import assert from "node:assert/strict";
import test, { type TestContext } from "node:test";
import { setImmediate } from "node:timers/promises";

import { HordeImageCatalog } from "../../open-sse/services/aihordeImageCatalog.ts";

const FLAG = "AIHORDE_CATALOG_BACKGROUND_REFRESH_ENABLED";
const MODEL_NAME = "FLUX.1-schnell";
const PENDING = Symbol("catalog still waiting for fetch");

function setFlag(context: TestContext, value: "true" | "false"): void {
  const original = process.env[FLAG];
  process.env[FLAG] = value;
  context.after(() => {
    if (original === undefined) delete process.env[FLAG];
    else process.env[FLAG] = original;
  });
}

function hordeResponse(): Response {
  return Response.json([{ name: MODEL_NAME, count: 2, type: "image" }]);
}

// Follow the /v1/models call path: ensure freshness before reading cached models.
async function readModelNames(catalog: HordeImageCatalog, maxAgeMs?: number): Promise<string[]> {
  await catalog.ensureFresh(maxAgeMs);
  return catalog.listModels().map(({ name }) => name);
}

test("flag off waits for the AI Horde fetch", async (context) => {
  setFlag(context, "false");
  const catalog = new HordeImageCatalog();
  const fetch = Promise.withResolvers<Response>();
  catalog.setFetch(() => fetch.promise);

  const listing = readModelNames(catalog);
  const beforeFetch = await Promise.race([listing, setImmediate(PENDING)]);
  fetch.resolve(hordeResponse());

  assert.equal(beforeFetch, PENDING);
  assert.deepEqual(await listing, [MODEL_NAME]);
});

test("flag on serves an empty cold snapshot and publishes the next snapshot", async (context) => {
  setFlag(context, "true");
  const catalog = new HordeImageCatalog();
  const fetch = Promise.withResolvers<Response>();
  catalog.setFetch(() => fetch.promise);

  const listing = readModelNames(catalog);
  const beforeFetch = await Promise.race([listing, setImmediate(PENDING)]);
  fetch.resolve(hordeResponse());
  await catalog.refresh();

  assert.deepEqual(beforeFetch, [], "a cold listing must settle while the fetch is pending");
  assert.deepEqual(await readModelNames(catalog), [MODEL_NAME]);
});

test("flag on lets concurrent listings return while sharing one fetch", async (context) => {
  setFlag(context, "true");
  const catalog = new HordeImageCatalog();
  const fetch = Promise.withResolvers<Response>();
  const fetchModels = context.mock.fn(() => fetch.promise);
  catalog.setFetch(fetchModels);

  const listings = Promise.all([readModelNames(catalog), readModelNames(catalog)]);
  const beforeFetch = await Promise.race([listings, setImmediate(PENDING)]);
  const callsBeforeFetchResolved = fetchModels.mock.callCount();
  fetch.resolve(hordeResponse());
  await catalog.refresh();

  assert.equal(callsBeforeFetchResolved, 1);
  assert.deepEqual(beforeFetch, [[], []], "neither listing should join the pending fetch");
});

test("flag on keeps the previous snapshot when the background fetch rejects", async (context) => {
  setFlag(context, "true");
  const catalog = new HordeImageCatalog();
  catalog.setFetch(async () => hordeResponse());
  await catalog.refresh();
  const fetch = Promise.withResolvers<Response>();
  catalog.setFetch(() => fetch.promise);

  const listing = readModelNames(catalog, 0);
  const beforeFailure = await Promise.race([listing, setImmediate(PENDING)]);
  fetch.reject(new Error("Horde unavailable"));
  await assert.doesNotReject(catalog.refresh());

  assert.deepEqual(beforeFailure, [MODEL_NAME], "the stale snapshot must be served immediately");
  assert.deepEqual(await listing, [MODEL_NAME]);
  assert.deepEqual(
    catalog.listModels().map(({ name }) => name),
    [MODEL_NAME]
  );
  assert.equal(catalog.snapshot.lastError, "Horde unavailable");
});

test("flag on still waits when the caller supplies a timeout and abort signal", async (context) => {
  setFlag(context, "true");
  const catalog = new HordeImageCatalog();
  const fetch = Promise.withResolvers<Response>();
  const signal = new AbortController().signal;
  catalog.setFetch((_input, options) => {
    assert.equal(options?.timeoutMs, 1_000);
    assert.equal(options?.signal, signal);
    return fetch.promise;
  });

  const refresh = catalog.ensureFresh(undefined, { timeoutMs: 1_000, signal });
  const beforeFetch = await Promise.race([refresh, setImmediate(PENDING)]);
  fetch.resolve(hordeResponse());

  assert.equal(beforeFetch, PENDING);
  await refresh;
  assert.equal(catalog.isServed(MODEL_NAME), true);
});
