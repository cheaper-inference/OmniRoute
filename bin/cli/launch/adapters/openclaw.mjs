// bin/cli/launch/adapters/openclaw.mjs: `omnirouter launch openclaw` (architecture 2.3, 14).
// Recipe source: tools/openclaw.md (dossier). Fully ephemeral: config and state live in ${TMP},
// the embedded local TUI (`tui --local`) talks to OmniRoute over /v1/chat/completions.
// Pure: imports only ../contract.mjs, no I/O, no process reads.

import {
  LaunchError,
  createPlan,
  defineAdapter,
  ensureV1,
  findFlag,
  findTokenSites,
  injectRows,
} from "../contract.mjs";

const PROVIDER = "omniroute";
/** Tool-literal key placeholder, kept as-is by core (only ${TMP}/${STATE}/${TOKEN} expand). */
const API_KEY_LITERAL = "${OMNIROUTE_API_KEY:-omniroute-local}";
const KEY_ENV = "OMNIROUTE_API_KEY";

/** OpenClaw hard context floor; it warns below WARN_CONTEXT (dossier section 4). */
const MIN_CONTEXT = 4000;
const WARN_CONTEXT = 8000;

const MIN_VERSION = "2026.11.0";
const RECOMMENDED_VERSION = "2026.11.3";

/** Options that are hard errors next to `--local` (`src/cli/tui-cli.ts:25-34`). */
const GATEWAY_FLAGS = ["--url", "--token", "--password", "--tls-fingerprint"];

/**
 * One-shot subcommands accepted as the first passthrough arg; used INSTEAD of `tui --local`.
 * `agent` runs one turn (--message, --json); it only runs embedded (no Gateway daemon) with
 * `--local`, which the launcher adds unless the user passed it (or uses `agent exec`, which is
 * already embedded and isolated).
 */
const ONE_SHOT_SUBCOMMANDS = ["agent"];

/** Inherited env that would redirect OpenClaw away from our temp state (dossier section 5). */
const ALWAYS_UNSET = [
  "OPENCLAW_PROFILE",
  "OPENCLAW_HOME",
  "OPENCLAW_WORKSPACE_DIR",
  "OPENCLAW_AGENT_DIR",
];

/** Numeric dotted-version compare: -1, 0, 1. Non-numeric parts count as 0. */
function compareVersions(a, b) {
  const pa = String(a).split(".");
  const pb = String(b).split(".");
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const x = Number.parseInt(pa[i] ?? "0", 10) || 0;
    const y = Number.parseInt(pb[i] ?? "0", 10) || 0;
    if (x !== y) return x < y ? -1 : 1;
  }
  return 0;
}

function knownContext(row) {
  const value = row?.contextTokens;
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : null;
}

/** OpenClaw's own default when maxTokens is omitted (custom-providers.md:453-462). */
function maxTokensFor(row) {
  const out = row.maxOutputTokens;
  if (typeof out === "number" && Number.isFinite(out) && out > 0) return out;
  const window = knownContext(row);
  if (window !== null && window < 65536) return Math.max(8192, Math.floor(window / 2));
  return window === null ? 8192 : 32768;
}

/** View row -> models.providers.omniroute.models[] entry (ollama openclaw.go:930-961 mapping). */
function modelEntry(row) {
  const caps = Array.isArray(row.capabilities) ? row.capabilities : [];
  const entry = {
    id: row.id,
    name: `${row.id} (OmniRoute)`,
    input: caps.includes("vision") ? ["text", "image"] : ["text"],
    maxTokens: maxTokensFor(row),
  };
  const window = knownContext(row);
  if (window !== null) entry.contextWindow = window;
  if (caps.includes("reasoning")) entry.reasoning = true;
  return entry;
}

function checkVersion(ctx, warnings) {
  const version = ctx.tool?.version;
  if (typeof version !== "string" || version === "") return;
  if (compareVersions(version, MIN_VERSION) < 0) {
    throw new LaunchError(
      "ToolVersionTooOld",
      `OpenClaw ${version} is older than ${MIN_VERSION}, the first release line with tui --local ` +
        "and ${VAR:-default} config substitution.",
      { hint: "Upgrade with: npm install -g openclaw@latest --allow-scripts=openclaw" }
    );
  }
  if (compareVersions(version, RECOMMENDED_VERSION) < 0) {
    warnings.push(
      `OpenClaw ${version} is older than ${RECOMMENDED_VERSION}, the version this recipe was ` +
        "verified with; upgrade with npm install -g openclaw@latest if the launch fails."
    );
  }
}

