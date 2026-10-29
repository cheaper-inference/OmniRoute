import { createHash } from "node:crypto";
import { parseTokenExpiryMs } from "../../utils/tokenExpiry.ts";

export const PASSIVE_CODEX_IDS = ["codex", "cx"] as const;
export const PASSIVE_REFRESH_ENV = "OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS";
export const PASSIVE_REFRESH_MESSAGE =
  "Codex token refresh is passive on this instance. Refresh on the active instance and synchronize the tokens, then retry.";

export function parsePassiveProviders(value: string | undefined): string[] {
  const ids = (value || "").split(",").map((id) => id.trim().toLowerCase());
  return [...new Set(ids.filter(Boolean))];
}
function isCodexId(provider: unknown): boolean {
  const id = typeof provider === "string" ? provider.trim().toLowerCase() : "";
  return PASSIVE_CODEX_IDS.some((value) => value === id);
}
export function passiveProvidersError(value: string | undefined): string | undefined {
  const unsupported = parsePassiveProviders(value).filter((id) => !isCodexId(id));
  if (!unsupported.length) return;
  return `${PASSIVE_REFRESH_ENV}: unsupported ids: ${unsupported.join(", ")}. Supported ids: ${PASSIVE_CODEX_IDS.join(", ")}`;
}
/** Unknown providers are never passive, even if startup validation was bypassed. */
export function isPassiveCodex(provider: unknown): boolean {
  const ids = parsePassiveProviders(process.env[PASSIVE_REFRESH_ENV]);
  return isCodexId(provider) && ids.some(isCodexId);
}

const rejectedFingerprints = Symbol("passiveCodexRejectedFingerprints");
type CredentialSnapshot = Partial<Record<"connectionId" | "id" | "accessToken", string>> & {
  [rejectedFingerprints]?: string[];
};
const fingerprint = (token: string) => createHash("sha256").update(token).digest("hex");
/** Request-owned fingerprints only: no token material, registry, timers or cleanup. */
export function getRejectedTokenFingerprints(credentials: CredentialSnapshot): string[] {
  return [...(credentials[rejectedFingerprints] || [])];
}
/** Called only after an upstream 401/403, where credential recovery already runs. */
export function recordRejectedToken(credentials: CredentialSnapshot): void {
  if (!credentials.accessToken) return;
  const hash = fingerprint(credentials.accessToken);
  const previous = getRejectedTokenFingerprints(credentials).filter((value) => value !== hash);
  // One proactive adoption, one pipeline auth recovery, one streaming recovery: four slots suffice.
  credentials[rejectedFingerprints] = [...previous, hash].slice(-4);
}

const tokenString = (value: unknown) => (typeof value === "string" ? value : undefined);
type TokenField = "accessToken" | "refreshToken" | "idToken" | "expiresAt" | "tokenExpiresAt";
type PassiveTokens = Partial<Record<TokenField | "error", string>>;
export async function adoptPassiveCodex<T extends CredentialSnapshot>(credentials: T): Promise<T> {
  const tokens = await resolvePassiveCodex(credentials);
  return tokens.accessToken ? { ...credentials, ...tokens } : credentials;
}
/** Read only token fields; a rejected token must never qualify as its own replacement. */
export async function resolvePassiveCodex(creds?: CredentialSnapshot): Promise<PassiveTokens> {
  const disabled = { error: "refresh_disabled" };
  const id = creds?.connectionId || creds?.id;
  if (!id) return disabled;
  try {
    // This DB accessor executes SELECT directly, unlike the five-second readCache wrapper.
    const { getProviderConnectionById } = await import("../codexAccount/write.ts");
    const stored = await getProviderConnectionById(id);
    if (!stored || !isCodexId(stored.provider)) return disabled;
    const accessToken = tokenString(stored.accessToken);
    const expiry = parseTokenExpiryMs(stored.tokenExpiresAt || stored.expiresAt);
    if (
      !accessToken ||
      !(expiry > Date.now()) ||
      accessToken === creds.accessToken ||
      getRejectedTokenFingerprints(creds).includes(fingerprint(accessToken))
    )
      return disabled;
    return {
      accessToken,
      refreshToken: tokenString(stored.refreshToken),
      idToken: tokenString(stored.idToken),
      expiresAt: new Date(expiry).toISOString(),
      tokenExpiresAt: new Date(expiry).toISOString(),
    };
  } catch {
    console.debug("[TOKEN_REFRESH]", {
      provider: "codex",
      connectionId: id,
      reason: "reread failed",
    });
    return disabled;
  }
}
