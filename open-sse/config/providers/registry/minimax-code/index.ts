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
 * The effort levels the model catalog declares per model.
 *
 * The MiniMax Code product declares them for MiniMax-M3.1-Flash:
 * `effortOptions = ['default', 'low', 'medium', 'high', 'xhigh', 'max']`.
 * MiniMax-M3 has none — its catalog entry makes the thinking switchable
 * instead — and the CLI refuses `--effort` for a model without levels.
 */
export const MINIMAX_CODE_EFFORT_LEVELS_BY_MODEL: Record<string, readonly string[]> = {
  "MiniMax-M3.1-Flash": ["low", "medium", "high", "xhigh", "max"],
  "MiniMax-M3": [],
};

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
