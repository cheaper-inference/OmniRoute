import { test } from "node:test";
import assert from "node:assert/strict";
import { getExecutor } from "../../open-sse/executors/index.ts";

// The Claude OAuth identity sent upstream (metadata.user_id: device id, account uuid, session id) is
// cached per seed. The seed was the access token, so every token refresh looked like a new account
// and the session id and device id changed with it (the device id only for a connection with no
// persisted cliUserID). The connection id is stable across a refresh, so use it as the seed when
// the connection has one. Without a connection id (a keyless or ad hoc call) nothing changes.
type Body = Record<string, unknown>;

function tokenFor(label: string): string {
  // Build the token from parts: no credential-shaped literal in the source.
  return ["sk", "ant", "oat01", label, crypto.randomUUID()].join("-");
}

async function identityOf(credentials: Record<string, unknown>): Promise<Record<string, string>> {
  const executor = await getExecutor("claude");
  const originalFetch = globalThis.fetch;
  let sent: Body | null = null;
  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    sent = JSON.parse(String(init.body));
    return new Response(JSON.stringify({ id: "msg_1", type: "message", content: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };
  try {
    await executor.execute({
      model: "claude-opus-4-8",
      body: {
        model: "claude-opus-4-8",
        max_tokens: 64,
        messages: [{ role: "user", content: "hi" }],
      },
      stream: false,
      credentials,
      clientHeaders: { "x-app": "cli", "x-omniroute-effort": "off" },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
  assert.ok(sent, "the executor must have called fetch");
  const userId = ((sent as Body).metadata as Body).user_id;
  return JSON.parse(String(userId)) as Record<string, string>;
}

test("the session id and device id survive a token refresh on the same connection", async () => {
  const connectionId = `conn-${crypto.randomUUID()}`;
  const before = await identityOf({ connectionId, accessToken: tokenFor("before") });
  const after = await identityOf({ connectionId, accessToken: tokenFor("after") });
  assert.equal(after.session_id, before.session_id);
  assert.equal(after.device_id, before.device_id);
  assert.equal(after.account_uuid, before.account_uuid);
});

test("two connections keep two identities", async () => {
  const a = await identityOf({
    connectionId: `conn-${crypto.randomUUID()}`,
    accessToken: tokenFor("a"),
  });
  const b = await identityOf({
    connectionId: `conn-${crypto.randomUUID()}`,
    accessToken: tokenFor("b"),
  });
  assert.notEqual(a.session_id, b.session_id);
  assert.notEqual(a.device_id, b.device_id);
  assert.notEqual(a.account_uuid, b.account_uuid);
});

test("a persisted cliUserID and account uuid still win over the seed", async () => {
  const cliUserID = "a".repeat(64);
  const accountUUID = "123e4567-e89b-42d3-a456-426614174000";
  const identity = await identityOf({
    connectionId: `conn-${crypto.randomUUID()}`,
    accessToken: tokenFor("persisted"),
    providerSpecificData: { cliUserID, accountUUID },
  });
  assert.equal(identity.device_id, cliUserID);
  assert.equal(identity.account_uuid, accountUUID);
});

test("without a connection id the token is still the seed", async () => {
  const token = tokenFor("keyless");
  const first = await identityOf({ accessToken: token });
  const again = await identityOf({ accessToken: token });
  const other = await identityOf({ accessToken: tokenFor("keyless-other") });
  assert.equal(again.session_id, first.session_id);
  assert.notEqual(other.session_id, first.session_id);
});
