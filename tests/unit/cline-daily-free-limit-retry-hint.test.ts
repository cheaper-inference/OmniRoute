import test from "node:test";
import assert from "node:assert/strict";
import {
  parseRetryFromErrorText,
  parseDetailedRetryFromErrorText,
  checkFallbackError,
  hasPerModelQuota,
} from "../../open-sse/services/accountFallback.ts";

const MODEL = "cline-free/deepseek-v4.1-flash";
const body = (tail: string) => `Daily free limit reached on model ${MODEL}. ${tail}`;
const MAX_PROVIDER_COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000;

test("cline: 'Try again in 19h 39m' parses to 19h39m", () => {
  assert.equal(parseRetryFromErrorText(body("Try again in 19h 39m"), "cline"), 70_740_000);
});

test("cline: a glued '19h39m' countdown parses the same", () => {
  assert.equal(parseRetryFromErrorText(body("Try again in 19h39m"), "cline"), 70_740_000);
});

test("cline: minutes-only, hours-only and seconds-only countdowns", () => {
  assert.equal(parseRetryFromErrorText(body("Try again in 39m"), "cline"), 2_340_000);
  assert.equal(parseRetryFromErrorText(body("Try again in 2h"), "cline"), 7_200_000);
  assert.equal(parseRetryFromErrorText(body("Try again in 45s"), "cline"), 45_000);
});

test("cline: no duration yields no hint", () => {
  assert.equal(parseRetryFromErrorText(body(""), "cline"), null);
  assert.equal(parseRetryFromErrorText("Try again in a moment.", "cline"), null);
});

test("cline: the countdown stays capped at MAX_PROVIDER_COOLDOWN_MS", () => {
  assert.equal(
    parseRetryFromErrorText(body("Try again in 999h"), "cline"),
    MAX_PROVIDER_COOLDOWN_MS
  );
});

test("the phrase is gated on the cline provider", () => {
  assert.equal(parseRetryFromErrorText(body("Try again in 19h 39m"), "openai"), null);
});

test("cline: the countdown is read inside a JSON error envelope", () => {
  const wrapped = JSON.stringify({ error: { message: body("Try again in 19h 39m") } });
  assert.equal(parseRetryFromErrorText(wrapped, "cline"), 70_740_000);
});

test("cline hint keeps the operator-capped 'body' provenance", () => {
  assert.equal(
    parseDetailedRetryFromErrorText(body("Try again in 19h 39m"), "cline")?.provenance,
    "body"
  );
});

test("cline daily free 429 becomes a quota_exhausted model hint", () => {
  const r = checkFallbackError(429, body("Try again in 19h 39m"), 0, MODEL, "cline");
  assert.equal(r.reason, "quota_exhausted");
  assert.equal(r.quotaResetHintMs, 70_740_000);
  assert.equal(r.retryHintSource, "body");
  assert.equal(hasPerModelQuota("cline", MODEL), true); // model scope, not connection
});
