// localStorage persistence for the provider test playground conversation (#15097).
// The card is unmounted when the user flips Test ↔ Logs or closes the slide-over, so
// the conversation is kept per provider × selected key and restored on mount.

export interface StoredPlaygroundMessage {
  role: "user" | "assistant";
  content: string;
  model?: string;
}

export function playgroundMessagesStorageKey(providerId: string, selectedKey: string): string {
  return `omniroute-playground-messages-${providerId}-${selectedKey || "default"}`;
}

/**
 * Keep only well-formed messages and drop empty assistant placeholders (left behind
 * when an in-flight stream is aborted before the first token arrived).
 */
export function sanitizePlaygroundMessages(value: unknown): StoredPlaygroundMessage[] {
  if (!Array.isArray(value)) return [];
  const out: StoredPlaygroundMessage[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const { role, content, model } = item as Record<string, unknown>;
    if (role !== "user" && role !== "assistant") continue;
    if (typeof content !== "string") continue;
    if (role === "assistant" && content === "") continue;
    out.push(typeof model === "string" ? { role, content, model } : { role, content });
  }
  return out;
}

export function loadPlaygroundMessages(storageKey: string): StoredPlaygroundMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = window.localStorage.getItem(storageKey);
    return saved ? sanitizePlaygroundMessages(JSON.parse(saved)) : [];
  } catch {
    return [];
  }
}

/** Best-effort write: blocked storage or a full quota must never break the panel. */
export function savePlaygroundMessages(storageKey: string, messages: unknown): void {
  if (typeof window === "undefined") return;
  try {
    const clean = sanitizePlaygroundMessages(messages);
    if (clean.length === 0) window.localStorage.removeItem(storageKey);
    else window.localStorage.setItem(storageKey, JSON.stringify(clean));
  } catch {
    // ignore — persistence is a convenience, not a requirement
  }
}
