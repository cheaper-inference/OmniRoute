// bin/cli/launch/adapters/kilo.mjs: Kilo Code CLI launch adapter.
//
// Dossier: /home/krrish/tmp/olaunch/tools/kilo.md (sections 1, 2, 3, 4, 7).
// Kilo is an OpenCode v1 fork: a custom provider is injected through KILO_CONFIG_CONTENT
// (kilo.md section 3, "Recipe"), identical in shape to the opencode v1 recipe plus a few
// Kilo-only env vars (daemon bypass, autoupdate, telemetry) and the $schema/enabled_providers
// fields. There is no /v1/models discovery for custom providers (kilo.md section 4), so the
// strategy is "inject" even though architecture.md section 14 left it provisional pending this
// dossier.

import {
  LaunchError,
  createPlan,
  defineAdapter,
  ensureV1,
  findFlag,
  findTokenSites,
  injectRows,
  rowLabel,
} from "../contract.mjs";

const DISPLAY_NAME = "Kilo Code CLI";
const MIN_CONTEXT_TOKENS = 32000;
const INJECT_LIMIT = 100;
const MIN_VERSION = "7.8.27";
const ATTACH_WARNING = "--attach points at another server that ignores the OmniRoute config";

const INSTALL = {
  commands: {
    any: ["npm install -g @kilocode/cli"],
    darwin: ["brew install Kilo-Org/tap/kilo"],
    linux: ["curl -fsSL https://kilo.ai/cli/install | bash"],
  },
  url: "https://kilo.ai/docs/cli",
};

// Inline, not a regex literal with quotes: digits-dot-digits-dot-digits, first match.
const VERSION_PATTERN = /(\d+)\.(\d+)\.(\d+)/;

function parseVersion(text) {
  const match = VERSION_PATTERN.exec(String(text ?? ""));
  if (!match) return null;
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function compareVersions(a, b) {
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] - b[i];
  }
  return 0;
}

