import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parse } from "yaml";

const workflow = parse(
  readFileSync(new URL("../../../.github/workflows/ci.yml", import.meta.url), "utf8")
);

test("shards and the final coverage report merge incrementally without dropping the gate", () => {
  const runs: string[] = Object.values(workflow.jobs).flatMap(
    (job: { steps?: { run?: string }[] }) =>
      (job.steps || [])
        .map((step) => step.run || "")
        .filter((run) => /npx c8(?: report)?\s/.test(run))
  );
  assert.equal(runs.length, 2);
  for (const run of runs) assert.match(run, /--merge-async\b/);
  assert.ok(runs.some((run) => run.includes("npm run test:unit:ci:shard")));
  const aggregate = runs.find((run) => run.includes("npx c8 report"));
  assert.match(aggregate, /--check-coverage\b/);
  assert.match(aggregate, /--statements 60 --lines 60 --functions 60 --branches 60/);
});
