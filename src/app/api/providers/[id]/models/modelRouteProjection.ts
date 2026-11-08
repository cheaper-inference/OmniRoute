import { NextResponse } from "next/server";
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import { filterChatSelectableModels } from "@omniroute/open-sse/services/modelEndpointPolicy.ts";
import { filterSelectableModels } from "@omniroute/open-sse/services/modelLifecycle.ts";
import { getHiddenChatModels } from "@/lib/hiddenChatModels";
import { createHiddenModelLookup } from "@/lib/hiddenModelLookup";
import { getSettings } from "@/lib/db/settings";
import { getStaticModelsForProvider } from "@/lib/providers/staticModels";
import { SAFE_OUTBOUND_FETCH_PRESETS, safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuardPolicy";
import { getModelsByProviderId } from "@/shared/constants/models";
import { isProviderBlockedByIdOrAlias } from "@/shared/utils/noAuthProviders";
import { applyDiscoveryDegradation, type DiscoveryFailure } from "@/shared/discovery/degradedCause";
import { mergeLocalCatalogModels } from "./discovery/helpers";
import { recordDiscoveryOutcome } from "./discovery/discoveryOutcome";

/**
 * Drop hidden models. Visibility is a model-level policy: it never depends on the provider
 * being listed under Security > Blocked Providers. Callers decide whether to apply it (the
 * route does when the caller opts in or ENFORCE_HIDDEN_MODELS is on). Keys are normalized
 * through the shared hidden lookup (alias / canonical id / provider-node prefix), unlike the
 * old raw provider-id match.
 */
async function dropHiddenModels<T extends { id: string }>(
  providerId: string,
  connectionId: string,
  models: readonly T[]
): Promise<T[]> {
  if (models.length === 0) return [...models];
  const hidden = createHiddenModelLookup(await getHiddenChatModels());
  return models.filter((model) => !hidden(providerId, model.id) && !hidden(connectionId, model.id));
}

export function filterModelsForRoute<
  T extends { id: string; supportedEndpoints?: readonly string[] },
>(provider: string, models: readonly T[], chatOnly: boolean): T[] {
  const selectable = filterSelectableModels(provider, models);
  return chatOnly ? filterChatSelectableModels(provider, selectable) : selectable;
}

function toLiveModel(item: Record<string, unknown>): { id: string; name: string } | null {
  const itemId = typeof item.id === "string" ? item.id.trim() : "";
  if (!itemId) return null;
  const itemName =
    typeof item.display_name === "string"
      ? item.display_name
      : typeof item.name === "string"
        ? item.name
        : itemId;
  return { id: itemId, name: itemName };
}

/**
 * The outcome of a live no-auth discovery: the live catalog, or the reason the
 * live catalog could not be used. The reason is a code or an HTTP status —
 * never a message, a body or an URL.
 */
type NoAuthLiveOutcome =
  | { kind: "live"; payload: Record<string, unknown> }
  | { kind: "failed"; failure: DiscoveryFailure };

async function fetchLiveNoAuthModels(
  modelsUrl: string,
  providerId: string,
  connectionId: string,
  excludeHidden: boolean,
  chatOnly: boolean
): Promise<NoAuthLiveOutcome> {
  try {
    const liveResponse = await safeOutboundFetch(modelsUrl, {
      ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
      guard: getProviderOutboundGuard(),
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!liveResponse.ok) return { kind: "failed", failure: { status: liveResponse.status } };

    const data = await liveResponse.json();
    const liveModels: Array<{ id: string; name: string }> = (
      (data.data || data.models || []) as Array<Record<string, unknown>>
    )
      .map(toLiveModel)
      .filter((model): model is { id: string; name: string } => model !== null);
    if (liveModels.length === 0) return { kind: "failed", failure: { code: "EMPTY_CATALOG" } };

    const selectable = filterModelsForRoute(providerId, liveModels, chatOnly);
    const visible = excludeHidden
      ? await dropHiddenModels(providerId, connectionId, selectable)
      : selectable;
    const payload = {
      provider: providerId,
      connectionId,
      models: visible,
      source: "upstream",
    };
    return { kind: "live", payload };
  } catch {
    return { kind: "failed", failure: {} };
  }
}

export async function buildNoAuthModelsResponse(
  providerId: string,
  connectionId: string,
  excludeHidden: boolean,
  chatOnly: boolean
) {
  if (isProviderBlockedByIdOrAlias(providerId, (await getSettings()).blockedProviders)) {
    return NextResponse.json({ error: "Provider is disabled" }, { status: 403 });
  }

  const registryEntry = getRegistryEntry(providerId);
  const modelsUrl =
    typeof registryEntry?.modelsUrl === "string" && registryEntry.modelsUrl.length > 0
      ? registryEntry.modelsUrl
      : null;
  let liveFailure: DiscoveryFailure | undefined;
  let livePayload: Record<string, unknown> | null = null;
  if (modelsUrl) {
    const live = await fetchLiveNoAuthModels(
      modelsUrl,
      providerId,
      connectionId,
      excludeHidden,
      chatOnly
    );
    if (live.kind === "live") livePayload = live.payload;
    else liveFailure = live.failure;
  }

  const payload =
    livePayload ??
    applyDiscoveryDegradation({
      ...(await buildLocalCatalogPayload(
        providerId,
        connectionId,
        excludeHidden,
        chatOnly,
        Boolean(modelsUrl)
      )),
      ...(liveFailure ? { failure: liveFailure } : {}),
    });
  // Keep the outcome of this discovery: the response carrying it is gone on the next read.
  recordDiscoveryOutcome(payload);
  return NextResponse.json(payload);
}

async function buildLocalCatalogPayload(
  providerId: string,
  connectionId: string,
  excludeHidden: boolean,
  chatOnly: boolean,
  hasModelsUrl: boolean
): Record<string, unknown> {
  const catalog = mergeLocalCatalogModels(
    getModelsByProviderId(providerId) || [],
    getStaticModelsForProvider(providerId) || []
  ).map((model) => ({ id: model.id, name: model.name || model.id }));
  const selectable = filterModelsForRoute(providerId, catalog, chatOnly);
  const visible = excludeHidden
    ? await dropHiddenModels(providerId, connectionId, selectable)
    : selectable;
  return {
    provider: providerId,
    connectionId,
    models: visible,
    source: "local_catalog",
    // A no-auth provider with no `modelsUrl` has no remote model
    // endpoint at all, so this catalog is its INTENDED and only discovery
    // source (same as reka/lmarena), not a degraded remote fetch. Without the
    // tag, model-sync's isDegradedDiscovery guard 502s before importing and the
    // provider can never persist a model while /models keeps returning 200.
    // Providers that DO declare `modelsUrl` return above with source:"upstream",
    // and a failed live fetch still falls back here untagged only when the
    // URL exists — that case stays a genuine degradation.
    ...(hasModelsUrl ? {} : { intentional: true }),
  };
}
