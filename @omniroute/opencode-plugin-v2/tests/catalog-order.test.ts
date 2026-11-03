import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildProviderPayload, collectCatalog, type CollectedCatalog } from "../src/catalog.js";
import { parsePluginOptions } from "../src/options.js";
import { compareByRecency } from "../src/catalog-freshness.js";
import {
  catalogOrderComparator,
  toOrderEntry,
  type CatalogOrderEntry,
  type CatalogOrderSpec,
} from "../src/catalog-order.js";
import type { LegacyModel } from "../src/legacy-model.js";
import type { OmniRouteRawModelEntry } from "../src/shared/models-map.js";

const baseOpts = {
  providerId: "omniroute",
  baseURL: "https://gw.example.com",
  apiKey: "k",
  timeoutMs: 1000,
  modelCacheTtlMs: 300000,
  usableOnly: false,
};

type Raw = OmniRouteRawModelEntry;

/** Publish through the production reader (collectCatalog) and return the payload. */
async function publish(
  rawModels: Raw[],
  opts: Record<string, unknown> = {},
  enrichment: Map<string, unknown> = new Map()
): Promise<{ collected: CollectedCatalog; payload: { info: unknown; models: unknown[] } }> {
  const all = { ...baseOpts, ...opts };
  const collected = await collectCatalog(all as never, {
    fetcher: async () => rawModels,
    combosFetcher: async () => [],
    enrichmentFetcher: async () => enrichment,
  });
  const payload = buildProviderPayload(collected, all as never);
  return { collected, payload };
}

function ids(payload: { models: unknown[] }): string[] {
  return payload.models.map((m) => String((m as { id: string }).id));
}

