import {
  MUSE_CODE_CLIENT_SURFACE,
  MUSE_CODE_MODELS_URL,
  museCodeClientUserAgent,
  MUSE_CODE_RESPONSES_URL,
} from "../../../museCode.ts";
import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

const MUSE_SPARK_THINKING = ["minimal", "low", "medium", "high", "xhigh", "max"] as const;

/**
 * Limits the Muse Code client catalog (`GET /muse-code/models`) publishes for
 * every model it lists. Live discovery reads them per model; these seed values
 * only serve when discovery has not run.
 */
const MUSE_CATALOG_CONTEXT_LENGTH = 1007997;
const MUSE_CATALOG_MAX_OUTPUT_TOKENS = 128000;

function museSparkModel(
  id: string,
  name: string,
  options: {
    vision?: boolean;
    thinking?: readonly string[];
    contextLength?: number;
    maxOutputTokens?: number;
  } = {}
) {
  return {
    id,
    name,
    contextLength: options.contextLength ?? MUSE_CATALOG_CONTEXT_LENGTH,
    maxOutputTokens: options.maxOutputTokens ?? MUSE_CATALOG_MAX_OUTPUT_TOKENS,
    supportsReasoning: true,
    supportsXHighEffort: true,
    supportedThinkingEfforts: options.thinking ?? MUSE_SPARK_THINKING,
    toolCalling: true,
    supportsVision: options.vision !== false,
    targetFormat: "openai-responses" as const,
    unsupportedParams: ["logprobs", "topLogprobs", "logitBias"],
  };
}

/**
 * Muse Code CLI — Meta's agentic coding tool.
 *
 * Wire format: OpenAI Responses API (POST /responses).
 * Auth: dual — META_API_KEY / pasted Bearer key, or RFC 8628 device OAuth
 * (CLIProxyAPI-parity: persist dca token, mint inference key, remint on 401).
 * Reasoning efforts: xhigh/ultra -> high (handled generically).
 * Models: live discovery merges `/v1/models` (what the key can call) with the
 * Muse Code client catalog (how the client describes each model); this seed is
 * the offline fallback and lists only models Meta serves on this API.
 *
 * @see https://github.com/joymadhu49/muse-openrouter-shim
 */
export const muse_codeProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "muse-code",
  alias: "mc",
  baseUrl: MUSE_CODE_RESPONSES_URL,
  modelsUrl: MUSE_CODE_MODELS_URL,
  extraHeaders: {
    "User-Agent": museCodeClientUserAgent(),
    "X-Client-Id": MUSE_CODE_CLIENT_SURFACE,
  },
  passthroughModels: true,
  // Meta rejects any declared tool name over 64 chars; ZCode MCP ids exceed it.
  toolNameMaxLength: 64,
  reasoningTransport: "opaque",
  defaultContextLength: 200000,
  models: [
    museSparkModel("muse-wonder-1.0", "Muse Wonder 1.0"),
    museSparkModel("muse-wonder-1.0-contributor", "Muse Wonder 1.0 Contributor"),
    museSparkModel("muse-spark-1.3", "Muse Spark 1.3"),
    museSparkModel("muse-spark-1.3-contributor", "Muse Spark 1.3 Contributor"),
    museSparkModel("muse-spark-1.2", "Muse Spark 1.2", {
      thinking: ["minimal", "low", "medium", "high", "xhigh"],
    }),
    museSparkModel("muse-spark-1.2-contributor", "Muse Spark 1.2 Contributor", {
      thinking: ["minimal", "low", "medium", "high", "xhigh"],
    }),
    // Still served (`/v1/models` lists it) but absent from the client catalog,
    // so no published limits: it keeps its earlier seed values.
    museSparkModel("muse-spark-1.1", "Muse Spark 1.1", {
      vision: false,
      thinking: ["low", "medium", "high", "xhigh"],
      contextLength: 1048576,
      maxOutputTokens: 65536,
    }),
  ],
});
