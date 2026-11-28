// The rpm gate used to count completed calls only, so concurrent requests all passed it before
// the first one finished and recorded its usage (10 of 10 admitted at limit 3). An admitted call
// now holds a reservation until it records its usage (converted) or releases it (any other exit).
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rpm-overshoot-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const quotaDb = await import("../../src/lib/db/keyQuota.ts");
const quotaDomain = await import("../../src/domain/keyQuota.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("concurrent calls cannot overshoot an rpm limit", async () => {
  quotaDb.upsertKeyQuotaLimits("k1", { rpmLimit: 3 });
  let admitted = 0;
  await Promise.all(
    Array.from({ length: 10 }, async () => {
      if (!quotaDomain.checkKeyQuota("k1").allowed) return;
      admitted++;
      await new Promise((resolve) => setTimeout(resolve, 5)); // the upstream call
      quotaDomain.recordKeyQuotaUsage("k1", 10); // success: usage recorded after the call
    })
  );
  assert.equal(admitted, 3, `admitted ${admitted} of 10 at rpm limit 3`);
});

test("a reservation is released once: a second release cannot free another call's slot", () => {
  quotaDb.upsertKeyQuotaLimits("k2", { rpmLimit: 2 });
  const first = quotaDomain.checkKeyQuota("k2");
  const second = quotaDomain.checkKeyQuota("k2");
  assert.ok(first.allowed && second.allowed);
  assert.equal(quotaDomain.checkKeyQuota("k2").allowed, false, "both slots are held");
  first.reservation?.release();
  first.reservation?.release();
  assert.equal(quotaDomain.checkKeyQuota("k2").allowed, true, "one slot came back");
  assert.equal(quotaDomain.checkKeyQuota("k2").allowed, false, "the other is still held");
});

test("recording usage with the reservation converts it: the call is not counted twice", () => {
  quotaDb.upsertKeyQuotaLimits("k5", { rpmLimit: 2 });
  const first = quotaDomain.checkKeyQuota("k5");
  const second = quotaDomain.checkKeyQuota("k5");
  assert.ok(first.allowed && second.allowed);
  quotaDomain.recordKeyQuotaUsage("k5", 10, { reservation: first.reservation });
  assert.equal(first.reservation?.released, true, "the record consumed the reservation");
  assert.equal(second.reservation?.released, false, "another call's reservation is untouched");
  second.reservation?.release();
  // 1 recorded call + 0 held = 1 of 2. A converted slot that stayed held would read 2 of 2.
  assert.equal(quotaDomain.checkKeyQuota("k5", { reserve: false }).allowed, true);
});

test("a key without an rpm limit takes no reservation", () => {
  quotaDb.upsertKeyQuotaLimits("k3", { tpmLimit: 1_000_000 });
  for (let i = 0; i < 20; i++) {
    const verdict = quotaDomain.checkKeyQuota("k3");
    assert.equal(verdict.allowed, true);
    assert.equal(verdict.reservation, undefined);
  }
});

test("a peek (reserve: false) does not hold a slot", () => {
  quotaDb.upsertKeyQuotaLimits("k4", { rpmLimit: 1 });
  for (let i = 0; i < 5; i++) {
    const verdict = quotaDomain.checkKeyQuota("k4", { reserve: false });
    assert.equal(verdict.allowed, true);
    assert.equal(verdict.reservation, undefined);
  }
  assert.equal(quotaDomain.checkKeyQuota("k4").allowed, true);
  assert.equal(quotaDomain.checkKeyQuota("k4").allowed, false);
});

test("a peek still sees the slots that calls in flight hold", () => {
  quotaDb.upsertKeyQuotaLimits("k7", { rpmLimit: 1 });
  const held = quotaDomain.checkKeyQuota("k7");
  assert.equal(quotaDomain.checkKeyQuota("k7", { reserve: false }).allowed, false);
  assert.equal(quotaDomain.countKeyQuotaReservations("k7"), 1);
  held.reservation?.release();
  assert.equal(quotaDomain.countKeyQuotaReservations("k7"), 0);
  assert.equal(quotaDomain.checkKeyQuota("k7", { reserve: false }).allowed, true);
});

test("recording usage with no reservation named converts the oldest one of that key", () => {
  // The plain check-then-record pair (the first test) must not leak a slot.
  quotaDb.upsertKeyQuotaLimits("k8", { rpmLimit: 2 });
  assert.equal(quotaDomain.checkKeyQuota("k8").allowed, true);
  assert.equal(quotaDomain.countKeyQuotaReservations("k8"), 1);
  quotaDomain.recordKeyQuotaUsage("k8", 10);
  assert.equal(quotaDomain.countKeyQuotaReservations("k8"), 0);
  assert.equal(quotaDomain.checkKeyQuota("k8").allowed, true, "1 recorded + 0 held is below 2");
});

test("a reservation counts for one rpm window at most, so a missed exit cannot lock a key out", () => {
  quotaDb.upsertKeyQuotaLimits("k6", { rpmLimit: 1 });
  const t0 = Date.parse("2026-09-14T12:00:00.000Z");
  assert.equal(quotaDomain.checkKeyQuota("k6", { now: () => t0 }).allowed, true);
  assert.equal(quotaDomain.checkKeyQuota("k6", { now: () => t0 + 1000 }).allowed, false);
  const later = t0 + quotaDb.KEY_QUOTA_WINDOW_MS;
  assert.equal(quotaDomain.checkKeyQuota("k6", { now: () => later }).allowed, true);
});
