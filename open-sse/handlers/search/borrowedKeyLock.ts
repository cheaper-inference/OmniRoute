import { COOLDOWN_MS, HTTP_STATUS, RateLimitReason } from "../../config/constants.ts";
import { lockModel } from "../../services/accountFallback.ts";

/**
 * A search provider with no keys of its own borrows a chat key (SEARCH_CREDENTIAL_FALLBACKS).
 * A rate limit on that search says nothing about the key's chat health, so the failure is
 * recorded as a model lock on a synthetic model that only search asks for. Chat never selects
 * that model, so it keeps the key; search skips the key until the lock expires.
 */
export const searchKeyLockModel = (searchProviderId: string) => `websearch:${searchProviderId}`;

const SEARCH_KEY_LOCK_STATUSES = new Set<number>([
  HTTP_STATUS.PAYMENT_REQUIRED,
  HTTP_STATUS.RATE_LIMITED,
  HTTP_STATUS.PLAN_LIMIT_EXCEEDED,
]);

/**
 * Lock a borrowed key for search after a rate-limit or quota failure. No-op for the search
 * provider's own keys and for statuses that say nothing about the key. The single call site is
 * executeProviderFetch, which sees every attempt (including a primary that failed over).
 */
export function lockBorrowedSearchKey(
  searchProviderId: string,
  ownerProvider: unknown,
  connectionId: string,
  status: number
): void {
  if (typeof ownerProvider !== "string" || ownerProvider === searchProviderId) return;
  if (!SEARCH_KEY_LOCK_STATUSES.has(status)) return;
  lockModel(
    ownerProvider,
    connectionId,
    searchKeyLockModel(searchProviderId),
    RateLimitReason.RATE_LIMIT_EXCEEDED,
    COOLDOWN_MS.rateLimit
  );
}
