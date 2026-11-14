// bin/cli/launch/command.mjs: the `omnirouter launch` and `omnirouter gateway` commands.
// Thin: parse flags into the camelCase shape `runLaunch` takes,
// then hand over to core. Every effect is injectable through `deps` for tests.
//
//   omnirouter launch <tool> [options] [-- toolArgs...]
//   omnirouter launch --list [--json]
//   omnirouter gateway status|keep|stop

import { readdirSync, rmSync, statSync } from "node:fs";
import os from "node:os";
import { join } from "node:path";

import { Option } from "commander";

import { LaunchError } from "./contract.mjs";
import { errorJson, exitCodeFor, formatError, toLaunchError } from "./core/errors.mjs";
import { launchRoot } from "./core/state.mjs";
import { launchRegistry } from "./registry.mjs";
import { resolveDataDir } from "../data-dir.mjs";

/** Prefix of the private temp dirs core creates per launch (core/tempfiles.mjs). */
const TMP_PREFIX = "omnirouter-";
/** `--cleanup` removes launcher temp dirs older than this (a live launch is younger). */
const ORPHAN_TMP_AGE_MS = 24 * 60 * 60 * 1000;

/** Root-program options a user may also type after `launch` (program.mjs declares them). */
const GLOBAL_PASSTHROUGH = ["apiKey", "baseUrl", "context"];

/** Section 9 v1.x flags: declared so commander accepts them, rejected by core (exit 2). */
const RESERVED_OPTIONS = [
  ["--budget <amount>", "reserved: session budget"],
  ["--budget-fallback <model>", "reserved: model to use once the budget is hit"],
  ["--mode <name>", "reserved: policy mode"],
  ["--compression <level>", "reserved: prompt compression"],
  ["--mcp [servers]", "reserved: MCP auto-wire"],
  ["--statusline", "reserved: Claude statusline with live cost"],
  ["--exec [prompt]", "reserved: headless exec mode"],
  ["--install", "reserved: install the tool"],
];

function displayNameOf(registry, adapter) {
  return registry.entry?.(adapter.id)?.displayName ?? adapter.displayName ?? adapter.id;
}

/** Registered ids in registry order, without loading adapters when the registry can. */
function registryIds(registry) {
  if (typeof registry.ids === "function") return registry.ids();
  return registry.list().map((adapter) => adapter.id);
}

/** Every registered adapter, loading lazy ones (registries without `loadAll` are eager). */
async function registryAdapters(registry) {
  if (typeof registry.loadAll === "function") return registry.loadAll();
  return registry.list();
}

/** `{ id, tier, displayName }` per registered tool, from metadata only when available. */
function registryRows(registry) {
  if (typeof registry.ids === "function" && typeof registry.entry === "function") {
    return registry.ids().map((id) => {
      const entry = registry.entry(id);
      return { id, tier: entry.tier, displayName: entry.displayName };
    });
  }
  return registry.list().map((adapter) => ({
    id: adapter.id,
    tier: adapter.capabilities.tier,
    displayName: displayNameOf(registry, adapter),
  }));
}

function defaultSetExitCode(code) {
  process.exitCode = code;
}

async function defaultRunLaunch(...args) {
  return (await import("./core/pipeline.mjs")).runLaunch(...args);
}

function io(deps) {
  return {
    stdout: deps.stdout ?? process.stdout,
    stderr: deps.stderr ?? process.stderr,
    setExitCode: deps.setExitCode ?? defaultSetExitCode,
  };
}

function reportError(error, { json, stdout, stderr, setExitCode }) {
  const err = toLaunchError(error);
  if (json) stdout.write(`${JSON.stringify(errorJson(err), null, 2)}\n`);
  else stderr.write(formatError(err));
  setExitCode(exitCodeFor(err));
  return err;
}

function rootOf(cmd) {
  let node = cmd;
  while (node?.parent) node = node.parent;
  return node;
}

