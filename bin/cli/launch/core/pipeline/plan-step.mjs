// bin/cli/launch/core/pipeline/plan-step.mjs: resolveBinary + versionGate (started early), the
// launch context and middleware/plan/validate, shared by the launch and its previews.

import { buildContext, planLaunch } from "../plan.mjs";
import { probeTool, resolveBinary } from "../resolve-bin.mjs";
import { launchRoot } from "../state.mjs";
import { trace } from "../trace.mjs";
import { settle } from "./settle.mjs";

/**
 * Core's version-gate warnings (probeTool) minus those the plan already carries: adapters that
 * check their own gate word the below-recommended warning themselves, so core drops its generic
 * one when any plan warning names the recommended version (one warning per gate).
 * @returns {string[]}
 */
export function gateWarnings(adapter, probedWarnings = [], planWarnings = []) {
  const recommended = adapter?.capabilities?.versionGate?.recommended;
  const ownGateWarning =
    typeof recommended === "string" && planWarnings.some((w) => String(w).includes(recommended));
  return probedWarnings.filter((message) => {
    if (planWarnings.includes(message)) return false;
    return !(ownGateWarning && message.includes(`${recommended} or newer is recommended`));
  });
}

/**
 * Resolve the binary and, once found, probe its version. Both settle (never reject), so they can
 * run while other steps do and be consumed later.
 */
export function startBinaryProbe(L) {
  const { adapter, deps, platform } = L;
  const binResult = settle(() =>
    (deps.resolveBinary ?? resolveBinary)(adapter, { platform, env: L.env })
  );
  const probeResult = binResult.then((r) =>
    r.ok
      ? settle(() =>
          (deps.probeTool ?? probeTool)(adapter, r.value, {
            platform,
            env: L.baseEnv,
            cacheDir: launchRoot(L.dataDir),
            refreshCache: Boolean(L.flags.doctor),
          })
        )
      : r
  );
  return { binResult, probeResult };
}

/** buildContext for the launch `L` with the gateway, auth, view, model and tool it resolved. */
export function contextFor(L, { gateway, auth, view, model, bin, probed }) {
  const tool = {
    command: bin.command,
    shell: bin.shell,
    version: probed.version,
    features: probed.features,
  };
  return buildContext({
    platform: L.platform,
    homeDir: L.homeDir,
    baseEnv: L.baseEnv,
    cwd: L.cwd,
    gateway,
    auth,
    view,
    model,
    tool,
    profile: L.flags.profile,
    passthroughArgs: L.passthrough.args,
    passthroughJson: L.passthrough.json,
    settings: { ...L.settings, ...(model ? { model: model.id } : {}) },
  });
}

/**
 * planLaunch, warning the probe's warnings before a plan error propagates; on success, warns the
 * version-gate warnings the plan does not already carry.
 */
export function planWithWarnings(L, ctx0, probed) {
  let planned;
  try {
    planned = planLaunch(L.adapter, ctx0, { middleware: L.deps.middleware });
  } catch (error) {
    for (const message of probed.warnings) L.warn(message);
    throw error;
  }
  trace("plan");
  for (const message of gateWarnings(L.adapter, probed.warnings, planned.plan.warnings)) {
    L.warn(message);
  }
  return planned;
}
