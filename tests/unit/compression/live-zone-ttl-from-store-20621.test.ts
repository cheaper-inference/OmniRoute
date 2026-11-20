// Regression guard for #20621: the live-zone TTL must start when the compressed entry
// is stored, not when the request arrived. With a 1-minute TTL and a 50 s compression,
// an entry stamped from request arrival expired 10 s after it was written, so a
// follow-up turn 20 s later missed the cache and recompressed the whole history.
import { afterEach, beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  applyLiveZoneCompression,
  resetLiveZoneCache,
} from "../../../open-sse/services/compression/liveZone.ts";
import type { CompressionResult } from "../../../open-sse/services/compression/types.ts";

const realDateNow = Date.now;
let clock = 0;

beforeEach(() => {
  resetLiveZoneCache();
  clock = realDateNow();
  Date.now = () => clock;
});

afterEach(() => {
  Date.now = realDateNow;
  resetLiveZoneCache();
});

function compressorTaking(durationMs: number, calls: Array<Record<string, unknown>>) {
  return async (body: Record<string, unknown>): Promise<CompressionResult> => {
    calls.push(structuredClone(body));
    clock += durationMs;
    const items = body.messages as Array<Record<string, unknown>>;
    return {
      body: {
        ...body,
        messages: items.map((item) =>
          item.role === "tool" ? { ...item, content: `compressed:${String(item.content)}` } : item
        ),
      },
      compressed: true,
      stats: {
        originalTokens: 100,
        compressedTokens: 50,
        savingsPercent: 50,
        techniquesUsed: ["test"],
        mode: "rtk",
        timestamp: clock,
      },
    };
  };
}

const options = {
  principalId: "key-1",
  sessionId: "session-20621",
  variant: { mode: "rtk", config: {} },
  ttlMinutes: 1,
};

const firstTurn = {
  messages: [
    { role: "system", content: "stable" },
    { role: "user", content: "run tests" },
    { role: "tool", content: "100 noisy lines" },
  ],
};

const secondTurn = {
  messages: [
    ...firstTurn.messages,
    { role: "assistant", content: "Inspect the newest result" },
    { role: "tool", content: "new observation" },
  ],
};

describe("live-zone TTL (#20621)", () => {
  it("counts the TTL from when a slow compression finished", async () => {
    const calls: Array<Record<string, unknown>> = [];
    await applyLiveZoneCompression(firstTurn, options, compressorTaking(50_000, calls));

    clock += 20_000; // 70 s after the first request arrived, 20 s after the entry was stored
    const second = await applyLiveZoneCompression(secondTurn, options, compressorTaking(0, calls));

    assert.equal(second.stats?.liveZone?.cacheHit, true);
    assert.deepEqual(calls[1].messages, secondTurn.messages.slice(3));
  });

  it("still expires an entry once the TTL has passed since it was stored", async () => {
    const calls: Array<Record<string, unknown>> = [];
    await applyLiveZoneCompression(firstTurn, options, compressorTaking(50_000, calls));

    clock += 61_000;
    const second = await applyLiveZoneCompression(secondTurn, options, compressorTaking(0, calls));

    assert.notEqual(second.stats?.liveZone?.cacheHit, true);
    assert.deepEqual(calls[1].messages, secondTurn.messages);
  });
});
