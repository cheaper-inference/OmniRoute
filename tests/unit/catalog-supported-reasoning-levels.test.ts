import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// omp's `openai-models-list` discovery reads `supported_reasoning_levels` from each
// /v1/models row. The catalog only emitted `capabilities.effort_tiers`, so omp fell
// back to its own guesses (e.g. minimal..high for cc/claude-opus-5-5 instead of low..max).

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-reasoning-levels-"));
process.env.DATA_DIR = dataDir;
process.env.NODE_ENV = "test";
process.env.API_KEY_SECRET = "synthetic-catalog-reasoning-levels";

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { finalizeCatalogResponse } = await import("../../src/app/api/v1/models/catalogResponse.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type CatalogRow = {
  id: string;
  capabilities: { effort_tiers?: string[] };
  supported_reasoning_levels?: string[];
  default_reasoning_level?: string;
};

async function rowsFor(models: Array<Record<string, unknown>>) {
  const response = await finalizeCatalogResponse(
    new Request("http://localhost/v1/models"),
    models,
    () => undefined,
    {}
  );
  const body: { data: CatalogRow[] } = await response.json();
  return new Map(body.data.map((row) => [row.id, row]));
}

test("rows carrying capabilities.effort_tiers also emit top-level supported_reasoning_levels", async () => {
  const tiers = ["low", "medium", "high", "xhigh", "max"];
  const rows = await rowsFor([
    {
      id: "combo-with-tiers",
      object: "model",
      owned_by: "combo",
      capabilities: { reasoning: true, effort_tiers: tiers },
    },
  ]);
  const row = rows.get("combo-with-tiers")!;
  assert.deepEqual(row.capabilities.effort_tiers, tiers, "existing field stays unchanged");
  assert.deepEqual(row.supported_reasoning_levels, tiers);
  assert.equal(row.default_reasoning_level, undefined, "no invented default");
});

test("rows without effort_tiers emit no supported_reasoning_levels", async () => {
  const rows = await rowsFor([
    {
      id: "combo-no-tiers",
      object: "model",
      owned_by: "combo",
      capabilities: { reasoning: true },
    },
    {
      id: "combo-empty-tiers",
      object: "model",
      owned_by: "combo",
      capabilities: { effort_tiers: [] },
    },
  ]);
  assert.equal("supported_reasoning_levels" in rows.get("combo-no-tiers")!, false);
  assert.equal("supported_reasoning_levels" in rows.get("combo-empty-tiers")!, false);
});

test("an effort-suffixed row of a listed base id emits no supported_reasoning_levels", async () => {
  const tiers = ["low", "medium", "high", "xhigh", "max"];
  const rows = await rowsFor([
    { id: "combo-base", object: "model", owned_by: "combo", capabilities: { effort_tiers: tiers } },
    {
      id: "combo-base-low",
      object: "model",
      owned_by: "combo",
      capabilities: { effort_tiers: tiers },
    },
    {
      id: "orphan-high",
      object: "model",
      owned_by: "combo",
      capabilities: { effort_tiers: tiers },
    },
  ]);
  assert.deepEqual(rows.get("combo-base")!.supported_reasoning_levels, tiers);
  assert.equal("supported_reasoning_levels" in rows.get("combo-base-low")!, false);
  assert.deepEqual(rows.get("orphan-high")!.supported_reasoning_levels, tiers);
});
