#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { load as parseYaml } from "js-yaml";

const SUITES = [
  ["test-unit", "unit", "test:unit:ci:shard"],
  ["test-integration", "integration", "test:integration:ci"],
  ["test-vitest", "vitest", "test:vitest:ui"],
];

function shardCount(job, suiteSteps) {
  const matrix = job?.strategy?.matrix;
  if (!matrix || Object.keys(matrix).length !== 1 || !Array.isArray(matrix.shard)) {
    throw new Error("Unsupported suite matrix");
  }
  const shards = matrix.shard;
  if (shards.length < 2 || shards.length > 256 || !shards.every((n, i) => n === i + 1)) {
    throw new Error("Suite shards must be consecutive integers starting at one");
  }
  const declarations = job.steps
    .filter((step) => step?.env?.TEST_SHARD !== undefined)
    .map((step) => /^\$\{\{\s*matrix\.shard\s*\}\}\/(\d+)$/.exec(step.env.TEST_SHARD));
  if (
    !declarations.length ||
    declarations.some((match) => !match || Number(match[1]) !== shards.length) ||
    suiteSteps.some((step) => step.env?.TEST_SHARD === undefined)
  ) {
    throw new Error("Suite shard declarations do not match the matrix");
  }
  return shards.length;
}

function scriptSteps(job, script, shardedUi = false) {
  const escaped = script.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(?:^|\\n)\\s*npm run ${escaped}(?=\\s|$)([^\\n]*)`, "g");
  return job.steps.filter((step) => {
    if (typeof step?.run !== "string") return false;
    const commands = [...step.run.matchAll(pattern)];
    for (const command of commands) {
      const suffix = command[1].trim();
      const tokens = suffix ? suffix.split(/\s+/) : [];
      const vitest = script === "test:vitest" || script === "test:vitest:ui";
      if (tokens.length && (!vitest || tokens.shift() !== "--")) {
        throw new Error("Unsupported suite command arguments");
      }
      const report = script === "test:vitest:ui" ? "vitest-ui.xml" : "vitest-mcp.xml";
      const shardFlag = '--shard="$TEST_SHARD"';
      const allowed = [
        "--reporter=default",
        "--reporter=junit",
        `--outputFile.junit=trunk-junit/${report}`,
        ...(shardedUi ? [shardFlag] : []),
      ];
      if (
        tokens.some((token) => !allowed.includes(token)) ||
        (shardedUi && tokens.filter((token) => token === shardFlag).length !== 1)
      ) {
        throw new Error("Suite selection differs from the supported hosted command");
      }
    }
    return commands.length > 0;
  });
}

/** Read data from the target commit; emitted command names are a fixed allowlist. */
export function hostedMatrixFromCi(yamlText) {
  const document = parseYaml(yamlText);
  if (document?.env?.TEST_SHARD !== undefined) {
    throw new Error("Workflow-level shard declarations are unsupported");
  }
  const include = SUITES.flatMap(([id, name, script]) => {
    const job = document?.jobs?.[id];
    if (!job || !Array.isArray(job.steps) || job.env?.TEST_SHARD !== undefined) {
      throw new Error(`Missing supported suite job for ${id}`);
    }
    const suiteSteps = scriptSteps(job, script, name === "vitest" && job.strategy !== undefined);
    if (!suiteSteps.length) {
      throw new Error(`Missing supported suite command for ${id}`);
    }
    if (name === "vitest" && !scriptSteps(job, "test:vitest").length) {
      throw new Error("Vitest must include the MCP suite and the UI suite");
    }
    // Older main commits run both Vitest suites in one job. A malformed strategy is
    // never interpreted as that legacy layout.
    if (name === "vitest" && job.strategy === undefined) {
      if (job.steps.some((step) => step?.env?.TEST_SHARD !== undefined)) {
        throw new Error("An unsharded Vitest job cannot declare TEST_SHARD");
      }
      return [{ name: "vitest", script: "test:vitest", shard: "" }];
    }
    const count = shardCount(job, suiteSteps);
    return Array.from({ length: count }, (_, i) => ({
      name: `${name}-${i + 1}`,
      script,
      shard: `${i + 1}/${count}`,
    }));
  });
  if (include.length > 256) throw new Error("Hosted suite matrix exceeds the job limit");
  return { include };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try {
    if (process.argv.length !== 3) throw new Error("Expected one CI workflow path");
    const matrix = hostedMatrixFromCi(readFileSync(process.argv[2], "utf8"));
    process.stdout.write(JSON.stringify(matrix) + "\n");
  } catch {
    process.stderr.write("Cannot derive supported hosted suites from the target CI workflow\n");
    process.exitCode = 1;
  }
}
