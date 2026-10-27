import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildNativeDecisionBody,
  EMPTY_NATIVE_DECISION_DRAFT,
} from "../../src/app/(dashboard)/dashboard/endpoint/components/nativeDecisionDraft.ts";
import { JEV_SYSTEMONE_LIMITS } from "../../open-sse/config/systemOneRegistry.ts";

const base = {
  ...EMPTY_NATIVE_DECISION_DRAFT,
  model: "openrouter/vendor/native",
  state: "  Synthetic state.\n",
  instructions: "Is this synthetic?",
};
test("noul builder preserves exact context and named question", () => {
  assert.deepEqual(buildNativeDecisionBody(base), {
    model: base.model,
    state: base.state,
    questions: { result: { type: "noul", instructions: base.instructions } },
  });
});
test("builder rejects missing state, model, instructions and invalid names", () => {
  for (const patch of [
    { model: "" },
    { state: " " },
    { instructions: "" },
    { name: "bad.name" },
    { name: "__proto__" },
  ])
    assert.equal(buildNativeDecisionBody({ ...base, ...patch }), null);
});
test("builder rejects unknown modes and excessive state locally", () => {
  assert.equal(buildNativeDecisionBody({ ...base, mode: "chat" as "choice" }), null);
  assert.equal(buildNativeDecisionBody({ ...base, state: "a".repeat(262145) }), null);
});
test("choice builder checks exact distinct names and descriptive options", () => {
  assert.deepEqual(
    buildNativeDecisionBody({ ...base, mode: "choice", criteria: "red:Red: visible\nblue:Blue" }),
    {
      model: base.model,
      state: base.state,
      questions: {
        result: {
          type: "choice",
          instructions: base.instructions,
          criteria: { red: "Red: visible", blue: "Blue" },
        },
      },
    }
  );
  for (const criteria of ["red", ": description", "red:", "red:one\nred:two", "red:one\n"]) {
    const result = buildNativeDecisionBody({ ...base, mode: "choice", criteria });
    if (criteria.endsWith("\n")) assert.notEqual(result, null);
    else assert.equal(result, null);
  }
});
test("choice accepts255 and rejects256 options", () => {
  const criteria = Array.from(
    { length: 255 },
    (_, index) => `option${index}:Synthetic option`
  ).join("\n");
  assert.notEqual(buildNativeDecisionBody({ ...base, mode: "choice", criteria }), null);
  assert.equal(
    buildNativeDecisionBody({ ...base, mode: "choice", criteria: `${criteria}\nextra:Extra` }),
    null
  );
});
test("score builder accepts two through ten ordered levels and rejects empty or excessive levels", () => {
  assert.deepEqual(
    (
      buildNativeDecisionBody({ ...base, mode: "score", levels: "Empty\nFull" })
        ?.questions as Record<string, Record<string, unknown>>
    ).result.criteria,
    ["Empty", "Full"]
  );
  assert.notEqual(
    buildNativeDecisionBody({
      ...base,
      mode: "score",
      levels: Array.from({ length: 10 }, (_, i) => `Level${i}`).join("\n"),
    }),
    null
  );
  for (const levels of [
    "One",
    "One\n\nThree",
    Array.from({ length: 11 }, (_, i) => `Level${i}`).join("\n"),
  ])
    assert.equal(buildNativeDecisionBody({ ...base, mode: "score", levels }), null);
});

test("declared provider bounds allow a one-level score without changing unknown defaults", () => {
  const draft = { ...base, mode: "score" as const, levels: "Only level" };
  assert.equal(buildNativeDecisionBody(draft), null);
  assert.notEqual(
    buildNativeDecisionBody(draft, { ...JEV_SYSTEMONE_LIMITS, minScoreLevels: 1 }),
    null
  );
});
test("declared provider choice and byte limits are applied before request dispatch", () => {
  const criteria = Array.from({ length: 53 }, (_, i) => `option${i}:Synthetic`).join("\n");
  assert.equal(
    buildNativeDecisionBody(
      { ...base, mode: "choice", criteria },
      { ...JEV_SYSTEMONE_LIMITS, minCriteria: 2, maxChoiceCriteria: 52 }
    ),
    null
  );
  assert.equal(buildNativeDecisionBody(base, { ...JEV_SYSTEMONE_LIMITS, maxBodyBytes: 10 }), null);
});
