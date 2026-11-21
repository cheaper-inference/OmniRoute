/**
 * Opt-in (OMNIROUTE_DEDUP_WEB_TOOLS=true): drop the built-in WebSearch and WebFetch tools when
 * the same Claude Code request already carries an Exa or Tavily MCP search/fetch tool, so the
 * model sees fewer duplicate tool schemas. Exact tool names only; never touches other clients.
 */
import { isClaudeCodeClient } from "../../utils/cacheControlPolicy.ts";
import { getHeaderValueCaseInsensitive } from "./headers.ts";

type Body = Record<string, unknown>;

const BUILTIN_WEB_TOOLS = new Set(["WebSearch", "WebFetch"]);
const MCP_WEB_TOOLS = new Set([
  "mcp__exa__web_search_exa",
  "mcp__exa__web_fetch_exa",
  "mcp__tavily__tavily_search",
  "mcp__tavily__tavily_extract",
]);

function toolName(tool: unknown): string {
  const t = tool as { name?: unknown; function?: { name?: unknown } } | null;
  const name = t?.name ?? t?.function?.name;
  return typeof name === "string" ? name : "";
}

function forcedToolName(choice: unknown): string {
  return typeof choice === "object" && choice !== null ? toolName(choice) : "";
}

export function isWebToolDedupEnabled(): boolean {
  return process.env.OMNIROUTE_DEDUP_WEB_TOOLS === "true";
}

export function dedupeBuiltinWebTools(body: Body, clientHeaders: unknown): Body {
  if (!isWebToolDedupEnabled() || !Array.isArray(body.tools)) return body;
  const userAgent = getHeaderValueCaseInsensitive(
    clientHeaders as Record<string, unknown> | Headers | null | undefined,
    "user-agent"
  );
  if (!isClaudeCodeClient(typeof userAgent === "string" ? userAgent : null)) return body;
  const names = body.tools.map(toolName);
  if (!names.some((name) => MCP_WEB_TOOLS.has(name))) return body;
  // A forced built-in tool must stay, or the request would name a tool it no longer has.
  if (BUILTIN_WEB_TOOLS.has(forcedToolName(body.tool_choice))) return body;
  const tools = body.tools.filter((_, i) => !BUILTIN_WEB_TOOLS.has(names[i]));
  return tools.length === body.tools.length ? body : { ...body, tools };
}
