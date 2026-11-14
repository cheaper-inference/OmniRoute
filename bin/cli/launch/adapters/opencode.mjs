// OpenCode adapter Pure: builds a plan, touches nothing.
// Mechanism: the whole config travels in one env var, OPENCODE_CONFIG_CONTENT, which
// outranks every user file except managed config on both majors. v2's default shared background
// service keeps the env it started with, so v2 needs --standalone to see our inline config
//; v1 has no such service.

import {
  LaunchError,
  createPlan,
  defineAdapter,
  findFlag,
  hasFlag,
  injectRows,
  rowLabel,
} from "../contract.mjs";

const DISPLAY_NAME = "OpenCode";
const MIN_VERSION = "1.18.30";
const V2_RECOMMENDED = "2.3.0";
const MIN_CONTEXT = 32000;
// One env var carries the whole config. Linux caps a single env string at 131072 bytes
// (MAX_ARG_STRLEN), so the serialized config stays under 100000 (about 24% margin for the rest
// of the environment and multi-byte ids). One model entry with a long id (~100 bytes) and label
// (~100 bytes) serializes to about 300 bytes, so 300 rows is ~90000 bytes worst case. The plan
// guard below drops rows from the end when very long ids still overflow the budget.
export const CONFIG_BYTE_BUDGET = 100_000;
const INJECT_LIMIT = 300;
const INSTALL_HINT = "npm install -g opencode-ai@latest";

function parseVersion(text) {
  const match = /(\d+)\.(\d+)\.(\d+)/.exec(String(text ?? ""));
  return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
}

function compareVersions(a, b) {
  for (let i = 0; i < 3; i += 1) {
    if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1;
  }
  return 0;
}

/** omniroute/features.v2, or (when absent) a parsed major >= 2. */
function resolveIsV2(ctx) {
  const features = ctx.tool.features || {};
  if (Object.prototype.hasOwnProperty.call(features, "v2")) return features.v2 === true;
  const parsed = parseVersion(ctx.tool.version);
  return parsed ? parsed[0] >= 2 : false;
}

function rowLimits(row) {
  const context = row.contextTokens ?? 128000;
  const output = row.maxOutputTokens ?? Math.min(32000, context);
  return { context, output };
}

function buildModelsV1(rows) {
  const models = {};
  for (const row of rows) {
    const { context, output } = rowLimits(row);
    models[row.id] = { name: rowLabel(row), tool_call: true, limit: { context, output } };
  }
  return models;
}

function buildModelsV2(rows) {
  const models = {};
  for (const row of rows) {
    const { context, output } = rowLimits(row);
    models[row.id] = {
      name: rowLabel(row),
      capabilities: { tools: true },
      limit: { context, output },
    };
  }
  return models;
}

function buildConfigV1(model, rows, baseUrl, keyless) {
  const options = { baseURL: baseUrl };
  if (!keyless) options.apiKey = "{env:OMNIROUTE_API_KEY}";
  return {
    $schema: "https://opencode.ai/config.json",
    share: "disabled",
    autoupdate: false,
    model: `omniroute/${model.id}`,
    small_model: `omniroute/${model.id}`,
    provider: {
      omniroute: {
        npm: "@ai-sdk/openai-compatible",
        name: "OmniRoute",
        options,
        models: buildModelsV1(rows),
      },
    },
  };
}

function buildConfigV2(model, rows, baseUrl, keyless) {
  const settings = { baseURL: baseUrl };
  if (!keyless) settings.apiKey = "{env:OMNIROUTE_API_KEY}";
  return {
    $schema: "https://opencode.ai/config.json",
    share: "disabled",
    update: "disable",
    model: `omniroute/${model.id}`,
    agents: { title: { model: `omniroute/${model.id}` } },
    providers: {
      omniroute: {
        name: "OmniRoute",
        package: "@opencode/ai/providers/openai-compatible",
        settings,
        models: buildModelsV2(rows),
      },
    },
  };
}

function buildArgvV1(model, passthroughArgs, warnings) {
  const argv = [];
  const userFlag = findFlag(passthroughArgs, ["--model", "-m"]);
  if (userFlag === null) {
    argv.push("--model", `omniroute/${model.id}`);
  } else if (typeof userFlag.value === "string" && !userFlag.value.startsWith("omniroute/")) {
    warnings.push(
      `--model ${userFlag.value} is not an OmniRoute model; that provider is not routed through OmniRoute`
    );
  }
  argv.push(...passthroughArgs);
  return argv;
}

function buildArgvV2(passthroughArgs, notes) {
  const argv = [];
  const hasServer = hasFlag(passthroughArgs, ["--server"]);
  const hasStandalone = hasFlag(passthroughArgs, ["--standalone"], { takesValue: false });
  if (!hasServer && !hasStandalone) argv.push("--standalone");
  argv.push(...passthroughArgs);
  const resumesSession =
    hasFlag(passthroughArgs, ["--continue", "-c"], { takesValue: false }) ||
    hasFlag(passthroughArgs, ["--session", "-s"]);
  if (resumesSession) {
    notes.push("A resumed session may keep its earlier model over the OmniRoute default");
  }
  return argv;
}

