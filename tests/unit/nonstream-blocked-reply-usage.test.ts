import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

// A non-streaming reply that a post-call guardrail blocks is answered with a 400. It must be
// recorded as a failure, not as a 200 success, and it must not clear the account's error state.
const h = await createChatPipelineHarness("nonstream-blocked-usage");
const { guardrailRegistry } = await import("../../src/lib/guardrails/registry.ts");
const { BaseGuardrail } = await import("../../src/lib/guardrails/base.ts");
const { getDbInstance } = await import("../../src/lib/db/core.ts");
const { getKeyQuotaCounters } = await import("../../src/lib/db/keyQuota.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

class DenyAll extends BaseGuardrail {
  constructor() {
    super("deny-all-post-call", { priority: 1 });
  }
  async postCall() {
    return { block: true, message: "blocked by test guardrail" };
  }
}

// Rewrites the reply to empty choices: the post-call gates pass, then the malformed-reply gate trips.
class EmptyTheReply extends BaseGuardrail {
  constructor() {
    super("empty-the-reply", { priority: 1 });
  }
  async postCall(response: unknown) {
    return { block: false, modifiedResponse: { ...(response as object), choices: [] } };
  }
}

test.after(() => h.cleanup());
test.afterEach(() => guardrailRegistry.clear());

type UsageRow = { status: string; success: number; tokens_input: number; tokens_output: number };

async function blockedRequest(guardrail: InstanceType<typeof BaseGuardrail> = new DenyAll()) {
  await h.resetStorage();
  const connection = (await h.seedConnection("openai", {
    name: "blocked-usage",
    apiKey: "k-blocked-usage",
  })) as { id: string };
  await providersDb.updateProviderConnection(connection.id, {
    testStatus: "unavailable",
    lastError: "earlier failure",
    lastErrorType: "upstream_error",
  });
  const key = (await h.seedApiKey({})) as { id: string; key: string };
  guardrailRegistry.register(guardrail);
  globalThis.fetch = (async () => h.buildOpenAIResponse("secret answer")) as typeof fetch;
  const res = await h.handleChat(
    h.buildRequest({
      authKey: key.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: `blocked ${crypto.randomUUID()}` }],
      },
    })
  );
  await res.text();
  const rows = (await h.waitFor(() => {
    const found = getDbInstance()
      .prepare(
        "SELECT status, success, tokens_input, tokens_output FROM usage_history WHERE api_key_id = ?"
      )
      .all(key.id) as UsageRow[];
    return found.length > 0 ? found : null;
  })) as UsageRow[] | null;
  return { res, rows: rows ?? [], key, connection };
}

test("a guardrail-blocked reply is one failure row that keeps the billed tokens", async () => {
  const { res, rows } = await blockedRequest();
  assert.equal(res.status, 400);
  assert.equal(rows.length, 1, JSON.stringify(rows));
  assert.equal(rows[0].status, "400");
  assert.equal(rows[0].success, 0);
  assert.equal(rows[0].tokens_input, 4);
  assert.equal(rows[0].tokens_output, 2);
});

test("a guardrail-blocked reply still counts toward the key's token and request quota", async () => {
  const { key } = await blockedRequest();
  const counters = getKeyQuotaCounters(key.id);
  assert.equal(counters.rpmUsed, 1);
  assert.equal(counters.tpmUsed, 6);
});

test("a guardrail-blocked reply does not clear the account's error state", async () => {
  const { connection } = await blockedRequest();
  const row = (await providersDb.getProviderConnectionById(connection.id)) as Record<
    string,
    unknown
  >;
  assert.equal(row.lastError, "earlier failure");
  assert.equal(row.testStatus, "unavailable");
});

test("a reply that fails the malformed-reply gate is one failure row, counts toward the key quota, and keeps the account error", async () => {
  const { res, rows, key, connection } = await blockedRequest(new EmptyTheReply());
  assert.ok(res.status >= 500, `status ${res.status}`);
  assert.equal(rows.length, 1, JSON.stringify(rows));
  assert.equal(rows[0].success, 0);
  assert.notEqual(rows[0].status, "200");
  // The upstream billed the reply: the one failure row keeps its tokens, as the guardrail row does.
  assert.equal(rows[0].tokens_input, 4);
  assert.equal(rows[0].tokens_output, 2);
  const counters = getKeyQuotaCounters(key.id);
  assert.equal(counters.rpmUsed, 1);
  assert.equal(counters.tpmUsed, 6);
  const row = (await providersDb.getProviderConnectionById(connection.id)) as Record<
    string,
    unknown
  >;
  assert.equal(row.lastError, "earlier failure");
});
