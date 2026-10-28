// #16442 — a Gemini 429 whose retry delay lives ONLY in the structured
// google.rpc.RetryInfo detail (no "retry in Ns" text in error.message, no
// Retry-After header) was dropped twice: parseUpstreamError never read
// error.details[].retryDelay, and createErrorResult dropped the parsed
// retryAfterMs instead of relaying it on the rebuilt response — so
// markAccountUnavailable → checkFallbackError → detectRetryHint found no
// header, no JSON body (errorStr is the extracted message text), and no
// text hint, and the model lock fell back to the 3s API-key base cooldown
// while the per-connection limiter paused for the real window (1104s).
// The router then re-selected the model into the paused queue and stalled
// 30s per request for the whole upstream window.
import test from "node:test";
import assert from "node:assert/strict";

const errorModule = await import("../../open-sse/utils/error.ts");

const GEMINI_RETRYINFO_BODY = JSON.stringify({
  error: {
    code: 429,
    message: "Resource has been exhausted (e.g. check quota).",
    status: "RESOURCE_EXHAUSTED",
    details: [
      {
        "@type": "type.googleapis.com/google.rpc.RetryInfo",
        retryDelay: "1104s",
      },
      {
        "@type": "type.googleapis.com/google.rpc.QuotaFailure",
        violations: [{ subject: "repo", description: "TPM limit" }],
      },
    ],
  },
});

test("parseUpstreamError extracts a details-only RetryInfo delay on 429", async () => {
  const details = await errorModule.parseUpstreamError(
    new Response(GEMINI_RETRYINFO_BODY, { status: 429 }),
    "gemini"
  );

  assert.equal(details.statusCode, 429);
  assert.equal(
    details.retryAfterMs,
    1_104_000,
    "the structured retryDelay must be parsed even without any prose hint"
  );
});

test("parseUpstreamError prefers the Retry-After header over the RetryInfo detail", async () => {
  const details = await errorModule.parseUpstreamError(
    new Response(GEMINI_RETRYINFO_BODY, {
      status: 429,
      headers: { "retry-after": "7" },
    }),
    "gemini"
  );

  assert.ok(
    (details.retryAfterMs ?? 0) <= 60_000,
    `header hint must win, got ${details.retryAfterMs}`
  );
});

test("createErrorResult relays retryAfterMs as a Retry-After header", () => {
  const result = errorModule.createErrorResult(
    429,
    "Resource has been exhausted (e.g. check quota).",
    1_104_000
  );

  const retryAfter = result.response.headers.get("retry-after");
  assert.equal(
    retryAfter,
    "1104",
    "the rebuilt response must carry the hint so markAccountUnavailable's header path sees it"
  );
  assert.equal(result.retryAfterMs, 1_104_000);
});

test("createErrorResult omits the header when there is no hint", () => {
  const result = errorModule.createErrorResult(429, "quota gone", null);
  assert.equal(result.response.headers.get("retry-after"), null);
});

test("end to end: the relayed header reaches detectRetryHint through markAccountUnavailable options", async () => {
  // Mirror the streamingResponse wiring: createErrorResult's response headers
  // are what chat.ts passes into markAccountUnavailable → checkFallbackError.
  const parsed = await errorModule.parseUpstreamError(
    new Response(GEMINI_RETRYINFO_BODY, { status: 429 }),
    "gemini"
  );
  const result = errorModule.createErrorResult(
    parsed.statusCode,
    parsed.message,
    parsed.retryAfterMs
  );
  const headers = Object.fromEntries(result.response.headers.entries());

  const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
  const verdict = checkFallbackError(
    429,
    parsed.message,
    0,
    "gemini-3.5-flash-lite",
    "gemini",
    headers,
    null
  );

  assert.equal(verdict.shouldFallback, true);
  assert.equal(verdict.usedUpstreamRetryHint, true, "the hint must be detected");
  assert.ok(
    Math.abs((verdict.cooldownMs ?? 0) - 1_104_000) < 5_000,
    `expected the ~1104s upstream window, got ${verdict.cooldownMs}`
  );
});
