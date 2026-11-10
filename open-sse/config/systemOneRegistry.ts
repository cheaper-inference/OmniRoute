/**
 * System One decisions registry (#13987) — pure backend resolution.
 *
 * Maps a client model id to the backend that serves it. No I/O; the route and
 * the proxy handler both live on top of this, mirroring rerankRegistry.
 *
 *   typesafe/jev-1.13            → native api.typesafe.ai   (model jev-1.13)
 *   jev-latest / (no model)      → native api.typesafe.ai   (default alias)
 *   openrouter/typesafe/jev-1.13 → openrouter alpha decisions (model typesafe/jev-1.13)
 *   openrouter/inception/…:free  → openrouter alpha decisions (model verbatim)
 *
 * Anything else is not a decisions model → null (the route 400s with guidance).
 */

export const TYPESAFE_SYSTEMONE_PROVIDER_ID = "typesafe";
export const TYPESAFE_SYSTEMONE_BASE_URL = "https://api.typesafe.ai";
export const TYPESAFE_SYSTEMONE_URL = `${TYPESAFE_SYSTEMONE_BASE_URL}/v1/systemone`;
/** TypeSafe answers a bare or missing model with its latest Jev alias. */
export const TYPESAFE_SYSTEMONE_DEFAULT_MODEL = "jev-latest";

export const OPENROUTER_DECISIONS_PROVIDER_ID = "openrouter";
export const OPENROUTER_DECISIONS_BASE_URL = "https://openrouter.ai";
export const OPENROUTER_DECISIONS_URL = `${OPENROUTER_DECISIONS_BASE_URL}/api/alpha/decisions`;

export const LUNAROUTE_SYSTEM_ONE_PROVIDER_ID = "lunaroute";
export const LUNAROUTE_SYSTEM_ONE_BASE_URL = "https://gw.lunaroute.com";
export const LUNAROUTE_SYSTEM_ONE_URL = `${LUNAROUTE_SYSTEM_ONE_BASE_URL}/v1/systemone`;

export const LUNAROUTE_SYSTEM_ONE_MODELS = [
  {
    id: "clef-flash",
    name: "Clef Flash",
    contextLength: 8_192,
    maxInputTokens: 8_192,
    maxOutputTokens: 2_048,
    supportsVision: true,
  },
  {
    id: "djev",
    name: "djev",
    contextLength: 32_768,
    maxInputTokens: 32_768,
    maxOutputTokens: 1_024,
    supportsVision: true,
  },
] as const;

export function getAllSystemOneModels() {
  return LUNAROUTE_SYSTEM_ONE_MODELS.map((model) => ({
    ...model,
    id: `${LUNAROUTE_SYSTEM_ONE_PROVIDER_ID}/${model.id}`,
    provider: LUNAROUTE_SYSTEM_ONE_PROVIDER_ID,
  }));
}

export type SystemOneBackend = "typesafe" | "openrouter" | "lunaroute";

export interface SystemOneTarget {
  backend: SystemOneBackend;
  /** Provider id used for credential lookup ("typesafe" | "openrouter"). */
  provider: string;
  /** Model id forwarded upstream (gateway prefix stripped). */
  upstreamModel: string;
  upstreamUrl: string;
}

/**
 * Resolve the request model to a backend. Pure — unit-tested directly.
 *
 * `openrouter/…` explicitly picks the OpenRouter alpha decisions endpoint and
 * may name any decisions-capable vendor id (`typesafe/jev-1.13`,
 * `inception/mercury-decide:free`, …). `typesafe/…` and bare `jev-*` aliases
 * route natively; versioned aliases (jev-1.13, jev-1.14, …) are forwarded
 * verbatim even though only `jev-latest`/`jev-preview` are advertised —
 * upstream accepts unlisted jev-* versions (#13987 Part 1).
 */
export function resolveSystemOneTarget(model: string | undefined): SystemOneTarget | null {
  const trimmed = (model ?? "").trim();
  if (!trimmed || trimmed === TYPESAFE_SYSTEMONE_DEFAULT_MODEL) {
    return {
      backend: "typesafe",
      provider: TYPESAFE_SYSTEMONE_PROVIDER_ID,
      upstreamModel: trimmed || TYPESAFE_SYSTEMONE_DEFAULT_MODEL,
      upstreamUrl: TYPESAFE_SYSTEMONE_URL,
    };
  }
  if (trimmed.startsWith("typesafe/")) {
    return {
      backend: "typesafe",
      provider: TYPESAFE_SYSTEMONE_PROVIDER_ID,
      upstreamModel: trimmed.slice("typesafe/".length),
      upstreamUrl: TYPESAFE_SYSTEMONE_URL,
    };
  }
  if (trimmed.startsWith("openrouter/")) {
    return {
      backend: "openrouter",
      provider: OPENROUTER_DECISIONS_PROVIDER_ID,
      upstreamModel: trimmed.slice("openrouter/".length),
      upstreamUrl: OPENROUTER_DECISIONS_URL,
    };
  }
  if (trimmed.startsWith(`${LUNAROUTE_SYSTEM_ONE_PROVIDER_ID}/`)) {
    const upstreamModel = trimmed.slice(`${LUNAROUTE_SYSTEM_ONE_PROVIDER_ID}/`.length);
    if (!LUNAROUTE_SYSTEM_ONE_MODELS.some((model) => model.id === upstreamModel)) return null;
    return {
      backend: "lunaroute",
      provider: LUNAROUTE_SYSTEM_ONE_PROVIDER_ID,
      upstreamModel,
      upstreamUrl: LUNAROUTE_SYSTEM_ONE_URL,
    };
  }
  if (/^jev[-/]/i.test(trimmed)) {
    return {
      backend: "typesafe",
      provider: TYPESAFE_SYSTEMONE_PROVIDER_ID,
      upstreamModel: trimmed,
      upstreamUrl: TYPESAFE_SYSTEMONE_URL,
    };
  }
  return null;
}
