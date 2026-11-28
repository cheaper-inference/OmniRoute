import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

// CrowLLM (crowllm.com) — OpenAI-compatible gateway. Free key from
// crowllm.com/sign-up (email only, no card); 39 model ids carry a `:free`
// suffix and 31 of them bill at zero in the public /api/pricing feed. Live
// probe 2026-11-23: GET /v1/models answers 200 without a key but 401s
// "Invalid token" on a wrong Bearer, so keyed discovery is a real check.
// Per-account RPM/RPD is unpublished (429 on cap). The same host also serves
// Anthropic /v1/messages (bare origin) and Gemini /v1beta shapes; only the
// OpenAI shape is registered here.
export const crowllmProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "crowllm",
  alias: "crowllm",
  baseUrl: "https://crowllm.com/v1/chat/completions",
  modelsUrl: "https://crowllm.com/v1/models",
  models: [],
  passthroughModels: true,
});
