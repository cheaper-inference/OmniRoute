// bin/cli/launch/adapters/claude.mjs: Claude Code launch adapter (architecture 2.3, section 14).
//
// Recipe source: tools/claude.md (dossier). Pure: (ctx) -> LaunchPlan, imports only the contract.
//
// Shape of a launch:
// - Routing travels in the PROCESS env only. With CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST=1 Claude
//   ignores provider, endpoint and auth variables in every settings file, including the `env` of
//   our own `--settings` (dossier section 3, runs t3a/t3c).
// - The model list is a launcher-owned `--settings` temp file with `modelPicker` (2.1.242+), raw
//   ids, `replaceBuiltInOptions: true` (dossier section 4). A user `--settings` is merged into it
//   by core (mergeJson), because a second `--settings` flag silently replaces the first.
// - 2.1.83 to 2.1.241: no picker file, one `ANTHROPIC_CUSTOM_MODEL_OPTION` row plus a warning.
//   Below 2.1.83 the version gate refuses.
// - Nothing is written under the user's HOME by the launcher. `/model` + Enter can persist an
//   OmniRoute id into the user's settings.json (Claude does that, not us): we snapshot the key
//   read-only (postExitChecks) and warn, never edit.

import {
  LaunchError,
  claudeWindowEnv,
  createPlan,
  defineAdapter,
  findTokenSites,
  injectRows,
  json,
  rowLabel,
  stripTrailingSlash,
  tempPath,
} from "../contract.mjs";

const MIN_VERSION = "2.1.83";
const RECOMMENDED_VERSION = "2.1.242";
const FEATURES = {
  customModelOption: "2.1.78",
  hostManaged: "2.1.83",
  modelPicker: "2.1.242",
  behavesAs: "2.1.257",
};
const MIN_CONTEXT_TOKENS = 32000;
const INJECT_LIMIT = 200;
/** Claude Code caps max output at 128000 (env-vars `CLAUDE_CODE_MAX_OUTPUT_TOKENS`). */
const MAX_OUTPUT_CAP = 128000;
const SETTINGS_FILE = "claude-settings.json";

/** Every provider selector Claude reads; any of them set disables the gateway path. */
const PROVIDER_SELECTORS = [
  "CLAUDE_CODE_USE_BEDROCK",
  "CLAUDE_CODE_USE_VERTEX",
  "CLAUDE_CODE_USE_FOUNDRY",
  "CLAUDE_CODE_USE_ANTHROPIC_AWS",
  "CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD",
  "CLAUDE_CODE_USE_MANTLE",
  "CLAUDE_CODE_USE_GATEWAY",
];

/** Managed settings file per platform (a managed `availableModels` still filters our rows). */
const MANAGED_SETTINGS = {
  darwin: "/Library/Application Support/ClaudeCode/managed-settings.json",
  linux: "/etc/claude-code/managed-settings.json",
  win32: "C:\\Program Files\\ClaudeCode\\managed-settings.json",
};

const KNOWN_CLAUDE_MODEL = /^claude-(?:opus|sonnet|haiku|fable)-[a-z0-9.-]+$/;
const PROFILE_NAME = /^[A-Za-z0-9_][A-Za-z0-9._-]*$/;

function parseSemver(value) {
  const match = /^(\d+)\.(\d+)\.(\d+)/.exec(String(value ?? "").trim());
  return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
}

function semverLess(a, b) {
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] < b[i];
  }
  return false;
}

/** Feature booleans: core's resolution first, else derived from the probed version. */
function resolveFeatures(ctx) {
  const resolved = ctx.tool.features || {};
  const version = parseSemver(ctx.tool.version);
  const out = {};
  for (const [name, first] of Object.entries(FEATURES)) {
    if (typeof resolved[name] === "boolean") out[name] = resolved[name];
    else out[name] = version ? !semverLess(version, parseSemver(first)) : true;
  }
  return { features: out, version };
}

