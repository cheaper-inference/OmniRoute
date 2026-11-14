// bin/cli/launch/adapters/goose.mjs: `omnirouter launch goose`.
//
// Env-only launch through the OpenAI Chat Completions provider. GOOSE_PATH_ROOT=${TMP} isolates
// config, sessions, logs and secrets from the user's HOME and keyring. The model list is
// server-view: goose learns models from GET /v1/models, so core PATCHes the session view and
// this adapter writes no list (injected = 0).
//
// Deviations / open items:
// - minContextTokens 32000 is our choice (no floor is documented; goose assumes 128000 when
//   the window is unknown). Rows with an unknown window stay in the view.
// - Unknown context: GOOSE_CONTEXT_LIMIT is left unset (and unset from the inherited env), so goose
//   falls back to its own resolution (canonical registry, then 128000). A warning says so.
// - Version: the minimum is 1.59.0 "until older ones are tested", used as a hard min; there
//   is no separate recommended version.
// - OPENAI_BASE_PATH=/v1/chat/completions (leading slash) is inferred from code, never run end to
//   end. Goose's `--version` output format is UNVERIFIED, the default semver
//   pattern is used.
// - Anthropic route and the declarative custom provider are not used.
// - Non-isolated mode (keeping the user's goose config) is not offered in v1.

import { LaunchError, createPlan, defineAdapter } from "../contract.mjs";
import { withTokenSites } from "./_shared/inject.mjs";
import { compareSemver, parseSemver } from "./_shared/semver.mjs";

const MIN_VERSION = "1.59.0";
const MIN_CONTEXT_TOKENS = 32000;

/** Documented non-interactive one-shot subcommands (`goose run -t TEXT`); replaces the default `session`. */
const ONE_SHOT_SUBCOMMANDS = ["run"];

/** Env that would override or leak into our routing. */
const SCRUB_KEYS = [
  "OPENAI_HOST",
  "OPENAI_ORGANIZATION",
  "OPENAI_PROJECT",
  "OPENAI_CUSTOM_HEADERS",
  "OPENAI_TIMEOUT",
  "GOOSE_MODE",
  "GOOSE_ADDITIONAL_CONFIG_FILES",
  "GOOSE_TOOLSHIM",
  "GOOSE_TOOLSHIM_OLLAMA_MODEL",
  "GOOSE_MAX_TOKENS",
  "GOOSE_CACHE_TTL",
  "GOOSE_LEAD_MODEL",
  "GOOSE_LEAD_PROVIDER",
  "GOOSE_LEAD_TURNS",
  "GOOSE_LEAD_FAILURE_THRESHOLD",
  "GOOSE_LEAD_FALLBACK_TURNS",
];
const SCRUB_PREFIXES = ["ANTHROPIC_", "GOOSE_TOOLSHIM", "GOOSE_LEAD"];

/** Model ids goose routes to /v1/responses on its own (goose openai.rs, formats/openai.rs). */
const RESPONSES_ID = /(?:^|[-/])(?:o\d+(?:$|-)|gpt-(?:5|6)(?:$|[-.]))/i;
const EFFORT_SUFFIX = /-(?:none|low|medium|high|xhigh)$/i;

/** -1 / 0 / 1, or null when either side is not a semver. */
function compareVersions(a, b) {
  const left = parseSemver(a);
  const right = parseSemver(b);
  return left && right ? compareSemver(left, right) : null;
}

/** The view must have rows and a model must be chosen. */
function requireModel(ctx) {
  const rows = ctx.view?.rows ?? [];
  if (rows.length === 0) {
    throw new LaunchError("ModelNotFound", "No models in the goose launch view.", {
      hint: "Connect a provider with tool-capable chat models (omniroute providers), then retry.",
    });
  }
  if (!ctx.model) {
    throw new LaunchError("ModelRequired", "goose needs a model to launch.", {
      hint: "Pass --model <id> or pick one from the launch picker.",
    });
  }
  return ctx.model;
}

function assertVersion(version) {
  if (!version) return;
  const cmp = compareVersions(version, MIN_VERSION);
  if (cmp !== null && cmp < 0) {
    throw new LaunchError(
      "ToolVersionTooOld",
      `goose ${version} is older than the minimum ${MIN_VERSION}.`,
      { hint: "Run `goose update` or reinstall goose, then retry." }
    );
  }
}

/** The model's positive numeric context window, else undefined. */
function knownContext(model) {
  const value = model.contextTokens;
  return typeof value === "number" && value > 0 ? value : undefined;
}

