import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { collectCatalog, publishCatalog } from "../src/catalog.js";

type BetaDraft = {
  provider: {
    list?: () => unknown[];
    get?: (id: string) => unknown;
    update: (id: string, fn: (p: Record<string, any>) => void) => void;
    remove?: () => void;
  };
  model: {
    get?: (...a: string[]) => unknown;
    update: (pid: string, mid: string, fn: (m: Record<string, any>) => void) => void;
    remove?: () => void;
    default?: { get: () => undefined; set: () => void };
  };
};

function fakeDraft(): {
  providers: Map<string, Record<string, any>>;
  models: Map<string, Record<string, any>>;
  provider: BetaDraft["provider"];
  model: BetaDraft["model"];
} {
  const providers = new Map<string, Record<string, any>>();
  const models = new Map<string, Record<string, any>>();
  return {
    providers,
    models,
    provider: {
      list: () => [],
      get: (id: string) => providers.get(id) as never,
      update: (id: string, fn: (p: Record<string, any>) => void) => {
        const p = (providers.get(id) ?? { id }) as Record<string, any>;
        fn(p);
        providers.set(id, p);
      },
      remove: () => {},
    },
    model: {
      get: () => undefined,
      update: (pid: string, mid: string, fn: (m: Record<string, any>) => void) => {
        const k = pid + "/" + mid;
        const m = (models.get(k) ?? { id: mid, providerID: pid }) as Record<string, any>;
        fn(m);
        models.set(k, m);
      },
      remove: () => {},
      default: { get: () => undefined, set: () => {} },
    },
  };
}

const baseOpts = {
  providerId: "omniroute",
  baseURL: "https://gw.example.com",
  apiKey: "k",
  timeoutMs: 1000,
  modelCacheTtlMs: 300000,
  usableOnly: false,
};

const FIXED_NOW = Date.parse("2026-10-03T12:00:00.000Z");

async function withFixedNow<T>(fn: () => Promise<T>): Promise<T> {
  const realNow = Date.now;
  Date.now = () => FIXED_NOW;
  try {
    return await fn();
  } finally {
    Date.now = realNow;
  }
}

function captureWarns(): { warns: string[]; restore: () => void } {
  const warns: string[] = [];
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    warns.push(String(args[0]));
  };
  return {
    warns,
    restore() {
      console.warn = origWarn;
    },
  };
}

function freeOverlay(ids: string[]): Map<string, { freeType: "recurring-monthly" }> {
  return new Map(ids.map((id) => [id, { freeType: "recurring-monthly" as const }]));
}

