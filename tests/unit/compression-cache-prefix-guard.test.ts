/**
 * Unit tests for open-sse/services/compression/cachePrefixGuard.ts (homelab#297).
 *
 * Compression must never rewrite messages the provider has (or will) cache: a single changed byte
 * in the cached prefix turns a cheap cache read into a full cache write.
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  detectCachingContext,
  type CachingContext,
} from "../../open-sse/services/compression/cachingAware.ts";
import {
  guardCachedPrefixCompression,
  resolveProtectedMessagePrefix,
} from "../../open-sse/services/compression/cachePrefixGuard.ts";
import { applyCompressionAsync } from "../../open-sse/services/compression/strategySelector.ts";
import {
  DEFAULT_COMPRESSION_CONFIG,
  type CompressionPipelineStep,
  type CompressionResult,
  type CompressionStats,
} from "../../open-sse/services/compression/types.ts";

const EPHEMERAL = { type: "ephemeral" };

function claudeCtx(body: Record<string, unknown>): CachingContext {
  return detectCachingContext(body, { provider: "claude", targetFormat: "claude" });
}

function openaiCtx(body: Record<string, unknown>): CachingContext {
  return detectCachingContext(body, { provider: "openai", targetFormat: "openai" });
}

function nonCachingCtx(body: Record<string, unknown>): CachingContext {
  return detectCachingContext(body, { provider: "groq", targetFormat: "openai" });
}

test("top-level cache_control protects every message", () => {
  const body = {
    cache_control: EPHEMERAL,
    messages: [
      { role: "user", content: "a" },
      { role: "assistant", content: "b" },
      { role: "user", content: "c" },
    ],
  };
  assert.equal(resolveProtectedMessagePrefix(body, claudeCtx(body)), 3);
});

test("message-level breakpoint on string-content wrapper protects through that message", () => {
  const body = {
    messages: [
      { role: "user", content: "a" },
      { role: "assistant", content: "b", cache_control: EPHEMERAL },
      { role: "user", content: "c" },
      { role: "assistant", content: "d" },
      { role: "user", content: "e" },
    ],
  };
  assert.equal(resolveProtectedMessagePrefix(body, claudeCtx(body)), 2);
});

test("breakpoint on a text content block protects through that message", () => {
  const body = {
    messages: [
      { role: "user", content: [{ type: "text", text: "a", cache_control: EPHEMERAL }] },
      { role: "assistant", content: "b" },
      { role: "user", content: "c" },
    ],
  };
  assert.equal(resolveProtectedMessagePrefix(body, claudeCtx(body)), 1);
});

test("breakpoint on a tool_result block protects through that message", () => {
  const body = {
    messages: [
      { role: "user", content: "a" },
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "t1", name: "read", input: {} }],
      },
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: "t1",
            content: "x".repeat(100),
            cache_control: EPHEMERAL,
          },
        ],
      },
      { role: "assistant", content: "d" },
      { role: "user", content: "e" },
    ],
  };
  assert.equal(resolveProtectedMessagePrefix(body, claudeCtx(body)), 3);
});

test("the LAST breakpoint wins when several messages carry one", () => {
  const body = {
    messages: [
      { role: "user", content: [{ type: "text", text: "a", cache_control: EPHEMERAL }] },
      { role: "assistant", content: "b" },
      { role: "user", content: [{ type: "text", text: "c", cache_control: EPHEMERAL }] },
      { role: "assistant", content: "d" },
      { role: "user", content: "e" },
    ],
  };
  assert.equal(resolveProtectedMessagePrefix(body, claudeCtx(body)), 3);
});

test("Claude target with no markers protects history before the current turn", () => {
  const body = {
    messages: [
      { role: "user", content: "a" },
      { role: "assistant", content: "b" },
      { role: "user", content: "c" },
      { role: "assistant", content: "d" },
      { role: "user", content: "e" },
    ],
  };
  assert.equal(resolveProtectedMessagePrefix(body, claudeCtx(body)), 4);
});

test("automatic-prefix chat provider with no markers protects history before the current turn", () => {
  const body = {
    messages: [
      { role: "user", content: "a" },
      { role: "assistant", content: "b" },
      { role: "tool", tool_call_id: "c1", content: "x".repeat(100) },
      { role: "user", content: "e" },
    ],
  };
  const ctx = openaiCtx(body);
  assert.equal(ctx.usesAutomaticPrefixCaching, true);
  assert.equal(resolveProtectedMessagePrefix(body, ctx), 2);
});

test("caching provider with no assistant message has nothing to protect", () => {
  const body = { messages: [{ role: "user", content: "a" }] };
  assert.equal(resolveProtectedMessagePrefix(body, claudeCtx(body)), 0);
});

test("non-caching provider protects nothing even with markers", () => {
  const body = {
    cache_control: EPHEMERAL,
    messages: [
      { role: "user", content: [{ type: "text", text: "a", cache_control: EPHEMERAL }] },
      { role: "assistant", content: "b" },
      { role: "user", content: "c" },
    ],
  };
  assert.equal(resolveProtectedMessagePrefix(body, nonCachingCtx(body)), 0);
});

test("bodies without a messages array (Responses input, Gemini contents) protect nothing", () => {
  const input = { input: [{ type: "message", role: "user", content: "hi" }] };
  const contents = { contents: [{ role: "user", parts: [{ text: "hi" }] }] };
  assert.equal(
    resolveProtectedMessagePrefix(
      input,
      detectCachingContext(input, { provider: "codex", targetFormat: "openai-responses" })
    ),
    0
  );
  assert.equal(resolveProtectedMessagePrefix(contents, claudeCtx(contents)), 0);
});

test("breakpoint index never exceeds the message count", () => {
  const body = {
    messages: [{ role: "user", content: [{ type: "text", text: "a", cache_control: EPHEMERAL }] }],
  };
  assert.equal(resolveProtectedMessagePrefix(body, claudeCtx(body)), 1);
});

// ---------------------------------------------------------------------------------------------
// guardCachedPrefixCompression: the wrapper that keeps engines away from the cached prefix.
// ---------------------------------------------------------------------------------------------

const LONG = "important tool output line\n".repeat(730); // ~19.7k chars, over lite's 2,000 cap

type Msg = Record<string, unknown>;

function toolUse(id: string): Msg {
  return { role: "assistant", content: [{ type: "tool_use", id, name: "Read", input: {} }] };
}

function toolResult(id: string, content: string, marker = false): Msg {
  return {
    role: "user",
    content: [
      {
        type: "tool_result",
        tool_use_id: id,
        content,
        ...(marker ? { cache_control: EPHEMERAL } : {}),
      },
    ],
  };
}

/** A conversation whose breakpoint sits on message 4 and whose tail ends in a user turn. */
function cachedConversation(): Msg[] {
  return [
    { role: "user", content: "start" },
    toolUse("t1"),
    toolResult("t1", LONG),
    toolUse("t2"),
    toolResult("t2", "short", true),
    toolUse("t3"),
    toolResult("t3", LONG),
    { role: "assistant", content: [{ type: "text", text: "thinking" }] },
    { role: "user", content: "current question" },
  ];
}