function assertContext(model, context) {
  if (context !== undefined && context < MIN_CONTEXT_TOKENS) {
    throw new LaunchError(
      "ModelUnsuitable",
      `${model.id} has a ${context} token window, below the ${MIN_CONTEXT_TOKENS} goose needs.`,
      { hint: "Choose a model with a larger context window." }
    );
  }
}

function gooseEnv(ctx, model, context) {
  const env = {
    GOOSE_PATH_ROOT: "${TMP}",
    GOOSE_DISABLE_KEYRING: "1",
    GOOSE_TELEMETRY_OFF: "1",
    GOOSE_PROVIDER: "openai",
    GOOSE_MODEL: model.id,
    OPENAI_BASE_URL: ctx.util.ensureV1(ctx.gateway.rootUrl),
    // Leading slash is deliberate: a custom path containing chat/completions turns the
    // automatic /v1/responses routing of gpt-5* and o* ids off.
    OPENAI_BASE_PATH: "/v1/chat/completions",
    OPENAI_API_KEY: ctx.auth.token,
  };
  if (context !== undefined) env.GOOSE_CONTEXT_LIMIT = String(context);
  return env;
}

function modelWarnings(model, context) {
  const warnings = [];
  if (context === undefined) {
    warnings.push(
      `Context window of ${model.id} is unknown: goose falls back to its own default (128000).`
    );
  }
  if (RESPONSES_ID.test(model.id) && EFFORT_SUFFIX.test(model.id)) {
    warnings.push(
      `goose strips a trailing reasoning suffix from ${model.id} and sends it as reasoning_effort.`
    );
  }
  return warnings;
}

/** Scrubbed keys plus inherited scrub-prefixed ones, minus what we set, sorted. */
function unsetKeys(baseEnv, env) {
  const unset = new Set(SCRUB_KEYS);
  for (const key of Object.keys(baseEnv ?? {})) {
    if (SCRUB_PREFIXES.some((prefix) => key.startsWith(prefix))) unset.add(key);
  }
  for (const key of Object.keys(env)) unset.delete(key);
  if (!("GOOSE_CONTEXT_LIMIT" in env)) unset.add("GOOSE_CONTEXT_LIMIT");
  return [...unset].sort();
}

/**
 * Always an explicit subcommand: bare `goose` without a config.yaml starts `configure`.
 * Passthrough starting with a one-shot subcommand replaces the default `session`.
 */
function gooseArgv(args) {
  return ONE_SHOT_SUBCOMMANDS.includes(args[0]) ? [...args] : ["session", ...args];
}

export default defineAdapter({
  contract: { major: 1, minor: 1 },
  id: "goose",
  displayName: "Goose",
  binaries: ["goose"],
  capabilities: {
    tier: "supported",
    protocol: "openai-chat",
    model: "required",
    modelList: {
      strategy: "server-view",
      view: {
        name: "goose",
        filter: {
          protocols: ["openai-chat"],
          capabilities: ["tools"],
          minContextTokens: MIN_CONTEXT_TOKENS,
        },
        order: "preferences",
      },
    },
    minContextTokens: MIN_CONTEXT_TOKENS,
    versionGate: { args: ["--version"], min: MIN_VERSION },
    install: {
      commands: {
        darwin: ["brew install block-goose-cli"],
        linux: [
          "curl -fsSL https://github.com/aaif-goose/goose/releases/download/stable/download_cli.sh | CONFIGURE=false bash",
        ],
        win32: [
          "Run download_cli.ps1 from https://goose-docs.ai/docs/getting-started/installation",
        ],
      },
      url: "https://goose-docs.ai/docs/getting-started/installation",
    },
    supportsProfile: false,
    platforms: ["darwin", "linux", "win32"],
    passthrough: [
      {
        flag: "--provider",
        action: "warn",
        message: "goose --provider overrides the OmniRoute provider set by the launcher.",
      },
      {
        flag: "--model",
        action: "warn",
        message: "goose --model overrides the model chosen for this launch.",
      },
    ],
  },

  plan(ctx) {
    const model = requireModel(ctx);
    assertVersion(ctx.tool?.version);
    const context = knownContext(model);
    assertContext(model, context);

    const env = gooseEnv(ctx, model, context);
    return withTokenSites(
      createPlan("goose", {
        argv: gooseArgv(ctx.passthroughArgs),
        env: { set: env, unset: unsetKeys(ctx.baseEnv, env) },
        warnings: modelWarnings(model, context),
        notes: [
          "goose runs with GOOSE_PATH_ROOT in the temp dir: your goose config, sessions and keyring are untouched.",
        ],
        modelList: { strategy: "server-view", viewHash: ctx.view.hash, injected: 0 },
      })
    );
  },
});
