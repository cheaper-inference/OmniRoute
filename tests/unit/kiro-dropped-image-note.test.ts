import test from "node:test";
import assert from "node:assert/strict";

const { buildKiroPayload } = await import("../../open-sse/translator/request/openai-to-kiro.ts");

type Current = { userInputMessage: { content: string; images?: unknown[] } };

function current(model: string, content: unknown): Current["userInputMessage"] {
  const result = buildKiroPayload(
    model,
    { messages: [{ role: "user", content }] },
    false,
    null
  ) as {
    conversationState: { currentMessage: Current };
  };
  return result.conversationState.currentMessage.userInputMessage;
}

const png = "data:image/png;base64,QUJD";

test("a remote image URL leaves a visible note and the text stays", () => {
  const message = current("claude-sonnet-4.5", [
    { type: "text", text: "see" },
    { type: "image_url", image_url: { url: "https://example.com/a.png" } },
  ]);
  assert.match(message.content, /see/);
  assert.match(message.content, /\[1 image omitted/);
  assert.equal(message.images, undefined);
});

test("an inline data image on a Claude model is attached and adds no note", () => {
  const message = current("claude-sonnet-4.5", [
    { type: "text", text: "see" },
    { type: "image_url", image_url: { url: png } },
  ]);
  assert.equal(message.images?.length, 1);
  assert.doesNotMatch(message.content, /omitted/);
});

test("images for a model without image support leave a note", () => {
  const message = current("deepseek-v3", [
    { type: "text", text: "see" },
    { type: "image_url", image_url: { url: png } },
    { type: "image_url", image_url: { url: "https://example.com/b.png" } },
  ]);
  assert.match(message.content, /\[2 images omitted/);
  assert.equal(message.images, undefined);
});

test("a message with only a dropped image still carries the note", () => {
  const message = current("claude-sonnet-4.5", [
    { type: "image_url", image_url: { url: "https://example.com/c.png" } },
  ]);
  assert.match(message.content, /\[1 image omitted/);
});

test("a text-only message is unchanged", () => {
  const message = current("claude-sonnet-4.5", [{ type: "text", text: "hello" }]);
  assert.doesNotMatch(message.content, /omitted/);
  assert.match(message.content, /hello/);
});
