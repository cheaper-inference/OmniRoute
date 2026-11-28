import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createReadStream } from "node:fs";
import { publishCatalog } from "../src/catalog.js";

interface Fixture {
  models: Record<string, unknown>[];
}

async function loadFixture(): Promise<Fixture> {
  const chunks: Buffer[] = [];
  for await (const chunk of createReadStream(new URL("./fixtures/catalog.json", import.meta.url))) {
    chunks.push(chunk as Buffer);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as Fixture;
}

function fakeDraft() {
  const providers = new Map<string, Record<string, any>>();
  const models = new Map<string, Record<string, any>>();
  return {
    providers,
    models,
    provider: {
      update: (id: string, fn: (p: Record<string, any>) => void) => {
        const p = (providers.get(id) ?? { id }) as Record<string, any>;
        fn(p);
        providers.set(id, p);
      },
    },
    model: {
      update: (pid: string, mid: string, fn: (m: Record<string, any>) => void) => {
        const k = pid + "/" + mid;
        const m = (models.get(k) ?? { id: mid, providerID: pid }) as Record<string, any>;
        fn(m);
        models.set(k, m);
      },
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
  enrichment: false,
};

async function publishFixture() {
  const fixture = await loadFixture();
  const draft = fakeDraft();
  const counts = await publishCatalog(draft, baseOpts, {
    fetcher: async () => fixture.models,
    combosFetcher: async () => [],
  });
  return { draft, counts };
}

describe("stable catalog publishes gateway-computed capability fields", () => {
  it("publishes an explicit false temperature flag", async () => {
    const { draft } = await publishFixture();
    const m = draft.models.get("omniroute/m-beta");
    assert.ok(m);
    assert.equal(m.capabilities.temperature, false);
  });

  it("defaults temperature to true when the gateway did not set it", async () => {
    const { draft } = await publishFixture();
    for (const key of ["m-alpha", "cc/m-gamma", "local-delta", "good-combo"]) {
      const m = draft.models.get(`omniroute/${key}`);
      assert.ok(m, key);
      assert.equal(m.capabilities.temperature, true, key);
    }
  });

  it("publishes a compatibility block only for reasoning models", async () => {
    const { draft } = await publishFixture();
    for (const key of ["m-alpha", "m-beta", "cc/m-gamma"]) {
      const m = draft.models.get(`omniroute/${key}`);
      assert.ok(m, key);
      assert.equal("compatibility" in m, true, key);
    }
    for (const key of ["local-delta", "good-combo"]) {
      const m = draft.models.get(`omniroute/${key}`);
      assert.ok(m, key);
      assert.equal("compatibility" in m, false, key);
    }
  });

  it("does not publish unsupported capability or compatibility fields", async () => {
    const { draft } = await publishFixture();
    for (const m of draft.models.values()) {
      assert.equal("freeform" in m.capabilities, false);
    }
    const reasoning = draft.models.get("omniroute/m-alpha");
    assert.ok(reasoning);
    assert.equal("compatibility" in reasoning, true);
    assert.deepEqual(Object.keys(reasoning.compatibility), []);
  });

  it("keeps ids, cost, limit, status and effort variants unchanged", async () => {
    const { draft, counts } = await publishFixture();
    assert.deepEqual(counts, { models: 5, combos: 0 });
    assert.equal(draft.models.size, 5);
    const expected: Record<
      string,
      { context: number; output: number; tools: boolean; variants: unknown[] }
    > = {
      "m-alpha": { context: 128000, output: 4096, tools: true, variants: [] },
      "m-beta": { context: 64000, output: 2048, tools: false, variants: [] },
      "cc/m-gamma": { context: 200000, output: 32000, tools: true, variants: [] },
      "local-delta": {
        context: 32768,
        output: 0,
        tools: false,
        variants: [
          {
            id: "low",
            settings: { reasoningEffort: "low" },
            headers: {},
            body: { reasoningEffort: "low" },
          },
          {
            id: "high",
            settings: { reasoningEffort: "high" },
            headers: {},
            body: { reasoningEffort: "high" },
          },
        ],
      },
      "good-combo": { context: 100000, output: 8000, tools: true, variants: [] },
    };
    for (const [key, want] of Object.entries(expected)) {
      const m = draft.models.get(`omniroute/${key}`);
      assert.ok(m, key);
      assert.equal(m.id, key);
      assert.equal(m.modelID, key);
      assert.equal(m.providerID, "omniroute");
      assert.equal(m.capabilities.tools, want.tools);
      assert.deepEqual(m.cost, [{ input: 0, output: 0, cache: { read: 0, write: 0 } }]);
      assert.equal(m.limit.context, want.context);
      assert.equal(m.limit.output, want.output);
      assert.equal(m.status, "active");
      assert.deepEqual(m.variants, want.variants);
    }
  });
});
