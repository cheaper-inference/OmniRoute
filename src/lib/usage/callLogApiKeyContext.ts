import { AsyncLocalStorage } from "node:async_hooks";

export interface CallLogApiKeyContext {
  apiKeyId: string | null;
  apiKeyName: string | null;
  /**
   * Provider connection selected for this attempt. Optional: modal handlers
   * that already pass `connectionId` on the entry keep precedence.
   */
  connectionId?: string | null;
  mediaWrites?: { endpoint: string; usage: boolean; callLog: boolean };
}

const callLogApiKeyContext = new AsyncLocalStorage<CallLogApiKeyContext>();

export function toCallLogApiKeyContext(
  key: { id?: string | null; name?: string | null } | null | undefined,
  credentials?: unknown
): CallLogApiKeyContext {
  const connectionId = (credentials as { connectionId?: unknown } | null)?.connectionId;
  return {
    apiKeyId: key?.id ?? null,
    apiKeyName: key?.name ?? null,
    connectionId: typeof connectionId === "string" ? connectionId : undefined,
  };
}

/**
 * Bind API-key (and connection) attribution to every call log emitted by one request.
 *
 * Modal handlers fan out into provider-specific helpers that write their own
 * call logs. Request-scoped storage keeps that attribution available without
 * threading identity parameters through every provider handler.
 */
export function runWithCallLogApiKeyContext<TResult>(
  context: CallLogApiKeyContext,
  callback: () => TResult
): TResult {
  return callLogApiKeyContext.run(context, callback);
}

export function getCallLogApiKeyContext(): CallLogApiKeyContext | null {
  return callLogApiKeyContext.getStore() ?? null;
}

/** Observe the existing writers within one provider attempt. */
export async function trackMediaWrites<T>(
  context: CallLogApiKeyContext,
  endpoint: string,
  attempt: () => Promise<T>
) {
  const mediaWrites = { endpoint, usage: false, callLog: false };
  const result = await runWithCallLogApiKeyContext({ ...context, mediaWrites }, attempt);
  return { result, mediaWrites };
}
