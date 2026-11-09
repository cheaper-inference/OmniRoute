import { readdirSync } from "node:fs";
import { join } from "node:path";
import { canonicalSet } from "./release-acceptance/inventory.mjs";
import { integrationSourcePath } from "../ci/unit-diagnostics.mjs";

export const INTEGRATION_BATCH_FILE = "tests/integration/batch-e2e-rate-limit.test.ts";
export const INTEGRATION_NODE_ARGS = Object.freeze([
  "--import",
  "tsx/esm",
  "--import",
  "./open-sse/utils/setupPolyfill.ts",
  "--import",
  "./tests/_setup/isolateDataDir.ts",
  "--test",
  "--test-force-exit",
  "--test-concurrency=1",
  "--test-reporter=spec",
  "--test-reporter=./scripts/ci/integration-progress-reporter.mjs",
  "--test-reporter-destination=stdout",
  "--test-reporter-destination=stderr",
]);
export const INTEGRATION_CI_SCRIPT =
  "cross-env DISABLE_SQLITE_AUTO_BACKUP=true node scripts/ci/run-integration-shard.mjs";
const SCRIPT = "test:integration:ci";
const GLOBS = 'tests/integration/*.test.ts "tests/integration/combo-matrix/*.test.ts"';

export function integrationBaseScript() {
  return `cross-env DISABLE_SQLITE_AUTO_BACKUP=true node ${INTEGRATION_NODE_ARGS.join(" ")} ${GLOBS}`;
}

/** Keep the canonical two-glob inventory; reject malformed inputs rather than drop them. */
export function integrationPartitions(files) {
  if (
    !Array.isArray(files) ||
    files.some((file) => integrationSourcePath(file, process.cwd()) !== file) ||
    new Set(files).size !== files.length
  )
    throw new Error("INTEGRATION_SELECTION_INVALID");
  const selected = canonicalSet(["test:integration"], undefined, files).sort();
  if (selected.length !== files.length || !selected.includes(INTEGRATION_BATCH_FILE))
    throw new Error("INTEGRATION_SELECTION_INCOMPLETE");
  const remainder = selected.filter((file) => file !== INTEGRATION_BATCH_FILE);
  if (remainder.length < 3) throw new Error("INTEGRATION_SELECTION_EMPTY_SHARD");
  return [
    [INTEGRATION_BATCH_FILE],
    ...[0, 1, 2].map((shard) => remainder.filter((_, index) => index % 3 === shard)),
  ];
}

export function discoverIntegrationFiles(root) {
  const candidates = [];
  for (const directory of ["tests/integration", "tests/integration/combo-matrix"]) {
    // A missing directory or a non-regular selected file is an error, never an empty shard.
    for (const entry of readdirSync(join(root, directory), { withFileTypes: true })) {
      if (!entry.name.endsWith(".test.ts")) continue;
      if (!entry.isFile()) throw new Error("INTEGRATION_REGULAR_FILE_REQUIRED");
      candidates.push(`${directory}/${entry.name}`);
    }
  }
  integrationPartitions(candidates);
  return candidates.sort();
}

export function integrationShardCommand(files, shard) {
  if (!/^[1-4]\/4$/.test(shard || "")) throw new Error("INTEGRATION_SHARD_INVALID");
  const partitions = integrationPartitions(files);
  const selected = partitions[Number(shard[0]) - 1];
  return {
    globalShard: shard,
    internalPartition: shard === "1/4" ? null : `${Number(shard[0]) - 1}/3`,
    args: [...INTEGRATION_NODE_ARGS, ...selected],
  };
}