function joinPath(platform, ...parts) {
  const sep = platform === "win32" ? "\\" : "/";
  return parts
    .map((part, index) => {
      const s = String(part);
      return index === 0 ? s.replace(/[\\/]+$/, "") : s.replace(/^[\\/]+|[\\/]+$/g, "");
    })
    .join(sep);
}

/** Claude's config dir for this launch: profile dir, else the user's CLAUDE_CONFIG_DIR, else
 *  ~/.claude. Returns `{ dir, setEnv }`; setEnv is true only when the launcher sets it. */
function configDir(ctx) {
  const base = ctx.baseEnv.CLAUDE_CONFIG_DIR || joinPath(ctx.platform, ctx.homeDir, ".claude");
  if (ctx.profile === undefined) return { dir: base, setEnv: false };
  const name = String(ctx.profile);
  if (!PROFILE_NAME.test(name) || name === "." || name === "..") {
    throw new LaunchError(
      "ConfigConflict",
      `Invalid Claude profile name: ${JSON.stringify(name)}`,
      {
        hint: "Use letters, digits, '.', '_' or '-' only.",
      }
    );
  }
  return { dir: joinPath(ctx.platform, base, "profiles", name), setEnv: true };
}

function contextLabel(tokens) {
  return typeof tokens === "number" && tokens > 0 ? `${Math.floor(tokens / 1000)}k ctx` : "";
}

function rowDescription(row) {
  const parts = [];
  if (row.kind === "combo" || row.kind === "auto") parts.push(row.kind);
  const ctxText = contextLabel(row.contextTokens);
  if (ctxText) parts.push(ctxText);
  return parts.length > 0 ? `${parts.join(", ")} via OmniRoute` : "via OmniRoute";
}

/** Bare Claude model id the row mirrors (`anthropic/claude-sonnet-4-6` -> `claude-sonnet-4-6`),
 *  or undefined. Rows that already are a bare Claude id need no `behavesAs`. */
function behavesAsFor(id) {
  const slash = id.lastIndexOf("/");
  if (slash === -1) return undefined;
  const bare = id.slice(slash + 1);
  return KNOWN_CLAUDE_MODEL.test(bare) ? bare : undefined;
}

function pickerOption(row, features) {
  const option = { model: row.id, label: rowLabel(row), description: rowDescription(row) };
  if (features.behavesAs) {
    const behavesAs = behavesAsFor(row.id);
    if (behavesAs) option.behavesAs = behavesAs;
  }
  return option;
}

function userSettings(ctx) {
  const value = ctx.passthroughJson["--settings"];
  if (value === undefined) return undefined;
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new LaunchError("ConfigConflict", "--settings must be a JSON object", {
      hint: "Pass a settings file path or an inline JSON object after `--`.",
    });
  }
  return value;
}

function toToolModelId(catalogId) {
  return String(catalogId);
}

