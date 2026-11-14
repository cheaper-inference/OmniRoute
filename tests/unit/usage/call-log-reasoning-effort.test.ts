import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import test from "node:test";
import { getDbInstance, resetDbInstance } from "../../../src/lib/db/core.ts";
import { saveCallLog } from "../../../src/lib/usage/callLogs.ts";

type EffortRow = {
  reasoning_source: string | null;
  reasoning_effort_requested: string | null;
  reasoning_effort_upstream: string | null;
};

const ids: string[] = [];

test.after(() => {
  const db = getDbInstance();
  try {
    for (const id of ids) db.prepare("DELETE FROM call_logs WHERE id = ?").run(id);
  } finally {
    resetDbInstance();
  }
});

async function recordEffort(entry: Record<string, unknown>): Promise<EffortRow> {
  const id = `test-reasoning-effort-${randomUUID()}`;
  ids.push(id);
  await saveCallLog({
    id,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "test-model",
    provider: "anthropic-compatible",
    duration: 100,
    tokens: { prompt_tokens: 5, completion_tokens: 10 },
    responseBody: { choices: [{ message: { role: "assistant", content: "answer" } }] },
    ...entry,
  });
  const row = getDbInstance()
    .prepare(
      "SELECT reasoning_source, reasoning_effort_requested, reasoning_effort_upstream FROM call_logs WHERE id = ?"
    )
    .get(id) as EffortRow | undefined;
  assert.ok(row, "call log must be persisted");
  return row;
}

const sources = [
  { name: "no reasoning", source: null, entry: {} },
  {
    name: "plain reasoning content",
    source: "content",
    entry: {
      responseBody: {
        choices: [{ message: { content: "answer", reasoning_content: "thought about it" } }],
      },
    },
  },
  {
    name: "usage reasoning",
    source: "usage",
    entry: {
      tokens: {
        prompt_tokens: 5,
        completion_tokens: 10,
        completion_tokens_details: { reasoning_tokens: 4 },
      },
    },
  },
  {
    name: "encrypted reasoning",
    source: "encrypted",
    entry: { reasoningMeta: { encryptedSeen: true } },
  },
];

const shapes = [
  { name: "reasoning_effort", body: (effort: string) => ({ reasoning_effort: effort }) },
  { name: "reasoning.effort", body: (effort: string) => ({ reasoning: { effort } }) },
  { name: "output_config.effort", body: (effort: string) => ({ output_config: { effort } }) },
];

for (const shape of shapes) {
  test(`trims logged ${shape.name} without changing request bodies or effort levels`, async () => {
    const clientRequestBody = shape.body(" \tCustom-Level\n ");
    const upstreamRequestBody = shape.body(" \nhigh\t ");
    const row = await recordEffort({ clientRequestBody, upstreamRequestBody });
    assert.equal(row.reasoning_effort_requested, "Custom-Level");
    assert.equal(row.reasoning_effort_upstream, "high");
    assert.deepEqual(clientRequestBody, shape.body(" \tCustom-Level\n "));
    assert.deepEqual(upstreamRequestBody, shape.body(" \nhigh\t "));
  });

  for (const source of sources) {
    test(`records ${shape.name} with ${source.name}`, async () => {
      const row = await recordEffort({
        ...source.entry,
        clientRequestBody: shape.body("xhigh"),
        upstreamRequestBody: shape.body("high"),
      });
      assert.equal(row.reasoning_source, source.source);
      assert.equal(row.reasoning_effort_requested, "xhigh");
      assert.equal(row.reasoning_effort_upstream, "high");
    });
  }
}

test("falls back to requestBody only when clientRequestBody is absent", async () => {
  for (const clientRequestBody of [undefined, null]) {
    const row = await recordEffort({
      clientRequestBody,
      requestBody: { reasoning_effort: " low " },
    });
    assert.equal(row.reasoning_effort_requested, "low");
    assert.equal(row.reasoning_effort_upstream, null);
  }
  const row = await recordEffort({
    clientRequestBody: { messages: [] },
    requestBody: { reasoning_effort: "low" },
    upstreamRequestBody: { output_config: { effort: "medium" } },
  });
  assert.equal(row.reasoning_effort_requested, null);
  assert.equal(row.reasoning_effort_upstream, "medium");
});

test("preserves direct, reasoning, then output_config precedence", async () => {
  const row = await recordEffort({
    clientRequestBody: {
      reasoning_effort: " low ",
      reasoning: { effort: " medium " },
      output_config: { effort: "high" },
    },
    upstreamRequestBody: {
      reasoning_effort: " ",
      reasoning: { effort: "medium" },
      output_config: { effort: "high" },
    },
  });
  assert.equal(row.reasoning_effort_requested, "low");
  assert.equal(row.reasoning_effort_upstream, "medium");
});

test("skips malformed earlier shapes and trims nonempty effort strings", async () => {
  const row = await recordEffort({
    clientRequestBody: {
      reasoning_effort: 1,
      reasoning: [],
      output_config: { effort: "none" },
    },
    upstreamRequestBody: {
      reasoning_effort: "",
      reasoning: { effort: false },
      output_config: { effort: " high " },
    },
  });
  assert.equal(row.reasoning_effort_requested, "none");
  assert.equal(row.reasoning_effort_upstream, "high");
});

test("keeps both effort columns null for missing or malformed values", async () => {
  for (const body of [
    undefined,
    null,
    [],
    "high",
    1,
    { messages: [] },
    { reasoning_effort: " " },
    { reasoning: null },
    { reasoning: [] },
    { reasoning: { effort: 1 } },
    { output_config: null },
    { output_config: [] },
    { output_config: {} },
    { output_config: { effort: " " } },
    { output_config: { effort: false } },
  ]) {
    const row = await recordEffort({
      clientRequestBody: body,
      upstreamRequestBody: body,
      reasoningMeta: { encryptedSeen: true },
    });
    assert.equal(row.reasoning_effort_requested, null);
    assert.equal(row.reasoning_effort_upstream, null);
  }
});
