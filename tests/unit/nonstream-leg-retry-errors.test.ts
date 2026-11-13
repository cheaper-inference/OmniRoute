import test from "node:test";
import assert from "node:assert/strict";
import { runNonStreamingProviderLeg } from "../../open-sse/handlers/chatCore/nonStreamingProviderLeg.ts";
import { baseInput, makeExecutorResult } from "./_helpers/nonStreamingProviderLegFixtures.ts";

function clinepass(envelope: unknown[], onSend?: (n: number) => void) {
  let sends = 0;
  return {
    sends: () => sends,
    run: () =>
      runNonStreamingProviderLeg(
        baseInput({
          provider: "clinepass",
          sleep: async () => {},
          executeProviderRequest: async () => {
            sends++;
            onSend?.(sends);
            return makeExecutorResult(envelope[Math.min(sends, envelope.length) - 1]);
          },
        })
      ),
  };
}

test("a ClinePass validation error that mentions 'empty' is not retried and keeps its status", async () => {
  const leg = clinepass([
    { success: false, statusCode: 400, error: "messages array must not be empty" },
  ]);
  const outcome = await leg.run();
  assert.equal(leg.sends(), 1);
  assert.equal(outcome.kind, "error");
  if (outcome.kind === "error") assert.equal(outcome.result.status, 400);
});

test("a ClinePass rate-limit envelope keeps its 429 status", async () => {
  const leg = clinepass([{ success: false, statusCode: 429, error: "rate limited" }]);
  const outcome = await leg.run();
  assert.equal(outcome.kind, "error");
  if (outcome.kind === "error") assert.equal(outcome.result.status, 429);
});

test("an empty-content envelope is still retried once", async () => {
  const leg = clinepass([
    { success: false, error: "empty content" },
    {
      success: true,
      data: {
        id: "x",
        choices: [{ message: { role: "assistant", content: "ok" }, finish_reason: "stop" }],
      },
    },
  ]);
  const outcome = await leg.run();
  assert.equal(leg.sends(), 2);
  assert.equal(outcome.kind, "ok");
});

test("a fence rejection during the ClinePass retry send is rethrown, not turned into a 502", async () => {
  const fence = Object.assign(new Error("fence"), { code: "MUSE_OWNERSHIP_REJECTED" });
  const leg = clinepass([{ success: false, error: "empty content" }], (n) => {
    if (n === 2) throw fence;
  });
  await assert.rejects(leg.run(), (error: unknown) => error === fence);
});

test("a client abort during a ClinePass retry send is rethrown, not turned into a 502", async () => {
  const abort = Object.assign(new Error("client left"), { name: "AbortError" });
  const leg = clinepass([{ success: false, error: "empty content" }], (n) => {
    if (n === 2) throw abort;
  });
  await assert.rejects(leg.run(), (error: unknown) => error === abort);
});
