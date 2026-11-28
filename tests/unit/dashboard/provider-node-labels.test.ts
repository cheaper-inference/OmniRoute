import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { providerLabelsWithNodes } from "../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/constants.ts";

describe("providerLabelsWithNodes", () => {
  test("names a custom node by its name instead of the generated id", () => {
    const id = "openai-compatible-chat-95565442-1b4b-4082-b428-9503ac8ca716";
    const labels = providerLabelsWithNodes([{ id, name: "sensenova-pool", prefix: "snova" }]);
    assert.equal(labels[id], "sensenova-pool");
  });

  test("falls back to the prefix when the node has no name", () => {
    const labels = providerLabelsWithNodes([{ id: "node-1", prefix: "snova" }]);
    assert.equal(labels["node-1"], "snova");
  });

  test("keeps the built-in labels and ignores a node with nothing to show", () => {
    const labels = providerLabelsWithNodes([{ id: "node-2" }, { name: "orphan" }]);
    assert.equal(labels["node-2"], undefined);
    assert.equal(labels.codex, "OpenAI Codex");
  });
});
