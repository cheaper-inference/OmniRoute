/**
 * Auto-apply banked resets — client-side helpers of the settings card
 * (src/app/(dashboard)/dashboard/settings/components/bankedResetAutoApplyClient.ts).
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  clampBankedResetNumber,
  isConnectionInScope,
  mergeBankedResetAutoApplyClient,
  setConnectionInScope,
} from "../../src/app/(dashboard)/dashboard/settings/components/bankedResetAutoApplyClient.ts";
import { createBankedResetAutoApplyDefaults } from "../../src/shared/constants/bankedResetAutoApply.ts";
import { mergeBankedResetAutoApplySettings } from "../../src/lib/usage/bankedResetPolicy.ts";

test("clamp: rounds, bounds to [0, max], falls back on non-numbers", () => {
  assert.equal(clampBankedResetNumber("12.6", 100, 5), 13);
  assert.equal(clampBankedResetNumber("-4", 100, 5), 0);
  assert.equal(clampBankedResetNumber("500", 100, 5), 100);
  assert.equal(clampBankedResetNumber("", 100, 5), 5);
  assert.equal(clampBankedResetNumber("abc", 100, 5), 5);
  assert.equal(clampBankedResetNumber(Number.NaN, 100, 5), 5);
  assert.equal(clampBankedResetNumber(undefined, 100, 5), 5);
});

test("merge: missing, null and garbage values give the off-by-default settings", () => {
  const defaults = createBankedResetAutoApplyDefaults();
  assert.deepEqual(mergeBankedResetAutoApplyClient(undefined), defaults);
  assert.deepEqual(mergeBankedResetAutoApplyClient(null), defaults);
  assert.deepEqual(mergeBankedResetAutoApplyClient("on"), defaults);
  assert.deepEqual(mergeBankedResetAutoApplyClient({ enabled: "yes", mode: "wild" }), defaults);
});

test("merge: a partial stored value keeps its fields and fills the rest", () => {
  const merged = mergeBankedResetAutoApplyClient({
    enabled: true,
    mode: "eager",
    creditTypes: { claudeSessionReset: true },
    connections: { a: true, b: false, c: "x" },
    maxPerDay: 7,
    schedule: { enabled: true, startHourUtc: 22 },
  });
  const defaults = createBankedResetAutoApplyDefaults();
  assert.equal(merged.enabled, true);
  assert.equal(merged.mode, "eager");
  assert.deepEqual(merged.creditTypes, {
    ...defaults.creditTypes,
    claudeSessionReset: true,
  });
  assert.deepEqual(merged.connections, { a: true, b: false });
  assert.equal(merged.maxPerDay, 7);
  assert.equal(merged.maxPerAccountPerDay, defaults.maxPerAccountPerDay);
  assert.deepEqual(merged.schedule, { enabled: true, startHourUtc: 22, endHourUtc: 24 });
});

test("merge: agrees with the server merge on a valid stored value", () => {
  const stored = {
    enabled: true,
    mode: "last-resort",
    accountScope: "selected",
    connections: { a: true },
    weeklyFloorPercent: 25,
    schedule: { enabled: true, startHourUtc: 1, endHourUtc: 5 },
  };
  assert.deepEqual(
    mergeBankedResetAutoApplyClient(stored),
    mergeBankedResetAutoApplySettings(stored)
  );
});

test("merge: out-of-range numbers are clamped to the schema bounds", () => {
  const merged = mergeBankedResetAutoApplyClient({
    weeklyFloorPercent: 400,
    maxPerDay: -1,
    schedule: { endHourUtc: 99 },
  });
  assert.equal(merged.weeklyFloorPercent, 100);
  assert.equal(merged.maxPerDay, 0);
  assert.equal(merged.schedule.endHourUtc, 24);
});

test("scope: all mode includes everything except an explicit false", () => {
  const s = { accountScope: "all" as const, connections: { off: false, on: true } };
  assert.equal(isConnectionInScope(s, "off"), false);
  assert.equal(isConnectionInScope(s, "on"), true);
  assert.equal(isConnectionInScope(s, "unknown"), true);
});

test("scope: selected mode includes only an explicit true", () => {
  const s = { accountScope: "selected" as const, connections: { off: false, on: true } };
  assert.equal(isConnectionInScope(s, "off"), false);
  assert.equal(isConnectionInScope(s, "on"), true);
  assert.equal(isConnectionInScope(s, "unknown"), false);
});

test("scope toggle: all mode stores false to exclude and clears the entry to include", () => {
  const s = { accountScope: "all" as const, connections: { keep: true } };
  const excluded = setConnectionInScope(s, "x", false);
  assert.deepEqual(excluded, { keep: true, x: false });
  assert.equal(isConnectionInScope({ ...s, connections: excluded }, "x"), false);
  const included = setConnectionInScope({ ...s, connections: excluded }, "x", true);
  assert.deepEqual(included, { keep: true });
  assert.equal(isConnectionInScope({ ...s, connections: included }, "x"), true);
});

test("scope toggle: selected mode stores true to include and clears the entry to exclude", () => {
  const s = { accountScope: "selected" as const, connections: { keep: true } };
  const included = setConnectionInScope(s, "x", true);
  assert.deepEqual(included, { keep: true, x: true });
  assert.equal(isConnectionInScope({ ...s, connections: included }, "x"), true);
  const excluded = setConnectionInScope({ ...s, connections: included }, "x", false);
  assert.deepEqual(excluded, { keep: true });
  assert.equal(isConnectionInScope({ ...s, connections: excluded }, "x"), false);
});

test("scope toggle: never mutates its input", () => {
  const connections = { a: true };
  setConnectionInScope({ accountScope: "all", connections }, "b", false);
  assert.deepEqual(connections, { a: true });
});
