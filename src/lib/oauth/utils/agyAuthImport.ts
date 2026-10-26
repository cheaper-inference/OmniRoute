import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";
import os from "os";

import {
  getProviderConnections,
  createProviderConnection,
  updateProviderConnection,
} from "@/lib/localDb";

const execFileAsync = promisify(execFile);
import { AGY_CONFIG } from "@/lib/oauth/constants/oauth";
import {
  getAntigravityContentHeaders,
  getAntigravityLoadCodeAssistMetadata,
} from "@omniroute/open-sse/services/antigravityHeaders.ts";
import { extractCodeAssistOnboardTierId } from "@omniroute/open-sse/services/codeAssistSubscription.ts";

type JsonRecord = Record<string, unknown>;

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

/**
 * Error carrying an HTTP status + machine code so the
 * agy-auth routes can translate it to a clean response (never a raw stack trace).
 */
export class AgyAuthFileError extends Error {
  status: number;
  code: string;

  constructor(message: string, status = 400, code = "invalid_request") {
    super(message);
    this.name = "AgyAuthFileError";
    this.status = status;
    this.code = code;
  }
}

// ──── Public types ────────────────────────────────────────────────────────────

export interface ParsedAgyAuth {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresAt: string | null;
  authMethod: string | null;
}

export interface EnrichedAgyAuth extends ParsedAgyAuth {
  email: string | null;
  projectId: string | null;
  tier: string | null;
}

export interface CreateAgyConnectionOptions {
  name?: string;
  email?: string;
  overwriteExisting?: boolean;
}

// ──── Parse & validate ────────────────────────────────────────────────────────

/**
 * Parse the Antigravity CLI (`agy`) token file. It nests the token under `.token`,
 * uses an ISO `expiry` string, and has NO `id_token`. A flat top-level shape is
 * accepted as a fallback.
 */
export function parseAndValidateAgyToken(raw: unknown): ParsedAgyAuth {
  const doc = toRecord(raw);
  // agy nests credentials under `.token`; fall back to the top level for flat exports.
  const token = doc.token && typeof doc.token === "object" ? toRecord(doc.token) : doc;

  const accessToken = toNonEmptyString(token.access_token);
  const refreshToken = toNonEmptyString(token.refresh_token);

  if (!accessToken) {
    throw new AgyAuthFileError(
      "access_token is missing or empty in the agy token file",
      400,
      "missing_access_token"
    );
  }

  if (!refreshToken) {
    throw new AgyAuthFileError(
      "refresh_token is missing or empty in the agy token file",
      400,
      "missing_refresh_token"
    );
  }

  // agy uses an ISO `expiry`; also accept a unix-ms `expiry_date`/`expires_at` for safety.
  let expiresAt: string | null = null;
  const isoExpiry = toNonEmptyString(token.expiry) ?? toNonEmptyString(token.expires_at);
  if (isoExpiry) {
    const ms = new Date(isoExpiry).getTime();
    expiresAt = Number.isNaN(ms) ? null : new Date(ms).toISOString();
  } else if (typeof token.expiry_date === "number" && Number.isFinite(token.expiry_date)) {
    expiresAt = new Date(token.expiry_date).toISOString();
  }

  const tokenType = toNonEmptyString(token.token_type) ?? "Bearer";
  const authMethod = toNonEmptyString(doc.auth_method) ?? toNonEmptyString(token.auth_method);

  return { accessToken, refreshToken, tokenType, expiresAt, authMethod };
}

// ──── Enrich with the Antigravity Code Assist backend ─────────────────────────

/**
 * Resolve the account email (userinfo) and GCP project id (loadCodeAssist) for the token.
 * Best-effort + time-boxed; the agy CLI has already onboarded the project, so we do NOT
 * run the onboardUser provisioning loop here (that can take up to ~50s).
 */
export async function enrichWithAntigravityBackend(
  parsed: ParsedAgyAuth
): Promise<EnrichedAgyAuth> {
  let email: string | null = null;
  let projectId: string | null = null;
  let tier: string | null = null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const userInfoRes = await fetch(`${AGY_CONFIG.userInfoUrl}?alt=json`, {
      headers: { Authorization: `Bearer ${parsed.accessToken}` },
      signal: controller.signal,
    });
    if (userInfoRes.ok) {
      email = toNonEmptyString(toRecord(await userInfoRes.json()).email);
    }
  } catch {
    // best effort — email stays null
  } finally {
    clearTimeout(timer);
  }

  const loadController = new AbortController();
  const loadTimer = setTimeout(() => loadController.abort(), 8000);
  try {
    const headers = getAntigravityContentHeaders("cli", parsed.accessToken);
    const metadata = getAntigravityLoadCodeAssistMetadata();
    for (const endpoint of AGY_CONFIG.loadCodeAssistEndpoints) {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers,
          body: JSON.stringify({ metadata }),
          signal: loadController.signal,
        });
        if (!res.ok) continue;
        const data = toRecord(await res.json());
        const project = data.cloudaicompanionProject;
        projectId =
          (typeof project === "string" ? toNonEmptyString(project) : null) ??
          toNonEmptyString(toRecord(project).id);
        tier = extractCodeAssistOnboardTierId(data) || null;
        break;
      } catch {
        // try next endpoint
      }
    }
  } catch {
    // best effort — projectId stays null
  } finally {
    clearTimeout(loadTimer);
  }

  return { ...parsed, email, projectId, tier };
}

