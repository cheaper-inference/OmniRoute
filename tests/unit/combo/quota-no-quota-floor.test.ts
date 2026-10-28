/**
 * resetAwareNoQuotaFloor: connections without quota telemetry used to score a
 * hardcoded 0.5 in the reset-aware strategy. In a mixed fleet (some providers
 * with quota fetchers, some without) that fixed midpoint may be exactly wrong
 * — an operator may want no-telemetry members to rank consistently lower (a
 * small floor) so telemetry-backed pools lead, or higher (a large floor) as a
 * protected reserve. The floor is now a per-combo config field alongside the
 * other resetAware* weights, defaulting to the historical 0.5.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { resolveResetAwareConfig, scoreResetAwareQuota } = await import(
  "../../../open-sse/services/combo/quotaScoring.ts"
);

test("1. default floor stays the historical 0.5", () => {
  const config = resolveResetAwareConfig({});
  assert.equal(config.noQuotaFloor, 0.5);
  assert.equal(scoreResetAwareQuota(null, config).score, 0.5);
  assert.equal(scoreResetAwareQuota(undefined, config).score, 0.5);
  assert.equal(scoreResetAwareQuota("not-a-record", config).score, 0.5);
});

test("2. custom floor is honored for quota-less connections only", () => {
  const config = resolveResetAwareConfig({ resetAwareNoQuotaFloor: 0.05 });
  assert.equal(config.noQuotaFloor, 0.05);
  assert.equal(scoreResetAwareQuota(null, config).score, 0.05);
  // limitReached keeps outranking everything, floor or not.
  assert.equal(scoreResetAwareQuota({ limitReached: true }, config).score, -Infinity);
  // A connection WITH telemetry scores from its windows, untouched by the floor.
  const telemed = scoreResetAwareQuota(
    {
      windows: [
        { type: "session", remaining: 0.8, resetAt: Date.now() + 3600_000 },
        { type: "weekly", remaining: 0.9, resetAt: Date.now() + 86_400_000 },
      ],
    },
    config
  );
  const telemedDefault = scoreResetAwareQuota(
    {
      windows: [
        { type: "session", remaining: 0.8, resetAt: Date.now() + 3600_000 },
        { type: "weekly", remaining: 0.9, resetAt: Date.now() + 86_400_000 },
      ],
    },
    resolveResetAwareConfig({})
  );
  assert.equal(telemed.score, telemedDefault.score);
});

test("3. floor is clamped to [0,1]; invalid values fall back to the default", () => {
  assert.equal(resolveResetAwareConfig({ resetAwareNoQuotaFloor: 7 }).noQuotaFloor, 1);
  assert.equal(resolveResetAwareConfig({ resetAwareNoQuotaFloor: -2 }).noQuotaFloor, 0);
  assert.equal(resolveResetAwareConfig({ resetAwareNoQuotaFloor: "banana" }).noQuotaFloor, 0.5);
  assert.equal(resolveResetAwareConfig({ resetAwareNoQuotaFloor: null }).noQuotaFloor, 0); // family semantics: Number(null)=0, same as every resetAware* weight
});

test("4. floor of 0 lets a no-telemetry member act as last-resort only against exhaustion", () => {
  const config = resolveResetAwareConfig({ resetAwareNoQuotaFloor: 0 });
  // A no-quota member scores 0 — below any telemetry-backed member with quota
  // left, but still above limitReached (-Infinity), so it stays reachable as a
  // final fallback.
  assert.equal(scoreResetAwareQuota(null, config).score, 0);
  assert.ok(scoreResetAwareQuota(null, config).score > scoreResetAwareQuota({ limitReached: true }, config).score);
});
