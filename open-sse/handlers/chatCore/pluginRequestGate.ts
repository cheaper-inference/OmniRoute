/**
 * chatCore plugin onRequest gate (chatCore god-file decomposition, slice 2 — design after #15709).
 *
 * Wraps runPluginOnRequestHook (pluginOnRequest.ts) with the handler-side outcome that used to be
 * inline in handleChatCore: a blocked request becomes the labelled 403 `plugin_block` result, and
 * a hook-rewritten body replaces the request body only when the hook returned a truthy body.
 * Behaviour is byte-identical to the previous inline block.
 */

import { runPluginOnRequestHook } from "./pluginOnRequest.ts";

export type PluginRequestGateResult<TBody> =
  | {
      blocked: true;
      result: {
        success: boolean;
        status: number;
        errorType: string;
        errorCode: string;
        error: string;
        response: Response;
      };
    }
  | { blocked: false; body: TBody | unknown };

export async function runPluginRequestGate<TBody>(
  args: Omit<Parameters<typeof runPluginOnRequestHook>[0], "body"> & { body: TBody }
): Promise<PluginRequestGateResult<TBody>> {
  const pluginGate = await runPluginOnRequestHook(args);
  if (pluginGate.blocked === true) {
    return {
      blocked: true,
      result: {
        success: false,
        status: 403,
        // Label the source: this 403 is our own policy decision, not the provider
        // rejecting us. Unlabelled, it is indistinguishable from a real upstream 403
        // and gets the connection banned. Matches the type already sent to the client
        // in pluginOnRequest.ts.
        errorType: "plugin_block",
        errorCode: "plugin_block",
        error: "Request blocked by plugin",
        response: pluginGate.response,
      },
    };
  }
  if (pluginGate.body) {
    return { blocked: false, body: pluginGate.body };
  }
  return { blocked: false, body: args.body };
}