/** Root options typed on the command line (not env defaults) fill missing launch options. */
function globalOverrides(cmd, opts) {
  const out = {};
  for (let node = cmd.parent; node; node = node.parent) {
    const values = node.opts();
    for (const key of GLOBAL_PASSTHROUGH) {
      if (opts[key] !== undefined || out[key] !== undefined) continue;
      if (node.getOptionValueSource?.(key) === "cli" && values[key] !== undefined) {
        out[key] = values[key];
      }
    }
  }
  return out;
}

/** Number of operands commander parsed after a literal `--` in the raw argv. */
function argsAfterDashDash(cmd) {
  const raw = rootOf(cmd).rawArgs || [];
  const index = raw.indexOf("--");
  return index === -1 ? 0 : raw.length - index - 1;
}

function parseIntFlag(value, flag) {
  if (value === undefined) return undefined;
  const n = Number(value);
  if (!Number.isInteger(n) || n < 0) {
    throw new LaunchError("UsageError", `${flag} must be a non-negative integer, got ${value}`);
  }
  return n;
}

/**
 * Commander opts + positionals -> `runLaunch` flags (camelCase, `args` = tool argv).
 * Exported for tests.
 * @returns {{ toolId: string | undefined, flags: object }}
 */
export function buildLaunchFlags(tool, toolArgs, opts, { afterDashDash = 0, legacy = false } = {}) {
  const positionals = [...(tool === undefined ? [] : [tool]), ...(toolArgs || [])];
  const splitAt = positionals.length - Math.min(afterDashDash, positionals.length);
  const before = positionals.slice(0, splitAt);
  const after = positionals.slice(splitAt);

  let preset;
  const words = [];
  for (const word of before) {
    if (word.startsWith("@") && word.length > 1) preset = word;
    else words.push(word);
  }
  const [toolId, ...extra] = words;
  if (extra.length > 0 && !legacy) {
    throw new LaunchError("UsageError", `unexpected argument ${JSON.stringify(extra[0])}`, {
      hint: "put arguments for the tool after --, e.g. omnirouter launch claude -- --help",
    });
  }

  const flags = {
    model: opts.model,
    provider: opts.provider,
    pick: Boolean(opts.pick),
    allModels: Boolean(opts.allModels),
    favorite: Boolean(opts.favorite),
    unfavorite: Boolean(opts.unfavorite),
    profile: opts.profile,
    port: opts.port,
    remote: opts.remote,
    baseUrl: opts.baseUrl,
    context: opts.context,
    apiKey: opts.apiKey,
    token: opts.token,
    apiKeyEnv: opts.apiKeyEnv,
    start: opts.start !== false,
    noStart: opts.start === false,
    keepGateway: Boolean(opts.keepGateway),
    startTimeoutMs: parseIntFlag(opts.startTimeout, "--start-timeout"),
    inheritEnv: Boolean(opts.inheritEnv),
    dryRun: Boolean(opts.dryRun),
    json: Boolean(opts.json),
    yes: Boolean(opts.yes),
    doctor: Boolean(opts.doctor),
    cleanup: Boolean(opts.cleanup),
    tag: opts.tag,
    summary: opts.summary !== false,
    setDefault: Boolean(opts.setDefault),
    private: Boolean(opts.private),
    budget: opts.budget,
    budgetFallback: opts.budgetFallback,
    mode: opts.mode,
    compression: opts.compression,
    mcp: opts.mcp,
    statusline: opts.statusline,
    exec: opts.exec,
    install: opts.install,
    preset,
    args: [...(legacy ? extra : []), ...after],
  };
  for (const key of Object.keys(flags)) if (flags[key] === undefined) delete flags[key];
  return { toolId, flags };
}

