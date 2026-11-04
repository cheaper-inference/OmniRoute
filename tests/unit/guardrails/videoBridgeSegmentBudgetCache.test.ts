import assert from "node:assert/strict";
import test from "node:test";

import { VideoBridgeGuardrail } from "../../../src/lib/guardrails/videoBridge.ts";
import type { BridgeCacheEntry } from "../../../src/lib/guardrails/modalityBridge/bridgeCache.ts";

test("segment-aware results reject the previous oversized candidate identity and reuse fresh results", async () => {
  const entries = new Map<string, BridgeCacheEntry>();
  let descriptions = 0;
  const bridge = new VideoBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeCacheEnabled: true,
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoFrameCount: 8,
        modalityBridgeVideoSamplingPolicy: "segment_aware",
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
        modalityBridgeVisionPrompt: "segment budget cache regression",
      }),
      getCapabilities: () => ({ supportsVideo: false }),
      selectVisionModel: async () => "openai/gpt-4o-mini",
      resultCache: {
        getEntry: (key) => entries.get(key),
        setEntry: (key, entry) => {
          entries.set(key, entry);
        },
        delete: (key) => {
          entries.delete(key);
        },
      },
      describePart: async () => {
        descriptions += 1;
        return {
          description: "[Video description: all four early events retained]",
          durationSeconds: 10,
          framesRequested: 8,
          framesExtracted: 8,
          framesUsed: 8,
        };
      },
    },
  });
  const payload = () => ({
    model: "example/text-only",
    messages: [
      {
        role: "user",
        content: [{ type: "input_video", video_url: "data:video/mp4;base64,U0VHTUVOVC1CVURHRVQ=" }],
      },
    ],
  });

  await bridge.preCall(payload(), {});
  await bridge.preCall(payload(), {});
  assert.equal(descriptions, 1, "a fresh segment-aware result must be reusable");
  assert.equal(entries.size, 1);
  const [key, entry] = [...entries][0];
  assert.equal(entry.metadata?.strategy, "segment_aware");
  assert.equal(entry.metadata?.dedupCandidateFrameCount, 8);

  // Even a cache backend returning the old metadata under the new key must not
  // resurrect results that may have lost a short event during uniform capping.
  entries.set(key, {
    ...entry,
    metadata: { ...entry.metadata, dedupCandidateFrameCount: 16 },
  });
  await bridge.preCall(payload(), {});
  assert.equal(descriptions, 2, "legacy segment-aware results must be recomputed");
  assert.equal(entries.get(key)?.metadata?.dedupCandidateFrameCount, 8);
  await bridge.preCall(payload(), {});
  assert.equal(descriptions, 2, "the recomputed result must be reusable");
});
