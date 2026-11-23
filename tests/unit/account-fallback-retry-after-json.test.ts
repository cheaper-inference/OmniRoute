import test from "node:test";
import assert from "node:assert/strict";

const { parseRetryFromErrorText } = await import("../../open-sse/services/accountFallback.ts");

test("parseRetryFromErrorText reads nested ISO retryAfter from a 429 JSON body", () => {
  const futureIso = new Date(Date.now() + 120_000).toISOString();
  const waitMs = parseRetryFromErrorText(JSON.stringify({ error: { retryAfter: futureIso } }));
  assert.ok(waitMs !== null, "expected a parsed wait time, got null");
  assert.ok(Math.abs((waitMs as number) - 120_000) <= 2_000, `expected ~120000ms, got ${waitMs}`);
});

test("parseRetryFromErrorText reads top-level retryAfter when nested field is absent", () => {
  const futureIso = new Date(Date.now() + 60_000).toISOString();
  const waitMs = parseRetryFromErrorText(JSON.stringify({ retryAfter: futureIso }));
  assert.ok(waitMs !== null, "expected a parsed wait time, got null");
  assert.ok(Math.abs((waitMs as number) - 60_000) <= 2_000, `expected ~60000ms, got ${waitMs}`);
});

test("parseRetryFromErrorText reads millisecond retry hints from 429 JSON bodies", () => {
  assert.equal(parseRetryFromErrorText(JSON.stringify({ retry_after_ms: 45_000 })), 45_000);
  assert.equal(
    parseRetryFromErrorText(JSON.stringify({ error: { retry_after_ms: 12_000 } })),
    12_000
  );
  assert.equal(parseRetryFromErrorText(JSON.stringify({ retryAfterMs: 8_000 })), 8_000);
});

test("parseRetryFromErrorText ignores past ISO retryAfter values in JSON bodies", () => {
  const pastIso = new Date(Date.now() - 60_000).toISOString();
  assert.equal(parseRetryFromErrorText(JSON.stringify({ error: { retryAfter: pastIso } })), null);
});

// ── google.rpc.ErrorInfo quota-reset metadata ───────────────────────────────
// Google RPC 429 bodies (Antigravity / Cloud Code) can carry the long-lived quota reset
// only in `ErrorInfo.metadata` — `quotaResetDelay` (Go-style duration) and/or
// `quotaResetTimeStamp` (ISO) — without a RetryInfo detail or a parseable prose hint.

const { parseDelayString, parseDetailedRetryHintFromJsonBody, parseRetryHintFromJsonBody } =
  await import("../../open-sse/services/retryAfterJson.ts");

const DAY_MS = 24 * 60 * 60 * 1000;

function errorInfoBody(metadata: Record<string, unknown>, extraDetails: unknown[] = []): string {
  return JSON.stringify({
    error: {
      code: 429,
      message: "Resource has been exhausted (e.g. check quota).",
      status: "RESOURCE_EXHAUSTED",
      details: [
        ...extraDetails,
        {
          "@type": "type.googleapis.com/google.rpc.ErrorInfo",
          reason: "QUOTA_EXHAUSTED",
          domain: "cloudcode-pa.googleapis.com",
          metadata,
        },
      ],
    },
  });
}

test("parseDelayString accepts compound Go-style durations", () => {
  assert.equal(parseDelayString("2h7m23s"), 7_643_000);
  assert.equal(parseDelayString("151h58m18.015s"), 547_098_015);
  assert.equal(parseDelayString("2h7m"), 7_620_000);
  assert.equal(parseDelayString("45m3s"), 2_703_000);
  assert.equal(parseDelayString("1h0m0.5s"), 3_600_500);
});

test("parseDelayString keeps the single-unit and bare-number grammar unchanged", () => {
  assert.equal(parseDelayString("33s"), 33_000);
  assert.equal(parseDelayString("26.66s"), 26_660);
  assert.equal(parseDelayString("1500ms"), 1_500);
  assert.equal(parseDelayString("2m"), 120_000);
  assert.equal(parseDelayString("1h"), 3_600_000);
  assert.equal(parseDelayString("547098.015s"), 547_098_015);
  assert.equal(parseDelayString("12"), 12_000);
  assert.equal(parseDelayString(""), null);
  assert.equal(parseDelayString(null), null);
  assert.equal(parseDelayString("not-a-duration"), null);
});

test("ErrorInfo.metadata.quotaResetDelay (compound duration) becomes a body retry hint", () => {
  const body = errorInfoBody({ quotaResetDelay: "151h58m18.015s" });
  assert.equal(parseRetryHintFromJsonBody(body, 30 * DAY_MS), 547_098_015);
  assert.deepEqual(parseDetailedRetryHintFromJsonBody(body, 30 * DAY_MS), {
    retryAfterMs: 547_098_015,
    provenance: "body",
  });
});

test("ErrorInfo.metadata.quotaResetDelay (seconds) is parsed and capped by maxMs", () => {
  const body = errorInfoBody({ quotaResetDelay: "547098.015s" });
  assert.equal(parseRetryHintFromJsonBody(body, 30 * DAY_MS), 547_098_015);
  assert.equal(parseRetryHintFromJsonBody(body, DAY_MS), DAY_MS);
});

test("ErrorInfo.metadata.quotaResetTimeStamp in the future becomes a body retry hint", () => {
  const future = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
  const waitMs = parseRetryHintFromJsonBody(
    errorInfoBody({ quotaResetTimeStamp: future }),
    30 * DAY_MS
  );
  assert.ok(waitMs !== null, "expected a parsed wait time, got null");
  assert.ok(Math.abs((waitMs as number) - 7_200_000) <= 2_000, `expected ~7.2e6ms, got ${waitMs}`);
});

test("ErrorInfo.metadata.quotaResetTimeStamp in the past is ignored", () => {
  const past = new Date(Date.now() - 60_000).toISOString();
  assert.equal(
    parseRetryHintFromJsonBody(errorInfoBody({ quotaResetTimeStamp: past }), DAY_MS),
    null
  );
});

test("ErrorInfo without quota-reset metadata yields no retry hint", () => {
  assert.equal(
    parseRetryHintFromJsonBody(errorInfoBody({ service: "aiplatform.googleapis.com" }), DAY_MS),
    null
  );
});

test("RetryInfo still wins over ErrorInfo quota-reset metadata", () => {
  const body = errorInfoBody({ quotaResetDelay: "151h58m18.015s" }, [
    { "@type": "type.googleapis.com/google.rpc.RetryInfo", retryDelay: "26s" },
  ]);
  assert.deepEqual(parseDetailedRetryHintFromJsonBody(body, 30 * DAY_MS), {
    retryAfterMs: 26_000,
    provenance: "google_rpc_retry_info",
  });
});

test("parseRetryFromErrorText honors ErrorInfo quotaResetDelay in a 429 JSON body", () => {
  assert.equal(parseRetryFromErrorText(errorInfoBody({ quotaResetDelay: "2h7m23s" })), 7_643_000);
});
