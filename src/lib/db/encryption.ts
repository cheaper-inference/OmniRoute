/**
 * Field-Level Encryption — AES-256-GCM
 *
 * Encrypts/decrypts sensitive fields (API keys, tokens) stored in SQLite.
 * Format: `enc:v1:<iv_hex>:<ciphertext_hex>:<authTag_hex>`
 *
 * If STORAGE_ENCRYPTION_KEY is not set, operates in passthrough mode
 * (stores plaintext for development convenience).
 *
 * KEY DERIVATION CHANGE (v3.7.9):
 * The PRIMARY key is now derived with a static salt ("omniroute-field-encryption-v1").
 * The LEGACY key used a dynamic salt (sha256 hash of the key). Auto-migration
 * re-encrypts any legacy-encrypted tokens on decrypt.
 *
 * Why the change?
 * The dynamic salt `createHash("sha256").update(secret).digest().slice(0, 16)` produced
 * a different derived key than the static salt `"omniroute-field-encryption-v1"`. When the
 * health-check/token-refresh path used one derivation and the main API used another,
 * tokens encrypted by one path became undecryptable by the other, causing:
 * - Persistent decrypt failures
 * - Re-encryption loops (health-check undoing fixes)
 * - CPU spikes (50%) from error cascades
 *
 * This fix makes the static salt the primary derivation and auto-migrates
 * legacy-encrypted tokens back to static-salt encryption.
 */

import { createCipheriv, createDecipheriv, randomBytes, scryptSync, createHash } from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const KEY_LENGTH = 32;
/**
 * GCM authentication tag length, in bytes. Pinned to the full 16-byte tag
 * produced by `cipher.getAuthTag()`. Passing `authTagLength` to
 * `createDecipheriv` rejects truncated authentication tags up front, closing
 * the GCM tag-truncation forgery vector (Semgrep gcm-no-tag-length).
 */
const AUTH_TAG_LENGTH = 16;
const PREFIX = "enc:v1:";
const STATIC_SALT = "omniroute-field-encryption-v1";

let _staticKey: Buffer | null = null;
let _legacyDynamicKey: Buffer | null = null;
let _staticKeyBeforeFirstEqualsFix: Buffer | null = null;
let _legacyDynamicKeyBeforeFirstEqualsFix: Buffer | null = null;
/** Connection object with potentially encrypted credential fields. */
export interface ConnectionFields {
  apiKey?: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  idToken?: string | null;
  providerSpecificData?: unknown;
  credentialDecryptFailed?: boolean;
  [key: string]: unknown;
}

/**
 * #9927 — dedupe tracker for credential-decrypt-failure messages. The health
 * sweep / refresh / request routing re-decrypt the same corrupt row every
 * cycle; we log the enriched, actionable message ONCE per
 * (provider + connection + failing-ciphertext) state so it does not spam
 * every sweep, while still re-logging if the row state actually changes
 * (e.g. a different field starts failing) instead of permanently suppressing.
 */
const loggedDecryptFailures = new Set<string>();

function decryptFailureSignature(
  connectionId: string,
  provider: string,
  failed: Array<{ field: string; value: unknown }>
): string {
  const parts = failed
    .map((f) => `${f.field}:${typeof f.value === "string" ? f.value : ""}`)
    .sort()
    .join("|");
  return `${provider}::${connectionId}::${parts}`;
}

const RECOVERY_HINT =
  "Re-authenticate this account, or verify STORAGE_ENCRYPTION_KEY matches the key used to store it.";

import fs from "fs";
import path from "path";
import os from "os";
import { isTestContext, resolveDataDir } from "../dataPaths.ts";
import { mapProviderSpecificDataSecrets } from "./providers/providerSpecificDataSecrets";

