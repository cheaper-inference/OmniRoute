// bin/cli/launch/adapters/pool.mjs: Poolside Pool launch adapter (tools/pool.md, architecture section 14).
// Standalone mode, env only, zero files. The installer is EULA-gated: the launcher must NEVER
// auto-install it; the install command below is only printed for the user to run.
import {
  LaunchError,
  createPlan,
  defineAdapter,
  ensureV1,
  findFlag,
  findTokenSites,
} from "../contract.mjs";

const VERSION_GATE = { args: ["--version"] };
const STANDALONE_PREFIX = "POOLSIDE_STANDALONE_";
const MODEL_HINT = "use omnirouter launch pool --model <id>";

const PLATFORMS = ["darwin", "linux"];
const PASSTHROUGH = [{ flag: "--model", aliases: ["-m"], action: "reject", message: MODEL_HINT }];

const VIEW = {
  name: "pool",
  filter: { protocols: ["openai-chat"], kinds: ["chat"], capabilities: ["tools"] },
  order: "preferences",
};

function knownContext(row) {
  const v = row && row.contextTokens;
  return typeof v === "number" && Number.isFinite(v) && v > 0 ? v : null;
}

export default defineAdapter({
  contract: { major: 1, minor: 1 },
  id: "pool",
  displayName: "Poolside Pool",
  binaries: ["pool"],
  capabilities: {
    protocol: "openai-chat",
    tier: "supported",
    model: "required",
    versionGate: VERSION_GATE,
    modelList: {
      // Pool reads /v1/models itself through the session token; the gateway serves the view.
      strategy: "server-view",
      view: VIEW,
      serve: { shape: "openai", mode: "replace" },
    },
    install: {
      commands: {
        darwin: ["curl -fsSL https://downloads.poolside.ai/pool/install.sh | sh"],
        linux: ["curl -fsSL https://downloads.poolside.ai/pool/install.sh | sh"],
      },
      url: "https://docs.poolside.ai/cli/install",
    },
    supportsProfile: false,
    // win32 is rejected until the Windows beta is checked (tools/pool.md section 3).
    platforms: PLATFORMS,
    passthrough: PASSTHROUGH,
  },
  plan(ctx) {
    if (!PLATFORMS.includes(ctx.platform)) {
      throw new LaunchError(
        "UnsupportedPlatform",
        `Poolside Pool is not supported on ${ctx.platform} yet.`,
        { hint: "run it on macOS or Linux" }
      );
    }
    if (ctx.view.rows.length === 0) {
      throw new LaunchError("ModelNotFound", "No OmniRoute model matches the pool view.", {
        hint: "connect a provider with a tool-capable chat model, then retry",
      });
    }
    if (!ctx.model) {
      throw new LaunchError("ModelRequired", "Poolside Pool needs a model.", {
        hint: MODEL_HINT,
      });
    }
    for (const rule of PASSTHROUGH) {
      const names = [rule.flag, ...(rule.aliases || [])];
      if (findFlag(ctx.passthroughArgs, names)) {
        throw new LaunchError("ConfigConflict", `${rule.flag} is set by the launcher.`, {
          hint: rule.message,
        });
      }
    }

    const id = ctx.model.id;
    const context = knownContext(ctx.model);
    const set = {
      POOLSIDE_STANDALONE_BASE_URL: ensureV1(ctx.gateway.rootUrl),
      POOLSIDE_API_KEY: ctx.auth.token,
      POOLSIDE_STANDALONE_MODEL: id,
    };
    if (context !== null) set.POOLSIDE_STANDALONE_CONTEXT_LENGTH = String(context);

    const unset = Object.keys(ctx.baseEnv)
      .filter((key) => key.startsWith(STANDALONE_PREFIX) && !(key in set))
      .sort();

    const notes = [
      "Pool still loads ~/.config/poolside/settings.yaml (permissions, hooks, MCP) and project .poolside/settings.yaml.",
    ];
    if (context === null) {
      notes.push("Model context is unknown: Pool uses its own default context length.");
    }

    const plan = createPlan("pool", {
      argv: ["-m", id, ...ctx.passthroughArgs],
      env: { set, unset },
      notes,
      modelList: { strategy: "server-view", viewHash: ctx.view.hash, injected: 0 },
    });
    plan.secretSites = findTokenSites(plan);
    return plan;
  },
});
