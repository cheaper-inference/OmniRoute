// bin/cli/launch/core/pipeline.mjs: `runLaunch(toolId, flags, deps)`, the single launcher entry
// point. Every effect is injectable through `deps`; nothing here names a tool.
//
//   rejectReserved -> passthrough -> resolveTarget -> acquireGateway -> capabilities -> mint
//   -> fetchCatalog(session token) -> connected providers -> readiness -> view -> [PATCH view] -> pickModel
//   -> resolveBinary + versionGate -> buildContext -> middleware/plan/validate
//   -> [--dry-run | --doctor] -> execute (heartbeat while running; after exit: summary, revoke)
//   -> release gateway. Never calls process.exit: the caller sets process.exitCode.
//
// Independent steps run concurrently, but every result is consumed (and every error surfaced) in
// the order above: resolveBinary + versionGate start before acquireGateway, capabilities and
// mint start together, and fetchCatalog and connected providers start together.
//
// The steps live in ./pipeline/: setup (no gateway), gateway-session, catalog-view, plan-step,
// execute-step and summary for a launch; preview and doctor for --dry-run / --doctor; run-state
// holds what a launch keeps open and its single cleanup.

import { errorJson, exitCodeFor, formatError, toLaunchError } from "./errors.mjs";
import { redactPlan } from "./plan.mjs";
import {
  catalogViewStep,
  connectedProvidersFrom,
  requestConnectedProviders,
} from "./pipeline/catalog-view.mjs";
import { executeStep, savePreferences } from "./pipeline/execute-step.mjs";
import { gatewaySessionStep } from "./pipeline/gateway-session.mjs";
import { contextFor, planWithWarnings, startBinaryProbe } from "./pipeline/plan-step.mjs";
import { previewLaunch } from "./pipeline/preview.mjs";
import { createRunState, finalizeRun } from "./pipeline/run-state.mjs";
import { unwrap } from "./pipeline/settle.mjs";
import { createIo, prepareLaunch } from "./pipeline/setup.mjs";
import { trace } from "./trace.mjs";

export { gateWarnings } from "./pipeline/plan-step.mjs";
export { RESERVED_FLAGS, rejectReserved, composeModel } from "./pipeline/setup.mjs";

/**
 * The connected providers' id prefixes for the default view, or undefined for the full catalog
 * (`--all-models`, or a gateway without GET /api/launch/providers: one warning line).
 */
export async function connectedProviders({ flags, rootUrl, token, doFetch, deps, warn }) {
  return connectedProvidersFrom(
    requestConnectedProviders({ flags, rootUrl, token, doFetch, deps }),
    warn
  );
}

/** The binary, then its version probe, both started before the gateway. */
async function toolingStep(tooling) {
  const bin = unwrap(await tooling.binResult);
  trace("binary resolve");
  const probed = unwrap(await tooling.probeResult);
  trace("version probe");
  return { bin, probed };
}

function gatewayContext({ rootUrl, origin, capabilities }) {
  const version = capabilities.version !== undefined ? String(capabilities.version) : undefined;
  return { rootUrl, origin, version };
}

/** Plan the launch, surface its warnings and notes, and emit the redacted plan.final. */
async function planStep(L, run, ctx0, probed) {
  const planned = planWithWarnings(L, ctx0, probed);
  const { plan } = planned;
  for (const message of plan.warnings) L.warn(message);
  for (const note of plan.notes) L.stderr.write(`omnirouter: ${note}\n`);
  run.revokeOnExit = plan.cleanup?.revokeSession !== false;
  await L.bus.emit({
    type: "plan.final",
    plan: redactPlan(plan, [run.session.token, L.target.credential.value]),
  });
  return planned;
}

/** Gateway, session, catalog, view, binary, plan, then execute. */
async function launch(L, run) {
  // The binary and its version depend only on the adapter, platform and env: resolve and probe
  // them while the gateway, session and catalog steps run. Consumed (and their errors surfaced)
  // after the model pick, as before, so a gateway/session/catalog error still wins.
  const tooling = startBinaryProbe(L);
  const gateway = await gatewaySessionStep(L, run);
  const { view, picked } = await catalogViewStep(L, run, gateway.rootUrl);
  const { bin, probed } = await toolingStep(tooling);
  const ctx0 = contextFor(L, {
    gateway: gatewayContext(gateway),
    auth: { source: "session", sessionId: run.session.sessionId },
    view,
    model: picked.model,
    bin,
    probed,
  });
  const { plan, ctx } = await planStep(L, run, ctx0, probed);
  savePreferences(L, picked);
  return executeStep(L, run, { plan, ctx, bin, probed });
}

function failureResult(error, io, run) {
  const err = toLaunchError(error);
  if (io.jsonMode) io.stdout.write(`${JSON.stringify(errorJson(err), null, 2)}\n`);
  else io.stderr.write(formatError(err));
  return {
    exitCode: exitCodeFor(err),
    sessionId: run.session?.sessionId,
    warnings: io.warnings,
    error: err.toJSON().error,
  };
}

/**
 * Launch `toolId`.
 * @param {string} toolId canonical id or alias known to the registry
 * @param {object} flags camelCase command flags; `args` = tool argv after `--`
 * @param {object} deps registry (required) and optional effect overrides, see README of tests
 * @returns {Promise<{ exitCode: number, sessionId?: string, warnings: string[], error?: object, dryRun?: object }>}
 */
export async function runLaunch(toolId, flags = {}, deps = {}) {
  const io = createIo(flags, deps);
  const run = createRunState(io.warn);
  try {
    const L = await prepareLaunch(toolId, io);
    if (flags.dryRun || flags.doctor) return await previewLaunch(L);
    return await launch(L, run);
  } catch (error) {
    return failureResult(error, io, run);
  } finally {
    await finalizeRun(run);
  }
}
