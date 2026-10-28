import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import * as catalog from "../../src/app/(dashboard)/dashboard/models/modelCatalogUtils.ts";

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("decision discovery metadata becomes a distinct local model kind with honest unknown fields", () => {
  const [row] = catalog.flattenCatalog({
    typesafe: {
      provider: "TypeSafe",
      models: [
        {
          id: "jev-fixture",
          modelType: "decision",
          supported_endpoints: ["systemone"],
          context_length: null,
          max_output_tokens: null,
          pricing: null,
          pricing_status: "unknown",
          inference_access: "unverified",
          native_adapter: "available",
          decision_primitives: ["noul", "choice", "score"],
        },
      ],
    },
  });
  assert.equal(row.type, "decision");
  assert.equal(row.context_length, undefined);
  assert.equal(row.max_output_tokens, undefined);
  assert.equal(row.pricing, null);
  assert.equal(row.pricing_status, "unknown");
  assert.equal(row.inference_access, "unverified");
  assert.deepEqual(row.decision_primitives, ["noul", "choice", "score"]);
});

test("mixed chat and decision rows remain chat models and can use chat-only tests", () => {
  const [row] = catalog.flattenCatalog({
    fixture: {
      models: [{ id: "mixed", type: "chat", supported_endpoints: ["chat", "systemone"] }],
    },
  });
  assert.equal(catalog.isDecisionCatalogModel(row), false);
  assert.deepEqual(catalog.chatTestableCatalogModels([row]), [row]);
});

test("all native kind spellings are excluded from generic chat tests including stale selections", () => {
  const rows = ["decision", "decisions", "systemone"].map((type) => ({
    id: type,
    name: type,
    type,
    providerId: "fixture",
    provider: "Fixture",
  }));
  assert.ok(rows.every(catalog.isDecisionCatalogModel));
  assert.deepEqual(catalog.chatTestableCatalogModels(rows), []);
});

test("selecting the native kind explicitly reads the local decision catalog only", async () => {
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return Response.json({
      catalog: {
        typesafe: {
          models: [{ id: "jev-fixture", type: "decision", supported_endpoints: ["systemone"] }],
        },
      },
    });
  };
  const controller = new AbortController();
  const rows = await catalog.fetchCatalogModelRows("decision", controller.signal);
  assert.equal(rows[0].type, "decision");
  assert.deepEqual(
    calls.map((call) => call.url),
    ["/api/models/catalog?kind=decision"]
  );
  assert.equal(calls[0].init?.signal, controller.signal);
});

test("ordinary catalog loads retain their original management URL", async () => {
  const calls: string[] = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    return Response.json({ catalog: {} });
  };
  assert.deepEqual(await catalog.fetchCatalogModelRows("all", new AbortController().signal), []);
  assert.deepEqual(calls, ["/api/models/catalog"]);
});

test("the decision category filters independently from chat and does not treat missing limits as zero", () => {
  const rows = catalog.flattenCatalog({
    fixture: {
      models: [
        { id: "native", modelType: "decision", supported_endpoints: ["systemone"] },
        { id: "chat", type: "chat", context_length: 1000 },
      ],
    },
  });
  assert.deepEqual(
    catalog
      .filterCatalogModels(rows, { query: "", providerId: "all", type: "decision" })
      .map((row) => row.id),
    ["native"]
  );
  assert.deepEqual(
    catalog.filterCatalogModels(rows, {
      query: "",
      providerId: "all",
      type: "decision",
      minContextLength: 1,
    }),
    []
  );
  assert.deepEqual(
    catalog.filterCatalogModels(rows, {
      query: "",
      providerId: "all",
      type: "decision",
      providerHealth: "healthy",
    }),
    []
  );
});
