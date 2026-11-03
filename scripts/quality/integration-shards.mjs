const SCRIPT = "test:integration:ci";
const GLOBS = 'tests/integration/*.test.ts "tests/integration/combo-matrix/*.test.ts"';

/** Static, fail-closed plan from the exact CI job; never interpret workflow shell. */
export function integrationPlanFromCiJob(job, scripts) {
  const invalid = () => {
    throw new Error("INTEGRATION_CI_PLAN_INVALID");
  };
  const matrix = job?.strategy?.matrix?.shard;
  if (
    !Array.isArray(matrix) ||
    matrix.length < 2 ||
    matrix.length > 64 ||
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
  const concurrency = "--test-concurrency=1 ";
  if (
    typeof base !== "string" ||
    typeof ci !== "string" ||
    !base.endsWith(GLOBS) ||
    base.split(concurrency).length !== 2 ||
    base.includes("--test-shard") ||
    !base.includes("--test-force-exit ") ||
    ci !== base.replace(concurrency, `${concurrency}--test-shard=$TEST_SHARD `)
  )
    invalid();
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
    plan.total < 2 ||
    plan.total > 64 ||
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
  if (results.length !== plan.total || plan.total < 2) {
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
