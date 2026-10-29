// Antigravity answered `429 Resource has been exhausted (e.g. check quota)` — no retry
// hint — to every Claude Code request (a refusal of the request content, not quota), and
// three retry layers turned one prompt into ~45 refused upstream calls (2026-10-24).
// The guard bounds the per-request 429s and remembers bodies that spent that budget.
import test from "node:test";
import assert from "node:assert/strict";

import {
  ANTIGRAVITY_429_ATTEMPTS_DEFAULT,
  REFUSAL_BLOCK_BASE_MS,
  REFUSAL_BLOCK_MAX_MS,
  buildAntigravityRefusalReplayResponse,
  fingerprintAntigravityRequest,
  getActiveAntigravityRefusal,
  getAntigravity429AttemptBudget,
  isAntigravityRefusalReplay,
  rememberAntigravity429Refusal,
  resetAntigravity429GuardForTests,
  usesAntigravity429Budget,
} from "../../open-sse/services/antigravity429Guard.ts";

test.afterEach(() => {
  resetAntigravity429GuardForTests();
});

function envelope(overrides: Record<string, unknown> = {}, request: Record<string, unknown> = {}) {
  return {
    project: "project-1",
    requestId: "agent-aaaa",
    model: "gemini-3.8-flash-high",
    userAgent: "antigravity",
    requestType: "agent",
    request: {
      sessionId: "-111",
      contents: [{ role: "user", parts: [{ text: "hi" }] }],
      systemInstruction: { role: "user", parts: [{ text: "You are a Claude agent" }] },
      generationConfig: { maxOutputTokens: 1000 },
      ...request,
    },
    ...overrides,
  };
}

test("the 429 budget defaults to 2 and honours ANTIGRAVITY_MAX_429_ATTEMPTS within 1..12", () => {
  assert.equal(ANTIGRAVITY_429_ATTEMPTS_DEFAULT, 2);
  assert.equal(getAntigravity429AttemptBudget({}), 2);
  assert.equal(getAntigravity429AttemptBudget({ ANTIGRAVITY_MAX_429_ATTEMPTS: "1" }), 1);
  assert.equal(getAntigravity429AttemptBudget({ ANTIGRAVITY_MAX_429_ATTEMPTS: "4" }), 4);
  assert.equal(getAntigravity429AttemptBudget({ ANTIGRAVITY_MAX_429_ATTEMPTS: "50" }), 12);
  assert.equal(getAntigravity429AttemptBudget({ ANTIGRAVITY_MAX_429_ATTEMPTS: "0" }), 2);
  assert.equal(getAntigravity429AttemptBudget({ ANTIGRAVITY_MAX_429_ATTEMPTS: "abc" }), 2);
});

test("the fingerprint ignores per-call ids but follows account, model and content", () => {
  const base = fingerprintAntigravityRequest("conn-1", envelope());
  assert.equal(
    fingerprintAntigravityRequest(
      "conn-1",
      envelope({ requestId: "agent-bbbb", project: "other" }, { sessionId: "-222" })
    ),
    base,
    "a client retry of the same body must map to the same key"
  );
  assert.notEqual(fingerprintAntigravityRequest("conn-2", envelope()), base);
  assert.notEqual(
    fingerprintAntigravityRequest("conn-1", envelope({ model: "gemini-3.8-flash-low" })),
    base
  );
  assert.notEqual(
    fingerprintAntigravityRequest(
      "conn-1",
      envelope({}, { contents: [{ role: "user", parts: [{ text: "other" }] }] })
    ),
    base
  );
});

test("without an upstream hint the block starts at 2 min, doubles on repeats and caps at 30 min", () => {
  const t0 = 1_000_000;
  const first = rememberAntigravity429Refusal("k", null, t0);
  assert.deepEqual(first, { blockMs: REFUSAL_BLOCK_BASE_MS, strikes: 1 });
  assert.equal(getActiveAntigravityRefusal("k", t0 + 1000)?.strikes, 1);
  assert.equal(getActiveAntigravityRefusal("k", t0 + REFUSAL_BLOCK_BASE_MS), null);

  // Refused again after the block ended (within the strike window): twice as long.
  const t1 = t0 + REFUSAL_BLOCK_BASE_MS + 5000;
  assert.deepEqual(rememberAntigravity429Refusal("k", null, t1), {
    blockMs: REFUSAL_BLOCK_BASE_MS * 2,
    strikes: 2,
  });

  let now = t1;
  let last = { blockMs: 0, strikes: 0 };
  for (let i = 0; i < 10; i++) {
    now += 1000;
    last = rememberAntigravity429Refusal("k", null, now);
  }
  assert.equal(last.blockMs, REFUSAL_BLOCK_MAX_MS);
});

test("an upstream retry hint sets the block length (capped at 30 min)", () => {
  assert.equal(rememberAntigravity429Refusal("a", 7000, 0).blockMs, 7000);
  assert.equal(
    rememberAntigravity429Refusal("b", 5 * 60 * 60 * 1000, 0).blockMs,
    REFUSAL_BLOCK_MAX_MS
  );
});

test("the local answer is a 429 with Retry-After that the chat handler recognises", async () => {
  const response = buildAntigravityRefusalReplayResponse({ remainingMs: 90_500, strikes: 2 });
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("Retry-After"), "91");
  const json = (await response.json()) as { error: { message: string; status: string } };
  assert.equal(json.error.status, "RESOURCE_EXHAUSTED");
  assert.equal(isAntigravityRefusalReplay(429, `[429]: ${json.error.message}`), true);
  assert.equal(
    isAntigravityRefusalReplay(429, "[429]: Resource has been exhausted (e.g. check quota)."),
    false,
    "a real upstream 429 must keep the normal cooldown path"
  );
  assert.equal(isAntigravityRefusalReplay(400, json.error.message), false);
});

test("only the providers served by AntigravityExecutor use the budget", () => {
  assert.equal(usesAntigravity429Budget("agy"), true);
  assert.equal(usesAntigravity429Budget("antigravity"), true);
  assert.equal(usesAntigravity429Budget("gemini"), false);
  assert.equal(usesAntigravity429Budget(null), false);
});
