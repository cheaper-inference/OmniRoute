/**
 * How an executor keeps an automated chat probe (a model test, a combo test or
 * an assessment) out of the signed-in account's conversation history.
 *
 * A web-session provider acts as the signed-in user, so every chat it sends is
 * saved to that account unless the provider offers a mode that keeps no
 * history. Automated probes that left saved conversations behind got an
 * account suspended (#14780). An executor that runs every chat in such a mode
 * declares it here, next to the code that does it, and a test pins the
 * declaration to that mechanism so the claim cannot outlive it.
 */
export type ChatProbeIsolation = "temporary-chat";

export interface ChatProbeIsolatingExecutor {
  /** The provider mode that keeps every chat this executor sends out of the account's history. */
  readonly chatProbeIsolation: ChatProbeIsolation;
}

/** The isolation an executor declares, or null when its chats are saved to the account. */
export function chatProbeIsolationOf(executor: unknown): ChatProbeIsolation | null {
  if (!executor || typeof executor !== "object") return null;
  const declared = (executor as Partial<ChatProbeIsolatingExecutor>).chatProbeIsolation;
  return declared === "temporary-chat" ? declared : null;
}
