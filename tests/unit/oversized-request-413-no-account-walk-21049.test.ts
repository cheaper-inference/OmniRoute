import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("oversized-413-21049");
const { buildRequest, buildOpenAIResponse, handleChat, resetStorage, seedConnection, settingsDb } =
  harness;
const { clearAllModelLockouts, getAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");
const { isRequestLargerThanRateLimit } =
  await import("../../open-sse/services/accountFallback/perModelFailureScope.ts");

const MODEL = "openai/gpt-oss-120b";
const ACCOUNTS = 3;
// Groq's answer when ONE request is larger than the account's whole per-minute budget.
const OVERSIZED_413 = {
  error: {
    message:
      "Request too large for model `openai/gpt-oss-120b` in organization `org_test` service tier `on_demand` on tokens per minute (TPM): Limit 8000, Requested 36955, please reduce your message size and try again.",
    type: "tokens",
    code: "rate_limit_exceeded",
  },
};
// The minute's budget is used up, but this request alone fits: a sibling account can serve it.
const WINDOW_413 = {
  error: {
    message:
      "Request too large for model `openai/gpt-oss-120b` in organization `org_test` service tier `on_demand` on tokens per minute (TPM): Limit 8000, Requested 5000, please reduce your message size and try again.",
    type: "tokens",
    code: "rate_limit_exceeded",
  },
};

test.beforeEach(async () => {
  await resetStorage();
  clearAllModelLockouts();
  await settingsDb.updateSettings({ requestRetry: 0, maxRetryIntervalSec: 0 });
  for (let i = 0; i < ACCOUNTS; i++) {
    await seedConnection("groq", { name: `groq-${i}`, apiKey: `gsk-test-21049-${i}` });
  }
});
test.afterEach(async () => {
  clearAllModelLockouts();
  await resetStorage();
});
test.after(async () => {
  await harness.cleanup();
});

function chat() {
  return handleChat(
    buildRequest({
      body: {
        model: `groq/${MODEL}`,
        stream: false,
        messages: [{ role: "user", content: "hello" }],
      },
    })
  );
}

function reject413(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 413,
    headers: { "content-type": "application/json" },
  });
}

test("#21049 only a 413 whose request exceeds the stated limit is request-scoped", () => {
  assert.equal(isRequestLargerThanRateLimit(413, OVERSIZED_413.error.message), true);
  assert.equal(isRequestLargerThanRateLimit(413, JSON.stringify(OVERSIZED_413)), true);
  assert.equal(isRequestLargerThanRateLimit(413, WINDOW_413.error.message), false);
  assert.equal(isRequestLargerThanRateLimit(413, "Payload too large"), false);
  assert.equal(isRequestLargerThanRateLimit(429, OVERSIZED_413.error.message), false);
});

test("#21049 a request larger than the per-account TPM limit returns its 413 without walking or locking accounts", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return reject413(OVERSIZED_413);
  };

  const response = await chat();

  assert.equal(response.status, 413);
  assert.equal(calls, 1, "every sibling account has the same per-minute limit");
  assert.deepEqual(
    getAllModelLockouts().map((l) => `${l.provider}:${l.model}`),
    [],
    "the accounts are healthy, so the model must stay available to other clients"
  );

  globalThis.fetch = async () => buildOpenAIResponse("served");
  const next = await chat();
  assert.equal(next.status, 200);
});

test("#21049 a 413 for a request that fits the per-minute limit still fails over to a sibling account", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return calls === 1 ? reject413(WINDOW_413) : buildOpenAIResponse("served");
  };

  const response = await chat();

  assert.equal(response.status, 200);
  assert.equal(calls, 2);
});
