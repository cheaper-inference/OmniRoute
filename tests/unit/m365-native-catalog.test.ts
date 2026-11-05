import test from "node:test";
import assert from "node:assert/strict";
import { copilot_m365_webProvider as provider } from "../../open-sse/config/providers/registry/copilot-m365-web/index.ts";
import { WEB_COOKIE_PROVIDERS } from "../../src/shared/constants/providers/web-cookie.ts";

const DOCUMENTED_IDS = [
  "m365-copilot",
  "auto",
  "quick",
  "think-deeper",
  "claude",
  "claude-sonnet",
  "claude-sonnet-4.5",
  "claude-sonnet-4.6",
  "claude-sonnet-5.5",
  "claude-sonnet-5",
  "claude-sonnet-think-deeper",
  "claude-opus",
  "claude-opus-5",
  "claude-opus-5.5",
  "claude-opus-4.8",
  "claude-opus-4.5",
  "gpt-5.5",
  "gpt-5.5-quick",
  "gpt-5.5-think-deeper",
  "gpt-5.6",
  "gpt-5.6-quick",
  "gpt-5.6-think-deeper",
  "gpt-6-think-deeper",
  "gpt-6-sol",
  "gpt-6.1-sol",
  "gpt-5.4",
  "gpt-5.4-think-deeper",
  "gpt-5.4-quick",
  "gpt-5.3",
  "gpt-5.3-quick",
  "gpt-5.3-think-deeper",
  "gpt-5.2",
  "gpt-5.2-quick",
  "gpt-5.2-think-deeper",
];
test("native catalog registers only documented IDs and pre-existing native IDs without duplicates", () => {
  assert.equal(provider.id, "copilot-m365-web");
  assert.equal(provider.executor, "copilot-m365-web");
  const ids = provider.models.map((model) => model.id);
  assert.equal(ids[0], "copilot-m365");
  for (const id of [
    ...DOCUMENTED_IDS,

    "copilot-m365",
    "copilot-m365-claude-opus",
    "copilot-m365-gpt-5-6-reasoning",
    "copilot-m365-gpt-5-5-chat",
  ]) {
    assert.ok(ids.includes(id), id);
  }
  assert.equal(ids.length, new Set(ids).size);
  assert.equal(ids.length, DOCUMENTED_IDS.length + 4);
  assert.equal(provider.modelsUrl, undefined, "native WS has no remote models endpoint");
});
test("catalog capabilities expose emulated tools without unsupported vision or performance claims", () => {
  assert.equal(provider.toolCalling, "emulated");
  for (const model of provider.models) {
    assert.equal(model.toolCalling, true, model.id);
    assert.equal(model.supportsVision, false, model.id);
    assert.doesNotMatch(model.name, /BizChat|benchmark|\d+\/30|available to all/i);
  }
});
test("native provider copy describes sign-in and legacy HAR, not unrelated device-code advice", () => {
  const ui = WEB_COOKIE_PROVIDERS["copilot-m365-web"];
  assert.equal(ui.name, "Microsoft 365 Copilot");
  assert.equal(ui.toolCalling, "emulated");
  assert.match(ui.authHint, /sign.in/i);
  assert.match(ui.authHint, /HAR/);
  assert.doesNotMatch(ui.authHint, /device.code|any Microsoft|BizChat/i);
});
