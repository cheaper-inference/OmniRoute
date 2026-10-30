import assert from "node:assert/strict";
import { test } from "node:test";
import { recordedSend } from "../../../src/app/(dashboard)/dashboard/grok-bot/transcript";

test("a user row whose client nonce matches the send is recorded", () => {
  assert.equal(recordedSend("m-1", { role: "user", clientNonce: "m-1" }), true);
});

test("a bot reply never records a send", () => {
  assert.equal(recordedSend("m-1", { role: "assistant", clientNonce: "m-1" }), false);
});

test("a different nonce stays unrecorded", () => {
  assert.equal(recordedSend("m-1", { role: "user", clientNonce: "m-2" }), false);
});
