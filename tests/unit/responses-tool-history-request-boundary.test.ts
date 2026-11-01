import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";
import { finalizeTranslatedRequest } from "../../open-sse/handlers/chatCore/translatedRequestFinalize.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

const harness = await createChatPipelineHarness("responses-tool-history-boundary");
const { handleChat, buildRequest, resetStorage, seedConnection, settingsDb } = harness;

const malformedArguments = "{private_argument:do-not-echo}";
const privateCallId = "call_private_do_not_echo";

async function post(input: unknown[], stream: boolean) {
  await seedConnection("codex", {
    apiKey: "synthetic-codex-token",
    providerSpecificData: { planType: "plus" },
  });
  let upstreamAttempts = 0;
  globalThis.fetch = async () => {
    upstreamAttempts++;
    throw new Error("upstream must not be reached");
  };
  const response = await handleChat(
    buildRequest({
      url: "http://localhost/v1/responses",
      body: { model: "codex/gpt-5.6-sol", input, stream },
    })
  );
  const text = await response.text();
  return { response, text, upstreamAttempts };
}

async function postContinuation(stream: boolean) {
  await settingsDb.updateSettings({ responsesPreviousResponseIdMode: "preserve" });
  await seedConnection("codex", {
    apiKey: "synth...en",
    providerSpecificData: { planType: "plus" },
  });
  let upstreamAttempts = 0;
  let wireBody: Record<string, unknown> | undefined;
  globalThis.fetch = async (_input, init) => {
    upstreamAttempts++;
    wireBody = JSON.parse(String(init?.body));
    return new Response(
      'data: {"type":"response.completed","response":{"id":"resp_ok","object":"response","status":"completed","output":[]}}\n\ndata: [DONE]\n\n',
      { status: 200, headers: { "content-type": "text/event-stream" } }
    );
  };
  const input = [
    { type: "custom_tool_call_output", call_id: "continued-call", output: "continued result" },
  ];
  const response = await handleChat(
    buildRequest({
      url: "http://localhost/v1/responses",
      body: { model: "codex/gpt-5.6-sol", previous_response_id: "resp_previous", input, stream },
    })
  );
  const text = await response.text();
  return { response, text, upstreamAttempts, wireBody, input };
}

test.beforeEach(async () => resetStorage());
test.after(async () => harness.cleanup());

for (const stream of [false, true]) {
  test(`malformed historical arguments fail locally for stream=${stream}`, async () => {
    const result = await post(
      [
        {
          type: "function_call",
          call_id: privateCallId,
          name: "lookup",
          arguments: malformedArguments,
        },
        { type: "function_call_output", call_id: privateCallId, output: "ok" },
      ],
      stream
    );
    assert.equal(result.response.status, 400);
    assert.equal(result.upstreamAttempts, 0);
    assert.doesNotMatch(result.text, /private_argument|call_private_do_not_echo/);
    assert.match(result.text, /malformed arguments/i);
  });

  test(`orphaned output fails locally for stream=${stream}`, async () => {
    const result = await post(
      [{ type: "function_call_output", call_id: privateCallId, output: "private output" }],
      stream
    );
    assert.equal(result.response.status, 400);
    assert.equal(result.upstreamAttempts, 0);
    assert.doesNotMatch(result.text, /private output|call_private_do_not_echo/);
    assert.match(result.text, /does not match a local tool call/i);
  });
}

test("missing local output fails closed before transport", async () => {
  const result = await post(
    [{ type: "function_call", call_id: privateCallId, name: "lookup", arguments: "{}" }],
    false
  );
  assert.equal(result.response.status, 400);
  assert.equal(result.upstreamAttempts, 0);
  assert.doesNotMatch(result.text, /call_private_do_not_echo/);
  assert.match(result.text, /missing its output/i);
});

for (const stream of [false, true]) {
  test(`finalizer rejects continuation output after strip policy for stream=${stream}`, () => {
    const translatedBody = {
      model: "gpt-5.6-sol",
      previous_response_id: "resp_previous",
      input: [
        { type: "custom_tool_call_output", call_id: "continued-call", output: "continued result" },
      ],
      stream,
    };
    assert.throws(
      () =>
        finalizeTranslatedRequest({
          translatedBody,
          body: translatedBody,
          provider: "codex",
          alias: null,
          effectiveModel: "gpt-5.6-sol",
          sourceFormat: FORMATS.OPENAI_RESPONSES,
          targetFormat: FORMATS.OPENAI_RESPONSES,
          isClaudePassthrough: false,
          credentials: { providerSpecificData: { planType: "plus" } },
          previousResponseIdMode: "strip",
        }),
      (error: unknown) => {
        const requestError = error as Error & { statusCode?: number; errorType?: string };
        assert.equal(requestError.statusCode, 400);
        assert.equal(requestError.errorType, "invalid_tool_call_output");
        assert.match(requestError.message, /does not match a local tool call/i);
        return true;
      }
    );
  });
}

for (const stream of [false, true]) {
  test(`continuation output reaches wire when final policy preserves ownership for stream=${stream}`, async () => {
    const preserved = await postContinuation(stream);
    assert.equal(preserved.response.status, 200);
    assert.equal(preserved.upstreamAttempts, 1);
    assert.equal(preserved.wireBody?.previous_response_id, "resp_previous");
    assert.deepEqual(preserved.wireBody?.input, preserved.input);
  });
}

for (const stream of [false, true]) {
  test(`valid function and custom pairs preserve executor wire bytes for stream=${stream}`, async () => {
    await seedConnection("codex", {
      apiKey: "synth...en",
      providerSpecificData: { planType: "plus" },
    });
    const input = [
      { type: "function_call", call_id: "call_ok", name: "lookup", arguments: "{}" },
      {
        type: "custom_tool_call",
        call_id: "custom_ok",
        name: "apply_patch",
        input: "raw; not JSON",
      },
      { type: "function_call_output", call_id: "call_ok", output: "function result" },
      { type: "custom_tool_call_output", call_id: "custom_ok", output: "custom result" },
    ];
    let wireBody: Record<string, unknown> | undefined;
    globalThis.fetch = async (_input, init) => {
      wireBody = JSON.parse(String(init?.body));
      if (stream) {
        return new Response(
          'data: {"type":"response.completed","response":{"id":"resp_ok","object":"response","status":"completed","output":[]}}\n\ndata: [DONE]\n\n',
          { status: 200, headers: { "content-type": "text/event-stream" } }
        );
      }
      return new Response(
        JSON.stringify({ id: "resp_ok", object: "response", status: "completed", output: [] }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        }
      );
    };
    const response = await handleChat(
      buildRequest({
        url: "http://localhost/v1/responses",
        body: { model: "codex/gpt-5.6-sol", input, stream },
      })
    );
    const responseText = await response.text();
    assert.equal(response.status, 200);
    assert.deepEqual(wireBody?.input, input);
    assert.equal(
      wireBody?.stream,
      true,
      "Codex executor always uses its streaming upstream transport"
    );
    assert.match(responseText, stream ? /response\.completed/ : /"status":"completed"/);
  });
}
