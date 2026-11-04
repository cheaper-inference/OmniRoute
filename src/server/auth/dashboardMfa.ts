/**
 * Dashboard two-factor login (TOTP + single-use recovery codes).
 *
 * Opt-in: nothing changes until the operator enrolls an authenticator from
 * Settings → Security. While enabled, a correct password alone no longer yields a
 * dashboard session (`/api/auth/login`) nor a CLI access token (`/api/cli/connect`).
 *
 * Lost-device recovery: start the server with `OMNIROUTE_DISABLE_MFA=true` and sign in
 * from the host itself (loopback peer + loopback Host). The switch is ignored for every
 * other origin, so setting it on an exposed server does not open the remote login.
 */
import QRCode from "qrcode";
import {
  claimTotpCounter,
  clearDashboardMfaState,
  consumeBackupCodeHash,
  enableDashboardMfaState,
  getDashboardMfaState,
} from "@/lib/db/dashboardMfa";
import { findMatchingBackupCodeHash, generateBackupCodes } from "@/lib/auth/backupCodes";
import {
  buildOtpAuthUri,
  generateTotpSecret,
  looksLikeTotpCode,
  matchTotpCode,
} from "@/lib/auth/totp";
import { isHostOperatorRequest } from "@/server/auth/loginPeer";

export type SecondFactorMethod = "totp" | "backup_code";

export type SecondFactorResult =
  | { ok: true; method: SecondFactorMethod; backupCodesRemaining: number }
  | { ok: false; reason: "not_enabled" | "invalid" };

export interface DashboardMfaStatus {
  enabled: boolean;
  backupCodesRemaining: number;
  enabledAt: string | null;
  recoverySwitchSet: boolean;
}

function isRecoverySwitchSet(): boolean {
  const raw = (process.env.OMNIROUTE_DISABLE_MFA || "").trim().toLowerCase();
  return raw === "true" || raw === "1";
}

export function isDashboardMfaEnabled(): boolean {
  return getDashboardMfaState().enabled;
}

/** True when the recovery switch is set AND the request comes from the operator at the host. */
export function isMfaRecoveryBypassActive(request: Request): boolean {
  return isRecoverySwitchSet() && isHostOperatorRequest(request);
}

/** Whether a password-authenticated `request` still owes a second factor. */
export function isMfaRequiredForRequest(request: Request): boolean {
  if (!isDashboardMfaEnabled()) return false;
  return !isMfaRecoveryBypassActive(request);
}

export function getDashboardMfaStatus(): DashboardMfaStatus {
  const state = getDashboardMfaState();
  return {
    enabled: state.enabled,
    backupCodesRemaining: state.enabled ? state.backupCodeHashes.length : 0,
    enabledAt: state.enabledAt,
    recoverySwitchSet: isRecoverySwitchSet(),
  };
}

/**
 * Check a 6-digit TOTP code or a recovery code against the enrolled factor.
 * A TOTP step is accepted once (a replay inside its 90 s window fails) and a recovery
 * code is burned before this resolves, so neither can be reused.
 */
export async function verifyDashboardSecondFactor(input: unknown): Promise<SecondFactorResult> {
  const state = getDashboardMfaState();
  if (!state.enabled) return { ok: false, reason: "not_enabled" };

  const candidate = typeof input === "string" ? input.trim() : "";
  if (!candidate) return { ok: false, reason: "invalid" };

  if (looksLikeTotpCode(candidate)) {
    const counter = matchTotpCode(state.secret, candidate);
    if (counter === null || !claimTotpCounter(counter)) return { ok: false, reason: "invalid" };
    return { ok: true, method: "totp", backupCodesRemaining: state.backupCodeHashes.length };
  }

  const hash = await findMatchingBackupCodeHash(candidate, state.backupCodeHashes);
  if (!hash) return { ok: false, reason: "invalid" };
  const remaining = consumeBackupCodeHash(hash);
  if (remaining === null) return { ok: false, reason: "invalid" };
  return { ok: true, method: "backup_code", backupCodesRemaining: remaining };
}

/** Step 1 of enrollment: a candidate secret and its QR. Nothing is persisted yet. */
export async function createMfaEnrollment(): Promise<{
  secret: string;
  otpauthUri: string;
  qrCodeDataUri: string;
}> {
  const secret = generateTotpSecret();
  const otpauthUri = buildOtpAuthUri({ secret, account: "admin" });
  const qrCodeDataUri = await QRCode.toDataURL(otpauthUri, {
    errorCorrectionLevel: "M",
    margin: 1,
    width: 240,
  });
  return { secret, otpauthUri, qrCodeDataUri };
}

/**
 * Step 2 of enrollment: persist `secret` only once `code` proves the authenticator holds it.
 * Returns the plaintext recovery codes (shown exactly once), or null when the code is wrong.
 */
export async function completeMfaEnrollment(
  secret: string,
  code: string
): Promise<{ backupCodes: string[] } | null> {
  if (matchTotpCode(secret, code) === null) return null;
  const { codes, hashes } = await generateBackupCodes();
  // The enrollment code proves possession, it is not a login: leave the replay marker
  // unset so signing in right after enrolling is not refused for reusing the same step.
  enableDashboardMfaState({ secret, backupCodeHashes: hashes, lastTotpCounter: null });
  return { backupCodes: codes };
}

export function disableDashboardMfa(): void {
  clearDashboardMfaState();
}
