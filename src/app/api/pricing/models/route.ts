import { NextResponse } from "next/server";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";
import { getAllCustomModels, getAllSyncedAvailableModels } from "@/lib/db/models";
import { getPricing } from "@/lib/db/settings";
import { getProviderPrefixIndex } from "@/lib/providerNodePrefixes";
import { getDbInstance } from "@/lib/db/core";
import {
  getNodePrefixHistory,
  getDeletedNodePrefixTombstones,
  type HistoricalNodePrefix,
} from "@/lib/db/providers/nodePrefixHistory";
import { isCompatibleProviderConnectionId } from "@/shared/utils/compatibleProviderId";
import { isReservedProviderPrefix } from "@/shared/constants/reservedProviderPrefixes";

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function asModelArray(value: unknown): Array<{ id?: string; name?: string }> {
  if (!Array.isArray(value)) return [];
  return value.filter((item) => item && typeof item === "object") as Array<{
    id?: string;
    name?: string;
  }>;
}

interface CatalogModel {
  id: string;
  name: string;
  custom: boolean;
  upstreamId?: boolean;
}

interface CatalogProvider {
  id: string;
  alias: string;
  name: string;
  authType: string;
  format: string;
  models: CatalogModel[];
  modelCount?: number;
  displayPrefix?: string;
  pricingUnsafePublicPrefix?: boolean;
  historicalPrefixes?: HistoricalNodePrefix[];
  modelOverrideEligible?: boolean;
  pricingOnly?: boolean;
  orphaned?: boolean;
  historicalPricingNamespace?: boolean;
  separatePricingNamespace?: boolean;
  pricingKey?: string;
}

type PrefixIndex = Awaited<ReturnType<typeof getProviderPrefixIndex>>;

/** Immutable per-request snapshot of recorded prefix changes. */
interface PrefixHistoryState {
  tombstonedPrefixes: Set<string>;
  historyByNode: Map<string, HistoricalNodePrefix[]>;
  historicallyUsedPrefixes: Set<string>;
  historicalOwners: Map<string, string | null>;
}

interface CatalogContext extends PrefixHistoryState {
  // Pricing/provider IDs are operator input; a null prototype prevents
  // "__proto__", "constructor", etc. from resolving inherited objects.
  catalog: Record<string, CatalogProvider>;
  index: PrefixIndex;
}

function displayName(id: string): string {
  return id.charAt(0).toUpperCase() + id.slice(1);
}

function newProvider(id: string, alias: string, name = displayName(id)): CatalogProvider {
  return { id, alias, name, authType: "unknown", format: "openai", models: [] };
}

function modelDisplayName(model: { name?: string }, modelId: string): string {
  return typeof model.name === "string" && model.name.trim() ? model.name : modelId;
}

/** DB may not be ready: a failed read degrades to an empty record. */
async function loadRecord(load: () => Promise<unknown>): Promise<Record<string, unknown>> {
  try {
    return asRecord(await load());
  } catch {
    return {};
  }
}

function claimHistoricalPrefix(
  state: PrefixHistoryState,
  index: PrefixIndex,
  prefix: string,
  nodeId: string
): void {
  if (isReservedProviderPrefix(prefix)) return;
  // A previous owner is relevant even when ANOTHER live node currently
  // serves the old public prefix. Do not hand old prices to that new node.
  state.historicallyUsedPrefixes.add(prefix);
  if (index.prefixToNode.has(prefix) || state.tombstonedPrefixes.has(prefix)) return;
  if (!state.historicalOwners.has(prefix)) state.historicalOwners.set(prefix, nodeId);
  else if (state.historicalOwners.get(prefix) !== nodeId) state.historicalOwners.set(prefix, null);
}

/**
 * Historical associations cannot override a live prefix, built-in alias, or
 * another node's claim. The raw model IDs are captured BEFORE the operator's
 * edit.
 */
