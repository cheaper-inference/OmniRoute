import { randomUUID } from "node:crypto";

export const CHATGPT_WEB_CODEX_PROBE_ORIGINATOR = "codex_omniroute_probe";

/**
 * A model test for ChatGPT Web (Codex), shaped as the only request its executor serves: a
 * Codex-originated /v1/responses turn bound to its own thread and turn, whose user message
 * carries that turn id the way Codex CLI input items do.
 */
export function buildChatGptWebCodexProbe(
  model: string,
  prompt: string
): { body: Record<string, unknown>; headers: Record<string, string> } {
  const id = randomUUID();
  const threadId = `omniroute-probe-thread-${id}`;
  const turnId = `omniroute-probe-turn-${id}`;
  return {
    headers: { originator: CHATGPT_WEB_CODEX_PROBE_ORIGINATOR },
    body: {
      model,
      input: [
        {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text: prompt }],
          internal_chat_message_metadata_passthrough: { turn_id: turnId },
        },
      ],
      tools: [],
      store: false,
      stream: false,
      client_metadata: {
        "x-codex-turn-metadata": JSON.stringify({ thread_id: threadId, turn_id: turnId }),
      },
    },
  };
}
