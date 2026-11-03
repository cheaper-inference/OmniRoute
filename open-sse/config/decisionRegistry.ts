import { z } from "zod";
import {
  DecisionError,
  record,
  type DecisionBackend,
  type DecisionCredentials,
  type DecisionFormat,
} from "../handlers/decisionTypes.ts";

/** Stored inside an existing connection, never accepted from inference callers. */
export const decisionConnectionSchema = z
  .object({
    format: z.enum(["decisions", "systemone"]),
    endpoint: z.url(),
    modelsEndpoint: z.url().optional(),
    models: z.array(z.string().min(1).max(512)).max(256).optional(),
    timeoutMs: z.number().int().min(100).max(120_000).optional(),
    fallbackModels: z.array(z.string().min(1).max(512)).max(4).optional(),
  })
  .strict();

export function splitDecisionModel(id: string): { provider: string; model: string } {
  const slash = id.indexOf("/");
  if (slash < 1 || slash === id.length - 1 || /[\s\x00-\x1f?#]/.test(id)) {
    throw new DecisionError(400, "qualified_model_required");
  }
  return { provider: id.slice(0, slash), model: id.slice(slash + 1) };
}

export function resolveDecisionBackend(
  provider: string,
  credentials: DecisionCredentials
): DecisionBackend {
  const data = record(credentials.providerSpecificData);
  const base = typeof data.baseUrl === "string" ? data.baseUrl.replace(/\/+$/, "") : null;
  const configured =
    data.decision === undefined ? null : decisionConnectionSchema.safeParse(data.decision);
  if (configured && !configured.success)
    throw new DecisionError(503, "invalid_provider_configuration");
  const config = configured?.success ? configured.data : null;
  const defaultBase = base?.replace(/\/v1$/, "");
  const defaults: Record<
    string,
    {
      format: DecisionFormat;
      url: string;
      modelsUrl: string;
      discovery: DecisionBackend["discovery"];
    }
  > = {
    openai: {
      format: "decisions",
      url: "https://api.openai.com/v1/decisions",
      modelsUrl: "https://api.openai.com/v1/models",
      discovery: "openai",
    },
    "ollama-local": {
      format: "systemone",
      url: `${defaultBase || "http://localhost:11434"}/v1/systemone`,
      modelsUrl: `${defaultBase || "http://localhost:11434"}/api/tags`,
      discovery: "ollama",
    },
    basal: {
      format: "systemone",
      url: `${defaultBase || "http://localhost:8000"}/v1/systemone`,
      modelsUrl: `${defaultBase || "http://localhost:8000"}/v1/models`,
      discovery: "systemone",
    },
  };
  const entry = defaults[provider];
  if (!config && !entry) throw new DecisionError(400, "unsupported_decision_provider");
  if (!entry && !config?.modelsEndpoint && !config?.models?.length) {
    throw new DecisionError(503, "decision_model_configuration_required");
  }
  // Julia and future engines explicitly configure the endpoint; no runtime endpoint guess.
  const url = config?.endpoint || entry.url;
  return {
    provider,
    format: config?.format || entry.format,
    url,
    modelsUrl: config?.modelsEndpoint || entry?.modelsUrl || new URL("models", url).href,
    discovery: entry?.discovery || "systemone",
    models: config?.models,
    fallbackModels: config?.fallbackModels || [],
    timeoutMs: config?.timeoutMs || 30_000,
  };
}
