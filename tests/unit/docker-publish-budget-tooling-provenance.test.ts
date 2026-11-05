import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { type TestContext } from "node:test";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";

type Step = {
  name?: string;
  id?: string;
  uses?: string;
  with?: Record<string, unknown>;
  env?: Record<string, string>;
  run?: string;
  shell?: string;
};

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const workflow = load(
  readFileSync(path.join(root, ".github/workflows/docker-publish.yml"), "utf8")
) as { jobs: { prepare: { steps: Step[] }; build: { steps: Step[] } } };
const steps = workflow.jobs.prepare.steps;
const budget = steps.find((step) => step.id === "budget");
assert.ok(budget?.run, "the real prepare budget step must exist");
const helper = readFileSync(path.join(root, "scripts/ci/blacksmith-budget.mjs"));
const helperPath = "scripts/ci/blacksmith-budget.mjs";
const toolingPath = ".docker-budget-tooling";

// Real isolated Git checkouts model the action's source and tooling outputs. The
// real workflow shell and canonical helper execute here; no checkout action,
// remote tag, GitHub API, billing API or Docker build is exercised by this test.
function fixture(t: TestContext, tagHelper: "absent" | "canonical" | "sentinel" = "absent") {
  const cwd = mkdtempSync(path.join(os.tmpdir(), "docker-budget-provenance-"));
  t.after(() => rmSync(cwd, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 }));
  const env: NodeJS.ProcessEnv = {
    PATH: `${path.dirname(process.execPath)}:/usr/bin:/bin`,
    HOME: cwd,
    TMPDIR: cwd,
    LC_ALL: "C",
    GIT_CONFIG_GLOBAL: "/dev/null",
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_TERMINAL_PROMPT: "0",
  };
  const git = (directory: string, args: string[]) =>
    execFileSync("git", args, {
      cwd: directory,
      env,
      encoding: "utf8",
      timeout: 10_000,
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  const commit = (directory: string) => {
    git(directory, ["-c", "init.defaultBranch=fixture", "init", "--quiet"]);
    git(directory, ["add", "."]);
    git(directory, [
      "-c",
      "user.name=Fixture",
      "-c",
      "user.email=fixture@example.invalid",
      "commit",
      "--quiet",
      "-m",
      "test: record isolated checkout",
    ]);
    return git(directory, ["rev-parse", "--verify", "HEAD"]);
  };
  writeFileSync(path.join(cwd, "README.md"), "older requested release source\n");
  if (tagHelper !== "absent") {
    mkdirSync(path.join(cwd, "scripts/ci"), { recursive: true });
    writeFileSync(
      path.join(cwd, helperPath),
      tagHelper === "canonical"
        ? helper
        : 'import { writeFileSync } from "node:fs";\n' +
            'writeFileSync(process.env.TAG_MARKER, "tag helper executed");\n'
    );
  }
  const sourceSha = commit(cwd);
  git(cwd, ["tag", "v0.0.0"]);
  const tools = path.join(cwd, toolingPath);
  mkdirSync(path.join(tools, "scripts/ci"), { recursive: true });
  writeFileSync(path.join(tools, helperPath), helper);
  const toolingSha = commit(tools);
  const output = path.join(cwd, "budget.output");
  const marker = path.join(cwd, "unexpected-tag-helper");
  const execute = (revision = toolingSha) =>
    spawnSync("bash", ["-c", budget.run!], {
      cwd,
      env: {
        ...env,
        EXPECTED_WORKFLOW_SHA: revision,
        WANT: "hosted",
        CAP: "2500",
        GITHUB_OUTPUT: output,
        TAG_MARKER: marker,
      },
      encoding: "utf8",
      timeout: 10_000,
      maxBuffer: 64 * 1024,
    });
  return { cwd, tools, sourceSha, toolingSha, output, marker, git, execute };
}

test("budget tooling is pinned to the workflow while the requested tag stays the source", () => {
  const control = steps.find((step) => step.name === "Checkout");
  const source = workflow.jobs.build.steps.find((step) => step.name === "Checkout");
  const tools = steps.find((step) => step.name === "Checkout Docker budget tooling");
  assert.ok(control && source && tools);
  assert.equal(control.with?.ref, undefined);
  assert.equal(control.with?.["persist-credentials"], false);
  assert.equal(source.with?.["persist-credentials"], false);
  assert.equal(source.uses, tools.uses);
  assert.equal(
    source.with?.ref,
    "${{ github.event_name == 'workflow_dispatch' && format('refs/tags/v{0}', inputs.version) || '' }}"
  );
  assert.equal(tools.uses, "actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1");
  assert.equal(tools.with?.ref, "${{ github.workflow_sha }}");
  assert.equal(tools.with?.path, toolingPath);
  assert.equal(tools.with?.["persist-credentials"], false);
  assert.equal(tools.with?.["fetch-depth"], 1);
  assert.equal(tools.with?.["sparse-checkout"], helperPath);
  assert.equal(tools.with?.["sparse-checkout-cone-mode"], false);
  assert.equal(budget.env?.EXPECTED_WORKFLOW_SHA, "${{ github.workflow_sha }}");
  assert.equal(budget.shell, "bash");
  assert.ok(steps.indexOf(control) < steps.indexOf(tools));
  assert.ok(steps.indexOf(tools) < steps.indexOf(budget));
});

test("an older requested tag without the helper completes the real prepare budget boundary", (t) => {
  const f = fixture(t);
  assert.equal(existsSync(path.join(f.cwd, helperPath)), false);
  assert.equal(f.git(f.cwd, ["rev-parse", "refs/tags/v0.0.0"]), f.sourceSha);
  const result = f.execute();
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0);
  assert.equal(readFileSync(f.output, "utf8"), "blacksmith=false\n");
  assert.equal(f.git(f.cwd, ["rev-parse", "HEAD"]), f.sourceSha);
  assert.equal(f.git(f.tools, ["rev-parse", "HEAD"]), f.toolingSha);
  assert.equal(existsSync(path.join(f.cwd, helperPath)), false);
});

