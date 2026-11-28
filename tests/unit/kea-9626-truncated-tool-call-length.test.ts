import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const dataDir = mkdtempSync(join(tmpdir(), "omniroute-kea-9626-data-"));
const homeDir = mkdtempSync(join(tmpdir(), "omniroute-kea-9626-home-"));
process.env.DATA_DIR = dataDir;
process.env.HOME = homeDir;

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

test.after(async () => {
  try {
    assert.ok(await waitForCallLogSaves(10_000), "call-log writes must finish before DB cleanup");
  } finally {
    resetDbInstance();
    rmSync(dataDir, { recursive: true, force: true });
    rmSync(homeDir, { recursive: true, force: true });
  }
});

const model = "gpt-5.4-nano";
const provider = "cheaperinference";
const upstreamUrl = "https://api.cheaperinference.com/v1/chat/completions";
const partialArguments = '{"city":"Sao';
const completeArguments = '{"city":"Sao Paulo"}';
const toolCall = {
  id: "call_weather",
  type: "function",
  function: { name: "lookup_weather", arguments: partialArguments },
};
const completion = { id: "chatcmpl-kea9626", created: 1, model };
const usage = { prompt_tokens: 25, completion_tokens: 8, total_tokens: 33 };

function makeUpstreamResponse(stream: boolean, finishReason: string, args: string): Response {
  const call = { ...toolCall, function: { ...toolCall.function, arguments: args } };
  const message = { role: "assistant", content: null, tool_calls: [call] };
  if (!stream) {
    return Response.json({
      ...completion,
      object: "chat.completion",
      choices: [{ index: 0, message, finish_reason: finishReason }],
      usage,
    });
  }

  const chunk = { ...completion, object: "chat.completion.chunk" };
  const frames = [
    {
      ...chunk,
      choices: [
        {
          index: 0,
          delta: { ...message, tool_calls: [{ index: 0, ...call }] },
          finish_reason: null,
        },
      ],
    },
    { ...chunk, choices: [{ index: 0, delta: {}, finish_reason: finishReason }] },
    { ...chunk, choices: [], usage },
  ];
  const sse = frames.map((frame) => `data: ${JSON.stringify(frame)}\n\n`).join("");
  return new Response(`${sse}data: [DONE]\n\n`, {
    headers: { "content-type": "text/event-stream" },
  });
}

test("KEA-9626: Chat Completions preserves incomplete finishes and normalizes other finishes with tools", async (t) => {
  const scenarios = [
    { name: "stream=false with upstream JSON", stream: false, upstreamStream: false },
    { name: "stream=true with upstream SSE", stream: true, upstreamStream: true },
    { name: "stream=false with buffered upstream SSE", stream: false, upstreamStream: true },
  ];
  const finishes = [
    { upstream: "length", expected: "length", args: partialArguments },
    { upstream: "content_filter", expected: "content_filter", args: partialArguments },
    { upstream: "stop", expected: "tool_calls", args: completeArguments },
    { upstream: "function_call", expected: "tool_calls", args: completeArguments },
    { upstream: "end_turn", expected: "tool_calls", args: completeArguments },
  ];
  const cases = finishes.flatMap((finish) =>
    scenarios.map((scenario) => ({ ...scenario, finish }))
  );
  for (const { name, stream, upstreamStream, finish } of cases) {
    await t.test(`${name} with ${finish.upstream}`, async (scenario) => {
      const body = {
        model,
        stream,
        max_tokens: 8,
        messages: [{ role: "user", content: "Look up the weather in Sao Paulo." }],
        tools: [
          {
            type: "function",
            function: {
              name: toolCall.function.name,
              parameters: {
                type: "object",
                properties: { city: { type: "string" } },
                required: ["city"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: toolCall.function.name } },
      };
      const fetchMock = scenario.mock.method(
        globalThis,
        "fetch",
        async (_url: Parameters<typeof fetch>[0], _init?: RequestInit) =>
          makeUpstreamResponse(upstreamStream, finish.upstream, finish.args)
      );
      const result = await handleChatCore({
        body: structuredClone(body),
        modelInfo: { provider, model, extendedContext: false },
        credentials: { apiKey: "test-key", providerSpecificData: {} },
        log: null,
        onCredentialsRefreshed: null,
        onRequestSuccess: null,
        onStreamFailure: null,
        onDisconnect: null,
        connectionId: null,
        userAgent: "node:test",
        comboName: null,
        clientRawRequest: {
          endpoint: "/v1/chat/completions",
          body,
          headers: new Headers({ accept: stream ? "text/event-stream" : "application/json" }),
        },
      });

      assert.equal(fetchMock.mock.callCount(), 1);
      const [url, init] = fetchMock.mock.calls[0].arguments;
      assert.equal(String(url), upstreamUrl);
      const request = JSON.parse(String(init?.body));
      assert.equal(request.model, model);
      assert.equal(request.stream, stream);
      assert.equal(request.max_completion_tokens ?? request.max_tokens, body.max_tokens);
      assert.ok(!(result instanceof Response) && result.success && result.response);
      assert.equal(result.response.status, 200);

      let receivedArguments: string;
      let finishReasons: string[];
      if (stream) {
        assert.match(result.response.headers.get("content-type") ?? "", /text\/event-stream/);
        const frames = (await result.response.text())
          .split("\n")
          .filter((line) => line.startsWith("data: ") && line !== "data: [DONE]")
          .map((line) => JSON.parse(line.slice(6)));
        const choices = frames.flatMap((frame) => frame.choices ?? []);
        receivedArguments = choices
          .map((choice) => choice.delta?.tool_calls?.[0]?.function?.arguments)
          .join("");
        finishReasons = choices.map((choice) => choice.finish_reason).filter(Boolean);
      } else {
        const payload = await result.response.json();
        const choice = payload.choices[0];
        receivedArguments = choice.message.tool_calls[0].function.arguments;
        finishReasons = [choice.finish_reason];
      }
      assert.equal(receivedArguments, finish.args);
      if (finish.expected === "tool_calls") {
        assert.deepEqual(JSON.parse(receivedArguments), { city: "Sao Paulo" });
      } else {
        assert.throws(() => JSON.parse(receivedArguments), SyntaxError);
      }
      assert.deepEqual(finishReasons, [finish.expected]);
    });
  }
});
