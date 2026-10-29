import test from "node:test";
import assert from "node:assert/strict";
import { buildShowPayload, getRequestedModelName } from "../../src/lib/vscode/showModel.ts";

test("show payload preserves the caller's published id and display name", () => {
  const model = {
    id: "custom/example",
    owned_by: "custom",
    context_length: 8192,
    max_output_tokens: 1024,
    capabilities: { vision: true, tool_calling: true },
    input_modalities: ["text", "image"],
    output_modalities: ["text"],
    supported_endpoints: ["chat/completions"],
  };
  const grouped = buildShowPayload(model, "Friendly model", "published-alias");
  const raw = buildShowPayload(model, "Raw model", model.id);
  assert.equal(grouped.model, "published-alias");
  assert.equal(grouped.modelfile, "FROM published-alias");
  assert.equal(grouped.remote_model, "Friendly model");
  assert.equal(raw.model, model.id);
  assert.equal(raw.remote_model, "Raw model");
  assert.deepEqual(grouped.details, raw.details);
  assert.equal(raw.details.parent_model, model.id);
  assert.equal(raw.details.family, "example");
  assert.equal(raw.model_info.context_length, 8192);
  assert.equal(raw.model_info.max_output_tokens, 1024);
  assert.deepEqual(raw.model_info.input_modalities, ["text", "image"]);
  assert.deepEqual(raw.capabilities, ["completion", "vision", "tools"]);
  assert.deepEqual(model.capabilities, { vision: true, tool_calling: true });
});

test("show request name precedence and invalid input handling stay unchanged", () => {
  assert.equal(getRequestedModelName({ name: " alias ", model: "fallback" }), "alias");
  assert.equal(getRequestedModelName({ model: " fallback " }), "fallback");
  for (const input of [null, "model", {}, { name: " " }, { name: 42, model: "fallback" }]) {
    assert.equal(getRequestedModelName(input), null);
  }
});