function plan(ctx) {
  const { features, version } = resolveFeatures(ctx);
  if (version && semverLess(version, parseSemver(MIN_VERSION))) {
    throw new LaunchError(
      "ToolVersionTooOld",
      `Claude Code ${ctx.tool.version} is too old for omnirouter launch (needs ${MIN_VERSION}+, ` +
        `${RECOMMENDED_VERSION}+ recommended)`,
      {
        hint: "Update with `claude update` or reinstall: curl -fsSL https://claude.ai/install.sh | bash",
      }
    );
  }
  if (ctx.view.rows.length === 0) {
    throw new LaunchError(
      "ModelNotFound",
      `No OmniRoute model fits Claude Code (view ${ctx.view.name})`,
      {
        hint: `Claude Code needs chat models with tool calling and at least ${MIN_CONTEXT_TOKENS} context tokens.`,
      }
    );
  }
  const model = ctx.model;
  if (
    model &&
    typeof model.contextTokens === "number" &&
    model.contextTokens > 0 &&
    model.contextTokens < MIN_CONTEXT_TOKENS
  ) {
    throw new LaunchError(
      "ModelUnsuitable",
      `${model.id} has a ${model.contextTokens} token context; Claude Code needs at least ${MIN_CONTEXT_TOKENS}`,
      { hint: "Pick a model with a larger context window (omnirouter launch claude --model <id>)." }
    );
  }

  const base = ctx.baseEnv;
  const isUnset = (key) => base[key] === undefined || base[key] === "";
  const warnings = [];
  const notes = [];
  const set = {
    ANTHROPIC_BASE_URL: stripTrailingSlash(ctx.gateway.rootUrl),
    ANTHROPIC_AUTH_TOKEN: ctx.auth.source === "none" ? ctx.auth.sentinel : ctx.auth.token,
    ANTHROPIC_API_KEY: "",
    CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST: "1",
  };

  const modelId = model ? toToolModelId(model.id) : undefined;
  if (modelId) {
    for (const key of [
      "ANTHROPIC_DEFAULT_OPUS_MODEL",
      "ANTHROPIC_DEFAULT_SONNET_MODEL",
      "ANTHROPIC_DEFAULT_HAIKU_MODEL",
      "ANTHROPIC_DEFAULT_FABLE_MODEL",
      "CLAUDE_CODE_SUBAGENT_MODEL",
    ]) {
      set[key] = modelId;
    }
  }

  // Window env exactly as claudeWindowEnv (architecture 2.3: no window claims at or above 200k
  // until catalog windows are trusted). Each only when the user has not set it.
  const windowEnv = claudeWindowEnv(model?.contextTokens);
  for (const [key, value] of Object.entries(windowEnv)) {
    if (isUnset(key)) set[key] = value;
  }
  const maxOutput = model?.maxOutputTokens;
  if (typeof maxOutput === "number" && maxOutput > 0 && isUnset("CLAUDE_CODE_MAX_OUTPUT_TOKENS")) {
    set.CLAUDE_CODE_MAX_OUTPUT_TOKENS = String(Math.min(Math.floor(maxOutput), MAX_OUTPUT_CAP));
  }
  if (isUnset("CLAUDE_CODE_AUTO_MODE_SERVER")) set.CLAUDE_CODE_AUTO_MODE_SERVER = "0";
  set.CLAUDE_CODE_ATTRIBUTION_HEADER = "0";
  set.DISABLE_ERROR_REPORTING = "1";
  set.DISABLE_FEEDBACK_COMMAND = "1";
  set.CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY = "1";
  if (ctx.settings.privateMode) {
    set.DISABLE_TELEMETRY = "1";
    set.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC = "1";
  }

  const config = configDir(ctx);
  if (config.setEnv) set.CLAUDE_CONFIG_DIR = config.dir;

  // Model list: full picker file, or the one-row fallback.
  const user = userSettings(ctx);
  const tempFiles = [];
  let injected = 0;
  if (features.modelPicker) {
    const rows = injectRows(ctx, INJECT_LIMIT);
    const settings = { ...(user || {}) };
    settings.modelPicker = {
      replaceBuiltInOptions: true,
      options: rows.map((row) => pickerOption(row, features)),
    };
    settings.skipWebFetchPreflight = true;
    tempFiles.push({
      path: SETTINGS_FILE,
      contents: `${json(settings, { indent: 2 })}\n`,
      mode: 0o600,
      format: "json",
    });
    injected = rows.length;
    if (ctx.view.rows.length > rows.length) {
      notes.push(
        `Picker shows the first ${rows.length} of ${ctx.view.rows.length} OmniRoute models.`
      );
    }
  } else {
    if (model && features.customModelOption) {
      set.ANTHROPIC_CUSTOM_MODEL_OPTION = modelId;
      set.ANTHROPIC_CUSTOM_MODEL_OPTION_NAME = rowLabel(model);
      set.ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION = rowDescription(model);
      injected = 1;
    }
    warnings.push(
      `Claude Code < ${RECOMMENDED_VERSION}: picker shows one OmniRoute model; upgrade for the full list`
    );
    if (user) {
      tempFiles.push({
        path: SETTINGS_FILE,
        contents: `${json(user, { indent: 2 })}\n`,
        mode: 0o600,
        format: "json",
      });
    }
  }
  if (!version) {
    warnings.push("Could not read the Claude Code version; assuming a current release.");
  }

  // Every ANTHROPIC_* from the base env we do not set, every provider selector, and discovery
  // (our picker file is the list; discovery would also write ~/.claude/cache).
  const unset = new Set(PROVIDER_SELECTORS);
  for (const key of Object.keys(base)) {
    if (key.startsWith("ANTHROPIC_") && !(key in set)) unset.add(key);
  }
  if (base.CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY !== undefined) {
    unset.add("CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY");
  }
  for (const key of Object.keys(set)) unset.delete(key);

  const argv = [];
  if (tempFiles.length > 0) argv.push("--settings", tempPath(SETTINGS_FILE));
  if (modelId) argv.push("--model", modelId);
  argv.push(...ctx.passthroughArgs);

  const settingsJson = joinPath(ctx.platform, config.dir, "settings.json");
  if (modelId) {
    notes.push(
      `Press s in /model to switch for this launch only; Enter saves the model to ${settingsJson}.`
    );
  } else {
    notes.push(
      "No model chosen: Claude Code starts on its default; pick an OmniRoute model in /model."
    );
  }

  const result = createPlan("claude", {
    argv,
    env: { set, unset: [...unset].sort() },
    tempFiles,
    notes,
    warnings,
    preflight: [
      {
        kind: "file-json-key",
        path: MANAGED_SETTINGS[ctx.platform],
        key: "availableModels",
        why: "A managed availableModels allowlist still filters the OmniRoute picker rows.",
        severity: "warn",
      },
    ],
    postExitChecks: [
      {
        kind: "json-key-unchanged",
        path: settingsJson,
        key: "model",
        message: `Claude Code saved a default model in ${settingsJson} during this launch (/model + Enter).`,
        revertHint: `Restore the previous "model" value in ${settingsJson}, or run /model in a plain claude session.`,
      },
    ],
    modelList: { strategy: "inject", viewHash: ctx.view.hash, injected },
  });
  result.secretSites = findTokenSites(result);
  return result;
}

