import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "codex-wire-review-"));
process.env.DATA_DIR = directory;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { openaiToOpenAIResponsesRequest } =
  await import("../../open-sse/translator/request/openai-responses/toResponses.ts");
const { normalizeUpstreamRequestParams } =
  await import("../../open-sse/handlers/chatCore/upstreamRequestParams.ts");
const { resolveExecutionCredentials } =
  await import("../../open-sse/handlers/chatCore/executionCredentials.ts");
const { CodexExecutor } = await import("../../open-sse/executors/codex.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
type JsonRecord = Record<string, unknown>;
const model = "gpt-5.6-sol";
const executor = new CodexExecutor();
const streamOptions = {
  reasoning_summary_delivery: "sequential_cutoff",
  include_usage: true,
  unrelated_option: "never forward",
};

function normalize(body: JsonRecord, provider: string) {
  normalizeUpstreamRequestParams({
    translatedBody: body,
    modelSupportsMaxTokens: true,
    provider,
    model,
    targetFormat: "openai-responses",
    providerSpecificData: {},
  });
}
function credentials(requestBody: JsonRecord, modelInfo?: JsonRecord) {
  return resolveExecutionCredentials({
    credentials: { providerSpecificData: {} },
    nativeCodexPassthrough: false,
    endpointPath: "/v1/chat/completions",
    targetFormat: "openai-responses",
    provider: "codex",
    ccSessionId: null,
    requestBody,
    modelInfo,
  });
}
function translate(body: JsonRecord, provider: string) {
  return openaiToOpenAIResponsesRequest(model, body, true, { _provider: provider }) as JsonRecord;
}

test.after(async () => {
  const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
  await waitForCallLogSaves(10_000);
  resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

for (const native of [true, false]) {
  test(`summary delivery survives the request pipeline, native=${native}`, () => {
    const request = {
      model,
      messages: [{ role: "user", content: "Synthetic fixture" }],
      stream_options: streamOptions,
    };
    const body = native ? { ...request, input: [] } : translate(request, "codex");
    normalize(body, "codex");
    const wire = executor.transformRequest(model, body, true, {
      providerSpecificData: {},
    });
    assert.deepEqual(wire.stream_options, {
      reasoning_summary_delivery: "sequential_cutoff",
    });
    const compact = executor.transformRequest(model, body, true, {
      requestEndpointPath: "/responses/compact",
      providerSpecificData: {},
    });
    assert.equal(compact.stream_options, undefined);
  });
}

for (const provider of ["zed-hosted", "openai", "azure-ai"]) {
  test(`${provider} translation never receives Codex summary delivery or deferred tools`, () => {
    const result = translate(
      {
        messages: [{ role: "user", content: "Synthetic fixture" }],
        stream_options: streamOptions,
        tools: [{ type: "function", function: { name: "fixture", defer_loading: true } }],
      },
      provider
    );
    assert.equal(result.stream_options, undefined);
    assert.equal((result.tools as JsonRecord[])[0].defer_loading, undefined);
    const native: JsonRecord = { stream_options: streamOptions };
    normalize(native, provider);
    assert.equal(native.stream_options, undefined);
  });
}

for (const defer_loading of [true, false]) {
  test(`translated Codex tool preserves defer_loading=${defer_loading}`, () => {
    const result = translate(
      {
        messages: [{ role: "user", content: "Synthetic fixture" }],
        tools: [{ type: "function", function: { name: "fixture", defer_loading } }],
      },
      "codex"
    );
    const wire = executor.transformRequest(model, result, true, { providerSpecificData: {} });
    assert.equal((wire.tools as JsonRecord[])[0].defer_loading, defer_loading);
  });
}

for (const effort of [32768, "max", "FutureTier-V2"]) {
  for (const modelInfo of [undefined, { model }]) {
    test(`static model retains requested effort ${effort}, metadata=${Boolean(modelInfo)}`, () => {
      const request = { reasoning_effort: effort };
      const body = translate(request, "codex");
      const wire = executor.transformRequest(model, body, true, credentials(request, modelInfo));
      assert.equal((wire.reasoning as JsonRecord).effort, effort);
    });
  }
}

for (const stream of [false, true]) {
  test(`summary delivery does not suppress reactive auth refresh, stream=${stream}`, async () => {
    const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
    const { createProviderConnection, deleteProviderConnection } =
      await import("../../src/lib/db/providers.ts");
    const originalFetch = globalThis.fetch;
    const connection = await createProviderConnection({
      provider: "codex",
      authType: "oauth",
      isActive: true,
      accessToken: "synthetic-old-access",
      refreshToken: `synthetic-old-refresh-${stream}`,
      expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
      providerSpecificData: { autoFetchModels: false },
    });
    let rotations = 0;
    let calls = 0;
    globalThis.fetch = async (input, init) => {
      if (String(input).includes("auth.openai.com")) {
        rotations++;
        return Response.json({
          access_token: "synthetic-rotated-access",
          refresh_token: "synthetic-rotated-refresh",
          expires_in: 3600,
        });
      }
      calls++;
      const body = JSON.parse(String(init?.body)) as JsonRecord;
      assert.deepEqual(body.stream_options, { reasoning_summary_delivery: "sequential_cutoff" });
      if (calls === 1) {
        return Response.json(
          { error: { message: "synthetic expired access token" } },
          { status: 401 }
        );
      }
      assert.equal(
        new Headers(init?.headers).get("authorization"),
        "Bearer synthetic-rotated-access"
      );
      const response = {
        id: "resp_synthetic",
        object: "response",
        status: "completed",
        model,
        output: [
          { type: "message", role: "assistant", content: [{ type: "output_text", text: "ok" }] },
        ],
        usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
      };
      return stream
        ? new Response(
            `event: response.completed\ndata: ${JSON.stringify({ type: "response.completed", response })}\n\n`,
            { headers: { "content-type": "text/event-stream" } }
          )
        : Response.json(response);
    };
    try {
      const result = await handleChatCore({
        body: { model, input: "Synthetic fixture", stream, stream_options: streamOptions },
        modelInfo: { provider: "codex", model, extendedContext: false },
        credentials: { ...connection, connectionId: connection.id },
        connectionId: connection.id,
        log: { debug() {}, info() {}, warn() {}, error() {} },
        clientRawRequest: { endpoint: "/v1/responses", headers: new Headers(), body: {} },
      });
      if (result.response && !result.response.bodyUsed) await result.response.text();
      assert.equal(result.response?.status, 200);
      assert.equal(rotations, 1);
      assert.equal(calls, 2);
    } finally {
      globalThis.fetch = originalFetch;
      await deleteProviderConnection(connection.id);
    }
  });
}

test("an explicit thinking policy still owns the translated effort", async () => {
  const { applyCodexReasoningSelection } =
    await import("../../open-sse/executors/codex/reasoningPolicy.ts");
  const request = { reasoning_effort: "max" };
  const execution = credentials(request);
  const metadata = (execution.providerSpecificData as JsonRecord)._omnirouteCodexThinking;
  const body: JsonRecord = { model, reasoning: { effort: "low" } };
  applyCodexReasoningSelection(model, body, metadata, "medium", false);
  assert.equal((body.reasoning as JsonRecord).effort, "low");
});
