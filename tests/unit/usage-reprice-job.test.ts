import test from "node:test";
import assert from "node:assert/strict";
import { createTempDataDir } from "../_setup/tempDataDir.ts";

const { cleanup } = createTempDataDir("usage-reprice-");
delete process.env.INITIAL_PASSWORD;
delete process.env.OMNIROUTE_USAGE_REPRICE_JOB_ENABLED;

const core = await import("../../src/lib/db/core.ts");
const ledger = await import("../../src/lib/db/costLedger.ts");
const settings = await import("../../src/lib/db/settings.ts");
const job = await import("../../src/lib/usage/repriceLedger.ts");
const route = await import("../../src/app/api/usage/reprice/route.ts");

const REPORTED = { source: "reported" } as const;
const GOOD = {
  input: REPORTED,
  output: REPORTED,
  cacheRead: REPORTED,
  cacheCreation: { source: "unknown" },
};
const CACHE_UNKNOWN = { ...GOOD, cacheRead: { source: "unknown" } };

let seq = 0;
/** One zero-cost ledger row: 1000 input + 500 output tokens. */
function seed(timestamp: string, evidence: unknown = GOOD, amountUsd = 0) {
  ledger.recordLedgerEntry({
    apiKeyId: "key-reprice",
    provider: "openai",
    model: "gpt-4o",
    tokensInput: 1000,
    tokensOutput: 500,
    amountUsd,
    timestamp,
    requestId: `req-${++seq}`,
    usageEvidence: evidence as never,
  });
}
function amounts(): Array<{ id: number; amount: number; unitIn: number }> {
  return (
    core
      .getDbInstance()
      .prepare(
        "SELECT id, amount_usd AS amount, unit_price_input AS unitIn FROM request_cost_ledger ORDER BY id"
      )
      .all() as Array<{ id: number; amount: number; unitIn: number }>
  ).map((r) => ({ id: r.id, amount: r.amount, unitIn: r.unitIn }));
}
const post = (body: unknown = {}) =>
  route.POST(
    new Request("http://localhost/api/usage/reprice", {
      method: "POST",
      body: JSON.stringify(body),
    })
  );

test.before(async () => {
  // $2 in / $10 out per 1M tokens: 1000 in + 500 out = 0.002 + 0.005 = 0.007.
  await settings.updatePricing({
    openai: { "gpt-4o": { input: 2, output: 10, cached: 1, reasoning: 10, cache_creation: 2 } },
  });
});
test.beforeEach(() => {
  delete process.env.OMNIROUTE_USAGE_REPRICE_JOB_ENABLED;
  core
    .getDbInstance()
    .exec(
      "DELETE FROM request_cost_ledger; UPDATE cost_reprice_cursor SET last_timestamp = '', last_id = 0, scanned_total = 0, repriced_total = 0, refused_total = 0, unpriced_total = 0"
    );
});
test.after(() => {
  delete process.env.OMNIROUTE_USAGE_REPRICE_JOB_ENABLED;
  return cleanup();
});

test("flag on: a zero-cost row with reported usage is priced and gets its unit prices", async () => {
  seed("2026-03-01T00:00:00.000Z");
  const result = await job.runRepriceJob({});
  assert.equal(result.repriced, 1);
  const [row] = amounts();
  assert.ok(Math.abs(row.amount - 0.007) < 1e-12, `amount ${row.amount}`);
  assert.equal(row.unitIn, 2);
});

test("a row that already has a cost is never rewritten", async () => {
  seed("2026-03-01T00:00:00.000Z", GOOD, 0.5);
  const result = await job.runRepriceJob({});
  assert.equal(result.scanned, 0);
  assert.equal(amounts()[0].amount, 0.5);
});

test("degraded usage stubs are refused: no evidence, or cached tokens unknown", async () => {
  seed("2026-03-01T00:00:00.000Z", null);
  seed("2026-03-02T00:00:00.000Z", CACHE_UNKNOWN);
  const result = await job.runRepriceJob({});
  assert.equal(result.refused, 2);
  assert.equal(result.repriced, 0);
  assert.deepEqual(
    amounts().map((r) => r.amount),
    [0, 0]
  );
});

test("each row is priced at its own timestamp", async () => {
  seed("2026-01-01T00:00:00.000Z");
  seed("2026-09-01T00:00:00.000Z");
  const seen: string[] = [];
  const priceAt = async (_p: string, _m: string, timestamp: string) => {
    seen.push(timestamp);
    return timestamp < "2026-06-01" ? { input: 1, output: 1 } : { input: 3, output: 3 };
  };
  await job.runRepriceJob({ priceAt });
  assert.deepEqual(seen, ["2026-01-01T00:00:00.000Z", "2026-09-01T00:00:00.000Z"]);
  const [early, late] = amounts().map((r) => r.amount);
  assert.ok(
    Math.abs(early - 0.0015) < 1e-12 && Math.abs(late - 0.0045) < 1e-12,
    `${early} ${late}`
  );
});

test("the cursor is stored in the DB: a restart resumes by (timestamp, id) without skipping ties", async () => {
  for (let i = 0; i < 3; i++) seed("2026-03-01T00:00:00.000Z"); // three rows, one timestamp
  seed("2026-03-02T00:00:00.000Z");
  seed("2026-03-03T00:00:00.000Z");
  const first = await job.runRepriceJob({ batchSize: 2, maxBatches: 1 });
  assert.equal(first.repriced, 2);
  assert.equal(first.done, false);
  core.resetDbInstance(); // a process restart: nothing survives but the DB file
  const second = await job.runRepriceJob({ batchSize: 2 });
  assert.equal(second.repriced, 3);
  assert.equal(second.done, true);
  assert.ok(
    amounts().every((r) => r.amount > 0),
    "every row priced exactly once"
  );
  assert.equal(job.getRepriceState().repricedTotal, 5);
});

test("restart rescans rows the first pass left behind (a pricing fix repairs them)", async () => {
  seed("2026-03-01T00:00:00.000Z");
  const noPrice = async () => null;
  const first = await job.runRepriceJob({ priceAt: noPrice });
  assert.equal(first.unpriced, 1);
  assert.equal((await job.runRepriceJob({})).scanned, 0, "the cursor has passed the row");
  const again = await job.runRepriceJob({ restart: true });
  assert.equal(again.repriced, 1);
});

test("flag off: the endpoint is closed and nothing is repriced (today's behaviour)", async () => {
  seed("2026-03-01T00:00:00.000Z");
  const response = await post();
  assert.equal(response.status, 404);
  assert.equal(amounts()[0].amount, 0);
});

test("flag on: the endpoint runs the job and reports the cursor", async () => {
  process.env.OMNIROUTE_USAGE_REPRICE_JOB_ENABLED = "true";
  seed("2026-03-01T00:00:00.000Z");
  const response = await post({ batchSize: 10 });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.repriced, 1);
  assert.equal(body.done, true);
  assert.equal(body.state.repricedTotal, 1);
});
