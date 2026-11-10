import test from "node:test";

import assert from "node:assert/strict";
import { M365TurnComposer } from "../../open-sse/executors/m365Protocol/composer.ts";
const update = (...args: unknown[]) => ({ type: 1, target: "update", arguments: args });
const message = (messageId: string, text: string, extra = {}) => ({
  author: "bot",
  messageId,
  text,
  ...extra,
});
const cursor = (id: string) => ({ j: `$['${id}'].adaptiveCards[0].body[0].text`, p: -1 });
test("all arguments compose distinct message snapshots and cursor deltas in first appearance order", () => {
  const c = new M365TurnComposer();
  assert.equal(
    c.push(
      update({ cursor: cursor("a"), messages: [message("a", "Hello")] }, { writeAtCursor: "!" })
    ).delta,
    "Hello!"
  );
  c.push(
    update(
      { cursor: cursor("b"), messages: [message("b", "Second")] },
      { writeAtCursor: " message" }
    )
  );
  assert.equal(c.text, "Hello!\n\nSecond message");
  c.push(update({ cursor: cursor("a") }, { writeAtCursor: " More" }));
  assert.equal(c.text, "Hello! More\n\nSecond message");
});
test("mixed progress and answer snapshots do not suppress answer or leak control cursor deltas", () => {
  const c = new M365TurnComposer();
  c.push(
    update(
      {
        cursor: cursor("p"),
        messages: [message("p", "secret", { messageType: "Progress" }), message("a", "Answer")],
      },
      { writeAtCursor: "hidden" }
    )
  );
  assert.equal(c.text, "Answer");
  c.push(update({ cursor: cursor("a") }, { writeAtCursor: "!" }));
  assert.equal(c.text, "Answer!");
  c.push(
    update({
      messages: [message("a", "Final"), message("meta", "no", { messageType: "Disengaged" })],
    })
  );
  assert.equal(c.text, "Final");
});
test("plain streaming never emits a rewrite as duplicate text; buffered text remains authoritative", () => {
  const c = new M365TurnComposer();
  let emitted = c.push(update({ messages: [message("a", "abc")] })).delta;
  emitted += c.push(update({ messages: [message("a", "xyz")] })).delta;
  emitted += c.push(update({ messages: [message("a", "xyz!")] })).delta;
  assert.equal(emitted, "abc");
  assert.equal(c.text, "xyz!");
  assert.equal(c.streamingDiverged, true);
});
test("final item snapshots are authoritative and result.message is status, not answer content", () => {
  const c = new M365TurnComposer();
  c.push(update({ messages: [message("a", "draft")] }));
  c.push({ type: 2, item: { messages: [message("a", "final")], result: { message: "status" } } });
  assert.equal(c.text, "final");
  const empty = new M365TurnComposer();
  empty.push({ type: 2, item: { result: { message: "fallback" } } });
  assert.equal(empty.text, "");
});
test("legacy anonymous snapshots and deltas work, malformed data and non-update arguments do not", () => {
  const c = new M365TurnComposer();
  c.push(update({ writeAtCursor: "Hi" }));
  c.push(update({ messages: [{ author: "bot", text: "Hi there" }] }));
  assert.equal(c.text, "Hi there");
  c.push({ type: 6, arguments: [{ writeAtCursor: "bad" }] });
  c.push(update(null, [], { messages: [null] }));
  assert.equal(c.text, "Hi there");
});
test("text and message count are bounded and overflows fail explicitly", () => {
  const c = new M365TurnComposer({ maxTextLength: 4, maxMessages: 1 });
  c.push(update({ messages: [message("a", "1234")] }));
  assert.throws(() => c.push(update({ writeAtCursor: "5" })), /limit/i);
  assert.equal(c.text, "1234");
  assert.throws(() => c.push(update({ messages: [message("b", "")] })), /limit/i);
  assert.throws(() => new M365TurnComposer({ maxTextLength: 0 }), /limit/i);
});

