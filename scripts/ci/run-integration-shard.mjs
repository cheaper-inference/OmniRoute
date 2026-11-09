#!/usr/bin/env node
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  discoverIntegrationFiles,
  integrationShardCommand,
} from "../quality/integration-shards.mjs";

export function integrationChildExitCode(code, signal) {
  return !signal && Number.isSafeInteger(code) && code >= 0 && code <= 255 ? code : 1;
}

/** The existing CI/observer deadline owns this process group. No retry or local timeout. */
export async function runIntegrationShard({
  cwd = process.cwd(),
  environment = process.env,
  spawnChild = spawn,
} = {}) {
  const command = integrationShardCommand(discoverIntegrationFiles(cwd), environment.TEST_SHARD);
  const child = spawnChild(process.execPath, command.args, {
    cwd,
    env: { ...environment },
    stdio: "inherit",
  });
  return await new Promise((resolve) => {
    let spawnFailed = false;
    child.once("error", () => {
      spawnFailed = true;
    });
    // close, not exit: preserve the runner result only after its streams have closed.
    child.once("close", (code, signal) =>
      resolve(spawnFailed ? 1 : integrationChildExitCode(code, signal))
    );
  });
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try {
    if (process.argv.length !== 2) throw new Error("INTEGRATION_ARGUMENTS_UNSUPPORTED");
    process.exitCode = await runIntegrationShard();
  } catch {
    process.stderr.write("INTEGRATION_SHARD_LAUNCH_FAILED\n");
    process.exitCode = 1;
  }
}
