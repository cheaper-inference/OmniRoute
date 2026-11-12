/**
 * Opt-in MCP sidecar. Native SDK v2 codecs serve 2026 requests while the
 * existing v1 server and its transports remain unchanged. This sidecar exposes
 * eight tools; it is not a migration of the full legacy tool catalog.
 */

import { McpServer, createMcpHandler, type ServerContext } from "@modelcontextprotocol/server";
import { serveStdio, type StdioServerHandle } from "@modelcontextprotocol/server/stdio";
import { sanitizeErrorMessage } from "../../utils/error.ts";
import { z } from "zod";
import { resolveMcpCallerAuthInfo, withMcpHttpAuthContext } from "../httpAuthContext.ts";
import {
  getHealthOutput,
  listCombosOutput,
  getComboMetricsOutput,
  switchComboOutput,
  createComboOutput,
  checkQuotaOutput,
  routeRequestOutput,
  costReportOutput,
} from "../schemas/tools.ts";
import {
  getHealthTool,
  listCombosTool,
  getComboMetricsTool,
  switchComboTool,
  createComboTool,
  checkQuotaTool,
  routeRequestTool,
  costReportTool,
} from "../schemas/tools.ts";
import { omniRouteFetch } from "../internalFetch.ts";
import { getMcpV2HostHooks, registerMcpV2HostHooks, type McpV2HostHooks } from "./hostHooks.ts";
import {
  buildScopeDenialMessage,
  evaluateToolScopes,
  resolveCallerScopeContext,
  shouldForceScopeEnforcement,
  type McpToolExtraLike,
} from "../scopeEnforcement.ts";
import { analyticsRangeForPeriod, readAnalyticsTotals } from "../analyticsShape.ts";
import type { TextToolResult } from "../toolResult.ts";

// Parity with v1 server.ts:183 normalizeComboModels — model is the COMBINED
// "provider/model" string, priority is 1-indexed.
function normalizeComboModels(
  rawModels: unknown
): Array<{ provider: string; model: string; priority: number }> {
  return toArray(rawModels).map((rawModel, index) => {
    const modelRecord = toRecord(rawModel);
    const hostHooks = getMcpV2HostHooks();
    const modelString = hostHooks.getComboModelString(rawModel);
    const target = hostHooks.getComboStepTarget(rawModel);
    const provider =
      hostHooks.getComboModelProvider(rawModel) ||
      (modelString ? "unknown" : target ? "combo" : toString(modelRecord.provider, "unknown"));
    return {
      provider,
      model: modelString || target || toString(modelRecord.model, "unknown"),
      priority: toNumber(modelRecord.priority, index + 1),
    };
  });
}

// Inline helpers (same as pickFastestModel.ts — avoids coupling to tool module)
function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
function toRecord(value: unknown): Record<string, unknown> {
  return isRecord(value) ? value : {};
}
function toArray(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.filter(isRecord) : [];
}
function toString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

import { logToolCall } from "../audit.ts";
import { toNumber } from "../../utils/numeric.ts";

// Re-export types
export type { TextToolResult } from "../toolResult.ts";

// ============================================================================
// Constants
// ============================================================================

const PROTOCOL_VERSION = "2026-07-28";
const SERVER_NAME = "omniroute";
const SERVER_VERSION = process.env.npm_package_version || "3.8.51";

