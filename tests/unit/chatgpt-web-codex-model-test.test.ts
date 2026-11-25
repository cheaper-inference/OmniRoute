// The dashboard test message for a ChatGPT Web (Codex) connection must reach the executor as the
// native Codex turn it serves, and the probe policy must let it through because every turn runs
// in a ChatGPT Temporary Chat.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cgpt-codex-model-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const runner = await import("../../src/lib/api/modelTestRunner.ts");
const { chatProbeLeavesNoConversation } =
  await import("../../src/lib/providers/chatProbePolicy.ts");
const { chatProbeIsolationOf } = await import("../../open-sse/executors/chatProbeIsolation.ts");
const { ChatGptWebCodexExecutor } = await import("../../open-sse/executors/chatgpt-web-codex.ts");
const { buildChatGptWebCodexProbe } =
  await import("../../open-sse/executors/chatgpt-web-codex/probe.ts");
const { CHATGPT_TEMPORARY_CHAT_URL } =
  await import("../../open-sse/vendor/codex-chatgpt-web/chatgpt-session.ts");
const { isVerifiedNativeCodexRequest } = await import("../../open-sse/config/codexIdentity.ts");
const { shouldUseNativeCodexPassthrough } =
  await import("../../open-sse/handlers/chatCore/passthroughHelpers.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { parseRequest } =
  await import("../../open-sse/vendor/codex-chatgpt-web/responses/parser.ts");
const { extractChatGptTurnUserRevision } =
  await import("../../open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/environment.ts");

const originalExecute = ChatGptWebCodexExecutor.prototype.execute;

test.after(() => {
  ChatGptWebCodexExecutor.prototype.execute = originalExecute;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the executor's probe isolation is pinned to the Temporary Chat page every turn uses", async () => {
  assert.equal(chatProbeIsolationOf(new ChatGptWebCodexExecutor()), "temporary-chat");
  assert.equal(new URL(CHATGPT_TEMPORARY_CHAT_URL).searchParams.get("temporary-chat"), "true");
  assert.equal(await chatProbeLeavesNoConversation("chatgpt-web-codex"), true);
});

test("the probe is a verified native Codex turn with a current-turn user message", () => {
  const { body, headers } = buildChatGptWebCodexProbe("chatgpt-web-codex/luna", "What is 1 + 1?");

  assert.equal(isVerifiedNativeCodexRequest(body, headers), true);
  assert.equal(
    shouldUseNativeCodexPassthrough({
      provider: "chatgpt-web-codex",
      sourceFormat: FORMATS.OPENAI_RESPONSES,
      endpointPath: "/v1/responses",
      body,
      headers,
    }),
    true
  );
  assert.deepEqual(extractChatGptTurnUserRevision(parseRequest(body as never)), [
    { type: "input_text", text: "What is 1 + 1?" },
  ]);
  const second = buildChatGptWebCodexProbe("chatgpt-web-codex/luna", "What is 1 + 1?");
  assert.notEqual(
    JSON.stringify(second.body.client_metadata),
    JSON.stringify(body.client_metadata),
    "every probe is its own thread and turn"
  );
});

test("a test message reaches the executor as a native Codex /v1/responses turn", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "chatgpt-web-codex",
    authType: "apikey",
    name: "cgpt-codex-model-test",
    apiKey: "cgpt-codex-model-test-credential",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { solAvailable: false, proAvailable: false },
  });
  assert.ok(connection);
  const seen: Array<{ format: unknown; passthrough: unknown; originator: string | null }> = [];
  ChatGptWebCodexExecutor.prototype.execute = async function (input) {
    const body = input.body as Record<string, unknown>;
    seen.push({
      format: input.clientResponseFormat,
      passthrough: body._nativeCodexPassthrough,
      originator: new Headers(input.clientHeaders as HeadersInit).get("originator"),
    });
    const response = {
      id: "resp_cgpt_codex_probe",
      object: "response",
      status: "completed",
      model: "chatgpt-web-codex/luna",
      output: [
        {
          type: "message",
          role: "assistant",
          content: [{ type: "output_text", text: "2" }],
        },
      ],
      output_text: "2",
    };
    return {
      response: input.stream
        ? new Response(
            `event: response.completed\ndata: ${JSON.stringify({ type: "response.completed", response })}\n\n`,
            { status: 200, headers: { "Content-Type": "text/event-stream" } }
          )
        : Response.json(response),
      url: CHATGPT_TEMPORARY_CHAT_URL,
      headers: {},
      transformedBody: input.body,
    };
  } as typeof originalExecute;

  const result = await runner.runSingleModelTest({
    providerId: "chatgpt-web-codex",
    modelId: "chatgpt-web-codex/luna",
    connectionId: String(connection.id),
    prompt: "What is 1 + 1? Reply with only the number.",
    streamChat: true,
  });

  assert.equal(result.status, "ok", JSON.stringify(result));
  assert.equal(result.responseText, "2");
  assert.equal(seen.length, 1);
  assert.equal(seen[0].format, FORMATS.OPENAI_RESPONSES);
  assert.equal(seen[0].passthrough, true);
  assert.equal(seen[0].originator, "codex_omniroute_probe");
});
