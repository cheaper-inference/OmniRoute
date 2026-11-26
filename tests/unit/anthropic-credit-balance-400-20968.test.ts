import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-20968-"));
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "20968-test-secret";

const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
const { classifyProviderError, PROVIDER_ERROR_TYPES } =
  await import("../../open-sse/services/errorClassifier.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance?.();
});

const ANTHROPIC_BODY = {
  type: "error",
  error: {
    type: "invalid_request_error",
    message:
      "Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits.",
  },
};
const TEXT = JSON.stringify(ANTHROPIC_BODY);

for (const provider of ["anthropic-compatible-abc123", "anthropic"]) {
  test(`#20968 ${provider}: 400 credit balance too low is account-level credit exhaustion`, () => {
    const r = checkFallbackError(400, TEXT, 0, "claude-sonnet-5-5", provider);
    assert.equal(r.shouldFallback, true);
    assert.equal(r.creditsExhausted, true, "connection must park as credits_exhausted");
    assert.equal(
      classifyProviderError(400, ANTHROPIC_BODY, provider),
      PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED
    );
  });
}

test("#20968 a 400 that merely quotes the phrase mid-text stays non-credit", () => {
  const echoed = JSON.stringify({
    type: "error",
    error: {
      type: "invalid_request_error",
      message: "Unknown parameter: 'your credit balance is too low'",
    },
  });
  const r = checkFallbackError(400, echoed, 0, "claude-sonnet-5-5", "anthropic-compatible-abc123");
  assert.notEqual(r.creditsExhausted, true);
});

test("#20968 a non-Anthropic provider with the Anthropic body on 400 is unchanged", () => {
  const r = checkFallbackError(400, TEXT, 0, "gpt-x", "openai-compatible-zzz");
  // openai-compatible-* keeps its own message-only 400 credit form (model-scoped carve-out)
  assert.notEqual(r.creditsExhausted, true);
});
