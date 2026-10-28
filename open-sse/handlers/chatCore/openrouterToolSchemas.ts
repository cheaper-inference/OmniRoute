import { stripInvalidRegexPatterns } from "../../translator/helpers/schemaCoercion.ts";

/**
 * OpenRouter-routed upstreams (observed: Cohere) reject the whole request with
 * `invalid 'parameters' provided: pattern must be a valid regex` when any
 * function tool carries a malformed `pattern` constraint (e.g. `"["`). Drop
 * only those constraints, only for `openrouter`; valid patterns and every
 * other schema keyword pass through unchanged.
 */

type LoggerLike = { debug?: (...args: unknown[]) => void } | null | undefined;
type JsonRecord = Record<string, unknown>;

function isPlainObject(value: unknown): value is JsonRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizeTool(tool: unknown, stats: { removed: number }): unknown {
  if (!isPlainObject(tool)) return tool;

  // Chat Completions shape: { type: "function", function: { parameters } }
  if (isPlainObject(tool.function) && tool.function.parameters !== undefined) {
    const before = stats.removed;
    const parameters = stripInvalidRegexPatterns(tool.function.parameters, stats);
    if (stats.removed === before) return tool;
    return { ...tool, function: { ...tool.function, parameters } };
  }

  // Flat Responses shape: { type: "function", name, parameters }
  if (tool.type === "function" && tool.parameters !== undefined) {
    const before = stats.removed;
    const parameters = stripInvalidRegexPatterns(tool.parameters, stats);
    if (stats.removed === before) return tool;
    return { ...tool, parameters };
  }

  return tool;
}

/**
 * Returns the same `tools` reference when the provider is not `openrouter`,
 * when `tools` is not an array, or when nothing was removed. Never mutates
 * the input. Logs a redacted count only — never schema or tool content.
 */
export function normalizeToolSchemasForProvider<T>(
  provider: string | null | undefined,
  tools: T,
  log?: LoggerLike
): T {
  if (provider !== "openrouter" || !Array.isArray(tools)) return tools;

  const stats = { removed: 0 };
  const normalized = tools.map((tool) => normalizeTool(tool, stats));
  if (stats.removed === 0) return tools;

  log?.debug?.(
    "TOOLSCHEMA",
    `${provider} | stripped ${stats.removed} invalid pattern constraint${stats.removed > 1 ? "s" : ""}`
  );
  return normalized as T;
}
