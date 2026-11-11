import { splitCodexReasoningSuffix } from "@omniroute/open-sse/executors/codex/reasoningSuffix.ts";
import { resolveAntigravityModelId } from "@omniroute/open-sse/config/antigravityModelAliases.ts";
import { isRegisteredImageModel } from "@omniroute/open-sse/config/imageRegistry";
import { isModelAdvertisedByConnection } from "@/domain/connectionModelRules";
import { isSelfHostedChatProvider } from "@/shared/constants/providers";
import { inventoryOrFailOpen, isPerAccountCatalogProvider } from "./perAccountCatalogFilter.ts";
import { type ProviderConnectionView } from "@/lib/db/providers/lazyConnectionView";
import {
  getSyncedAvailableModelsByConnection,
  SYNCED_AVAILABLE_MODELS_MALFORMED,
  type SyncedAvailableModelsByConnection,
} from "@/lib/db/models";

/**
 * The Codex live catalog (`/backend-api/codex/models`), and so every synced Codex
 * inventory, lists chat models only. Registered Codex image models are served by the
 * dedicated Images routes, so the inventory carries no evidence about them and must not
 * filter accounts for them — otherwise every Codex account is ineligible and
 * `/v1/images/generations` fails with "No credentials for image provider: codex".
 * Hosted-tool image ids (`gpt-6.1-sol`, `gpt-5.6-*`) are chat models the inventory does
 * list, so they keep the filter (#18687).
 */
function isCodexImageModel(requestedModel: string): boolean {
  const rawModel = requestedModel.slice(requestedModel.lastIndexOf("/") + 1);
  return /^gpt-image-/i.test(rawModel) && isRegisteredImageModel("codex", rawModel);
}

/**
 * Does this connection's synced inventory advertise the requested model?
 *
 * Codex reasoning-effort aliases (`gpt-6-sol-high`, `-max`, `-ultra`, ...) reach
 * the selector unsplit — the executor strips the suffix later — while the synced
 * inventory lists base ids. The literal id stays a candidate (an inventory may
 * already carry a suffixed id) and the suffix-less base id is matched as well.
 */
export function isRequestedModelAdvertised(
  provider: string | undefined,
  requestedModel: string,
  advertised: ReadonlySet<string> | undefined
): boolean {
  if (isModelAdvertisedByConnection(requestedModel, advertised)) return true;
  if (provider === "antigravity" || provider === "agy") {
    const rawModel = requestedModel.slice(requestedModel.lastIndexOf("/") + 1);
    const resolved = resolveAntigravityModelId(rawModel);
    if (resolved !== rawModel && isModelAdvertisedByConnection(resolved, advertised)) {
      return true;
    }
  }
  if (provider !== "codex") return false;
  const rawModel = requestedModel.slice(requestedModel.lastIndexOf("/") + 1);
  const { baseModel } = splitCodexReasoningSuffix(rawModel);
  return baseModel !== rawModel && isModelAdvertisedByConnection(baseModel, advertised);
}

type InventoryAccumulator = {
  advertised: Map<string, Set<string>>;
  // Per-account catalogs (Antigravity plans): `antigravity` and `agy` connections share one pool,
  // so their inventories are merged and judged together before the fail-open rule applies.
  perAccountInventory: Map<string, Set<string>>;
  perAccountMalformed: boolean;
  // Accounts of the active shared pool (before any pin narrows it). A synced row left behind by
  // a disabled or deleted account must not decide that "some account lists the model".
  perAccountPoolIds: Set<string>;
};

function recordPerAccountInventory(
  connectionId: string,
  ids: Set<string>,
  acc: InventoryAccumulator
): void {
  if (acc.perAccountPoolIds.has(connectionId)) acc.perAccountInventory.set(connectionId, ids);
}

/** Unreadable or malformed persisted rows: a per-account catalog can no longer be trusted. */
function markPerAccountMalformed(providerId: string, acc: InventoryAccumulator): void {
  if (isPerAccountCatalogProvider(providerId)) acc.perAccountMalformed = true;
}

/** Does any Codex account's non-empty synced inventory advertise the requested model? */
function isAdvertisedByAnyCodexAccount(
  byConnection: SyncedAvailableModelsByConnection,
  requestedModel: string
): boolean {
  return Object.values(byConnection).some(
    (models) =>
      Array.isArray(models) &&
      // An empty set means "advertises everything" to the matcher, so an
      // empty row must not count as evidence for the requested model.
      models.length > 0 &&
      isRequestedModelAdvertised("codex", requestedModel, new Set(models.map((m) => m.id)))
  );
}

