export type GrokBotReadCall = {
  method: string;
  payload: Record<string, unknown>;
};

export type GrokBotReadPlan = GrokBotReadCall & {
  follow?: GrokBotReadCall;
};

export function grokBotReadQuery(input: { agentId?: string }): GrokBotReadPlan {
  if (typeof input.agentId === "string" && input.agentId.length > 0) {
    return {
      method: "ListGrokBotAgentSkills",
      payload: { agentId: input.agentId },
      follow: {
        method: "ListGrokBotAgentAutomations",
        payload: { agentId: input.agentId, timeZone: "UTC" },
      },
    };
  }
  return { method: "ListGrokBotAgents", payload: {} };
}
