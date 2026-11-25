/**
 * KEA-9388: a suite-builder case is valid without a model — the field is labelled optional,
 * the save schema marks it optional, and the runner has a fallback. The other required fields
 * are reported per field so the dialog can flag each one inline (KEA-9389).
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  hasSuiteDraftErrors,
  lengthOverLimit,
  suiteDraftExceedsLimits,
  validateSuiteDraft,
} from "../../src/app/(dashboard)/dashboard/usage/components/evalSuiteDraft.ts";
import { evalSuiteSaveSchema } from "../../src/shared/validation/schemas/evals.ts";
import {
  EVAL_CASE_NAME_MAX_LENGTH,
  EVAL_SUITE_DESCRIPTION_MAX_LENGTH,
  EVAL_SUITE_NAME_MAX_LENGTH,
} from "../../src/shared/constants/formLimits.ts";

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

// KEA-9519: the dialog and the save route share the limits in formLimits.ts.
const saveBody = (overrides: { name?: string; description?: string; caseName?: string }) => ({
  name: overrides.name ?? "QA-test-suite",
  ...(overrides.description === undefined ? {} : { description: overrides.description }),
  cases: [
    {
      name: overrides.caseName ?? "greets",
      input: { messages: [{ role: "user", content: "Say hello" }] },
      expected: { strategy: "contains", value: "hello" },
    },
  ],
});

test("the save schema caps name, description and case name at the shared limits", () => {
  const accepts = (body: object) => evalSuiteSaveSchema.safeParse(body).success;
  assert.equal(accepts(saveBody({ name: "n".repeat(EVAL_SUITE_NAME_MAX_LENGTH) })), true);
  assert.equal(accepts(saveBody({ name: "n".repeat(EVAL_SUITE_NAME_MAX_LENGTH + 1) })), false);
  assert.equal(
    accepts(saveBody({ description: "d".repeat(EVAL_SUITE_DESCRIPTION_MAX_LENGTH) })),
    true
  );
  assert.equal(
    accepts(saveBody({ description: "d".repeat(EVAL_SUITE_DESCRIPTION_MAX_LENGTH + 1) })),
    false
  );
  assert.equal(accepts(saveBody({ caseName: "c".repeat(EVAL_CASE_NAME_MAX_LENGTH) })), true);
  assert.equal(accepts(saveBody({ caseName: "c".repeat(EVAL_CASE_NAME_MAX_LENGTH + 1) })), false);
});

test("lengthOverLimit measures the trimmed value, like the save schema", () => {
  assert.equal(lengthOverLimit(`  ${"n".repeat(200)}  `, 200), null);
  assert.equal(lengthOverLimit("n".repeat(201), 200), 201);
});

test("suiteDraftExceedsLimits flags a draft with any field over its limit", () => {
  const draft = { name: "QA-test-suite", description: "", cases: [filledCase] };
  assert.equal(suiteDraftExceedsLimits(draft), false);
  assert.equal(
    suiteDraftExceedsLimits({ ...draft, name: "n".repeat(EVAL_SUITE_NAME_MAX_LENGTH + 1) }),
    true
  );
  assert.equal(
    suiteDraftExceedsLimits({
      ...draft,
      description: "d".repeat(EVAL_SUITE_DESCRIPTION_MAX_LENGTH + 1),
    }),
    true
  );
  assert.equal(
    suiteDraftExceedsLimits({
      ...draft,
      cases: [
        filledCase,
        { ...filledCase, id: "d2", name: "c".repeat(EVAL_CASE_NAME_MAX_LENGTH + 1) },
      ],
    }),
    true
  );
});
