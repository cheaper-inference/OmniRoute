import assert from "node:assert/strict";
import test from "node:test";
import { compactAgenticBody } from "../../open-sse/services/agenticCompaction.ts";
import { handleAgenticPipelineChat } from "../../open-sse/services/agenticPipeline.ts";
import { comboRuntimeConfigSchema } from "../../src/shared/validation/schemas/combo.ts";

const config = {
  enabled: true,
  defaultMaxChars: 10_000,
  targetRatio: 0.72,
  toolResultMaxChars: 1_000,
};
const large = "x".repeat(20_000);
const source = () => ({
  messages: [
    { role: "system", content: "keep instructions" },
    { role: "user", content: large },
    { role: "assistant", content: "old answer" },
    { role: "user", content: "current task" },
    {
      role: "assistant",
      content: [
        { type: "tool_use", id: "a", name: "read" },
        { type: "tool_use", id: "b", name: "read" },
      ],
    },
    {
      role: "user",
      content: [
        { type: "tool_result", tool_use_id: "a", content: large },
        { type: "tool_result", tool_use_id: "b", content: large },
      ],
    },
  ],
  tools: [{ name: "read" }, { name: "read" }],
  stream: true,
});

test("per-model budget compacts history, keeps instructions and the parallel active tool boundary", () => {
  const body = source();
  const original = JSON.stringify(body);
  const small = compactAgenticBody(body, "p/small", {
    ...config,
    defaultMaxChars: 100_000,
    modelMaxChars: { "p/small": 10_000 },
  });
  assert.equal(small.compacted, true);
  assert.equal(small.overLimit, false);
  assert.ok(small.after <= 7_200);
  assert.equal(small.body.stream, true);
  assert.equal((small.body.tools as unknown[]).length, 1);
  assert.match(JSON.stringify(small.body), /keep instructions/);
  assert.match(JSON.stringify(small.body), /current task/);
  assert.match(JSON.stringify(small.body), /sha256=/);
  assert.equal(
    (small.body.messages as unknown[]).filter((item) => JSON.stringify(item).includes('"tool_use"'))
      .length,
    1
  );
  assert.equal(JSON.stringify(body), original);
  assert.equal(
    compactAgenticBody(body, "p/large", { ...config, defaultMaxChars: 100_000 }).body,
    body
  );
});
test("disabled compaction leaves the exact request untouched", () => {
  const body = source();
  assert.equal(compactAgenticBody(body, "p/small").body, body);
  assert.equal(compactAgenticBody(body, "p/small", { ...config, enabled: false }).body, body);
});
test("Chat Completions, Responses and Gemini retain call/result identifiers and valid result shapes", () => {
  const bodies = [
    {
      messages: [
        { role: "user", content: "task" },
        {
          role: "assistant",
          tool_calls: [{ id: "a", function: { name: "read", arguments: "{}" } }],
        },
        { role: "tool", tool_call_id: "a", content: large },
      ],
    },
    {
      input: [
        { role: "user", content: "task" },
        { type: "function_call", call_id: "a", name: "read", arguments: "{}" },
        { type: "function_call_output", call_id: "a", output: large },
      ],
    },
    {
      contents: [
        { role: "user", parts: [{ text: "instruction" }] },
        { role: "user", parts: [{ text: "task" }] },
        { role: "model", parts: [{ functionCall: { name: "read", args: {} } }] },
        {
          role: "user",
          parts: [{ functionResponse: { name: "read", response: { result: large } } }],
        },
      ],
    },
  ];
  for (const body of bodies) {
    const result = compactAgenticBody(body, "p/small", config);
    assert.equal(result.overLimit, false);
    assert.match(JSON.stringify(result.body), /read/);
    assert.match(JSON.stringify(result.body), /evidence compacted/);
  }
});
test("different tool schemas with the same name are preserved", () => {
  const body = {
    ...source(),
    tools: [
      { name: "read", description: "one" },
      { name: "read", description: "two" },
    ],
  };
  assert.equal((compactAgenticBody(body, "p/small", config).body.tools as unknown[]).length, 2);
});

