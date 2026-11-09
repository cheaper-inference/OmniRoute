import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { load } from "js-yaml";

type Step = {
  name?: string;
  uses?: string;
  if?: string;
  run?: string;
  with?: Record<string, unknown>;
};
type Workflow = { jobs: Record<string, { steps: Step[] }> };
const root = new URL("../../../", import.meta.url);
const read = (file: string) => readFileSync(fileURLToPath(new URL(file, root)), "utf8");
const workflow = load(read(".github/workflows/ci.yml")) as Workflow;

test(
  "unit preparation reclaims only disposable hosted Linux SDK storage",
  { timeout: 1000 },
  () => {
    const steps = workflow.jobs["test-unit"].steps;
    const index = steps.findIndex((step) => step.uses === "./.github/actions/prepare-unit-storage");
    assert.ok(index > steps.findIndex((step) => step.uses?.startsWith("actions/setup-node@")));
    for (const earlierStep of steps.slice(0, index)) {
      assert.doesNotMatch(earlierStep.run ?? "", /\/usr\/local\/lib\/android/);
    }
    const action = load(read(".github/actions/prepare-unit-storage/action.yml")) as {
      runs: { using: string; steps: Step[] };
    };
    assert.equal(action.runs.using, "composite");
    const cleanup = action.runs.steps[0];
    assert.equal(cleanup.if, "runner.environment == 'github-hosted' && runner.os == 'Linux'");
    assert.match(cleanup.run!, /set -euo pipefail/);
    assert.match(cleanup.run!, /\[ ! -L \/usr\/local\/lib\/android \]/);
    assert.match(cleanup.run!, /sudo rm -rf -- \/usr\/local\/lib\/android/);
    assert.equal((cleanup.run!.match(/sudo rm/g) || []).length, 1);
    assert.doesNotMatch(cleanup.run!, /toolcache|docker|swap|apt-get|dotnet|ghcup/);
    assert.equal((cleanup.run!.match(/df -h/g) || []).length, 2);
    assert.equal(action.runs.steps[1].uses, "./.github/actions/npm-ci-retry");
    assert.equal(action.runs.steps[1].with?.cache, "${{ inputs.cache }}");
    assert.equal(action.runs.steps[2].run, "npm run check:node-runtime");
  }
);

test(
  "storage preparation preserves raw coverage and failure propagation",
  { timeout: 1000 },
  () => {
    const steps = workflow.jobs["test-unit"].steps;
    const collect = steps.find((step) => step.name?.endsWith("with V8 coverage"))!;
    assert.match(collect.run!, /npx c8 --merge-async/);
    assert.match(collect.run!, /--temp-directory=coverage-shard/);
    assert.match(collect.run!, /npm run test:unit:ci:shard/);
    assert.doesNotMatch(collect.run!, /\|\| true|exit 0|--exclude=src/);
    const upload = steps.find((step) => step.name === "Upload raw shard coverage")!;
    assert.equal(upload.if, "always()");
    assert.equal(upload.with?.path, "coverage-shard/*.json");
    assert.equal(upload.with?.["if-no-files-found"], "error");
    const source = read(".github/workflows/ci.yml");
    assert.match(source, /shard: \[1, 2, 3, 4, 5, 6, 7, 8\]/);
    assert.match(source, /--check-coverage/);
    assert.match(collect.run!, /trap .*EXIT/);
  }
);
