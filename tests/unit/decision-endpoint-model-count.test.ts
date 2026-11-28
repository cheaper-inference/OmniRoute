import test from "node:test";
import assert from "node:assert/strict";
import { decisionEndpointModelCount } from "../../src/shared/constants/decisionEndpointModels.ts";
test("counts distinct compatible catalogue models only", () => {
  const models = [
    { id: "openai/gpt-6-luna" },
    { id: "gpt-6-luna", owned_by: "openai" },
    { id: "codex/gpt-6-luna" },
    { id: "typesafe/jev-preview" },
  ];
  for (const path of ["/v1/decisions", "/v1/systemone"]) {
    assert.equal(decisionEndpointModelCount(models, path), 1);
    assert.equal(decisionEndpointModelCount([], path), 0);
  }
});

test("counts the native Gemini model even when absent from the chat catalogue", () => {
  assert.equal(decisionEndpointModelCount([], "/v1beta/decisions"), 1);
  assert.equal(
    decisionEndpointModelCount(
      [
        { id: "gemini/gemini-decision-1" },
        { id: "gemini-decision-1", owned_by: "gemini" },
        { id: "vertex/gemini-decision-1" },
      ],
      "/v1beta/decisions"
    ),
    1
  );
});