function recordConnectionInventories(
  providerId: string,
  byConnection: SyncedAvailableModelsByConnection,
  acc: InventoryAccumulator
): void {
  for (const [connectionId, models] of Object.entries(byConnection)) {
    if (!Array.isArray(models) || models.length === 0) continue;
    const ids = new Set(
      models
        .map((m) => m.id)
        .filter((id) => typeof id === "string" && !id.endsWith("-disabled") && !id.includes("-disabled"))
    );
    if (isPerAccountCatalogProvider(providerId)) recordPerAccountInventory(connectionId, ids, acc);
    else acc.advertised.set(connectionId, ids);
  }
}

async function collectProviderInventory(
  providerId: string,
  connections: ProviderConnectionView[],
  requestedModel: string,
  acc: InventoryAccumulator
): Promise<void> {
  let byConnection: SyncedAvailableModelsByConnection;
  try {
    byConnection = await getSyncedAvailableModelsByConnection(providerId);
  } catch {
    markPerAccountMalformed(providerId, acc);
    return;
  }
  // Malformed persisted rows: fail open for the whole provider.
  if (byConnection[SYNCED_AVAILABLE_MODELS_MALFORMED]) {
    markPerAccountMalformed(providerId, acc);
    return;
  }
  if (providerId === "codex") {
    if (!isAdvertisedByAnyCodexAccount(byConnection, requestedModel)) return;
    for (const connection of connections) {
      if (connection.provider === providerId) acc.advertised.set(connection.id, new Set());
    }
  }
  recordConnectionInventories(providerId, byConnection, acc);
}

function isRowInventoryProvider(provider: unknown, requestedModel: string): provider is string {
  return (
    typeof provider === "string" &&
    (isSelfHostedChatProvider(provider) ||
      provider === "chatgpt" ||
      (provider === "codex" && !isCodexImageModel(requestedModel)))
  );
}

/**
 * Providers whose synced inventory must be read. Per-account catalogs (antigravity/agy) come
 * from the whole active pool so a pin on one of them still sees the other's inventory.
 */
function collectInventoryProviders(
  connections: ProviderConnectionView[],
  poolConnections: ProviderConnectionView[],
  requestedModel: string
): Set<string> {
  const providers = new Set<string>();
  for (const { provider } of connections) {
    if (isRowInventoryProvider(provider, requestedModel)) providers.add(provider);
  }
  for (const { provider } of [...connections, ...poolConnections]) {
    if (isPerAccountCatalogProvider(provider)) providers.add(provider as string);
  }
  return providers;
}

/**
 * Self-hosted hosts, Codex subscription accounts and Antigravity/agy accounts (plans list
 * different models) can advertise different inventories. For Codex, once an account inventory advertises the requested
 * model, unsynchronized accounts are not eligible guesses for it. With no
 * inventories at all, retain the existing bootstrap/offline behavior.
 *
 * #18311: a Codex model that no synced inventory lists (a user-added custom
 * model, or one released after the last sync) carries no evidence about which
 * account can serve it, so Codex accounts are not filtered for it and the
 * upstream decides. Filtering every account answered a misleading
 * provider_not_configured despite active accounts.
 *
 * Antigravity and agy share one pool and one per-account catalog: accounts whose synced
 * inventory does not list the requested model are skipped, failing open when no account
 * lists it (see perAccountCatalogFilter.ts). That decision is taken over `poolConnections`,
 * the active pool BEFORE a pin narrowed `connections`: a pinned `antigravity` account must
 * still see the `agy` inventory, and rows of accounts outside the active pool are ignored.
 */
export async function loadAdvertisedModelsForConnections(
  connections: ProviderConnectionView[],
  requestedModel: string | null,
  poolConnections: ProviderConnectionView[] = connections
): Promise<Map<string, Set<string>>> {
  const advertised = new Map<string, Set<string>>();
  if (!requestedModel) return advertised;
  for (const connection of connections) {
    if (connection.provider === "chatgpt") advertised.set(connection.id, new Set());
  }

  const inventoryProviders = collectInventoryProviders(
    connections,
    poolConnections,
    requestedModel
  );
  if (inventoryProviders.size === 0) return advertised;

  const acc: InventoryAccumulator = {
    advertised,
    perAccountInventory: new Map<string, Set<string>>(),
    perAccountMalformed: false,
    perAccountPoolIds: new Set([...poolConnections, ...connections].map((c) => c.id)),
  };

  await Promise.all(
    [...inventoryProviders].map((providerId) =>
      collectProviderInventory(providerId, connections, requestedModel, acc)
    )
  );

  if (!acc.perAccountMalformed) {
    // When no account advertises the model the lists are stale/incomplete: fail open instead of
    // emptying the pool.
    for (const [connectionId, ids] of inventoryOrFailOpen(
      requestedModel,
      acc.perAccountInventory
    )) {
      advertised.set(connectionId, ids);
    }
  }

  return advertised;
}
