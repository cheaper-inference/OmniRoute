// bin/cli/launch/contract.mjs: the frozen launcher contract (architecture sections 1, 2, 10, 13.1).
//
// The ONLY module both core (bin/cli/launch/core/*) and adapters (bin/cli/launch/adapters/*)
// import. Types live in contract.d.ts (mirrored here as JSDoc typedefs); this file holds constants
// and pure helpers only: no I/O, no clock, no randomness, no process reads.
//
// Imports: ZERO, with exactly two documented exceptions (section 1 rule 1). Both are pure,
// spawn-free modules re-exported so adapters never import anything but this file:
//   1. ../utils/claudeWindowEnv.mjs           (claudeWindowEnv)
//   2. ../../../src/shared/launch/viewSelect.ts (selectView, viewHash, the shared view selector)
// tests/unit/cli/launch/boundary.test.ts asserts no other import appears here.

export { claudeWindowEnv } from "../utils/claudeWindowEnv.mjs";
export {
  selectView,
  viewHash,
  globMatch,
  WIRE_PROTOCOLS,
  VIEW_CATALOG_KINDS,
} from "../../../src/shared/launch/viewSelect.ts";

/** @typedef {import("./contract.d.ts").LaunchAdapter} LaunchAdapter */
/** @typedef {import("./contract.d.ts").LaunchContext} LaunchContext */
/** @typedef {import("./contract.d.ts").LaunchPlan} LaunchPlan */
/** @typedef {import("./contract.d.ts").LaunchModelView} LaunchModelView */
/** @typedef {import("./contract.d.ts").TempFileSpec} TempFileSpec */
/** @typedef {import("./contract.d.ts").PreflightCheck} PreflightCheck */
/** @typedef {import("./contract.d.ts").TeardownStep} TeardownStep */
/** @typedef {import("./contract.d.ts").PostExitCheck} PostExitCheck */
/** @typedef {import("./contract.d.ts").PassthroughRule} PassthroughRule */
/** @typedef {import("./contract.d.ts").LaunchErrorCode} LaunchErrorCode */

// ---------- versions (13.1) ----------

/** Adapter contract version. Minor bumps are additive only. */
export const ADAPTER_CONTRACT = Object.freeze({ major: 1, minor: 0 });
/** Alias of ADAPTER_CONTRACT (contract.d.ts `contractVersion`). */
export const contractVersion = ADAPTER_CONTRACT;
/** `LaunchPlan.planVersion`, also the top-level marker of `--dry-run --json`. */
export const PLAN_VERSION = 1;

// ---------- placeholders (section 2, "Why placeholders") ----------

/**
 * The ONLY placeholders execute substitutes. Matching is exact (`${TMP}` and nothing else), so
 * tool-literal syntax such as `${OMNIROUTE_API_KEY:-omniroute-local}` (openclaw), `$VAR` (crush)
 * or `${{ secrets.X }}` (continue) passes through to the tool untouched.
 */
export const PLACEHOLDERS = Object.freeze({
  TMP: "${TMP}",
  STATE: "${STATE}",
  TOKEN: "${TOKEN}",
  /** Resolved tool command; valid in TeardownStep.argv only. */
  TOOL: "${TOOL}",
});

/** Non-secret key for tools that hide a provider with an empty key (pi, codex env_key, qwen). */
export const NO_AUTH_SENTINEL = "omniroute-no-auth";

/** Platforms an adapter may declare. */
export const PLATFORMS = Object.freeze(["darwin", "linux", "win32"]);

// ---------- errors (section 10) ----------

