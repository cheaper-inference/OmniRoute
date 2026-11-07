import test from "node:test";
import assert from "node:assert/strict";

import { FORMATS } from "../../open-sse/translator/formats.ts";
import { buildGeminiTools } from "../../open-sse/translator/helpers/geminiToolsSanitizer.ts";
import { stripGeminiPlaceholderArgs } from "../../open-sse/translator/helpers/geminiPlaceholderArgs.ts";
import { geminiToClaudeResponse } from "../../open-sse/translator/response/gemini-to-claude.ts";
import { geminiToOpenAIResponse } from "../../open-sse/translator/response/gemini-to-openai.ts";
import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.ts";

// Gemini/Antigravity tool schemas give every empty object schema a synthetic required
// `reason` property (the upstream rejects an OBJECT with no properties, and Claude on
// Antigravity runs in VALIDATED mode). The model then fills it, and Claude Code rejects
// the call of a parameter-less tool: "InputValidationError: An unexpected parameter
// 'reason' was provided". The request keeps the placeholder; the response drops it again.

type JsonRecord = Record<string, unknown>;

const claudeTools = [
  { name: "TaskList", description: "List tasks", input_schema: { type: "object", properties: {} } },
  {
    name: "AskUserQuestion",
    description: "Ask",
    input_schema: {
      type: "object",
      properties: {
        questions: {
          type: "array",
          items: { type: "object", properties: { question: { type: "string" } } },
        },
        answers: { type: "object", additionalProperties: { type: "string" } },
      },
      required: ["questions"],
    },
  },
  {
    name: "Bash",
    description: "Run",
    input_schema: {
      type: "object",
      properties: { command: { type: "string" } },
      required: ["command"],
    },
  },
  {
    name: "Explain",
    description: "Declares its own reason",
    input_schema: {
      type: "object",
      properties: { reason: { type: "string", description: "Why" } },
      required: ["reason"],
    },
  },
];

function geminiFunctionCallChunk(name: string, args: JsonRecord) {
  return {
    candidates: [{ content: { parts: [{ functionCall: { name, args } }] }, finishReason: "STOP" }],
  };
}

test("request side still sends the placeholder for an empty object schema", () => {
  const tools = buildGeminiTools(claudeTools.slice(0, 1));
  const parameters = tools?.[0].functionDeclarations?.[0].parameters as JsonRecord;
  assert.deepEqual(parameters.required, ["reason"]);
  assert.equal(
    (parameters.properties as JsonRecord & { reason: JsonRecord }).reason.type,
    "string"
  );
});

test("strips the synthetic reason from a parameter-less tool call", () => {
  assert.deepEqual(stripGeminiPlaceholderArgs("TaskList", { reason: "listing" }, claudeTools), {});
  // Tool names come back lowercased from Gemini when no alias resolves them.
  assert.deepEqual(stripGeminiPlaceholderArgs("tasklist", { reason: "listing" }, claudeTools), {});
});

test("strips the synthetic reason from a nested free-form object only", () => {
  const args = { questions: [{ question: "Proceed?" }], answers: { reason: "filled" } };
  assert.deepEqual(stripGeminiPlaceholderArgs("AskUserQuestion", args, claudeTools), {
    questions: [{ question: "Proceed?" }],
    answers: {},
  });
  // The caller's object is never mutated.
  assert.deepEqual(args.answers, { reason: "filled" });
});

test("keeps reason when the client declared it or the object has real properties", () => {
  const explain = { reason: "because" };
  assert.equal(stripGeminiPlaceholderArgs("Explain", explain, claudeTools), explain);
  const bash = { command: "ls", reason: "model extra" };
  assert.equal(stripGeminiPlaceholderArgs("Bash", bash, claudeTools), bash);
});

