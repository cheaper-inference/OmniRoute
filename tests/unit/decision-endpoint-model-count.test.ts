import test from "node:test";
import assert from "node:assert/strict";
import { decisionEndpointModels } from "../../src/shared/constants/decisionEndpointModels.ts";
test("counts distinct compatible catalogue models only", () => {
  const models = [
    { id: "gemini/gemini-decision-1" },
    { id: "gemini-decision-1", owned_by: "gemini" },
    { id: "vertex/gemini-decision-1" },
    { id: "openai/gpt-6-luna" },
    { id: "typesafe/jev-preview" },
  ];
  for (const path of ["/v1/decisions", "/v1beta/decisions", "/v1/systemone"]) {
    assert.equal(decisionEndpointModels(models, path).length, 1);
    assert.equal(decisionEndpointModels([], path).length, 0);
  }
});
