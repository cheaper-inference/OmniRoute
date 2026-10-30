import { DEVIN_DESKTOP_CONFIG } from "../constants/oauth";
import { devinAuth } from "../services/devinAuth";

/**
 * Devin Desktop provider.
 *
 * Two auth paths share this provider:
 *  - `import_token` (original): paste an existing ide_token.
 *  - `password` (added): Devin Auth email+password login, which also yields a
 *    long-lived `auth1_token` usable for refresh without the password.
 *
 * The password path never persists the password — only the resulting tokens.
 */
export const devinDesktop = {
  config: DEVIN_DESKTOP_CONFIG,
  flowType: "import_token" as const,

  /** Actions beyond the generic flow, dispatched by the oauth route. */
  actions: ["password-login"] as const,

  validateImportToken(token: string): { valid: boolean; reason?: string } {
    const trimmed = (token ?? "").trim();
    if (!trimmed) return { valid: false, reason: "Token is empty" };
    if (trimmed.length < 16) return { valid: false, reason: "Token is too short" };
    return { valid: true };
  },

  /**
   * Devin Auth email+password sign-in. Returns the same token shape as
   * `importToken`, so persistence is identical; the auth1_token rides along in
   * providerSpecificData so a reconnect can refresh without the password.
   */
  async passwordLogin(email: string, password: string) {
    const result = await devinAuth.loginWithPassword(email, password);
    return {
      accessToken: result.ideToken,
      refreshToken: null as string | null,
      expiresIn: null as number | null,
      email: result.email ?? undefined,
      name: result.email ?? undefined,
      providerSpecificData: {
        devinAuth1Token: result.auth1Token,
        devinSessionToken: result.sessionToken,
        devinAccountId: result.accountId ?? undefined,
        devinOrgId: result.orgId ?? undefined,
        devinIdeToken: result.ideToken,
      },
    };
  },

  mapTokens(tokens: { accessToken: string }) {
    return {
      accessToken: tokens.accessToken,
      refreshToken: null,
      expiresIn: null as number | null,
    };
  },
};
