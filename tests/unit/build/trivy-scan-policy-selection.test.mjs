import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { selectTrivyScanPolicy } from "../../../scripts/ci/prepare-trivy-scan-policy.mjs";

// Explicit scoped fixture; the branch policy below may retire any reviewed entries.
const reviewed = JSON.stringify({
  vulnerabilities: [
    {
      id: "CVE-2026-118764",
      paths: ["usr/local/lib/node_modules/npm/node_modules/minimatch/package.json"],
      expired_at: "2026-12-02T00:00:00Z",
      statement:
        "npm 12.2.1 bundles minimatch 10.2.5. Scope follows Trivy alert 1209 at commit a76457885742e2e056d9a4a41d66a7cc35da53a9. Image/Node 26 validation remains required before removing this exception. Tracking: https://github.com/cheaper-inference/OmniRoute/issues/18765",
    },
    {
      id: "CVE-2026-118773",
      paths: ["usr/local/lib/node_modules/npm/node_modules/glob/package.json"],
      expired_at: "2026-12-02T00:00:00Z",
      statement:
        "npm 12.2.1 bundles glob 13.0.6. Scope follows Trivy alert 1208 at commit a76457885742e2e056d9a4a41d66a7cc35da53a9. Image/Node 26 validation remains required before removing this exception. Tracking: https://github.com/cheaper-inference/OmniRoute/issues/18765",
    },
  ],
});
const configured = fs.readFileSync(new URL("../../../.trivyignore.yaml", import.meta.url), "utf8");
const before = Date.parse("2026-12-01T23:59:59.999Z");
const expired = Date.parse("2026-12-02T00:00:00Z");
const cli = fileURLToPath(
  new URL("../../../scripts/ci/prepare-trivy-scan-policy.mjs", import.meta.url)
);

test("a candidate with the reviewed IDs, paths, deadline and issue keeps the two exceptions", () => {
  const result = selectTrivyScanPolicy(reviewed, reviewed, { now: before });
  assert.equal(result.mode, "reviewed-exceptions");
  assert.deepEqual(result.policy, JSON.parse(reviewed));
});

test("an old tag without policy is scanned without exceptions even after unused policy expiry", () => {
  for (const now of [before, expired, Date.parse("2027-01-01T00:00:00Z")]) {
    assert.deepEqual(selectTrivyScanPolicy(reviewed, null, { now }), {
      mode: "no-exceptions",
      policy: { vulnerabilities: [] },
    });
  }
});

test("invalid reviewed configuration is an error even when the candidate policy is absent", () => {
  assert.throws(() => selectTrivyScanPolicy("{", null, { now: before }), /valid JSON/);
  assert.throws(() => selectTrivyScanPolicy("{}", null, { now: before }), /Only vulnerability/);
});

test("present but invalid candidate policy cannot silently fall back to an empty policy", () => {
  assert.throws(() => selectTrivyScanPolicy(reviewed, "{", { now: before }), /valid JSON/);
  for (const mutate of [
    (entry) => {
      entry.id = "CVE-2026-999999";
    },
    (entry) => {
      entry.paths = ["**/package.json"];
    },
    (entry) => {
      entry.expired_at = "2027-12-02T00:00:00Z";
    },
    (entry) => {
      entry.statement = "https://github.com/cheaper-inference/OmniRoute/issues/18766";
    },
  ]) {
    const candidate = JSON.parse(reviewed);
    mutate(candidate.vulnerabilities[0]);
    assert.throws(() =>
      selectTrivyScanPolicy(reviewed, JSON.stringify(candidate), { now: before })
    );
  }
});

test("expiry blocks only the reviewed exception set actually selected for a scan", () => {
  assert.throws(
    () => selectTrivyScanPolicy(reviewed, reviewed, { now: expired }),
    /policy has expired/
  );
});

test("format and entry order do not change the proven exception scope", () => {
  const candidate = JSON.parse(reviewed);
  candidate.vulnerabilities.reverse();
  const result = selectTrivyScanPolicy(reviewed, JSON.stringify(candidate), { now: before });
  assert.equal(result.mode, "reviewed-exceptions");
  assert.deepEqual(result.policy, JSON.parse(reviewed));
});

function tempFiles(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "trivy-selection-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const files = {
    dir,
    reviewed: path.join(dir, "reviewed.yaml"),
    candidate: path.join(dir, "candidate.yaml"),
    output: path.join(dir, "effective.yaml"),
    clock: path.join(dir, "test-clock.mjs"),
  };
  fs.writeFileSync(files.reviewed, reviewed);
  return files;
}

test("the real selector CLI emits an empty scan policy for a tag without one, with a future test clock", (t) => {
  const files = tempFiles(t);
  fs.writeFileSync(files.clock, `Date.now = () => ${expired};\n`);
  const child = spawnSync(
    process.execPath,
    ["--import", files.clock, cli, files.reviewed, files.candidate, files.output],
    {
      cwd: files.dir,
      env: { PATH: path.dirname(process.execPath), TZ: "UTC" },
      encoding: "utf8",
      timeout: 5000,
      maxBuffer: 65536,
    }
  );
  assert.equal(child.error, undefined);
  assert.equal(child.status, 0);
  assert.deepEqual(JSON.parse(fs.readFileSync(files.output, "utf8")), { vulnerabilities: [] });
  assert.deepEqual(JSON.parse(child.stdout), {
    mode: "no-exceptions",
    exceptions: 0,
    imageScanned: false,
  });
});

test("the real selector CLI fails for a present invalid policy and emits no scan policy", (t) => {
  const files = tempFiles(t);
  fs.writeFileSync(files.candidate, "{}");
  const child = spawnSync(process.execPath, [cli, files.reviewed, files.candidate, files.output], {
    cwd: files.dir,
    env: { PATH: path.dirname(process.execPath), TZ: "UTC" },
    encoding: "utf8",
    timeout: 5000,
    maxBuffer: 65536,
  });
  assert.equal(child.error, undefined);
  assert.equal(child.status, 1);
  assert.equal(fs.existsSync(files.output), false);
  assert.match(child.stderr, /Trivy policy preparation failed/);
});

test("the current branch uses exactly its configured exception subset", () => {
  const policy = JSON.parse(configured);
  const result = selectTrivyScanPolicy(configured, configured, { now: before });
  assert.deepEqual(result.policy, policy);
  assert.equal(
    result.mode,
    policy.vulnerabilities.length ? "reviewed-exceptions" : "no-exceptions"
  );
});

test("matching one-exception policies remain scoped and matching empty policies never expire", () => {
  const one = JSON.parse(reviewed);
  one.vulnerabilities.pop();
  const source = JSON.stringify(one);
  assert.deepEqual(selectTrivyScanPolicy(source, source, { now: before }).policy, one);
  assert.throws(
    () => selectTrivyScanPolicy(source, source, { now: expired }),
    /policy has expired/
  );
  const empty = JSON.stringify({ vulnerabilities: [] });
  assert.deepEqual(selectTrivyScanPolicy(empty, empty, { now: expired }), {
    mode: "no-exceptions",
    policy: { vulnerabilities: [] },
  });
});

test("different valid subsets cannot borrow exceptions from another workflow revision", () => {
  const one = JSON.parse(reviewed);
  one.vulnerabilities.pop();
  const empty = JSON.stringify({ vulnerabilities: [] });
  for (const [workflow, candidate] of [
    [empty, reviewed],
    [reviewed, empty],
    [reviewed, JSON.stringify(one)],
  ]) {
    assert.throws(
      () => selectTrivyScanPolicy(workflow, candidate, { now: before }),
      /does not match/
    );
  }
});