/** Error code -> process exit code. `null` = the child's own code is kept (warnings). */
export const EXIT_CODES = Object.freeze({
  UsageError: 2,
  ModelRequired: 2,
  ModelNotFound: 2,
  ModelUnsuitable: 2,
  ConfigConflict: 2,
  UnsupportedPlatform: 2,
  AuthFailed: 77,
  GatewayUnreachable: 69,
  ToolVersionTooOld: 69,
  GatewayTooOld: 69,
  FeatureUnsupported: 69,
  PreflightFailed: 69,
  NoProviders: 69,
  ViewInvalid: 70,
  Internal: 70,
  PortInUse: 75,
  GatewayStartTimeout: 75,
  StateLocked: 75,
  ToolNotFound: 127,
  BudgetExceeded: null,
});

/** Every error code, as a frozen name -> name map (`ERROR_CODES.ModelRequired`). */
export const ERROR_CODES = Object.freeze(
  Object.fromEntries(Object.keys(EXIT_CODES).map((code) => [code, code]))
);

/** Codes an adapter's plan() may throw (section 2 `LaunchAdapter.plan`). */
export const ADAPTER_ERROR_CODES = Object.freeze([
  "ModelRequired",
  "ModelUnsuitable",
  "ConfigConflict",
  "UnsupportedPlatform",
  "ModelNotFound",
]);

export class LaunchError extends Error {
  /**
   * @param {LaunchErrorCode} code one of ERROR_CODES
   * @param {string} message user-facing, printed as `omnirouter: <message>`
   * @param {{ hint?: string, cause?: unknown }} [options]
   */
  constructor(code, message, options = {}) {
    if (!Object.prototype.hasOwnProperty.call(EXIT_CODES, code)) {
      throw new TypeError(`Unknown LaunchError code: ${String(code)}`);
    }
    super(message, options.cause === undefined ? undefined : { cause: options.cause });
    this.name = "LaunchError";
    this.code = code;
    if (options.hint !== undefined) this.hint = options.hint;
  }

  /** Exit code for this error; `null` means keep the child's code. */
  get exitCode() {
    return EXIT_CODES[this.code];
  }

  /** `--json` error shape: `{error:{code,message,hint}}`. */
  toJSON() {
    const error = { code: this.code, message: this.message };
    if (this.hint !== undefined) error.hint = this.hint;
    return { error };
  }
}

/** @returns {boolean} true for a LaunchError (also across module copies). */
export function isLaunchError(value) {
  return (
    value instanceof LaunchError ||
    (value instanceof Error &&
      value.name === "LaunchError" &&
      typeof value.code === "string" &&
      Object.prototype.hasOwnProperty.call(EXIT_CODES, value.code))
  );
}

// ---------- URL helpers ----------

/** Remove every trailing "/" (no regex, so no ReDoS surface). */
export function stripTrailingSlash(value) {
  const s = String(value ?? "");
  let end = s.length;
  while (end > 0 && s.charCodeAt(end - 1) === 47) end--;
  return end === s.length ? s : s.slice(0, end);
}

/** Root URL -> ".../v1" exactly once (run.mjs ensureV1BaseUrl). */
export function ensureV1(rootUrl) {
  const normalized = stripTrailingSlash(rootUrl);
  return normalized.endsWith("/v1") ? normalized : `${normalized}/v1`;
}

// ---------- path placeholders ----------

function assertRelativePath(name) {
  const s = String(name ?? "");
  if (s === "" || s.startsWith("/") || s.startsWith("\\") || /^[A-Za-z]:/.test(s)) {
    throw new LaunchError("Internal", `Temp path must be relative: ${JSON.stringify(s)}`);
  }
  const parts = s.split(/[\\/]/);
  if (parts.some((part) => part === ".." || part === "")) {
    throw new LaunchError("Internal", `Temp path must not contain "..": ${JSON.stringify(s)}`);
  }
  return parts.join("/");
}

/** "${TMP}/<name>", removed after exit. `name` is relative, may contain subdirs. */
export function tempPath(name) {
  return `${PLACEHOLDERS.TMP}/${assertRelativePath(name)}`;
}

/** "${STATE}/<name>": DATA_DIR/launch/<tool>/<cwdHash>/, kept across launches. */
export function statePath(name) {
  return `${PLACEHOLDERS.STATE}/${assertRelativePath(name)}`;
}

