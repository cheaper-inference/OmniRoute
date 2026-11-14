// bin/cli/launch/adapters/copilot.mjs: GitHub Copilot CLI launch adapter. Env-only and fully ephemeral: one model via COPILOT_PROVIDER_*.
import {
  LaunchError,
  createPlan,
  defineAdapter,
  ensureV1,
  findFlag,
  findTokenSites,
} from "../contract.mjs";
import { requireLaunchModel } from "./_shared/gemini-preflight.mjs";

const MIN_VERSION = "1.0.109";
const RECOMMENDED_CONTEXT = 128000;
const UPGRADE_HINT = "copilot update  (or: npm install -g @github/copilot@latest)";

const VERSION_GATE = { args: ["--version"], min: MIN_VERSION };

const PLATFORMS = ["darwin", "linux", "win32"];

const PASSTHROUGH = [
  {
    flag: "--model",
    action: "reject",
    message: "use omnirouter launch copilot --model <id>",
  },
];

// Always cleared: each one would override or shadow the env we set.
const ALWAYS_UNSET = [
  "COPILOT_PROVIDERS_CONFIG",
  "COPILOT_PROVIDER_BEARER_TOKEN",
  "COPILOT_PROVIDER_API_KEY_COMMAND",
  "COPILOT_PROVIDER_MODEL_ID",
  "COPILOT_PROVIDER_WIRE_MODEL",
  "COPILOT_PROVIDER_TRANSPORT",
];

function knownContext(row) {
  const value = row && row.contextTokens;
  return typeof value === "number" && value > 0 ? value : null;
}

function modelWarnings(model) {
  const context = knownContext(model);
  if (context !== null && context < RECOMMENDED_CONTEXT) {
    return [`Copilot recommends 128k context; ${model.id} has ${context}`];
  }
  return [];
}

function preflightSpec(ctx) {
  return {
    platforms: PLATFORMS,
    platformMessage: `Copilot CLI does not support ${ctx.platform}`,
    gate: VERSION_GATE,
    tooOld: `Copilot CLI ${ctx.tool.version} is older than ${MIN_VERSION}; a saved providers.json could override the launch env.`,
    tooOldHint: UPGRADE_HINT,
    noRows: "No OmniRoute model matches the copilot view.",
    noRowsHint: "Connect a provider with a tool-calling chat model, then retry.",
    noModel: "Copilot CLI needs a model.",
    noModelHint: "use omnirouter launch copilot --model <id>",
  };
}

function rejectPassthrough(args) {
  for (const rule of PASSTHROUGH) {
    if (findFlag(args, rule.flag, { takesValue: true })) {
      throw new LaunchError("ConfigConflict", `${rule.flag}: ${rule.message}`, {
        hint: rule.message,
      });
    }
  }
}

/** COPILOT_PROVIDER_* env for the chosen model; notes an unknown context window. */
function providerEnv(ctx, model, notes) {
  const set = {
    COPILOT_PROVIDER_BASE_URL: ensureV1(ctx.gateway.rootUrl),
    COPILOT_PROVIDER_TYPE: "openai",
    COPILOT_PROVIDER_WIRE_API: "completions",
    COPILOT_PROVIDER_API_KEY: ctx.auth.token,
    COPILOT_MODEL: model.id,
    COPILOT_OFFLINE: "true",
    COPILOT_AUTO_UPDATE: "false",
  };
  const context = knownContext(model);
  if (context !== null) {
    set.COPILOT_PROVIDER_MAX_PROMPT_TOKENS = String(context);
  } else {
    notes.push(
      `${model.id} has no known context window; Copilot assumes ${RECOMMENDED_CONTEXT} prompt tokens.`
    );
  }
  if (typeof model.maxOutputTokens === "number" && model.maxOutputTokens > 0) {
    set.COPILOT_PROVIDER_MAX_OUTPUT_TOKENS = String(model.maxOutputTokens);
  }
  return set;
}

/** ALWAYS_UNSET plus stray COPILOT_PROVIDER_* keys from baseEnv, minus what we set, sorted. */
function unsetKeys(baseEnv, set) {
  const unset = new Set(ALWAYS_UNSET);
  for (const key of Object.keys(baseEnv).sort()) {
    if (key.startsWith("COPILOT_PROVIDER_") && !(key in set)) unset.add(key);
  }
  for (const key of unset) if (key in set) unset.delete(key);
  return [...unset].sort();
}

export default defineAdapter({
  contract: { major: 1, minor: 1 },
  id: "copilot",
  displayName: "GitHub Copilot CLI",
  binaries: ["copilot"],
  capabilities: {
    protocol: "openai-chat",
    tier: "supported",
    model: "required",
    versionGate: VERSION_GATE,
    modelList: {
      strategy: "inject",
      view: {
        name: "copilot",
        filter: { protocols: ["openai-chat"], kinds: ["chat"], capabilities: ["tools"] },
        order: "preferences",
      },
    },
    install: {
      commands: {
        any: ["npm install -g @github/copilot"],
        darwin: ["brew install --cask copilot-cli"],
        linux: ["curl -fsSL https://gh.io/copilot-install | bash"],
        win32: ["winget install GitHub.Copilot"],
      },
      url: "https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli",
    },
    supportsProfile: false,
    platforms: PLATFORMS,
    passthrough: PASSTHROUGH,
  },
  modelWarnings(model) {
    return modelWarnings(model);
  },
  plan(ctx) {
    const warnings = [];
    const model = requireLaunchModel(ctx, preflightSpec(ctx), warnings);
    rejectPassthrough(ctx.passthroughArgs);

    const notes = [];
    warnings.push(...modelWarnings(model));
    const set = providerEnv(ctx, model, notes);

    const plan = createPlan("copilot", {
      argv: ["--model", model.id, ...ctx.passthroughArgs],
      env: { set, unset: unsetKeys(ctx.baseEnv, set) },
      notes,
      warnings,
      preflight: [
        {
          kind: "env-absent",
          key: "COPILOT_PROVIDERS_CONFIG",
          severity: "error",
          why: "a providers.json named by COPILOT_PROVIDERS_CONFIG overrides the launch env (unset by the plan)",
        },
      ],
      modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: 1 },
    });
    plan.secretSites = findTokenSites(plan);
    return plan;
  },
});
