/**
 * Invite/redeem tokens for server connection.
 *
 * @module lib/gamification/invites
 */

import crypto from "crypto";

/**
 * Generate an invite code (8-char alphanumeric, human-readable).
 */
function generateInviteCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[crypto.randomInt(0, chars.length)];
  }
  return code;
}

/**
 * Hash a token for storage (SHA-256).
 */
function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Create an invite token for server connection.
 * Returns the plaintext code (show to user) and token (for redemption).
 */
export async function createInvite(
  createdByApiKeyId: string,
  serverUrl?: string,
  maxUses: number = 1
): Promise<{ code: string; token: string }> {
  const code = generateInviteCode();
  const token = crypto.randomBytes(32).toString("base64url");
  const tokenHash = hashToken(token);
  const id = crypto.randomUUID();

  const { createInviteToken } = await import("../db/gamification");
  createInviteToken(id, code, tokenHash, createdByApiKeyId, serverUrl, maxUses);

  return { code, token };
}

/**
 * Redeem an invite code. Returns server info if successful.
 */
export async function redeemInvite(
  code: string,
  usedByApiKeyId: string
): Promise<{ success: boolean; serverUrl?: string; error?: string }> {
  const { getInviteByCode, redeemInvite: dbRedeem } = await import("../db/gamification");

  const invite = getInviteByCode(code);
  if (!invite) {
    return { success: false, error: "Invalid invite code" };
  }

  if (invite.revokedAt) {
    return { success: false, error: "Invite has been revoked" };
  }

  if (invite.expiresAt && new Date(invite.expiresAt) < new Date()) {
    return { success: false, error: "Invite has expired" };
  }

  if (invite.useCount >= invite.maxUses) {
    return { success: false, error: "Invite has been fully redeemed" };
  }

  if (invite.createdBy === usedByApiKeyId) {
    return { success: false, error: "Cannot redeem your own invite" };
  }

  const redeemed = dbRedeem(code, usedByApiKeyId);
  if (!redeemed) {
    return { success: false, error: "Failed to redeem invite" };
  }

  return { success: true, serverUrl: invite.serverUrl || undefined };
}

/**
 * List invites created by an API key.
 */
export async function listInvites(apiKeyId: string) {
  const { gamificationDefinitionRepositories } =
    await import("../db/repositories/gamificationDefinitionRepositories");
  return gamificationDefinitionRepositories.legacySync.listInvitesByCreator(apiKeyId);
}

/**
 * Revoke an invite token.
 */
export async function revokeInvite(inviteId: string): Promise<boolean> {
  const { revokeInvite: dbRevoke } = await import("../db/gamification");
  dbRevoke(inviteId);
  return true;
}