function collectPrefixHistory(index: PrefixIndex): PrefixHistoryState {
  const db = getDbInstance();
  const state: PrefixHistoryState = {
    tombstonedPrefixes: getDeletedNodePrefixTombstones(db),
    historyByNode: new Map(),
    historicallyUsedPrefixes: new Set(),
    historicalOwners: new Map(),
  };
  // Include ineligible compatible nodes as possible prior owners: a losing
  // node must not allow a different node to claim a shared historical prefix.
  for (const nodeId of index.compatibleNodeIds) {
    const currentPrefix = index.nodeToPrefix.get(nodeId);
    const history = getNodePrefixHistory(db, nodeId).filter(
      (entry) => entry.prefix !== currentPrefix
    );
    if (!history.length) continue;
    state.historyByNode.set(nodeId, history);
    for (const { prefix } of history) claimHistoricalPrefix(state, index, prefix, nodeId);
  }
  return state;
}

function isHistoricalPrefix(ctx: CatalogContext, prefix: string): boolean {
  return ctx.tombstonedPrefixes.has(prefix) || ctx.historicallyUsedPrefixes.has(prefix);
}

function orphanedCompatibleNode(ctx: CatalogContext, id: string): boolean {
  return isCompatibleProviderConnectionId(id) && !ctx.index.compatibleNodeIds.has(id);
}

function attachCompatibleMetadata(
  ctx: CatalogContext,
  providerId: string,
  slot: CatalogProvider
): void {
  const publicPrefix = ctx.index.nodeToPrefix.get(providerId);
  if (publicPrefix) {
    slot.displayPrefix = publicPrefix;
    // A deleted node previously held this public prefix. Its price rows
    // could predate the new node, so require node-ID-keyed current pricing.
    if (isHistoricalPrefix(ctx, publicPrefix)) slot.pricingUnsafePublicPrefix = true;
  }
  // Historical evidence is separate from current routability; a node that
  // drops its prefix still has history, but may not be an override target.
  // Only advertise provably unique, non-reserved historical claims to
  // enrichment consumers. Losing nodes and reused public prefixes cannot
  // authorize migration of an old namespace.
  const safeHistory = ctx.historyByNode
    .get(providerId)
    ?.filter((snapshot) => ctx.historicalOwners.get(snapshot.prefix) === providerId);
  if (safeHistory?.length) slot.historicalPrefixes = safeHistory;
  if (ctx.index.compatibleNodeIds.has(providerId)) {
    slot.modelOverrideEligible = ctx.index.eligibleNodeIds.has(providerId);
  }
}

function addRegistryModels(catalog: Record<string, CatalogProvider>): void {
  for (const entry of Object.values(REGISTRY)) {
    const alias = entry.alias || entry.id;
    if (!entry.models || entry.models.length === 0) continue;

    catalog[alias] = {
      ...newProvider(entry.id, alias),
      authType: entry.authType || "unknown",
      format: entry.format || "openai",
      models: entry.models.map((m) => ({ id: m.id, name: m.name || m.id, custom: false })),
    };
  }
}

function resolveAlias(providerId: string): string {
  for (const entry of Object.values(REGISTRY)) {
    if (entry.id === providerId) return entry.alias || entry.id;
  }
  return providerId;
}

// A compatible provider node should surface under its configured public
// prefix, never its generated `openai-compatible-chat-<uuid>` node id
// (#9557). The internal `id` (node id) is preserved for PricingTab and
// runtime capability lookup. Only a uniquely-routable non-reserved winner
// is Model-Overrides eligible (marked explicitly); a compatible node that
// is reserved/losing/no-prefix is marked ineligible and skipped by the
// Model-Overrides helper.
function ensureCatalogProvider(
  ctx: CatalogContext,
  providerId: string,
  alias: string
): CatalogProvider {
  if (!ctx.catalog[alias]) {
    ctx.catalog[alias] = newProvider(providerId, alias);
    attachCompatibleMetadata(ctx, providerId, ctx.catalog[alias]);
  }
  return ctx.catalog[alias];
}

