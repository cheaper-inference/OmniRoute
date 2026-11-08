import test from "node:test";
import assert from "node:assert/strict";
import { REGISTRY } from "../../open-sse/config/providers/index.ts";
test("ZCode account page and both tariff routes expose the GLM catalog", () => {
  for (const id of ["zcode", "zcode-start", "zcode-individual"]) {
    assert.ok(
      REGISTRY[id].models?.some((model) => model.id === "glm-5.3-flash"),
      `${id} must be selectable after OAuth`
    );
    assert.ok(REGISTRY[id].models?.some((model) => model.id === "glm-5.3"));
  }
  assert.equal(REGISTRY.zcode.alias, "zc");
});