/** One row per registered tool for `launch --list`. */
export async function listLaunchTools(registry, deps = {}) {
  const platform = deps.platform ?? process.platform;
  const env = deps.env ?? process.env;
  const { resolveBinary, probeTool } = deps.resolveBinary
    ? deps
    : await import("./core/resolve-bin.mjs");
  const adapters = await registryAdapters(registry);
  return Promise.all(
    adapters.map(async (adapter) => {
      const caps = adapter.capabilities;
      const row = {
        id: adapter.id,
        displayName: displayNameOf(registry, adapter),
        tier: caps.tier,
        aliases: registry.aliasesOf ? registry.aliasesOf(adapter.id) : [],
        installed: false,
        version: null,
        command: null,
        launchable: false,
        reason: undefined,
      };
      if (!caps.platforms.includes(platform)) {
        row.reason = `not supported on ${platform}`;
        return row;
      }
      let bin;
      try {
        bin = await resolveBinary(adapter, { platform, env });
      } catch {
        row.reason = "not installed";
        return row;
      }
      row.installed = true;
      row.command = bin.command;
      try {
        const probed = await probeTool(adapter, bin, { platform, env });
        row.version = probed.version ?? null;
        row.launchable = true;
      } catch (error) {
        row.reason = toLaunchError(error).message;
      }
      return row;
    })
  ).then((rows) => rows.map((r) => (r.reason === undefined ? { ...r, reason: null } : r)));
}

function renderList(rows) {
  const head = ["TOOL", "TIER", "INSTALLED", "VERSION", "NOTE"];
  const body = rows.map((r) => [
    r.id,
    r.tier,
    r.installed ? "yes" : "no",
    r.version ?? "-",
    r.launchable ? "" : (r.reason ?? ""),
  ]);
  const widths = head.map((h, i) => Math.max(h.length, ...body.map((row) => row[i].length)));
  const line = (cells) =>
    cells
      .map((c, i) => (i === cells.length - 1 ? c : c.padEnd(widths[i])))
      .join("  ")
      .trimEnd();
  return `${[line(head), ...body.map(line)].join("\n")}\n`;
}

/**
 * `--cleanup`: forced stale sweep. Prunes dead gateway leases and
 * removes launcher temp dirs older than a day. Returns what it removed.
 */
export async function runCleanup({
  stateDir,
  tmpRoot = os.tmpdir(),
  now = Date.now(),
  pruneLeases,
} = {}) {
  const prune = pruneLeases ?? (await import("./core/lease.mjs")).pruneLeases;
  let leases = 0;
  try {
    leases = prune(stateDir);
  } catch {
    leases = 0;
  }
  const tempDirs = [];
  let names = [];
  try {
    names = readdirSync(tmpRoot);
  } catch {
    names = [];
  }
  for (const name of names) {
    if (!name.startsWith(TMP_PREFIX)) continue;
    const path = join(tmpRoot, name);
    try {
      const st = statSync(path);
      if (!st.isDirectory() || now - st.mtimeMs < ORPHAN_TMP_AGE_MS) continue;
      if (typeof process.getuid === "function" && st.uid !== process.getuid()) continue;
      rmSync(path, { recursive: true, force: true });
      tempDirs.push(path);
    } catch {
      // raced with another sweep or not ours: skip
    }
  }
  return { leases, tempDirs };
}

function helpFooter(registry) {
  const lines = ["", "Launchable tools:"];
  try {
    for (const row of registryRows(registry)) {
      const aliases = registry.aliasesOf?.(row.id) || [];
      const alias = aliases.length > 0 ? ` (aliases: ${aliases.join(", ")})` : "";
      lines.push(`  ${row.id.padEnd(10)} ${row.tier.padEnd(10)} ${row.displayName}${alias}`);
    }
  } catch {
    lines.push("  (registry unavailable)");
  }
  lines.push(
    "",
    "Everything after -- goes to the tool verbatim.",
    `Reserved for a later release (exit 2): ${RESERVED_OPTIONS.map(([o]) => o.split(" ")[0]).join(" ")} @<preset>`,
    "",
    "Examples:",
    "  omnirouter launch claude",
    "  omnirouter launch codex -m openai/gpt-5.2 -- --full-auto",
    "  omnirouter launch opencode --dry-run --json",
    "  omnirouter launch --list"
  );
  return `${lines.join("\n")}\n`;
}

