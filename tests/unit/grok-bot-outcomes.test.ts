import test from "node:test";
import assert from "node:assert/strict";

import {
  grokBotCardOutcome,
  grokBotErrorStatus,
  grokBotSendOutcome,
  grokBotSendReply,
} from "../../open-sse/utils/grokBotOutcomes.ts";

test("send acceptance requires an accepted delivery, not HTTP success alone", () => {
  for (const delivery of [
    1,
    2,
    3,
    "GROK_BOT_USER_MESSAGE_DELIVERY_ACCEPTED_BOX",
    "GROK_BOT_USER_MESSAGE_DELIVERY_ACCEPTED_TEMPORAL",
    "GROK_BOT_USER_MESSAGE_DELIVERY_DUPLICATE",
  ]) {
    assert.equal(grokBotSendOutcome({ delivery }), "accepted");
  }
  assert.equal(grokBotSendOutcome({ dispatched: true }), "accepted");
});

test("a refused send stays refused even with a refusal detail", () => {
  for (const answer of [
    { delivery: "GROK_BOT_USER_MESSAGE_DELIVERY_REFUSED" },
    { delivery: 4 },
    { delivery: 1, refusal: { failureCode: "send/refused" } },
    { refusal: { failureCode: "send/refused" } },
  ]) {
    assert.equal(grokBotSendOutcome(answer), "refused");
  }
});

test("an unknown send result is never promoted to submitted", () => {
  for (const answer of [
    null,
    {},
    { delivery: "GROK_BOT_USER_MESSAGE_DELIVERY_UNKNOWN_DURABILITY" },
    { delivery: "GROK_BOT_USER_MESSAGE_DELIVERY_UNKNOWN_DURABILITY", dispatched: true },
    { delivery: 0 },
    { dispatched: false },
  ]) {
    assert.equal(grokBotSendOutcome(answer), "unknown");
  }
});

test("card answers distinguish accepted, refused, and uncertain", () => {
  assert.equal(grokBotCardOutcome(null), "accepted");
  assert.equal(grokBotCardOutcome({}), "accepted");
  assert.equal(grokBotCardOutcome({ accepted: true }), "accepted");
  assert.equal(grokBotCardOutcome({ dispatched: true }), "accepted");
  assert.equal(grokBotCardOutcome({}, { allowEmpty: false }), "unknown");
  assert.equal(grokBotCardOutcome({ accepted: true }, { allowEmpty: false }), "accepted");
  for (const answer of [
    { accepted: false },
    { dispatched: false },
    { accepted: true, refusal: { failureCode: "card/stale" } },
    { error: "failed" },
    { code: "stale" },
    { status: "failed" },
    { message: "stale" },
  ]) {
    assert.equal(grokBotCardOutcome(answer), "refused");
  }
  for (const answer of [{ unexpected: "shape" }, null, {}]) {
    assert.equal(grokBotCardOutcome(answer, { allowEmpty: false }), "unknown");
  }
});

test("error status is read only from object-shaped errors", () => {
  assert.equal(grokBotErrorStatus(null), undefined);
  assert.equal(grokBotErrorStatus("boom"), undefined);
  assert.equal(grokBotErrorStatus(401), undefined);
  assert.equal(grokBotErrorStatus({ status: 401 }), 401);
  assert.equal(grokBotErrorStatus({ status: "401" }), undefined);
});

test("a refused delivery is not reported as submitted", () => {
  const reply = grokBotSendReply({
    delivery: "GROK_BOT_USER_MESSAGE_DELIVERY_REFUSED",
    refusal: { failureCode: "send/agent-unavailable", message: "the agent is offline" },
  });
  assert.equal(reply.status, "refused");
  assert.equal(reply.httpStatus, 502);
  assert.equal(reply.failureCode, "send/agent-unavailable");
});

test("an accepted delivery is submitted", () => {
  const reply = grokBotSendReply({ delivery: "GROK_BOT_USER_MESSAGE_DELIVERY_ACCEPTED_BOX" });
  assert.equal(reply.status, "submitted");
  assert.equal(reply.httpStatus, 200);
});

test("an answer we cannot classify is unknown rather than submitted", () => {
  const reply = grokBotSendReply({ delivery: "SOMETHING_UNMAPPED" });
  assert.equal(reply.status, "unknown");
  assert.equal(reply.httpStatus, 502);
});