// Same as bin/cli/utils/parseEnvValue.mjs: quoted values are verbatim, and an
// unquoted `#` preceded by whitespace starts a comment. The copy in
// scripts/build/bootstrap-env.mjs differs in one case: it reads a value that
// starts with `#` (`KEY=  # set me`) as empty. Here, as in the CLI and in the
// reader before this change, that text is the key.
function parseEnvValue(raw: string): string {
  const value = raw.trim();
  const quoted = value.match(/^(['"])([\s\S]*)\1\s*(?:#.*)?$/);
  if (quoted) return quoted[2];
  const commentIdx = value.search(/\s#/);
  return (commentIdx === -1 ? value : value.slice(0, commentIdx)).trim();
}

/**
 * What the .env reader before the first-"=" fix took from a trimmed line. It
 * cut the value at a second "=", kept a leading quote when the closing one was
 * cut off, and kept inline comments. Data encrypted under that value must stay
 * readable after the upgrade, so decrypt() also tries a key derived from it.
 */
function readValueBeforeFirstEqualsFix(trimmed: string): string | undefined {
  if (!trimmed.startsWith("STORAGE_ENCRYPTION_KEY=")) return undefined;
  const val = trimmed
    .split("=", 2)[1]
    ?.trim()
    .replace(/^["'](.*)["']$/, "$1");
  return val || undefined;
}

/**
 * Set by the first module instance in a process that resolves the key from
 * .env. Kept on globalThis because Next.js evaluates this module once per
 * bundle (instrumentation, route handlers): later instances find
 * STORAGE_ENCRYPTION_KEY already in process.env and never read the .env file.
 * Non-enumerable, and read only as an own property.
 */
const BEFORE_FIX_STATE = Symbol.for("omniroute.storageKeyBeforeFirstEqualsFix");
type BeforeFixState = { secret: string; beforeFix?: string };

/**
 * Set in process.env when the old reading differs, so a process that inherits
 * the environment (child process, worker thread, `pm2 restart --update-env`)
 * reads the .env file again to find it. Holds no key material.
 */
const OLD_READING_ENV_FLAG = "OMNIROUTE_DOTENV_KEY_OLD_READING";

function getBeforeFixState(): BeforeFixState | undefined {
  if (!Object.prototype.hasOwnProperty.call(globalThis, BEFORE_FIX_STATE)) return undefined;
  const state = (globalThis as unknown as Record<symbol, unknown>)[BEFORE_FIX_STATE];
  if (!state || typeof (state as BeforeFixState).secret !== "string") return undefined;
  return state as BeforeFixState;
}

function setBeforeFixState(state: BeforeFixState): void {
  Object.defineProperty(globalThis, BEFORE_FIX_STATE, {
    value: state,
    enumerable: false,
    configurable: true,
    writable: true,
  });
}

/** Key text the old reader would have used, when it differs from the active key. */
function secretBeforeFirstEqualsFix(): string | undefined {
  const state = getBeforeFixState();
  if (!state || state.secret !== process.env.STORAGE_ENCRYPTION_KEY) return undefined;
  return typeof state.beforeFix === "string" ? state.beforeFix : undefined;
}

/**
 * The old reading, when it differs from the active key and could derive a key.
 * The old reader also stopped at a blank value (`KEY="  "`), but a blank key
 * stored plaintext, so there is no data under it to recover.
 */
function distinctOldReading(beforeFix: string | undefined, secret: string): string | undefined {
  return beforeFix?.trim() && beforeFix !== secret ? beforeFix : undefined;
}

/** Both readings of the first STORAGE_ENCRYPTION_KEY lines in the .env files. */
function readDotEnvKey(): { current?: string; beforeFix?: string } {
  const candidates = [
    path.join(resolveDataDir(), ".env"),
    path.join(process.cwd(), ".env"),
    path.join(os.homedir(), ".hermes", ".env"),
  ];
  let current: string | undefined;
  let beforeFix: string | undefined;
  let found = false;
  for (const envPath of candidates) {
    try {
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, "utf8");
        for (const line of content.split("\n")) {
          const trimmed = line.trim();
          beforeFix ??= readValueBeforeFirstEqualsFix(trimmed);
          if (found) continue;
          // Split on the first "=" only, like bin/omniroute.mjs and
          // scripts/build/bootstrap-env.mjs. `split("=", 2)` dropped everything
          // after a second "=", so a base64 key lost its padding.
          const eqIdx = trimmed.indexOf("=");
          if (eqIdx < 1 || trimmed.slice(0, eqIdx).trim() !== "STORAGE_ENCRYPTION_KEY") continue;
          const val = parseEnvValue(trimmed.slice(eqIdx + 1));
          // As in bin/omniroute.mjs, the first non-empty value wins, even a
          // blank one (`KEY="  "`). The CLI puts that value in process.env and
          // never gets here, so a later line would give a key the CLI does not
          // use. The CLI's empty value does lead here, so skip empty values.
          if (!val) continue;
          found = true;
          // A blank value cannot derive a key; leave it unset so the old
          // reading below keeps encryption on where it was on before.
          if (val.trim()) current = val;
        }
      }
    } catch {}
  }
  return { current, beforeFix };
}

function warnOldReading(oldReading: string, secret: string): void {
  console.warn(
    "[Encryption] STORAGE_ENCRYPTION_KEY was read from a .env file, and versions " +
      "before the first-'=' parsing fix read a different value from it " +
      `(${oldReading.length} chars, now ${secret.length}). Data stored under either ` +
      "value still decrypts while this .env line stays as it is. Only provider " +
      "connection tokens are re-encrypted at startup; every other encrypted value " +
      "(for example settings, providerSpecificData, webhooks, proxy credentials, " +
      "API key and JWT secrets) keeps the old encryption. Keep this .env line " +
      "unchanged. If it was edited, restore it; setting the old value in the process " +
      "environment instead breaks the re-encrypted tokens."
  );
}

/**
 * The key came from the environment, but the process that put it there read
 * it from .env and found a different old reading. Read the .env file again;
 * the old reading counts only if the file still yields the inherited key.
 */
function inheritOldReading(secret: string): void {
  if (process.env[OLD_READING_ENV_FLAG] !== "1" || getBeforeFixState()) return;
  const { current, beforeFix } = readDotEnvKey();
  const fromFile = current ?? beforeFix;
  const oldReading = fromFile === secret ? distinctOldReading(beforeFix, secret) : undefined;
  setBeforeFixState(oldReading ? { secret, beforeFix: oldReading } : { secret });
  if (oldReading) warnOldReading(oldReading, secret);
}

function ensureSecretLoaded(): string | undefined {
  if (isTestContext()) {
    return process.env.STORAGE_ENCRYPTION_KEY;
  }
  if (process.env.STORAGE_ENCRYPTION_KEY) {
    inheritOldReading(process.env.STORAGE_ENCRYPTION_KEY);
    return process.env.STORAGE_ENCRYPTION_KEY;
  }
  const { current, beforeFix } = readDotEnvKey();
  // Never turn encryption off where the old reader turned it on.
  const secret = current ?? beforeFix;
  if (!secret) return undefined;
  const oldReading = distinctOldReading(beforeFix, secret);
  setBeforeFixState(oldReading ? { secret, beforeFix: oldReading } : { secret });
  if (oldReading !== undefined) {
    warnOldReading(oldReading, secret);
  } else if (current === undefined && secret.trim()) {
    console.warn(
      "[Encryption] STORAGE_ENCRYPTION_KEY in .env is read as empty by the current " +
        "parser; using the value earlier versions read so stored credentials stay " +
        "encrypted and readable."
    );
  }
  if (secret.startsWith("#")) {
    console.warn(
      "[Encryption] STORAGE_ENCRYPTION_KEY in .env starts with '#'. It is used as the " +
        "key text, as the CLI does, not treated as a comment. Credentials already stored " +
        "are encrypted under it, so do not delete it without re-entering them."
    );
  }
  if (oldReading !== undefined) process.env[OLD_READING_ENV_FLAG] = "1";
  else delete process.env[OLD_READING_ENV_FLAG];
  process.env.STORAGE_ENCRYPTION_KEY = secret;
  return secret;
}

/**
 * Derive the PRIMARY encryption key using the static salt.
 * This is the canonical key derivation that all new encryptions use.
 * Returns null if no encryption key is configured.
 */
function getStaticKey(): Buffer | null {
  if (_staticKey !== null) return _staticKey;

  const secret = ensureSecretLoaded();
  if (!secret || typeof secret !== "string" || secret.trim().length === 0) return null;

  try {
    _staticKey = scryptSync(secret, STATIC_SALT, KEY_LENGTH);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(
      `[Encryption] Failed to derive key from STORAGE_ENCRYPTION_KEY: ${message}. ` +
        `Generate a valid key with: openssl rand -base64 32`
    );
    return null;
  }
  return _staticKey;
}

/**
 * Derive the LEGACY key using the old dynamic salt method.
 * Used exclusively for fallback decryption of tokens encrypted by older versions.
 *
 * The old dynamic salt was: createHash("sha256").update(secret).digest().slice(0, 16)
 * This produced a different derived key than the static salt, causing incompatibility.
 */
function getLegacyDynamicKey(): Buffer | null {
  if (_legacyDynamicKey !== null) return _legacyDynamicKey;

  const secret = ensureSecretLoaded();
  if (!secret || typeof secret !== "string" || secret.trim().length === 0) return null;

  const dynamicSalt = createHash("sha256").update(secret).digest().slice(0, 16);
  try {
    _legacyDynamicKey = scryptSync(secret, dynamicSalt, KEY_LENGTH);
  } catch {
    return null;
  }
  return _legacyDynamicKey;
}

/**
 * Static-salt key derived from the value the .env reader used before the
 * first-"=" fix, when that value differs from the current one. Only set when
 * the active key came from the .env fallback in this process, in any module
 * instance. AES-GCM rejects a wrong key through the auth tag, so trying it
 * after the primary key cannot return wrong plaintext.
 */
function getStaticKeyBeforeFirstEqualsFix(): Buffer | null {
  if (_staticKeyBeforeFirstEqualsFix !== null) return _staticKeyBeforeFirstEqualsFix;
  ensureSecretLoaded();
  const secret = secretBeforeFirstEqualsFix();
  if (!secret || secret.trim().length === 0) return null;
  try {
    _staticKeyBeforeFirstEqualsFix = scryptSync(secret, STATIC_SALT, KEY_LENGTH);
  } catch {
    return null;
  }
  return _staticKeyBeforeFirstEqualsFix;
}

/**
 * Dynamic-salt key (before v3.7.9) derived from the same old reading. Data
 * written before v3.7.9 under that reading needs it. Only the startup migration
 * tries it, as it does for the legacy key of the active secret.
 */
function getLegacyDynamicKeyBeforeFirstEqualsFix(): Buffer | null {
  if (_legacyDynamicKeyBeforeFirstEqualsFix !== null) return _legacyDynamicKeyBeforeFirstEqualsFix;
  ensureSecretLoaded();
  const secret = secretBeforeFirstEqualsFix();
  if (!secret || secret.trim().length === 0) return null;
  const dynamicSalt = createHash("sha256").update(secret).digest().slice(0, 16);
  try {
    _legacyDynamicKeyBeforeFirstEqualsFix = scryptSync(secret, dynamicSalt, KEY_LENGTH);
  } catch {
    return null;
  }
  return _legacyDynamicKeyBeforeFirstEqualsFix;
}

/** Check if encryption is enabled. */
export function isEncryptionEnabled(): boolean {
  return !!ensureSecretLoaded();
}

/**
 * Loud production warning when STORAGE_ENCRYPTION_KEY is unset.
 *
 * Dev/test keep the plaintext passthrough. In production the same empty-key
 * contract applies (`.env.example`: "Leave empty to disable DB encryption";
 * `docs/reference/ENVIRONMENT.md`: "empty = disabled"). Exiting here would
 * crash-loop Docker, which sets NODE_ENV=production and starts from that
 * example env. The box is logged once at boot and the process keeps serving.
 *
 * Call once from `src/instrumentation-node.ts`, not from encrypt()/decrypt().
 * `encryptionEnabled` is injectable so a test can reach this branch without
 * reading the operator's `.env`.
 */
export function assertEncryptionKeyConfiguredForProduction(
  env: NodeJS.ProcessEnv = process.env,
  logger: Pick<Console, "error"> = console,
  encryptionEnabled: () => boolean = isEncryptionEnabled
): void {
  if (isTestContext()) return;
  if (env.NODE_ENV !== "production") return;
  if (encryptionEnabled()) return;

  logger.error("");
  logger.error("═══════════════════════════════════════════════════");
  logger.error("  ⚠  STARTUP: STORAGE_ENCRYPTION_KEY is not set");
  logger.error("═══════════════════════════════════════════════════");
  logger.error("  • Credential encryption is disabled. Provider credentials (API keys,");
  logger.error("    OAuth tokens) will be stored in plaintext. An empty key is the");
  logger.error("    documented default, so startup continues.");
  logger.error("    → Generate a key with: openssl rand -base64 32");
  logger.error("    → Set STORAGE_ENCRYPTION_KEY and restart to encrypt credentials at rest.");
  logger.error("═══════════════════════════════════════════════════");
  logger.error("");
}

/**
 * True when `value` is a stored ciphertext (carries the `enc:v1:` prefix).
 * Lets callers tell "credential present but undecryptable" (stale/changed
 * STORAGE_ENCRYPTION_KEY) apart from "credential genuinely empty" — decrypt()
 * collapses both to null otherwise. See #6148.
 */
export function looksEncrypted(value: unknown): boolean {
  return typeof value === "string" && value.startsWith(PREFIX);
}

/**
 * Encrypt a plaintext string using the STATIC salt key.
 * If encryption is not configured, returns plaintext unchanged.
 */
export function encrypt(plaintext: string | null | undefined): string | null | undefined {
  if (!plaintext || typeof plaintext !== "string") return plaintext;

  const key = getStaticKey();
  if (!key) {
    console.warn(
      "[Encryption] STORAGE_ENCRYPTION_KEY not set. Storing plaintext (passthrough mode)."
    );
    return plaintext; // passthrough mode
  }

  // Already encrypted — don't double-encrypt
  if (plaintext.startsWith(PREFIX)) return plaintext;

  try {
    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(plaintext, "utf8", "hex");
    encrypted += cipher.final("hex");
    const authTag = cipher.getAuthTag().toString("hex");

    return `${PREFIX}${iv.toString("hex")}:${encrypted}:${authTag}`;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(
      `[Encryption] Encryption failed: ${message}. ` +
        `Check your STORAGE_ENCRYPTION_KEY — generate one with: openssl rand -base64 32`
    );
    return plaintext; // fallback to plaintext rather than crashing
  }
}

/**
 * Decrypt a ciphertext string. Attempts static-salt key first (primary),
 * then falls back to legacy dynamic-salt key for backward compatibility.
 *
 * When a token is decrypted using the legacy key, it is flagged for
 * auto-migration: the next encrypt() call will re-encrypt it with the
 * static-salt key, gradually migrating the database.
 */
export function decrypt(
  ciphertext: string | null | undefined,
  opts?: { quiet?: boolean }
): string | null | undefined {
  if (!ciphertext || typeof ciphertext !== "string") return ciphertext;

  // Not encrypted — return as-is (legacy plaintext or passthrough mode)
  if (!ciphertext.startsWith(PREFIX)) return ciphertext;

  const staticKey = getStaticKey();
  if (!staticKey) {
    console.warn(
      "[Encryption] Found encrypted data but STORAGE_ENCRYPTION_KEY is not set. Cannot decrypt."
    );
    return null;
  }

  const body = ciphertext.slice(PREFIX.length);
  const parts = body.split(":");
  if (parts.length !== 3) {
    console.error("[Encryption] Malformed encrypted value");
    return null;
  }

  const [ivHex, encryptedHex, authTagHex] = parts;

  const tryDecryptWithKey = (candidateKey: Buffer): string | null => {
    try {
      const iv = Buffer.from(ivHex, "hex");
      const authTag = Buffer.from(authTagHex, "hex");
      const decipher = createDecipheriv(ALGORITHM, candidateKey, iv, {
        authTagLength: AUTH_TAG_LENGTH,
      });
      decipher.setAuthTag(authTag);

      let decrypted = decipher.update(encryptedHex, "hex", "utf8");
      decrypted += decipher.final("utf8");
      return decrypted;
    } catch {
      return null;
    }
  };

  try {
    // PRIMARY: Try static-salt key first (canonical derivation)
    const decrypted = tryDecryptWithKey(staticKey);
    if (decrypted !== null) {
      return decrypted;
    }

    // Written under the value the .env reader took before the first-"=" fix.
    const keyBeforeFix = getStaticKeyBeforeFirstEqualsFix();
    if (keyBeforeFix) {
      const decryptedBeforeFix = tryDecryptWithKey(keyBeforeFix);
      if (decryptedBeforeFix !== null) return decryptedBeforeFix;
    }

    // #9927 — the low-level generic log is suppressed when called through the
    // connection-decryption path (quiet:true); decryptConnectionFields emits a
    // single enriched message naming the credential + recovery path instead.
    if (!opts?.quiet) {
      console.error(
        `[Encryption] Decryption failed. Ciphertext prefix: ${ciphertext.slice(0, 30)}... ` +
          `Auth tag validation likely failed.`
      );
    }
    return null;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (!opts?.quiet) {
      console.error("[Encryption] Decryption failed:", message);
    }
    return null;
  }
}

/**
 * #11500 — decrypt() wrapper for callers outside decryptConnectionFields()
 * (the lazy-decrypt views in providers/lazyConnectionView.ts, which call
 * decrypt() directly on every fresh getProviderConnections() cycle). A
 * fresh Proxy wraps a fresh row object each cycle, so per-proxy memoization
 * never survives across cycles — without this wrapper the raw
 * "[Encryption] Decryption failed..." line re-fires every single cycle for
 * the same corrupt/stale-key credential. Shares the loggedDecryptFailures
 * Set with decryptConnectionFields() so a credential already flagged via one
 * path does not re-log via the other, and logs the SAME raw message
 * decrypt() would emit (unlike decryptConnectionFields()'s enriched
 * message) — just deduped to once per (provider + connection + field +
 * ciphertext) instead of once per cycle.
 */
export function decryptQuiet(
  ciphertext: string | null | undefined,
  meta: { connectionId: string; provider: string; field: string }
): string | null | undefined {
  if (!looksEncrypted(ciphertext)) {
    return decrypt(ciphertext);
  }
  const signature = `${meta.provider}::${meta.connectionId}::${meta.field}:${ciphertext}`;
  const alreadyLogged = loggedDecryptFailures.has(signature);
  const result = decrypt(ciphertext, { quiet: alreadyLogged });
  if (result === null && !alreadyLogged) {
    loggedDecryptFailures.add(signature);
  }
  return result;
}

/**
 * Encrypt sensitive fields in a connection object (mutates in-place).
 * After decryption that required legacy key, re-encrypt with static key
 * to migrate tokens automatically.
 */
export function encryptConnectionFields<T extends ConnectionFields | null | undefined>(conn: T): T {
  if (!isEncryptionEnabled()) return conn;
  if (!conn) return conn;

  if (conn.apiKey) conn.apiKey = encrypt(conn.apiKey);
  if (conn.accessToken) conn.accessToken = encrypt(conn.accessToken);
  if (conn.refreshToken) conn.refreshToken = encrypt(conn.refreshToken);
  if (conn.idToken) conn.idToken = encrypt(conn.idToken);
  if (conn.providerSpecificData) {
    conn.providerSpecificData = mapProviderSpecificDataSecrets(conn.providerSpecificData, (value) =>
      encrypt(value)
    );
  }
  return conn;
}

/**
 * Decrypt sensitive fields in a connection row (returns new object).
 * Note: If any field was decrypted using the legacy key, the migration
 * flag is set. The calling code should check isMigrationNeeded() and
 * trigger a re-encrypt (write-back) to migrate those tokens to the static key.
 */
export function decryptConnectionFields<T extends ConnectionFields | null | undefined>(row: T): T {
  if (!row) return row;
  if (!isEncryptionEnabled()) return row;

  // quiet:true — the low-level generic decrypt() log is suppressed here so a
  // single failure emits ONE enriched message (below) naming the credential
  // and recovery path (#9927) instead of one generic line per field per cycle.
  const apiKey = decrypt(row.apiKey, { quiet: true });
  const accessToken = decrypt(row.accessToken, { quiet: true });
  const refreshToken = decrypt(row.refreshToken, { quiet: true });
  const idToken = decrypt(row.idToken, { quiet: true });
  const failedNested: Array<{ field: string; value: unknown }> = [];
  const providerSpecificData = mapProviderSpecificDataSecrets(
    row.providerSpecificData,
    (value, field) => {
      const plaintext = decrypt(value, { quiet: true });
      if (looksEncrypted(value) && plaintext === null) {
        failedNested.push({ field: `providerSpecificData.${field}`, value });
      }
      return plaintext;
    }
  );

  // #6148 — a stored credential that is still encrypted (`enc:v1:…`) but
  // decrypts to null means the STORAGE_ENCRYPTION_KEY changed or was unset.
  // Flag it so callers surface a clear error instead of coercing the null to
  // "" and firing an empty-Bearer request that upstream rejects as 401.
  const credentialDecryptFailed =
    (looksEncrypted(row.apiKey) && apiKey === null) ||
    (looksEncrypted(row.accessToken) && accessToken === null) ||
    (looksEncrypted(row.refreshToken) && refreshToken === null) ||
    (looksEncrypted(row.idToken) && idToken === null) ||
    failedNested.length > 0;

  if (credentialDecryptFailed) {
    const failed: Array<{ field: string; value: unknown }> = [];
    if (looksEncrypted(row.apiKey) && apiKey === null)
      failed.push({ field: "apiKey", value: row.apiKey });
    if (looksEncrypted(row.accessToken) && accessToken === null)
      failed.push({ field: "accessToken", value: row.accessToken });
    if (looksEncrypted(row.refreshToken) && refreshToken === null)
      failed.push({ field: "refreshToken", value: row.refreshToken });
    if (looksEncrypted(row.idToken) && idToken === null)
      failed.push({ field: "idToken", value: row.idToken });
    failed.push(...failedNested);

    const connectionId = typeof row.id === "string" ? row.id : "";
    const provider = typeof row.provider === "string" ? row.provider : "unknown";
    const fields = failed.map((f) => f.field).join(", ");

    // Dedupe per credential/row state: the sweep re-decrypts the same corrupt
    // row every cycle — log ONCE unless the failing state actually changes.
    const signature = decryptFailureSignature(connectionId, provider, failed);
    if (!loggedDecryptFailures.has(signature)) {
      loggedDecryptFailures.add(signature);
      console.error(
        `[Encryption] Failed to decrypt credential(s) [${fields}] for provider ` +
          `"${provider}" (connection ${connectionId || "unknown"}). ${RECOVERY_HINT}`
      );
    }
  }

  return {
    ...row,
    apiKey,
    accessToken,
    refreshToken,
    idToken,
    ...(row.providerSpecificData !== undefined ? { providerSpecificData } : {}),
    ...(credentialDecryptFailed ? { credentialDecryptFailed: true } : {}),
  };
}

/**
 * Specifically tests a ciphertext against the legacy key. If it succeeds, it
 * re-encrypts the decrypted value with the canonical static key.
 * Used exclusively by the startup migration script.
 */
export function migrateLegacyEncryptedString(ciphertext: string | null | undefined): {
  updated: boolean;
  value: string | null | undefined;
} {
  if (!isEncryptionEnabled()) return { updated: false, value: ciphertext };
  if (!ciphertext || ciphertext.trim().length === 0) return { updated: false, value: ciphertext };
  if (!ciphertext.startsWith(PREFIX)) return { updated: false, value: ciphertext };

  const staticKey = getStaticKey();
  const legacyKey = getLegacyDynamicKey();

  if (!staticKey) return { updated: false, value: null };

  const rawPayload = ciphertext.slice(PREFIX.length);
  const parts = rawPayload.split(":");
  if (parts.length !== 3) return { updated: false, value: ciphertext };

  const [ivHex, encryptedHex, authTagHex] = parts;
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const tryDecryptWithKey = (key: Buffer): string | null => {
    try {
      const decipher = createDecipheriv(ALGORITHM, key, iv, {
        authTagLength: AUTH_TAG_LENGTH,
      });
      decipher.setAuthTag(authTag);
      let decrypted = decipher.update(encrypted, undefined, "utf8");
      decrypted += decipher.final("utf8");
      return decrypted;
    } catch {
      return null;
    }
  };

  // 1. If it already decrypts with the static key, no migration needed.
  if (tryDecryptWithKey(staticKey) !== null) {
    return { updated: false, value: ciphertext };
  }

  // 2. If it decrypts with the legacy key, or with a key (static or legacy salt)
  // from the value the .env reader took before the first-"=" fix, it needs
  // migration!
  const oldKeys = [
    legacyKey,
    getStaticKeyBeforeFirstEqualsFix(),
    getLegacyDynamicKeyBeforeFirstEqualsFix(),
  ];
  for (const oldKey of oldKeys) {
    if (!oldKey) continue;
    const legacyDecrypted = tryDecryptWithKey(oldKey);
    if (legacyDecrypted !== null) {
      // Re-encrypt using the canonical static key and return updated
      return { updated: true, value: encrypt(legacyDecrypted) };
    }
  }

  // 3. Un-decryptable or corrupted, leave it alone
  return { updated: false, value: ciphertext };
}
