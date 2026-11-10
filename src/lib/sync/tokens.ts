import { createHash, randomBytes } from "crypto";
import {
  createSyncTokenRecord,
  getSyncTokenByHash,
  listSyncTokens,
  revokeSyncToken,
  touchSyncTokenLastUsed,
  type SyncTokenRecord,
} from "@/lib/db/syncTokens";
import { getApiKeyById, getApiKeyMetadata } from "@/lib/db/apiKeys";
import { getCachedSettings } from "@/lib/db/readCache";
import { SYNTHETIC_ENV_API_KEY_ID } from "@/shared/constants/apiKeyIdentities";
import { SESSIONS_VALID_AFTER_SETTING } from "@/shared/utils/dashboardSessionToken";

/** Default lifetime of a newly issued sync token. Matches the CLI's `--ttl` default. */
export const DEFAULT_SYNC_TOKEN_TTL_MS = 30 * 86_400_000;

function normalizeToken(rawToken: string | null | undefined) {
  if (typeof rawToken !== "string") return null;
  const token = rawToken.trim();
  return token.length > 0 ? token : null;
}

export function hashSyncToken(rawToken: string) {
  // CodeQL: Intentionally SHA-256, NOT password hashing. Sync tokens are
  // high-entropy random values (osync_ + 32 random bytes) — not user passwords.
  // codeql[js/insufficient-password-hash]
  return createHash("sha256").update(rawToken).digest("hex"); // nosemgrep: insufficient-password-hash
}

export function generatePlaintextSyncToken() {
  return `osync_${randomBytes(32).toString("base64url")}`;
}

export async function issueSyncToken(params: {
  name: string;
  syncApiKeyId?: string | null;
  issuedBy?: string | null;
  /** ISO expiry. Omitted → now + DEFAULT_SYNC_TOKEN_TTL_MS; explicit null → no expiry. */
  expiresAt?: string | null;
}) {
  const plaintextToken = generatePlaintextSyncToken();
  const expiresAt =
    params.expiresAt === undefined
      ? new Date(Date.now() + DEFAULT_SYNC_TOKEN_TTL_MS).toISOString()
      : params.expiresAt;
  const record = await createSyncTokenRecord({
    name: params.name,
    tokenHash: hashSyncToken(plaintextToken),
    syncApiKeyId: params.syncApiKeyId || null,
    issuedBy: params.issuedBy || null,
    expiresAt,
  });

  return {
    token: plaintextToken,
    record,
  };
}

export async function validateSyncToken(rawToken: string | null | undefined) {
  const token = normalizeToken(rawToken);
  if (!token) return null;

  const record = await getSyncTokenByHash(hashSyncToken(token));
  if (!record || record.revokedAt) return null;
  if (isIssuedWithoutCredential(record)) return null;
  if (isSyncTokenExpired(record)) return null;
  if (await isIssuedBeforePasswordChange(record)) return null;
  if (!(await isLinkedApiKeyLive(record))) return null;
  return record;
}

/**
 * Earlier releases let an anonymous caller mint a sync token while login was disabled, recorded
 * as `issuedBy: "open"`. Nothing vouches for whoever holds one, and turning login back on did not
 * end it, so these tokens never open the bundle again. Issuance now always needs a credential.
 */
function isIssuedWithoutCredential(record: SyncTokenRecord) {
  return record.issuedBy === "open";
}

function isSyncTokenExpired(record: SyncTokenRecord, now = Date.now()) {
  if (!record.expiresAt) return false;
  const expiresMs = Date.parse(record.expiresAt);
  // An unparseable expiry is treated as expired: fail closed.
  return !Number.isFinite(expiresMs) || expiresMs <= now;
}

/**
 * A password change ends every dashboard session issued before it
 * (`sessionsValidAfter`, unix seconds — see dashboardSessionToken.ts). Sync tokens follow the
 * same cutoff, whatever issued them, so rotating the password is the one action that ends every
 * outstanding credential. Fails closed if settings cannot be read.
 */
