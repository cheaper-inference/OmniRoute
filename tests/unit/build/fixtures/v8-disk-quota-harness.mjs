import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

export const monitoredPromises = [
  "writeFile",
  "rename",
  "rm",
  "unlink",
  "rmdir",
  "mkdir",
  "mkdtemp",
];
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");

export async function snapshotProducerInputs(options) {
  const files = [];
  for (const [offset, manifest] of options.manifests.entries()) {
    const artifact = join(options.directory, `coverage-shard-${options.runAttempt}-${offset + 1}`);
    for (const path of [
      join(artifact, "manifest.json"),
      ...manifest.inputs.map((input) => join(artifact, "raw", `${input.name}.gz`)),
      ...(manifest.transformEvidence?.entries || []).map((entry) => join(artifact, entry.payload)),
    ])
      files.push({ path, sha256: digest(await readFile(path)) });
  }
  return files;
}

export async function assertProducerInputsUnchanged(files) {
  for (const file of files)
    assert.equal(
      digest(await readFile(file.path)),
      file.sha256,
      "original manifests, gzip and generated proof bytes stay immutable"
    );
}

export function runWithIndependentDiskQuota({ directory, quotaBytes, options = null }) {
  const id = randomUUID();
  const quotaRoot = join(directory, `quota-consumer-${id}`);
  mkdirSync(quotaRoot);
  const outputDirectory = join(quotaRoot, "prepared");
  const config = join(directory, `quota-config-${id}.json`);
  const reportPath = join(directory, `quota-report-${id}.json`);
  writeFileSync(
    config,
    JSON.stringify({ options: options ? { ...options, outputDirectory } : null, reportPath })
  );
  const result = spawnSync(
    process.execPath,
    [
      "--import",
      fileURLToPath(new URL("./v8-disk-quota-preload.mjs", import.meta.url)),
      fileURLToPath(new URL("./v8-disk-quota-driver.mjs", import.meta.url)),
      config,
    ],
    {
      cwd: directory,
      env: {
        ...process.env,
        OMNI_V8_QUOTA_ROOT: quotaRoot,
        OMNI_V8_QUOTA_BYTES: String(quotaBytes),
      },
      encoding: "utf8",
      timeout: 30000,
      maxBuffer: 2 * 1024 * 1024,
    }
  );
  assert.equal(result.error, undefined, "quota subprocess must complete without a harness timeout");
  assert.equal(result.signal, null);
  assert.ok(
    existsSync(reportPath),
    `preload/driver must write independent evidence even on ENOSPC: ${JSON.stringify({
      status: result.status,
      signal: result.signal,
      stderr: String(result.stderr || "").slice(-8192),
    })}`
  );
  const report = JSON.parse(readFileSync(reportPath, "utf8"));
  assert.equal(report.harnessError, undefined, JSON.stringify(report.harnessError));
  assert.equal(report.restored, true);
  assert.equal(
    report.namedExportsRestored,
    true,
    "syncBuiltinESMExports must restore named bindings too"
  );
  assert.equal(report.calibration.finalBytes, 0);
  assert.equal(report.calibration.events.filter((event) => event.rejected === "ENOSPC").length, 1);
  if (report.subject) {
    assert.ok(report.subject.peakBytes <= quotaBytes);
    assert.ok(report.subject.events.every((event) => event.afterBytes <= quotaBytes));
  }
  return { ...result, report, outputDirectory, quotaRoot, reportPath };
}

export async function assertBoundedPreparation(options, { expectedCount, generated = false }) {
  const originals = await snapshotProducerInputs(options);
  const largest = Math.max(
    ...options.manifests.flatMap((manifest) => manifest.inputs.map((input) => input.bytes))
  );
  const result = runWithIndependentDiskQuota({
    directory: options.dir,
    options,
    quotaBytes: largest * 2,
  });
  await assertProducerInputsUnchanged(originals);
  if (result.status !== 0) {
    assert.equal(
      result.report.subjectError?.code,
      "ENOSPC",
      "RED must be real quota exhaustion, not admission/import failure"
    );
    const denied = result.report.subject.events.filter((event) => event.rejected === "ENOSPC");
    assert.equal(denied.length, 1);
    assert.equal(denied[0].operation, "writeFile");
    assert.equal(
      denied[0].writeOrdinal,
      3,
      "the third full materialization exceeds this fixture quota"
    );
    assert.equal(
      denied[0].beforeBytes,
      denied[0].afterBytes,
      "ENOSPC is injected before filesystem growth"
    );
    assert.equal(result.report.subject.finalBytes, 0, "the failed owned staging is removed");
    assert.equal(result.report.outputExists, false, "failed input is never published");
  }
  assert.equal(
    result.status,
    0,
    `consumer must fit its independent peak quota: ${JSON.stringify({
      subjectError: result.report.subjectError,
      peak: result.report.subject?.peakBytes,
      quota: largest * 2,
      rejected: result.report.subject?.events.filter((event) => event.rejected),
    })}`
  );
  assert.equal(result.report.prepared.inputFiles, 8);
  assert.equal(result.report.prepared.shards, 8);
  assert.equal(
    result.report.subject.events.some((event) => event.operation === "rename"),
    true
  );
  let contributed = 0;
  for (const name of await readdir(result.outputDirectory)) {
    const sample = JSON.parse(await readFile(join(result.outputDirectory, name), "utf8"));
    assert.ok(Array.isArray(sample.result), "only native V8 derivatives reach c8");
    for (const script of sample.result) contributed += script.functions[0].ranges[0].count;
  }
  assert.equal(contributed, expectedCount, "all eight original producer contributions survive");
  if (generated) {
    const proofBytes = options.manifests.reduce(
      (sum, manifest) => sum + manifest.transformEvidence.payloadBytes,
      0
    );
    assert.ok(proofBytes > 0);
    assert.equal(result.report.prepared.generatedEvidenceBytes, proofBytes);
    assert.ok(result.report.prepared.layoutProjection.projectedScriptSamples > 0);
  }
}
