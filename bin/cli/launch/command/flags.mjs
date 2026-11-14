// bin/cli/launch/command/flags.mjs: commander opts + positionals -> `runLaunch` flags.

import { LaunchError } from "../contract.mjs";

/** Root-program options a user may also type after `launch` (program.mjs declares them). */
const GLOBAL_PASSTHROUGH = ["apiKey", "baseUrl", "context"];

function parseIntFlag(value, flag) {
  if (value === undefined) return undefined;
  const n = Number(value);
  if (!Number.isInteger(n) || n < 0) {
    throw new LaunchError("UsageError", `${flag} must be a non-negative integer, got ${value}`);
  }
  return n;
}

const pass = (opts, key) => opts[key];
const bool = (opts, key) => Boolean(opts[key]);

/**
 * `runLaunch` flag name -> reader of the commander opts, in the flags object's key order.
 * Readers returning undefined leave the key out.
 */
const FLAG_FIELDS = [
  ["model", pass],
  ["provider", pass],
  ["pick", bool],
  ["allModels", bool],
  ["favorite", bool],
  ["unfavorite", bool],
  ["profile", pass],
  ["port", pass],
  ["remote", pass],
  ["baseUrl", pass],
  ["context", pass],
  ["apiKey", pass],
  ["token", pass],
  ["apiKeyEnv", pass],
  ["start", (opts) => opts.start !== false],
  ["noStart", (opts) => opts.start === false],
  ["keepGateway", bool],
  ["startTimeoutMs", (opts) => parseIntFlag(opts.startTimeout, "--start-timeout")],
  ["inheritEnv", bool],
  ["dryRun", bool],
  ["json", bool],
  ["yes", bool],
  ["doctor", bool],
  ["cleanup", bool],
  ["tag", pass],
  ["summary", (opts) => opts.summary !== false],
  ["setDefault", bool],
  ["private", bool],
  ["budget", pass],
  ["budgetFallback", pass],
  ["mode", pass],
  ["compression", pass],
  ["mcp", pass],
  ["statusline", pass],
  ["exec", pass],
  ["install", pass],
];

function rootOf(cmd) {
  let node = cmd;
  while (node?.parent) node = node.parent;
  return node;
}

function cliValue(node, key) {
  return node.getOptionValueSource?.(key) === "cli" ? node.opts()[key] : undefined;
}

function pickCliValues(node, keys, out) {
  for (const key of keys) {
    const value = cliValue(node, key);
    if (value !== undefined) out[key] = value;
  }
}

/** Root options typed on the command line (not env defaults) fill missing launch options. */
export function globalOverrides(cmd, opts) {
  const out = {};
  const missing = (key) => opts[key] === undefined && out[key] === undefined;
  for (let node = cmd.parent; node; node = node.parent) {
    pickCliValues(node, GLOBAL_PASSTHROUGH.filter(missing), out);
  }
  return out;
}

/** Number of operands commander parsed after a literal `--` in the raw argv. */
export function argsAfterDashDash(cmd) {
  const raw = rootOf(cmd).rawArgs || [];
  const index = raw.indexOf("--");
  return index === -1 ? 0 : raw.length - index - 1;
}

/** Positionals split at `--`: `before` are launcher words, `after` go to the tool. */
function splitPositionals(tool, toolArgs, afterDashDash) {
  const positionals = [...(tool === undefined ? [] : [tool]), ...(toolArgs || [])];
  const splitAt = positionals.length - Math.min(afterDashDash, positionals.length);
  return { before: positionals.slice(0, splitAt), after: positionals.slice(splitAt) };
}

/** Last `@name` word is the preset; every other word stays in order. */
function takePreset(before) {
  let preset;
  const words = [];
  for (const word of before) {
    if (word.startsWith("@") && word.length > 1) preset = word;
    else words.push(word);
  }
  return { preset, words };
}

function assertNoExtra(extra, legacy) {
  if (extra.length === 0 || legacy) return;
  throw new LaunchError("UsageError", `unexpected argument ${JSON.stringify(extra[0])}`, {
    hint: "put arguments for the tool after --, e.g. omnirouter launch claude -- --help",
  });
}

function flagsFromOpts(opts) {
  const flags = {};
  for (const [key, read] of FLAG_FIELDS) {
    const value = read(opts, key);
    if (value !== undefined) flags[key] = value;
  }
  return flags;
}

/**
 * Commander opts + positionals -> `runLaunch` flags (camelCase, `args` = tool argv).
 * @returns {{ toolId: string | undefined, flags: object }}
 */
export function buildLaunchFlags(tool, toolArgs, opts, { afterDashDash = 0, legacy = false } = {}) {
  const { before, after } = splitPositionals(tool, toolArgs, afterDashDash);
  const { preset, words } = takePreset(before);
  const [toolId, ...extra] = words;
  assertNoExtra(extra, legacy);
  const flags = flagsFromOpts(opts);
  if (preset !== undefined) flags.preset = preset;
  flags.args = [...(legacy ? extra : []), ...after];
  return { toolId, flags };
}
