import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { isMcpScopeEnforcementEnabled } from "../../src/shared/utils/featureFlags.ts";
import {
  evaluateToolScopes,
  resolveCallerScopeContext,
  shouldForceScopeEnforcement,
  type McpToolExtraLike,
} from "./scopeEnforcement.ts";

/**
 * Scope-filtered `tools/list` (opt-in, OMNIROUTE_MCP_SCOPE_TOOLS_LIST=1).
 *
 * A key that cannot call a tool should not be offered it: the model only wastes calls on refusals.
 * The filter asks the same question as the call-time guard (`evaluateToolScopes`, same enforcement
 * decision), so the list never hides a tool the call would allow. Call-time enforcement is
 * unchanged and stays the real guard.
 */

const TRUTHY = new Set(["1", "true", "yes", "on"]);
const toolScopes = new Map<string, readonly string[]>();

type ListToolsHandler = (
  request: unknown,
  extra: McpToolExtraLike
) => Promise<{ tools: Array<{ name: string }> }>;

/** Remember the scopes a tool was registered with (called from `withScopeEnforcement`). */
export function recordToolScopes(name: string, scopes: readonly string[] | undefined): void {
  if (scopes) toolScopes.set(name, scopes);
}

function isScopeToolsListEnabled(): boolean {
  return TRUTHY.has((process.env.OMNIROUTE_MCP_SCOPE_TOOLS_LIST ?? "").trim().toLowerCase());
}

/**
 * Wrap the server's `tools/list` handler. Call it after every tool is registered.
 *
 * shortcut: reads the SDK's private handler map (SDK 1.x has no public tools/list hook). If the
 * handler is not found the list stays unfiltered (fail open: call-time enforcement still guards).
 * Upgrade when the SDK exposes a hook.
 */
export function installScopeFilteredToolsList(
  server: McpServer,
  fallbackScopes: readonly string[]
): void {
  const handlers = (
    server.server as unknown as { _requestHandlers?: Map<string, ListToolsHandler> }
  )._requestHandlers;
  const original = handlers?.get("tools/list");
  if (!handlers || !original) return;

  handlers.set("tools/list", async (request, extra) => {
    const result = await original(request, extra);
    if (!isScopeToolsListEnabled()) return result;
    const caller = resolveCallerScopeContext(extra, fallbackScopes);
    if (!(isMcpScopeEnforcementEnabled() || shouldForceScopeEnforcement(caller))) return result;
    const visible = result.tools.filter((tool) => {
      const check = evaluateToolScopes(tool.name, caller.scopes, true, toolScopes.get(tool.name));
      // A tool with no known scopes is shown: hiding it would be a guess, the call guard decides.
      return check.allowed || check.reason === "tool_definition_missing";
    });
    return { ...result, tools: visible };
  });
}
