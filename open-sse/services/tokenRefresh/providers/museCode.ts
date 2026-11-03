import { MUSE_CODE_MINT_URL, isMuseDcaToken } from "../../../config/museCode.ts";
import { MuseCodeMintError, mintMuseApiKey } from "../../museCodeAuth.ts";
import { runWithProxyContext } from "../../../utils/proxyFetch.ts";
import type { RefreshLogger } from "../shared.ts";

/**
 * Muse Code has no refresh-token grant. CLIProxyAPI remints the inference key
 * from the durable `dca:` device token on 401 / missing API key. OmniRoute
 * stores that DCA token as `refreshToken`.
 *
 * Mint-failure contract (#14138): a 401/403 means the OIDC token itself is dead
 * (expired/revoked) — re-minting can never succeed with it, so force re-login.
 * A 429 or any other failure is transient: the stored api_key never expires, so
 * return null and keep it; the next refresh cycle retries.
 */
export async function refreshMuseCodeToken(
  refreshToken: string,
  providerSpecificData: Record<string, unknown> | null | undefined,
  log: RefreshLogger,
  proxyConfig: unknown = null
) {
  const dcaFromData =
    typeof providerSpecificData?.dcaToken === "string" ? providerSpecificData.dcaToken.trim() : "";
  const dcaToken = isMuseDcaToken(dcaFromData)
    ? dcaFromData
    : isMuseDcaToken(refreshToken)
      ? refreshToken.trim()
      : "";
  if (!dcaToken) {
    log?.warn?.("TOKEN_REFRESH", "Muse Code refresh missing dca token");
    return { error: "unrecoverable_refresh_error", code: "no_refresh_token" };
  }

  try {
    const minted = await runWithProxyContext(proxyConfig, () =>
      mintMuseApiKey(dcaToken, MUSE_CODE_MINT_URL)
    );
    return {
      accessToken: minted.apiKey,
      refreshToken: dcaToken,
      expiresIn: undefined,
      providerSpecificData: {
        ...(providerSpecificData && typeof providerSpecificData === "object"
          ? providerSpecificData
          : {}),
        dcaToken,
        baseUrl: minted.baseUrl,
        email: minted.email,
        name: minted.name,
        subsTierName: minted.subsTierName,
        subsTierId: minted.subsTierId,
        isSubsActive: minted.isSubsActive,
        hasPaymentMethod: minted.hasPaymentMethod,
        requirePayment: minted.requirePayment,
        canSubscribe: minted.canSubscribe,
        lastRefresh: new Date().toISOString(),
      },
    };
  } catch (err) {
    if (
      err instanceof MuseCodeMintError &&
      (err.status === 401 || err.status === 403)
    ) {
      log?.warn?.(
        "TOKEN_REFRESH",
        "Muse Code refresh 401 — OIDC token invalid, re-login required"
      );
      return { error: "unrecoverable_refresh_error", code: "invalid_oidc_token" };
    }
    log?.warn?.("TOKEN_REFRESH", `Muse Code remint failed: ${(err as Error)?.message || "error"}`);
    return null;
  }
}
