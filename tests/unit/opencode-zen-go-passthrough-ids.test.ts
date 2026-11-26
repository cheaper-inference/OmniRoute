import assert from "node:assert/strict";
import test from "node:test";

import { opencode_zenProvider } from "../../open-sse/config/providers/registry/opencode/zen/index.ts";
import { opencode_goProvider } from "../../open-sse/config/providers/registry/opencode/go/index.ts";
import { resolveOpencodeTargetFormat } from "../../open-sse/executors/opencode.ts";

// Ids the OpenCode Zen / Go upstreams serve that used to reach the router only
// through passthroughModels, with no registry row behind them.
const ZEN_IDS = [
  "gpt-6-astra",
  "gpt-5.5",
  "gpt-5.5-pro",
  "gpt-5.4-pro",
  "gpt-5.3-codex",
  "claude-fable-5-1",
  "claude-opus-4-8",
  "claude-opus-4-7",
  "claude-sonnet-4-6",
  "gemini-3.8-flash",
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "glm-5.3",
  "glm-5.3-flash",
];
const GO_IDS = ["glm-5.3", "glm-5.3-flash"];

// Wire format per id where the registry already records the upstream endpoint
// for that family on this host. The GPT, Claude and Gemini rows carry no
// targetFormat until the endpoint is measured with a live key.
const ZEN_FORMATS: Record<string, string> = {
  "glm-5.3": "openai",
  "glm-5.3-flash": "openai",
};
const GO_FORMATS: Record<string, string> = {
  "glm-5.3": "openai",
  "glm-5.3-flash": "openai",
};

function findModel(models: readonly { id: string }[], id: string) {
  return models.find((m) => m.id === id) as Record<string, unknown> | undefined;
}

test("opencode-zen declares every passthrough id", () => {
  const ids = new Set(opencode_zenProvider.models.map((m) => m.id));
  for (const id of ZEN_IDS) {
    assert.ok(ids.has(id), `opencode-zen must declare ${id}`);
  }
});

test("opencode-go declares glm-5.3 and glm-5.3-flash", () => {
  const ids = new Set(opencode_goProvider.models.map((m) => m.id));
  for (const id of GO_IDS) {
    assert.ok(ids.has(id), `opencode-go must declare ${id}`);
  }
});

test("opencode-zen ids resolve to the recorded wire format", () => {
  for (const [id, format] of Object.entries(ZEN_FORMATS)) {
    assert.equal(resolveOpencodeTargetFormat("opencode-zen", id), format, `${id} wire format`);
  }
});

test("opencode-go ids resolve to the recorded wire format", () => {
  for (const [id, format] of Object.entries(GO_FORMATS)) {
    assert.equal(resolveOpencodeTargetFormat("opencode-go", id), format, `${id} wire format`);
  }
});

test("GLM-5.3 rows carry the model's reasoning and vision flags on both tiers", () => {
  for (const models of [opencode_zenProvider.models, opencode_goProvider.models]) {
    const glm53 = findModel(models, "glm-5.3");
    const flash = findModel(models, "glm-5.3-flash");
    assert.equal(glm53?.supportsReasoning, true);
    assert.equal(glm53?.supportsVision, false);
    assert.equal(flash?.supportsReasoning, true);
    assert.equal(flash?.supportsVision, true);
  }
});

test("no duplicated ids in either registry", () => {
  for (const provider of [opencode_zenProvider, opencode_goProvider]) {
    const ids = provider.models.map((m) => m.id);
    assert.equal(new Set(ids).size, ids.length, `${provider.id} has duplicated ids`);
  }
});
