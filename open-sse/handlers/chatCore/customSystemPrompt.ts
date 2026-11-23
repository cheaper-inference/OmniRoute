/**
 * chatCore per-endpoint custom system prompt (port of upstream #2063; chatCore god-file
 * decomposition, slice 2 — design after #15709).
 *
 * Extracted byte-identically from handleChatCore's request entry. The handler resolves the settings
 * snapshot (the `cachedSettings` the combo/chat layer passed in, else getCachedSettings()) and this
 * leaf injects the configured prompt when the feature is enabled. Returns the (possibly rewritten)
 * body — the unchanged input when the feature is off. Settings are passed in rather than read here
 * so the engine leaf takes no new open-sse → src import edge.
 */

import { injectCustomSystemPrompt } from "../../services/systemPrompt.ts";

type LoggerLike = { debug?: (...args: unknown[]) => void } | null | undefined;

export function applyCustomSystemPrompt<TBody>(
  body: TBody,
  _s: Record<string, unknown>,
  log?: LoggerLike
): TBody | Record<string, unknown> {
  if (
    _s.customSystemPromptEnabled === true &&
    typeof _s.customSystemPrompt === "string" &&
    _s.customSystemPrompt
  ) {
    const injected = injectCustomSystemPrompt(
      body as Record<string, unknown>,
      _s.customSystemPrompt
    );
    log?.debug?.("CUSTOMSP", "custom system prompt injected");
    return injected;
  }
  return body;
}
