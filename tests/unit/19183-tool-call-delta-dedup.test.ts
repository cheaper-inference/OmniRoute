import test from "node:test";
import assert from "node:assert/strict";

const { geminiToOpenAIResponse } =
  await import("../../open-sse/translator/response/gemini-to-openai.ts");

type ToolCall = {
  index: number;
  id: string;
  function: { name: string; arguments: string };
};

function nativeCall(id: string, filePath: string, content: string) {
  return {
    candidates: [
      {
        content: {
          role: "model",
          parts: [{ functionCall: { id, name: "edit", args: { filePath, content } } }],
        },
      },
    ],
  };
}

function finish() {
  return { candidates: [{ finishReason: "STOP" }] };
}

function translate(chunks: unknown[]): ToolCall[] {
  const state = {
    functionIndex: 0,
    toolCalls: new Map(),
    messageId: "msg-19183",
    model: "gemini-3.8-flash-low",
  };
  const result: ToolCall[] = [];
  for (const chunk of chunks) {
    const translated = geminiToOpenAIResponse(chunk, state) || [];
    for (const item of translated) {
      for (const call of item.choices?.[0]?.delta?.tool_calls || []) {
        result.push(call);
      }
    }
  }
  return result;
}

test("19183: a repeated native functionCall snapshot is not emitted as a second call", () => {
  const firstSnapshot = {
    filePath: "example.ts",
    content: "const first = 1;",
  };
  const chunks = [
    nativeCall("call-edit-1", firstSnapshot.filePath, firstSnapshot.content),
    nativeCall("call-edit-1", firstSnapshot.filePath, "const first = 1;\nconsole.log(first);\n"),
    finish(),
  ];

  const calls = translate(chunks);

  assert.equal(calls.length, 1, `one call must be emitted once; received ${JSON.stringify(calls)}`);
  // OpenAI clients concatenate same-index arguments, so a re-emitted snapshot
  // can never replace the first: the first complete call is preserved and the
  // repeat is dropped (CLOVA terminal-frame rule) instead of corrupting JSON.
  assert.deepEqual(JSON.parse(calls[0].function.arguments), firstSnapshot);
});

test("19183: three repeated snapshots of one call yield exactly one delta", () => {
  const calls = translate([
    nativeCall("call-edit-1", "example.ts", "line 1\n"),
    nativeCall("call-edit-1", "example.ts", "line 1\nline 2\n"),
    nativeCall("call-edit-1", "example.ts", "line 1\nline 2\nline 3\n"),
    finish(),
  ]);

  assert.equal(calls.length, 1, `expected one call, got ${JSON.stringify(calls)}`);
  assert.equal(calls[0].index, 0);
  assert.equal(calls[0].id, "call-edit-1");
});

test("19183: repeated arguments do not emit another delta for an existing provider call", () => {
  const calls = translate([
    nativeCall("call-edit-1", "example.ts", "line 1\n"),
    nativeCall("call-edit-1", "example.ts", "line 1\nline 2\n"),
    finish(),
  ]);

  const combinedArguments = calls.map((call) => call.function.arguments).join("");
  assert.equal(
    calls.length,
    1,
    `re-emitted full arguments concatenate to a duplicated prefix: ${JSON.stringify(combinedArguments)}`
  );
  assert.doesNotThrow(() => JSON.parse(combinedArguments));
});

test("19183: distinct tool calls with the same name are preserved", () => {
  const first = { filePath: "first.ts", content: "first\nline\n" };
  const second = { filePath: "second.ts", content: "second\nline\n" };

  const calls = translate([
    nativeCall("call-edit-first", first.filePath, first.content),
    nativeCall("call-edit-second", second.filePath, second.content),
    finish(),
  ]);

  assert.equal(calls.length, 2);
  assert.equal(calls[0].index, 0);
  assert.equal(calls[1].index, 1);
  assert.deepEqual(JSON.parse(calls[0].function.arguments), first);
  assert.deepEqual(JSON.parse(calls[1].function.arguments), second);
});
