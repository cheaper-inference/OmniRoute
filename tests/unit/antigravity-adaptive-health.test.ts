import test from "node:test";
import assert from "node:assert/strict";
import {
  AntigravityHealthTracker,
  ANTIGRAVITY_HEALTH_POLICY,
  normalizeAntigravityHealthModel,
} from "../../open-sse/services/antigravityHealth.ts";
import {
  bindAntigravityHealthAttempt,
  holdAntigravityHealthThroughResponse,
} from "../../src/sse/services/antigravityHealthLifecycle.ts";

const MODEL = "gemini-3.8-flash-high";
function timeoutRun(tracker: AntigravityHealthTracker, id = "a") {
  for (let i = 0; i < 8; i++) tracker.begin(id, MODEL)!.finish("timeout");
}

test("normalization shares aliases, without sharing distinct models or accounts", () => {
  const tracker = new AntigravityHealthTracker(() => 1000);
  assert.equal(normalizeAntigravityHealthModel(" AGY/Gemini-3.8-Flash "), MODEL);
  timeoutRun(tracker);
  assert.deepEqual(tracker.candidates([{ id: "a" }, { id: "b" }], MODEL), [{ id: "b" }]);
  assert.deepEqual(tracker.candidates([{ id: "a" }], "gemini-3.8-flash-low"), [{ id: "a" }]);
});

test("low samples never quarantine, cancellations and quota do not enter denominator", () => {
  const tracker = new AntigravityHealthTracker(() => 1000);
  for (let i = 0; i < 7; i++) tracker.begin("a", MODEL)!.finish("timeout");
  for (let i = 0; i < 20; i++) tracker.begin("a", MODEL)!.finish("ignored");
  assert.equal(tracker.snapshot()[0].samples, 7);
  assert.equal(tracker.snapshot()[0].state, "healthy");
  tracker.begin("a", MODEL)!.finish("success");
  assert.equal(tracker.snapshot()[0].state, "quarantined");
});

test("transport failures stay separate from confirmed header timeouts", () => {
  const tracker = new AntigravityHealthTracker(() => 1000);
  for (let i = 0; i < 12; i++) tracker.begin("a", MODEL)!.finish("transport");
  assert.equal(tracker.snapshot()[0].state, "healthy");
  assert.equal(tracker.snapshot()[0].timeouts, 0);
  assert.equal(tracker.snapshot()[0].transportFailures, 12);
});

test("window expiry and bounded history prevent stale samples from quarantining", () => {
  let now = 1000;
  const tracker = new AntigravityHealthTracker(() => now);
  for (let i = 0; i < 7; i++) tracker.begin("a", MODEL)!.finish("timeout");
  now += ANTIGRAVITY_HEALTH_POLICY.windowMs + 1;
  tracker.begin("a", MODEL)!.finish("timeout");
  assert.equal(tracker.snapshot()[0].samples, 1);
  assert.equal(tracker.snapshot()[0].state, "healthy");
  for (let i = 0; i < 50; i++) tracker.begin("b", MODEL)!.finish("success");
  assert.equal(tracker.snapshot("b")[0].samples, ANTIGRAVITY_HEALTH_POLICY.maxSamples);
});

test("exactly one half-open probe, two successes to recover, stale successes fenced", async () => {
  let now = 1000;
  const tracker = new AntigravityHealthTracker(() => now);
  const staleSuccess = tracker.begin("a", MODEL)!;
  timeoutRun(tracker);
  staleSuccess.finish("success");
  assert.equal(tracker.snapshot()[0].state, "quarantined");
  assert.equal(tracker.begin("a", MODEL), null);
  now += 30_001;
  const tickets = await Promise.all(
    Array.from({ length: 10 }, async () => tracker.begin("a", MODEL))
  );
  assert.equal(tickets.filter(Boolean).length, 1);
  tickets.find(Boolean)!.finish("success");
  assert.equal(tracker.snapshot()[0].state, "half_open");
  assert.equal(tracker.snapshot()[0].recoverySuccesses, 1);
  const second = tracker.begin("a", MODEL)!;
  second.finish("success");
  second.finish("timeout"); // duplicate result/callback cannot reopen
  assert.equal(tracker.snapshot()[0].state, "healthy");
  assert.equal(tracker.snapshot()[0].samples, 0);
});

