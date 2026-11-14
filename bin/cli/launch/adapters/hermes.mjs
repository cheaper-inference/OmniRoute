// bin/cli/launch/adapters/hermes.mjs: `omnirouter launch hermes` (Hermes Agent, NousResearch).
//
// Pure: imports only ../contract.mjs, no I/O, no process reads.
//
// Shape of the launch (verified live):
// - a launcher-owned temp HERMES_HOME (${TMP}) holding one config.yaml whose `model.provider`
//   names the `providers.omniroute` entry pointed at OmniRoute's /v1, the key by env reference
//   (`key_env`), the catalog context window pinned (`model.context_length`), update checks and
//   telemetry consent pre-answered;
// - why the named entry and not `provider: custom`: Hermes 0.19.0 resolves bare `custom` through
//   `_resolve_openrouter_runtime` (hermes_cli/runtime_provider.py:1056), which takes the key only
//   from `model.api_key` / `model.api` (:1065-1070) or host-gated vendor env vars, never from
//   `model.key_env`, so it fell back to "no-key-required" (:1182-1183). A named entry goes
//   through `_get_named_custom_provider` (:618), which reads `providers.<name>.key_env` from the
//   env (:674-676). `model.key_env` stays for releases that honor it on the bare-custom path;
// - HERMES_GATEWAY_LOCK_DIR inside ${TMP} so nothing lands in ~/.local/state/hermes; core
//   creates that dir before spawn because the plan declares it in `tempDirs` (contract 1.2);
// - the key is always ${TOKEN}: core substitutes the minted olx_ session token on every launch,
//   also when the gateway runs without auth, so there is no empty-key branch;
// - `hermes gateway stop` as teardown, because every turn runs in a detached gateway daemon
//   that would outlive the CLI and be orphaned when ${TMP} is removed.

import {
  LaunchError,
  createPlan,
  defineAdapter,
  ensureV1,
  findFlag,
  injectRows,
  rowLabel,
  yaml,
} from "../contract.mjs";
import { injectModelList, withTokenSites } from "./_shared/inject.mjs";
import { parseSemver, semverLess } from "./_shared/semver.mjs";

const TOOL_ID = "hermes";
const MIN_CONTEXT = 64000; // _enforce_minimum_context hard reject
const KEY_ENV = "OMNIROUTE_API_KEY";
const PROVIDER_NAME = "omniroute"; // providers.<name>; not a Hermes built-in name, so it resolves to it
const LOCK_DIR = "locks"; // HERMES_GATEWAY_LOCK_DIR, relative to ${TMP}
const RECOMMENDED_VERSION = "0.16.0"; // "gate softly on >= v0.16.0 or unknown"

/** Flags the launcher owns through config.yaml. */
const OWNED_FLAGS = [
  {
    flag: "--model",
    aliases: ["-m"],
    message: "the model is set in the launch config.yaml; -m also drops the context pin",
  },
  { flag: "--provider", message: "the provider is the launch config's custom OmniRoute entry" },
  { flag: "--base-url", message: "the endpoint is set by the launcher (and --tui refuses it)" },
  { flag: "--api-key", message: "the key is passed by env reference, never in argv" },
];

/** Flags that make Hermes ignore the launch config entirely. */
const REJECTED_FLAGS = [
  { flag: "--ignore-user-config", message: "Hermes would ignore the launch config.yaml" },
  { flag: "--safe-mode", message: "Hermes would ignore the launch config.yaml" },
];

/** Env that silently overrides config.yaml. */
const ENV_UNSET = [
  "HERMES_TUI",
  "HERMES_IGNORE_USER_CONFIG",
  "HERMES_SAFE_MODE",
  "HERMES_INFERENCE_PROVIDER",
  "HERMES_MODEL",
  "OPENAI_BASE_URL",
  "OPENAI_API_KEY",
  "CUSTOM_BASE_URL",
];

const MODEL_HINT =
  "Hermes refuses models under 64,000 tokens of context and needs a known window to pin; " +
  "pick another model with --model";

/**
 * Local mirror of the core version gate so the plan (and its golden) carries the outcome.
 * Unknown versions (`vunknown` from a tagless checkout) are accepted.
 */
function versionWarnings(ctx, gate) {
  const current = parseSemver(ctx.tool.version);
  if (!current) return [];
  if (gate.min && semverLess(current, parseSemver(gate.min))) {
    throw new LaunchError(
      "ToolVersionTooOld",
      `Hermes Agent ${ctx.tool.version} is older than the minimum ${gate.min}`,
      { hint: "Re-run the Hermes Agent installer to update" }
    );
  }
  if (gate.recommended && semverLess(current, parseSemver(gate.recommended))) {
    return [
      `Hermes Agent ${ctx.tool.version} is older than ${gate.recommended}; the launch config ` +
        "(model.key_env, providers:) is only verified on newer releases; re-run the " +
        "Hermes Agent installer to update",
    ];
  }
  return [];
}

function assertPassthrough(args) {
  for (const rule of OWNED_FLAGS) {
    const hit = findFlag(args, [rule.flag, ...(rule.aliases || [])]);
    if (hit) {
      throw new LaunchError("ConfigConflict", `${hit.flag} is owned by omnirouter launch`, {
        hint: `${rule.message}. Use omnirouter's own --model instead.`,
      });
    }
  }
  for (const rule of REJECTED_FLAGS) {
    const hit = findFlag(args, rule.flag, { takesValue: false });
    if (hit) {
      throw new LaunchError("ConfigConflict", `${hit.flag} cannot be used with omnirouter launch`, {
        hint: `${rule.message}. Run hermes directly for that mode.`,
      });
    }
  }
}

