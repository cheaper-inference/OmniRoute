/**
 * Combo metrics: at the 500-entry cap, a new combo name evicts the least
 * recently used entry. The scan must compare stored numbers; it must not parse
 * 500 ISO date strings for every new name.
 */
import test from "node:test";
import assert from "node:assert/strict";

const {
  getComboMetrics,
  recordComboIntent,
  recordComboRequest,
  recordComboShadowRequest,
  resetAllComboMetrics,
} = await import("../../open-sse/services/comboMetrics.ts");

const CAP = 500;
const RealDate = Date;
let stringParses = 0;

class CountingDate extends RealDate {
  constructor(...args: unknown[]) {
    if (typeof args[0] === "string") stringParses++;
    super(...(args as [string]));
  }
}

function sleepMs(ms: number) {
  const until = RealDate.now() + ms;
  while (RealDate.now() < until) {
    /* spin: make the next timestamp strictly newer */
  }
}

function fill(record: (name: string) => void) {
  resetAllComboMetrics();
  for (let i = 0; i < CAP; i++) record(`combo-${i}`);
  sleepMs(3);
  // combo-0 becomes the newest; combo-1 is now the oldest entry.
  record("combo-0");
}

function countParsesWhile(run: () => void): number {
  stringParses = 0;
  globalThis.Date = CountingDate as unknown as DateConstructor;
  try {
    run();
  } finally {
    globalThis.Date = RealDate;
  }
  return stringParses;
}

const production = (name: string) =>
  recordComboRequest(name, "openai/gpt-4o", { success: true, latencyMs: 5 });
const shadow = (name: string) =>
  recordComboShadowRequest(name, "openai/gpt-4o", { success: true, latencyMs: 5 });

test("production metrics: new name at the cap evicts the oldest entry", () => {
  fill(production);
  production("combo-new");
  assert.equal(getComboMetrics("combo-1"), null, "oldest entry is evicted");
  assert.ok(getComboMetrics("combo-0"), "recently used entry is kept");
  assert.ok(getComboMetrics("combo-new"), "new entry is stored");
});

test("production metrics: eviction scan parses no date strings", () => {
  fill(production);
  const parses = countParsesWhile(() => production("combo-new"));
  assert.equal(parses, 0, `eviction parsed ${parses} date strings`);
});

test("shadow metrics: eviction scan parses no date strings and keeps the order", () => {
  fill(shadow);
  const parses = countParsesWhile(() => shadow("combo-new"));
  assert.equal(parses, 0, `eviction parsed ${parses} date strings`);
  assert.equal(getComboMetrics("combo-1"), null, "oldest shadow entry is evicted");
  assert.ok(getComboMetrics("combo-0"), "recently used shadow entry is kept");
});

test("intent metrics: eviction scan parses no date strings", () => {
  fill(production);
  const parses = countParsesWhile(() => recordComboIntent("combo-new", "code"));
  assert.equal(parses, 0, `eviction parsed ${parses} date strings`);
  assert.equal(getComboMetrics("combo-1"), null, "oldest entry is evicted");
});

test("public view keeps lastUsedAt as an ISO string", () => {
  resetAllComboMetrics();
  production("combo-iso");
  const view = getComboMetrics("combo-iso");
  assert.equal(typeof view?.lastUsedAt, "string");
  assert.equal(new RealDate(view!.lastUsedAt as string).toISOString(), view!.lastUsedAt);
  resetAllComboMetrics();
});
