import assert from "node:assert/strict";
import test from "node:test";
import { openaiResponsesToOpenAIRequest } from "../../open-sse/translator/request/openai-responses.ts";
import { convertResponsesApiFormat } from "../../open-sse/translator/helpers/responsesApiHelper.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

test.after(() => resetDbInstance());

function record(value: unknown): Record<string, unknown> {
  assert.ok(value && typeof value === "object" && !Array.isArray(value));
  return value as Record<string, unknown>;
}

function messages(value: unknown): Record<string, unknown>[] {
  const result = record(value).messages;
  assert.ok(Array.isArray(result));
  return result.map(record);
}

test("compaction item with content array translates to Chat Completions message (issue #19730)", () => {
  const body = {
    input: [
      {
        type: "compaction",
        role: "user",
        content: [{ type: "input_text", text: "hi" }],
      },
    ],
    max_output_tokens: 16,
  };

  const result = openaiResponsesToOpenAIRequest("fixture-model", body, true, {});
  const msgs = messages(result);
  assert.equal(msgs.length, 1);
  assert.equal(msgs[0].role, "user");
  assert.deepEqual(msgs[0].content, [{ type: "text", text: "hi" }]);
});

test("compaction item with string content translates to Chat Completions message", () => {
  const body = {
    input: [
      {
        type: "compaction",
        content: "Prior discussion summary",
      },
      {
        type: "message",
        role: "user",
        content: "What did we decide?",
      },
    ],
  };

  const result = openaiResponsesToOpenAIRequest("fixture-model", body, true, {});
  const msgs = messages(result);
  assert.equal(msgs.length, 2);
  assert.equal(msgs[0].role, "user");
  assert.deepEqual(msgs[0].content, [{ type: "text", text: "Prior discussion summary" }]);
  assert.equal(msgs[1].role, "user");
});

test("compaction item with text property translates to Chat Completions message", () => {
  const body = {
    input: [
      {
        type: "compaction",
        text: "Summary text property",
      },
    ],
  };

  const result = openaiResponsesToOpenAIRequest("fixture-model", body, true, {});
  const msgs = messages(result);
  assert.equal(msgs.length, 1);
  assert.equal(msgs[0].role, "user");
  assert.deepEqual(msgs[0].content, [{ type: "text", text: "Summary text property" }]);
});

test("compaction_summary with content translates to Chat Completions message", () => {
  const body = {
    input: [
      {
        type: "compaction_summary",
        role: "user",
        content: [{ type: "input_text", text: "Turn summary" }],
      },
    ],
  };

  const result = openaiResponsesToOpenAIRequest("fixture-model", body, true, {});
  const msgs = messages(result);
  assert.equal(msgs.length, 1);
  assert.equal(msgs[0].role, "user");
  assert.deepEqual(msgs[0].content, [{ type: "text", text: "Turn summary" }]);
});

test("compaction item with role assistant preserves assistant role", () => {
  const body = {
    input: [
      {
        type: "compaction",
        role: "assistant",
        content: [{ type: "input_text", text: "I already investigated the bug." }],
      },
    ],
  };

  const result = openaiResponsesToOpenAIRequest("fixture-model", body, true, {});
  const msgs = messages(result);
  assert.equal(msgs.length, 1);
  assert.equal(msgs[0].role, "assistant");
  assert.deepEqual(msgs[0].content, [{ type: "text", text: "I already investigated the bug." }]);
});

test("compaction_trigger marker is skipped without failing turn", () => {
  const body = {
    input: [
      { type: "compaction_trigger" },
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "continue" }],
      },
    ],
  };

  const result = openaiResponsesToOpenAIRequest("fixture-model", body, true, {});
  const msgs = messages(result);
  assert.equal(msgs.length, 1);
  assert.equal(msgs[0].role, "user");
  assert.deepEqual(msgs[0].content, [{ type: "text", text: "continue" }]);
});

test("compaction item with empty content rejects unsupported feature", () => {
  const body = {
    input: [
      {
        type: "compaction",
        content: [],
      },
    ],
  };

  assert.throws(() => openaiResponsesToOpenAIRequest("fixture-model", body, true, {}), {
    statusCode: 400,
    errorType: "unsupported_feature",
  });
});

test("convertResponsesApiFormat and translateRequest end-to-end translation support compaction with content", () => {
  const body = {
    input: [
      {
        type: "compaction",
        role: "user",
        content: [{ type: "input_text", text: "persisted context" }],
      },
    ],
  };

  const helper = convertResponsesApiFormat(body, null, "openai", "fixture-model");
  assert.deepEqual(messages(helper)[0].content, [{ type: "text", text: "persisted context" }]);

  const translated = translateRequest(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    "fixture-model",
    body,
    true,
    null,
    "openai"
  );
  assert.deepEqual(messages(translated)[0].content, [{ type: "text", text: "persisted context" }]);
});
