import type { RegistryEntry } from "../../shared.ts";

/**
 * Models exposed by the local MiniMax Code CLI. The ids are the runtime's own
 * model ids: the run requests them as `minimax/<model id>`.
 */
export const MINIMAX_CODE_MODELS = [
  {
    id: "MiniMax-M3.1-Flash",
    name: "MiniMax M3.1 Flash",
    contextLength: 1048576,
    supportsVision: true,
  },
  { id: "MiniMax-M3", name: "MiniMax M3", contextLength: 512000, supportsVision: true },
];

/**
 * MiniMax Code backend. A run goes to the managed MiniMax subscription
 * gateway, which speaks the native tool protocol; a plain chat turn can fall
 * back to the locally installed MiniMax Code CLI.
 *
 * Authentication stays in the user's local MiniMax Code profile: the provider
 * reads that profile to authenticate a run and writes a rotated credential
 * back to it, and OmniRoute stores no credential of its own.
 */
export const minimaxCodeProvider: RegistryEntry = {
  id: "minimax-code",
  alias: "mmcode",
  format: "openai",
  executor: "minimax-code",
  baseUrl: "minimax-code://gateway",
  authType: "none",
  authHeader: "none",
  models: MINIMAX_CODE_MODELS,
};
