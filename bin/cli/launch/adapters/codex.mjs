// bin/cli/launch/adapters/codex.mjs: `omnirouter launch codex` (OpenAI Codex CLI).
//
// Fully ephemeral: every OmniRoute setting rides on `-c key=value` runtime overrides (the
// highest Codex config layer), the model catalog lives in ${STATE}, the key only in the child
// env. Nothing is written in the user's HOME or CODEX_HOME by the launcher.
//
// Pure: imports only ../contract.mjs, no I/O, no process reads.

import {
  LaunchError,
  assetRef,
  createPlan,
  defineAdapter,
  findTokenSites,
  injectRows,
  rowLabel,
  tomlKey,
} from "../contract.mjs";

const PROVIDER_ID = "omniroute";
const KEY_ENV = "OMNIROUTE_API_KEY";
const CATALOG_FILE = "model.json";
const BASE_INSTRUCTIONS_ASSET = "codex/base-instructions.txt";
/** Codex has no context default we trust for unknown rows (the value is the one ollama uses). */
const FALLBACK_CONTEXT_WINDOW = 128000;
const MIN_CONTEXT_TOKENS = 32000;
/** Each catalog entry carries ~21 KB of base instructions; cap the file at ~2 MB. */
// The catalog goes to a file and a server-side view (gateway max LAUNCH_VIEW_MAX_IDS = 5000), so
// no env limit applies. 500 keeps the Codex /model picker usable and stays far under 5000.
const VIEW_LIMIT = 500;

/** Stale OpenAI/Codex credentials removed from the child (launch-codex.mjs:41-48). */
const STRIPPED_ENV_KEYS = [
  "OPENAI_API_KEY",
  "OPENAI_BASE_URL",
  "OPENAI_API_BASE",
  "OPENAI_ORG_ID",
  "OPENAI_ORGANIZATION",
  "CODEX_API_KEY",
];

const VERSION_GATE = {
  args: ["--version"],
  // `codex --version` prints `codex-cli 0.160.1`; the default semver pattern finds it.
  min: "0.134.0",
  recommended: "0.160.1",
};

const REASONING_LEVELS = [
  { effort: "low", description: "Fast responses with lighter reasoning" },
  { effort: "medium", description: "Balanced reasoning depth for everyday tasks" },
  { effort: "high", description: "Deeper reasoning for complex problems" },
];

const PASSTHROUGH = [
  {
    flag: "-m",
    aliases: ["--model"],
    action: "owned",
    message: "the launcher sets the Codex model; use `omnirouter launch codex --model <id>`",
  },
  {
    flag: "--profile",
    aliases: ["-p"],
    action: "owned",
    message: "use `omnirouter launch codex --profile <name>` for a Codex profile",
  },
  {
    flag: "-c",
    aliases: ["--config"],
    valuePrefixes: [
      "model=",
      "model_provider=",
      "model_providers.",
      "model_catalog_json=",
      "profile=",
    ],
    action: "owned",
    message:
      "the launcher owns the Codex provider, model, catalog and profile settings; " +
      "use `omnirouter launch codex --model <id>` / `--profile <name>`",
  },
  {
    flag: "--oss",
    takesValue: false,
    action: "owned",
    message: "--oss selects a local provider and would bypass OmniRoute",
  },
  {
    flag: "--local-provider",
    action: "owned",
    message: "--local-provider selects a local provider and would bypass OmniRoute",
  },
];

function parseSemver(text) {
  const match = /(\d+)\.(\d+)\.(\d+)/.exec(String(text ?? ""));
  return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
}

function semverLess(a, b) {
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] < b[i];
  }
  return false;
}

