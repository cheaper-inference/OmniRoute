/**
 * Dispatch seam between chat.ts and executeChatWithBreaker, extracted so the
 * frozen god-file `chat.ts` does not grow (check:file-size).
 *
 * Beyond forwarding the call it reacts to a combo per-model timeout that
 * abandons the dispatched account: the #6219 follow-up drops the session pin on
 * it (see `evictSessionAffinityOnComboTimeout` for why the existing #6219
 * eviction never covers this path), and the combo request's remaining targets
 * prefer another account (see chat/comboStalledConnections.ts).
 */

import { executeChatWithBreaker } from "./chatHelpers";
import { resolveDispatchClientRawRequest } from "./chat/clientRawRequest.ts";
import {
  watchComboTargetStall,
  type ComboStalledConnections,
} from "./chat/comboStalledConnections.ts";
import { evictSessionAffinityOnComboTimeoutAsync as evictSessionAffinityOnComboTimeout } from "../services/sessionAffinityPin";

/** The dispatch arguments chat.ts already assembles, plus what the eviction reads. */
type DispatchArgs = {
  provider: string;
  credentials: { connectionId: string };
  clientRawRequest: any;
  [key: string]: unknown;
};

/** Runtime fields this seam consults; the rest of runtimeOptions is ignored. */
type DispatchRuntimeOptions = {
  sessionAffinityKey?: string | null;
  modelAbortSignal?: AbortSignal | null;
  comboStalledConnections?: ComboStalledConnections | null;
};

/**
 * Merge the per-model abort signal into the outgoing request, run the upstream
 * dispatch, and evict the sticky session pin when a combo per-model timeout
 * abandons it.
 *
 * The abort surfaces two ways: as a rejection out of `executeChatWithBreaker`
 * (the common case — `buildTargetTimeoutRunner` then swallows it behind its
 * synthetic 524), or as a failed result when an executor catches the abort
 * itself. Both are covered. The eviction is a no-op unless this dispatch was
 * aborted by the per-model timeout specifically.
 *
 * The same timeout also marks the account in the combo request's
 * `comboStalledConnections`, so its remaining targets prefer another account.
 * A successful dispatch keeps that watch until the combo has the stream's first
 * output; any other outcome ends it.
 */
export async function dispatchChatWithAffinityEviction(
  args: DispatchArgs,
  runtimeOptions: DispatchRuntimeOptions
): Promise<Awaited<ReturnType<typeof executeChatWithBreaker>>> {
  const evict = () =>
    evictSessionAffinityOnComboTimeout({
      sessionKey: runtimeOptions.sessionAffinityKey,
      provider: args.provider,
      connectionId: args.credentials?.connectionId,
      modelAbortSignal: runtimeOptions.modelAbortSignal,
    });
  const stopStallWatch = watchComboTargetStall(
    runtimeOptions.comboStalledConnections,
    runtimeOptions.modelAbortSignal,
    args.provider,
    args.credentials?.connectionId
  );

  let dispatched: Awaited<ReturnType<typeof executeChatWithBreaker>>;
  try {
    dispatched = await executeChatWithBreaker({
      ...args,
      clientRawRequest: resolveDispatchClientRawRequest(
        args.clientRawRequest,
        runtimeOptions.modelAbortSignal
      ),
    });
  } catch (dispatchErr) {
    stopStallWatch();
    const evicted = evict();
    if (evicted instanceof Promise) await evicted;
    throw dispatchErr;
  }

  // A resource-pressure short-circuit (no upstream dispatch happened) is not a
  // combo per-model timeout — never treat it as one.
  if ("localResourcePressureResult" in dispatched) {
    stopStallWatch();
    return dispatched;
  }

  if (!dispatched.result?.success) {
    stopStallWatch();
    const evicted = evict();
    if (evicted instanceof Promise) await evicted;
  }
  return dispatched;
}
