import { join } from "node:path";
import os from "node:os";
import { t } from "../i18n.mjs";
import { contextCredentialFor, resolveActiveContext } from "../contexts.mjs";
import { quoteShellArgs } from "../utils/winShellArgs.mjs";
import { buildSafeCliLaunchEnv } from "../launch-env.mjs";
import { claudeWindowEnv } from "../utils/claudeWindowEnv.mjs";
import { executePlan } from "../launch/core/execute.mjs";
import { probeWindowsBinary as coreProbeWindowsBinary } from "../launch/core/resolve-bin.mjs";

/**
 * Legacy-shaped Windows probe on top of the single core copy (core/resolve-bin.mjs): the
 * preferred `.exe/.cmd/.bat/.com` match, or null when `where.exe` finds nothing.
 * Shared by launch.mjs, launch-codex.mjs and run.mjs.
 * @param {string} command
 * @returns {string|null}
 */
export function legacyProbeWindowsBinary(command) {
  const lines = coreProbeWindowsBinary(command);
  return lines.find((line) => /\.(exe|cmd|bat|com)$/i.test(line)) || null;
}

/**
 * One-line stderr note for the legacy command surface, silenced by
 * OMNIROUTE_NO_DEPRECATION=1.
 * @param {string} message
 * @param {{ env?: Record<string,string|undefined>, stderr?: { write(s: string): unknown } }} [io]
 */
export function legacyDeprecationNote(message, io = {}) {
  const env = io.env ?? process.env;
  if (env.OMNIROUTE_NO_DEPRECATION === "1") return;
  (io.stderr ?? process.stderr).write(`omniroute: note: ${message}\n`);
}

/**
 * Run a legacy launcher's fully built child (command, argv, env) through the launch core
 * executor (core/execute.mjs executePlan), the single spawn + signal-forwarding implementation.
 * The env is passed verbatim as the base env with an empty plan env, so the child sees exactly
 * what the legacy builder produced. Legacy exit codes are kept: child code, 129/130/143 for a
 * forwarded SIGHUP/SIGINT/SIGTERM, 127 plus `notFoundMessage` when the binary is missing, 1 for
 * any other spawn failure.
 *
 * @param {{ command: string, shell?: boolean, args?: string[], env: Record<string,string>,
 *   notFoundMessage: string, signalTimeoutMs?: number, platform?: string, cwd?: string,
 *   spawn?: Function, stdio?: any, signalSource?: any,
 *   stderr?: { write(s: string): unknown } }} input
 * @returns {Promise<number>} exit code
 */
export async function executeLegacyLaunch(input) {
  const stderr = input.stderr ?? process.stderr;
  const configured = Number(input.signalTimeoutMs ?? process.env.OMNIROUTE_CHILD_SIGNAL_TIMEOUT_MS);
  const plan = {
    tool: "legacy",
    argv: [...(input.args ?? [])],
    env: { set: {}, unset: [] },
    tempFiles: [],
    needsTempDir: false,
  };
  try {
    const result = await executePlan(plan, {
      command: input.command,
      shell: input.shell,
      platform: input.platform ?? process.platform,
      baseEnv: input.env,
      cwd: input.cwd,
      ...(input.spawn ? { spawn: input.spawn } : {}),
      ...(input.stdio ? { stdio: input.stdio } : {}),
      ...(input.signalSource ? { signalSource: input.signalSource } : {}),
      signalTimeoutMs: Number.isFinite(configured) && configured > 0 ? configured : 5000,
      warn: (message) => stderr.write(`${message}\n`),
    });
    return result.exitCode;
  } catch (error) {
    if (error?.code === "ToolNotFound") {
      stderr.write(`${input.notFoundMessage}\n`);
      return 127;
    }
    const cause = error?.cause;
    stderr.write(`${String(cause?.message || error?.message || error)}\n`);
    return 1;
  }
}

function stripTrailingSlash(value) {
  let s = String(value);
  let end = s.length;
  while (end > 0 && s.charCodeAt(end - 1) === 47) end--;
  return end === s.length ? s : s.slice(0, end);
}

