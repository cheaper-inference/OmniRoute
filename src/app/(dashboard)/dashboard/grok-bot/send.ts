export function grokBotSendBody(input: {
  agentId: string;
  text: string;
  messageId: string;
  sentAtMs: string;
}): Record<string, string> | null {
  if (input.text.trim() === "") return null;
  return {
    agentId: input.agentId,
    sessionId: "",
    machineId: "",
    messageId: input.messageId,
    text: input.text,
    sentAtMs: input.sentAtMs,
  };
}
