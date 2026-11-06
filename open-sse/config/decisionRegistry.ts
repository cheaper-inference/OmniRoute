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

function decisionDefaults(base: string | null) {
  const defaultBase = base?.replace(/\/v1$/, "");
  const defaults: Record<
    string,
    {
      format: DecisionFormat;
      url: string;
      modelsUrl: string;
      discovery: DecisionBackend["discovery"];
      models?: string[];
    }
  > = {
    supersoniclabs: {
      format: "systemone",
      url: "https://api.supersoniclabs.ai/v1/systemone",
      modelsUrl: "https://api.supersoniclabs.ai/v1/models",
      discovery: "systemone",
      models: ["julia-1"],
    },
    openai: {
      format: "decisions",
      url: "https://api.openai.com/v1/decisions",
      modelsUrl: "https://api.openai.com/v1/models",
      discovery: "openai",
    },
    "ollama-cloud": {
      format: "systemone",
      url: "https://ollama.com/v1/systemone",
      modelsUrl: "https://ollama.com/api/tags",
      discovery: "ollama",
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
  return defaults;
}

export function resolveDecisionBackend(
  provider: string,
  credentials: DecisionCredentials
): DecisionBackend {
  const data = record(credentials.providerSpecificData);
  const base = typeof data.baseUrl === "string" ? data.baseUrl.replace(/\/+$/, "") : null;
  const config = parseDecisionConfiguration(data.decision) || compatibleDecisionConfiguration(data);
  const entry = decisionDefaults(base)[provider];
  if (provider === "cloudflare-ai" && !config) return cloudflareDecisionBackend(data);
  if (!config && !entry) throw new DecisionError(400, "unsupported_decision_provider");
  if (!entry && !config?.modelsEndpoint && !config?.models?.length)
    throw new DecisionError(503, "decision_model_configuration_required");
  return buildDecisionBackend(provider, config || {}, entry);
}

/** Compatible nodes use the same URL/path fields as every other provider. */
function compatibleDecisionConfiguration(data: Record<string, unknown>) {
  if (data.apiType !== "decisions" && data.apiType !== "systemone") return null;
  if (typeof data.baseUrl !== "string")
    throw new DecisionError(503, "decision_model_configuration_required");
  const base = data.baseUrl.replace(/\/+$/, "");
  const endpoint = `${base}${typeof data.chatPath === "string" && data.chatPath ? data.chatPath : `/${data.apiType}`}`;
  const modelsEndpoint = `${base}${typeof data.modelsPath === "string" && data.modelsPath ? data.modelsPath : "/models"}`;
  return parseDecisionConfiguration({ format: data.apiType, endpoint, modelsEndpoint });
}

function parseDecisionConfiguration(value: unknown) {
  if (value === undefined) return null;
  const parsed = decisionConnectionSchema.safeParse(value);
  if (!parsed.success) throw new DecisionError(503, "invalid_provider_configuration");
  return parsed.data;
}

function decisionBackendLocation(
  config: Partial<z.infer<typeof decisionConnectionSchema>>,
  entry: ReturnType<typeof decisionDefaults>[string] | undefined
) {
  // Julia and future engines explicitly configure the endpoint; no runtime endpoint guess.
  const url = config.endpoint || entry?.url;
  const format = config.format || entry?.format;
  if (!url || !format) throw new DecisionError(503, "invalid_provider_configuration");
  return { url, format };
}

function buildDecisionBackend(
  provider: string,
  config: Partial<z.infer<typeof decisionConnectionSchema>>,
  entry: ReturnType<typeof decisionDefaults>[string] | undefined
): DecisionBackend {
  const { url, format } = decisionBackendLocation(config, entry);
  return {
    provider,
    format,
    url,
    modelsUrl: config.modelsEndpoint || entry?.modelsUrl || new URL("models", url).href,
    discovery: entry?.discovery || "systemone",
    models: config.models || entry?.models,
    fallbackModels: config.fallbackModels || [],
    timeoutMs: config.timeoutMs || 30_000,
  };
}

function cloudflareDecisionBackend(data: Record<string, unknown>): DecisionBackend {
  if (typeof data.accountId !== "string" || !/^[a-zA-Z0-9_-]{1,128}$/.test(data.accountId))
    throw new DecisionError(503, "decision_model_configuration_required");
  const base = `https://api.cloudflare.com/client/v4/accounts/${data.accountId}/ai`;
  return {
    provider: "cloudflare-ai",
    format: "systemone",
    url: `${base}/run`,
    modelsUrl: `${base}/models/search?search=clef&per_page=100`,
    discovery: "cloudflare",
    transport: "cloudflare",
    fallbackModels: [],
    timeoutMs: 30_000,
  };
}
