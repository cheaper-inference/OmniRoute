import assert from "node:assert/strict";
import { test } from "node:test";

import { compactCachedContext, estimateTokens } from "../../open-sse/services/contextManager.ts";

const long = (label: string) => `${label} ${"history ".repeat(650)}`;

function bodyWithTail(extra: Record<string, unknown>[] = []) {
  return {
    system: [{ type: "text", text: "system", cache_control: { type: "ephemeral" } }],
    tools: [{ name: "inspect", description: "read-only tool" }],
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: "Initial task", cache_control: { type: "ephemeral" } }],
      },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "signed thought", signature: "opaque" },
          { type: "text", text: "Start" },
        ],
      },
      { role: "user", content: long("old-1") },
      { role: "assistant", content: long("old-2") },
      { role: "user", content: long("old-3") },
      { role: "assistant", content: long("old-4") },
      { role: "user", content: long("latest-real-user") },
      {
        role: "assistant",
        content: [
          { type: "text", text: "Call" },
          { type: "tool_use", id: "t1", name: "inspect", input: { x: 1 } },
          { type: "tool_use", id: "t2", name: "inspect", input: { y: 2 } },
        ],
      },
      {
        role: "user",
        content: [
          { type: "tool_result", tool_use_id: "t1", content: long("result-1") },
          { type: "tool_result", tool_use_id: "t2", content: long("result-2") },
        ],
      },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "latest signed thought", signature: "opaque-latest" },
          { type: "text", text: "Working" },
        ],
      },
      { role: "user", content: "Next task" },
      ...extra,
    ],
  };
}

const opts = {
  maxTokens: 8_000,
  // In production this includes system, tools, instructions and calibration.
  fits: (body: Record<string, unknown>) => estimateTokens(body.messages) <= 8_000,
};

test("#9: adjacent overflowing turns preserve the same content prefix, not just its length", () => {
  const first = bodyWithTail();
  const next = bodyWithTail([
    { role: "assistant", content: [{ type: "text", text: long("new-assistant") }] },
    { role: "user", content: "Next task again" },
  ]);
  const unchanged = structuredClone(first);
  const a = compactCachedContext(first, opts);
  const b = compactCachedContext(next, opts);
  assert.equal(a.compressed, true);
  assert.equal(b.compressed, true);
  assert.deepEqual(first, unchanged, "source body must not be mutated");
  assert.deepEqual(a.body.system, first.system, "cache_control must remain in place");
  assert.deepEqual(a.body.tools, first.tools);
  const originalPrefix = first.messages.slice(0, 2);
  assert.deepEqual(a.body.messages.slice(0, 2), originalPrefix);
  assert.deepEqual(b.body.messages.slice(0, 2), originalPrefix);
  assert.equal(
    JSON.stringify(a.body.messages.slice(0, 2)),
    JSON.stringify(b.body.messages.slice(0, 2))
  );
  assert.equal(JSON.stringify(a.body.messages.slice(0, 2)), JSON.stringify(originalPrefix));
  assert.ok(a.body.messages.length < first.messages.length, "an old middle must be omitted");
  assert.ok(b.body.messages.length < next.messages.length);
  assert.deepEqual(compactCachedContext(first, opts), a, "compaction must be deterministic");
});

test("#9: middle omissions never split multiple tool calls and their results", () => {
  const result = compactCachedContext(bodyWithTail(), opts);
  assert.equal(result.compressed, true);
  const ids = new Set<string>();
  const results = new Set<string>();
  for (const msg of result.body.messages) {
    for (const block of Array.isArray(msg.content) ? msg.content : []) {
      if (block.type === "tool_use") ids.add(block.id);
      if (block.type === "tool_result") results.add(block.tool_use_id);
    }
  }
  assert.deepEqual(ids, results);
  assert.deepEqual(ids, new Set(["t1", "t2"]));
});

test("#9: a prefix boundary inside parallel OpenAI results retains complete call group", () => {
  const initial = { role: "user", content: "A".repeat(3900) };
  const call = {
    role: "assistant",
    tool_calls: [
      { id: "c1", type: "function", function: { name: "inspect", arguments: "{}" } },
      { id: "c2", type: "function", function: { name: "inspect", arguments: "{}" } },
    ],
  };
  const body = {
    messages: [
      initial,
      call,
      { role: "tool", tool_call_id: "c1", content: "first" },
      { role: "tool", tool_call_id: "c2", content: "second" },
      { role: "user", content: "old ".repeat(9_000) },
      { role: "user", content: "current" },
    ],
  };
  const result = compactCachedContext(body, {
    maxTokens: 8_000,
    fits: (candidate) => estimateTokens(candidate.messages) <= 8_000,
  });
  assert.equal(result.compressed, true);
  assert.deepEqual(result.body.messages[0], initial);
  const retained = JSON.stringify(result.body.messages);
  assert.equal(retained.includes('"tool_call_id":"c2"'), retained.includes('"id":"c2"'));
  assert.equal(retained.includes('"tool_call_id":"c1"'), retained.includes('"id":"c1"'));
});

