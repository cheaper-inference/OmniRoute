/**
 * Discovery filters on GET /v1/models (`capability`, `min_context`, `kind`, `q`).
 *
 * Contract:
 *   - Opt-in: without a discovery param the route takes the untouched path, so the
 *     response stays byte-identical (paging-only params included).
 *   - Filters narrow the caller's already key-filtered catalog; they never widen it.
 *   - Bad values are a 400 whose message lists the valid values and leaks no stack.
 *   - Filtering precedes the existing OpenAI-style `limit`/`after` paging.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "v1-models-discovery-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(dataDir, "plugins");
process.env.NODE_ENV = "test";
process.env.API_KEY_SECRET = "synthetic-v1-models-discovery";
// This tests catalog contents, not the cold-build latency budget of the shared host.
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";

const filters = await import("../../src/app/api/v1/models/catalogFilters.ts");
const { getFilteredCatalogResponse } =
  await import("../../src/app/api/v1/models/catalogDiscovery.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const modelsRoute = await import("../../src/app/api/v1/models/route.ts");
const { getUnifiedModelsResponse } = await import("../../src/app/api/v1/models/catalog.ts");

type Row = {
  id: string;
  owned_by?: string;
  type?: string;
  name?: string;
  context_length?: number;
  max_output_tokens?: number;
  capabilities?: Record<string, unknown>;
};

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const ROWS: Row[] = [
  {
    id: "a/vision-big",
    owned_by: "a",
    name: "Vision Big",
    context_length: 1_000_000,
    max_output_tokens: 64_000,
    capabilities: { vision: true, tool_calling: true },
  },
  {
    id: "a/text-small",
    owned_by: "a",
    name: "Text Small",
    context_length: 8_000,
    max_output_tokens: 4_000,
    capabilities: { vision: false, tool_calling: true },
  },
  { id: "b/embed", owned_by: "b", type: "embedding", context_length: 8_192 },
  { id: "b/no-caps", owned_by: "b" },
];

function params(query: string): URLSearchParams {
  return new URL(`http://localhost/v1/models${query}`).searchParams;
}

function parseOk(query: string) {
  const parsed = filters.parseCatalogDiscoveryQuery(params(query));
  assert.equal(parsed.ok, true, JSON.stringify(parsed));
  if (!parsed.ok) throw new Error("unreachable");
  return parsed.value;
}

function ids(rows: Array<{ id?: unknown }>): string[] {
  return rows.map((row) => String(row.id));
}

// ── pure parsing / filtering ────────────────────────────────────────────────

test("discovery mode is opt-in: no param or paging-only params do not switch it on", () => {
  assert.equal(filters.hasCatalogDiscoveryParams(params("")), false);
  assert.equal(filters.hasCatalogDiscoveryParams(params("?limit=5&after=x")), false);
  assert.equal(
    filters.hasCatalogDiscoveryParams(params("?prefix=alias&configuredOnly=true")),
    false
  );
  assert.equal(filters.hasCatalogDiscoveryParams(params("?capability=vision")), true);
  assert.equal(filters.hasCatalogDiscoveryParams(params("?q=gpt")), true);
  assert.equal(filters.hasCatalogDiscoveryParams(params("?min_context=1")), true);
  assert.equal(filters.hasCatalogDiscoveryParams(params("?kind=chat")), true);
});

test("capability accepts repeated and comma-separated values; all must be true", () => {
  const value = parseOk("?capability=vision&capability=tool_calling");
  assert.deepEqual(value.capabilities, ["vision", "tool_calling"]);
  assert.deepEqual(parseOk("?capability=vision,%20tool_calling").capabilities, [
    "vision",
    "tool_calling",
  ]);
  assert.deepEqual(ids(filters.filterCatalogModels(ROWS, value)), ["a/vision-big"]);
  assert.deepEqual(ids(filters.filterCatalogModels(ROWS, parseOk("?capability=tool_calling"))), [
    "a/vision-big",
    "a/text-small",
  ]);
});

test("min_context keeps rows at or above the floor and rejects non-integers", () => {
  assert.deepEqual(ids(filters.filterCatalogModels(ROWS, parseOk("?min_context=500000"))), [
    "a/vision-big",
  ]);
  assert.deepEqual(ids(filters.filterCatalogModels(ROWS, parseOk("?min_context=8192"))), [
    "a/vision-big",
    "b/embed",
  ]);
  for (const bad of ["1.5", "-1", "", "abc", "10abc"]) {
    const parsed = filters.parseCatalogDiscoveryQuery(params(`?min_context=${bad}`));
    assert.equal(parsed.ok, false, `min_context=${bad} must be rejected`);
    if (!parsed.ok) assert.match(parsed.message, /min_context must be a non-negative integer/);
  }
});

test("kind treats a row without `type` as chat; q matches id or name case-insensitively", () => {
  assert.deepEqual(ids(filters.filterCatalogModels(ROWS, parseOk("?kind=embedding"))), ["b/embed"]);
  assert.deepEqual(ids(filters.filterCatalogModels(ROWS, parseOk("?kind=chat"))), [
    "a/vision-big",
    "a/text-small",
    "b/no-caps",
  ]);
  assert.deepEqual(ids(filters.filterCatalogModels(ROWS, parseOk("?q=VISION"))), ["a/vision-big"]);
  assert.deepEqual(ids(filters.filterCatalogModels(ROWS, parseOk("?q=text%20small"))), [
    "a/text-small",
  ]);
  assert.equal(filters.parseCatalogDiscoveryQuery(params("?kind=llm")).ok, false);
  assert.equal(filters.parseCatalogDiscoveryQuery(params("?q=%20%20")).ok, false);
});

test("an unknown capability is rejected with the valid vocabulary listed", () => {
  const parsed = filters.parseCatalogDiscoveryQuery(params("?capability=bogus"));
  assert.equal(parsed.ok, false);
  if (parsed.ok) return;
  for (const capability of filters.CATALOG_CAPABILITY_FILTERS) {
    assert.ok(parsed.message.includes(capability), `message must list ${capability}`);
  }
});

// ── the response layer, with an injected catalog loader ─────────────────────

function fakeLoader(body: Record<string, unknown>, status = 200) {
  const seen: Request[] = [];
  const loader = async (request: Request) => {
    seen.push(request);
    return Response.json(body, {
      status,
      headers: { "x-omniroute-catalog-cache": "HIT", "content-length": "1" },
    });
  };
  return { loader, seen };
}

test("filters apply before paging, and the inner catalog request drops filter + paging params", async () => {
  const { loader, seen } = fakeLoader({ object: "list", data: ROWS });
  const response = await getFilteredCatalogResponse(
    new Request("http://localhost/v1/models?capability=tool_calling&limit=1&prefix=alias", {
      headers: { authorization: "Bearer sk-test" },
    }),
    loader
  );
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.deepEqual(ids(body.data), ["a/vision-big"]);
  assert.equal(body.has_more, true);
  assert.equal(body.last_id, "a/vision-big");
  assert.equal(response.headers.get("x-omniroute-catalog-cache"), "HIT");
  assert.notEqual(response.headers.get("content-length"), "1");

  const inner = new URL(seen[0].url);
  assert.equal(inner.searchParams.get("prefix"), "alias");
  for (const dropped of ["capability", "limit", "after", "min_context", "kind", "q"]) {
    assert.equal(inner.searchParams.has(dropped), false, `${dropped} must not reach the builder`);
  }
  assert.equal(seen[0].headers.get("authorization"), "Bearer sk-test");
});

test("a non-200 catalog response (auth rejection) passes through untouched", async () => {
  const { loader } = fakeLoader({ error: { message: "nope" } }, 401);
  const response = await getFilteredCatalogResponse(
    new Request("http://localhost/v1/models?capability=vision"),
    loader
  );
  assert.equal(response.status, 401);
});

test("invalid params are a 400 without stack traces and without building the catalog", async () => {
  const { loader, seen } = fakeLoader({ object: "list", data: ROWS });
  for (const query of ["?capability=bogus", "?min_context=1.5", "?kind=nope"]) {
    const response = await getFilteredCatalogResponse(
      new Request(`http://localhost/v1/models${query}`),
      loader
    );
    assert.equal(response.status, 400, query);
    const body = await response.json();
    assert.equal(typeof body.error?.message, "string");
    assert.ok(!body.error.message.includes("at /"), "error must not leak a stack trace");
  }
  assert.equal(seen.length, 0);
});

// ── the real route ──────────────────────────────────────────────────────────

let seeded = false;
async function seedCatalog() {
  if (seeded) return;
  seeded = true;
  await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "discovery fixture",
    apiKey: "sk-synthetic-discovery",
    isActive: true,
    testStatus: "active",
  });
}

async function routeJson(query: string, headers: Record<string, string> = {}) {
  const response = await modelsRoute.GET(
    new Request(`http://localhost/v1/models${query}`, { headers })
  );
  const text = await response.text();
  return { status: response.status, text, body: JSON.parse(text) };
}

test("GET /v1/models without discovery params is byte-identical to the unfiltered catalog", async () => {
  await seedCatalog();
  for (const query of ["", "?limit=3", "?prefix=alias"]) {
    const viaRoute = await modelsRoute.GET(new Request(`http://localhost/v1/models${query}`));
    const direct = await getUnifiedModelsResponse(
      new Request(`http://localhost/v1/models${query}`)
    );
    const routeText = await viaRoute.text();
    assert.equal(viaRoute.status, 200);
    assert.equal(routeText, await direct.text(), `body must be unchanged for "${query}"`);
    assert.equal(viaRoute.headers.get("content-length"), String(Buffer.byteLength(routeText)));
    assert.equal(JSON.parse(routeText).data.length > 0, true);
  }
});

test("GET /v1/models?capability=vision returns only vision rows from the real catalog", async () => {
  await seedCatalog();
  const all = await routeJson("");
  const vision = await routeJson("?capability=vision");
  assert.equal(vision.status, 200);
  assert.ok(vision.body.data.length > 0, "the fixture must expose at least one vision model");
  assert.ok(vision.body.data.length < all.body.data.length, "the filter must drop rows");
  for (const row of vision.body.data as Row[]) {
    assert.equal(row.capabilities?.vision, true, `${row.id} is not a vision model`);
  }
  const allIds = new Set(ids(all.body.data));
  for (const id of ids(vision.body.data)) assert.ok(allIds.has(id));
});

test("GET /v1/models?min_context filters and ?capability=bogus is a sanitized 400", async () => {
  await seedCatalog();
  const big = await routeJson("?min_context=500000");
  assert.equal(big.status, 200);
  for (const row of big.body.data as Row[]) {
    assert.ok((row.context_length ?? 0) >= 500_000, `${row.id} is below the floor`);
  }
  const fractional = await routeJson("?min_context=1.5");
  assert.equal(fractional.status, 400);

  const bogus = await routeJson("?capability=bogus");
  assert.equal(bogus.status, 400);
  assert.match(bogus.body.error.message, /vision/);
  assert.ok(!bogus.text.includes("at /"), "error must not leak a stack trace");
});

test("a restricted API key plus filters never lists a model outside the key's scope", async () => {
  await seedCatalog();
  const all = await routeJson("?capability=vision");
  const allowed = String(all.body.data[0].id);
  const key = await apiKeys.createApiKey("discovery-restricted", "synthetic-machine");
  await apiKeys.updateApiKeyPermissions(key.id, { allowedModels: [allowed] });
  const headers = { Authorization: `Bearer ${key.key}` };

  const scoped = await routeJson("", headers);
  const scopedIds = new Set(ids(scoped.body.data));
  const filtered = await routeJson("?capability=vision", headers);
  assert.equal(filtered.status, 200);
  assert.ok(filtered.body.data.length > 0);
  for (const id of ids(filtered.body.data)) {
    assert.ok(scopedIds.has(id), `${id} is outside the key's scope`);
  }
  const wide = await routeJson("?q=gpt", headers);
  for (const id of ids(wide.body.data)) {
    assert.ok(scopedIds.has(id), `${id} is outside the key's scope`);
  }
});
