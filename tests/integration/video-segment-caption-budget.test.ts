import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  VIDEO_BRIDGE_PROMOTION_FIXTURE_RECIPES,
  buildFfmpegArgsFromRecipe,
} from "../../src/lib/guardrails/videoBridgePromotionFixtures.ts";
import { describeVideoPart } from "../../src/lib/guardrails/videoBridgeHelpers.ts";
import { extractVideoFramesFromBytes } from "../../src/lib/guardrails/videoBridgeRuntime.ts";

test(
  "segment-aware captions retain short early events within the final eight-frame budget",
  { skip: process.env.RUN_VIDEO_BRIDGE_FFMPEG !== "1" },
  async () => {
    const directory = await mkdtemp(join(tmpdir(), "video-segment-caption-budget-"));
    try {
      const recipe = VIDEO_BRIDGE_PROMOTION_FIXTURE_RECIPES.find(
        (entry) => entry.caseKind === "rapid_cuts"
      );
      assert.ok(recipe);
      const file = join(directory, "rapid-cuts.mp4");
      execFileSync(
        "ffmpeg",
        [
          "-hide_banner",
          "-loglevel",
          "error",
          "-nostdin",
          "-n",
          "-filter_complex_threads",
          "1",
          ...buildFfmpegArgsFromRecipe(recipe),
          "-threads",
          "1",
          file,
        ],
        { timeout: 30_000, stdio: "ignore" }
      );
      const bytes = await readFile(file);
      const captioned: number[] = [];
      const result = await describeVideoPart(
        {
          container: "messages",
          messageIndex: 0,
          partIndex: 0,
          shape: "input_video",
          ref: `data:video/mp4;base64,${bytes.toString("base64")}`,
        },
        { frameCount: 8, samplingPolicy: "segment_aware", timeoutMs: 30_000 },
        async (_frame, timestamp) => {
          captioned.push(timestamp);
          return `Observed frame at ${timestamp}`;
        },
        // The broker's real FFmpeg backend; only external model captioning is replaced.
        {
          extractFrames: (input, options) =>
            extractVideoFramesFromBytes(input, { ...options, maxDurationSeconds: 600 }),
        }
      );
      // Independent recipe oracle: black/white/black/white at half-second intervals,
      // followed by eight seconds of moving test pattern. Each short event must survive
      // all the way to captioning, not just be present before the post-dedup cap.
      for (const [start, end] of [
        [0, 0.5],
        [0.5, 1],
        [1, 1.5],
        [1.5, 2],
      ]) {
        assert.ok(
          captioned.some((time) => time >= start && time < end),
          `Missing short event [${start}, ${end}) from captions: ${captioned.join(", ")}`
        );
      }
      assert.ok(
        captioned.some((time) => time >= 6),
        "tail coverage must also survive"
      );
      assert.ok(captioned.length <= 8, "the final caption budget is not enlarged");
      assert.equal(result.sampling?.policyEffective, "segment_aware");
      assert.equal(result.framesUsed, captioned.length);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }
);