// ──── Find existing connection ────────────────────────────────────────────────

export async function findExistingAgyConnection(email: string): Promise<JsonRecord | null> {
  const connections = await getProviderConnections({ provider: "agy" });
  const lowerEmail = email.toLowerCase();
  return (
    (connections.find((c) => {
      const conn = c as JsonRecord;
      return toNonEmptyString(conn.email)?.toLowerCase() === lowerEmail;
    }) as JsonRecord | undefined) ?? null
  );
}

// ──── Create / update connection ──────────────────────────────────────────────

export async function createConnectionFromAgyToken(
  enriched: EnrichedAgyAuth,
  options: CreateAgyConnectionOptions
): Promise<{ connection: JsonRecord; created: boolean }> {
  const resolvedEmail = options.email || enriched.email;

  if (resolvedEmail) {
    const existing = await findExistingAgyConnection(resolvedEmail);
    if (existing) {
      if (!options.overwriteExisting) {
        throw new AgyAuthFileError(
          "An Antigravity CLI connection for this account already exists. Pass overwriteExisting: true to replace it.",
          409,
          "duplicate_account"
        );
      }

      const updated = await updateProviderConnection(existing.id as string, {
        accessToken: enriched.accessToken,
        refreshToken: enriched.refreshToken,
        expiresAt: enriched.expiresAt,
        email: resolvedEmail || (existing.email as string | undefined),
        name:
          options.name ||
          (existing.name as string | undefined) ||
          resolvedEmail ||
          "Antigravity CLI (imported)",
        testStatus: "active",
        isActive: true,
        providerSpecificData: {
          ...toRecord(existing.providerSpecificData),
          clientProfile: "cli",
          tokenType: enriched.tokenType,
          authMethod: enriched.authMethod,
          projectId: enriched.projectId ?? toRecord(existing.providerSpecificData).projectId,
          tier: enriched.tier ?? toRecord(existing.providerSpecificData).tier,
          importedAt: new Date().toISOString(),
        },
      });

      return { connection: updated || existing, created: false };
    }
  } else if (!options.overwriteExisting) {
    throw new AgyAuthFileError(
      "Could not verify the account email from the agy token (no userinfo). Pass overwriteExisting: true to import without email verification.",
      409,
      "identity_unverified"
    );
  }

  const name = options.name || resolvedEmail || "Antigravity CLI (imported)";

  const connection = await createProviderConnection({
    provider: "agy",
    authType: "oauth",
    name,
    email: resolvedEmail || undefined,
    accessToken: enriched.accessToken,
    refreshToken: enriched.refreshToken,
    expiresAt: enriched.expiresAt,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      clientProfile: "cli",
      tokenType: enriched.tokenType,
      authMethod: enriched.authMethod,
      projectId: enriched.projectId,
      tier: enriched.tier,
      importedAt: new Date().toISOString(),
    },
  });

  return { connection, created: true };
}


/**
 * Return candidate SQLite database paths for Antigravity IDE across platforms.
 *
 * - macOS: ~/Library/Application Support/Antigravity{ IDE}/User/globalStorage/state.vscdb
 * - Windows: %APPDATA%/Antigravity{ IDE}/User/globalStorage/state.vscdb
 * - Linux: ${XDG_CONFIG_HOME:-~/.config}/Antigravity{ IDE}/User/globalStorage/state.vscdb
 */
export function getAntigravityIdeDbCandidates(
  platform: NodeJS.Platform = process.platform,
  env: NodeJS.ProcessEnv = process.env,
  home: string = os.homedir()
): string[] {
  const candidates: string[] = [];
  const appNames = ["Antigravity", "Antigravity IDE"];

  if (platform === "darwin") {
    const joiner = path.posix ? path.posix.join : path.join;
    const base = joiner(home, "Library", "Application Support");
    for (const app of appNames) {
      candidates.push(joiner(base, app, "User", "globalStorage", "state.vscdb"));
    }
  } else if (platform === "win32") {
    const joiner = path.win32 ? path.win32.join : path.join;
    const appdata = env.APPDATA || joiner(home, "AppData", "Roaming");
    for (const app of appNames) {
      candidates.push(joiner(appdata, app, "User", "globalStorage", "state.vscdb"));
    }
  } else {
    const joiner = path.posix ? path.posix.join : path.join;
    const configHome = env.XDG_CONFIG_HOME || joiner(home, ".config");
    for (const app of appNames) {
      candidates.push(joiner(configHome, app, "User", "globalStorage", "state.vscdb"));
    }
  }
  return candidates;
}

