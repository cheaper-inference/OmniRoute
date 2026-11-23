import assert from "node:assert/strict";
import test from "node:test";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

type ToolCall = { id: string; type: string; function: { name: string; arguments: string } };
type Message = {
  role: string;
  content?: string | null;
  tool_calls?: ToolCall[];
  tool_call_id?: string;
};
type ChatBody = { model: string; messages: Message[]; stream: boolean };

const VALID_TOOL_CALL_ID = /^[A-Za-z0-9_-]+$/;
const OVERLONG_ID = `call_${"a".repeat(81)}`;

function toolCall(id: string, name = "lookup"): ToolCall {
  return { id, type: "function", function: { name, arguments: "{}" } };
}

function request(messages: Message[]): ChatBody {
  return { model: "gpt-5.6-luna", messages, stream: false };
}

function transform(provider: string, body: ChatBody): ChatBody {
  return new DefaultExecutor(provider).transformRequest(
    "gpt-5.6-luna",
    body,
    true,
    null
  ) as ChatBody;
}

test("openai: normalizes an 86-char tool-call ID and keeps call/result linked", () => {
  const shortId = "call_short_1";
  const out = transform(
    "openai",
    request([
      { role: "assistant", content: null, tool_calls: [toolCall(shortId)] },
      { role: "tool", tool_call_id: shortId, content: "short result" },
      { role: "assistant", content: null, tool_calls: [toolCall(OVERLONG_ID)] },
      { role: "tool", tool_call_id: OVERLONG_ID, content: "long result" },
    ])
  );

  const normalized = out.messages[2].tool_calls?.[0].id ?? "";
  assert.equal(OVERLONG_ID.length, 86);
  assert.equal(normalized.length, 64);
  assert.match(normalized, VALID_TOOL_CALL_ID);
  assert.equal(out.messages[3].tool_call_id, normalized);
  assert.equal(out.messages[0].tool_calls?.[0].id, shortId);
  assert.equal(out.messages[1].tool_call_id, shortId);
});

test("openai: IDs of exactly 64 characters are left untouched", () => {
  const id64 = `call_${"b".repeat(59)}`;
  assert.equal(id64.length, 64);
  const out = transform(
    "openai",
    request([
      { role: "assistant", content: null, tool_calls: [toolCall(id64)] },
      { role: "tool", tool_call_id: id64, content: "ok" },
    ])
  );
  assert.equal(out.messages[0].tool_calls?.[0].id, id64);
  assert.equal(out.messages[1].tool_call_id, id64);
});

test("openai: repeated occurrences of the same overlong ID normalize identically", () => {
  const out = transform(
    "openai",
    request([
      { role: "assistant", content: null, tool_calls: [toolCall(OVERLONG_ID, "first")] },
      { role: "tool", tool_call_id: OVERLONG_ID, content: "first result" },
      { role: "assistant", content: null, tool_calls: [toolCall(OVERLONG_ID, "replayed")] },
      { role: "tool", tool_call_id: OVERLONG_ID, content: "replayed result" },
    ])
  );
  const ids = [
    out.messages[0].tool_calls?.[0].id,
    out.messages[1].tool_call_id,
    out.messages[2].tool_calls?.[0].id,
    out.messages[3].tool_call_id,
  ];
  assert.equal(new Set(ids).size, 1);
  assert.notEqual(ids[0], OVERLONG_ID);
});

test("openai: a tool result before its assistant call still matches", () => {
  const out = transform(
    "openai",
    request([
      { role: "tool", tool_call_id: OVERLONG_ID, content: "result first" },
      { role: "assistant", content: null, tool_calls: [toolCall(OVERLONG_ID)] },
    ])
  );
  assert.equal(out.messages[0].tool_call_id, out.messages[1].tool_calls?.[0].id);
  assert.notEqual(out.messages[0].tool_call_id, OVERLONG_ID);
});

test("openai: IDs sharing the first 64 chars stay distinct", () => {
  const sharedPrefix = `call_${"z".repeat(80)}`;
  const firstId = `${sharedPrefix}x`;
  const secondId = `${sharedPrefix}y`;
  const out = transform(
    "openai",
    request([
      { role: "assistant", content: null, tool_calls: [toolCall(firstId), toolCall(secondId)] },
      { role: "tool", tool_call_id: firstId, content: "first" },
      { role: "tool", tool_call_id: secondId, content: "second" },
    ])
  );
  const [first, second] = (out.messages[0].tool_calls ?? []).map(({ id }) => id);
  assert.equal(firstId.slice(0, 64), secondId.slice(0, 64));
  assert.notEqual(first, second);
  assert.equal(first.length, 64);
  assert.equal(second.length, 64);
  assert.match(first, VALID_TOOL_CALL_ID);
  assert.match(second, VALID_TOOL_CALL_ID);
  assert.equal(out.messages[1].tool_call_id, first);
  assert.equal(out.messages[2].tool_call_id, second);
});

test("openai: unsafe characters are stripped from the retained prefix", () => {
  const unsafeId = `toolu:01/${"x".repeat(80)}`;
  const out = transform(
    "openai",
    request([{ role: "assistant", content: null, tool_calls: [toolCall(unsafeId)] }])
  );
  const normalized = out.messages[0].tool_calls?.[0].id ?? "";
  assert.ok(normalized.length <= 64);
  assert.match(normalized, VALID_TOOL_CALL_ID);
  assert.ok(normalized.startsWith("toolu01"));
});

test("openai: normalization is deterministic across independent requests", () => {
  const normalize = () =>
    transform(
      "openai",
      request([{ role: "assistant", content: null, tool_calls: [toolCall(OVERLONG_ID)] }])
    ).messages[0].tool_calls?.[0].id;
  assert.equal(normalize(), normalize());
});

test("openai: the caller's message objects are not mutated", () => {
  const body = request([
    { role: "assistant", content: null, tool_calls: [toolCall(OVERLONG_ID)] },
    { role: "tool", tool_call_id: OVERLONG_ID, content: "result" },
  ]);
  const snapshot = structuredClone(body);
  const out = transform("openai", body);
  assert.notEqual(out.messages[0].tool_calls?.[0].id, OVERLONG_ID);
  assert.deepEqual(body, snapshot);
});

for (const provider of ["openrouter", "openai-compatible-custom"]) {
  test(`${provider}: overlong tool-call IDs are not normalized`, () => {
    const out = transform(
      provider,
      request([
        { role: "assistant", content: null, tool_calls: [toolCall(OVERLONG_ID)] },
        { role: "tool", tool_call_id: OVERLONG_ID, content: "result" },
      ])
    );
    assert.equal(out.messages[0].tool_calls?.[0].id, OVERLONG_ID);
    assert.equal(out.messages[1].tool_call_id, OVERLONG_ID);
  });
}