test("structured computer outputs remain objects and fail closed when too large", () => {
  const output = { type: "computer_screenshot", image_url: "data:image/png;base64," + large };
  const body = {
    input: [
      { role: "user", content: "inspect the screenshot" },
      { type: "computer_call", call_id: "screen", action: { type: "screenshot" } },
      { type: "computer_call_output", call_id: "screen", output },
    ],
  };
  const result = compactAgenticBody(body, "p/small", config);
  const retained = (result.body.input as Record<string, unknown>[]).find(
    (item) => item.type === "computer_call_output"
  );
  assert.deepEqual(retained?.output, output);
  assert.equal(result.overLimit, true);
});
test("uncompressible pinned context fails before upstream dispatch", async () => {
  let calls = 0;
  const noop = () => undefined;
  const result = await handleAgenticPipelineChat({
    body: { messages: [{ role: "user", content: large }] },
    steps: [{ model: "p/planner" }, { model: "p/executor" }],
    config: { contextCompaction: config },
    log: { info: noop, warn: noop, debug: noop },
    handleSingleModel: async () => {
      calls++;
      return new Response("unexpected");
    },
  });
  assert.equal(result.status, 413);
  assert.equal(calls, 0);
});
test("planner decision, executor and planner final use their own configured budgets", async () => {
  const seen: string[] = [];
  const noop = () => undefined;
  const run = async (route: string) =>
    handleAgenticPipelineChat({
      body: source(),
      steps: [{ model: "p/planner" }, { model: "p/executor" }],
      config: {
        contextCompaction: {
          ...config,
          modelMaxChars: { "p/planner": 12_000, "p/executor": 10_000 },
        },
      },
      log: { info: noop, warn: noop, debug: noop },
      handleSingleModel: async (body, model) => {
        seen.push(model);
        assert.ok(JSON.stringify(body).length <= (model === "p/planner" ? 12_000 : 10_000));
        return Response.json({
          choices: [{ message: { content: `OMNIROUTE_ROUTE: ${route}\nContinue.` } }],
        });
      },
    });
  await run("TOOLS");
  await run("FINAL");
  assert.deepEqual(seen, ["p/planner", "p/executor", "p/planner", "p/planner"]);
});
test("compaction configuration validates budgets and rejects unknown settings", () => {
  assert.equal(
    comboRuntimeConfigSchema.safeParse({ agenticOrchestration: { contextCompaction: config } })
      .success,
    true
  );
  for (const invalid of [
    { ...config, defaultMaxChars: 1 },
    { ...config, targetRatio: 1 },
    { ...config, mystery: true },
  ])
    assert.equal(
      comboRuntimeConfigSchema.safeParse({ agenticOrchestration: { contextCompaction: invalid } })
        .success,
      false
    );
});

test("executor fallbacks apply each model's budget without mutating the original request", async () => {
  const body = source();
  const original = JSON.stringify(body);
  const seen: string[] = [];
  const noop = () => undefined;
  const budgets = { "p/planner": 12_000, "p/executor": 10_000, "p/backup": 7_000 };
  const result = await handleAgenticPipelineChat({
    body,
    steps: [{ model: "p/planner" }, { model: "p/executor" }, { model: "p/backup" }],
    config: { contextCompaction: { ...config, modelMaxChars: budgets } },
    log: { info: noop, warn: noop, debug: noop },
    handleSingleModel: async (request, model) => {
      seen.push(model);
      assert.ok(JSON.stringify(request).length <= budgets[model]);
      if (model === "p/executor") return new Response("quota exceeded", { status: 429 });
      return Response.json({
        choices: [{ message: { content: "OMNIROUTE_ROUTE: TOOLS\nContinue." } }],
      });
    },
  });
  assert.equal(result.status, 200);
  assert.deepEqual(seen, ["p/planner", "p/executor", "p/backup"]);
  assert.equal(JSON.stringify(body), original);
});

