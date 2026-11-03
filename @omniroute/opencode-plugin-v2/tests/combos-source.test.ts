import { describe, it } from "node:test";
import assert from "node:assert/strict";
import plugin from "../src/index.js";
import { collectCatalog } from "../src/catalog.js";
import { usesModelsComboSource } from "../src/combos-source.js";
import { parsePluginOptions, toResolvedOptions } from "../src/options.js";

const baseOpts = {
  providerId: "omniroute",
  baseURL: "https://gw.example.com",
  apiKey: "k",
  timeoutMs: 1000,
  modelCacheTtlMs: 300000,
  usableOnly: false,
  enrichment: new Map(),
  usageMemory: false,
};

function freeOverlay(ids: string[]): Map<string, { freeType: "recurring-monthly" }> {
  return new Map(ids.map((id) => [id, { freeType: "recurring-monthly" as const }]));
}

function quiet<T>(fn: () => Promise<T>): Promise<T> {
  const origWarn = console.warn;
  const origLog = console.log;
  console.warn = () => {};
  console.log = () => {};
  return fn().finally(() => {
    console.warn = origWarn;
    console.log = origLog;
  });
}

const comboRows = () => [
  { id: "m1" },
  { id: "c1", owned_by: "combo", context_length: 32000, max_output_tokens: 2000 },
  { id: "c2", owned_by: "combo", context_length: 32000, max_output_tokens: 2000 },
  { id: "c3", owned_by: "combo", context_length: 32000, max_output_tokens: 2000 },
];

describe("combosSource option", () => {
  it("defaults to the /api/combos source and accepts only api|models", () => {
    const parsed = parsePluginOptions({ baseURL: "https://gw.example.com" });
    assert.equal(parsed.combosSource, "api");
    assert.equal(toResolvedOptions(parsed).combosSource, "api");
    const models = parsePluginOptions({
      baseURL: "https://gw.example.com",
      combosSource: "models",
    });
    assert.equal(toResolvedOptions(models).combosSource, "models");
    assert.throws(
      () => parsePluginOptions({ baseURL: "https://gw.example.com", combosSource: "none" }),
      /combosSource/
    );
  });

  it("uses the models source only when asked and no member-level filter is on", () => {
    assert.equal(usesModelsComboSource({}), false);
    assert.equal(usesModelsComboSource({ combosSource: "api" }), false);
    assert.equal(usesModelsComboSource({ combosSource: "models" }), true);
    assert.equal(usesModelsComboSource({ combosSource: "models", visibleModels: ["*"] }), true);
    assert.equal(usesModelsComboSource({ combosSource: "models", hiddenModels: [] }), true);
    for (const filter of [
      { freeOnly: true },
      { toolsOnly: true },
      { visionOnly: true },
      { usableOnly: true },
      { providersAllow: ["cc"] },
      { hiddenModels: ["m1"] },
      { visibleModels: ["m1"] },
    ]) {
      assert.equal(
        usesModelsComboSource({ combosSource: "models", ...filter }),
        false,
        `member-level filter ${JSON.stringify(filter)} must keep the /api/combos source`
      );
    }
  });
});

