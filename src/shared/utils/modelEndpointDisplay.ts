import {
  isTrustedEndpointCapabilitySource,
  normalizeModelSupportedEndpoints,
} from "@/shared/constants/modelSupportedEndpoints";

// Display-only evidence from the official model reference (2026-11-08):
// https://developers.openai.com/api/docs/models/<model-id>
// Do not infer support from an arbitrary GPT prefix or from a routing target:
// a preferred wire protocol is not an exhaustive capability declaration.
const CHAT_AND_RESPONSES = new Set([
  "gpt-6.1-sol",
  "gpt-6-astra",
  "gpt-6-sol",
  "gpt-6-luna",
  "gpt-5.6", // Documented alias of gpt-5.6-sol.
  "gpt-5.6-sol",
  "gpt-5.6-terra",
  "gpt-5.6-luna",
  "gpt-5.5",
  "gpt-5.4",
  "gpt-5.4-mini",
  "gpt-5.4-nano",
  "gpt-4.1",
  "gpt-4.1-mini",
  "gpt-4.1-nano",
  "gpt-4o",
  "gpt-4o-mini",
  "o3",
  "o3-mini",
  "o4-mini",
]);
const RESPONSES_ONLY = new Set(["gpt-5.5-pro", "gpt-5.4-pro"]);

/** Enrich assumed display metadata without persisting it or changing routing policy. */
export function resolveModelEndpointDisplay(
  provider: string,
  modelId: string,
  supportedEndpoints?: readonly string[],
  source?: string
): { endpoints: string[]; source: string | undefined } {
  if (provider === "openai" && !isTrustedEndpointCapabilitySource(source)) {
    const id = modelId.startsWith("openai/") ? modelId.slice("openai/".length) : modelId;
    if (CHAT_AND_RESPONSES.has(id)) return { endpoints: ["chat", "responses"], source: "inferred" };
    if (RESPONSES_ONLY.has(id)) return { endpoints: ["responses"], source: "inferred" };
  }
  return {
    endpoints: supportedEndpoints?.length
      ? normalizeModelSupportedEndpoints(supportedEndpoints)
      : ["chat"],
    source,
  };
}
