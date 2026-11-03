// Request capture used to store the provider URL verbatim. Providers that authenticate
// through the query string (Vertex Express / Google media `?key=`, search providers with
// `api_key=`) therefore leaked their credential into call-log artifacts and the live
// pending-request detail. The header masker also let `*-secret` / `*-password` headers
// through untouched.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-url-secret-mask-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { createRequestLogger } = await import("../../open-sse/utils/requestLogger.ts");
const { redactUrlQuerySecrets, sanitizeErrorMessage } =
  await import("../../open-sse/utils/errorSanitization.ts");
const { protectPayloadForLog } = await import("../../src/lib/logPayloads.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const FAKE_KEY = "AIzaFAKEKEY1234567890abcdefXYZ";

test.after(() => {
  usageHistory.clearPendingRequests();
  resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function captureTarget(url: unknown, headers: Record<string, string> = {}) {
  const logger = await createRequestLogger("openai", "gemini", "gemini-2.5-flash", {});
  logger.logTargetRequest(url, headers, { contents: [] });
  const payloads = logger.getPipelinePayloads();
  assert.ok(payloads?.providerRequest, "providerRequest must be captured");
  return payloads;
}

test("logTargetRequest masks ?key= credentials in the captured provider URL", async () => {
  const url =
    "https://aiplatform.googleapis.com/v1/publishers/google/models/gemini-2.5-flash:generateContent" +
    `?key=${FAKE_KEY}`;
  const payloads = await captureTarget(url);
  const capturedUrl = String(payloads.providerRequest.url);

  assert.ok(!capturedUrl.includes(FAKE_KEY), `key leaked into captured URL: ${capturedUrl}`);
  assert.ok(capturedUrl.includes("[REDACTED]"), "masked URL must carry a redaction marker");
  assert.ok(
    capturedUrl.startsWith("https://aiplatform.googleapis.com/v1/publishers/google/models/"),
    "the non-secret part of the URL stays readable"
  );
});

test("logTargetRequest masks every credential-style query param and keeps the rest", async () => {
  const url =
    "https://search.example.test/v1/search?q=omniroute&api_key=sk-search-secret-111" +
    "&access_token=tok-secret-222&auth=auth-secret-333&sig=sig-secret-444&page=2";
  const payloads = await captureTarget(url);
  const capturedUrl = String(payloads.providerRequest.url);

  for (const secret of [
    "sk-search-secret-111",
    "tok-secret-222",
    "auth-secret-333",
    "sig-secret-444",
  ]) {
    assert.ok(!capturedUrl.includes(secret), `${secret} leaked into captured URL: ${capturedUrl}`);
  }
  assert.ok(capturedUrl.includes("q=omniroute"), "non-secret params stay untouched");
  assert.ok(capturedUrl.includes("page=2"), "non-secret params stay untouched");
});

test("logTargetRequest masks credentials when the URL is passed as a URL object", async () => {
  const payloads = await captureTarget(
    new URL(`https://generativelanguage.googleapis.com/v1beta/models?key=${FAKE_KEY}`)
  );
  assert.ok(!JSON.stringify(payloads.providerRequest).includes(FAKE_KEY));
});

test("logTargetRequest keeps a URL without secrets byte-identical", async () => {
  const url = "https://api.openai.com/v1/chat/completions?stream=true";
  const payloads = await captureTarget(url);
  assert.equal(payloads.providerRequest.url, url);
});

test("redactUrlQuerySecrets leaves non-URL values and clean URLs untouched", () => {
  assert.equal(redactUrlQuerySecrets(""), "");
  assert.equal(
    redactUrlQuerySecrets("https://api.anthropic.com/v1/messages"),
    "https://api.anthropic.com/v1/messages"
  );
  assert.ok(!redactUrlQuerySecrets(`/v1beta/models?key=${FAKE_KEY}`).includes(FAKE_KEY));
});

test("error sanitization also redacts an ?auth= query credential", () => {
  const message = sanitizeErrorMessage(
    "upstream failed for https://api.example.test/v1/run?auth=auth-secret-value-999"
  );
  assert.ok(!message.includes("auth-secret-value-999"), `auth leaked: ${message}`);
});

test("header masker redacts *-secret and *-password headers", async () => {
  const payloads = await captureTarget("https://api.example.test/v1/chat/completions", {
    "x-client-secret": "s3cr3t-value-abcdefghijkl",
    "x-api-secret": "short-secret",
    "x-proxy-password": "hunter2-password-value",
  });
  const headers = payloads.providerRequest.headers as Record<string, unknown>;

  assert.notEqual(headers["x-client-secret"], "s3cr3t-value-abcdefghijkl");
  assert.equal(headers["x-api-secret"], "[REDACTED]");
  assert.notEqual(headers["x-proxy-password"], "hunter2-password-value");
  assert.ok(!JSON.stringify(headers).includes("s3cr3t-value-abcdefghijkl"));
  assert.ok(!JSON.stringify(headers).includes("hunter2-password-value"));
});

test("header masker still leaves x-ratelimit-*-tokens headers readable", async () => {
  const payloads = await captureTarget("https://api.openai.com/v1/chat/completions", {
    "x-ratelimit-remaining-tokens": "149000",
    "content-type": "application/json",
  });
  const headers = payloads.providerRequest.headers as Record<string, unknown>;
  assert.equal(headers["x-ratelimit-remaining-tokens"], "149000");
  assert.equal(headers["content-type"], "application/json");
});

test("serialized protected pipeline payloads contain no fake key end to end", async () => {
  const payloads = await captureTarget(
    `https://aiplatform.googleapis.com/v1/models/gemini:streamGenerateContent?alt=sse&key=${FAKE_KEY}`,
    { "x-goog-api-key": FAKE_KEY, "x-client-secret": FAKE_KEY }
  );
  const serialized = JSON.stringify(protectPayloadForLog(payloads));
  assert.ok(!serialized.includes(FAKE_KEY), "fake key must not appear anywhere in the artifact");
});

test("pending request detail stores the provider URL with query credentials masked", () => {
  const connectionId = "conn-url-secret-mask";
  usageHistory.trackPendingRequest("gemini-2.5-flash", "vertex", connectionId, true, {
    stage: "registered",
  });
  usageHistory.updatePendingRequest("gemini-2.5-flash", "vertex", connectionId, {
    providerUrl: `https://aiplatform.googleapis.com/v1/models/gemini:generateContent?key=${FAKE_KEY}`,
    stage: "sending_to_provider",
  });

  const pending = usageHistory.getPendingRequests();
  const detail = pending.details[connectionId]["gemini-2.5-flash (vertex)"][0];
  assert.ok(detail.providerUrl, "providerUrl should be kept");
  assert.ok(!String(detail.providerUrl).includes(FAKE_KEY), `key leaked: ${detail.providerUrl}`);
  assert.ok(String(detail.providerUrl).startsWith("https://aiplatform.googleapis.com/v1/models/"));

  usageHistory.trackPendingRequest("gemini-2.5-flash", "vertex", connectionId, false);
});
