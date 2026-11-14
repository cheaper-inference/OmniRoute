// bin/cli/launch/adapters/kilo.mjs: Kilo Code CLI launch adapter.
//
// Docs: https://kilo.ai/docs (the Kilo CLI is an OpenCode fork).
// Kilo is an OpenCode v1 fork: a custom provider is injected through KILO_CONFIG_CONTENT
// identical in shape to the opencode v1 recipe plus a few
// Kilo-only env vars (daemon bypass, autoupdate, telemetry) and the $schema/enabled_providers
// fields. There is no /v1/models discovery for custom providers, so the
// strategy is "inject".

import { createPlan, defineAdapter, ensureV1, findFlag, injectRows } from "../contract.mjs";
import { fitConfigToBudget, injectModelList, withTokenSites } from "./_shared/inject.mjs";
import {
  foreignModelWarning,
  openCodeOptions,
  openCodeV1Head,
  openCodeV1Provider,
} from "./_shared/opencode-config.mjs";
import { gatedToolModel, toolChatModelList } from "./_shared/pi-capabilities.mjs";

const DISPLAY_NAME = "Kilo Code CLI";
const MIN_CONTEXT_TOKENS = 32000;
// One env var carries the whole config. Linux caps a single env string at 131072 bytes
// (MAX_ARG_STRLEN), so the serialized config stays under 100000 (about 24% margin for the rest
// of the environment and multi-byte ids). One model entry with a long id (~100 bytes) and label
// (~100 bytes) serializes to about 300 bytes, so 300 rows is ~90000 bytes worst case. The plan
// guard below drops rows from the end when very long ids still overflow the budget.
export const CONFIG_BYTE_BUDGET = 100_000;
const INJECT_LIMIT = 300;
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

const MODEL_GATE = {
  displayName: DISPLAY_NAME,
  min: MIN_VERSION,
  hint: INSTALL.commands.any[0],
  minContext: MIN_CONTEXT_TOKENS,
};

/**
 * The serialized KILO_CONFIG_CONTENT. Plain JSON.stringify, not the contract's `json()` helper:
 * `json()` sorts object keys, which would scramble the `models` map out of view order. The
 * invariant checked by checkPlanInvariants/boundary.test.ts requires the injected ids to equal
 * ctx.view ids (cut by injectLimit) IN VIEW ORDER, so this map must preserve insertion order.
 */
function buildConfig(model, rows, options, dropEnabledProviders) {
  const config = openCodeV1Head("https://app.kilo.ai/config.json", model.id);
  if (!dropEnabledProviders) config.enabled_providers = ["omniroute"];
  config.experimental = { openTelemetry: false };
  config.provider = openCodeV1Provider(options, rows);
  return JSON.stringify(config);
}

/** Warnings from the passthrough args; true when the user's --model is not an OmniRoute one. */
function checkPassthrough(args, warnings) {
  // User's own --model / -m to kilo itself.
  const warning = foreignModelWarning(findFlag(args, ["--model", "-m"]));
  if (warning !== null) warnings.push(warning);
  // `kilo attach <url>` points at a server that never sees our env. The
  // `--attach` flag form is warned by core from the passthrough rule, so only the subcommand here.
  if (args[0] === "attach") warnings.push(ATTACH_WARNING);
  return warning !== null;
}

function buildEnv(configContent, ctx, keyless) {
  const envSet = {
    KILO_CONFIG_CONTENT: configContent,
    KILO_NO_DAEMON: "1",
    KILO_DISABLE_AUTOUPDATE: "1",
    KILO_TELEMETRY_LEVEL: "off",
  };
  if (!keyless) envSet.OMNIROUTE_API_KEY = ctx.auth.token;
  return envSet;
}

function plan(ctx) {
  const warnings = [];
  const notes = [];
  const model = gatedToolModel(ctx, MODEL_GATE, notes);

  // Auth ({env:...} resolves only in trusted sources, so the real
  // token lives in OMNIROUTE_API_KEY and the config carries only the {env:...} reference).
  const keyless = ctx.auth.source === "none";
  const options = openCodeOptions(ensureV1(ctx.gateway.rootUrl), keyless);
  const args = ctx.passthroughArgs;
  const dropEnabledProviders = checkPassthrough(args, warnings);

  const { rows, content } = fitConfigToBudget(injectRows(ctx, INJECT_LIMIT), {
    modelId: model.id,
    budget: CONFIG_BYTE_BUDGET,
    build: (list) => buildConfig(model, list, options, dropEnabledProviders),
    warnings,
  });

  const skipOurModel = findFlag(args, ["--model", "-m"]) !== null;
  const argv = skipOurModel ? [...args] : ["--model", `omniroute/${model.id}`, ...args];

  return withTokenSites(
    createPlan("kilo", {
      argv,
      env: { set: buildEnv(content, ctx, keyless), unset: ["KILO_API_KEY", "KILO_PROVIDER"] },
      notes,
      warnings,
      modelList: injectModelList(ctx, rows.length),
    })
  );
}

export default defineAdapter({
  contract: { major: 1, minor: 3 },
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
    modelList: toolChatModelList("kilo", MIN_CONTEXT_TOKENS, INJECT_LIMIT),
    versionGate: { args: ["--version"], min: MIN_VERSION },
    install: INSTALL,
    passthrough: [{ flag: "--attach", action: "warn", message: ATTACH_WARNING }],
  },
  plan,
});
