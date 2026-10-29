/**
 * Dashboard two-factor (TOTP) state.
 *
 * Lives in its own `key_value` namespace rather than in `settings`: `getSettings()` is read
 * by dozens of consumers and serialized by `GET /api/settings`, and `PATCH /api/settings`
 * writes whatever its schema lets through. Keeping the factor out of that namespace means
 * no settings read can leak it and no settings write can disable or replace it. Only the
 * `/api/auth/mfa/*` routes (current password + a live code) change it.
 *
 * The TOTP secret is encrypted at rest with the same AES-256-GCM helper as provider
 * credentials; recovery codes are stored as bcrypt hashes only.
 */
import { getDbInstance } from "./core";
import { decrypt, encrypt } from "./encryption";

const NAMESPACE = "dashboardMfa";
const STATE_KEY = "state";

export interface DashboardMfaState {
  enabled: boolean;
  /** Base32 TOTP secret, decrypted. Empty when disabled — or when it cannot be decrypted. */
  secret: string;
  backupCodeHashes: string[];
  /** Highest TOTP step already accepted; a code for this step or an earlier one is a replay. */
  lastTotpCounter: number | null;
  enabledAt: string | null;
}

interface StoredState {
  enabled?: unknown;
  secret?: unknown;
  backupCodeHashes?: unknown;
  lastTotpCounter?: unknown;
  enabledAt?: unknown;
}

const DISABLED_STATE: DashboardMfaState = Object.freeze({
  enabled: false,
  secret: "",
  backupCodeHashes: [],
  lastTotpCounter: null,
  enabledAt: null,
}) as DashboardMfaState;

function readStoredState(): StoredState | null {
  const row = getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(NAMESPACE, STATE_KEY) as { value?: string } | undefined;
  if (!row || typeof row.value !== "string") return null;
  const parsed = JSON.parse(row.value) as unknown;
  return parsed && typeof parsed === "object" ? (parsed as StoredState) : null;
}

function toState(stored: StoredState | null): DashboardMfaState {
  if (!stored || stored.enabled !== true) return { ...DISABLED_STATE, backupCodeHashes: [] };
  const decrypted = typeof stored.secret === "string" ? decrypt(stored.secret) : null;
  return {
    // Fail closed: an enabled factor whose secret cannot be decrypted (changed
    // STORAGE_ENCRYPTION_KEY) stays enabled with an empty secret, so no TOTP code
    // verifies. Backup codes or the host-operator recovery switch get the operator back in.
    enabled: true,
    secret: typeof decrypted === "string" ? decrypted : "",
    backupCodeHashes: Array.isArray(stored.backupCodeHashes)
      ? stored.backupCodeHashes.filter((hash): hash is string => typeof hash === "string")
      : [],
    lastTotpCounter: typeof stored.lastTotpCounter === "number" ? stored.lastTotpCounter : null,
    enabledAt: typeof stored.enabledAt === "string" ? stored.enabledAt : null,
  };
}

function writeStoredState(stored: StoredState): void {
  getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(NAMESPACE, STATE_KEY, JSON.stringify(stored));
}

export function getDashboardMfaState(): DashboardMfaState {
  return toState(readStoredState());
}

/** Turn the factor on with `secret` and the given recovery-code hashes (replaces any prior state). */
export function enableDashboardMfaState(input: {
  secret: string;
  backupCodeHashes: string[];
  lastTotpCounter: number | null;
}): void {
  writeStoredState({
    enabled: true,
    secret: encrypt(input.secret) ?? input.secret,
    backupCodeHashes: [...input.backupCodeHashes],
    lastTotpCounter: input.lastTotpCounter,
    enabledAt: new Date().toISOString(),
  });
}

/** Turn the factor off and drop the secret and every recovery-code hash. */
export function clearDashboardMfaState(): void {
  getDbInstance()
    .prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?")
    .run(NAMESPACE, STATE_KEY);
}

/**
 * Record that the TOTP step `counter` was used. Returns false when that step (or a later
 * one) was already accepted — the same code replayed inside its validity window.
 * Read-check-write runs in one transaction so two concurrent requests cannot both win.
 */
export function claimTotpCounter(counter: number): boolean {
  const db = getDbInstance();
  return db.transaction(() => {
    const stored = readStoredState();
    if (!stored || stored.enabled !== true) return false;
    const last = typeof stored.lastTotpCounter === "number" ? stored.lastTotpCounter : null;
    if (last !== null && counter <= last) return false;
    writeStoredState({ ...stored, lastTotpCounter: counter });
    return true;
  })();
}

/**
 * Burn one recovery-code hash. Returns the number of codes left, or null when the hash
 * was no longer stored (already spent by a concurrent request).
 */
export function consumeBackupCodeHash(hash: string): number | null {
  const db = getDbInstance();
  return db.transaction(() => {
    const stored = readStoredState();
    if (!stored || stored.enabled !== true || !Array.isArray(stored.backupCodeHashes)) return null;
    const hashes = stored.backupCodeHashes.filter(
      (entry): entry is string => typeof entry === "string"
    );
    const index = hashes.indexOf(hash);
    if (index === -1) return null;
    hashes.splice(index, 1);
    writeStoredState({ ...stored, backupCodeHashes: hashes });
    return hashes.length;
  })();
}
