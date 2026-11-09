/**
 * POST /v1/models/query — a bounded, deterministically ordered shortlist over the
 * caller's catalog, with the GET discovery predicates plus `max_output`, `owned_by`
 * and `exclude`. Same auth and per-key visibility as GET /v1/models.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "v1-models-query-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(dataDir, "plugins");
process.env.NODE_ENV = "test";
process.env.API_KEY_SECRET = "synthetic-v1-models-query";
// This tests catalog contents, not the cold-build latency budget of the shared host.
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";

const filters = await import("../../src/app/api/v1/models/catalogFilters.ts");
const { queryCatalogResponse } = await import("../../src/app/api/v1/models/catalogDiscovery.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const queryRoute = await import("../../src/app/api/v1/models/query/route.ts");
const modelsRoute = await import("../../src/app/api/v1/models/route.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type Row = { id: string; owned_by?: string; max_output_tokens?: number };

function parseBody(body: unknown) {
  const parsed = filters.catalogQueryBodySchema.safeParse(body);
  if (!parsed.success)
    return { ok: false as const, message: filters.describeCatalogFilterIssue(parsed.error) };
  return { ok: true as const, value: filters.normalizeCatalogQueryBody(parsed.data) };
}

function ids(rows: Array<{ id?: unknown }>): string[] {
  return rows.map((row) => String(row.id));
}

test("an empty body yields no filters and the default limit of 20", () => {
  const parsed = parseBody({});
  assert.equal(parsed.ok, true);
  if (!parsed.ok) return;
  assert.equal(parsed.value.limit, 20);
  assert.deepEqual(parsed.value.filters.capabilities, []);
  assert.deepEqual(parsed.value.filters.exclude, []);
  assert.equal(parsed.value.filters.minContext, null);
});

test("limit is capped at 100 and must be a positive integer", () => {
  const capped = parseBody({ limit: 5000 });
  assert.equal(capped.ok, true);
  if (capped.ok) assert.equal(capped.value.limit, 100);
  for (const bad of [0, -1, 1.5, "10"]) {
    assert.equal(parseBody({ limit: bad }).ok, false, `limit=${JSON.stringify(bad)}`);
  }
});

test("capabilities/exclude accept arrays or comma lists; unknown fields and values are rejected", () => {
  const parsed = parseBody({ capabilities: "vision, tool_calling", exclude: ["a/x", "b/y"] });
  assert.equal(parsed.ok, true);
  if (parsed.ok) {
    assert.deepEqual(parsed.value.filters.capabilities, ["vision", "tool_calling"]);
    assert.deepEqual(parsed.value.filters.exclude, ["a/x", "b/y"]);
  }
  const unknownCapability = parseBody({ capabilities: ["bogus"] });
  assert.equal(unknownCapability.ok, false);
  if (!unknownCapability.ok) assert.match(unknownCapability.message, /vision/);
  const typo = parseBody({ capability: ["vision"] });
  assert.equal(typo.ok, false);
  if (!typo.ok) assert.match(typo.message, /capability/);
  assert.equal(parseBody({ min_context: "lots" }).ok, false);
  assert.equal(parseBody([]).ok, false);
  assert.equal(parseBody(null).ok, false);
});

const ROWS: Row[] = [
  { id: "z/model-b", owned_by: "z", max_output_tokens: 8_000 },
  { id: "a/model-b", owned_by: "a", max_output_tokens: 64_000 },
  { id: "a/model-a", owned_by: "a", max_output_tokens: 128_000 },
  { id: "m/model-c", owned_by: "m" },
];

function loaderFor(rows: Row[], status = 200) {
  return async () =>
    Response.json(status === 200 ? { object: "list", data: rows } : {}, { status });
}

async function query(body: Record<string, unknown>, rows: Row[] = ROWS) {
  const parsed = parseBody(body);
  assert.equal(parsed.ok, true);
  if (!parsed.ok) throw new Error("unreachable");
  const response = await queryCatalogResponse(
    new Request("http://localhost/v1/models/query", { method: "POST" }),
    parsed.value.filters,
    parsed.value.limit,
    loaderFor(rows)
  );
  assert.equal(response.status, 200);
  return (await response.json()) as { object: string; data: Row[] };
}

test("results are ordered by owned_by then id, independent of catalog order", async () => {
  const forward = await query({});
  const reversed = await query({}, [...ROWS].reverse());
  assert.deepEqual(ids(forward.data), ["a/model-a", "a/model-b", "m/model-c", "z/model-b"]);
  assert.deepEqual(ids(reversed.data), ids(forward.data));
  assert.equal(forward.object, "list");
});

test("exclude, owned_by, max_output and limit narrow the shortlist", async () => {
  assert.deepEqual(ids((await query({ exclude: ["a/model-a"] })).data), [
    "a/model-b",
    "m/model-c",
    "z/model-b",
  ]);
  assert.deepEqual(ids((await query({ owned_by: "a" })).data), ["a/model-a", "a/model-b"]);
  assert.deepEqual(ids((await query({ max_output: 60_000 })).data), ["a/model-a", "a/model-b"]);
  assert.deepEqual(ids((await query({ limit: 2 })).data), ["a/model-a", "a/model-b"]);
});

test("the hard cap holds even when the catalog is larger", async () => {
  const many: Row[] = Array.from({ length: 250 }, (_, i) => ({
    id: `p/m-${String(i).padStart(3, "0")}`,
    owned_by: "p",
  }));
  assert.equal((await query({ limit: 1000 }, many)).data.length, 100);
  assert.equal((await query({}, many)).data.length, 20);
});

test("a non-200 catalog response (auth rejection) passes through", async () => {
  const response = await queryCatalogResponse(
    new Request("http://localhost/v1/models/query", { method: "POST" }),
    filters.normalizeCatalogQueryBody(filters.catalogQueryBodySchema.parse({})).filters,
    20,
    loaderFor([], 401)
  );
  assert.equal(response.status, 401);
});

// ── the real route ──────────────────────────────────────────────────────────

function post(body: string) {
  return queryRoute.POST(
    new Request("http://localhost/v1/models/query", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
    })
  );
}

test("POST /v1/models/query rejects invalid bodies with a sanitized 400", async () => {
  for (const body of [
    "{not json",
    "[]",
    '{"limit":0}',
    '{"capabilities":["bogus"]}',
    '{"nope":1}',
  ]) {
    const response = await post(body);
    assert.equal(response.status, 400, body);
    const text = await response.text();
    const parsed = JSON.parse(text);
    assert.equal(typeof parsed.error?.message, "string");
    assert.ok(!text.includes("at /"), "error must not leak a stack trace");
  }
});

test("POST /v1/models/query shortlists the real catalog deterministically", async () => {
  await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "query fixture",
    apiKey: "sk-synthetic-query",
    isActive: true,
    testStatus: "active",
  });
  const response = await post(JSON.stringify({ capabilities: ["vision"], limit: 5 }));
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    data: Array<Row & { capabilities?: Record<string, unknown> }>;
  };
  assert.ok(body.data.length > 0 && body.data.length <= 5);
  for (const row of body.data) assert.equal(row.capabilities?.vision, true);
  const sorted = [...body.data].sort(filters.compareCatalogQueryRows);
  assert.deepEqual(ids(body.data), ids(sorted));

  const again = (await (
    await post(JSON.stringify({ capabilities: ["vision"], limit: 5 }))
  ).json()) as {
    data: Row[];
  };
  assert.deepEqual(ids(again.data), ids(body.data));

  const excluded = (await (
    await post(JSON.stringify({ capabilities: ["vision"], limit: 5, exclude: [body.data[0].id] }))
  ).json()) as { data: Row[] };
  assert.equal(ids(excluded.data).includes(body.data[0].id), false);

  // Every shortlisted id is also listed by GET /v1/models for the same caller.
  const all = (await (await modelsRoute.GET(new Request("http://localhost/v1/models"))).json()) as {
    data: Row[];
  };
  const listed = new Set(ids(all.data));
  for (const id of ids(body.data)) assert.ok(listed.has(id), id);
});

test("GET /v1/models/query keeps the single-model lookup behavior (404 for an unknown id)", async () => {
  const response = await queryRoute.GET(new Request("http://localhost/v1/models/query"));
  assert.equal(response.status, 404);
});
