/**
 * tests/unit/routing-otel-breaker.test.ts
 *
 * OTLP sink breaker (open-sse/services/routing/otel.ts): after 5 consecutive
 * export failures the sink stops calling the collector for 30 s, then sends
 * one probe. A dead collector costs one request per window, not one per flush.
 */
import test, { mock } from "node:test";
import assert from "node:assert/strict";
import { OtlpHttpsEventSink } from "../../open-sse/services/routing/otel.ts";

type Flushable = { flush(): Promise<void> };

function setup(responses: Array<"fail" | "ok">) {
  const originalFetch = global.fetch;
  let calls = 0;
  global.fetch = (async () => {
    const next = responses[Math.min(calls, responses.length - 1)];
    calls += 1;
    return { ok: next === "ok", status: next === "ok" ? 200 : 503 } as Response;
  }) as typeof fetch;
  const sink = new OtlpHttpsEventSink({
    endpoint: "http://collector:4318",
    maxBatchSize: 1,
    flushIntervalMs: 1_000_000,
  });
  const flush = async () => {
    sink.record({ ts: 1_700_000_000_000, provider: "p", model: "m" });
    await (sink as unknown as Flushable).flush();
  };
  return {
    sink,
    flush,
    calls: () => calls,
    restore() {
      sink.stop();
      global.fetch = originalFetch;
      mock.timers.reset();
    },
  };
}

test("breaker opens after 5 failures and later flushes make no collector call", async () => {
  mock.timers.enable({ apis: ["Date"], now: 0 });
  const t = setup(["fail"]);
  try {
    for (let i = 0; i < 5; i++) await t.flush();
    assert.equal(t.calls(), 5);
    for (let i = 0; i < 10; i++) await t.flush();
    assert.equal(t.calls(), 5, "an open breaker must not call the dead collector");
  } finally {
    t.restore();
  }
});

test("breaker sends one probe after 30 s and re-opens when the probe fails", async () => {
  mock.timers.enable({ apis: ["Date"], now: 0 });
  const t = setup(["fail"]);
  try {
    for (let i = 0; i < 5; i++) await t.flush();
    mock.timers.tick(30_000);
    await t.flush();
    assert.equal(t.calls(), 6, "one probe after the window");
    await t.flush();
    await t.flush();
    assert.equal(t.calls(), 6, "a failed probe opens a new window");
  } finally {
    t.restore();
  }
});

test("breaker closes when the probe succeeds", async () => {
  mock.timers.enable({ apis: ["Date"], now: 0 });
  const t = setup(["fail", "fail", "fail", "fail", "fail", "ok"]);
  try {
    for (let i = 0; i < 5; i++) await t.flush();
    mock.timers.tick(30_000);
    await t.flush();
    await t.flush();
    assert.equal(t.calls(), 7, "after a good probe every flush calls the collector again");
    assert.equal(t.sink.getStats().consecutiveFailures, 0);
  } finally {
    t.restore();
  }
});

test("breaker stays closed below 5 failures", async () => {
  mock.timers.enable({ apis: ["Date"], now: 0 });
  const t = setup(["fail", "fail", "fail", "fail", "ok"]);
  try {
    for (let i = 0; i < 6; i++) await t.flush();
    assert.equal(t.calls(), 6);
  } finally {
    t.restore();
  }
});
