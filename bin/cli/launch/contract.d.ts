// bin/cli/launch/contract.d.ts: launcher contract types (architecture section 2), contract 1.0.
// Frozen for every stream. Additive changes only (optional fields, optional methods): 13.1.

import type {
  ViewSelectSpec,
  WireProtocol,
  LaunchViewRow,
  ViewCatalogRow,
  ViewPreferences,
  ViewSelection,
  ViewCatalogKind,
} from "../../../src/shared/launch/viewSelect.ts";

export type {
  ViewSelectSpec,
  WireProtocol,
  LaunchViewRow,
  ViewCatalogRow,
  ViewPreferences,
  ViewSelection,
  ViewCatalogKind,
};

export type Platform = "darwin" | "linux" | "win32";

export interface ContractVersion {
  major: 1;
  minor: number;
}

/** Version of this contract; adapters declare `contract: { major: 1, minor: <= this.minor }`. */
export declare const ADAPTER_CONTRACT: Readonly<{ major: 1; minor: 0 }>;
export declare const contractVersion: Readonly<{ major: 1; minor: 0 }>;
export declare const PLAN_VERSION: 1;

// ---------- capability flags (static, declared by the adapter) ----------

export interface InstallRecipe {
  /** Shown verbatim on ToolNotFound; executed only behind --install (v1.x). */
  commands: Partial<Record<Platform | "any", string[]>>;
  url?: string;
}

export interface VersionGate {
  /** argv appended to the binary, e.g. ["--version"]. */
  args: string[];
  /** Regex source with one capture group for semver; default (\d+\.\d+\.\d+). */
  pattern?: string;
  /** Inclusive hard minimum; below it -> ToolVersionTooOld (exit 69). */
  min?: string;
  /** Below this: launch, but warn. */
  recommended?: string;
  /** Feature name -> first version that has it; core resolves to ctx.tool.features booleans. */
  features?: Record<string, string>;
}

export type ModelListStrategy = "inject" | "server-view" | "both";

/** Gateway-only presentation of a server-side view. Never used by injection. */
export interface ServerViewPresentation {
  prefix?: string;
  mode?: "replace" | "mirror";
  shape?: "openai" | "codex";
}

export interface ModelListSpec {
  strategy: ModelListStrategy;
  /** Shared, core-applied selection (filter -> order -> limit). */
  view: ViewSelectSpec;
  /** Only for "server-view" / "both". */
  serve?: ServerViewPresentation;
  /** For "inject" / "both": the hard row cap of the tool's picker or config. */
  injectLimit?: number;
}

export interface PassthroughRule {
  /** Option as the tool spells it, e.g. "--settings", "-c", "--model". */
  flag: string;
  /** Other spellings of the same option, e.g. ["-m"] for "--model". (Additive to section 2.) */
  aliases?: string[];
  /** Rule applies only when the flag's value starts with one of these, e.g. codex
   *  `-c model_provider=`. Absent = any value. (Additive to section 2.) */
  valuePrefixes?: string[];
  /** Flag takes a value (default true). Boolean flags like "--bare" set false. */
  takesValue?: boolean;
  /** reject: UsageError; warn: pass through + warning; mergeJson: core parses the value (file
   *  path or inline JSON), removes it from argv, hands it in ctx.passthroughJson; owned: the
   *  launcher sets this option, a user copy is ConfigConflict. */
  action: "reject" | "warn" | "mergeJson" | "owned";
  message?: string;
}

export interface AdapterCapabilities {
  protocol: WireProtocol;
  modelList: ModelListSpec;
  /** Picker hides models below this; plan() rejects an explicit --model below it. */
  minContextTokens?: number;
  model: "required" | "optional" | "none";
  versionGate?: VersionGate;
  install: InstallRecipe;
  supportsProfile: boolean;
  platforms: Platform[];
  tier: "core" | "supported" | "later";
  passthrough?: PassthroughRule[];
}

/** What core computes once per launch and hands to BOTH strategies. Pure data. */
export interface LaunchModelView {
  name: string;
  /** viewHash(ids): lowercase hex SHA-256 of JSON.stringify(ordered ids). */
  hash: string;
  rows: ReadonlyArray<LaunchViewRow>;
}

export type LaunchModelRow = LaunchModelView["rows"][number];

// ---------- the adapter ----------

export interface LaunchAdapter {
  contract: ContractVersion;
  /** Canonical manifest id (config/cli-tools-manifest.json `tools`). */
  id: string;
  /** Binary names to try in order. */
  binaries: string[];
  capabilities: AdapterCapabilities;
  /** PURE. May throw LaunchError(ModelRequired | ModelUnsuitable | ConfigConflict |
   *  UnsupportedPlatform | ModelNotFound). */
  plan(ctx: LaunchContext): LaunchPlan;
  toToolModelId?(catalogId: string, ctx: LaunchContext): string;
  exitHints?(exitCode: number, ctx: LaunchContext): string[];
  modelWarnings?(model: LaunchModelRow, ctx: LaunchContext): string[];
  diagnose?(ctx: LaunchContext): PreflightCheck[];
  planExec?(ctx: LaunchContext, prompt: string): LaunchPlan;
  statusLine?(ctx: LaunchContext): Record<string, unknown> | null;
  /** Reserved, not called in v1. */
  persist?: never;
  restore?: never;
}

