import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-live-log-archive-"));
const originalDataDir = process.env.DATA_DIR;
const originalLogPath = process.env.APP_LOG_FILE_PATH;
process.env.DATA_DIR = dataDir;

const { archiveLegacyRequestLogs } = await import("../../src/lib/usage/migrations.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  resetDbInstance();
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  if (originalLogPath === undefined) delete process.env.APP_LOG_FILE_PATH;
  else process.env.APP_LOG_FILE_PATH = originalLogPath;
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const relativePath of ["app.log", "application/app.log", "runtime/application/app.log"]) {
  test(`legacy archival preserves the configured live log at logs/${relativePath}`, async () => {
    const logsDir = path.join(dataDir, "logs");
    const liveLog = path.join(logsDir, relativePath);
    const legacySibling = path.join(logsDir, "runtime-old", "request.log");
    const marker = path.join(dataDir, "log_archives", "legacy-request-logs.json");
    fs.rmSync(marker, { force: true });
    process.env.APP_LOG_FILE_PATH = liveLog;
    fs.mkdirSync(path.dirname(liveLog), { recursive: true });
    fs.mkdirSync(path.dirname(legacySibling), { recursive: true });
    fs.writeFileSync(liveLog, "live application log\n");
    fs.writeFileSync(legacySibling, "legacy request\n");

    const archive = await archiveLegacyRequestLogs();

    assert.equal(fs.existsSync(liveLog), true, "the active logger's file must not be deleted");
    assert.equal(fs.readFileSync(liveLog, "utf8"), "live application log\n");
    assert(archive, "unrelated legacy logs must still be archived");
    assert.equal(fs.existsSync(path.join(dataDir, "log_archives", archive)), true);
    assert.equal(fs.existsSync(legacySibling), false, "a sibling prefix is not the live subtree");
  });
}
