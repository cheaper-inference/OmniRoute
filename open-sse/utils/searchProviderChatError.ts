/** Search-only providers cannot be dispatched through the chat executor path. */
export class SearchProviderChatError extends Error {
  readonly status = 400;
  readonly code = "search_provider_not_chat";

  constructor(provider: string) {
    super(
      `Provider "${provider}" is a search provider and does not support chat completions; use POST /v1/search instead.`
    );
  }
}
