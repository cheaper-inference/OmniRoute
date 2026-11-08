import test from "node:test";
import assert from "node:assert/strict";

const { cardAccepted } = await import(
  "../../../src/app/(dashboard)/dashboard/grok-bot/cards.ts"
);

test("a refusal is not an acceptance", () => {
  assert.equal(cardAccepted({ accepted: false }), false);
  assert.equal(cardAccepted({ dispatched: false }), false);
  assert.equal(cardAccepted({ error: "gone" }), false);
  assert.equal(cardAccepted({ refusal: { failureCode: "x" } }), false);
});

test("an accepted or silent answer is an acceptance", () => {
  assert.equal(cardAccepted(null), true);
  assert.equal(cardAccepted({}), true);
  assert.equal(cardAccepted({ accepted: true }), true);
  assert.equal(cardAccepted({ dispatched: true }), true);
});