function isOneShot(args) {
  return typeof args[0] === "string" && ONE_SHOT_SUBCOMMANDS.includes(args[0]);
}

function buildArgv(args) {
  if (!isOneShot(args)) return ["tui", "--local", ...args];
  const rest = args.slice(1);
  const embedded = rest[0] === "exec" || findFlag(rest, "--local");
  return embedded ? [args[0], ...rest] : [args[0], "--local", ...rest];
}

function checkPassthrough(args) {
  if (isOneShot(args)) {
    for (const flag of GATEWAY_FLAGS) {
      if (findFlag(args, flag)) {
        throw new LaunchError(
          "ConfigConflict",
          `openclaw ${flag} conflicts with the embedded local run the launcher sets up.`,
          { hint: "Run openclaw directly to attach to a Gateway." }
        );
      }
    }
    return;
  }
  for (const flag of GATEWAY_FLAGS) {
    if (findFlag(args, flag)) {
      throw new LaunchError(
        "ConfigConflict",
        `openclaw ${flag} conflicts with --local: the launcher runs the embedded local TUI.`,
        { hint: "Run openclaw directly to attach to a Gateway." }
      );
    }
  }
  const first = args[0];
  if (typeof first === "string" && first !== "" && !first.startsWith("-")) {
    throw new LaunchError(
      "ConfigConflict",
      `openclaw tui --local takes no positional session target (got ${JSON.stringify(first)}).`,
      { hint: "Use -- --session <key>, or run openclaw directly for other subcommands." }
    );
  }
}

function checkModel(model) {
  const window = knownContext(model);
  if (window === null) {
    throw new LaunchError(
      "ModelUnsuitable",
      `Model ${model.id} has no known context window; OpenClaw needs one per model.`,
      { hint: "Pick a model whose /v1/models row reports context_length." }
    );
  }
  if (window < MIN_CONTEXT) {
    throw new LaunchError(
      "ModelUnsuitable",
      `Model ${model.id} has a ${window}-token context window; OpenClaw needs at least ` +
        `${MIN_CONTEXT}.`,
      { hint: "Pick a model with a larger context window." }
    );
  }
}

/** Env keys from baseEnv that must not reach OpenClaw (dossier section 5, inherited env). */
function inheritedUnset(baseEnv, setKeys) {
  const keys = new Set(ALWAYS_UNSET);
  for (const key of Object.keys(baseEnv || {})) {
    if (key.startsWith("OPENCLAW_GATEWAY_")) keys.add(key);
    else if (/_(?:API_KEY|BASE_URL)$/.test(key) && key !== KEY_ENV) keys.add(key);
  }
  return [...keys].filter((key) => !setKeys.has(key)).sort();
}

