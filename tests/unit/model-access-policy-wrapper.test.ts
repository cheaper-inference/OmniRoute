import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-access-policy-"));
const previousEnvironment = {
  DATA_DIR: process.env.DATA_DIR,
  DISABLE_SQLITE_AUTO_BACKUP: process.env.DISABLE_SQLITE_AUTO_BACKUP,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
};
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = "model-access-policy-wrapper-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const groups = await import("../../src/lib/db/apiKeyGroups.ts");

function removeStorage() {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}

test.beforeEach(() => {
  apiKeys.resetApiKeyState();
  core.resetDbInstance();
  removeStorage();
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  apiKeys.resetApiKeyState();
  core.resetDbInstance();
  removeStorage();
  for (const [name, value] of Object.entries(previousEnvironment)) {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
});

test("a resolved per-key block overrides an allowed requested alias", async () => {
  const key = await apiKeys.createApiKey("Resolved block", "machine-policy-block");
  await apiKeys.updateApiKeyPermissions(key.id, {
    modelAccessMode: "restricted",
    allowedModels: ["friendly-alias"],
    blockedModels: ["openai/blocked-target"],
  });

  assert.equal(
    await apiKeys.isModelAllowedForKey(key.key, "friendly-alias", "openai/blocked-target"),
    false
  );
  assert.equal(
    await apiKeys.isModelAllowedForKey(key.key, "friendly-alias", "openai/safe-target"),
    true
  );
});

test("a resolved group deny overrides an allowed requested alias", async () => {
  const key = await apiKeys.createApiKey("Resolved group deny", "machine-policy-group-deny");
  await apiKeys.updateApiKeyPermissions(key.id, {
    modelAccessMode: "restricted",
    allowedModels: ["friendly-alias"],
  });
  const group = groups.createKeyGroup("Resolved target policy");
  groups.addGroupPermission(group.id, "*", "allow");
  groups.addGroupPermission(group.id, "denied-target", "deny", "openai");
  assert.equal(groups.addKeyToGroup(key.id, group.id), true);

  assert.equal(
    await apiKeys.isModelAllowedForKey(key.key, "friendly-alias", "openai/denied-target"),
    false
  );
  assert.equal(
    await apiKeys.isModelAllowedForKey(key.key, "friendly-alias", "openai/safe-target"),
    true
  );
});

test("permission caching keeps distinct resolved targets for the same requested alias", async () => {
  const key = await apiKeys.createApiKey("Resolved cache", "machine-policy-cache");
  await apiKeys.updateApiKeyPermissions(key.id, {
    modelAccessMode: "restricted",
    allowedModels: ["friendly-alias"],
  });
  const group = groups.createKeyGroup("Cached target policy");
  groups.addGroupPermission(group.id, "*", "allow");
  groups.addGroupPermission(group.id, "denied-target", "deny", "openai");
  assert.equal(groups.addKeyToGroup(key.id, group.id), true);

  assert.equal(
    await apiKeys.isModelAllowedForKey(key.key, "friendly-alias", "openai/safe-target"),
    true
  );
  assert.equal(
    await apiKeys.isModelAllowedForKey(key.key, "friendly-alias", "openai/denied-target"),
    false
  );
  assert.equal(
    await apiKeys.isModelAllowedForKey(key.key, "friendly-alias", "openai/safe-target"),
    true
  );
});

test("an allow-all group cannot widen a restricted empty per-key allow-list", async () => {
  const key = await apiKeys.createApiKey("Restricted empty", "machine-policy-empty");
  await apiKeys.updateApiKeyPermissions(key.id, {
    modelAccessMode: "restricted",
    allowedModels: [],
  });
  const group = groups.createKeyGroup("Allow all group");
  groups.addGroupPermission(group.id, "*", "allow");
  assert.equal(groups.addKeyToGroup(key.id, group.id), true);

  assert.equal(await apiKeys.isModelAllowedForKey(key.key, "openai/safe-target"), false);
});

test("group allow rules cannot grant a model outside the per-key allow-list", async () => {
  const key = await apiKeys.createApiKey("Per-key boundary", "machine-policy-boundary");
  await apiKeys.updateApiKeyPermissions(key.id, {
    modelAccessMode: "restricted",
    allowedModels: ["model-a"],
  });
  const group = groups.createKeyGroup("Broader group allow-list");
  groups.addGroupPermission(group.id, "model-a", "allow");
  groups.addGroupPermission(group.id, "model-b", "allow");
  assert.equal(groups.addKeyToGroup(key.id, group.id), true);

  assert.equal(await apiKeys.isModelAllowedForKey(key.key, "model-a"), true);
  assert.equal(await apiKeys.isModelAllowedForKey(key.key, "model-b"), false);
});

test("a group deny on the requested alias still applies when the resolved target is allowed", async () => {
  const key = await apiKeys.createApiKey("Requested alias deny", "machine-policy-alias-deny");
  await apiKeys.updateApiKeyPermissions(key.id, {
    modelAccessMode: "restricted",
    allowedModels: ["openai/safe-target"],
  });
  const group = groups.createKeyGroup("Requested alias policy");
  groups.addGroupPermission(group.id, "*", "allow");
  groups.addGroupPermission(group.id, "denied-alias", "deny");
  assert.equal(groups.addKeyToGroup(key.id, group.id), true);

  assert.equal(
    await apiKeys.isModelAllowedForKey(key.key, "safe-alias", "openai/safe-target"),
    true
  );
  assert.equal(
    await apiKeys.isModelAllowedForKey(key.key, "denied-alias", "openai/safe-target"),
    false
  );
});
