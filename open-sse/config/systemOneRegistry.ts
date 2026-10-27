/**
 * System One (typed decision) backend registry.
 *
 * System One models answer typed questions — `noul` (yes/no), `choice` and
 * `score` — with calibrated probabilities instead of text, so they are not chat
 * models and are never dispatched by a chat executor. This module is the single
 * place that knows which OmniRoute providers can serve them, where their
 * decision and catalog endpoints live, and how a client-supplied model id maps
 * onto a concrete `(provider, model)` target.
 *
 * Adding a backend is a data change: register it in `SYSTEMONE_BACKENDS` (with
 * the hosts an operator may point a connection at) and, if it should answer a
 * bare user-facing alias, add its model id to that alias in
 * `SYSTEMONE_MODEL_ALIASES`. Nothing else in the integration is per-provider.
 *
 * Contract-shaped transports; live entitlement is not established by this registry.
 */

import { hasUnsafeModelIdSyntax } from "../utils/modelIdSafety.ts";

/** Thrown for a caller-supplied target that cannot be resolved. Carries no request state. */
export class SystemOneTargetError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "SystemOneTargetError";
    this.status = status;
  }
}

export type SystemOneTier = "free" | "paid";

/**
 * Request-shape limits enforced before a credential is spent.
 *
 * Choice's 255 options and Score's 10 levels come from the native contract.
 * Question count and body size are OmniRoute guards, not vendor-published limits.
 */
export type SystemOneLimits = {
  maxQuestions: number;
  minCriteria: number;
  maxChoiceCriteria: number;
  maxScoreLevels: number;
  maxBodyBytes: number;
};

export const JEV_SYSTEMONE_LIMITS: SystemOneLimits = {
  maxQuestions: 64,
  minCriteria: 1,
  maxChoiceCriteria: 255,
  maxScoreLevels: 10,
  maxBodyBytes: 1_048_576,
};

export type SystemOneBackend = {
  /** OmniRoute provider id — credentials stay in the normal provider connection store. */
  provider: string;
  label: string;
  /** Documented POST endpoint for typed decisions. */
  decisionUrl: string;
  /** Documented decision-model catalog, or null when the backend publishes none. */
  modelsUrl: string | null;
  /** Hosts an operator may point a per-connection endpoint override at. */
  allowedHosts: readonly string[];
  requiresKey: boolean;
  timeoutMs: number;
  /** Request-shape limits for this backend. */
  limits: SystemOneLimits;
  /**
   * Fallback filter for a catalog that lists chat and decision models together
   * (OpenCode Console's `/inference/v1/models`) or carries no modality metadata. A row
   * whose own metadata already declares a decision capability is kept
   * regardless; this only decides the rows that declare nothing.
   */
  decisionModelPattern: RegExp;
};

/**
 * OpenCode Console documents `/inference/systemone/v1/systemone` for decisions;
 * model discovery stays at `/inference/v1/models` on the same allowlisted host.
 */
export const SYSTEMONE_BACKENDS = {
  "opencode-zen": {
    provider: "opencode-zen",
    label: "OpenCode Zen",
    decisionUrl: "https://opencode.ai/inference/systemone/v1/systemone",
    modelsUrl: "https://opencode.ai/inference/v1/models",
    allowedHosts: ["opencode.ai"],
    // The documented System One endpoint requires an OpenCode Zen API key for
    // both paid Jev and the limited-time free model.
    requiresKey: true,
    timeoutMs: 30_000,
    limits: JEV_SYSTEMONE_LIMITS,
    // Documented Zen decision ids: `jev-1.13`, `jev-1.13-free`.
    decisionModelPattern: /^jev(?:[-.]|$)/i,
  },
  "vercel-ai-gateway": {
    provider: "vercel-ai-gateway",
    label: "Vercel AI Gateway",
    decisionUrl: "https://ai-gateway.vercel.sh/typesafe/v1/systemone",
    modelsUrl: "https://ai-gateway.vercel.sh/typesafe/v1/models",
    allowedHosts: ["ai-gateway.vercel.sh"],
    requiresKey: true,
    timeoutMs: 30_000,
    limits: JEV_SYSTEMONE_LIMITS,
    // This dedicated native catalog lists decision models without modality metadata.
    decisionModelPattern: /\S/,
  },
  openrouter: {
    provider: "openrouter",
    label: "OpenRouter",
    decisionUrl: "https://openrouter.ai/api/v1/systemone",
    // OpenRouter tags decision models with `output_modalities=decisions`.
    modelsUrl: "https://openrouter.ai/api/v1/models?output_modalities=decisions",
    allowedHosts: ["openrouter.ai"],
    requiresKey: true,
    timeoutMs: 30_000,
    limits: JEV_SYSTEMONE_LIMITS,
    // OpenRouter tags decision models in `architecture.output_modalities`, so
    // the pattern is only a fallback for a row that carries none.
    decisionModelPattern: /(?:^|\/)jev(?:[-.]|$)/i,
  },
  typesafe: {
    provider: "typesafe",
    label: "TypeSafe AI",
    decisionUrl: "https://api.typesafe.ai/v1/systemone",
    modelsUrl: "https://api.typesafe.ai/v1/models",
    allowedHosts: ["api.typesafe.ai"],
    requiresKey: true,
    timeoutMs: 30_000,
    limits: JEV_SYSTEMONE_LIMITS,
    // Native catalog names include pinned Jev versions and Jev aliases.
    decisionModelPattern: /^jev(?:[-.]|$)/i,
  },
} as const satisfies Record<string, SystemOneBackend>;

