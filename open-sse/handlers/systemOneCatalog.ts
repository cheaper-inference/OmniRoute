/**
 * Decision-model catalog projection.
 *
 * Each backend publishes its models in its own shape — OpenRouter's
 * `architecture.output_modalities` carries the `decisions` tag, OpenCode Zen's
 * `/inference/v1/models` mixes chat and decision models with no modality metadata, and
 * the Vercel AI Gateway publishes a dedicated TypeSafe list. This module turns
 * any of them into one gateway-qualified entry per model while keeping the
 * upstream id and the provenance of the price.
 *
 * Pure: no I/O, no DB.
 */

import {
  systemOneBackend,
  systemOneModelTier,
  type SystemOneTier,
} from "../config/systemOneRegistry.ts";

import {
  getDeclaredModelEndpoints,
  canonicalModelEndpoints,
} from "../services/modelEndpointPolicy.ts";

export const DECISIONS_MODALITY = "decisions";

export type UpstreamCatalogRow = Record<string, unknown>;

export type DecisionCatalogModel = {
  /** `<provider>/<upstream id>` — exactly what POST /v1/systemone accepts. */
  id: string;
  object: "model";
  owned_by: string;
  /** The upstream id, unqualified. */
  root: string;
  provider: string;
  type: "decision" | "chat";
  supported_endpoints: string[];
  tier: SystemOneTier;
  name?: string;
  description?: string;
  /** Null means absent/invalid, including an upstream zero; never means unlimited. */
  context_length?: number | null;
  input_modalities?: string[] | null;
  output_modalities?: string[] | null;
  /** Only explicitly declared primitives; a decision model is not assumed to implement all three. */
  decision_primitives?: string[] | null;
  /** Catalog metadata, not confirmation of a live alias resolution. */
  canonical_model_id?: string;
  resolved_alias_target?: string;
  author?: string;
  model_owner?: string;
  upstream_root?: string;
  pricing?: { prompt: string; completion: string };
  pricing_source?: "upstream" | "operator";
  pricing_status?: "known" | "unknown";
  pricing_currency?: "USD";
  pricing_unit?: "token";
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function stringField(row: UpstreamCatalogRow, ...names: string[]): string | null {
  for (const name of names) {
    const value = row[name];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

function declaredEndpoints(row: UpstreamCatalogRow): string[] {
  const raw = row.supportedEndpoints ?? row.supported_endpoints;
  return Array.isArray(raw)
    ? raw.filter((value): value is string => typeof value === "string")
    : [];
}

function declaredStrings(value: unknown): string[] | null {
  if (
    !Array.isArray(value) ||
    value.length > 64 ||
    !value.every(
      (entry) => typeof entry === "string" && /^[a-zA-Z][a-zA-Z0-9_/-]{0,63}$/.test(entry)
    )
  )
    return null;
  return [...new Set(value)] as string[];
}
function modalities(row: UpstreamCatalogRow, direction: "input" | "output"): string[] | null {
  const architecture = isRecord(row.architecture) ? row.architecture : {};
  return declaredStrings(architecture[`${direction}_modalities`] ?? row[`${direction}_modalities`]);
}
function outputModalities(row: UpstreamCatalogRow): string[] {
  return modalities(row, "output") ?? [];
}
function declaredPrimitives(row: UpstreamCatalogRow): string[] | null {
  const capabilities = isRecord(row.capabilities) ? row.capabilities : {};
  return declaredStrings(
    row.decision_primitives ?? row.supported_primitives ?? capabilities.primitives
  );
}
function contextLength(row: UpstreamCatalogRow): number | null {
  const length = row.context_length;
  return typeof length === "number" && Number.isSafeInteger(length) && length > 0 ? length : null;
}
function identityMetadata(row: UpstreamCatalogRow): Partial<DecisionCatalogModel> {
  const canonical = stringField(row, "canonical_model_id", "canonical_slug");
  const target = stringField(row, "resolved_alias_target");
  const author = stringField(row, "author");
  const owner = stringField(row, "owned_by");
  const root = stringField(row, "root");
  return {
    ...(canonical ? { canonical_model_id: canonical } : {}),
    ...(target ? { resolved_alias_target: target } : {}),
    ...(author ? { author } : {}),
    ...(owner ? { model_owner: owner } : {}),
    ...(root ? { upstream_root: root } : {}),
  };
}

/**
 * Whether the row is a decision model.
 *
 * Explicit endpoints win over modality labels. Otherwise source-pinned model
 * capabilities or a decisions modality establish membership. An unclassified row
 * with capability metadata is not guessed from its name; only a row with no
 * capability metadata falls back to the backend's documented id pattern.
 */
export function isDecisionCatalogRow(provider: string, row: UpstreamCatalogRow): boolean {
  const modalities = outputModalities(row);
  const endpoints = declaredEndpoints(row);
  if (endpoints.length) return canonicalModelEndpoints(endpoints).includes("systemone");
  if (
    getDeclaredModelEndpoints({ ...row, id: stringField(row, "id", "name") }, provider)?.includes(
      "systemone"
    )
  )
    return true;
  if (modalities.includes(DECISIONS_MODALITY)) return true;
  if (modalities.length || endpoints.length) return false;
  const id = stringField(row, "id", "name");
  return !!id && systemOneBackend(provider).decisionModelPattern.test(id);
}

/** OpenRouter-style per-token price string from a USD-per-1M-token rate. */
export function perTokenPrice(perMillion: number): string {
  // Move the decimal point without fixed-place rounding: a positive operator
  // rate must never become a fabricated free price just because it is tiny.
  if (!Number.isFinite(perMillion) || perMillion < 0) throw new RangeError("Invalid model price");
  if (perMillion === 0) return "0";
  const [coefficient, exponent = "0"] = String(perMillion).toLowerCase().split("e");
  const [integer, fractional = ""] = coefficient.split(".");
  const digits = integer + fractional;
  const point = integer.length + Number(exponent) - 6;
  if (point <= 0) return "0." + "0".repeat(-point) + digits;
  if (point >= digits.length) return digits + "0".repeat(point - digits.length);
  return digits.slice(0, point) + "." + digits.slice(point);
}

function nonNegativePrice(value: unknown): string | null {
  if (typeof value === "number") return Number.isFinite(value) && value >= 0 ? String(value) : null;
  if (typeof value !== "string") return null;
  const text = value.trim();
  if (!/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(text)) return null;
  const number = Number(text);
  return Number.isFinite(number) && number >= 0 ? text : null;
}
function upstreamPricing(
  provider: string,
  row: UpstreamCatalogRow
): { prompt: string; completion: string } | null {
  const pricing = row.pricing;
  if (!isRecord(pricing)) return null;
  const currency = pricing.currency ?? row.pricing_currency;
  const unit = pricing.unit ?? row.pricing_unit;
  if (currency !== undefined && currency !== "USD") return null;
  if (unit !== undefined && unit !== "token" && unit !== "per_token") return null;
  // OpenRouter's prompt/completion catalog fields are documented USD per token.
  // Other catalog shapes must declare their units; do not turn a per-million rate into per-token.
  if (
    provider !== "openrouter" &&
    !(currency === "USD" && (unit === "token" || unit === "per_token"))
  )
    return null;
  const prompt = nonNegativePrice(
    provider === "openrouter" ? pricing.prompt : (pricing.prompt ?? pricing.input)
  );
  const completion = nonNegativePrice(
    provider === "openrouter" ? pricing.completion : (pricing.completion ?? pricing.output)
  );
  return prompt !== null && completion !== null ? { prompt, completion } : null;
}

/**
 * Project one upstream row into a catalog entry.
 *
 * A model that also serves chat keeps `chat` in its endpoint list and is typed
 * `chat`, so the unified chat catalog may keep listing it. A model with no
 * published price is reported as `pricing_status: "unknown"` — never as free.
 */
export function toDecisionCatalogModel(
  provider: string,
  row: UpstreamCatalogRow
): DecisionCatalogModel | null {
  const upstreamId = stringField(row, "id", "name");
  if (!upstreamId) return null;
  const root = upstreamId;
  const declared = getDeclaredModelEndpoints({ ...row, id: root }, provider);
  const endpoints = canonicalModelEndpoints(
    declared?.length
      ? declared
      : outputModalities(row).includes("text")
        ? ["systemone", "chat"]
        : ["systemone"]
  );
  const servesChat = endpoints.some((endpoint) => endpoint === "chat" || endpoint === "responses");
  const pricing = upstreamPricing(provider, row);
  const name = stringField(row, "name");
  const description = stringField(row, "description");

  return {
    id: `${provider}/${root}`,
    object: "model",
    owned_by: provider,
    root,
    provider,
    type: servesChat ? "chat" : "decision",
    supported_endpoints: endpoints,
    tier: systemOneModelTier(provider, root),
    ...(name ? { name } : {}),
    ...(description ? { description } : {}),
    ...identityMetadata(row),
    context_length: contextLength(row),
    input_modalities: modalities(row, "input"),
    output_modalities: modalities(row, "output"),
    decision_primitives: declaredPrimitives(row),
    ...(pricing
      ? {
          pricing,
          pricing_source: "upstream" as const,
          pricing_status: "known" as const,
          pricing_currency: "USD" as const,
          pricing_unit: "token" as const,
        }
      : { pricing_status: "unknown" as const }),
  };
}

/** An operator pricing row overrides the upstream price and says so. */
export function applyOperatorPricing(
  model: DecisionCatalogModel,
  override: { input?: unknown; output?: unknown } | null
): DecisionCatalogModel {
  if (
    !override ||
    typeof override.input !== "number" ||
    typeof override.output !== "number" ||
    nonNegativePrice(override.input) === null ||
    nonNegativePrice(override.output) === null
  )
    return model;
  const output = override.output;
  return {
    ...model,
    pricing: { prompt: perTokenPrice(override.input), completion: perTokenPrice(output) },
    pricing_source: "operator",
    pricing_status: "known",
    pricing_currency: "USD",
    pricing_unit: "token",
  };
}

/**
 * Read a backend's model list out of its response body. Both the OpenAI-style
 * `{ data: [...] }` and the native `{ models: [...] }` shapes are accepted;
 * anything else is a drift the caller must treat as a failure.
 */
export function readUpstreamCatalogList(body: unknown): UpstreamCatalogRow[] | null {
  if (!isRecord(body)) return null;
  const list = Array.isArray(body.data)
    ? body.data
    : Array.isArray(body.models)
      ? body.models
      : null;
  if (!list) return null;
  return list.filter(isRecord);
}
