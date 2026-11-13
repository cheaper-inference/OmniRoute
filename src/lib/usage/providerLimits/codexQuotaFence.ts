import {
  adoptCodexConnectionFence,
  captureCodexConnectionFence,
  isCodexConnectionFenceCurrent,
  type CodexConnectionFence,
} from "@/lib/db/codexConnectionFences";
import type { ProviderLimitsCacheEntry } from "@/lib/db/providerLimits";
import type { ProviderConnectionLike } from "./credentialRefresh";

type JsonRecord = Record<string, unknown>;

// Owner-fence bookkeeping for live quota reads: a refreshed or adopted credential moves
// the fence forward, and a batch drops entries whose Codex owner changed mid-flight.

/** The fence that matches the credential a usage read actually used after a refresh. */
export function refreshedCodexFence(
  fence: CodexConnectionFence | null,
  connection: ProviderConnectionLike,
  result: { connection: ProviderConnectionLike; refreshed: boolean; adopted?: boolean }
): CodexConnectionFence | null {
  if (!fence || !(result.refreshed || result.adopted)) return fence;
  return result.adopted
    ? adoptCodexConnectionFence(
        fence,
        connection as unknown as JsonRecord,
        result.connection as unknown as JsonRecord,
        connection.id
      )
    : captureCodexConnectionFence(result.connection as unknown as JsonRecord, connection.id);
}

export type FetchedLimitsCache = {
  connectionId: string;
  cache: ProviderLimitsCacheEntry;
  codexFence?: CodexConnectionFence | null;
};
export type PendingLimitsCacheEntry = {
  connectionId: string;
  entry: ProviderLimitsCacheEntry;
  codexFence?: CodexConnectionFence | null;
};

/** Drop batch entries whose Codex owner changed; record why instead of persisting them. */
export function currentQuotaBatchEntries(
  entries: PendingLimitsCacheEntry[],
  caches: Record<string, ProviderLimitsCacheEntry>,
  errors: Record<string, string>
): PendingLimitsCacheEntry[] {
  // A later account can keep this batch open after an earlier response finished.
  return entries.filter(({ connectionId, codexFence }) => {
    if (!codexFence || isCodexConnectionFenceCurrent(codexFence)) return true;
    delete caches[connectionId];
    errors[connectionId] = "Codex connection changed while the quota batch was running";
    return false;
  });
}
