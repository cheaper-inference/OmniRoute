import test from "node:test";
import assert from "node:assert/strict";

import { enforceThinkingTemperature } from "../../open-sse/services/claudeCodeConstraints.ts";

// #18636: the thinking-temperature normalization must not (re)introduce `temperature`
// after an operator param filter or built-in strip rule removed it — pin only when the
// body already carries a temperature; an unset body must stay unset (Anthropic's
// "unset" branch).
test("#18636: thinking on + no temperature in body -> nothing injected", () => {
  const body: Record<string, unknown> = { thinking: { type: "enabled", budget_tokens: 1024 } };
  enforceThinkingTemperature(body);
  assert.equal("temperature" in body, false);
  assert.equal("top_p" in body, false);
});

test("#18636: thinking on + temperature present -> still normalized to 1", () => {
  const body: Record<string, unknown> = {
    thinking: { type: "adaptive" },
    temperature: 0.7,
    top_p: 0.9,
  };
  enforceThinkingTemperature(body);
  assert.equal(body.temperature, 1);
  assert.equal("top_p" in body, false);
});

test("#18636: thinking on + temperature absent but top_p present -> still converted to pinned branch (established behavior)", () => {
  const body: Record<string, unknown> = { thinking: { type: "enabled" }, top_p: 0.9 };
  enforceThinkingTemperature(body);
  assert.equal(body.temperature, 1, "lone top_p under thinking converts to the pinned branch");
  assert.equal("top_p" in body, false);
});

test("#18636: thinking off -> untouched (existing behavior)", () => {
  const body: Record<string, unknown> = { temperature: 0.3, top_p: 0.5 };
  enforceThinkingTemperature(body);
  assert.equal(body.temperature, 0.3);
  assert.equal(body.top_p, 0.5);
});