describe("published catalog order", () => {
  it("defaults to provider, then name, then newest release date, then id — and is deterministic", async () => {
    const raw: Raw[] = [
      { id: "zz/zeta-9", release_date: "2026-01-05T00:00:00Z" },
      { id: "ac/alpha-2", release_date: "2026-01-09T00:00:00Z" },
      { id: "ac/alpha-1", release_date: "2026-01-02T00:00:00Z" },
    ];
    const { collected, payload } = await publish(raw);
    assert.deepEqual(ids(payload), ["ac/alpha-1", "ac/alpha-2", "zz/zeta-9"]);
    // Two projections of the same collected map agree, including on a
    // same-name tie resolved by recency (newest first).
    const again = buildProviderPayload(collected, { ...baseOpts } as never);
    assert.deepEqual(ids(again), ids(payload));

    const tied = await publish(
      [
        { id: "ac/b1", release_date: "2026-01-02T00:00:00Z" },
        { id: "ac/b2", release_date: "2026-01-09T00:00:00Z" },
      ],
      {},
      new Map([
        ["ac/b1", { name: "Same" }],
        ["ac/b2", { name: "Same" }],
      ])
    );
    // "ac/b2" is newer in the raw data, so the tie on the display name
    // resolves recency-descending before the id.
    assert.deepEqual(ids(tied.payload), ["ac/b2", "ac/b1"]);
  });

  it("sorts by name with a fixed, case- and number-aware collation", async () => {
    const raw: Raw[] = [
      { id: "ac/model-10" },
      { id: "ac/MODEL-C" },
      { id: "ac/model-2" },
      { id: "ac/model-1" },
    ];
    const { payload } = await publish(raw, { modelOrder: [{ key: "name" } as CatalogOrderSpec] });
    assert.deepEqual(ids(payload), ["ac/model-1", "ac/model-2", "ac/model-10", "ac/MODEL-C"]);
  });

  it("sorts by recency, newest first by default, oldest first on asc — matching the freshness recency order", async () => {
    const raw: Raw[] = [
      { id: "ac/mar", release_date: "2026-03-01T00:00:00Z" },
      { id: "ac/jan", release_date: "2026-01-15T00:00:00Z" },
      { id: "ac/dec", release_date: "2025-12-01T00:00:00Z" },
    ];
    const desc = await publish(raw, { modelOrder: [{ key: "recency" }] });
    assert.deepEqual(ids(desc.payload), ["ac/mar", "ac/jan", "ac/dec"]);
    const asc = await publish(raw, { modelOrder: [{ key: "recency", direction: "asc" }] });
    assert.deepEqual(ids(asc.payload), ["ac/dec", "ac/jan", "ac/mar"]);
    // Same dates, same newest-first order as the shared freshness comparator.
    const expected = [...raw].sort(compareByRecency).map((m) => m.id);
    assert.deepEqual(ids(desc.payload), expected);
  });

  it("sorts by free: zero-cost models first on asc, paid first on desc", async () => {
    const raw: Raw[] = [{ id: "ac/paid" }, { id: "ac/free" }];
    const enrichment = new Map([["ac/paid", { pricing: { input: 1, output: 2 } }]]);
    const asc = await publish(raw, { modelOrder: [{ key: "free" }] }, enrichment);
    assert.deepEqual(ids(asc.payload), ["ac/free", "ac/paid"]);
    const desc = await publish(
      raw,
      { modelOrder: [{ key: "free", direction: "desc" }] },
      enrichment
    );
    assert.deepEqual(ids(desc.payload), ["ac/paid", "ac/free"]);
  });

  it("sorts by price: cheaper first on input, then output; absent cost never counts as zero", async () => {
    const raw: Raw[] = [{ id: "ac/pricy" }, { id: "ac/mid" }, { id: "ac/cheap" }];
    const enrichment = new Map([
      ["ac/cheap", { pricing: { input: 0.1, output: 0.2 } }],
      ["ac/mid", { pricing: { input: 0.1, output: 0.5 } }],
      ["ac/pricy", { pricing: { input: 0.9, output: 0.2 } }],
    ]);
    const asc = await publish(raw, { modelOrder: [{ key: "price" }] }, enrichment);
    assert.deepEqual(ids(asc.payload), ["ac/cheap", "ac/mid", "ac/pricy"]);
    const desc = await publish(
      raw,
      { modelOrder: [{ key: "price", direction: "desc" }] },
      enrichment
    );
    assert.deepEqual(ids(desc.payload), ["ac/pricy", "ac/mid", "ac/cheap"]);

    // A legacy entry with no cost block at all: absent prices rank last in
    // both directions, they are never compared as zero.
    const noCost = {
      id: "ac/no-cost",
      name: "no cost",
      capabilities: {
        temperature: true,
        reasoning: false,
        attachment: false,
        toolcall: false,
        input: { text: true, audio: false, image: false, video: false, pdf: false },
        output: { text: true, audio: false, image: false, video: false, pdf: false },
        interleaved: false,
      },
      limit: { context: 8192, output: 1024 },
      status: "active" as const,
      options: {},
      headers: {},
      release_date: "2026-01-01T00:00:00Z",
      providerID: "ac",
      api: { id: "ac/no-cost", url: "https://gw.example.com/v1", npm: "@ai-sdk/openai-compatible" },
    } as unknown as LegacyModel;
    const priced = {
      ...noCost,
      cost: { input: 0.1, output: 0.2, cache: { read: 0, write: 0 } },
    } as LegacyModel;
    const absent = toOrderEntry("omniroute/ac/no-cost", noCost);
    const present = toOrderEntry("omniroute/ac/priced", priced);
    assert.ok(Number.isNaN(absent.priceInput));
    assert.ok(absent.free === false, "an entry without a cost block is not free");
    const cmpAsc = catalogOrderComparator([{ key: "price" }]);
    assert.ok(cmpAsc(absent, present) > 0, "absent price ranks last on asc");
    const cmpDesc = catalogOrderComparator([{ key: "price", direction: "desc" }]);
    assert.ok(cmpDesc(absent, present) > 0, "absent price ranks last on desc");
  });

  it("sorts by context window: largest first by default, smallest first on asc", async () => {
    const raw: Raw[] = [
      { id: "ac/small", context_length: 8192 },
      { id: "ac/big", context_length: 131072 },
      { id: "ac/mid", context_length: 32768 },
    ];
    const desc = await publish(raw, { modelOrder: [{ key: "context" }] });
    assert.deepEqual(ids(desc.payload), ["ac/big", "ac/mid", "ac/small"]);
    const asc = await publish(raw, { modelOrder: [{ key: "context", direction: "asc" }] });
    assert.deepEqual(ids(asc.payload), ["ac/small", "ac/mid", "ac/big"]);
    // An entry without a window ranks last in both directions.
    const withNone = await publish([{ id: "ac/none" }, { id: "ac/small", context_length: 8192 }], {
      modelOrder: [{ key: "context" }],
    });
    assert.deepEqual(ids(withNone.payload), ["ac/small", "ac/none"]);
    const withNoneAsc = await publish(
      [{ id: "ac/none" }, { id: "ac/small", context_length: 8192 }],
      {
        modelOrder: [{ key: "context", direction: "asc" }],
      }
    );
    assert.deepEqual(ids(withNoneAsc.payload), ["ac/small", "ac/none"]);
  });

  it("applies a chained list: free, then provider, then name", async () => {
    const raw: Raw[] = [{ id: "zz/paid" }, { id: "ac/free" }, { id: "ac/paid" }, { id: "zz/free" }];
    const enrichment = new Map([
      ["ac/paid", { pricing: { input: 3, output: 1 } }],
      ["zz/paid", { pricing: { input: 0.01, output: 0.01 } }],
    ]);
    const { payload } = await publish(
      raw,
      { modelOrder: [{ key: "free" }, { key: "provider" }, { key: "name" }] },
      enrichment
    );
    assert.deepEqual(ids(payload), ["ac/free", "zz/free", "ac/paid", "zz/paid"]);
  });

  it("rejects an unknown key or direction at load, naming the value and the supported set", () => {
    assert.throws(
      () =>
        parsePluginOptions({ baseURL: "https://gw.example.com", modelOrder: [{ key: "zorg" }] }),
      (err: Error) =>
        err.message.includes("zorg") &&
        err.message.includes("provider | name | recency | free | price | context")
    );
    assert.throws(
      () =>
        parsePluginOptions({
          baseURL: "https://gw.example.com",
          modelOrder: [{ key: "name", direction: "up" }],
        }),
      (err: Error) => err.message.includes('"up"') && err.message.includes("asc | desc")
    );
    // A valid list parses and carries through.
    const parsed = parsePluginOptions({
      baseURL: "https://gw.example.com",
      modelOrder: [{ key: "free" }, { key: "name", direction: "desc" }],
    });
    assert.deepEqual(parsed.modelOrder, [{ key: "free" }, { key: "name", direction: "desc" }]);
  });

  it("ranks absent data last without throwing, and id breaks the final tie", async () => {
    const raw: Raw[] = [
      { id: "ac/undated" },
      { id: "ac/dated", release_date: "2026-01-01T00:00:00Z" },
    ];
    // An absent date ranks last in BOTH directions (never treated as zero),
    // so the dated model leads either way.
    const desc = await publish(raw, { modelOrder: [{ key: "recency" }] });
    assert.deepEqual(ids(desc.payload), ["ac/dated", "ac/undated"]);
    const asc = await publish(raw, { modelOrder: [{ key: "recency", direction: "asc" }] });
    assert.deepEqual(ids(asc.payload), ["ac/dated", "ac/undated"]);

    // Two entries both absent on every criterion: the id decides, ascending.
    const a = { ...toOrderEntry("omniroute/ac/a", noCostLegacy()), releaseDateMs: NaN };
    const b = { ...toOrderEntry("omniroute/ac/b", noCostLegacy()), releaseDateMs: NaN };
    assert.equal(catalogOrderComparator([])(a, b) < 0, true);
    assert.equal(catalogOrderComparator([])(b, a) > 0, true);
  });

  function noCostLegacy(): LegacyModel {
    return {
      id: "ac/x",
      name: "x",
      capabilities: {
        temperature: true,
        reasoning: false,
        attachment: false,
        toolcall: false,
        input: { text: true, audio: false, image: false, video: false, pdf: false },
        output: { text: true, audio: false, image: false, video: false, pdf: false },
        interleaved: false,
      },
      limit: { context: 0, output: 0 },
      status: "active" as const,
      options: {},
      headers: {},
      release_date: "",
      providerID: "ac",
      api: { id: "ac/x", url: "https://gw.example.com/v1", npm: "@ai-sdk/openai-compatible" },
    } as LegacyModel;
  }

  it("ignores insertion order: permuted arrival gives the same published list", async () => {
    const base: Raw[] = [
      { id: "ac/a1", release_date: "2026-01-01T00:00:00Z", context_length: 1000 },
      { id: "ac/a2", release_date: "2026-02-01T00:00:00Z", context_length: 2000 },
      { id: "zz/z1", release_date: "2026-03-01T00:00:00Z", context_length: 3000 },
      { id: "zz/z2", release_date: "2026-04-01T00:00:00Z", context_length: 4000 },
    ];
    const opts = { modelOrder: [{ key: "name" }] };
    const first = await publish(base, opts);
    const second = await publish(
      [...base].reverse().sort(() => 0.5 - Math.random()),
      opts
    );
    assert.deepEqual(ids(first.payload), ids(second.payload));
  });

  it("keeps every field: a permuted arrival publishes identical models per id", async () => {
    const base: Raw[] = [
      { id: "ac/a1", release_date: "2026-01-01T00:00:00Z", context_length: 1000 },
      { id: "zz/z1", release_date: "2026-02-01T00:00:00Z", context_length: 2000 },
    ];
    const enrichment = new Map([
      ["ac/a1", { name: "A One", pricing: { input: 1, output: 2 } }],
      ["zz/z1", { name: "Z One", pricing: { input: 3, output: 4 } }],
    ]);
    const opts = { modelOrder: [{ key: "name" }] };
    const first = await publish(base, opts, enrichment);
    const second = await publish([...base].reverse(), opts, enrichment);
    const byId = (p: { models: unknown[] }) =>
      Object.fromEntries(p.models.map((m) => [String((m as { id: string }).id), m]));
    assert.deepEqual(byId(second.payload), byId(first.payload));
    assert.equal(Object.keys(byId(second.payload)).length, 2);
  });

  it("documents modelOrder in the README: every key, its default, and the default chain", () => {
    const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");
    const line = readme.split("\n").find((l) => l.includes("`modelOrder`"));
    assert.ok(line, "README options table has a modelOrder row");
    for (const key of ["provider", "name", "recency", "free", "price", "context"]) {
      assert.ok(line!.includes(key), `README row names the "${key}" key`);
    }
    assert.ok(line!.includes("provider → name → recency → id"), "README names the default chain");
  });

  it("builds stateless comparators: repeated and interleaved calls agree", () => {
    const entry = (id: string, extra: Partial<CatalogOrderEntry> = {}): CatalogOrderEntry => ({
      id,
      provider: "ac",
      name: "x",
      releaseDateMs: NaN,
      free: false,
      priceInput: 1,
      priceOutput: 1,
      context: 100,
      ...extra,
    });
    const low = catalogOrderComparator([{ key: "name" }]);
    const high = catalogOrderComparator([{ key: "name" }]);
    const a = entry("omniroute/ac/a", { name: "z" });
    const b = entry("omniroute/ac/b", { name: "a" });
    const c = entry("omniroute/ac/c", { name: "b" });
    const d = entry("omniroute/ac/d", { name: "m" });
    const first = low(a, b);
    assert.equal(low(c, d) < 0, true, "second pair sorts on its own values");
    assert.equal(low(a, b), first, "same pair, same result, no retained state");
    assert.equal(Math.sign(low(a, b)), Math.sign(high(b, a) * -1), "two comparators agree");
  });
});
