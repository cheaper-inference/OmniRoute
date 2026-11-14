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

import os from "node:os";

import { LaunchError, PLACEHOLDERS } from "../contract.mjs";
import { buildSafeCliLaunchEnv } from "../../launch-env.mjs";
import { resolveDataDir } from "../../data-dir.mjs";
import {
  getModelPreferenceState,
  loadModelPreferences,
  recordModelPreference,
} from "../../model-preferences.mjs";
import { fetchCatalog, fetchConnectedProviders } from "./catalog.mjs";
import { errorJson, exitCodeFor, formatError, toLaunchError } from "./errors.mjs";
import { createObserverBus } from "./middleware.mjs";
import { applyPassthrough } from "./passthrough.mjs";
import { pickModel } from "./picker.mjs";
import {
  buildContext,
  dryRunDocument,
  planLaunch,
  redactPlan,
  renderDryRunJson,
  renderDryRunText,
} from "./plan.mjs";
import { evaluatePreflight } from "./preflight.mjs";
import { probeTool, resolveBinary } from "./resolve-bin.mjs";
import {
  createSessionClient,
  startHeartbeat,
  DEFAULT_SESSION_TTL_SEC,
  HEARTBEAT_INTERVAL_MS,
  usageFailureReason,
} from "./session.mjs";
import {
  launchRoot,
  readLastLaunch,
  readToolDefaults,
  toolStateDir,
  writeLastLaunch,
  writeToolDefaults,
} from "./state.mjs";
import { normalizeRootUrl, publicTarget, resolveTarget } from "./target.mjs";
import { trace } from "./trace.mjs";
import { computeView, needsServerView, serverViewBody } from "./view.mjs";

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

/** v1.x flags: parsed, rejected with "not yet supported". */
export const RESERVED_FLAGS = Object.freeze({
  budget: "--budget",
  budgetFallback: "--budget-fallback",
  mode: "--mode",
  compression: "--compression",
  mcp: "--mcp",
  statusline: "--statusline",
  exec: "--exec",
  install: "--install",
  preset: "@<preset>",
});

export function rejectReserved(flags) {
  for (const [key, spelled] of Object.entries(RESERVED_FLAGS)) {
    const value = flags[key];
    if (value !== undefined && value !== false && value !== null) {
      throw new LaunchError("UsageError", `${spelled} is not yet supported`, {
        hint: "it arrives with a later omnirouter release",
      });
    }
  }
}

/** `--provider p --model m` -> "p/m" (run.mjs resolveModelFromTargetOptions). */
export function composeModel(flags) {
  const provider = String(flags.provider ?? "").trim();
  const model = String(flags.model ?? "").trim();
  if (!model) return undefined;
  return provider && !model.includes("/") ? `${provider}/${model}` : model;
}

function platformOf(value) {
  return value === "win32" || value === "darwin" ? value : "linux";
}

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

async function defaultAcquireGateway(args) {
  const mod = await import("./gateway.mjs");
  return mod.acquireGateway(args);
}

/**
 * `start()`'s promise (or its synchronous throw) settled into `{ ok, value | error }`: never rejects,
 * so a result started early and consumed later is never an unhandled rejection.
 */
function settle(start) {
  try {
    return Promise.resolve(start()).then(
      (value) => ({ ok: true, value }),
      (error) => ({ ok: false, error })
    );
  } catch (error) {
    return Promise.resolve({ ok: false, error });
  }
}

/** The value of a settled result, or its error thrown. */
function unwrap(result) {
  if (result.ok) return result.value;
  throw result.error;
}

/**
 * Start the GET /api/launch/providers request without interpreting it (null for --all-models: no
 * request). `cancel()` aborts it when the catalog fails, so a dropped request never dangles.
 */
