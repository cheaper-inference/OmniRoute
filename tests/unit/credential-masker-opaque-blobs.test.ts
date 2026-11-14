import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cred-opaque-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_REDACTION = process.env.CREDENTIAL_REDACTION_ENABLED;
process.env.DATA_DIR = TEST_ROOT;
process.env.CREDENTIAL_REDACTION_ENABLED = "true";

const coreDb = await import("../../src/lib/db/core.ts");
const { CredentialMaskerGuardrail } = await import("../../src/lib/guardrails/credentialMasker.ts");

test.after(() => {
  coreDb.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_REDACTION === undefined) delete process.env.CREDENTIAL_REDACTION_ENABLED;
  else process.env.CREDENTIAL_REDACTION_ENABLED = ORIGINAL_REDACTION;
  fs.rmSync(TEST_ROOT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// A chance `sk-` run inside random base64url is what the loose catalog patterns rewrite.
const LOOSE_KEY = "sk-" + "a".repeat(30);
const LOOSE_HIT = "_" + LOOSE_KEY;
const BASE64 = "QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVo".repeat(40);

async function maskRequest(content: unknown) {
  const guardrail = new CredentialMaskerGuardrail();
  const result = await guardrail.preCall({ messages: [{ role: "assistant", content }] }, {});
  return result?.modifiedPayload ?? null;
}

test("a thinking-block signature keeps its bytes even when random bytes look like a key", async () => {
  const signature = BASE64 + LOOSE_HIT + BASE64;
  const out = await maskRequest([{ type: "thinking", thinking: "plan", signature }]);
  assert.equal(out, null, "payload must stay untouched");
});

test("encrypted reasoning and thought signature fields keep their bytes", async () => {
  const blob = "AbC" + LOOSE_HIT + "xyz";
  const out = await maskRequest([
    { type: "reasoning", encrypted_content: blob },
    { type: "functionCall", thoughtSignature: blob, thought_signature: blob },
  ]);
  assert.equal(out, null);
});

test("a long base64 blob in an unnamed field keeps its bytes", async () => {
  const out = await maskRequest([{ type: "redacted_thinking", data: BASE64 + LOOSE_HIT + BASE64 }]);
  assert.equal(out, null);
});

test("a high-confidence credential inside a signature or blob is still redacted", async () => {
  const aws = ["AKIA", "ABCDEFGHIJKLMNOP"].join("");
  const out = (await maskRequest([
    { type: "thinking", thinking: "plan", signature: BASE64 + aws + BASE64 },
    { type: "redacted_thinking", data: BASE64 + aws + BASE64 },
  ])) as { messages: Array<{ content: Array<{ signature?: string; data?: string }> }> };
  assert.ok(out, "payload must be modified");
  const [thinking, redacted] = out.messages[0].content;
  assert.match(thinking.signature ?? "", /\[REDACTED:aws\]/);
  assert.match(redacted.data ?? "", /\[REDACTED:aws\]/);
  assert.ok(!(thinking.signature ?? "").includes(aws));
});

test("a plain text key is still redacted", async () => {
  const out = (await maskRequest("my key is " + LOOSE_KEY)) as {
    messages: Array<{ content: string }>;
  };
  assert.equal(out.messages[0].content, "my key is [REDACTED:openai_compatible]");
});

test("a short signature field that holds a high-confidence key is still redacted", async () => {
  const out = (await maskRequest([{ type: "note", signature: "sk-ant-" + "b".repeat(30) }])) as {
    messages: Array<{ content: Array<{ signature: string }> }>;
  };
  assert.equal(out.messages[0].content[0].signature, "[REDACTED:anthropic]");
});

test("a multi-line env dump longer than a blob is still fully redacted", async () => {
  const dump = ("OPENAI_API_KEY=" + LOOSE_KEY + "\n").repeat(12);
  const out = (await maskRequest(dump)) as { messages: Array<{ content: string }> };
  assert.ok(!out.messages[0].content.includes(LOOSE_KEY));
});
