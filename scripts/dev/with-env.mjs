// Replaces the archived cross-env package for this repository's npm scripts.
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { constants } from "node:os";
import { win32 } from "node:path";
import { isMainModule } from "../lib/is-main-module.mjs";

const assignment = /^([A-Za-z_][A-Za-z0-9_]*)=/;

export function parseAssignments(
  args,
  { platform = process.platform, env: baseEnv = process.env } = {}
) {
  const env = { __proto__: null, ...baseEnv };
  let index = 0;
  for (; index < args.length; index++) {
    const match = assignment.exec(args[index]);
    if (!match) break;
    const [prefix, name] = match;
    const key =
      platform === "win32"
        ? (Object.keys(env).find((key) => key.toUpperCase() === name.toUpperCase()) ?? name)
        : name;
    env[key] = args[index].slice(prefix.length);
  }
  return { env, index };
}

export function resolveCommand(
  command,
  args,
  {
    platform = process.platform,
    execPath = process.execPath,
    npmExecPath = process.env.npm_execpath ?? "",
    resolveC8 = () => createRequire(import.meta.url).resolve("c8/bin/c8.js"),
  } = {}
) {
  if (command === "node") return [execPath, args];
  if (platform !== "win32") return [command, args];

  // Node runs the known JavaScript CLIs directly on Windows. Other commands
  // must be executable by spawn(); batch and .cmd shims require a shell.
  if (command === "c8") {
    return [execPath, [resolveC8(), ...args]];
  }
  if (command === "npm") {
    const npmCli =
      win32.isAbsolute(npmExecPath) && win32.basename(npmExecPath) === "npm-cli.js"
        ? npmExecPath
        : win32.join(win32.dirname(execPath), "node_modules", "npm", "bin", "npm-cli.js");
    return [execPath, [npmCli, ...args]];
  }
  return [command, args];
}

function main(args) {
  const { env, index } = parseAssignments(args);
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

if (isMainModule(import.meta.url)) main(process.argv.slice(2));
