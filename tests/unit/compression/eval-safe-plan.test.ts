import assert from "node:assert/strict";
import test from "node:test";
import { runEval } from "../../../open-sse/services/compression/eval/runner.ts";
import { CONTROL_PAIR } from "../../../open-sse/services/compression/eval/judge.ts";
import {
  DEFAULT_COMPRESSION_CONFIG,
  type CompressionConfig,
} from "../../../open-sse/services/compression/types.ts";
import type { ModelClient } from "../../../open-sse/services/compression/eval/types.ts";

test("eval uses the scoped safe plan, not the stored lossy pipeline", async () => {
  const prompts: string[] = [];
  const client: ModelClient = {
    async complete(model, messages) {
      const user = messages.find((message) => message.role === "user")!.content;
      if (model === "answer") {
        prompts.push(user);
        return { text: "synthetic answer", usdCost: 0.01 };
      }
      return {
        text: user.includes(CONTROL_PAIR.degraded)
          ? "VERDICT: MATERIALLY_DIFFERS"
          : "VERDICT: SAME",
        usdCost: 0.01,
      };
    },
  };
  const config: CompressionConfig = {
    ...DEFAULT_COMPRESSION_CONFIG,
    enabled: true,
    defaultMode: "lite",
    enginesExplicit: false,
    autoTriggerTokens: 0,
    stackedPipeline: [{ engine: "caveman", intensity: "full" }],
  };
  const before = structuredClone(config);
  const result = await runEval({
    client,
    config,
    corpus: [
      {
        id: "safe-plan-251",
        kind: "prose",
        context:
          "Please note that it is very important to understand the following information. " +
          "In order to complete this task, you should make sure that all the details are preserved.",
        question: "What information is important?",
      },
    ],
    comboId: null,
    combos: {},
    answerModel: "answer",
    judgeModel: "judge",
    provider: "test",
    costCapUsd: 0,
  });
  assert.equal(result.aborted, false);
  assert.equal(result.report?.overall.casesScored, 1);
  assert.equal(prompts.length, 2);
  assert.equal(prompts[1], prompts[0], "safe Lite must not run the stored Caveman step");
  assert.deepEqual(config, before);
});