describe("capability presets pick from the whole catalog", () => {
  it("freeOnly publishes the two free entries of a thirty-model provider, not the ten newest emptied", async () => {
    const draft = fakeDraft();
    const ids = Array.from({ length: 30 }, (_v, i) => `ac/m${i}`);
    const res = await publishCatalog(
      draft,
      { ...baseOpts, freeOnly: true },
      {
        fetcher: async () => ids.map((id, i) => ({ id, owned_by: "ac", context_length: 1000 + i })),
        enrichmentFetcher: async () => freeOverlay(["ac/m0", "ac/m1"]),
        combosFetcher: async () => [],
      }
    );
    assert.equal(res.models, 2);
    assert.ok(draft.models.has("omniroute/ac/m0"));
    assert.ok(draft.models.has("omniroute/ac/m1"));
    assert.ok(!draft.models.has("omniroute/ac/m29"));
  });

  it("without a preset the same provider keeps the ten newest entries", async () => {
    const draft = fakeDraft();
    const ids = Array.from({ length: 30 }, (_v, i) => `ac/m${i}`);
    const res = await publishCatalog(
      draft,
      { ...baseOpts },
      {
        fetcher: async () => ids.map((id, i) => ({ id, owned_by: "ac", context_length: 1000 + i })),
        enrichmentFetcher: async () => new Map(),
        combosFetcher: async () => [],
      }
    );
    assert.equal(res.models, 10);
    assert.ok(draft.models.has("omniroute/ac/m29"));
    assert.ok(!draft.models.has("omniroute/ac/m0"));
  });

  it("toolsOnly replaces the entries without tool calls in the showcase and in the recent picks", async () => {
    // Showcase path: stale entries, rank by context length.
    {
      const draft = fakeDraft();
      const res = await publishCatalog(
        draft,
        { ...baseOpts, toolsOnly: true },
        {
          fetcher: async () =>
            Array.from({ length: 30 }, (_v, i) => ({
              id: `tl/m${i}`,
              owned_by: "tl",
              context_length: 1000 + i,
              ...(["tl/m27", "tl/m28", "tl/m29"].includes(`tl/m${i}`)
                ? {}
                : { capabilities: { tool_calling: true } }),
            })),
          enrichmentFetcher: async () => new Map(),
          combosFetcher: async () => [],
        }
      );
      assert.equal(res.models, 10);
      assert.ok(!draft.models.has("omniroute/tl/m27"));
      assert.ok(!draft.models.has("omniroute/tl/m28"));
      assert.ok(!draft.models.has("omniroute/tl/m29"));
      assert.ok(draft.models.has("omniroute/tl/m17"));
    }
    // Recent path: fresh entries, the fresh cap ranks the same way.
    await withFixedNow(async () => {
      const draft = fakeDraft();
      const dayMs = 24 * 3600 * 1000;
      const res = await publishCatalog(
        draft,
        { ...baseOpts, toolsOnly: true },
        {
          fetcher: async () =>
            Array.from({ length: 13 }, (_v, i) => ({
              id: `tb${i}`,
              owned_by: "toolbox",
              context_length: 1000,
              release_date: new Date(FIXED_NOW - i * dayMs).toISOString(),
              ...(i < 3 ? {} : { capabilities: { tool_calling: true } }),
            })),
          enrichmentFetcher: async () => new Map(),
          combosFetcher: async () => [],
        }
      );
      assert.equal(res.models, 10);
      assert.ok(!draft.models.has("omniroute/tb0"));
      assert.ok(!draft.models.has("omniroute/tb1"));
      assert.ok(!draft.models.has("omniroute/tb2"));
      assert.ok(draft.models.has("omniroute/tb12"));
    });
  });

  it('visibleModels ["*"] keeps the full-loop behaviour under freeOnly', async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(
      draft,
      { ...baseOpts, freeOnly: true, visibleModels: ["*"] },
      {
        fetcher: async () => [{ id: "v0" }, { id: "v1" }, { id: "v2" }, { id: "v3" }, { id: "v4" }],
        enrichmentFetcher: async () => freeOverlay(["v0", "v1", "v2"]),
        combosFetcher: async () => [],
      }
    );
    assert.equal(res.models, 3);
    assert.ok(draft.models.has("omniroute/v0"));
    assert.ok(!draft.models.has("omniroute/v3"));
  });

  it("freeOnly publishes a combo whose three members are free", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(
      draft,
      { ...baseOpts, freeOnly: true },
      {
        fetcher: async () => [{ id: "k1" }, { id: "k2" }, { id: "k3" }],
        enrichmentFetcher: async () => freeOverlay(["k1", "k2", "k3"]),
        combosFetcher: async () => [
          {
            id: "trio",
            name: "Trio",
            models: [
              { kind: "model", model: "k1" } as never,
              { kind: "model", model: "k2" } as never,
              { kind: "model", model: "k3" } as never,
            ],
          },
        ],
      }
    );
    assert.equal(res.combos, 1);
    assert.ok(draft.models.has("omniroute/Trio"));
  });

  it("freeOnly drops a combo with a paid member and keeps the all-free one", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(
      draft,
      { ...baseOpts, freeOnly: true },
      {
        fetcher: async () => [{ id: "g1" }, { id: "g2" }, { id: "g3" }, { id: "p1" }],
        enrichmentFetcher: async () => freeOverlay(["g1", "g2", "g3"]),
        combosFetcher: async () => [
          {
            id: "trio",
            name: "GoodTrio",
            models: [
              { kind: "model", model: "g1" } as never,
              { kind: "model", model: "g2" } as never,
              { kind: "model", model: "g3" } as never,
            ],
          },
          {
            id: "mixed",
            name: "Mixed",
            models: [
              { kind: "model", model: "g1" } as never,
              { kind: "model", model: "p1" } as never,
            ],
          },
        ],
      }
    );
    assert.equal(res.combos, 1);
    assert.ok(draft.models.has("omniroute/GoodTrio"));
    assert.ok(!draft.models.has("omniroute/Mixed"));
  });

  it("freeOnly drops a combo without members and keeps the all-free one", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(
      draft,
      { ...baseOpts, freeOnly: true },
      {
        fetcher: async () => [{ id: "g1" }, { id: "g2" }, { id: "g3" }],
        enrichmentFetcher: async () => freeOverlay(["g1", "g2", "g3"]),
        combosFetcher: async () => [
          {
            id: "trio",
            name: "GoodTrio",
            models: [
              { kind: "model", model: "g1" } as never,
              { kind: "model", model: "g2" } as never,
              { kind: "model", model: "g3" } as never,
            ],
          },
          { id: "empty", name: "Empty", models: [] },
        ],
      }
    );
    assert.equal(res.combos, 1);
    assert.ok(draft.models.has("omniroute/GoodTrio"));
    assert.ok(!draft.models.has("omniroute/Empty"));
  });

  it("freeOnly publishes a combo over a free combo and the free combo itself", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(
      draft,
      { ...baseOpts, freeOnly: true },
      {
        fetcher: async () => [{ id: "c1" }],
        enrichmentFetcher: async () => freeOverlay(["c1"]),
        combosFetcher: async () => [
          {
            id: "parent",
            name: "Parent",
            models: [
              { kind: "combo-ref", comboName: "Child" } as never,
              { kind: "model", model: "c1" } as never,
            ],
          },
          {
            id: "child",
            name: "Child",
            models: [{ kind: "model", model: "c1" } as never],
          },
        ],
      }
    );
    assert.equal(res.combos, 2);
    assert.ok(draft.models.has("omniroute/Child"));
    assert.ok(draft.models.has("omniroute/Parent"));
  });

  it("freeOnly drops a combo over a dropped combo and warns on the never-resolving ref", async () => {
    const draft = fakeDraft();
    const { warns, restore } = captureWarns();
    try {
      const res = await publishCatalog(
        draft,
        { ...baseOpts, freeOnly: true },
        {
          fetcher: async () => [{ id: "g1" }, { id: "g2" }, { id: "g3" }, { id: "p1" }],
          enrichmentFetcher: async () => freeOverlay(["g1", "g2", "g3"]),
          combosFetcher: async () => [
            {
              id: "trio",
              name: "GoodTrio",
              models: [
                { kind: "model", model: "g1" } as never,
                { kind: "model", model: "g2" } as never,
                { kind: "model", model: "g3" } as never,
              ],
            },
            {
              id: "mixed",
              name: "Mixed",
              models: [
                { kind: "model", model: "g1" } as never,
                { kind: "model", model: "p1" } as never,
              ],
            },
            {
              id: "parent",
              name: "ParentOfDropped",
              models: [
                { kind: "combo-ref", comboName: "Mixed" } as never,
                { kind: "model", model: "g1" } as never,
              ],
            },
            {
              id: "orphan",
              name: "Orphan",
              models: [
                { kind: "combo-ref", comboName: "Nobody" } as never,
                { kind: "model", model: "g1" } as never,
              ],
            },
          ],
        }
      );
      assert.equal(res.combos, 1);
      assert.ok(draft.models.has("omniroute/GoodTrio"));
      assert.ok(!draft.models.has("omniroute/ParentOfDropped"));
      assert.ok(!draft.models.has("omniroute/Orphan"));
    } finally {
      restore();
    }
    assert.ok(warns.some((w) => /could not resolve all nested combo-refs/.test(w)));
  });

  it("freeOnly drops a combo with an unknown member and keeps the all-free one", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(
      draft,
      { ...baseOpts, freeOnly: true },
      {
        fetcher: async () => [{ id: "g1" }, { id: "g2" }, { id: "g3" }],
        enrichmentFetcher: async () => freeOverlay(["g1", "g2", "g3"]),
        combosFetcher: async () => [
          {
            id: "trio",
            name: "GoodTrio",
            models: [
              { kind: "model", model: "g1" } as never,
              { kind: "model", model: "g2" } as never,
              { kind: "model", model: "g3" } as never,
            ],
          },
          {
            id: "ghost",
            name: "Ghost",
            models: [
              { kind: "model", model: "g1" } as never,
              { kind: "model", model: "no-such-model" } as never,
            ],
          },
        ],
      }
    );
    assert.equal(res.combos, 1);
    assert.ok(draft.models.has("omniroute/GoodTrio"));
    assert.ok(!draft.models.has("omniroute/Ghost"));
  });

  it("without a preset every resolving combo publishes, dropped or unknown members included", async () => {
    const draft = fakeDraft();
    const res = await publishCatalog(
      draft,
      { ...baseOpts },
      {
        fetcher: async () => [{ id: "g1" }, { id: "p1" }],
        enrichmentFetcher: async () => new Map(),
        combosFetcher: async () => [
          {
            id: "mixed",
            name: "Mixed",
            models: [
              { kind: "model", model: "g1" } as never,
              { kind: "model", model: "p1" } as never,
            ],
          },
          { id: "empty", name: "Empty", models: [] },
          {
            id: "ghost",
            name: "Ghost",
            models: [
              { kind: "model", model: "g1" } as never,
              { kind: "model", model: "no-such-model" } as never,
            ],
          },
        ],
      }
    );
    assert.equal(res.combos, 3);
    assert.ok(draft.models.has("omniroute/Mixed"));
    assert.ok(draft.models.has("omniroute/Empty"));
    assert.ok(draft.models.has("omniroute/Ghost"));
  });

  it("freeOnly does not restore a paid entry named by usage memory", async () => {
    const collected = await collectCatalog(
      { ...baseOpts, freeOnly: true, managementReadToken: "m" },
      {
        fetcher: async () => [
          ...Array.from({ length: 10 }, (_v, i) => ({
            id: `zzz/f${i}`,
            owned_by: "zzz",
            context_length: 100000 + i,
          })),
          { id: "zzz/old-paid", owned_by: "zzz", context_length: 1000 },
        ],
        enrichmentFetcher: async () => freeOverlay(["zzz/f0", "zzz/f1"]),
        combosFetcher: async () => [],
        usageFetcher: async () => ["zzz/old-paid"],
      }
    );
    assert.equal(collected.counts.models, 2);
    assert.ok(collected.entries.has("omniroute/zzz/f0"));
    assert.ok(!collected.entries.has("omniroute/zzz/old-paid"));
  });
});
