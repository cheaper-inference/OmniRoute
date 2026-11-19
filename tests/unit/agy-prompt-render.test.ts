// The prompt the agy ACP transport sends: what the model sees on a first turn,
// what it sees on a continued one, and the budget both must respect.
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  antigravityBodyToMessages,
  clipMiddle,
  hasPrefix,
  historyKey,
  maxInitialPromptBytes,
  promptTextBytes,
  renderContinuedTurnParts,
  renderInitialPromptParts,
  trailingMessages,
  utf8Bytes,
  utf8Prefix,
  type AgyMessage,
} from "../../open-sse/services/agyPromptRender.ts";

const text = (value: string) => ({ type: "text" as const, text: value });
const user = (value: string): AgyMessage => ({ role: "user", parts: [text(value)] });
const assistant = (value: string): AgyMessage => ({ role: "assistant", parts: [text(value)] });

/** The text of a rendered prompt, for the assertions that care about wording. */
const joined = (parts: ReturnType<typeof renderInitialPromptParts>): string =>
  parts.map((part) => (part.type === "text" ? part.text : `[image ${part.mimeType}]`)).join("");

describe("utf8 accounting", () => {
  it("counts bytes, not characters", () => {
    assert.equal(utf8Bytes("abc"), 3);
    assert.equal(utf8Bytes("漢"), 3);
    assert.equal(utf8Bytes("🎉"), 4);
    assert.equal(utf8Bytes(""), 0);
  });

  it("never splits a multi-byte character", () => {
    // "漢" is 3 bytes: asking for 1 or 2 bytes yields nothing rather than a
    // replacement character, because a partial code point is not text.
    assert.equal(utf8Prefix("漢字", 1), "");
    assert.equal(utf8Prefix("漢字", 2), "");
    assert.equal(utf8Prefix("漢字", 3), "漢");
    assert.equal(utf8Prefix("a漢", 2), "a");
    assert.equal(utf8Prefix("a漢", 4), "a漢");
    assert.equal(utf8Prefix("abc", 0), "");
    assert.equal(utf8Prefix("abc", 99), "abc");
  });

  it("sums text parts only, so an image costs no prompt text", () => {
    assert.equal(
      promptTextBytes([text("abcd"), { type: "image", mimeType: "image/png", data: "AA" }]),
      4
    );
    assert.equal(promptTextBytes([]), 0);
  });
});

describe("clipMiddle", () => {
  it("leaves text within the limit untouched", () => {
    assert.equal(clipMiddle("short", 100), "short");
    assert.equal(clipMiddle("", 0), "");
  });

  it("keeps both ends and says how much went missing", () => {
    const text = "A".repeat(4000) + "B".repeat(4000);
    const clipped = clipMiddle(text, 200);
    assert.ok(utf8Bytes(clipped) <= 200, `clipped to ${utf8Bytes(clipped)} bytes`);
    assert.ok(clipped.startsWith("A"), "keeps the head");
    assert.ok(clipped.endsWith("B"), "keeps the tail");
    assert.match(clipped, /\[\.\.\. \d+ bytes omitted \.\.\.\]/);
  });

  it("reports the bytes it actually dropped", () => {
    const text = "x".repeat(1000);
    const clipped = clipMiddle(text, 100);
    const reported = Number(/\[\.\.\. (\d+) bytes omitted \.\.\.\]/.exec(clipped)?.[1]);
    const kept = utf8Bytes(clipped) - utf8Bytes(`\n[... ${reported} bytes omitted ...]\n`);
    assert.equal(reported, utf8Bytes(text) - kept);
  });

  it("keeps the tail even when the head has to give way", () => {
    // The end of a long paste is where the question is. A head-only cut returns
    // the preamble and drops the question, so the tail is what must survive.
    const text = "a".repeat(150 * 1024) + "\nQUESTION: which of these is wrong?\n";
    const clipped = clipMiddle(text, 190 * 1024);
    assert.ok(clipped.endsWith("\nQUESTION: which of these is wrong?\n"), "the tail is intact");
    assert.ok(clipped.startsWith("a"), "and the head is still there");
  });

  it("stays inside the limit for an oversized single input", () => {
    const text = "x".repeat(190 * 1024 + 1);
    const limit = 190 * 1024;
    assert.ok(utf8Bytes(clipMiddle(text, limit)) <= limit);
  });

  it("degrades to a prefix when the limit cannot hold the marker", () => {
    assert.equal(clipMiddle("abcdefghij", 5), "abcde");
    assert.equal(clipMiddle("abcdefghij", 0), "");
    assert.equal(clipMiddle("漢字漢字", 2), "", "never emits half a character");
  });

  it("does not start the tail on half of a character", () => {
    // 190 KiB of ASCII followed by multi-byte characters: the suffix boundary
    // lands inside one unless the split walks off the surrogate/continuation.
    const text = "a".repeat(1000) + "漢".repeat(500);
    const clipped = clipMiddle(text, 600);
    assert.doesNotMatch(clipped, /\uFFFD/, "no replacement character");
    assert.ok(clipped.endsWith("漢"));
  });
});

