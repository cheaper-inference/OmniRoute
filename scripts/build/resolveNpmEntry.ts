import { existsSync } from "fs";
import { dirname, join } from "path";

/** Injectable seams for {@link resolveBundledNpmEntry} (all default to the real ones). */
export interface ResolveNpmEntryDeps {
  execPath?: string;
  /** `process.env.npm_execpath` — set by npm itself when running under `npm run`. */
  npmExecPath?: string;
  exists?: (p: string) => boolean;
}

/**
 * Locate `npm-cli.js` / `npx-cli.js` so build steps can run npm/npx through
 * `process.execPath` directly and never touch a `.cmd` shim (#8858), covering
 * BOTH install layouts:
 *  - Windows: `<dir(node.exe)>\node_modules\npm\bin\<name>` (npm beside the binary)
 *  - POSIX:   `<dir(node)>/../lib/node_modules/npm/bin/<name>` (node under `<prefix>/bin`,
 *    the shape of GitHub hosted runners, nvm and system installs)
 * When the script itself runs under `npm run`, npm exports `npm_execpath` pointing at
 * its own npm-cli.js — the most reliable source, tried first (npx-cli.js is its sibling).
 */
export function resolveBundledNpmEntry(
  name: "npm-cli.js" | "npx-cli.js",
  deps: ResolveNpmEntryDeps = {}
): string | null {
  const execPath = deps.execPath ?? process.execPath;
  const exists = deps.exists ?? existsSync;
  const npmExecPath = deps.npmExecPath ?? process.env.npm_execpath;

  const binDir = dirname(execPath);
  const candidates: string[] = [];
  if (npmExecPath) candidates.push(join(dirname(npmExecPath), name));
  candidates.push(join(binDir, "node_modules", "npm", "bin", name));
  candidates.push(join(binDir, "..", "lib", "node_modules", "npm", "bin", name));

  for (const candidate of candidates) {
    if (exists(candidate)) return candidate;
  }
  return null;
}

/** Executable + argv for an npm subcommand (no shell, no `.cmd` shim). */
export interface NpmInvocation {
  command: string;
  args: string[];
}

export interface NpmInvocationDeps extends ResolveNpmEntryDeps {
  platform?: NodeJS.Platform;
  /** Pre-resolved `npm-cli.js` path; `null` forces the plain-command fallback. */
  npmEntry?: string | null;
}

/**
 * Build the executable + argv used to run an npm subcommand from a build script.
 *
 * Prefers `process.execPath <npm-cli.js> <args>` — the reliable cross-platform
 * form that never touches a `.cmd` shim (#8858). Crucially it does NOT trust
 * `npm_execpath` as a JS entry point: non-npm runners set it to their own
 * executable, so `bun run` leaves it pointing at the bare `bun` binary. Feeding
 * that to `process.execPath` produced `node /path/to/bun …`, and Node dumped the
 * raw ELF bytes into the caller's error output (#16321).
 *
 * Falls back to the plain `npm` (`npm.cmd` on Windows) command only when no
 * bundled `npm-cli.js` can be located.
 */
export function resolveNpmInvocation(
  args: readonly string[],
  deps: NpmInvocationDeps = {}
): NpmInvocation {
  const platform = deps.platform ?? process.platform;
  const execPath = deps.execPath ?? process.execPath;
  const npmEntry =
    deps.npmEntry !== undefined ? deps.npmEntry : resolveBundledNpmEntry("npm-cli.js", deps);

  if (npmEntry) {
    return { command: execPath, args: [npmEntry, ...args] };
  }
  return { command: platform === "win32" ? "npm.cmd" : "npm", args: [...args] };
}
