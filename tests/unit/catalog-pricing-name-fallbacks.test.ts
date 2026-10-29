import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-pricing-fallbacks-"));
process.env.DATA_DIR = directory;
const { enrichCatalogModelEntry } = await import("../../src/lib/modelMetadataRegistry.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
test.after(() => {
  resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

test("pricing resolves provider and model aliases while selecting only supported numeric fields", () => {
  for (const [provider, model, key] of [
    ["openai", "gpt-4o", "GPT-4O"],
    ["openai-cn", "gpt-4o", "gpt-4o"],
    ["openai", "test.model", "test-model"],
    ["openai", "vendor/test-model", "test-model"],
  ]) {
    const entry = enrichCatalogModelEntry(
      { id: `${provider}/${model}`, owned_by: provider, root: model },
      undefined,
      {
        modelsDevPricing: {
          OpenAI: {
            [key]: { input: 0, output: 2, cached: 0.25, cache_creation: 3, unsupported: 99 },
          },
        },
        userPricing: {},
      }
    );
    assert.deepEqual(entry.pricing, { input: 0, output: 2, cached: 0.25, cache_creation: 3 });
  }
});

test("exact model pricing wins over punctuation aliases without merging missing fields", () => {
  const entry = enrichCatalogModelEntry(
    { id: "openai/test.model", owned_by: "openai", root: "test.model" },
    undefined,
    {
      modelsDevPricing: {
        openai: { "test.model": { input: 1 }, "test-model": { input: 2, output: 3 } },
      },
      userPricing: {},
    }
  );
  assert.deepEqual(entry.pricing, { input: 1 });
});
