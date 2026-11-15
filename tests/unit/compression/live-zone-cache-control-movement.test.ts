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

function toolCompressor(calls: Array<Record<string, unknown>>) {
  return async (body: Record<string, unknown>): Promise<CompressionResult> => {
    calls.push(structuredClone(body));
    const items = body.messages as Array<Record<string, unknown>>;
    const lastAssistant = items.findLastIndex((item) => item.role === "assistant");
    return result({
      ...body,
      messages: items.map((item, index) =>
        item.role === "tool" && (lastAssistant === -1 || index < lastAssistant)
          ? { ...item, content: `compressed:${String(item.content)}` }
          : item
      ),
    });
  };
}

const options = {
  principalId: "key-1",
  sessionId: "session-cache-control",
  variant: { mode: "rtk", config: {} },
};

beforeEach(() => resetLiveZoneCache());

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
});
