import assert from "node:assert/strict";
import test from "node:test";

const cacheDescriptor = Object.getOwnPropertyDescriptor(globalThis, "caches");
const originalApiKeySecret = process.env.API_KEY_SECRET;

Object.defineProperty(globalThis, "caches", { value: {}, configurable: true });
process.env.API_KEY_SECRET = "isolated-cloud-key-ban-test";

const core = await import("../../src/lib/db/core.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const { getApiKeyBanSummary } = await import("../../src/lib/db/apiKeys/banSummary.ts");

test.after(() => {
  core.resetDbInstance();
  keys.resetApiKeyState();
  if (cacheDescriptor) Object.defineProperty(globalThis, "caches", cacheDescriptor);
  else Reflect.deleteProperty(globalThis, "caches");
  if (originalApiKeySecret === undefined) delete process.env.API_KEY_SECRET;
  else process.env.API_KEY_SECRET = originalApiKeySecret;
});

test("Cloud mode can record, show and clear a ban reason without disk migrations", async () => {
  assert.equal(core.isCloud, true);
  assert.equal(core.SQLITE_FILE, null);
  assert.deepEqual(getApiKeyBanSummary(), { total: 0, keys: [] });

  const key = await keys.createApiKey("Cloud fixture", "cloud-fixture");
  assert.equal(
    await keys.updateApiKeyPermissions(key.id, { isBanned: true, banReason: "policy_violation" }),
    true
  );
  assert.deepEqual(getApiKeyBanSummary(), {
    total: 1,
    keys: [{ id: key.id, name: key.name, reason: "policy_violation" }],
  });

  assert.equal(await keys.updateApiKeyPermissions(key.id, { isBanned: false }), true);
  assert.deepEqual(getApiKeyBanSummary(), { total: 0, keys: [] });
});
