import type { RtkConfig } from "../../../types.ts";
import { estimateCompressionTokens } from "../../../stats.ts";
import { detectCommandType } from "../commandDetector.ts";
import { matchRtkFilter } from "../filterLoader.ts";
import { effectiveMaxLines } from "../intensity.ts";
import { lastCommandSegment } from "../splitCompositeCommand.ts";
import { STRUCTURAL_REGISTRY } from "./index.ts";
import type { RenderResult, Renderer } from "./types.ts";

/**
 * Structural renderer dispatch (opt-in, `OMNIROUTE_RTK_STRUCTURAL_RENDERERS_ENABLED`).
 *
 * It runs on the ORIGINAL tool output, before any RTK filter, dedup or truncation can cut lines,
 * and answers with one of three decisions:
 *
 *  - `legacy`   no candidate, a filter the operator owns takes precedence, or the input is over
 *               the analysis budget: the existing RTK pipeline runs exactly as it does today.
 *  - `preserve` a candidate was recognised but cannot be summarised faithfully (invalid format,
 *               the renderer threw, the summary does not fit the RTK limits or is not smaller):
 *               the original text is returned untouched, with no alteration telemetry.
 *  - `rendered` a validated summary that goes straight to token accounting and raw-output
 *               retention; no later filter touches it.
 */

export interface RtkStructuralRuntimeOptions {
  /**
   * The flag decision, resolved once per request on the thread that owns the server resolver
   * (see structuralFlag.ts). It is an internal option: never read from `RtkConfig`/`stepConfig`.
   */
  rtkStructuralRenderersEnabled?: boolean;
}

export interface RtkTextOptions extends RtkStructuralRuntimeOptions {
  command?: string | null;
  config?: Partial<RtkConfig>;
  skipFilters?: boolean;
  /** True only when the text is a tool result the structural path may rewrite. */
  toolResult?: boolean;
  /** Name of the correlated tool call, when known (drives the native-tool hook below). */
  toolName?: string | null;
}

export type StructuralRenderDecision =
  | { kind: "legacy"; reason?: "over-budget" }
  | { kind: "preserve" }
  | { kind: "rendered"; text: string; renderer: string };

/** Analysis ceiling: above any of these the input skips the structural parsers entirely. */
export const STRUCTURAL_ANALYSIS_BUDGET = Object.freeze({
  maxBytes: 512 * 1024,
  maxLines: 8192,
  maxLineChars: 16 * 1024,
});

const LEGACY: StructuralRenderDecision = { kind: "legacy" };
const OVER_BUDGET: StructuralRenderDecision = { kind: "legacy", reason: "over-budget" };
const PRESERVE: StructuralRenderDecision = { kind: "preserve" };

interface StructuralRoute {
  /** Format name: the key in STRUCTURAL_REGISTRY and the entry checked against `config.renderers`. */
  type: string;
  render: Renderer;
  /** Correlated command, when the tool call carried one. */
  command: string | null;
}

/**
 * EXTENSION POINT: non-shell tools with a correlated call (native Grep/Glob, directory listings).
 * `resolveToolMeta` marks them `skipFilters` (no RTK filter ever runs on them), so they never
 * reach the shell routing below. A later PR registers a selector here (`NATIVE_TOOL_ROUTES.set`)
 * under the lower-cased tool name; it receives the original output and returns the route to render it with, or null to stay
 * on the legacy path. The budget, `config.renderers` allowlist, limits and fidelity checks in
 * `tryStructuralRender` apply to those routes unchanged.
 */
type NativeToolRouteSelector = (text: string, toolName: string) => StructuralRoute | null;
const NATIVE_TOOL_ROUTES = new Map<string, NativeToolRouteSelector>();

/** Compose options that take a separate value (`-f compose.yaml`, `--project-name demo`). */
const COMPOSE_VALUE_OPTIONS = new Set([
  "-f",
  "--file",
  "-p",
  "--project-name",
  "--project-directory",
  "--profile",
  "--env-file",
  "--ansi",
  "--progress",
  "--parallel",
]);
const MAX_COMMAND_TOKENS = 64;

