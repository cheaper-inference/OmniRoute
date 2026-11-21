import assert from "node:assert/strict";
import {
  createWriteStream,
  existsSync,
  readFileSync,
  renameSync,
  rmSync,
  unlink,
  writeFileSync,
} from "node:fs";
import { mkdir, rename, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { quotaObserver } from "./v8-disk-quota-preload.mjs";

const input = JSON.parse(readFileSync(process.argv[2], "utf8"));
const root = process.env.OMNI_V8_QUOTA_ROOT;
const quota = Number(process.env.OMNI_V8_QUOTA_BYTES);
const report = {
  schemaVersion: 1,
  calibration: null,
  subject: null,
  restored: false,
  namedExportsRestored: false,
};
let phase = "calibration";
try {
  quotaObserver.start("calibration");
  const calibration = join(root, "calibration");
  const unit = Math.floor(quota / 2);
  await mkdir(calibration);
  await writeFile(join(calibration, "one"), Buffer.alloc(unit, 1), { flag: "wx" });
  writeFileSync(join(calibration, "two"), Buffer.alloc(unit, 2), { flag: "wx" });
  let rejected;
  try {
    await writeFile(join(calibration, "three"), Buffer.alloc(quota - unit * 2 + 1), { flag: "wx" });
  } catch (error) {
    rejected = error.code;
  }
  assert.equal(rejected, "ENOSPC");
  assert.equal(existsSync(join(calibration, "three")), false);
  await rename(join(calibration, "one"), join(calibration, "renamed"));
  await rm(join(calibration, "renamed"));
  writeFileSync(join(calibration, "replacement"), Buffer.alloc(unit, 3));
  rmSync(join(calibration, "two"));
  renameSync(calibration, join(root, "calibration-moved"));
  const cleanup = rm(join(root, "calibration-moved"), { recursive: true });
  // The async cleanup context belongs to Node's rm descendants. An unrelated
  // caller must not borrow its permission while the native callbacks are pending.
  let callbackMutationRejected;
  try {
    unlink(join(root, "calibration-moved", "replacement"), () => {});
  } catch (error) {
    callbackMutationRejected = error.code;
  }
  const concurrentWrite = writeFile(join(root, "concurrent-write"), Buffer.alloc(1)).then(
    () => null,
    (error) => error.code
  );
  await cleanup;
  const concurrentMutationRejected = await concurrentWrite;
  assert.equal(callbackMutationRejected, "ERR_V8_QUOTA_UNOBSERVED_IO");
  assert.equal(concurrentMutationRejected, "ERR_V8_QUOTA_CONCURRENT_IO");
  assert.equal(existsSync(join(root, "concurrent-write")), false);
  // A future stream/FileHandle writer must not silently evade the observation.
  assert.throws(() => createWriteStream(join(root, "unsupported")), {
    code: "ERR_V8_QUOTA_UNOBSERVED_IO",
  });
  report.calibration = quotaObserver.stop();
  Object.assign(report.calibration, { callbackMutationRejected, concurrentMutationRejected });
  assert.equal(report.calibration.peakBytes, unit * 2);
  assert.equal(report.calibration.finalBytes, 0);
  const refused = report.calibration.events.filter((event) => event.rejected);
  assert.equal(refused.length, 1);
  assert.equal(refused[0].writeOrdinal, 3);
  assert.equal(refused[0].beforeBytes, unit * 2);
  assert.equal(refused[0].afterBytes, unit * 2);
  assert.ok(refused[0].projectedBytes > quota);
  for (const event of report.calibration.events.filter((item) => item.operation === "rename")) {
    assert.equal(event.beforeBytes, event.afterBytes, "rename cannot duplicate measured bytes");
  }
  if (input.options) {
    phase = "import";
    const { prepareCoverageShards } =
      await import("../../../../scripts/ci/prepare-v8-coverage.mjs");
    phase = "subject";
    quotaObserver.start("subject");
    try {
      report.prepared = await prepareCoverageShards(input.options);
    } catch (error) {
      report.subjectError = {
        code: /^[A-Z][A-Z0-9_]+$/.test(error?.code || "") ? error.code : "SUBJECT_ERROR",
        reason: error?.message === "Packed coverage hash mismatch" ? "packed-hash-mismatch" : null,
      };
      process.exitCode = 1;
    } finally {
      report.subject = quotaObserver.stop();
      report.outputExists = existsSync(input.options.outputDirectory);
    }
  }
} catch (error) {
  report.harnessError = {
    phase,
    code: /^[A-Z][A-Z0-9_]+$/.test(error?.code || "") ? error.code : "HARNESS_ERROR",
  };
  process.exitCode = 2;
} finally {
  report.restored = quotaObserver.restore();
  report.namedExportsRestored = quotaObserver.isOriginal(writeFile, writeFileSync, rename, rm);
  // The observer writes its report only after restoration, outside measured payloads.
  writeFileSync(input.reportPath, JSON.stringify(report, null, 2) + "\n");
}