export type SystemOneProviderId = keyof typeof SYSTEMONE_BACKENDS;

/** A bare alias may fan out at most this far, one candidate per backend. */
export const SYSTEMONE_MAX_FALLBACK_CANDIDATES = 3;

/**
 * Bare, user-facing aliases and the concrete upstream model id each backend
 * serves them with. Order is the fan-out order for a bare alias: cheapest
 * documented first, then unknown-price gateways in registry order. A free alias
 * lists only free-tier model ids, so it can never resolve onto a paid model.
 */
const SYSTEMONE_MODEL_ALIASES: Readonly<
  Record<string, ReadonlyArray<{ provider: SystemOneProviderId; model: string }>>
> = {
  jev: [
    { provider: "opencode-zen", model: "jev-1.13" },
    { provider: "openrouter", model: "typesafe/jev-1.13" },
    { provider: "vercel-ai-gateway", model: "typesafe-ai/jev-1.13.0" },
  ],
  "jev-1.13": [
    { provider: "opencode-zen", model: "jev-1.13" },
    { provider: "openrouter", model: "typesafe/jev-1.13" },
    { provider: "vercel-ai-gateway", model: "typesafe-ai/jev-1.13.0" },
  ],
  // Keep this Jev free alias on its documented limited-time free model.
  "jev-free": [{ provider: "opencode-zen", model: "jev-1.13-free" }],
  "jev-1.13-free": [{ provider: "opencode-zen", model: "jev-1.13-free" }],
};

/**
 * Published rates in USD per 1M tokens. Only the exact limited-time Zen free
 * model has a built-in zero, verified in the provider's pricing table on
 * 2026-10-14: https://opencode.ai/v2/docs/console/models/#pricing . Reported cost
 * and operator pricing take precedence; other missing rates remain unknown.
 */
const PUBLISHED_PRICING: Readonly<
  Record<string, ReadonlyArray<{ match: RegExp; input: number; output: number }>>
> = {
  "opencode-zen": [{ match: /^jev-1\.13-free$/i, input: 0, output: 0 }],
};

export function isSystemOneProvider(value: string): value is SystemOneProviderId {
  return Object.prototype.hasOwnProperty.call(SYSTEMONE_BACKENDS, value);
}

export function listSystemOneProviders(): SystemOneProviderId[] {
  return Object.keys(SYSTEMONE_BACKENDS) as SystemOneProviderId[];
}

export function systemOneBackend(provider: string): SystemOneBackend {
  if (!isSystemOneProvider(provider)) {
    throw new SystemOneTargetError(`Provider ${provider} does not support System One`);
  }
  return SYSTEMONE_BACKENDS[provider];
}

/**
 * Free-tier detection is explicit per provider spelling: OpenCode Zen suffixes
 * its free models with `-free`, OpenRouter with the `:free` variant suffix.
 * Anything else is treated as paid, so an unknown id is never billed as free.
 */
export function systemOneModelTier(provider: string, model: string): SystemOneTier {
  const id = model.trim().toLowerCase();
  if (provider === "openrouter") return id.endsWith(":free") ? "free" : "paid";
  return id.endsWith("-free") || id.endsWith(":free") ? "free" : "paid";
}

export function nativeSystemOnePricing(
  provider: string,
  model: string
): { input: number; output: number } | null {
  const rates = PUBLISHED_PRICING[provider];
  const match = rates?.find((rate) => rate.match.test(model));
  return match ? { input: match.input, output: match.output } : null;
}

