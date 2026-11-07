/**
 * chatCore provider-request registration helpers (chatCore god-file decomposition, slice 2).
 *
 * Extracted byte-identically from handleChatCore, right before dispatch: the provider-request
 * snapshot registered on the pending-request scope (the translated body with its model resolved,
 * plus the client `messages` when the translated wire shape carries none), and the message count
 * used by the REQUEST debug line across the Chat / Gemini / Kiro wire shapes.
 */

type TranslatedMessageCarrier = {
  messages?: unknown[];
  contents?: unknown[];
  request?: { contents?: unknown[] };
  conversationState?: { history?: unknown[]; currentMessage?: unknown };
};

export function buildRegisteredProviderRequest(
  translatedBody: unknown,
  body: unknown,
  effectiveModel: string
): unknown {
  return translatedBody && typeof translatedBody === "object" && !Array.isArray(translatedBody)
    ? {
        ...(translatedBody as Record<string, unknown>),
        model:
          typeof (translatedBody as Record<string, unknown>).model === "string"
            ? (translatedBody as Record<string, unknown>).model
            : effectiveModel,
        ...(!Array.isArray((translatedBody as Record<string, unknown>).messages) &&
        Array.isArray((body as Record<string, unknown>).messages)
          ? { messages: (body as Record<string, unknown>).messages }
          : {}),
      }
    : translatedBody;
}

export function countTranslatedMessages(translatedBody: TranslatedMessageCarrier): number {
  return (
    translatedBody.messages?.length ||
    translatedBody.contents?.length ||
    translatedBody.request?.contents?.length ||
    (translatedBody.conversationState?.history?.length ?? 0) +
      (translatedBody.conversationState?.currentMessage ? 1 : 0) ||
    0
  );
}
