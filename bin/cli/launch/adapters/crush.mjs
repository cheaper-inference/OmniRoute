// bin/cli/launch/adapters/crush.mjs: launch adapter for Crush (charmbracelet/crush).
// Recipe source: tools/crush.md (see the comment block in the unit test for line citations).
// Strategy inject: a launcher-owned crush.json in the workspace data dir (highest merge priority).

import {
  LaunchError,
  PLACEHOLDERS,
  createPlan,
  defineAdapter,
  findTokenSites,
  hasFlag,
  injectRows,
  rowLabel,
  statePath,
  tempPath,
} from "../contract.mjs";

const MIN_VERSION = "0.101.0";
const DEFAULT_MAX_TOKENS = 16384;
const PROVIDER_ID = "omniroute";

function semverParts(value) {
  const match = /(\d+)\.(\d+)\.(\d+)/.exec(String(value ?? ""));
  return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
}

/** True when `version` is strictly below `floor`; unparseable or absent versions are not. */
function isBelow(version, floor) {
  const a = semverParts(version);
  const b = semverParts(floor);
  if (!a || !b) return false;
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] < b[i];
  }
  return false;
}

function modelEntry(row) {
  const entry = {
    id: row.id,
    name: rowLabel(row),
    context_window: row.contextTokens,
    default_max_tokens: row.maxOutputTokens ?? DEFAULT_MAX_TOKENS,
  };
  const caps = row.capabilities || [];
  if (caps.includes("reasoning")) entry.can_reason = true;
  if (caps.includes("vision")) entry.supports_attachments = true;
  return entry;
}

// One-shot subcommand: `crush run <prompt>`. crush 0.101.0 non-interactive stdout is flaky
// (about 40% of runs exit 0 with empty stdout, even with --quiet or --debug); passing --verbose
// (logs go to stderr) made 30 of 30 runs flush the reply, so the adapter adds it.
const ONE_SHOT_SUBCOMMANDS = ["run"];

function oneShotArgv(args) {
  if (
    !ONE_SHOT_SUBCOMMANDS.includes(args[0]) ||
    hasFlag(args, ["--verbose", "-v"], { takesValue: false })
  ) {
    return [...args];
  }
  return [args[0], "--verbose", ...args.slice(1)];
}

export default defineAdapter({
  contract: { major: 1, minor: 1 },
  id: "crush",
  displayName: "Crush",
  binaries: ["crush"],
  capabilities: {
    protocol: "openai-chat",
    modelList: {
      strategy: "inject",
      view: {
        name: "crush",
        filter: {
          protocols: ["openai-chat"],
          capabilities: ["tools"],
          requireKnownContext: true,
        },
        order: "preferences",
      },
    },
    model: "optional",
    versionGate: { args: ["--version"], pattern: "v?(\\d+\\.\\d+\\.\\d+)", min: MIN_VERSION },
    install: {
      commands: {
        darwin: ["brew install charmbracelet/tap/crush", "npm install -g @charmland/crush"],
        linux: ["brew install charmbracelet/tap/crush", "npm install -g @charmland/crush"],
        win32: ["winget install charmbracelet.crush", "npm install -g @charmland/crush"],
        any: ["go install github.com/charmbracelet/crush@latest"],
      },
      url: "https://github.com/charmbracelet/crush",
    },
    supportsProfile: false,
    platforms: ["darwin", "linux", "win32"],
    tier: "core",
    passthrough: [
      {
        flag: "--data-dir",
        aliases: ["-D"],
        action: "reject",
        message: "The launcher owns the Crush data dir (it holds the injected crush.json).",
      },
      {
        flag: "--cwd",
        aliases: ["-c"],
        action: "warn",
        message:
          "--cwd changes the project Crush works in; launcher state stays keyed to the launch dir.",
      },
    ],
  },

  plan(ctx) {
    const rows = injectRows(ctx);
    if (rows.length === 0) {
      throw new LaunchError(
        "ModelNotFound",
        "No models with tool calling and a known context window are available for Crush.",
        { hint: "Connect a provider, or check the gateway's /v1/models for context_length." }
      );
    }
    if (ctx.model && !(ctx.model.contextTokens > 0)) {
      throw new LaunchError(
        "ModelUnsuitable",
        `Model ${ctx.model.id} has no known context window; Crush needs one to compact sessions.`,
        { hint: "Pick a model that reports context_length." }
      );
    }
    if (hasFlag(ctx.passthroughArgs, ["--data-dir", "-D"])) {
      throw new LaunchError(
        "ConfigConflict",
        "--data-dir / -D conflicts with the launcher-owned Crush data dir.",
        { hint: "Drop the flag; omnirouter launch sets CRUSH_DATA_DIR itself." }
      );
    }

    const warnings = [];
    if (isBelow(ctx.tool.version, MIN_VERSION)) {
      throw new LaunchError(
        "ToolVersionTooOld",
        `Crush ${ctx.tool.version} is older than ${MIN_VERSION}, the oldest tested version.`,
        {
          hint: "Upgrade with: brew upgrade charmbracelet/tap/crush (or npm install -g @charmland/crush)",
        }
      );
    }
    if (hasFlag(ctx.passthroughArgs, ["--cwd", "-c"])) {
      warnings.push("--cwd changes the project Crush works in; the injected config still applies.");
    }

    const chosen = ctx.model ?? rows[0];
    const config = {
      providers: {
        [PROVIDER_ID]: {
          name: "OmniRoute",
          type: "completions",
          base_url: "$OMNIROUTE_BASE_URL/v1",
          api_key: "$OMNIROUTE_API_KEY",
          discover_models: true,
          models: rows.map(modelEntry),
        },
      },
      models: {
        large: { provider: PROVIDER_ID, model: chosen.id },
        small: { provider: PROVIDER_ID, model: chosen.id },
      },
      options: { disable_provider_auto_update: true, disable_metrics: true },
    };

    const plan = createPlan("crush", {
      argv: oneShotArgv(ctx.passthroughArgs),
      env: {
        set: {
          CRUSH_DATA_DIR: statePath("data"),
          CRUSH_GLOBAL_DATA: statePath("gdata"),
          CRUSH_CACHE_DIR: tempPath("cache"),
          CRUSH_DISABLE_PROVIDER_AUTO_UPDATE: "1",
          CRUSH_DISABLE_METRICS: "1",
          OMNIROUTE_BASE_URL: ctx.gateway.rootUrl,
          OMNIROUTE_API_KEY: PLACEHOLDERS.TOKEN,
        },
        // CRUSH_GLOBAL_CONFIG is deliberately left alone: it would hide the user's own config.
        unset: ["CRUSH_CLIENT_SERVER"],
      },
      tempFiles: [
        {
          path: "data/crush.json",
          root: "state",
          contents: `${ctx.util.json(config, { indent: 2 })}\n`,
          format: "json",
          mode: 0o600,
        },
      ],
      needsTempDir: true,
      notes: [
        `Crush reads the injected crush.json from ${statePath("data")} (highest priority, per project dir).`,
        "Your own Crush providers, MCP servers and crushrc stay merged in.",
      ],
      warnings,
      modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: rows.length },
    });
    plan.secretSites = findTokenSites(plan);
    return plan;
  },
});
