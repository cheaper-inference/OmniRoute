// bin/cli/launch/command/launch-action.mjs: the `launch` action: --cleanup, --list, the
// missing-tool check, then the hand-over to core's runLaunch.

import { LaunchError } from "../contract.mjs";
import { runCleanup } from "./cleanup.mjs";
import { argsAfterDashDash, buildLaunchFlags, globalOverrides } from "./flags.mjs";
import { listLaunchTools, renderList } from "./list.mjs";
import { io, jsonLine, reportError, resolveStateDir } from "./shared.mjs";

/** Deps keys forwarded to runLaunch only when injected, in this order. */
const FORWARDED_DEPS = ["stdout", "stderr", "env"];

/** Registered ids in registry order, without loading adapters when the registry can. */
function registryIds(registry) {
  if (typeof registry.ids === "function") return registry.ids();
  return registry.list().map((adapter) => adapter.id);
}

function writeCleanupReport(removed, { json, toolId, out }) {
  if (json && toolId) return;
  if (json) {
    out.stdout.write(jsonLine({ cleanup: removed }));
    return;
  }
  out.stderr.write(
    `omnirouter: cleanup removed ${removed.leases} stale leases, ${removed.tempDirs.length} temp dirs\n`
  );
}

/** Run the sweep; true when that was the whole command (no tool, no --list). */
async function cleanupStep(ctx) {
  const removed = await (ctx.deps.cleanup ?? runCleanup)({ stateDir: resolveStateDir(ctx.deps) });
  writeCleanupReport(removed, ctx);
  if (ctx.toolId || ctx.list) return false;
  ctx.out.setExitCode(0);
  return true;
}

async function listStep({ toolId, json, registry, deps, out }) {
  if (toolId) throw new LaunchError("UsageError", "--list takes no tool");
  const rows = await listLaunchTools(registry, { ...deps, env: deps.env ?? process.env });
  out.stdout.write(json ? jsonLine({ tools: rows }) : renderList(rows));
  out.setExitCode(0);
}

function assertToolGiven({ toolId, flags, registry }) {
  if (toolId || flags.preset) return;
  throw new LaunchError("UsageError", "missing tool", {
    hint: `launchable tools: ${registryIds(registry).join(", ")} (or omnirouter launch --list)`,
  });
}

function runLaunchDeps(deps, registry) {
  const forwarded = {};
  for (const key of FORWARDED_DEPS) if (deps[key]) forwarded[key] = deps[key];
  return { ...forwarded, ...(deps.launchDeps || {}), registry };
}

async function runStep({ toolId, flags, registry, deps, out }) {
  const run = deps.runLaunch ?? defaultRunLaunch;
  const result = await run(toolId ?? "", flags, runLaunchDeps(deps, registry));
  out.setExitCode(result?.exitCode ?? 0);
}

async function launchSteps(ctx) {
  if (ctx.flags.cleanup && (await cleanupStep(ctx))) return;
  if (ctx.list) return listStep(ctx);
  assertToolGiven(ctx);
  return runStep(ctx);
}

/** Commander action for `launch`; every effect goes through `deps` (see registerLaunchCommand). */
export function createLaunchAction({ registry, deps, legacy }) {
  return async (tool, toolArgs, opts, command) => {
    const out = io(deps);
    const json = Boolean(opts.json);
    try {
      const merged = { ...opts, ...globalOverrides(command, opts) };
      const { toolId, flags } = buildLaunchFlags(tool, toolArgs, merged, {
        afterDashDash: argsAfterDashDash(command),
        legacy,
      });
      await launchSteps({ toolId, flags, json, list: opts.list, registry, deps, out });
    } catch (error) {
      reportError(error, { json, ...out });
    }
  };
}

// Lazy loaders stay last: the test loader rewrites dynamic import() in place, which shifts
// the coverage offsets of any code that follows it.

/** The pipeline is heavy: load it only when a launch actually runs. */
async function defaultRunLaunch(...args) {
  return (await import("../core/pipeline.mjs")).runLaunch(...args);
}
