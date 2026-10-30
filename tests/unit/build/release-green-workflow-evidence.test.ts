import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = new URL("../../../", import.meta.url);
const verifier = fileURLToPath(new URL("scripts/ci/release-green-result.mjs", root));
const sha = "1".repeat(40);
const baseSha = "2".repeat(40);

function verify(check: Record<string, unknown>) {
  const dir = mkdtempSync(join(tmpdir(), "omni-green-evidence-"));
  try {
    const path = join(dir, "report.json");
    writeFileSync(
      path,
      JSON.stringify({
        schemaVersion: 1,
        candidateSha: sha,
        profile: "full",
        releaseGreen: true,
        hardFailures: [],
        checks: [{ id: "typecheck", kind: "hard", ok: true }, check],
      })
    );
    const result = spawnSync(process.execPath, [verifier, path, "0", sha, "schedule"], {
      encoding: "utf8",
      env: { ...process.env, GITHUB_OUTPUT: "" },
      timeout: 10_000,
    });
    assert.equal(result.error, undefined);
    return { status: result.status, report: JSON.parse(result.stdout) };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test("the public verifier rejects missing scanners reported as nonblocking drift", () => {
  const result = verify({
    id: "workflow-lint",
    kind: "drift",
    ok: false,
    detail: "workflowFindings=INCOMPLETE",
  });
  assert.equal(result.status, 1);
  assert.equal(result.report.verdict, "UNKNOWN");
  assert.equal(result.report.evidenceState, "INCOMPLETE");
});

test("both workflow check identities require an explicit measured evidence state", () => {
  for (const id of ["workflow-lint", "check:workflows"]) {
    for (const evidenceState of [undefined, "INCOMPLETE", "UNKNOWN", "", "COMPLETE"]) {
      for (const ok of [true, false]) {
        const result = verify({ id, kind: "drift", ok, evidenceState });
        assert.equal(result.status, 1);
        assert.equal(result.report.verdict, "UNKNOWN");
        assert.equal(result.report.evidenceState, "INCOMPLETE");
      }
    }
  }
});

// Exercise the real observer and scanner wrapper. Only external commands are
// fixtures; unrelated expensive npm gates do not need to run to test this boundary.
function observe({
  scanners = "missing",
  findings = 0,
  baseline = 0,
  workflow = "on: push\njobs:\n  lint:\n    runs-on: ubuntu-latest\n    steps:\n      - run: npm run check:workflows -- --ratchet\n",
} = {}) {
  const artifacts = fileURLToPath(new URL("_artifacts/", root));
  mkdirSync(artifacts, { recursive: true });
  const dir = mkdtempSync(join(artifacts, "workflow-evidence-test-"));
  try {
    writeFileSync(
      join(dir, "package.json"),
      JSON.stringify({
        type: "commonjs",
        scripts: { "check:workflows": "node scripts/check/check-workflows.mjs" },
      })
    );
    for (const path of [
      "scripts/quality",
      "scripts/dev",
      "scripts/i18n",
      "scripts/check",
      "config/quality",
      ".github/workflows",
      "bin",
    ]) {
      mkdirSync(join(dir, path), { recursive: true });
    }
    for (const name of [
      "validate-release-green.mjs",
      "gate-process.mjs",
      "eslint-measurement.mjs",
      "release-green-static-profile.mjs",
    ]) {
      cpSync(new URL(`scripts/quality/${name}`, root), join(dir, "scripts/quality", name));
    }
    // Include the static-profile comparison and gate-process inspection dependencies.
    for (const path of [
      "scripts/i18n/resolve-ui-diff-base.mjs",
      "scripts/check/openapiBaseline.mjs",
      "scripts/dev/resource-budget-process.mjs",
    ]) {
      cpSync(new URL(path, root), join(dir, path));
    }
    writeFileSync(
      join(dir, "config/quality/release-green-static-profile.json"),
      JSON.stringify({
        schemaVersion: 1,
        sourceJobs: ["lint"],
        exclusions: [],
        gates: [
          {
            id: "check:workflows",
            job: "lint",
            args: ["run", "check:workflows", "--", "--ratchet"],
            kind: "drift",
            command: "node scripts/check/check-workflows.mjs",
          },
        ],
      })
    );
    writeFileSync(
      join(dir, ".github/workflows/quality.yml"),
      "on: push\njobs:\n  fast:\n    steps:\n      - run: |\n          gates=(\n            workflows\n          )\n          ratchet_gates=(\n            workflows\n          )\n"
    );
    writeFileSync(
      join(dir, "config/quality/quality-baseline.json"),
      JSON.stringify({
        metrics: {
          cognitiveComplexity: { value: 0 },
          eslintWarnings: { value: 0 },
          zizmorFindings: { value: baseline },
        },
      })
    );
    writeFileSync(join(dir, ".github/workflows/ci.yml"), workflow);
    const bin = join(dir, "bin");
    symlinkSync("/bin/sh", join(bin, "sh"));
    if (scanners !== "missing") {
      writeFileSync(join(bin, "actionlint"), `#!${process.execPath}\n`, { mode: 0o755 });
      const output =
        scanners === "malformed"
          ? "not JSON"
          : JSON.stringify(Array.from({ length: findings }, () => ({ ident: "unpinned-uses" })));
      writeFileSync(
        join(bin, "zizmor"),
        `#!${process.execPath}\n` +
          `if (process.argv.includes("--version")) { console.log("zizmor 1.25.2"); process.exit(0); }\n` +
          `console.log(${JSON.stringify(output)});\n` +
          `process.exit(${scanners === "failed" ? 2 : 0});\n`,
        { mode: 0o755 }
      );
    }
    const scanner = fileURLToPath(new URL("scripts/check/check-workflows.mjs", root));
    writeFileSync(
      join(bin, "npm"),
      `#!${process.execPath}\n` +
        `const { spawnSync } = require("node:child_process");\n` +
        `if (process.argv[3] === "check:workflows") {\n` +
        `  const result = spawnSync(process.execPath, [${JSON.stringify(scanner)}, "--ratchet", "--quiet"], { stdio: "inherit" });\n` +
        `  process.exit(result.status ?? 1);\n` +
        `}\n` +
        `if (process.argv[3] === "check:complexity-ratchets") console.log("complexity=0\\ncognitiveComplexity=0\\n[complexity] OK — 0 violações (baseline 0)\\n[cognitive-complexity] OK — 0 violações (baseline 0)");\n`,
      { mode: 0o755 }
    );
    writeFileSync(
      join(bin, "npx"),
      `#!${process.execPath}\nconsole.log(JSON.stringify([{ filePath: "fixture.ts", errorCount: 0, warningCount: 0 }]));\n`,
      { mode: 0o755 }
    );
    writeFileSync(
      join(bin, "git"),
      `#!${process.execPath}\nconsole.log(process.argv.at(-1) === "${baseSha}^{commit}" ? "${baseSha}" : "${sha}");\n`,
      {
        mode: 0o755,
      }
    );
    const result = spawnSync(
      process.execPath,
      [join(dir, "scripts/quality/validate-release-green.mjs"), "--quick", "--full-ci", "--json"],
      {
        cwd: dir,
        env: {
          ...process.env,
          PATH: bin,
          GITHUB_OUTPUT: "",
          // Pin a valid synthetic comparison; ambient Actions events are unrelated to this fixture.
          I18N_BASE_SHA: baseSha,
          I18N_BASE_TIP_SHA: baseSha,
          I18N_CANDIDATE_SHA: sha,
          I18N_COMPARISON_SOURCE: "fixture:workflow-evidence",
          I18N_COMPARISON_SCOPE: "candidate",
        },
        encoding: "utf8",
        timeout: 20_000,
      }
    );
    assert.equal(result.error, undefined);
    assert.notEqual(result.stdout.trim(), "", result.stderr);
    return { status: result.status, report: JSON.parse(result.stdout) };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test(
  "the observer JSON and exit reject missing scanners in curated and full-ci checks",
  {
    skip: process.platform === "win32",
  },
  () => {
    const result = observe();
    assert.deepEqual(
      result.report.hardFailures.filter(
        (entry: { id: string }) => !["workflow-lint", "check:workflows"].includes(entry.id)
      ),
      [],
      "unrelated fixture gates must pass"
    );
    assert.equal(result.status, 1);
    assert.equal(result.report.releaseGreen, false);
    assert.equal(result.report.candidateSha, sha);
    for (const id of ["workflow-lint", "check:workflows"]) {
      const check = result.report.checks.find((entry: { id: string }) => entry.id === id);
      assert.equal(check.kind, "hard");
      assert.equal(check.ok, false);
      assert.equal(check.evidenceState, "INCOMPLETE");
      assert.ok(result.report.hardFailures.some((entry: { id: string }) => entry.id === id));
    }
  }
);

test(
  "complete zero findings, frozen debt and measured drift retain the observer policy",
  {
    skip: process.platform === "win32",
  },
  () => {
    for (const [findings, baseline, ok] of [
      [0, 0, true],
      [1, 1, true],
      [1, 0, false],
    ] as const) {
      const result = observe({ scanners: "valid", findings, baseline });
      assert.equal(result.status, 0);
      assert.equal(result.report.releaseGreen, true);
      assert.deepEqual(result.report.hardFailures, []);
      for (const id of ["workflow-lint", "check:workflows"]) {
        const check = result.report.checks.find((entry: { id: string }) => entry.id === id);
        assert.equal(check.kind, "drift");
        assert.equal(check.ok, ok);
        assert.equal(check.evidenceState, "MEASURED");
        const verified = verify(check);
        assert.equal(verified.status, 0);
        assert.equal(verified.report.verdict, "PASS");
      }
    }
  }
);

test(
  "malformed output or a crashed scanner cannot become measured workflow drift",
  {
    skip: process.platform === "win32",
  },
  () => {
    for (const scanners of ["malformed", "failed"]) {
      const result = observe({ scanners });
      assert.equal(result.status, 1);
      assert.equal(result.report.releaseGreen, false);
      for (const id of ["workflow-lint", "check:workflows"]) {
        const check = result.report.checks.find((entry: { id: string }) => entry.id === id);
        assert.equal(check.kind, "hard");
        assert.equal(check.evidenceState, "INCOMPLETE");
        assert.equal(verify(check).status, 1);
      }
    }
  }
);

test(
  "a measured scheduled-run policy violation is a hard failure, not ratchet drift",
  {
    skip: process.platform === "win32",
  },
  () => {
    const result = observe({
      scanners: "valid",
      workflow:
        "on:\n  schedule:\n    - cron: '0 0 * * *'\njobs:\n  lint:\n    runs-on: ubuntu-latest\n    steps:\n      - run: npm run check:workflows -- --ratchet\n",
    });
    assert.equal(result.status, 1);
    assert.equal(result.report.releaseGreen, false);
    for (const id of ["workflow-lint", "check:workflows"]) {
      const check = result.report.checks.find((entry: { id: string }) => entry.id === id);
      assert.equal(check.kind, "hard");
      assert.equal(check.ok, false);
      assert.equal(check.evidenceState, "MEASURED");
    }
  }
);

test(
  "a measured self-hosted provenance violation remains a hard workflow failure",
  {
    skip: process.platform === "win32",
  },
  () => {
    const result = observe({
      scanners: "valid",
      workflow:
        "on: push\njobs:\n  lint:\n    runs-on: self-hosted\n    steps:\n      - run: npm publish --provenance\n      - run: npm run check:workflows -- --ratchet\n",
    });
    assert.equal(result.status, 1);
    assert.equal(result.report.releaseGreen, false);
    for (const id of ["workflow-lint", "check:workflows"]) {
      const check = result.report.checks.find((entry: { id: string }) => entry.id === id);
      assert.equal(check.kind, "hard");
      assert.equal(check.ok, false);
      assert.equal(check.evidenceState, "MEASURED");
    }
  }
);