// ---------- what core hands the adapter ----------

export interface LaunchSettings {
  model?: string;
  preset?: string;
  tag?: string;
  summary: boolean;
  privateMode: boolean;
  /** Reserved, parsed only to reject with "not yet supported" in v1. */
  budget?: unknown;
  mode?: unknown;
  compression?: unknown;
  mcp?: unknown;
  exec?: unknown;
}

export interface LaunchContextUtil {
  /** "${TMP}/<name>", removed after exit. */
  tempPath(name: string): string;
  /** "${STATE}/<name>": DATA_DIR/launch/<tool>/<cwdHash>/, kept across launches. */
  statePath(name: string): string;
  ensureV1(rootUrl: string): string;
  /** `key=value` TOML assignment (codex -c). */
  toml(key: string, v: string | number | boolean): string;
  /** Canonical JSON, sorted keys. */
  json(v: unknown, options?: { indent?: number }): string;
  /** Safe block YAML. */
  yaml(v: unknown): string;
}

export interface LaunchContext {
  readonly platform: Platform;
  readonly homeDir: string;
  /** Filtered by buildSafeCliLaunchEnv unless --inherit-env. Read-only copy. */
  readonly baseEnv: Readonly<Record<string, string>>;
  /** Working directory the tool will run in (for state hashing, workspace keys). Additive. */
  readonly cwd?: string;
  readonly gateway: {
    /** Root URL, no trailing slash, no /v1. */
    readonly rootUrl: string;
    readonly origin: "auto-started" | "external-local" | "remote";
    readonly version?: string;
  };
  readonly auth: {
    /** Always the literal "${TOKEN}" placeholder for `omnirouter launch`. */
    readonly token: string;
    readonly source: "session" | "option" | "env" | "context" | "none";
    readonly sessionId?: string;
    readonly sentinel: "omniroute-no-auth";
  };
  /** The ONE computed view. Inject adapters must not re-filter it. */
  readonly view: LaunchModelView;
  readonly model?: LaunchModelRow;
  readonly tool: {
    readonly command: string;
    readonly shell: boolean;
    readonly version?: string;
    readonly features: Readonly<Record<string, boolean>>;
  };
  readonly profile?: string;
  /** argv after `--`, with every mergeJson flag removed by core. */
  readonly passthroughArgs: ReadonlyArray<string>;
  /** Parsed values of mergeJson flags, keyed by flag. */
  readonly passthroughJson: Readonly<Record<string, unknown>>;
  readonly settings: LaunchSettings;
  readonly util: LaunchContextUtil;
}

// ---------- the plan (pure data, JSON-serializable) ----------

export interface TempFileSpec {
  /** Relative to ${TMP} (default) or ${STATE}; may contain subdirs. */
  path: string;
  root?: "tmp" | "state";
  /** May contain ${TMP}, ${STATE}, ${TOKEN}; other `${...}` text is tool-literal and kept. */
  contents: string;
  mode?: 0o600 | 0o700;
  /** Display/validation hint for dry-run (additive). */
  format?: "json" | "yaml" | "toml" | "ts" | "js" | "env" | "text";
  /** Read-only merge base (additive, gemini settings.json): core reads `path` (JSON, real path,
   *  may start with the home dir) and deep-merges `contents` (JSON) over it. Missing or
   *  unparseable base = `contents` alone plus a warning. Never writes the base file. */
  mergeBase?: { path: string; format: "json" };
}

/** Pre-spawn check, evaluated by core. */
export type PreflightCheck =
  | { kind: "node-version"; range: string; binary?: string; why: string }
  | { kind: "tool-version"; min: string; why: string }
  | { kind: "env-absent"; key: string; why: string; severity: "error" | "warn" }
  | { kind: "env-equals"; key: string; value: string; why: string }
  | { kind: "file-json-key"; path: string; key: string; why: string; severity: "warn" }
  | { kind: "port-free"; port: number; why: string };

/** Post-exit command, run by core BEFORE ${TMP} is removed. */
export interface TeardownStep {
  /** `${TOOL}` = resolved command. */
  argv: string[];
  env?: "plan" | "base";
  timeoutMs: number;
  onError: "warn" | "ignore";
}

/** Post-exit verification, warn only, NEVER edits user files. */
export type PostExitCheck =
  | { kind: "json-key-unchanged"; path: string; key: string; message: string; revertHint: string }
  /** Additive: the file's bytes (or absence) must not change (cline ~/.cline settings). */
  | { kind: "file-unchanged"; path: string; message: string };

