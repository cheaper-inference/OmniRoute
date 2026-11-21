/**
 * The per-pool member breakdown option: stored in its own column, off by default,
 * set only for a pool that exists, and accepted by the update schema only as a boolean.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-member-breakdown-db-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createPool, updatePool } = await import("../../src/lib/db/quotaPools.ts");
const { getPoolMemberBreakdown, setPoolMemberBreakdown, withMemberBreakdown } =
  await import("../../src/lib/db/quotaMemberBreakdown.ts");
const { PoolUpdateSchema } = await import("../../src/shared/schemas/quota.ts");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const MIGRATIONS = path.join(ROOT, "src", "lib", "db", "migrations");
const EN = JSON.parse(
  fs.readFileSync(path.join(ROOT, "src", "i18n", "messages", "en.json"), "utf8")
);

const pool = createPool({ connectionId: "conn-breakdown-1", name: "Breakdown pool" });
const other = createPool({ connectionId: "conn-breakdown-2", name: "Other pool" });

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a new pool has the member breakdown off", () => {
  assert.equal(getPoolMemberBreakdown(pool.id), false);
  assert.equal(withMemberBreakdown([pool])[0].memberBreakdown, false);
});

test("the setting is stored per pool and survives a pool edit", () => {
  assert.equal(setPoolMemberBreakdown(pool.id, true), true);
  updatePool(pool.id, { name: "renamed", allocations: pool.allocations });
  assert.equal(getPoolMemberBreakdown(pool.id), true);
  assert.deepEqual(
    withMemberBreakdown([pool, other]).map((p) => p.memberBreakdown),
    [true, false]
  );
  setPoolMemberBreakdown(pool.id, false);
  assert.equal(getPoolMemberBreakdown(pool.id), false);
});

test("an unknown pool is off and cannot be set", () => {
  assert.equal(setPoolMemberBreakdown("no-such-pool", true), false);
  assert.equal(getPoolMemberBreakdown("no-such-pool"), false);
});

test("the migration is one ADD COLUMN that defaults to off", () => {
  const files = fs.readdirSync(MIGRATIONS).filter((f) => f.endsWith("_quota_member_breakdown.sql"));
  assert.equal(files.length, 1);
  const statements = fs
    .readFileSync(path.join(MIGRATIONS, files[0]), "utf8")
    .split("\n")
    .filter((l) => l.trim() && !l.trim().startsWith("--"));
  assert.deepEqual(statements, [
    "ALTER TABLE quota_pools ADD COLUMN member_breakdown INTEGER NOT NULL DEFAULT 0;",
  ]);
});

test("the update schema takes a boolean and nothing else", () => {
  assert.equal(PoolUpdateSchema.parse({ memberBreakdown: true }).memberBreakdown, true);
  assert.equal(PoolUpdateSchema.parse({}).memberBreakdown, undefined);
  assert.equal(PoolUpdateSchema.safeParse({ memberBreakdown: "yes" }).success, false);
});

test("the wizard strings are the planned English text", () => {
  const strings = EN.quotaShare as Record<string, string>;
  assert.equal(strings.wizardMemberBreakdownLabel, "Show usage by member to key holders");
  assert.equal(
    strings.wizardMemberBreakdownHint,
    "On the self-service page, each key holder sees how much every other key used, without names. The bars need three or more keys and a key that may see account usage."
  );
  assert.equal(
    strings.wizardMemberBreakdownWarning,
    "The bars carry no names. Someone who knows what one key used can match a bar to that key. In a pool of three keys that also reveals the last one."
  );
  assert.equal(
    strings.wizardMemberBreakdownTooFew,
    "This pool has fewer than three keys, so the bars stay hidden."
  );
});
