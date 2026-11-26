import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

process.env.APP_LOG_TO_FILE = "false";

const flag = "NONSTREAM_REFUSED_REPLY_FAILURE_ACCOUNTING_ENABLED";
const h = await createChatPipelineHarness("nonstream-blocked-usage");
const { guardrailRegistry } = await import("../../src/lib/guardrails/registry.ts");
const { BaseGuardrail } = await import("../../src/lib/guardrails/base.ts");
const { getDbInstance } = await import("../../src/lib/db/core.ts");
const { getKeyQuotaCounters } = await import("../../src/lib/db/keyQuota.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { stopSemanticCachePruneJob } = await import("../../src/lib/jobs/semanticCachePruneJob.ts");
const { stopSpendBatchWriter } = await import("../../src/lib/spend/batchWriter.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { closeSharedLoggerResource } = await import("../../src/shared/utils/loggerResource.ts");

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

test.after(async () => {
  stopSemanticCachePruneJob();
  await stopSpendBatchWriter();
  await closeCallLogSaves();
  await h.cleanup();
  await closeSharedLoggerResource();
});
test.afterEach(() => guardrailRegistry.clear());

type UsageRow = { status: string; success: number; tokens_input: number; tokens_output: number };

async function blockedRequest(guardrail: InstanceType<typeof BaseGuardrail>) {
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

for (const { name, guardrail, status } of [
  { name: "guardrail refusal", guardrail: new DenyAll(), status: 400 },
  { name: "malformed reply", guardrail: new EmptyTheReply(), status: 502 },
]) {
  test(`${name} with the flag enabled keeps billed usage and account error on a single failure`, async (t) => {
    t.after(() => {
      delete process.env[flag];
    });
    process.env[flag] = "true";
    const result = await blockedRequest(guardrail);
    assert.equal(result.res.status, status);
    assert.deepEqual(result.rows, [
      { status: String(status), success: 0, tokens_input: 4, tokens_output: 2 },
    ]);
    const counters = getKeyQuotaCounters(result.key.id);
    assert.equal(counters.rpmUsed, 1);
    assert.equal(counters.tpmUsed, 6);
    const account = await providersDb.getProviderConnectionById(result.connection.id);
    assert.equal(account?.lastError, "earlier failure");
    assert.equal(account?.testStatus, "unavailable");
  });
}

for (const { name, guardrail, status, legacyFailure } of [
  { name: "guardrail refusal", guardrail: new DenyAll(), status: 400, legacyFailure: [] },
  {
    name: "malformed reply",
    guardrail: new EmptyTheReply(),
    status: 502,
    legacyFailure: [{ status: "502", success: 0, tokens_input: 0, tokens_output: 0 }],
  },
]) {
  test(`${name} with the flag disabled keeps legacy success accounting`, async (t) => {
    t.after(() => {
      delete process.env[flag];
    });
    process.env[flag] = "false";
    const result = await blockedRequest(guardrail);
    assert.equal(result.res.status, status);
    assert.deepEqual(result.rows, [
      { status: "200", success: 1, tokens_input: 4, tokens_output: 2 },
      ...legacyFailure,
    ]);
    const counters = getKeyQuotaCounters(result.key.id);
    assert.equal(counters.rpmUsed, 1);
    assert.equal(counters.tpmUsed, 6);
    const account = await providersDb.getProviderConnectionById(result.connection.id);
    assert.equal(account?.lastError, undefined);
    assert.equal(account?.testStatus, "active");
  });
}
