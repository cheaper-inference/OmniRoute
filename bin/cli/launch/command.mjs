// bin/cli/launch/command.mjs: the `omnirouter launch` and `omnirouter gateway` commands.
// Thin: parse flags into the camelCase shape `runLaunch` takes,
// then hand over to core. Every effect is injectable through `deps` for tests.
// The pieces live in ./command/ (flags, options, list, cleanup, launch action, gateway).
//
//   omnirouter launch <tool> [options] [-- toolArgs...]
//   omnirouter launch --list [--json]
//   omnirouter gateway status|keep|stop

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
 *   legacy: under the `omniroute` bin, unknown options and stray positionals pass through to the
 *   tool (old `omniroute launch` behaviour). deps: runLaunch, registry, setExitCode, stdout,
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
  cmd.showHelpAfterError("(see omnirouter launch --help)");
  if (legacy) cmd.allowUnknownOption(true).allowExcessArguments(true);
  cmd.addHelpText("after", () => helpFooter(registry));
  cmd.action(createLaunchAction({ registry, deps, legacy }));
  return cmd;
}
