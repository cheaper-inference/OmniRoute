import assert from "node:assert/strict";
import test from "node:test";
import { createComboRoutingHarness } from "../_comboRoutingHarness.ts";

// Keep a late background dispatch off the network even after harness cleanup.
globalThis.fetch = async () => {
  throw new Error("Unexpected network request outside the handoff budget fixture");
};

const h = await createComboRoutingHarness("combo-handoff-metered-budget");
const costRules = await import("../../../src/domain/costRules.ts");
const { getHandoff } = await import("../../../src/lib/db/contextHandoffs.ts");
const { flushProxyLogsSync } = await import("../../../src/lib/proxyLogger.ts");
const { scopeHandoffSessionId } =
  await import("../../../open-sse/services/combo/handoffSessionScope.ts");

test.beforeEach(async () => {
  await h.resetStorage();
  costRules.resetCostData();
});

test.afterEach(() => {
  flushProxyLogsSync();
});

test.after(async () => {
  costRules.resetCostData();
  await h.cleanup();
});

const SUMMARY_MODEL = "gpt-4o-mini";
const SUMMARY = "The user asked to continue after changing models.";

for (const { name, spent } of [
  { name: "when the allowance is spent, blocks metered summarization", spent: true },
  { name: "with allowance remaining, charges the metered summary to the caller", spent: false },
]) {
  test(`universal handoff ${name}`, async () => {
    const comboName = spent ? "handoff-budget-spent" : "handoff-budget-available";
    const session = `${comboName}-session`;
    const key = await h.seedApiKey({ name: comboName });
    costRules.setBudget(key.id, { dailyLimitUsd: 10, resetInterval: "daily" });
    if (spent) costRules.recordCost(key.id, 25);
    assert.equal(costRules.checkBudget(key.id).allowed, !spent);
    const startingCost = costRules.getCostSummary(key.id).totalCostPeriod;

    await h.seedConnection("claude");
    await h.seedConnection("openai");
    await h.combosDb.createCombo({
      name: comboName,
      // The deck uses each model once before repeating, guaranteeing a switch on turn two.
      strategy: "strict-random",
      config: { maxRetries: 0, retryDelayMs: 0 },
      models: ["claude/claude-sonnet-4-6", "claude/claude-haiku-4-5-20251001"],
      universal_handoff: { enabled: true, handoffModel: `openai/${SUMMARY_MODEL}` },
    });
    h.installRecordingFetch((call) => {
      // OpenAI is configured only as the summarizer and cannot serve either foreground turn.
      if (call.provider === "openai")
        return h.buildOpenAIResponse(JSON.stringify({ summary: SUMMARY }));
    });

    for (const content of ["Start the task.", "Continue the task we started."]) {
      const response = await h.handleChat(
        h.buildRequest({
          authKey: key.key,
          headers: { "x-session-id": session },
          body: { model: comboName, stream: false, messages: [{ role: "user", content }] },
        })
      );
      assert.equal(response.status, 200, "the flat-rate model must still serve the turn");
      await response.json();
    }
    const foreground = h.calls.filter((call) => call.provider === "claude");
    assert.equal(foreground.length, 2);
    assert.deepEqual(
      new Set(foreground.map((call) => call.model)),
      new Set(["claude-sonnet-4-6", "claude-haiku-4-5-20251001"]),
      "the two successful turns must use different Claude models"
    );

    // A spent allowance must never produce the POST, so 2 s of silence is the proof; with
    // allowance the POST must arrive, and a loaded runner gets a generous ceiling to deliver it.
    const summaryWaitMs = spent ? 2_000 : 10_000;
    const summaryCall = await h.waitFor(
      () => h.calls.find((call) => call.provider === "openai"),
      summaryWaitMs
    );
    const scopedSession = scopeHandoffSessionId(`ext:${session}`, key.id)!;
    const handoff = summaryCall
      ? await h.waitFor(() => getHandoff(scopedSession, comboName), 10_000)
      : null;
    const finalCost = costRules.getCostSummary(key.id).totalCostPeriod;

    if (spent) {
      assert.deepEqual(
        h.providersSeen(),
        ["claude", "claude"],
        "spent budgets must block the summary POST"
      );
      assert.equal(finalCost, startingCost);
    } else {
      assert.deepEqual(h.providersSeen(), ["claude", "claude", "openai"]);
      assert.equal(summaryCall?.model, SUMMARY_MODEL);
      assert.equal(handoff?.summary, SUMMARY);
      assert.ok(
        finalCost > startingCost,
        "metered summary usage must draw from the original key's allowance"
      );
    }
  });
}
