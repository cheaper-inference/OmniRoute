import test from "node:test";
import assert from "node:assert/strict";
import { checkFallbackError } from "../../open-sse/services/accountFallback.ts";
import {
  getProviderErrorRuleMatch,
  getCodebuddyRequestIllegalMatch,
  honorsRuleLockScope,
} from "../../open-sse/config/providerErrorRules.ts";

/**
 * CodeBuddy Intl answers a WAF / anti-abuse block with HTTP 400 code 11128
 * "request illegal". The block is connection-wide (every request fails while it lasts,
 * the identical request succeeds minutes later), but the body matches no 400 pattern,
 * so it fell through to the generic 400 → { shouldFallback: false, cooldownMs: 0 } and
 * the router kept firing into the block so it never expired.
 *
 * Code 11128 is overloaded: "first message is not system prompt" is request-scoped and
 * must keep the zero-cooldown generic 400, so the rule matches the text, never the code.
 */

const REQUEST_ILLEGAL = '{"code":11128,"msg":"11128:request illegal"}';
const FIRST_MESSAGE = '{"code":11128,"msg":"first message is not system prompt"}';

test("codebuddy-intl 400 'request illegal' backs the connection off (not cooldown 0)", () => {
  const r = checkFallbackError(400, REQUEST_ILLEGAL, 0, null, "codebuddy-intl");
  assert.equal(r.shouldFallback, true);
  assert.ok(r.cooldownMs > 0, `expected a non-zero cooldown, got ${r.cooldownMs}`);
  assert.equal(r.reason, "rate_limit_exceeded");
  assert.equal(r.newBackoffLevel, 1);
});

test("repeated blocks escalate the backoff instead of staying flat", () => {
  const first = checkFallbackError(400, REQUEST_ILLEGAL, 0, null, "codebuddy-intl");
  const later = checkFallbackError(400, REQUEST_ILLEGAL, 3, null, "codebuddy-intl");
  assert.ok(later.cooldownMs > first.cooldownMs, `${later.cooldownMs} > ${first.cooldownMs}`);
  assert.equal(later.newBackoffLevel, 4);
});

test("the cbai alias is covered too", () => {
  const r = checkFallbackError(400, REQUEST_ILLEGAL, 0, null, "cbai");
  assert.equal(r.shouldFallback, true);
  assert.ok(r.cooldownMs > 0);
});

test("the request-scoped 11128 'first message is not system prompt' keeps cooldown 0", () => {
  const r = checkFallbackError(400, FIRST_MESSAGE, 0, null, "codebuddy-intl");
  assert.equal(r.shouldFallback, false);
  assert.equal(r.cooldownMs, 0);
});

test("the same text under another provider keeps the generic 400 (cooldown 0)", () => {
  for (const provider of ["openai", "codebuddy-cn", "agentrouter", null]) {
    const r = checkFallbackError(400, REQUEST_ILLEGAL, 0, null, provider);
    assert.equal(r.shouldFallback, false, String(provider));
    assert.equal(r.cooldownMs, 0, String(provider));
  }
});

test("registry: 400-only, connection scope, no explicit cooldown (exponential backoff)", () => {
  assert.deepStrictEqual(getProviderErrorRuleMatch("codebuddy-intl", 400, {}, REQUEST_ILLEGAL), {
    reason: "rate_limit_exceeded",
    scope: "connection",
  });
  assert.equal(getProviderErrorRuleMatch("codebuddy-intl", 429, {}, REQUEST_ILLEGAL), null);
  assert.equal(getProviderErrorRuleMatch("codebuddy-intl", 400, {}, FIRST_MESSAGE), null);
  assert.equal(getCodebuddyRequestIllegalMatch("openai", 400, null, REQUEST_ILLEGAL), null);
  assert.equal(getCodebuddyRequestIllegalMatch("codebuddy-intl", 403, null, REQUEST_ILLEGAL), null);
  // Not in the lock-scope allowlist: the default connection cooldown persistence applies.
  assert.equal(honorsRuleLockScope("codebuddy-intl"), false);
});