// Scope enforcement — opt-in, mirrors v1's fail-open default. The *enforcement
// switch* is resolved per call via v1's DB-aware resolver (see the gate below),
// NOT read from the env at module load: v1's dashboard toggle is DB-backed, so an
// env-only read here would let v2 be reached with enforcement LOOSER than v1's
// (Diego's constraint). The allowed-scopes env grant stays module-load, as v1's.
const MCP_ALLOWED_SCOPES = new Set(
  (process.env.OMNIROUTE_MCP_SCOPES || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
);

// v2 is experimental and OFF by default (Diego's release constraint). The whole
// sidecar is gated behind OMNIROUTE_MCP_V2 so v1 behaviour is unchanged unless an
// operator opts in. Read at module load, like MCP_ENFORCE_SCOPES above.
const MCP_V2_ENABLED = (() => {
  const value = process.env.OMNIROUTE_MCP_V2;
  return value === "true" || value === "1" || value === "yes";
})();

export function isMcpV2Enabled(): boolean {
  return MCP_V2_ENABLED;
}

/**
 * Mirrors v1's withScopeEnforcement (server.ts:230). The gate must DENY before
 * dispatch, not merely exist — otherwise "scope enforcement" is a claim, not a
 * behavior.
 *
 * Diego's constraint: with no handshake, the caller's scopes must come from the
 * authenticated request (authInfo / the env grant), NEVER from client-supplied
 * _meta. We pass only { authInfo, sessionId } to resolveCallerScopeContext, so
 * the shared function's `_meta` branch is unreachable from v2 even though v1's
 * contract still allows it.
 */
function withScopeEnforcement(
  toolName: string,
  handler: (args: unknown, extra?: McpToolExtraLike) => Promise<TextToolResult>,
  toolScopes?: readonly string[]
) {
  return async (args: unknown, context: ServerContext): Promise<TextToolResult> => {
    const extra: McpToolExtraLike = { authInfo: context.http?.authInfo };
    const scopeContext = resolveCallerScopeContext(
      { authInfo: extra?.authInfo, sessionId: extra?.sessionId },
      extra.authInfo ? [] : Array.from(MCP_ALLOWED_SCOPES)
    );
    const scopeCheck = evaluateToolScopes(
      toolName,
      scopeContext.scopes,
      getMcpV2HostHooks().isScopeEnforcementEnabled() || shouldForceScopeEnforcement(scopeContext),
      toolScopes
    );
    if (!scopeCheck.allowed) {
      // S-04 (#15159): no Caller=/source= on the client-facing surface — callerId
      // is caller-influenced. The identity stays in the audit payload below.
      const msg = buildScopeDenialMessage(toolName, scopeCheck.missing);
      await logToolCall(
        toolName,
        {
          ...(args && typeof args === "object" ? toRecord(args) : { rawArgs: args }),
          _scopeCheck: {
            callerId: scopeContext.callerId,
            source: scopeContext.source,
            required: scopeCheck.required,
            provided: scopeCheck.provided,
            missing: scopeCheck.missing,
          },
        },
        null,
        0,
        false,
        `scope_denied:${scopeCheck.reason || "scope_check_failed"}`
      );
      return {
        content: [{ type: "text" as const, text: `Error: ${msg}` }],
        isError: true,
      };
    }
    return handler(args, extra);
  };
}

// Cache TTLs per resource type (milliseconds)
const CACHE_TTL = {
  tools: 30_000, // 30s — tool list changes rarely
  combos: 15_000, // 15s — combos change more frequently
  health: 5_000, // 5s — health is ephemeral
  quota: 10_000, // 10s — quota changes with usage
  models: 300_000, // 5min — model catalog is very stable
} as const;

// ============================================================================
// Result wrapping
// ============================================================================

/**
 * Wraps a tool result with the spec-required resultType field.
 * All v2 tool results carry resultType: "complete".
 */
export function withResultType<T extends Record<string, unknown>>(
  result: T
): T & { resultType: "complete" } {
  return { ...result, resultType: "complete" as const };
}

/**
 * Adds caching hints to list responses.
 * tools/list, resources/list, prompts/list MUST include ttlMs + cacheScope.
 */
export function withCacheHints<T extends Record<string, unknown>>(
  result: T,
  ttlMs: number,
  cacheScope: "public" | "private" = "public"
): T & { ttlMs: number; cacheScope: "public" | "private" } {
  return { ...result, ttlMs, cacheScope };
}

// ============================================================================
// _meta extraction
// ============================================================================

export interface ClientMeta {
  protocolVersion?: string;
  clientInfo?: { name?: string; version?: string };
  clientCapabilities?: Record<string, unknown>;
}

/**
 * Extracts _meta fields from a request params object.
 * The 2026-07-28 spec requires every request to carry these in _meta.
 */
export function extractMeta(params: Record<string, unknown> | undefined): ClientMeta {
  const meta = (params as Record<string, unknown> | undefined)?._meta as
    Record<string, unknown> | undefined;
  if (!meta || typeof meta !== "object") return {};

  const result: ClientMeta = {};

  const pv = meta["io.modelcontextprotocol/protocolVersion"];
  if (typeof pv === "string") result.protocolVersion = pv;

  const ci = meta["io.modelcontextprotocol/clientInfo"];
  if (ci && typeof ci === "object") {
    const info = ci as Record<string, unknown>;
    result.clientInfo = {
      name: typeof info.name === "string" ? info.name : undefined,
      version: typeof info.version === "string" ? info.version : undefined,
    };
  }

  const caps = meta["io.modelcontextprotocol/clientCapabilities"];
  if (caps && typeof caps === "object") {
    result.clientCapabilities = caps as Record<string, unknown>;
  }

  return result;
}

// ============================================================================
// server/discover response
// ============================================================================

export interface DiscoverResult {
  name: string;
  version: string;
  protocolVersion: "2026-07-28";
  capabilities: {
    tools: { listChanged: boolean };
  };
  toolsCount: number;
  features: string[];
}

/**
 * Local sidecar summary retained for programmatic callers. The wire-level
 * server/discover response is produced and validated by the native SDK.
 */
export function buildDiscoverResult(toolCount: number): DiscoverResult {
  return {
    name: SERVER_NAME,
    version: SERVER_VERSION,
    protocolVersion: PROTOCOL_VERSION,
    capabilities: {
      tools: { listChanged: false },
    },
    toolsCount: toolCount,
    features: [
      "tools/list",
      "tools/call",
      "server/discover",
      "cacheable-lists",
      "output-schema",
      "header-routing",
    ],
  };
}

// ============================================================================
// Tool definitions with outputSchema
// ============================================================================

/**
 * v2 tool definition that includes outputSchema per 2026-07-28 spec.
 * The v1 server registers tools without outputSchema; v2 adds it.
 */
export interface V2ToolDefinition {
  name: string;
  description: string;
  inputSchema: z.ZodObject;
  outputSchema?: z.ZodObject;
  scopes: readonly string[];
  cacheTtlMs?: number;
}

const V2_TOOLS: V2ToolDefinition[] = [
  {
    ...getHealthTool,
    outputSchema: getHealthOutput,
    cacheTtlMs: CACHE_TTL.health,
  },
  {
    ...listCombosTool,
    outputSchema: listCombosOutput,
    cacheTtlMs: CACHE_TTL.combos,
  },
  {
    ...getComboMetricsTool,
    outputSchema: getComboMetricsOutput,
  },
  {
    ...switchComboTool,
    outputSchema: switchComboOutput,
  },
  {
    ...createComboTool,
    outputSchema: createComboOutput,
  },
  {
    ...checkQuotaTool,
    outputSchema: checkQuotaOutput,
    cacheTtlMs: CACHE_TTL.quota,
  },
  {
    ...routeRequestTool,
    outputSchema: routeRequestOutput,
  },
  {
    ...costReportTool,
    outputSchema: costReportOutput,
  },
];

// ============================================================================
// Input Required (MRTR) support
// ============================================================================

/**
 * Builds an InputRequiredResult per the MRTR pattern.
 * 2026-07-28 replaces server-initiated requests with this contract.
 */
export function buildInputRequiredResult(
  inputRequests: Record<string, { method: string; params: Record<string, unknown> }>,
  requestState?: string
): { resultType: "input_required"; inputRequests: typeof inputRequests; requestState?: string } {
  return {
    resultType: "input_required",
    inputRequests,
    ...(requestState ? { requestState } : {}),
  };
}

// ============================================================================
// v2 Server Factory
// ============================================================================

export interface McpServerV2 {
  server: McpServer;
  discover: () => DiscoverResult;
  getRegisteredToolCount: () => number;
  handleListTools: (cacheScope?: "public" | "private") => Record<string, unknown>;
}

/**
 * Creates the sidecar tool registry. Native SDK serving entries select the wire era.
 */
export function createMcpServerV2(): McpServerV2 {
  const server = new McpServer(
    { name: SERVER_NAME, version: SERVER_VERSION },
    {
      capabilities: { tools: { listChanged: false } },
      cacheHints: { "tools/list": { ttlMs: CACHE_TTL.tools, cacheScope: "private" } },
    }
  );

  // Register tools with outputSchema (v2 feature)
  for (const tool of V2_TOOLS) {
    server.registerTool(
      tool.name,
      {
        description: tool.description,
        inputSchema: tool.inputSchema,
        // outputSchema is the v2 addition — v1 omitted it
        ...(tool.outputSchema ? { outputSchema: tool.outputSchema } : {}),
      },
      withScopeEnforcement(
        tool.name,
        async (rawArgs: unknown, _extra?: McpToolExtraLike) => {
          const args = toRecord(rawArgs);
          const meta = extractMeta(args);
          // In production, meta would be used for auth/auditing.
          // For now, we extract it to prove the contract.
          void meta;

          const handler = TOOL_HANDLERS[tool.name];
          if (!handler) {
            return {
              content: [{ type: "text" as const, text: `Error: No handler for ${tool.name}` }],
              isError: true,
            };
          }

          const result = await handler(args);
          return {
            ...result,
            // resultType is added by the list-level wrapper, not per-tool
          };
        },
        tool.scopes
      )
    );
  }

  const discover = () => buildDiscoverResult(V2_TOOLS.length);

  // Discovery, version validation and wire result shapes belong to the native SDK.

  const getRegisteredToolCount = () => V2_TOOLS.length;

  const handleListTools = (cacheScope: "public" | "private" = "public") => {
    const tools = V2_TOOLS.map((t) => ({
      name: t.name,
      description: t.description,
      inputSchema: t.inputSchema,
      scopes: Array.from(t.scopes),
      ...(t.outputSchema ? { outputSchema: t.outputSchema } : {}),
    }));

    return withCacheHints(withResultType({ tools }), CACHE_TTL.tools, cacheScope);
  };

  return {
    server,
    discover,
    getRegisteredToolCount,
    handleListTools,
  };
}

// ============================================================================
// Tool handlers — wired to real OmniRoute API via omniRouteFetch
// Reuses v1's data extraction helpers (toRecord, toArray, toString, toNumber)
// ============================================================================

async function handleGetHealth() {
  const start = Date.now();
  try {
    const [healthRaw, resilienceRaw, rateLimitsRaw] = await Promise.allSettled([
      omniRouteFetch("/api/monitoring/health"),
      omniRouteFetch("/api/resilience"),
      omniRouteFetch("/api/rate-limits"),
    ]);

    const health =
      healthRaw.status === "fulfilled" ? toRecord(healthRaw.value as Record<string, unknown>) : {};
    const resilience =
      resilienceRaw.status === "fulfilled"
        ? toRecord(resilienceRaw.value as Record<string, unknown>)
        : {};
    const rateLimits =
      rateLimitsRaw.status === "fulfilled"
        ? toRecord(rateLimitsRaw.value as Record<string, unknown>)
        : {};
    const memoryUsageRaw = toRecord(health.memoryUsage);
    const resilienceCircuitBreakers = toArray(resilience.circuitBreakers);
    const rateLimitEntries = toArray(rateLimits.limits);

    const result = withResultType({
      uptime: toString(health.uptime, "unknown"),
      version: toString(health.version, SERVER_VERSION),
      memoryUsage: {
        heapUsed: toNumber(memoryUsageRaw.heapUsed, 0),
        heapTotal: toNumber(memoryUsageRaw.heapTotal, 0),
      },
      circuitBreakers: resilienceCircuitBreakers,
      rateLimits: rateLimitEntries,
    });

    await logToolCall("omniroute_get_health", {}, result, Date.now() - start, true);
    const { resultType: _rt, ...structuredResult } = result;
    return {
      content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      structuredContent: structuredResult,
      resultType: _rt,
    };
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    await logToolCall("omniroute_get_health", {}, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

async function handleListCombos(args: { includeMetrics?: boolean }) {
  const start = Date.now();
  try {
    const combosRaw = await omniRouteFetch("/api/combos");
    const combosRecord = toRecord(combosRaw);
    const combos = Array.isArray(combosRecord.combos)
      ? combosRecord.combos
      : Array.isArray(combosRaw)
        ? combosRaw
        : [];
    let metrics: Record<string, unknown> = {};
    if (args.includeMetrics) {
      metrics = toRecord(await omniRouteFetch("/api/combos/metrics").catch(() => ({})));
    }

    const result = withResultType({
      combos: toArray(combos).map((rawCombo) => {
        const combo = toRecord(rawCombo);
        const comboData = toRecord(combo.data);
        const comboId = toString(combo.id, "");
        const modelsSource =
          Array.isArray(combo.models) && combo.models.length > 0 ? combo.models : comboData.models;
        return {
          id: comboId,
          name: toString(combo.name, comboId || "unnamed"),
          strategy: toString(combo.strategy, toString(comboData.strategy, "priority")),
          enabled: combo.enabled !== false,
          models: normalizeComboModels(modelsSource),
          ...(args.includeMetrics ? { metrics: metrics[comboId] ?? null } : {}),
        };
      }),
    });

    await logToolCall("omniroute_list_combos", args, result, Date.now() - start, true);
    const { resultType: _rt, ...structuredResult } = result;
    return {
      content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      structuredContent: structuredResult,
      resultType: _rt,
    };
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    await logToolCall("omniroute_list_combos", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

async function handleGetComboMetrics(args: { comboId: string }) {
  const start = Date.now();
  try {
    const result = withResultType(
      toRecord(
        await omniRouteFetch(`/api/combos/metrics?comboId=${encodeURIComponent(args.comboId)}`)
      )
    );
    await logToolCall("omniroute_get_combo_metrics", args, result, Date.now() - start, true);
    const { resultType: _rt, ...structuredResult } = result;
    return {
      content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      structuredContent: structuredResult,
      resultType: _rt,
    };
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    await logToolCall("omniroute_get_combo_metrics", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

async function handleSwitchCombo(args: { comboId: string; active: boolean }) {
  const start = Date.now();
  try {
    const result = withResultType(
      toRecord(
        await omniRouteFetch(`/api/combos/${encodeURIComponent(args.comboId)}`, {
          method: "PUT",
          body: JSON.stringify({ isActive: args.active }),
        })
      )
    );
    await logToolCall("omniroute_switch_combo", args, result, Date.now() - start, true);
    const { resultType: _rt, ...structuredResult } = result;
    return {
      content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      structuredContent: structuredResult,
      resultType: _rt,
    };
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    await logToolCall("omniroute_switch_combo", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

async function handleCreateCombo(args: {
  name: string;
  description?: string;
  strategy?: string;
  models: { provider: string; model: string }[];
}) {
  const start = Date.now();
  try {
    const result = withResultType(
      toRecord(
        await omniRouteFetch("/api/combos", {
          method: "POST",
          body: JSON.stringify(args),
        })
      )
    );
    await logToolCall("omniroute_create_combo", args, result, Date.now() - start, true);
    const { resultType: _rt, ...structuredResult } = result;
    return {
      content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      structuredContent: structuredResult,
      resultType: _rt,
    };
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    await logToolCall("omniroute_create_combo", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

async function handleCheckQuota(args: { provider?: string; connectionId?: string }) {
  const start = Date.now();
  try {
    let path = "/api/usage/quota";
    if (args.connectionId) path += `?connectionId=${encodeURIComponent(args.connectionId)}`;
    else if (args.provider) path += `?provider=${encodeURIComponent(args.provider)}`;

    const result = withResultType(
      toRecord(
        getMcpV2HostHooks().normalizeQuotaResponse(await omniRouteFetch(path), {
          provider: args.provider || null,
          connectionId: args.connectionId || null,
        })
      )
    );

    await logToolCall("omniroute_check_quota", args, result, Date.now() - start, true);
    const { resultType: _rt, ...structuredResult } = result;
    return {
      content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      structuredContent: structuredResult,
      resultType: _rt,
    };
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    await logToolCall("omniroute_check_quota", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

async function handleRouteRequest(args: {
  model: string;
  messages: Array<{ role: string; content: string }>;
  combo?: string;
  budget?: number;
  role?: string;
  stream?: boolean;
}) {
  const start = Date.now();
  try {
    const body: Record<string, unknown> = {
      model: args.model,
      messages: args.messages,
      stream: false,
    };
    if (args.combo) {
      body["x-combo"] = args.combo;
    }

    const raw = toRecord(
      await omniRouteFetch("/v1/chat/completions", {
        method: "POST",
        body: JSON.stringify(body),
      })
    );
    const choices = toArray(raw.choices);
    const firstChoice = toRecord(choices[0]);
    const firstMessage = toRecord(firstChoice.message);
    const usage = toRecord(raw.usage);

    const result = withResultType({
      response: {
        content: toString(firstMessage.content, ""),
        model: toString(raw.model, args.model),
        tokens: {
          prompt: toNumber(usage.prompt_tokens, 0),
          completion: toNumber(usage.completion_tokens, 0),
        },
      },
      routing: {
        provider: toString(raw.provider, "unknown"),
        combo: raw.combo ?? null,
        fallbacksTriggered: toNumber(raw.fallbacksTriggered, 0),
        cost: toNumber(raw.cost, 0),
        latencyMs: Date.now() - start,
        routingExplanation: toString(
          raw.routingExplanation,
          "Request routed through primary provider"
        ),
      },
    });

    await logToolCall(
      "omniroute_route_request",
      { model: args.model, messageCount: args.messages.length },
      result.routing,
      Date.now() - start,
      true
    );
    const { resultType: _rt, ...structuredResult } = result;
    return {
      content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      structuredContent: structuredResult,
      resultType: _rt,
    };
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    await logToolCall(
      "omniroute_route_request",
      { model: args.model },
      null,
      Date.now() - start,
      false,
      msg
    );
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

async function handleCostReport(args: { period?: string }) {
  const start = Date.now();
  try {
    const period = args.period || "session";
    // v1's cost_report reads /api/usage/analytics, not a /api/costs/report route
    // (which does not exist). analyticsRangeForPeriod maps session/day/week/month
    // to the 1d/7d/30d the route actually honours.
    const range = analyticsRangeForPeriod(period);

    const raw = toRecord(
      await omniRouteFetch(`/api/usage/analytics?range=${encodeURIComponent(range)}`)
    );

    // Totals live under `summary` (analyticsShape.ts), not at the top level.
    const totals = readAnalyticsTotals(raw);
    const budget = toRecord(raw.budget);

    const result = withResultType({
      period,
      totalCost: totals.totalCost,
      requestCount: totals.requestCount,
      tokenCount: {
        prompt: totals.promptTokens,
        completion: totals.completionTokens,
      },
      // Real byProvider rows carry `provider`; the output schema requires `name`.
      byProvider: toArray(raw.byProvider).map((row) => {
        const providerRow = toRecord(row);
        return {
          name: toString(providerRow.name, toString(providerRow.provider, "unknown")),
          cost: toNumber(providerRow.cost, 0),
          requests: toNumber(providerRow.requests, 0),
        };
      }),
      byModel: toArray(raw.byModel).map((row) => {
        const modelRow = toRecord(row);
        return {
          model: toString(modelRow.model, "unknown"),
          cost: toNumber(modelRow.cost, 0),
          requests: toNumber(modelRow.requests, 0),
        };
      }),
      budget: {
        limit: toNumber(budget.limit, null),
        remaining: toNumber(budget.remaining, null),
      },
    });

    await logToolCall("omniroute_cost_report", args, result, Date.now() - start, true);
    const { resultType: _rt, ...structuredResult } = result;
    return {
      content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      structuredContent: structuredResult,
      resultType: _rt,
    };
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    await logToolCall("omniroute_cost_report", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

const TOOL_HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<TextToolResult>> = {
  omniroute_get_health: handleGetHealth,
  omniroute_list_combos: (args) => handleListCombos(toRecord(args) as { includeMetrics?: boolean }),
  omniroute_get_combo_metrics: (args) =>
    handleGetComboMetrics(toRecord(args) as { comboId: string }),
  omniroute_switch_combo: (args) =>
    handleSwitchCombo(toRecord(args) as { comboId: string; active: boolean }),
  omniroute_create_combo: (args) =>
    handleCreateCombo(
      toRecord(args) as { name: string; models: { provider: string; model: string }[] }
    ),
  omniroute_check_quota: (args) =>
    handleCheckQuota(toRecord(args) as { provider?: string; connectionId?: string }),
  omniroute_route_request: (args) =>
    handleRouteRequest(
      toRecord(args) as { model: string; messages: { role: string; content: string }[] }
    ),
  omniroute_cost_report: (args) => handleCostReport(toRecord(args) as { period?: string }),
};

// ============================================================================
// Header-based routing helpers
// ============================================================================

/**
 * Extracts MCP routing headers from an HTTP request.
 * 2026-07-28 spec: Streamable HTTP MUST include Mcp-Method and Mcp-Name.
 */
export function extractMcpHeaders(headers: Record<string, string | string[] | undefined>): {
  method?: string;
  name?: string;
  protocolVersion?: string;
} {
  const result: { method?: string; name?: string; protocolVersion?: string } = {};

  const method = headers["mcp-method"] ?? headers["Mcp-Method"];
  if (typeof method === "string") result.method = method;
  else if (Array.isArray(method) && method.length > 0) result.method = method[0];

  const name = headers["mcp-name"] ?? headers["Mcp-Name"];
  if (typeof name === "string") result.name = name;
  else if (Array.isArray(name) && name.length > 0) result.name = name[0];

  const pv = headers["mcp-protocol-version"] ?? headers["MCP-Protocol-Version"];
  if (typeof pv === "string") result.protocolVersion = pv;
  else if (Array.isArray(pv) && pv.length > 0) result.protocolVersion = pv[0];

  return result;
}

/**
 * Routes an HTTP request based on MCP headers.
 * Returns the handler key or null if routing fails.
 */
export function routeByHeaders(headers: Record<string, string | string[] | undefined>): {
  routed: boolean;
  method?: string;
  name?: string;
  protocolVersion?: string;
} {
  const extracted = extractMcpHeaders(headers);
  return {
    routed: !!(extracted.method && extracted.name),
    ...extracted,
  };
}

export { CACHE_TTL, PROTOCOL_VERSION, SERVER_VERSION, SERVER_NAME };

/**
 * Starts the v2 MCP server on stdio.
 * Mirrors v1's startMcpStdio but uses the v2 server.
 *
 * Gated: v2 is experimental and off by default. Without OMNIROUTE_MCP_V2=true this
 * refuses to start rather than silently exposing a second, less-tested surface.
 *
 * Host hooks (scope enforcement, combo resolution, quota normalization) are supplied
 * by the caller, because open-sse/ must not import src/. Pass the same implementations
 * the HTTP route registers; omitting them falls back to the pass-through defaults.
 */
export async function startMcpStdioV2(hooks?: Partial<McpV2HostHooks>): Promise<StdioServerHandle> {
  if (!isMcpV2Enabled()) {
    throw new Error(
      "MCP v2 sidecar is disabled. Set OMNIROUTE_MCP_V2=true to enable the experimental 2026-07-28 server."
    );
  }
  if (hooks) registerMcpV2HostHooks(hooks);
  return serveStdio(() => createMcpServerV2().server, {
    onerror: (error) => console.error("[MCP v2]", sanitizeErrorMessage(error.message)),
  });
}

// ============================================================================
// HTTP transport — stateless Streamable HTTP route for the v2 sidecar
// ============================================================================

/**
 * Native per-request HTTP serving. Authenticated scopes are supplied out of band;
 * client metadata cannot grant permissions. Legacy /stream and /sse are untouched.
 */
const httpHandler = createMcpHandler(() => createMcpServerV2().server, {
  legacy: "stateless",
  responseMode: "json",
});

export async function handleMcpV2Http(request: Request): Promise<Response> {
  if (!isMcpV2Enabled()) {
    return Response.json(
      {
        jsonrpc: "2.0",
        error: {
          code: -32000,
          message: "MCP v2 sidecar is disabled. Set OMNIROUTE_MCP_V2=true to enable it.",
        },
        id: null,
      },
      { status: 503 }
    );
  }
  try {
    const authInfo = await resolveMcpCallerAuthInfo(request);
    return await withMcpHttpAuthContext(request, () => httpHandler.fetch(request, { authInfo }));
  } catch (err) {
    const message = sanitizeErrorMessage(
      err instanceof Error ? err.message : "MCP v2 transport error"
    );
    return Response.json(
      { jsonrpc: "2.0", error: { code: -32000, message }, id: null },
      { status: 500 }
    );
  }
}
