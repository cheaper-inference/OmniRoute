// CodeBuddy CN answers a rate limit with a message such as
//   {"code":6004,"message":"<model> exceeded the frequency limit, please retry at <time> afterwards"}
// written in Chinese, with a naive China Standard Time stamp. The retry hint reader must find that
// time. Before, no trigger word matched it, so even with "use upstream retry hints" on, the
// connection came back after the base cooldown. The oauth default (hints off) is not changed here.
import test from "node:test";
import assert from "node:assert/strict";
import {
  checkFallbackError,
  getProviderProfile,
  parseRetryFromErrorText,
} from "../../open-sse/services/accountFallback.ts";

const HOUR = 3_600_000;
const NOW = Date.parse("2026-11-13T10:00:00Z");

// Wall-clock text for `ms` in UTC+8, the zone the gateway writes in.
const cst = (ms: number) => new Date(ms + 8 * HOUR).toISOString().slice(0, 19).replace("T", " ");

const message = (atMs: number) => `当前模型超出频率限制，请于 ${cst(atMs)} 后重试`;

test("the CodeBuddy CN retry-at phrase is read as China Standard Time", () => {
  assert.equal(parseRetryFromErrorText(message(NOW + 2 * HOUR), "codebuddy-cn", NOW), 2 * HOUR);
});

test("a retry-at time in the past gives no hint", () => {
  assert.equal(parseRetryFromErrorText(message(NOW - HOUR), "codebuddy-cn", NOW), null);
});

test("with upstream retry hints on, a 6004 rate limit cools the connection down until the stated time", () => {
  const body = JSON.stringify({ code: 6004, message: message(Date.now() + 2 * HOUR) });
  const profile = { ...getProviderProfile("codebuddy-cn"), useUpstreamRetryHints: true };
  const result = checkFallbackError(429, body, 0, null, "codebuddy-cn", null, profile);
  assert.equal(result.usedUpstreamRetryHint, true);
  assert.ok(result.cooldownMs > HOUR && result.cooldownMs <= 2 * HOUR, `${result.cooldownMs}`);
});

test("a message without a time keeps the generic cooldown", () => {
  const body = JSON.stringify({ code: 6004, message: "当前模型超出频率限制" });
  const profile = { ...getProviderProfile("codebuddy-cn"), useUpstreamRetryHints: true };
  const result = checkFallbackError(429, body, 0, null, "codebuddy-cn", null, profile);
  assert.notEqual(result.usedUpstreamRetryHint, true);
});