describe("reading the Antigravity envelope", () => {
  it("reads systemInstruction as system text", () => {
    const parsed = antigravityBodyToMessages({
      request: {
        systemInstruction: { role: "system", parts: [text("be brief"), text("be kind")] },
        contents: [{ role: "user", parts: [text("hi")] }],
      },
    });
    assert.equal(parsed.system, "be brief\nbe kind");
    assert.equal(parsed.messages.length, 1);
  });

  it("unwraps the cloudcode envelope and the bare one", () => {
    const inner = { contents: [{ role: "user", parts: [text("hi")] }] };
    assert.deepEqual(
      antigravityBodyToMessages({ request: inner }),
      antigravityBodyToMessages(inner)
    );
  });

  it("maps role model to assistant", () => {
    const parsed = antigravityBodyToMessages({
      contents: [
        { role: "user", parts: [text("q")] },
        { role: "model", parts: [text("a")] },
      ],
    });
    assert.equal(parsed.messages[1].role, "assistant");
  });

  it("renders a functionCall and its functionResponse as records", () => {
    const parsed = antigravityBodyToMessages({
      contents: [
        { role: "user", parts: [text("read the file")] },
        {
          role: "model",
          parts: [{ functionCall: { name: "read_file", id: "c1", args: { p: "a.txt" } } }],
        },
        {
          role: "user",
          parts: [
            { functionResponse: { name: "read_file", id: "c1", response: { result: "hi" } } },
          ],
        },
      ],
    });
    const call = parsed.messages[1].parts[0];
    assert.equal(call.type, "text");
    assert.match(
      call.type === "text" ? call.text : "",
      /^\[tool call read_file id=c1 args=\{"p":"a\.txt"\}\]$/
    );
    const result = parsed.messages[2].parts[0];
    assert.match(
      result.type === "text" ? result.text : "",
      /^\[tool result id=c1\]\n.*\n\[end of tool result\]$/s
    );
  });

  it("keeps an inline image as an image part", () => {
    const parsed = antigravityBodyToMessages({
      contents: [
        {
          role: "user",
          parts: [text("what is this"), { inlineData: { mimeType: "image/jpeg", data: "QUJD" } }],
        },
      ],
    });
    assert.deepEqual(parsed.messages[0].parts[1], {
      type: "image",
      mimeType: "image/jpeg",
      data: "QUJD",
    });
  });

  it("drops an image with no data rather than sending an empty one", () => {
    const parsed = antigravityBodyToMessages({
      contents: [{ role: "user", parts: [text("x"), { inlineData: { mimeType: "image/png" } }] }],
    });
    assert.equal(parsed.messages[0].parts.length, 1);
  });

  it("merges consecutive same-role contents into one turn", () => {
    const parsed = antigravityBodyToMessages({
      contents: [
        { role: "user", parts: [text("one ")] },
        { role: "user", parts: [text("two")] },
      ],
    });
    assert.equal(parsed.messages.length, 1);
    assert.equal(joined([{ type: "text", text: "one two" }]), "one two");
  });

  it("returns no messages for an empty body", () => {
    assert.deepEqual(antigravityBodyToMessages({}), { system: "", messages: [] });
  });
});

