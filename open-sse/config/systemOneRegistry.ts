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
 *   cloudflare-ai/jev | cf/jev   → Workers AI /ai/run           (model typesafe/jev)
 *   cloudflare-ai/clef[-flash]   → Workers AI /ai/run/@cf/cloudflare/<model>
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

/** Workers AI; the account id comes from the `cloudflare-ai` connection. */
export const CLOUDFLARE_SYSTEMONE_PROVIDER_ID = "cloudflare-ai";
export const CLOUDFLARE_SYSTEMONE_API_BASE = "https://api.cloudflare.com/client/v4/accounts";
/**
 * Public Cloudflare model id → Workers AI model. Allow-listed because the
 * Clef ids become part of the request path. Jev on Cloudflare draws AI Gateway
 * credits; Clef draws Workers AI neurons.
 */
export const CLOUDFLARE_SYSTEMONE_MODELS: Readonly<Record<string, string>> = {
  jev: "typesafe/jev",
  clef: "clef",
  "clef-flash": "clef-flash",
};
const CLOUDFLARE_SYSTEMONE_PREFIXES = ["cloudflare-ai/", "cf/"];

export type SystemOneBackend = "typesafe" | "openrouter" | "cloudflare";

export interface SystemOneTarget {
  backend: SystemOneBackend;
  /** Provider id used for credential lookup ("typesafe" | "openrouter"). */
  provider: string;
  /** Model id forwarded upstream (gateway prefix stripped). */
  upstreamModel: string;
  /** Empty for "cloudflare": the URL needs the connection's account id. */
  upstreamUrl: string;
}

function resolveCloudflareTarget(model: string): SystemOneTarget | null | undefined {
  const prefix = CLOUDFLARE_SYSTEMONE_PREFIXES.find((p) => model.startsWith(p));
  if (!prefix) return undefined;
  const id = model.slice(prefix.length);
  const upstreamModel = Object.hasOwn(CLOUDFLARE_SYSTEMONE_MODELS, id)
    ? CLOUDFLARE_SYSTEMONE_MODELS[id]
    : undefined;
  if (!upstreamModel) return null;
  return {
    backend: "cloudflare",
    provider: CLOUDFLARE_SYSTEMONE_PROVIDER_ID,
    upstreamModel,
    upstreamUrl: "",
  };
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
  const cloudflare = resolveCloudflareTarget(trimmed);
  if (cloudflare !== undefined) return cloudflare;
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
