// npm plumbing for `omniroute plugin install|remove|update` (#21056).
//
// Plugins are installed into a private npm prefix (`~/.omniroute/plugins`), which is
// the same directory `discoverPlugins()` scans — a global `npm install -g` landed in
// `$(npm root -g)`, a place discovery never looked at.
import { spawnSync } from "node:child_process";
import { homedir } from "node:os";
import { isAbsolute, join, resolve } from "node:path";
import { npmBin, npmExecInvocation, npmExecOptions } from "./npm-exec.mjs";
import { escapeWindowsShellArg } from "./utils/winShellArgs.mjs";

const LITERAL_TOKEN = /^[A-Za-z0-9@._/:=+-]+$/;
const UNSAFE_CHARS = /[\0\r\n]/;
const WINDOWS_DRIVE_RE = /^[A-Za-z]:[\\/]/;

/** Where plugins are installed (an npm `--prefix`); `node_modules/` lives below it. */
export function getPluginPrefix(home = homedir()) {
  return join(home, ".omniroute", "plugins");
}

/** True when the user passed a path / file: spec rather than a registry name. */
export function isLocalPluginSpec(name) {
  return (
    name === "." ||
    name === ".." ||
    name.startsWith("./") ||
    name.startsWith("../") ||
    name.startsWith(".\\") ||
    name.startsWith("..\\") ||
    name.startsWith("/") ||
    name.startsWith("~/") ||
    name.startsWith("file:") ||
    WINDOWS_DRIVE_RE.test(name) ||
    name.startsWith("\\\\")
  );
}

/** Spec handed to npm: absolute path for local installs, `omniroute-cmd-<name>` otherwise. */
export function resolvePluginSpec(name, cwd = process.cwd(), home = homedir()) {
  if (!isLocalPluginSpec(name)) {
    return name.startsWith("omniroute-cmd-") || name.startsWith("@")
      ? name
      : `omniroute-cmd-${name}`;
  }
  if (name.startsWith("file:")) return name;
  if (name.startsWith("~/")) return join(home, name.slice(2));
  if (isAbsolute(name) || WINDOWS_DRIVE_RE.test(name) || name.startsWith("\\\\")) return name;
  return resolve(cwd, name);
}

/**
 * Build `[file, args, options]` for spawnSync. Tokens that are not plain literals are
 * validated (no NUL/newline, no leading "-") and, on win32, escaped before joining
 * (Hard Rule #13).
 */
export function buildPluginNpmInvocation(args, platform = process.platform) {
  const isBun = Boolean(process.versions.bun);
  const cmdArgs = isBun && args[0] === "install" ? ["add", ...args.slice(1)] : args;
  const bin = npmBin(platform);
  const opts = npmExecOptions(platform, { stdio: "inherit" });
  cmdArgs.forEach((token, i) => {
    if (
      typeof token !== "string" ||
      UNSAFE_CHARS.test(token) ||
      (i > 0 && token.startsWith("-") && !LITERAL_TOKEN.test(token))
    ) {
      throw new Error(`Refusing unsafe npm argument ${JSON.stringify(token)}`);
    }
  });
  if (platform !== "win32") return npmExecInvocation(platform, bin, cmdArgs, opts);
  const line = [bin, ...cmdArgs.map((t) => (LITERAL_TOKEN.test(t) ? t : escapeWindowsShellArg(t)))];
  return [line.join(" "), [], opts];
}

export function runPluginNpm(args, platform = process.platform) {
  const [file, fileArgs, opts] = buildPluginNpmInvocation(args, platform);
  const res = spawnSync(file, fileArgs, opts);
  if (res.error) throw res.error;
  if (typeof res.status === "number" && res.status !== 0) {
    throw new Error(`${file.split(" ")[0]} exited with code ${res.status}`);
  }
}
