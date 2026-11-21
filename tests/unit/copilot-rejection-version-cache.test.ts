import assert from "node:assert/strict";
import test from "node:test";

const locks = await import("../../open-sse/services/accountFallback.ts");
const rejections = await import("../../open-sse/services/copilotModelRejections.ts");

const body = { error: { code: "model_not_supported" } };
const learn = (connection: string) =>
  rejections.learnCopilotModelRejection(400, "github", connection, "claude-sonnet-5", body);

function seedLocks() {
  locks.clearAllModelLockouts();
  assert.equal(learn("account-A"), true);
  for (let i = 0; i < 40; i++) {
    locks.lockModel("openai", `conn-${i}`, `model-${i}`, "rate_limit", 3_600_000);
  }
}

test.afterEach(() => locks.clearAllModelLockouts());

test("repeated version reads do not rebuild the lockout list", (t) => {
  seedLocks();
  const first = rejections.getCopilotRejectionCatalogVersion();
  // getAllModelLockouts() formats one ISO string per lock entry; a cache hit formats none.
  const iso = t.mock.method(Date.prototype, "toISOString");
  for (let i = 0; i < 50; i++) {
    assert.equal(rejections.getCopilotRejectionCatalogVersion(), first);
  }
  assert.equal(iso.mock.callCount(), 0);
});

test("learning a Copilot rejection changes the version", () => {
  seedLocks();
  const before = rejections.getCopilotRejectionCatalogVersion();
  assert.equal(learn("account-B"), true);
  assert.notEqual(rejections.getCopilotRejectionCatalogVersion(), before);
});

test("clearing a Copilot rejection changes the version", () => {
  seedLocks();
  const before = rejections.getCopilotRejectionCatalogVersion();
  assert.equal(locks.clearModelLock("github", "account-A", "claude-sonnet-5"), true);
  assert.notEqual(rejections.getCopilotRejectionCatalogVersion(), before);
  assert.equal(rejections.getCopilotRejectionCatalogVersion(), "[]");
});

test("an expiring Copilot rejection changes the version at its deadline", (t) => {
  seedLocks();
  const before = rejections.getCopilotRejectionCatalogVersion();
  const now = Date.now();
  t.mock.method(Date, "now", () => now + rejections.COPILOT_MODEL_NOT_SUPPORTED_LOCK_MS + 1_000);
  assert.notEqual(rejections.getCopilotRejectionCatalogVersion(), before);
  assert.equal(rejections.getCopilotRejectionCatalogVersion(), "[]");
});

test("a lock on another provider leaves the version string unchanged", () => {
  seedLocks();
  const before = rejections.getCopilotRejectionCatalogVersion();
  locks.lockModel("anthropic", "other", "claude-x", "rate_limit", 3_600_000);
  assert.equal(rejections.getCopilotRejectionCatalogVersion(), before);
});

test("a longer exact lock that replaces the learned entry changes the version", () => {
  seedLocks();
  const before = rejections.getCopilotRejectionCatalogVersion();
  // Same exact key, longer cooldown: the entry is replaced and is no longer a Copilot rejection.
  locks.lockExactModel("github", "account-A", "claude-sonnet-5", "rate_limit", 7 * 60 * 60 * 1000);
  assert.notEqual(rejections.getCopilotRejectionCatalogVersion(), before);
  assert.equal(rejections.getCopilotRejectionCatalogVersion(), "[]");
});