/** Every value given to `rule` in argv (`-c v`, `-cv`, `--config v`, `--config=v`), until `--`. */
function ruleHits(args, rule) {
  const names = [rule.flag, ...(rule.aliases || [])];
  const takesValue = rule.takesValue !== false;
  const hits = [];
  for (let i = 0; i < args.length; i++) {
    const arg = String(args[i]);
    if (arg === "--") break;
    for (const name of names) {
      if (arg === name) {
        hits.push({ flag: name, value: takesValue ? args[i + 1] : undefined });
      } else if (takesValue && name.startsWith("--") && arg.startsWith(`${name}=`)) {
        hits.push({ flag: name, value: arg.slice(name.length + 1) });
      } else if (takesValue && /^-[A-Za-z]$/.test(name) && arg.startsWith(name)) {
        hits.push({ flag: name, value: arg.slice(name.length) });
      }
    }
  }
  return hits;
}

/** Defense in depth: core enforces the same rules before plan(). */
function assertPassthrough(args) {
  for (const rule of PASSTHROUGH) {
    for (const hit of ruleHits(args, rule)) {
      const value = hit.value === undefined ? undefined : String(hit.value).trimStart();
      if (rule.valuePrefixes && !rule.valuePrefixes.some((p) => value?.startsWith(p))) continue;
      const shown = value === undefined ? hit.flag : `${hit.flag} ${value}`;
      throw new LaunchError(
        "ConfigConflict",
        `Codex option \`${shown}\` conflicts: ${rule.message}`
      );
    }
  }
}

/**
 * Split user args into their `-c` / `--config` values and everything else (until `--`).
 *
 * Codex declares `-c` as a clap global arg: a `-c` given after a subcommand (`exec -c k=v`)
 * REPLACES every root-level `-c`, so the launcher provider flags would silently vanish and the
 * request would go to api.openai.com (reproduced live with codex-cli 0.115.0; the same
 * `global = true` + prepend code is in Codex commit 69231e1). Hoisting the user's `-c`
 * values to the root, after ours, keeps both: later root `-c` wins, so user keys still apply.
 */
function splitConfigArgs(args) {
  const config = [];
  const rest = [];
  for (let i = 0; i < args.length; i++) {
    const arg = String(args[i]);
    if (arg === "--") {
      rest.push(...args.slice(i));
      break;
    }
    if ((arg === "-c" || arg === "--config") && i + 1 < args.length) {
      config.push(String(args[++i]));
    } else if (arg.startsWith("--config=")) {
      config.push(arg.slice("--config=".length));
    } else if (arg.startsWith("-c") && arg.length > 2) {
      config.push(arg.slice(2));
    } else {
      rest.push(arg);
    }
  }
  return { config, rest };
}

function knownContext(row) {
  const value = row?.contextTokens;
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : undefined;
}

/** One `model_catalog_json` entry (ModelInfo in protocol/openai_models.rs). */
function catalogEntry(row, index, baseInstructionsToken) {
  const context = knownContext(row);
  const reasoning = row.capabilities.includes("reasoning");
  const entry = {
    slug: row.id,
    display_name: rowLabel(row),
    description: context
      ? `${row.id} via OmniRoute, ${Math.round(context / 1000)}k context`
      : `${row.id} via OmniRoute`,
    supported_reasoning_levels: reasoning ? REASONING_LEVELS : [],
    shell_type: "default",
    visibility: "list",
    supported_in_api: true,
    priority: index,
    support_verbosity: false,
    truncation_policy: { mode: "bytes", limit: 10000 },
    experimental_supported_tools: [],
    context_window: context ?? FALLBACK_CONTEXT_WINDOW,
    input_modalities: row.capabilities.includes("vision") ? ["text", "image"] : ["text"],
    base_instructions: baseInstructionsToken,
    // Ignored by current Codex (not in ModelInfo, unknown keys allowed) but required fields of
    // older catalog schemas; ollama writes both.
    supports_reasoning_summaries: reasoning,
    supports_parallel_tool_calls: false,
  };
  if (context) entry.max_context_window = context;
  if (reasoning) entry.default_reasoning_level = "medium";
  else entry.supports_reasoning_summary_parameter = false;
  return entry;
}