function pipelineOptions(
  provider: string,
  targetFormat: string,
  stackedPipeline: CompressionPipelineStep[] = [
    { engine: "session-dedup" },
    { engine: "lite", config: { compressToolResults: true } },
  ]
) {
  return {
    provider,
    targetFormat,
    model: "claude-opus-5",
    config: { ...DEFAULT_COMPRESSION_CONFIG, stackedPipeline },
  };
}

const runLite = (provider: string, targetFormat: string) => (input: Record<string, unknown>) =>
  applyCompressionAsync(input, "stacked", pipelineOptions(provider, targetFormat));

function fakeStats(): CompressionStats {
  return {
    originalTokens: 100,
    compressedTokens: 60,
    savingsPercent: 40,
    techniquesUsed: ["fake"],
    mode: "stacked",
    timestamp: 1,
  };
}

test("guard: only the tail reaches the engines, the prefix comes back by reference", async () => {
  const body = { model: "claude-opus-5", messages: cachedConversation() };
  const seen: unknown[][] = [];
  const guarded = guardCachedPrefixCompression(
    async (input) => {
      seen.push(input.messages as unknown[]);
      return runLite("claude", "claude")(input);
    },
    { cachingContext: claudeCtx(body), mode: "stacked" }
  );

  const result = await guarded(body);

  assert.equal(seen[0].length, 4, "engines see messages 5..8 only");
  const out = result.body.messages as Msg[];
  assert.equal(out.length, body.messages.length);
  for (let i = 0; i < 5; i++) assert.equal(out[i], body.messages[i], `message ${i} by reference`);
  assert.equal(result.compressed, true, "the uncached tool result after the breakpoint is lite's");
  const truncated = (out[6].content as Msg[])[0].content as string;
  assert.ok(truncated.length < LONG.length);
  assert.equal(result.stats?.cachePrefixGuard?.protectedMessages, 5);
  assert.equal(result.stats?.cachePrefixGuard?.skipReason, undefined);
});

