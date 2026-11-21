/**
 * Decision routing, step 9 (library): the combo-builder preview. Without a prompt it only
 * builds the menu and the generated descriptions (no decider, no credential, no fetch).
 * With a prompt it runs one decision, behind the same COMBO_DECISION_ROUTER_ENABLED flag.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { buildDecisionPreview } from "../../../src/lib/combos/decisionPreview.ts";
import type { Decider } from "../../../open-sse/services/decision/types.ts";

const pricing = async (_provider: string, model: string) =>
  model === "gpt-4o-mini" ? { input: 1, output: 1 } : { input: 10, output: 10 };
const models = ["openai/gpt-4o-mini", "openai/gpt-4o", "openai/gpt-4o-mini"];

function spy(result: Awaited<ReturnType<Decider>>) {
  let created = 0;
  return {
    created: () => created,
    createDecider: () => {
      created += 1;
      return (async () => result) as Decider;
    },
  };
}

test("without a prompt: menu + generated descriptions, no decider", async () => {
  const s = spy({ ok: false, reason: "timeout" });
  const result = await buildDecisionPreview(
    { models, decision: { decider: "systemone" } },
    { getPricing: pricing, isEnabled: () => true, createDecider: s.createDecider }
  );
  assert.deepEqual(result.menu, ["gpt-4o-mini", "gpt-4o"]);
  assert.match(result.generated["gpt-4o-mini"], /cost rank 1 of 2/);
  assert.equal(result.test, undefined);
  assert.equal(s.created(), 0);
});

test("with a prompt and the flag off: skipped (disabled), no decider", async () => {
  const s = spy({ ok: false, reason: "timeout" });
  const result = await buildDecisionPreview(
    { models, decision: { decider: "systemone" }, prompt: "hello" },
    { getPricing: pricing, isEnabled: () => false, createDecider: s.createDecider }
  );
  assert.deepEqual(result.test, { status: "skipped", reason: "disabled" });
  assert.equal(s.created(), 0);
});

test("with a prompt: selected answer, failure reason, and the live-only combo-model", async () => {
  const selected = await buildDecisionPreview(
    { models, decision: { decider: "systemone" }, prompt: "hello" },
    {
      getPricing: pricing,
      isEnabled: () => true,
      createDecider: spy({
        ok: true,
        choice: "gpt-4o",
        confidence: 0.7,
        probabilities: { "gpt-4o": 0.7 },
        backendModel: "jev-1",
        latencyMs: 12,
      }).createDecider,
    }
  );
  assert.equal(selected.test?.status, "selected");
  assert.equal(selected.test?.choice, "gpt-4o");
  assert.equal(selected.test?.confidence, 0.7);

  const failed = await buildDecisionPreview(
    { models, decision: { decider: "systemone" }, prompt: "hello" },
    {
      getPricing: pricing,
      isEnabled: () => true,
      createDecider: spy({ ok: false, reason: "http_error", status: 401 }).createDecider,
    }
  );
  assert.deepEqual(failed.test, { status: "failed", reason: "http_error", httpStatus: 401 });

  const s = spy({ ok: false, reason: "timeout" });
  const comboModel = await buildDecisionPreview(
    { models, decision: { decider: "combo-model", model: "openai/gpt-4o-mini" }, prompt: "hi" },
    { getPricing: pricing, isEnabled: () => true, createDecider: s.createDecider }
  );
  assert.deepEqual(comboModel.test, { status: "skipped", reason: "live_request_only" });
  assert.equal(s.created(), 0);

  const missing = await buildDecisionPreview(
    { models, prompt: "hi" },
    { getPricing: pricing, isEnabled: () => true, createDecider: s.createDecider }
  );
  assert.deepEqual(missing.test, { status: "skipped", reason: "not_configured" });
});
