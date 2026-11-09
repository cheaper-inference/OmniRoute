import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

// A client that sends previous_response_id AND the history it already carries made the
// handler append the stored history a second time, so the upstream saw every turn twice.
// The stored items must be skipped only when the request already starts with them, matched
// by content, and the matching region carries an id (equal text alone proves nothing: a user
// may legitimately repeat a sentence).
process.env.ENABLE_REQUEST_LOGS = "true";
const harness = await createChatPipelineHarness("chat-prev-resp-carried-prefix");
const { buildRequest, handleChat, resetStorage, seedApiKey, seedConnection } = harness;
const { seedPendingContinuationState, clearPendingContinuationState } =
  await import("../../src/lib/db/responsesContinuationStore.ts");

const RESPONSE_ID = "resp_carried_prefix";
const user = (text: string) => ({ type: "message", role: "user", content: text });
const answer = { type: "message", id: "msg_answer", role: "assistant", content: "stored answer" };
const stored = { input: [user("stored question")], output: [answer] };

test.beforeEach(async () => {
  await resetStorage();
});
test.after(async () => {
  delete process.env.ENABLE_REQUEST_LOGS;
  clearPendingContinuationState(RESPONSE_ID);
  await harness.cleanup();
});

/** Send a continuation and return the user/assistant texts the upstream received, in order. */
async function upstreamTexts(input: unknown[]) {
  const key = await seedApiKey();
  await seedConnection("openai");
  seedPendingContinuationState(
    RESPONSE_ID,
    key.id,
    {
      clientRawRequest: { effectiveInput: stored.input },
      clientResponse: { output: stored.output },
    },
    false
  );
  let upstream: { messages?: Array<{ content: unknown }> } = {};
  globalThis.fetch = async (_url, init) => {
    upstream = JSON.parse(String(init?.body));
    return harness.buildOpenAIResponse("done");
  };
  const response = await handleChat(
    buildRequest({
      url: "http://localhost/v1/responses",
      authKey: key.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        previous_response_id: RESPONSE_ID,
        input,
      },
    })
  );
  assert.equal(response.status, 200, await response.clone().text());
  return (upstream.messages ?? []).map((message) =>
    typeof message.content === "string" ? message.content : JSON.stringify(message.content)
  );
}

test("a request that carries the stored history is not given it twice", async () => {
  const texts = await upstreamTexts([...stored.input, ...stored.output, user("new question")]);
  assert.equal(texts.filter((text) => text.includes("stored question")).length, 1);
  assert.equal(texts.filter((text) => text.includes("stored answer")).length, 1);
  assert.ok(texts.at(-1)?.includes("new question"));
});

test("a plain delta still gets the stored history in front", async () => {
  const texts = await upstreamTexts([user("new question")]);
  assert.equal(texts.filter((text) => text.includes("stored question")).length, 1);
  assert.equal(texts.filter((text) => text.includes("stored answer")).length, 1);
  assert.ok(texts.at(-1)?.includes("new question"));
});

test("a repeated sentence in the delta is not mistaken for the carried history", async () => {
  // The delta repeats the stored question word for word but does not carry the stored answer
  // (the id-bearing output), so it is a new turn and the stored history must still be added.
  const texts = await upstreamTexts([user("stored question")]);
  assert.equal(texts.filter((text) => text.includes("stored question")).length, 2);
  assert.equal(texts.filter((text) => text.includes("stored answer")).length, 1);
});

test("carried items that differ in content are not treated as the stored history", async () => {
  const edited = { ...answer, content: "edited answer" };
  const texts = await upstreamTexts([...stored.input, edited, user("new question")]);
  assert.equal(texts.filter((text) => text.includes("stored answer")).length, 1);
  assert.equal(texts.filter((text) => text.includes("edited answer")).length, 1);
});
