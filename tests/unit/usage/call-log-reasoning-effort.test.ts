import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import test from "node:test";
import { getDbInstance, resetDbInstance } from "../../../src/lib/db/core.ts";
import {
  clearNoneHonoredCache,
  getNoneHonoredSnapshot,
  readNoneHonored,
} from "../../../src/lib/db/reasoningEffortCompliance.ts";
import { closeCallLogSaves, saveCallLog } from "../../../src/lib/usage/callLogs.ts";

const previousOptIn = process.env.OMNIROUTE_LOG_ALL_REASONING_EFFORT;

test.beforeEach(() => {
  delete process.env.OMNIROUTE_LOG_ALL_REASONING_EFFORT;
});

test.afterEach(() => {
  if (previousOptIn === undefined) delete process.env.OMNIROUTE_LOG_ALL_REASONING_EFFORT;
  else process.env.OMNIROUTE_LOG_ALL_REASONING_EFFORT = previousOptIn;
  clearNoneHonoredCache();
});

test.after(async () => {
  await closeCallLogSaves(5_000);
  resetDbInstance();
});

type EffortRow = {
  reasoning_source: string | null;
  reasoning_effort_requested: string | null;
  reasoning_effort_upstream: string | null;
};

async function recordEffort(
  entry: Record<string, unknown>,
  metadataOnly = false
): Promise<EffortRow> {
  const id = `test-reasoning-effort-${randomUUID()}`;
  await saveCallLog(
    {
      id,
      method: "POST",
      path: "/v1/chat/completions",
      status: 200,
      model: "effort-log-fixture",
      provider: "anthropic-compatible",
      tokens: { prompt_tokens: 5, completion_tokens: 10 },
      responseBody: { choices: [{ message: { content: "answer" } }] },
      ...entry,
    },
    metadataOnly
  );
  const row = getDbInstance()
    .prepare(
      "SELECT reasoning_source, reasoning_effort_requested, reasoning_effort_upstream FROM call_logs WHERE id = ?"
    )
    .get(id) as EffortRow | undefined;
  assert.ok(row, "the call log must be persisted");
  return row;
}

test("default logging preserves encrypted-only collection and its existing effort values", async () => {
  const request = {
    clientRequestBody: { reasoning_effort: " low " },
    upstreamRequestBody: { output_config: { effort: "medium" } },
  };
  assert.deepEqual(await recordEffort(request), {
    reasoning_source: null,
    reasoning_effort_requested: null,
    reasoning_effort_upstream: null,
  });
  assert.deepEqual(await recordEffort({ ...request, reasoningMeta: { encryptedSeen: true } }), {
    reasoning_source: "encrypted",
    reasoning_effort_requested: " low ",
    reasoning_effort_upstream: null,
  });
});

for (const shape of [
  { name: "reasoning_effort", body: (effort: string) => ({ reasoning_effort: effort }) },
  { name: "reasoning.effort", body: (effort: string) => ({ reasoning: { effort } }) },
  { name: "output_config.effort", body: (effort: string) => ({ output_config: { effort } }) },
]) {
  test(`opt-in logs requested and forwarded ${shape.name} without opaque reasoning`, async () => {
    process.env.OMNIROUTE_LOG_ALL_REASONING_EFFORT = "true";
    const clientRequestBody = shape.body(" Custom-Level ");
    const upstreamRequestBody = shape.body(" high ");
    assert.deepEqual(await recordEffort({ clientRequestBody, upstreamRequestBody }), {
      reasoning_source: null,
      reasoning_effort_requested: "Custom-Level",
      reasoning_effort_upstream: "high",
    });
    assert.deepEqual(clientRequestBody, shape.body(" Custom-Level "));
    assert.deepEqual(upstreamRequestBody, shape.body(" high "));
  });
}

test("opt-in preserves effort precedence and ignores malformed values", async () => {
  process.env.OMNIROUTE_LOG_ALL_REASONING_EFFORT = "true";
  const row = await recordEffort({
    clientRequestBody: {
      reasoning_effort: "low",
      reasoning: { effort: "medium" },
      output_config: { effort: "high" },
    },
    upstreamRequestBody: {
      reasoning_effort: "an invalid long arbitrary value",
      reasoning: { effort: "medium" },
      output_config: { effort: "high" },
    },
  });
  assert.equal(row.reasoning_effort_requested, "low");
  assert.equal(row.reasoning_effort_upstream, "medium");

  const missing = await recordEffort({
    requestBody: { reasoning_effort: "none" },
    clientRequestBody: [],
    upstreamRequestBody: { output_config: { effort: "x".repeat(33) } },
  });
  assert.equal(missing.reasoning_effort_requested, null);
  assert.equal(missing.reasoning_effort_upstream, null);
  const legacyRequest = await recordEffort({ requestBody: { output_config: { effort: "max" } } });
  assert.equal(legacyRequest.reasoning_effort_requested, "max");
});

test("opt-in keeps wider collection off for no-log and metadata-only requests", async () => {
  process.env.OMNIROUTE_LOG_ALL_REASONING_EFFORT = "true";
  const request = {
    clientRequestBody: { output_config: { effort: "low" } },
    upstreamRequestBody: { reasoning_effort: "low" },
  };
  for (const row of [
    await recordEffort({ ...request, noLog: true }),
    await recordEffort(request, true),
  ]) {
    assert.equal(row.reasoning_effort_requested, null);
    assert.equal(row.reasoning_effort_upstream, null);
  }
});

test("opt-in records failed requests but only successful new samples inform compliance", async () => {
  process.env.OMNIROUTE_LOG_ALL_REASONING_EFFORT = "true";
  const model = "effort-log-compliance-fixture";
  const request = { model, clientRequestBody: { reasoning_effort: "none" } };
  const failure = await recordEffort({ ...request, status: 503 });
  assert.equal(failure.reasoning_effort_requested, "none");
  await recordEffort(request);
  assert.equal(readNoneHonored(getNoneHonoredSnapshot(), model).sampleSize, 1);
});

test("existing encrypted compliance samples remain eligible across response statuses", async () => {
  const model = "effort-log-encrypted-fixture";
  await recordEffort({
    model,
    status: 503,
    clientRequestBody: { reasoning_effort: "none" },
    reasoningMeta: { encryptedSeen: true },
  });
  assert.equal(readNoneHonored(getNoneHonoredSnapshot(), model).sampleSize, 1);
});
