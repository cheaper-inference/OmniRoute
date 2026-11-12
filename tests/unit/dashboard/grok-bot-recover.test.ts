import test from "node:test";
import assert from "node:assert/strict";

const { fillOmittedBodies, omittedRecoveryQuery, RECOVERY_CONCURRENCY } =
  await import("../../../src/app/(dashboard)/dashboard/grok-bot/recover.ts");

test("an omitted row is re-listed one seq ahead and keeps the matching body", async () => {
  const calls: Array<{ beforeSeq: string; limit: number }> = [];
  const rows = await fillOmittedBodies(
    [{ seq: "3", bodyOmitted: true, entryId: "old" }],
    async (query) => {
      calls.push(query);
      return [{ seq: "3", body: Buffer.from(JSON.stringify({ text: "kept" })).toString("base64") }];
    }
  );
  assert.deepEqual(calls, [{ beforeSeq: "4", limit: 1 }]);
  assert.equal(rows[0]?.bodyOmitted, false);
  assert.equal(typeof rows[0]?.body, "string");
});

test("a row from a different seq does not fill the omitted body", async () => {
  const rows = await fillOmittedBodies([{ seq: "3", bodyOmitted: true }], async () => [
    { seq: "627", body: "latest" },
  ]);
  assert.equal(rows[0]?.body, undefined);
  assert.equal(rows[0]?.bodyOmitted, true);
});

test("the last uint64 seq has no next cursor", () => {
  assert.equal(omittedRecoveryQuery("18446744073709551615"), null);
});

test("a long backlog is recovered in full, a few reads at a time", async () => {
  const rows = Array.from({ length: 50 }, (_, index) => ({
    seq: String(index + 1),
    bodyOmitted: true,
  }));
  let inFlight = 0;
  let peak = 0;
  const filled = await fillOmittedBodies(rows, async (query) => {
    inFlight += 1;
    peak = Math.max(peak, inFlight);
    await new Promise((resolve) => setTimeout(resolve, 1));
    inFlight -= 1;
    return [{ seq: String(Number(query.beforeSeq) - 1), body: "b" }];
  });
  assert.equal(filled.filter((row) => typeof row.body === "string").length, 50, "no row dropped");
  assert.ok(peak > 1, "reads overlap instead of running one at a time");
  assert.ok(peak <= RECOVERY_CONCURRENCY, "peak concurrency stays within the bound");
});
