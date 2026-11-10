import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { load as parseYaml } from "js-yaml";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const sha = "1".repeat(40);
const workflowSha = "3".repeat(40);
const hash = (value) => createHash("sha256").update(value).digest("hex");
const names = ["unit-1", "unit-2", "integration-1", "integration-2", "vitest"];
const log = "Tests 5 passed\n";
const command = (name) => ({
  script: name.startsWith("unit-")
    ? "test:unit:ci:shard"
    : name.startsWith("integration-")
      ? "test:integration:ci"
      : "test:vitest+test:vitest:ui",
  shard: name === "vitest" ? "" : `${name.split("-")[1]}/2`,
});

// Public observer JSON + exit, with only unrelated external commands substituted.
function observe(mutate = () => {}, { extra = false, workflow = workflowSha } = {}) {
  mkdirSync(join(root, "_artifacts"), { recursive: true });
  const dir = mkdtempSync(join(root, "_artifacts/suite-provenance-"));
  try {
    for (const path of [
      "scripts/quality",
      "scripts/ci",
      "config/quality",
      ".github/workflows",
      "bin",
      "suites",
    ])
      mkdirSync(join(dir, path), { recursive: true });
    writeFileSync(join(dir, "package.json"), '{"type":"commonjs"}');
    writeFileSync(join(dir, "package-lock.json"), "{}");
    for (const file of ["validate-release-green.mjs", "gate-process.mjs"])
      copyFileSync(join(root, "scripts/quality", file), join(dir, "scripts/quality", file));
    writeFileSync(
      join(dir, "config/quality/quality-baseline.json"),
      JSON.stringify({
        metrics: { cognitiveComplexity: { value: 0 }, eslintWarnings: { value: 0 } },
      })
    );
    writeFileSync(
      join(dir, ".github/workflows/ci.yml"),
      `jobs:
  test-unit:
    strategy: {matrix: {shard: [1, 2]}}
    steps:
      - env: {TEST_SHARD: "\${{ matrix.shard }}/2"}
  test-integration:
    strategy: {matrix: {shard: [1, 2]}}
    steps:
      - env: {TEST_SHARD: "\${{ matrix.shard }}/2"}
`
    );
    const executable = (name, body) =>
      writeFileSync(join(dir, "bin", name), `#!${process.execPath}\n${body}`, { mode: 0o755 });
    executable("git", `console.log("${sha}");`);
    executable("npx", 'console.log("[]");');
    executable(
      "npm",
      `
      if(process.argv[3] === "check:complexity-ratchets") console.log("complexity=0\\ncognitiveComplexity=0\\n[complexity] OK — 0 violações (baseline 0)\\n[cognitive-complexity] OK — 0 violações (baseline 0)");
      if(process.argv[3] === "check:workflows") console.log("workflowAuditState=MEASURED\\nworkflowFindings=0\\nprovenanceRunnerFindings=0\\nscheduledGuardFindings=0");
    `
    );
    for (const name of names) {
      const receipt = {
        schemaVersion: 1,
        name,
        code: 0,
        detail: "pass",
        candidateSha: sha,
        workflowSha,
        runId: "101",
        runAttempt: "2",
        nodeVersion: process.version,
        lockfileSha256: hash("{}"),
        logSha256: hash(log),
        ...command(name),
      };
      if (name === "unit-1") mutate(receipt);
      writeFileSync(join(dir, "suites", `${name}.json`), JSON.stringify(receipt));
      writeFileSync(join(dir, "suites", `${name}.log`), log);
    }
    if (extra)
      writeFileSync(
        join(dir, "suites/duplicate.json"),
        readFileSync(join(dir, "suites/unit-1.json"))
      );
    const result = spawnSync(
      process.execPath,
      [
        join(dir, "scripts/quality/validate-release-green.mjs"),
        "--json",
        "--suites-from",
        join(dir, "suites"),
        "--suites-workflow-sha",
        workflow,
      ],
      {
        cwd: dir,
        encoding: "utf8",
        timeout: 20000,
        env: {
          ...process.env,
          PATH: join(dir, "bin"),
          GITHUB_RUN_ID: "101",
          GITHUB_RUN_ATTEMPT: "2",
          GITHUB_OUTPUT: "",
        },
      }
    );
    assert.equal(result.error, undefined);
    const report = JSON.parse(result.stdout);
    assert.deepEqual(
      report.hardFailures.filter(
        (entry) => !["unit", "integration", "vitest", "hosted-suites"].includes(entry.id)
      ),
      [],
      result.stderr
    );
    return { status: result.status, report };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test(
  "the observer rejects a successful hosted suite from a different candidate",
  { skip: process.platform === "win32" },
  () => {
    const result = observe((receipt) => {
      receipt.candidateSha = "2".repeat(40);
    });
    assert.equal(result.status, 1);
    assert.equal(result.report.releaseGreen, false);
  }
);

test(
  "the observer rejects a successful hosted suite from an earlier run attempt",
  { skip: process.platform === "win32" },
  () => {
    const result = observe((receipt) => {
      receipt.runAttempt = "1";
    });
    assert.equal(result.status, 1);
    assert.equal(result.report.releaseGreen, false);
  }
);

test(
  "the observer rejects a receipt whose retained log does not match its hash",
  { skip: process.platform === "win32" },
  () => {
    const result = observe((receipt) => {
      receipt.logSha256 = "f".repeat(64);
    });
    assert.equal(result.status, 1);
    assert.equal(result.report.releaseGreen, false);
  }
);

test(
  "an extra or duplicated receipt cannot be silently discarded",
  { skip: process.platform === "win32" },
  () => {
    const result = observe(() => {}, { extra: true });
    assert.equal(result.status, 1);
    assert.equal(result.report.releaseGreen, false);
  }
);

test(
  "an empty exit-code argument cannot become a successful receipt",
  { skip: process.platform === "win32" },
  () => {
    const result = writeReceipt({ code: "" });
    assert.notEqual(result.status, 0);
    assert.equal(result.receipt, undefined);
  }
);

test(
  "the writer cannot certify a suite without a readable nonempty log",
  { skip: process.platform === "win32" },
  () => {
    const result = writeReceipt({ missingLog: true });
    assert.notEqual(result.status, 0);
    assert.equal(result.receipt, undefined);
  }
);

function writeReceipt({ code = "0", missingLog = false, context = true } = {}) {
  const dir = mkdtempSync(join(tmpdir(), "hosted-suite-writer-"));
  try {
    mkdirSync(join(dir, "bin"));
    writeFileSync(join(dir, "bin/git"), `#!${process.execPath}\nconsole.log("${sha}");`, {
      mode: 0o755,
    });
    writeFileSync(join(dir, "package-lock.json"), "{}");
    if (!missingLog) writeFileSync(join(dir, "suite.log"), log);
    const result = spawnSync(
      process.execPath,
      [
        join(root, "scripts/ci/release-green-suite.mjs"),
        "unit-1",
        code,
        "suite.log",
        "out",
        workflowSha,
        "test:unit:ci:shard",
        "1/2",
      ],
      {
        cwd: dir,
        encoding: "utf8",
        timeout: 10000,
        env: {
          ...process.env,
          PATH: join(dir, "bin"),
          GITHUB_RUN_ID: context ? "101" : "",
          GITHUB_RUN_ATTEMPT: "2",
        },
      }
    );
    let receipt, evidenceLog;
    try {
      receipt = JSON.parse(readFileSync(join(dir, "out/unit-1.json"), "utf8"));
    } catch {}
    try {
      evidenceLog = readFileSync(join(dir, "out/unit-1.log"), "utf8");
    } catch {}
    return { ...result, receipt, evidenceLog };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test(
  "the suite writer binds JSON and retained log to the actual execution identity",
  { skip: process.platform === "win32" },
  () => {
    const result = writeReceipt();
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.receipt.candidateSha, sha);
    assert.equal(result.receipt.workflowSha, workflowSha);
    assert.equal(result.receipt.runId, "101");
    assert.equal(result.receipt.runAttempt, "2");
    assert.equal(result.receipt.nodeVersion, process.version);
    assert.equal(result.receipt.lockfileSha256, hash("{}"));
    assert.equal(result.receipt.logSha256, hash(log));
    assert.equal(result.receipt.script, "test:unit:ci:shard");
    assert.equal(result.receipt.shard, "1/2");
    assert.equal(result.evidenceLog, log);
  }
);

test(
  "complete matching receipts retain a passing observer verdict",
  { skip: process.platform === "win32" },
  () => {
    const result = observe();
    assert.equal(result.status, 0);
    assert.equal(result.report.releaseGreen, true);
  }
);

test(
  "the public observer requires the workflow commit argument for hosted receipts",
  { skip: process.platform === "win32" },
  () => {
    const result = observe(() => {}, { workflow: "" });
    assert.equal(result.status, 1);
    assert.equal(result.report.releaseGreen, false);
  }
);

test(
  "the hosted job fails when its receipt writer cannot persist evidence",
  { skip: process.platform === "win32" },
  () => {
    const dir = mkdtempSync(join(tmpdir(), "hosted-suite-shell-"));
    try {
      for (const [name, body] of [
        ["npm", 'console.log("test passed");'],
        ["node", "process.exit(23);"],
      ]) {
        writeFileSync(join(dir, name), `#!${process.execPath}\n${body}`, { mode: 0o755 });
      }
      const workflow = parseYaml(
        readFileSync(join(root, ".github/workflows/nightly-release-green.yml"), "utf8")
      );
      const step = workflow.jobs.suites.steps.find((item) =>
        item.run?.includes("scripts/ci/release-green-suite.mjs")
      );
      const result = spawnSync("bash", ["-c", step.run], {
        cwd: dir,
        encoding: "utf8",
        timeout: 10000,
        env: {
          ...process.env,
          PATH: `${dir}:${process.env.PATH}`,
          NAME: "unit-1",
          SUITE: "test:unit:ci:shard",
          TEST_SHARD: "1/8",
          GITHUB_WORKFLOW_SHA: workflowSha,
        },
      });
      assert.equal(result.error, undefined);
      assert.equal(result.status, 23, result.stdout + result.stderr);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }
);

for (const [key, value] of Object.entries({
  schemaVersion: 0,
  runId: "100",
  workflowSha: "4".repeat(40),
  nodeVersion: "v24.0.0",
  lockfileSha256: "0".repeat(64),
  script: "test:unit:fast",
  shard: "1/8",
  code: 256,
})) {
  test(
    `receipt ${key} mismatch is not a successful execution`,
    { skip: process.platform === "win32" },
    () => {
      const result = observe((receipt) => {
        receipt[key] = value;
      });
      assert.equal(result.status, 1);
      assert.equal(result.report.releaseGreen, false);
    }
  );
}

test(
  "a complete failing suite stays a failure and missing context cannot write a receipt",
  { skip: process.platform === "win32" },
  () => {
    assert.equal(
      observe((receipt) => {
        receipt.code = 1;
        receipt.detail = "failed assertion";
      }).status,
      1
    );
    const result = writeReceipt({ context: false });
    assert.notEqual(result.status, 0);
    assert.equal(result.receipt, undefined);
  }
);