function requestConnectedProviders({ flags, rootUrl, token, doFetch, deps }) {
  if (flags.allModels) return null;
  const controller = new AbortController();
  const fetchCancellable = (url, init = {}) =>
    doFetch(url, {
      ...init,
      signal: init.signal ? AbortSignal.any([init.signal, controller.signal]) : controller.signal,
    });
  const result = settle(() =>
    (deps.fetchConnectedProviders ?? fetchConnectedProviders)({
      rootUrl,
      token,
      fetch: fetchCancellable,
    })
  );
  return { result, cancel: () => controller.abort() };
}

/** Interpret a started providers request: prefixes, or undefined plus one warning line. */
async function connectedProvidersFrom(request, warn) {
  if (!request) return undefined;
  const result = unwrap(await request.result);
  if (result?.ok) return result.prefixes;
  warn(`${result?.reason ?? "connected providers unknown"}; showing every catalog model`);
  return undefined;
}

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

/** Fetch the catalog and, concurrently, the connected providers; consumed catalog first. */
function startCatalogAndProviders({ flags, rootUrl, token, doFetch, deps }) {
  const catalog = settle(() => fetchCatalog({ rootUrl, token, fetch: doFetch }));
  const providers = requestConnectedProviders({ flags, rootUrl, token, doFetch, deps });
  return { catalog, providers };
}

/** The error for a view that came out empty. */
function emptyViewError(tool, view, providers) {
  if (providers) {
    return new LaunchError(
      "NoProviders",
      `no model from a provider you have a key for fits ${tool} (view ${view.name})`,
      {
        hint: "add a provider key with `omniroute setup`, or pass --all-models to list every catalog model",
      }
    );
  }
  return new LaunchError("NoProviders", `no catalog model fits ${tool} (view ${view.name})`, {
    hint: "connect a provider with tool calling and enough context, see `omniroute setup`",
  });
}

function summaryText(tool, summary) {
  if (!summary || typeof summary !== "object") return "";
  const parts = [`${summary.requests ?? 0} requests`];
  if (summary.inputTokens !== undefined || summary.outputTokens !== undefined) {
    parts.push(`${summary.inputTokens ?? 0} in / ${summary.outputTokens ?? 0} out tokens`);
  }
  if (typeof summary.costUsd === "number") parts.push(`$${summary.costUsd.toFixed(4)}`);
  if (Array.isArray(summary.models) && summary.models.length > 0) {
    parts.push(`models: ${summary.models.map((m) => `${m.id} (${m.requests})`).join(", ")}`);
  }
  if (summary.fallbacks) parts.push(`${summary.fallbacks} fallbacks`);
  return `omnirouter: ${tool} session: ${parts.join(", ")}\n`;
}

/**
 * Launch `toolId`.
 * @param {string} toolId canonical id or alias known to the registry
 * @param {object} flags camelCase command flags; `args` = tool argv after `--`
 * @param {object} deps registry (required) and optional effect overrides, see README of tests
 * @returns {Promise<{ exitCode: number, sessionId?: string, warnings: string[], error?: object, dryRun?: object }>}
 */
