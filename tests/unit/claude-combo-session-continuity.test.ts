import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "claude-continuity-"));
process.env.DATA_DIR = dir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.REDIS_URL;
delete process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const affinity = await import("../../src/lib/db/sessionAccountAffinity.ts");
const pin = await import("../../src/sse/services/sessionAffinityPin.ts");
const auth = await import("../../src/sse/services/auth.ts");
const restrictions = await import("../../src/sse/services/connectionRestrictions.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});

function claudeRequest(session: string, text: string) {
  return {
    metadata: { user_id: JSON.stringify({ device_id: "device", session_id: session }) },
    messages: [{ role: "user", content: text }],
  };
}

test("Claude's explicit session survives compaction and separates identical prompt prefixes", () => {
  const first = pin.extractSessionAffinityKey(claudeRequest("chat-a", "shared instructions"));
  assert.equal(first, pin.extractSessionAffinityKey(claudeRequest("chat-a", "compacted history")));
  assert.notEqual(
    first,
    pin.extractSessionAffinityKey(claudeRequest("chat-b", "shared instructions"))
  );
});

test("malformed or account-only Claude metadata keeps the bounded prompt fallback", () => {
  const body = claudeRequest("chat-a", "hello");
  const fallback = pin.extractSessionAffinityKey({ messages: body.messages });
  for (const user_id of [
    "not json",
    JSON.stringify({ account_uuid: "account" }),
    "x".repeat(5000),
  ]) {
    assert.equal(pin.extractSessionAffinityKey({ ...body, metadata: { user_id } }), fallback);
  }
  assert.equal(
    pin.extractSessionAffinityKey(body, new Headers({ "x-session-id": "header-chat" })),
    "header:header-chat"
  );
});

test("checking a different, account-scoped combo candidate must not replace a live binding", async () => {
  await settingsDb.updateSettings({
    sessionAffinityTtlMs: 1800000,
  });
  const a = await providers.createProviderConnection({
    provider: "claude",
    authType: "apikey",
    apiKey: "test-a",
    name: "a",
    isActive: true,
    testStatus: "active",
  });
  const b = await providers.createProviderConnection({
    provider: "claude",
    authType: "apikey",
    apiKey: "test-b",
    name: "b",
    isActive: true,
    testStatus: "active",
  });
  const sessionKey = "claude:preflight-session";
  const first = await auth.getProviderCredentials("claude", null, [a.id], "claude-opus-5-5", {
    sessionKey,
    forcedConnectionId: a.id,
  });
  assert.equal(first?.connectionId, a.id);
  const before = affinity.getSessionAccountAffinity(sessionKey, "claude", 1800000);
  const scope = restrictions.resolveConnectionRestrictions(null, { connectionId: b.id }, true);
  const checked = await auth.getProviderCredentials(
    "claude",
    null,
    scope.allowedConnections,
    "claude-opus-5-5",
    { sessionKey, forcedConnectionId: b.id, affinityReadOnly: true }
  );
  assert.equal(checked?.connectionId, b.id, "the availability probe still checks B");
  assert.deepEqual(
    affinity.getSessionAccountAffinity(sessionKey, "claude", 1800000),
    before,
    "a probe must neither overwrite nor extend A's binding"
  );
  await auth.getProviderCredentials("claude", null, [b.id], "claude-opus-5-5", {
    sessionKey: "unbound-probe",
    forcedConnectionId: b.id,
    affinityReadOnly: true,
  });
  assert.equal(affinity.getSessionAccountAffinity("unbound-probe", "claude", 1800000), null);
});

test("auto ordering preserves the bound account, respects candidate scopes and falls back on cooldown", async () => {
  const { preferSessionAccountTarget } =
    await import("../../open-sse/services/combo/sessionAccountContinuity.ts");
  const config = { sessionAffinityTtlMs: 1800000 };
  const a = await providers.createProviderConnection({
    provider: "claude",
    authType: "apikey",
    apiKey: "order-a",
    name: "order-a",
    isActive: true,
    testStatus: "active",
  });
  const b = await providers.createProviderConnection({
    provider: "claude",
    authType: "apikey",
    apiKey: "order-b",
    name: "order-b",
    isActive: true,
    testStatus: "active",
  });
  const makeTarget = (id: string) => ({
    provider: "claude",
    providerId: "claude",
    modelStr: "claude/claude-opus-5-5",
    connectionId: id,
    allowedConnectionIds: [id],
    stepId: id,
    executionKey: id,
  });
  const aTarget = makeTarget(a.id),
    bTarget = makeTarget(b.id);
  const sessionKey = pin.extractSessionAffinityKey(claudeRequest("ordering-chat", "shared prompt"));
  await auth.getProviderCredentials("claude", null, [a.id], "claude-opus-5-5", {
    sessionKey,
    forcedConnectionId: a.id,
  });
  const candidates = [bTarget, aTarget];
  const ordered = await preferSessionAccountTarget(candidates, sessionKey, config);
  assert.equal(
    ordered[0].connectionId,
    a.id,
    "a new auto score must not replace the healthy binding"
  );
  assert.deepEqual(candidates, [bTarget, aTarget], "request-local reorder");
  assert.deepEqual(
    await preferSessionAccountTarget([bTarget], sessionKey, config),
    [bTarget],
    "never reintroduce an excluded account"
  );
  assert.deepEqual(
    await preferSessionAccountTarget(candidates, sessionKey, {}),
    candidates,
    "affinity disabled"
  );
  const otherModel = { ...bTarget, modelStr: "claude/claude-sonnet-5-5" };
  assert.deepEqual(
    await preferSessionAccountTarget([otherModel, aTarget], sessionKey, config),
    [otherModel, aTarget],
    "do not override model selection"
  );
  const unavailableScope = { ...aTarget, allowedConnectionIds: [b.id] };
  assert.deepEqual(
    await preferSessionAccountTarget([bTarget, unavailableScope], sessionKey, config),
    [bTarget, unavailableScope],
    "never widen a target scope"
  );

  const next = await auth.getProviderCredentials(
    "claude",
    null,
    ordered[0].allowedConnectionIds,
    "claude-opus-5-5",
    { sessionKey, forcedConnectionId: ordered[0].connectionId }
  );
  assert.equal(next?.connectionId, a.id);
  await providers.updateProviderConnection(a.id, {
    rateLimitedUntil: new Date(Date.now() + 60000).toISOString(),
  });
  const blocked = await auth.getProviderCredentials("claude", null, [a.id], "claude-opus-5-5", {
    sessionKey,
    forcedConnectionId: a.id,
    affinityReadOnly: true,
  });
  assert.notEqual(blocked?.connectionId, a.id);
  const fallback = await auth.getProviderCredentials("claude", null, [b.id], "claude-opus-5-5", {
    sessionKey,
    forcedConnectionId: b.id,
  });
  assert.equal(fallback?.connectionId, b.id);
  assert.equal(
    affinity.getSessionAccountAffinity(sessionKey!, "claude", 1800000)?.connectionId,
    b.id
  );
  // Recovery alone must not bounce this ongoing chat back to its original account.
  await providers.updateProviderConnection(a.id, { rateLimitedUntil: null });
  assert.equal(
    (await preferSessionAccountTarget([aTarget, bTarget], sessionKey, config))[0].connectionId,
    b.id
  );
});

test("the complete auto combo dispatch keeps a prior account despite a newly preferred score", async () => {
  const { handleComboChat } = await import("../../open-sse/services/combo.ts");
  const a = await providers.createProviderConnection({
    provider: "claude",
    authType: "apikey",
    apiKey: "pipeline-a",
    name: "pipeline-a",
    isActive: true,
    testStatus: "active",
    priority: 1,
  });
  const b = await providers.createProviderConnection({
    provider: "claude",
    authType: "apikey",
    apiKey: "pipeline-b",
    name: "pipeline-b",
    isActive: true,
    testStatus: "active",
    priority: 1,
  });
  const sessionKey = "claude-session:pipeline";
  const config = {
    sessionAffinityTtlMs: 1800000,
  };
  await auth.getProviderCredentials("claude", null, [a.id], "claude-opus-5-5", { sessionKey });
  const dispatched: string[] = [];
  const response = await handleComboChat({
    body: {
      model: "continuity-test",
      messages: [{ role: "user", content: "pipeline continuity" }],
    },
    combo: {
      name: "continuity-test",
      strategy: "auto",
      models: [
        { model: "claude/claude-opus-5-5", connectionId: b.id },
        { model: "claude/claude-opus-5-5", connectionId: a.id },
      ],
      config: { explorationRate: 0, routerStrategy: "rules" },
    },
    settings: config,
    relayOptions: { sessionAffinityKey: sessionKey },
    apiKeyAllowedConnections: [a.id, b.id],
    isModelAvailable: () => true,
    handleSingleModel: async (_body, _model, target) => {
      dispatched.push(target && "connectionId" in target ? target.connectionId! : "missing");
      return new Response(
        JSON.stringify({ choices: [{ message: { role: "assistant", content: "ok" } }] }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    },
    log: { info() {}, warn() {}, debug() {}, error() {} },
  });
  assert.equal(response.status, 200);
  assert.deepEqual(dispatched, [a.id]);
});