// ---------- serializers ----------

function isPlainObject(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function canonicalize(value, seen) {
  if (value === null || typeof value !== "object") {
    if (typeof value === "number" && !Number.isFinite(value)) {
      throw new LaunchError("Internal", "Cannot serialize a non-finite number");
    }
    if (typeof value === "bigint" || typeof value === "function" || typeof value === "symbol") {
      throw new LaunchError("Internal", `Cannot serialize a ${typeof value}`);
    }
    return value;
  }
  if (seen.has(value)) throw new LaunchError("Internal", "Cannot serialize a cyclic value");
  seen.add(value);
  let out;
  if (Array.isArray(value)) {
    out = value.map((entry) => (entry === undefined ? null : canonicalize(entry, seen)));
  } else {
    out = {};
    for (const key of Object.keys(value).sort()) {
      if (value[key] === undefined) continue;
      out[key] = canonicalize(value[key], seen);
    }
  }
  seen.delete(value);
  return out;
}

/**
 * Canonical JSON: object keys sorted, `undefined` dropped, non-finite numbers rejected.
 * @param {unknown} value
 * @param {{ indent?: number }} [options] indent 0 (default) = compact, else pretty with N spaces
 */
export function json(value, options = {}) {
  const indent = options.indent ?? 0;
  return JSON.stringify(canonicalize(value, new Set()), null, indent > 0 ? indent : undefined);
}

const TOML_BARE_KEY = /^[A-Za-z0-9_-]+$/;

/** TOML basic string (double quoted, escaped). */
export function tomlString(value) {
  let out = '"';
  for (const ch of String(value)) {
    const code = ch.codePointAt(0);
    if (ch === '"') out += '\\"';
    else if (ch === "\\") out += "\\\\";
    else if (ch === "\n") out += "\\n";
    else if (ch === "\r") out += "\\r";
    else if (ch === "\t") out += "\\t";
    else if (code < 0x20 || code === 0x7f) out += `\\u${code.toString(16).padStart(4, "0")}`;
    else out += ch;
  }
  return `${out}"`;
}

/** TOML key: dotted path, each segment bare when possible, quoted otherwise. */
export function tomlKey(key) {
  const segments = Array.isArray(key) ? key : String(key).split(".");
  if (segments.length === 0 || segments.some((segment) => String(segment) === "")) {
    throw new LaunchError("Internal", `Invalid TOML key: ${JSON.stringify(key)}`);
  }
  return segments
    .map((segment) => (TOML_BARE_KEY.test(String(segment)) ? String(segment) : tomlString(segment)))
    .join(".");
}

/** TOML scalar or inline array/table value. */
export function tomlValue(value) {
  if (typeof value === "boolean") return String(value);
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new LaunchError("Internal", "TOML number must be finite");
    return String(value);
  }
  if (typeof value === "string") return tomlString(value);
  if (Array.isArray(value)) return `[${value.map(tomlValue).join(", ")}]`;
  if (isPlainObject(value)) {
    const entries = Object.keys(value)
      .filter((k) => value[k] !== undefined)
      .map((k) => `${tomlKey([k])} = ${tomlValue(value[k])}`);
    return entries.length === 0 ? "{}" : `{ ${entries.join(", ")} }`;
  }
  throw new LaunchError("Internal", `Unsupported TOML value: ${typeof value}`);
}

/**
 * `key=value` for a codex `-c` flag (launch-codex.mjs tomlAssign): `toml("a.b", "x")` ->
 * `a.b="x"`. The dotted key is split on "." and each segment quoted when not bare.
 */
export function toml(key, value) {
  return `${tomlKey(key)}=${tomlValue(value)}`;
}
export const tomlAssign = toml;

const YAML_PLAIN_SAFE = /^[A-Za-z_][A-Za-z0-9_./-]*$/;
const YAML_RESERVED = new Set(["true", "false", "yes", "no", "on", "off", "null", "y", "n", "~"]);

