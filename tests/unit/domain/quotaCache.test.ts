import test from "node:test";
import assert from "node:assert/strict";
import {
  setQuotaCache,
  isQuotaExhaustedForRequest,
  __clearForTests,
} from "../../../src/domain/quotaCache.ts";

test("Argon weekly exhaustion isolates gemini-4-argon without blocking gemini-3.8-flash", () => {
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

  assert.equal(
    argonExhausted,
    true,
    "gemini-4-argon must be exhausted when gemini_4_argon_weekly is 0%"
  );
  assert.equal(
    argonHighExhausted,
    true,
    "gemini-4-argon-high must be exhausted when gemini_4_argon_weekly is 0%"
  );
  assert.equal(
    flashExhausted,
    false,
    "gemini-3.8-flash must not be blocked by Argon weekly exhaustion"
  );
});

test("Argon requests ignore exhausted gemini_weekly when gemini_4_argon_weekly is available", () => {
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

  const argonExhausted = isQuotaExhaustedForRequest(
    connectionId,
    "antigravity",
    "antigravity/gemini-4-argon"
  );

  assert.equal(
    argonExhausted,
    false,
    "Argon must remain available when gemini_4_argon_weekly is 80% even if gemini_weekly is 0%"
  );
});

test("Ultra plan: Argon requests fall back to gemini_weekly when dedicated Argon group is absent", () => {
  __clearForTests();
  const connectionId = "conn_ultra_argon_exhausted";
  const futureReset = new Date(Date.now() + 86400000).toISOString();
  const quotas = {
    gemini_weekly: {
      remainingPercentage: 0,
      resetAt: futureReset,
    },
    claude_gpt_weekly: {
      remainingPercentage: 100,
      resetAt: futureReset,
    },
  };

  setQuotaCache(connectionId, "antigravity", quotas);

  const argonExhausted = isQuotaExhaustedForRequest(
    connectionId,
    "antigravity",
    "antigravity/gemini-4-argon"
  );
  const flashExhausted = isQuotaExhaustedForRequest(
    connectionId,
    "antigravity",
    "antigravity/gemini-3.8-flash"
  );

  assert.equal(
    argonExhausted,
    true,
    "Argon must fall back to gemini_weekly and be marked exhausted on Ultra plans when Gemini is 0%"
  );
  assert.equal(flashExhausted, true, "Gemini models are also exhausted when gemini_weekly is 0%");
});

test("Ultra plan: Argon requests remain available when gemini_weekly has remaining quota and do not leak into claude_gpt_weekly", () => {
  __clearForTests();
  const connectionId = "conn_ultra_argon_available";
  const futureReset = new Date(Date.now() + 86400000).toISOString();
  const quotas = {
    gemini_weekly: {
      remainingPercentage: 75,
      resetAt: futureReset,
    },
    claude_gpt_weekly: {
      remainingPercentage: 0,
      resetAt: futureReset,
    },
  };

  setQuotaCache(connectionId, "antigravity", quotas);

  const argonExhausted = isQuotaExhaustedForRequest(
    connectionId,
    "antigravity",
    "antigravity/gemini-4-argon"
  );

  assert.equal(
    argonExhausted,
    false,
    "Argon must remain available when gemini_weekly has quota, even if claude_gpt_weekly is 0%"
  );
});

test("Non-Gemini accounts: Argon requests do not leak into claude_gpt_weekly when both Argon and Gemini windows are absent", () => {
  __clearForTests();
  const connectionId = "conn_claude_only";
  const futureReset = new Date(Date.now() + 86400000).toISOString();
  const quotas = {
    claude_gpt_weekly: {
      remainingPercentage: 0,
      resetAt: futureReset,
    },
  };

  setQuotaCache(connectionId, "antigravity", quotas);

  const argonExhausted = isQuotaExhaustedForRequest(
    connectionId,
    "antigravity",
    "antigravity/gemini-4-argon"
  );

  assert.equal(
    argonExhausted,
    false,
    "Argon must not leak into claude_gpt_weekly when no Gemini or Argon windows exist"
  );
});