test("all quarantined pool admits one bounded real-request escape, respecting supplied pool", () => {
  const tracker = new AntigravityHealthTracker(() => 1000);
  timeoutRun(tracker, "a");
  timeoutRun(tracker, "b");
  const candidates = tracker.candidates([{ id: "a" }, { id: "b" }], MODEL);
  assert.equal(candidates.length, 1);
  const probe = tracker.begin(candidates[0].id, MODEL, true)!;
  assert.equal(probe.probe, true);
  assert.equal(tracker.begin(candidates[0].id, MODEL, true), null);
  assert.deepEqual(tracker.candidates([], MODEL), []);
  probe.finish("ignored");
});

test("failed probes increase finite cooldown, capped at five minutes", () => {
  let now = 1000;
  const tracker = new AntigravityHealthTracker(() => now);
  timeoutRun(tracker);
  for (let i = 0; i < 10; i++) {
    const remaining = tracker.snapshot()[0].cooldownRemainingMs;
    assert.ok(remaining > 0 && remaining <= 300_000);
    now += remaining + 1;
    tracker.begin("a", MODEL)!.finish("timeout");
  }
  assert.equal(tracker.snapshot()[0].cooldownRemainingMs, 300_000);
});

test("caller abort releases probe without failure or success double count", () => {
  const tracker = new AntigravityHealthTracker(() => 1000);
  timeoutRun(tracker);
  const signal = new AbortController();
  const attempt = bindAntigravityHealthAttempt(tracker.begin("a", MODEL, true)!, signal.signal);
  signal.abort(new DOMException("caller cancelled", "AbortError"));
  attempt.finish("timeout");
  attempt.finish("success");
  const state = tracker.snapshot()[0];
  assert.equal(state.samples, 8);
  assert.equal(state.inflight, 0);
  assert.equal(state.backoffLevel, 1);
  assert.notEqual(state.state, "probing");
});

test("cancelled response stream never counts as a healthy completed request", async () => {
  const tracker = new AntigravityHealthTracker(() => 1000);
  const ticket = tracker.begin("a", MODEL)!;
  const response = holdAntigravityHealthThroughResponse(new Response(new ReadableStream()), ticket);
  await response.body!.cancel();
  ticket.finish("success");
  assert.equal(tracker.snapshot()[0].samples, 0);
  assert.equal(tracker.snapshot()[0].inflight, 0);
});

test("finished useful SSE counts once, error-only SSE counts zero", async () => {
  const tracker = new AntigravityHealthTracker(() => 1000);
  for (const [id, data] of [
    ["success", 'data: {"choices":[{"delta":{"content":"ok"}}]}\n\n'],
    ["error", 'data: {"error":{"message":"upstream failed"}}\n\n'],
  ]) {
    const response = holdAntigravityHealthThroughResponse(
      new Response(data),
      tracker.begin(id, MODEL)!
    );
    await response.text();
  }
  assert.equal(tracker.snapshot("success")[0].samples, 1);
  assert.equal(tracker.snapshot("error")[0].samples, 0);
});

test("bounded registry never evicts in-flight probes", () => {
  const tracker = new AntigravityHealthTracker(() => 1000);
  const held = tracker.begin("held", MODEL)!;
  for (let i = 0; i < 1100; i++) tracker.begin(`account-${i}`, MODEL)!.finish("success");
  assert.ok(tracker.snapshot().length <= ANTIGRAVITY_HEALTH_POLICY.maxEntries);
  assert.equal(tracker.snapshot("held")[0].inflight, 1);
  held.finish("success");
});

test("adaptive quarantine is opt-in and only applies to Antigravity aliases", async () => {
  const { isAntigravityAdaptiveHealthEnabled } =
    await import("../../open-sse/services/antigravityHealth.ts");
  const previous = process.env.OMNIROUTE_ANTIGRAVITY_ADAPTIVE_HEALTH_ENABLED;
  try {
    delete process.env.OMNIROUTE_ANTIGRAVITY_ADAPTIVE_HEALTH_ENABLED;
    assert.equal(isAntigravityAdaptiveHealthEnabled("antigravity"), false);
    process.env.OMNIROUTE_ANTIGRAVITY_ADAPTIVE_HEALTH_ENABLED = "true";
    assert.equal(isAntigravityAdaptiveHealthEnabled("antigravity"), true);
    assert.equal(isAntigravityAdaptiveHealthEnabled("agy"), true);
    assert.equal(isAntigravityAdaptiveHealthEnabled("codex"), false);
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_ANTIGRAVITY_ADAPTIVE_HEALTH_ENABLED;
    else process.env.OMNIROUTE_ANTIGRAVITY_ADAPTIVE_HEALTH_ENABLED = previous;
  }
});

