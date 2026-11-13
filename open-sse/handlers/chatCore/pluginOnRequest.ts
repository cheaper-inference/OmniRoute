/**
 * chatCore plugin onRequest hook (Quality Gate v2 / Fase 9 — chatCore god-file decomposition,
 * #3501).
 *
 * Extracted from handleChatCore's request entry: run the registered plugin `onRequest` hooks. The
 * hook may block the request (→ the handler returns a 403), rewrite the body (→ the handler
 * reassigns `body`), or do nothing. Fail-open — a misbehaving plugin is logged and ignored. Returns
 * a discriminated result so the early-return + body reassignment stay in the handler; behaviour is
 * byte-identical to the previous inline block.
 */

type LoggerLike =
  { info?: (...args: unknown[]) => void; debug?: (...args: unknown[]) => void } | null | undefined;

export type PluginOnRequestGate =
  { blocked: true; response: Response } | { blocked: false; body?: unknown };

const JSON_HEADERS = { status: 403, headers: { "Content-Type": "application/json" } } as const;

const GENERIC_BLOCK_BODY = JSON.stringify({
  error: { message: "Request blocked by plugin", type: "plugin_block" },
});

/**
 * The 403 for a blocking hook. A plugin response that JSON cannot serialize (BigInt, a cycle)
 * must still block: it falls back to the generic body instead of throwing into the fail-open
 * catch below, which would turn the block into an allow.
 */
function blockResponse(pluginResponse: unknown): Response {
  let body = GENERIC_BLOCK_BODY;
  if (pluginResponse) {
    try {
      body = JSON.stringify(pluginResponse) ?? GENERIC_BLOCK_BODY;
    } catch {
      // keep the generic body
    }
  }
  return new Response(body, JSON_HEADERS);
}

export async function runPluginOnRequestHook(args: {
  requestId: string;
  body: unknown;
  model: string | null | undefined;
  provider: string | null | undefined;
  apiKeyInfo: unknown;
  headers?: Record<string, string | string[] | undefined>;
  log?: LoggerLike;
}): Promise<PluginOnRequestGate> {
  try {
    const { runOnRequest } = await import("@/lib/plugins/hooks");
    const pluginCtx = {
      requestId: args.requestId,
      body: args.body,
      model: args.model,
      provider: args.provider,
      apiKeyInfo: args.apiKeyInfo,
      headers: args.headers,
      metadata: {},
    };
    const pluginResult = await runOnRequest(pluginCtx);
    if (pluginResult?.blocked) {
      args.log?.info?.("PLUGIN", `Request blocked by plugin`);
      return { blocked: true, response: blockResponse(pluginResult.response) };
    }
    if (pluginResult?.metadata) {
      Object.assign(pluginCtx.metadata, pluginResult.metadata);
    }
    return { blocked: false, body: pluginResult?.body };
  } catch (pluginErr) {
    args.log?.debug?.(
      "PLUGIN",
      `onRequest hook error (non-fatal): ${pluginErr instanceof Error ? pluginErr.message : String(pluginErr)}`
    );
    return { blocked: false };
  }
}
