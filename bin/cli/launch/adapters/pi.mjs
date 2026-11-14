// Pi coding agent adapter Pure: builds a plan, touches nothing.
// Mechanism: a launcher-owned extension file loaded with `-e` registers the
// "omniroute" provider; the key travels only in env OMNIROUTE_API_KEY (Pi's $NAME interpolation).

import { NO_AUTH_SENTINEL, createPlan, defineAdapter, findFlag, injectRows } from "../contract.mjs";
import { injectModelList, keyEnvSites, piExtension, piModelEntry } from "./_shared/inject.mjs";
import { gatedToolModel, toolChatCapabilities } from "./_shared/pi-capabilities.mjs";

const DISPLAY_NAME = "Pi";
const MIN_VERSION = "0.85.1";
const MIN_CONTEXT = 32000;
const INSTALL_HINT = "npm install -g --ignore-scripts @earendil-works/pi-coding-agent";

const MODEL_GATE = {
  displayName: DISPLAY_NAME,
  min: MIN_VERSION,
  hint: INSTALL_HINT,
  minContext: MIN_CONTEXT,
};

function buildModel(row) {
  const knownContext = typeof row.contextTokens === "number";
  const contextWindow = knownContext ? row.contextTokens : 128000;
  const maxTokens =
    row.maxOutputTokens ?? (knownContext ? Math.min(32000, Math.floor(contextWindow / 4)) : 16384);
  return piModelEntry(row, { contextWindow, maxTokens });
}

function buildArgv(ctx, model) {
  const argv = ["-e", ctx.util.statePath("omniroute.ts")];
  const userPicksModel =
    findFlag(ctx.passthroughArgs, "--provider") !== null ||
    findFlag(ctx.passthroughArgs, "--model") !== null;
  if (!userPicksModel) argv.push("--provider", "omniroute", "--model", model.id);
  argv.push(...ctx.passthroughArgs);
  return argv;
}

export default defineAdapter({
  contract: { major: 1, minor: 1 },
  id: "pi",
  displayName: DISPLAY_NAME,
  binaries: ["pi"],
  capabilities: {
    ...toolChatCapabilities("pi", {
      minContext: MIN_CONTEXT,
      versionGate: { args: ["--version"], min: MIN_VERSION },
    }),
    install: {
      commands: {
        any: [INSTALL_HINT],
        darwin: ["curl -fsSL https://pi.dev/install.sh | sh"],
        linux: ["curl -fsSL https://pi.dev/install.sh | sh"],
      },
      url: "https://pi.dev",
    },
    supportsProfile: false,
    platforms: ["darwin", "linux", "win32"],
    tier: "core",
    passthrough: [
      {
        flag: "--api-key",
        action: "warn",
        message: "--api-key replaces the OmniRoute session key and puts a key in argv",
      },
    ],
  },
  plan(ctx) {
    const warnings = [];
    const notes = [];
    const model = gatedToolModel(ctx, MODEL_GATE, notes);
    const rows = injectRows(ctx);
    const keyless = ctx.auth.source === "none";
    const contents = piExtension({
      tool: "pi",
      models: rows.map(buildModel),
      baseUrl: ctx.util.ensureV1(ctx.gateway.rootUrl),
      apiKey: "$OMNIROUTE_API_KEY",
    });

    return createPlan("pi", {
      argv: buildArgv(ctx, model),
      env: {
        set: {
          OMNIROUTE_API_KEY: keyless ? NO_AUTH_SENTINEL : ctx.auth.token,
          PI_SKIP_VERSION_CHECK: "1",
        },
        unset: [],
      },
      tempFiles: [{ path: "omniroute.ts", root: "state", mode: 0o600, format: "ts", contents }],
      secretSites: keyEnvSites(keyless),
      notes,
      warnings,
      modelList: injectModelList(ctx, rows.length),
    });
  },
});
