import bcrypt from "bcryptjs";
import { getSettings, updateSettings } from "@/lib/db/settings";

const BCRYPT_HASH_PATTERN = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;
const MANAGEMENT_PASSWORD_SALT_ROUNDS = 12;

// Well-known placeholder shipped in `.env.example` (INITIAL_PASSWORD=CHANGEME). Bootstrapping
// with it leaves the dashboard open to anyone, so we warn loudly on boot (Seg2 hardening).
const INSECURE_DEFAULT_PASSWORDS = new Set(["CHANGEME"]);

type JsonRecord = Record<string, unknown>;

type MigrationSource = "stored_hash" | "stored_plaintext" | "env" | "missing";

interface EnsureManagementPasswordOptions {
  initialPassword?: string | null;
  logger?: Pick<Console, "log"> & Partial<Pick<Console, "warn">>;
  settings?: JsonRecord;
  source?: string;
}

export interface EnsuredManagementPassword {
  hash: string | null;
  migrated: boolean;
  settings: JsonRecord;
  source: MigrationSource;
}

function getInitialPasswordValue(value: string | null | undefined) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

export function getStoredManagementPassword(settings: JsonRecord | null | undefined) {
  return typeof settings?.password === "string" ? settings.password : "";
}

export function hasManagementPasswordConfigured(settings: JsonRecord | null | undefined) {
  return (
    getStoredManagementPassword(settings).length > 0 ||
    getInitialPasswordValue(process.env.INITIAL_PASSWORD) !== null
  );
}

export function isBcryptHash(value: unknown): value is string {
  return typeof value === "string" && BCRYPT_HASH_PATTERN.test(value);
}

// #13679 (PR D, item #5): the well-known INITIAL_PASSWORD placeholder shipped in
// .env.example / contrib/podman/omniroute.container / docker deploy manifests is a
// public, guessable credential. Callers on the authentication path use this to refuse
// a successful match from non-loopback requests instead of only warning on boot.
export function isKnownInsecureManagementPassword(password: string): boolean {
  return INSECURE_DEFAULT_PASSWORDS.has(password);
}

export async function hashManagementPassword(password: string) {
  return bcrypt.hash(password, MANAGEMENT_PASSWORD_SALT_ROUNDS);
}

// A management password never contains NUL. bcryptjs appends a NUL terminator to the key and
// reads it cyclically, so an input made of whole repetitions of the stored password and NUL
// verifies as the stored password itself. Refusing NUL keeps each password's set of accepted
// inputs to the password alone.
const NUL = "\u0000";

export async function verifyManagementPassword(password: string, hash: string) {
  if (!isBcryptHash(hash)) return false;
  if (typeof password !== "string" || password.includes(NUL)) return false;
  return bcrypt.compare(password, hash);
}

// One entry is enough: the stored hash changes whenever the password changes.
let knownInsecureHashCache: { hash: string; insecure: boolean } | null = null;

/**
 * True when the STORED management password is one of the known placeholders.
 *
 * The off-host refusal used to compare the submitted string with the placeholder list, but
 * bcrypt can accept inputs other than the placeholder itself, so a caller could pass the
 * password check without matching the list. Deciding on the stored hash closes that for any
 * input the hash accepts. The extra bcrypt comparison runs once per stored hash.
 */
export async function isStoredManagementPasswordKnownInsecure(hash: string): Promise<boolean> {
  if (!isBcryptHash(hash)) return false;
  if (knownInsecureHashCache?.hash === hash) return knownInsecureHashCache.insecure;
  let insecure = false;
  for (const placeholder of INSECURE_DEFAULT_PASSWORDS) {
    if (await bcrypt.compare(placeholder, hash)) {
      insecure = true;
      break;
    }
  }
  knownInsecureHashCache = { hash, insecure };
  return insecure;
}

export async function ensurePersistentManagementPasswordHash(
  options: EnsureManagementPasswordOptions = {}
): Promise<EnsuredManagementPassword> {
  const settings = options.settings ?? ((await getSettings()) as JsonRecord);
  const storedPassword = getStoredManagementPassword(settings);

  if (isBcryptHash(storedPassword)) {
    return {
      hash: storedPassword,
      migrated: false,
      settings,
      source: "stored_hash",
    };
  }

  const bootstrapPassword =
    storedPassword ||
    getInitialPasswordValue(options.initialPassword ?? process.env.INITIAL_PASSWORD);

  if (bootstrapPassword && INSECURE_DEFAULT_PASSWORDS.has(bootstrapPassword)) {
    const warn = options.logger?.warn?.bind(options.logger) ?? console.warn;
    warn(
      '[AUTH][SECURITY] Management password is set to the well-known default "CHANGEME" ' +
        "(INITIAL_PASSWORD in .env.example). Anyone can sign in to the dashboard with it — " +
        "change it immediately via the dashboard or a strong INITIAL_PASSWORD."
    );
  }

  if (!bootstrapPassword) {
    return {
      hash: null,
      migrated: false,
      settings,
      source: "missing",
    };
  }

  const passwordHash = await hashManagementPassword(bootstrapPassword);
  const updates: JsonRecord = { password: passwordHash };

  if (settings.setupComplete !== true) {
    updates.setupComplete = true;
  }
  if (!storedPassword) {
    updates.requireLogin = true;
  }

  const nextSettings = (await updateSettings(updates)) as JsonRecord;
  if (options.logger) {
    const context = options.source ? ` during ${options.source}` : "";
    const migrationSource = storedPassword ? "stored plaintext password" : "INITIAL_PASSWORD";
    options.logger.log(`[AUTH] Migrated ${migrationSource} to bcrypt hash${context}`);
  }

  return {
    hash: getStoredManagementPassword(nextSettings) || passwordHash,
    migrated: true,
    settings: nextSettings,
    source: storedPassword ? "stored_plaintext" : "env",
  };
}
