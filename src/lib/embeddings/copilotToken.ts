import type { EmbeddingProvider } from "@omniroute/open-sse/config/embeddingRegistry.ts";
import {
  checkAndRefreshToken,
  refreshCopilotToken,
  updateProviderCredentials,
} from "@/sse/services/tokenRefresh";
import * as log from "@/sse/utils/logger";

type CredentialRecord = Record<string, unknown>;

export interface CopilotEmbeddingTokenDeps {
  checkAndRefreshToken: (provider: string, credentials: CredentialRecord) => Promise<unknown>;
  refreshCopilotToken: (
    accessToken: string,
    credentials: CredentialRecord
  ) => Promise<{ token?: string; expiresAt?: unknown } | null | undefined>;
  updateProviderCredentials: (connectionId: string, update: CredentialRecord) => Promise<unknown>;
}

const defaultDeps: CopilotEmbeddingTokenDeps = {
  checkAndRefreshToken,
  refreshCopilotToken,
  updateProviderCredentials,
};

function asRecord(value: unknown): CredentialRecord {
  return value && typeof value === "object" ? (value as CredentialRecord) : {};
}

function storedCopilotToken(credentials: CredentialRecord): string | null {
  const token = credentials.copilotToken || asRecord(credentials.providerSpecificData).copilotToken;
  return typeof token === "string" && token ? token : null;
}

/**
 * GitHub Copilot embeddings authenticate with the short-lived `copilotToken`
 * (about 30 min) exchanged from the GitHub OAuth token, never the OAuth token
 * itself. Chat keeps it fresh through its executor; embeddings have no executor,
 * so this runs the same lifecycle before dispatch: `checkAndRefreshToken`
 * renews an expiring token, and a connection that has never minted one (no chat
 * yet) gets one from the Copilot token endpoint. Both paths persist the token
 * on the connection. Any other provider passes through untouched, and a failed
 * exchange leaves the credentials as they were so the upstream answer decides.
 */
export async function ensureCopilotEmbeddingToken<T>(
  providerConfig: Pick<EmbeddingProvider, "tokenField"> | null | undefined,
  provider: string,
  credentials: T,
  deps: CopilotEmbeddingTokenDeps = defaultDeps
): Promise<T> {
  if (providerConfig?.tokenField !== "copilotToken" || !credentials) return credentials;
  if (typeof credentials !== "object") return credentials;

  let current = credentials as unknown as CredentialRecord;
  try {
    current = asRecord(await deps.checkAndRefreshToken(provider, current));
    if (storedCopilotToken(current)) return current as T;

    const accessToken = current.accessToken;
    if (typeof accessToken !== "string" || !accessToken) return current as T;
    const minted = await deps.refreshCopilotToken(accessToken, current);
    if (!minted?.token) return current as T;

    const providerSpecificData = {
      ...asRecord(current.providerSpecificData),
      copilotToken: minted.token,
      copilotTokenExpiresAt: minted.expiresAt,
    };
    if (typeof current.connectionId === "string" && current.connectionId) {
      await deps.updateProviderCredentials(current.connectionId, { providerSpecificData });
    }
    return { ...current, copilotToken: minted.token, providerSpecificData } as T;
  } catch (error) {
    log.warn("EMBED", `Copilot token refresh failed for ${provider}: ${String(error)}`);
    return current as T;
  }
}
