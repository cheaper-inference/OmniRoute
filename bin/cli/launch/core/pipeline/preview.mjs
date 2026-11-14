// bin/cli/launch/core/pipeline/preview.mjs: --dry-run and --doctor. No gateway start, no session,
// no spawn. Health, binary and version run concurrently; each is consumed (and warns) in the
// order health, catalog, providers, binary, version.

import { toLaunchError } from "../errors.mjs";
import { pickModel } from "../picker.mjs";
import { dryRunDocument, redactPlan, renderDryRunJson, renderDryRunText } from "../plan.mjs";
import { trace } from "../trace.mjs";
import { computeView } from "../view.mjs";
import { connectedProvidersFrom, startCatalogAndProviders } from "./catalog-view.mjs";
import { doctor } from "./doctor.mjs";
import { contextFor, planWithWarnings, startBinaryProbe } from "./plan-step.mjs";
import { settle, unwrap } from "./settle.mjs";

async function defaultProbeHealth(rootUrl, doFetch) {
  try {
    const res = await doFetch(`${rootUrl}/api/monitoring/health`, {
      signal: AbortSignal.timeout(1500),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function startHealth(L) {
  const probeHealth = L.deps.probeHealth ?? ((url) => defaultProbeHealth(url, L.doFetch));
  return settle(() => probeHealth(L.target.rootUrl));
}

function gatewayStatus(healthy, target, flags) {
  if (healthy) return "running";
  if (target.kind === "remote") return "unreachable";
  if (flags.start === false) return "not running (--no-start)";
  return `would auto-start on 127.0.0.1:${target.port}`;
}

function previewOrigin(healthy, target) {
  if (target.kind === "remote") return "remote";
  return healthy ? "external-local" : "auto-started";
}

/** Health probe result: whether the gateway answers, its status line and launch origin. */
async function healthStep(L, healthResult) {
  const healthy = unwrap(await healthResult);
  trace("health probe");
  return {
    healthy,
    status: gatewayStatus(healthy, L.target, L.flags),
    origin: previewOrigin(healthy, L.target),
  };
}

/** Catalog (with the target's credential) and providers; a catalog error is a warning here. */
async function catalogStep(L, healthy) {
  if (!healthy) return { rows: [] };
  const fetched = startCatalogAndProviders({
    flags: L.flags,
    rootUrl: L.target.rootUrl,
    token: L.target.credential.value,
    doFetch: L.doFetch,
    deps: L.deps,
  });
  const catalogOutcome = await fetched.catalog;
  if (!catalogOutcome.ok) {
    fetched.providers?.cancel();
    const catalogError = toLaunchError(catalogOutcome.error);
    L.warn(`catalog not read: ${catalogError.message}`);
    trace("catalog fetch");
    return { rows: [], catalogError };
  }
  trace("catalog fetch");
  const providers = await connectedProvidersFrom(fetched.providers, L.warn);
  trace("connected providers");
  return { rows: catalogOutcome.value, providers };
}

/** The non-interactive pick, or (empty view) the flag, default or last model id as is. */
async function modelStep(L, view) {
  if (view.rows.length > 0)
    return (await pickModel({ ...L.pickInput(view), interactive: false })).model;
  if (L.adapter.capabilities.model === "none") return undefined;
  const id = L.flagModel ?? L.defaults?.model ?? L.last?.model;
  return id ? { id, capabilities: [], kind: "model" } : undefined;
}

/** The binary, or its first name plus a warning (and binError) when it is not found. */
async function binaryStep(L, binResult) {
  const binOutcome = await binResult;
  let state;
  if (binOutcome.ok) {
    state = { bin: binOutcome.value };
  } else {
    const binError = toLaunchError(binOutcome.error);
    state = { bin: { command: L.adapter.binaries[0], shell: false }, binError };
    L.warn(binError.message);
  }
  trace("binary resolve");
  return state;
}

function emptyProbe() {
  return { version: undefined, features: {}, warnings: [] };
}

/** The version probe; its error throws for --dry-run and is a versionError for --doctor. */
async function versionStep(L, probeResult, binError) {
  if (binError) return { probed: emptyProbe() };
  const probeOutcome = await probeResult;
  if (!probeOutcome.ok) {
    const versionError = toLaunchError(probeOutcome.error);
    if (!L.flags.doctor) throw probeOutcome.error;
    return { probed: emptyProbe(), versionError };
  }
  const probed = probeOutcome.value;
  if (L.flags.doctor) for (const message of probed.warnings) L.warn(message);
  return { probed };
}

/** --dry-run: the redacted plan document on stdout. */
function dryRun(L, st) {
  const { plan, appliedMiddleware } = planWithWarnings(L, st.ctx0, st.probed);
  const doc = dryRunDocument(redactPlan(plan, [L.target.credential.value]), {
    gateway: { rootUrl: L.target.rootUrl, origin: st.origin, status: st.status },
    auth: { source: L.target.credential.source },
    command: st.bin.command,
    shell: st.bin.shell,
    model: st.model?.id,
    view: { name: st.view.name, hash: st.view.hash, size: st.view.rows.length },
    baseEnv: L.baseEnv,
    appliedMiddleware,
  });
  L.stdout.write(L.jsonMode ? renderDryRunJson(doc) : renderDryRunText(doc));
  trace("dry-run output");
  return { exitCode: 0, warnings: L.warnings, dryRun: doc };
}

/** --dry-run and --doctor for the prepared launch `L`. */
export async function previewLaunch(L) {
  const healthResult = startHealth(L);
  const tooling = startBinaryProbe(L);
  const health = await healthStep(L, healthResult);
  const catalog = await catalogStep(L, health.healthy);
  const { view } = computeView(catalog.rows, L.adapter, L.prefs, {
    pin: L.flagModel,
    providers: catalog.providers,
  });
  trace("view compute");
  const model = await modelStep(L, view);
  const binary = await binaryStep(L, tooling.binResult);
  const version = await versionStep(L, tooling.probeResult, binary.binError);
  trace("version probe");
  const st = { ...health, ...catalog, ...binary, ...version, view, model };
  st.ctx0 = contextFor(L, {
    gateway: { rootUrl: L.target.rootUrl, origin: health.origin },
    auth: { source: "session" },
    view,
    model,
    bin: binary.bin,
    probed: version.probed,
  });
  return L.flags.doctor ? doctor(L, st) : dryRun(L, st);
}
