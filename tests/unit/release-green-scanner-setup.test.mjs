import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { load } from "js-yaml";

const root = fileURLToPath(new URL("../../", import.meta.url));
const workflow = load(
  readFileSync(join(root, ".github/workflows/nightly-release-green.yml"), "utf8")
);
const posix = { skip: process.platform === "win32" };

// Exercise the real job step and checker, substituting only external processes.
// The target checkout deliberately has no installer: main may predate the workflow.
function prepare(job, scenario = "complete") {
  const sandbox = mkdtempSync(join(tmpdir(), "release-green-scanners-"));
  try {
    const bin = join(sandbox, "external-tools");
    mkdirSync(bin);
    const executable = (name, source) =>
      writeFileSync(join(bin, name), `#!${process.execPath}\n${source}`, { mode: 0o755 });
    executable(
      "git",
      `
      const fs = require("node:fs");
      if (process.argv.slice(2).join(" ") !== "show " + process.env.WORKFLOW_SHA + ":scripts/ci/install-workflow-scanners.sh") process.exit(9);
      process.stdout.write(fs.readFileSync(process.env.QG_INSTALLER));
    `
    );
    executable("uname", 'console.log(process.argv[2] === "-s" ? "Linux" : "x86_64");');
    executable(
      "curl",
      `
      const fs = require("node:fs");
      const args = process.argv.slice(2);
      if (process.env.QG_SCENARIO === "download-failed") process.exit(22);
      const url = args.at(-1);
      if (![
        "https://github.com/rhysd/actionlint/releases/download/v1.7.12/actionlint_1.7.12_linux_amd64.tar.gz",
        "https://github.com/zizmorcore/zizmor/releases/download/v1.25.2/zizmor-x86_64-unknown-linux-gnu.tar.gz"
      ].includes(url)) process.exit(23);
      fs.writeFileSync(args[args.indexOf("--output") + 1], "external archive fixture");
    `
    );
    executable(
      "sha256sum",
      `
      const fs = require("node:fs");
      const input = fs.readFileSync(0, "utf8");
      if (process.argv[2] !== "--check" || !/^(8aca8db96f1b94770f1b0d72b6dddcb1ebb8123cb3712530b08cc387b349a3d8|aa1facd105f0d83fe5c55b1adcd9d7417de5d83aa27471f91dc0b66cf3803577)  /m.test(input)) process.exit(9);
      process.exit(process.env.QG_SCENARIO === "invalid-download" ||
        (process.env.QG_SCENARIO === "invalid-zizmor" && input.includes("zizmor.tar.gz")) ? 1 : 0);
    `
    );
    executable(
      "tar",
      `
      const fs = require("node:fs"), path = require("node:path");
      const args = process.argv.slice(2);
      const name = args.at(-1);
      if (!["actionlint", "zizmor"].includes(name)) process.exit(9);
      if (process.env.QG_SCENARIO === "missing-binary" && name === "zizmor") process.exit(0);
      const wrong = process.env.QG_SCENARIO === "wrong-version" ||
        (process.env.QG_SCENARIO === "wrong-zizmor" && name === "zizmor");
      const version = wrong ? "0.0.1" : name === "actionlint" ? "1.7.12" : "1.25.2";
      const body = name === "actionlint"
        ? 'if (process.argv.includes("-version")) console.log(' + JSON.stringify(version + "\\nbuilt for testing") + ');'
        : 'console.log(process.argv.includes("--version") ? ' + JSON.stringify("zizmor " + version) + ' : "[]");';
      fs.writeFileSync(path.join(args[args.indexOf("-C") + 1], name), "#!" + process.execPath + "\\n" + body, {mode:0o755});
    `
    );
    const steps = workflow.jobs[job].steps;
    const setup = steps.find((step) => step.id === "workflow_scanners");
    assert.ok(setup, `${job} must prepare scanners before validation`);
    assert.ok(steps.indexOf(setup) < steps.findIndex((step) => step.id === "validate"));
    assert.equal(setup.env.WORKFLOW_SHA, "${{ github.workflow_sha }}");
    assert.notEqual(setup["continue-on-error"], true);
    const pathFile = join(sandbox, "github-path");
    writeFileSync(pathFile, "");
    mkdirSync(join(sandbox, ".github/workflows"), { recursive: true });
    writeFileSync(
      join(sandbox, ".github/workflows/fixture.yml"),
      "name: Fixture\non: push\njobs: {}\n"
    );
    mkdirSync(join(sandbox, "config/quality"), { recursive: true });
    writeFileSync(
      join(sandbox, "config/quality/quality-baseline.json"),
      '{"metrics":{"zizmorFindings":{"value":233}}}'
    );
    const env = {
      ...process.env,
      PATH: `${bin}:/usr/bin:/bin`,
      GITHUB_PATH: pathFile,
      RUNNER_TEMP: sandbox,
      WORKFLOW_SHA: "1234567890123456789012345678901234567890",
      QG_INSTALLER: join(root, "scripts/ci/install-workflow-scanners.sh"),
      QG_SCENARIO: scenario,
    };
    const setupResult = spawnSync("/bin/bash", ["-c", setup.run], {
      cwd: sandbox,
      env,
      encoding: "utf8",
      timeout: 15000,
    });
    const publishedPath = readFileSync(pathFile, "utf8").trim();
    const audit =
      setupResult.status === 0
        ? spawnSync(
            process.execPath,
            [join(root, "scripts/check/check-workflows.mjs"), "--ratchet", "--quiet"],
            {
              cwd: sandbox,
              env: { ...env, PATH: `${publishedPath}:${env.PATH}` },
              encoding: "utf8",
              timeout: 15000,
            }
          )
        : null;
    let verdict = null;
    if (setupResult.status !== 0) {
      const enforce = steps.find((step) => step.name === "Enforce validation verdict");
      assert.equal(enforce.if, "always()");
      mkdirSync(join(sandbox, "scripts/ci"), { recursive: true });
      copyFileSync(
        join(root, "scripts/ci/release-green-result.mjs"),
        join(sandbox, "scripts/ci/release-green-result.mjs")
      );
      const result = spawnSync("/bin/bash", ["-c", enforce.run], {
        cwd: sandbox,
        encoding: "utf8",
        timeout: 15000,
        env: {
          ...env,
          PATH: `${bin}:${process.execPath.slice(0, process.execPath.lastIndexOf("/"))}:/usr/bin:/bin`,
          GITHUB_OUTPUT: join(sandbox, "output"),
          VALIDATION_EXIT: "",
          VALIDATED_SHA: env.WORKFLOW_SHA,
          EVENT_NAME: "schedule",
        },
      });
      assert.equal(result.status, 1, result.stdout + result.stderr);
      verdict = JSON.parse(result.stdout);
    }
    return { setup: setupResult, publishedPath, audit, verdict };
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
}

test(
  "both observer jobs install pinned scanners from the workflow revision before auditing an older target",
  posix,
  () => {
    for (const job of ["release-green", "main-green"]) {
      const result = prepare(job);
      assert.equal(result.setup.status, 0, result.setup.stdout + result.setup.stderr);
      assert.ok(result.publishedPath);
      assert.equal(result.audit.status, 0, result.audit.stdout + result.audit.stderr);
      assert.match(result.audit.stdout, /workflowAuditState=MEASURED/);
      assert.match(result.audit.stdout, /zizmorVersion=zizmor 1\.25\.2/);
    }
  }
);

test("an invalid download cannot publish a scanner path or start an audit", posix, () => {
  const result = prepare("release-green", "invalid-download");
  assert.notEqual(result.setup.status, 0);
  assert.equal(result.publishedPath, "");
  assert.equal(result.audit, null);
});

test("a wrong scanner version cannot be reused as installed tooling", posix, () => {
  const result = prepare("main-green", "wrong-version");
  assert.notEqual(result.setup.status, 0);
  assert.equal(result.publishedPath, "");
  assert.equal(result.audit, null);
});

for (const scenario of ["download-failed", "invalid-zizmor", "wrong-zizmor", "missing-binary"]) {
  test(`setup failure (${scenario}) leaves the final job verdict INCOMPLETE`, posix, () => {
    for (const job of ["release-green", "main-green"]) {
      const result = prepare(job, scenario);
      assert.notEqual(result.setup.status, 0);
      assert.equal(result.publishedPath, "");
      assert.equal(result.audit, null);
      assert.equal(result.verdict.evidenceState, "INCOMPLETE");
      assert.equal(result.verdict.verdict, "UNKNOWN");
    }
  });
}
