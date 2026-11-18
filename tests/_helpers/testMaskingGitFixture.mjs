import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const checker = fileURLToPath(
  new URL("../../scripts/check/check-test-masking.mjs", import.meta.url)
);
const profileModule = new URL(
  "../../scripts/quality/release-green-static-profile.mjs",
  import.meta.url
);
export const sample = "tests/unit/sample.test.ts";

export function source(assertions, { skip = false, modeSkip = false } = {}) {
  return [
    'import assert from "node:assert/strict";',
    'import test from "node:test";',
    ...(modeSkip ? ['import { releaseOnlyUnlessTouched } from "./mode.js";'] : []),
    "function double(value) { return value * 2; }",
    ...Array.from({ length: 24 }, (_, i) => `// Stable context ${i}.`),
    `test${skip ? ".skip" : ""}("doubles input", ${modeSkip ? '{ skip: releaseOnlyUnlessTouched("fixture") }, ' : ""}() => {`,
    ...Array.from(
      { length: assertions },
      (_, i) => `  assert.equal(double(${i + 1}), ${(i + 1) * 2});`
    ),
    "});",
    "",
  ].join("\n");
}

export function fixture(t) {
  const cwd = mkdtempSync(join(tmpdir(), "test-masking-base-"));
  t.after(() => rmSync(cwd, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 }));
  const env = { ...process.env };
  for (const key of Object.keys(env)) {
    if (/^(?:GIT_|GITHUB_|TEST_MASKING_)/.test(key)) delete env[key];
  }
  const emptyConfig = join(cwd, "empty-gitconfig");
  writeFileSync(emptyConfig, "");
  Object.assign(env, {
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_CONFIG_GLOBAL: emptyConfig,
    GIT_TERMINAL_PROMPT: "0",
    GIT_ALLOW_PROTOCOL: "",
    GIT_NO_LAZY_FETCH: "1",
    GIT_AUTHOR_NAME: "Test Masking Fixture",
    GIT_AUTHOR_EMAIL: "test-masking@example.invalid",
    GIT_COMMITTER_NAME: "Test Masking Fixture",
    GIT_COMMITTER_EMAIL: "test-masking@example.invalid",
    GITHUB_BASE_SHA: "",
    GITHUB_BASE_REF: "",
    TEST_MASKING_MAX_CHANGED_TESTS: "0",
    PATH: `${dirname(process.execPath)}${delimiter}${process.env.PATH || ""}`,
  });
  const git = (...args) =>
    execFileSync("git", args, { cwd, env, encoding: "utf8", timeout: 10000 }).trim();
  const write = (files) => {
    for (const [name, content] of Object.entries(files)) {
      mkdirSync(dirname(join(cwd, name)), { recursive: true });
      writeFileSync(join(cwd, name), content);
    }
  };
  const commit = (files, message = "fixture change") => {
    write(files);
    git("add", "--all");
    git("commit", "--quiet", "-m", message);
    return git("rev-parse", "HEAD");
  };
  const run = (base, extra = {}) =>
    spawnSync(process.execPath, [checker], {
      cwd,
      env: { ...env, GITHUB_BASE_SHA: base || "", ...extra },
      encoding: "utf8",
      timeout: 10000,
      maxBuffer: 1024 * 1024,
    });
  git("init", "--quiet", "--initial-branch=fixture");
  return { cwd, env, git, write, commit, run };
}

export function expectStatus(result, expected, reason = "") {
  assert.equal(result.error, undefined);
  assert.equal(result.signal, null);
  assert.equal(result.status, expected, `${reason}\n${result.stdout}\n${result.stderr}`);
}

export function divergent(t, { base = 2, upstream = 4, candidate = 3 } = {}) {
  const repo = fixture(t);
  const fork = repo.commit({ [sample]: source(base) }, "common ancestor");
  repo.git("switch", "--quiet", "-c", "upstream");
  const tip = repo.commit({ [sample]: source(upstream) }, "upstream-only change");
  repo.git("switch", "--quiet", "-c", "candidate", fork);
  const head = repo.commit({ [sample]: source(candidate) }, "candidate change");
  assert.equal(repo.git("merge-base", "--all", tip, head), fork);
  return { ...repo, fork, tip, head };
}

export function ambiguous(t) {
  const repo = fixture(t);
  const fork = repo.commit({ [sample]: source(2) }, "common ancestor");
  repo.git("switch", "--quiet", "-c", "left");
  const left = repo.commit({ "left.txt": "left\n" }, "left delta");
  repo.git("switch", "--quiet", "-c", "right", fork);
  const right = repo.commit({ "right.txt": "right\n" }, "right delta");
  repo.git("switch", "--quiet", "-c", "upstream", left);
  repo.git("merge", "--quiet", "--no-ff", right, "-m", "left then right");
  const tip = repo.git("rev-parse", "HEAD");
  repo.git("switch", "--quiet", "-c", "candidate", right);
  repo.git("merge", "--quiet", "--no-ff", left, "-m", "right then left");
  const head = repo.git("rev-parse", "HEAD");
  assert.equal(repo.git("merge-base", "--all", tip, head).split("\n").length, 2);
  return { ...repo, fork, tip, head };
}

