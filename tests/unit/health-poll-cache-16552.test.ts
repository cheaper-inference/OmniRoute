import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "health-poll-16552-"));
process.env.DATA_DIR = dir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const { buildProviderHealthMatrix } =
  await import("../../src/lib/monitoring/providerHealthMatrix.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#16552 matrix polls share call-log stats across provider and includeHealthy filters", async (t) => {
  let now = Date.parse("2026-10-15T12:00:00Z");
  t.mock.method(Date, "now", () => now);
  const db = core.getDbInstance();
  const original = db.prepare.bind(db);
  let queries = 0;
  db.prepare = (sql) => {
    if (sql.includes("WITH log_targets AS")) queries++;
    return original(sql);
  };
  try {
    const first = await buildProviderHealthMatrix({ range: "24h", provider: "poll-a" });
    now += 1_000;
    const second = await buildProviderHealthMatrix({
      range: "24h",
      provider: "poll-b",
      includeHealthy: false,
    });
    assert.equal(second.cutoff, first.cutoff, "cached rows retain their actual window cutoff");
    assert.equal(queries, 1, "same range must reuse one stats query across filters");
    await providers.createProviderConnection({
      provider: "poll-a",
      authType: "apikey",
      apiKey: "synthetic",
      isActive: true,
    });
    const live = await buildProviderHealthMatrix({ range: "24h", provider: "poll-a" });
    assert.equal(
      live.providers[0].connections.total,
      1,
      "connection state stays live while stats are cached"
    );
    assert.equal(queries, 1);
    await buildProviderHealthMatrix({ range: "7d", provider: "poll-a" });
    assert.equal(queries, 2, "different ranges never reuse the wrong query window");
  } finally {
    db.prepare = original;
  }
});
