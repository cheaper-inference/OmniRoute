import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";
import { finalizeTranslatedRequest } from "../../open-sse/handlers/chatCore/translatedRequestFinalize.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { getPendingById, getPendingRequests } from "../../src/lib/usage/usageHistory.ts";

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

function chatPair(callId = privateCallId, outputId = callId, args: unknown = "{}") {
  return [
    { role: "user", content: "synthetic request" },
    {
      role: "assistant",
      content: null,
      tool_calls: [{ id: callId, type: "function", function: { name: "lookup", arguments: args } }],
    },
    { role: "tool", tool_call_id: outputId, content: "  exact output \n " },
  ];
}

async function refused(body: Record<string, unknown>, native = false, provider = "codex") {
  await seedConnection(provider, {
    apiKey: "synthetic-integrity-key",
    providerSpecificData: { planType: "plus" },
  });
  let attempts = 0;
  globalThis.fetch = async () => {
    attempts++;
    return new Response(
      'data: {"type":"response.completed","response":{"id":"resp_ok","object":"response","status":"completed","output":[]}}\n\ndata: [DONE]\n\n',
      { status: 200, headers: { "content-type": "text/event-stream" } }
    );
  };
  const pendingIds = [...getPendingById().keys()];
  const counts = structuredClone(getPendingRequests());
  const response = await handleChat(
    buildRequest({
      url: native ? "http://localhost/v1/responses" : "http://localhost/v1/chat/completions",
      body: { model: `${provider}/gpt-5.6-sol`, ...body },
    })
  );
  const text = await response.text();
  assert.equal(response.status, 400);
  assert.equal(attempts, 0, "invalid history must never reach transport");
  assert.deepEqual([...getPendingById().keys()], pendingIds, "no pending owner may leak");
  assert.deepEqual(
    structuredClone(getPendingRequests()),
    counts,
    "pending counts must be unchanged"
  );
  assert.doesNotMatch(text, /private_argument|call_private_do_not_echo|exact output/);
  return text;
}

for (const stream of [false, true]) {
  test(`handler contains post-strip finalizer rejection and retires its pending owner stream=${stream}`, async () => {
    await settingsDb.updateSettings({ responsesPreviousResponseIdMode: "strip" });
    await refused(
      {
        stream,
        previous_response_id: "resp_previous",
        input: [
          { type: "custom_tool_call_output", call_id: privateCallId, output: "private_argument" },
        ],
      },
      true,
      "chatgpt-web-codex"
    );
  });

  test(`Chat pending history returns 400 without fabricated completion stream=${stream}`, async () => {
    const messages = chatPair();
    messages.pop();
    assert.match(await refused({ stream, messages }), /missing its output/i);
  });

  test(`Chat deprecated malformed function_call arguments fail closed stream=${stream}`, async () => {
    assert.match(
      await refused({
        stream,
        messages: [
          { role: "assistant", function_call: { name: "lookup", arguments: malformedArguments } },
          { role: "function", name: "lookup", content: "ok" },
        ],
      }),
      /malformed arguments/i
    );
  });

  test(`Chat malformed arguments never echo opaque ids stream=${stream}`, async () => {
    await refused({ stream, messages: chatPair(privateCallId, privateCallId, malformedArguments) });
  });

  test(`Chat orphan output never echoes opaque ids stream=${stream}`, async () => {
    await refused({
      stream,
      messages: [{ role: "tool", tool_call_id: privateCallId, content: "private_argument" }],
    });
  });

  test(`Chat mixed compacted orphan plus valid pair is explicitly refused stream=${stream}`, async () => {
    const messages = chatPair();
    messages.splice(1, 0, {
      role: "tool",
      tool_call_id: "compacted_orphan",
      content: "unrelated output",
    });
    await refused({ stream, messages });
  });

  for (const [label, callId, outputId] of [
    ["trim collision", " exact-id", "exact-id "],
    ["clamp collision", "x".repeat(64) + "A", "x".repeat(64) + "B"],
    ["overlong pair", "x".repeat(65), "x".repeat(65)],
    ["blank ids", " ", " "],
    ["control ids", "call\nid", "call\nid"],
  ]) {
    test(`Chat rejects ${label} before normalization stream=${stream}`, async () => {
      await refused({ stream, messages: chatPair(callId, outputId) });
    });
  }

  test(`Chat valid spaced ids and JSON scalar/array bytes reach wire unchanged stream=${stream}`, async () => {
    await seedConnection("codex", {
      apiKey: "synthetic-integrity-key",
      providerSpecificData: { planType: "plus" },
    });
    for (const args of ['  { "q" : 1 }  ', " [1, 2] ", " 42 ", " null ", ' "text" ', " true "]) {
      const messages = chatPair("  exact-id  ", "  exact-id  ", args);
      let wire: Record<string, unknown> | undefined;
      let attempts = 0;
      globalThis.fetch = async (_url, init) => {
        attempts++;
        wire = JSON.parse(String(init?.body));
        return new Response(
          'data: {"type":"response.completed","response":{"id":"resp_ok","object":"response","status":"completed","output":[]}}\n\ndata: [DONE]\n\n',
          { status: 200, headers: { "content-type": "text/event-stream" } }
        );
      };
      const response = await handleChat(
        buildRequest({ body: { model: "codex/gpt-5.6-sol", stream, messages } })
      );
      await response.text();
      assert.equal(response.status, 200);
      assert.equal(attempts, 1);
      const input = wire?.input as Array<Record<string, unknown>>;
      assert.equal(input.find((i) => i.type === "function_call")?.call_id, "  exact-id  ");
      assert.equal(input.find((i) => i.type === "function_call")?.arguments, args);
      assert.equal(input.find((i) => i.type === "function_call_output")?.call_id, "  exact-id  ");
      assert.equal(
        input.find((i) => i.type === "function_call_output")?.output,
        "  exact output \n "
      );
    }
  });
}