/** Static, fail-closed plan from the exact CI job; never interpret workflow shell. */
export function integrationPlanFromCiJob(job, scripts) {
  const invalid = () => {
    throw new Error("INTEGRATION_CI_PLAN_INVALID");
  };
  const matrix = job?.strategy?.matrix?.shard;
  if (
    !Array.isArray(matrix) ||
    matrix.length !== 4 ||
    !matrix.every((value, index) => value === index + 1) ||
    job.strategy["fail-fast"] !== false ||
    !Number.isSafeInteger(job["timeout-minutes"]) ||
    job["timeout-minutes"] < 1 ||
    !Number.isSafeInteger(job["timeout-minutes"] * 60 * 1000)
  )
    invalid();
  const steps = Array.isArray(job.steps) ? job.steps : [];
  const commands = steps.filter((step) => step?.run === `npm run ${SCRIPT}`);
  if (commands.length !== 1) invalid();
  const shard = /^\$\{\{\s*matrix\.shard\s*\}\}\/(\d+)$/.exec(
    String(commands[0]?.env?.TEST_SHARD ?? "")
  );
  if (!shard || Number(shard[1]) !== matrix.length) invalid();
  const base = scripts?.["test:integration"];
  const ci = scripts?.[SCRIPT];
  if (base !== integrationBaseScript() || ci !== INTEGRATION_CI_SCRIPT) invalid();
  return {
    total: matrix.length,
    maxConcurrent: 1,
    timeoutMs: job["timeout-minutes"] * 60 * 1000,
    commands: matrix.map((index) => ({
      args: ["run", SCRIPT],
      env: { TEST_SHARD: `${index}/${matrix.length}` },
      label: `npm run ${SCRIPT} (TEST_SHARD=${index}/${matrix.length})`,
    })),
  };
}

/** Sequential, as local DB/port fixtures share one checkout; CI fail-fast=false is retained. */
export async function executeIntegrationPlan(plan, run) {
  if (
    !Number.isSafeInteger(plan?.total) ||
    plan.total !== 4 ||
    plan.maxConcurrent !== 1 ||
    !Number.isSafeInteger(plan.timeoutMs) ||
    plan.timeoutMs < 1 ||
    !Array.isArray(plan.commands) ||
    plan.commands.length !== plan.total ||
    !plan.commands.every(
      (command, index) =>
        command.args?.length === 2 &&
        command.args[0] === "run" &&
        command.args[1] === SCRIPT &&
        command.env?.TEST_SHARD === `${index + 1}/${plan.total}`
    )
  )
    return {
      code: 1,
      out: "integration shard plan incomplete\n",
      detail: "INCOMPLETE integration shard plan",
    };
  const results = [];
  for (const command of plan.commands) {
    const result = await run(command.args, {
      timeout: plan.timeoutMs,
      env: command.env,
      label: command.label,
    });
    // Individual command receipts retain their evidence. Do not concatenate four raw outputs
    // (each gate already has a 256 MiB capture ceiling) into another unbounded buffer.
    const complete = result?.receipt && ["PASS", "FAIL"].includes(result.receipt.outcome);
    const code = Number.isSafeInteger(result?.code) && result.code >= 0 ? result.code : 1;
    const ok = complete && code === 0 && result.receipt.outcome === "PASS";
    results.push({
      shard: command.env.TEST_SHARD,
      ok,
      code: ok ? 0 : code || 1,
      status: ok
        ? "PASS"
        : result?.receipt?.outcome === "TIMEOUT"
          ? "TIMEOUT"
          : complete
            ? "FAIL"
            : "INCOMPLETE",
      invocationId: result?.invocationId,
    });
  }
  const failed = results.filter((result) => !result.ok);
  if (results.length !== plan.total || plan.total !== 4) {
    return {
      code: 1,
      out: "integration shard set incomplete\n",
      detail: "INCOMPLETE integration shard set",
    };
  }
  const out =
    results.map((result) => `integration shard ${result.shard}: ${result.status}`).join("\n") +
    "\n";
  return {
    code: failed[0]?.code ?? 0,
    out,
    detail: failed.length
      ? failed.map((result) => `integration shard ${result.shard} ${result.status}`).join(", ")
      : "pass",
    ...(failed[0]?.invocationId ? { causeId: failed[0].invocationId } : {}),
  };
}
