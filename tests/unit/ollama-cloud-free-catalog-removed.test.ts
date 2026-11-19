import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.data.ts";

test("ollama-cloud has no models in the free catalog (#19334)", () => {
  const ollamaFreeModels = FREE_MODEL_BUDGETS.filter(
    (entry) => entry.provider === "ollama-cloud" || entry.poolKey === "ollama-cloud"
  );
  assert.equal(
    ollamaFreeModels.length,
    0,
    `Expected 0 free models for ollama-cloud but found: ${JSON.stringify(ollamaFreeModels)}`
  );
});

test("free-catalog-evidence.json has no ollama-cloud entries (#19334)", () => {
  const evidencePath = path.resolve(process.cwd(), "config/quality/free-catalog-evidence.json");
  const raw = fs.readFileSync(evidencePath, "utf-8");
  const parsed = JSON.parse(raw);
  assert.equal(
    parsed.debt?.includes("ollama-cloud/qwen3.5:397b"),
    false,
    "ollama-cloud/qwen3.5:397b should be removed from free-catalog-evidence.json"
  );
});