test("stream wrapper preserves provider-probe and empty-turn response policies", async () => {
  const { markProviderProbeResponse, isProviderProbeResponse } =
    await import("../../src/shared/utils/providerProbeResult.ts");
  const tracker = new AntigravityHealthTracker(() => 1000);
  const original = new Response('data: {"choices":[{"delta":{"content":"ok"}}]}\n\n', {
    headers: { "Content-Type": "text/event-stream" },
  });
  markProviderProbeResponse(original);
  const wrapped = holdAntigravityHealthThroughResponse(original, tracker.begin("policy", MODEL)!);
  assert.notEqual(wrapped, original);
  assert.equal(isProviderProbeResponse(wrapped), true);
  await wrapped.text();
  assert.equal(tracker.snapshot("policy")[0].samples, 1);
});

test("an idle recovery stream releases its probe without inventing a success", async () => {
  let now = 1000;
  const tracker = new AntigravityHealthTracker(() => now);
  timeoutRun(tracker);
  now += 30_001;
  const probe = tracker.begin("a", MODEL);
  assert.ok(probe?.probe);
  const upstream = new Response(new ReadableStream<Uint8Array>());
  const wrapped = holdAntigravityHealthThroughResponse(upstream, probe!, 25);
  await assert.rejects(wrapped.text(), /recovery probe stream idle timeout/);
  const state = tracker.snapshot("a")[0];
  assert.equal(state.inflight, 0);
  assert.notEqual(state.state, "probing");
  assert.equal(state.recoverySuccesses, 0);
});

test("adaptive health follows each connection's dispatched legacy default model", async () => {
  const { resolveBareModelToConnectionDefault } = await import("../../open-sse/services/model.ts");
  const prior = process.env.BARE_MODEL_DEFAULT_OVERRIDE_LEGACY;
  try {
    process.env.BARE_MODEL_DEFAULT_OVERRIDE_LEGACY = "true";
    const tracker = new AntigravityHealthTracker(() => 1000);
    const connections = [
      { id: "bad", defaultModel: MODEL },
      { id: "good", defaultModel: "gemini-3.8-flash-low" },
    ];
    timeoutRun(tracker, "bad");
    const modelFor = (connection: (typeof connections)[number]) =>
      resolveBareModelToConnectionDefault(
        "gemini-3.8-flash-low",
        "gemini-3.8-flash-low",
        connection.defaultModel
      ) || "gemini-3.8-flash-low";
    assert.equal(modelFor(connections[0]), MODEL);
    assert.equal(modelFor(connections[1]), "gemini-3.8-flash-low");
    assert.deepEqual(tracker.candidates(connections, modelFor), [connections[1]]);
    // A qualified model is always dispatched unchanged even under legacy override.
    assert.equal(
      resolveBareModelToConnectionDefault(
        "antigravity/gemini-3.8-flash-low",
        "gemini-3.8-flash-low",
        MODEL
      ),
      "gemini-3.8-flash-low"
    );
  } finally {
    if (prior === undefined) delete process.env.BARE_MODEL_DEFAULT_OVERRIDE_LEGACY;
    else process.env.BARE_MODEL_DEFAULT_OVERRIDE_LEGACY = prior;
  }
});

test("successive health and lease response wrappers preserve probe and empty-turn provenance", async () => {
  const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
  const { markEmptyTurnExecution, getEmptyTurnDiagnostics } =
    await import("../../open-sse/utils/emptyTurnPolicy.ts");
  const { markProviderProbeResponse, isProviderProbeResponse } =
    await import("../../src/shared/utils/providerProbeResult.ts");
  const { inheritResponsePolicies } =
    await import("../../src/sse/handlers/chat/responsePolicies.ts");

  const upstreamUrl = getRegistryEntry("openai")?.baseUrl;
  assert.ok(upstreamUrl);
  const executed = markEmptyTurnExecution(
    new Response('data: {"choices":[{"delta":{"content":"hello"}}]}\n\n', {
      headers: { "Content-Type": "text/event-stream" },
    }),
    upstreamUrl,
    { connectionId: "policy-test", apiKey: "test-only" }
  );
  assert.equal(getEmptyTurnDiagnostics(executed).nativeExecutionObserved, true);
  markProviderProbeResponse(executed);
  const tracker = new AntigravityHealthTracker(() => 1000);
  const held = holdAntigravityHealthThroughResponse(executed, tracker.begin("policy-test", MODEL)!);
  const leaseWrapper = inheritResponsePolicies(
    held,
    new Response(held.body, { status: held.status, headers: held.headers })
  );
  assert.equal(isProviderProbeResponse(leaseWrapper), true);
  assert.equal(getEmptyTurnDiagnostics(leaseWrapper).nativeExecutionObserved, true);
  await leaseWrapper.text();
});
