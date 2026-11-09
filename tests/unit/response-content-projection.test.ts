import assert from "node:assert/strict";
import test from "node:test";

import { normalizeArrayContentDelta } from "../../open-sse/utils/arrayContentDelta.ts";
import { projectResponsesFailureOutput } from "../../open-sse/utils/responsesFailureOutput.ts";

test("array deltas ignore malformed parts and preserve ordered text and thinking", () => {
  const delta: Record<string, unknown> = {
    role: "assistant",
    reasoning_content: 123,
    content: [
      null,
      ["ignored"],
      { type: "text", text: 123 },
      { type: "text", text: "first" },
      { type: "thinking", thinking: [null, { text: "reason" }, { text: 123 }] },
      { type: "thinking", thinking: "ing" },
      { type: "thinking", thinking: {} },
      { type: "text", text: " second" },
    ],
  };
  assert.equal(normalizeArrayContentDelta(delta), true);
  assert.deepEqual(delta, {
    role: "assistant",
    reasoning_content: "reasoning",
    content: "first second",
  });
});

test("empty array content is removed without changing existing reasoning", () => {
  for (const content of [[], [null, { type: "text", text: "" }]]) {
    const delta: Record<string, unknown> = { content, reasoning_content: "keep" };
    assert.equal(normalizeArrayContentDelta(delta), true);
    assert.deepEqual(delta, { reasoning_content: "keep" });
  }
});

test("failed Responses retain only projected assistant text and refusal in order", () => {
  const value = [
    null,
    { type: "reasoning", summary: "private" },
    { type: "message", role: "user", content: [] },
    { type: "message", role: "assistant", phase: "commentary", content: [] },
    {
      type: "message",
      role: "assistant",
      id: "message-id",
      status: "incomplete",
      private: "discard",
      content: [
        null,
        { type: "output_text", text: 123 },
        { type: "refusal", refusal: null },
        { type: "output_text", text: "private", phase: "commentary" },
        { type: "refusal", refusal: "private", phase: "commentary" },
        { type: "reasoning", text: "private" },
        { type: "output_text", text: "answer", annotations: [{ secret: true }] },
        { type: "refusal", refusal: "refused", extra: "private" },
        { type: "output_text", text: "" },
      ],
    },
  ];
  const original = structuredClone(value);
  const calls: string[] = [];
  const output = projectResponsesFailureOutput(value, (field, text) => {
    calls.push(`${field}:${text}`);
    return `[${field}]${text}`;
  });
  assert.deepEqual(output, [
    {
      type: "message",
      role: "assistant",
      id: "[id]message-id",
      status: "incomplete",
      content: [
        { type: "output_text", text: "[text]answer", annotations: [] },
        { type: "refusal", refusal: "[refusal]refused" },
        { type: "output_text", text: "[text]", annotations: [] },
      ],
    },
  ]);
  assert.deepEqual(calls, ["text:answer", "refusal:refused", "text:", "id:message-id"]);
  assert.deepEqual(value, original);
});

test("failed Responses tolerate missing content and allow only known statuses", () => {
  const identity = (_field: string, value: string) => value;
  for (const value of [null, {}, "invalid"]) {
    assert.deepEqual(projectResponsesFailureOutput(value, identity), []);
  }
  for (const status of ["in_progress", "completed", "incomplete", "unknown"]) {
    assert.deepEqual(
      projectResponsesFailureOutput(
        [{ type: "message", role: "assistant", id: 123, status, content: {} }],
        identity
      ),
      [
        {
          type: "message",
          role: "assistant",
          content: [],
          ...(status === "unknown" ? {} : { status }),
        },
      ]
    );
  }
});
