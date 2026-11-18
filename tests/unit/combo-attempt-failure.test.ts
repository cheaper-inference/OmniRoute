import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-attempt-failure-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_PROSE_FLAG = process.env.RETRY_AFTER_PROVENANCE_ENABLED;
process.env.DATA_DIR = TEST_DATA_DIR;

const { readAttemptFailure, resolveAttemptRetryAfter } =
  await import("../../open-sse/services/combo/attemptFailure.ts");
const { isQuotaExhaustionFailure, isQuotaExhaustionResponse, recordQuotaExhaustionClassification } =
  await import("../../open-sse/services/combo/quotaExhaustion.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const NOW = Date.parse("2026-10-23T00:00:00.000Z");
const STATUS_TEXT = "Upstream refusal";

test.beforeEach(() => {
  delete process.env.RETRY_AFTER_PROVENANCE_ENABLED;
});

test.afterEach(() => {
  if (ORIGINAL_PROSE_FLAG === undefined) delete process.env.RETRY_AFTER_PROVENANCE_ENABLED;
  else process.env.RETRY_AFTER_PROVENANCE_ENABLED = ORIGINAL_PROSE_FLAG;
});

test.after(() => {
  resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function refusal(body: string, headers: Record<string, string> = {}): Response {
  return new Response(body, { status: 429, statusText: STATUS_TEXT, headers });
}

const RETRY_CASES = [
  {
    name: "top-level retryAfter wins over every nested hint and the header",
    body: {
      retryAfter: "2026-10-23T00:01:00.000Z",
      error: { reset_at: "2026-10-23T00:00:02.000Z", retry_after: 3, reset_seconds: 4 },
    },
    expected: "2026-10-23T00:01:00.000Z",
  },
  {
    name: "top-level numeric retryAfter retains the existing value",
    body: { retryAfter: 7, error: { reset_at: "2026-10-23T00:00:02.000Z" } },
    expected: 7,
  },
  {
    name: "nested reset_at wins over retry_after and reset_seconds",
    body: { error: { reset_at: "2026-10-23T00:00:08.000Z", retry_after: 3, reset_seconds: 4 } },
    expected: "2026-10-23T00:00:08.000Z",
  },
  {
    name: "numeric nested retry_after is a duration in seconds",
    body: { error: { retry_after: 3, reset_seconds: 4 } },
    expected: "2026-10-23T00:00:03.000Z",
  },
  {
    name: "ISO nested retry_after wins over reset_seconds",
    body: { error: { retry_after: "2026-10-23T00:00:09.000Z", reset_seconds: 4 } },
    expected: "2026-10-23T00:00:09.000Z",
  },
  {
    name: "reset_seconds is used when earlier structured hints are absent",
    body: { error: { reset_seconds: 4 } },
    expected: "2026-10-23T00:00:04.000Z",
  },
];

for (const entry of RETRY_CASES) {
  test(`failure retry timing: ${entry.name}`, async (t) => {
    t.mock.method(Date, "now", () => NOW);
    const failure = await readAttemptFailure(
      refusal(JSON.stringify(entry.body), { "Retry-After": "1" })
    );
    assert.equal(resolveAttemptRetryAfter(failure), entry.expected);
  });
}

test("opt-in prose is preferred to the header, but never to a structured hint", async (t) => {
  t.mock.method(Date, "now", () => NOW);
  process.env.RETRY_AFTER_PROVENANCE_ENABLED = "true";
  const prose = "Too many requests. Please retry after 30s";

  const plain = await readAttemptFailure(refusal(prose, { "Retry-After": "60" }));
  assert.equal(resolveAttemptRetryAfter(plain), "2026-10-23T00:00:30.000Z");

  const structured = await readAttemptFailure(
    refusal(JSON.stringify({ error: { message: prose, retry_after: 5 } }), {
      "Retry-After": "60",
    })
  );
  assert.equal(resolveAttemptRetryAfter(structured), "2026-10-23T00:00:05.000Z");
});

test("prose stays opt-in and malformed bodies retain header retry timing", async (t) => {
  t.mock.method(Date, "now", () => NOW);
  const failure = await readAttemptFailure(
    refusal("Please retry after 30s", { "Retry-After": "60" })
  );
  assert.equal(resolveAttemptRetryAfter(failure), "2026-10-23T00:01:00.000Z");
});

test("a failed clone keeps the status text and header retry timing", async (t) => {
  t.mock.method(Date, "now", () => NOW);
  const response = refusal("unreadable body", { "Retry-After": "60" });
  await response.text();
  const failure = await readAttemptFailure(response);
  assert.equal(failure.errorText, STATUS_TEXT);
  assert.equal(failure.quota.text, STATUS_TEXT);
  assert.equal(failure.errorBody, null);
  assert.equal(resolveAttemptRetryAfter(failure), "2026-10-23T00:01:00.000Z");
});

const PROJECTION_CASES = [
  { name: "empty body", body: "", routing: STATUS_TEXT, quota: "" },
  { name: "null JSON", body: "null", routing: "null", quota: "null" },
  { name: "scalar JSON", body: '"a scalar"', routing: '"a scalar"', quota: STATUS_TEXT },
  {
    name: "JSON without a message",
    body: '{"detail":"busy"}',
    routing: '{"detail":"busy"}',
    quota: STATUS_TEXT,
  },
  {
    name: "empty nested message",
    body: '{"error":{"message":""}}',
    routing: '{"error":{"message":""}}',
    quota: "",
  },
  {
    name: "numeric nested message",
    body: '{"error":{"message":42}}',
    routing: "42",
    quota: STATUS_TEXT,
  },
  {
    name: "object nested message",
    body: '{"error":{"message":{"reason":"busy"}}}',
    routing: '{"reason":"busy"}',
    quota: STATUS_TEXT,
  },
];

for (const entry of PROJECTION_CASES) {
  test(`failure text preserves routing and quota projections: ${entry.name}`, async () => {
    const failure = await readAttemptFailure(refusal(entry.body));
    assert.equal(failure.errorText, entry.routing);
    assert.equal(failure.quota.text, entry.quota);
  });
}

test("long non-JSON bodies are capped only for routing and do not consume the original", async () => {
  const body = `${"x".repeat(550)} credits exhausted`;
  const response = refusal(body);
  const failure = await readAttemptFailure(response);

  assert.equal(failure.response, response);
  assert.equal(failure.errorText, "x".repeat(500));
  assert.equal(failure.quota.text, body);
  assert.equal(response.bodyUsed, false);
  assert.equal(isQuotaExhaustionFailure(failure, "openai-compatible-test", "model"), true);
  assert.equal(await response.text(), body);
});

test("numeric structured codes and types retain string projections for both consumers", async () => {
  const failure = await readAttemptFailure(
    refusal(JSON.stringify({ error: { message: "denied", code: 40001, type: 7 } }))
  );
  assert.equal(failure.structuredError?.code, "40001");
  assert.equal(failure.structuredError?.type, "7");
  assert.equal(failure.quota.structuredError?.code, "40001");
  assert.equal(failure.quota.structuredError?.type, "7");
});

test("403 quota exhaustion is distinguished from a generic authentication refusal", async () => {
  const balance = new Response(
    JSON.stringify({
      error: { message: "Insufficient account balance", code: "AUTHZ_INSUFFICIENT_BALANCE" },
    }),
    { status: 403 }
  );
  const auth = new Response(JSON.stringify({ error: { message: "Invalid API key" } }), {
    status: 403,
  });
  assert.equal(
    isQuotaExhaustionFailure(await readAttemptFailure(balance), "openai", "model"),
    true
  );
  assert.equal(isQuotaExhaustionFailure(await readAttemptFailure(auth), "openai", "model"), false);
  assert.equal(await isQuotaExhaustionResponse(balance, "openai", "model"), true);
  assert.equal(await isQuotaExhaustionResponse(auth, "openai", "model"), false);
});

test("terminal-looking public fields do not classify an ineligible status as quota exhaustion", async () => {
  const response = Response.json(
    { error: { message: "credits exhausted", code: "quota_exhausted" } },
    { status: 503 }
  );
  assert.equal(
    isQuotaExhaustionFailure(await readAttemptFailure(response), "openai", "model"),
    false
  );
});

test("trusted classification overrides public quota evidence on the original response only", async () => {
  const response = refusal(JSON.stringify({ error: { code: "insufficient_quota" } }));
  recordQuotaExhaustionClassification(response, false);
  const failure = await readAttemptFailure(response);
  assert.equal(isQuotaExhaustionFailure(failure, "openai", "model"), false);
  assert.equal(await isQuotaExhaustionResponse(response, "openai", "model"), false);

  const publicCopy = response.clone();
  assert.equal(
    isQuotaExhaustionFailure(await readAttemptFailure(publicCopy), "openai", "model"),
    true
  );
});

test("trusted exhaustion survives an unreadable body and otherwise ineligible status", async () => {
  const response = new Response("opaque upstream failure", { status: 500 });
  recordQuotaExhaustionClassification(response, true);
  await response.text();
  assert.equal(
    isQuotaExhaustionFailure(await readAttemptFailure(response), "openai", "model"),
    true
  );
  assert.equal(await isQuotaExhaustionResponse(response, "openai", "model"), true);
});