describe("trailingMessages", () => {
  it("splits at the last assistant turn", () => {
    const messages = [user("a"), assistant("b"), user("c")];
    const { history, current } = trailingMessages(messages);
    assert.equal(history.length, 2);
    assert.equal(current.length, 1);
  });

  it("keeps a whole trailing tool loop in the current turn", () => {
    // The client is answering a tool call: those results are what the model
    // must act on, not history to replay.
    const messages = [user("a"), assistant("b"), user("tool result"), user("and another")];
    const { history, current } = trailingMessages(messages);
    assert.equal(history.length, 2);
    assert.equal(current.length, 2);
  });

  it("treats a conversation with no assistant turn as all current", () => {
    const { history, current } = trailingMessages([user("a")]);
    assert.equal(history.length, 0);
    assert.equal(current.length, 1);
  });
});

describe("historyKey and hasPrefix", () => {
  it("separates roles and text", () => {
    assert.notEqual(historyKey([user("a"), assistant("b")]), historyKey([user("ab")]));
    assert.notEqual(historyKey([user("x")]), historyKey([assistant("x")]));
  });

  it("tells images apart by their payload, and an image from text that names one", () => {
    const image = (data: string): AgyMessage => ({
      role: "user",
      parts: [{ type: "image", mimeType: "image/png", data }],
    });
    assert.notEqual(historyKey([image("AAAA")]), historyKey([image("BBBB")]));
    assert.equal(historyKey([image("AAAA")]), historyKey([image("AAAA")]));
    assert.notEqual(historyKey([image("AAAA")]), historyKey([user("[image image/png]")]));
    assert.equal(
      hasPrefix([image("BBBB"), assistant("b"), user("c")], [image("AAAA"), assistant("b")]),
      false,
      "an edited earlier image is a different history"
    );
  });

  it("matches only a real prefix", () => {
    const messages = [user("a"), assistant("b"), user("c")];
    assert.equal(hasPrefix(messages, [user("a")]), true);
    assert.equal(hasPrefix(messages, [user("a"), assistant("b")]), true);
    assert.equal(hasPrefix(messages, messages), true);
    assert.equal(hasPrefix(messages, [assistant("b")]), false);
    assert.equal(hasPrefix(messages, [...messages, user("d")]), false);
  });
});

