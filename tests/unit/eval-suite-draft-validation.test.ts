/**
 * KEA-9388: a suite-builder case is valid without a model — the field is labelled optional,
 * the save schema marks it optional, and the runner has a fallback. The other required fields
 * are reported per field so the dialog can flag each one inline (KEA-9389).
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  hasSuiteDraftErrors,
  validateSuiteDraft,
} from "../../src/app/(dashboard)/dashboard/usage/components/evalSuiteDraft.ts";
import { evalSuiteSaveSchema } from "../../src/shared/validation/schemas/evals.ts";

const filledCase = {
  id: "draft-1",
  name: "greets",
  model: "",
  systemPrompt: "",
  userPrompt: "Say hello",
  expectedValue: "hello",
};

test("a case with an empty model has no errors", () => {
  const errors = validateSuiteDraft({ name: "QA-test-suite", cases: [filledCase] });
  assert.deepEqual(errors, { name: false, cases: {} });
  assert.equal(hasSuiteDraftErrors(errors), false);
});

test("the save schema accepts a case without `model` and refuses an empty one", () => {
  const body = (model?: string) => ({
    name: "QA-test-suite",
    cases: [
      {
        name: "greets",
        ...(model === undefined ? {} : { model }),
        input: { messages: [{ role: "user", content: "Say hello" }] },
        expected: { strategy: "contains", value: "hello" },
      },
    ],
  });
  assert.equal(evalSuiteSaveSchema.safeParse(body()).success, true);
  // Why the dialog omits the key instead of sending "": the schema is `min(1)` when present.
  assert.equal(evalSuiteSaveSchema.safeParse(body("")).success, false);
});

test("each missing required field is reported on its own, per case", () => {
  const errors = validateSuiteDraft({
    name: "   ",
    cases: [
      filledCase,
      { ...filledCase, id: "draft-2", name: " ", userPrompt: "", expectedValue: "" },
      { ...filledCase, id: "draft-3", userPrompt: "", systemPrompt: "Be brief" },
    ],
  });
  assert.equal(errors.name, true);
  assert.deepEqual(errors.cases, {
    "draft-2": { name: true, prompt: true, expectedValue: true },
  });
  assert.equal(hasSuiteDraftErrors(errors), true);
});
