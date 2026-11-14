// bin/cli/launch/adapters/continue.mjs: Continue CLI launch adapter.
import {
  LaunchError,
  createPlan,
  defineAdapter,
  ensureV1,
  findFlag,
  findTokenSites,
} from "../contract.mjs";
import { assertPlatform, assertViewRows } from "./_shared/gemini-preflight.mjs";
import { isSemverBelow } from "./_shared/semver.mjs";

const INJECT_LIMIT = 20;
const FALLBACK_CONTEXT = 32768;
const SECRET_REF = "${{ secrets.OMNIROUTE_API_KEY }}";
const VERSION_GATE = { args: ["--version"], recommended: "1.5.0" };
const INSTALL = "npm i -g @continuedev/cli";
const PLATFORMS = ["darwin", "linux", "win32"];

const PASSTHROUGH = [
  {
    flag: "--config",
    action: "owned",
    message: "The launcher supplies the Continue config; --config is not allowed.",
  },
  {
    flag: "--model",
    action: "reject",
    message: "cn --model takes a Hub slug; use omnirouter launch continue --model <id>",
  },
  {
    flag: "--org",
    action: "warn",
    message: "--org selects a Continue Hub organization; the launched config ignores the Hub.",
  },
  {
    flag: "--agent",
    action: "warn",
    message: "--agent loads a Continue Hub agent and may replace the OmniRoute models.",
  },
];

function knownContext(row) {
  return typeof row.contextTokens === "number" && row.contextTokens > 0;
}

function checkPassthrough(args, warnings) {
  for (const rule of PASSTHROUGH) {
    if (!findFlag(args, rule.flag)) continue;
    if (rule.action === "warn") warnings.push(rule.message);
    else throw new LaunchError("ConfigConflict", rule.message);
  }
}

/** Chosen model first, the rest in view order, capped at the limit. */
function configRows(ctx) {
  if (!ctx.model) return ctx.view.rows.slice(0, INJECT_LIMIT);
  return [ctx.model, ...ctx.view.rows.filter((row) => row.id !== ctx.model.id)].slice(
    0,
    INJECT_LIMIT
  );
}

function modelEntry(row, apiBase) {
  const contextLength = knownContext(row) ? row.contextTokens : FALLBACK_CONTEXT;
  const quarter = Math.floor(contextLength / 4);
  const maxTokens =
    typeof row.maxOutputTokens === "number" && row.maxOutputTokens > 0
      ? Math.min(row.maxOutputTokens, quarter)
      : quarter;
  return {
    name: row.id,
    provider: "openai",
    model: row.id,
    apiBase,
    apiKey: SECRET_REF,
    roles: ["chat", "edit", "apply"],
    defaultCompletionOptions: { contextLength, maxTokens },
  };
}

export default defineAdapter({
  contract: { major: 1, minor: 1 },
  id: "continue",
  displayName: "Continue CLI",
  binaries: ["cn"],
  capabilities: {
    protocol: "openai-chat",
    tier: "supported",
    model: "optional",
    versionGate: VERSION_GATE,
    modelList: {
      strategy: "inject",
      view: {
        name: "continue",
        filter: { protocols: ["openai-chat"], kinds: ["chat"], capabilities: ["tools"] },
        order: "preferences",
      },
      injectLimit: INJECT_LIMIT,
    },
    install: { commands: { any: [INSTALL] }, url: "https://docs.continue.dev/cli/quickstart" },
    supportsProfile: false,
    platforms: PLATFORMS,
    passthrough: PASSTHROUGH,
  },
  plan(ctx) {
    assertPlatform(ctx, PLATFORMS, `Continue CLI does not support ${ctx.platform}.`);
    const warnings = [];
    if (isSemverBelow(ctx.tool.version, VERSION_GATE.recommended)) {
      warnings.push(
        `Continue CLI ${ctx.tool.version} is older than the tested ${VERSION_GATE.recommended}; upgrade with: ${INSTALL}`
      );
    }
    assertViewRows(
      ctx,
      "No OmniRoute model matches the continue view.",
      "Connect a provider with tool-calling chat models, then retry."
    );
    checkPassthrough(ctx.passthroughArgs, warnings);

    const rows = configRows(ctx);
    const apiBase = ensureV1(ctx.gateway.rootUrl);
    const models = rows.map((row) => modelEntry(row, apiBase));
    const config = {
      name: "OmniRoute Launch",
      version: "1.0.0",
      schema: "v1",
      models,
    };

    const notes = [];
    if (!rows.every(knownContext)) {
      notes.push(
        `Some models report no context window; used ${FALLBACK_CONTEXT} tokens for them in the Continue config.`
      );
    }

    const plan = createPlan("continue", {
      argv: ["--config", ctx.util.tempPath("config.yaml"), ...ctx.passthroughArgs],
      env: {
        set: {
          CONTINUE_GLOBAL_DIR: ctx.util.tempPath("home"),
          OMNIROUTE_API_KEY: ctx.auth.token,
          CONTINUE_METRICS_ENABLED: "0",
        },
        unset: [],
      },
      tempFiles: [
        {
          path: "config.yaml",
          root: "tmp",
          contents: ctx.util.yaml(config),
          mode: 0o600,
          format: "yaml",
        },
        {
          path: "home/index/globalContext.json",
          root: "tmp",
          contents: ctx.util.json({ autoUpdateCli: false }),
          mode: 0o600,
          format: "json",
        },
      ],
      needsTempDir: true,
      notes,
      warnings,
      preflight: [
        {
          kind: "node-version",
          range: ">=20",
          why: "Continue CLI needs Node 20+ (docs; engines says >=18)",
        },
      ],
      modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: rows.length },
    });
    plan.secretSites = findTokenSites(plan);
    return plan;
  },
});
