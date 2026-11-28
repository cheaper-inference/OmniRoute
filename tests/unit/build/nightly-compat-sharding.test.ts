import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parse } from "yaml";

type Shard = { node: number; shard: number; shardTotal: number };
type CompatTests = {
  name: string;
  env: { TEST_SHARD: string };
  strategy: { matrix: { include: Shard[] } };
};

test("nightly compatibility runs complete, disjoint shards on each Node runtime", () => {
  const workflow = parse(
    readFileSync(new URL("../../../.github/workflows/nightly-compat.yml", import.meta.url), "utf8")
  ) as { jobs: { "compat-tests": CompatTests } };
  const job = workflow.jobs["compat-tests"];
  const expected = [
    [24, 4],
    [26, 8],
  ].flatMap(([node, shardTotal]) =>
    Array.from({ length: shardTotal }, (_, index) => ({ node, shard: index + 1, shardTotal }))
  );

  assert.deepEqual(job.strategy.matrix, { include: expected });
  assert.equal(job.env.TEST_SHARD, "${{ matrix.shard }}/${{ matrix.shardTotal }}");
  assert.equal(
    job.name,
    "Node ${{ matrix.node }} Compat Tests (${{ matrix.shard }}/${{ matrix.shardTotal }})"
  );
});
