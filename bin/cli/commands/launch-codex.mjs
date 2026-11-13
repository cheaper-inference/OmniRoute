import { t } from "../i18n.mjs";
import { contextCredentialFor, resolveActiveContext } from "../contexts.mjs";
import { quoteShellArgs } from "../utils/winShellArgs.mjs";
import { buildSafeCliLaunchEnv } from "../launch-env.mjs";
import { executeLegacyLaunch, legacyDeprecationNote, legacyProbeWindowsBinary } from "./launch.mjs";

/** OpenAI/Codex env keys stripped from the child so a stale OpenAI key/base-url
 *  in the shell can't shadow the omniroute provider (defense-in-depth). Mirrors
 *  free-claude-code's codex adapter. NOTE: this does NOT silence codex's
 *  `refresh_token` log noise: that comes from a stored OpenAI session in
 *  ~/.codex/auth.json, not the env; it is cosmetic and does not block requests. */
const STRIPPED_CODEX_ENV_KEYS = [
  "OPENAI_API_KEY",
  "OPENAI_BASE_URL",
  "OPENAI_API_BASE",
  "OPENAI_ORG_ID",
  "OPENAI_ORGANIZATION",
  "CODEX_API_KEY",
];

/** Placeholder so codex's `env_key` is always satisfied when the backend is open. */
const NO_AUTH_SENTINEL = "omniroute-no-auth";

// On Windows the `codex` binary is an npm `.cmd` shim that `spawn` cannot resolve
// without a shell (bare "codex" → ENOENT). Mirror the qodercli Windows fix (#6263):
// spawn `codex.cmd` through a shell on win32, and the bare binary elsewhere.
//
// #9454: the native codex installer may ship a real `codex.exe` instead of the
// npm `.cmd` shim. Probe PATH for `codex` first: when `where.exe` resolves a
// `.exe`, spawn it directly (no shell: cmd.exe would split an absolute path
// with spaces); otherwise fall back to `codex.cmd` + shell. Off Windows the bare
// binary is spawned unchanged (no shell, no probe).
/**
 * @param {NodeJS.Platform|string} platform
 * @param {{ probe?: (command: string) => Promise<string|null> }} [opts]  injectable probe for tests
 * @returns {Promise<{ command: string, shell: true|undefined }>}
 */
export async function resolveCodexSpawn(platform, opts = {}) {
  if (platform !== "win32") return { command: "codex", shell: undefined };
  const probe = opts.probe ?? legacyProbeWindowsBinary;
  const located = await probe("codex");
  if (located && /\.exe$/i.test(located)) {
    return { command: located, shell: undefined };
  }
  return { command: "codex.cmd", shell: true };
}

/**
 * `shell: true` makes Node join argv with plain spaces and no escaping (the
 * DEP0190 warning). That mangles every launch-codex invocation on Windows, not
 * just the ones with a multi-word user argument: the injected `-c` provider
 * flags carry TOML values whose quotes cmd.exe strips
 * (`model_providers.omniroute.name="OmniRoute"` arrives unquoted and no longer
 * parses as TOML). Quote the args ourselves on that path; off Windows there is
 * no shell, so argv is passed through untouched. Same fix as `launch` (#8837).
 *
 * @param {string[]} args
 * @param {NodeJS.Platform|string} platform
 * @returns {string[]}
 */
export function quoteCodexArgs(args, platform) {
  return quoteShellArgs(args, platform);
}

function stripTrailingSlash(value) {
  let s = String(value);
  let end = s.length;
  while (end > 0 && s.charCodeAt(end - 1) === 47) end--;
  return end === s.length ? s : s.slice(0, end);
}

/** TOML assignment for a `-c key=value` codex flag (strings get quoted). */
function tomlAssign(key, value) {
  if (typeof value === "boolean" || typeof value === "number") return `${key}=${value}`;
  return `${key}=${JSON.stringify(String(value))}`;
}

/**
 * Resolve the OmniRoute root base URL + auth for codex, honouring (in order):
 * explicit flags → active context (remote mode) → localhost:<port>.
 * @returns {{ baseUrl:string, authToken:string|undefined }}
 */
export function resolveCodexTarget(opts = {}) {
  const explicit = opts.remote ?? opts.baseUrl;
  let baseUrl;
  if (explicit) {
    baseUrl = stripTrailingSlash(explicit).replace(/\/v1$/, "");
  } else {
    let fromCtx;
    try {
      fromCtx = resolveActiveContext(opts.context ?? process.env.OMNIROUTE_CONTEXT)?.baseUrl;
    } catch {
      /* no context */
    }
    baseUrl = fromCtx
      ? stripTrailingSlash(fromCtx).replace(/\/v1$/, "")
      : `http://localhost:${Number(opts.port ?? process.env.PORT ?? 20128) || 20128}`;
  }

  let authToken = opts.apiKey ?? opts["api-key"];
  if (!authToken) {
    try {
      const ctx = resolveActiveContext(opts.context ?? process.env.OMNIROUTE_CONTEXT);
      authToken = contextCredentialFor(ctx, baseUrl);
    } catch {
      /* no context auth */
    }
  }
  if (!authToken) authToken = process.env.OMNIROUTE_API_KEY;
  return { baseUrl, authToken };
}