/**
 * Build a clean child env for Claude Code pointed at OmniRoute.
 *
 * Strips inherited ANTHROPIC_* (avoids a stale shell token leaking through), then
 * injects the base URL, gateway model discovery, and auto-compact window.
 *
 * @param {Record<string,string>} baseEnv
 * @param {number|string} baseUrlOrPort  a port (→ http://localhost:<port>) or a full base URL
 * @param {string|undefined} authToken
 * @param {{ configDir?:string, model?:string, contextWindow?:number }} [opts]
 *   contextWindow: the routed model's real window (tokens) from /v1/models
 * @returns {Record<string,string>}
 */
export function buildClaudeEnv(baseEnv, baseUrlOrPort, authToken, opts = {}) {
  const env = buildSafeCliLaunchEnv(baseEnv, { inheritEnv: Boolean(opts.inheritEnv) });
  for (const key of Object.keys(env)) {
    if (key.startsWith("ANTHROPIC_")) delete env[key];
  }

  // Accept a bare port (number/numeric string → localhost) or a full base URL.
  // Claude Code wants the ROOT URL (it appends /v1/messages itself) - no /v1 here.
  let baseUrl;
  if (typeof baseUrlOrPort === "number" || /^\d+$/.test(String(baseUrlOrPort))) {
    baseUrl = `http://localhost:${Number(baseUrlOrPort) || 20128}`;
  } else {
    baseUrl = stripTrailingSlash(String(baseUrlOrPort)).replace(/\/v1$/, "");
  }

  env.ANTHROPIC_BASE_URL = baseUrl;
  // Always set a token: when none is resolved, a sentinel keeps newer Claude Code
  // from stopping at its local login gate before it ever contacts OmniRoute (an
  // open backend ignores the value). Mirrors free-claude-code. ANTHROPIC_API_KEY
  // stays stripped (above) so it can't shadow the Bearer token.
  env.ANTHROPIC_AUTH_TOKEN = (authToken && String(authToken).trim()) || "omniroute-no-auth";
  env.CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY = "1";
  // Window sizing for a model with a known real window: see claudeWindowEnv.
  Object.assign(env, claudeWindowEnv(opts.contextWindow));
  // Profile isolation (Claude Code has no native profiles - CLAUDE_CONFIG_DIR is
  // the idiomatic mechanism: separate settings/credentials/history/cache per dir).
  if (opts.configDir) env.CLAUDE_CONFIG_DIR = opts.configDir;
  if (opts.model) env.ANTHROPIC_MODEL = opts.model;
  return env;
}

/** The model a claude invocation will use: pass-through `--model` wins over the profile model. */
export function routedModel(claudeArgs, fallback) {
  for (let i = 0; i < claudeArgs.length; i++) {
    const arg = String(claudeArgs[i]);
    if (arg === "--model") return String(claudeArgs[i + 1] ?? "") || fallback;
    if (arg.startsWith("--model=")) return arg.slice("--model=".length) || fallback;
  }
  return fallback;
}

/**
 * Real context window of `model` from the proxy catalog (GET /v1/models), or
 * undefined when it cannot be read. Fail-open: launch must never wait on or fail
 * because of the catalog.
 */
