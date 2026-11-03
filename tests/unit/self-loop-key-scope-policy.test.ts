/**
 * The Vision Bridge describe self-loop authenticates with the internal
 * self-loop bearer, whose synthetic key is unrestricted. When the caller's key
 * is restricted, the self-loop sends `x-omniroute-self-loop-key-id` so the
 * receiving chat request enforces THAT key's policy (allowedConnections, model
 * lists). The header may only narrow access: it is honored solely alongside
 * the self-loop bearer, and an unresolvable id fails closed.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-self-loop-key-scope-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "self-loop-key-scope-secret";
delete process.env.OMNIROUTE_API_KEY;
delete process.env.ROUTER_API_KEY;

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { enforceApiKeyPolicy } = await import("../../src/shared/utils/apiKeyPolicy.ts");
const { resolveSelfLoopBearer } =
  await import("../../src/shared/middleware/chatAdmissionIdentity.ts");

const HEADER = "x-omniroute-self-loop-key-id";

function chatRequest(headers: Record<string, string>) {
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: "{}",
  });
}

async function seedKey(permissions: Record<string, unknown>) {
  const key = await apiKeysDb.createApiKey(`self-loop-scope-${Date.now()}`, "machine-scope");
  if (Object.keys(permissions).length > 0) {
    await apiKeysDb.updateApiKeyPermissions(key.id, permissions);
  }
  apiKeysDb.clearApiKeyCaches();
  return key as { id: string; key: string };
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("self-loop bearer + key-id header applies the scoped key's policy", async () => {
  const scoped = await seedKey({ allowedConnections: ["conn-allowed"] });
  const policy = await enforceApiKeyPolicy(
    chatRequest({ Authorization: `Bearer ${resolveSelfLoopBearer()}`, [HEADER]: scoped.id }),
    "gemini/gemini-3.8-flash"
  );
  assert.equal(policy.rejection, null);
  assert.equal(policy.apiKeyInfo?.id, scoped.id);
  assert.deepEqual(policy.apiKeyInfo?.allowedConnections, ["conn-allowed"]);
});

test("the scoped key's model policy rejects a disallowed describe model", async () => {
  const scoped = await seedKey({ allowedModels: ["groq/llama-3.3-70b-versatile"] });
  const policy = await enforceApiKeyPolicy(
    chatRequest({ Authorization: `Bearer ${resolveSelfLoopBearer()}`, [HEADER]: scoped.id }),
    "openai/gpt-4o-mini"
  );
  assert.ok(policy.rejection, "a model outside the scoped key's allowlist must be rejected");
  assert.equal(policy.rejection.status, 403);
});

test("an unknown key id on the self-loop fails closed", async () => {
  const policy = await enforceApiKeyPolicy(
    chatRequest({ Authorization: `Bearer ${resolveSelfLoopBearer()}`, [HEADER]: "no-such-key" }),
    "openai/gpt-4o-mini"
  );
  assert.ok(policy.rejection);
  assert.equal(policy.rejection.status, 403);
});

test("SECURITY: the key-id header is ignored for any bearer other than the self-loop", async () => {
  const caller = await seedKey({});
  const scoped = await seedKey({ allowedConnections: ["conn-allowed"] });
  const policy = await enforceApiKeyPolicy(
    chatRequest({ Authorization: `Bearer ${caller.key}`, [HEADER]: scoped.id }),
    "openai/gpt-4o-mini"
  );
  assert.equal(policy.rejection, null);
  assert.equal(policy.apiKeyInfo?.id, caller.id, "a client cannot switch to another key's policy");
});

test("the self-loop without the header keeps its unscoped synthetic identity (unchanged)", async () => {
  const policy = await enforceApiKeyPolicy(
    chatRequest({ Authorization: `Bearer ${resolveSelfLoopBearer()}` }),
    "openai/gpt-4o-mini"
  );
  assert.equal(policy.rejection, null);
  assert.notEqual(policy.apiKeyInfo, null);
  assert.deepEqual(policy.apiKeyInfo?.allowedConnections, []);
});