export function overrideGitRead(repo, command, output) {
  const bin = join(repo.cwd, "scripts/ad-hoc/fault-bin");
  mkdirSync(bin, { recursive: true });
  const log = join(repo.cwd, "git-fault.log");
  const executable = join(bin, "git");
  const outputFile = join(bin, "stdout.txt");
  if (output !== undefined) writeFileSync(outputFile, output);
  writeFileSync(
    executable,
    [
      "#!/usr/bin/env node",
      'const { spawnSync } = require("node:child_process");',
      'const { appendFileSync, readFileSync, writeFileSync } = require("node:fs");',
      "const args = process.argv.slice(2);",
      "if (args.includes(process.env.TEST_MASKING_GIT_FAILURE)) {",
      '  appendFileSync(process.env.TEST_MASKING_GIT_FAULT_LOG, "injected\\n");',
      "  if (process.env.TEST_MASKING_GIT_OUTPUT_FILE) {",
      "    writeFileSync(1, readFileSync(process.env.TEST_MASKING_GIT_OUTPUT_FILE));",
      "    process.exit(0);",
      "  }",
      '  process.stderr.write("fixture Git read failure\\n");',
      "  process.exit(73);",
      "}",
      'const child = spawnSync("git", args, { stdio: "inherit",',
      "  env: { ...process.env, PATH: process.env.TEST_MASKING_ORIGINAL_PATH } });",
      "process.exit(child.status ?? 1);",
      "",
    ].join("\n")
  );
  chmodSync(executable, 0o755);
  return {
    env: {
      PATH: `${bin}${delimiter}${repo.env.PATH}`,
      TEST_MASKING_ORIGINAL_PATH: repo.env.PATH,
      TEST_MASKING_GIT_FAILURE: command,
      TEST_MASKING_GIT_FAULT_LOG: log,
      TEST_MASKING_GIT_OUTPUT_FILE: output === undefined ? "" : outputFile,
    },
    observed: () => assert.match(readFileSync(log, "utf8"), /injected/),
  };
}

export function runProfile(repo, pinned = "", options = {}) {
  const gate = {
    id: "check:test-masking",
    args: ["run", "check:test-masking"],
    env: { GITHUB_BASE_REF: "main" },
    kind: "hard",
    command: "node scripts/check/check-test-masking.mjs",
  };
  repo.write({
    "config/quality/release-green-static-profile.json": JSON.stringify({
      schemaVersion: 1,
      gates: [gate],
      sourceJobs: ["lint"],
      exclusions: [],
    }),
    "package.json": JSON.stringify({ scripts: { "check:test-masking": gate.command } }),
    ".github/workflows/ci.yml": JSON.stringify({
      jobs: { lint: { steps: [{ run: "npm run check:test-masking" }] } },
    }),
    ".github/workflows/quality.yml": JSON.stringify({
      jobs: {
        fast: { steps: [{ run: "gates=(\n test-masking\n)\nratchet_gates=(\n test-masking\n)" }] },
      },
    }),
    "scripts/ad-hoc/profile-probe.mjs": [
      "const profile = await import(process.env.TEST_MASKING_PROFILE_MODULE);",
      "try {",
      "  const pinned = process.env.TEST_MASKING_PINNED_SHA;",
      "  const options = JSON.parse(process.env.TEST_MASKING_PROFILE_OPTIONS);",
      "  let result;",
      '  if (options.action === "resolve") {',
      "    result = { baseSha: profile.resolveTestMaskingBase(process.cwd(), options.argv || []) };",
      '  } else if (options.action === "binding") {',
      "    const env = profile.testMaskingGateEnv(process.cwd(), pinned);",
      "    const gates = profile.loadFullCiProfile(process.cwd(), () => pinned);",
      "    result = { env, gate: gates[0] };",
      "  } else {",
      "    result = pinned ? profile.loadFullCiProfile(process.cwd(), () => pinned) : profile.loadFullCiProfile(process.cwd());",
      "  }",
      "  process.stdout.write(JSON.stringify(result));",
      "} catch (error) {",
      "  process.stderr.write(String(error.message));",
      "  process.exitCode = 1;",
      "}",
      "",
    ].join("\n"),
  });
  return spawnSync(process.execPath, ["scripts/ad-hoc/profile-probe.mjs"], {
    cwd: repo.cwd,
    env: {
      ...repo.env,
      TEST_MASKING_PROFILE_MODULE: profileModule.href,
      TEST_MASKING_PINNED_SHA: pinned,
      TEST_MASKING_PROFILE_OPTIONS: JSON.stringify(options),
    },
    encoding: "utf8",
    timeout: 10000,
    maxBuffer: 1024 * 1024,
  });
}
