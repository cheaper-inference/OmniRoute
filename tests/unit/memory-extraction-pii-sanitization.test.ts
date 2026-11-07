// Memory extraction must not persist PII the operator asked to strip from responses.
//
// runMemoryExtractionGate is shared by the non-streaming and streaming completion paths.
// Both hand it the response BEFORE response PII sanitization runs: non-streaming passes
// the translated response ahead of the post-call guardrails (piiMasker.postCall), and
// streaming passes the body assembled inside the provider transform, upstream of the PII
// SSE transform. With PII_RESPONSE_SANITIZATION on, the client gets "[EMAIL_REDACTED]"
// while the raw address was written to durable memory and could be re-injected later.
//
// The flag stays opt-in (Hard Rule #20): with it off, memory text is passed through as-is.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-memory-pii-"));
process.env.DATA_DIR = tmpDir;

const { runMemoryExtractionGate } =
  await import("../../open-sse/handlers/chatCore/memoryExtraction.ts");
const { isPiiSanitizationEnabled, sanitizePII } = await import("../../src/lib/piiSanitizer.ts");
const { clearAllFeatureFlagOverrides } = await import("../../src/lib/db/featureFlags.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  delete process.env.PII_RESPONSE_SANITIZATION;
  resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

const RAW_EMAIL = "alice.smith@example.com";
const RAW_SSN = "123-45-6789";
const REPLY = `Sure — I'll remember that your email is ${RAW_EMAIL} and your SSN is ${RAW_SSN}.`;

function setResponseSanitization(enabled: boolean) {
  clearAllFeatureFlagOverrides();
  process.env.PII_RESPONSE_SANITIZATION = enabled ? "true" : "false";
}

function runGate(responseBody: Record<string, unknown>, requestBody?: Record<string, unknown>) {
  const calls: string[] = [];
  runMemoryExtractionGate({
    memoryOwnerId: "key-1",
    memorySettings: { enabled: true, maxTokens: 2000 },
    videoBridgeObserved: false,
    pipelineSessionId: "session-1",
    requestBody: requestBody ?? { messages: [] },
    responseBody,
    extractFacts: (text) => calls.push(text),
  });
  return calls;
}

const chatCompletion = () => ({
  object: "chat.completion",
  choices: [{ index: 0, message: { role: "assistant", content: REPLY } }],
});

test("control: the flag is on and the response sanitizer redacts this reply", () => {
  setResponseSanitization(true);
  assert.equal(isPiiSanitizationEnabled(), true);
  assert.ok(!sanitizePII(REPLY).text.includes(RAW_EMAIL));
});

test("PII response sanitization on: memory gets the redacted chat-completion reply", () => {
  setResponseSanitization(true);
  const calls = runGate(chatCompletion());

  assert.equal(calls.length, 1);
  assert.ok(!calls[0].includes(RAW_EMAIL), `raw email reached memory: ${calls[0]}`);
  assert.ok(!calls[0].includes(RAW_SSN), `raw SSN reached memory: ${calls[0]}`);
  assert.match(calls[0], /\[EMAIL_REDACTED\]/);
});

test("PII response sanitization on: memory gets the redacted Responses API output_text", () => {
  setResponseSanitization(true);
  const calls = runGate({ object: "response", output_text: REPLY });

  assert.equal(calls.length, 1);
  assert.ok(!calls[0].includes(RAW_EMAIL), `raw email reached memory: ${calls[0]}`);
});

test("PII response sanitization on: the response object itself is not mutated", () => {
  setResponseSanitization(true);
  const response = chatCompletion();
  runGate(response);

  // The non-streaming path passes the same object it later returns to the client and to
  // the post-call guardrails; the memory gate must only sanitize its own copy of the text.
  assert.equal(response.choices[0].message.content, REPLY);
});

test("PII response sanitization off: memory text is passed through unchanged", () => {
  setResponseSanitization(false);
  const calls = runGate(chatCompletion());

  assert.equal(calls.length, 1);
  assert.ok(calls[0].includes(RAW_EMAIL));
});

test("the response flag does not rewrite request-derived memory text", () => {
  setResponseSanitization(true);
  const calls = runGate(
    { choices: [{ message: { role: "assistant", content: "Noted." } }] },
    { messages: [{ role: "user", content: `My email is ${RAW_EMAIL}` }] }
  );

  // Request-side masking is PII_REDACTION_ENABLED's job (piiMasker.preCall), which has
  // already run on the body by the time memory extraction sees it.
  const requestText = calls.find((text) => text.includes("My email is"));
  assert.ok(requestText, `request text missing: ${JSON.stringify(calls)}`);
  assert.ok(requestText.includes(RAW_EMAIL));
});
