// bin/cli/launch/adapters/qwen.mjs: Qwen Code launch adapter (recipe: tools/qwen.md; tier and
// strategy: architecture section 14). PURE: data in, plan out.
//
// Recipe: a launcher-owned system settings file (QWEN_CODE_SYSTEM_SETTINGS_PATH, the highest
// file layer) declares one modelProviders.openai entry per view row, so a user entry with the
// same id cannot hijack the base URL. The key travels by env only (OMNIROUTE_API_KEY, never
// empty). Nothing is written under the user's HOME by the launcher.
//
// Deviations / open items:
// - tier "core" (architecture section 14); the dossier header says "supported". Section 14 wins.
// - versionGate: recommended only (0.27.0). The dossier gives no verified hard minimum for
//   QWEN_CODE_SYSTEM_SETTINGS_PATH, so there is no ToolVersionTooOld path.
// - No minContextTokens: the dossier gives none (unknown windows default to 200000 in qwen).
// - QWEN_HOME is left alone (dossier: do not isolate by default; an --isolated mode is future
//   work). run.mjs drops QWEN_HOME; this adapter keeps the user's value on purpose.
// - qwen still writes ~/.qwen (settings migration, projects, memories); no postExitCheck is
//   specified by the dossier, so only a note is emitted.
// - Folder trust override from the system file, interactive TUI first run, and the Anthropic /
//   Gemini routes are UNVERIFIED in the dossier; the OpenAI Chat route ships.
// - Rows with unknown context get no generationConfig (qwen then assumes its own default)
//   and a warning when that row is the chosen model.

import {
  LaunchError,
  createPlan,
  defineAdapter,
  ensureV1,
  findFlag,
  findTokenSites,
  hasFlag,
  injectRows,
  json,
  rowLabel,
  tempPath,
} from "../contract.mjs";

const SETTINGS_FILE = "qwen-system-settings.json";
const KEY_ENV = "OMNIROUTE_API_KEY";
const RECOMMENDED = "0.27.0";
const MODEL_FLAGS = ["--model", "-m"];
const AUTH_FLAG = "--auth-type";

/** Tiny semver compare: -1, 0, 1 on major.minor.patch (non-numeric parts count as 0). */
function compareVersions(a, b) {
  const pa = String(a).split("-")[0].split(".");
  const pb = String(b).split("-")[0].split(".");
  for (let i = 0; i < 3; i++) {
    const x = Number.parseInt(pa[i] ?? "0", 10) || 0;
    const y = Number.parseInt(pb[i] ?? "0", 10) || 0;
    if (x !== y) return x < y ? -1 : 1;
  }
  return 0;
}

function providerEntry(row, baseUrl) {
  const entry = {
    id: row.id,
    name: `${rowLabel(row)} (OmniRoute)`,
    baseUrl,
    envKey: KEY_ENV,
  };
  if (typeof row.contextTokens === "number" && row.contextTokens > 0) {
    entry.generationConfig = { contextWindowSize: row.contextTokens };
  }
  return entry;
}

const CAPABILITIES = {
  tier: "core",
  protocol: "openai-chat",
  model: "required",
  modelList: {
    strategy: "inject",
    view: {
      name: "qwen",
      filter: { protocols: ["openai-chat"], capabilities: ["tools"] },
      order: "preferences",
    },
  },
  versionGate: { args: ["--version"], recommended: RECOMMENDED },
  install: {
    commands: {
      any: ["npm install -g @qwen-code/qwen-code@latest"],
      darwin: ["brew install qwen-code"],
      linux: [
        "curl -fsSL https://qwen-code-assets.oss-cn-hangzhou.aliyuncs.com/installation/install-qwen-standalone.sh | bash",
      ],
      win32: [
        "irm https://qwen-code-assets.oss-cn-hangzhou.aliyuncs.com/installation/install-qwen-standalone.ps1 | iex",
      ],
    },
    url: "https://github.com/QwenLM/qwen-code",
  },
  supportsProfile: false,
  platforms: ["darwin", "linux", "win32"],
  passthrough: [
    {
      flag: "--openai-base-url",
      action: "warn",
      message: "--openai-base-url bypasses the OmniRoute gateway for this launch.",
    },
    {
      flag: "--openai-api-key",
      action: "warn",
      message: "--openai-api-key puts a key on the command line and bypasses the gateway key.",
    },
  ],
};

