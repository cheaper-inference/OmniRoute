import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const previousDataDir = process.env.DATA_DIR;
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-glm53-vision-"));
process.env.DATA_DIR = dataDir;

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { isVisionModelId } = await import("../../src/shared/constants/visionModels.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
const { deriveRequestCompatibilityRequirements, filterTargetsByRequestCompatibility } =
  await import("../../open-sse/services/combo/comboStructure.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
});

test("GLM-5.3 text-only ids do not inherit Flash's vision heuristic", () => {
  for (const model of [
    "glm-5.3",
    "glm-5.3-low",
    "glm-5.3-high",
    "glm-5.3-max",
    "zai/glm-5.3",
    "opencode-go/glm-5.3",
    "gateway/zai/glm-5.3:free",
    "ZAI/GLM-5.3-HIGH",
  ]) {
    assert.equal(isVisionModelId(model), false, model);
  }
});

test("GLM-5.3 Flash and its effort aliases retain vision", () => {
  for (const model of [
    "glm-5.3-flash",
    "glm-5.3-flash-low",
    "glm-5.3-flash-high",
    "glm-5.3-flash-max",
  ]) {
    assert.equal(isVisionModelId(`zai/${model}`), true, model);
    assert.equal(
      getResolvedModelCapabilities({ provider: "zai", model }).supportsVision,
      true,
      model
    );
  }
});

test("registered GLM-5.3 text-only variants agree with the heuristic", () => {
  for (const model of ["glm-5.3", "glm-5.3-low", "glm-5.3-high", "glm-5.3-max"]) {
    assert.equal(
      getResolvedModelCapabilities({ provider: "zai", model }).supportsVision,
      false,
      model
    );
    assert.equal(isVisionModelId(model), false, model);
  }
});

const target = (modelStr: string) => ({
  kind: "model" as const,
  stepId: modelStr,
  executionKey: modelStr,
  modelStr,
  provider: "zai",
  providerId: "zai",
  connectionId: null,
  weight: 1,
  label: null,
});
const log = { info() {}, warn() {}, error() {}, debug() {} };

test("nested Claude tool-result image excludes GLM-5.3 but retains Flash", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: "synthetic-tool",
            content: [
              { type: "image", source: { type: "base64", media_type: "image/png", data: "AAAA" } },
            ],
          },
        ],
      },
    ],
  };
  assert.equal(deriveRequestCompatibilityRequirements(body).requiresVision, true);
  const filtered = filterTargetsByRequestCompatibility(
    [target("zai/glm-5.3"), target("zai/glm-5.3-flash")],
    body,
    log
  );
  assert.deepEqual(
    filtered.map((entry) => entry.modelStr),
    ["zai/glm-5.3-flash"]
  );
});

test("text-only requests can still use GLM-5.3", () => {
  const body = { messages: [{ role: "user", content: "Synthetic text" }] };
  assert.equal(deriveRequestCompatibilityRequirements(body).requiresVision, false);
  assert.deepEqual(
    filterTargetsByRequestCompatibility([target("zai/glm-5.3")], body, log).map(
      (entry) => entry.modelStr
    ),
    ["zai/glm-5.3"]
  );
});
