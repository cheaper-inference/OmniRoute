/**
 * Defensive check for Codex OAuth credentials bound to a different account.
 *
 * Refresh tokens rotate independently from the connection's saved ID token /
 * workspace metadata. A swapped access token must not silently make another
 * account's quota appear under the original connection.
 *
 * JWT payloads are decoded only for consistency checks, NOT authentication.
 * The OpenAI backend remains responsible for validating token signatures.
 * Opaque and claim-light access tokens remain supported.
 */
type Claims = Record<string, unknown>;

function record(value: unknown): Claims {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Claims)
    : {};
}

function nonEmpty(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function decodePayload(token: unknown): Claims | null {
  if (typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3 || !parts[1]) return null;
  try {
    const decoded: unknown = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
    return decoded && typeof decoded === "object" && !Array.isArray(decoded)
      ? (decoded as Claims)
      : null;
  } catch {
    return null;
  }
}

function authClaims(payload: Claims | null): Claims {
  return record(payload?.["https://api.openai.com/auth"]);
}

/**
 * Returns only a diagnostic code, never token material or account IDs.
 *
 * A Team member may select a workspace other than the personal account in
 * the JWT. We therefore compare the JWT account_id with a saved workspaceId
 * only for a confirmed personal workspace, not a Team/unknown workspace.
 */
export function codexCredentialBindingMismatch(
  accessToken: unknown,
  providerSpecificData: unknown,
  previousIdToken?: unknown
): "user_mismatch" | "personal_account_mismatch" | null {
  const access = decodePayload(accessToken);
  if (!access) return null;

  const saved = record(providerSpecificData);
  const previous = decodePayload(previousIdToken);
  const accessAuth = authClaims(access);
  const previousAuth = authClaims(previous);

  const accessUser = nonEmpty(accessAuth.chatgpt_user_id);
  const previousUser = nonEmpty(previousAuth.chatgpt_user_id);
  const savedUser = nonEmpty(saved.chatgptUserId);
  if (accessUser && ((previousUser && previousUser !== accessUser) ||
    (savedUser && savedUser !== accessUser))) {
    return "user_mismatch";
  }

  // The same JWT claim type is comparable even when the OpenAI auth block is
  // absent. Do not compare a JWT sub with a chatgpt_user_id: they may differ.
  const accessSub = nonEmpty(access.sub);
  const previousSub = nonEmpty(previous?.sub);
  if (accessSub && previousSub && accessSub !== previousSub) {
    return "user_mismatch";
  }

  if (saved.workspaceStructure === "personal") {
    const workspaceId = nonEmpty(saved.workspaceId);
    const accessAccountId = nonEmpty(accessAuth.chatgpt_account_id);
    if (workspaceId && accessAccountId && workspaceId !== accessAccountId) {
      return "personal_account_mismatch";
    }
  }
  return null;
}
