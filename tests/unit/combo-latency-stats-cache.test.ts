import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-latency-cache-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { buildAutoCandidates } = await import("../../open-sse/services/combo.ts");

const target = {
  kind: "model" as const,
  stepId: "openai/gpt-4o-mini",
  executionKey: "openai/gpt-4o-mini",
  modelStr: "openai/gpt-4o-mini",
  provider: "openai",
  providerId: "openai",
  connectionId: null,
  weight: 1,
  label: null,
};

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("buildAutoCandidates coalesces and reuses the 24-hour latency stats read", async () => {
  const db = core.getDbInstance() as unknown as { prepare: (sql: string) => unknown };
  const originalPrepare = db.prepare.bind(db);
  let statsReads = 0;
  db.prepare = (sql: string) => {
    if (sql.includes("FROM usage_history") && sql.includes("latency_ms")) statsReads++;
    return originalPrepare(sql);
  };

  try {
    await Promise.all([
      buildAutoCandidates([target], "latency-cache"),
      buildAutoCandidates([target], "latency-cache"),
    ]);
    await buildAutoCandidates([target], "latency-cache");
    assert.equal(statsReads, 1, "concurrent and immediate requests repeated the 10k-row read");
  } finally {
    db.prepare = originalPrepare;
  }
});