test("a mutable workflow revision is rejected before invoking either helper", (t) => {
  const f = fixture(t, "canonical");
  const result = f.execute("refs/heads/main");
  assert.equal(result.error, undefined);
  assert.equal(result.status, 1);
  assert.equal(existsSync(f.output), false);
});

test("a malicious workflow revision stays data and cannot run shell commands", (t) => {
  const f = fixture(t, "canonical");
  const result = f.execute("$(touch unexpected-command-execution)");
  assert.equal(result.error, undefined);
  assert.equal(result.status, 1);
  assert.equal(existsSync(f.output), false);
  assert.equal(existsSync(path.join(f.cwd, "unexpected-command-execution")), false);
});

test("a valid but mismatched workflow SHA is rejected before invoking either helper", (t) => {
  const f = fixture(t, "canonical");
  const mismatch = f.toolingSha === "0".repeat(40) ? "1".repeat(40) : "0".repeat(40);
  const result = f.execute(mismatch);
  assert.equal(result.error, undefined);
  assert.equal(result.status, 1);
  assert.equal(existsSync(f.output), false);
});

test("missing workflow tooling never falls back to a helper from the requested tag", (t) => {
  const f = fixture(t, "canonical");
  rmSync(f.tools, { recursive: true, force: true });
  const result = f.execute();
  assert.equal(result.error, undefined);
  assert.notEqual(result.status, 0);
  assert.equal(existsSync(f.output), false);
});

test("requested-tag helper content cannot replace the workflow-pinned helper", (t) => {
  const f = fixture(t, "sentinel");
  const result = f.execute();
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0);
  assert.equal(readFileSync(f.output, "utf8"), "blacksmith=false\n");
  assert.equal(existsSync(f.marker), false);
});

test("a directory borrowing the tag repository is not accepted as the tooling checkout", (t) => {
  const f = fixture(t, "canonical");
  rmSync(path.join(f.tools, ".git"), { recursive: true, force: true });
  const result = f.execute(f.sourceSha);
  assert.equal(result.error, undefined);
  assert.equal(result.status, 1);
  assert.equal(existsSync(f.output), false);
});

test("modified tooling bytes are rejected even when its HEAD still matches", (t) => {
  const f = fixture(t);
  writeFileSync(
    path.join(f.tools, helperPath),
    'import { writeFileSync } from "node:fs";\n' +
      'writeFileSync(process.env.TAG_MARKER, "modified helper executed");\n'
  );
  const result = f.execute();
  assert.equal(result.error, undefined);
  assert.equal(result.status, 1);
  assert.equal(existsSync(f.output), false);
  assert.equal(existsSync(f.marker), false);
});

test("a symlink cannot replace the regular workflow tooling file", (t) => {
  const f = fixture(t);
  const target = path.join(f.cwd, "replacement-helper.mjs");
  writeFileSync(target, helper);
  rmSync(path.join(f.tools, helperPath));
  symlinkSync(target, path.join(f.tools, helperPath));
  const result = f.execute();
  assert.equal(result.error, undefined);
  assert.equal(result.status, 1);
  assert.equal(existsSync(f.output), false);
});