test("an over-budget executor is skipped before dispatch and a larger backup can take over", async () => {
  const seen: string[] = [];
  const noop = () => undefined;
  const result = await handleAgenticPipelineChat({
    body: {
      messages: [{ role: "user", content: "pinned task " + "x".repeat(5_000) }],
      tools: [{ name: "read" }],
    },
    steps: [{ model: "p/planner" }, { model: "p/executor" }, { model: "p/backup" }],
    config: {
      contextCompaction: {
        ...config,
        modelMaxChars: { "p/planner": 20_000, "p/executor": 2_000, "p/backup": 20_000 },
      },
    },
    log: { info: noop, warn: noop, debug: noop },
    handleSingleModel: async (_request, model) => {
      seen.push(model);
      return Response.json({
        choices: [{ message: { content: "OMNIROUTE_ROUTE: TOOLS\nContinue." } }],
      });
    },
  });
  assert.equal(result.status, 200);
  assert.deepEqual(seen, ["p/planner", "p/backup"]);
});

test("history pruning serializes linear payload volume rather than every shrinking history", () => {
  const messages = Array.from({ length: 200 }, (_value, index) => ({
    role: index % 2 ? "assistant" : "user",
    content: "x".repeat(250),
  }));
  messages.push({ role: "user", content: "current task" });
  const body = { messages };
  const original = JSON.stringify(body);
  const stringify = JSON.stringify;
  let serializedChars = 0;
  JSON.stringify = function (...args: Parameters<typeof JSON.stringify>) {
    const text = stringify.apply(JSON, args);
    serializedChars += text?.length ?? 0;
    return text;
  } as typeof JSON.stringify;
  let result: ReturnType<typeof compactAgenticBody>;
  try {
    result = compactAgenticBody(body, "p/small", { ...config, defaultMaxChars: 2_000 });
  } finally {
    JSON.stringify = stringify;
  }
  assert.ok(serializedChars < original.length * 6, `${serializedChars} serialized characters`);
  assert.equal(result.after, JSON.stringify(result.body).length);
  assert.equal(JSON.stringify(body), original);
});

type FixtureBody = Record<string, unknown>;
type HistoryFixture = {
  body: FixtureBody;
  key: string;
  groups: FixtureBody[][];
  pinned: Set<number>;
};

function historyFixture(protocol: string, previousTurns: number): HistoryFixture {
  const key = protocol === "responses" ? "input" : protocol === "gemini" ? "contents" : "messages";
  const message = (role: string, text: string): FixtureBody =>
    key === "contents" ? { role, parts: [{ text }] } : { role, content: text };
  const groups: FixtureBody[][] = [
    [message(key === "contents" ? "user" : "system", "preserve instructions")],
  ];
  for (let index = 0; index < previousTurns; index++) {
    groups.push([message("user", `${index}:\n\"quoted\" \\ text 😀 বাংলা `.repeat(30))]);
    groups.push([message(key === "contents" ? "model" : "assistant", "old answer".repeat(25))]);
  }
  const latest = groups.length;
  groups.push([message("user", "current task")]);
  groups.push(activeFixtureRound(protocol));
  const body: FixtureBody = {
    metadata: { escaped: '\t"\\😀', request: "unchanged" },
    stream: true,
    tools: [{ name: "read", description: "retained schema" }],
    [key]: groups.flat(),
  };
  return { body, key, groups, pinned: new Set([0, latest, groups.length - 1]) };
}