test("leaves args alone when the tool or the client tools are unknown", () => {
  const args = { reason: "x" };
  assert.equal(stripGeminiPlaceholderArgs("CronList", args, claudeTools), args);
  assert.equal(stripGeminiPlaceholderArgs("TaskList", args, null), args);
  assert.equal(
    stripGeminiPlaceholderArgs("TaskList", "not-an-object", claudeTools),
    "not-an-object"
  );
});

test("handles OpenAI-shaped client tools, including a tool with no parameters", () => {
  const openAITools = [
    { type: "function", function: { name: "now", parameters: { type: "object", properties: {} } } },
    { type: "function", function: { name: "ping" } },
  ];
  assert.deepEqual(stripGeminiPlaceholderArgs("now", { reason: "r" }, openAITools), {});
  assert.deepEqual(stripGeminiPlaceholderArgs("ping", { reason: "r" }, openAITools), {});
});

test("gemini -> claude stream emits an empty input for a parameter-less tool", () => {
  const state = { contentBlockIndex: 0, clientTools: claudeTools };
  const events = geminiToClaudeResponse(
    geminiFunctionCallChunk("TaskList", { reason: "Brief explanation" }),
    state
  ) as JsonRecord[];
  const delta = events.find(
    (event) =>
      event.type === "content_block_delta" &&
      (event.delta as JsonRecord)?.type === "input_json_delta"
  );
  assert.ok(delta, "tool_use input delta must be emitted");
  assert.equal((delta.delta as JsonRecord).partial_json, "{}");
});

test("gemini -> openai stream emits empty arguments for a parameter-less tool", () => {
  const openAITools = [
    { type: "function", function: { name: "now", parameters: { type: "object", properties: {} } } },
  ];
  const events = geminiToOpenAIResponse(geminiFunctionCallChunk("now", { reason: "r" }), {
    toolCalls: new Map(),
    clientTools: openAITools,
  }) as Array<{ choices?: Array<{ delta?: { tool_calls?: Array<{ function: JsonRecord }> } }> }>;
  const call = events.flatMap((event) => event.choices?.[0]?.delta?.tool_calls ?? [])[0];
  assert.ok(call, "tool call must be emitted");
  assert.equal(call.function.arguments, "{}");
});

test("non-streaming gemini -> claude gives the tool_use an empty input", () => {
  const response = {
    candidates: [
      {
        content: {
          role: "model",
          parts: [{ functionCall: { name: "TaskList", args: { reason: "r" } } }],
        },
        finishReason: "STOP",
        index: 0,
      },
    ],
    usageMetadata: { promptTokenCount: 1, candidatesTokenCount: 1, totalTokenCount: 2 },
  };
  const result = translateNonStreamingResponse(
    response,
    FORMATS.GEMINI,
    FORMATS.CLAUDE,
    null,
    null,
    undefined,
    claudeTools
  ) as { content: JsonRecord[] };
  const toolUse = result.content.find((block) => block.type === "tool_use");
  assert.ok(toolUse, "tool_use block must be present");
  assert.equal(toolUse.name, "TaskList");
  assert.deepEqual(toolUse.input, {});
});

test("strips the synthetic reason inside array items and keeps an unchanged array by identity", () => {
  const tools = [
    {
      name: "Batch",
      description: "Array of free-form objects",
      input_schema: {
        type: "object",
        properties: { jobs: { type: "array", items: { type: "object", properties: {} } } },
        required: ["jobs"],
      },
    },
  ];
  const args = { jobs: [{ reason: "a" }, {}, { reason: "b" }] };
  assert.deepEqual(stripGeminiPlaceholderArgs("Batch", args, tools), { jobs: [{}, {}, {}] });
  assert.deepEqual(args.jobs, [{ reason: "a" }, {}, { reason: "b" }]);

  const untouched = { jobs: [{}, {}] };
  const result = stripGeminiPlaceholderArgs("Batch", untouched, tools) as typeof untouched;
  assert.equal(result, untouched);
  assert.equal(result.jobs, untouched.jobs);
});
