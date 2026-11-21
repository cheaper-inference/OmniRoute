import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import type { AddressInfo } from "node:net";
import { collectCatalog } from "../src/catalog.js";
import { parsePluginOptions, toResolvedOptions } from "../src/options.js";
import { defaultOmniRouteModelsFetcher } from "../src/shared/models-map.js";
import type { OmniRouteRawModelEntry } from "../src/shared/models-map.js";

const baseOpts = {
  providerId: "omniroute",
  baseURL: "https://gw.example.com",
  apiKey: "k",
  timeoutMs: 1000,
  modelCacheTtlMs: 300000,
  usableOnly: false,
  enrichment: false as const,
  // Publish the full catalog: no showcase or freshness narrowing, so a row's
  // presence depends only on the explicit filters under test here.
  visibleModels: ["*"],
};

const ROUTER_ROWS = [
  { id: "bzl/auto:free", object: "model", owned_by: "bzl", context_length: 128000 },
  { id: "kg/openrouter/free", object: "model", owned_by: "kg", context_length: 128000 },
];

const DIRECT_ROWS = [
  { id: "ovh-free/gpt-oss-120b", object: "model", owned_by: "ovh-free", context_length: 128000 },
  {
    id: "openrouter/baidu/ernie-5.5-flash-preview:free",
    object: "model",
    owned_by: "openrouter",
    context_length: 128000,
  },
];

const COMBO_ROW = { id: "kg/my-combo", object: "model", owned_by: "combo", context_length: 128000 };

const servers: http.Server[] = [];
afterEach(async () => {
  while (servers.length > 0) {
    const server = servers.pop();
    if (server) await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

/** Read the raw rows through the same production fetcher `collectCatalog` uses. */
async function entriesThroughReader(
  rows: Array<Record<string, unknown>>
): Promise<OmniRouteRawModelEntry[]> {
  const server = http.createServer((_req, res) => {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ object: "list", data: rows }));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  servers.push(server);
  const port = (server.address() as AddressInfo).port;
  return defaultOmniRouteModelsFetcher(`http://127.0.0.1:${port}`, "k", 2000);
}

async function catalogKeys(
  raw: OmniRouteRawModelEntry[],
  opts: Record<string, unknown> = {}
): Promise<string[]> {
  const collected = await collectCatalog(
    { ...baseOpts, ...opts } as never,
    {
      fetcher: async () => raw,
      combosFetcher: async () => [],
      usageFetcher: async () => [],
    } as never
  );
  return [...collected.entries.keys()];
}

describe("routers option hides routing entries from the published catalog", () => {
  it("routers false drops both live router ids", async () => {
    const raw = await entriesThroughReader([...ROUTER_ROWS, ...DIRECT_ROWS]);
    const keys = await catalogKeys(raw, { routers: false });
    assert.ok(!keys.includes("omniroute/bzl/auto:free"), "bzl/auto:free must be hidden");
    assert.ok(!keys.includes("omniroute/kg/openrouter/free"), "kg/openrouter/free must be hidden");
  });

  it("an absent routers option keeps the current catalog", async () => {
    const raw = await entriesThroughReader([...ROUTER_ROWS, ...DIRECT_ROWS]);
    const absent = await catalogKeys(raw);
    const explicitTrue = await catalogKeys(raw, { routers: true });
    assert.ok(absent.includes("omniroute/bzl/auto:free"));
    assert.ok(absent.includes("omniroute/kg/openrouter/free"));
    assert.deepEqual(absent, explicitTrue, "default equals routers: true");
  });

  it("combos false and routers false drop combos and routers together", async () => {
    const raw = await entriesThroughReader([...ROUTER_ROWS, COMBO_ROW]);
    const keys = await catalogKeys(raw, { combos: false, routers: false });
    assert.ok(!keys.includes("omniroute/bzl/auto:free"));
    assert.ok(!keys.includes("omniroute/kg/openrouter/free"));
    assert.ok(!keys.includes("omniroute/kg/my-combo"), "combo rows stay hidden by combos false");
  });

  it("routers false leaves direct and free models published", async () => {
    const raw = await entriesThroughReader([...ROUTER_ROWS, ...DIRECT_ROWS]);
    const keys = await catalogKeys(raw, { routers: false });
    assert.ok(keys.includes("omniroute/ovh-free/gpt-oss-120b"));
    assert.ok(
      keys.includes("omniroute/openrouter/baidu/ernie-5.5-flash-preview:free"),
      "a :free direct model must stay published"
    );
  });

  it("routers false keeps a user combo whose id looks like a router", async () => {
    const comboAsRouter = {
      id: "kg/auto-fallback",
      object: "model",
      owned_by: "combo",
      context_length: 128000,
    };
    const raw = await entriesThroughReader([...ROUTER_ROWS, ...DIRECT_ROWS, comboAsRouter]);
    const comboSource = { combosSource: "models" as const, visibleModels: ["*"] };
    const off = await catalogKeys(raw, { ...comboSource, routers: false });
    const on = await catalogKeys(raw, { ...comboSource, routers: true });
    assert.ok(
      off.includes("omniroute/kg/auto-fallback"),
      "a user combo stays published when routers is false"
    );
    assert.ok(
      on.includes("omniroute/kg/auto-fallback"),
      "the same combo is published with routers on"
    );
    assert.ok(!off.includes("omniroute/bzl/auto:free"), "routers are still hidden");
    assert.ok(!off.includes("omniroute/kg/openrouter/free"), "routers are still hidden");
    assert.ok(on.includes("omniroute/bzl/auto:free"), "routers stay published with routers on");
  });
});

describe("router entry predicate", () => {
  it("recognizes the four routing ids and rejects direct models", async () => {
    const { isRouterEntryId } = await import("../src/shared/router-id.js");
    for (const id of ["auto", "auto/best-coding", "bzl/auto:free", "kg/openrouter/free"]) {
      assert.equal(isRouterEntryId(id), true, `${id} must be recognized as a router`);
    }
    for (const id of ["ovh-free/gpt-oss-120b", "openrouter/baidu/ernie-5.5-flash-preview:free"]) {
      assert.equal(isRouterEntryId(id), false, `${id} must stay a direct model`);
    }
  });

  it("matches the gateway router segments only when they are whole segments", async () => {
    const { isRouterEntryId } = await import("../src/shared/router-id.js");
    for (const id of ["kg/pareto-code", "kg/bodybuilder", "gw/pareto-code/latest"]) {
      assert.equal(isRouterEntryId(id), true, `${id} must be recognized as a router`);
    }
    for (const id of [
      "kg/pareto-code-extra",
      "kg/x-bodybuilder",
      "pareto-code/gpt-4",
      "bodybuilder/gpt-4",
    ]) {
      assert.equal(isRouterEntryId(id), false, `${id} must stay a direct model`);
    }
  });
});

describe("routers option schema", () => {
  it("defaults to true and follows an explicit value", () => {
    const raw = { baseURL: "https://gw.example.com" };
    const defaults = parsePluginOptions(raw);
    assert.equal(defaults.routers, true);
    assert.equal(toResolvedOptions(defaults).routers, true);
    const off = parsePluginOptions({ ...raw, routers: false });
    assert.equal(off.routers, false);
    assert.equal(toResolvedOptions(off).routers, false);
  });
});