export default defineAdapter({
  contract: { major: 1, minor: 1 },
  id: "claude",
  binaries: ["claude"],
  capabilities: {
    protocol: "anthropic-messages",
    tier: "core",
    model: "optional",
    minContextTokens: MIN_CONTEXT_TOKENS,
    modelList: {
      strategy: "inject",
      view: {
        name: "claude-code",
        filter: {
          protocols: ["anthropic-messages"],
          kinds: ["chat"],
          capabilities: ["tools"],
          minContextTokens: MIN_CONTEXT_TOKENS,
        },
        order: "preferences",
      },
      injectLimit: INJECT_LIMIT,
    },
    versionGate: {
      args: ["--version"],
      pattern: "^(\\d+\\.\\d+\\.\\d+)",
      min: MIN_VERSION,
      recommended: RECOMMENDED_VERSION,
      features: FEATURES,
    },
    install: {
      commands: {
        darwin: [
          "curl -fsSL https://claude.ai/install.sh | bash",
          "brew install --cask claude-code",
        ],
        linux: ["curl -fsSL https://claude.ai/install.sh | bash"],
        win32: ["irm https://claude.ai/install.ps1 | iex", "winget install Anthropic.ClaudeCode"],
        any: ["npm install -g @anthropic-ai/claude-code@latest"],
      },
      url: "https://code.claude.com/docs/en/setup",
    },
    supportsProfile: true,
    platforms: ["darwin", "linux", "win32"],
    passthrough: [
      {
        flag: "--settings",
        action: "mergeJson",
        message:
          "Merged into the launcher settings file (one --settings only; ours sets modelPicker).",
      },
      {
        flag: "--bare",
        takesValue: false,
        action: "warn",
        message:
          "--bare changes how Claude Code reads credentials; the OmniRoute token may be ignored.",
      },
      {
        flag: "--setting-sources",
        action: "warn",
        message: "--setting-sources may drop the launcher --settings file (OmniRoute picker rows).",
      },
    ],
  },
  plan,
  toToolModelId,
});
