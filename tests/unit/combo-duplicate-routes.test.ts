import assert from "node:assert/strict";
import test from "node:test";

import { buildDuplicateComboPayload } from "../../src/lib/combos/duplicatePayload.ts";

test("duplicating a combo preserves every capability route", () => {
  const routes = {
    chat: { strategy: "priority", models: ["openai/gpt-5"] },
    music: { strategy: "round-robin", models: ["elevenlabs/music_v1"] },
  };
  const payload = buildDuplicateComboPayload(
    {
      models: ["openai/gpt-5"],
      strategy: "priority",
      config: { timeoutMs: 123 },
      routes,
    },
    "multi-surface-copy",
    {}
  );

  assert.equal(payload.name, "multi-surface-copy");
  assert.equal(payload.routes, routes);
  assert.deepEqual(payload.config, {});
});

test("duplicating a legacy combo omits routes instead of sending null", () => {
  const payload = buildDuplicateComboPayload(
    { models: ["openai/gpt-5"], routes: null },
    "legacy-copy",
    {}
  );

  assert.equal("routes" in payload, false);
});