function yamlScalar(value) {
  if (value === null) return "null";
  if (typeof value === "boolean") return String(value);
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new LaunchError("Internal", "YAML number must be finite");
    return String(value);
  }
  const s = String(value);
  if (YAML_PLAIN_SAFE.test(s) && !YAML_RESERVED.has(s.toLowerCase())) return s;
  return JSON.stringify(s); // JSON strings are valid YAML double-quoted scalars
}

function yamlKey(key) {
  return yamlScalar(String(key));
}

function yamlLines(value, indent) {
  const pad = " ".repeat(indent);
  if (Array.isArray(value)) {
    if (value.length === 0) return [`${pad}[]`];
    const lines = [];
    for (const entry of value) {
      if (
        (isPlainObject(entry) && Object.keys(entry).length > 0) ||
        (Array.isArray(entry) && entry.length > 0)
      ) {
        const nested = yamlLines(entry, indent + 2);
        lines.push(`${pad}- ${nested[0].slice(indent + 2)}`, ...nested.slice(1));
      } else {
        lines.push(`${pad}- ${yamlInline(entry)}`);
      }
    }
    return lines;
  }
  if (isPlainObject(value)) {
    const keys = Object.keys(value).filter((k) => value[k] !== undefined);
    if (keys.length === 0) return [`${pad}{}`];
    const lines = [];
    for (const key of keys) {
      const entry = value[key];
      const complex =
        (isPlainObject(entry) && Object.keys(entry).length > 0) ||
        (Array.isArray(entry) && entry.length > 0);
      if (complex) lines.push(`${pad}${yamlKey(key)}:`, ...yamlLines(entry, indent + 2));
      else lines.push(`${pad}${yamlKey(key)}: ${yamlInline(entry)}`);
    }
    return lines;
  }
  return [`${pad}${yamlScalar(value)}`];
}

function yamlInline(value) {
  if (Array.isArray(value)) return "[]";
  if (isPlainObject(value)) return "{}";
  if (value === undefined) return "null";
  if (typeof value === "function" || typeof value === "symbol" || typeof value === "bigint") {
    throw new LaunchError("Internal", `Cannot serialize a ${typeof value} to YAML`);
  }
  return yamlScalar(value);
}

/**
 * Safe block YAML: keys in insertion order (callers control order for readability), strings
 * double-quoted unless plainly safe, `undefined` keys dropped. Ends with a newline.
 */
export function yaml(value) {
  return `${yamlLines(value, 0).join("\n")}\n`;
}

const DOTENV_KEY = /^[A-Za-z_][A-Za-z0-9_]*$/;

/** dotenv file body (aider `--env-file`): `KEY="value"` lines, values JSON-escaped. */
export function dotenv(entries) {
  const lines = [];
  for (const key of Object.keys(entries)) {
    if (entries[key] === undefined) continue;
    if (!DOTENV_KEY.test(key)) throw new LaunchError("Internal", `Invalid env key: ${key}`);
    lines.push(`${key}=${JSON.stringify(String(entries[key]))}`);
  }
  return lines.length > 0 ? `${lines.join("\n")}\n` : "";
}

/** Valid env variable name (plan validation and adapters). */
export function isValidEnvKey(key) {
  return typeof key === "string" && DOTENV_KEY.test(key);
}

// ---------- pure data helpers ----------

/**
 * Deep merge for JSON-like data: plain objects merge recursively, everything else (arrays
 * included) is replaced by `override`. Inputs are not mutated.
 */
export function deepMerge(base, override) {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override === undefined ? clone(base) : clone(override);
  }
  const out = clone(base);
  for (const key of Object.keys(override)) {
    if (override[key] === undefined) continue;
    out[key] = key in out ? deepMerge(out[key], override[key]) : clone(override[key]);
  }
  return out;
}

