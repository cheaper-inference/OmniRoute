import { getProviderConnections } from "@/lib/db/providers";
import {
  isAccountUnavailable,
  isModelLocked,
} from "@omniroute/open-sse/services/accountFallback.ts";

type ConnectionRow = {
  id?: unknown;
  rateLimitedUntil?: string | null;
};

export type AntigravityFailoverInput = {
  provider: string;
  model: string;
  /** The account this attempt is about to use. */
  connectionId: string | null | undefined;
  /** Accounts this request already tried. */
  excludedConnectionIds: Iterable<string>;
  /** API-key scope: only these accounts may serve the request (empty/null = all). */
  allowedConnections?: string[] | null;
  /** The request is pinned to one account (forced connection or a session owner). */
  pinned: boolean;
};

/**
 * True when another Antigravity account could take this request right now. The executor
 * then returns a 503 (Google has no capacity for the model on this account) immediately,
 * so chat.ts moves to that account instead of waiting out Google's retry delay. False
 * keeps today's wait-and-retry, so the last usable account still rides out a Google-wide
 * capacity shortage.
 */
export async function hasAlternateAntigravityAccount(
  input: AntigravityFailoverInput
): Promise<boolean> {
  if (input.provider !== "antigravity" || input.pinned || !input.connectionId) return false;
  const excluded = new Set(input.excludedConnectionIds);
  const allowed =
    input.allowedConnections && input.allowedConnections.length > 0
      ? new Set(input.allowedConnections)
      : null;
  let rows: unknown[];
  try {
    rows = await getProviderConnections({ provider: "antigravity", isActive: true });
  } catch {
    return false;
  }
  return rows.some((raw) => {
    const row = raw as ConnectionRow;
    const id = typeof row.id === "string" ? row.id : "";
    if (!id || id === input.connectionId || excluded.has(id)) return false;
    if (allowed && !allowed.has(id)) return false;
    if (isAccountUnavailable(row.rateLimitedUntil)) return false;
    return !isModelLocked("antigravity", id, input.model);
  });
}
