// bin/cli/launch/core/pipeline/setup.mjs: the launch's I/O and warning sink, then the steps that
// need no gateway: rejectReserved -> adapter -> platform/profile -> passthrough -> resolveTarget
// -> saved model preferences and settings. The result `L` is what every later step reads.

import os from "node:os";

import { LaunchError } from "../../contract.mjs";
import { buildSafeCliLaunchEnv } from "../../../launch-env.mjs";
import { resolveDataDir } from "../../../data-dir.mjs";
import { getModelPreferenceState, loadModelPreferences } from "../../../model-preferences.mjs";
import { createObserverBus } from "../middleware.mjs";
import { applyPassthrough } from "../passthrough.mjs";
import { readLastLaunch, readToolDefaults } from "../state.mjs";
import { resolveTarget } from "../target.mjs";
import { trace } from "../trace.mjs";

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

/** A warning sink that writes one stderr line per distinct message. */
function warningSink(stderr) {
  const warnings = [];
  const warn = (message) => {
    if (warnings.includes(message)) return; // one line per distinct warning
    warnings.push(message);
    stderr.write(`omnirouter: warning: ${message}\n`);
  };
  return { warnings, warn };
}

/** Streams, environment and warning sink, each from `deps` or the process. */
export function createIo(flags, deps) {
  const stderr = deps.stderr ?? process.stderr;
  const io = {
    flags,
    deps,
    env: deps.env ?? process.env,
    stdout: deps.stdout ?? process.stdout,
    stderr,
    doFetch: deps.fetch ?? globalThis.fetch,
    platform: platformOf(deps.platform ?? process.platform),
    cwd: deps.cwd ?? process.cwd(),
    homeDir: deps.homeDir ?? os.homedir(),
    dataDir: deps.dataDir ?? resolveDataDir(),
    jsonMode: Boolean(flags.json),
    ...warningSink(stderr),
  };
  io.bus = createObserverBus(deps.observers || [], { warn: io.warn });
  return io;
}

function registryIds(registry) {
  if (typeof registry?.ids === "function") return registry.ids();
  return (registry?.list?.() || []).map((a) => (typeof a === "string" ? a : a.id));
}

async function loadAdapter(toolId, registry) {
  const adapter =
    typeof registry?.load === "function" ? await registry.load(toolId) : registry?.get(toolId);
  if (adapter) return adapter;
  const ids = registryIds(registry);
  throw new LaunchError("UsageError", `unknown tool ${JSON.stringify(toolId)}`, {
    hint: ids.length > 0 ? `launchable tools: ${ids.join(", ")}` : undefined,
  });
}

function assertSupported(adapter, platform, flags) {
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
}

function passthroughFor(io, adapter) {
  const passthrough = applyPassthrough(
    io.flags.args || [],
    adapter.capabilities.passthrough || [],
    {
      cwd: io.cwd,
      tool: adapter.id,
      readFile: io.deps.readFile,
    }
  );
  for (const message of passthrough.warnings) io.warn(message);
  return passthrough;
}

function targetFor(io) {
  const target = resolveTarget(io.flags, {
    env: io.env,
    resolveContext: io.deps.resolveContext,
    credentialFor: io.deps.credentialFor,
  });
  trace("target resolve");
  return target;
}

function defaultLoadPreferences(tool, key) {
  return getModelPreferenceState(tool, loadModelPreferences(), key);
}

/** Saved preferences, tool defaults and the last launch for this tool and context. */
function savedChoices(io, tool, contextKey) {
  const { deps, dataDir } = io;
  return {
    prefs: (deps.loadPreferences ?? defaultLoadPreferences)(tool, contextKey),
    defaults: (deps.readToolDefaults ?? readToolDefaults)(dataDir, tool),
    last: (deps.readLastLaunch ?? readLastLaunch)(dataDir, tool),
  };
}

function settingsFor(flags, env, flagModel) {
  return {
    ...(flagModel ? { model: flagModel } : {}),
    ...(flags.tag ? { tag: String(flags.tag) } : {}),
    summary: flags.summary !== false && env.OMNIROUTE_LAUNCH_SUMMARY !== "0",
    privateMode: Boolean(flags.private),
  };
}

function isInteractive(io) {
  const tty = io.deps.isTTY ?? (process.stdin.isTTY && process.stdout.isTTY);
  return Boolean(tty && !io.flags.yes && !io.jsonMode);
}

/** The picker input for a view, from the launch's flags and saved choices. */
function pickInputFor(L, interactive) {
  return (view) => ({
    view,
    tool: L.tool,
    modelPolicy: L.caps.model,
    minContextTokens: L.caps.minContextTokens,
    flagModel: L.flagModel,
    savedDefault: L.defaults?.model,
    lastModel: L.last?.model,
    interactive,
    forcePick: Boolean(L.flags.pick),
    selector: L.deps.selector,
  });
}

/** Every step before the gateway; throws a LaunchError on a usage or platform problem. */
export async function prepareLaunch(toolId, io) {
  const { flags, env } = io;
  rejectReserved(flags);
  const adapter = await loadAdapter(toolId, io.deps.registry);
  assertSupported(adapter, io.platform, flags);
  const passthrough = passthroughFor(io, adapter);
  const target = targetFor(io);
  const baseEnv = buildSafeCliLaunchEnv(env, { inheritEnv: Boolean(flags.inheritEnv) });
  const flagModel = composeModel(flags);
  const contextKey = target.contextName || "";
  const tool = adapter.id;
  const L = {
    ...io,
    adapter,
    tool,
    caps: adapter.capabilities,
    passthrough,
    target,
    baseEnv,
    flagModel,
    contextKey,
    ...savedChoices(io, tool, contextKey),
    settings: settingsFor(flags, env, flagModel),
  };
  L.pickInput = pickInputFor(L, isInteractive(io));
  return L;
}