export async function runLaunch(toolId, flags = {}, deps = {}) {
  const env = deps.env ?? process.env;
  const stdout = deps.stdout ?? process.stdout;
  const stderr = deps.stderr ?? process.stderr;
  const doFetch = deps.fetch ?? globalThis.fetch;
  const platform = platformOf(deps.platform ?? process.platform);
  const cwd = deps.cwd ?? process.cwd();
  const homeDir = deps.homeDir ?? os.homedir();
  const dataDir = deps.dataDir ?? resolveDataDir();
  const jsonMode = Boolean(flags.json);
  const warnings = [];
  const warn = (message) => {
    if (warnings.includes(message)) return; // one line per distinct warning
    warnings.push(message);
    stderr.write(`omnirouter: warning: ${message}\n`);
  };
  const bus = createObserverBus(deps.observers || [], { warn });

  let gateway = null;
  let client = null;
  let session = null;
  let revoked = false;
  let heartbeat = null;
  let revokeOnExit = true;

  // The mint started concurrently with a capabilities call that failed: its session is never
  // used, but is revoked in `finally` once the mint settles (the result reports no sessionId).
  let orphanMint = null;

  const revokeSession = async (target) => {
    try {
      await client.revoke(target);
    } catch (error) {
      warn(`could not revoke the launch session: ${error?.message ?? "error"}`);
    }
  };
  const revoke = async () => {
    if (!session || revoked || !revokeOnExit) return;
    revoked = true;
    await revokeSession(session);
  };

  try {
    rejectReserved(flags);
    const adapter =
      typeof deps.registry?.load === "function"
        ? await deps.registry.load(toolId)
        : deps.registry?.get(toolId);
    if (!adapter) {
      const ids =
        typeof deps.registry?.ids === "function"
          ? deps.registry.ids()
          : (deps.registry?.list?.() || []).map((a) => (typeof a === "string" ? a : a.id));
      throw new LaunchError("UsageError", `unknown tool ${JSON.stringify(toolId)}`, {
        hint: ids.length > 0 ? `launchable tools: ${ids.join(", ")}` : undefined,
      });
    }
    const tool = adapter.id;
    const caps = adapter.capabilities;
    if (!caps.platforms.includes(platform)) {
      throw new LaunchError("UnsupportedPlatform", `${tool} is not supported on ${platform}`, {
        hint: `supported: ${caps.platforms.join(", ")}`,
      });
    }
    if (flags.profile && !caps.supportsProfile) {
      throw new LaunchError("UsageError", `${tool} does not support --profile`);
    }

    const passthrough = applyPassthrough(flags.args || [], caps.passthrough || [], {
      cwd,
      tool,
      readFile: deps.readFile,
    });
    for (const message of passthrough.warnings) warn(message);

    const target = resolveTarget(flags, {
      env,
      resolveContext: deps.resolveContext,
      credentialFor: deps.credentialFor,
    });
    trace("target resolve");
    const baseEnv = buildSafeCliLaunchEnv(env, { inheritEnv: Boolean(flags.inheritEnv) });
    const flagModel = composeModel(flags);
    const contextKey = target.contextName || "";
    const prefs = (
      deps.loadPreferences ?? ((t, key) => getModelPreferenceState(t, loadModelPreferences(), key))
    )(tool, contextKey);
    const defaults = (deps.readToolDefaults ?? readToolDefaults)(dataDir, tool);
    const last = (deps.readLastLaunch ?? readLastLaunch)(dataDir, tool);
    const settings = {
      ...(flagModel ? { model: flagModel } : {}),
      ...(flags.tag ? { tag: String(flags.tag) } : {}),
      summary: flags.summary !== false && env.OMNIROUTE_LAUNCH_SUMMARY !== "0",
      privateMode: Boolean(flags.private),
    };
    const interactive = Boolean(
      (deps.isTTY ?? (process.stdin.isTTY && process.stdout.isTTY)) && !flags.yes && !jsonMode
    );
    const pickInput = (view) => ({
      view,
      tool,
      modelPolicy: caps.model,
      minContextTokens: caps.minContextTokens,
      flagModel,
      savedDefault: defaults?.model,
      lastModel: last?.model,
      interactive,
      forcePick: Boolean(flags.pick),
      selector: deps.selector,
    });

    if (flags.dryRun || flags.doctor) {
      return await previewLaunch({
        adapter,
        flags,
        deps,
        target,
        baseEnv,
        passthrough,
        prefs,
        settings,
        pickInput,
        platform,
        homeDir,
        cwd,
        dataDir,
        doFetch,
        stdout,
        warnings,
        warn,
        flagModel,
        defaults,
        last,
        jsonMode,
      });
    }

    // The binary and its version depend only on the adapter, platform and env: resolve and probe
    // them while the gateway, session and catalog steps run. Consumed (and their errors surfaced)
    // after the model pick, as before, so a gateway/session/catalog error still wins.
    const binResult = settle(() =>
      (deps.resolveBinary ?? resolveBinary)(adapter, { platform, env })
    );
    const probeResult = binResult.then((r) =>
      r.ok
        ? settle(() =>
            (deps.probeTool ?? probeTool)(adapter, r.value, {
              platform,
              env: baseEnv,
              cacheDir: launchRoot(dataDir),
              refreshCache: Boolean(flags.doctor),
            })
          )
        : r
    );

    // ---- gateway, session, catalog, view ----
    gateway = await (deps.acquireGateway ?? defaultAcquireGateway)({
      target: publicTarget(target),
      flags,
      stateDir: launchRoot(dataDir),
      log: (message) => stderr.write(`omnirouter: ${message}\n`),
    });
    trace("gateway acquire");
    const rootUrl = normalizeRootUrl(gateway.baseUrl);
    const origin =
      target.kind === "remote" ? "remote" : gateway.owned ? "auto-started" : "external-local";
    await bus.emit({ type: "gateway.ready", origin, rootUrl });

    client = (deps.createSessionClient ?? createSessionClient)({
      rootUrl,
      credential: target.credential.value,
      fetch: doFetch,
    });
    // Capabilities and mint run concurrently; capabilities is consumed first, so its error wins.
    const capabilitiesResult = settle(() => client.capabilities());
    // --tag goes to the gateway as sessionTag; without it the gateway derives launch:<tool>:<id>.
    const mintResult = settle(() =>
      client.mint({
        tool,
        tag: settings.tag,
        ttlSec: deps.sessionTtlSec ?? DEFAULT_SESSION_TTL_SEC,
      })
    );
    const capabilitiesOutcome = await capabilitiesResult;
    if (!capabilitiesOutcome.ok) {
      orphanMint = mintResult;
      throw capabilitiesOutcome.error;
    }
    const capabilities = capabilitiesOutcome.value;
    trace("capabilities");
    session = unwrap(await mintResult);
    trace("session mint");
    await bus.emit({ type: "session.minted", sessionId: session.sessionId });

    // The providers request starts with the catalog; it is read (and warns) only after the
    // catalog succeeded and is not empty, and is cancelled otherwise.
    const fetched = startCatalogAndProviders({
      flags,
      rootUrl,
      token: session.token,
      doFetch,
      deps,
    });
    const catalogOutcome = await fetched.catalog;
    if (!catalogOutcome.ok || catalogOutcome.value?.length === 0) fetched.providers?.cancel();
    const rows = unwrap(catalogOutcome);
    trace("catalog fetch");
    if (rows.length === 0) {
      throw new LaunchError(
        "NoProviders",
        "the gateway catalog is empty: no provider is connected",
        {
          hint: "connect a provider with `omniroute setup`",
        }
      );
    }
    const providers = await connectedProvidersFrom(fetched.providers, warn);
    trace("connected providers");
    const { view } = computeView(rows, adapter, prefs, { pin: flagModel, providers });
    if (view.rows.length === 0) throw emptyViewError(tool, view, providers);
    trace("view compute");
    if (needsServerView(caps.modelList.strategy)) {
      await client.patchView(session, serverViewBody(view, adapter));
    }
    trace("view patch");
    const picked = await pickModel(pickInput(view));
    trace("model pick");

    // ---- binary, context, plan ----
    const bin = unwrap(await binResult);
    trace("binary resolve");
    const probed = unwrap(await probeResult);
    trace("version probe");
    const ctx0 = buildContext({
      platform,
      homeDir,
      baseEnv,
      cwd,
      gateway: {
        rootUrl,
        origin,
        version: capabilities.version !== undefined ? String(capabilities.version) : undefined,
      },
      auth: { source: "session", sessionId: session.sessionId },
      view,
      model: picked.model,
      tool: {
        command: bin.command,
        shell: bin.shell,
        version: probed.version,
        features: probed.features,
      },
      profile: flags.profile,
      passthroughArgs: passthrough.args,
      passthroughJson: passthrough.json,
      settings: { ...settings, ...(picked.model ? { model: picked.model.id } : {}) },
    });
    let planned;
    try {
      planned = planLaunch(adapter, ctx0, { middleware: deps.middleware });
    } catch (error) {
      for (const message of probed.warnings) warn(message);
      throw error;
    }
    const { plan, ctx } = planned;
    trace("plan");
    for (const message of gateWarnings(adapter, probed.warnings, plan.warnings)) warn(message);
    for (const message of plan.warnings) warn(message);
    for (const note of plan.notes) stderr.write(`omnirouter: ${note}\n`);
    revokeOnExit = plan.cleanup?.revokeSession !== false;
    await bus.emit({
      type: "plan.final",
      plan: redactPlan(plan, [session.token, target.credential.value]),
    });

    if (picked.model) {
      try {
        (deps.recordPreference ?? recordModelPreference)(tool, picked.model.id, {
          context: contextKey,
          favorite: Boolean(flags.favorite),
          unfavorite: Boolean(flags.unfavorite),
        });
        (deps.writeLastLaunch ?? writeLastLaunch)(dataDir, tool, {
          model: picked.model.id,
          at: new Date((deps.now ?? Date.now)()).toISOString(),
        });
        if (flags.setDefault)
          (deps.writeToolDefaults ?? writeToolDefaults)(dataDir, tool, {
            ...defaults,
            model: picked.model.id,
          });
      } catch (error) {
        warn(`could not save model preferences: ${error?.message ?? "error"}`);
      }
    }

    // ---- execute ----
    const execute = deps.execute ?? (await import("./execute.mjs")).executePlan;
    let summary;
    const started = (deps.now ?? Date.now)();
    const result = await execute(plan, {
      command: bin.command,
      shell: bin.shell,
      platform,
      baseEnv,
      token: session.token,
      stateDir: toolStateDir(dataDir, tool, cwd),
      tmpRoot: deps.tmpRoot,
      tmpPrefix: deps.tmpPrefix,
      extraEnv: { OMNIROUTER_SESSION_ID: session.sessionId },
      cwd,
      spawn: deps.spawn,
      stdio: deps.stdio,
      signalSource: deps.signalSource,
      signalTimeoutMs: deps.signalTimeoutMs,
      toolVersion: probed.version,
      readAsset: deps.readAsset,
      warn,
      onSpawn: async (child) => {
        heartbeat = startHeartbeat(client, session, {
          intervalMs: deps.heartbeatMs ?? HEARTBEAT_INTERVAL_MS,
          warn,
          setInterval: deps.setInterval,
          clearInterval: deps.clearInterval,
        });
        await bus.emit({ type: "child.spawned", pid: child?.pid });
      },
      afterExit: async ({ exitCode }) => {
        heartbeat?.stop();
        await bus.emit({
          type: "child.exited",
          code: exitCode,
          durationMs: (deps.now ?? Date.now)() - started,
        });
        if (settings.summary) {
          try {
            summary = await client.usage(session);
            if (summary) {
              await bus.emit({ type: "session.summary", summary });
              if (!jsonMode) stderr.write(summaryText(tool, summary));
            }
          } catch (error) {
            // Cosmetic, but never silently dropped (found in live testing): one stderr line.
            if (!jsonMode) {
              stderr.write(
                `omnirouter: usage summary unavailable (${usageFailureReason(error)})\n`
              );
            }
          }
        }
        await revoke();
      },
    });
    if (result.forwardedSignal)
      await bus.emit({ type: "child.signal", signal: result.forwardedSignal });
    for (const message of result.warnings || []) {
      if (!warnings.includes(message)) warn(message);
    }
    if (typeof adapter.exitHints === "function") {
      for (const hint of adapter.exitHints(result.exitCode, ctx) || [])
        stderr.write(`omnirouter: ${hint}\n`);
    }
    if (jsonMode) {
      stdout.write(
        `${JSON.stringify({ tool, sessionId: session.sessionId, exitCode: result.exitCode, summary: summary ?? null, warnings }, null, 2)}\n`
      );
    }
    return { exitCode: result.exitCode, sessionId: session.sessionId, warnings };
  } catch (error) {
    const err = toLaunchError(error);
    if (jsonMode) stdout.write(`${JSON.stringify(errorJson(err), null, 2)}\n`);
    else stderr.write(formatError(err));
    return {
      exitCode: exitCodeFor(err),
      sessionId: session?.sessionId,
      warnings,
      error: err.toJSON().error,
    };
  } finally {
    heartbeat?.stop();
    await revoke();
    if (orphanMint) {
      const minted = await orphanMint;
      if (minted.ok && minted.value) await revokeSession(minted.value);
    }
    if (gateway) {
      try {
        await gateway.release();
      } catch (error) {
        warn(`gateway release failed: ${error?.message ?? "error"}`);
      }
    }
  }
}

