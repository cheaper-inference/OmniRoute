import assert from "node:assert/strict";
import { test } from "node:test";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import {
  getAntigravityConversationSessionId,
  getAntigravitySessionId,
} from "../../open-sse/services/antigravityIdentity.ts";

const alice = { accessToken: "token-a", projectId: "project-a", email: "alice@example.com" };
const bob = { accessToken: "token-b", projectId: "project-b", email: "bob@example.com" };

function envelopeSessionId(credentials: typeof alice, conversationKey?: string | null): string {
  const body = { model: "gemini-4-carbon-medium", messages: [{ role: "user", content: "hi" }] };
  const out = translateRequest(
    FORMATS.OPENAI,
    FORMATS.ANTIGRAVITY,
    "gemini-4-carbon-medium",
    body,
    true,
    credentials,
    "antigravity",
    null,
    conversationKey ? { antigravitySessionKey: conversationKey } : undefined
  ) as { request: { sessionId: string } };
  return out.request.sessionId;
}

test("parallel conversations on one account get distinct upstream sessions", () => {
  const a = envelopeSessionId(alice, "conv_a");
  const b = envelopeSessionId(alice, "conv_b");
  assert.notEqual(a, b, "two parallel tasks must not share one Cloud Code session cache");
});

test("one conversation keeps the same upstream session across turns", () => {
  assert.equal(envelopeSessionId(alice, "conv_a"), envelopeSessionId(alice, "conv_a"));
});

test("the same conversation on two accounts gets two sessions", () => {
  assert.notEqual(envelopeSessionId(alice, "conv_a"), envelopeSessionId(bob, "conv_a"));
});

test("without a conversation key the account-derived session is unchanged", () => {
  assert.equal(envelopeSessionId(alice), getAntigravitySessionId(alice));
  assert.equal(getAntigravityConversationSessionId(alice, null), getAntigravitySessionId(alice));
});