export default defineAdapter({
  contract: { major: 1, minor: 1 },
  id: "qwen",
  displayName: "Qwen Code",
  binaries: ["qwen"],
  capabilities: CAPABILITIES,

  plan(ctx) {
    const capabilities = CAPABILITIES;
    const args = ctx.passthroughArgs;
    const userModel = findFlag(args, MODEL_FLAGS);

    if (ctx.view.rows.length === 0) {
      throw new LaunchError("ModelNotFound", "No models available for Qwen Code.", {
        hint: "Qwen Code needs OpenAI chat models with tool calling; connect a provider or relax the view.",
      });
    }
    if (!ctx.model && !userModel) {
      throw new LaunchError("ModelRequired", "Qwen Code requires a model.", {
        hint: "Pass --model <id> (omnirouter launch qwen --model <id>).",
      });
    }
    const min = capabilities.minContextTokens;
    if (
      ctx.model &&
      typeof min === "number" &&
      typeof ctx.model.contextTokens === "number" &&
      ctx.model.contextTokens > 0 &&
      ctx.model.contextTokens < min
    ) {
      throw new LaunchError(
        "ModelUnsuitable",
        `${ctx.model.id} has a ${ctx.model.contextTokens} token window; Qwen Code needs at least ${min}.`,
        { hint: "Pick a model with a larger context window." }
      );
    }

    const warnings = [];
    const gate = capabilities.versionGate;
    const version = ctx.tool.version;
    if (version && gate.min && compareVersions(version, gate.min) < 0) {
      throw new LaunchError(
        "ToolVersionTooOld",
        `Qwen Code ${version} is older than the required ${gate.min}.`,
        { hint: "Upgrade with: npm install -g @qwen-code/qwen-code@latest" }
      );
    }
    if (version && gate.recommended && compareVersions(version, gate.recommended) < 0) {
      warnings.push(
        `Qwen Code ${version} is older than the recommended ${gate.recommended}; upgrade with: npm install -g @qwen-code/qwen-code@latest`
      );
    }

    const baseUrl = ensureV1(ctx.gateway.rootUrl);
    const rows = injectRows(ctx, capabilities.modelList.injectLimit);
    const settings = {
      general: { enableAutoUpdate: false },
      memory: { enableManagedAutoMemory: false },
      privacy: { usageStatisticsEnabled: false },
      security: { auth: { selectedType: "openai" } },
      modelProviders: { openai: rows.map((row) => providerEntry(row, baseUrl)) },
    };
    if (ctx.model) {
      settings.model = { name: ctx.model.id };
      if (!(typeof ctx.model.contextTokens === "number" && ctx.model.contextTokens > 0)) {
        warnings.push(
          `${ctx.model.id} has no known context window; Qwen Code assumes its default (200000 tokens).`
        );
      }
    }

    const userAuth = findFlag(args, [AUTH_FLAG]);
    if (userAuth && userAuth.value !== "openai") {
      warnings.push(
        `--auth-type ${userAuth.value ?? ""} was passed by the user and may bypass the OmniRoute gateway.`
      );
    }
    const argv = [];
    if (!hasFlag(args, [AUTH_FLAG])) argv.push(AUTH_FLAG, "openai");
    if (!userModel && ctx.model) argv.push("--model", ctx.model.id);
    argv.push(...args);

    const plan = createPlan("qwen", {
      argv,
      env: {
        set: {
          QWEN_CODE_SYSTEM_SETTINGS_PATH: tempPath(SETTINGS_FILE),
          [KEY_ENV]: ctx.auth.token,
          QWEN_USAGE_STATISTICS_ENABLED: "false",
          QWEN_CODE_MODELS_DEV_REFRESH: "off",
        },
        unset: ["OPENAI_API_KEY", "OPENAI_BASE_URL", "OPENAI_MODEL", "QWEN_MODEL"],
      },
      tempFiles: [
        {
          path: SETTINGS_FILE,
          contents: json(settings, { indent: 2 }),
          mode: 0o600,
          format: "json",
        },
      ],
      notes: [
        "Qwen Code still writes its own state under ~/.qwen (settings migration, projects, memories); the launcher does not.",
      ],
      warnings,
      modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: rows.length },
    });
    plan.secretSites = findTokenSites(plan);
    return plan;
  },
});