function appendSyncedModels(ctx: CatalogContext, providerId: string, rawModels: unknown): void {
  // Deleted compatible nodes are never routable. Keep orphan DB records
  // untouched for operator recovery, but never re-publish them as models.
  if (orphanedCompatibleNode(ctx, providerId)) return;
  const providerCatalog = ensureCatalogProvider(ctx, providerId, resolveAlias(providerId));
  const existingIds = new Set(providerCatalog.models.map((m) => m.id));

  for (const model of asModelArray(rawModels)) {
    const modelId = typeof model.id === "string" ? model.id : null;
    if (!modelId || existingIds.has(modelId)) continue;
    providerCatalog.models.push({
      id: modelId,
      name: modelDisplayName(model, modelId),
      custom: true,
      // Distinguish a literal upstream "ih/foo" from an already-prefixed
      // public "ih/foo". The latter appears only in pricing-only rows.
      upstreamId: true,
    });
    existingIds.add(modelId);
  }
}

function applyCustomModels(ctx: CatalogContext, providerId: string, rawModels: unknown): void {
  if (orphanedCompatibleNode(ctx, providerId)) return;
  const providerCatalog = ensureCatalogProvider(ctx, providerId, resolveAlias(providerId));
  for (const model of asModelArray(rawModels)) {
    const modelId = typeof model.id === "string" ? model.id : null;
    if (!modelId) continue;
    const customModel: CatalogModel = {
      id: modelId,
      name: modelDisplayName(model, modelId),
      custom: true,
      upstreamId: true,
    };
    const existingIndex = providerCatalog.models.findIndex((entry) => entry.id === modelId);
    if (existingIndex === -1) providerCatalog.models.push(customModel);
    else providerCatalog.models[existingIndex] = customModel;
  }
}

interface PricingNamespace {
  providerAlias: string;
  historicalNamespace: boolean;
  duplicatePricingSources: boolean;
  separatePricingKey: boolean;
}

function classifyPricingNamespace(
  ctx: CatalogContext,
  pricingData: Record<string, unknown>,
  rawProviderAlias: string
): PricingNamespace {
  // An old public prefix is not proof that EVERY price row belongs to
  // its former node. Keep historical namespaces separate for management;
  // OpenCode may recover an individual price only with recorded raw-ID
  // provenance AND a matching current served model (#17348).
  const currentNode = ctx.index.prefixToNode.get(rawProviderAlias);
  const historicalNamespace = isHistoricalPrefix(ctx, rawProviderAlias);
  // Even if a NEW node currently serves the retired prefix, a price row
  // under that prefix may belong to its deleted predecessor. Leave that
  // old namespace as display-only, and use the new node's canonical key
  // for verified new prices.
  const unverifiedReusedPrefix = Boolean(currentNode && historicalNamespace);
  // The PricingTab edits a single pricingKey per provider card. If both
  // node-ID and public-prefix prices exist, merging their model rows would
  // make saves target the wrong namespace (and be enumeration-order dependent).
  // Keep both visible in separate, exact-key cards instead.
  const duplicatePricingSources = Boolean(currentNode && Object.hasOwn(pricingData, currentNode));
  const separatePricingKey = unverifiedReusedPrefix || duplicatePricingSources;
  return {
    providerAlias: separatePricingKey ? rawProviderAlias : currentNode || rawProviderAlias,
    historicalNamespace,
    duplicatePricingSources,
    separatePricingKey,
  };
}

function markPricingOnly(slot: CatalogProvider, ns: PricingNamespace, orphaned: boolean): void {
  slot.pricingOnly = true;
  slot.modelOverrideEligible = false;
  if (orphaned) slot.orphaned = true;
  if (ns.historicalNamespace) slot.historicalPricingNamespace = true;
  if (ns.duplicatePricingSources && !ns.historicalNamespace) {
    slot.separatePricingNamespace = true;
  }
}

