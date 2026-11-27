// Replaces the archived cross-env package for this repository's npm scripts.
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { constants } from "node:os";
import { basename, dirname, isAbsolute, join } from "node:path";

const assignment = /^([A-Za-z_][A-Za-z0-9_]*)=/;
const windows = process.platform === "win32";

function resolveCommand(command, args) {
  if (command === "node") return [process.execPath, args];
  if (!windows) return [command, args];

  // Node runs the known JavaScript CLIs directly on Windows. Other commands
  // must be executable by spawn(); batch and .cmd shims require a shell.
  if (command === "c8") {
    const require = createRequire(import.meta.url);
    return [process.execPath, [require.resolve("c8/bin/c8.js"), ...args]];
  }
  if (command === "npm") {
    const npmExecPath = process.env.npm_execpath ?? "";
    const npmCli =
      isAbsolute(npmExecPath) && basename(npmExecPath) === "npm-cli.js"
        ? npmExecPath
        : join(dirname(process.execPath), "node_modules", "npm", "bin", "npm-cli.js");
    return [process.execPath, [npmCli, ...args]];
  }
  return [command, args];
}

function main(args) {
  const env = { __proto__: null, ...process.env };
  let index = 0;
  for (; index < args.length; index++) {
    const match = assignment.exec(args[index]);
    if (!match) break;
    const [prefix, name] = match;
    const key = windows
      ? (Object.keys(env).find((key) => key.toUpperCase() === name.toUpperCase()) ?? name)
      : name;
    env[key] = args[index].slice(prefix.length);
  }

  const command = args[index];
  if (!command) {
    console.error("with-env: missing command. Usage: with-env.mjs [KEY=VALUE ...] command [args]");
    process.exitCode = 1;
    return;
  }

  const fail = (error) => {
    console.error(`with-env: could not run ${command}: ${error.message}`);
    process.exitCode = 1;
  };
  let child;
  try {
    const [executable, commandArgs] = resolveCommand(command, args.slice(index + 1));
    child = spawn(executable, commandArgs, { stdio: "inherit", env, shell: false });
  } catch (error) {
    fail(error);
    return;
  }

  const forwardInt = () => child.kill("SIGINT");
  const forwardTerm = () => child.kill("SIGTERM");
  const stopForwarding = () => {
    process.off("SIGINT", forwardInt);
    process.off("SIGTERM", forwardTerm);
  };
  process.on("SIGINT", forwardInt);
  process.on("SIGTERM", forwardTerm);
  child.once("error", (error) => {
    stopForwarding();
    fail(error);
  });
  child.once("exit", (code, signal) => {
    stopForwarding();
    process.exitCode = code ?? (signal ? 128 + constants.signals[signal] : 1);
  });
}

main(process.argv.slice(2));
