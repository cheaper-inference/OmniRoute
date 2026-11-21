/**
 * tests/unit/serial/quota-percent-lag-regression.test.ts
 *
 * Regression: the account figure of a percent plan lags behind the requests. On Claude OAuth a
 * request's usage only shows up in the rate-limit headers of the NEXT response, the usage
 * endpoint is read at most every 15 minutes, and the saturation cache keeps each read for 30
 * seconds. Handing each rise of the figure to the keys with tokens recorded at that instant
 * charges every key for the request before its own: the light key is refused and the heavy key
 * stays free until the provider window turns.
 *
 * Every scenario runs the real gate (enforceQuotaShare, then recordConsumption when the request
 * completes) against a simulated provider:
 *   - the response headers carry the figure at the moment a response STARTS, so they never
 *     contain that request's own usage; the payload says so (`_source: "response-headers"`) and
 *     carries the observation time (`_observedAt`);
 *   - the usage endpoint carries the whole figure at its read, at most every 15 minutes;
 *   - the newer of the two is served, with the 5h window's fixed reset time;
 *   - the saturation cache is the real 30 s one and is never cleared: the clock moves instead.
 *
 * Five hard keys A..E of weight 20 on one connection (fair share 20 points each), one 5h percent
 * window of 100, default floor (1000 tokens per point). Expected values follow the book's rule:
 * the growth of the figure since the book opened is split by the tokens each key routed since
 * then, capped by what those tokens explain; the rest is external.
 */

import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { QuotaPool } from "../../../src/lib/db/quotaPools.ts";

// ── Set DATA_DIR BEFORE any DB import (resolved as module-level constant) ───
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-percent-lag-"));
process.env.DATA_DIR = TEST_DATA_DIR;
// Every expected value below assumes the default floor.
const FLOOR_ENV = "QUOTA_PERCENT_MIN_TOKENS_PER_POINT";
const savedFloor = process.env[FLOOR_ENV];
delete process.env[FLOOR_ENV];

const providerPlans = await import("../../../src/lib/db/providerPlans.ts");
const quotaPools = await import("../../../src/lib/db/quotaPools.ts");
const { enforceQuotaShare, recordConsumption } = await import("../../../src/lib/quota/enforce.ts");
const { attributePercentDimension } = await import("../../../src/lib/quota/percentAttribution.ts");
const { SqliteQuotaStore } = await import("../../../src/lib/quota/sqliteQuotaStore.ts");
const sat = await import("../../../src/lib/quota/saturationSignals.ts");
const core = await import("../../../src/lib/db/core.ts");

const PROV = "claude";
const SEC = 1000;
const MIN = 60 * SEC;
const H = 60 * MIN;
const ENDPOINT_TTL_MS = 15 * MIN;
const KEYS = ["A", "B", "C", "D", "E"];
const LIGHT = ["B", "C", "D", "E"];

/** One figure the provider served: percent used of the 5h window, and when it was produced. */
interface Figure {
  used: number;
  at: number;
}

/** What the Claude usage seam reads for one connection. */
interface UsageSource {
  payload(): Record<string, unknown>;
  endpointReadAt(): number | null;
}

const sources = new Map<string, UsageSource>();

mock.timers.enable({ apis: ["Date"], now: Date.UTC(2026, 10, 23, 9, 0, 0) });
sat.__setAnthropicSaturationDepsForTests({
  loadConnection: async (id: string) => ({ id, accessToken: `tok-${id}`, authType: "oauth" }),
  fetchUsage: async (conn: Record<string, unknown>) =>
    sources.get(String(conn.id))?.payload() ?? { quotas: {} },
  endpointReadAt: (conn: Record<string, unknown>) =>
    sources.get(String(conn.id))?.endpointReadAt() ?? null,
});

