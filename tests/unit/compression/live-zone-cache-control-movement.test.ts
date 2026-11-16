import { beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  applyLiveZoneCompression,
  resetLiveZoneCache,
} from "../../../open-sse/services/compression/liveZone.ts";
import type { CompressionResult } from "../../../open-sse/services/compression/types.ts";

function result(body: Record<string, unknown>): CompressionResult {
  return {
    body,
    compressed: true,
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

/** Compresses completed tool_result blocks, the way a real engine compresses
 * completed history. `lastAssistant` splits frozen history from the live turn. */
function toolCompressor(calls: Array<Record<string, unknown>>) {
  return async (body: Record<string, unknown>): Promise<CompressionResult> => {
    calls.push(structuredClone(body));
    const items = body.messages as Array<Record<string, unknown>>;
    const lastAssistant = items.findLastIndex((item) => item.role === "assistant");
    return result({
      ...body,
      messages: items.map((item, index) => {
        if (!Array.isArray(item.content) || lastAssistant === -1 || index >= lastAssistant) {
          return item;
        }
        const content = (item.content as Array<Record<string, unknown>>).map((block) =>
          block.type === "tool_result" && typeof block.content === "string"
            ? { ...block, content: `compressed:${block.content}` }
            : block
        );
        return { ...item, content };
      }),
    });
  };
}

const options = {
  principalId: "key-1",
  sessionId: "session-cache-control",
  variant: { mode: "rtk", config: {} },
};

beforeEach(() => resetLiveZoneCache());

/** Claude Code shape: user, then repeating assistant(tool_use)/user(tool_result),
 * with the cache_control breakpoint on the newest tool_result content block. */
function claudeCodeBody(turns: number) {
  const messages: Array<Record<string, unknown>> = [
    { role: "user", content: [{ type: "text", text: "run the suite" }] },
  ];
  for (let i = 0; i < turns; i++) {
    messages.push({
      role: "assistant",
      content: [{ type: "tool_use", id: `toolu_${i}`, name: "Bash", input: { command: `step ${i}` } }],
    });
    messages.push({
      role: "user",
      content: [
        {
          type: "tool_result",
          tool_use_id: `toolu_${i}`,
          content: `big noisy output for step ${i}`,
          ...(i === turns - 1 ? { cache_control: { type: "ephemeral" } } : {}),
        },
      ],
    });
  }
  return { messages };
}

describe("live-zone with a moving cache_control breakpoint", () => {
  it("reuses the frozen prefix when cache_control moves onto an already sent item", async () => {
    const calls: Array<Record<string, unknown>> = [];
    const compress = toolCompressor(calls);

    const first = {
      messages: [
        { role: "user", content: "run the suite" },
        { role: "tool", content: "big noisy output" },
      ],
    };
    const firstResult = await applyLiveZoneCompression(first, options, compress);
    assert.equal(calls.length, 1, "the first turn must compress normally");
    const frozenBytes = JSON.stringify(firstResult.body.messages);

    const second = {
      messages: [
        { role: "user", content: "run the suite" },
        {
          role: "tool",
          content: "big noisy output",
          cache_control: { type: "ephemeral" },
        },
        { role: "user", content: "next question" },
      ],
    };
    const secondResult = await applyLiveZoneCompression(second, options, compress);

    assert.equal(
      JSON.stringify((secondResult.body.messages as unknown[]).slice(0, 2)),
      frozenBytes,
      "the frozen prefix must stay byte-identical when the marker moves"
    );
    assert.equal(secondResult.stats?.liveZone?.cacheHit, true);
    // A full recompress would hand the whole history to the engine again.
    assert.equal(calls.length, 1, "reuse must not recompress the request");
    assert.deepEqual(calls[0].messages, [
      { role: "user", content: "run the suite" },
      { role: "tool", content: "big noisy output" },
    ]);
  });

  it("keeps hitting when the marker sits on a nested content block, as Claude Code sends it", async () => {
    const calls: Array<Record<string, unknown>> = [];
    const compress = toolCompressor(calls);

    for (let turns = 1; turns <= 4; turns++) {
      const compressed = await applyLiveZoneCompression(claudeCodeBody(turns), options, compress);
      const hit = compressed.stats?.liveZone?.cacheHit === true;
      assert.equal(hit, turns > 1, `turn ${turns} must reuse`);
    }
    assert.equal(calls.length, 1, "only the first turn may reach the engine");

    // The frozen history must keep its compressed bytes as the marker advances.
    const before = JSON.stringify(
      ((await applyLiveZoneCompression(claudeCodeBody(4), options, compress)).body as {
        messages: unknown[];
      }).messages.slice(0, 7)
    );
    const after = JSON.stringify(
      ((await applyLiveZoneCompression(claudeCodeBody(5), options, compress)).body as {
        messages: unknown[];
      }).messages.slice(0, 7)
    );
    assert.equal(after, before, "frozen prefix must not be rewritten when the marker moves");
  });
});
