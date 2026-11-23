import { describe, it, beforeEach } from "node:test";
import { strict as assert } from "node:assert";

import {
  OAUTH_USAGE_429_COOLDOWN_MS,
  OAUTH_USAGE_429_MAX_COOLDOWN_MS,
  _claudeOauthUsageCooldownKeysForTest,
  _resetClaudeOauthUsageCooldown,
  computeClaudeUsageRetryMs,
  hashClaudeCredential,
  isClaudeOauthUsageCoolingDown,
  markClaudeOauthUsage429,
} from "../../open-sse/services/claudeUsageCooldown.ts";

describe("claude OAuth usage 429 backoff", () => {
  beforeEach(() => {
    _resetClaudeOauthUsageCooldown();
  });

  it("starts uncooled for any token", () => {
    assert.equal(isClaudeOauthUsageCoolingDown("tok-a"), false);
    assert.equal(isClaudeOauthUsageCoolingDown(undefined), false);
  });

  it("treats a single 429 as entering cooldown for that token only", () => {
    const t0 = 1_000_000;
    markClaudeOauthUsage429("tok-a", t0);
    assert.equal(isClaudeOauthUsageCoolingDown("tok-a", t0 + 1), true);
    // A different token is unaffected — cooldown is per-token, not global.
    assert.equal(isClaudeOauthUsageCoolingDown("tok-b", t0 + 1), false);
  });

  it("repeated 429s on the same token do NOT spam: stays cooling once entered", () => {
    const t0 = 2_000_000;
    markClaudeOauthUsage429("tok-a", t0);
    // Simulate the scheduler hitting 429 again 10s, 30s, 60s later
    for (const dt of [10_000, 30_000, 60_000]) {
      markClaudeOauthUsage429("tok-a", t0 + dt);
      assert.equal(
        isClaudeOauthUsageCoolingDown("tok-a", t0 + dt),
        true,
        `still cooling at +${dt}ms`
      );
    }
  });

  it("cooldown expires after OAUTH_USAGE_429_COOLDOWN_MS and the token becomes eligible again", () => {
    const t0 = 3_000_000;
    markClaudeOauthUsage429("tok-a", t0);
    assert.equal(
      isClaudeOauthUsageCoolingDown("tok-a", t0 + OAUTH_USAGE_429_COOLDOWN_MS - 1),
      true
    );
    assert.equal(
      isClaudeOauthUsageCoolingDown("tok-a", t0 + OAUTH_USAGE_429_COOLDOWN_MS + 1),
      false,
      "should be eligible again after cooldown window"
    );
  });

  it("undefined/missing access token is a no-op (does not poison the map)", () => {
    const t0 = 4_000_000;
    markClaudeOauthUsage429(undefined, t0);
    assert.equal(isClaudeOauthUsageCoolingDown(undefined, t0 + 1), false);
  });

  it("cooldown defaults to 3 minutes (matches upstream OAUTH_429_COOLDOWN_MS)", () => {
    assert.equal(OAUTH_USAGE_429_COOLDOWN_MS, 180_000);
  });
});

describe("claude OAuth usage 429 backoff — Retry-After aware cooldown", () => {
  const now = 1_800_000_000_000;

  it("honors a numeric Retry-After inside the [3 min, 30 min] window", () => {
    const headers = new Headers({ "retry-after": "600" });
    assert.equal(computeClaudeUsageRetryMs(headers, now), 600_000);
  });

  it("clamps a short Retry-After up to the 3-minute floor", () => {
    const headers = new Headers({ "retry-after": "5" });
    assert.equal(computeClaudeUsageRetryMs(headers, now), OAUTH_USAGE_429_COOLDOWN_MS);
  });

  it("clamps a huge Retry-After down to the 30-minute ceiling", () => {
    const headers = new Headers({ "retry-after": "86400" });
    assert.equal(computeClaudeUsageRetryMs(headers, now), OAUTH_USAGE_429_MAX_COOLDOWN_MS);
    assert.equal(OAUTH_USAGE_429_MAX_COOLDOWN_MS, 30 * 60_000);
  });

  it("accepts an HTTP-date Retry-After", () => {
    const headers = new Headers({ "retry-after": new Date(now + 600_000).toUTCString() });
    assert.equal(computeClaudeUsageRetryMs(headers, now), 600_000);
  });

  it("falls back to the latest anthropic-ratelimit-*-reset header (epoch seconds)", () => {
    const headers = new Headers({
      "anthropic-ratelimit-unified-reset": String(Math.floor((now + 900_000) / 1000)),
      "anthropic-ratelimit-requests-reset": String(Math.floor((now + 400_000) / 1000)),
    });
    assert.equal(computeClaudeUsageRetryMs(headers, now), 900_000);
  });

  it("accepts an ISO anthropic-ratelimit-*-reset header and ignores past resets", () => {
    const iso = new Headers({
      "anthropic-ratelimit-unified-reset": new Date(now + 1_200_000).toISOString(),
    });
    assert.equal(computeClaudeUsageRetryMs(iso, now), 1_200_000);
    const past = new Headers({
      "anthropic-ratelimit-unified-reset": String(Math.floor((now - 60_000) / 1000)),
    });
    assert.equal(computeClaudeUsageRetryMs(past, now), OAUTH_USAGE_429_COOLDOWN_MS);
  });

  it("Retry-After wins over reset headers", () => {
    const headers = new Headers({
      "retry-after": "240",
      "anthropic-ratelimit-unified-reset": String(Math.floor((now + 900_000) / 1000)),
    });
    assert.equal(computeClaudeUsageRetryMs(headers, now), 240_000);
  });

  it("defaults to 3 minutes without any hint", () => {
    assert.equal(computeClaudeUsageRetryMs(new Headers(), now), OAUTH_USAGE_429_COOLDOWN_MS);
    assert.equal(computeClaudeUsageRetryMs(null, now), OAUTH_USAGE_429_COOLDOWN_MS);
  });

  it("a custom cooldownMs passed to markClaudeOauthUsage429 is honored", () => {
    _resetClaudeOauthUsageCooldown();
    markClaudeOauthUsage429("tok-c", now, 600_000);
    assert.equal(isClaudeOauthUsageCoolingDown("tok-c", now + 590_000), true);
    assert.equal(isClaudeOauthUsageCoolingDown("tok-c", now + 610_000), false);
  });
});

describe("claude OAuth usage cooldown — credential hygiene", () => {
  beforeEach(() => {
    _resetClaudeOauthUsageCooldown();
  });

  it("never keeps the raw access token as a map key", () => {
    markClaudeOauthUsage429("sk-ant-oat01-raw-secret-token", 5_000_000);
    const keys = _claudeOauthUsageCooldownKeysForTest();
    assert.equal(keys.length, 1);
    assert.equal(keys.includes("sk-ant-oat01-raw-secret-token"), false);
    assert.equal(keys[0], hashClaudeCredential("sk-ant-oat01-raw-secret-token"));
    assert.match(keys[0], /^[0-9a-f]{64}$/);
  });
});
