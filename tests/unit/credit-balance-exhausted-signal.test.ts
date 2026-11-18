import test from "node:test";
import assert from "node:assert/strict";
import { CREDITS_EXHAUSTED_SIGNALS } from "../../open-sse/services/accountFallback/creditExhaustionSignals.ts";
import { isCreditsExhaustedWithSharedWallet } from "../../open-sse/services/accountFallback/sharedWalletCredits.ts";

// Pro and Business subscriptions grant monthly API credits that need no payment
// method. When the balance hits zero the organization's requests fail with HTTP
// 429 and error code `credit_balance_exhausted`. That is terminal until credits
// are added, so it must not be treated as a rate limit that clears on its own.
function classifies(errorText: string): boolean {
  return isCreditsExhaustedWithSharedWallet(errorText.toLowerCase(), CREDITS_EXHAUSTED_SIGNALS);
}

test("the grant-credit 429 code alone classifies as credits exhausted", () => {
  // What the API actually returns: the new code sits next to the older type.
  const body = JSON.stringify({
    error: {
      message: "You have no credits remaining.",
      type: "insufficient_quota",
      code: "credit_balance_exhausted",
    },
  });
  assert.equal(classifies(body), true);
});

test("the bare code with nothing else still classifies", () => {
  // A handler that surfaces only `error.code` must not fall through to the
  // rate-limit branch and keep re-selecting an account that cannot recover
  // until someone buys credits.
  assert.equal(classifies('{"error":{"code":"credit_balance_exhausted"}}'), true);
});

test("a plain rate-limit body is not misread as credit exhaustion", () => {
  const body = JSON.stringify({
    error: { message: "Rate limit reached for gpt-6.1-sol.", code: "rate_limit_exceeded" },
  });
  assert.equal(classifies(body), false);
});

test("the signal is matched regardless of the casing the upstream uses", () => {
  // isCreditsExhaustedWithSharedWallet lowercases before matching, so a provider
  // that shouts the code must still land on the terminal branch.
  assert.equal(classifies('{"error":{"code":"Credit_Balance_Exhausted"}}'), true);
});

test("the signals that were already in the list still classify", () => {
  // The change appends to a shared list every provider consults. A shadowing or
  // ordering regression would silently reclassify OpenAI-style terminal billing
  // errors as retryable rate limits.
  for (const body of [
    '{"error":{"type":"insufficient_quota"}}',
    '{"error":{"message":"You have run out of funds"}}',
    '{"error":{"code":"insufficient_user_quota"}}',
  ]) {
    assert.equal(classifies(body), true, `expected ${body} to stay terminal`);
  }
});
