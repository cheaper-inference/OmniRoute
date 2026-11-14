// bin/cli/launch/core/pipeline/execute-step.mjs: remember the picked model, then execute the plan
// (heartbeat while the child runs; after exit: summary, revoke) and report its result.

import { recordModelPreference } from "../../../model-preferences.mjs";
import { startHeartbeat, HEARTBEAT_INTERVAL_MS } from "../session.mjs";
import { toolStateDir, writeLastLaunch, writeToolDefaults } from "../state.mjs";
import { revokeRun } from "./run-state.mjs";
import { reportUsage } from "./summary.mjs";

function nowMs(deps) {
  return (deps.now ?? Date.now)();
}

function persistModel(L, id) {
  const { deps, dataDir, tool, flags } = L;
  (deps.recordPreference ?? recordModelPreference)(tool, id, {
    context: L.contextKey,
    favorite: Boolean(flags.favorite),
    unfavorite: Boolean(flags.unfavorite),
  });
  (deps.writeLastLaunch ?? writeLastLaunch)(dataDir, tool, {
    model: id,
    at: new Date(nowMs(deps)).toISOString(),
  });
  if (flags.setDefault) {
    (deps.writeToolDefaults ?? writeToolDefaults)(dataDir, tool, { ...L.defaults, model: id });
  }
}

/** Record the picked model as preference, last launch and (--set-default) tool default. */
export function savePreferences(L, picked) {
  if (!picked.model) return;
  try {
    persistModel(L, picked.model.id);
  } catch (error) {
    L.warn(`could not save model preferences: ${error?.message ?? "error"}`);
  }
}

/** The child lifecycle hooks: heartbeat on spawn; after exit, summary then revoke. */
function lifecycleHooks(L, run, outcome) {
  const { deps, bus } = L;
  const started = nowMs(deps);
  const onSpawn = async (child) => {
    run.heartbeat = startHeartbeat(run.client, run.session, {
      intervalMs: deps.heartbeatMs ?? HEARTBEAT_INTERVAL_MS,
      warn: L.warn,
      setInterval: deps.setInterval,
      clearInterval: deps.clearInterval,
    });
    await bus.emit({ type: "child.spawned", pid: child?.pid });
  };
  const afterExit = async ({ exitCode }) => {
    run.heartbeat?.stop();
    await bus.emit({ type: "child.exited", code: exitCode, durationMs: nowMs(deps) - started });
    if (L.settings.summary) await reportUsage(L, run, outcome);
    await revokeRun(run);
  };
  return { onSpawn, afterExit };
}

function executeOptions(L, run, { bin, probed }) {
  const { deps } = L;
  const { session } = run;
  return {
    command: bin.command,
    shell: bin.shell,
    platform: L.platform,
    baseEnv: L.baseEnv,
    token: session.token,
    stateDir: toolStateDir(L.dataDir, L.tool, L.cwd),
    tmpRoot: deps.tmpRoot,
    tmpPrefix: deps.tmpPrefix,
    extraEnv: { OMNIROUTER_SESSION_ID: session.sessionId },
    cwd: L.cwd,
    spawn: deps.spawn,
    stdio: deps.stdio,
    signalSource: deps.signalSource,
    signalTimeoutMs: deps.signalTimeoutMs,
    toolVersion: probed.version,
    readAsset: deps.readAsset,
    warn: L.warn,
  };
}

function writeExitHints(L, result, ctx) {
  if (typeof L.adapter.exitHints !== "function") return;
  for (const hint of L.adapter.exitHints(result.exitCode, ctx) || []) {
    L.stderr.write(`omnirouter: ${hint}\n`);
  }
}

/** The forwarded signal event, the executor's new warnings, then the adapter's exit hints. */
async function reportResult(L, result, ctx) {
  if (result.forwardedSignal) {
    await L.bus.emit({ type: "child.signal", signal: result.forwardedSignal });
  }
  for (const message of result.warnings || []) {
    if (!L.warnings.includes(message)) L.warn(message);
  }
  writeExitHints(L, result, ctx);
}

function writeJsonResult(L, run, result, summary) {
  const body = {
    tool: L.tool,
    sessionId: run.session.sessionId,
    exitCode: result.exitCode,
    summary: summary ?? null,
    warnings: L.warnings,
  };
  L.stdout.write(`${JSON.stringify(body, null, 2)}\n`);
}

/**
 * Execute the plan and report its result.
 * @returns {Promise<{ exitCode: number, sessionId: string, warnings: string[] }>}
 */
export async function executeStep(L, run, { plan, ctx, bin, probed }) {
  const execute = L.deps.execute ?? (await import("../execute.mjs")).executePlan;
  const outcome = { summary: undefined };
  const hooks = lifecycleHooks(L, run, outcome);
  const result = await execute(plan, { ...executeOptions(L, run, { bin, probed }), ...hooks });
  await reportResult(L, result, ctx);
  if (L.jsonMode) writeJsonResult(L, run, result, outcome.summary);
  return { exitCode: result.exitCode, sessionId: run.session.sessionId, warnings: L.warnings };
}
