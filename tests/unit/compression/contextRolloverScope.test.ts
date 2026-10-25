import test from "node:test";
import assert from "node:assert/strict";

import { isContextRolloverTarget } from "../../../open-sse/services/compression/contextRollover/scope.ts";

const config = {
  enabled: true,
  excludedModelKeys: ["openai/gpt-4o"],
};

test("context rollover applies to every model except its explicit model exclusions", () => {
  assert.equal(isContextRolloverTarget(config, { provider: "openai", model: "gpt-4.1" }), true);
  assert.equal(isContextRolloverTarget(config, { provider: "openai", model: "gpt-4o" }), false);
});

test("context rollover exclusion keys are case- and whitespace-insensitive", () => {
  assert.equal(
    isContextRolloverTarget(
      { enabled: true, excludedModelKeys: ["  OpenAI/GPT-4o "] },
      { provider: "openai", model: "gpt-4o" }
    ),
    false
  );
});

test("disabled or missing context rollover never takes over context handling", () => {
  assert.equal(
    isContextRolloverTarget(
      { ...config, enabled: false },
      { provider: "openai", model: "gpt-4.1" }
    ),
    false
  );
  assert.equal(isContextRolloverTarget(undefined, { provider: "openai", model: "gpt-4.1" }), false);
});
