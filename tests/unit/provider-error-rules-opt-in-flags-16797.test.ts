// #16797 — opt-in widenings of the provider error-rule allowlists, each behind its own
// default-off feature flag. Exercises the real providerErrorRules.ts predicates and the
// real checkFallbackError (accountFallback.ts registers the flag reader at load), with
// the flag off (release behavior, unchanged) and on.
import test from "node:test";
import assert from "node:assert/strict";

delete process.env.OMNIROUTE_EGRESS_IP_LOCK_PROVIDERS;
const FLAGS = [
  "OPENCODE_ZEN_EGRESS_IP_LOCK_ENABLED",
  "OPENCODE_FULL_TEXT_ERROR_RULES_ENABLED",
  "CLOUDFLARE_AI_FULL_TEXT_ERROR_RULES_ENABLED",
];
for (const flag of FLAGS) delete process.env[flag];

const rules = await import("../../open-sse/config/providerErrorRules.ts");
const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
const core = await import("../../src/lib/db/core.ts");
const { isFeatureFlagEnabled } = await import("../../src/shared/utils/featureFlags.ts");

test.after(() => {
  for (const flag of FLAGS) delete process.env[flag];
  core.resetDbInstance();
});

function withFlag<T>(flag: string, fn: () => T): T {
  process.env[flag] = "true";
  try {
    return fn();
  } finally {
    delete process.env[flag];
  }
}

test("egress family: opencode-zen is out by default and in with the flag", () => {
  assert.equal(rules.isEgressBucketedLockScope("opencode-zen"), false);
  assert.deepEqual(rules.egressBucketedLockProviders(), ["opencode-cli", "opencode-go"]);
  withFlag("OPENCODE_ZEN_EGRESS_IP_LOCK_ENABLED", () => {
    assert.equal(rules.isEgressBucketedLockScope("opencode-zen"), true);
    assert.equal(rules.isEgressBucketedLockScope("OpenCode-Zen"), true, "case-insensitive");
    assert.deepEqual(rules.egressBucketedLockProviders(), [
      "opencode-cli",
      "opencode-go",
      "opencode-zen",
    ]);
  });
  assert.equal(rules.isEgressBucketedLockScope("opencode-zen"), false, "read per call");
});

test("egress family: an explicit OMNIROUTE_EGRESS_IP_LOCK_PROVIDERS value wins over the flag", () => {
  assert.deepEqual([...rules.resolveEgressIpLockProviders(undefined, false)].sort(), [
    "opencode-cli",
    "opencode-go",
  ]);
  assert.deepEqual([...rules.resolveEgressIpLockProviders("  ", true)].sort(), [
    "opencode-cli",
    "opencode-go",
    "opencode-zen",
  ]);
  assert.equal(rules.resolveEgressIpLockProviders("none", true).size, 0);
  assert.deepEqual([...rules.resolveEgressIpLockProviders("opencode-go", true)], ["opencode-go"]);
});

test("a throwing or missing flag reader fails closed to the release default", () => {
  try {
    rules.setProviderErrorRuleFlagReader(() => {
      throw new Error("flag store unavailable");
    });
    process.env.OPENCODE_ZEN_EGRESS_IP_LOCK_ENABLED = "true";
    assert.equal(rules.isEgressBucketedLockScope("opencode-zen"), false);
    rules.setProviderErrorRuleFlagReader(null);
    assert.equal(rules.isEgressBucketedLockScope("opencode-zen"), false);
  } finally {
    delete process.env.OPENCODE_ZEN_EGRESS_IP_LOCK_ENABLED;
    rules.setProviderErrorRuleFlagReader(isFeatureFlagEnabled);
  }
});

const STRUCTURED = { code: "rate_limited", type: "requests" };
const OPENCODE_QUOTA_BODY = '{"error":{"message":"organization_quota_exceeded"}}';
const CLOUDFLARE_DAILY_BODY =
  "you have used up your daily free allocation of 10,000 neurons, please upgrade";

test("full-text bodies: the opencode family keeps the structured body unless opted in", () => {
  for (const provider of ["opencode-zen", "opencode-go", "opencode-cli"]) {
    assert.equal(rules.resolveRuleMatchBody(provider, STRUCTURED, OPENCODE_QUOTA_BODY), STRUCTURED);
    withFlag("OPENCODE_FULL_TEXT_ERROR_RULES_ENABLED", () => {
      assert.equal(
        rules.resolveRuleMatchBody(provider, STRUCTURED, OPENCODE_QUOTA_BODY),
        OPENCODE_QUOTA_BODY,
        provider
      );
      // The opencode flag never widens another provider.
      assert.equal(
        rules.resolveRuleMatchBody("cloudflare-ai", STRUCTURED, CLOUDFLARE_DAILY_BODY),
        STRUCTURED
      );
    });
  }
  assert.equal(
    rules.resolveRuleMatchBody("agentrouter", STRUCTURED, "用户额度不足"),
    "用户额度不足"
  );
});

test("full-text bodies: cloudflare-ai keeps the structured body unless opted in", () => {
  assert.equal(
    rules.resolveRuleMatchBody("cloudflare-ai", STRUCTURED, CLOUDFLARE_DAILY_BODY),
    STRUCTURED
  );
  withFlag("CLOUDFLARE_AI_FULL_TEXT_ERROR_RULES_ENABLED", () => {
    assert.equal(
      rules.resolveRuleMatchBody("cloudflare-ai", STRUCTURED, CLOUDFLARE_DAILY_BODY),
      CLOUDFLARE_DAILY_BODY
    );
    assert.equal(
      rules.resolveRuleMatchBody("opencode-zen", STRUCTURED, OPENCODE_QUOTA_BODY),
      STRUCTURED
    );
  });
});

test("checkFallbackError: an opencode-zen quota body stays a rate limit by default", () => {
  const off = checkFallbackError(429, OPENCODE_QUOTA_BODY, 0, null, "opencode-zen", null);
  assert.equal(off.shouldFallback, true);
  assert.equal(off.reason, "rate_limit_exceeded");
  assert.equal(off.ruleScope, undefined);
  const on = withFlag("OPENCODE_FULL_TEXT_ERROR_RULES_ENABLED", () =>
    checkFallbackError(429, OPENCODE_QUOTA_BODY, 0, null, "opencode-zen", null)
  );
  assert.equal(on.shouldFallback, true);
  assert.equal(on.reason, "quota_exhausted");
  assert.equal(on.ruleScope, "connection");
});

test("checkFallbackError: the cloudflare-ai daily allocation body is a quota only when opted in", () => {
  const off = checkFallbackError(429, CLOUDFLARE_DAILY_BODY, 0, null, "cloudflare-ai", null);
  assert.equal(off.shouldFallback, true);
  assert.notEqual(off.reason, "quota_exhausted");
  const on = withFlag("CLOUDFLARE_AI_FULL_TEXT_ERROR_RULES_ENABLED", () =>
    checkFallbackError(429, CLOUDFLARE_DAILY_BODY, 0, null, "cloudflare-ai", null)
  );
  assert.equal(on.shouldFallback, true);
  assert.equal(on.reason, "quota_exhausted");
});
