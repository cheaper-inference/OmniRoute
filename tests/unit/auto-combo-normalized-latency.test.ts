import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateFactors,
  candidateEffectiveLatencyMs,
  computePoolMaxima,
  scorePool,
  type ProviderCandidate,
} from "../../open-sse/services/autoCombo/scoring.ts";

function candidate(overrides: Partial<ProviderCandidate> = {}): ProviderCandidate {
  return {
    provider: "test-provider",
    model: "test-provider/test-model",
    quotaRemaining: 100,
    quotaTotal: 100,
    circuitBreakerState: "CLOSED",
    costPer1MTokens: 1,
    p95LatencyMs: 2000,
    latencyStdDev: 50,
    errorRate: 0,
    ...overrides,
  } as ProviderCandidate;
}

test("candidateEffectiveLatencyMs: computes TTFT + 100/TPS (in ms) when telemetry is present", () => {
  // TTFT = 500ms, TPS = 50 tokens/sec -> 100 tokens takes 2s (2000ms) -> total 2500ms
  const effective = candidateEffectiveLatencyMs({
    p95LatencyMs: 148_000,
    avgTtftMs: 500,
    avgTokensPerSecond: 50,
  });
  assert.equal(effective, 2500);
});

test("candidateEffectiveLatencyMs: respects explicit effectiveLatencyMs if set", () => {
  const effective = candidateEffectiveLatencyMs({
    p95LatencyMs: 148_000,
    effectiveLatencyMs: 1800,
  });
  assert.equal(effective, 1800);
});

test("candidateEffectiveLatencyMs: falls back to p95LatencyMs when TTFT or TPS is missing or non-positive", () => {
  assert.equal(
    candidateEffectiveLatencyMs({
      p95LatencyMs: 3000,
      avgTtftMs: undefined,
      avgTokensPerSecond: 50,
    }),
    3000
  );
  assert.equal(
    candidateEffectiveLatencyMs({
      p95LatencyMs: 3000,
      avgTtftMs: 500,
      avgTokensPerSecond: undefined,
    }),
    3000
  );
  assert.equal(
    candidateEffectiveLatencyMs({ p95LatencyMs: 3000, avgTtftMs: 0, avgTokensPerSecond: 50 }),
    3000
  );
  assert.equal(
    candidateEffectiveLatencyMs({ p95LatencyMs: 3000, avgTtftMs: 500, avgTokensPerSecond: 0 }),
    3000
  );
  assert.equal(
    candidateEffectiveLatencyMs({ p95LatencyMs: 3000, avgTtftMs: NaN, avgTokensPerSecond: 50 }),
    3000
  );
});

test("computePoolMaxima: uses normalized 100-token latency so long-output requests do not distort pool max", () => {
  const pool = [
    // Model A: generated 6k tokens (took 148s), but TTFT=800ms and TPS=40 tok/s -> effective 3300ms
    candidate({
      provider: "fast-long-gen",
      model: "fast-long-gen/m",
      p95LatencyMs: 148_000,
      avgTtftMs: 800,
      avgTokensPerSecond: 40,
    }),
    // Model B: short request, took 5000ms
    candidate({
      provider: "slower-short-gen",
      model: "slower-short-gen/m",
      p95LatencyMs: 5000,
    }),
  ];

  const maxima = computePoolMaxima(pool);
  // Max latency in the pool is 5000ms (Model B), NOT 148,000ms
  assert.equal(maxima.maxLatency, 5000);
});

test("calculateFactors: model generating many tokens is scored on 100-token latency rather than raw duration", () => {
  const modelLongGen = candidate({
    provider: "fast-streaming-long",
    model: "fast/m",
    p95LatencyMs: 148_000,
    avgTtftMs: 800,
    avgTokensPerSecond: 40, // effective: 800 + (100/40)*1000 = 3300ms
  });
  const modelSlowGen = candidate({
    provider: "slow-streaming",
    model: "slow/m",
    p95LatencyMs: 10_000,
    avgTtftMs: 2000,
    avgTokensPerSecond: 10, // effective: 2000 + (100/10)*1000 = 12000ms
  });

  const pool = [modelLongGen, modelSlowGen];
  const factorsLong = calculateFactors(modelLongGen, pool, "default", () => 0.5);
  const factorsSlow = calculateFactors(modelSlowGen, pool, "default", () => 0.5);

  // Pool max effective latency is 12000ms (modelSlowGen)
  // modelLongGen latencyInv: 1 - 3300 / 12000 = 0.725
  // modelSlowGen latencyInv: 1 - 12000 / 12000 = 0.0
  assert.ok(
    factorsLong.latencyInv > 0.7,
    `expected fast long-gen model to have high latencyInv, got ${factorsLong.latencyInv}`
  );
  assert.ok(
    factorsLong.latencyInv > factorsSlow.latencyInv,
    "fast model with long generation should score strictly higher latencyInv than slow model"
  );
});

test("scorePool: ranks fast-generating model above slow model even when raw request duration was much longer", () => {
  const fastLong = candidate({
    provider: "qwen-fast",
    model: "qwen/fast",
    p95LatencyMs: 148_000, // generated 6k tokens
    avgTtftMs: 600,
    avgTokensPerSecond: 50, // effective: 600 + 2000 = 2600ms
  });
  const slowShort = candidate({
    provider: "slow-model",
    model: "slow/short",
    p95LatencyMs: 8000, // generated 50 tokens slowly
    avgTtftMs: 3000,
    avgTokensPerSecond: 10, // effective: 3000 + 10000 = 13000ms
  });

  const scored = scorePool([slowShort, fastLong], "default", {
    quota: 0,
    health: 0,
    costInv: 0,
    latencyInv: 1.0, // test latency weight alone
    taskFit: 0,
    stability: 0,
    tierPriority: 0,
  });

  assert.equal(scored[0].provider, "qwen-fast");
  assert.equal(scored[1].provider, "slow-model");
});
