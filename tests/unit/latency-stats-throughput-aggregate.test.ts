import test from "node:test";
import assert from "node:assert/strict";
import {
  accumulateLatencySample,
  buildLatencyStatsEntry,
  createLatencyBucket,
} from "../../src/lib/usage/usageHistory/helpers.ts";

// [latencyMs, ttftMs, tokensOutput], todas bem-sucedidas
function entryFor(rows: Array<[number, number, number]>) {
  const bucket = createLatencyBucket("p", "m");
  for (const [latencyMs, ttftMs, tokensOutput] of rows) {
    bucket.totalRequests += 1;
    bucket.successfulRequests += 1;
    accumulateLatencySample(bucket, latencyMs, ttftMs, tokensOutput, true);
  }
  return buildLatencyStatsEntry("p/m", bucket, 1, 24);
}

test("avgTokensPerSecond é soma de tokens ÷ soma de tempo, não média de razões", () => {
  // 100 tok em 1 s (100 tok/s) e 900 tok em 3 s (300 tok/s):
  // média de razões = 200; soma ÷ soma = 1000 tok / 4 s = 250.
  const entry = entryFor([
    [1100, 100, 100],
    [3100, 100, 900],
  ]);
  assert.equal(entry?.avgTokensPerSecond, 250);
});

test("janela de geração abaixo de 250 ms não entra no agregado de velocidade", () => {
  // 2ª linha: 5000 − 4999 = 1 ms de janela (200 000 tok/s na conta antiga).
  const entry = entryFor([
    [1100, 100, 100],
    [5000, 4999, 200],
  ]);
  assert.equal(entry?.avgTokensPerSecond, 100);
  assert.equal(entry?.avgLatencyMs, 3050); // a latência da linha descartada continua contando
  assert.equal(entry?.avgTtftMs, 2550);
});

test("taxa acima do teto plausível não entra no agregado de velocidade", () => {
  // 2ª linha: 6000 tok em 1 s = 6000 tok/s > 5000.
  const entry = entryFor([
    [1100, 100, 100],
    [1100, 100, 6000],
  ]);
  assert.equal(entry?.avgTokensPerSecond, 100);
});

test("sem nenhuma amostra mensurável, avgTokensPerSecond é 0", () => {
  const entry = entryFor([[5000, 4999, 200]]);
  assert.equal(entry?.avgTokensPerSecond, 0);
});
