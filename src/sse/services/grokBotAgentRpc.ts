import { getTransport } from "@omniroute/open-sse/executors/grok-bot.ts";

export function grokBotAgentRpc(accessToken: string) {
  const transport = getTransport(accessToken);
  return (method: string, payload: Record<string, unknown>) => transport.rpc(method, payload);
}