export default defineAdapter({
  contract: { major: 1, minor: 3 },
  id: "opencode",
  displayName: DISPLAY_NAME,
  binaries: ["opencode"],
  capabilities: {
    protocol: "openai-chat",
    modelList: {
      strategy: "inject",
      view: {
        name: "opencode",
        filter: {
          protocols: ["openai-chat"],
          kinds: ["chat"],
          capabilities: ["tools"],
          minContextTokens: MIN_CONTEXT,
        },
        order: "preferences",
        limit: INJECT_LIMIT,
        spread: "provider",
      },
      injectLimit: INJECT_LIMIT,
    },
    minContextTokens: MIN_CONTEXT,
    model: "optional",
    versionGate: { args: ["--version"], min: MIN_VERSION, features: { v2: "2.0.0" } },
    install: {
      commands: {
        any: [INSTALL_HINT],
        darwin: ["curl -fsSL https://opencode.ai/install | bash"],
        linux: ["curl -fsSL https://opencode.ai/install | bash"],
      },
      url: "https://opencode.ai/docs/cli/",
    },
    supportsProfile: false,
    platforms: ["darwin", "linux", "win32"],
    tier: "core",
    passthrough: [
      {
        flag: "--server",
        action: "warn",
        message:
          "--server attaches to a server that does not see the OmniRoute config; the launch will not route through OmniRoute",
      },
    ],
  },
  plan(ctx) {
    const warnings = [];
    const notes = [];

    const version = parseVersion(ctx.tool.version);
    if (version && compareVersions(version, parseVersion(MIN_VERSION)) < 0) {
      throw new LaunchError(
        "ToolVersionTooOld",
        `${DISPLAY_NAME} ${ctx.tool.version} is older than the minimum ${MIN_VERSION}`,
        { hint: INSTALL_HINT }
      );
    }

    if (ctx.view.rows.length === 0) {
      throw new LaunchError(
        "ModelNotFound",
        `No OmniRoute model matches the ${DISPLAY_NAME} view (tool-capable chat models, context >= 32000)`,
        { hint: "Check `omnirouter models` or relax the view" }
      );
    }

    const model = ctx.model ?? ctx.view.rows[0];
    if (!ctx.model) notes.push(`No model chosen: defaulting to ${model.id}`);
    if (typeof model.contextTokens === "number" && model.contextTokens < MIN_CONTEXT) {
      throw new LaunchError(
        "ModelUnsuitable",
        `${model.id} has a ${model.contextTokens}-token context; ${DISPLAY_NAME} needs at least ${MIN_CONTEXT}`
      );
    }

    const isV2 = resolveIsV2(ctx);
    if (isV2 && version && compareVersions(version, parseVersion(V2_RECOMMENDED)) < 0) {
      warnings.push(
        `${DISPLAY_NAME} ${ctx.tool.version} is untested below ${V2_RECOMMENDED}; upgrade if the model list or provider is missing`
      );
    }

    const baseUrl = ctx.util.ensureV1(ctx.gateway.rootUrl);
    const keyless = ctx.auth.source === "none";
    // Plain JSON.stringify, NOT ctx.util.json: json() canonicalizes by sorting object keys at
    // every level, which would reorder the "models" map away from view order and break the
    // inject invariant (injected ids must equal ctx.view ids in view order). The config object
    // is built with keys already in wire order, and JSON.stringify preserves insertion order.
    const build = (list) =>
      JSON.stringify(
        isV2
          ? buildConfigV2(model, list, baseUrl, keyless)
          : buildConfigV1(model, list, baseUrl, keyless)
      );
    // Over-budget guard: drop rows from the END (the injected ids stay a prefix of the view, in
    // view order) until the config fits; the chosen model is never dropped.
    let rows = injectRows(ctx, INJECT_LIMIT);
    const minKeep = Math.max(1, rows.findIndex((row) => row.id === model.id) + 1);
    const fullCount = rows.length;
    let configContent = build(rows);
    while (Buffer.byteLength(configContent) > CONFIG_BYTE_BUDGET && rows.length > minKeep) {
      rows = rows.slice(0, rows.length - 1);
      configContent = build(rows);
    }
    if (rows.length < fullCount) {
      warnings.push(
        `Dropped ${fullCount - rows.length} of ${fullCount} models from the injected list: the ` +
          `config would exceed ${CONFIG_BYTE_BUDGET} bytes (the env var limit is 131072)`
      );
    }

    const argv = isV2
      ? buildArgvV2(ctx.passthroughArgs, notes)
      : buildArgvV1(model, ctx.passthroughArgs, warnings);

    const envSet = {
      OPENCODE_CONFIG_CONTENT: configContent,
      OPENCODE_DISABLE_AUTOUPDATE: "1",
    };
    if (!keyless) envSet.OMNIROUTE_API_KEY = ctx.auth.token;
    if (isV2) envSet.OPENCODE_DISABLE_FREE_MODELS = "1";

    return createPlan("opencode", {
      argv,
      env: { set: envSet, unset: [] },
      secretSites: keyless ? [] : [{ kind: "env", key: "OMNIROUTE_API_KEY" }],
      notes,
      warnings,
      modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: rows.length },
    });
  },
});