/** Map commander usage failures (exit 1) to the launcher's usage exit code 2. */
function usageExitOverride(err) {
  if (err.exitCode === 1 && String(err.code || "").startsWith("commander.")) err.exitCode = 2;
  throw err;
}

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
    .argument("[toolArgs...]", "arguments for the tool, after --")
    .option("-m, --model <id>", "model id (default: saved default, last used, or the picker)")
    .option("--provider <id>", "provider prefix for --model")
    .option("--pick", "force the interactive model picker")
    .option(
      "--all-models",
      "list every catalog model (default: only providers you have a key for, no auto/*)"
    )
    .option("--favorite", "mark the chosen model as a favorite")
    .option("--unfavorite", "remove the chosen model from favorites")
    .option("-p, --profile <name>", "tool profile (tools that support it)")
    .option("--port <n>", "local gateway port (default PORT or 20128)")
    .option("--remote <url>", "remote gateway URL (no lifecycle)")
    .option("--base-url <url>", "alias for --remote")
    .option("--context <name>", "named context (default OMNIROUTE_CONTEXT)")
    .option("--api-key <key>", "credential for the gateway")
    .option("--token <key>", "alias for --api-key")
    .option("--api-key-env <NAME>", "read the credential from this env var")
    .option("--no-start", "never auto-start the gateway; fail if it is down")
    .option("--keep-gateway", "keep a gateway this launch started running afterwards")
    .option("--start-timeout <ms>", "gateway readiness wait")
    .option("--inherit-env", "pass the full parent environment to the tool")
    .option("--dry-run", "print the launch plan, no side effects")
    .option("--json", "machine-readable output (plan, result, list, or error)")
    .option("-y, --yes", "non-interactive: never prompt")
    .option("--doctor", "run checks for this tool, no spawn")
    .option("--cleanup", "remove stale leases and orphan launcher temp dirs")
    .option("--tag <name>", "session tag for logs and cost")
    .option("--no-summary", "skip the usage/cost summary on exit (OMNIROUTE_LAUNCH_SUMMARY=0)")
    .option("--set-default", "save the chosen model as this tool's default")
    .option("--private", "also turn off the tool's telemetry and nonessential traffic")
    .option("--list", "list launchable tools: installed, version, tier");
  for (const [flags, description] of RESERVED_OPTIONS) {
    cmd.addOption(new Option(flags, description).hideHelp());
  }
  cmd.exitOverride(usageExitOverride);
  cmd.showHelpAfterError("(see omnirouter launch --help)");
  if (legacy) cmd.allowUnknownOption(true).allowExcessArguments(true);
  cmd.addHelpText("after", () => helpFooter(registry));

  cmd.action(async (tool, toolArgs, opts, command) => {
    const out = io(deps);
    const json = Boolean(opts.json);
    try {
      const merged = { ...opts, ...globalOverrides(command, opts) };
      const { toolId, flags } = buildLaunchFlags(tool, toolArgs, merged, {
        afterDashDash: argsAfterDashDash(command),
        legacy,
      });
      const env = deps.env ?? process.env;

      if (flags.cleanup) {
        const stateDir = deps.stateDir ?? launchRoot(resolveDataDir());
        const removed = await (deps.cleanup ?? runCleanup)({ stateDir });
        if (!json || !toolId) {
          const text = `omnirouter: cleanup removed ${removed.leases} stale leases, ${removed.tempDirs.length} temp dirs\n`;
          if (json && !toolId)
            out.stdout.write(`${JSON.stringify({ cleanup: removed }, null, 2)}\n`);
          else out.stderr.write(text);
        }
        if (!toolId && !opts.list) {
          out.setExitCode(0);
          return;
        }
      }

      if (opts.list) {
        if (toolId) throw new LaunchError("UsageError", "--list takes no tool");
        const rows = await listLaunchTools(registry, { ...deps, env });
        out.stdout.write(json ? `${JSON.stringify({ tools: rows }, null, 2)}\n` : renderList(rows));
        out.setExitCode(0);
        return;
      }

      if (!toolId && !flags.preset) {
        const ids = registryIds(registry);
        throw new LaunchError("UsageError", "missing tool", {
          hint: `launchable tools: ${ids.join(", ")} (or omnirouter launch --list)`,
        });
      }

      const run = deps.runLaunch ?? defaultRunLaunch;
      const result = await run(toolId ?? "", flags, {
        ...(deps.stdout ? { stdout: deps.stdout } : {}),
        ...(deps.stderr ? { stderr: deps.stderr } : {}),
        ...(deps.env ? { env: deps.env } : {}),
        ...(deps.launchDeps || {}),
        registry,
      });
      out.setExitCode(result?.exitCode ?? 0);
    } catch (error) {
      reportError(error, { json, ...out });
    }
  });

  return cmd;
}

