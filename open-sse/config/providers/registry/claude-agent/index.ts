import type { RegistryEntry } from "../../shared.ts";
import { claudeProvider } from "../claude/index.ts";

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
  // Mirror the native claude registry's full model list (Fable 5.1 included);
  // the CLI host login decides what actually works, ids it lacks degrade
  // gracefully in the executor. Sonnet 5.5 stays the default (listed first).
  models: [
    ...claudeProvider.models.filter((m) => m.id === "claude-sonnet-5-5"),
    ...claudeProvider.models.filter((m) => m.id !== "claude-sonnet-5-5"),
  ],
};
