import test from "node:test";
import assert from "node:assert/strict";

import {
  getEmptyTurnDiagnostics,
  hasTrustedEmptyTurn,
  markEmptyTurnExecution,
} from "../../open-sse/utils/emptyTurnPolicy.ts";

async function observe(
  payload: Record<string, unknown>,
  url = "https://chatgpt.com/backend-api/codex/responses"
) {
  const response = markEmptyTurnExecution(
    new Response(`data: ${JSON.stringify(payload)}\n\n`, {
      headers: { "content-type": "text/event-stream" },
    }),
    url,
    { connectionId: "selected-fixture-account", accessToken: "synthetic-fixture-token" }
  );
  await response.text();
  return getEmptyTurnDiagnostics(response);
}

test("native terminal diagnostics retain counts without exposing response content", async () => {
  const secret = "private-fixture-content-must-not-escape";
  const diagnostics = await observe({
    type: "response.completed",
    response: {
      status: "completed",
      output: [
        { type: "message", content: [{ type: "output_text", text: secret }] },
        { type: "reasoning", encrypted_content: secret },
        { type: "function_call", name: secret, arguments: secret },
        { type: secret },
      ],
      usage: { output_tokens: 47, output_tokens_details: { reasoning_tokens: 46 } },
    },
  });
  assert.equal(diagnostics.nativeExecutionObserved, true);
  assert.ok("outputItems" in diagnostics);
  assert.deepEqual(diagnostics.outputItems, { messages: 1, reasoning: 1, tools: 1, other: 1 });
  assert.equal(diagnostics.outputTokens, 47);
  assert.equal(diagnostics.reasoningTokens, 46);
  assert.doesNotMatch(JSON.stringify(diagnostics), new RegExp(secret));
});

for (const fixture of [
  {
    name: "Claude",
    url: "https://api.anthropic.com/v1/messages",
    payload: { type: "message_delta", delta: { stop_reason: "end_turn" } },
    expected: "end_turn",
  },
  {
    name: "chat completions",
    url: "https://api.openai.com/v1/chat/completions",
    payload: { choices: [{ finish_reason: "stop" }] },
    expected: "stop",
  },
]) {
  test(`native ${fixture.name} terminal has a content-free stop classification`, async () => {
    const diagnostics = await observe(fixture.payload, fixture.url);
    assert.ok("terminalStatus" in diagnostics);
    assert.equal(diagnostics.terminalStatus, fixture.expected);
  });
}

test("native text deltas remain distinguishable from an empty terminal snapshot", async () => {
  const chunks = [
    { type: "response.output_text.delta", delta: "" },
    { type: "response.output_text.delta", delta: "   " },
    { type: "response.output_text.delta", delta: "private-text-delta" },
    { type: "response.refusal.delta", delta: "private-refusal-delta" },
    { type: "response.output_item.done", item: { type: "message" } },
    { type: "response.completed", response: { status: "completed", output: [] } },
  ];
  const response = markEmptyTurnExecution(
    new Response(chunks.map((chunk) => `data: ${JSON.stringify(chunk)}\n\n`).join(""), {
      headers: { "content-type": "text/event-stream" },
    }),
    "https://chatgpt.com/backend-api/codex/responses",
    { connectionId: "fixture-account", accessToken: "synthetic-token" }
  );
  await response.text();
  const diagnostics = getEmptyTurnDiagnostics(response);
  assert.ok("streamedOutput" in diagnostics);
  assert.equal(diagnostics.streamedOutput.textDeltaEvents, 1);
  assert.equal(diagnostics.streamedOutput.refusalDeltaEvents, 1);
  assert.equal(diagnostics.streamedOutput.items.messages, 1);
  assert.equal(diagnostics.outputItems.messages, 0);
  assert.equal(diagnostics.nativeStreamComplete, true);
  assert.doesNotMatch(JSON.stringify(diagnostics), /private-text|private-refusal/);
});

