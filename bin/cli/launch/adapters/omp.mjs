// Oh My Pi (omp) launch adapter. Launch recipe: a `-e` extension that
// calls pi.registerProvider, plus an update-check overlay passed with --config.
import {
  NO_AUTH_SENTINEL,
  createPlan,
  defineAdapter,
  ensureV1,
  hasFlag,
  injectRows,
} from "../contract.mjs";
import {
  KEY_ENV,
  injectModelList,
  keyEnvSites,
  piExtension,
  piModelEntry,
} from "./_shared/inject.mjs";
import { gatedToolModel, toolChatCapabilities } from "./_shared/pi-capabilities.mjs";

const DISPLAY_NAME = "Oh My Pi";
const MIN_VERSION = "18.8.5";
const MIN_CONTEXT = 32000;
const INSTALL_HINT = "curl -fsSL https://omp.sh/install | sh";

const MODEL_GATE = {
  displayName: DISPLAY_NAME,
  min: MIN_VERSION,
  hint: INSTALL_HINT,
  minContext: MIN_CONTEXT,
};

function buildModel(row) {
  return piModelEntry(row, {
    contextWindow: row.contextTokens ?? 128000,
    maxTokens: row.maxOutputTokens ?? 32768,
  });
}

function buildArgv(args, model, notes) {
  const argv = ["-e", "${STATE}/omniroute.ts", "--config", "${TMP}/omp-overlay.yml"];
  const userModel = hasFlag(args, ["--model"]);
  const legacyProvider = hasFlag(args, ["--provider"]);
  if (!userModel && !legacyProvider) argv.push("--model", `omniroute/${model.id}`);
  if (legacyProvider && !userModel) {
    notes.push("--provider is legacy: your --provider choice is kept and no --model was added");
  }
  argv.push(...args);
  return argv;
}

export default defineAdapter({
  contract: { major: 1, minor: 1 },
  id: "omp",
  displayName: DISPLAY_NAME,
  binaries: ["omp"],
  capabilities: {
    ...toolChatCapabilities("omp", {
      minContext: MIN_CONTEXT,
      versionGate: { args: ["--version"], min: MIN_VERSION },
    }),
    install: {
      commands: {
        darwin: ["curl -fsSL https://omp.sh/install | sh"],
        linux: ["curl -fsSL https://omp.sh/install | sh"],
        win32: ["irm https://omp.sh/install.ps1 | iex"],
        any: ["bun install -g @oh-my-pi/pi-coding-agent"],
      },
      url: "https://omp.sh",
    },
    supportsProfile: false,
    platforms: ["darwin", "linux", "win32"],
    tier: "core",
    passthrough: [
      {
        flag: "--api-key",
        action: "warn",
        message:
          "--api-key did not override the provider key in testing; the OmniRoute session key stays in use",
      },
    ],
  },
  plan(ctx) {
    const notes = [];
    const warnings = [];
    const model = gatedToolModel(ctx, MODEL_GATE, notes);
    const rows = injectRows(ctx);
    const extension = piExtension({
      tool: "omp",
      models: rows.map(buildModel),
      baseUrl: ensureV1(ctx.gateway.rootUrl),
      apiKey: KEY_ENV,
    });
    const noAuth = ctx.auth.source === "none";
    const argv = buildArgv(ctx.passthroughArgs, model, notes);
    notes.push(
      "omp models may not list the OmniRoute provider (extensions load only for sessions); use /model inside omp"
    );

    return createPlan("omp", {
      argv,
      env: {
        set: { OMNIROUTE_API_KEY: noAuth ? NO_AUTH_SENTINEL : ctx.auth.token },
        unset: [],
      },
      tempFiles: [
        { path: "omniroute.ts", root: "state", mode: 0o600, format: "ts", contents: extension },
        {
          path: "omp-overlay.yml",
          mode: 0o600,
          format: "yaml",
          contents: ctx.util.yaml({ startup: { checkUpdate: false } }),
        },
      ],
      needsTempDir: true,
      secretSites: keyEnvSites(noAuth),
      notes,
      warnings,
      modelList: injectModelList(ctx, rows.length),
    });
  },
});
