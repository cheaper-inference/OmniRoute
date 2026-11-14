/**
 * `--from-tarball` wiring: the gate must read the path it was given, reject an option in
 * place of the path, and describe the real tarball (name, size, entry count) so the
 * policy sees the same shape as the dry-run report.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { resolveTarballArg, runTarballReport } from "../../scripts/build/tarballPackReport.ts";

test("resolveTarballArg reads the path and rejects a missing value or another option", () => {
  const script = ["node", "validate-pack-artifact.ts"];
  assert.equal(resolveTarballArg(script), undefined);
  assert.equal(resolveTarballArg([...script, "--from-tarball", "artifact.tgz"]), "artifact.tgz");
  assert.throws(() => resolveTarballArg([...script, "--from-tarball"]), /packed \.tgz/);
  assert.throws(
    () => resolveTarballArg([...script, "--from-tarball", "--policy-only"]),
    /packed \.tgz/
  );
  assert.throws(
    () => resolveTarballArg([...script, "--from-tarball", "-C/tmp"]),
    /packed \.tgz/,
    "a path never starts with '-', so the next argument is an option, not an artifact"
  );
});

test("runTarballReport describes the tarball with the dry-run report shape", () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-tarball-report-"));
  try {
    const pkg = join(root, "package");
    mkdirSync(join(pkg, "dist"), { recursive: true });
    writeFileSync(join(pkg, "package.json"), "{}\n");
    writeFileSync(join(pkg, "dist", "a.mjs"), "export default 1;\n");

    const tarball = join(root, "artifact.tgz");
    execFileSync("tar", ["-czf", tarball, "-C", root, "package"]);

    const report = runTarballReport(tarball);
    assert.equal(report.filename, "artifact.tgz");
    assert.deepEqual(report.files.map((file) => file.path).sort(), ["dist/a.mjs", "package.json"]);
    assert.equal(report.entryCount, 2);
    assert.ok(report.size > 0, "the report must carry the artifact size");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
