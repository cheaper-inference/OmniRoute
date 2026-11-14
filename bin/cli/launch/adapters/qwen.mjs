// bin/cli/launch/adapters/qwen.mjs: Qwen Code launch adapter. PURE: data in, plan out.
//
// Recipe: a launcher-owned system settings file (QWEN_CODE_SYSTEM_SETTINGS_PATH, the highest
// file layer) declares one modelProviders.openai entry per view row, so a user entry with the
// same id cannot hijack the base URL. The key travels by env only (OMNIROUTE_API_KEY, never
// empty). Nothing is written under the user's HOME by the launcher.
//
// Deviations / open items:
// - tier "core".
// - versionGate: recommended only (0.27.0). No verified hard minimum for
//   QWEN_CODE_SYSTEM_SETTINGS_PATH, so there is no ToolVersionTooOld path.
// - No minContextTokens: none is known (unknown windows default to 200000 in qwen).
// - QWEN_HOME is left alone (do not isolate by default; an --isolated mode is future
//   work). run.mjs drops QWEN_HOME; this adapter keeps the user's value on purpose.
// - qwen still writes ~/.qwen (settings migration, projects, memories); no postExitCheck is
//   specified, so only a note is emitted.
// - Folder trust override from the system file, interactive TUI first run, and the Anthropic /
//   Gemini routes are UNVERIFIED; the OpenAI Chat route ships.
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
import { assertViewRows } from "./_shared/gemini-preflight.mjs";
import {
  applyQwenVersionGate,
  assertMinContext,
  warnUnknownContext,
} from "./_shared/qwen-gates.mjs";

const SETTINGS_FILE = "qwen-system-settings.json";
const KEY_ENV = "OMNIROUTE_API_KEY";
const RECOMMENDED = "0.27.0";
const MODEL_FLAGS = ["--model", "-m"];
const AUTH_FLAG = "--auth-type";

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

function assertModelChoice(ctx, userModel) {
  if (!ctx.model && !userModel) {
    throw new LaunchError("ModelRequired", "Qwen Code requires a model.", {
      hint: "Pass --model <id> (omnirouter launch qwen --model <id>).",
    });
  }
}

function qwenSettings(ctx, rows) {
  const baseUrl = ensureV1(ctx.gateway.rootUrl);
  const settings = {
    general: { enableAutoUpdate: false },
    memory: { enableManagedAutoMemory: false },
    privacy: { usageStatisticsEnabled: false },
    security: { auth: { selectedType: "openai" } },
    modelProviders: { openai: rows.map((row) => providerEntry(row, baseUrl)) },
  };
  if (ctx.model) settings.model = { name: ctx.model.id };
  return settings;
}

function warnUserAuth(args, warnings) {
  const userAuth = findFlag(args, [AUTH_FLAG]);
  if (userAuth && userAuth.value !== "openai") {
    warnings.push(
      `--auth-type ${userAuth.value ?? ""} was passed by the user and may bypass the OmniRoute gateway.`
    );
  }
}

/** Our --auth-type and --model unless the user passed them, then the user's args. */
function qwenArgv(ctx, args, userModel) {
  const argv = [];
  if (!hasFlag(args, [AUTH_FLAG])) argv.push(AUTH_FLAG, "openai");
  if (!userModel && ctx.model) argv.push("--model", ctx.model.id);
  argv.push(...args);
  return argv;
}

export default defineAdapter({
  contract: { major: 1, minor: 1 },
  id: "qwen",
  displayName: "Qwen Code",
  binaries: ["qwen"],
  capabilities: CAPABILITIES,

  plan(ctx) {
    const args = ctx.passthroughArgs;
    const userModel = findFlag(args, MODEL_FLAGS);
    assertViewRows(
      ctx,
      "No models available for Qwen Code.",
      "Qwen Code needs OpenAI chat models with tool calling; connect a provider or relax the view."
    );
    assertModelChoice(ctx, userModel);
    assertMinContext(ctx.model, CAPABILITIES.minContextTokens);

    const warnings = [];
    applyQwenVersionGate(ctx.tool.version, CAPABILITIES.versionGate, warnings);
    const rows = injectRows(ctx, CAPABILITIES.modelList.injectLimit);
    const settings = qwenSettings(ctx, rows);
    warnUnknownContext(ctx.model, warnings);
    warnUserAuth(args, warnings);
    const argv = qwenArgv(ctx, args, userModel);

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
