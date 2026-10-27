/**
 * System One (typed decision) backend registry.
 *
 * System One models answer typed questions — `noul` (yes/no), `choice` and
 * `score` — with provider-reported probabilities instead of text, so they are not chat
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

import { HOSTED_SYSTEMONE_BACKENDS } from "./systemOneHostedBackends.ts";
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
  minScoreLevels: number;
  maxScoreLevels: number;
  maxBodyBytes: number;
};

export const JEV_SYSTEMONE_LIMITS: SystemOneLimits = {
  maxQuestions: 64,
  minCriteria: 1,
  maxChoiceCriteria: 255,
  minScoreLevels: 2,
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
  /** Backend schema requires instructions and forbids unrecognized question fields. */
  strictQuestionShape?: boolean;
  /** Per-model bounds; explicit constraints do not silently affect sibling models. */
  modelLimits?: Readonly<Record<string, Partial<SystemOneLimits>>>;
  requestLimitNotes?: Readonly<Record<string, string>>;
  maxTotalOptions?: number;
  maxStateChars?: number;
  maxStateBytes?: number;
  plainInstructions?: boolean;
  rejectRecognizedMediaParts?: boolean;
  stringOrObjectState?: boolean;
  supportedModelPattern?: RegExp;
  /** Only explicit native receipts/pricing may price these dedicated contracts. */
  allowGenericTokenPricing?: boolean;
  authorizationScheme?: "Bearer" | "Api-Key";
  /** Native upstream envelope. Omitted keeps the System One contract unchanged. */
  requestFormat?: "openai-decisions";
  /** Exact documented ids when a backend has a closed native model set. */
  supportedModels?: readonly string[];
  /** Documentation-only seeds; unlike supportedModels this never restricts dispatch. */
  documentedModels?: readonly string[];
  /** Source-pinned endpoint capabilities, used only when a row declares none. */
  documentedModelEndpoints?: Readonly<Record<string, readonly string[]>>;
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
  ...HOSTED_SYSTEMONE_BACKENDS,
  openai: {
    provider: "openai",
    label: "OpenAI Decisions",
    decisionUrl: "https://api.openai.com/v1/decisions",
    modelsUrl: "https://api.openai.com/v1/models",
    allowedHosts: ["api.openai.com"],
    requiresKey: true,
    timeoutMs: 30_000,
    requestFormat: "openai-decisions",
    allowGenericTokenPricing: false,
    supportedModels: ["gpt-6-luna"],
    // Existing OpenAI registry serves chat; public Decisions guide adds native support.
    documentedModelEndpoints: { "gpt-6-luna": ["chat", "responses", "systemone"] },
    limits: {
      maxQuestions: 400,
      minCriteria: 2,
      maxChoiceCriteria: 255,
      minScoreLevels: 2,
      maxScoreLevels: 10,
      maxBodyBytes: 1_048_576,
    },
    // Direct OpenAI currently documents this exact model only. Aggregator ids
    // and ordinary chat models are not inferred as native decision models.
    decisionModelPattern: /^gpt-6-luna$/,
  },
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
  deepinfra: {
    provider: "deepinfra",
    label: "DeepInfra",
    // https://docs.deepinfra.com/api-reference/decisions/systemone
    decisionUrl: "https://api.deepinfra.com/v1/decisions",
    // https://docs.deepinfra.com/api-reference/decisions/list-models
    modelsUrl: "https://api.deepinfra.com/typesafe/v1/models",
    allowedHosts: ["api.deepinfra.com"],
    requiresKey: true,
    timeoutMs: 30_000,
    // Choice 2–52, Score 2–10 and 64 questions are vendor schema limits.
    // The 1 MiB text-body bound remains an OmniRoute guard; images are deferred.
    limits: { ...JEV_SYSTEMONE_LIMITS, minCriteria: 2, maxChoiceCriteria: 52 },
    strictQuestionShape: true,
    documentedModels: [
      "Cloudflare/clef",
      "Cloudflare/clef-flash",
      "nace-ai/drex-max",
      "nace-ai/drex-v2.0",
    ],
    modelLimits: { "nace-ai/drex-max": { maxQuestions: 16 } },
    requestLimitNotes: {
      "nace-ai/drex-max":
        "Conservative intersection: model page limits 16 questions; API schema says 64. Retain API-schema Choice 2–52 and Score 2–10 while the model page advertises 1–255. https://deepinfra.com/nace-ai/drex-max and /api",
    },
    decisionModelPattern: /^(?:Cloudflare\/clef(?:-flash)?|nace-ai\/drex-(?:max|v2\.0))$/,
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
 * serves them with. The fixed compatibility order below is not a cost ranking.
 * Provider-qualified ids bypass cross-provider alias fallback. A free alias
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

/** Known model-specific endpoint fallback; never classifies an entire provider as chat/native. */
export function systemOneDocumentedModelEndpoints(
  provider: string | null | undefined,
  model: string
): string[] | undefined {
  if (!provider || !isSystemOneProvider(provider)) return undefined;
  const backend = systemOneBackend(provider);
  const explicit = backend.documentedModelEndpoints?.[model];
  if (explicit) return [...explicit];
  return backend.supportedModels?.includes(model) || backend.documentedModels?.includes(model)
    ? ["systemone"]
    : undefined;
}

/** Whether a native endpoint may reuse existing operator/global token tariffs. */
export function systemOneAllowsGenericTokenPricing(provider: string): boolean {
  return (
    !isSystemOneProvider(provider) || systemOneBackend(provider).allowGenericTokenPricing !== false
  );
}

/** Effective backend/model request bounds, including explicitly documented conservative clamps. */
export function systemOneRequestLimits(provider: string, model?: string): SystemOneLimits {
  const backend = systemOneBackend(provider);
  return { ...backend.limits, ...(model ? backend.modelLimits?.[model] : undefined) };
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
  const backend = systemOneBackend(provider);
  const supported = backend.supportedModels;
  if (
    (supported && !supported.includes(model)) ||
    (backend.supportedModelPattern && !backend.supportedModelPattern.test(model))
  )
    throw new SystemOneTargetError("This model is not supported by the selected native backend");
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

/** The same trimmed token used by transport also defines credential presence. */
export function systemOneCredentialToken(connection: {
  apiKey?: unknown;
  accessToken?: unknown;
}): string {
  for (const value of [connection.apiKey, connection.accessToken]) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

/** Credential-free tier policy shared by catalog visibility and physical dispatch.
 * Zen's explicit free-account opt-in is not an entitlement rule for other vendors.
 * A model's explicit free SKU never creates a paid candidate or establishes USD price.
 */
export function systemOneTierAllowed(
  provider: string | undefined,
  tier: SystemOneTier,
  providerSpecificData?: Record<string, unknown> | null
): boolean {
  const declared = providerSpecificData?.systemOneTier;
  if (tier === "paid") return declared !== "free";
  if (declared === "free") return true;
  if (declared != null) return false;
  return !!provider && isSystemOneProvider(provider) && provider !== "opencode-zen";
}

/** Tier policy never makes a key-requiring hosted endpoint anonymous. */
export function isConnectionEligibleForTier(
  tier: SystemOneTier,
  connection: ConnectionTierFields,
  provider?: string
): boolean {
  if (!systemOneTierAllowed(provider, tier, connection.providerSpecificData)) return false;
  const requiresKey =
    provider && isSystemOneProvider(provider) ? !!systemOneBackend(provider).requiresKey : false;
  return requiresKey ? Boolean(systemOneCredentialToken(connection)) : true;
}
