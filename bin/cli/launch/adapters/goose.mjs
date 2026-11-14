// bin/cli/launch/adapters/goose.mjs: `omnirouter launch goose` (recipe: tools/goose.md).
//
// Env-only launch through the OpenAI Chat Completions provider. GOOSE_PATH_ROOT=${TMP} isolates
// config, sessions, logs and secrets from the user's HOME and keyring. The model list is
// server-view: goose learns models from GET /v1/models, so core PATCHes the session view and
// this adapter writes no list (injected = 0).
//
// Deviations / open items:
// - minContextTokens 32000 is our choice (the dossier names no floor; goose assumes 128000 when
//   the window is unknown). Rows with an unknown window stay in the view.
// - Unknown context: GOOSE_CONTEXT_LIMIT is left unset (and unset from the inherited env), so goose
//   falls back to its own resolution (canonical registry, then 128000). A warning says so.
// - Version: dossier minimum is 1.59.0 "until older ones are tested", used as a hard min; there
//   is no separate recommended version.
// - OPENAI_BASE_PATH=/v1/chat/completions (leading slash) is inferred from code, never run end to
//   end (dossier section 8). Goose's `--version` output format is UNVERIFIED, the default semver
//   pattern is used.
// - Anthropic route and the declarative custom provider are not used (dossier sections 2 and 4).
// - Non-isolated mode (keeping the user's goose config) is not offered in v1.

import { LaunchError, createPlan, defineAdapter, findTokenSites } from "../contract.mjs";

const MIN_VERSION = "1.59.0";
const MIN_CONTEXT_TOKENS = 32000;

/** Documented non-interactive one-shot subcommands (`goose run -t TEXT`); replaces the default `session`. */
const ONE_SHOT_SUBCOMMANDS = ["run"];

/** Env that would override or leak into our routing (dossier section 3, "Scrub inherited env"). */
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

function parseSemver(text) {
  const match = /(\d+)\.(\d+)\.(\d+)/.exec(String(text ?? ""));
  return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
}

/** -1 / 0 / 1, or null when either side is not a semver. */
function compareSemver(a, b) {
  const left = parseSemver(a);
  const right = parseSemver(b);
  if (!left || !right) return null;
  for (let i = 0; i < 3; i += 1) {
    if (left[i] !== right[i]) return left[i] < right[i] ? -1 : 1;
  }
  return 0;
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
    const rows = ctx.view?.rows ?? [];
    if (rows.length === 0) {
      throw new LaunchError("ModelNotFound", "No models in the goose launch view.", {
        hint: "Connect a provider with tool-capable chat models (omniroute providers), then retry.",
      });
    }
    const model = ctx.model;
    if (!model) {
      throw new LaunchError("ModelRequired", "goose needs a model to launch.", {
        hint: "Pass --model <id> or pick one from the launch picker.",
      });
    }

    const warnings = [];
    const version = ctx.tool?.version;
    if (version) {
      const cmp = compareSemver(version, MIN_VERSION);
      if (cmp !== null && cmp < 0) {
        throw new LaunchError(
          "ToolVersionTooOld",
          `goose ${version} is older than the minimum ${MIN_VERSION}.`,
          { hint: "Run `goose update` or reinstall goose, then retry." }
        );
      }
    }

    if (
      typeof model.contextTokens === "number" &&
      model.contextTokens > 0 &&
      model.contextTokens < MIN_CONTEXT_TOKENS
    ) {
      throw new LaunchError(
        "ModelUnsuitable",
        `${model.id} has a ${model.contextTokens} token window, below the ${MIN_CONTEXT_TOKENS} goose needs.`,
        { hint: "Choose a model with a larger context window." }
      );
    }

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
    if (typeof model.contextTokens === "number" && model.contextTokens > 0) {
      env.GOOSE_CONTEXT_LIMIT = String(model.contextTokens);
    } else {
      warnings.push(
        `Context window of ${model.id} is unknown: goose falls back to its own default (128000).`
      );
    }

    if (RESPONSES_ID.test(model.id) && EFFORT_SUFFIX.test(model.id)) {
      warnings.push(
        `goose strips a trailing reasoning suffix from ${model.id} and sends it as reasoning_effort.`
      );
    }

    const unset = new Set(SCRUB_KEYS);
    for (const key of Object.keys(ctx.baseEnv ?? {})) {
      if (SCRUB_PREFIXES.some((prefix) => key.startsWith(prefix))) unset.add(key);
    }
    for (const key of Object.keys(env)) unset.delete(key);
    if (!("GOOSE_CONTEXT_LIMIT" in env)) unset.add("GOOSE_CONTEXT_LIMIT");

    const plan = createPlan("goose", {
      // Always an explicit subcommand: bare `goose` without a config.yaml starts `configure`.
      // Passthrough starting with a one-shot subcommand replaces the default `session`.
      argv: ONE_SHOT_SUBCOMMANDS.includes(ctx.passthroughArgs[0])
        ? [...ctx.passthroughArgs]
        : ["session", ...ctx.passthroughArgs],
      env: { set: env, unset: [...unset].sort() },
      warnings,
      notes: [
        "goose runs with GOOSE_PATH_ROOT in the temp dir: your goose config, sessions and keyring are untouched.",
      ],
      modelList: { strategy: "server-view", viewHash: ctx.view.hash, injected: 0 },
    });
    plan.secretSites = findTokenSites(plan);
    return plan;
  },
});
