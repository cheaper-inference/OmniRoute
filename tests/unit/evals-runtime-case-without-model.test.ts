/**
 * KEA-9388: why the suite builder's "Model (optional)" can really be optional — the runner
 * resolves a model for a case that names none. A run aimed at a model or combo uses that
 * target; a run on "Suite defaults" uses the case's model and, without one, the default the
 * builder names in the field's hint (EVAL_DEFAULT_CASE_MODEL).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildEvalCaseRequest } from "../../src/lib/evals/runtime.ts";
import { EVAL_DEFAULT_CASE_MODEL } from "../../src/shared/constants/evals.ts";

const input = { messages: [{ role: "user", content: "Say hello" }] };

async function modelSentFor(
  evalCase: Record<string, unknown>,
  target: { type: "suite-default" | "model" | "combo"; id?: string | null }
) {
  const body = await buildEvalCaseRequest(evalCase, target, null).json();
  return body.model;
}

test("a case without a model runs on the default when the run targets Suite defaults", async () => {
  assert.equal(EVAL_DEFAULT_CASE_MODEL, "gpt-4o");
  assert.equal(await modelSentFor({ input }, { type: "suite-default" }), EVAL_DEFAULT_CASE_MODEL);
  assert.equal(
    await modelSentFor({ input, model: "  " }, { type: "suite-default" }),
    EVAL_DEFAULT_CASE_MODEL
  );
});

test("a case without a model runs on the run's model or combo target", async () => {
  assert.equal(
    await modelSentFor({ input }, { type: "model", id: "claude-sonnet-4-20250514" }),
    "claude-sonnet-4-20250514"
  );
  assert.equal(await modelSentFor({ input }, { type: "combo", id: "my-combo" }), "my-combo");
});

test("a case's own model is used on Suite defaults", async () => {
  assert.equal(
    await modelSentFor({ input, model: "gpt-4o-mini" }, { type: "suite-default" }),
    "gpt-4o-mini"
  );
});
