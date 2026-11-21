import assert from "node:assert/strict";
import test from "node:test";
import { openaiResponsesToOpenAIRequest } from "../../open-sse/translator/request/openai-responses.ts";
import { convertResponsesApiFormat } from "../../open-sse/translator/helpers/responsesApiHelper.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { normalizeCodexResponsesInput } from "../../open-sse/utils/responsesInputNormalization.ts";
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

test("compaction_trigger is rejected explicitly instead of answering as a normal turn", () => {
  // Codex remote compaction v2 requires exactly one `compaction` output item for a request that
  // carries this marker; a Chat Completions upstream cannot produce it, so dropping the marker
  // would return a plain assistant message the client cannot use. Reject it so a combo can move
  // on to a target that serves remote compaction.
  const withHistory = {
    input: [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "continue" }],
      },
      { type: "compaction_trigger" },
    ],
  };
  const triggerOnly = { input: [{ type: "compaction_trigger" }] };

  for (const body of [withHistory, triggerOnly]) {
    assert.throws(() => openaiResponsesToOpenAIRequest("fixture-model", body, true, {}), {
      statusCode: 400,
      errorType: "unsupported_feature",
    });
  }
});

test("blank compaction content falls back to the readable text field", () => {
  const body = {
    input: [{ type: "compaction", content: "", text: "Summary kept in text" }],
  };

  const msgs = messages(openaiResponsesToOpenAIRequest("fixture-model", body, true, {}));
  assert.equal(msgs.length, 1);
  assert.deepEqual(msgs[0].content, [{ type: "text", text: "Summary kept in text" }]);
});

test("compaction content that is neither text nor a part array is not forwarded as-is", () => {
  const body = {
    input: [{ type: "compaction", content: { summary: "not a content array" } }],
  };

  assert.throws(() => openaiResponsesToOpenAIRequest("fixture-model", body, true, {}), {
    statusCode: 400,
    errorType: "unsupported_feature",
  });
});

test("Codex normalization restores assistant compaction text as output_text", () => {
  const body: Record<string, unknown> = {
    input: [
      { type: "compaction", role: "assistant", content: "I already investigated the bug." },
      {
        type: "compaction_summary",
        role: "assistant",
        content: [{ type: "input_text", text: "Root cause is in the parser." }],
      },
      { type: "compaction", role: "assistant", text: "Fix is staged." },
      { type: "compaction", content: "User-side summary" },
    ],
  };

  normalizeCodexResponsesInput(body);

  assert.deepEqual(body.input, [
    {
      type: "message",
      role: "assistant",
      content: [{ type: "output_text", text: "I already investigated the bug." }],
    },
    {
      type: "message",
      role: "assistant",
      content: [{ type: "output_text", text: "Root cause is in the parser." }],
    },
    {
      type: "message",
      role: "assistant",
      content: [{ type: "output_text", text: "Fix is staged." }],
    },
    {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: "User-side summary" }],
    },
  ]);
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
