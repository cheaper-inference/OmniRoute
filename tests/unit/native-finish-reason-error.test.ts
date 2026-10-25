import { test } from "node:test";
import assert from "node:assert/strict";

import { runNonStreamingProviderLeg } from "../../open-sse/handlers/chatCore/nonStreamingProviderLeg.ts";
import { baseInput, makeExecutorResult } from "./_helpers/nonStreamingProviderLegFixtures.ts";

// Non-streaming counterpart of the passthrough native_finish_reason check: an
// HTTP-200 body whose only choice is empty and flagged with an upstream error in
// native_finish_reason must surface as a 502 (so account/combo fallback kicks in),
// never as an empty 200.

function errorMessage(result: Awaited<ReturnType<typeof runNonStreamingProviderLeg>>): string {
  if (result.kind !== "error") return "";
  const body = result.result as unknown as { error?: unknown };
  const err = body.error;
  if (typeof err === "string") return err;
  if (err && typeof err === "object" && typeof (err as { message?: unknown }).message === "string")
    return (err as { message: string }).message;
  return "";
}

test("non-stream JSON with native_finish_reason error and empty content -> 502", async () => {
  const result = await runNonStreamingProviderLeg(
    baseInput({
      provider: "openrouter",
      executeProviderRequest: async () =>
        makeExecutorResult({
          id: "gen-1",
          choices: [
            {
              message: { role: "assistant", content: "" },
              finish_reason: "stop",
              native_finish_reason: "network_error",
            },
          ],
        }),
    })
  );

  assert.equal(result.kind, "error");
  if (result.kind !== "error") return;
  assert.equal(result.result.status, 502);
  const message = errorMessage(result);
  assert.ok(message.length > 0, "error body carries a message");
  assert.ok(!message.includes("at /"), "no stack trace in the error body");
});

test("buffered SSE with native_finish_reason error and no content -> 502", async () => {
  const sseBody =
    'data: {"id":"gen-2","choices":[{"delta":{},"index":0,"finish_reason":"stop","native_finish_reason":"network_error"}]}\n\n' +
    "data: [DONE]\n\n";
  const result = await runNonStreamingProviderLeg(
    baseInput({
      provider: "openrouter",
      executeProviderRequest: async () => ({
        response: {
          ok: true,
          status: 200,
          statusText: "OK",
          headers: new Headers({ "content-type": "text/event-stream" }),
          text: async () => sseBody,
          body: null,
        } as unknown as Response,
        url: "https://openrouter.ai/api/v1/chat/completions",
        headers: {},
        transformedBody: null,
      }),
    })
  );

  assert.equal(result.kind, "error");
  if (result.kind !== "error") return;
  assert.equal(result.result.status, 502);
});

test("non-stream JSON with native_finish_reason error but real content passes through", async () => {
  const result = await runNonStreamingProviderLeg(
    baseInput({
      provider: "openrouter",
      executeProviderRequest: async () =>
        makeExecutorResult({
          id: "gen-3",
          choices: [
            {
              message: { role: "assistant", content: "partial answer" },
              finish_reason: "stop",
              native_finish_reason: "network_error",
            },
          ],
          usage: { prompt_tokens: 2, completion_tokens: 2, total_tokens: 4 },
        }),
    })
  );

  assert.equal(result.kind, "ok");
  if (result.kind !== "ok") return;
  assert.equal(result.response.choices[0].message.content, "partial answer");
});
