// bin/cli/launch/command.mjs: the `omniroute launch` and `omniroute gateway` commands.
// Thin: parse flags into the camelCase shape `runLaunch` takes,
// then hand over to core. Every effect is injectable through `deps` for tests.
// The pieces live in ./command/ (flags, options, list, cleanup, launch action, gateway).
// bin/cli/commands/launch.mjs routes `omniroute launch <tool>`, `--list` and `--cleanup` here;
// bin/cli/commands/gateway.mjs registers `gateway` on the omniroute program.
//
//   omniroute launch <tool> [options] [-- toolArgs...]
//   omniroute launch --list [--json]
//   omniroute gateway status|keep|stop

import { launchRegistry } from "./registry.mjs";
import { createLaunchAction } from "./command/launch-action.mjs";
import { addLaunchOptions, helpFooter } from "./command/options.mjs";
import { usageExitOverride } from "./command/shared.mjs";

export { buildLaunchFlags } from "./command/flags.mjs";
export { listLaunchTools } from "./command/list.mjs";
export { runCleanup } from "./command/cleanup.mjs";
export { registerGatewayCommand } from "./command/gateway.mjs";

/**
 * Register `launch`.
 * @param {import("commander").Command} program
 * @param {{ legacy?: boolean, deps?: object }} [options]
 *   legacy: unknown options and stray positionals pass through to the tool instead of being a
 *   usage error (the old `omniroute launch` pass-through style); `omniroute launch` itself runs
 *   the strict form. deps: runLaunch, registry, setExitCode, stdout,
 *   stderr, env, platform, resolveBinary/probeTool (for --list), cleanup, launchDeps (passed to
 *   runLaunch as its deps, merged with the registry).
 */
export function registerLaunchCommand(program, { legacy = false, deps = {} } = {}) {
  const registry = deps.registry ?? launchRegistry;

  const cmd = program
    .command("launch")
    .description("Launch an AI coding tool through OmniRoute (auto-starts the gateway)")
    .argument("[tool]", "tool id or alias (see the list below)")
    .argument("[toolArgs...]", "arguments for the tool, after --");
  addLaunchOptions(cmd);
  cmd.exitOverride(usageExitOverride);
  cmd.showHelpAfterError("(see omniroute launch <tool> --help)");
  if (legacy) cmd.allowUnknownOption(true).allowExcessArguments(true);
  cmd.addHelpText("after", () => helpFooter(registry));
  cmd.action(createLaunchAction({ registry, deps, legacy }));
  return cmd;
}
