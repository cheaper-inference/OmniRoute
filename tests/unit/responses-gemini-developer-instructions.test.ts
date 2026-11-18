import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const previousDataDir = process.env.DATA_DIR;
const dataDir = mkdtempSync(join(tmpdir(), "omniroute-responses-developer-"));
process.env.DATA_DIR = dataDir;

const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { ANTIGRAVITY_DEFAULT_SYSTEM } = await import("../../open-sse/config/constants.ts");
const { clearGeminiThoughtSignatures, storeGeminiThoughtSignature } =
  await import("../../open-sse/services/geminiThoughtSignatureStore.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

type Part = {
  text?: string;
  functionCall?: { id: string; name: string; args: unknown };
  functionResponse?: { id: string; name: string; response: unknown };
};
type WireRequest = {
  contents: Array<{ role: string; parts: Part[] }>;
  systemInstruction?: { role: string; parts: Part[] };
  tools?: Array<{ functionDeclarations: Array<Record<string, unknown>> }>;
};

const instructionTexts = [
  "I037_TOP",
  "I037_DEV_FIRST",
  "I037_SYS_A I037_SYS_B",
  "I037_DEV_LATE",
  "I037_SYS_LAST",
];
const targets = [FORMATS.GEMINI, FORMATS.ANTIGRAVITY];

function responsesBody() {
  return {
    instructions: instructionTexts[0],
    input: [
      { type: "message", role: "developer", content: instructionTexts[1] },
      { type: "message", role: "user", content: "ENV037_CONTEXT" },
      {
        type: "message",
        role: "system",
        content: [
          { type: "input_text", text: "I037_SYS_A " },
          { type: "input_text", text: "I037_SYS_B" },
        ],
      },
      { type: "message", role: "assistant", content: "HISTORY037_ANSWER" },
      {
        type: "message",
        role: "developer",
        content: [{ type: "input_text", text: instructionTexts[3] }],
      },
      { type: "message", role: "user", content: "USER037_QUESTION" },
      { type: "function_call", call_id: "call_037", name: "lookup", arguments: '{"key":"value"}' },
      { type: "function_call_output", call_id: "call_037", output: "TOOL037_RESULT" },
      { type: "message", role: "system", content: instructionTexts[4] },
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "USER037_FOLLOWUP" }],
      },
    ],
    tools: [
      {
        type: "function",
        name: "lookup",
        description: "Look up a value",
        parameters: { type: "object", properties: { key: { type: "string" } }, required: ["key"] },
      },
    ],
  };
}

function translate(
  body: Record<string, unknown>,
  target: string,
  source = FORMATS.OPENAI_RESPONSES
) {
  const result = translateRequest(
    source,
    target,
    "gemini-2.5-flash",
    body,
    false,
    { projectId: "test-project" },
    target === FORMATS.ANTIGRAVITY ? "antigravity" : "gemini"
  );
  return (target === FORMATS.ANTIGRAVITY ? result.request : result) as WireRequest;
}

function assertInstructions(wire: WireRequest, target: string, expected: string[]) {
  const carrier =
    target === FORMATS.ANTIGRAVITY ? wire.contents[0].parts : wire.systemInstruction?.parts;
  assert.deepEqual(
    carrier?.slice(0, expected.length).map((part) => part.text),
    expected
  );
  assert.deepEqual(
    JSON.stringify(wire).match(/I037_[A-Z_]+/g),
    expected.flatMap((text) => text.match(/I037_[A-Z_]+/g) ?? [])
  );
  if (target === FORMATS.ANTIGRAVITY) {
    assert.deepEqual(wire.systemInstruction, {
      role: "system",
      parts: [{ text: ANTIGRAVITY_DEFAULT_SYSTEM }],
    });
    assert.equal(wire.contents[0].role, "user");
  }
}

