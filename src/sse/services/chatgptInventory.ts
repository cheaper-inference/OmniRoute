import { isModelAdvertisedByConnection } from "@/domain/connectionModelRules";
import { isSelfHostedChatProvider } from "@/shared/constants/providers";

/**
 * Providers whose per-connection synced inventory narrows connection selection:
 * self-hosted chat hosts (#11089) and ChatGPT registrations, whose catalogs are
 * account-specific.
 */
export function isAdvertisedInventoryProvider(providerId: string): boolean {
  return isSelfHostedChatProvider(providerId) || providerId === "chatgpt";
}

/**
 * Does this connection's synced inventory advertise the requested model?
 *
 * Self-hosted hosts keep the fail-open rule of `isModelAdvertisedByConnection`
 * (an unsynced host is "unknown"). ChatGPT alone fails CLOSED: it only accepts
 * models advertised for that particular OAuth registration, so a missing, empty
 * or unreadable inventory (including a failed DB read) matches nothing.
 */
export function isModelAdvertisedForConnection(
  requestedModel: string,
  connection: { id: string; provider?: string | null },
  advertisedByConnection: ReadonlyMap<string, ReadonlySet<string>>
): boolean {
  const advertised = advertisedByConnection.get(connection.id);
  if (connection.provider === "chatgpt" && (!advertised || advertised.size === 0)) return false;
  return isModelAdvertisedByConnection(requestedModel, advertised);
}
