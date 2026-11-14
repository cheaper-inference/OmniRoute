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
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { isVersionFastPath } from "./cli/utils/versionFastPath.mjs";
import { formatCliError } from "./cli/utils/formatCliError.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

if (isVersionFastPath(process.argv)) {
  console.log(JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")).version);
  process.exit(0);
}

await import("tsx/esm");
await import("../open-sse/utils/setupPolyfill.ts");
const { registerAliasResolver } = await import("./aliasResolver.mjs");
await registerAliasResolver(ROOT);

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
    const program = await createOmnirouterProgram();
    await program.parseAsync(process.argv);
  } catch (err) {
    if (err?.exitCode !== undefined) process.exit(err.exitCode);
    console.error("omnirouter:", formatCliError(err));
    process.exit(1);
  }
}
