import { splitCodexReasoningSuffix } from "@omniroute/open-sse/executors/codex/reasoningSuffix.ts";
import { isRegisteredImageModel } from "@omniroute/open-sse/config/imageRegistry";
import { isModelAdvertisedByConnection } from "@/domain/connectionModelRules";
import { isSelfHostedChatProvider } from "@/shared/constants/providers";
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
 */
function isCodexImageModel(requestedModel: string): boolean {
  const rawModel = requestedModel.slice(requestedModel.lastIndexOf("/") + 1);
  return isRegisteredImageModel("codex", rawModel);
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
  if (provider !== "codex") return false;
  const rawModel = requestedModel.slice(requestedModel.lastIndexOf("/") + 1);
  const { baseModel } = splitCodexReasoningSuffix(rawModel);
  return baseModel !== rawModel && isModelAdvertisedByConnection(baseModel, advertised);
}

/**
 * Self-hosted hosts and Codex subscription accounts can advertise different
 * inventories. For Codex, once an account inventory is known, unsynchronized
 * accounts are not eligible guesses for models advertised by another account.
 * With no inventories at all, retain the existing bootstrap/offline behavior.
 */
export async function loadAdvertisedModelsForConnections(
  connections: ProviderConnectionView[],
  requestedModel: string | null
): Promise<Map<string, Set<string>>> {
  const advertised = new Map<string, Set<string>>();
  if (!requestedModel) return advertised;

  const inventoryProviders = new Set(
    connections
      .map((c) => c.provider)
      .filter(
        (p): p is string =>
          typeof p === "string" &&
          (isSelfHostedChatProvider(p) || (p === "codex" && !isCodexImageModel(requestedModel)))
      )
  );
  if (inventoryProviders.size === 0) return advertised;

  await Promise.all(
    [...inventoryProviders].map(async (providerId) => {
      let byConnection: SyncedAvailableModelsByConnection;
      try {
        byConnection = await getSyncedAvailableModelsByConnection(providerId);
      } catch {
        return;
      }
      // Malformed persisted rows: fail open for the whole provider.
      if (byConnection[SYNCED_AVAILABLE_MODELS_MALFORMED]) return;
      if (
        providerId === "codex" &&
        Object.values(byConnection).some((models) => Array.isArray(models) && models.length > 0)
      ) {
        for (const connection of connections) {
          if (connection.provider === providerId) advertised.set(connection.id, new Set());
        }
      }
      for (const [connectionId, models] of Object.entries(byConnection)) {
        if (!Array.isArray(models) || models.length === 0) continue;
        advertised.set(connectionId, new Set(models.map((m) => m.id)));
      }
    })
  );

  return advertised;
}