function assertModelSuitable(row) {
  const context = row.contextTokens;
  if (typeof context !== "number" || !(context > 0)) {
    throw new LaunchError(
      "ModelUnsuitable",
      `Model ${row.id} has no known context window; Hermes needs one to pin`,
      { hint: MODEL_HINT }
    );
  }
  if (context < MIN_CONTEXT) {
    throw new LaunchError(
      "ModelUnsuitable",
      `Model ${row.id} has a context window of ${context} tokens, below the 64,000 Hermes requires`,
      { hint: MODEL_HINT }
    );
  }
}

const capabilities = {
  protocol: "openai-chat",
  modelList: {
    strategy: "inject",
    view: {
      name: "hermes",
      filter: {
        kinds: ["chat"],
        protocols: ["openai-chat"],
        capabilities: ["tools"],
        minContextTokens: MIN_CONTEXT,
        requireKnownContext: true,
      },
      order: "preferences",
    },
  },
  minContextTokens: MIN_CONTEXT,
  // Hermes needs model.default; without --model the first view row is used.
  model: "optional",
  versionGate: {
    args: ["--version"],
    // "Hermes Agent v<ver> (<release date>)"; `vunknown` must not match the date.
    pattern: "Hermes Agent v(\\d+\\.\\d+\\.\\d+)",
    recommended: RECOMMENDED_VERSION,
  },
  install: {
    commands: {
      linux: [
        "curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash -s -- --non-interactive",
      ],
      darwin: [
        "curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash -s -- --non-interactive",
      ],
      win32: [
        "& ([scriptblock]::Create((irm https://hermes-agent.nousresearch.com/install.ps1))) -NonInteractive",
      ],
    },
    url: "https://hermes-agent.nousresearch.com/docs/getting-started/installation",
  },
  supportsProfile: false,
  platforms: ["darwin", "linux", "win32"],
  tier: "core",
  passthrough: [
    ...OWNED_FLAGS.map((rule) => ({ ...rule, action: "owned" })),
    ...REJECTED_FLAGS.map((rule) => ({ ...rule, takesValue: false, action: "reject" })),
  ],
};

function plan(ctx) {
  if (ctx.view.rows.length === 0) {
    throw new LaunchError(
      "ModelNotFound",
      "No OmniRoute model fits Hermes (tool calling and a known context window >= 64,000)",
      { hint: "Connect a provider with a large-context, tool-capable model, then retry" }
    );
  }
  const warnings = versionWarnings(ctx, capabilities.versionGate);
  assertPassthrough(ctx.passthroughArgs);

  const notes = [];
  let model = ctx.model;
  if (!model) {
    model = ctx.view.rows[0];
    notes.push(`No --model given; Hermes starts on ${model.id} (first model of the view)`);
  }
  assertModelSuitable(model);

  const baseUrl = ensureV1(ctx.gateway.rootUrl);
  const rows = injectRows(ctx, capabilities.modelList.injectLimit);
  const models = {};
  for (const row of rows) {
    models[row.id] = row.contextTokens > 0 ? { context_length: row.contextTokens } : {};
  }

  const config = {
    model: {
      provider: PROVIDER_NAME,
      default: model.id,
      base_url: baseUrl,
      key_env: KEY_ENV,
      context_length: model.contextTokens,
    },
    providers: {
      [PROVIDER_NAME]: {
        name: "OmniRoute",
        api: baseUrl,
        key_env: KEY_ENV,
        transport: "chat_completions",
        default_model: model.id,
        models,
      },
    },
    updates: { check: false },
    plugins: { auto_update_check_hours: 0 },
    telemetry: { shared_metrics: { enabled: false, send: false, offer_version: 2 } },
    gateway: { unmanaged_idle_exit_seconds: 30 },
    toolsets: ["hermes-cli", "web"],
  };

  notes.push(
    `Model ${rowLabel(model)} pinned at ${model.contextTokens} tokens of context`,
    "Temporary HERMES_HOME: sessions, memory and skills are discarded on exit",
    "hermes gateway stop runs on exit so the background gateway does not outlive the launch"
  );
  if (ctx.platform === "win32") {
    warnings.push("The temp-home recipe and gateway teardown are not yet verified on Windows");
  }

  return withTokenSites(
    createPlan(TOOL_ID, {
      argv: [...ctx.passthroughArgs],
      env: {
        set: {
          HERMES_HOME: "${TMP}",
          HERMES_GATEWAY_LOCK_DIR: ctx.util.tempPath(LOCK_DIR),
          [KEY_ENV]: ctx.auth.token,
        },
        unset: ENV_UNSET.slice(),
      },
      tempFiles: [{ path: "config.yaml", contents: yaml(config), mode: 0o600, format: "yaml" }],
      tempDirs: [{ path: LOCK_DIR, mode: 0o700 }],
      needsTempDir: true,
      notes,
      warnings,
      teardown: [
        { argv: ["${TOOL}", "gateway", "stop"], env: "plan", timeoutMs: 5000, onError: "warn" },
      ],
      modelList: injectModelList(ctx, rows.length),
    })
  );
}

export default defineAdapter({
  contract: { major: 1, minor: 2 },
  id: TOOL_ID,
  displayName: "Hermes Agent",
  binaries: ["hermes"],
  capabilities,
  plan,
});
