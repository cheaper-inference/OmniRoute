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

export function grokBotAfter(value: string): string | null {
  if (!/^(?:0|[1-9][0-9]{0,19})$/.test(value)) return null;
  return BigInt(value) <= 18_446_744_073_709_551_615n ? value : null;
}

export function grokBotGeneration(value: string | null): number | null {
  if (value === null || value === "") return null;
  if (!/^(?:0|[1-9][0-9]{0,15})$/.test(value)) return null;
  const generation = BigInt(value);
  return generation <= 9_007_199_254_740_991n ? Number(generation) : null;
}
