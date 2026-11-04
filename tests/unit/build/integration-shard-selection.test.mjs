import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { mkdtempSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  INTEGRATION_BATCH_FILE,
  INTEGRATION_NODE_ARGS,
  discoverIntegrationFiles,
  integrationBaseScript,
  integrationPartitions,
  integrationShardCommand,
} from "../../../scripts/quality/integration-shards.mjs";
import { canonicalSet } from "../../../scripts/quality/release-acceptance/inventory.mjs";
import {
  integrationChildExitCode,
  runIntegrationShard,
} from "../../../scripts/ci/run-integration-shard.mjs";

const inventory = (count) => [
  INTEGRATION_BATCH_FILE,
  ...Array.from(
    { length: count - 1 },
    (_, i) =>
      `tests/integration/${i % 7 === 0 ? "combo-matrix/" : ""}case-${String(i).padStart(3, "0")}.test.ts`
  ),
];

function fixture(t, count = 7) {
  const root = mkdtempSync(join(tmpdir(), "integration-selection-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, "tests/integration/combo-matrix"), { recursive: true });
  for (const file of inventory(count)) writeFileSync(join(root, file), "// inert fixture\n");
  return root;
}

for (const [count, sizes] of [
  [147, [1, 49, 49, 48]],
  [156, [1, 52, 52, 51]],
]) {
  test(`partitions ${count} unique files once and reserves the batch shard`, () => {
    const files = inventory(count);
    const parts = integrationPartitions(files);
    assert.deepEqual(
      parts.map((part) => part.length),
      sizes
    );
    assert.deepEqual(parts[0], [INTEGRATION_BATCH_FILE]);
    assert.deepEqual(parts.flat().sort(), [...files].sort());
    assert.equal(new Set(parts.flat()).size, count);
    assert.ok(parts.slice(1).every((part) => !part.includes(INTEGRATION_BATCH_FILE)));
  });
}

test("input enumeration order cannot move or omit files", () => {
  const files = inventory(147);
  assert.deepEqual(integrationPartitions(files), integrationPartitions([...files].reverse()));
});

test("the canonical collector inventory agrees with every actual selected file", () => {
  const root = fileURLToPath(new URL("../../../", import.meta.url));
  const files = discoverIntegrationFiles(root);
  assert.deepEqual(files, canonicalSet(["test:integration"], undefined, files).sort());
  assert.deepEqual(integrationPartitions(files).flat().sort(), files);
});

test("new regular files are included automatically without a stale file allowlist", () => {
  const files = [...inventory(147), "tests/integration/new-test.test.ts"];
  const flat = integrationPartitions(files).flat();
  assert.equal(flat.length, 148);
  assert.equal(flat.filter((file) => file === files.at(-1)).length, 1);
});

test("missing batch, duplicates, foreign scope and empty partitions fail closed", () => {
  for (const bad of [
    inventory(147).slice(1),
    [...inventory(147), INTEGRATION_BATCH_FILE],
    [...inventory(147), "tests/integration/services/live.test.ts"],
    [...inventory(147), "tests/integration/combo-live/live.test.ts"],
    [...inventory(147), "../outside.test.ts"],
    [...inventory(147), "tests/unit/other.test.ts"],
    inventory(3),
    [],
  ])
    assert.throws(() => integrationPartitions(bad));
});

test("only the four global CI shard identities are accepted", () => {
  for (const value of [undefined, "", "0/4", "5/4", "1/3", "01/4", "1/4 --smoke", "2/04"])
    assert.throws(() => integrationShardCommand(inventory(147), value));
});

test("global identity remains i/4 and no native three-way shard flag can redivide the selection", () => {
  for (let i = 1; i <= 4; i++) {
    const command = integrationShardCommand(inventory(147), `${i}/4`);
    assert.equal(command.globalShard, `${i}/4`);
    assert.equal(command.internalPartition, i === 1 ? null : `${i - 1}/3`);
    assert.deepEqual(command.args.slice(0, INTEGRATION_NODE_ARGS.length), INTEGRATION_NODE_ARGS);
    assert.ok(command.args.every((arg) => !arg.startsWith("--test-shard")));
    assert.ok(command.args.every((arg) => !arg.startsWith("--test-name-pattern")));
    assert.ok(command.args.includes("--test-force-exit"));
    assert.ok(command.args.includes("--test-concurrency=1"));
  }
  assert.ok(
    integrationBaseScript().endsWith(
      'tests/integration/*.test.ts "tests/integration/combo-matrix/*.test.ts"'
    )
  );
});

test("discovery rejects missing required directory instead of returning a partial inventory", (t) => {
  const root = fixture(t);
  rmSync(join(root, "tests/integration/combo-matrix"), { recursive: true });
  assert.throws(() => discoverIntegrationFiles(root));
});

test("discovery rejects a selected symlink before launching a test runner", (t) => {
  const root = fixture(t);
  symlinkSync("batch-e2e-rate-limit.test.ts", join(root, "tests/integration/link.test.ts"));
  assert.throws(() => discoverIntegrationFiles(root), /INTEGRATION_REGULAR_FILE_REQUIRED/);
});

test("runner waits for close, retains exact global environment and forwards the failure", async (t) => {
  const root = fixture(t);
  const child = new EventEmitter();
  let called = false;
  let settled = false;
  const pending = runIntegrationShard({
    cwd: root,
    environment: { TEST_SHARD: "3/4", DISABLE_SQLITE_AUTO_BACKUP: "true" },
    spawnChild(_node, args, options) {
      called = true;
      assert.equal(options.env.TEST_SHARD, "3/4");
      assert.equal(options.stdio, "inherit");
      assert.deepEqual(args, integrationShardCommand(inventory(7), "3/4").args);
      return child;
    },
  }).then((code) => {
    settled = true;
    return code;
  });
  assert.equal(called, true);
  child.emit("exit", 7, null);
  await Promise.resolve();
  assert.equal(settled, false);
  child.emit("close", 7, null);
  assert.equal(await pending, 7);
});

test("spawn error remains failure even if a later close reports zero", async (t) => {
  const root = fixture(t);
  const child = new EventEmitter();
  const pending = runIntegrationShard({
    cwd: root,
    environment: { TEST_SHARD: "1/4" },
    spawnChild: () => child,
  });
  child.emit("error", new Error("fixture"));
  child.emit("close", 0, null);
  assert.equal(await pending, 1);
});

test("a signal or missing status cannot become a passing receipt", () => {
  assert.equal(integrationChildExitCode(0, null), 0);
  assert.equal(integrationChildExitCode(12, null), 12);
  for (const [code, signal] of [
    [null, "SIGTERM"],
    [0, "SIGTERM"],
    [null, null],
    [-1, null],
  ])
    assert.notEqual(integrationChildExitCode(code, signal), 0);
});
