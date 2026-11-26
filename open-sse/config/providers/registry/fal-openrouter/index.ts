import type { RegistryEntry } from "../../shared.ts";

/**
 * fal.ai's OpenRouter router: an OpenAI-compatible endpoint that serves the
 * OpenRouter model catalog and bills it through the fal account.
 *
 * fal exposes no `/models` endpoint (404 on every variant), so the catalog is
 * discovered from OpenRouter's public list — see the `fal-openrouter` entry in
 * `src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts`.
 *
 * The gateway is exposed as `fal-openrouter/<openrouter-id>` — deliberately not
 * `fal/` or `fal.run/`, which would imply it serves every fal endpoint (image,
 * media) rather than just the OpenRouter router.
 *
 * Model ids are plain OpenRouter ids (`anthropic/claude-sonnet-5.5`), which is
 * also why `passthroughModels` is set: a per-model upstream failure must not
 * cool down every other model on the same fal connection.
 */
export const falOpenRouterProvider: RegistryEntry = {
  id: "fal-openrouter",
  format: "openai",
  executor: "default",
  baseUrl: "https://fal.run/openrouter/router/openai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 128000,
  passthroughModels: true,
  // fal has no /models route, so key validation falls back to a 1-token chat
  // probe (`validateOpenAILikeProvider`) using the first model below.
  models: [{ id: "anthropic/claude-haiku-5.5", name: "Claude Haiku 5.5" }],
};
