import type { RegistryEntry } from "../../shared.ts";

export const claude_agentProvider: RegistryEntry = {
  id: "claude-agent",
  alias: "ca",
  format: "claude",
  executor: "claude-agent",
  baseUrl: "claude-agent://stdio",
  // Authentication is owned by the user's existing Claude Code login: the
  // @anthropic-ai/claude-agent-sdk spawns its bundled Claude Code CLI, which
  // uses the host's ~/.claude credentials. OmniRoute never stores an Anthropic
  // OAuth token or calls the Anthropic API directly.
  authType: "none",
  authHeader: "none",
  defaultContextLength: 200000,
  models: [
    {
      id: "claude-sonnet-5-5",
      name: "Claude Sonnet 5.5",
      contextLength: 1000000,
      maxOutputTokens: 128000,
      toolCalling: true,
      supportsXHighEffort: true,
      unsupportedParams: ["temperature", "top_p", "top_k"],
    },
    {
      id: "claude-opus-5-5",
      name: "Claude Opus 5.5",
      contextLength: 1000000,
      maxOutputTokens: 128000,
      toolCalling: true,
      supportsReasoning: true,
      supportsXHighEffort: true,
      supportedThinkingEfforts: ["low", "medium", "high", "xhigh", "max"],
      supportsVision: true,
      unsupportedParams: ["temperature", "top_p", "top_k"],
    },
    {
      id: "claude-haiku-5-5",
      name: "Claude Haiku 5.5",
      contextLength: 1000000,
      maxOutputTokens: 128000,
      toolCalling: true,
      supportsReasoning: true,
      supportsXHighEffort: true,
      supportedThinkingEfforts: ["low", "medium", "high", "xhigh", "max"],
      unsupportedParams: ["temperature", "top_p", "top_k"],
    },
  ],
};
