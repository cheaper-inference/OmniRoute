import test from "node:test";
import assert from "node:assert/strict";

import {
  parseReasoningEffortEnum,
  __test_resetLearnedReasoningEffortCaps,
} from "../../open-sse/services/learnedReasoningEffortCaps.ts";
import { applyReasoningEffortRecovery } from "../../open-sse/executors/base/reasoningEffortRecovery.ts";
import { sanitizeReasoningEffortForProvider } from "../../open-sse/executors/base/reasoningEffort.ts";

const COHERE_422 = {
  error: {
    message:
      "unprocessable entity: reasoning_effort 'medium' and 'low' are not supported. Use 'high' instead",
    type: "upstream_error",
    code: 422,
  },
};

test.beforeEach(() => {
  delete process.env.OMNIROUTE_REASONING_EFFORT_PROBE_PROVIDERS;
  __test_resetLearnedReasoningEffortCaps();
});

test("#20363 parser reads Cohere's \"Use 'high' instead\" wording", () => {
  assert.deepEqual(parseReasoningEffortEnum(JSON.stringify(COHERE_422)), ["high"]);
});

test("#20363 parser keeps existing wordings", () => {
  assert.deepEqual(parseReasoningEffortEnum("Supported values are: low, medium, high."), [
    "low",
    "medium",
    "high",
  ]);
});

test("#20363 reactive recovery retries a Cohere 422 with reasoning_effort high", async () => {
  const sent: Array<{ reasoning_effort?: string }> = [];
  const body = { model: "command-a-plus-05-2026", reasoning_effort: "medium", messages: [] };
  const res = await applyReasoningEffortRecovery({
    response: new Response(JSON.stringify(COHERE_422), { status: 422 }),
    url: "https://api.cohere.com/compatibility/v1/chat/completions",
    provider: "cohere",
    model: "command-a-plus-05-2026",
    body,
    fetchOptions: { method: "POST", body: JSON.stringify(body) },
    fetchFn: async (_u: unknown, o: { body?: unknown }) => {
      sent.push(JSON.parse(String(o.body)));
      return new Response("{}", { status: 200 });
    },
  } as unknown as Parameters<typeof applyReasoningEffortRecovery>[0]);
  assert.equal(res.retried, true);
  assert.equal(sent[0]?.reasoning_effort, "high");
});

test("#20363 proactive sanitize clamps every tier to high for cohere", () => {
  for (const eff of ["none", "minimal", "low", "medium", "high", "xhigh", "max"]) {
    const out = sanitizeReasoningEffortForProvider(
      { model: "command-a-plus-05-2026", reasoning_effort: eff },
      "cohere",
      "command-a-plus-05-2026"
    ) as { reasoning_effort?: string };
    assert.equal(out.reasoning_effort, "high", `effort ${eff}`);
  }
});

test("#20363 other providers are untouched", () => {
  const out = sanitizeReasoningEffortForProvider(
    { model: "gpt-5", reasoning_effort: "low" },
    "openai",
    "gpt-5"
  ) as { reasoning_effort?: string };
  assert.equal(out.reasoning_effort, "low");
});
