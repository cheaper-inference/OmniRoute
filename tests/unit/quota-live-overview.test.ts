import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { availability } from "./quota-availability-fixtures.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "quota-live-overview-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const limits = await import("../../src/lib/db/providerLimits.ts");
const snapshots = await import("../../src/lib/db/quotaSnapshots.ts");
const usage = await import("../../src/lib/usage/providerLimits.ts");
const { getQuotaCacheState } = await import("../../src/domain/quotaCacheState.ts");
const availabilityRoute = await import("../../src/app/api/usage/availability/route.ts");
const { buildConnectionQuotaAvailability } = await import("../../src/lib/usage/availability.ts");
const { buildHealthAccount } =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview.ts");
const { displayAccount } =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay.ts");
const oldTime = "2026-01-01T10:00:00.000Z";
const resetAt = "2030-01-01T10:20:00.000Z";

async function account() {
  const connection = await providers.createProviderConnection({
    provider: "claude",
    accessToken: "synthetic-only",
    isActive: true,
  });
  limits.setProviderLimitsCache(connection.id, {
    quotas: {
      session: { remainingPercentage: 0, resetAt, used: 100, total: 100 },
      weekly: { remainingPercentage: 80, resetAt, observedAt: oldTime },
    },
    plan: "synthetic",
    message: null,
    fetchedAt: oldTime,
    source: "scheduled",
  });
  return connection;
}
function save(id: string, key: string, percent: number | null, raw: string | null = null) {
  snapshots.saveQuotaSnapshot({
    provider: "claude",
    connection_id: id,
    window_key: key,
    remaining_percentage: percent,
    next_reset_at: resetAt,
    is_exhausted: 0,
    window_duration_ms: null,
    raw_data: raw,
  });
}
function quotas(entry: { quotas: Record<string, unknown> | null }) {
  return entry.quotas as Record<string, Record<string, unknown>>;
}

