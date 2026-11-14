#!/usr/bin/env node

/**
 * `omnirouter` entry point: the same Commander program as
 * `bin/omniroute.mjs`, named "omnirouter", with the new `launch` (tool required, unknown
 * options before `--` are an error) and `gateway status|keep|stop` commands. The legacy
 * `omniroute launch` stays on the `omniroute` bin.
 *
 * Kept thin on purpose: no env-file loading, storage-key provisioning or update notifier.
 * `launch` only talks to a gateway over HTTP; an auto-started gateway runs `omniroute serve`,
 * which does that work itself.
 */

import { readFileSync, realpathSync } from "node:fs";
import module from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { isVersionFastPath } from "./cli/utils/versionFastPath.mjs";
import { formatCliError } from "./cli/utils/formatCliError.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

if (isVersionFastPath(process.argv)) {
  console.log(JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")).version);
  process.exit(0);
}

/** Root options `createProgram()` (bin/cli/program.mjs) declares that take a value. */
const ROOT_VALUE_OPTIONS = new Set([
  "--output",
  "--timeout",
  "--api-key",
  "--base-url",
  "--context",
  "--lang",
]);
/** Root boolean options `createProgram()` declares. */
const ROOT_BOOLEAN_OPTIONS = new Set(["-q", "--quiet", "--no-color"]);
/** `--output` choices; an invalid value makes the root print its full help, so no fast path. */
const OUTPUT_CHOICES = ["table", "json", "jsonl", "csv"];
/** Commands the launch fast path serves. */
const FAST_PATH_COMMANDS = new Set(["launch", "gateway"]);

/** False only for an `--output` value outside its choices. */
function rootValueOk(name, value) {
  return name !== "--output" || OUTPUT_CHOICES.includes(value);
}

/**
 * Number of argv words the root option at `args[i]` takes (1 or 2), or 0 when `args[i]` is
 * not a root option `createProgram()` accepts with a valid value.
 */
function rootOptionWidth(args, i) {
  const arg = args[i];
  if (ROOT_BOOLEAN_OPTIONS.has(arg)) return 1;
  const eq = arg.indexOf("=");
  if (arg.startsWith("--") && eq > 2) {
    const name = arg.slice(0, eq);
    return ROOT_VALUE_OPTIONS.has(name) && rootValueOk(name, arg.slice(eq + 1)) ? 1 : 0;
  }
  if (!ROOT_VALUE_OPTIONS.has(arg) || i + 1 >= args.length) return 0;
  return rootValueOk(arg, args[i + 1]) ? 2 : 0;
}

/**
 * The command the launch fast path serves for this argv ("launch" or "gateway"), or null to
 * use the full program. Only root options `createProgram()` declares may precede the command
 * (`--opt value` or `--opt=value`); anything else (unknown option, `help`, `-h`, `--`, a
 * missing value) returns null. Exported for tests.
 * @param {string[]} argv full process.argv
 * @returns {"launch" | "gateway" | null}
 */
export function launchFastPathCommand(argv) {
  const args = argv.slice(2);
  let i = 0;
  while (i < args.length) {
    const width = rootOptionWidth(args, i);
    if (width === 0) return FAST_PATH_COMMANDS.has(args[i]) ? args[i] : null;
    i += width;
  }
  return null;
}

const FAST_PATH = launchFastPathCommand(process.argv) !== null;

if (FAST_PATH) {
  // Node's on-disk compile cache skips recompiling the launch graph, including type stripping
  // of its .ts file. It lives in the launcher state dir (DATA_DIR/launch/compile-cache), not the
  // system temp dir; Node's own compile-cache env vars still win. A cache failure never stops
  // the CLI.
  try {
    if (typeof module.enableCompileCache === "function") {
      const { resolveDataDir } = await import("./cli/data-dir.mjs");
      module.enableCompileCache(join(resolveDataDir(), "launch", "compile-cache"));
    }
  } catch {
    // no cache: compile as usual
  }
}

// The launch graph is plain .mjs plus one erasable-syntax .ts file, which Node loads itself
// when it can strip types; tsx is only needed without that (or for the full program).
if (!FAST_PATH || !process.features?.typescript) await import("tsx/esm");
if (!FAST_PATH) {
  await import("../open-sse/utils/setupPolyfill.ts");
  const { registerAliasResolver } = await import("./aliasResolver.mjs");
  await registerAliasResolver(ROOT);
}

/**
 * Minimal `omnirouter` program for `launch` / `gateway`: the root options of `createProgram()`
 * (same flags, defaults, env bindings, choices and descriptions) without the ~80 legacy
 * commands. Output for `launch ...` and `gateway ...` matches `createOmnirouterProgram()`;
 * tests/unit/cli/launch/perf-lazy-load.test.ts guards the parity. Exported for tests.
 */
export async function createLaunchFastProgram(deps = {}) {
  const [{ Command, Option }, { t }, { registerLaunchCommand, registerGatewayCommand }] =
    await Promise.all([
      import("commander"),
      import("./cli/i18n.mjs"),
      import("./cli/launch/command.mjs"),
    ]);
  const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
  const program = new Command();
  program
    .name("omnirouter")
    .description(t("program.description"))
    .version(pkg.version, "-v, --version", t("program.version"))
    .addOption(
      new Option("--output <format>", t("program.output")).choices(OUTPUT_CHOICES).default("table")
    )
    .addOption(new Option("-q, --quiet", t("program.quiet")))
    .addOption(new Option("--no-color", t("program.no_color")))
    .addOption(new Option("--timeout <ms>", t("program.timeout")).default("30000"))
    .addOption(new Option("--api-key <key>", t("program.api_key")).env("OMNIROUTE_API_KEY"))
    .addOption(new Option("--base-url <url>", t("program.base_url")).env("OMNIROUTE_BASE_URL"))
    .addOption(
      new Option(
        "--context <name>",
        t("program.context") || "Server context/profile to use for this command"
      ).env("OMNIROUTE_CONTEXT")
    )
    .addOption(new Option("--lang <code>", t("program.lang")))
    .showHelpAfterError(true)
    .exitOverride();
  registerLaunchCommand(program, { legacy: false, deps: deps.launch });
  registerGatewayCommand(program, { deps: deps.gateway });
  return program;
}

/**
 * Build the `omnirouter` program: the shared program with the legacy `launch` swapped for the
 * new one. Exported for tests.
 */
export async function createOmnirouterProgram(deps = {}) {
  const { createProgram } = await import(pathToFileURL(join(ROOT, "bin/cli/program.mjs")).href);
  const { registerLaunchCommand, registerGatewayCommand } = await import(
    pathToFileURL(join(ROOT, "bin/cli/launch/command.mjs")).href
  );
  const program = createProgram();
  program.name("omnirouter");
  for (const name of ["launch", "gateway"]) {
    const index = program.commands.findIndex((c) => c.name() === name);
    if (index !== -1) program.commands.splice(index, 1);
  }
  registerLaunchCommand(program, { legacy: false, deps: deps.launch });
  registerGatewayCommand(program, { deps: deps.gateway });
  return program;
}

function isMainModule() {
  if (!process.argv[1]) return false;
  try {
    // npm installs the bin as a symlink, so compare real paths.
    return realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
}

if (isMainModule()) {
  try {
    const program = FAST_PATH ? await createLaunchFastProgram() : await createOmnirouterProgram();
    if (process.env.OMNIROUTE_LAUNCH_TRACE === "1") {
      process.stderr.write(`omnirouter: trace ${performance.now().toFixed(1)}ms module load\n`);
    }
    await program.parseAsync(process.argv);
  } catch (err) {
    if (err?.exitCode !== undefined) process.exit(err.exitCode);
    console.error("omnirouter:", formatCliError(err));
    process.exit(1);
  }
}