/** `docker logs ...`, or `docker compose [options] logs ...` (the options come before the subcommand). */
function isDockerLogsCommand(command: string): boolean {
  const tokens = command.split(/\s+/, MAX_COMMAND_TOKENS);
  if (tokens[0]?.toLowerCase() !== "docker") return false;
  if (tokens[1]?.toLowerCase() === "logs") return true;
  if (tokens[1]?.toLowerCase() !== "compose") return false;
  let at = 2;
  while (at < tokens.length && tokens[at].startsWith("-")) {
    at += COMPOSE_VALUE_OPTIONS.has(tokens[at]) ? 2 : 1;
  }
  return tokens[at]?.toLowerCase() === "logs";
}
const DIFF_COMMAND_RE = /^git\s+(?:diff|show)\b/i;
const DIFF_FILE_HEADER_RE = /^diff --(?:git|cc|combined) /m;
const DIFF_STRONG_START_RE = /^diff --(?:git|cc|combined) /;

function logsRoute(command: string): StructuralRoute {
  return { type: "docker-logs", render: STRUCTURAL_REGISTRY["docker-logs"], command };
}

function diffRoute(command: string | null): StructuralRoute {
  return { type: "git-diff", render: STRUCTURAL_REGISTRY["git-diff"], command };
}

/**
 * Pick the format from the correlated command when there is one, else from a strong signature
 * of the text itself. `full: false` is the cheap pre-check used for over-budget inputs: it never
 * scans the text body.
 */
function selectShellRoute(text: string, rawCommand: string | null | undefined, full: boolean) {
  const command = lastCommandSegment(rawCommand?.trim() ?? "") || null;
  if (command && isDockerLogsCommand(command)) return logsRoute(command);
  if (command) {
    if (!DIFF_COMMAND_RE.test(command)) return null;
    return !full || DIFF_FILE_HEADER_RE.test(text) ? diffRoute(command) : null;
  }
  return DIFF_STRONG_START_RE.test(full ? text : text.slice(0, 16)) ? diffRoute(null) : null;
}

function selectRoute(text: string, options: RtkTextOptions, full: boolean): StructuralRoute | null {
  if (options.skipFilters) {
    const name = options.toolName?.trim().toLowerCase();
    // A Map: the name comes from the model, and a plain object would resolve `__proto__` or
    // `constructor` to an inherited member.
    const select = name ? NATIVE_TOOL_ROUTES.get(name) : undefined;
    return select && name ? select(text, name) : null;
  }
  return selectShellRoute(text, options.command, full);
}

/**
 * Whether one line (`from` to `end`) is within the per-line ceiling. The cheap character test
 * comes first; only a line that could exceed the ceiling in bytes (UTF-8 takes at most three
 * bytes per UTF-16 code unit) is measured, so ordinary lines are never copied.
 */
function lineWithinBudget(text: string, from: number, end: number): boolean {
  const { maxLineChars } = STRUCTURAL_ANALYSIS_BUDGET;
  const chars = end - from;
  if (chars > maxLineChars) return false;
  if (chars * 3 <= maxLineChars) return true;
  return Buffer.byteLength(text.slice(from, end), "utf8") <= maxLineChars;
}

/** Linear scan, no line array: true while the input stays inside the analysis budget. */
function withinAnalysisBudget(text: string): boolean {
  const { maxBytes, maxLines } = STRUCTURAL_ANALYSIS_BUDGET;
  // UTF-8 never takes fewer bytes than characters, so the cheap character test comes first.
  if (text.length > maxBytes) return false;
  let lines = 0;
  let from = 0;
  while (from < text.length) {
    const newline = text.indexOf("\n", from);
    const end = newline === -1 ? text.length : newline;
    if (!lineWithinBudget(text, from, end)) return false;
    if (++lines > maxLines) return false;
    if (newline === -1) break;
    from = newline + 1;
  }
  return Buffer.byteLength(text, "utf8") <= maxBytes;
}

