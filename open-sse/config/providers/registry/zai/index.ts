import type { RegistryEntry } from "../../shared.ts";
import { getAnthropicCompatHeaders } from "../../shared.ts";

export const zaiProvider: RegistryEntry = {
  id: "zai",
  alias: "zai",
  format: "claude",
  executor: "default",
  naiveResetTimezone: "+08:00",
  baseUrl: "https://api.z.ai/api/anthropic/v1/messages",
  urlSuffix: "?beta=true",
  authType: "apikey",
  authHeader: "x-api-key",
  headers: getAnthropicCompatHeaders(),
  // Discovery on this provider's Anthropic-compat /models surface omits the
  // coding-plan glm-5.3-flash family that the OpenAI-compatible endpoint
  // serves; see unionRegistryDispatchModels for the opt-in semantics.
  registryDispatchUnion: true,
  // Real upstream model IDs only. GLM-5.3-family models are tagged for z.ai's
  // OpenAI-compatible Coding Plan endpoint because their documented reasoning
  // selector is `reasoning_effort` (low|high|max) and GLM-5.3-Flash supports
  // native vision there. Older entries stay on the provider's default Anthropic
  // compatibility path to preserve existing behavior.
  models: [
    {
      id: "glm-5.3",
      name: "GLM 5.3",
      contextLength: 1000000,
      maxOutputTokens: 131072,
      toolCalling: true,
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "high", "max"],
      targetFormat: "openai",
    },
    {
      id: "glm-5.3-flash",
      name: "GLM 5.3 Flash",
      contextLength: 1000000,
      maxOutputTokens: 131072,
      toolCalling: true,
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "high", "max"],
      supportsVision: true,
      targetFormat: "openai",
    },
    { id: "glm-5.2", name: "GLM 5.2" },
    { id: "glm-5.1", name: "GLM 5.1" },
    { id: "glm-5", name: "GLM 5" },
    { id: "glm-5-turbo", name: "GLM 5 Turbo" },
    // Tagged with an explicit dispatch intent so the authoritative live catalog
    // cannot veto it: the live /models list (13 ids, 2026-11-25) omits
    // glm-4.7-flash, while the coding-plan chat endpoint answered it with 200.
    // The value equals this provider's default format, so the wire format and
    // endpoint are unchanged; the tag only keeps the model admitted. Same
    // mechanism as glm-5.3-flash (partial-discovery incident, 2026-10-05).
    { id: "glm-4.7-flash", name: "GLM 4.7 Flash", targetFormat: "claude" },
    { id: "glm-4.7", name: "GLM 4.7" },
    // #21219: glm-5.4 answers as itself on the coding-plan chat surface (200,
    // model=glm-5.4, live probe 2026-11-25); keep it as a static fallback next to
    // discovery so a fresh install shows the current flagship.
    { id: "glm-5.4", name: "GLM 5.4" },
  ],
};