export async function fetchModelContextWindow(baseUrl, authToken, model) {
  if (!model) return undefined;
  try {
    const res = await fetch(`${baseUrl}/v1/models`, {
      headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return undefined;
    const entry = (await res.json())?.data?.find((m) => m?.id === model);
    return entry?.max_input_tokens ?? entry?.context_length;
  } catch {
    return undefined;
  }
}

/**
 * Resolve the OmniRoute base URL + auth for launch, honouring (in order):
 * explicit flags → the active context (remote mode) → localhost:<port>.
 * @param {{port?:string, remote?:string, baseUrl?:string, token?:string, apiKey?:string, context?:string}} opts
 * @returns {{ baseUrl:string, authToken:string|undefined }}
 */
export function resolveLaunchTarget(opts = {}) {
  const explicit = opts.remote ?? opts.baseUrl;
  let baseUrl;
  if (explicit) {
    baseUrl = stripTrailingSlash(explicit).replace(/\/v1$/, "");
  } else {
    let fromCtx;
    try {
      const ctx = resolveActiveContext(opts.context ?? process.env.OMNIROUTE_CONTEXT);
      fromCtx = ctx?.baseUrl;
    } catch {
      /* no context */
    }
    baseUrl = fromCtx
      ? stripTrailingSlash(fromCtx).replace(/\/v1$/, "")
      : `http://localhost:${Number(opts.port ?? process.env.PORT ?? 20128) || 20128}`;
  }

  let authToken = opts.token ?? opts.apiKey ?? opts["api-key"];
  if (!authToken) {
    try {
      const ctx = resolveActiveContext(opts.context ?? process.env.OMNIROUTE_CONTEXT);
      authToken = contextCredentialFor(ctx, baseUrl);
    } catch {
      /* no context auth */
    }
  }
  if (!authToken) authToken = process.env.ANTHROPIC_AUTH_TOKEN ?? process.env.OMNIROUTE_API_KEY;
  return { baseUrl, authToken };
}

/**
 * #8246 / #9454: on Windows, npm installs claude as a `.cmd` shim - spawn()
 * without a shell cannot resolve PATHEXT shims (and Node refuses to exec `.cmd`
 * directly since CVE-2024-27980), so the npm-shim path must go through cmd.exe.
 * But the native installer creates only `claude.exe`, which is a real PE that
 * must NOT go through a shell (cmd.exe would split an absolute path with spaces).
 *
 * So probe PATH for `claude` first: when `where.exe` resolves a `.exe`, spawn it
 * directly (no shell); otherwise fall back to the npm `claude.cmd` + shell. Off
 * Windows the bare binary is spawned unchanged (no shell, no probe).
 *
 * @param {NodeJS.Platform|string} platform
 * @param {{ probe?: (command: string) => Promise<string|null> | string | null }} [opts]
 *   injectable probe for tests (default: legacyProbeWindowsBinary, the core where.exe probe)
 * @returns {Promise<{ command: string, shell: true|undefined }>}
 */
export async function resolveClaudeSpawn(platform, opts = {}) {
  if (platform !== "win32") return { command: "claude", shell: undefined };
  const probe = opts.probe ?? legacyProbeWindowsBinary;
  const located = await probe("claude");
  if (located && /\.exe$/i.test(located)) {
    return { command: located, shell: undefined };
  }
  return { command: "claude.cmd", shell: true };
}

/**
 * `shell: true` makes Node join argv with plain spaces and no escaping (the
 * DEP0190 warning), so `-p "two words"` used to reach claude as `-p two` plus
 * three stray positional arguments. Quote the args ourselves on that path.
 * Off Windows there is no shell, so argv is passed through untouched.
 *
 * @param {string[]} args
 * @param {NodeJS.Platform|string} platform
 * @returns {string[]}
 */
export function quoteClaudeArgs(args, platform) {
  return quoteShellArgs(args, platform);
}

/**
 * Legacy `omniroute launch` / `omniroute run claude`: health check (no auto-start, the old
 * "not reachable" message and exit 1), then spawn claude through the launch core executor.
 *
 * The env is still built by buildClaudeEnv, not by the claude adapter plan: its behaviour
 * (CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY, ANTHROPIC_MODEL, no host-managed switch, no
 * picker settings file) is pinned by the existing tests and differs from the adapter, so this
 * code path stays. Only the spawn + signal forwarding moved to core (executeLegacyLaunch).
 *
 * @param {{port?:string, remote?:string, token?:string, apiKey?:string, profile?:string,
 *   claudeHome?:string, model?:string, inheritEnv?:boolean, signalTimeoutMs?:number}} opts
 * @param {string[]} claudeArgs  pass-through args for the claude binary
 * @returns {Promise<number>} exit code
 */
export async function runLaunchCommand(opts = {}, claudeArgs = []) {
  const { baseUrl, authToken } = resolveLaunchTarget(opts);

  // Health check the (possibly remote) proxy before launching (GatewayUnreachable, no start).
  try {
    const res = await fetch(`${baseUrl}/api/monitoring/health`, {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
  } catch {
    console.error(
      (
        t("launch.notRunning") ||
        "OmniRoute is not reachable at {port}. Start it with 'omniroute serve'."
      ).replace("{port}", baseUrl)
    );
    return 1;
  }

  const configDir = opts.profile
    ? join(opts.claudeHome || join(os.homedir(), ".claude"), "profiles", opts.profile)
    : undefined;
  const contextWindow = await fetchModelContextWindow(
    baseUrl,
    authToken,
    routedModel(claudeArgs, opts.model)
  );
  const env = buildClaudeEnv(process.env, baseUrl, authToken, {
    configDir,
    model: opts.model,
    inheritEnv: opts.inheritEnv,
    contextWindow,
  });

  const { command, shell } = await resolveClaudeSpawn(process.platform);

  // process.exit() is never called here: on Windows it aborted with a libuv assertion while
  // the inherited stdio handles of the exited child were still closing. Callers set exitCode.
  return await executeLegacyLaunch({
    command,
    shell,
    args: claudeArgs,
    env,
    notFoundMessage: t("launch.notFound") || "The 'claude' CLI was not found in PATH.",
    signalTimeoutMs: opts.signalTimeoutMs,
  });
}

/** `omniroute launch` without a known tool: the one-line note. */
const LEGACY_LAUNCH_NOTE =
  "`omniroute launch` without a tool is deprecated, use `omnirouter launch claude` " +
  "(silence with OMNIROUTE_NO_DEPRECATION=1)";

/**
 * Section 8 routing for `omniroute launch`: "core" when the first positional (not after a
 * literal `--`) is a launch registry id or alias, else "legacy" (Claude with pass-through args).
 * @param {string[]} positionals  positional words in order (options and their values removed)
 * @param {{ afterDashDash?: number, registry: { get(idOrAlias: string): unknown } }} options
 *   afterDashDash: how many of the trailing positionals came after `--`
 * @returns {"core"|"legacy"}
 */
export function legacyLaunchRoute(positionals, { afterDashDash = 0, registry } = {}) {
  const words = positionals || [];
  const before = words.length - Math.min(afterDashDash, words.length);
  if (before <= 0) return "legacy";
  return registry?.get(String(words[0])) ? "core" : "legacy";
}

function optionFlags(option) {
  return [option.short, option.long].filter(Boolean);
}

/**
 * Split the raw args that followed the `launch` word.
 * @param {string[]} tail
 * @param {{ valueFlags?: Set<string>, dropFlags?: Set<string> }} [spec]
 *   valueFlags: options that consume the next word; dropFlags: root-only options (consumed by
 *   the root program in the legacy parse) that must not reach the new launch command
 * @returns {{ positionals: string[], afterDashDash: number, forwarded: string[] }}
 */
export function splitLaunchTail(tail, { valueFlags = new Set(), dropFlags = new Set() } = {}) {
  const positionals = [];
  const forwarded = [];
  let afterDashDash = 0;
  for (let i = 0; i < tail.length; i++) {
    const arg = String(tail[i]);
    if (arg === "--") {
      const rest = tail.slice(i + 1).map(String);
      positionals.push(...rest);
      afterDashDash = rest.length;
      forwarded.push(...tail.slice(i));
      break;
    }
    if (arg.startsWith("-") && arg !== "-") {
      const flag = arg.includes("=") ? arg.slice(0, arg.indexOf("=")) : arg;
      const takesValue = !arg.includes("=") && valueFlags.has(flag) && i + 1 < tail.length;
      if (dropFlags.has(flag)) {
        if (takesValue) i++;
        continue;
      }
      forwarded.push(arg);
      if (takesValue) forwarded.push(String(tail[++i]));
      continue;
    }
    positionals.push(arg);
    forwarded.push(arg);
  }
  return { positionals, afterDashDash, forwarded };
}

function rootCommandOf(cmd) {
  let node = cmd;
  while (node?.parent) node = node.parent;
  return node;
}

/** Raw args after the `launch` word, skipping root option values (e.g. `--context launch`). */
function rawLaunchTail(cmd) {
  const root = rootCommandOf(cmd);
  const raw = (root.rawArgs || []).map(String);
  const rootValueFlags = new Set(
    root.options.filter((o) => o.required || o.optional).flatMap(optionFlags)
  );
  const names = [cmd.name(), ...cmd.aliases()];
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === "--") break;
    if (rootValueFlags.has(raw[i])) {
      i++;
      continue;
    }
    if (names.includes(raw[i])) return raw.slice(i + 1);
  }
  return [];
}

async function loadRegistry(deps) {
  return deps.registry ?? (await import("../launch/registry.mjs")).launchRegistry;
}

/** Route + forwarded args for the dispatched legacy command (pure apart from the registry). */
async function routeLegacyLaunch(cmd, deps) {
  const root = rootCommandOf(cmd);
  const { registerLaunchCommand } = await import("../launch/command.mjs");
  const { Command } = await import("commander");
  // Flag specs come from the real commands, so the split follows their declared options.
  const probe = registerLaunchCommand(new Command(), { legacy: true, deps });
  const all = [...probe.options, ...cmd.options, ...root.options];
  const valueFlags = new Set(all.filter((o) => o.required || o.optional).flatMap(optionFlags));
  const coreLongs = new Set(probe.options.map((o) => o.long));
  const dropFlags = new Set(
    root.options.filter((o) => !coreLongs.has(o.long)).flatMap(optionFlags)
  );
  const tail = rawLaunchTail(cmd);
  const split = splitLaunchTail(tail, { valueFlags, dropFlags });
  const registry = await loadRegistry(deps);
  return { route: legacyLaunchRoute(split.positionals, { ...split, registry }), split };
}

/** Root options typed on the command line (`omniroute --context x launch codex`). */
function rootPassthroughArgs(cmd) {
  const root = rootCommandOf(cmd);
  const out = [];
  for (const [key, flag] of [
    ["apiKey", "--api-key"],
    ["baseUrl", "--base-url"],
    ["context", "--context"],
  ]) {
    const value = root.opts()[key];
    if (root.getOptionValueSource?.(key) === "cli" && value !== undefined) out.push(flag, value);
  }
  return out;
}

async function delegateToCore(cmd, forwarded, deps, setExitCode) {
  const { registerLaunchCommand } = await import("../launch/command.mjs");
  const { Command } = await import("commander");
  const fresh = new Command();
  fresh.name(rootCommandOf(cmd).name() || "omniroute");
  fresh.exitOverride();
  if (deps.stdout || deps.stderr) {
    fresh.configureOutput({
      ...(deps.stdout ? { writeOut: (s) => deps.stdout.write(s) } : {}),
      ...(deps.stderr ? { writeErr: (s) => deps.stderr.write(s) } : {}),
    });
  }
  registerLaunchCommand(fresh, { legacy: true, deps });
  try {
    // Root options go first so the same option typed after `launch` wins.
    await fresh.parseAsync(["launch", ...rootPassthroughArgs(cmd), ...forwarded], {
      from: "user",
    });
  } catch (error) {
    // Commander help/usage errors (exitOverride): keep the process alive, map the exit code.
    if (typeof error?.exitCode === "number" && String(error.code || "").startsWith("commander.")) {
      setExitCode(error.exitCode);
      return;
    }
    throw error;
  }
}

/** Legacy `--start`: run Claude through the core pipeline (auto-start, session token). */
async function runLegacyStart(opts, claudeArgs, deps, setExitCode) {
  const { buildLaunchFlags } = await import("../launch/command.mjs");
  const legacyOpts = {
    port: opts.port,
    remote: opts.remote,
    token: opts.token,
    apiKey: opts.apiKey,
    profile: opts.profile,
    inheritEnv: opts.inheritEnv,
    start: true,
  };
  // Every claudeArg is tool argv (as if after `--`), so none is taken as a tool or @preset.
  const { flags } = buildLaunchFlags(undefined, claudeArgs, legacyOpts, {
    legacy: true,
    afterDashDash: claudeArgs.length,
  });
  const stderr = deps.stderr ?? process.stderr;
  try {
    const run = deps.runLaunch ?? (await import("../launch/core/pipeline.mjs")).runLaunch;
    const result = await run("claude", flags, {
      ...(deps.stdout ? { stdout: deps.stdout } : {}),
      ...(deps.stderr ? { stderr: deps.stderr } : {}),
      ...(deps.env ? { env: deps.env } : {}),
      ...(deps.launchDeps || {}),
      registry: await loadRegistry(deps),
    });
    setExitCode(result?.exitCode ?? 0);
  } catch (error) {
    const { exitCodeFor, formatError } = await import("../launch/core/errors.mjs");
    stderr.write(formatError(error));
    setExitCode(exitCodeFor(error));
  }
}

/**
 * Register `omniroute launch`.
 * @param {import("commander").Command} program  the root program
 * @param {{ deps?: { registry?, runLaunch?, runLaunchCommand?, setExitCode?, stdout?, stderr?,
 *   env?, launchDeps? } }} [options]  injectable effects for tests; also handed to the core
 *   `launch` command (bin/cli/launch/command.mjs) when a known tool is named
 */
export function registerLaunch(program, { deps = {} } = {}) {
  const setExitCode =
    deps.setExitCode ??
    ((code) => {
      process.exitCode = code;
    });
  let routed;

  const cmd = program
    .command("launch")
    .description(
      t("launch.description") || "Launch Claude Code pointed at OmniRoute (local or remote)"
    )
    .option("--port <port>", t("serve.port") || "Proxy port", "20128")
    .option("--remote <url>", "Remote OmniRoute base URL (overrides --port and the active context)")
    .option(
      "--profile <name>",
      "Claude Code profile to use (CLAUDE_CONFIG_DIR ~/.claude/profiles/<name>)"
    )
    .option("--token <token>", t("launch.token") || "Token Claude sends (ANTHROPIC_AUTH_TOKEN)")
    .option("--api-key <key>", "Alias for --token (OmniRoute access token / API key)")
    .option(
      "--inherit-env",
      "Explicitly pass the full parent environment to Claude Code (may expose credentials)"
    )
    .option("--start", "Start the OmniRoute gateway if it is not running (new launch core)")
    .allowUnknownOption(true)
    .allowExcessArguments(true)
    .argument("[claudeArgs...]", "arguments passed through to the claude binary")
    .action(async (claudeArgs, opts) => {
      const { route, split } = routed ?? (await routeLegacyLaunch(cmd, deps));
      routed = undefined;
      if (route === "core") {
        await delegateToCore(cmd, split.forwarded, deps, setExitCode);
        return;
      }
      legacyDeprecationNote(LEGACY_LAUNCH_NOTE, { env: deps.env, stderr: deps.stderr });
      if (opts.start) {
        await runLegacyStart(opts, claudeArgs ?? [], deps, setExitCode);
        return;
      }
      // process.exit() here aborted the process with a libuv assertion on
      // Windows (`!(handle->flags & UV_HANDLE_CLOSING)`, async.c:94): it tears
      // the loop down while the inherited stdio handles of the just-exited
      // child are still closing. Setting exitCode lets the loop drain first.
      const run = deps.runLaunchCommand ?? runLaunchCommand;
      setExitCode(await run(opts, claudeArgs ?? []));
    });

  // Route before the legacy command parses its options: a known tool must reach the new
  // command's `--help`, not the legacy one, so legacy help is switched off for that parse.
  program.hook("preSubcommand", async (_root, actionCommand) => {
    if (actionCommand !== cmd) return;
    routed = await routeLegacyLaunch(cmd, deps);
    cmd.helpOption(routed.route !== "core");
  });

  return cmd;
}
