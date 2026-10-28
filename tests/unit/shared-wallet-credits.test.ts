// Grok Build, grok.com cookie sessions and xAI OAuth bill every surface against one shared wallet, so
// their 402 must not take the model-only lockout path. A 402 from one of those providers counts as a
// shared-wallet credit exhaustion when the body is empty or carries the usage-balance signal, and the
// generic credit check also accepts the signal next to the caller's own signals.
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  GROK_BUILD_USAGE_BALANCE_SIGNAL,
  isCreditsExhaustedWithSharedWallet,
  isSharedWalletCredits402,
  matchesSharedWalletCreditsBody,
} from "../../open-sse/services/accountFallback/sharedWalletCredits.ts";

test("the usage balance signal is matched in an already lowercased body", () => {
  assert.equal(GROK_BUILD_USAGE_BALANCE_SIGNAL, "usage balance exhausted");
  assert.equal(
    matchesSharedWalletCreditsBody("error: usage balance exhausted for this week"),
    true
  );
  assert.equal(matchesSharedWalletCreditsBody("insufficient credits"), false);
  assert.equal(matchesSharedWalletCreditsBody(""), false);
});

test("only a 402 from a shared-wallet provider can qualify", () => {
  for (const provider of ["grok-cli", "grok-web", "xai-oauth"]) {
    assert.equal(isSharedWalletCredits402(provider, 402), true, provider);
  }
  assert.equal(isSharedWalletCredits402("openai", 402), false);
  assert.equal(isSharedWalletCredits402("grok-cli", 429), false);
  assert.equal(isSharedWalletCredits402("grok-cli", 200, "usage balance exhausted"), false);
});

test("a missing provider never qualifies", () => {
  assert.equal(isSharedWalletCredits402(null, 402), false);
  assert.equal(isSharedWalletCredits402(undefined, 402), false);
});

test("an empty or blank body from a shared-wallet provider qualifies", () => {
  assert.equal(isSharedWalletCredits402("xai-oauth", 402, null), true);
  assert.equal(isSharedWalletCredits402("xai-oauth", 402, undefined), true);
  assert.equal(isSharedWalletCredits402("xai-oauth", 402, ""), true);
  assert.equal(isSharedWalletCredits402("xai-oauth", 402, "   \n"), true);
});

test("a body qualifies only when it carries the usage balance signal, in any case", () => {
  assert.equal(isSharedWalletCredits402("grok-web", 402, "Usage Balance Exhausted"), true);
  assert.equal(isSharedWalletCredits402("grok-web", 402, "payment required for this model"), false);
});

test("the credit check accepts the caller's signals or the shared-wallet signal", () => {
  assert.equal(
    isCreditsExhaustedWithSharedWallet("Insufficient CREDITS", ["insufficient credits"]),
    true
  );
  assert.equal(isCreditsExhaustedWithSharedWallet("Usage balance exhausted", []), true);
  assert.equal(
    isCreditsExhaustedWithSharedWallet("something else", ["insufficient credits"]),
    false
  );
  assert.equal(isCreditsExhaustedWithSharedWallet(undefined as unknown as string, []), false);
});