describe("collectCatalog combo source", () => {
  it("default: reads /api/combos and publishes the member-folded combo", async () => {
    let combosCalls = 0;
    const collected = await quiet(() =>
      collectCatalog(baseOpts, {
        models: async () => [{ id: "m1" }],
        combos: async () => {
          combosCalls += 1;
          return [{ id: "x", name: "Duo", models: [{ kind: "model", model: "m1" }] }];
        },
      } as never)
    );
    assert.equal(combosCalls, 1);
    assert.deepEqual(collected.counts, { models: 1, combos: 1 });
    assert.ok(collected.entries.has("omniroute/Duo"));
  });

  it("models: skips /api/combos and publishes every /v1/models combo row past the default view", async () => {
    let combosCalls = 0;
    const collected = await quiet(() =>
      collectCatalog({ ...baseOpts, combosSource: "models", showcasePerOwner: 1 }, {
        models: async () => comboRows(),
        combos: async () => {
          combosCalls += 1;
          return [];
        },
      } as never)
    );
    assert.equal(combosCalls, 0);
    for (const id of ["c1", "c2", "c3"]) {
      assert.ok(
        collected.entries.has(`omniroute/${id}`),
        `combo row ${id} must publish under combosSource=models, got ${JSON.stringify([...collected.entries.keys()])}`
      );
    }
    assert.deepEqual(collected.counts, { models: 1, combos: 3 });
  });

  it("models: the built-in auto rows keep the ordinary model path", async () => {
    const rows = [
      { id: "m1" },
      { id: "auto/coding", owned_by: "combo" },
      { id: "c1", owned_by: "combo" },
    ];
    const asModels = await quiet(() =>
      collectCatalog({ ...baseOpts, combosSource: "models" }, {
        models: async () => rows,
      } as never)
    );
    const asApi = await quiet(() =>
      collectCatalog(baseOpts, { models: async () => rows, combos: async () => [] } as never)
    );
    assert.equal(
      asModels.entries.has("omniroute/auto/coding"),
      asApi.entries.has("omniroute/auto/coding"),
      "auto/* rows must publish the same way under both sources"
    );
    assert.equal(asModels.counts.combos, 1);
  });

  it("models + freeOnly: keeps the member-verified source (all-free combo kept, mixed dropped)", async () => {
    let combosCalls = 0;
    const collected = await quiet(() =>
      collectCatalog(
        {
          ...baseOpts,
          combosSource: "models",
          freeOnly: true,
          enrichment: freeOverlay(["g1", "g2"]) as never,
        },
        {
          models: async () => [
            { id: "g1" },
            { id: "g2" },
            { id: "p1" },
            // The /v1/models combo rows carry no member list and no overlay row.
            { id: "FreeDuo", owned_by: "combo" },
            { id: "Mixed", owned_by: "combo" },
          ],
          combos: async () => {
            combosCalls += 1;
            return [
              {
                id: "free",
                name: "FreeDuo",
                models: [
                  { kind: "model", model: "g1" },
                  { kind: "model", model: "g2" },
                ],
              },
              {
                id: "mixed",
                name: "Mixed",
                models: [
                  { kind: "model", model: "g1" },
                  { kind: "model", model: "p1" },
                ],
              },
            ];
          },
        } as never
      )
    );
    assert.equal(combosCalls, 1);
    assert.ok(collected.entries.has("omniroute/FreeDuo"), "the all-free combo must stay");
    assert.equal(collected.entries.has("omniroute/Mixed"), false, "a paid member drops the combo");
    assert.equal(collected.counts.combos, 1);
  });
});

function setupCtx(options: Record<string, unknown>) {
  return {
    options,
    provider: {
      transform: (cb: (editor: { add: (input: unknown) => void }) => void) => {
        cb({ add: () => {} });
        return Promise.resolve({ dispose: async () => {} });
      },
      reload: async () => {},
    },
    model: { transform: () => Promise.resolve({ dispose: async () => {} }) },
    integration: { transform: () => Promise.resolve({ dispose: async () => {} }) },
  };
}

async function requestedPaths(extra: Record<string, unknown>): Promise<string[]> {
  const requested: string[] = [];
  const origFetch = globalThis.fetch;
  globalThis.fetch = (async (url: unknown) => {
    const path = new URL(String(url)).pathname;
    requested.push(path);
    const body = path === "/api/combos" ? { combos: [] } : { data: [{ id: "m1" }] };
    return { ok: true, status: 200, statusText: "OK", json: async () => body };
  }) as typeof fetch;
  try {
    await quiet(() =>
      (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(
        setupCtx({
          baseURL: "https://gw.example.com",
          // A distinct provider id per call keeps the disk snapshots apart.
          providerId: `combos-source-${String(extra.combosSource ?? "default")}`,
          apiKey: "k",
          enrichment: false,
          usageMemory: false,
          ...extra,
        })
      )
    );
    // The optional tier starts with the refresh; let its fetches land.
    await new Promise((resolve) => setTimeout(resolve, 20));
  } finally {
    globalThis.fetch = origFetch;
  }
  return requested;
}

describe("plugin refresh combo request", () => {
  it("default: requests /api/combos", async () => {
    const paths = await requestedPaths({});
    assert.ok(paths.includes("/api/combos"), `expected /api/combos, got ${JSON.stringify(paths)}`);
  });

  it("combosSource=models: never requests /api/combos", async () => {
    const paths = await requestedPaths({ combosSource: "models" });
    assert.ok(paths.includes("/v1/models"));
    assert.equal(paths.includes("/api/combos"), false, JSON.stringify(paths));
  });
});
