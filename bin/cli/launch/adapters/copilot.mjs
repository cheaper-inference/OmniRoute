// bin/cli/launch/adapters/copilot.mjs: GitHub Copilot CLI launch adapter (tools/copilot.md,
// architecture section 14). Env-only and fully ephemeral: one model via COPILOT_PROVIDER_*.
import {
  LaunchError,
  createPlan,
  defineAdapter,
  ensureV1,
  findFlag,
  findTokenSites,
} from "../contract.mjs";

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

function parseSemver(text) {
  const match = /(\d+)\.(\d+)\.(\d+)/.exec(String(text ?? "").trim());
  return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
}

function compareSemver(a, b) {
  for (let i = 0; i < 3; i += 1) if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1;
  return 0;
}

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
    if (!PLATFORMS.includes(ctx.platform)) {
      throw new LaunchError("UnsupportedPlatform", `Copilot CLI does not support ${ctx.platform}`);
    }

    const warnings = [];
    const current = parseSemver(ctx.tool.version);
    const min = parseSemver(MIN_VERSION);
    if (current && min && compareSemver(current, min) < 0) {
      throw new LaunchError(
        "ToolVersionTooOld",
        `Copilot CLI ${ctx.tool.version} is older than ${MIN_VERSION}; a saved providers.json could override the launch env.`,
        { hint: UPGRADE_HINT }
      );
    }

    if (ctx.view.rows.length === 0) {
      throw new LaunchError("ModelNotFound", "No OmniRoute model matches the copilot view.", {
        hint: "Connect a provider with a tool-calling chat model, then retry.",
      });
    }
    const model = ctx.model;
    if (!model) {
      throw new LaunchError("ModelRequired", "Copilot CLI needs a model.", {
        hint: "use omnirouter launch copilot --model <id>",
      });
    }

    for (const rule of PASSTHROUGH) {
      if (findFlag(ctx.passthroughArgs, rule.flag, { takesValue: true })) {
        throw new LaunchError("ConfigConflict", `${rule.flag}: ${rule.message}`, {
          hint: rule.message,
        });
      }
    }

    const notes = [];
    const context = knownContext(model);
    warnings.push(...modelWarnings(model));

    const set = {
      COPILOT_PROVIDER_BASE_URL: ensureV1(ctx.gateway.rootUrl),
      COPILOT_PROVIDER_TYPE: "openai",
      COPILOT_PROVIDER_WIRE_API: "completions",
      COPILOT_PROVIDER_API_KEY: ctx.auth.token,
      COPILOT_MODEL: model.id,
      COPILOT_OFFLINE: "true",
      COPILOT_AUTO_UPDATE: "false",
    };
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

    const unset = new Set(ALWAYS_UNSET);
    for (const key of Object.keys(ctx.baseEnv).sort()) {
      if (key.startsWith("COPILOT_PROVIDER_") && !(key in set)) unset.add(key);
    }
    for (const key of unset) if (key in set) unset.delete(key);

    const plan = createPlan("copilot", {
      argv: ["--model", model.id, ...ctx.passthroughArgs],
      env: { set, unset: [...unset].sort() },
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