test("#9: oversized leading system/developer instructions are mandatory", () => {
  const system = { role: "system", content: "S".repeat(6_000) };
  const developer = { role: "developer", content: "Follow policy" };
  const body = {
    messages: [
      system,
      developer,
      { role: "user", content: "old ".repeat(9_000) },
      { role: "assistant", content: "old answer" },
      { role: "user", content: "current request" },
    ],
  };
  const result = compactCachedContext(body, {
    maxTokens: 8_000,
    fits: (candidate) => estimateTokens(candidate.messages) <= 8_000,
  });
  assert.equal(result.compressed, true);
  assert.deepEqual(result.body.messages.slice(0, 2), [system, developer]);
  const impossible = compactCachedContext(body, {
    maxTokens: 8_000,
    fits: (candidate) => estimateTokens(candidate.messages) < 1_000,
  });
  assert.equal(impossible.compressed, false);
  assert.strictEqual(impossible.body, body);
});

test("#9: mid-history developer updates remain mandatory when compacting cached history", () => {
  const developer = { role: "developer", content: "Keep the current policy" };
  const body = {
    messages: [
      { role: "user", content: "first request" },
      { role: "assistant", content: "old ".repeat(9_000) },
      developer,
      { role: "user", content: "another old request" },
      { role: "assistant", content: "old answer ".repeat(9_000) },
      { role: "user", content: "current request" },
    ],
  };
  const result = compactCachedContext(body, {
    maxTokens: 8_000,
    fits: (candidate) => estimateTokens(candidate.messages) <= 8_000,
  });
  assert.equal(result.compressed, true);
  assert.ok(result.body.messages.includes(developer), "mid-history policy must not be omitted");
  assert.equal(result.stats.omitted, body.messages.length - result.body.messages.length);
  const impossible = compactCachedContext(body, {
    maxTokens: 8_000,
    fits: (candidate) => estimateTokens(candidate.messages) < 5,
  });
  assert.equal(impossible.compressed, false);
  assert.strictEqual(impossible.body, body);
});

test("#9: a user request pinned in the prefix keeps its complete subsequent tool cycles", () => {
  const body = {
    messages: [
      { role: "user", content: "current task" },
      { role: "assistant", tool_calls: [{ id: "c1", function: { name: "inspect" } }] },
      { role: "tool", tool_call_id: "c1", content: "first result ".repeat(1_000) },
      { role: "assistant", tool_calls: [{ id: "c2", function: { name: "inspect" } }] },
      { role: "tool", tool_call_id: "c2", content: "second result" },
      { role: "assistant", content: "final reply" },
    ],
  };
  const result = compactCachedContext(body, {
    maxTokens: 300,
    fits: (candidate) => estimateTokens(candidate.messages) < 2_000,
  });
  assert.equal(result.compressed, false);
  assert.strictEqual(result.body, body);
});

test("#9: long cacheable histories need logarithmically many complete fit checks", () => {
  const body = {
    messages: [
      { role: "system", content: "Keep instructions" },
      ...Array.from({ length: 4_000 }, (_, i) => ({ role: "user", content: `turn ${i}` })),
    ],
  };
  let checks = 0;
  const result = compactCachedContext(body, {
    maxTokens: 10_000,
    fits: (candidate) => {
      checks++;
      return candidate.messages.length <= 500;
    },
  });
  assert.equal(result.compressed, true);
  assert.ok(checks < 30, `${checks} full-body scans for 4,000 messages`);
  assert.deepEqual(result.body.messages[0], body.messages[0]);
  assert.deepEqual(result.body.messages.at(-1), body.messages.at(-1));
});

test("#9: a prefix covering every message fails closed instead of throwing", () => {
  const body = {
    system: [{ type: "text", text: "S".repeat(40_000) }],
    tools: [{ name: "inspect", description: "read-only tool" }],
    messages: [{ role: "user", content: "only request" }],
  };
  const result = compactCachedContext(body, {
    maxTokens: 4_000,
    fits: () => false,
  });
  assert.equal(result.compressed, false);
  assert.strictEqual(result.body, body);
});

test("#9: oversized mandatory user/tool tail fails closed rather than mutilating it", () => {
  const body = bodyWithTail([{ role: "user", content: "Z".repeat(100_000) }]);
  const result = compactCachedContext(body, opts);
  assert.equal(result.compressed, false);
  assert.strictEqual(result.body, body);
});
