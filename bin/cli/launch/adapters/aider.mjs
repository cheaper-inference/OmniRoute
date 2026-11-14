// bin/cli/launch/adapters/aider.mjs: `omnirouter launch aider`. Pure: no process, fs or os reads.
//
// Recipe: key and base URL live in a launcher-owned 0600 env file (--env-file loads last with
// override, so a user .env cannot win), model limits go in a temp --model-metadata-file, and
// model, weak model and editor model are pinned to the same gateway id.
//
// Deviations / open items (the recommended option was taken for each):
// - Version gate: no minimum or recommended version is known, so only the probe
//   (args + pattern) is declared and plan() never warns or throws on version.
// - Empty key: we always send the session token (or the no-auth sentinel set by core), so the
//   "litellm errors on an empty key" question does not arise.
// - AIDER_ANALYTICS via env: not used, we pass --no-analytics.
// - Built-in weak-model names: we always pin --weak-model and --editor-model.
// - Offline litellm price fetch delay: no flag exists, nothing to do.
// - Model is "required": aider can start without --model, but then its OpenRouter onboarding
//   may trigger, so core must always hand us a model.
// - A user --model is allowed (it is not a passthrough rule): our --model is dropped and the
//   weak and editor models follow the user's value unless the user pinned them too.

import {
  LaunchError,
  createPlan,
  defineAdapter,
  dotenv,
  findFlag,
  hasFlag,
  injectRows,
} from "../contract.mjs";
import { injectModelList, withTokenSites } from "./_shared/inject.mjs";

const PROVIDER_PREFIX = "openai/";

function toToolModelId(catalogId) {
  return `${PROVIDER_PREFIX}${catalogId}`;
}

function metadataEntry(row) {
  const entry = {
    input_cost_per_token: 0,
    litellm_provider: "openai",
    mode: "chat",
    output_cost_per_token: 0,
  };
  if (Number.isFinite(row.contextTokens) && row.contextTokens > 0) {
    entry.max_input_tokens = row.contextTokens;
  }
  if (Number.isFinite(row.maxOutputTokens) && row.maxOutputTokens > 0) {
    entry.max_output_tokens = row.maxOutputTokens;
    entry.max_tokens = row.maxOutputTokens;
  }
  return entry;
}

function assertPlannable(ctx) {
  if (ctx.view.rows.length === 0) {
    throw new LaunchError("ModelNotFound", "No models available for aider in this view.", {
      hint: "Check that at least one provider is connected and serves openai-chat.",
    });
  }
  if (!ctx.model) {
    throw new LaunchError("ModelRequired", "aider needs a model.", {
      hint: "Pass --model <id> or let the launcher pick one.",
    });
  }
}

/** Warn when a user --model lacks the provider prefix litellm needs to reach the gateway. */
function prefixWarnings(userModel) {
  if (!userModel || String(userModel.value ?? "").startsWith(PROVIDER_PREFIX)) return [];
  return [
    `aider --model ${userModel.value} has no "${PROVIDER_PREFIX}" prefix; litellm may not route it through the gateway.`,
  ];
}

function modelMetadata(ctx) {
  const metadata = {};
  for (const row of injectRows(ctx)) metadata[toToolModelId(row.id)] = metadataEntry(row);
  return metadata;
}

/** Our model flags, each skipped when the user passed it. */
function modelFlags(args, userModel, modelId) {
  const flags = [];
  if (!userModel) flags.push("--model", modelId);
  if (!hasFlag(args, ["--weak-model"])) flags.push("--weak-model", modelId);
  if (!hasFlag(args, ["--editor-model"])) flags.push("--editor-model", modelId);
  return flags;
}

function aiderTempFiles(baseUrl, token, metadata) {
  return [
    {
      path: "aider.env",
      contents: dotenv({ AIDER_OPENAI_API_BASE: baseUrl, AIDER_OPENAI_API_KEY: token }),
      mode: 0o600,
      format: "env",
    },
    {
      path: "aider.model.metadata.json",
      contents: `${JSON.stringify(metadata, null, 2)}\n`,
      mode: 0o600,
      format: "json",
    },
  ];
}

function plan(ctx) {
  assertPlannable(ctx);

  const args = ctx.passthroughArgs;
  const userModel = findFlag(args, ["--model"]);
  const modelId = userModel?.value ?? toToolModelId(ctx.model.id);
  const warnings = prefixWarnings(userModel);
  const metadata = modelMetadata(ctx);
  const baseUrl = ctx.util.ensureV1(ctx.gateway.rootUrl);

  const argv = [
    "--env-file",
    ctx.util.tempPath("aider.env"),
    ...modelFlags(args, userModel, modelId),
    "--model-metadata-file",
    ctx.util.tempPath("aider.model.metadata.json"),
    "--no-show-model-warnings",
    "--no-check-update",
    "--no-show-release-notes",
    "--no-analytics",
    ...args,
  ];

  return withTokenSites(
    createPlan("aider", {
      argv,
      env: {
        set: {},
        unset: ["OPENAI_API_KEY", "OPENAI_API_BASE", "OPENAI_BASE_URL"],
      },
      tempFiles: aiderTempFiles(baseUrl, ctx.auth.token, metadata),
      warnings,
      notes: [`aider talks to ${baseUrl} as ${modelId}`],
      modelList: injectModelList(ctx, Object.keys(metadata).length),
    })
  );
}

export default defineAdapter({
  contract: { major: 1, minor: 1 },
  id: "aider",
  displayName: "Aider",
  binaries: ["aider"],
  capabilities: {
    tier: "core",
    protocol: "openai-chat",
    model: "required",
    modelList: {
      strategy: "inject",
      view: {
        name: "aider",
        filter: { protocols: ["openai-chat"] },
        order: "preferences",
      },
    },
    versionGate: {
      args: ["--version"],
      pattern: "aider\\s+(\\d+\\.\\d+\\.\\d+)",
    },
    install: {
      commands: {
        any: [
          "python -m pip install aider-install && aider-install",
          "uv tool install --force --python python3.12 --with pip aider-chat@latest",
          "pipx install aider-chat",
        ],
        darwin: ["curl -LsSf https://aider.chat/install.sh | sh"],
        linux: ["curl -LsSf https://aider.chat/install.sh | sh"],
        win32: ['powershell -ExecutionPolicy ByPass -c "irm https://aider.chat/install.ps1 | iex"'],
      },
      url: "https://aider.chat/docs/install.html",
    },
    supportsProfile: false,
    platforms: ["darwin", "linux", "win32"],
    passthrough: [
      {
        flag: "--openai-api-base",
        action: "reject",
        message: "The launcher owns the gateway base URL.",
      },
      {
        flag: "--openai-api-key",
        action: "reject",
        message: "The launcher owns the gateway key.",
      },
      {
        flag: "--env-file",
        action: "reject",
        message: "The launcher supplies its own --env-file.",
      },
      {
        flag: "--api-key",
        valuePrefixes: ["openai="],
        action: "reject",
        message: "The launcher owns the gateway key.",
      },
    ],
  },

  toToolModelId,

  plan,
});
