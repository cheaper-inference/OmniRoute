// OpenCode adapter Pure: builds a plan, touches nothing.
// Mechanism: the whole config travels in one env var, OPENCODE_CONFIG_CONTENT, which
// outranks every user file except managed config on both majors. v2's default shared background
// service keeps the env it started with, so v2 needs --standalone to see our inline config
//; v1 has no such service.

import {
  createPlan,
  defineAdapter,
  findFlag,
  hasFlag,
  injectRows,
  rowLabel,
} from "../contract.mjs";
import {
  fitConfigToBudget,
  injectModelList,
  keyEnvSites,
  openCodeLimits,
} from "./_shared/inject.mjs";
import {
  foreignModelWarning,
  openCodeOptions,
  openCodeV1Head,
  openCodeV1Provider,
} from "./_shared/opencode-config.mjs";
import { gatedToolModel, toolChatCapabilities } from "./_shared/pi-capabilities.mjs";
import { isSemverBelow, parseSemver } from "./_shared/semver.mjs";

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

const MODEL_GATE = {
  displayName: DISPLAY_NAME,
  min: MIN_VERSION,
  hint: INSTALL_HINT,
  minContext: MIN_CONTEXT,
};

/** omniroute/features.v2, or (when absent) a parsed major >= 2. */
function resolveIsV2(ctx) {
  const features = ctx.tool.features || {};
  if (Object.prototype.hasOwnProperty.call(features, "v2")) return features.v2 === true;
  const parsed = parseSemver(ctx.tool.version);
  return parsed ? parsed[0] >= 2 : false;
}

function buildModelsV2(rows) {
  const models = {};
  for (const row of rows) {
    models[row.id] = {
      name: rowLabel(row),
      capabilities: { tools: true },
      limit: openCodeLimits(row),
    };
  }
  return models;
}

function buildConfigV1(model, rows, baseUrl, keyless) {
  return {
    ...openCodeV1Head("https://opencode.ai/config.json", model.id),
    provider: openCodeV1Provider(openCodeOptions(baseUrl, keyless), rows),
  };
}

function buildConfigV2(model, rows, baseUrl, keyless) {
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
        settings: openCodeOptions(baseUrl, keyless),
        models: buildModelsV2(rows),
      },
    },
  };
}

function buildArgvV1(model, passthroughArgs, warnings) {
  const argv = [];
  const userFlag = findFlag(passthroughArgs, ["--model", "-m"]);
  const warning = foreignModelWarning(userFlag);
  if (userFlag === null) argv.push("--model", `omniroute/${model.id}`);
  else if (warning !== null) warnings.push(warning);
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

function buildEnv(configContent, token, keyless, isV2) {
  const envSet = {
    OPENCODE_CONFIG_CONTENT: configContent,
    OPENCODE_DISABLE_AUTOUPDATE: "1",
  };
  if (!keyless) envSet.OMNIROUTE_API_KEY = token;
  if (isV2) envSet.OPENCODE_DISABLE_FREE_MODELS = "1";
  return envSet;
}

export default defineAdapter({
  contract: { major: 1, minor: 3 },
  id: "opencode",
  displayName: DISPLAY_NAME,
  binaries: ["opencode"],
  capabilities: {
    ...toolChatCapabilities("opencode", {
      minContext: MIN_CONTEXT,
      versionGate: { args: ["--version"], min: MIN_VERSION, features: { v2: "2.0.0" } },
      injectLimit: INJECT_LIMIT,
    }),
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
    const model = gatedToolModel(ctx, MODEL_GATE, notes);

    const isV2 = resolveIsV2(ctx);
    if (isV2 && isSemverBelow(ctx.tool.version, V2_RECOMMENDED)) {
      warnings.push(
        `${DISPLAY_NAME} ${ctx.tool.version} is untested below ${V2_RECOMMENDED}; upgrade if the model list or provider is missing`
      );
    }

    const baseUrl = ctx.util.ensureV1(ctx.gateway.rootUrl);
    const keyless = ctx.auth.source === "none";
    const buildConfig = isV2 ? buildConfigV2 : buildConfigV1;
    // Plain JSON.stringify, NOT ctx.util.json: json() canonicalizes by sorting object keys at
    // every level, which would reorder the "models" map away from view order and break the
    // inject invariant (injected ids must equal ctx.view ids in view order). The config object
    // is built with keys already in wire order, and JSON.stringify preserves insertion order.
    const { rows, content } = fitConfigToBudget(injectRows(ctx, INJECT_LIMIT), {
      modelId: model.id,
      budget: CONFIG_BYTE_BUDGET,
      build: (list) => JSON.stringify(buildConfig(model, list, baseUrl, keyless)),
      warnings,
    });

    const argv = isV2
      ? buildArgvV2(ctx.passthroughArgs, notes)
      : buildArgvV1(model, ctx.passthroughArgs, warnings);

    return createPlan("opencode", {
      argv,
      env: { set: buildEnv(content, ctx.auth.token, keyless, isV2), unset: [] },
      secretSites: keyEnvSites(keyless),
      notes,
      warnings,
      modelList: injectModelList(ctx, rows.length),
    });
  },
});
