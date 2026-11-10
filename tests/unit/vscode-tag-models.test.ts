import test from "node:test";
import assert from "node:assert/strict";
import { toOllamaTagModel } from "../../src/lib/vscode/tagModels.ts";

test("raw and grouped tags retain their distinct published identifiers", () => {
  const model = { id: "custom/gpt-example", owned_by: "custom", context_length: 8192 };
  const raw = toOllamaTagModel(model, "raw");
  const grouped = toOllamaTagModel(model, "grouped");
  assert.equal(raw.name, "custom/gpt-example");
  assert.equal(raw.model, raw.name);
  assert.equal(raw.digest, "omniroute:custom/gpt-example");
  assert.equal(grouped.name, "gpt-example__provider_custom");
  assert.equal(grouped.model, grouped.name);
  assert.equal(grouped.digest, `omniroute:${grouped.name}`);
  assert.deepEqual(grouped.details, raw.details);
  assert.equal(raw.details.family, "gpt-example");
  assert.equal(raw.details.parameter_size, "8192 ctx");
  assert.equal(raw.modified_at, "2026-01-01T00:00:00Z");
  assert.equal(raw.size, 0);
});

test("missing tag ids and context keep the existing fallback values", () => {
  const tag = toOllamaTagModel({}, "raw");
  assert.equal(tag.model, "unknown");
  assert.equal(tag.details.family, "omniroute");
  assert.equal(tag.details.parameter_size, "unknown");
  assert.equal("supports_reasoning_effort" in tag, false);
  assert.equal("configurationSchema" in tag.details, false);
});
