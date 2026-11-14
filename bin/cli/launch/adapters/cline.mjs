// Launch adapter for Cline CLI 3.x (`omnirouter launch cline`).
// Recipe: ephemeral injection via CLINE_SANDBOX + temp data dir.

import {
  LaunchError,
  PLACEHOLDERS,
  createPlan,
  defineAdapter,
  ensureV1,
  findTokenSites,
  injectRows,
} from "../contract.mjs";

const MIN_VERSION = "3.0.67";
const PROVIDER_ID = "omniroute";
// 128k context / 16k output when the catalog does not know the limits.
const DEFAULT_CONTEXT = 128000;
const DEFAULT_MAX_TOKENS = 16384;
// plan() must be pure, so the ISO timestamp Cline's schema requires is a fixed value.
const UPDATED_AT = "1970-01-01T00:00:00.000Z";

function parseSemver(value) {
  const match = /^(\d+)\.(\d+)\.(\d+)/.exec(String(value ?? ""));
  return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
}

/** True when `version` is a parseable semver strictly below `min`. */
function isBelow(version, min) {
  const a = parseSemver(version);
  const b = parseSemver(min);
  if (!a || !b) return false;
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] < b[i];
  }
  return false;
}

function realHomePath(ctx, ...parts) {
  const sep = ctx.platform === "win32" ? "\\" : "/";
  return [ctx.homeDir, ".cline", "data", "settings", ...parts].join(sep);
}

export default defineAdapter({
  contract: { major: 1, minor: 1 },
  id: "cline",
  displayName: "Cline",
  binaries: ["cline"],
  capabilities: {
    protocol: "openai-chat",
    modelList: {
      strategy: "inject",
      view: {
        name: "cline",
        filter: { protocols: ["openai-chat"], capabilities: ["tools"] },
        order: "preferences",
      },
    },
    model: "optional",
    versionGate: { args: ["--version"], min: MIN_VERSION },
    install: {
      commands: { any: ["npm install -g cline"] },
      url: "https://docs.cline.bot/getting-started/installing-cline",
    },
    supportsProfile: false,
    platforms: ["darwin", "linux", "win32"],
    tier: "core",
    passthrough: [
      { flag: "-P", action: "owned", message: "the launcher selects the omniroute provider" },
      { flag: "-m", action: "owned", message: "use the launcher --model option instead" },
      {
        flag: "-k",
        action: "reject",
        message: "-k would put the key in argv and persist it; the launcher injects the key",
      },
      {
        flag: "--data-dir",
        action: "reject",
        message: "--data-dir would break the launcher's isolated data dir",
      },
      {
        flag: "--config",
        action: "reject",
        message: "--config would break the launcher's isolated settings",
      },
      {
        flag: "-z",
        aliases: ["--zen"],
        takesValue: false,
        action: "reject",
        message: "Cline zen mode fails under the sandbox the launcher uses",
      },
      {
        flag: "--acp",
        takesValue: false,
        action: "warn",
        message: "--acp picks its provider from CLINE_PROVIDER / CLINE_API_KEY (unverified)",
      },
    ],
  },

  plan(ctx) {
    const warnings = [];
    const version = ctx.tool.version;
    if (version !== undefined && isBelow(version, MIN_VERSION)) {
      throw new LaunchError(
        "ToolVersionTooOld",
        `Cline ${version} is older than ${MIN_VERSION}; custom providers fail at run time there.`,
        { hint: "Update with: npm install -g cline" }
      );
    }

    const rows = injectRows(ctx, this.capabilities.modelList.injectLimit);
    if (rows.length === 0) {
      throw new LaunchError("ModelNotFound", "No models are available for Cline in this view.", {
        hint: "Check the gateway providers, or widen the model view.",
      });
    }
    const modelId = ctx.model?.id ?? rows[0].id;
    const baseUrl = ensureV1(ctx.gateway.rootUrl);

    const models = {};
    for (const row of rows) {
      models[row.id] = {
        id: row.id,
        name: row.label ?? row.id,
        contextWindow: row.contextTokens ?? DEFAULT_CONTEXT,
        maxTokens: row.maxOutputTokens ?? DEFAULT_MAX_TOKENS,
      };
    }

    const providersJson = {
      version: 1,
      lastUsedProvider: PROVIDER_ID,
      modes: {},
      providers: {
        [PROVIDER_ID]: {
          settings: {
            provider: PROVIDER_ID,
            model: modelId,
            baseUrl,
            apiKey: ctx.auth.token,
          },
          updatedAt: UPDATED_AT,
          tokenSource: "manual",
        },
      },
    };
    const modelsJson = {
      version: 1,
      providers: {
        [PROVIDER_ID]: {
          provider: {
            name: "OmniRoute",
            baseUrl,
            defaultModelId: modelId,
            protocol: "openai-chat",
            modelsSourceUrl: `${baseUrl}/models`,
          },
          models,
        },
      },
    };
    const globalSettings = { telemetryOptOut: true, autoUpdateEnabled: false };

    const plan = createPlan("cline", {
      argv: ["-P", PROVIDER_ID, "-m", modelId, ...ctx.passthroughArgs],
      env: {
        set: {
          CLINE_SANDBOX: "1",
          CLINE_SANDBOX_DATA_DIR: PLACEHOLDERS.TMP,
          CLINE_DATA_DIR: PLACEHOLDERS.TMP,
          CLINE_NO_AUTO_UPDATE: "1",
          CLINE_DISABLE_CLINE_PASS_NOTICE: "1",
          NO_UPDATE_NOTIFIER: "1",
        },
        unset: ["CLINE_FORCE_ONBOARDING"],
      },
      tempFiles: [
        {
          path: "settings/providers.json",
          contents: ctx.util.json(providersJson, { indent: 2 }),
          mode: 0o600,
          format: "json",
        },
        {
          path: "settings/models.json",
          contents: ctx.util.json(modelsJson, { indent: 2 }),
          mode: 0o600,
          format: "json",
        },
        {
          path: "settings/global-settings.json",
          contents: ctx.util.json(globalSettings, { indent: 2 }),
          mode: 0o600,
          format: "json",
        },
      ],
      notes: [
        "Cline runs in sandbox mode: task history, MCP servers and global settings are not kept.",
        "Rules, skills, hooks and workflows under ~/.cline still load (CLINE_DIR is left unset).",
      ],
      warnings,
      preflight: [
        {
          kind: "tool-version",
          min: MIN_VERSION,
          why: "Cline before 3.0.67 cannot use custom providers from providers.json / models.json",
        },
        {
          kind: "env-equals",
          key: "CLINE_SANDBOX",
          value: "1",
          why: "never touch ~/.cline",
        },
      ],
      postExitChecks: ["providers.json", "models.json", "global-settings.json"].map((name) => ({
        kind: "file-unchanged",
        path: realHomePath(ctx, name),
        message: `Cline changed ${name} in the real ~/.cline/data/settings; the sandbox should prevent that.`,
      })),
      modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: rows.length },
    });
    plan.secretSites = findTokenSites(plan);
    return plan;
  },
});