for (const fixture of [
  { name: "malformed", frame: "data: {malformed}\n\n", counter: "unparsedFrames" },
  {
    name: "oversized",
    frame: `data: ${"x".repeat(1_048_577)}\n\n`,
    counter: "oversizedFrames",
  },
]) {
  test(`${fixture.name} native frames are reported as observer gaps`, async () => {
    const response = markEmptyTurnExecution(
      new Response(fixture.frame, { headers: { "content-type": "text/event-stream" } }),
      "https://chatgpt.com/backend-api/codex/responses",
      { connectionId: "fixture-account", accessToken: "synthetic-token" }
    );
    await response.text();
    assert.equal(getEmptyTurnDiagnostics(response)[fixture.counter], 1);
  });
}

test("failed diagnostics observe later terminals without restoring trust", async () => {
  const payloads = [
    { type: "error", error: { message: "private-provider-error" } },
    {
      type: "response.failed",
      response: { status: "failed", error: { message: "private-terminal-error" } },
    },
  ];
  const response = markEmptyTurnExecution(
    new Response(
      new ReadableStream({
        start(controller) {
          for (const payload of payloads) {
            controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(payload)}\n\n`));
          }
          controller.close();
        },
      }),
      { headers: { "content-type": "text/event-stream" } }
    ),
    "https://chatgpt.com/backend-api/codex/responses",
    { connectionId: "fixture-account", accessToken: "synthetic-token" }
  );
  await response.text();
  const diagnostics = getEmptyTurnDiagnostics(response);
  assert.ok("terminalType" in diagnostics);
  assert.equal(diagnostics.terminalType, "response.failed");
  assert.equal(diagnostics.terminalStatus, "failed");
  assert.equal(diagnostics.eventCount, 2);
  assert.equal(hasTrustedEmptyTurn(response), false);
  assert.doesNotMatch(JSON.stringify(diagnostics), /private-provider|private-terminal/);
});

for (const reason of ["max_output_tokens", "content_filter", "private-unknown-reason"]) {
  test(`incomplete diagnostics allowlist the reason: ${reason}`, async () => {
    const diagnostics = await observe({
      type: "response.incomplete",
      response: { status: "incomplete", incomplete_details: { reason } },
    });
    assert.ok("incompleteReason" in diagnostics);
    assert.equal(diagnostics.incompleteReason, reason.startsWith("private-") ? null : reason);
    assert.doesNotMatch(JSON.stringify(diagnostics), /private-unknown-reason/);
  });
}

test("custom tool input deltas count without retaining input", async () => {
  const diagnostics = await observe({
    type: "response.custom_tool_call_input.delta",
    delta: "private-apply-patch-input",
  });
  assert.ok("streamedOutput" in diagnostics);
  assert.equal(diagnostics.streamedOutput.toolArgumentDeltaEvents, 1);
  assert.doesNotMatch(JSON.stringify(diagnostics), /private-apply-patch-input/);
});

test("untrusted response identities cannot supply native terminal diagnostics", () => {
  const response = new Response("untrusted fixture");
  assert.deepEqual(getEmptyTurnDiagnostics(response), { nativeExecutionObserved: false });
});

for (const tokens of [-1, 1.5, "47", Number.MAX_SAFE_INTEGER + 1]) {
  test(`native diagnostics reject invalid token count ${tokens}`, async () => {
    const diagnostics = await observe({
      type: "response.done",
      response: {
        status: "private-status-must-not-escape",
        usage: { output_tokens: tokens, output_tokens_details: { reasoning_tokens: tokens } },
      },
    });
    assert.ok("terminalStatus" in diagnostics);
    assert.equal(diagnostics.terminalStatus, null);
    assert.equal(diagnostics.outputTokens, null);
    assert.equal(diagnostics.reasoningTokens, null);
    assert.doesNotMatch(JSON.stringify(diagnostics), /private-status/);
  });
}