/** --dry-run and --doctor: no gateway start, no session, no spawn. */
async function previewLaunch(s) {
  const { adapter, flags, deps, target, doFetch, warn } = s;
  const tool = adapter.id;
  const rootUrl = target.rootUrl;
  // Health, binary and version run concurrently; each is consumed (and warns) where it was
  // awaited before: health, catalog, providers, binary, version.
  const healthResult = settle(() =>
    (deps.probeHealth ?? ((url) => defaultProbeHealth(url, doFetch)))(rootUrl)
  );
  const binResult = settle(() =>
    (deps.resolveBinary ?? resolveBinary)(adapter, {
      platform: s.platform,
      env: deps.env ?? process.env,
    })
  );
  const probeResult = binResult.then((r) =>
    r.ok
      ? settle(() =>
          (deps.probeTool ?? probeTool)(adapter, r.value, {
            platform: s.platform,
            env: s.baseEnv,
            cacheDir: launchRoot(s.dataDir),
            refreshCache: Boolean(flags.doctor),
          })
        )
      : null
  );
  const healthy = unwrap(await healthResult);
  trace("health probe");
  let status;
  if (healthy) status = "running";
  else if (target.kind === "remote") status = "unreachable";
  else if (flags.start === false) status = "not running (--no-start)";
  else status = `would auto-start on 127.0.0.1:${target.port}`;
  const origin = target.kind === "remote" ? "remote" : healthy ? "external-local" : "auto-started";

  let rows = [];
  let catalogError;
  let providers;
  if (healthy) {
    const fetched = startCatalogAndProviders({
      flags,
      rootUrl,
      token: target.credential.value,
      doFetch,
      deps,
    });
    const catalogOutcome = await fetched.catalog;
    if (catalogOutcome.ok) {
      rows = catalogOutcome.value;
    } else {
      fetched.providers?.cancel();
      catalogError = toLaunchError(catalogOutcome.error);
      warn(`catalog not read: ${catalogError.message}`);
    }
    trace("catalog fetch");
    if (!catalogError) {
      providers = await connectedProvidersFrom(fetched.providers, warn);
      trace("connected providers");
    }
  }
  const { view } = computeView(rows, adapter, s.prefs, { pin: s.flagModel, providers });
  trace("view compute");
  let model;
  if (view.rows.length > 0) {
    model = (await pickModel({ ...s.pickInput(view), interactive: false })).model;
  } else if (adapter.capabilities.model !== "none") {
    const id = s.flagModel ?? s.defaults?.model ?? s.last?.model;
    if (id) model = { id, capabilities: [], kind: "model" };
  }

  let bin;
  let binError;
  const binOutcome = await binResult;
  if (binOutcome.ok) {
    bin = binOutcome.value;
  } else {
    binError = toLaunchError(binOutcome.error);
    bin = { command: adapter.binaries[0], shell: false };
    warn(binError.message);
  }
  trace("binary resolve");
  let probed = { version: undefined, features: {}, warnings: [] };
  let versionError;
  if (!binError) {
    const probeOutcome = await probeResult;
    if (probeOutcome.ok) {
      probed = probeOutcome.value;
      if (flags.doctor) for (const message of probed.warnings) warn(message);
    } else {
      versionError = toLaunchError(probeOutcome.error);
      if (!flags.doctor) throw probeOutcome.error;
    }
  }
  trace("version probe");

  const ctx0 = buildContext({
    platform: s.platform,
    homeDir: s.homeDir,
    baseEnv: s.baseEnv,
    cwd: s.cwd,
    gateway: { rootUrl, origin },
    auth: { source: "session" },
    view,
    model,
    tool: {
      command: bin.command,
      shell: bin.shell,
      version: probed.version,
      features: probed.features,
    },
    profile: flags.profile,
    passthroughArgs: s.passthrough.args,
    passthroughJson: s.passthrough.json,
    settings: { ...s.settings, ...(model ? { model: model.id } : {}) },
  });

  if (flags.doctor) {
    return doctor({
      ...s,
      ctx0,
      healthy,
      status,
      rows,
      view,
      catalogError,
      binError,
      versionError,
      bin,
      probed,
      providers,
    });
  }

  let planned;
  try {
    planned = planLaunch(adapter, ctx0, { middleware: deps.middleware });
  } catch (error) {
    for (const message of probed.warnings) warn(message);
    throw error;
  }
  const { plan, appliedMiddleware } = planned;
  trace("plan");
  for (const message of gateWarnings(adapter, probed.warnings, plan.warnings)) warn(message);
  const doc = dryRunDocument(redactPlan(plan, [target.credential.value]), {
    gateway: { rootUrl, origin, status },
    auth: { source: target.credential.source },
    command: bin.command,
    shell: bin.shell,
    model: model?.id,
    view: { name: view.name, hash: view.hash, size: view.rows.length },
    baseEnv: s.baseEnv,
    appliedMiddleware,
  });
  s.stdout.write(s.jsonMode ? renderDryRunJson(doc) : renderDryRunText(doc));
  trace("dry-run output");
  return { exitCode: 0, warnings: s.warnings, dryRun: doc };
}