function clone(value) {
  if (Array.isArray(value)) return value.map(clone);
  if (isPlainObject(value)) {
    const out = {};
    for (const key of Object.keys(value)) out[key] = clone(value[key]);
    return out;
  }
  return value;
}

/** Recursively freeze plain objects and arrays; returns the same value. */
export function deepFreeze(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const key of Object.keys(value)) deepFreeze(value[key]);
  }
  return value;
}

/**
 * Find the first occurrence of any of `names` in argv, supporting `--flag value`, `--flag=value`
 * and stopping at a bare `--`. Returns `{ index, flag, value }` or `null`.
 * @param {ReadonlyArray<string>} args
 * @param {string | string[]} names e.g. ["-m", "--model"]
 * @param {{ takesValue?: boolean }} [options] default true
 */
export function findFlag(args, names, options = {}) {
  const takesValue = options.takesValue !== false;
  const wanted = Array.isArray(names) ? names : [names];
  for (let i = 0; i < args.length; i++) {
    const arg = String(args[i]);
    if (arg === "--") return null;
    for (const name of wanted) {
      if (arg === name) {
        return { index: i, flag: name, value: takesValue ? args[i + 1] : undefined };
      }
      if (takesValue && name.startsWith("--") && arg.startsWith(`${name}=`)) {
        return { index: i, flag: name, value: arg.slice(name.length + 1) };
      }
    }
  }
  return null;
}

/** True when the user already passed one of `names` (skip-ours rule: qwen, pi, opencode). */
export function hasFlag(args, names, options) {
  return findFlag(args, names, options) !== null;
}

/** Row id -> display label fallback. */
export function rowLabel(row) {
  return row && typeof row.label === "string" && row.label !== "" ? row.label : row?.id;
}

/**
 * The rows an inject adapter writes: `ctx.view.rows` cut by `injectLimit`, never re-filtered
 * (boundary invariant, section 16.2 step 1).
 * @param {LaunchContext} ctx
 * @param {number} [injectLimit]
 */
export function injectRows(ctx, injectLimit) {
  const rows = ctx.view.rows;
  return typeof injectLimit === "number" && injectLimit >= 0
    ? rows.slice(0, injectLimit)
    : rows.slice();
}

// ---------- plan + adapter builders ----------

/**
 * A complete LaunchPlan with every required field defaulted. Adapters spread their parts over it.
 * @param {string} tool
 * @param {Partial<LaunchPlan>} [parts]
 * @returns {LaunchPlan}
 */
export function createPlan(tool, parts = {}) {
  const plan = {
    planVersion: PLAN_VERSION,
    tool,
    argv: [],
    env: { set: {}, unset: [] },
    tempFiles: [],
    needsTempDir: false,
    secretSites: [],
    notes: [],
    warnings: [],
    preflight: [],
    teardown: [],
    postExitChecks: [],
    modelList: { strategy: "inject", viewHash: "", injected: 0 },
    cleanup: { removeTempDir: true, revokeSession: true },
    ...parts,
  };
  plan.env = { set: { ...(parts.env?.set || {}) }, unset: [...(parts.env?.unset || [])] };
  if (!("needsTempDir" in parts)) {
    plan.needsTempDir =
      plan.tempFiles.some((file) => (file.root ?? "tmp") === "tmp") ||
      JSON.stringify([plan.argv, plan.env]).includes(PLACEHOLDERS.TMP);
  }
  return plan;
}

/**
 * Every place "${TOKEN}" appears in a plan, as secretSites entries (env key, argv index, file
 * path). Adapters may use it to fill `secretSites`; validation compares against it.
 * @param {LaunchPlan} plan
 * @returns {import("./contract.d.ts").SecretSite[]}
 */
