import type { EmbeddingProvider } from "@omniroute/open-sse/config/embeddingRegistry.ts";
import {
  parseAndValidateNonMetadataUrl,
  parseAndValidatePublicUrl,
} from "@/shared/network/outboundUrlGuard";
import { getProviderValidationGuard } from "@/shared/network/outboundUrlGuardPolicy";

type CustomEmbeddingSettings = {
  customBaseUrl?: string | null;
  customModelId?: string | null;
};

export type ResolvedMemoryCustomEmbeddingProvider = {
  provider: EmbeddingProvider;
  model: string;
  identity: string;
};

export class MemoryCustomEmbeddingConfigError extends Error {
  constructor() {
    super("Custom embedding endpoint is invalid or blocked");
    this.name = "MemoryCustomEmbeddingConfigError";
  }
}

function validateEndpoint(rawBaseUrl: string): URL {
  const guard = getProviderValidationGuard();
  if (guard === "public-only") return parseAndValidatePublicUrl(rawBaseUrl);
  return parseAndValidateNonMetadataUrl(rawBaseUrl);
}

function toEmbeddingsUrl(url: URL): string {
  if (url.search || url.hash) throw new MemoryCustomEmbeddingConfigError();
  const normalized = url.toString().replace(/\/+$/, "");
  return normalized.endsWith("/embeddings") ? normalized : `${normalized}/embeddings`;
}

export function resolveMemoryCustomEmbeddingProvider(
  settings: CustomEmbeddingSettings
): ResolvedMemoryCustomEmbeddingProvider | null {
  const rawBaseUrl = settings.customBaseUrl?.trim() ?? "";
  const model = settings.customModelId?.trim() ?? "";
  if (!rawBaseUrl && !model) return null;
  if (!rawBaseUrl || !model) throw new MemoryCustomEmbeddingConfigError();

  try {
    const baseUrl = toEmbeddingsUrl(validateEndpoint(rawBaseUrl));
    return {
      provider: {
        id: "memory-custom",
        baseUrl,
        authType: "none",
        authHeader: "none",
        models: [],
      },
      model,
      identity: `${baseUrl}|${model}`,
    };
  } catch {
    throw new MemoryCustomEmbeddingConfigError();
  }
}