test("guard: stats count the protected prefix so savings are relative to the whole request", async () => {
  const body = { model: "claude-opus-5", messages: cachedConversation() };
  const tailOnly = await runLite(
    "claude",
    "claude"
  )({
    ...body,
    messages: body.messages.slice(5),
  });
  const guarded = guardCachedPrefixCompression(runLite("claude", "claude"), {
    cachingContext: claudeCtx(body),
    mode: "stacked",
  });

  const result = await guarded(body);

  assert.ok(tailOnly.stats && result.stats);
  const prefixTokens = result.stats.originalTokens - tailOnly.stats.originalTokens;
  assert.ok(prefixTokens > 0, "the prefix's tokens are added");
  assert.equal(result.stats.compressedTokens - tailOnly.stats.compressedTokens, prefixTokens);
  assert.ok(result.stats.savingsPercent < tailOnly.stats.savingsPercent);
});

test("guard: when every message is protected the engines are not run", async () => {
  const body = { model: "claude-opus-5", cache_control: EPHEMERAL, messages: cachedConversation() };
  let calls = 0;
  const guarded = guardCachedPrefixCompression(
    async (input) => {
      calls += 1;
      return runLite("claude", "claude")(input);
    },
    { cachingContext: claudeCtx(body), mode: "stacked" }
  );

  const result = await guarded(body);

  assert.equal(calls, 0);
  assert.equal(result.body, body);
  assert.equal(result.compressed, false);
  assert.equal(result.stats, null);
});

test("guard: a non-caching provider is compressed exactly as before", async () => {
  const body = { model: "llama", messages: cachedConversation() };
  const direct = await runLite("groq", "openai")(body);
  const guarded = await guardCachedPrefixCompression(runLite("groq", "openai"), {
    cachingContext: nonCachingCtx(body),
    mode: "stacked",
  })(body);

  assert.equal(guarded.compressed, true);
  assert.deepEqual(guarded.body.messages, direct.body.messages);
  assert.equal(guarded.stats?.cachePrefixGuard, undefined);
  const early = ((guarded.body.messages as Msg[])[2].content as Msg[])[0].content as string;
  assert.ok(early.length < LONG.length, "old tool results are still truncated");
});

test("guard: a Responses input body is passed through untouched", async () => {
  const body = {
    model: "gpt-5",
    input: [{ type: "message", role: "user", content: "hi" }],
  };
  const ctx = detectCachingContext(body, { provider: "codex", targetFormat: "openai-responses" });
  const sentinel: CompressionResult = { body, compressed: false, stats: null };
  const received: Array<Record<string, unknown>> = [];
  const guarded = guardCachedPrefixCompression(
    async (input) => {
      received.push(input);
      return sentinel;
    },
    { cachingContext: ctx, mode: "stacked" }
  );

  assert.equal(await guarded(body), sentinel);
  assert.equal(received[0], body);
});