export function findTokenSites(plan) {
  /** @type {import("./contract.d.ts").SecretSite[]} */
  const sites = [];
  for (const [key, value] of Object.entries(plan.env?.set || {})) {
    if (String(value).includes(PLACEHOLDERS.TOKEN)) sites.push({ kind: "env", key });
  }
  (plan.argv || []).forEach((arg, index) => {
    if (String(arg).includes(PLACEHOLDERS.TOKEN)) sites.push({ kind: "arg", key: String(index) });
  });
  for (const file of plan.tempFiles || []) {
    if (String(file.contents).includes(PLACEHOLDERS.TOKEN)) {
      sites.push({ kind: "file", key: file.path });
    }
  }
  return sites;
}

const STRATEGIES = new Set(["inject", "server-view", "both"]);
const PROTOCOLS = new Set([
  "anthropic-messages",
  "openai-responses",
  "openai-chat",
  "gemini-native",
]);

/**
 * Validate the static shape of an adapter and freeze it. Throws TypeError on a malformed
 * adapter (a programming error, caught by tests). Does not call plan().
 * @param {LaunchAdapter} adapter
 * @returns {Readonly<LaunchAdapter>}
 */
export function defineAdapter(adapter) {
  const fail = (message) => {
    throw new TypeError(`defineAdapter(${adapter?.id ?? "?"}): ${message}`);
  };
  if (!adapter || typeof adapter !== "object") fail("adapter must be an object");
  if (adapter.contract?.major !== ADAPTER_CONTRACT.major) fail("contract.major must be 1");
  if (
    !Number.isInteger(adapter.contract?.minor) ||
    adapter.contract.minor > ADAPTER_CONTRACT.minor
  ) {
    fail(`contract.minor must be an integer <= ${ADAPTER_CONTRACT.minor}`);
  }
  if (typeof adapter.id !== "string" || !/^[a-z0-9][a-z0-9-]*$/.test(adapter.id)) {
    fail("id must be a lowercase manifest id");
  }
  if (!Array.isArray(adapter.binaries) || adapter.binaries.length === 0) {
    fail("binaries must be a non-empty array");
  }
  if (typeof adapter.plan !== "function") fail("plan must be a function");
  const caps = adapter.capabilities;
  if (!caps || typeof caps !== "object") fail("capabilities is required");
  if (!PROTOCOLS.has(caps.protocol)) fail(`unknown protocol ${caps.protocol}`);
  if (!caps.modelList || !STRATEGIES.has(caps.modelList.strategy)) {
    fail("capabilities.modelList.strategy must be inject | server-view | both");
  }
  if (!caps.modelList.view || typeof caps.modelList.view.name !== "string") {
    fail("capabilities.modelList.view.name is required");
  }
  if (!["required", "optional", "none"].includes(caps.model)) fail("capabilities.model is invalid");
  if (!caps.install || typeof caps.install !== "object") fail("capabilities.install is required");
  if (typeof caps.supportsProfile !== "boolean") fail("capabilities.supportsProfile is required");
  if (!Array.isArray(caps.platforms) || caps.platforms.some((p) => !PLATFORMS.includes(p))) {
    fail("capabilities.platforms must list darwin | linux | win32");
  }
  if (!["core", "supported", "later"].includes(caps.tier)) fail("capabilities.tier is invalid");
  for (const rule of caps.passthrough || []) {
    if (
      typeof rule.flag !== "string" ||
      !["reject", "warn", "mergeJson", "owned"].includes(rule.action)
    ) {
      fail(`invalid passthrough rule ${JSON.stringify(rule)}`);
    }
  }
  return deepFreezeData(adapter);
}

/** Freeze data properties but leave functions callable (freezing a function is harmless too). */
function deepFreezeData(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const key of Object.keys(value)) {
      if (typeof value[key] !== "function") deepFreezeData(value[key]);
    }
  }
  return value;
}

/**
 * The `ctx.util` bag core hands to adapters. Exported so core and fixtures build the same one.
 * @returns {LaunchContext["util"]}
 */
export function createContextUtil() {
  return Object.freeze({
    tempPath,
    statePath,
    ensureV1,
    toml,
    json,
    yaml,
  });
}
