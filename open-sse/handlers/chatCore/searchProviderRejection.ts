/**
 * chatCore executor resolution with the search-provider chat rejection (#17858).
 *
 * `getExecutor()` throws `SearchProviderChatError` when a chat request targets a search-only
 * provider (e.g. `anysearch-search/web`). That is a client routing mistake, not a server fault,
 * so it is converted here, once, for every handleChatCore entry point (/v1/chat/completions,
 * /v1/messages, /v1/responses, ...): instead of escaping as an empty 500, it comes back as the
 * typed 400 error result (`search_provider_not_chat`, with the POST /v1/search hint) in
 * `rejected`. The handler finalizes its pending-request slot and returns that result, the same
 * way it answers the capability-mismatch 400 just before. Any other resolution error is rethrown
 * unchanged.
 */

import { createErrorResult } from "../../utils/error.ts";
import { SearchProviderChatError } from "../../utils/searchProviderChatError.ts";

type LoggerLike = { warn?: (...args: unknown[]) => void } | null | undefined;

export type ChatExecutorResolution<E> =
  | { executor: E; rejected: null }
  | { executor: null; rejected: ReturnType<typeof createErrorResult> };

export async function resolveChatExecutor<E>(
  resolveExecutor: (provider: string) => Promise<E>,
  provider: string,
  log?: LoggerLike
): Promise<ChatExecutorResolution<E>> {
  try {
    return { executor: await resolveExecutor(provider), rejected: null };
  } catch (error) {
    if (!(error instanceof SearchProviderChatError)) throw error;
    log?.warn?.("EXECUTOR", error.message);
    return {
      executor: null,
      rejected: createErrorResult(
        error.status,
        error.message,
        null,
        error.code,
        "invalid_request_error"
      ),
    };
  }
}
