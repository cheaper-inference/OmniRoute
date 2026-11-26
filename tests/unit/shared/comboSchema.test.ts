import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  comboRuntimeConfigSchema,
  createComboSchema,
  updateComboSchema,
} from "@/shared/validation/schemas/combo";

describe("comboRuntimeConfigSchema.modelSort", () => {
  it("accepts a valid modelSort method", () => {
    const parsed = comboRuntimeConfigSchema.parse({ modelSort: { method: "provider" } });
    assert.deepEqual(parsed.modelSort, { method: "provider" });
  });

  it("rejects an invalid method", () => {
    assert.throws(() => comboRuntimeConfigSchema.parse({ modelSort: { method: "bogus" } }));
  });

  it("allows extra keys on the modelSort sub-object (passthrough)", () => {
    const parsed = comboRuntimeConfigSchema.parse({ modelSort: { method: "name", future: 1 } });
    assert.equal(parsed.modelSort?.method, "name");
  });

  it("is optional", () => {
    const parsed = comboRuntimeConfigSchema.parse({});
    assert.equal(parsed.modelSort, undefined);
  });
});

describe("modelSort persistence", () => {
  it("round-trips through updateComboSchema (models + config)", () => {
    const parsed = updateComboSchema.parse({
      models: [{ id: "m1", kind: "model", model: "openai/gpt", providerId: "openai", weight: 0 }],
      config: { modelSort: { method: "score" } },
    });
    assert.equal(parsed.config?.modelSort?.method, "score");
  });

  it("passes through comboRuntimeConfigSchema", () => {
    const parsed = comboRuntimeConfigSchema.parse({ modelSort: { method: "provider" } });
    assert.equal(parsed.modelSort?.method, "provider");
  });
});

describe("reserved automatic route names", () => {
  for (const name of ["auto", "auto/coding", "AUTO", " Auto/x "]) {
    it(`rejects "${name}" on create and update`, () => {
      for (const result of [
        createComboSchema.safeParse({ name, models: ["openai/gpt-4o-mini"] }),
        updateComboSchema.safeParse({ name }),
      ]) {
        assert.equal(result.success, false);
        assert.deepEqual(result.error?.issues[0]?.path, ["name"]);
        assert.match(
          result.error?.issues[0]?.message ?? "",
          /reserved for the built-in automatic routes/
        );
      }
    });
  }

  for (const name of ["autopilot", "my-auto"]) {
    it(`accepts "${name}" on create and update`, () => {
      assert.equal(createComboSchema.parse({ name, models: ["openai/gpt-4o-mini"] }).name, name);
      assert.equal(updateComboSchema.parse({ name }).name, name);
    });
  }
});
