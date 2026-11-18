import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const installer = new URL("../../scripts/ci/install-quality-scanners.sh", import.meta.url);
const posix = { skip: process.platform === "win32" };
const releases = [
  ["gitleaks/gitleaks", "v8.30.1"],
  ["google/osv-scanner", "v2.3.8"],
  ["oasdiff/oasdiff", "v1.19.1"],
];

test("full quality scanner downloads use all three explicit auditor versions", posix, () => {
  const commands = readFileSync(installer, "utf8")
    .split("\n")
    .filter((line) => /^\s*(?:[A-Z_]+_VERSION=|gh release download )/.test(line));
  const result = spawnSync(
    "/bin/bash",
    ["-euo", "pipefail", "-c", `gh() { printf '%s\\n' "$*"; }\n${commands.join("\n")}`],
    { encoding: "utf8", timeout: 10_000, env: { ...process.env, scanner_dir: "/fixture" } }
  );
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stderr);
  const downloads = result.stdout.trim().split("\n");
  assert.equal(downloads.length, releases.length);
  for (const [repository, version] of releases) {
    assert.ok(
      downloads.some((line) =>
        line.startsWith(`release download ${version} --repo ${repository} `)
      ),
      `${repository} must download its pinned release: ${result.stdout}`
    );
  }
});

// Execute the real full installer. Only the external pair installer, downloads
// and extraction are fixtures; a failure must stop before PATH is published.
function failInstall({ repository = "", helperExit = 0 }) {
  const source = readFileSync(installer, "utf8");
  const dir = mkdtempSync(join(tmpdir(), "quality-scanner-installer-"));
  try {
    writeFileSync(join(dir, "installer.sh"), source);
    writeFileSync(
      join(dir, "install-workflow-scanners.sh"),
      '#!/bin/bash\nprintf "workflow-pair\\n" >> "$QG_CALLS"\n' +
        'if [ "$QG_HELPER_EXIT" != 0 ]; then echo fixture-helper-failure >&2; fi\n' +
        'exit "$QG_HELPER_EXIT"\n'
    );
    const published = join(dir, "github-path");
    const calls = join(dir, "calls");
    writeFileSync(published, "");
    writeFileSync(calls, "");
    const result = spawnSync(
      "/bin/bash",
      [
        "-euo",
        "pipefail",
        "-c",
        `
        gh() {
          printf '%s\\n' "$*" >> "$QG_CALLS"
          case "$*" in
            *"--repo $QG_FAIL_REPO "*) echo fixture-download-failure >&2; return 42 ;;
          esac
        }
        tar() { :; }
        install() { :; }
        source "$QG_INSTALLER"
        `,
      ],
      {
        cwd: dir,
        encoding: "utf8",
        timeout: 10_000,
        env: {
          ...process.env,
          RUNNER_TEMP: dir,
          GITHUB_PATH: published,
          QG_INSTALLER: join(dir, "installer.sh"),
          QG_CALLS: calls,
          QG_FAIL_REPO: repository,
          QG_HELPER_EXIT: String(helperExit),
        },
      }
    );
    assert.equal(result.error, undefined);
    return {
      ...result,
      publishedPath: readFileSync(published, "utf8"),
      calls: readFileSync(calls, "utf8").trim().split("\n"),
    };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

for (const [index, [repository]] of releases.entries()) {
  test(`full installation preserves the ${repository} download failure`, posix, () => {
    const result = failInstall({ repository });
    assert.equal(result.status, 42, result.stdout + result.stderr);
    assert.match(result.stderr, /fixture-download-failure/);
    assert.equal(result.publishedPath, "");
    assert.equal(result.calls[0], "workflow-pair");
    assert.equal(result.calls.length, index + 2);
  });
}

for (const helperExit of [1, 43]) {
  test(`full installation propagates the workflow helper failure ${helperExit}`, posix, () => {
    const result = failInstall({ helperExit });
    assert.equal(result.status, helperExit, result.stdout + result.stderr);
    assert.match(result.stderr, /fixture-helper-failure/);
    assert.equal(result.publishedPath, "");
    assert.deepEqual(result.calls, ["workflow-pair"]);
  });
}
