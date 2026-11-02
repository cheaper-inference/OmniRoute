import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { parse } from "yaml";

type Step = { name?: string; run?: string; uses?: string; "continue-on-error"?: boolean };
const root = new URL("../../../", import.meta.url);
const ci = parse(readFileSync(new URL(".github/workflows/ci.yml", root), "utf8"));
const scannerInstall = (ci.jobs["quality-extended"].steps as Step[]).find(
  (step) => step.name?.startsWith("Install") && step.name.includes("scanners")
);
assert.ok(scannerInstall?.run);
const scannerSource = readFileSync(new URL("scripts/ci/install-quality-scanners.sh", root), "utf8");
const bunJob = ci.jobs["test-bun-sqlite"];
const bunSteps = bunJob.steps as Step[];

test("required CI scanner installation cannot turn a failed install into a passing step", () => {
  assert.notEqual(scannerInstall["continue-on-error"], true);
  assert.equal(scannerInstall.run, "bash scripts/ci/install-quality-scanners.sh");
});

test("every scanner release download uses an explicit auditor version", () => {
  const commands = scannerSource
    .split("\n")
    .filter((line) => /^\s*(?:[A-Z_]+_VERSION=|gh release download )/.test(line));
  const result = spawnSync(
    "bash",
    ["-euo", "pipefail", "-c", `gh() { printf '%s\\n' "$*"; }\n${commands.join("\n")}`],
    { encoding: "utf8", env: { ...process.env, scanner_dir: "/fixture" } }
  );
  assert.equal(result.status, 0, result.stderr);
  const downloads = result.stdout.trim().split("\n");
  assert.equal(downloads.length, 3);
  for (const [repository, version] of [
    ["gitleaks/gitleaks", "v8.30.1"],
    ["google/osv-scanner", "v2.3.8"],
    ["oasdiff/oasdiff", "v1.19.1"],
  ]) {
    assert.ok(
      downloads.some((line) =>
        line.startsWith(`release download ${version} --repo ${repository} `)
      ),
      `${repository} must download its pinned release: ${result.stdout}`
    );
  }
});

for (const failure of ["download", "workflow-scanners"]) {
  test(`CI preserves the ${failure} install failure instead of skipping required scanners`, () => {
    const dir = mkdtempSync(join(tmpdir(), "omni-ci-scanner-failure-"));
    try {
      writeFileSync(join(dir, "installer.sh"), scannerSource);
      // Only external installers are replaced. Execute the workflow's real shell
      // control flow, including its error policy. Never remove host /tmp assets.
      const result = spawnSync(
        "bash",
        [
          "-euo",
          "pipefail",
          "-c",
          `
          gh() { if [ "$FIXTURE_FAILURE" = download ]; then echo fixture-download-failure >&2; return 42; fi; }
          bash() { if [ "$FIXTURE_FAILURE" = workflow-scanners ]; then echo fixture-helper-failure >&2; return 43; fi; }
          rm() { :; }
          mkdir() { :; }
          tar() { :; }
          install() { :; }
          curl() { :; }
          pipx() { :; }
          pip() { :; }
          ls() { :; }
          source ./installer.sh
          `,
        ],
        {
          cwd: dir,
          encoding: "utf8",
          env: {
            ...process.env,
            FIXTURE_FAILURE: failure,
            RUNNER_TEMP: dir,
            GITHUB_PATH: join(dir, "github-path"),
          },
        }
      );
      assert.equal(result.status, failure === "download" ? 42 : 43, result.stderr);
      assert.match(result.stderr, /fixture-(?:download|helper)-failure/);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
}

test("Bun compatibility uses npm's locked dependency on both operating systems", () => {
  assert.deepEqual(bunJob.strategy.matrix.os, ["ubuntu-latest", "windows-latest"]);
  assert.equal(bunJob["continue-on-error"], "${{ matrix.os == 'windows-latest' }}");
  assert.ok(bunSteps.some((step) => step.uses === "./.github/actions/npm-ci-retry"));
  assert.ok(bunSteps.some((step) => step.run === "npm run test:bun:db"));
  for (const step of bunSteps) {
    assert.doesNotMatch(step.run ?? "", /bun\.sh\/install|npm install -g bun/);
  }
});

for (const binary of ["locked", "wrong-version", "missing"]) {
  test(`Bun preflight checks the installed binary: ${binary}`, () => {
    const verify = bunSteps.find((step) => step.name === "Verify locked Bun runtime");
    assert.ok(verify?.run, "Bun must be verified before its compatibility tests");
    const dir = mkdtempSync(join(tmpdir(), "omni-ci-bun-runtime-"));
    try {
      const version = "1.4.2";
      mkdirSync(join(dir, "node_modules/bun/bin"), { recursive: true });
      writeFileSync(
        join(dir, "package.json"),
        JSON.stringify({ devDependencies: { bun: version } })
      );
      writeFileSync(
        join(dir, "package-lock.json"),
        JSON.stringify({ packages: { "node_modules/bun": { version } } })
      );
      writeFileSync(
        join(dir, "node_modules/bun/package.json"),
        JSON.stringify({ version, bin: { bun: "bin/bun.exe" } })
      );
      if (binary !== "missing") {
        writeFileSync(
          join(dir, "node_modules/bun/bin/bun.exe"),
          `#!/usr/bin/env node\nconsole.log(${JSON.stringify(binary === "locked" ? version : "9.9.9")});\n`,
          { mode: 0o755 }
        );
      }
      const result = spawnSync("bash", ["-euo", "pipefail", "-c", verify.run], {
        cwd: dir,
        encoding: "utf8",
      });
      if (binary === "locked") {
        assert.equal(result.status, 0, result.stderr);
        assert.match(result.stdout, /bunVersion=1\.4\.2/);
      } else {
        assert.notEqual(
          result.status,
          0,
          "an unusable local binary cannot fall back to global Bun"
        );
        assert.match(result.stderr, binary === "missing" ? /ENOENT/ : /AssertionError/);
      }
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
}