async function isIssuedBeforePasswordChange(record: SyncTokenRecord) {
  try {
    const settings = (await getCachedSettings()) as Record<string, unknown>;
    const validAfter = settings[SESSIONS_VALID_AFTER_SETTING];
    if (typeof validAfter !== "number") return false;
    const createdMs = Date.parse(record.createdAt);
    if (!Number.isFinite(createdMs)) return true;
    return Math.floor(createdMs / 1000) < validAfter;
  } catch {
    return true;
  }
}

/**
 * A token linked to an API key lives only as long as that key: deleted, revoked, deactivated,
 * banned or expired keys take their sync tokens with them. Legacy rows linked to the synthetic
 * env key cannot be checked here (it has no row) and rely on the password cutoff instead.
 */
async function isLinkedApiKeyLive(record: SyncTokenRecord) {
  if (!record.syncApiKeyId || record.syncApiKeyId === SYNTHETIC_ENV_API_KEY_ID) return true;
  try {
    const key = (await getApiKeyById(record.syncApiKeyId)) as Record<string, unknown> | null;
    if (!key) return false;
    if (key.isActive === false || key.isBanned === true) return false;
    if (typeof key.revokedAt === "string" && key.revokedAt.trim() !== "") return false;
    if (typeof key.expiresAt === "string" && key.expiresAt.trim() !== "") {
      const keyExpiresMs = Date.parse(key.expiresAt);
      if (Number.isFinite(keyExpiresMs) && keyExpiresMs <= Date.now()) return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function markSyncTokenUsed(record: SyncTokenRecord) {
  await touchSyncTokenLastUsed(record.id);
}

export async function listSyncTokenSummaries() {
  const records = await listSyncTokens();
  return records.map((record) => ({
    id: record.id,
    name: record.name,
    syncApiKeyId: record.syncApiKeyId,
    issuedBy: record.issuedBy,
    expiresAt: record.expiresAt,
    revokedAt: record.revokedAt,
    lastUsedAt: record.lastUsedAt,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  }));
}

export async function revokeSyncTokenById(id: string) {
  const revoked = await revokeSyncToken(id);
  if (!revoked) return null;
  return {
    id: revoked.id,
    name: revoked.name,
    syncApiKeyId: revoked.syncApiKeyId,
    issuedBy: revoked.issuedBy,
    expiresAt: revoked.expiresAt,
    revokedAt: revoked.revokedAt,
    lastUsedAt: revoked.lastUsedAt,
    createdAt: revoked.createdAt,
    updatedAt: revoked.updatedAt,
  };
}

export async function resolveSyncApiKeyIdFromManagementRequest(request: Request) {
  const authHeader = request.headers.get("authorization") || request.headers.get("Authorization");
  if (typeof authHeader !== "string") return null;
  const trimmedHeader = authHeader.trim();
  if (!trimmedHeader.toLowerCase().startsWith("bearer ")) return null;

  const apiKey = trimmedHeader.slice(7).trim();
  if (!apiKey) return null;

  const metadata = await getApiKeyMetadata(apiKey);
  if (!metadata?.id) return null;
  // Link only keys that have a row (and can therefore be deleted/revoked). The synthetic env
  // key and the self-loop key have none, so linking them would make the token unverifiable.
  const row = await getApiKeyById(metadata.id);
  return row ? metadata.id : null;
}

export function getSyncTokenFromRequest(request: Request) {
  const explicitHeader = request.headers.get("x-sync-token");
  if (typeof explicitHeader === "string" && explicitHeader.trim().length > 0) {
    return explicitHeader.trim();
  }

  const authHeader = request.headers.get("authorization") || request.headers.get("Authorization");
  if (typeof authHeader !== "string") return null;
  const trimmedHeader = authHeader.trim();
  if (!trimmedHeader.toLowerCase().startsWith("bearer ")) return null;
  return trimmedHeader.slice(7).trim() || null;
}
