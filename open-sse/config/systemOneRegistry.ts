import { hasUnsafeModelIdSyntax } from "../utils/modelIdSafety.ts";

/** Concrete System One transports; credentials remain in the normal provider store. */
export const SYSTEMONE_BACKENDS = {
  typesafe: {
    url: "https://api.typesafe.ai/v1/systemone",
    modelsUrl: "https://api.typesafe.ai/v1/models",
    requiresKey: true,
    timeoutMs: 30_000,
  },
  openrouter: {
    url: "https://openrouter.ai/api/v1/systemone",
    modelsUrl: "https://openrouter.ai/api/v1/models?output_modalities=decisions",
    requiresKey: true,
    timeoutMs: 30_000,
  },
  "ollama-local": {
    url: "http://localhost:11434/v1/systemone",
    modelsUrl: null,
    requiresKey: false,
    timeoutMs: 60_000,
  },
} as const;

export type SystemOneProvider = keyof typeof SYSTEMONE_BACKENDS;
export type SystemOneTarget = {
  provider: SystemOneProvider;
  model: string;
  canonicalModel: string;
};

export function isSystemOneProvider(value: string): value is SystemOneProvider {
  return Object.prototype.hasOwnProperty.call(SYSTEMONE_BACKENDS, value);
}

/**
 * TypeSafe's published native Jev rate (USD per 1M tokens, checked 2026-10-05; output is
 * free). The native catalog carries no pricing, so this is the only copy of the rate:
 * the catalog row and the cost estimate both read it, and an operator pricing row wins.
 */
const NATIVE_JEV_PRICING = { input: 0.042, output: 0 } as const;

export function nativeSystemOnePricing(
  provider: string,
  model: string
): { input: number; output: number } | null {
  return provider === "typesafe" && /^jev-/.test(model) ? { ...NATIVE_JEV_PRICING } : null;
}

export function resolveSystemOneTarget(value: string): SystemOneTarget {
  const id = value.trim();
  if (!id || hasUnsafeModelIdSyntax(id)) throw new Error("Invalid System One model ID");
  // `~vendor/model` is OpenRouter's own alias spelling, never a provider prefix.
  if (id.startsWith("~")) {
    if (!/^~[^/]+\/[^/]/.test(id)) throw new Error("Invalid System One model ID");
    return { provider: "openrouter", model: id, canonicalModel: `openrouter/${id.slice(1)}` };
  }
  const separator = id.indexOf("/");
  const prefix = separator < 0 ? "openrouter" : id.slice(0, separator);
  if (!isSystemOneProvider(prefix)) {
    throw new Error(
      `Provider ${prefix} does not support System One. For an OpenRouter model use openrouter/${id}`
    );
  }
  const model = separator < 0 ? `typesafe/${id}` : id.slice(separator + 1);
  if (!model) throw new Error("System One model is required after the provider prefix");
  return { provider: prefix, model, canonicalModel: `${prefix}/${model.replace(/^~/, "")}` };
}
