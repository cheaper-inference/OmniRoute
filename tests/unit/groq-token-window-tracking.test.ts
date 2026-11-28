import test from "node:test";
import assert from "node:assert/strict";
import { createTempDataDir } from "../_setup/tempDataDir.ts";

const { cleanup } = createTempDataDir("groq-token-window-");
test.after(cleanup);

// Dynamic import: DATA_DIR must be set before the DB-backed modules evaluate.
const rateLimitManager = await import("../../open-sse/services/rateLimitManager.ts");

const GROQ_TOKEN_HEADERS = {
  "x-ratelimit-limit-tokens": "18000",
  "x-ratelimit-remaining-tokens": "17997",
};

test.beforeEach(async () => {
  delete process.env.RATE_LIMIT_GROQ_TOKEN_TRACKING;
  await rateLimitManager.__resetRateLimitManagerForTests();
});

test.afterEach(async () => {
  delete process.env.RATE_LIMIT_GROQ_TOKEN_TRACKING;
  await rateLimitManager.__resetRateLimitManagerForTests();
});

test("with RATE_LIMIT_GROQ_TOKEN_TRACKING on, a Groq response records its token window", () => {
  process.env.RATE_LIMIT_GROQ_TOKEN_TRACKING = "true";
  const connectionId = "groq-token-on";
  rateLimitManager.enableRateLimitProtection(connectionId);

  rateLimitManager.updateFromHeaders("groq", connectionId, GROQ_TOKEN_HEADERS, 200, "llama");

  const learned = rateLimitManager.getLearnedLimits()[`groq:${connectionId}`];
  assert.ok(learned, "the Groq connection should have a learned-limit entry");
  assert.equal(learned.tokenLimit, 18000);
  assert.equal(learned.tokenRemaining, 17997);
});

test("with the flag unset, a Groq response records no token window", () => {
  const connectionId = "groq-token-off";
  rateLimitManager.enableRateLimitProtection(connectionId);

  rateLimitManager.updateFromHeaders("groq", connectionId, GROQ_TOKEN_HEADERS, 200, "llama");

  assert.equal(rateLimitManager.getLearnedLimits()[`groq:${connectionId}`], undefined);
});

test("with the flag on, a non-Groq provider records no token window", () => {
  process.env.RATE_LIMIT_GROQ_TOKEN_TRACKING = "true";
  const connectionId = "openai-token-scope";
  rateLimitManager.enableRateLimitProtection(connectionId);

  rateLimitManager.updateFromHeaders("openai", connectionId, GROQ_TOKEN_HEADERS, 200, null);

  assert.equal(
    rateLimitManager.getLearnedLimits()[`openai:${connectionId}`]?.tokenLimit,
    undefined
  );
});

test("with the flag on, a Groq 429 still records its exhausted token window", () => {
  // The 429 branch evicts the limiter and returns early; the token window it
  // reports (remaining 0) is exactly the state monitoring must show.
  process.env.RATE_LIMIT_GROQ_TOKEN_TRACKING = "true";
  const connectionId = "groq-token-429";
  rateLimitManager.enableRateLimitProtection(connectionId);

  rateLimitManager.updateFromHeaders(
    "groq",
    connectionId,
    { "x-ratelimit-limit-tokens": "18000", "x-ratelimit-remaining-tokens": "0" },
    429,
    "llama"
  );

  const learned = rateLimitManager.getLearnedLimits()[`groq:${connectionId}`];
  assert.ok(learned, "the 429 should still record the Groq token window");
  assert.equal(learned.tokenLimit, 18000);
  assert.equal(learned.tokenRemaining, 0);
});
