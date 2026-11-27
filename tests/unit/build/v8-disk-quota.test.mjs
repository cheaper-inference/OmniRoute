import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  monitoredPromises,
  runWithIndependentDiskQuota,
} from "./fixtures/v8-disk-quota-harness.mjs";

test("V8 disk quota calibration observes promise and sync writes before the third write", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "v8-quota-calibration-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const result = runWithIndependentDiskQuota({ directory, quotaBytes: 8192 });
  assert.equal(result.status, 0);
  assert.equal(result.report.calibration.peakBytes, 8192);
  assert.equal(result.report.calibration.finalBytes, 0);
  const denied = result.report.calibration.events.find((event) => event.rejected === "ENOSPC");
  assert.equal(denied.operation, "writeFile");
  assert.equal(denied.writeOrdinal, 3);
  assert.equal(denied.beforeBytes, 8192);
  assert.equal(denied.afterBytes, 8192);
  assert.equal(denied.projectedBytes, 8193);
  assert.equal(result.report.calibration.callbackMutationRejected, "ERR_V8_QUOTA_UNOBSERVED_IO");
  assert.equal(result.report.calibration.concurrentMutationRejected, "ERR_V8_QUOTA_CONCURRENT_IO");
  const native = result.report.calibration.events.filter((event) => event.nativeCleanup);
  assert.ok(native.length > 0, "the platform's native rm cleanup was observed");
  for (const event of native) {
    const parent = result.report.calibration.events.find(
      (item) => item.ordinal === event.parentOrdinal
    );
    assert.equal(parent.operation, "rm");
    assert.ok(["unlink", "rmdir"].includes(event.operation));
    assert.ok(event.afterBytes <= event.beforeBytes);
    assert.ok(event.afterBytes <= result.report.calibration.quotaBytes);
    assert.ok(event.member !== ".." && !event.member.startsWith("../"));
  }
});

test("V8 disk quota seam covers the actual preparer's fs/promises imports", async () => {
  const source = await readFile(
    new URL("../../../scripts/ci/prepare-v8-coverage.mjs", import.meta.url),
    "utf8"
  );
  const match = source.match(/import\s*\{([^}]+)\}\s*from\s*"node:fs\/promises"/);
  assert.ok(match, "a new I/O import style requires an explicit quota calibration");
  const readOnly = new Set([
    "access",
    "lstat",
    "stat",
    "statfs",
    "readFile",
    "readdir",
    "realpath",
  ]);
  const covered = new Set(monitoredPromises);
  for (const declaration of match[1].split(",")) {
    const name = declaration.trim().split(/\s+as\s+/)[0];
    assert.ok(readOnly.has(name) || covered.has(name), `uncalibrated filesystem API ${name}`);
  }
  assert.doesNotMatch(
    source,
    /import\s+\w+\s+from\s+["']node:fs(?:\/promises)?["']/,
    "a new namespace I/O strategy needs its own coverage contract"
  );
});