function catalogContents(ctx, rows) {
  const token = assetRef(BASE_INSTRUCTIONS_ASSET, { json: true });
  const models = rows.map((row, index) => catalogEntry(row, index, token));
  // json() quotes the token like any string; the :json token inserts its own quotes.
  return `${ctx.util.json({ models }, { indent: 2 }).split(JSON.stringify(token)).join(token)}\n`;
}

/**
 * `-c model_catalog_json=<path>`. POSIX: a TOML basic string. win32: the raw path, because
 * ${STATE} expands to backslashes that a TOML basic string would read as escapes; Codex parses
 * an invalid TOML value as a raw string (config_override.rs:21-23).
 */
function catalogArg(ctx) {
  const path = ctx.util.statePath(CATALOG_FILE);
  return ctx.platform === "win32"
    ? `${tomlKey("model_catalog_json")}=${path}`
    : ctx.util.toml("model_catalog_json", path);
}

function codexConfigPath(ctx) {
  const sep = ctx.platform === "win32" ? "\\" : "/";
  const home = ctx.baseEnv.CODEX_HOME || `${ctx.homeDir}${sep}.codex`;
  return `${home}${sep}config.toml`;
}

function versionChecks(ctx) {
  const version = parseSemver(ctx.tool.version);
  if (!version) return [];
  if (semverLess(version, parseSemver(VERSION_GATE.min))) {
    throw new LaunchError(
      "ToolVersionTooOld",
      `Codex ${ctx.tool.version} is too old; omnirouter launch needs ${VERSION_GATE.min} or newer`,
      { hint: "Upgrade with `codex update` or `npm install -g @openai/codex`" }
    );
  }
  if (semverLess(version, parseSemver(VERSION_GATE.recommended))) {
    return [
      `Codex ${ctx.tool.version} is older than ${VERSION_GATE.recommended}, the version this ` +
        "launch recipe was verified on; upgrade with `codex update` if Codex rejects a setting",
    ];
  }
  return [];
}