function plan(ctx) {
  const warnings = [];
  const notes = [];

  // 3a. Version gate (kilo.md section 1, "Minimum version").
  const parsed = parseVersion(ctx.tool.version);
  if (parsed) {
    const min = parseVersion(MIN_VERSION);
    if (compareVersions(parsed, min) < 0) {
      throw new LaunchError(
        "ToolVersionTooOld",
        `${DISPLAY_NAME} ${ctx.tool.version} is older than the minimum ${MIN_VERSION}`,
        { hint: INSTALL.commands.any[0] }
      );
    }
  }

  // 3b. Empty view.
  if (ctx.view.rows.length === 0) {
    throw new LaunchError(
      "ModelNotFound",
      `No OmniRoute model matches the ${DISPLAY_NAME} view (tool-capable chat models, ` +
        `context >= 32000)`,
      { hint: "Check `omnirouter models` or relax the view" }
    );
  }

  // 3c. Model.
  const model = ctx.model ?? ctx.view.rows[0];
  if (!ctx.model) {
    notes.push(`No model chosen: defaulting to ${model.id}`);
  }
  if (typeof model.contextTokens === "number" && model.contextTokens < MIN_CONTEXT_TOKENS) {
    throw new LaunchError(
      "ModelUnsuitable",
      `${model.id} has a ${model.contextTokens}-token context; ${DISPLAY_NAME} needs at ` +
        `least ${MIN_CONTEXT_TOKENS}`
    );
  }

  // Model list: inject (kilo.md section 4, no /v1/models discovery for custom providers).
  const rows = injectRows(ctx, INJECT_LIMIT);
  const models = {};
  for (const row of rows) {
    const context = row.contextTokens ?? 128000;
    const output = row.maxOutputTokens ?? Math.min(32000, context);
    models[row.id] = { name: rowLabel(row), tool_call: true, limit: { context, output } };
  }

  // Auth (kilo.md section 3, "Trust": {env:...} resolves only in trusted sources, so the real
  // token lives in OMNIROUTE_API_KEY and the config carries only the {env:...} reference).
  const keyless = ctx.auth.source === "none";
  const options = { baseURL: ensureV1(ctx.gateway.rootUrl) };
  if (!keyless) options.apiKey = "{env:OMNIROUTE_API_KEY}";

  // User's own --model / -m to kilo itself (kilo.md section 3, "Model choice").
  const userModelFlag = findFlag(ctx.passthroughArgs, ["--model", "-m"]);
  const skipOurModel = userModelFlag !== null;
  let dropEnabledProviders = false;
  if (
    userModelFlag &&
    typeof userModelFlag.value === "string" &&
    !userModelFlag.value.startsWith("omniroute/")
  ) {
    dropEnabledProviders = true;
    warnings.push(
      `--model ${userModelFlag.value} is not an OmniRoute model; that provider is not ` +
        `routed through OmniRoute`
    );
  }

  // `kilo attach <url>` points at a server that never sees our env (kilo.md section 3). The
  // `--attach` flag form is warned by core from the passthrough rule, so only the subcommand here.
  if (ctx.passthroughArgs[0] === "attach") {
    warnings.push(ATTACH_WARNING);
  }

  const config = {
    $schema: "https://app.kilo.ai/config.json",
    share: "disabled",
    autoupdate: false,
    model: `omniroute/${model.id}`,
    small_model: `omniroute/${model.id}`,
  };
  if (!dropEnabledProviders) config.enabled_providers = ["omniroute"];
  config.experimental = { openTelemetry: false };
  config.provider = {
    omniroute: {
      npm: "@ai-sdk/openai-compatible",
      name: "OmniRoute",
      options,
      models,
    },
  };

  const argv = skipOurModel
    ? [...ctx.passthroughArgs]
    : ["--model", `omniroute/${model.id}`, ...ctx.passthroughArgs];

  const envSet = {
    // Built with plain JSON.stringify, not the contract's `json()` helper: `json()` sorts
    // object keys, which would scramble the `models` map out of view order. The invariant
    // checked by checkPlanInvariants/boundary.test.ts requires the injected ids to equal
    // ctx.view ids (cut by injectLimit) IN VIEW ORDER, so this map must preserve insertion
    // order verbatim.
    KILO_CONFIG_CONTENT: JSON.stringify(config),
    KILO_NO_DAEMON: "1",
    KILO_DISABLE_AUTOUPDATE: "1",
    KILO_TELEMETRY_LEVEL: "off",
  };
  if (!keyless) envSet.OMNIROUTE_API_KEY = ctx.auth.token;

  const built = createPlan("kilo", {
    argv,
    env: { set: envSet, unset: ["KILO_API_KEY", "KILO_PROVIDER"] },
    notes,
    warnings,
    modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: rows.length },
  });
  return { ...built, secretSites: findTokenSites(built) };
}

export default defineAdapter({
  contract: { major: 1, minor: 1 },
  id: "kilo",
  displayName: DISPLAY_NAME,
  binaries: ["kilo", "kilocode"],
  capabilities: {
    protocol: "openai-chat",
    model: "optional",
    supportsProfile: false,
    platforms: ["darwin", "linux", "win32"],
    minContextTokens: MIN_CONTEXT_TOKENS,
    tier: "supported",
    modelList: {
      strategy: "inject",
      view: {
        name: "kilo",
        filter: {
          protocols: ["openai-chat"],
          kinds: ["chat"],
          capabilities: ["tools"],
          minContextTokens: MIN_CONTEXT_TOKENS,
        },
        order: "preferences",
        limit: INJECT_LIMIT,
      },
      injectLimit: INJECT_LIMIT,
    },
    versionGate: { args: ["--version"], min: MIN_VERSION },
    install: INSTALL,
    passthrough: [{ flag: "--attach", action: "warn", message: ATTACH_WARNING }],
  },
  plan,
});
