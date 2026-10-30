import assert from "node:assert/strict";
import { test } from "node:test";
import { grokBotSendBody } from "../../../src/app/(dashboard)/dashboard/grok-bot/send";

test("a send carries an empty machine id and one message id", () => {
  const body = grokBotSendBody({
    agentId: "bot-1",
    text: "hello",
    messageId: "m-1",
    sentAtMs: "100",
  });
  assert.equal(body.machineId, "");
  assert.equal(body.messageId, "m-1");
  assert.equal(body.text, "hello");
});

test("a blank message is refused", () => {
  assert.equal(
    grokBotSendBody({ agentId: "bot-1", text: "  ", messageId: "m-1", sentAtMs: "100" }),
    null
  );
});