function describeStatus(s) {
  if (!s.running) return `gateway at ${s.baseUrl}: not running`;
  const who = s.owned
    ? `started by a launcher${s.state ? ` (${s.state})` : ""}`
    : s.kept
      ? "kept after a launch (now a normal gateway)"
      : "external (not started by a launcher)";
  const pid = s.pid ? `, pid ${s.pid}` : "";
  return `gateway at ${s.baseUrl}: running, ${who}${pid}, ${s.leases} active launches`;
}

/**
 * Register `gateway status|keep|stop`.
 * @param {import("commander").Command} program
 * @param {{ deps?: { gatewayStatus?, keepGateway?, stopOwnedGateway?, stateDir?, stdout?, stderr?, setExitCode? } }} [options]
 */
export function registerGatewayCommand(program, { deps = {} } = {}) {
  const gateway = program
    .command("gateway")
    .description("Inspect or control the gateway a launcher started");
  gateway.exitOverride(usageExitOverride);

  const core = async () => {
    if (deps.gatewayStatus && deps.keepGateway && deps.stopOwnedGateway) return deps;
    const mod = await import("./core/gateway.mjs");
    return {
      gatewayStatus: deps.gatewayStatus ?? mod.gatewayStatus,
      keepGateway: deps.keepGateway ?? mod.keepGateway,
      stopOwnedGateway: deps.stopOwnedGateway ?? mod.stopOwnedGateway,
    };
  };
  const stateDir = () => deps.stateDir ?? launchRoot(resolveDataDir());

  const wrap = (fn) => async (opts) => {
    const out = io(deps);
    try {
      await fn(opts || {}, out, await core());
    } catch (error) {
      reportError(error, { json: Boolean(opts?.json), ...out });
    }
  };

  gateway
    .command("status")
    .description("Show whether the gateway runs and who owns it")
    .option("--port <n>", "gateway port")
    .option("--json", "JSON output")
    .action(
      wrap(async (opts, out, api) => {
        const status = await api.gatewayStatus({ stateDir: stateDir(), port: opts.port });
        out.stdout.write(
          opts.json ? `${JSON.stringify(status, null, 2)}\n` : `${describeStatus(status)}\n`
        );
        out.setExitCode(0);
      })
    );

  gateway
    .command("keep")
    .description("Keep the launcher-started gateway running after the last launch exits")
    .option("--json", "JSON output")
    .action(
      wrap(async (opts, out, api) => {
        const result = await api.keepGateway({ stateDir: stateDir() });
        out.stdout.write(
          opts.json
            ? `${JSON.stringify(result, null, 2)}\n`
            : result?.kept
              ? "gateway kept: it now runs until `omniroute stop`\n"
              : "no launcher-started gateway to keep\n"
        );
        out.setExitCode(0);
      })
    );

  gateway
    .command("stop")
    .description("Stop the gateway a launcher started (not one you started yourself)")
    .option("--json", "JSON output")
    .action(
      wrap(async (opts, out, api) => {
        const result = await api.stopOwnedGateway({ stateDir: stateDir() });
        out.stdout.write(
          opts.json ? `${JSON.stringify(result, null, 2)}\n` : "launcher gateway stopped\n"
        );
        out.setExitCode(0);
      })
    );

  for (const sub of gateway.commands) sub.exitOverride(usageExitOverride);
  return gateway;
}
