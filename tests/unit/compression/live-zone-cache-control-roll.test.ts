/**
 * Regression: the live zone must survive a client that MOVES its rolling `cache_control`
 * breakpoint between requests — exactly what Claude Code does (it keeps two `system` markers and
 * one message marker that advances by one turn per request; verified in real Claude Code 2.1
 * transcripts: `messages.N.content.0` with N growing every request).
 *
 * Before the fix, prefix identity hashed the raw items including the marker, so every request
 * missed → the whole history was re-compressed → a different prefix was sent upstream → a
 * guaranteed prompt-cache miss on every turn (the exact churn the live zone exists to prevent).
 */
import { beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  applyLiveZoneCompression,
  resetLiveZoneCache,
} from "../../../open-sse/services/compression/liveZone.ts";
import type { CompressionResult } from "../../../open-sse/services/compression/types.ts";

interface Block {
  type: string;
  text?: string;
  content?: string;
  tool_use_id?: string;
  cache_control?: { type: string };
  [key: string]: unknown;
}

function result(body: Record<string, unknown>, compressed = true): CompressionResult {
  return {
    body,
    compressed,
    stats: {
      originalTokens: 100,
      compressedTokens: 50,
      savingsPercent: 50,
      techniquesUsed: ["test"],
      mode: "rtk",
      timestamp: Date.now(),
    },
  };
}

/** Compress tool results older than the last assistant message, like rtk/lite do. */
function completedToolCompressor(calls: Array<Record<string, unknown>>) {
  return async (body: Record<string, unknown>): Promise<CompressionResult> => {
    calls.push(structuredClone(body));
    const items = body.messages as Array<Record<string, unknown>>;
    const lastAssistant = items.findLastIndex((item) => item.role === "assistant");
    return result({
      ...body,
      messages: items.map((item, index) =>
        item.role === "user" &&
        Array.isArray(item.content) &&
        (item.content as Block[]).some((block) => block.type === "tool_result") &&
        index < lastAssistant
          ? {
              ...item,
              content: (item.content as Block[]).map((block) =>
                block.type === "tool_result"
                  ? { ...block, content: `compressed:${String(block.content)}` }
                  : block
              ),
            }
          : item
      ),
    });
  };
}

const options = {
  principalId: "key-1",
  sessionId: "claude-code-session",
  variant: { mode: "stacked", config: {} },
};

const toolResult = (id: string, text: string, marker: boolean) => ({
  role: "user",
  content: [
    {
      type: "tool_result",
      tool_use_id: id,
      content: text,
      ...(marker ? { cache_control: { type: "ephemeral" } } : {}),
    },
  ],
});
const toolUse = (id: string) => ({
  role: "assistant",
  content: [{ type: "tool_use", id, name: "Bash", input: {} }],
});
const userText = (text: string, marker: boolean) => ({
  role: "user",
  content: [{ type: "text", text, ...(marker ? { cache_control: { type: "ephemeral" } } : {}) }],
});

function markersOf(body: Record<string, unknown>): number[] {
  return (body.messages as Array<Record<string, unknown>>).flatMap((message, index) =>
    Array.isArray(message.content) &&
    (message.content as Block[]).some((block) => block.cache_control !== undefined) &&
    /tool_result|text/.test(String((message.content as Block[])[0]?.type))
      ? [index]
      : []
  );
}

beforeEach(() => resetLiveZoneCache());

describe("live zone across a moving cache_control breakpoint", () => {
  it("hits when only the marker position moves, and adopts the current markers", async () => {
    const calls: Array<Record<string, unknown>> = [];
    const compress = completedToolCompressor(calls);

    // Turn 1 — Claude Code parks the rolling marker on the first user turn.
    const first = {
      messages: [
        userText("run the suite", true),
        toolUse("t1"),
        toolResult("t1", "100 noisy lines", false),
      ],
    };
    const firstResult = await applyLiveZoneCompression(first, options, compress);
    const frozenFirst = structuredClone(firstResult.body.messages as unknown[]);

    // Turn 2 — the marker has moved two messages down; nothing else in the prefix changed.
    const second = {
      messages: [
        userText("run the suite", false),
        toolUse("t1"),
        toolResult("t1", "100 noisy lines", true),
        toolUse("t2"),
        toolResult("t2", "50 more noisy lines", false),
        toolUse("t3"),
        toolResult("t3", "latest observation", false),
      ],
    };
    const secondResult = await applyLiveZoneCompression(second, options, compress);
    const secondMessages = secondResult.body.messages as Array<Record<string, unknown>>;

    assert.equal(
      secondResult.stats?.liveZone?.cacheHit,
      true,
      "a moved cache_control marker must not count as a prefix change"
    );
    assert.equal(calls.length, 2, "only the live suffix should reach the compressor");

    // Stale breakpoint dropped: message 0 no longer carries a marker in this request.
    const firstContent = secondMessages[0].content as Block[];
    assert.equal(firstContent[0].cache_control, undefined);
    // ...and the moved breakpoint is honoured on the frozen item.
    const frozenContent = secondMessages[2].content as Block[];
    assert.deepEqual(frozenContent[0].cache_control, { type: "ephemeral" });
    // The prefix still carries the exact bytes produced on turn 1 apart from the markers.
    const strip = (list: unknown[]) =>
      JSON.stringify(list, (key, value) => (key === "cache_control" ? undefined : value));
    assert.equal(
      strip(secondMessages.slice(0, 3)),
      strip(frozenFirst),
      "the provider-facing prefix must remain byte-stable"
    );
    assert.deepEqual(markersOf(secondResult.body), [2], "no resurrected breakpoints");
    // Appended, now-completed tool output is still compressed on a hit.
    const liveContent = secondMessages[4].content as Block[];
    assert.equal(liveContent[0].content, "compressed:50 more noisy lines");
  });

  it("still fails open when the prefix CONTENT changes, marker movement aside", async () => {
    const calls: Array<Record<string, unknown>> = [];
    const compress = completedToolCompressor(calls);
    await applyLiveZoneCompression(
      {
        messages: [
          userText("run the suite", true),
          toolUse("t1"),
          toolResult("t1", "100 lines", false),
        ],
      },
      options,
      compress
    );
    const edited = await applyLiveZoneCompression(
      {
        messages: [
          userText("run the FULL suite", false), // content changed, not just the marker
          toolUse("t1"),
          toolResult("t1", "100 lines", true),
          toolUse("t2"),
          toolResult("t2", "new output", false),
        ],
      },
      options,
      compress
    );

    assert.notEqual(edited.stats?.liveZone?.cacheHit, true);
    assert.equal(calls.at(-1)?.messages && (calls.at(-1)?.messages as unknown[]).length, 5);
  });
});
