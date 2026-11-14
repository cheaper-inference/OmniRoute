import test from "node:test";
import assert from "node:assert/strict";
import { createTempDataDir } from "../../_setup/tempDataDir.ts";

process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { cleanup } = createTempDataDir("flat-capacity-followup-");
const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const { createProviderConnection } = await import("../../../src/lib/db/providers.ts");
const sem = await import("../../../open-sse/services/accountSemaphore.ts");
const pause = (ms = 5) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const log = { info() {}, warn() {}, debug() {}, error() {} };
let sequence = 0;

async function account(provider = "openai") {
  return String(
    (
      await createProviderConnection({
        provider,
        authType: "apikey",
        apiKey: "synthetic-capacity-followup-" + ++sequence,
        isActive: true,
        maxConcurrent: 1,
      })
    ).id
  );
}
const model = (id: string, provider = "openai") => ({
  kind: "model",
  provider,
  model: provider === "openai" ? "gpt-4o-mini" : "claude-sonnet-4-5",
  connectionId: id,
});
async function until(check: () => boolean) {
  for (let i = 0; i < 200 && !check(); i++) await pause();
  assert.ok(check(), "the actual account queue must be reached");
}

test.afterEach(() => sem.resetAll());
test.after(async () => {
  const { dispatchEvent } = await import("../../../src/lib/webhookDispatcher.ts");
  await dispatchEvent("request.failed", {});
  await cleanup();
});

for (const outcome of [
  "quota",
  "quota-long-delay",
  "combo-deadline",
  "abort",
  "mixed-survivor",
] as const) {
  test(`post-park durable exhaustion preserves ${outcome} retry policy`, async () => {
    const id = await account();
    const survivor = outcome === "mixed-survivor" ? await account("anthropic") : null;
    const controller = new AbortController();
    const held = await sem.acquire("openai:" + id, { maxConcurrency: 1 });
    const heldSurvivor = survivor
      ? await sem.acquire("anthropic:" + survivor, { maxConcurrency: 1 })
      : null;
    const queueBudgetMs = outcome === "combo-deadline" ? 80 : 200;
    const comboTimeoutMs = outcome === "combo-deadline" ? 300 : 2000;
    let calls = 0;
    let retries = 0;
    const messages: string[] = [];
    let abortTimer: ReturnType<typeof setTimeout> | undefined;
    const started = Date.now();
    const pending = handleComboChat({
      body: { stream: false, messages: [{ role: "user", content: "post-park quota" }] },
      combo: {
        name: "post-park-durable-" + ++sequence,
        strategy: "priority",
        models: [model(id), ...(survivor ? [model(survivor, "anthropic")] : [])],
        config: {
          maxRetries: 0,
          maxSetRetries: 1,
          setRetryDelayMs: outcome === "quota" ? 25 : outcome === "quota-long-delay" ? 300 : 1000,
          comboTimeoutMs,
          targetTimeoutMs: 0,
          comboCooldownWaitEnabled: false,
        },
      },
      settings: {
        resilienceSettings: {
          requestQueue: { maxWaitMs: queueBudgetMs },
          providerCooldown: { enabled: false },
        },
      },
      signal: controller.signal,
      isModelAvailable: async () => true,
      log: {
        ...log,
        info(_tag: string, message: string) {
          messages.push(message);
          if (!message.includes("retrying set")) return;
          retries++;
          if (outcome === "abort") abortTimer = setTimeout(() => controller.abort(), 10);
        },
      },
      handleSingleModel: async (_body, _name, target) => {
        assert.ok(target && "connectionId" in target);
        assert.equal(target.connectionId, id, "the busy survivor cannot dispatch");
        calls++;
        const release = await sem.acquire("openai:" + id, { maxConcurrency: 1 });
        sem.markAccountCapacityExecutionStarted();
        release();
        return Response.json(
          { error: { message: "insufficient_quota", code: "insufficient_quota" } },
          { status: 429 }
        );
      },
    });
    try {
      await until(() => sem.getStats()["openai:" + id]?.queued === 1);
      if (survivor) await until(() => sem.getStats()["anthropic:" + survivor]?.queued === 1);
      const parkedAt = Date.now();
      if (survivor) await pause(100);
      held();
      const response = await pending;
      const body = await response.clone().json();
      assert.equal(retries, 1, "the authorized set retry must be reached");
      assert.equal(calls, 1, "durable exhaustion must prevent another upstream attempt");
      if (outcome === "quota" || outcome === "quota-long-delay") {
        assert.equal(response.status, 429);
        assert.notEqual(response.headers.get("retry-after"), "1");
        assert.match(body.error.message, /quota/i);
        assert.notEqual(body.error.code, "COMBO_CAPACITY_TIMEOUT");
        assert.ok(
          messages.some((message) => message.includes("marked exhausted this request")),
          "the ordinary durable exhaustion gate must still record its skip"
        );
      } else if (outcome === "abort") {
        assert.equal(response.status, 499);
      } else {
        assert.equal(response.status, outcome === "combo-deadline" ? 504 : 503);
        assert.equal(
          body.error.code,
          outcome === "combo-deadline" ? "COMBO_TIMEOUT" : "service_unavailable"
        );
        assert.ok(Date.now() - started < 800, "the retry must retain its original deadline");
        if (outcome === "mixed-survivor") {
          assert.equal(body.diagnostics.terminalReason, "capacity_wait");
          assert.ok(
            Date.now() - parkedAt < queueBudgetMs + 70,
            "a surviving account must keep the pre-quota deadline rather than receive a fresh budget"
          );
        }
        if (outcome === "combo-deadline")
          assert.ok(Date.now() - started >= 250, "clearing capacity must retain the combo bound");
      }
      await response.text();
    } finally {
      clearTimeout(abortTimer);
      controller.abort();
      held();
      heldSurvivor?.();
      await pending;
    }
  });
}
