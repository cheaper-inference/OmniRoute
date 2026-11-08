import {
  createProviderConnection,
  getProviderConnections,
  updateProviderConnection,
} from "@/models";
import type { Ready, ZcodeFamily } from "./zcodeLogin";

export class ZcodeReauthMismatchError extends Error {}

function isMatchingReauthorizationTarget(
  target: { authType?: string; providerSpecificData?: unknown } | undefined,
  family: ZcodeFamily,
  userId: string
) {
  const data = target?.providerSpecificData as Record<string, unknown> | undefined;
  return Boolean(
    target && target.authType === "oauth" && data?.family === family && data.userId === userId
  );
}

/** A receipt lookup bypasses the connection cache, including after a post-insert error. */
export async function persistZcodeConnection(
  family: ZcodeFamily,
  credentials: Ready,
  receipt: string,
  targetConnectionId?: string
) {
  const existing = await getProviderConnections({ provider: "zcode" }, 1000000);
  const match = existing.find(
    (row: { providerSpecificData?: { oauthReceipt?: string } }) =>
      row.providerSpecificData?.oauthReceipt === receipt
  );
  if (match) return { id: String(match.id) };
  if (targetConnectionId) {
    const target = existing.find((row: { id?: string }) => row.id === targetConnectionId);
    const data = target?.providerSpecificData as Record<string, unknown> | undefined;
    if (!isMatchingReauthorizationTarget(target, family, credentials.userId)) {
      throw new ZcodeReauthMismatchError("The signed-in account does not match this connection");
    }
    const updated = await updateProviderConnection(targetConnectionId, {
      accessToken: credentials.accessToken,
      idToken: credentials.token,
      refreshToken: credentials.refreshToken ?? null,
      testStatus: "active",
      lastError: null,
      lastErrorType: null,
      errorCode: null,
      rateLimitedUntil: null,
      backoffLevel: 0,
      providerSpecificData: {
        ...data,
        oauthReceipt: receipt,
        accessTokenFormat: "business",
        email: credentials.email || data.email || null,
      },
    });
    if (!updated) throw new ZcodeReauthMismatchError("The connection is no longer available");
    return { id: targetConnectionId };
  }
  const connection = await createProviderConnection({
    provider: "zcode",
    authType: "oauth",
    testStatus: "active",
    name: credentials.name || credentials.email || credentials.userId,
    accessToken: credentials.accessToken,
    idToken: credentials.token,
    ...(credentials.refreshToken ? { refreshToken: credentials.refreshToken } : {}),
    providerSpecificData: {
      family,
      oauthReceipt: receipt,
      accessTokenFormat: "business",
      userId: credentials.userId,
      email: credentials.email || null,
    },
  });
  return { id: String(connection.id) };
}