test("native bot messageType Chat carries answer snapshots and cursor deltas", () => {
  const c = new M365TurnComposer();
  c.push(
    update(
      { cursor: cursor("meta"), messages: [message("meta", "hidden", { messageType: "Chat" })] },
      { writeAtCursor: "leak" }
    )
  );
  assert.equal(c.text, "hiddenleak");
});

test("anonymous progress cannot poison later anonymous answer snapshots", () => {
  const c = new M365TurnComposer();
  c.push(update({ messages: [{ author: "bot", messageType: "Progress", text: "hidden" }] }));
  c.push(update({ messages: [{ author: "bot", text: "Answer" }] }));
  assert.equal(c.text, "Answer");
});
for (const shape of ["object", "array", "nested"] as const) {
  test(`final-only ${shape} composes useful bot messages, not status or progress`, () => {
    const c = new M365TurnComposer();
    const item = {
      messages: [
        message("user", "private", { author: "user", messageType: "Chat" }),
        message("a", "First", { messageType: "Chat" }),
        message("progress", "hidden", { messageType: "Progress" }),
        message("b", "Second"),
      ],
      result: { value: "Success", message: "Completed" },
    };
    const frame =
      shape === "nested"
        ? { type: 2, arguments: [{ item }] }
        : { type: 2, item: shape === "array" ? [item] : item };
    assert.equal(c.push(frame).delta, "First\n\nSecond");
    assert.equal(c.text, "First\n\nSecond");
  });
}
test("known progress and unknown control messages cannot leak later cursor deltas", () => {
  for (const extra of [
    { messageType: "Progress" },
    { messageType: "FutureControl" },
    { contentType: "SearchResults" },
    { contentType: "Code" },
    { contentType: "ToolCall" },
    { contentType: "EarlyProgress" },
  ]) {
    const c = new M365TurnComposer();
    c.push(update({ cursor: cursor("p"), messages: [message("p", "private", extra)] }));
    c.push(update({ writeAtCursor: "private tail" }));
    c.push(update({ messages: [message("p", "still private")] }));
    c.push(
      update({ cursor: cursor("a"), messages: [message("a", "Answer", { messageType: "Chat" })] })
    );
    assert.equal(c.text, "Answer");
  }
});
test("invalid explicit cursor does not redirect a delta into the anonymous answer", () => {
  const c = new M365TurnComposer();
  c.push(update({ cursor: { j: "invalid", p: -1 } }, { writeAtCursor: "hidden" }));
  assert.equal(c.text, "");
});

test("a cursor on a card body snapshots that card, not the message's preview token", () => {
  // Copilot can preview the first token in message.text while the cursor targets an empty
  // card body that writeAtCursor then fills: snapshotting the preview duplicated the token
  // ("cc0ffee") and turned the final snapshot into an unrecoverable stream rewrite.
  const composer = new M365TurnComposer();
  const message = {
    author: "bot",
    messageId: "reply",
    text: "c",
    adaptiveCards: [{ body: [{ text: "" }] }],
  };
  const updates = [
    { cursor: { j: "$['reply'].adaptiveCards[0].body[0].text", p: -1 }, messages: [message] },
    { writeAtCursor: "c0ffee" },
    { messages: [{ ...message, text: "c0ffee", adaptiveCards: [{ body: [{ text: "c0ffee" }] }] }] },
  ];
  let streamed = "";
  for (const argument of updates) {
    const update = composer.push({ type: 1, target: "update", arguments: [argument] });
    assert.equal(update.streamingDiverged, false);
    streamed += update.delta;
  }
  assert.equal(streamed, "c0ffee");
  assert.equal(composer.text, "c0ffee");
});

test("a card cursor for another message does not change this message's snapshot", () => {
  const composer = new M365TurnComposer();
  composer.push({
    type: 1,
    target: "update",
    arguments: [
      {
        cursor: { j: "$['other'].adaptiveCards[0].body[0].text", p: -1 },
        messages: [
          {
            author: "bot",
            messageId: "reply",
            text: "kept",
            adaptiveCards: [{ body: [{ text: "" }] }],
          },
        ],
      },
    ],
  });
  assert.equal(composer.text, "kept");
});