function plan(ctx) {
  const warnings = [];
  checkVersion(ctx, warnings);
  checkPassthrough(ctx.passthroughArgs);

  const rows = injectRows(ctx);
  if (rows.length === 0) {
    throw new LaunchError(
      "ModelNotFound",
      "No OmniRoute model qualifies for OpenClaw (needs tool calling and a known context " +
        `window of at least ${MIN_CONTEXT} tokens).`,
      { hint: "Enable a provider with tool-capable chat models, then retry." }
    );
  }

  const notes = [];
  let primary = ctx.model;
  if (primary) {
    if (!rows.some((row) => row.id === primary.id)) {
      throw new LaunchError("ModelNotFound", `Model ${primary.id} is not in the OpenClaw view.`, {
        hint: "Pick a model from the OpenClaw view (tool calling, known context window).",
      });
    }
    checkModel(primary);
  } else {
    primary = rows[0];
    notes.push(`No model chosen; OpenClaw starts on ${primary.id} (first row of the view).`);
  }
  const window = knownContext(primary);
  if (window !== null && window < WARN_CONTEXT) {
    warnings.push(
      `Model ${primary.id} has a ${window}-token context window; OpenClaw warns below ` +
        `${WARN_CONTEXT} and long sessions will compact often.`
    );
  }
  if (rows.some((row) => knownContext(row) === null)) {
    warnings.push(
      "Some models have no known context window; OpenClaw budgets them as 200000 tokens."
    );
  }
  if (ctx.platform === "win32") {
    warnings.push("OpenClaw on native Windows is untested by this recipe; WSL2 is recommended.");
  }

  const defaults = {
    model: { primary: `${PROVIDER}/${primary.id}` },
    skipBootstrap: true,
  };
  // Without a cwd, OpenClaw defaults the workspace to $OPENCLAW_STATE_DIR/workspace (in ${TMP}).
  if (typeof ctx.cwd === "string" && ctx.cwd !== "") defaults.workspace = ctx.cwd;

  const config = {
    agents: { defaults },
    models: {
      mode: "merge",
      catalogRefresh: { enabled: false },
      providers: {
        [PROVIDER]: {
          baseUrl: ensureV1(ctx.gateway.rootUrl),
          apiKey: API_KEY_LITERAL,
          api: "openai-completions",
          models: rows.map(modelEntry),
        },
      },
    },
    update: { checkOnStart: false },
    discovery: { mdns: { mode: "off" } },
  };

  const set = {
    OPENCLAW_STATE_DIR: ctx.util.tempPath("state"),
    OPENCLAW_CONFIG_PATH: ctx.util.tempPath("openclaw.json"),
    OPENCLAW_NO_AUTO_UPDATE: "1",
    DO_NOT_TRACK: "1",
    XDG_CACHE_HOME: ctx.util.tempPath("cache"),
    [KEY_ENV]: ctx.auth.token,
  };

  notes.push(
    `All ${rows.length} view models are declared; switch in session with /model ` +
      `${PROVIDER}/<id>.`
  );

  const result = createPlan("openclaw", {
    argv: buildArgv(ctx.passthroughArgs),
    env: { set, unset: inheritedUnset(ctx.baseEnv, new Set(Object.keys(set))) },
    tempFiles: [
      {
        path: "openclaw.json",
        contents: `${ctx.util.json(config, { indent: 2 })}\n`,
        mode: 0o600,
        format: "json",
      },
    ],
    notes,
    warnings,
    preflight: [
      {
        kind: "node-version",
        range: ">=24.16.0 <25 || >=26.1.0",
        why:
          "openclaw refuses other Node versions (node:sqlite NUL truncation) and may install a " +
          "private Node under ~/.openclaw when run on an older one",
      },
    ],
    modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: rows.length },
  });
  result.secretSites = findTokenSites(result);
  return result;
}

export default defineAdapter({
  contract: { major: 1, minor: 0 },
  id: "openclaw",
  displayName: "OpenClaw",
  binaries: ["openclaw", "clawdbot"],
  capabilities: {
    protocol: "openai-chat",
    modelList: {
      strategy: "inject",
      view: {
        name: "openclaw",
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
    model: "optional",
    versionGate: {
      args: ["--version"],
      pattern: "OpenClaw (\\d{4}\\.\\d+\\.\\d+)",
      min: MIN_VERSION,
      recommended: RECOMMENDED_VERSION,
    },
    install: {
      commands: {
        darwin: [
          "curl -fsSL https://openclaw.ai/install.sh | bash -s -- --no-onboard",
          "npm install -g openclaw@latest --allow-scripts=openclaw",
          "pnpm add -g --allow-build=openclaw openclaw@latest",
        ],
        linux: [
          "curl -fsSL https://openclaw.ai/install.sh | bash -s -- --no-onboard",
          "npm install -g openclaw@latest --allow-scripts=openclaw",
          "pnpm add -g --allow-build=openclaw openclaw@latest",
        ],
        win32: [
          "npm install -g openclaw@latest --allow-scripts=openclaw",
          "pnpm add -g --allow-build=openclaw openclaw@latest",
        ],
      },
      url: "https://docs.openclaw.ai/cli/tui",
    },
    supportsProfile: false,
    platforms: ["darwin", "linux", "win32"],
    tier: "core",
    passthrough: GATEWAY_FLAGS.map((flag) => ({
      flag,
      action: "reject",
      message: `${flag} conflicts with tui --local; run openclaw directly to attach to a Gateway`,
    })),
  },
  plan,
});
