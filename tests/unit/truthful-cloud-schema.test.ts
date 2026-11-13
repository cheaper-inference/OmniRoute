import test from "node:test";
import assert from "node:assert/strict";
Object.defineProperty(globalThis, "caches", { value: {}, configurable: true });
const core = await import("../../src/lib/db/core.ts");
const { recordLedgerEntry, listLedgerEntries } = await import("../../src/lib/db/costLedger.ts");
test.after(() => {
  core.resetDbInstance();
  Reflect.deleteProperty(globalThis, "caches");
});
test("cloud bootstrap includes evidence schema without disk migrations", () => {
  assert.equal(core.isCloud, true);
  const db = core.getDbInstance();
  const expected = {
    call_logs: ["usage_evidence"],
    usage_history: ["usage_evidence", "usage_provenance"],
    request_cost_ledger: ["usage_evidence"],
    daily_usage_summary: [
      "estimated_requests",
      "unknown_evidence_requests",
      "cached_input_unknown_requests",
    ],
  };
  for (const [table, names] of Object.entries(expected)) {
    const columns = db.prepare<{ name: string }>(`PRAGMA table_info(${table})`).all();
    for (const name of names)
      assert.ok(
        columns.some((column) => column.name === name),
        `${table}.${name}`
      );
  }
  const evidence = {
    input: { source: "reported" as const },
    output: { source: "estimated" as const, method: "characters" },
    cacheRead: { source: "unknown" as const },
    cacheCreation: { source: "unknown" as const },
  };
  recordLedgerEntry({
    apiKeyId: "fixture",
    provider: "synthetic",
    model: "fixture",
    amountUsd: 1,
    usageEvidence: evidence,
  });
  assert.deepEqual(listLedgerEntries("fixture")[0].usageEvidence, evidence);
  db.prepare(
    "INSERT INTO usage_history(timestamp, usage_evidence, usage_provenance) VALUES (?, ?, ?)"
  ).run(new Date().toISOString(), JSON.stringify(evidence), "estimated");
  db.prepare(
    "INSERT INTO daily_usage_summary(provider,model,date,estimated_requests,unknown_evidence_requests,cached_input_unknown_requests) VALUES ('synthetic','fixture','2026-01-01',1,0,1)"
  ).run();
});

test("cloud evidence reconciliation is idempotent and preserves existing unknown rows", async () => {
  const { ensureUsageEvidenceSchema } = await import("../../src/lib/db/usageEvidenceSchema.ts");
  const db = core.getDbInstance();
  db.prepare(
    "INSERT INTO usage_history(timestamp,tokens_cache_read) VALUES ('2026-01-02',0)"
  ).run();
  ensureUsageEvidenceSchema(db);
  ensureUsageEvidenceSchema(db);
  assert.equal(
    db
      .prepare<{ usage_evidence: unknown }>(
        "SELECT usage_evidence FROM usage_history WHERE timestamp='2026-01-02'"
      )
      .get()?.usage_evidence,
    null
  );
});