function applyPricingNamespace(
  ctx: CatalogContext,
  pricingData: Record<string, unknown>,
  pricingKey: string,
  models: Record<string, unknown>
): void {
  // `pricingKey` is the original pricing namespace the operator used.
  const ns = classifyPricingNamespace(ctx, pricingData, pricingKey);
  const { providerAlias } = ns;
  const orphaned = orphanedCompatibleNode(ctx, providerAlias);
  const pricingOnly = orphaned || ns.historicalNamespace || ns.separatePricingKey;
  if (!ctx.catalog[providerAlias]) {
    ctx.catalog[providerAlias] = newProvider(providerAlias, providerAlias);
    if (!pricingOnly) attachCompatibleMetadata(ctx, providerAlias, ctx.catalog[providerAlias]);
  }
  const slot = ctx.catalog[providerAlias];
  // A stale custom/synced catalog entry may already exist at this key.
  // Classify regardless of whether the pricing loop created the slot.
  if (pricingOnly) markPricingOnly(slot, ns, orphaned);
  // When the entry is keyed internally by the node id but priced under a
  // public prefix, remember the original pricing namespace for PricingTab.
  if (pricingKey !== providerAlias && !slot.pricingKey) slot.pricingKey = pricingKey;

  const existingIds = new Set(slot.models.map((m) => m.id));
  for (const modelId of Object.keys(models)) {
    if (existingIds.has(modelId)) continue;
    slot.models.push({ id: modelId, name: modelId, custom: true });
    existingIds.add(modelId);
  }
}

/**
 * GET /api/pricing/models
 * Returns the full model catalog merged from three sources:
 *  1. providerRegistry (hardcoded)
 *  2. syncedAvailableModels (DB — discovered/imported from provider /models)
 *  3. customModels (DB — manually added models)
 *  4. pricing data (DB — models with pricing configured but not in sources 1/2/3)
 */
export async function GET() {
  try {
    // Pre-load compatible-provider node public prefixes once (shared across the
    // whole catalog build — never N lookups per model). Only uniquely-routable
    // prefixes are exposed as public targets (reserved/ambiguous are not).
    const index = await getProviderPrefixIndex();
    const ctx: CatalogContext = {
      ...collectPrefixHistory(index),
      catalog: Object.create(null),
      index,
    };

    // ── 1. Registry models (hardcoded) ──────────────────────────────
    addRegistryModels(ctx.catalog);

    // ── 2. Synced available models (DB) ─────────────────────────────
    const syncedModelsMap = await loadRecord(getAllSyncedAvailableModels);
    for (const [providerId, rawModels] of Object.entries(syncedModelsMap)) {
      appendSyncedModels(ctx, providerId, rawModels);
    }

    // ── 3. Custom models (DB) ───────────────────────────────────────
    const customModelsMap = await loadRecord(getAllCustomModels);
    for (const [providerId, rawModels] of Object.entries(customModelsMap)) {
      applyCustomModels(ctx, providerId, rawModels);
    }

    // ── 4. Pricing-only models ─────────────────────────────────────
    // Pricing uses public prefixes. Resolve unique compatible prefixes back
    // to their internal node so Model Overrides can read/save/reset against it.
    // Reserved / ambiguous prefixes have no single routable node and stay as-is.
    const pricingData = (await loadRecord(getPricing)) as Record<string, Record<string, unknown>>;
    for (const [rawProviderAlias, models] of Object.entries(pricingData)) {
      applyPricingNamespace(ctx, pricingData, rawProviderAlias, models);
    }

    // Add modelCount to each entry
    for (const entry of Object.values(ctx.catalog)) {
      entry.modelCount = entry.models.length;
    }

    return NextResponse.json(ctx.catalog);
  } catch (error) {
    console.error("Error fetching model catalog:", error);
    return NextResponse.json({ error: "Failed to fetch model catalog" }, { status: 500 });
  }
}