test("guard: discards the compressed tail when an engine drops a tool_use still referenced", async () => {
  const body = { model: "claude-opus-5", messages: cachedConversation() };
  const guarded = guardCachedPrefixCompression(
    async (input) => {
      const tail = input.messages as Msg[];
      // Engine bug: removes the assistant tool_use (t3) but keeps its tool_result.
      const broken = tail.filter((message) => JSON.stringify(message).indexOf('"id":"t3"') === -1);
      return { body: { ...input, messages: broken }, compressed: true, stats: fakeStats() };
    },
    { cachingContext: claudeCtx(body), mode: "stacked" }
  );

  const result = await guarded(body);

  assert.equal(result.body, body, "the original body, tail included, is sent");
  assert.equal(result.compressed, false);
  assert.equal(result.stats?.cachePrefixGuard?.skipReason, "tail-shape-invalid");
  assert.equal(result.stats?.cachePrefixGuard?.protectedMessages, 5);
  assert.equal(result.stats?.originalTokens, result.stats?.compressedTokens);
  assert.equal(result.stats?.savingsPercent, 0);
});

test("guard: discards the compressed tail when it stops alternating with the prefix", async () => {
  const body = { model: "claude-opus-5", messages: cachedConversation() };
  const guarded = guardCachedPrefixCompression(
    async (input) => ({
      // The prefix ends on a user message (index 4); dropping the tail's leading assistant
      // message leaves two user turns back to back.
      body: { ...input, messages: (input.messages as Msg[]).slice(1) },
      compressed: true,
      stats: null,
    }),
    { cachingContext: claudeCtx(body), mode: "stacked" }
  );

  const result = await guarded(body);

  assert.equal(result.body, body);
  assert.equal(result.stats?.cachePrefixGuard?.skipReason, "tail-shape-invalid");
});

test("guard: an engine emptying a non-empty tail is discarded", async () => {
  const body = { model: "claude-opus-5", messages: cachedConversation() };
  const guarded = guardCachedPrefixCompression(
    async (input) => ({ body: { ...input, messages: [] }, compressed: true, stats: null }),
    { cachingContext: claudeCtx(body), mode: "stacked" }
  );

  const result = await guarded(body);

  assert.equal(result.body, body);
  assert.equal(result.stats?.cachePrefixGuard?.skipReason, "tail-shape-invalid");
});

test("guard: a tool_result whose call lives in the protected prefix is valid", async () => {
  const messages = [
    { role: "user", content: "start" },
    toolUse("t1"),
    { role: "assistant", content: [{ type: "text", text: "cached", cache_control: EPHEMERAL }] },
    toolResult("t1", LONG),
    { role: "assistant", content: [{ type: "text", text: "thinking" }] },
    { role: "user", content: "current question" },
  ];
  const body = { model: "claude-opus-5", messages };
  const guarded = guardCachedPrefixCompression(runLite("claude", "claude"), {
    cachingContext: claudeCtx(body),
    mode: "stacked",
  });

  const result = await guarded(body);

  assert.equal(result.compressed, true);
  assert.equal(result.stats?.cachePrefixGuard?.skipReason, undefined);
});

test("guard: history that was already malformed is not blamed on compression", async () => {
  const messages = [
    { role: "user", content: "start" },
    { role: "assistant", content: [{ type: "text", text: "cached", cache_control: EPHEMERAL }] },
    toolResult("missing-call", LONG),
    { role: "assistant", content: [{ type: "text", text: "thinking" }] },
    { role: "user", content: "current question" },
  ];
  const body = { model: "claude-opus-5", messages };
  const guarded = guardCachedPrefixCompression(runLite("claude", "claude"), {
    cachingContext: claudeCtx(body),
    mode: "stacked",
  });

  const result = await guarded(body);

  assert.equal(result.compressed, true);
  assert.equal(result.stats?.cachePrefixGuard?.skipReason, undefined);
});

