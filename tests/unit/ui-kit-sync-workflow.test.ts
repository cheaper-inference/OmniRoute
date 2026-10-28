/**
 * Contract tests for the daily UI kit sync (.github/workflows/ui-kit-sync.yml) and for the
 * workspace-version helper the sync script calls (scripts/dev/sync-ui-kit-version.mjs).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as yaml from "js-yaml";
// @ts-expect-error — plain .mjs helper without type declarations
import { syncWorkspaceVersion } from "../../scripts/dev/sync-ui-kit-version.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const read = (p: string) => fs.readFileSync(path.join(repoRoot, p), "utf8");

type Step = {
  name?: string;
  uses?: string;
  run?: string;
  if?: string;
  with?: Record<string, unknown>;
  env?: Record<string, string>;
};
type Job = { if?: string; permissions?: Record<string, string>; steps: Step[] };
type Workflow = {
  on: Record<string, unknown>;
  permissions: Record<string, string>;
  jobs: Record<string, Job>;
};

const workflowText = read(".github/workflows/ui-kit-sync.yml");
const workflow = yaml.load(workflowText) as Workflow;
const job = workflow.jobs.sync;

test("the UI kit sync runs daily and on demand; scheduled runs stay in the main repository", () => {
  assert.ok(workflow.on.schedule, "has a schedule trigger");
  assert.ok(workflow.on.workflow_dispatch, "can be dispatched by hand");
  assert.equal(
    job.if,
    "${{ github.event_name != 'schedule' || github.repository == 'cheaper-inference/OmniRoute' }}"
  );
});

test("the UI kit sync keeps least privilege and pinned actions", () => {
  assert.deepEqual(workflow.permissions, { contents: "read" });
  assert.deepEqual(job.permissions, {
    contents: "write",
    "pull-requests": "write",
    issues: "read",
  });
  for (const step of job.steps.filter((s) => s.uses)) {
    assert.match(step.uses!, /@[0-9a-f]{40}$/, `${step.uses} is pinned to a full SHA`);
  }
  const checkout = job.steps.find((s) => s.uses?.startsWith("actions/checkout@"));
  assert.equal(checkout?.with?.["persist-credentials"], false);
});

test("secrets and inputs reach the scripts only through env, never interpolated into run", () => {
  for (const step of job.steps.filter((s) => s.run)) {
    assert.doesNotMatch(step.run!, /\$\{\{/, `${step.name} has no \${{ }} inside run`);
  }
  assert.match(workflowText, /KIT_TOKEN: \$\{\{ secrets\.UI_KIT_READ_TOKEN \}\}/);
  assert.match(
    workflowText,
    /GH_TOKEN: \$\{\{ secrets\.UI_KIT_SYNC_PR_TOKEN \|\| github\.token \}\}/
  );
});

test("the UI kit sync holds on a frozen release, exits without the secret and skips known versions", () => {
  const all = job.steps.map((s) => s.run ?? "").join("\n");
  assert.match(
    all,
    /release-freeze: \$\{BASE#release\/\} /,
    "matches the freeze issue title for the target release"
  );
  assert.match(all, /UI_KIT_READ_TOKEN is not set — nothing to do\./);
  assert.match(all, /already exists — a sync PR for \$VERSION is open or was handled\./);
  for (const step of job.steps.slice(1)) {
    assert.match(
      step.if ?? "",
      /steps\.base\.outputs\.frozen == 'false'/,
      `${step.name} is skipped while frozen`
    );
  }
  assert.match(all, /scripts\/dev\/sync-ui-kit\.sh "\$TARGET"/);
  assert.match(all, /node scripts\/check\/check-ui-kit-snapshot\.mjs/);
});

function fixture(version: string, lockVersion: string) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ui-kit-version-"));
  fs.mkdirSync(path.join(dir, "packages", "ui-kit"), { recursive: true });
  fs.writeFileSync(
    path.join(dir, "packages", "ui-kit", "package.json"),
    `${JSON.stringify({ name: "@omniroute/ui-kit", version, private: true }, null, 2)}\n`
  );
  fs.writeFileSync(
    path.join(dir, "package-lock.json"),
    `${JSON.stringify({ name: "omniroute", lockfileVersion: 3, packages: { "": { name: "omniroute" }, "packages/ui-kit": { name: "@omniroute/ui-kit", version: lockVersion } } }, null, 2)}\n`
  );
  return dir;
}

test("syncWorkspaceVersion bumps the workspace and its lockfile entry, and is idempotent", () => {
  const dir = fixture("0.0.66", "0.0.66");
  try {
    assert.deepEqual(syncWorkspaceVersion(dir, "0.0.79"), [
      "packages/ui-kit/package.json",
      "package-lock.json",
    ]);
    assert.equal(
      JSON.parse(fs.readFileSync(path.join(dir, "packages/ui-kit/package.json"), "utf8")).version,
      "0.0.79"
    );
    const lock = fs.readFileSync(path.join(dir, "package-lock.json"), "utf8");
    assert.equal(JSON.parse(lock).packages["packages/ui-kit"].version, "0.0.79");
    assert.ok(lock.endsWith("}\n"), "keeps npm's trailing newline");
    assert.deepEqual(syncWorkspaceVersion(dir, "0.0.79"), [], "a second run changes nothing");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("syncWorkspaceVersion refuses a malformed version", () => {
  const dir = fixture("0.0.66", "0.0.66");
  try {
    assert.throws(() => syncWorkspaceVersion(dir, "latest"), /invalid kit version/);
    assert.equal(
      JSON.parse(fs.readFileSync(path.join(dir, "packages/ui-kit/package.json"), "utf8")).version,
      "0.0.66"
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("the repository's own workspace version mirrors UPSTREAM.md (the sync keeps them together)", () => {
  const pinned = /^- version:\s*(\d+\.\d+\.\d+)$/m.exec(read("packages/ui-kit/UPSTREAM.md"))?.[1];
  assert.equal(JSON.parse(read("packages/ui-kit/package.json")).version, pinned);
  assert.equal(JSON.parse(read("package-lock.json")).packages["packages/ui-kit"].version, pinned);
});
