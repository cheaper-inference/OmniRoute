import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-16416-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "test-secret-key-for-unit-tests-123456789";
const core = await import("../../src/lib/db/core.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const groups = await import("../../src/lib/db/apiKeyGroups.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("inactive-only membership retains denies and does not become unrestricted", async () => {
  const key = await keys.createApiKey("single-16416", "machine-16416");
  const group = groups.createKeyGroup("single-16416");
  groups.addGroupPermission(group.id, "gpt-4o-mini", "allow");
  groups.addGroupPermission(group.id, "gpt-4o", "deny");
  groups.addKeyToGroup(key.id, group.id);
  assert.equal(groups.checkKeyModelAccess(key.id, "gpt-4o-mini").allowed, true);
  groups.updateKeyGroup(group.id, { isActive: false });
  assert.equal(groups.checkKeyModelAccess(key.id, "gpt-4o").allowed, false);
  assert.equal(groups.checkKeyModelAccess(key.id, "unlisted").allowed, false);
});

test("inactive-only membership stops granting its former allow", async () => {
  const key = await keys.createApiKey("grant-16416", "machine-16416");
  const group = groups.createKeyGroup("grant-16416");
  groups.addGroupPermission(group.id, "*", "allow");
  groups.addKeyToGroup(key.id, group.id);
  groups.updateKeyGroup(group.id, { isActive: false });
  assert.equal(groups.checkKeyModelAccess(key.id, "gpt-4o-mini").allowed, false);
});

test("mixed groups retain inactive denies and grants from other active groups", async () => {
  const key = await keys.createApiKey("mixed-16416", "machine-16416");
  const active = groups.createKeyGroup("active-16416");
  const inactive = groups.createKeyGroup("inactive-16416");
  groups.addGroupPermission(active.id, "gpt-*", "allow");
  groups.addGroupPermission(inactive.id, "o3", "allow");
  groups.addGroupPermission(inactive.id, "gpt-4o", "deny");
  groups.addKeyToGroup(key.id, active.id);
  groups.addKeyToGroup(key.id, inactive.id);
  groups.updateKeyGroup(inactive.id, { isActive: false });
  assert.equal(groups.checkKeyModelAccess(key.id, "gpt-4o-mini").allowed, true);
  assert.equal(groups.checkKeyModelAccess(key.id, "gpt-4o").allowed, false);
  assert.equal(groups.checkKeyModelAccess(key.id, "o3").allowed, false);
  assert.deepEqual(
    groups.getKeyGroupsForApiKey(key.id).map((entry) => entry.id),
    [active.id]
  );
});

test("deactivation and reactivation invalidate the real model-permission cache", async () => {
  const key = await keys.createApiKey("cache-16416", "machine-16416");
  const group = groups.createKeyGroup("cache-16416");
  groups.addGroupPermission(group.id, "*", "allow");
  groups.addKeyToGroup(key.id, group.id);
  assert.equal(await keys.isModelAllowedForKey(key.key, "openai/gpt-4o-mini"), true);
  groups.updateKeyGroup(group.id, { isActive: false });
  assert.equal(await keys.isModelAllowedForKey(key.key, "openai/gpt-4o-mini"), false);
  groups.updateKeyGroup(group.id, { isActive: true });
  assert.equal(await keys.isModelAllowedForKey(key.key, "openai/gpt-4o-mini"), true);
});

test("inactive provider deny survives canonical alias resolution without blocking other providers", async () => {
  const key = await keys.createApiKey("provider-16416", "machine-16416");
  const active = groups.createKeyGroup("provider-active-16416");
  const inactive = groups.createKeyGroup("provider-inactive-16416");
  groups.addGroupPermission(active.id, "*", "allow");
  groups.addGroupPermission(inactive.id, "gpt-*", "deny", "pioneer");
  groups.addKeyToGroup(key.id, active.id);
  groups.addKeyToGroup(key.id, inactive.id);
  groups.updateKeyGroup(inactive.id, { isActive: false });
  assert.equal(await keys.isModelAllowedForKey(key.key, "pioneer/gpt-4o-mini"), false);
  assert.equal(await keys.isModelAllowedForKey(key.key, "pn/gpt-4o-mini"), false);
  assert.equal(await keys.isModelAllowedForKey(key.key, "anthropic/gpt-4o-mini"), true);
});

test("ungrouped keys stay unrestricted by group policy", async () => {
  const key = await keys.createApiKey("ungrouped-16416", "machine-16416");
  assert.equal(groups.checkKeyModelAccess(key.id, "unlisted").allowed, true);
  assert.equal(await keys.isModelAllowedForKey(key.key, "openai/gpt-4o-mini"), true);
});
