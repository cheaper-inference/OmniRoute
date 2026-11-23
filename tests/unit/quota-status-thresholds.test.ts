import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import * as utils from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils";

const {
  QUOTA_STATUS_HEALTHY_ABOVE,
  QUOTA_STATUS_CRITICAL_AT_OR_BELOW,
  quotaStatusLevel,
  getBarColor,
  worstStatus,
} = utils;

const PROVIDER_LIMITS_DIR = join(
  process.cwd(),
  "src/app/(dashboard)/dashboard/usage/components/ProviderLimits"
);

const LEVEL_BY_BAR_COLOR: Record<string, "ok" | "alert" | "critical"> = {
  "#22c55e": "ok",
  "#eab308": "alert",
  "#ef4444": "critical",
};

test("quota status boundaries keep the live 50/20 policy", () => {
  assert.equal(QUOTA_STATUS_HEALTHY_ABOVE, 50);
  assert.equal(QUOTA_STATUS_CRITICAL_AT_OR_BELOW, 20);
});

test("quotaStatusLevel classifies the boundary values", () => {
  assert.equal(quotaStatusLevel(100), "ok");
  assert.equal(quotaStatusLevel(50.1), "ok");
  assert.equal(quotaStatusLevel(50), "alert");
  assert.equal(quotaStatusLevel(20.1), "alert");
  assert.equal(quotaStatusLevel(20), "critical");
  assert.equal(quotaStatusLevel(0), "critical");
});

test("bar colour, card status and quotaStatusLevel agree across 0..100", () => {
  for (let p = 0; p <= 100; p += 0.5) {
    const level = quotaStatusLevel(p);
    assert.equal(LEVEL_BY_BAR_COLOR[getBarColor(p).bar], level, `getBarColor(${p})`);
    assert.equal(worstStatus([{ remainingPercentage: p }]), level, `worstStatus(${p})`);
  }
});

test("the contradictory 70/30 helpers are gone from ProviderLimits/utils", () => {
  assert.equal("getStatusColor" in utils, false);
  assert.equal("getStatusEmoji" in utils, false);
});

test("ProviderLimits/index.tsx no longer redeclares the thresholds", () => {
  const source = readFileSync(join(PROVIDER_LIMITS_DIR, "index.tsx"), "utf8");
  assert.doesNotMatch(source, /QUOTA_BAR_GREEN_THRESHOLD/);
  assert.doesNotMatch(source, /QUOTA_BAR_YELLOW_THRESHOLD/);
  assert.match(source, /quotaStatusLevel\(/);
});

test("getBarColor keeps rendering a non-numeric percentage red", () => {
  assert.equal(getBarColor(Number.NaN).bar, "#ef4444");
});
