import assert from "node:assert/strict";
import test, { type TestContext } from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

process.env.APP_LOG_TO_FILE = "false";

const BILL_SERVED = "FAMILY_FALLBACK_BILL_SERVED_MODEL_ENABLED";
const ACCOUNT_UPSTREAM_FAILURE = "NONSTREAM_UPSTREAM_FAILURE_BILLED_USAGE_ENABLED";
const ACCOUNT_REFUSAL = "NONSTREAM_REFUSED_REPLY_FAILURE_ACCOUNTING_ENABLED";
const REQUESTED = "claude-opus-4-6-thinking";
const SERVED = "claude-opus-4-6";
const METERED_REQUESTED = "claude-opus-4-8";
const METERED_SERVED = "claude-opus-4.7";
const REQUESTED_COST = 0.0014;
const SERVED_COST = 0.000014;

const h = await createChatPipelineHarness("bill-served-model");
const { getUsageHistory } = await import("../../src/lib/usage/usageHistory.ts");
const { listLedgerEntries } = await import("../../src/lib/db/costLedger.ts");
const { flushProxyLogsSync } = await import("../../src/lib/proxyLogger.ts");
const { getKeyQuotaCounters } = await import("../../src/lib/db/keyQuota.ts");
const { createPool } = await import("../../src/lib/db/quotaPools.ts");
const { setModelCap } = await import("../../src/lib/db/quotaModelCaps.ts");
const { getWindowUsage, upsertTokenLimit } = await import("../../src/lib/db/tokenLimits.ts");
const { getQuotaStore } = await import("../../src/lib/quota/storeFactory.ts");
const { updatePricing } = await import("../../src/lib/db/settings.ts");
const { recentRoutingEvents } = await import("../../open-sse/services/routing/index.ts");
const { guardrailRegistry } = await import("../../src/lib/guardrails/registry.ts");
const { BaseGuardrail } = await import("../../src/lib/guardrails/base.ts");
const { stopSemanticCachePruneJob } = await import("../../src/lib/jobs/semanticCachePruneJob.ts");
const { stopSpendBatchWriter } = await import("../../src/lib/spend/batchWriter.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { closeSharedLoggerResource } = await import("../../src/shared/utils/loggerResource.ts");

test.afterEach(() => guardrailRegistry.clear());
test.after(async () => {
  stopSemanticCachePruneJob();
  await stopSpendBatchWriter();
  await closeCallLogSaves();
  flushProxyLogsSync();
  await h.cleanup();
  await closeSharedLoggerResource();
});

class EmptyTheReply extends BaseGuardrail {
  constructor() {
    super("empty-family-fallback-reply", { priority: 1 });
  }
  async postCall(response: unknown) {
    return { block: false, modifiedResponse: { ...(response as object), choices: [] } };
  }
}

class RefuseTheReply extends BaseGuardrail {
  constructor() {
    super("refuse-family-fallback-reply", { priority: 1 });
  }
  async postCall() {
    return { block: true, message: "Blocked after family fallback" };
  }
}

function notFound(model: string) {
  return new Response(
    JSON.stringify({
      type: "error",
      error: { type: "not_found_error", message: `model: ${model}` },
    }),
    { status: 404, headers: { "Content-Type": "application/json" } }
  );
}

function sseReply(model: string, fails: boolean) {
  const events: Array<[string, unknown]> = [
    [
      "message_start",
      {
        type: "message_start",
        message: {
          id: "m",
          type: "message",
          role: "assistant",
          model,
          content: [],
          usage: { input_tokens: 10, output_tokens: 1 },
        },
      },
    ],
    [
      "content_block_start",
      { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
    ],
    [
      "content_block_delta",
      { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "hi" } },
    ],
    ["content_block_stop", { type: "content_block_stop", index: 0 }],
    [
      "message_delta",
      { type: "message_delta", delta: { stop_reason: "end_turn" }, usage: { output_tokens: 4 } },
    ],
    ["message_stop", { type: "message_stop" }],
  ];
  if (fails) {
    events.pop();
    events.push([
      "error",
      { type: "error", error: { type: "overloaded_error", message: "Synthetic stream failure" } },
    ]);
  }
  return new Response(
    events.map(([e, d]) => `event: ${e}\ndata: ${JSON.stringify(d)}\n\n`).join(""),
    {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    }
  );
}

type Scenario = {
  stream?: boolean;
  direct?: boolean;
  billServed?: boolean;
  refuse?: "malformed" | "guardrail";
  streamFailure?: boolean;
  upstreamFailure?: boolean;
  metered?: boolean;
};

async function run(
  t: TestContext,
  {
    stream = false,
    direct = false,
    billServed = true,
    refuse,
    streamFailure = false,
    upstreamFailure = false,
    metered = false,
  }: Scenario
) {
  const flags = {
    [BILL_SERVED]: billServed,
    [ACCOUNT_REFUSAL]: Boolean(refuse),
    [ACCOUNT_UPSTREAM_FAILURE]: upstreamFailure && !stream,
  };
  for (const [flag, enabled] of Object.entries(flags)) {
    const previous = process.env[flag];
    t.after(() => {
      if (previous === undefined) delete process.env[flag];
      else process.env[flag] = previous;
    });
    process.env[flag] = String(enabled);
  }
  await h.resetStorage();
  const provider = metered ? "anthropic" : "claude";
  const requested = metered ? METERED_REQUESTED : REQUESTED;
  const served = metered ? METERED_SERVED : SERVED;
  const connection = await h.seedConnection(provider);
  assert.ok(typeof connection?.id === "string", "seeded provider connection ID");
  const key = await h.seedApiKey({});
  const pool = createPool({
    name: "Fallback billing test",
    connectionId: connection.id,
    allocations: [{ apiKeyId: key.id, weight: 1, policy: "hard" }],
  });
  const models = [requested, served];
  const keyLimits = models.map((scopeValue) =>
    upsertTokenLimit({ apiKeyId: key.id, scopeType: "model", scopeValue, tokenLimit: 10_000 })
  );
  for (const model of models) {
    setModelCap({ poolId: pool.id, apiKeyId: key.id, model, capUnit: "usd", capValue: 1 });
  }
  await updatePricing({
    [provider]: {
      [requested]: { input: 100, output: 100 },
      [served]: { input: 1, output: 1 },
    },
  });
  if (refuse === "malformed") guardrailRegistry.register(new EmptyTheReply());
  if (refuse === "guardrail") guardrailRegistry.register(new RefuseTheReply());

  const model = `${provider}/${direct ? served : requested}`;
  const dispatched: string[] = [];
  globalThis.fetch = async (_input, init) => {
    const sent = JSON.parse(String(init?.body ?? "{}")) as { model: string };
    dispatched.push(sent.model);
    if (sent.model === requested) return notFound(requested);
    if (upstreamFailure) {
      return Response.json(
        {
          type: "error",
          error: { type: "invalid_request_error", message: "Synthetic provider rejection" },
          ...(stream ? {} : { usage: { input_tokens: 10, output_tokens: 4 } }),
        },
        { status: 400 }
      );
    }
    return stream
      ? sseReply(sent.model, streamFailure)
      : h.buildClaudeResponse("served by the sibling", sent.model);
  };

  const res = await h.handleChat(
    h.buildRequest({
      authKey: key.key,
      headers: metered ? { "x-omniroute-allow-cross-version-fallback": "true" } : {},
      body: {
        model,
        stream,
        messages: [{ role: "user", content: `billing test ${crypto.randomUUID()}` }],
      },
    })
  );
  const body = await res.text();
  if (streamFailure) assert.match(body, /Synthetic stream failure/);
  const status =
    upstreamFailure || refuse === "guardrail" ? 400 : streamFailure || refuse ? 502 : 200;
  assert.equal(res.status, streamFailure ? 200 : status);
  assert.deepEqual(dispatched, direct ? [served] : [requested, served]);
  if (!refuse && !upstreamFailure) assert.equal(res.headers.get("x-omniroute-model"), served);

  const callLog = await h.waitFor(async () => {
    const latest = await h.getLatestCallLog();
    return latest?.status === status ? latest : null;
  }, 10_000);
  assert.ok(callLog, "final call log");
  const findRoutingEvent = () =>
    recentRoutingEvents().find((event) => event.apiKeyId === key.id && event.status === status);
  const expectRoutingEvent = billServed || (!upstreamFailure && refuse !== "guardrail");
  const routingEvent = expectRoutingEvent ? await h.waitFor(findRoutingEvent) : findRoutingEvent();
  assert.equal(Boolean(routingEvent), expectRoutingEvent, "final routing event");
  const usage = (await getUsageHistory({ provider }))
    .filter((entry) => entry.apiKeyId === key.id)
    .map(({ model, success, tokens }) => ({
      model,
      success,
      input: tokens.input,
      output: tokens.output,
    }));
  const preStreamFailure = stream && upstreamFailure;
  const counters = getKeyQuotaCounters(key.id);
  assert.equal(counters.rpmUsed, preStreamFailure ? 0 : 1);
  assert.equal(counters.tpmUsed, preStreamFailure ? 0 : 14);
  const store = await getQuotaStore();
  const keyTokenUsage = keyLimits.map((limit) => getWindowUsage(limit));
  const quotaShare =
    !preStreamFailure && (billServed || (!refuse && !streamFailure && !upstreamFailure))
      ? await h.waitFor(async () => {
          const spent = await Promise.all(
            models.map((model) =>
              store.peek(key.id, {
                poolId: `${pool.id}:model:${model}`,
                unit: "usd",
                window: "hourly",
              })
            )
          );
          // Normalize binary floating-point drift from per-token cost to USD micro-units.
          return spent.some((cost) => cost > 0) ? spent.map(normalizeCost) : null;
        })
      : null;
  const cost =
    stream || refuse || upstreamFailure
      ? (routingEvent?.cost ?? null)
      : Number(res.headers.get("x-omniroute-response-cost"));
  if (metered && cost) {
    const ledger = await h.waitFor(() => {
      const entries = listLedgerEntries(key.id);
      return entries.length ? entries : null;
    });
    assert.deepEqual(
      ledger?.map((entry) => ({
        model: entry.model,
        cost: normalizeCost(entry.amountUsd),
        success: entry.success,
      })),
      [
        {
          model: routingEvent?.model,
          cost: normalizeCost(cost),
          success: status === 200,
        },
      ]
    );
  }
  return {
    models: {
      usage,
      callLog: callLog.model,
      requested: callLog.requestedModel,
      routing: routingEvent?.model ?? null,
    },
    cost: cost === null ? null : normalizeCost(cost),
    keyTokenUsage,
    quotaShare,
  };
}

function normalizeCost(cost: number) {
  return Number(cost.toFixed(6));
}

function expected(model: string, requested: string, success = true, provider = "claude") {
  return {
    usage: [{ model, success, input: 10, output: 4 }],
    callLog: model,
    requested: `${provider}/${requested}`,
    routing: model,
  };
}

for (const stream of [false, true]) {
  const mode = stream ? "streaming" : "non-streaming";
  test(`${mode}: a family fallback bills the sibling and keeps the requested model in the call log`, async (t) => {
    const actual = await run(t, { stream });
    assert.deepEqual(actual, {
      models: expected(SERVED, REQUESTED),
      cost: SERVED_COST,
      keyTokenUsage: [0, 14],
      quotaShare: [0, SERVED_COST],
    });
  });

  test(`${mode}: a family fallback keeps the requested price and attribution with the flag off`, async (t) => {
    const actual = await run(t, { stream, billServed: false });
    assert.deepEqual(actual, {
      models: expected(REQUESTED, REQUESTED),
      cost: REQUESTED_COST,
      keyTokenUsage: [14, 0],
      quotaShare: [REQUESTED_COST, 0],
    });
  });
}

for (const billServed of [false, true]) {
  test(`a direct request keeps its existing attribution with the flag ${billServed ? "on" : "off"}`, async (t) => {
    const actual = await run(t, { direct: true, billServed });
    assert.deepEqual(actual, {
      models: expected(SERVED, SERVED),
      cost: SERVED_COST,
      keyTokenUsage: [0, 14],
      quotaShare: [0, SERVED_COST],
    });
  });
}

test("a malformed reply after fallback records the sibling as a billed failure", async (t) => {
  const actual = await run(t, { refuse: "malformed" });
  assert.deepEqual(actual, {
    models: expected(SERVED, REQUESTED, false),
    cost: SERVED_COST,
    keyTokenUsage: [0, 14],
    quotaShare: [0, SERVED_COST],
  });
});

test("with billing off, refused-reply accounting uses the requested model and retains tokens", async (t) => {
  const actual = await run(t, { refuse: "malformed", billServed: false });
  assert.deepEqual(actual, {
    models: expected(REQUESTED, REQUESTED, false),
    cost: null,
    keyTokenUsage: [14, 0],
    quotaShare: null,
  });
});

test("a guardrail refusal after fallback records the sibling's spend and failed outcome", async (t) => {
  const actual = await run(t, { refuse: "guardrail" });
  assert.deepEqual(actual, {
    models: expected(SERVED, REQUESTED, false),
    cost: SERVED_COST,
    keyTokenUsage: [0, 14],
    quotaShare: [0, SERVED_COST],
  });
});

test("a streaming failure after fallback keeps the sibling on partial usage and failure records", async (t) => {
  const actual = await run(t, { stream: true, streamFailure: true });
  assert.deepEqual(actual, {
    models: expected(SERVED, REQUESTED, false),
    cost: SERVED_COST,
    keyTokenUsage: [0, 14],
    quotaShare: [0, SERVED_COST],
  });
});

test("the non-streaming fallback's billed upstream rejection uses the sibling's price and counters", async (t) => {
  const actual = await run(t, { upstreamFailure: true });
  assert.deepEqual(actual, {
    models: expected(SERVED, REQUESTED, false),
    cost: SERVED_COST,
    keyTokenUsage: [0, 14],
    quotaShare: [0, SERVED_COST],
  });
});

test("an HTTP rejection from the streaming fallback is attributed before the stream opens", async (t) => {
  const actual = await run(t, { stream: true, upstreamFailure: true });
  const models = expected(SERVED, REQUESTED, false);
  assert.deepEqual(actual, {
    models: {
      ...models,
      usage: [{ model: SERVED, success: false, input: 0, output: 0 }],
    },
    cost: null,
    keyTokenUsage: [0, 0],
    quotaShare: null,
  });
});

test("with billing off, a pre-stream HTTP rejection keeps the requested model and zero usage", async (t) => {
  const actual = await run(t, { stream: true, upstreamFailure: true, billServed: false });
  assert.deepEqual(actual, {
    models: {
      ...expected(REQUESTED, REQUESTED, false),
      usage: [{ model: REQUESTED, success: false, input: 0, output: 0 }],
      routing: null,
    },
    cost: null,
    keyTokenUsage: [0, 0],
    quotaShare: null,
  });
});

test("with billing off, a streaming failure keeps the original attribution and partial counts", async (t) => {
  const actual = await run(t, { stream: true, streamFailure: true, billServed: false });
  assert.deepEqual(actual, {
    models: expected(REQUESTED, REQUESTED, false),
    cost: null,
    keyTokenUsage: [0, 0],
    quotaShare: null,
  });
});

test("metered fallback with billing on spends the sibling price in the cost ledger", async (t) => {
  const actual = await run(t, { metered: true });
  assert.deepEqual(actual, {
    models: expected(METERED_SERVED, METERED_REQUESTED, true, "anthropic"),
    cost: SERVED_COST,
    keyTokenUsage: [0, 14],
    quotaShare: [0, SERVED_COST],
  });
});

test("metered fallback with billing off spends the requested price in the cost ledger", async (t) => {
  const actual = await run(t, { metered: true, billServed: false });
  assert.deepEqual(actual, {
    models: expected(METERED_REQUESTED, METERED_REQUESTED, true, "anthropic"),
    cost: REQUESTED_COST,
    keyTokenUsage: [14, 0],
    quotaShare: [REQUESTED_COST, 0],
  });
});

test("metered fallback that fails mid-stream records the sibling's partial spend in the cost ledger", async (t) => {
  const actual = await run(t, { metered: true, stream: true, streamFailure: true });
  assert.deepEqual(actual, {
    models: expected(METERED_SERVED, METERED_REQUESTED, false, "anthropic"),
    cost: SERVED_COST,
    keyTokenUsage: [0, 14],
    quotaShare: [0, SERVED_COST],
  });
});
