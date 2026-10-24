import test from "node:test";
import assert from "node:assert";
import {
  setQuotaCache,
  isQuotaExhaustedForRequest,
  __clearForTests,
} from "../../../src/domain/quotaCache.ts";

test("Argon weekly exhaustion isolates gemini-4-argon without blocking gemini-3.8-flash", () => {
  // Given: gemini_4_argon_weekly is 0% with future resetAt, while gemini_weekly is 100%
  __clearForTests();
  const connectionId = "conn_argon_exhausted";
  const futureReset = new Date(Date.now() + 86400000).toISOString();
  const quotas = {
    gemini_4_argon_weekly: {
      remainingPercentage: 0,
      resetAt: futureReset,
    },
    gemini_weekly: {
      remainingPercentage: 100,
      resetAt: futureReset,
    },
    "gemini-3.8-flash": {
      remainingPercentage: 100,
      resetAt: futureReset,
    },
  };

  setQuotaCache(connectionId, "antigravity", quotas);

  // When: checking quota exhaustion for Argon and standard Gemini models
  const argonExhausted = isQuotaExhaustedForRequest(
    connectionId,
    "antigravity",
    "antigravity/gemini-4-argon"
  );
  const argonHighExhausted = isQuotaExhaustedForRequest(
    connectionId,
    "antigravity",
    "antigravity/gemini-4-argon-high"
  );
  const flashExhausted = isQuotaExhaustedForRequest(
    connectionId,
    "antigravity",
    "antigravity/gemini-3.8-flash"
  );

  // Then: Argon variants are exhausted, while Gemini 3.8 Flash remains available
  assert.strictEqual(argonExhausted, true, "gemini-4-argon must be exhausted when gemini_4_argon_weekly is 0%");
  assert.strictEqual(argonHighExhausted, true, "gemini-4-argon-high must be exhausted when gemini_4_argon_weekly is 0%");
  assert.strictEqual(flashExhausted, false, "gemini-3.8-flash must not be blocked by Argon weekly exhaustion");
});

test("Argon requests ignore exhausted gemini_weekly when gemini_4_argon_weekly is available", () => {
  // Given: gemini_weekly is 0% and gemini_4_argon_weekly is 80%
  __clearForTests();
  const connectionId = "conn_argon_healthy_gemini_zero";
  const futureReset = new Date(Date.now() + 86400000).toISOString();
  const quotas = {
    gemini_weekly: {
      remainingPercentage: 0,
      resetAt: futureReset,
    },
    gemini_4_argon_weekly: {
      remainingPercentage: 80,
      resetAt: futureReset,
    },
  };

  setQuotaCache(connectionId, "antigravity", quotas);

  // When: checking quota exhaustion for antigravity/gemini-4-argon
  const argonExhausted = isQuotaExhaustedForRequest(
    connectionId,
    "antigravity",
    "antigravity/gemini-4-argon"
  );

  // Then: Argon request is not exhausted
  assert.strictEqual(argonExhausted, false, "Argon must remain available when gemini_4_argon_weekly is 80% even if gemini_weekly is 0%");
});

test("Argon requests do not leak into gemini_weekly or claude_gpt_weekly when Argon weekly window is absent", () => {
  // Given: gemini_weekly is 0% and claude_gpt_weekly is 0%, and no Argon weekly window is present
  __clearForTests();
  const connectionId = "conn_argon_no_window";
  const futureReset = new Date(Date.now() + 86400000).toISOString();
  const quotas = {
    gemini_weekly: {
      remainingPercentage: 0,
      resetAt: futureReset,
    },
    claude_gpt_weekly: {
      remainingPercentage: 0,
      resetAt: futureReset,
    },
    "gemini-3.8-flash": {
      remainingPercentage: 100,
      resetAt: futureReset,
    },
  };

  setQuotaCache(connectionId, "antigravity", quotas);

  // When: checking quota exhaustion for antigravity/gemini-4-argon
  const argonExhausted = isQuotaExhaustedForRequest(
    connectionId,
    "antigravity",
    "antigravity/gemini-4-argon"
  );

  // Then: non-Argon windows never leak into Argon requests
  assert.strictEqual(argonExhausted, false, "Non-Argon windows must not mark Argon as exhausted when Argon weekly quota is absent");
});

