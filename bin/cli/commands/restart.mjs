import { t } from "../i18n.mjs";
import { runStopCommand } from "./stop.mjs";
import { sleep } from "../utils/pid.mjs";

export function registerRestart(program) {
  program
    .command("restart")
    .description(t("restart.description"))
    // No Commander default: runServe() falls back to PORT, then 20128 (#7049).
    .option("--port <port>", t("serve.port"))
    .action(async (opts) => {
      const exitCode = await runRestartCommand(opts);
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runRestartCommand(opts = {}, deps = {}) {
  const stop = deps.runStopCommand ?? runStopCommand;
  const wait = deps.sleep ?? sleep;
  console.log(t("restart.restarting"));

  await stop(opts);
  await wait(1000);

  // #17168: come back detached, like `serve --daemon`. Without it runServe() took
  // the foreground supervisor path and the restart never returned to the shell.
  const runServe = deps.runServe ?? (await import("./serve.mjs")).runServe;
  await runServe({ ...opts, daemon: true });
  return 0;
}
