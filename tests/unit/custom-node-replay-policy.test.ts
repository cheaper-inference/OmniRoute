import assert from "node:assert/strict";
import test from "node:test";

import {
  isCustomOpenAICompatibleProvider,
  isDefiniteCustomNodeRejection,
  markAmbiguousCustomNodeFailure,
} from "../../src/sse/handlers/chat/customNodeReplayPolicy.ts";
import { isNoReplayResponse } from "../../open-sse/utils/noReplayResponse.ts";
import {
  PROXY_FETCH_NO_REPLAY,
  canResendAfterTransportError,
  requestHasNonReplayableBody,
} from "../../open-sse/utils/proxyFetchTransportSupport.ts";

const transportError = (code: string) =>
  Object.assign(new TypeError("fetch failed"), { cause: Object.assign(new Error(code), { code }) });

test("only openai-compatible-* provider ids are custom OpenAI-compatible nodes", () => {
  assert.equal(isCustomOpenAICompatibleProvider("openai-compatible-chat-abc"), true);
  assert.equal(isCustomOpenAICompatibleProvider("openai"), false);
  assert.equal(isCustomOpenAICompatibleProvider("anthropic-compatible-abc"), false);
  assert.equal(isCustomOpenAICompatibleProvider(undefined), false);
});

test("definite rejections keep normal replay; ambiguous outcomes do not", () => {
  const upstreamBody = { error: { message: "x" } };
  const definite = [
    { status: 429, upstreamErrorBody: upstreamBody },
    { status: 400, upstreamErrorBody: upstreamBody },
    { status: 401 },
    { status: 403, upstreamHeaders: new Headers() },
    { status: 404, upstreamErrorBody: upstreamBody },
    { status: 413, upstreamErrorBody: "payload too large" },
    { status: 500, upstreamErrorBody: upstreamBody },
    { status: 503, upstreamHeaders: new Headers() },
    { status: 502, error: "[502]: fetch failed (cause: ECONNREFUSED: connect ECONNREFUSED x)" },
    { status: 502, originalError: transportError("ENOTFOUND") },
  ];
  for (const result of definite) {
    assert.equal(isDefiniteCustomNodeRejection(result), true, JSON.stringify(result));
  }
  const ambiguous = [
    { status: 502, error: "[502]: fetch failed (cause: UND_ERR_SOCKET: other side closed)" },
    { status: 502, originalError: transportError("ECONNRESET") },
    {
      status: 502,
      errorCode: "invalid_json_payload",
      error: "Invalid JSON response from provider",
    },
    { status: 502, upstreamErrorBody: "   " },
    { status: 504, upstreamErrorBody: upstreamBody },
    { status: 408, upstreamErrorBody: upstreamBody },
    { status: 200 },
    {},
  ];
  for (const result of ambiguous) {
    assert.equal(isDefiniteCustomNodeRejection(result), false, JSON.stringify(result));
  }
});

test("markAmbiguousCustomNodeFailure marks only ambiguous custom-node failures", () => {
  const ambiguous = () => ({ success: false, status: 502, response: new Response("x") });
  const custom = ambiguous();
  markAmbiguousCustomNodeFailure("openai-compatible-chat-abc", custom);
  assert.equal(isNoReplayResponse(custom.response), true);

  const otherProvider = ambiguous();
  markAmbiguousCustomNodeFailure("openai", otherProvider);
  assert.equal(isNoReplayResponse(otherProvider.response), false);

  const rejected = { success: false, status: 429, response: new Response("x") };
  markAmbiguousCustomNodeFailure("openai-compatible-chat-abc", rejected);
  assert.equal(isNoReplayResponse(rejected.response), false);

  const success = { success: true, status: 200, response: new Response("x") };
  markAmbiguousCustomNodeFailure("openai-compatible-chat-abc", success);
  assert.equal(isNoReplayResponse(success.response), false);
});

test("PROXY_FETCH_NO_REPLAY resends only a transport error raised before sending", () => {
  const url = "http://127.0.0.1:1/v1/chat/completions";
  const marked = { method: "POST", body: "{}", [PROXY_FETCH_NO_REPLAY]: true };
  assert.equal(requestHasNonReplayableBody(url, marked), false, "a string body stays buffered");
  assert.equal(canResendAfterTransportError(url, marked, transportError("ECONNREFUSED")), true);
  assert.equal(canResendAfterTransportError(url, marked, transportError("ENOTFOUND")), true);
  assert.equal(canResendAfterTransportError(url, marked, transportError("ECONNRESET")), false);
  assert.equal(canResendAfterTransportError(url, marked, transportError("UND_ERR_SOCKET")), false);
  assert.equal(canResendAfterTransportError(url, marked, transportError("ETIMEDOUT")), false);
});