/**
 * Read the antigravityAuthStatus entry from an Antigravity IDE SQLite DB.
 * Prefers the OmniRoute bundled SQLite driver (better-sqlite3 / node:sqlite),
 * falling back gracefully to the sqlite3 CLI tool if present.
 */
export async function readAntigravityAuthStatusFromDb(dbPath: string): Promise<string | null> {
  // 1. Prefer OmniRoute's driverFactory (better-sqlite3 / node:sqlite)
  try {
    const { tryOpenSync } = await import("@/lib/db/adapters/driverFactory");
    const db = tryOpenSync(dbPath, { readonly: true, fileMustExist: true, timeout: 2000 });
    if (db) {
      try {
        const row = db
          .prepare("SELECT value FROM ItemTable WHERE key = 'antigravityAuthStatus'")
          .get() as { value?: unknown } | undefined;
        if (typeof row?.value === "string" && row.value.trim()) {
          return row.value.trim();
        }
        if (row?.value && Buffer.isBuffer(row.value)) {
          const str = row.value.toString("utf8").trim();
          if (str) return str;
        }
      } finally {
        db.close();
      }
    }
  } catch {
    // Driver unavailable or busy, fall back to CLI if present
  }

  // 2. Fallback to sqlite3 CLI tool (gracefully ignored if not installed on $PATH)
  try {
    const { stdout } = await execFileAsync(
      "sqlite3",
      [dbPath, "SELECT value FROM ItemTable WHERE key = 'antigravityAuthStatus';"],
      { timeout: 3000 }
    );
    if (stdout && stdout.trim()) {
      return stdout.trim();
    }
  } catch {
    // sqlite3 CLI not installed (ENOENT) or query failed
  }

  return null;
}

/**
 * Detect locally stored Antigravity credentials from:
 * 1. Linux Secret Service keyring (secret-tool)
 * 2. AGY_TOKEN_FILE environment variable override
 * 3. Default CLI token files (~/.gemini/antigravity-cli/antigravity-oauth-token)
 * 4. Multi-profile token files (~/.config/agentcontrol/profiles/...)
 * 5. Antigravity IDE SQLite DB (~/.../Antigravity/User/globalStorage/state.vscdb)
 */
export async function detectLocalAgyTokenRaw(): Promise<{ raw: unknown; source: string }> {
  const home = os.homedir();

  // 1. Explicit env override
  if (process.env.AGY_TOKEN_FILE && process.env.AGY_TOKEN_FILE.trim()) {
    try {
      const content = await fs.readFile(process.env.AGY_TOKEN_FILE.trim(), "utf8");
      return { raw: JSON.parse(content), source: "env:AGY_TOKEN_FILE" };
    } catch {}
  }

  // 2. Linux Secret Service / Keyring (secret-tool)
  if (process.platform === "linux") {
    try {
      const { stdout } = await execFileAsync(
        "secret-tool",
        ["lookup", "service", "gemini", "username", "antigravity"],
        { timeout: 3000 }
      );
      if (stdout && stdout.trim()) {
        const parsed = JSON.parse(stdout.trim());
        if (parsed.token?.refresh_token || parsed.refresh_token) {
          return { raw: parsed, source: "secret-service" };
        }
      }
    } catch {}
  }

  // 3. Default and legacy CLI token file locations
  const fileCandidates = [
    path.join(home, ".gemini", "antigravity-cli", "antigravity-oauth-token"),
    path.join(home, ".gemini", "antigravity", "antigravity-oauth-token"),
  ];

  for (const candidate of fileCandidates) {
    try {
      const content = await fs.readFile(candidate, "utf8");
      return { raw: JSON.parse(content), source: candidate };
    } catch {}
  }

  // 4. AgentControl profile directories
  const agentControlProfiles = path.join(home, ".config", "agentcontrol", "profiles");
  try {
    const entries = await fs.readdir(agentControlProfiles, { withFileTypes: true });
    for (const ent of entries) {
      if (ent.isDirectory()) {
        const p = path.join(
          agentControlProfiles,
          ent.name,
          ".gemini",
          "antigravity-cli",
          "antigravity-oauth-token"
        );
        try {
          const content = await fs.readFile(p, "utf8");
          return { raw: JSON.parse(content), source: p };
        } catch {}
      }
    }
  } catch {}

  // 5. Antigravity IDE SQLite DB
  const ideDbs = getAntigravityIdeDbCandidates();
  for (const dbPath of ideDbs) {
    try {
      await fs.access(dbPath);
      const authValue = await readAntigravityAuthStatusFromDb(dbPath);

      if (authValue) {
        const parsed = JSON.parse(authValue);
        if (parsed.apiKey) {
          return {
            raw: {
              token: {
                access_token: parsed.apiKey,
                refresh_token: parsed.apiKey,
              },
              id_token_email: parsed.email,
            },
            source: dbPath,
          };
        }
      }
    } catch {}
  }

  throw new AgyAuthFileError(
    "No local Antigravity CLI or IDE login found. Run `agy`, sign in with Google, then try again.",
    404,
    "no_local_login"
  );
}
