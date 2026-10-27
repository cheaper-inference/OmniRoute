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

export const DECISIONS_MODALITY = "decisions";

/** A decision-capable endpoint name as a backend may spell it. */
const DECISION_ENDPOINT_NAMES = new Set(["systemone", "decision", "decisions"]);

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
  context_length?: number | null;
  pricing?: { prompt: string; completion: string };
  pricing_source?: "upstream" | "operator";
  pricing_status?: "unknown";
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

function outputModalities(row: UpstreamCatalogRow): string[] {
  const architecture = row.architecture;
  const raw = isRecord(architecture) ? architecture.output_modalities : null;
  return Array.isArray(raw)
    ? raw.filter((value): value is string => typeof value === "string")
    : [];
}

/**
 * Whether the row is a decision model.
 *
 * Declared capability wins: an `output_modalities: ["decisions"]` tag or a
 * decision endpoint name. A row that declares a capability but not a decision
 * one is rejected even if its id looks like a decision model — the upstream's
 * own metadata is more trustworthy than the id. Only a row with no capability
 * metadata at all falls back to the backend's id pattern.
 */
export function isDecisionCatalogRow(provider: string, row: UpstreamCatalogRow): boolean {
  const modalities = outputModalities(row);
  const endpoints = declaredEndpoints(row);
  if (modalities.includes(DECISIONS_MODALITY)) return true;
  if (endpoints.some((endpoint) => DECISION_ENDPOINT_NAMES.has(endpoint.toLowerCase()))) {
    return true;
  }
  if (modalities.length || endpoints.length) return false;
  const id = stringField(row, "id", "name");
  return !!id && systemOneBackend(provider).decisionModelPattern.test(id);
}

/** OpenRouter-style per-token price string from a USD-per-1M-token rate. */
export function perTokenPrice(perMillion: number): string {
  // Fixed notation ("0.000000042", not "4.2e-8"), matching the OpenRouter catalog.
  return (perMillion / 1_000_000).toFixed(15).replace(/\.?0+$/, "") || "0";
}

function nonNegativePrice(value: unknown): string | null {
  if (typeof value === "number") return Number.isFinite(value) && value >= 0 ? String(value) : null;
  if (typeof value !== "string") return null;
  const text = value.trim();
  if (!/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(text)) return null;
  const number = Number(text);
  return Number.isFinite(number) && number >= 0 ? text : null;
}
function upstreamPricing(row: UpstreamCatalogRow): { prompt: string; completion: string } | null {
  const pricing = row.pricing;
  if (!isRecord(pricing)) return null;
  const prompt = nonNegativePrice(pricing.prompt ?? pricing.input);
  const completion = nonNegativePrice(pricing.completion ?? pricing.output);
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
  const servesChat =
    outputModalities(row).includes("text") ||
    declaredEndpoints(row).some((endpoint) => endpoint === "chat" || endpoint === "responses");
  const pricing = upstreamPricing(row);
  const name = stringField(row, "name");
  const description = stringField(row, "description");

  return {
    id: `${provider}/${root}`,
    object: "model",
    owned_by: provider,
    root,
    provider,
    type: servesChat ? "chat" : "decision",
    supported_endpoints: servesChat ? ["systemone", "chat"] : ["systemone"],
    tier: systemOneModelTier(provider, root),
    ...(name ? { name } : {}),
    ...(description ? { description } : {}),
    ...(typeof row.context_length === "number" ? { context_length: row.context_length } : {}),
    ...(pricing
      ? { pricing, pricing_source: "upstream" as const }
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
  const { pricing_status: _unknown, ...rest } = model;
  return {
    ...rest,
    pricing: { prompt: perTokenPrice(override.input), completion: perTokenPrice(output) },
    pricing_source: "operator",
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
