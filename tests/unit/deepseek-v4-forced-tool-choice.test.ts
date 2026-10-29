import test from "node:test";
import assert from "node:assert/strict";

import {
  getModelSpec,
  normalizeForcedToolChoiceForModel,
} from "../../src/shared/constants/modelSpecs.ts";

for (const modelId of ["deepseek-v4-pro", "deepseek-v4-flash"]) {
  test(modelId + " flags rejectsForcedToolChoice and normalizes forced tool calls", () => {
    assert.equal(getModelSpec(modelId)?.rejectsForcedToolChoice, true);

    for (const toolChoice of [
      "required",
      "any",
      { type: "any" },
      { type: "tool", name: "functions__exec" },
      { type: "function", function: { name: "functions__exec" } },
    ]) {
      const tools = [{ name: "functions__exec", input_schema: { type: "object" } }];
      const result = normalizeForcedToolChoiceForModel(
        { model: modelId, tools, tool_choice: toolChoice, marker: true },
        modelId
      );
      assert.equal("tool_choice" in result, false);
      assert.equal(result.tools, tools);
      assert.equal(result.marker, true);
    }

    const auto = { model: modelId, tool_choice: { type: "auto" } };
    assert.equal(normalizeForcedToolChoiceForModel(auto, modelId), auto);

    const unflagged = { model: "deepseek-v3", tool_choice: { type: "tool", name: "x" } };
    assert.equal(normalizeForcedToolChoiceForModel(unflagged, "deepseek-v3"), unflagged);
  });
}