test.beforeEach((t) => {
  core.resetDbInstance();
  getQuotaCacheState().cache.clear();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
  t.mock.method(globalThis, "fetch", () => {
    throw new Error("cached display must not fetch upstream");
  });
});
test.after(() => {
  core.resetDbInstance();
  getQuotaCacheState().cache.clear();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("public cached limits prefer the latest snapshot per window without rewriting scheduled storage", async () => {
  const c = await account();
  save(c.id, "session", 57);
  save(c.id, "session", 45);
  const entry = (await usage.getSanitizedCachedProviderLimitsMap())[c.id];
  assert.equal(quotas(entry).session.remainingPercentage, 45);
  assert.equal(quotas(entry).session.used, 0);
  assert.equal(quotas(entry).session.total, 0);
  assert.ok(Date.parse(String(quotas(entry).session.observedAt)) > Date.parse(oldTime));
  assert.equal(quotas(entry).weekly.observedAt, oldTime);
  assert.equal(quotas(entry).weekly.remainingPercentage, 80);
  assert.equal(quotas(limits.getProviderLimitsCache(c.id)!).session.remainingPercentage, 0);
  assert.ok(!JSON.stringify(entry).includes("synthetic-only"));
});

test("newer scheduled windows win and another account cannot supply the percentage", async () => {
  const a = await account(),
    b = await account();
  save(a.id, "session", 57);
  save(b.id, "session", 12);
  const cached = limits.getProviderLimitsCache(a.id)!;
  limits.setProviderLimitsCache(a.id, { ...cached, fetchedAt: "2031-01-01T00:00:00.000Z" });
  const entries = await usage.getSanitizedCachedProviderLimitsMap();
  assert.equal(quotas(entries[a.id]).session.remainingPercentage, 0);
  assert.equal(quotas(entries[b.id]).session.remainingPercentage, 12);
});

test("a retired latest window cannot resurrect the scheduled percentage", async () => {
  const c = await account();
  save(c.id, "session", 57);
  save(c.id, "session", null, snapshots.RETIRED_QUOTA_WINDOW_RAW_DATA);
  assert.equal(
    quotas((await usage.getSanitizedCachedProviderLimitsMap())[c.id]).session,
    undefined
  );
});

test("unreported latest fractions are unknown rather than the snapshot zero placeholder", async () => {
  const c = await account();
  save(c.id, "session", 0, JSON.stringify({ fractionReported: false }));
  assert.equal(
    quotas((await usage.getSanitizedCachedProviderLimitsMap())[c.id]).session.fractionReported,
    false
  );
});

test("runtime observations cover deduplicated history and availability reads the same evidence", async () => {
  const c = await account();
  const state = getQuotaCacheState();
  state.cache.set(c.id, {
    connectionId: c.id,
    provider: "claude",
    fetchedAt: Date.now(),
    exhausted: false,
    nextResetAt: null,
    modelQuotas: {},
    quotas: { session: { remainingPercentage: 57, resetAt } },
  });
  const before = structuredClone(state.cache.get(c.id));
  const entry = (await usage.getSanitizedCachedProviderLimitsMap())[c.id];
  assert.equal(quotas(entry).session.remainingPercentage, 57);
  const response = await availabilityRoute.GET();
  assert.equal(response.status, 200);
  const body = await response.json();
  const connection = body.connections.find((row: { id: string }) => row.id === c.id);
  assert.equal(connection.account.fetchedAt, entry.fetchedAt);
  assert.deepEqual(state.cache.get(c.id), before);
});

for (const [previous, latest] of [
  [0, 57],
  [57, 0],
]) {
  test(`availability reconciles newer snapshot ${latest}% over runtime ${previous}% privately`, async () => {
    const c = await account();
    const state = getQuotaCacheState();
    state.cache.set(c.id, {
      connectionId: c.id,
      provider: "claude",
      fetchedAt: Date.parse(oldTime),
      quotas: { session: { remainingPercentage: previous, resetAt } },
      modelQuotas: {},
      exhausted: previous === 0,
      nextResetAt: previous === 0 ? resetAt : null,
    });
    const before = structuredClone(state.cache.get(c.id));
    save(c.id, "session", latest);
    const entry = (await usage.getSanitizedCachedProviderLimitsMap())[c.id];
    const verdict = buildConnectionQuotaAvailability(
      { id: c.id, provider: "claude", isActive: true },
      entry,
      { enabled: true, defaultThresholdPercent: 2, providerWindowDefaults: {} }
    );
    assert.equal(verdict.account.usable, latest > 2);
    assert.deepEqual(state.cache.get(c.id), before);
  });
}

test("an unreported limiting window does not borrow its known sibling percentage", () => {
  const now = Date.now();
  const a = buildHealthAccount(
    { id: "unknown", provider: "claude", isActive: true },
    {
      quotas: [
        { name: "session", remainingPercentage: 0, fractionReported: false, resetAt },
        { name: "weekly", remainingPercentage: 80, resetAt },
      ],
      raw: { fetchedAt: new Date(now).toISOString() },
    },
    {},
    now,
    {
      availability: availability("unknown"),
      availabilityObservedAt: now,
      cooldown: { id: "unknown", status: "healthy", lockouts: [] },
      observedAt: now,
    }
  );
  assert.equal(displayAccount(a, now).remainingPct, null);
});

test("a reset awaiting synchronization contributes neither old zero nor invented full quota", () => {
  const now = Date.parse("2026-01-01T10:25:00Z");
  const data = {
    quotas: [
      { name: "session", remainingPercentage: 0, resetAt: "2026-01-01T10:20:00Z" },
      { name: "weekly", remainingPercentage: 80, resetAt },
    ],
    raw: { fetchedAt: oldTime },
  };
  const a = buildHealthAccount(
    { id: "synthetic", provider: "claude", isActive: true },
    data,
    {},
    now,
    {
      availability: availability("synthetic"),
      availabilityObservedAt: now,
      cooldown: { id: "synthetic", status: "active", lockouts: [] },
      observedAt: now,
    }
  );
  const shown = displayAccount(a, now);
  assert.equal(shown.kind, "ok");
  assert.equal(shown.remainingPct, null);
  assert.equal(shown.fill, null);
  assert.equal(a.cells.find((cell) => cell.name === "session")?.awaitingSync, true);
});