export type SystemOneCandidate = {
  provider: SystemOneProviderId;
  /** Model id sent upstream, exactly as that backend spells it. */
  model: string;
  /** `<provider>/<model>` — what API-key policy, usage and cooldown record. */
  canonicalModel: string;
  tier: SystemOneTier;
  /** True when the caller named the provider, which disables cross-provider fallback. */
  pinned: boolean;
};

export type ResolveSystemOneOptions = {
  /** Restrict a bare alias fan-out to backends that actually have a connection. */
  availableProviders?: readonly string[] | null;
};

function assertSafeId(raw: string): string {
  const id = raw?.trim?.() ?? "";
  if (!id || hasUnsafeModelIdSyntax(id)) {
    throw new SystemOneTargetError("Invalid System One model ID");
  }
  return id;
}

function candidate(
  provider: SystemOneProviderId,
  model: string,
  pinned: boolean
): SystemOneCandidate {
  return {
    provider,
    model,
    canonicalModel: `${provider}/${model}`,
    tier: systemOneModelTier(provider, model),
    pinned,
  };
}

/**
 * Resolve a client-supplied System One model id into an ordered candidate list.
 *
 * `<provider>/<model>` pins that backend: exactly one candidate, and an
 * unsupported provider prefix is an error rather than a fallback. A bare alias
 * from `SYSTEMONE_MODEL_ALIASES` fans out across its backends (bounded by
 * `SYSTEMONE_MAX_FALLBACK_CANDIDATES`) without ever crossing the free/paid
 * tier. An unknown bare id is rejected — the gateway never guesses a backend
 * that would spend an operator's credential.
 */
export function resolveSystemOneCandidates(
  rawModel: string,
  options: ResolveSystemOneOptions = {}
): SystemOneCandidate[] {
  const id = assertSafeId(rawModel);
  const available = options.availableProviders ?? null;
  const isAvailable = (provider: SystemOneProviderId) => !available || available.includes(provider);

  const separator = id.indexOf("/");
  if (separator > 0) {
    const prefix = id.slice(0, separator);
    const model = id.slice(separator + 1).trim();
    if (isSystemOneProvider(prefix)) {
      if (!model) {
        throw new SystemOneTargetError("System One model is required after the provider prefix");
      }
      return [candidate(prefix, model, true)];
    }
    // A known-looking prefix that is not a System One backend fails closed: it
    // is never reinterpreted as a model id on some other backend.
    throw new SystemOneTargetError(
      `Provider ${prefix} does not support System One. Use one of: ${listSystemOneProviders().join(", ")}`
    );
  }

  const alias = SYSTEMONE_MODEL_ALIASES[id.toLowerCase()];
  if (!alias) {
    throw new SystemOneTargetError(
      `Unknown System One model "${id}". Use a provider-qualified id such as openrouter/typesafe/jev-1.13`
    );
  }

  const candidates = alias
    .filter((entry) => isAvailable(entry.provider))
    .slice(0, SYSTEMONE_MAX_FALLBACK_CANDIDATES)
    .map((entry) => candidate(entry.provider, entry.model, false));

  if (!candidates.length) {
    throw new SystemOneTargetError(
      `No configured System One backend serves "${id}". Configure one of: ${alias
        .map((entry) => entry.provider)
        .join(", ")}`
    );
  }
  return candidates;
}

type ConnectionTierFields = {
  apiKey?: string | null;
  accessToken?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
};

/**
 * Whether a provider connection may serve a model of this tier.
 *
 * A free-tier model is dispatchable only on a connection the operator explicitly
 * tagged `systemOneTier: "free"`. A paid model, conversely, always needs the backend's
 * normal credential when `requiresKey` is true. A free-tier model may still need
 * a credential; the tier tag prevents paid fallback, it does not bypass auth.
 */
export function isConnectionEligibleForTier(
  tier: SystemOneTier,
  connection: ConnectionTierFields,
  provider?: string
): boolean {
  const declared = connection.providerSpecificData?.systemOneTier;
  const hasCredential = Boolean(connection.apiKey || connection.accessToken);
  const requiresKey =
    provider && isSystemOneProvider(provider) ? !!systemOneBackend(provider).requiresKey : false;
  if (tier === "free") {
    if (declared !== "free") return false;
    return requiresKey ? hasCredential : true;
  }
  if (declared === "free") return false;
  return requiresKey ? hasCredential : true;
}
