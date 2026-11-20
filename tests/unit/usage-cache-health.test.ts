/**
 * Prompt-cache health summary.
 *
 * Context: production diagnosis on 2026-07-27 found that 18% of the Opus calls
 * carried 94% of all cache_creation tokens, while the median call wrote only
 * 848 tokens. A plain average hid this completely — `write/read = 0.385` looks
 * merely mediocre, and the aggregate says nothing about WHERE the waste is.
 * The summary therefore has to expose the concentration (heavy-write share),
 * not just the ratio, and split per model, because Sonnet sat at 0.13 while
 * Opus sat at 0.51 in the very same window.
 *
 * The numbers in these fixtures are the real shape observed on the box.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { summarizeCacheHealth, type CacheHealthRow } from "@/lib/usage/cacheHealth";

function row(
  model: string,
  cacheRead: number,
  cacheCreation: number,
  timestamp = "2026-07-28T02:00:00.000Z"
): CacheHealthRow {
  return { model, cacheRead, cacheCreation, timestamp };
}

test("a healthy conversation: write the prefix once and then just the delta", () => {
  const rows = [
    row("claude-sonnet-5", 0, 11660),
    row("claude-sonnet-5", 11660, 14),
    row("claude-sonnet-5", 11674, 15),
    row("claude-sonnet-5", 11689, 12),
  ];

  const s = summarizeCacheHealth(rows);

  assert.equal(s.totalCalls, 4);
  assert.equal(s.cacheReadTotal, 35023);
  assert.equal(s.cacheWriteTotal, 11701);
  // The initial write is inevitable; what matters is that the following turns read.
  assert.equal(s.warmCalls, 3);
  assert.equal(s.coldCalls, 1);
  assert.equal(s.verdict, "healthy");
});

test("thrash: repays prefix every turn instead of reading", () => {
  const rows = [
    row("claude-opus-4-8", 0, 200000),
    row("claude-opus-4-8", 0, 205000),
    row("claude-opus-4-8", 0, 210000),
  ];

  const s = summarizeCacheHealth(rows);

  assert.equal(s.verdict, "thrash");
  assert.ok(s.writeReadRatio > 1, "razão write/read acima de 1 é a assinatura do thrash");
  assert.equal(s.warmCalls, 0);
});

test("exposes the CONCENTRATION of the write, which the average hides", () => {
  // 20 calls: 18 cheap + 2 expensive. The average lies, concentration does not.
  const rows = [
    ...Array.from({ length: 18 }, () => row("claude-opus-4-8", 127000, 800)),
    row("claude-opus-4-8", 37509, 91878),
    row("claude-opus-4-8", 37509, 87949),
  ];

  const s = summarizeCacheHealth(rows);

  assert.equal(s.heavyWriteCalls, 2);
  assert.equal(s.heavyWriteCallShare, 0.1, "2 de 20 chamadas");
  assert.ok(
    s.heavyWriteTokenShare > 0.9,
    `essas 2 chamadas concentram >90% do write, não 10% (obtido: ${s.heavyWriteTokenShare})`
  );
  // The median remains cheap — this is exactly why the p50 alone is deceiving.
  assert.equal(s.writeP50, 800);
  assert.ok(s.writeP90 > 50000, "o p90 é onde a dor aparece");
});

test("break by model — Opus and Sonnet in the same window have different health", () => {
  const rows = [
    ...Array.from({ length: 8 }, () => row("claude-sonnet-5", 100000, 1000)),
    ...Array.from({ length: 6 }, () => row("claude-opus-4-8", 100000, 1000)),
    ...Array.from({ length: 2 }, () => row("claude-opus-4-8", 37509, 90000)),
  ];

  const s = summarizeCacheHealth(rows);
  const byModel = Object.fromEntries(s.byModel.map((m) => [m.model, m]));

  assert.equal(s.byModel.length, 2);
  assert.ok(
    byModel["claude-opus-4-8"].writeReadRatio > byModel["claude-sonnet-5"].writeReadRatio,
    "o modelo problemático tem de se destacar no relatório"
  );
  // Ordered by worst first: this is what the operator needs to see right away.
  assert.equal(s.byModel[0].model, "claude-opus-4-8");
});

test("calls without any cache are counted separately, not as thrash", () => {
  // A model/route that doesn't cache is not a sick cache — it's an absence of cache.
  const rows = [row("gpt-4o", 0, 0), row("gpt-4o", 0, 0), row("claude-sonnet-5", 9000, 20)];

  const s = summarizeCacheHealth(rows);

  assert.equal(s.uncachedCalls, 2);
  assert.equal(s.warmCalls, 1);
  assert.equal(s.verdict, "healthy", "ausência de cache não pode ser reportada como thrash");
});

test("empty window does not divide by zero or make up a verdict", () => {
  const s = summarizeCacheHealth([]);

  assert.equal(s.totalCalls, 0);
  assert.equal(s.writeReadRatio, 0);
  assert.equal(s.heavyWriteTokenShare, 0);
  assert.equal(s.verdict, "no-data");
  assert.deepEqual(s.byModel, []);
});

test("tolerates rows with null coming from the database (columns are nullable)", () => {
  const rows = [
    { model: "claude-sonnet-5", cacheRead: null, cacheCreation: 5000, timestamp: "x" },
    { model: "claude-sonnet-5", cacheRead: 5000, cacheCreation: null, timestamp: "x" },
  ] as unknown as CacheHealthRow[];

  const s = summarizeCacheHealth(rows);

  assert.equal(s.cacheReadTotal, 5000);
  assert.equal(s.cacheWriteTotal, 5000);
  assert.equal(s.totalCalls, 2);
});

test("the 'heavy' threshold follows the window rather than being a fixed magic number", () => {
  // Small conversations (~2k cache) cannot be judged by the same cut
  // absolute of a 130k conversation, otherwise nothing is 'heavy' and the report is silent.
  const pequenas = [
    ...Array.from({ length: 9 }, () => row("m", 2000, 20)),
    row("m", 500, 1800),
  ];

  const s = summarizeCacheHealth(pequenas);

  assert.equal(s.heavyWriteCalls, 1, "a chamada cara relativa à janela tem de ser detectada");
});
