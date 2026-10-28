import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-shared-context-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET ||= "shared-context-resolution-secret";

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const comboContext = await import("../../src/lib/combos/comboContext.ts");
const { buildAliasMaps } = await import("../../src/app/api/v1/models/catalogProviderMaps.ts");

const SIX_MODELS = [
  "glm/glm-5.2",
  "glm/glm-4.5",
  "openai/gpt-4o-mini",
  "openai/o3",
  "openai/gpt-4.1",
  "gemini/gemini-2.5-pro",
];

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("listing many combos over few models builds the alias tables once with identical values", async () => {
  let buildCount = 0;
  const resolution = comboContext.createComboContextResolution(() => {
    buildCount += 1;
    return buildAliasMaps();
  });

  const createdNames: string[] = [];
  try {
    for (let i = 0; i < 90; i += 1) {
      const name = `shared-context-bulk-${i}`;
      createdNames.push(name);
      await combosDb.createCombo({
        name,
        strategy: "priority",
        models: [SIX_MODELS[i % SIX_MODELS.length]],
      });
    }
    const allCombos = await combosDb.getCombos();

    const shared = allCombos.map((combo) =>
      comboContext.computeComboContextLength(combo, allCombos, resolution)
    );
    const isolated = allCombos.map((combo) =>
      comboContext.computeComboContextLength(combo, allCombos)
    );

    assert.equal(buildCount, 1);
    assert.deepEqual(shared, isolated);
  } finally {
    for (const name of createdNames) {
      await combosDb.deleteComboByName(name);
    }
  }
});

test("a nested combo resolves to the same value with a shared resolution", async () => {
  let created = false;
  try {
    await combosDb.createCombo({
      name: "shared-context-inner",
      strategy: "priority",
      models: ["glm/glm-5.2", "not-a-real-provider/no-such-model"],
    });
    await combosDb.createCombo({
      name: "shared-context-wrapper",
      strategy: "priority",
      models: [{ kind: "combo-ref", comboName: "shared-context-inner" }],
    });
    created = true;
    const allCombos = await combosDb.getCombos();
    const wrapper = allCombos.find((combo) => combo.name === "shared-context-wrapper");
    assert.ok(wrapper);

    const resolution = comboContext.createComboContextResolution();
    assert.equal(
      comboContext.computeComboContextLength(wrapper, allCombos, resolution),
      comboContext.computeComboContextLength(wrapper, allCombos)
    );
  } finally {
    if (created) {
      await combosDb.deleteComboByName("shared-context-wrapper");
      await combosDb.deleteComboByName("shared-context-inner");
    }
  }
});

test("a combo with a fixed context returns it without building alias tables", () => {
  let buildCount = 0;
  const resolution = comboContext.createComboContextResolution(() => {
    buildCount += 1;
    return buildAliasMaps();
  });

  const result = comboContext.computeComboContextLength(
    { name: "shared-context-fixed", models: SIX_MODELS, context_length: 64000 },
    [],
    resolution
  );

  assert.equal(result, 64000);
  assert.equal(buildCount, 0);
});

test("an isolated call without a resolution is unchanged", () => {
  const combo = { name: "shared-context-isolated", models: ["glm/glm-5.2"] };
  assert.equal(comboContext.computeComboContextLength(combo, []), 1000000);
});