test("guard: an over-limit request is compressed in full and says so", async () => {
  const body = { model: "claude-opus-5", messages: cachedConversation() };
  const sizes: number[] = [];
  const guarded = guardCachedPrefixCompression(
    async (input) => {
      sizes.push((input.messages as unknown[]).length);
      return runLite("claude", "claude")(input);
    },
    { cachingContext: claudeCtx(body), mode: "stacked", overflowCeilingTokens: 1000 }
  );

  const result = await guarded(body);

  assert.deepEqual(sizes, [body.messages.length], "the engines see every message");
  assert.equal(result.compressed, true);
  assert.equal(result.stats?.cachePrefixGuard?.skipReason, "overflow-unprotected");
  assert.equal(result.stats?.cachePrefixGuard?.protectedMessages, 0);
  const early = ((result.body.messages as Msg[])[2].content as Msg[])[0].content as string;
  assert.ok(early.length < LONG.length, "protection is lifted when the request does not fit");
});

test("guard: a request under the limit keeps its prefix", async () => {
  const body = { model: "claude-opus-5", messages: cachedConversation() };
  const guarded = guardCachedPrefixCompression(runLite("claude", "claude"), {
    cachingContext: claudeCtx(body),
    mode: "stacked",
    overflowCeilingTokens: 1_000_000,
  });

  const result = await guarded(body);

  assert.equal((result.body.messages as Msg[])[2], body.messages[2]);
  assert.equal(result.stats?.cachePrefixGuard?.skipReason, undefined);
});

for (const engine of ["session-dedup", "lite", "caveman", "aggressive", "ultra", "rtk"] as const) {
  test(`guard invariant: ${engine} cannot change a protected message`, async () => {
    const duplicated = "same line repeated\n".repeat(200);
    const messages: Msg[] = [
      { role: "user", content: "please   read   this    file     carefully\n\n\n\nthanks" },
      toolUse("t1"),
      toolResult("t1", LONG),
      toolUse("t2"),
      toolResult("t2", duplicated, true),
      toolUse("t3"),
      toolResult("t3", duplicated),
      { role: "assistant", content: [{ type: "text", text: "thinking" }] },
      { role: "user", content: "current   question\n\n\n\nplease" },
    ];
    const before = JSON.stringify(messages.slice(0, 5));
    const body = { model: "claude-opus-5", messages };
    const guarded = guardCachedPrefixCompression(
      (input) =>
        applyCompressionAsync(
          input,
          "stacked",
          pipelineOptions("claude", "claude", [{ engine, config: { compressToolResults: true } }])
        ),
      { cachingContext: claudeCtx(body), mode: "stacked" }
    );

    const result = await guarded(body);

    const out = result.body.messages as Msg[];
    for (let i = 0; i < 5; i++) assert.equal(out[i], messages[i], `message ${i} by reference`);
    assert.equal(JSON.stringify(out.slice(0, 5)), before, "and by value");
  });
}

test("guard: a codex Responses input body compresses exactly as before", async () => {
  const body = {
    model: "gpt-5",
    input: [
      { type: "message", role: "user", content: [{ type: "input_text", text: "start" }] },
      { type: "function_call", call_id: "c1", name: "Read", arguments: "{}" },
      { type: "function_call_output", call_id: "c1", output: LONG },
      { type: "message", role: "assistant", content: [{ type: "output_text", text: "ok" }] },
      { type: "message", role: "user", content: [{ type: "input_text", text: "next" }] },
    ],
  };
  const ctx = detectCachingContext(body, { provider: "codex", targetFormat: "openai-responses" });
  const run = (input: Record<string, unknown>) =>
    applyCompressionAsync(input, "stacked", pipelineOptions("codex", "openai-responses"));

  const direct = await run(body);
  const guarded = await guardCachedPrefixCompression(run, { cachingContext: ctx, mode: "stacked" })(
    body
  );

  assert.deepEqual(guarded.body, direct.body);
  assert.equal(guarded.compressed, direct.compressed);
  assert.equal(guarded.stats?.cachePrefixGuard, undefined);
});
