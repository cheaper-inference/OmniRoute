// With both opt-in maskers on, a credential must be redacted as a whole. The broad PII
// rules (phone, card) used to run first and rewrote the digit middle of a token, so the
// credential rule no longer matched and the prefix and tail stayed in clear.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-cred-before-pii-"));
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.PII_REDACTION_ENABLED = "true";
process.env.PII_RESPONSE_SANITIZATION = "true";
process.env.CREDENTIAL_REDACTION_ENABLED = "true";

const core = await import("../../src/lib/db/core.ts");
const { guardrailRegistry } = await import("../../src/lib/guardrails/registry.ts");

const SLACK = ["xoxb", "1234567890", "1234567890123", "AbCdEfGhIjKlMnOpQrStUvWx"].join("-");

test.after(() => {
  core.resetDbInstance();
});

test("request: a Slack token is redacted whole, not half-masked as a phone number", async () => {
  const out = await guardrailRegistry.runPreCallHooks(
    { messages: [{ role: "user", content: `token ${SLACK} end` }] },
    {}
  );
  const content = (out.payload as { messages: Array<{ content: string }> }).messages[0].content;
  assert.equal(content, "token [REDACTED:slack] end");
});

test("response: a Slack token is redacted whole, not half-masked as a phone number", async () => {
  const out = await guardrailRegistry.runPostCallHooks(
    { choices: [{ message: { role: "assistant", content: `token ${SLACK} end` } }] },
    {}
  );
  const content = (out.response as { choices: Array<{ message: { content: string } }> }).choices[0]
    .message.content;
  assert.equal(content, "token [REDACTED:slack] end");
});

test("order: credential-masker runs after the media bridges and before pii-masker", () => {
  const names = guardrailRegistry.list().map((g) => g.name);
  const at = (name: string) => names.indexOf(name);
  assert.ok(at("credential-masker") > at("video-bridge"), names.join(","));
  assert.ok(at("credential-masker") < at("pii-masker"), names.join(","));
});