export interface SecretSite {
  kind: "env" | "arg" | "file";
  /** env: variable name; arg: argv index as a string; file: TempFileSpec.path. */
  key: string;
}

export interface LaunchPlan {
  planVersion: 1;
  tool: string;
  argv: string[];
  env: {
    set: Record<string, string>;
    unset: string[];
  };
  tempFiles: TempFileSpec[];
  needsTempDir: boolean;
  cwd?: string;
  secretSites: SecretSite[];
  notes: string[];
  warnings: string[];
  preflight: PreflightCheck[];
  teardown: TeardownStep[];
  postExitChecks: PostExitCheck[];
  /** injected = number of view rows written into tool config (0 for server-view). */
  modelList: { strategy: ModelListStrategy; viewHash: string; injected: number };
  mcp?: unknown;
  cleanup: { removeTempDir: boolean; revokeSession: boolean };
}

// ---------- errors (section 10) ----------

export type LaunchErrorCode =
  | "UsageError"
  | "ModelRequired"
  | "ModelNotFound"
  | "ModelUnsuitable"
  | "ConfigConflict"
  | "UnsupportedPlatform"
  | "AuthFailed"
  | "GatewayUnreachable"
  | "ToolVersionTooOld"
  | "GatewayTooOld"
  | "FeatureUnsupported"
  | "PreflightFailed"
  | "NoProviders"
  | "ViewInvalid"
  | "Internal"
  | "PortInUse"
  | "GatewayStartTimeout"
  | "StateLocked"
  | "ToolNotFound"
  | "BudgetExceeded";

export declare class LaunchError extends Error {
  constructor(code: LaunchErrorCode, message: string, options?: { hint?: string; cause?: unknown });
  readonly code: LaunchErrorCode;
  readonly hint?: string;
  readonly exitCode: number | null;
  toJSON(): { error: { code: LaunchErrorCode; message: string; hint?: string } };
}

// ---------- helper declarations (implemented in contract.mjs) ----------

export declare const PLACEHOLDERS: Readonly<{
  TMP: "${TMP}";
  STATE: "${STATE}";
  TOKEN: "${TOKEN}";
  TOOL: "${TOOL}";
}>;
export declare const NO_AUTH_SENTINEL: "omniroute-no-auth";
export declare const PLATFORMS: ReadonlyArray<Platform>;
export declare const EXIT_CODES: Readonly<Record<LaunchErrorCode, number | null>>;
export declare const ERROR_CODES: Readonly<{ [K in LaunchErrorCode]: K }>;
export declare const ADAPTER_ERROR_CODES: ReadonlyArray<LaunchErrorCode>;
export declare function isLaunchError(value: unknown): value is LaunchError;
export declare function stripTrailingSlash(value: string): string;
export declare function ensureV1(rootUrl: string): string;
export declare function tempPath(name: string): string;
export declare function statePath(name: string): string;
export declare function json(value: unknown, options?: { indent?: number }): string;
export declare function tomlString(value: string): string;
export declare function tomlKey(key: string | string[]): string;
export declare function tomlValue(value: unknown): string;
export declare function toml(key: string | string[], value: unknown): string;
export declare const tomlAssign: typeof toml;
export declare function yaml(value: unknown): string;
export declare function dotenv(entries: Record<string, string | undefined>): string;
export declare function isValidEnvKey(key: unknown): boolean;
export declare function deepMerge<T = unknown>(base: unknown, override: unknown): T;
export declare function deepFreeze<T>(value: T): T;
export declare function findFlag(
  args: ReadonlyArray<string>,
  names: string | string[],
  options?: { takesValue?: boolean }
): { index: number; flag: string; value: string | undefined } | null;
export declare function hasFlag(
  args: ReadonlyArray<string>,
  names: string | string[],
  options?: { takesValue?: boolean }
): boolean;
export declare function rowLabel(row: LaunchModelRow): string;
export declare function injectRows(ctx: LaunchContext, injectLimit?: number): LaunchModelRow[];
export declare function createPlan(tool: string, parts?: Partial<LaunchPlan>): LaunchPlan;
export declare function findTokenSites(plan: LaunchPlan): SecretSite[];
export declare function defineAdapter<T extends LaunchAdapter>(adapter: T): Readonly<T>;
export declare function createContextUtil(): LaunchContextUtil;
export declare function claudeWindowEnv(
  contextWindow: number | string | undefined
): Record<string, string>;
export declare function selectView(
  rows: ReadonlyArray<ViewCatalogRow>,
  spec: ViewSelectSpec,
  prefs?: ViewPreferences
): ViewSelection;
export declare function viewHash(ids: ReadonlyArray<string>): string;
export declare function globMatch(pattern: string, value: string): boolean;
export declare const WIRE_PROTOCOLS: readonly WireProtocol[];
export declare const VIEW_CATALOG_KINDS: readonly ViewCatalogKind[];
