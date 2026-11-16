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

// Account failover calls handleChatCore again for the same client request, and a plugin counts
// client requests, not attempts. A plain pass-through is therefore remembered per client request
// (the headers snapshot chat.ts builds once) and target. A block or a rewrite is never remembered:
// the next attempt gets the plugin's answer again.
// shortcut: a caller with no headers snapshot is never remembered; upgrade if one needs it.
const passedThrough = new WeakMap<object, Set<string>>();

export async function runPluginRequestGate<TBody>(
  args: Omit<Parameters<typeof runPluginOnRequestHook>[0], "body"> & { body: TBody }
): Promise<PluginRequestGateResult<TBody>> {
  const owner = args.headers ?? null;
  const key = `${args.provider}\u0000${args.model}`;
  if (owner && passedThrough.get(owner)?.has(key)) return { blocked: false, body: args.body };
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
  if (pluginGate.body && pluginGate.body !== args.body) {
    return { blocked: false, body: pluginGate.body };
  }
  if (owner) passedThrough.set(owner, (passedThrough.get(owner) ?? new Set()).add(key));
  return { blocked: false, body: args.body };
}