export default defineAdapter({
  contract: { major: 1, minor: 3 },
  id: "codex",
  binaries: ["codex"],
  capabilities: {
    protocol: "openai-responses",
    modelList: {
      strategy: "both",
      view: {
        name: "codex",
        filter: {
          protocols: ["openai-responses"],
          kinds: ["chat"],
          capabilities: ["tools"],
          minContextTokens: MIN_CONTEXT_TOKENS,
        },
        order: "preferences",
        limit: VIEW_LIMIT,
        spread: "provider",
      },
      serve: { shape: "codex" },
      injectLimit: VIEW_LIMIT,
    },
    minContextTokens: MIN_CONTEXT_TOKENS,
    model: "required",
    versionGate: VERSION_GATE,
    install: {
      commands: {
        darwin: [
          "npm install -g @openai/codex",
          "brew install --cask codex",
          "curl -fsSL https://chatgpt.com/codex/install.sh | sh",
        ],
        linux: [
          "npm install -g @openai/codex",
          "curl -fsSL https://chatgpt.com/codex/install.sh | sh",
        ],
        win32: ["npm install -g @openai/codex"],
        any: ["npm install -g @openai/codex"],
      },
      url: "https://learn.chatgpt.com/docs/codex/cli",
    },
    supportsProfile: true,
    platforms: ["darwin", "linux", "win32"],
    tier: "core",
    passthrough: PASSTHROUGH,
  },

  plan(ctx) {
    if (ctx.view.rows.length === 0) {
      throw new LaunchError("ModelNotFound", "No OmniRoute model fits Codex (the view is empty)", {
        hint: "Codex needs a Responses-capable model with tool calling; run `omniroute setup`",
      });
    }
    const model = ctx.model;
    if (!model) {
      throw new LaunchError("ModelRequired", "Codex needs a model", {
        hint: "Pass `--model <id>` (see `omnirouter models`)",
      });
    }
    const context = knownContext(model);
    if (context !== undefined && context < MIN_CONTEXT_TOKENS) {
      throw new LaunchError(
        "ModelUnsuitable",
        `${model.id} has a ${context}-token context; Codex needs at least ${MIN_CONTEXT_TOKENS}`
      );
    }
    assertPassthrough(ctx.passthroughArgs);
    const warnings = versionChecks(ctx);

    const rows = injectRows(ctx, VIEW_LIMIT);
    const notes = [
      `Codex model catalog: ${rows.length} OmniRoute model(s) in ${ctx.util.statePath(CATALOG_FILE)}`,
    ];
    if (!rows.some((row) => row.id === model.id)) {
      warnings.push(
        `${model.id} is not in the Codex view; Codex uses fallback metadata and hides it in /model`
      );
    }
    if (context === undefined) {
      warnings.push(
        `${model.id} has no known context window; Codex is told ${FALLBACK_CONTEXT_WINDOW} tokens`
      );
    }

    const t = ctx.util.toml;
    const argv = [
      "-c",
      t("model_provider", PROVIDER_ID),
      "-c",
      t(`model_providers.${PROVIDER_ID}.name`, "OmniRoute"),
      "-c",
      t(`model_providers.${PROVIDER_ID}.base_url`, ctx.util.ensureV1(ctx.gateway.rootUrl)),
      "-c",
      t(`model_providers.${PROVIDER_ID}.wire_api`, "responses"),
      "-c",
      t(`model_providers.${PROVIDER_ID}.env_key`, KEY_ENV),
      "-c",
      t(`model_providers.${PROVIDER_ID}.requires_openai_auth`, false),
      "-c",
      catalogArg(ctx),
      "-c",
      t("service_tier", "default"),
      "-c",
      t("check_for_update_on_startup", false),
      "-c",
      t("analytics.enabled", false),
      "-c",
      t("feedback.enabled", false),
      // `-c model=` instead of `-m`: root `-c` overrides reach every subcommand (exec, resume),
      // which was verified live; root `-m` is not guaranteed to.
      "-c",
      t("model", model.id),
    ];
    const user = splitConfigArgs(ctx.passthroughArgs);
    for (const value of user.config) argv.push("-c", value);
    if (user.config.length > 0) {
      notes.push("Your -c options are passed at the Codex root, after the launcher's");
    }
    if (ctx.profile) {
      argv.push("--profile", ctx.profile);
      notes.push(`Codex profile ${ctx.profile} is layered below the launcher -c overrides`);
    }
    argv.push(...user.rest);

    // Codex rejects an empty env_key value: never export an empty key.
    const token = typeof ctx.auth.token === "string" ? ctx.auth.token.trim() : "";
    const plan = createPlan("codex", {
      argv,
      env: {
        set: { [KEY_ENV]: token || ctx.auth.sentinel },
        unset: STRIPPED_ENV_KEYS,
      },
      tempFiles: [
        {
          path: CATALOG_FILE,
          root: "state",
          contents: catalogContents(ctx, rows),
          mode: 0o600,
          format: "json",
        },
      ],
      notes,
      warnings,
      preflight: [
        {
          kind: "tool-version",
          min: VERSION_GATE.min,
          why: "Codex below 0.134.0 is untested with the -c provider and model_catalog_json recipe",
        },
      ],
      postExitChecks: [
        {
          kind: "file-unchanged",
          path: codexConfigPath(ctx),
          message:
            "Codex changed its config.toml during the session (project trust or a /model " +
            "choice); OmniRoute did not edit it. Check that its model setting still suits " +
            "plain `codex`",
        },
      ],
      modelList: { strategy: "both", viewHash: ctx.view.hash, injected: rows.length },
    });
    plan.secretSites = findTokenSites(plan);
    return plan;
  },
});
