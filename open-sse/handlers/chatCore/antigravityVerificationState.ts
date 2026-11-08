import { mergeConnectionProviderSpecificData } from "@/lib/db/providers";
import {
  extractVerificationUrl,
  readStoredVerificationUrl,
} from "../../services/antigravityVerification.ts";

/**
 * chatCore leaf for Antigravity's `403 VALIDATION_REQUIRED`: keep the Google
 * "verify your account" link on the connection (providerSpecificData) so the
 * dashboard row can offer it, and drop it again after the next success.
 * Classification/cooldown are untouched (still PROJECT_ROUTE_ERROR, never banned).
 * The URL carries a continuation token — never log it.
 */
export async function recordAntigravityVerificationUrl(params: {
  provider: string | null | undefined;
  connectionId: string;
  upstreamErrorBody: unknown;
  message: string;
}): Promise<string | null> {
  if (params.provider !== "antigravity" || !params.connectionId) return null;
  const url =
    extractVerificationUrl(params.upstreamErrorBody) || extractVerificationUrl(params.message);
  if (!url) return null;
  await mergeConnectionProviderSpecificData(params.connectionId, {
    verificationUrl: url,
    verificationAt: new Date().toISOString(),
  });
  return url;
}

/** Returns true when a stored link was cleared (only writes when one exists). */
export async function clearAntigravityVerificationUrl(
  provider: string | null | undefined,
  connectionId: string,
  providerSpecificData: unknown
): Promise<boolean> {
  if (provider !== "antigravity" || !connectionId) return false;
  if (!readStoredVerificationUrl(providerSpecificData)) return false;
  // `undefined` values are dropped by the JSON.stringify inside the merge.
  await mergeConnectionProviderSpecificData(connectionId, {
    verificationUrl: undefined,
    verificationAt: undefined,
  });
  return true;
}
