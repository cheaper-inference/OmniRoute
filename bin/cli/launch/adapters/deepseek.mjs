// bin/cli/launch/adapters/deepseek.mjs: DeepSeek Harness (`dsh`) launch adapter.
//
// Recipe source: tools/deepseek.md (sections 3, 4, 5); architecture section 14 (deepseek row).
// `dsh web --patch ${TMP}/omniroute.cordis.yml`: the patch is a YAML list of {id, config} rows
// (applied last, wins over bundle/profile/home layers) carrying the OmniRoute provider and the
// default model. The key travels only as the env var OMNIROUTER_DSH_API_KEY (apiKeyEnv).
//
// Deviations / open items:
// - dossier gives no version gate numbers (npm "latest" is the 0.2.2-rc line, breaking changes
//   announced): versionGate only declares `--version`; no min and no recommended, so no
//   ToolVersionTooOld and no version warning. Core still resolves ctx.tool.version.
// - dossier gives no minContextTokens: 98304 chosen (compaction reserves maxTokens + 65536
//   headroom, so the window must clear it with room to work).
// - node-version preflight is declared without `binary` (dossier does not name one); core probes
//   the node that runs dsh.
// - patch merge vs replace of the user's own llm-pi-ai entry is UNVERIFIED (dossier section 8):
//   the direct-row patch (dossier recommendation) is used, not ollama's `settings.path` row.
// - browser UI profile `web` is used (the `tui` profile is UNVERIFIED in the npm build).
// - no teardown and no postExitChecks: the dossier defines none (DSH_HOME is left alone).

import {
  LaunchError,
  PLATFORMS,
  createPlan,
  defineAdapter,
  ensureV1,
  findTokenSites,
  injectRows,
  yaml,
} from "../contract.mjs";

const ID = "deepseek";
const PROVIDER_ID = "omniroute";
const KEY_ENV = "OMNIROUTER_DSH_API_KEY";
// One-shot subcommands (`dsh --help`: "dsh headless ..."). When the passthrough starts with one,
// it replaces the default `web` profile; `--patch` is a launcher flag, valid for any profile.
const ONE_SHOT_SUBCOMMANDS = ["headless"];
const PATCH_FILE = "omniroute.cordis.yml";
const MIN_CONTEXT_TOKENS = 98304;
const DEFAULT_CONTEXT_WINDOW = 131072;
// Compaction reserves maxTokens + this headroom (dossier section 4).
const COMPACTION_HEADROOM = 65536;

/** ollama rule: min(maxOutput, ctx/8), omitted when output unknown or ctx - max < 2 * headroom. */
function maxTokensFor(row) {
  const ctx = row.contextTokens;
  const out = row.maxOutputTokens;
  if (!(ctx > 0) || !(out > 0)) return undefined;
  const max = Math.min(out, Math.floor(ctx / 8));
  if (max <= 0 || ctx - max < 2 * COMPACTION_HEADROOM) return undefined;
  return max;
}

function modelEntry(row) {
  const entry = { id: row.id, name: row.label || row.id, input: ["text"] };
  if (row.contextTokens > 0) entry.contextWindow = row.contextTokens;
  const maxTokens = maxTokensFor(row);
  if (maxTokens !== undefined) entry.maxTokens = maxTokens;
  return entry;
}

function plan(ctx) {
  if (ctx.view.rows.length === 0) {
    throw new LaunchError("ModelNotFound", "No models available for DeepSeek Harness.", {
      hint: "Connect a provider with tool-calling chat models of 98304+ context, then retry.",
    });
  }
  const model = ctx.model;
  if (!model) {
    throw new LaunchError("ModelRequired", "DeepSeek Harness needs a model.", {
      hint: "Pass --model <id> or pick one from the list.",
    });
  }
  if (model.contextTokens > 0 && model.contextTokens < MIN_CONTEXT_TOKENS) {
    throw new LaunchError(
      "ModelUnsuitable",
      `Model ${model.id} has a ${model.contextTokens} token context window; DeepSeek Harness needs at least ${MIN_CONTEXT_TOKENS}.`,
      { hint: "Choose a model with a larger context window." }
    );
  }
  for (const flag of ["--patch", "--profile"]) {
    if (ctx.passthroughArgs.some((arg) => arg === flag || arg.startsWith(`${flag}=`))) {
      throw new LaunchError(
        "ConfigConflict",
        `${flag} is set by omnirouter for DeepSeek Harness.`,
        {
          hint: `Remove ${flag} from the arguments after --.`,
        }
      );
    }
  }

  const rows = injectRows(ctx);
  const patch = [
    {
      id: "llm-pi-ai",
      config: {
        providers: {
          [PROVIDER_ID]: {
            displayName: "OmniRoute",
            api: "openai-completions",
            baseURL: ensureV1(ctx.gateway.rootUrl),
            apiKeyEnv: KEY_ENV,
            defaultContextWindow: DEFAULT_CONTEXT_WINDOW,
            models: rows.map(modelEntry),
          },
        },
      },
    },
    { id: "agent-default-model", config: { provider: PROVIDER_ID, model: model.id } },
  ];

  const oneShot = ONE_SHOT_SUBCOMMANDS.includes(ctx.passthroughArgs[0]);
  const patchPath = ctx.util.tempPath(PATCH_FILE);
  const parts = {
    argv: oneShot
      ? [ctx.passthroughArgs[0], "--patch", patchPath, ...ctx.passthroughArgs.slice(1)]
      : ["web", "--patch", patchPath, ...ctx.passthroughArgs],
    env: {
      set: { [KEY_ENV]: ctx.auth.token, DSH_TELEMETRY_DISABLED: "1" },
      unset: [],
    },
    tempFiles: [{ path: PATCH_FILE, contents: ctx.util.yaml(patch), mode: 0o600, format: "yaml" }],
    notes: oneShot
      ? []
      : [
          "DeepSeek Harness web UI opens in your browser (default http://127.0.0.1:3080); use --port after -- if it is taken.",
        ],
    warnings: [],
    preflight: [
      {
        kind: "node-version",
        range: ">=24.9.0",
        why: "DeepSeek Harness (dsh) requires Node 24.9 or newer.",
      },
    ],
    modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: rows.length },
  };
  const result = createPlan(ID, parts);
  result.secretSites = findTokenSites(result);
  return result;
}

export default defineAdapter({
  contract: { major: 1, minor: 1 },
  id: ID,
  displayName: "DeepSeek Harness",
  binaries: ["dsh"],
  capabilities: {
    tier: "core",
    protocol: "openai-chat",
    model: "required",
    minContextTokens: MIN_CONTEXT_TOKENS,
    modelList: {
      strategy: "inject",
      view: {
        name: "deepseek",
        filter: {
          protocols: ["openai-chat"],
          capabilities: ["tools"],
          minContextTokens: MIN_CONTEXT_TOKENS,
        },
        order: "preferences",
      },
    },
    versionGate: { args: ["--version"] },
    install: {
      commands: { any: ["npm install -g @deepseek-ai/dsh@latest"] },
      url: "https://github.com/deepseek-ai/deepseek-harness",
    },
    supportsProfile: false,
    platforms: [...PLATFORMS],
    passthrough: [
      {
        flag: "--patch",
        action: "reject",
        message: "omnirouter injects its own --patch file for DeepSeek Harness.",
      },
      {
        flag: "--profile",
        action: "reject",
        message: "omnirouter launches the web profile of DeepSeek Harness.",
      },
    ],
  },
  plan,
});
