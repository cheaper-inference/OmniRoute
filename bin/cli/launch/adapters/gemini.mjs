// bin/cli/launch/adapters/gemini.mjs: Gemini CLI launch adapter (tools/gemini.md, architecture section 14).
import {
  LaunchError,
  createPlan,
  defineAdapter,
  findFlag,
  findTokenSites,
  stripTrailingSlash,
} from "../contract.mjs";

const VERSION_GATE = { args: ["--version"], min: "0.25.0", recommended: "0.68.0" };
const UPGRADE_HINT = "npm install -g @google/gemini-cli@latest";
const PLATFORMS = ["darwin", "linux", "win32"];

// Auxiliary model aliases the CLI hard-codes to gemini-* ids (dossier section 4).
// UNVERIFIED: the exact alias keys come from the dossier, not from a live run of every one.
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

function parseSemver(text) {
  const m = /(\d+)\.(\d+)\.(\d+)/.exec(String(text ?? "").trim());
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}

function compareSemver(a, b) {
  for (let i = 0; i < 3; i += 1) if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1;
  return 0;
}

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
    if (!PLATFORMS.includes(ctx.platform)) {
      throw new LaunchError(
        "UnsupportedPlatform",
        `Gemini CLI launch is not supported on ${ctx.platform}`
      );
    }
    const warnings = [];
    const notes = [];

    const have = parseSemver(ctx.tool.version);
    if (have) {
      if (compareSemver(have, parseSemver(VERSION_GATE.min)) < 0) {
        throw new LaunchError(
          "ToolVersionTooOld",
          `Gemini CLI ${ctx.tool.version} is older than ${VERSION_GATE.min} (needs GEMINI_CLI_HOME support)`,
          { hint: UPGRADE_HINT }
        );
      }
      if (compareSemver(have, parseSemver(VERSION_GATE.recommended)) < 0) {
        warnings.push(
          `Gemini CLI ${ctx.tool.version} is older than the tested ${VERSION_GATE.recommended}; upgrade with: ${UPGRADE_HINT}`
        );
      }
    }

    if (ctx.view.rows.length === 0) {
      throw new LaunchError("ModelNotFound", "No OmniRoute model matches the gemini view", {
        hint: "Connect a provider with tool-calling chat models, then retry",
      });
    }
    if (!ctx.model) {
      throw new LaunchError("ModelRequired", "Gemini CLI needs a model", {
        hint: "use omnirouter launch gemini --model <id>",
      });
    }

    for (const rule of PASSTHROUGH) {
      const names = [rule.flag, ...(rule.aliases || [])];
      if (!findFlag(ctx.passthroughArgs, names, { takesValue: rule.takesValue })) continue;
      if (rule.action === "reject") {
        throw new LaunchError("ConfigConflict", rule.message, {
          hint: "use omnirouter launch gemini --model <id>",
        });
      }
      if (rule.action === "warn") warnings.push(rule.message);
    }

    const model = ctx.model;
    const sep = ctx.platform === "win32" ? "\\" : "/";
    const userHome = ctx.baseEnv.GEMINI_CLI_HOME || ctx.homeDir;
    const userGeminiDir = `${userHome}${sep}.gemini`;

    const ours = {
      security: { auth: { selectedType: "gemini-api-key" } },
      privacy: { usageStatisticsEnabled: false },
      general: { enableAutoUpdate: false, enableAutoUpdateNotification: false },
      ide: { hasSeenNudge: true },
    };
    if (typeof model.contextTokens === "number" && model.contextTokens > 0) {
      const threshold = Math.max(0.05, (0.5 * model.contextTokens) / 1048576);
      ours.model = { compressionThreshold: Math.round(threshold * 1000) / 1000 };
    } else {
      notes.push(
        "Model context size is unknown: Gemini CLI keeps its default compression threshold (assumes 1M tokens)"
      );
    }
    const customAliases = {};
    for (const alias of AUX_ALIASES) {
      customAliases[alias] = { extends: "base", modelConfig: { model: model.id } };
    }
    ours.modelConfigs = { customAliases };
    ours.agents = {
      overrides: { codebase_investigator: { modelConfig: { model: model.id } } },
    };
    if (!isGeminiModel(model.id)) {
      ours.tools = { exclude: ["google_web_search", "web_fetch"] };
      notes.push("Non-Gemini model: google_web_search and web_fetch tools are disabled");
    }
    notes.push(
      "Folder trust stays on: an untrusted folder will prompt (or fail headless); trust it in Gemini CLI first"
    );

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

    const unset = [
      "CODE_ASSIST_ENDPOINT",
      "GEMINI_CLI_AUTH_OVERRIDE",
      "GEMINI_DEFAULT_AUTH_TYPE",
      "GEMINI_MODEL",
      "GOOGLE_API_KEY",
      "GOOGLE_GENAI_API_VERSION",
      "GOOGLE_GENAI_USE_GCA",
      "GOOGLE_GENAI_USE_VERTEXAI",
      "GOOGLE_VERTEX_BASE_URL",
    ]
      .filter((key) => !(key in set))
      .sort();

    const plan = createPlan("gemini", {
      argv: ["-m", model.id, ...ctx.passthroughArgs],
      env: { set, unset },
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
