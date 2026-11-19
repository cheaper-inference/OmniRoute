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
// A hook that rewrites the body in place and returns the same object is a rewrite too: a
// failover attempt can get its own top-level copy of the body (chat.ts copies it when it rewrites
// the model), which would miss the edit. It is detected by comparing the body's top-level property
// references before and after the hook (cheap, no serialization). Nested in-place edits are shared
// with such a copy, so they still reach the next attempt.
// shortcut: a caller with no headers snapshot is never remembered; upgrade if one needs it.
const passedThrough = new WeakMap<object, Set<string>>();

function topLevelSnapshot(body: unknown): unknown[] | null {
  if (!body || typeof body !== "object") return null;
  return Object.entries(body as Record<string, unknown>).flat();
}

function keepsTopLevel(before: unknown[] | null, body: unknown): boolean {
  const after = topLevelSnapshot(body);
  if (before === null || after === null) return before === after;
  return before.length === after.length && before.every((value, i) => Object.is(value, after[i]));
}

export async function runPluginRequestGate<TBody>(
  args: Omit<Parameters<typeof runPluginOnRequestHook>[0], "body"> & { body: TBody }
): Promise<PluginRequestGateResult<TBody>> {
  const owner = args.headers ?? null;
  const key = `${args.provider}\u0000${args.model}`;
  if (owner && passedThrough.get(owner)?.has(key)) return { blocked: false, body: args.body };
  const before = owner ? topLevelSnapshot(args.body) : null;
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
  if (owner && keepsTopLevel(before, args.body)) {
    passedThrough.set(owner, (passedThrough.get(owner) ?? new Set()).add(key));
  }
  return { blocked: false, body: args.body };
}
