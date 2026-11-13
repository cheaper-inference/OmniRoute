// Frozen LaunchContext fixtures for adapter golden tests (architecture sections 2, 5.1, 16.2).
// Pure: builds data only, never reads the real HOME, env or filesystem.

import {
  NO_AUTH_SENTINEL,
  PLACEHOLDERS,
  createContextUtil,
  deepFreeze,
  selectView,
} from "../../../../../bin/cli/launch/contract.mjs";

/** Catalog rows covering the cases goldens need: known/unknown/small context, combo, no tools. */
export const FIXTURE_ROWS = Object.freeze([
  {
    id: "anthropic/claude-sonnet-4-6",
    label: "Claude Sonnet 4.6",
    contextTokens: 200000,
    maxOutputTokens: 64000,
    capabilities: ["tool_calling", "vision", "reasoning"],
    kind: "model",
  },
  {
    id: "openai/gpt-5.2",
    label: "GPT-5.2",
    contextTokens: 400000,
    maxOutputTokens: 128000,
    capabilities: ["tool_calling", "reasoning"],
    kind: "model",
  },
  {
    id: "mystery/unknown-context",
    label: "Unknown Context",
    capabilities: ["tool_calling"],
    kind: "model",
  },
  {
    id: "small/ctx-32k",
    label: "Small 32k",
    contextTokens: 32768,
    maxOutputTokens: 8192,
    capabilities: ["tool_calling"],
    kind: "model",
  },
  {
    id: "fastest",
    label: "Combo fastest",
    contextTokens: 128000,
    capabilities: ["tool_calling"],
    kind: "combo",
  },
  {
    id: "plain/no-tools",
    label: "No Tools",
    contextTokens: 128000,
    capabilities: [],
    kind: "model",
  },
]);

/** Default view spec: every chat row, catalog order. */
export const FIXTURE_VIEW_SPEC = Object.freeze({ name: "fixture", filter: {}, order: "catalog" });

const HOME_BY_PLATFORM = {
  linux: "/home/fixture",
  darwin: "/Users/fixture",
  win32: "C:\\Users\\fixture",
};

/**
 * Build a deep-frozen LaunchContext.
 *
 * @param {object} [overrides]
 * @param {"linux"|"darwin"|"win32"} [overrides.platform] default "linux"
 * @param {string} [overrides.home] default per platform
 * @param {Record<string,string>} [overrides.env] merged over a minimal fixture env
 * @param {object[]} [overrides.rows] catalog rows fed to selectView (default FIXTURE_ROWS)
 * @param {object} [overrides.viewSpec] ViewSelectSpec (pass the adapter's modelList.view)
 * @param {{favorites?:string[],recent?:string[]}} [overrides.prefs]
 * @param {string|null} [overrides.model] chosen row id; null = no model; default first view row
 * @param {string} [overrides.tool] tool id, used for the default binary path
 * @param {string} [overrides.binary] resolved command (absolute path or bare name)
 * @param {boolean} [overrides.shell] win32 .cmd shim
 * @param {string} [overrides.version] tool version
 * @param {Record<string,boolean>} [overrides.features] resolved version features
 * @param {string[]} [overrides.args] user passthrough args (after `--`, mergeJson flags removed)
 * @param {Record<string,unknown>} [overrides.passthroughJson] parsed mergeJson values
 * @param {string} [overrides.profile]
 * @param {string} [overrides.cwd]
 * @param {string} [overrides.rootUrl] default http://127.0.0.1:20128
 * @param {"auto-started"|"external-local"|"remote"} [overrides.origin]
 * @param {object} [overrides.settings] merged over default LaunchSettings
 */
export function fixtureCtx(overrides = {}) {
  const platform = overrides.platform ?? "linux";
  const homeDir = overrides.home ?? HOME_BY_PLATFORM[platform];
  const tool = overrides.tool ?? "fixture-tool";
  const defaultEnv =
    platform === "win32"
      ? {
          PATH: "C:\\Windows\\System32",
          USERPROFILE: homeDir,
          APPDATA: `${homeDir}\\AppData\\Roaming`,
        }
      : { PATH: "/usr/local/bin:/usr/bin:/bin", HOME: homeDir, LANG: "en_US.UTF-8" };

  const selection = selectView(
    overrides.rows ?? FIXTURE_ROWS,
    overrides.viewSpec ?? FIXTURE_VIEW_SPEC,
    overrides.prefs ?? {}
  );
  const view = {
    name: (overrides.viewSpec ?? FIXTURE_VIEW_SPEC).name,
    hash: selection.hash,
    rows: selection.rows,
  };

  let model;
  if (overrides.model === null) model = undefined;
  else if (typeof overrides.model === "string") {
    model = view.rows.find((row) => row.id === overrides.model);
    if (!model) {
      throw new Error(`fixtureCtx: model ${overrides.model} is not in the view`);
    }
  } else model = view.rows[0];

  const binary =
    overrides.binary ??
    (platform === "win32" ? `C:\\Program Files\\${tool}\\${tool}.exe` : `/usr/local/bin/${tool}`);

  const ctx = {
    platform,
    homeDir,
    baseEnv: { ...defaultEnv, ...(overrides.env || {}) },
    gateway: {
      rootUrl: overrides.rootUrl ?? "http://127.0.0.1:20128",
      origin: overrides.origin ?? "auto-started",
      version: "3.8.54",
    },
    auth: {
      token: PLACEHOLDERS.TOKEN,
      source: "session",
      sessionId: "fixturesession0001",
      sentinel: NO_AUTH_SENTINEL,
    },
    view,
    tool: {
      command: binary,
      shell: overrides.shell ?? false,
      version: overrides.version ?? "1.0.0",
      features: { ...(overrides.features || {}) },
    },
    passthroughArgs: [...(overrides.args || [])],
    passthroughJson: { ...(overrides.passthroughJson || {}) },
    settings: { summary: true, privateMode: false, ...(overrides.settings || {}) },
    util: createContextUtil(),
  };
  if (model) ctx.model = model;
  if (overrides.profile !== undefined) ctx.profile = overrides.profile;
  if (overrides.cwd !== undefined) ctx.cwd = overrides.cwd;
  return deepFreeze(ctx);
}
