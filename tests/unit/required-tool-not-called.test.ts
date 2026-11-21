// @ts-nocheck
/**
 * Opt-in guard (OMNIROUTE_REQUIRED_TOOL_GUARD, default off): a non-streaming reply to a request
 * that forces a tool call (tool_choice required / a named tool) but ends as plain text is a
 * contract break. It becomes one explicit `required_tool_not_called` error instead of a
 * successful text answer. Truncation, refusals, errors and server-side tools pass through.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-required-tool-"));
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.OMNIROUTE_REQUIRED_TOOL_GUARD;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const originalFetch = globalThis.fetch;
const noopLog = () => ({ debug() {}, info() {}, warn() {}, error() {} });

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  delete process.env.OMNIROUTE_REQUIRED_TOOL_GUARD;
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const TOOLS = [
  {
    type: "function",
    function: { name: "get_time", parameters: { type: "object", properties: {} } },
  },
];

function chatReply(message, finish_reason = "stop") {
  return new Response(
    JSON.stringify({
      id: "c1",
      object: "chat.completion",
      created: 1,
      model: "gpt-4o-mini",
      choices: [{ index: 0, message: { role: "assistant", ...message }, finish_reason }],
      usage: { prompt_tokens: 5, completion_tokens: 3, total_tokens: 8 },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
const TEXT = { content: "I will not call the tool." };
const CALL = {
  content: null,
  tool_calls: [{ id: "call_1", type: "function", function: { name: "get_time", arguments: "{}" } }],
};

async function ask(toolChoice, reply, { env = true, apiKeyInfo = undefined } = {}) {
  if (env) process.env.OMNIROUTE_REQUIRED_TOOL_GUARD = "true";
  globalThis.fetch = async () => reply();
  const body = {
    model: "gpt-4o-mini",
    stream: false,
    messages: [{ role: "user", content: "what time is it" }],
    tools: TOOLS,
    ...(toolChoice === undefined ? {} : { tool_choice: toolChoice }),
  };
  return handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
    credentials: { apiKey: "sk-test", providerSpecificData: {} },
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({ accept: "application/json" }),
    },
    connectionId: "openai-conn",
    ...(apiKeyInfo ? { apiKeyInfo } : {}),
  });
}

test("flag on, tool_choice required, text-only answer: one explicit required_tool_not_called error", async () => {
  const result = await ask("required", () => chatReply(TEXT));
  assert.equal(result.success, false);
  assert.equal(result.status, 502);
  assert.equal(result.errorCode, "required_tool_not_called");
  assert.equal(result.errorType, "upstream_response_error");
});

test("flag on, a named tool forced, text-only answer: the same error", async () => {
  const result = await ask({ type: "function", function: { name: "get_time" } }, () =>
    chatReply(TEXT)
  );
  assert.equal(result.errorCode, "required_tool_not_called");
});

test("flag on, an API-key request (skills on by default) that ran no server tool is still checked", async () => {
  // With an API key the custom-skill executor is enabled by default; it ran nothing here,
  // so the text-only answer to a forced tool call is still a contract break.
  const result = await ask("required", () => chatReply(TEXT), {
    apiKeyInfo: { id: "key-required-tool", name: "required-tool-key" },
  });
  assert.equal(result.errorCode, "required_tool_not_called");
});

test("flag on, tool_choice required and the tool is called: success", async () => {
  const result = await ask("required", () => chatReply(CALL, "tool_calls"));
  assert.equal(result.success, true);
});

test("flag on, but tool_choice is auto or absent: a text answer is fine", async () => {
  assert.equal((await ask("auto", () => chatReply(TEXT))).success, true);
  assert.equal((await ask(undefined, () => chatReply(TEXT))).success, true);
});

test("flag on, a truncated or refused reply is passed through, not blamed on the tool", async () => {
  assert.equal((await ask("required", () => chatReply(TEXT, "length"))).success, true);
  assert.equal(
    (await ask("required", () => chatReply({ content: null, refusal: "no" }, "stop"))).success,
    true
  );
});

test("flag off (default): the text-only answer is delivered as before", async () => {
  const result = await ask("required", () => chatReply(TEXT), { env: false });
  assert.equal(result.success, true);
});

test("the guard reads Responses and Claude replies and spares server-side tools", async () => {
  const { detectRequiredToolNotCalled } = await import("../../open-sse/utils/requiredToolGuard.ts");
  const required = { tool_choice: "required", tools: TOOLS };
  const claudeAny = { tool_choice: { type: "any" }, tools: [{ name: "get_time" }] };
  const text = [{ type: "message", content: [{ type: "output_text", text: "hi" }] }];
  const responses = (output, status = "completed") => ({ object: "response", status, output });
  const reason = "required_tool_not_called";

  assert.equal(detectRequiredToolNotCalled(required, responses(text)), reason);
  assert.equal(detectRequiredToolNotCalled(required, responses([{ type: "function_call" }])), null);
  assert.equal(
    detectRequiredToolNotCalled(required, responses([{ type: "web_search_call" }])),
    null
  );
  assert.equal(detectRequiredToolNotCalled(required, responses(text, "incomplete")), null);

  const msg = (stop_reason, content) => ({ type: "message", stop_reason, content });
  const said = [{ type: "text", text: "hi" }];
  assert.equal(detectRequiredToolNotCalled(claudeAny, msg("end_turn", said)), reason);
  assert.equal(detectRequiredToolNotCalled(claudeAny, msg("max_tokens", said)), null);
  assert.equal(
    detectRequiredToolNotCalled(claudeAny, msg("end_turn", [{ type: "tool_use" }])),
    null
  );

  // OmniRoute ran the tool itself: the client never sees a tool call, and that is correct.
  assert.equal(detectRequiredToolNotCalled(required, responses(text), true), null);
  // A forced custom tool (Responses `tool_choice: {type: "custom"}`) is a forced client tool too.
  const forcedCustom = {
    tool_choice: { type: "custom", name: "runner" },
    tools: [{ type: "custom", name: "runner" }],
  };
  assert.equal(detectRequiredToolNotCalled(forcedCustom, responses(text)), reason);
  assert.equal(
    detectRequiredToolNotCalled(forcedCustom, responses([{ type: "custom_tool_call" }])),
    null
  );

  // No tools declared: tool_choice cannot be met, and the guard does not guess.
  assert.equal(detectRequiredToolNotCalled({ tool_choice: "required" }, responses(text)), null);
});

test("the new code is request-scoped (no provider breaker) and public (not projected to 'error')", async () => {
  const { isRequestScopedUpstreamFailure } =
    await import("../../open-sse/services/combo/comboPredicates.ts");
  const { buildErrorBody } = await import("../../open-sse/utils/error.ts");
  assert.equal(isRequestScopedUpstreamFailure({ code: "required_tool_not_called" }), true);
  const body = buildErrorBody(502, "x", undefined, { code: "required_tool_not_called" });
  assert.equal(body.error.code, "required_tool_not_called");
});

test("the failed turn is still billed: the provider's token counts stay in the usage rows", async () => {
  const result = await ask("required", () => chatReply(TEXT));
  assert.equal(result.errorCode, "required_tool_not_called");
  const db = core.getDbInstance();
  let row;
  for (let i = 0; i < 400 && !row; i += 1) {
    row = db
      .prepare("SELECT tokens_input, tokens_output FROM usage_history WHERE tokens_input = 5")
      .get();
    if (!row) await new Promise((resolve) => setImmediate(resolve));
  }
  assert.ok(row, "the provider's usage is recorded");
  assert.equal(row.tokens_output, 3);
});
