// bin/cli/launch/adapters/gemini.mjs: Gemini CLI launch adapter.
import {
  LaunchError,
  createPlan,
  defineAdapter,
  findFlag,
  findTokenSites,
  stripTrailingSlash,
} from "../contract.mjs";
import { requireLaunchModel } from "./_shared/gemini-preflight.mjs";

const VERSION_GATE = { args: ["--version"], min: "0.25.0", recommended: "0.68.0" };
const UPGRADE_HINT = "npm install -g @google/gemini-cli@latest";
const PLATFORMS = ["darwin", "linux", "win32"];
const MODEL_HINT = "use omnirouter launch gemini --model <id>";

// Auxiliary model aliases the CLI hard-codes to gemini-* ids.
// UNVERIFIED: the exact alias keys were not confirmed by a live run of every one.
const AUX_ALIASES = [
  "classifier",
  "prompt-completion",
  "fast-ack-helper",
  "edit-corrector",
  "summarizer-default",
  "summarizer-shell",
  "web-search",
  "web-fetch",
  "web-fetch-fallback",
  "loop-detection",
  "loop-detection-double-check",
  "llm-edit-fixer",
  "next-speaker-checker",
  "context-snapshotter",
  "chat-compression-default",
];

const PASSTHROUGH = [
  {
    flag: "--acp",
    takesValue: false,
    action: "reject",
    message:
      "gemini --acp is a different mode (agent protocol server); launch the plain CLI instead",
  },
  {
    flag: "--experimental-acp",
    takesValue: false,
    action: "reject",
    message:
      "gemini --experimental-acp is a different mode (agent protocol server); launch the plain CLI instead",
  },
  {
    flag: "--sandbox",
    aliases: ["-s"],
    takesValue: false,
    action: "warn",
    message:
      "gemini --sandbox does not forward GOOGLE_GENAI_API_VERSION into the sandbox (gemini-cli issue #24828)",
  },
];

function isGeminiModel(id) {
  return String(id)
    .split("/")
    .some((segment) => segment.startsWith("gemini-"));
}

function noProxy(existing) {
  const entries = ["127.0.0.1", "localhost"];
  for (const part of String(existing || "").split(",")) {
    const entry = part.trim();
    if (entry && !entries.includes(entry)) entries.push(entry);
  }
  return entries.join(",");
}

const UNSET_KEYS = [
  "CODE_ASSIST_ENDPOINT",
  "GEMINI_CLI_AUTH_OVERRIDE",
  "GEMINI_DEFAULT_AUTH_TYPE",
  "GEMINI_MODEL",
  "GOOGLE_API_KEY",
  "GOOGLE_GENAI_API_VERSION",
  "GOOGLE_GENAI_USE_GCA",
  "GOOGLE_GENAI_USE_VERTEXAI",
  "GOOGLE_VERTEX_BASE_URL",
];

function preflightSpec(ctx) {
  const version = ctx.tool.version;
  return {
    platforms: PLATFORMS,
    platformMessage: `Gemini CLI launch is not supported on ${ctx.platform}`,
    gate: VERSION_GATE,
    tooOld: `Gemini CLI ${version} is older than ${VERSION_GATE.min} (needs GEMINI_CLI_HOME support)`,
    tooOldHint: UPGRADE_HINT,
    behind: `Gemini CLI ${version} is older than the tested ${VERSION_GATE.recommended}; upgrade with: ${UPGRADE_HINT}`,
    noRows: "No OmniRoute model matches the gemini view",
    noRowsHint: "Connect a provider with tool-calling chat models, then retry",
    noModel: "Gemini CLI needs a model",
    noModelHint: MODEL_HINT,
  };
}

/** Throw on a rejected passthrough flag, collect the warnings of the warn rules. */
function checkPassthrough(args, warnings) {
  for (const rule of PASSTHROUGH) {
    const names = [rule.flag, ...(rule.aliases || [])];
    if (!findFlag(args, names, { takesValue: rule.takesValue })) continue;
    if (rule.action === "reject") {
      throw new LaunchError("ConfigConflict", rule.message, { hint: MODEL_HINT });
    }
    if (rule.action === "warn") warnings.push(rule.message);
  }
}

/** Compression threshold for a known context window (1M tokens is the CLI's assumption). */
function compressionThreshold(model) {
  if (!(typeof model.contextTokens === "number" && model.contextTokens > 0)) return null;
  const threshold = Math.max(0.05, (0.5 * model.contextTokens) / 1048576);
  return Math.round(threshold * 1000) / 1000;
}

function auxAliases(modelId) {
  const customAliases = {};
  for (const alias of AUX_ALIASES) {
    customAliases[alias] = { extends: "base", modelConfig: { model: modelId } };
  }
  return customAliases;
}

