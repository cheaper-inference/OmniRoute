import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { parse } from "yaml";

const workflow = parse(
  readFileSync(new URL("../../../.github/workflows/ci.yml", import.meta.url), "utf8")
);
const job = workflow.jobs["test-integration"];
const steps = job.steps;

test("integration identity executes before tests and binds UUIDs to the actual checkout", () => {
  const index = steps.findIndex((s) => s.id === "integration-progress-identity");
  const tests = steps.findIndex((s) => s.run === "npm run test:integration:ci");
  assert.ok(index >= 0 && index < tests);
  const folder = mkdtempSync(join(tmpdir(), "integration-workflow-identity-"));
  const file = join(folder, "github-env");
  const head = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  const ids = [];
  try {
    for (let i = 0; i < 2; i++) {
      writeFileSync(file, "EXISTING_FIXTURE=preserved\n");
      const result = spawnSync("bash", ["-e", "-o", "pipefail", "-c", steps[index].run], {
        env: {
          PATH: process.env.PATH,
          HOME: folder,
          XDG_STATE_HOME: join(folder, "state"),
          GITHUB_ENV: file,
        },
        encoding: "utf8",
      });
      assert.equal(result.status, 0);
      assert.equal(result.signal, null);
      assert.equal(result.stdout, "");
      assert.equal(result.stderr, "");
      const lines = readFileSync(file, "utf8").trimEnd().split("\n");
      assert.equal(lines.length, 3);
      assert.equal(lines[0], "EXISTING_FIXTURE=preserved");
      assert.match(
        lines[1],
        /^OMNIROUTE_INTEGRATION_INVOCATION_ID=[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/
      );
      assert.equal(lines[2], `OMNIROUTE_INTEGRATION_CHECKOUT_SHA=${head}`);
      ids.push(lines[1]);
    }
    assert.notEqual(ids[0], ids[1]);
  } finally {
    rmSync(folder, { recursive: true, force: true });
  }
});

test("each integration shard retains only metadata receipts even when its test step fails", () => {
  const tests = steps.findIndex((s) => s.run === "npm run test:integration:ci");
  const uploads = steps.filter((s) => s.with?.path === ".artifacts/integration-progress/*.jsonl");
  assert.equal(uploads.length, 1);
  const upload = uploads[0];
  assert.ok(steps.indexOf(upload) > tests);
  assert.equal(upload.if, "${{ always() }}");
  assert.equal(upload["continue-on-error"], true);
  assert.match(upload.uses, /^actions\/upload-artifact@[a-f0-9]{40}$/);
  assert.equal(
    upload.with.name,
    "integration-progress-ci-${{ github.run_id }}-${{ github.run_attempt }}-${{ matrix.shard }}"
  );
  assert.equal(upload.with["include-hidden-files"], true);
  assert.equal(upload.with["if-no-files-found"], "warn");
  assert.equal(upload.with["retention-days"], 14);
});

test("diagnostic retention preserves all blocking integration lanes and their deadline", () => {
  assert.equal(job["timeout-minutes"], 15);
  assert.equal(job["continue-on-error"], undefined);
  assert.equal(job.strategy["fail-fast"], false);
  assert.deepEqual(job.strategy.matrix.shard, [1, 2, 3, 4]);
  const runs = steps.filter((s) => s.run === "npm run test:integration:ci");
  assert.equal(runs.length, 1);
  assert.equal(runs[0].env.TEST_SHARD, "${{ matrix.shard }}/4");
  assert.equal(runs[0].if, undefined);
  assert.equal(runs[0]["continue-on-error"], undefined);
});
