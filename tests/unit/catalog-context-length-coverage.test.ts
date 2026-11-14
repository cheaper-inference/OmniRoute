/**
 * `context_length` coverage in `/v1/models`. Every chat row the
 * catalog can price reports a positive `context_length`, and `max_output_tokens` when it is
 * known; an unknown limit stays ABSENT, never 0. Launch tools such as hermes (hard reject below
 * 64k), crush and openclaw read these numbers straight from the catalog.
 *
 * Fixture registry: a cold build with no provider connections, which lists every built-in
 * provider's static catalog.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-g4-context-"));
process.env.DATA_DIR = TEST_DATA_DIR;
// A cold full build can exceed the default 8s bound on a loaded runner; the bound is not what
// this test covers (same pin as tests/unit/12058-models-catalog-canonical-self-aliased.test.ts).
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";

const core = await import("../../src/lib/db/core.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");
const { catalogMetadataLookup, withoutNonPositiveTokenLimits } =
  await import("../../src/app/api/v1/models/catalogResponse.ts");

/** Permissive catalog row for assertions (no explicit any in tests/). */
type Row = { [key: string]: Row } & Record<string, unknown>;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

let cachedRows: Row[] | null = null;
async function getRows(): Promise<Row[]> {
  if (cachedRows) return cachedRows;
  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/v1/models")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: Row[] };
  cachedRows = body.data;
  return cachedRows;
}

const isChat = (row: Row) => (!row.type || row.type === "chat") && row.owned_by !== "combo";
const isPriced = (row: Row) =>
  Boolean(row.pricing && typeof row.pricing === "object" && Object.keys(row.pricing).length > 0);
const positive = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) && value > 0;

test("every priced chat row reports a positive context_length", async () => {
  const priced = (await getRows()).filter((row) => isChat(row) && isPriced(row));
  assert.ok(priced.length > 50, `fixture should price many chat rows, got ${priced.length}`);
  const missing = priced.filter((row) => !positive(row.context_length)).map((row) => row.id);
  assert.deepEqual(missing, []);
});

test("every chat row reports a positive context_length", async () => {
  const chat = (await getRows()).filter(isChat);
  const missing = chat.filter((row) => !positive(row.context_length)).map((row) => row.id);
  assert.deepEqual(missing, []);
});

test("no row advertises a zero, negative or non-numeric token limit", async () => {
  const bad = (await getRows()).filter((row) =>
    ["context_length", "max_input_tokens", "max_output_tokens"].some(
      (field) => field in row && !positive(row[field])
    )
  );
  assert.deepEqual(
    bad.map((row) => row.id),
    []
  );
});

test("priced chat rows report max_output_tokens for the large majority", async () => {
  const priced = (await getRows()).filter((row) => isChat(row) && isPriced(row));
  const withOutput = priced.filter((row) => positive(row.max_output_tokens)).length;
  const share = withOutput / priced.length;
  // 128/134 at the time of writing; the remainder has no known output limit anywhere.
  assert.ok(share >= 0.9, `max_output_tokens share ${withOutput}/${priced.length}`);
});

test("no-think variants report the limits of the model they route to", async () => {
  const rows = await getRows();
  const byId = new Map(rows.map((row) => [row.id, row]));
  const variants = rows.filter(
    (row) => isChat(row) && typeof row.id === "string" && row.id.startsWith("no-think/")
  );
  let compared = 0;
  for (const variant of variants) {
    const base = byId.get(variant.id.slice("no-think/".length));
    if (!base) continue;
    compared++;
    assert.equal(variant.context_length, base.context_length, `${variant.id} context_length`);
    if (positive(base.max_output_tokens)) {
      assert.equal(variant.max_output_tokens, base.max_output_tokens, `${variant.id} max_output`);
    }
  }
  assert.ok(compared > 0, "fixture should contain no-think variants with a listed base row");
});

test("catalogMetadataLookup strips only the no-think prefix", () => {
  assert.deepEqual(catalogMetadataLookup({ root: "no-think/claude-opus-4-8" }), {
    model: "claude-opus-4-8",
  });
  assert.equal(catalogMetadataLookup({ root: "claude-opus-4-8" }), undefined);
  assert.equal(catalogMetadataLookup({ id: "no-think/x/y" }), undefined);
  assert.equal(catalogMetadataLookup({}), undefined);
});

test("withoutNonPositiveTokenLimits drops unknown limits and keeps real ones", () => {
  const clean = { id: "a", context_length: 1000, max_output_tokens: 10 };
  assert.equal(withoutNonPositiveTokenLimits(clean), clean);
  assert.deepEqual(
    withoutNonPositiveTokenLimits({
      id: "b",
      context_length: 0,
      max_input_tokens: Number.NaN,
      max_output_tokens: 4096,
    }),
    { id: "b", max_output_tokens: 4096 }
  );
  assert.deepEqual(withoutNonPositiveTokenLimits({ id: "c", context_length: null }), { id: "c" });
  assert.deepEqual(withoutNonPositiveTokenLimits({ id: "d", max_output_tokens: -1 }), { id: "d" });
});