/** The launcher's settings.json overlay (merged over the user's settings.json). */
function geminiSettings(model, notes) {
  const ours = {
    security: { auth: { selectedType: "gemini-api-key" } },
    privacy: { usageStatisticsEnabled: false },
    general: { enableAutoUpdate: false, enableAutoUpdateNotification: false },
    ide: { hasSeenNudge: true },
  };
  const compression = compressionThreshold(model);
  if (compression !== null) {
    ours.model = { compressionThreshold: compression };
  } else {
    notes.push(
      "Model context size is unknown: Gemini CLI keeps its default compression threshold (assumes 1M tokens)"
    );
  }
  ours.modelConfigs = { customAliases: auxAliases(model.id) };
  ours.agents = {
    overrides: { codebase_investigator: { modelConfig: { model: model.id } } },
  };
  if (!isGeminiModel(model.id)) {
    ours.tools = { exclude: ["google_web_search", "web_fetch"] };
    notes.push("Non-Gemini model: google_web_search and web_fetch tools are disabled");
  }
  return ours;
}

/** Headless (-p/--prompt) in an untrusted cwd exits 55 without --skip-trust, so we add it. */
function skipTrustArgs(args, notes) {
  if (findFlag(args, ["-p", "--prompt"]) === null) {
    notes.push(
      "Folder trust stays on: an untrusted folder will prompt (or fail headless); trust it in Gemini CLI first"
    );
    return [];
  }
  if (findFlag(args, ["--skip-trust"], { takesValue: false })) return [];
  notes.push("Headless prompt: --skip-trust added so an untrusted folder does not exit 55");
  return ["--skip-trust"];
}

function geminiEnv(ctx, userGeminiDir, sep) {
  const set = {
    GEMINI_CLI_HOME: "${TMP}",
    GOOGLE_GEMINI_BASE_URL: stripTrailingSlash(ctx.gateway.rootUrl),
    GEMINI_API_KEY: ctx.auth.token,
    GEMINI_API_KEY_AUTH_MECHANISM: "bearer",
    NO_PROXY: noProxy(ctx.baseEnv.NO_PROXY),
  };
  if (!ctx.baseEnv.GEMINI_CLI_TRUSTED_FOLDERS_PATH) {
    set.GEMINI_CLI_TRUSTED_FOLDERS_PATH = `${userGeminiDir}${sep}trustedFolders.json`;
  }
  const unset = UNSET_KEYS.filter((key) => !(key in set)).sort();
  return { set, unset };
}

export default defineAdapter({
  contract: { major: 1, minor: 1 },
  id: "gemini",
  displayName: "Gemini CLI",
  binaries: ["gemini"],
  capabilities: {
    protocol: "gemini-native",
    tier: "supported",
    model: "required",
    versionGate: VERSION_GATE,
    modelList: {
      strategy: "inject",
      view: {
        name: "gemini",
        filter: { protocols: ["gemini-native"], kinds: ["chat"], capabilities: ["tools"] },
        order: "preferences",
      },
    },
    install: {
      commands: {
        any: ["npm install -g @google/gemini-cli"],
        darwin: ["brew install gemini-cli"],
      },
      url: "https://geminicli.com/docs/get-started/installation",
    },
    supportsProfile: false,
    platforms: PLATFORMS,
    passthrough: PASSTHROUGH,
  },
  plan(ctx) {
    const warnings = [];
    const notes = [];
    const model = requireLaunchModel(ctx, preflightSpec(ctx), warnings);
    checkPassthrough(ctx.passthroughArgs, warnings);

    const sep = ctx.platform === "win32" ? "\\" : "/";
    const userGeminiDir = `${ctx.baseEnv.GEMINI_CLI_HOME || ctx.homeDir}${sep}.gemini`;
    const ours = geminiSettings(model, notes);
    const trustArgs = skipTrustArgs(ctx.passthroughArgs, notes);

    const plan = createPlan("gemini", {
      argv: ["-m", model.id, ...trustArgs, ...ctx.passthroughArgs],
      env: geminiEnv(ctx, userGeminiDir, sep),
      tempFiles: [
        {
          path: ".gemini/settings.json",
          root: "tmp",
          contents: ctx.util.json(ours, { indent: 2 }),
          mode: 0o600,
          format: "json",
          mergeBase: { path: `${userGeminiDir}${sep}settings.json`, format: "json" },
        },
      ],
      needsTempDir: true,
      notes,
      warnings,
      modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: 1 },
    });
    plan.secretSites = findTokenSites(plan);
    return plan;
  },
});
