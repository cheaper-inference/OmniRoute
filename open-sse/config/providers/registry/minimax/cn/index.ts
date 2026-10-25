import type { RegistryEntry } from "../../../shared.ts";

export const minimax_cnProvider: RegistryEntry = {
  id: "minimax-cn",
  alias: "minimax-cn", // unique alias (was colliding with minimax)
  format: "openai",
  executor: "default",
  baseUrl: "https://api.minimaxi.com/v1/chat/completions",
  modelsUrl: "https://api.minimaxi.com/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    {
      id: "MiniMax-M3.1-Flash",
      name: "MiniMax M3.1 Flash",
      contextLength: 1_000_000,
      supportsReasoning: true,
      alwaysReasons: true,
      supportedThinkingEfforts: ["low", "medium", "high", "xhigh", "max"],
      supportsXHighEffort: true,
      supportsVision: true,
      supportsVideo: true,
    },
    // Keep parity with minimax to ensure model discovery works for minimax-cn connections.
    // #3110: MiniMax M3 — frontier coding model with 1M context
    {
      id: "MiniMax-M3",
      name: "MiniMax M3",
      contextLength: 1_000_000,
      supportsVision: true,
      supportsVideo: true,
      supportedThinkingEfforts: ["adaptive", "disabled"],
    },
    { id: "MiniMax-M2.7", name: "MiniMax M2.7" },
    { id: "MiniMax-M2.7-highspeed", name: "MiniMax M2.7 Highspeed" },
    { id: "MiniMax-M2.5", name: "MiniMax M2.5" },
    { id: "MiniMax-M2.5-highspeed", name: "MiniMax M2.5 Highspeed" },
  ],
};