async function doctor(s) {
  const { adapter, ctx0, deps } = s;
  const checks = [];
  const add = (name, status, message) => checks.push({ name, status, message });
  add(
    "gateway",
    s.healthy ? "pass" : s.target.kind === "remote" ? "fail" : "warn",
    `${s.target.rootUrl}: ${s.status}`
  );
  if (s.healthy) {
    if (s.catalogError) add("catalog", "fail", s.catalogError.message);
    else add("catalog", s.rows.length > 0 ? "pass" : "fail", `${s.rows.length} models`);
    const scope = s.providers ? `, ${s.providers.length} connected provider prefixes` : "";
    add(
      "view",
      s.view.rows.length > 0 ? "pass" : "fail",
      `${s.view.name}: ${s.view.rows.length} models${scope}`
    );
  }
  add("binary", s.binError ? "fail" : "pass", s.binError ? s.binError.message : s.bin.command);
  if (s.versionError) add("version", "fail", s.versionError.message);
  else if (adapter.capabilities.versionGate)
    add("version", s.probed.version ? "pass" : "warn", s.probed.version ?? "unknown");

  let declared = [];
  try {
    const { plan } = planLaunch(adapter, ctx0, { middleware: deps.middleware });
    declared = plan.preflight.filter((check) => !JSON.stringify(check).includes(PLACEHOLDERS.TMP));
    add("plan", "pass", `${plan.argv.length} args, ${plan.tempFiles.length} files`);
  } catch (error) {
    add("plan", "fail", toLaunchError(error).message);
  }
  if (typeof adapter.diagnose === "function")
    declared = [...declared, ...(adapter.diagnose(ctx0) || [])];
  const env = { ...s.baseEnv };
  const results = await (deps.evaluatePreflight ?? evaluatePreflight)(declared, {
    env,
    toolVersion: s.probed.version,
  });
  for (const r of results) add(r.check.kind, r.status, r.message);

  if (s.jsonMode) s.stdout.write(`${JSON.stringify({ tool: adapter.id, checks }, null, 2)}\n`);
  else for (const c of checks) s.stdout.write(`${c.status.padEnd(4)} ${c.name}: ${c.message}\n`);
  const failed = checks.some((c) => c.status === "fail");
  return { exitCode: failed ? 69 : 0, warnings: s.warnings, checks };
}
