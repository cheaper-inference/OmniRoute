// With PII_REDACTION_ENABLED / PII_RESPONSE_SANITIZATION off (the defaults) the PII masker
// changes nothing, so it must not read the payload at all. It used to scan every text leaf
// of each request only to put a detection count in debug metadata, and to clone and
// stringify each response twice before returning "no change".
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { GuardrailContext } from "../../src/lib/guardrails/base";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-pii-off-skip-"));
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.PII_REDACTION_ENABLED;
delete process.env.PII_RESPONSE_SANITIZATION;

const core = await import("../../src/lib/db/core.ts");
const { clearAllFeatureFlagOverrides } = await import("../../src/lib/db/featureFlags.ts");
const { PIIMaskerGuardrail } = await import("../../src/lib/guardrails/piiMasker.ts");

const CONTEXT = {} as GuardrailContext;
const guardrail = new PIIMaskerGuardrail();
const SSN = "123-45-6789";

/** A request whose message text records every read. */
function countedRequest() {
  const reads = { n: 0 };
  const message = { role: "user" } as Record<string, unknown>;
  Object.defineProperty(message, "content", {
    enumerable: true,
    get() {
      reads.n += 1;
      return `my ssn is ${SSN}`;
    },
  });
  return { reads, body: { model: "m", messages: [message] } };
}

/** A response that records every JSON serialization. */
function countedResponse(text: string) {
  const calls = { n: 0 };
  const body = {
    choices: [{ message: { role: "assistant", content: text } }],
    toJSON() {
      calls.n += 1;
      return { choices: this.choices };
    },
  };
  return { calls, body };
}

test.beforeEach(() => {
  clearAllFeatureFlagOverrides();
  delete process.env.PII_REDACTION_ENABLED;
  delete process.env.PII_RESPONSE_SANITIZATION;
});

test.after(() => {
  delete process.env.PII_REDACTION_ENABLED;
  delete process.env.PII_RESPONSE_SANITIZATION;
  core.resetDbInstance();
});

test("request masking off: preCall does not read the payload and reports no change", async () => {
  const { reads, body } = countedRequest();
  const result = await guardrail.preCall(body, CONTEXT);
  assert.equal(reads.n, 0, "no text leaf may be scanned while masking is off");
  assert.equal(result.block, false);
  assert.equal(result.modifiedPayload, undefined);
  assert.equal(result.meta ?? null, null);
});

test("request masking on: preCall still scans and masks", async () => {
  process.env.PII_REDACTION_ENABLED = "true";
  const { reads, body } = countedRequest();
  const result = await guardrail.preCall(body, CONTEXT);
  assert.ok(reads.n >= 1, "the counted getter must be read when masking is on");
  const out = result.modifiedPayload as { messages: Array<{ content: string }> };
  assert.ok(!out.messages[0].content.includes(SSN));
});

test("response sanitization off: postCall does not clone or serialize the response", async () => {
  const { calls, body } = countedResponse("mail me at dev@example.com");
  const result = await guardrail.postCall(body, CONTEXT);
  assert.equal(calls.n, 0, "the response must not be serialized while sanitization is off");
  assert.deepEqual(result, { block: false });
});

test("response sanitization on: postCall still redacts", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  const { calls, body } = countedResponse("mail me at dev@example.com");
  const result = await guardrail.postCall(body, CONTEXT);
  assert.ok(calls.n >= 1);
  const out = result.modifiedResponse as { choices: Array<{ message: { content: string } }> };
  assert.ok(!out.choices[0].message.content.includes("dev@example.com"));
});