/** Health-check an OmniRoute root URL before launching Codex. */
async function healthCheck(baseUrl, timeoutMs = 3000) {
  try {
    const res = await fetch(`${baseUrl}/api/monitoring/health`, {
      signal: AbortSignal.timeout(timeoutMs),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Build the env for the Codex child: strip stale OpenAI/Codex creds, then set
 * OMNIROUTE_API_KEY (the provider env_key) to the resolved token or a sentinel.
 * @param {Record<string,string>} baseEnv
 * @param {string|undefined} authToken
 * @returns {Record<string,string>}
 */
export function buildCodexEnv(baseEnv, authToken, options = {}) {
  const env = buildSafeCliLaunchEnv(baseEnv, { inheritEnv: Boolean(options.inheritEnv) });
  for (const key of STRIPPED_CODEX_ENV_KEYS) delete env[key];
  env.OMNIROUTE_API_KEY = (authToken && String(authToken).trim()) || NO_AUTH_SENTINEL;
  return env;
}

/**
 * Codex `-c` flags that define the `omniroute` provider inline, so launch works
 * WITHOUT a pre-existing ~/.codex/config.toml. Mirrors free-claude-code.
 * @param {string} baseUrl  OmniRoute root URL (no /v1)
 * @returns {string[]}
 */
export function buildCodexProviderArgs(baseUrl, model) {
  const args = [
    "-c",
    tomlAssign("model_provider", "omniroute"),
    "-c",
    tomlAssign("model_providers.omniroute.name", "OmniRoute"),
    "-c",
    tomlAssign("model_providers.omniroute.base_url", `${baseUrl}/v1`),
    "-c",
    tomlAssign("model_providers.omniroute.env_key", "OMNIROUTE_API_KEY"),
    "-c",
    tomlAssign("model_providers.omniroute.wire_api", "responses"),
    "-c",
    tomlAssign("model_providers.omniroute.requires_openai_auth", false),
  ];

  if (model) {
    const normalized = String(model).trim();
    if (normalized) {
      args.push("-c", tomlAssign("model", normalized));
    }
  }

  return args;
}

/**
 * @param {{port?:string, remote?:string, profile?:string, apiKey?:string}} opts
 * @param {string[]} codexArgs  pass-through args for the codex binary
 * @returns {Promise<number>} exit code
 */
export async function runLaunchCodexCommand(opts = {}, codexArgs = []) {
  const { baseUrl, authToken } = resolveCodexTarget(opts);

  if (!(await healthCheck(baseUrl))) {
    console.error(
      (
        t("launch.notRunning") ||
        "OmniRoute is not reachable at {port}. Start it with 'omniroute serve'."
      ).replace("{port}", baseUrl)
    );
    return 1;
  }

  // Provider injected via -c (works without config.toml); then the profile (model),
  // then the user's pass-through args.
  const providerArgs = buildCodexProviderArgs(baseUrl, opts.model);
  const profileArgs = opts.profile ? ["--profile", opts.profile] : [];
  const extraArgs = [...providerArgs, ...profileArgs, ...codexArgs];
  const env = buildCodexEnv(process.env, authToken, opts);

  const { command: codexLaunch, shell: shellValue } = await resolveCodexSpawn(process.platform);

  // Env and argv deliberately stay on this legacy builder path (buildCodexEnv /
  // buildCodexProviderArgs): tests pin them and they differ from the codex adapter plan
  // (no model catalog, no telemetry overrides). Only spawn + signal forwarding goes through
  // the launch core executor.
  return await executeLegacyLaunch({
    command: codexLaunch,
    shell: shellValue,
    // The core executor applies quoteShellArgsForSpawn itself, so pass raw argv.
    args: extraArgs,
    env,
    notFoundMessage:
      "The 'codex' CLI was not found in PATH. Install with:\n  npm install -g @openai/codex",
    signalTimeoutMs: opts.signalTimeoutMs,
    platform: process.platform,
  });
}

export function registerLaunchCodex(program) {
  program
    .command("launch-codex")
    .description(
      t("launchCodex.description") || "Launch Codex CLI pointed at OmniRoute (local or remote VPS)"
    )
    .option("--port <port>", "Local OmniRoute port (ignored when --remote is set)", "20128")
    .option(
      "--remote <url>",
      "Remote OmniRoute base URL, e.g. http://192.168.0.15:20128 (overrides --port + context)"
    )
    .option("--profile <name>", "Codex profile to activate (passed as --profile <name>)")
    .option("-p, --p <name>", "Alias for --profile")
    .option(
      "--api-key <key>",
      "OmniRoute API key (overrides OMNIROUTE_API_KEY env var for this invocation)"
    )
    .option(
      "--inherit-env",
      "Explicitly pass the full parent environment to Codex (may expose credentials)"
    )
    .allowUnknownOption(true)
    .allowExcessArguments(true)
    .argument("[codexArgs...]", "arguments passed through to the codex binary")
    .action(async (codexArgs, opts) => {
      // Note lives here, not in runLaunchCodexCommand: `omniroute run codex` reuses that.
      legacyDeprecationNote(
        "`omniroute launch-codex` is deprecated, use `omnirouter launch codex` " +
          "(silence with OMNIROUTE_NO_DEPRECATION=1)"
      );
      const merged = { ...opts, profile: opts.profile ?? opts.p };
      // process.exit() here aborted the process with a libuv assertion on
      // Windows (`!(handle->flags & UV_HANDLE_CLOSING)`, async.c:94): it tears
      // the loop down while the inherited stdio handles of the just-exited
      // child are still closing. Setting exitCode lets the loop drain first.
      process.exitCode = await runLaunchCodexCommand(merged, codexArgs ?? []);
    });
}