function assertHistory(wire: WireRequest) {
  const contents = wire.contents;
  const parts = contents.flatMap((content) => content.parts);
  assert.deepEqual(
    JSON.stringify(contents).match(/(?:ENV037|HISTORY037|USER037|TOOL037)_[A-Z]+/g),
    [
      "ENV037_CONTEXT",
      "HISTORY037_ANSWER",
      "USER037_QUESTION",
      "USER037_FOLLOWUP",
      "TOOL037_RESULT",
    ]
  );
  assert.ok(
    contents.some(
      (content) =>
        content.role === "model" && content.parts.some((part) => part.text === "HISTORY037_ANSWER")
    )
  );
  assert.deepEqual(parts.find((part) => part.functionCall)?.functionCall, {
    id: "call_037",
    name: "lookup",
    args: { key: "value" },
  });
  assert.deepEqual(parts.find((part) => part.functionResponse)?.functionResponse, {
    id: "call_037",
    name: "lookup",
    response: { result: "TOOL037_RESULT" },
  });
  assert.deepEqual(wire.tools, [
    {
      functionDeclarations: [
        {
          name: "lookup",
          description: "Look up a value",
          parameters: {
            type: "object",
            properties: { key: { type: "string" } },
            required: ["key"],
          },
        },
      ],
    },
  ]);
}

test.beforeEach(() => {
  clearGeminiThoughtSignatures();
  storeGeminiThoughtSignature("call_037", "synthetic-history-signature");
});

test.after(() => {
  clearGeminiThoughtSignatures();
  resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
});

for (const target of targets) {
  test(`Responses -> ${target}: preserves interleaved instructions and history without mutating input`, () => {
    const body = responsesBody();
    const original = structuredClone(body);
    const wire = translate(body, target);
    assertInstructions(wire, target, instructionTexts);
    assertHistory(wire);
    assert.deepEqual(body, original);
  });

  test(`Responses -> ${target}: keeps top-level instructions with string input`, () => {
    const wire = translate({ instructions: "I037_TOP", input: "USER037_QUESTION" }, target);
    assertInstructions(wire, target, ["I037_TOP"]);
    assert.equal(wire.contents[0].parts.at(-1)?.text, "USER037_QUESTION");
  });

  test(`Chat Completions -> ${target}: existing instruction carriers stay intact`, () => {
    const wire = translate(
      {
        messages: [
          { role: "system", content: "I037_TOP" },
          { role: "developer", content: [{ type: "text", text: "I037_DEV_FIRST" }] },
          { role: "user", content: "USER037_QUESTION" },
          { role: "system", content: "I037_SYS_LAST" },
        ],
      },
      target,
      FORMATS.OPENAI
    );
    assertInstructions(wire, target, ["I037_TOP", "I037_DEV_FIRST", "I037_SYS_LAST"]);
    assert.equal(wire.contents[0].parts.at(-1)?.text, "USER037_QUESTION");
  });
}

test("native Responses preserves developer input and top-level instructions", () => {
  const body = {
    instructions: "I037_TOP",
    input: [
      {
        type: "message",
        role: "developer",
        content: [{ type: "input_text", text: "I037_DEV_FIRST" }],
      },
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "USER037_QUESTION" }],
      },
    ],
  };
  const original = structuredClone(body);
  const result = translateRequest(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI_RESPONSES,
    "gpt-4o",
    body,
    false,
    null,
    "openai"
  );
  assert.deepEqual(result, original);
  assert.deepEqual(body, original);
});

test("Responses -> OpenAI keeps the existing developer-role preservation option", () => {
  const body = {
    instructions: "I037_TOP",
    input: [
      { type: "message", role: "developer", content: "I037_DEV_FIRST" },
      { type: "message", role: "user", content: "USER037_QUESTION" },
    ],
  };
  const result = translateRequest(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    "gpt-4o",
    body,
    false,
    null,
    "openai",
    null,
    { preserveDeveloperRole: true }
  );
  assert.deepEqual(result.messages, [
    { role: "system", content: "I037_TOP" },
    { role: "developer", content: "I037_DEV_FIRST" },
    { role: "user", content: "USER037_QUESTION" },
  ]);
});