function activeFixtureRound(protocol: string): FixtureBody[] {
  if (protocol === "responses")
    return [
      { type: "function_call", call_id: "active", name: "read", arguments: "{}" },
      { type: "function_call", call_id: "parallel", name: "read", arguments: '{"path":"b"}' },
      { type: "function_call_output", call_id: "active", output: "current evidence" },
      { type: "function_call_output", call_id: "parallel", output: "parallel evidence" },
    ];
  if (protocol === "gemini")
    return [
      { role: "model", parts: [{ functionCall: { name: "read", args: {} } }] },
      {
        role: "user",
        parts: [{ functionResponse: { name: "read", response: { result: "current evidence" } } }],
      },
    ];
  if (protocol === "chat")
    return [
      {
        role: "assistant",
        tool_calls: [
          { id: "active", function: { name: "read", arguments: "{}" } },
          { id: "parallel", function: { name: "read", arguments: '{"path":"b"}' } },
        ],
      },
      { role: "tool", tool_call_id: "active", content: "current evidence" },
      { role: "tool", tool_call_id: "parallel", content: "parallel evidence" },
    ];
  return [
    { role: "assistant", content: [{ type: "tool_use", id: "active", name: "read", input: {} }] },
    {
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "active", content: "current evidence" }],
    },
  ];
}

/** The previous repeated-render algorithm, with known groups and no oversized evidence. */
function referencePruning(fixture: HistoryFixture, limit: number, ratio: number) {
  const before = JSON.stringify(fixture.body).length;
  if (before <= limit)
    return {
      body: fixture.body,
      before,
      after: before,
      limit,
      compacted: false,
      overLimit: false,
    };
  const body = structuredClone(fixture.body);
  const kept = fixture.groups.slice();
  let omitted = 0;
  const render = () => {
    const text = `[Earlier history compacted: ${omitted} entries omitted. Do not infer missing evidence.]`;
    const ledger =
      fixture.key === "contents"
        ? { role: "user", parts: [{ text }] }
        : { role: "system", content: text };
    body[fixture.key] = omitted ? [ledger, ...kept.flat()] : kept.flat();
  };
  render();
  for (const [index, group] of fixture.groups.entries()) {
    if (JSON.stringify(body).length <= Math.floor(limit * ratio)) break;
    if (fixture.pinned.has(index)) continue;
    kept.splice(kept.indexOf(group), 1);
    omitted += group.length;
    render();
  }
  const after = JSON.stringify(body).length;
  return { body, before, after, limit, compacted: after < before, overLimit: after > limit };
}

test("incremental pruning exactly matches repeated rendering across native protocols and budgets", () => {
  for (const protocol of ["anthropic", "chat", "responses", "gemini"])
    for (const turns of [0, 1, 10, 25])
      for (const limit of [500, 2_000, 8_000, 100_000])
        for (const ratio of [0.25, 0.72, 0.95]) {
          const fixture = historyFixture(protocol, turns);
          const original = JSON.stringify(fixture.body);
          const result = compactAgenticBody(fixture.body, "p/small", {
            ...config,
            defaultMaxChars: 100_000,
            modelMaxChars: { "p/small": limit },
            targetRatio: ratio,
          });
          assert.deepEqual(
            result,
            referencePruning(fixture, limit, ratio),
            `${protocol}/${turns}/${limit}/${ratio}`
          );
          assert.equal(JSON.stringify(fixture.body), original);
        }
});

test("empty and absent histories keep exact payload accounting when fixed context is too large", () => {
  for (const key of ["messages", "input", "contents"])
    for (const present of [false, true]) {
      if (!present && key !== "messages") continue;
      const body: FixtureBody = { metadata: { fixed: '\\"😀'.repeat(2_000) } };
      if (present) body[key] = [];
      const fixture = { body, key, groups: [], pinned: new Set<number>() };
      const result = compactAgenticBody(body, "p/small", { ...config, defaultMaxChars: 2_000 });
      assert.deepEqual(result, referencePruning(fixture, 2_000, config.targetRatio));
      assert.equal(result.overLimit, true);
      assert.equal(result.after, JSON.stringify(result.body).length);
    }
});
