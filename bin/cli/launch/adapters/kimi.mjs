// bin/cli/launch/adapters/kimi.mjs: Kimi Code CLI launch adapter (tools/kimi.md, architecture section 14).
// Env-only ephemeral overlay (KIMI_MODEL_*), one model, nothing written to the user's config.
import {
  LaunchError,
  createPlan,
  defineAdapter,
  ensureV1,
  findFlag,
  findTokenSites,
} from "../contract.mjs";

const VERSION_GATE = { args: ["--version"], min: "2.0.0", recommended: "2.6.2" };
const NPM_INSTALL = "npm install -g @moonshot-ai/kimi-code";
const INSTALL_SH = "curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash";
const FALLBACK_CONTEXT = 128000;

const PLATFORMS = ["darwin", "linux", "win32"];
const PASSTHROUGH = [
  {
    flag: "--model",
    aliases: ["-m"],
    action: "reject",
    message:
      "kimi -m switches away from the OmniRoute overlay; use omnirouter launch kimi --model <id>",
  },
];

// Env keys we set ourselves; every other KIMI_MODEL_* key in baseEnv is stripped.
const SET_KEYS = new Set([
  "KIMI_MODEL_NAME",
  "KIMI_MODEL_API_KEY",
  "KIMI_MODEL_PROVIDER_TYPE",
  "KIMI_MODEL_BASE_URL",
  "KIMI_MODEL_MAX_CONTEXT_SIZE",
  "KIMI_MODEL_CAPABILITIES",
  "KIMI_MODEL_DISPLAY_NAME",
  "KIMI_DISABLE_TELEMETRY",
  "KIMI_CODE_NO_AUTO_UPDATE",
]);
const ALWAYS_UNSET = [
  "KIMI_API_KEY",
  "KIMI_BASE_URL",
  "KIMI_CODE_BASE_URL",
  "KIMI_CODE_PROVIDER_NAME",
];

function parseSemver(text) {
  const m = /(\d+)\.(\d+)\.(\d+)/.exec(String(text ?? ""));
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}

function compareSemver(a, b) {
  for (let i = 0; i < 3; i += 1) {
    if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1;
  }
  return 0;
}

export default defineAdapter({
  contract: { major: 1, minor: 1 },
  id: "kimi",
  displayName: "Kimi Code CLI",
  binaries: ["kimi"],
  capabilities: {
    protocol: "openai-chat",
    tier: "supported",
    model: "required",
    versionGate: VERSION_GATE,
    modelList: {
      strategy: "inject",
      view: {
        name: "kimi",
        filter: { protocols: ["openai-chat"], kinds: ["chat"], capabilities: ["tools"] },
        order: "preferences",
      },
    },
    install: {
      commands: {
        any: [NPM_INSTALL],
        darwin: [INSTALL_SH],
        linux: [INSTALL_SH],
        win32: ["irm https://code.kimi.com/kimi-code/install.ps1 | iex"],
      },
      url: "https://moonshotai.github.io/kimi-code/en/guides/getting-started",
    },
    supportsProfile: false,
    platforms: PLATFORMS,
    passthrough: PASSTHROUGH,
  },
  plan(ctx) {
    if (!PLATFORMS.includes(ctx.platform)) {
      throw new LaunchError(
        "UnsupportedPlatform",
        `Kimi Code CLI is not supported on ${ctx.platform}.`
      );
    }

    const warnings = [];
    const notes = [];

    const have = parseSemver(ctx.tool.version);
    if (have) {
      if (compareSemver(have, parseSemver(VERSION_GATE.min)) < 0) {
        throw new LaunchError(
          "ToolVersionTooOld",
          `kimi ${ctx.tool.version} is older than ${VERSION_GATE.min}; it looks like the legacy Python kimi-cli, which is not supported.`,
          { hint: `${NPM_INSTALL} (or: ${INSTALL_SH})` }
        );
      }
      if (compareSemver(have, parseSemver(VERSION_GATE.recommended)) < 0) {
        warnings.push(
          `kimi ${ctx.tool.version} is older than the recommended ${VERSION_GATE.recommended}; upgrade with: ${NPM_INSTALL}`
        );
      }
    }

    if (ctx.view.rows.length === 0) {
      throw new LaunchError("ModelNotFound", "No OmniRoute model matches the kimi view.", {
        hint: "Connect a provider with tool-calling chat models, then retry.",
      });
    }
    if (!ctx.model) {
      throw new LaunchError("ModelRequired", "kimi needs a model.", {
        hint: "use omnirouter launch kimi --model <id>",
      });
    }

    for (const rule of PASSTHROUGH) {
      if (findFlag(ctx.passthroughArgs, [rule.flag, ...(rule.aliases || [])])) {
        throw new LaunchError("ConfigConflict", rule.message, {
          hint: "use omnirouter launch kimi --model <id>",
        });
      }
    }

    const model = ctx.model;
    const id = model.id;
    const known = typeof model.contextTokens === "number" && model.contextTokens > 0;
    if (!known) {
      notes.push(
        `Context size of ${id} is unknown; using ${FALLBACK_CONTEXT} for KIMI_MODEL_MAX_CONTEXT_SIZE.`
      );
    }
    const modelCaps = Array.isArray(model.capabilities) ? model.capabilities : [];
    const capList = ["tool_use"];
    if (modelCaps.includes("vision")) capList.push("image_in");
    if (modelCaps.includes("reasoning")) capList.push("thinking");

    notes.push("Your own config.toml models stay visible in /model (merged with the overlay).");

    const set = {
      KIMI_MODEL_NAME: id,
      KIMI_MODEL_API_KEY: ctx.auth.token,
      KIMI_MODEL_PROVIDER_TYPE: "openai",
      KIMI_MODEL_BASE_URL: ensureV1(ctx.gateway.rootUrl),
      KIMI_MODEL_MAX_CONTEXT_SIZE: String(known ? model.contextTokens : FALLBACK_CONTEXT),
      KIMI_MODEL_CAPABILITIES: capList.join(","),
      KIMI_MODEL_DISPLAY_NAME: `OmniRoute ${id}`,
      KIMI_DISABLE_TELEMETRY: "1",
      KIMI_CODE_NO_AUTO_UPDATE: "1",
    };
    const unset = new Set(ALWAYS_UNSET);
    for (const key of Object.keys(ctx.baseEnv).sort()) {
      if (key.startsWith("KIMI_MODEL_") && !SET_KEYS.has(key)) unset.add(key);
    }

    const plan = createPlan("kimi", {
      argv: [...ctx.passthroughArgs],
      env: { set, unset: [...unset].sort() },
      notes,
      warnings,
      modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: 1 },
    });
    plan.secretSites = findTokenSites(plan);
    return plan;
  },
});