/**
 * A filter the operator configured keeps the request on the legacy path: a project or global
 * filter that matches, any explicitly enabled filter, or the matched filter being explicitly
 * disabled. Only a built-in match with no explicit filter selection is superseded.
 */
function legacyFilterOwnsRequest(text: string, command: string | null, config: RtkConfig): boolean {
  const filter = matchRtkFilter(text, command, {
    customFiltersEnabled: config.customFiltersEnabled,
    trustProjectFilters: config.trustProjectFilters,
  });
  if (!filter) return false;
  if (config.enabledFilters.length > 0 || config.disabledFilters.includes(filter.id)) return true;
  return filter.source === "project" || filter.source === "global";
}

/**
 * The RTK limits apply to the candidate summary exactly as the legacy path applies them: the
 * line budget is `effectiveMaxLines` (never below one line, so a configured 0 is one line, not
 * "no cap"), and the character limit counts only when positive.
 */
function fitsRtkLimits(summary: string, config: RtkConfig): boolean {
  if (config.maxCharsPerResult > 0 && summary.length > config.maxCharsPerResult) return false;
  const limit = effectiveMaxLines(config.maxLinesPerResult, config.intensity);
  return summary.split("\n").length <= limit;
}

function renderSafely(route: StructuralRoute, text: string): RenderResult | null {
  try {
    return route.render(text, detectCommandType(text, route.command));
  } catch {
    // A renderer must never take the request down: keep the original.
    return null;
  }
}

/** Every opt-in condition must hold: the flag decision, the RTK config and a marked tool result. */
function structuralGatesOpen(config: RtkConfig, options: RtkTextOptions): boolean {
  if (options.rtkStructuralRenderersEnabled !== true || options.toolResult !== true) return false;
  return Boolean(config.enableRenderers) && Boolean(config.applyToToolResults);
}

/** The `renderers` allowlist and filters the operator owns can both keep a request on the legacy path. */
function routeAllowed(
  route: StructuralRoute,
  text: string,
  config: RtkConfig,
  options: RtkTextOptions
): boolean {
  if (config.renderers && config.renderers.length > 0 && !config.renderers.includes(route.type)) {
    return false;
  }
  return options.skipFilters === true || !legacyFilterOwnsRequest(text, route.command, config);
}

function renderOrPreserve(
  route: StructuralRoute,
  text: string,
  config: RtkConfig
): StructuralRenderDecision {
  const rendered = renderSafely(route, text);
  if (!rendered || !rendered.changed || !fitsRtkLimits(rendered.text, config)) return PRESERVE;
  if (estimateCompressionTokens(rendered.text) >= estimateCompressionTokens(text)) return PRESERVE;
  return { kind: "rendered", text: rendered.text, renderer: rendered.renderer };
}

/**
 * Decide how one tool result is handled by the structural renderers.
 *
 * @param text - The ORIGINAL tool output, before any RTK filter, dedup or truncation.
 * @param config - The merged RTK config. Its `enableRenderers`, `applyToToolResults`, `renderers`
 *   allowlist, filters and line/character limits gate and bound the render.
 * @param options - Per-call context. `rtkStructuralRenderersEnabled` is the flag decision captured
 *   once for the request (see structuralFlag.ts); it is never read from `config` or a step config.
 *   `toolResult` marks a tool result the path may rewrite; `command`/`toolName` select the format.
 * @returns `legacy` (the existing RTK pipeline runs as before), `preserve` (a format was
 *   recognised but cannot be summarised faithfully: the caller bypasses the legacy filters and
 *   returns the original text unchanged) or `rendered` (a validated summary to use as is).
 */
export function tryStructuralRender(
  text: string,
  config: RtkConfig,
  options: RtkTextOptions
): StructuralRenderDecision {
  if (!structuralGatesOpen(config, options)) return LEGACY;
  if (!withinAnalysisBudget(text)) {
    return selectRoute(text, options, false) ? OVER_BUDGET : LEGACY;
  }
  const route = selectRoute(text, options, true);
  if (!route || !routeAllowed(route, text, config, options)) return LEGACY;
  return renderOrPreserve(route, text, config);
}
