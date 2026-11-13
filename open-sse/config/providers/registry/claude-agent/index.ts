import type { RegistryEntry } from "../../shared.ts";
import { claudeProvider } from "../claude/index.ts";

export const claude_agentProvider: RegistryEntry = {
  id: "claude-agent",
  alias: "ca",
  format: "claude",
  executor: "claude-agent",
  baseUrl: "claude-agent://stdio",
  // Auth: per-connection OAuth credentials are imported from a Claude
  // `.credentials.json` (same path as the `claude` provider); the executor
  // passes them to the spawned CLI via CLAUDE_CODE_OAUTH_TOKEN. Without a
  // connection the CLI keeps authenticating with the host's ~/.claude login.
  authType: "oauth",
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