describe("renderInitialPromptParts", () => {
  it("sends a first turn bare — no wrapper around nothing", () => {
    const parts = renderInitialPromptParts({ messages: [user("hello")] });
    assert.equal(joined(parts), "hello");
  });

  it("wraps history and keeps the live turn outside it", () => {
    const prompt = joined(
      renderInitialPromptParts({ messages: [user("first"), assistant("answer"), user("second")] })
    );
    assert.match(prompt, /^<conversation_history>\n/);
    assert.match(prompt, /<current_turn>\nsecond\n<\/current_turn>$/);
    assert.match(prompt, /Human: first\n/);
    assert.match(prompt, /Assistant: answer\n/);
    // The instruction that tool calls are records must be inside the wrapper.
    const record = prompt.indexOf("Historical tool calls");
    assert.ok(record > 0 && record < prompt.indexOf("</conversation_history>"));
  });

  it("always replays the whole history — a fresh session has been sent nothing", () => {
    // `renderInitialPromptParts` only ever runs for a session with an empty
    // transcript (a diverged conversation retires the old process instead), so
    // there is no "already seen" tail to skip: sending one would drop turns the
    // model needs to answer.
    const prompt = joined(
      renderInitialPromptParts({
        messages: [
          user("first"),
          assistant("answer"),
          user("second"),
          assistant("reply"),
          user("third"),
        ],
      })
    );
    assert.match(prompt, /Human: first/);
    assert.match(prompt, /Assistant: answer/);
    assert.match(prompt, /Human: second/);
    assert.match(prompt, /<current_turn>\nthird\n<\/current_turn>$/);
  });

  it("keeps the frame intact inside the budget", () => {
    const big = "x".repeat(200 * 1024);
    const prompt = joined(
      renderInitialPromptParts({ messages: [user(big), assistant("ok"), user("now")] })
    );
    assert.ok(utf8Bytes(prompt) <= maxInitialPromptBytes());
    assert.match(prompt, /<current_turn>\nnow\n<\/current_turn>$/);
    assert.match(prompt, /<\/conversation_history>/);
    assert.match(prompt, /bytes of this history block omitted/);
  });

  it("protects an oversized current turn even when the history is huge", () => {
    const messages: AgyMessage[] = [];
    for (let i = 0; i < 40; i++)
      messages.push(user(`turn ${i}: ${"h".repeat(8000)}`), assistant("ok"));
    messages.push(user("L".repeat(60 * 1024)));
    const prompt = joined(renderInitialPromptParts({ messages }));
    assert.ok(utf8Bytes(prompt) <= maxInitialPromptBytes(), `${utf8Bytes(prompt)} bytes`);
    // The live turn is what the request is about: it keeps its own text.
    assert.ok(prompt.includes("L".repeat(1000)));
  });

  it("drops the middle of a long history before the live turn", () => {
    const messages: AgyMessage[] = [user("OPENING")];
    for (let i = 0; i < 60; i++) {
      messages.push(assistant(`answer ${i}`), user(`question ${i} ${"x".repeat(2000)}`));
    }
    messages.push(assistant("the last answer"), user("NOW"));
    const prompt = joined(renderInitialPromptParts({ messages }));
    assert.ok(utf8Bytes(prompt) <= maxInitialPromptBytes());
    assert.match(prompt, /OPENING/, "keeps the opening message");
    assert.match(prompt, /question 59/, "keeps the newest turn");
    assert.match(prompt, /earlier conversation history omitted/, "says what it dropped");
    assert.match(prompt, /<current_turn>\nNOW\n<\/current_turn>$/);
  });

  it("leaves room for a reminder the caller appends", () => {
    const tail = "<system-reminder>\nstructured output\n</system-reminder>";
    const messages: AgyMessage[] = [user("a"), assistant("b"), user("c".repeat(80 * 1024))];
    const parts = renderInitialPromptParts({
      messages,
      reserveBytes: utf8Bytes(tail) + 2,
    });
    const combined = joined(parts) + "\n\n" + tail;
    assert.ok(utf8Bytes(combined) <= maxInitialPromptBytes());
  });

  it("respects an explicit budget", () => {
    const prompt = joined(
      renderInitialPromptParts({
        messages: [user("x".repeat(5000)), assistant("ok"), user("now")],
        budgetBytes: 400,
      })
    );
    assert.ok(utf8Bytes(prompt) <= 400);
  });
});

describe("renderContinuedTurnParts", () => {
  it("sends only the live turn, with no second wrapper", () => {
    const prompt = joined(
      renderContinuedTurnParts({ messages: [user("old"), assistant("reply"), user("now")] })
    );
    assert.equal(prompt, "now");
    assert.doesNotMatch(prompt, /conversation_history/);
  });

  it("keeps a trailing tool-result loop whole", () => {
    const prompt = joined(
      renderContinuedTurnParts({
        messages: [
          user("old"),
          assistant("[tool call t id=1 args={}]"),
          user("[tool result id=1]\nok\n[end of tool result]"),
        ],
      })
    );
    assert.match(prompt, /\[tool result id=1\]/);
    assert.doesNotMatch(prompt, /\[tool call/);
  });

  it("bounds an oversized live turn", () => {
    const prompt = joined(renderContinuedTurnParts({ messages: [user("y".repeat(200 * 1024))] }));
    assert.ok(utf8Bytes(prompt) <= maxInitialPromptBytes());
    assert.match(prompt, /bytes omitted/);
  });
});
