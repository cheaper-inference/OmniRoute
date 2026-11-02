import { z } from "zod";
import { nativeSystemOnePricing, type SystemOneProvider } from "../config/systemOneRegistry.ts";

const nativeModelSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  release_date: z.string().optional(),
});
const nativeListSchema = z.object({ models: z.array(nativeModelSchema) });

/** OpenRouter-style per-token price string from a USD-per-1M-token rate. */
export function perTokenPrice(perMillion: number): string {
  // Fixed notation ("0.000000042", not "4.2e-8"), matching the OpenRouter catalog.
  return (perMillion / 1_000_000).toFixed(15).replace(/\.?0+$/, "") || "0";
}

export function parseTypeSafeModels(raw: unknown) {
  return nativeListSchema.parse(raw).models.map((model) => {
    const published = nativeSystemOnePricing("typesafe", model.name);
    return {
      id: model.name,
      name: model.name,
      description: model.description,
      release_date: model.release_date,
      apiFormat: "systemone",
      supportedEndpoints: ["systemone"],
      modelType: "decision" as const,
      architecture: { input_modalities: ["text"], output_modalities: ["decisions"] },
      ...(published
        ? {
            pricing: {
              prompt: perTokenPrice(published.input),
              completion: perTokenPrice(published.output),
            },
            pricing_source: "typesafe-published",
          }
        : { pricing_status: "unknown" }),
    };
  });
}

export function qualifyDecisionModel(provider: SystemOneProvider, raw: Record<string, unknown>) {
  const id = String(raw.id);
  const endpoints = Array.isArray(raw.supportedEndpoints) ? raw.supportedEndpoints : ["systemone"];
  const chat = endpoints.includes("chat") || endpoints.includes("responses");
  return {
    ...raw,
    id: `${provider}/${id}`,
    object: "model",
    owned_by: provider,
    root: id,
    type: chat ? "chat" : "decision",
    supported_endpoints: endpoints,
  };
}

/** OpenRouter's output modality is model metadata, not its author's provider. */
export function applyDecisionModelCapabilities(raw: unknown): Record<string, unknown> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const record = raw as Record<string, unknown>;
  const architecture = record.architecture as { output_modalities?: unknown } | undefined;
  const outputs = architecture?.output_modalities;
  if (!Array.isArray(outputs) || !outputs.includes("decisions")) return record;
  const endpoints = [
    ...(Array.isArray(record.supportedEndpoints) ? record.supportedEndpoints : []),
    "systemone",
  ];
  if (outputs.includes("text")) endpoints.push("chat");
  return {
    ...record,
    supportedEndpoints: [...new Set(endpoints)],
    ...(outputs.includes("text") ? {} : { apiFormat: "systemone", modelType: "decision" }),
  };
}
