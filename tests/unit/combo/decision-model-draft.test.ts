import assert from "node:assert/strict";
import test from "node:test";
import {
  decisionDescriptionRows,
  isDecisionRouterStrategy,
  patchDecisionModelDraft,
  readDecisionModelDraft,
  setDecisionDescription,
  toDecisionPreviewModels,
} from "../../../src/lib/combos/decisionModelDraft.ts";

test("only the decision routers enable the decision section", () => {
  assert.equal(isDecisionRouterStrategy("decision-openai"), true);
  assert.equal(isDecisionRouterStrategy("decision-systemone"), true);
  assert.equal(isDecisionRouterStrategy("nadir"), false);
  assert.equal(isDecisionRouterStrategy(undefined), false);
});

test("drafts drop blank fields but keep typed text untrimmed", () => {
  assert.equal(patchDecisionModelDraft({}, { baseUrl: "  ", model: "", timeoutMs: 0 }), undefined);
  assert.deepEqual(
    patchDecisionModelDraft({ model: "router" }, { apiKey: "k", descriptions: { a: "Small, " } }),
    { model: "router", apiKey: "k", descriptions: { a: "Small, " } }
  );
  assert.deepEqual(readDecisionModelDraft({ decisionModel: { timeoutMs: "1500", model: 3 } }), {
    baseUrl: undefined,
    model: undefined,
    apiKey: undefined,
    timeoutMs: 1500,
    descriptions: undefined,
  });
});

test("clearing the last description removes the descriptions map", () => {
  const draft = { model: "router", descriptions: { cheap: "Fast" } };
  assert.deepEqual(setDecisionDescription(draft, "cheap", " "), { model: "router" });
  assert.deepEqual(setDecisionDescription(draft, "p/capable", "Strong"), {
    model: "router",
    descriptions: { cheap: "Fast", "p/capable": "Strong" },
  });
  assert.equal(setDecisionDescription({ descriptions: { cheap: "Fast" } }, "cheap", ""), undefined);
});

test("preview models keep plain steps and skip combo refs and wildcards", () => {
  assert.deepEqual(
    toDecisionPreviewModels([
      "openai/a",
      { model: " anthropic/b " },
      { kind: "model", model: "c/d" },
      { kind: "combo-ref", model: "other-combo" },
      { kind: "provider-wildcard", model: "openai/*" },
      { model: "" },
      null,
    ]),
    ["openai/a", "anthropic/b", "c/d"]
  );
});

test("rows list menu models first, then stored and pending custom keys once", () => {
  assert.deepEqual(
    decisionDescriptionRows(["cheap", "capable"], { "p/cheap": "x", cheap: "y" }, ["new", "cheap"]),
    [
      { key: "cheap", inMenu: true },
      { key: "capable", inMenu: true },
      { key: "p/cheap", inMenu: false },
      { key: "new", inMenu: false },
    ]
  );
});
