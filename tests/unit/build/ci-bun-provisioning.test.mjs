import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { parse } from "yaml";

const root = new URL("../../../", import.meta.url);
const workflow = parse(readFileSync(new URL(".github/workflows/ci.yml", root), "utf8"));
const manifest = JSON.parse(readFileSync(new URL("package.json", root), "utf8"));
const bun = workflow.jobs["test-bun-sqlite"];
const steps = bun.steps;
const version = "1.4.2";

test("Bun smoke does not install an independent global or mutable runtime", () => {
  for (const step of steps) {
    assert.doesNotMatch(
      step.run ?? "",
      /bun\.sh\/install|npm\s+(?:install|i)\s+(?:-g|--global)\s+bun/
    );
    assert.doesNotMatch(step.uses ?? "", /setup-bun/);
  }
});

test("Bun smoke preserves both operating systems, Windows advisory and the Node test boundary", () => {
  assert.deepEqual(bun.strategy.matrix.os, ["ubuntu-latest", "windows-latest"]);
  assert.equal(bun["continue-on-error"], "${{ matrix.os == 'windows-latest' }}");
  assert.equal(
    bun.if,
    "${{ github.event_name != 'pull_request' || (needs.changes.outputs.code == 'true' && needs.changes.outputs.queueCandidate == 'true') }}"
  );
  assert.ok(steps.some((step) => step.uses === "./.github/actions/npm-ci-retry"));
  assert.ok(steps.some((step) => step.run === "npm run test:bun:db"));
  assert.equal(
    manifest.scripts["test:bun:db"],
    "bun test tests/unit/db-adapters/bunSqliteAdapter.test.ts tests/unit/db-adapters/driverFactory.test.ts tests/unit/db-adapters/cliSqlite.test.mjs"
  );
  for (const name of ["test:unit", "test:unit:ci", "test:unit:ci:shard", "test:coverage:runner"]) {
    assert.match(manifest.scripts[name], /\bnode\b/);
    assert.doesNotMatch(manifest.scripts[name], /\bbun(?:x)?\b/);
  }
});

test("Bun verification runs after npm ci and before smoke on both operating systems", () => {
  const install = steps.findIndex((step) => step.uses === "./.github/actions/npm-ci-retry");
  const verify = steps.findIndex((step) => step.name === "Verify locked Bun runtime");
  const smoke = steps.findIndex((step) => step.run === "npm run test:bun:db");
  assert.ok(install < verify && verify < smoke, "the locked runtime must be verified before smoke");
  assert.equal(steps[verify].if, undefined);
  assert.equal(steps[verify].shell, "bash");
  assert.notEqual(steps[verify]["continue-on-error"], true);
});

for (const scenario of [
  "locked",
  "missing-binary",
  "placeholder",
  "wrong-binary-version",
  "manifest-range",
  "root-lock-mismatch",
  "resolved-lock-mismatch",
  "installed-package-mismatch",
  "escaping-bin-path",
  "missing-npm-shim",
]) {
  test(
    `locked Bun preflight rejects unusable evidence without a global fallback: ${scenario}`,
    { skip: process.platform === "win32" },
    async (t) => {
      const verify = steps.find((step) => step.name === "Verify locked Bun runtime");
      assert.ok(verify?.run, "the actual workflow must provide the preflight");
      const dir = await mkdtemp(join(tmpdir(), "omni-bun-provision-"));
      t.after(() => rm(dir, { recursive: true, force: true }));
      const localDirectory = join(dir, "node_modules/bun");
      const globalDirectory = join(dir, "global-bin");
      await mkdir(join(localDirectory, "bin"), { recursive: true });
      await mkdir(join(dir, "node_modules/.bin"));
      await mkdir(globalDirectory);
      const pkg = { devDependencies: { bun: version } };
      const lock = {
        lockfileVersion: 3,
        packages: {
          "": { devDependencies: { bun: version } },
          "node_modules/bun": { version, bin: { bun: "bin/bun.exe" } },
        },
      };
      const installed = { name: "bun", version, bin: { bun: "bin/bun.exe" } };
      if (scenario === "manifest-range") pkg.devDependencies.bun = `^${version}`;
      if (scenario === "root-lock-mismatch") lock.packages[""].devDependencies.bun = "9.9.9";
      if (scenario === "resolved-lock-mismatch")
        lock.packages["node_modules/bun"].version = "9.9.9";
      if (scenario === "installed-package-mismatch") installed.version = "9.9.9";
      if (scenario === "escaping-bin-path") installed.bin.bun = "../../global-bin/bun";
      for (const [path, value] of [
        ["package.json", pkg],
        ["package-lock.json", lock],
        ["node_modules/bun/package.json", installed],
      ]) {
        await writeFile(join(dir, path), JSON.stringify(value));
      }
      const fake = (value, marker) =>
        `#!${process.execPath}\nconst fs=require("node:fs");fs.writeFileSync(process.env.${marker},"called");console.log(${JSON.stringify(value)});\n`;
      const executable = join(localDirectory, "bin/bun.exe");
      if (scenario !== "missing-binary") {
        await writeFile(
          executable,
          scenario === "placeholder"
            ? "#!/bin/sh\necho 'Bun postinstall placeholder' >&2\nexit 1\n"
            : fake(scenario === "wrong-binary-version" ? "9.9.9" : version, "BUN_FIXTURE_LOCAL"),
          { mode: 0o755 }
        );
      }
      if (scenario !== "missing-npm-shim")
        await symlink("../bun/bin/bun.exe", join(dir, "node_modules/.bin/bun"));
      await writeFile(join(globalDirectory, "bun"), fake(version, "BUN_FIXTURE_GLOBAL"), {
        mode: 0o755,
      });
      const result = spawnSync("/bin/bash", ["-euo", "pipefail", "-c", verify.run], {
        cwd: dir,
        encoding: "utf8",
        timeout: 15_000,
        env: {
          ...process.env,
          PATH: `${globalDirectory}:${dirname(process.execPath)}:/usr/bin:/bin`,
          BUN_FIXTURE_LOCAL: join(dir, "local-called"),
          BUN_FIXTURE_GLOBAL: join(dir, "global-called"),
        },
      });
      assert.equal(result.error, undefined);
      assert.equal(
        existsSync(join(dir, "global-called")),
        false,
        "global Bun must never mask missing local evidence"
      );
      if (scenario === "locked") {
        assert.equal(result.status, 0, result.stdout + result.stderr);
        assert.match(result.stdout, /bunVersion=1\.4\.2/);
        assert.equal(existsSync(join(dir, "local-called")), true);
      } else {
        assert.notEqual(result.status, 0, `${scenario} must stop before the compatibility smoke`);
      }
    }
  );
}
