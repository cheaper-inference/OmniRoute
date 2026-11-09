import test from "node:test";
import assert from "node:assert/strict";
import { runNonStreamingProviderLeg } from "../../open-sse/handlers/chatCore/nonStreamingProviderLeg.ts";
import { baseInput, makeExecutorResult } from "./_helpers/nonStreamingProviderLegFixtures.ts";

// #18170 requires a Responses snapshot before an error frame can fail that
// response. Error-only CLI streams retain the generic 502 with their message.
for (const fallback of [false, true]) {
  for (const scenario of [
    { error: { message: "Devin CLI not found" }, status: 502, code: "upstream_error" },
    {
      error: { message: "Quota exhausted", code: "rate_limit_exceeded" },
      status: 429,
      code: "rate_limit_exceeded",
    },
  ]) {
    test(`Responses SSE error is preserved on ${fallback ? "empty-content fallback" : "initial send"}: ${scenario.code}`, async () => {
      let calls = 0;
      const result = await runNonStreamingProviderLeg(
        baseInput({
          provider: "gemini",
          model: "gemini-3-pro",
          allowModelFallback: fallback,
          clientHeaders: { "x-omniroute-allow-cross-version-fallback": "true" },
          executeProviderRequest: async () => {
            calls++;
            if (fallback && calls === 1) {
              return makeExecutorResult({
                choices: [{ message: { role: "assistant", content: "" }, finish_reason: "stop" }],
              });
            }
            return makeExecutorResult(
              `data: ${JSON.stringify({
                type: "response.created",
                response: {
                  id: "resp_error_fixture",
                  object: "response",
                  status: "in_progress",
                  model: "gemini-3-pro",
                  output: [],
                },
              })}\n\ndata: ${JSON.stringify({ error: scenario.error })}\n\n`,
              200,
              {
                "content-type": "text/event-stream",
              }
            );
          },
        })
      );
      assert.equal(calls, fallback ? 2 : 1);
      assert.equal(result.kind, "error");
      if (result.kind !== "error") return;
      assert.equal(result.result.status, scenario.status);
      assert.equal(result.result.errorCode, scenario.code);
      assert.notEqual(result.result.errorCode, "invalid_sse_payload");
      assert.equal(result.result.rawMessage, scenario.error.message);
      assert.deepEqual(result.result.upstreamErrorBody?.error, scenario.error);
      assert.equal(result.receipt.httpStatus, scenario.status);
      assert.equal(result.receipt.termination, "provider_error");
    });

    test(`error-only SSE surfaces its message as 502 on ${fallback ? "empty-content fallback" : "initial send"}: ${scenario.code}`, async () => {
      let calls = 0;
      const result = await runNonStreamingProviderLeg(
        baseInput({
          provider: "gemini",
          model: "gemini-3-pro",
          allowModelFallback: fallback,
          clientHeaders: { "x-omniroute-allow-cross-version-fallback": "true" },
          executeProviderRequest: async () => {
            calls++;
            if (fallback && calls === 1) {
              return makeExecutorResult({
                choices: [{ message: { role: "assistant", content: "" }, finish_reason: "stop" }],
              });
            }
            return makeExecutorResult(
              `data: ${JSON.stringify({ error: scenario.error })}\n\n`,
              200,
              { "content-type": "text/event-stream" }
            );
          },
        })
      );
      assert.equal(calls, fallback ? 2 : 1);
      assert.equal(result.kind, "error");
      if (result.kind !== "error") return;
      assert.equal(result.result.status, 502);
      assert.equal(result.result.errorCode, "invalid_sse_payload");
      assert.equal(result.result.errorType, "invalid_sse_payload");
      assert.equal(result.result.rawMessage, scenario.error.message);
      assert.equal(result.result.error, scenario.error.message);
      const body = await result.result.response.json();
      assert.equal(body.error.message, scenario.error.message);
      // The internal parser category is projected to the public 502 identifier.
      assert.equal(body.error.code, "bad_gateway");
      assert.equal(result.receipt.httpStatus, 502);
      assert.equal(result.receipt.termination, "provider_error");
    });
  }
}
