import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("../../", import.meta.url));
const sha = "a".repeat(40);
const key = { gate_id: "lint", suite_id: null, shard_index: null, shard_total: null };

function fixture(t) {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-acceptance-evidence-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const evidenceRoot = join(dir, "evidence");
  mkdirSync(join(evidenceRoot, "logs"), { recursive: true });
  mkdirSync(join(dir, "manifests"));
  const log = "lint completed with exit 0\n";
  writeFileSync(join(evidenceRoot, "logs", "lint.log"), log);
  const plan = {
    required_gates: [key],
    identity: {
      repository: "example/repo",
      run_id: "123",
      run_attempt: 1,
      workflow: "release-acceptance.yml",
      trigger: "workflow_dispatch",
      scope: "release",
      requested_ref: "refs/heads/release/test",
      base_sha: sha,
      candidate_sha: sha,
      tested_sha: sha,
    },
    artifact: null,
  };
  const gate = {
    ...key,
    tested_sha: sha,
    run_id: "123",
    run_attempt: 1,
    command_id: "lint",
    gate_type: "static",
    status: "PASS",
    cause: null,
    exit_code: 0,
    duration_ms: 1,
    evidence: [
      {
        artifact_id: "logs",
        member: "lint.log",
        algorithm: "sha256",
        digest: createHash("sha256").update(log).digest("hex"),
      },
    ],
  };
  return {
    dir,
    evidenceRoot,
    gate,
    run({ withRoot = true } = {}) {
      writeFileSync(join(dir, "plan.json"), JSON.stringify(plan));
      writeFileSync(join(dir, "manifests", "lint.json"), JSON.stringify({ gates: [gate] }));
      const result = spawnSync(
        process.execPath,
        [
          "scripts/quality/validate-release-acceptance.mjs",
          "--plan",
          join(dir, "plan.json"),
          "--manifests",
          join(dir, "manifests"),
          "--out",
          join(dir, "report.json"),
          ...(withRoot ? ["--evidence-root", evidenceRoot] : []),
        ],
        { cwd: root, encoding: "utf8", timeout: 60000 }
      );
      assert.equal(result.error, undefined, result.stderr);
      return { ...result, report: JSON.parse(readFileSync(join(dir, "report.json"), "utf8")) };
    },
  };
}

test("acceptance CLI rejects a changed log despite a well-formed declared digest", (t) => {
  const f = fixture(t);
  writeFileSync(join(f.evidenceRoot, "logs", "lint.log"), "different execution\n");
  const result = f.run();
  assert.equal(result.status, 2, "a declared digest is not a verified file");
  assert.equal(result.report.verdict, "UNVERIFIED");
  assert.ok(result.report.evidence_errors.some((e) => e.code === "evidence_digest_mismatch"));
});

test("matching retained bytes verify the supplied plan, not a complete release", (t) => {
  const result = fixture(t).run();
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.report.verdict, "VERIFIED");
  assert.equal(result.report.releaseAcceptance, false);
  assert.deepEqual(result.report.evidence_errors, []);
});

test("a manifest without an evidence root cannot become verified", (t) => {
  const result = fixture(t).run({ withRoot: false });
  assert.equal(result.status, 2);
  assert.equal(result.report.verdict, "UNVERIFIED");
  assert.ok(result.report.evidence_errors.some((e) => e.code === "evidence_root_missing"));
});

test("a missing file cannot become verified", (t) => {
  const f = fixture(t);
  rmSync(join(f.evidenceRoot, "logs", "lint.log"));
  const result = f.run();
  assert.equal(result.status, 2);
  assert.ok(result.report.evidence_errors.some((e) => e.code === "evidence_read_error"));
});

test("an empty evidence list cannot support PASS", (t) => {
  const f = fixture(t);
  f.gate.evidence = [];
  const result = f.run();
  assert.equal(result.status, 2);
  assert.ok(result.report.evidence_errors.some((e) => e.code === "evidence_missing"));
});

for (const [label, field, value] of [
  ["artifact traversal", "artifact_id", "../logs"],
  ["member traversal", "member", "../logs/lint.log"],
  ["absolute member", "member", "/tmp/lint.log"],
  ["Windows member", "member", "C:\\logs\\lint.log"],
  ["unsupported algorithm", "algorithm", "sha1"],
  ["malformed digest", "digest", "not-a-sha256"],
]) {
  test(`untrusted evidence references reject ${label}`, (t) => {
    const f = fixture(t);
    f.gate.evidence[0][field] = value;
    const result = f.run();
    assert.equal(result.status, 2);
    assert.equal(result.report.verdict, "UNVERIFIED");
    assert.ok(result.report.evidence_errors.some((e) => e.code === "evidence_reference_invalid"));
  });
}

for (const directory of [false, true]) {
  test(`a matching digest cannot admit a ${directory ? "directory" : "file"} symlink`, (t) => {
    const f = fixture(t);
    const outside = join(f.dir, "outside");
    mkdirSync(outside);
    writeFileSync(join(outside, "lint.log"), "lint completed with exit 0\n");
    if (directory) {
      rmSync(join(f.evidenceRoot, "logs"), { recursive: true });
      symlinkSync(outside, join(f.evidenceRoot, "logs"), "dir");
    } else {
      rmSync(join(f.evidenceRoot, "logs", "lint.log"));
      symlinkSync(join(outside, "lint.log"), join(f.evidenceRoot, "logs", "lint.log"));
    }
    const result = f.run();
    assert.equal(result.status, 2);
    assert.ok(result.report.evidence_errors.some((e) => e.code === "evidence_read_error"));
  });
}

test("a file from another run cannot satisfy a stale run receipt", (t) => {
  const f = fixture(t);
  f.gate.run_id = "122";
  const result = f.run();
  assert.equal(result.status, 2);
  assert.ok(result.report.evidence_errors.some((e) => e.code === "identity_mismatch"));
});

test("a real reported gate failure stays FAILED even when its evidence is incomplete", (t) => {
  const f = fixture(t);
  f.gate.status = "FAIL";
  f.gate.exit_code = 1;
  rmSync(join(f.evidenceRoot, "logs", "lint.log"));
  const result = f.run();
  assert.equal(result.status, 1);
  assert.equal(result.report.verdict, "FAILED");
  assert.equal(result.report.releaseAcceptance, false);
  assert.ok(result.report.evidence_errors.some((e) => e.code === "evidence_read_error"));
});
