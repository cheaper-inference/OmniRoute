import { describe, it, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const moduleDataDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "omni-model-capability-boolean-overrides-")
);
process.env.DATA_DIR = moduleDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const caps = await import("../../src/lib/modelCapabilities.ts");
const overrides = await import("../../src/lib/db/modelCapabilityOverrides.ts");
const route = await import("../../src/app/api/model-capability-overrides/route.ts");
const snapshotMod = await import("../../src/lib/modelCapabilityResolutionSnapshot.ts");

beforeEach(() => {
  coreDb.resetDbInstance();
  fs.rmSync(moduleDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(moduleDataDir, { recursive: true });
  coreDb.getDbInstance();
});

after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(moduleDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function patchOverride(target: string, key: string, value: unknown) {
  return route.PATCH(
    new Request("http://localhost/api/model-capability-overrides", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ target, key, value }),
    })
  );
}

function deleteOverride(target: string, key: string) {
  return route.DELETE(
    new Request(
      `http://localhost/api/model-capability-overrides?target=${encodeURIComponent(target)}&key=${encodeURIComponent(key)}`,
      { method: "DELETE" }
    )
  );
}

describe("model capability boolean overrides (#20127)", () => {
  it("stores, lists, applies, and removes boolean capability overrides", () => {
    const target = "openai/gpt-4o-mini";

    // 1. structured_output
    assert.equal(overrides.setModelCapabilityOverride(target, "structured_output", false), true);
    assert.equal(
      overrides.getBooleanModelCapabilityOverride("openai", "gpt-4o-mini", "structured_output"),
      false
    );
    let resolved = caps.getResolvedModelCapabilities({ provider: "openai", model: "gpt-4o-mini" });
    assert.equal(resolved.structuredOutput, false);

    assert.equal(overrides.setModelCapabilityOverride(target, "structured_output", true), true);
    resolved = caps.getResolvedModelCapabilities({ provider: "openai", model: "gpt-4o-mini" });
    assert.equal(resolved.structuredOutput, true);

    // 2. tool_calling
    assert.equal(overrides.setModelCapabilityOverride(target, "tool_calling", false), true);
    resolved = caps.getResolvedModelCapabilities({ provider: "openai", model: "gpt-4o-mini" });
    assert.equal(resolved.toolCalling, false);
    assert.equal(resolved.supportsTools, false);

    // 3. temperature
    assert.equal(overrides.setModelCapabilityOverride(target, "temperature", false), true);
    resolved = caps.getResolvedModelCapabilities({ provider: "openai", model: "gpt-4o-mini" });
    assert.equal(resolved.temperature, false);

    // 4. vision
    assert.equal(overrides.setModelCapabilityOverride(target, "vision", false), true);
    resolved = caps.getResolvedModelCapabilities({ provider: "openai", model: "gpt-4o-mini" });
    assert.equal(resolved.supportsVision, false);

    // 5. attachment
    assert.equal(overrides.setModelCapabilityOverride(target, "attachment", false), true);
    resolved = caps.getResolvedModelCapabilities({ provider: "openai", model: "gpt-4o-mini" });
    assert.equal(resolved.attachment, false);

    // List verification
    const list = overrides.listModelCapabilityOverrides();
    assert.equal(list.length, 5);

    // Removal restores default
    assert.equal(overrides.removeModelCapabilityOverride(target, "structured_output"), true);
    assert.equal(
      overrides.getBooleanModelCapabilityOverride("openai", "gpt-4o-mini", "structured_output"),
      null
    );
  });

  it("accepts boolean overrides via PATCH /api/model-capability-overrides and deletes them via DELETE", async () => {
    const target = "openai/gpt-4o";

    const resPatch = await patchOverride(target, "structured_output", false);
    assert.equal(resPatch.status, 200);
    const bodyPatch = await resPatch.json();
    assert.ok(
      bodyPatch.overrides.some(
        (o: { key: string; value: unknown; target: string }) =>
          o.key === "structured_output" && o.value === false && o.target === target
      )
    );

    let resolved = caps.getResolvedModelCapabilities(target);
    assert.equal(resolved.structuredOutput, false);

    // DELETE
    const resDelete = await deleteOverride(target, "structured_output");
    assert.equal(resDelete.status, 200);
    resolved = caps.getResolvedModelCapabilities(target);
    // After deletion, absence of override is restored
    assert.equal(
      overrides.getBooleanModelCapabilityOverride("openai", "gpt-4o", "structured_output"),
      null
    );
  });

  it("maintains parity between direct runtime resolution and snapshot bulk resolution", () => {
    const target = "codex/gpt-5.6";
    overrides.setModelCapabilityOverride(target, "structured_output", true);
    overrides.setModelCapabilityOverride(target, "tool_calling", true);
    overrides.setModelCapabilityOverride(target, "temperature", false);

    const direct = caps.getResolvedModelCapabilities(target);
    const snapshot = snapshotMod.createModelCapabilityResolutionSnapshot();
    const bulk = caps.getResolvedModelCapabilities(target, undefined, snapshot);

    assert.equal(direct.structuredOutput, bulk.structuredOutput);
    assert.equal(direct.toolCalling, bulk.toolCalling);
    assert.equal(direct.temperature, bulk.temperature);
  });
});
