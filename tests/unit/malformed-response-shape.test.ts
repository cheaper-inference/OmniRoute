import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildMalformedResponseDiagnostic } from "../../open-sse/utils/responseShapeDiagnostic.ts";

test("distinguishes upstream refusal from a translated empty response without retaining text", () => {
  const source = {
    object: "response",
    status: "completed",
    id: "PRIVATE_ID",
    output: [{ type: "message", content: [{ type: "refusal", refusal: "PRIVATE_REFUSAL" }] }],
  };
  const result = buildMalformedResponseDiagnostic("empty_choices", source, {
    choices: [{ message: { content: "" } }],
  });
  assert.match(result, /malformed_translated_response:empty_choices/);
  assert.match(result, /refusalChars=15/);
  assert.match(result, /upstream\{kind=responses/);
  assert.match(result, /translated\{kind=chat/);
  assert.doesNotMatch(result, /PRIVATE/);
});

test("bounded summary does not serialize unknown strings, identifiers, tools or cycles", () => {
  const source: Record<string, unknown> = {
    object: "PRIVATE_KIND",
    status: "PRIVATE_STATUS",
    token: "PRIVATE_TOKEN",
  };
  source.response = source;
  const result = buildMalformedResponseDiagnostic("PRIVATE_REASON", source, {
    content: [
      { type: "PRIVATE_TYPE", text: "PRIVATE_TEXT" },
      { type: "tool_use", name: "PRIVATE_TOOL", input: { password: "PRIVATE_PASSWORD" } },
    ],
  });
  assert.ok(result.length <= 512);
  assert.doesNotMatch(result, /PRIVATE/);
  assert.match(result, /:unknown/);
});

test("large arrays are capped and explicitly marked as clipped", () => {
  const content = Array(1000).fill({ type: "output_text", text: "x" });
  const result = buildMalformedResponseDiagnostic(
    "empty_choices",
    { object: "response", output: Array(1000).fill({ type: "message", content }) },
    null
  );
  assert.ok(result.length <= 512);
  assert.match(result, /clipped=true/);
});

test("counts mixed chat delta parts and clips tool calls independently", () => {
  const result = buildMalformedResponseDiagnostic(
    "no_terminal",
    {
      response: {
        choices: [
          {
            delta: {
              content: [{ type: "text", text: "abc" }, { type: "refusal", refusal: "no" }, null],
              refusal: "stop",
              tool_calls: Array(33).fill({ name: "PRIVATE" }),
            },
          },
        ],
      },
    },
    { content: [{ type: "tool_use" }, { type: "text", text: "xy" }] }
  );
  assert.equal(
    result,
    "malformed_translated_response:no_terminal upstream{kind=chat,textChars=3,refusalChars=6,tools=32,other=1,clipped=true} translated{kind=claude,textChars=2,refusalChars=0,tools=1,other=0,clipped=false}"
  );
});

test("Responses takes precedence over choices and counts function and unknown output", () => {
  const result = buildMalformedResponseDiagnostic(
    "empty",
    {
      object: "response",
      choices: [{ message: { content: "ignored" } }],
      output: [
        { type: "function_call" },
        null,
        { type: "message", content: [{ type: "output_text", text: "abc" }, { type: "tool_use" }] },
      ],
    },
    { choices: [{ message: {}, delta: { content: "ignored" } }] }
  );
  assert.equal(
    result,
    "malformed_translated_response:empty upstream{kind=responses,textChars=3,refusalChars=0,tools=2,other=1,clipped=false} translated{kind=chat,textChars=0,refusalChars=0,tools=0,other=0,clipped=false}"
  );
});

test("handler persists shape diagnostics separately from truncated payload artifacts", () => {
  const source = readFileSync(
    new URL("../../open-sse/handlers/chatCore/nonStreamingResponse.ts", import.meta.url),
    "utf8"
  );
  const branch = source.slice(
    source.indexOf("if (malformedTranslatedReason)"),
    source.indexOf('persistFailureUsage(HTTP_STATUS.BAD_GATEWAY, "malformed_translated_response")')
  );
  assert.match(
    branch,
    /buildMalformedResponseDiagnostic\(\s*malformedTranslatedReason,\s*responseBody,\s*translatedResponse/
  );
  assert.match(
    branch,
    /persistAttemptLogs\(\{\s*status: HTTP_STATUS.BAD_GATEWAY,\s*error: malformedDiagnostic/
  );
});
