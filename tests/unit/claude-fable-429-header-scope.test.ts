// A Claude explicit-quota 429 whose unified headers reject only the overage / model claim
// (shared 7d window allowed, no 5h window evaluated) must stay model scoped even when the
// cached usage windows are cold, so a Fable-only rejection cannot park the whole account.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-claude-fable-headers-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const { normalizeClaudeUsageQuotas } = await import("../../open-sse/services/usage/claudeQuota.ts");

const FABLE = "claude-fable-5-1";
const EXPLICIT_QUOTA_ERROR =
  "This request would exceed your account's rate limit. Please try again later.";
const P = "anthropic-ratelimit-unified-";

const FABLE_ONLY = {
  [`${P}status`]: "rejected",
  [`${P}7d-status`]: "allowed",
  [`${P}representative-claim`]: "seven_day_overage",
};

function decide(headers: Record<string, string> | undefined, connectionId = "cold-conn") {
  return quotaCache.getCachedClaudeQuotaScopeDecision({
    connectionId,
    provider: "claude",
    status: 429,
    errorText: EXPLICIT_QUOTA_ERROR,
    model: FABLE,
    headers,
  } as Parameters<typeof quotaCache.getCachedClaudeQuotaScopeDecision>[0]);
}

test.beforeEach(() => quotaCache.__clearForTests());
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a cold cache plus an overage-only rejection with 7d allowed is model scoped", () => {
  const decision = decide(FABLE_ONLY);
  assert.equal(decision.scope, "model");
  assert.equal(decision.evidence, "headroom");
});

test("header names match in any case and a plain Headers object works", () => {
  const upper = Object.fromEntries(
    Object.entries(FABLE_ONLY).map(([k, v]) => [k.toUpperCase(), v])
  );
  assert.equal(decide(upper).scope, "model");
  const headers = new Headers(FABLE_ONLY);
  const decision = quotaCache.getCachedClaudeQuotaScopeDecision({
    connectionId: "cold-conn",
    provider: "claude",
    status: 429,
    errorText: EXPLICIT_QUOTA_ERROR,
    model: FABLE,
    headers,
  } as Parameters<typeof quotaCache.getCachedClaudeQuotaScopeDecision>[0]);
  assert.equal(decision.scope, "model");
});

test("a real usage wall keeps connection scope", () => {
  const cases: Array<[string, Record<string, string>]> = [
    ["no headers", {}],
    ["5h window rejected", { ...FABLE_ONLY, [`${P}5h-status`]: "rejected" }],
    ["7d window rejected", { ...FABLE_ONLY, [`${P}7d-status`]: "rejected" }],
    ["5h utilization at 1.0", { ...FABLE_ONLY, [`${P}5h-utilization`]: "1.0" }],
    ["7d status absent", { [`${P}status`]: "rejected", [`${P}representative-claim`]: "overage" }],
    ["no overage claim", { [`${P}status`]: "rejected", [`${P}7d-status`]: "allowed" }],
    ["unified status allowed", { ...FABLE_ONLY, [`${P}status`]: "allowed" }],
  ];
  for (const [label, headers] of cases) {
    assert.equal(decide(headers).scope, "connection", label);
  }
});

test("a healthy 5h utilization below 1.0 does not stop model scoping", () => {
  assert.equal(decide({ ...FABLE_ONLY, [`${P}5h-utilization`]: "0.40" }).scope, "model");
});

test("fresh cached windows that block the account still win over the headers", () => {
  const now = Date.now();
  const usage = normalizeClaudeUsageQuotas({
    five_hour: { utilization: 100, resets_at: new Date(now + 3_600_000).toISOString() },
    seven_day: { utilization: 56, resets_at: new Date(now + 7 * 3_600_000).toISOString() },
  });
  quotaCache.setQuotaCache("warm-conn", "claude", usage.quotas, usage.modelQuotas);
  assert.equal(decide(FABLE_ONLY, "warm-conn").scope, "connection");
});

test("non-quota text and non-429 statuses are not rescoped by headers", () => {
  const input = {
    connectionId: "cold-conn",
    provider: "claude",
    status: 429,
    errorText: "TPM rate limit exceeded",
    model: FABLE,
    headers: FABLE_ONLY,
  };
  type In = Parameters<typeof quotaCache.getCachedClaudeQuotaScopeDecision>[0];
  assert.equal(quotaCache.getCachedClaudeQuotaScopeDecision(input as In).scope, "connection");
  assert.equal(
    quotaCache.getCachedClaudeQuotaScopeDecision({
      ...input,
      errorText: EXPLICIT_QUOTA_ERROR,
      status: 503,
    } as In).scope,
    "connection"
  );
});
