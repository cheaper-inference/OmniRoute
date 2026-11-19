/**
 * Model compatibility protocol keys — shared between client UI and server.
 * Must not import Node or DB code so client components can import safely.
 */

/** Client request shapes from detectFormat — compat options apply when the client uses this protocol */
export const MODEL_COMPAT_PROTOCOL_KEYS = ["openai", "openai-responses", "claude"] as const;

export type ModelCompatProtocolKey = (typeof MODEL_COMPAT_PROTOCOL_KEYS)[number];

/**
 * Per-node thinking-replay contract (`modelCompatOverrides[].thinkingReplay`), read by
 * open-sse/translator/helpers/thinkingReplayMode.ts. Absent = default prefix-derived handling.
 */
export const THINKING_REPLAY_MODES = ["redacted", "text", "none"] as const;

export type ThinkingReplayMode = (typeof THINKING_REPLAY_MODES)[number];

export function isThinkingReplayMode(value: unknown): value is ThinkingReplayMode {
  return typeof value === "string" && (THINKING_REPLAY_MODES as readonly string[]).includes(value);
}