test.after(() => {
  mock.timers.reset();
  sat.__setAnthropicSaturationDepsForTests(null);
  sat._clearSaturationCache();
  sat._clearRateLimitHeaders();
  core.resetDbInstance();
  if (savedFloor === undefined) delete process.env[FLOOR_ENV];
  else process.env[FLOOR_ENV] = savedFloor;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function advance(ms: number): void {
  mock.timers.setTime(Date.now() + ms);
}

const iso = (ms: number) => new Date(ms).toISOString();

function usagePayload(figure: Figure, resetAt: number, fromHeaders: boolean) {
  const quotas = { "session (5h)": { used: figure.used, total: 100, resetAt: iso(resetAt) } };
  return fromHeaders
    ? { quotas, _source: "response-headers", _observedAt: iso(figure.at) }
    : { quotas };
}

/** Manual 5h percent plan of 100 and a pool of the five hard keys on that connection. */
function makePool(conn: string): QuotaPool {
  providerPlans.upsertPlan(conn, PROV, [{ unit: "percent", window: "5h", limit: 100 }], "manual");
  return quotaPools.createPool({
    connectionId: conn,
    name: conn,
    allocations: KEYS.map((apiKeyId) => ({ apiKeyId, weight: 20, policy: "hard" as const })),
  });
}

const gate = async (conn: string, key: string) =>
  (await enforceQuotaShare({ apiKeyId: key, connectionId: conn, provider: PROV })).kind;

/** Each key's attributed part (points of the 5h window), as the gate computes it now. */
async function partsOf(conn: string, pool: QuotaPool): Promise<Record<string, number>> {
  const att = await attributePercentDimension({
    store: new SqliteQuotaStore(),
    pool,
    connectionId: conn,
    provider: PROV,
    dimension: { window: "5h", limit: 100 },
  });
  return Object.fromEntries(KEYS.map((k) => [k, att.internalByKey[k] ?? 0]));
}

/** One Claude account with the lagging figure described in the header comment. */
class Account implements UsageSource {
  /** Real usage of the window (points), whole and per key. */
  real = 0;
  readonly truth: Record<string, number> = {};
  /** Tokens recorded per key. */
  readonly tokens: Record<string, number> = {};
  readonly resetAt = Date.now() + 5 * H;
  readonly pool: QuotaPool;
  private header: Figure | null = null;
  private endpoint: Figure | null = null;

  constructor(readonly conn: string) {
    this.pool = makePool(conn);
    sources.set(conn, this);
  }

  /** The real figure now, to the hundredth of a point. */
  private figure(): Figure {
    return { used: Math.floor(this.real * 100 + 1e-6) / 100, at: Date.now() };
  }

  payload(): Record<string, unknown> {
    if (!this.endpoint || Date.now() - this.endpoint.at >= ENDPOINT_TTL_MS) {
      this.endpoint = this.figure();
    }
    const fromHeaders = this.header !== null && this.header.at > this.endpoint.at;
    return usagePayload(fromHeaders ? this.header! : this.endpoint, this.resetAt, fromHeaders);
  }

  endpointReadAt(): number | null {
    return this.endpoint?.at ?? null;
  }

  /** The gate only (no dispatch): what this key's next request would get. */
  gate(key: string) {
    return gate(this.conn, key);
  }

  /** The gate before dispatch; an allowed response starts and its headers carry the figure. */
  async arrive(key: string) {
    const kind = await gate(this.conn, key);
    if (kind === "allow") this.header = this.figure();
    return kind;
  }

  /** Usage the provider counts (a stream counted while it runs, or a completed request). */
  use(key: string, points: number): void {
    this.real += points;
    this.truth[key] = (this.truth[key] ?? 0) + points;
  }

  /** The response completes: the provider counts it and the proxy records its tokens. */
  async complete(key: string, tokens: number, points: number): Promise<void> {
    this.use(key, points);
    this.tokens[key] = (this.tokens[key] ?? 0) + tokens;
    await recordConsumption({
      apiKeyId: key,
      connectionId: this.conn,
      provider: PROV,
      cost: { tokens, usd: 0, requests: 1 },
    });
  }

  parts() {
    return partsOf(this.conn, this.pool);
  }

  /** Every key's attributed part is within `tolerance` points of its real usage. */
  async assertNearTruth(tolerance: number, label: string): Promise<Record<string, number>> {
    const parts = await this.parts();
    for (const k of KEYS) {
      const gap = Math.abs(parts[k] - (this.truth[k] ?? 0));
      assert.ok(
        gap <= tolerance,
        `${label}: ${k} attributed ${parts[k].toFixed(2)}, real ${(this.truth[k] ?? 0).toFixed(2)}`
      );
    }
    return parts;
  }
}

/** Deterministic generator (mulberry32). */
function seeded(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

test("alternating heavy and light requests 45 seconds apart", async () => {
  // A: 100_000 tokens = 2 points; B: 5_000 tokens = 0.1 point (50_000 tokens per real point).
  const acc = new Account("lag-alternating");
  assert.equal(await acc.gate("A"), "allow"); // the book opens at 0
  const decisionsA: string[] = [];
  for (let round = 1; round <= 25; round++) {
    const a = await acc.arrive("A");
    decisionsA.push(a);
    // The figure misses at most the request in flight: A's part within 2.5 of its real usage.
    await acc.assertNearTruth(2.5, `round ${round}, A arrives`);
    if (a === "allow") {
      advance(5 * SEC);
      await acc.complete("A", 100_000, 2);
      advance(40 * SEC);
    } else {
      advance(45 * SEC);
    }
    assert.equal(await acc.arrive("B"), "allow", `round ${round}: B is never refused`);
    await acc.assertNearTruth(2.5, `round ${round}, B arrives`);
    advance(5 * SEC);
    await acc.complete("B", 5_000, 0.1);
    advance(40 * SEC);
  }
  // A's 25th arrival reads the headers of B's 24th start: 24 × 2.1 − 0.1 = 50.3 ≥ 50 (strict) and
  // A's part 50.3 × 2_400_000 / 2_515_000 = 48.0 ≥ 20; every earlier arrival read at most 48.2.
  assert.deepEqual(decisionsA, [...Array<string>(24).fill("allow"), "block"]);
  // Headers of B's 25th start: 48 + 2.4 = 50.4 → A 50.4 × 2_400 / 2_525 = 47.9, B 2.495.
  assert.equal(await acc.gate("A"), "block");
  assert.equal(await acc.gate("B"), "allow");
  const parts = await acc.assertNearTruth(2.5, "end");
  assert.ok(Math.abs(parts.A - 47.9) < 0.01 && Math.abs(parts.B - 2.495) < 0.01, `${parts.A}`);
});

test("tiny frequent requests next to rare large ones", async () => {
  // B: 300 tokens (0.006 point) every 10 s, each request 2 s long; A: 100_000 tokens (2 points)
  // every 4 to 6 min (seeded, 5 min on average), each request 8 s long and free to overlap B's.
  // B's requests that start while A runs, or right after it, carry headers without A's usage.
  const acc = new Account("lag-tiny-frequent");
  const rand = seeded(3);
  assert.equal(await acc.gate("A"), "allow"); // the book opens at 0
  const start = Date.now();
  const end = start + 2 * H;
  const events: Array<{ at: number; run: () => Promise<void> }> = [];
  for (let at = start; at < end; at += 10 * SEC) {
    events.push({
      at,
      run: async () => {
        assert.equal(await acc.arrive("B"), "allow", `+${(at - start) / SEC} s: B is refused`);
        // The figure misses at most A's last request (2 points); B has ~8% of the tokens, so
        // that moves B's part by ~0.17 point.
        const parts = await acc.assertNearTruth(2.5, `+${(at - start) / SEC} s, B arrives`);
        assert.ok(Math.abs(parts.B - (acc.truth.B ?? 0)) <= 1.5, `B ${parts.B}`);
      },
    });
    events.push({ at: at + 2 * SEC, run: () => acc.complete("B", 300, 300 / 50_000) });
  }
  for (let at = start + Math.floor(rand() * 5 * MIN); at < end;) {
    let allowed = false;
    events.push({ at, run: async () => void (allowed = (await acc.arrive("A")) === "allow") });
    events.push({
      at: at + 8 * SEC,
      run: async () => (allowed ? acc.complete("A", 100_000, 2) : undefined),
    });
    at += 4 * MIN + Math.floor(rand() * 2 * MIN);
  }
  events.sort((x, y) => x.at - y.at); // stable: at the same instant, the earlier-pushed first
  for (const event of events) {
    mock.timers.setTime(event.at);
    await event.run();
  }
  assert.equal(acc.tokens.B, 216_000); // 720 requests × 300
  mock.timers.setTime(end);
  assert.equal(await acc.gate("B"), "allow");
  const parts = await acc.parts();
  // B's part is small but not null: about 216_000 / (216_000 + A's tokens) of the figure.
  assert.ok(parts.B > 3 && Math.abs(parts.B - acc.truth.B) <= 1.5, `B ${parts.B}`);
});

test("the issue's shape with sparse traffic", async () => {
  // One request every 30-90 s: A (a quarter of them) 80_000 tokens, the light keys 2_000-8_000;
  // 40_000 tokens per real point, so A's request is 2 points and a light one 0.05-0.2.
  const acc = new Account("lag-issue-shape");
  const rand = seeded(1);
  assert.equal(await acc.gate("A"), "allow"); // the book opens at 0
  let refusedA = 0;
  for (let n = 0; n < 160; n++) {
    const key = rand() < 0.25 ? "A" : LIGHT[Math.floor(rand() * 4)];
    const tokens = key === "A" ? 80_000 : 2_000 + Math.floor(rand() * 6_000);
    const kind = await acc.arrive(key);
    if (key !== "A") {
      assert.equal(kind, "allow", `request ${n}: light key ${key} refused`);
    } else if (kind === "block") {
      refusedA++;
      // Refused only past its share (strict needs the figure at 50, ~84% of it A's tokens).
      assert.ok((acc.truth.A ?? 0) >= 20, `request ${n}: A refused at ${acc.truth.A}`);
    }
    if (kind === "allow") {
      advance(6 * SEC);
      await acc.complete(key, tokens, tokens / 40_000);
    }
    advance((30 + Math.floor(rand() * 60)) * SEC);
  }
  assert.ok(refusedA > 0, "A is refused once it is past its share");
  assert.equal(await acc.gate("A"), "block");
  for (const k of LIGHT) assert.equal(await acc.gate(k), "allow", k);
  await acc.assertNearTruth(2.5, "end");
});

test("a burst inside one cache lifetime followed by silence", async () => {
  const acc = new Account("lag-burst");
  assert.equal(await acc.gate("A"), "allow"); // the book opens at 0; this read is cached for 30 s
  advance(1 * SEC);
  for (let i = 0; i < 12; i++) {
    // 60 points in 24 s, every gate served by the same cached read (0%, generous mode).
    assert.equal(await acc.arrive("A"), "allow");
    advance(2 * SEC);
    await acc.complete("A", 250_000, 5);
  }
  advance(20 * MIN);
  // The endpoint read is 20 min old: a new one says 60. Growth 60, A's 3_000_000 tokens explain
  // up to 3000 points and B has none yet → A 60, B 0 (strict: B 0 < 20).
  assert.equal(await acc.arrive("B"), "allow");
  let parts = await acc.parts();
  assert.ok(parts.A >= 55, `A ${parts.A}`);
  assert.ok(Math.abs(parts.A - 60) < 1e-6 && parts.B === 0, `A ${parts.A}, B ${parts.B}`);
  advance(5 * SEC);
  await acc.complete("B", 3_000, 0.06);
  advance(1 * MIN);
  // Same figure, now split 3_000_000 : 3_000 → A 59.94, B 0.06.
  assert.equal(await acc.gate("A"), "block");
  assert.equal(await acc.gate("B"), "allow");
  parts = await acc.parts();
  const wantB = (60 * 3_000) / 3_003_000;
  assert.ok(
    Math.abs(parts.B - wantB) < 1e-3 && Math.abs(parts.A - (60 - wantB)) < 1e-3,
    `A ${parts.A}, B ${parts.B}`
  );
});

test("a long stream", async () => {
  // A streams for 10 min (30 points, counted by the provider at 3 points a minute, tokens
  // recorded at the end); B sends 2_000 tokens (0.04 point) every minute.
  const acc = new Account("lag-stream");
  assert.equal(await acc.arrive("A"), "allow"); // opens the book at 0 and starts the stream
  let previousB = 0;
  for (let minute = 1; minute <= 10; minute++) {
    advance(50 * SEC);
    acc.use("A", 3);
    assert.equal(await acc.arrive("B"), "allow", `minute ${minute}`);
    const parts = await acc.parts();
    // Only B's tokens are recorded: B's part is capped by them, tokens / 1000 points.
    const cap = (acc.tokens.B ?? 0) / 1000;
    assert.ok(parts.B <= cap + 1e-6, `minute ${minute}: B ${parts.B} > ${cap}`);
    assert.ok(parts.B >= previousB - 1e-6, `minute ${minute}: B ${parts.B} < ${previousB}`);
    previousB = parts.B;
    advance(10 * SEC);
    await acc.complete("B", 2_000, 0.04);
  }
  // At B's 10th arrival: figure 27.32 (headers of B's 9th start), B 18_000 tokens → B 18.
  assert.ok(Math.abs(previousB - 18) < 1e-6, `B peaked at ${previousB}`);
  await acc.complete("A", 1_500_000, 0); // the stream ends: its tokens are recorded

  advance(50 * SEC);
  assert.equal(await acc.arrive("B"), "allow");
  // Headers of B's 10th start: 30.36, split 1_500_000 : 20_000 → A 29.96, B 0.40.
  const parts = await acc.parts();
  assert.ok(parts.A >= 29 && parts.B <= 1, `A ${parts.A}, B ${parts.B}`);
});

test("two sources of different precision", async () => {
  // The response headers report hundredths of a point, the usage endpoint whole points.
  const conn = "lag-two-sources";
  const pool = makePool(conn);
  const resetAt = Date.now() + 5 * H;
  let served: Figure = { used: 0, at: Date.now() };
  let fromHeaders = false;
  sources.set(conn, {
    payload: () => usagePayload(served, resetAt, fromHeaders),
    endpointReadAt: () => (fromHeaders ? null : served.at),
  });
  const book = async () =>
    (await new SqliteQuotaStore().ledgerRead({ poolId: pool.id, connectionId: conn, window: "5h" }))
      .state;

  assert.equal(await gate(conn, "A"), "allow"); // the book opens at 0
  for (const [key, tokens] of [
    ["A", 300_000],
    ["B", 100_000],
  ] as const) {
    assert.equal(await gate(conn, key), "allow");
    await recordConsumption({
      apiKeyId: key,
      connectionId: conn,
      provider: PROV,
      cost: { tokens, usd: 0, requests: 1 },
    });
  }
  advance(3 * MIN);
  served = { used: 42.37, at: Date.now() };
  fromHeaders = true;
  // Growth 42.37 split 300_000 : 100_000 → A 31.7775, B 10.5925.
  const before = await partsOf(conn, pool);
  assert.ok(Math.abs(before.A - 31.7775) < 1e-6 && Math.abs(before.B - 10.5925) < 1e-6);
  const stored = await book();
  assert.equal(stored?.rev, 2); // opened, then one rise

  for (let i = 1; i <= 50; i++) {
    advance(3 * MIN);
    fromHeaders = i % 2 === 0;
    served = { used: fromHeaders ? 42.37 : 42, at: Date.now() };
    // Same reset time, still ahead: the lower endpoint figure is the same window and changes
    // nothing; the header figure equals the last one.
    assert.equal(await gate(conn, "A"), "allow");
    assert.equal(await gate(conn, "B"), "allow");
    assert.deepEqual(await book(), stored, `reading ${i}`);
    assert.deepEqual(await partsOf(conn, pool), before, `reading ${i}`);
  }
});
