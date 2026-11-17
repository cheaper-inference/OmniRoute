import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-log-poison-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");

test.after(() => {
  proxyLogger.flushProxyLogsSync();
  proxyLogger.clearProxyLogs();
  core.closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("one row the database rejects does not drop the other rows of its batch", () => {
  const warn = console.warn;
  console.warn = () => {};
  try {
    for (const name of ["a", "b", "c"]) {
      proxyLogger.logProxyEvent({ status: "success", provider: `ok-${name}`, level: "direct" });
    }
    // A value SQLite cannot bind makes the whole batch transaction throw.
    proxyLogger.logProxyEvent({ status: "success", provider: "poison", level: {} as never });
    proxyLogger.flushProxyLogsSync();
  } finally {
    console.warn = warn;
  }
  const rows = core
    .getDbInstance()
    .prepare("SELECT provider FROM proxy_logs ORDER BY provider")
    .all() as Array<{ provider: string }>;
  assert.deepEqual(
    rows.map((r) => r.provider),
    ["ok-a", "ok-b", "ok-c"]
  );
});
