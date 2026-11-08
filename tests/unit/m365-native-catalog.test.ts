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
test("catalog capabilities expose emulated tools and image input without performance claims", () => {
  assert.equal(provider.toolCalling, "emulated");
  for (const model of provider.models) {
    assert.equal(model.toolCalling, true, model.id);
    assert.equal(model.supportsVision, true, model.id);
    assert.doesNotMatch(model.name, /BizChat|benchmark|\d+\/30|available to all/i);
  }
});

// Frozen public protocol catalog, including paid and historical aliases; not an account probe.
const DISPLAY_NAMES: Record<string, string> = {
  "copilot-m365": "Auto (Legacy)",
  "copilot-m365-claude-opus": "Claude Opus (Legacy)",
  "copilot-m365-gpt-5-6-reasoning": "GPT 5.6 Reasoning (Legacy)",
  "copilot-m365-gpt-5-5-chat": "GPT 5.5 Chat (Legacy)",
  "m365-copilot": "Auto (Default)",
  auto: "Auto",
  quick: "Quick",
  "think-deeper": "Think Deeper",
  claude: "Claude (Alias)",
  "claude-sonnet": "Claude Sonnet",
  "claude-sonnet-4.5": "Claude Sonnet 4.5 (Alias)",
  "claude-sonnet-4.6": "Claude Sonnet 4.6",
  "claude-sonnet-5.5": "Claude Sonnet 5.5",
  "claude-sonnet-5": "Claude Sonnet 5",
  "claude-sonnet-think-deeper": "Claude Sonnet Think Deeper",
  "claude-opus": "Claude Opus",
  "claude-opus-5": "Claude Opus 5 (Alias)",
  "claude-opus-5.5": "Claude Opus 5.5",
  "claude-opus-4.8": "Claude Opus 4.8",
  "claude-opus-4.5": "Claude Opus 4.5 (Alias)",
  "gpt-5.5": "GPT 5.5",
  "gpt-5.5-quick": "GPT 5.5 Quick",
  "gpt-5.5-think-deeper": "GPT 5.5 Think Deeper",
  "gpt-5.6": "GPT 5.6",
  "gpt-5.6-quick": "GPT 5.6 Quick",
  "gpt-5.6-think-deeper": "GPT 5.6 Think Deeper",
  "gpt-6-think-deeper": "GPT 6 Think Deeper",
  "gpt-6-sol": "GPT 6 Sol",
  "gpt-6.1-sol": "GPT 6.1 Sol",
  "gpt-5.4": "GPT 5.4",
  "gpt-5.4-think-deeper": "GPT 5.4 Think Deeper",
  "gpt-5.4-quick": "GPT 5.4 Quick",
  "gpt-5.3": "GPT 5.3",
  "gpt-5.3-quick": "GPT 5.3 Quick",
  "gpt-5.3-think-deeper": "GPT 5.3 Think Deeper",
  "gpt-5.2": "GPT 5.2",
  "gpt-5.2-quick": "GPT 5.2 Quick",
  "gpt-5.2-think-deeper": "GPT 5.2 Think Deeper",
};
test("every evidenced route has a concise, distinct model label without provider or entitlement boilerplate", () => {
  assert.deepEqual(
    Object.fromEntries(provider.models.map(({ id, name }) => [id, name])),
    DISPLAY_NAMES
  );
  assert.equal(new Set(provider.models.map(({ name }) => name)).size, provider.models.length);
  for (const { id, name } of provider.models) {
    assert.doesNotMatch(name, /Microsoft 365|Copilot|availability|account|entitlement/i, id);
    assert.doesNotMatch(name, /gpt-6-chat|opus-99|sonnet-5\.5\[1m\]/i, id);
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
