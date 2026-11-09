import { NextResponse } from "next/server";
import { z } from "zod";
import {
  normalizeCodexImportRecord,
  flattenCodexImportPayload,
  preserveExistingCodexConnectionState,
  decodeJwtExp,
  type CodexImportPayload,
} from "@/lib/oauth/services/codexImport";
import {
  createProviderConnection,
  getProviderConnections,
  updateProviderConnection,
} from "@/models";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import {
  refreshCodexToken,
  isUnrecoverableRefreshError,
} from "@omniroute/open-sse/services/tokenRefresh.ts";

/**
 * Message returned when the imported record's refresh_token is already dead
 * (rotated/consumed/expired) — see #7522. Persisting a connection whose
 * refresh_token can never succeed leaves an `active` connection that fails
 * confusingly on first real use, long after the import looked successful.
 */
const EXPIRED_SESSION_MESSAGE =
  "This Codex session has expired — run `codex login` again and re-import. " +
  "(Esta sessão do Codex expirou — rode `codex login` novamente e reimporte.)";

type RefreshValidation = "valid" | "invalid" | "inconclusive";
const MIN_USABLE_ACCESS_TOKEN_LIFETIME_SECONDS = 60;

/**
 * Validate a normalized Codex import record's refresh_token against OpenAI's
 * OAuth token endpoint before it is persisted as a connection. Reuses
 * `refreshCodexToken()` (the same rotating-refresh-token exchange used by the
 * runtime token-refresh path) instead of re-implementing the POST — the
 * exchange call itself is free (no model/quota usage).
 *
 * Returns `"valid"` when the exchange succeeded (rotated tokens are already
 * applied to `payload`), `"invalid"` when the refresh_token is confirmed dead,
 * and `"inconclusive"` when the check could not decide, e.g. a transient
 * network error. The caller decides what each outcome means for the record.
 */
async function validateCodexRefreshToken(payload: {
  accessToken: string;
  refreshToken: string;
}): Promise<RefreshValidation> {
  let refreshResult: unknown;
  try {
    refreshResult = await refreshCodexToken(payload.refreshToken, undefined, null);
  } catch {
    // Network/transport failure: inconclusive, do not block the import.
    return "inconclusive";
  }

  if (isUnrecoverableRefreshError(refreshResult)) {
    return "invalid";
  }

  if (
    refreshResult &&
    typeof refreshResult === "object" &&
    typeof (refreshResult as { accessToken?: unknown }).accessToken === "string"
  ) {
    const refreshed = refreshResult as { accessToken: string; refreshToken?: string };
    payload.accessToken = refreshed.accessToken;
    if (typeof refreshed.refreshToken === "string" && refreshed.refreshToken) {
      payload.refreshToken = refreshed.refreshToken;
    }
    return "valid";
  }

  // `refreshResult === null` (transient error already logged inside
  // refreshCodexToken) is inconclusive — fall through and import the
  // originally-supplied tokens rather than blocking on a network hiccup.
  return "inconclusive";
}

function hasUsableAccessToken(payload: CodexImportPayload): boolean {
  const expiresAt = decodeJwtExp(payload.accessToken);
  return (
    expiresAt !== null && expiresAt > Date.now() / 1000 + MIN_USABLE_ACCESS_TOKEN_LIFETIME_SECONDS
  );
}

type ExistingCodexConnection = {
  id?: unknown;
  email?: unknown;
  refreshToken?: unknown;
  expiresAt?: unknown;
  tokenExpiresAt?: unknown;
  providerSpecificData?: unknown;
};

function codexAccountId(providerSpecificData: unknown): string | null {
  if (!providerSpecificData || typeof providerSpecificData !== "object") return null;
  const data = providerSpecificData as Record<string, unknown>;
  const value = data.chatgptAccountId ?? data.workspaceId;
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

// A temporary refresh-validation failure is not proof that an imported token
// is stale. Only prefer the new credentials when the stored token has expired
// and the imported record has a later, currently usable expiry.
function hasNewerCredentialsForExpiredConnection(
  existing: ExistingCodexConnection,
  payload: CodexImportPayload
): boolean {
  const expirations = [existing.expiresAt, existing.tokenExpiresAt]
    .filter((value): value is string => typeof value === "string")
    .map((value) => Date.parse(value))
    .filter(Number.isFinite);
  const importedExpiry = Date.parse(payload.expiresAt);
  return (
    expirations.length > 0 &&
    Math.max(...expirations) <= Date.now() &&
    Number.isFinite(importedExpiry) &&
    importedExpiry > Date.now()
  );
}

function preserveStoredCodexCredentials(
  existing: ExistingCodexConnection | null,
  payload: CodexImportPayload,
  sameRefreshToken: boolean,
  validation: RefreshValidation
): boolean {
  if (!existing || sameRefreshToken || validation === "valid") return false;
  if (validation === "invalid") return true;
  return !hasNewerCredentialsForExpiredConnection(existing, payload);
}

function findExistingCodexConnection(
  payload: CodexImportPayload,
  connections: ExistingCodexConnection[]
): ExistingCodexConnection | null {
  const accountId = codexAccountId(payload.providerSpecificData);
  if (!accountId) return null;
  const incomingUserId =
    payload.providerSpecificData && typeof payload.providerSpecificData.chatgptUserId === "string"
      ? payload.providerSpecificData.chatgptUserId.trim()
      : "";
  return (
    connections.find((connection) => {
      if (codexAccountId(connection.providerSpecificData) !== accountId) return false;
      const data =
        connection.providerSpecificData &&
        typeof connection.providerSpecificData === "object" &&
        !Array.isArray(connection.providerSpecificData)
          ? (connection.providerSpecificData as Record<string, unknown>)
          : {};
      const existingUserId =
        typeof data.chatgptUserId === "string" ? data.chatgptUserId.trim() : "";
      // Workspace IDs are shared across members. Never update another member's
      // credentials or email based solely on the common workspace.
      if (incomingUserId && existingUserId) return incomingUserId === existingUserId;
      return connection.email === payload.email;
    }) ?? null
  );
}

async function updateExistingCodexImportMetadata(
  existing: ExistingCodexConnection,
  payload: CodexImportPayload
) {
  const id = typeof existing.id === "string" ? existing.id : "";
  if (!id) throw new Error("Existing Codex connection has no id");
  const oldProviderSpecificData =
    existing.providerSpecificData && typeof existing.providerSpecificData === "object"
      ? (existing.providerSpecificData as Record<string, unknown>)
      : {};
  const newProviderSpecificData =
    payload.providerSpecificData && typeof payload.providerSpecificData === "object"
      ? payload.providerSpecificData
      : {};
  const update: Record<string, unknown> = {
    email: payload.email,
    providerSpecificData: { ...oldProviderSpecificData, ...newProviderSpecificData },
  };
  // Priority is operator-managed; metadata-only imports must not reorder it.
  const connection = await updateProviderConnection(id, update);
  if (!connection) throw new Error("Existing Codex connection disappeared during import");
  return connection;
}

/**
 * POST /api/oauth/codex/import
 *
 * Bulk-import Codex (OpenAI) accounts from JSON payloads produced by the Codex
 * CLI or common token-export tools. Each item may be a flat export
 * (`access_token`, `refresh_token`, …) or the CLI's nested `auth.json` shape.
 *
 * Body: `{ accounts: object | object[] }`
 *
 * Returns a per-record summary so partial successes are surfaced to the UI.
 *
 * Ported from decolua/9router#1257 (beaaan).
 */

const bodySchema = z.object({
  accounts: z.union([z.record(z.string(), z.unknown()), z.array(z.unknown())], {
    errorMap: () => ({ message: "accounts must be an object or an array of objects" }),
  }),
});

async function requireAuth(request: Request): Promise<Response | null> {
  // GHSA-mg76: importing a provider connection is a state-mutating admin action;
  // require management scope (or a dashboard session), not any valid client key.
  return requireManagementAuth(request, { invalidApiKeyStatus: 401 });
}

type CodexImportRecordResult =
  | { index: number; ok: true; connectionId: string; email: string; unchanged?: true }
  | { index: number; ok: false; error: string };

async function importOneCodexRecord(
  record: unknown,
  index: number
): Promise<CodexImportRecordResult> {
  const norm = normalizeCodexImportRecord(record);
  if (!norm.ok) return { index, ok: false, error: norm.error };

  try {
    // Fetched per record: an earlier record in this batch may have just created
    // the row a later duplicate must match.
    const connections = (await getProviderConnections({
      provider: "codex",
      authType: "oauth",
    })) as Array<ExistingCodexConnection & Record<string, unknown>>;
    const existing = findExistingCodexConnection(norm.payload, connections);
    const sameRefreshToken =
      existing !== null &&
      typeof existing.refreshToken === "string" &&
      existing.refreshToken === norm.payload.refreshToken;
    const validation = sameRefreshToken ? "valid" : await validateCodexRefreshToken(norm.payload);

    if (validation === "invalid" && !existing && !hasUsableAccessToken(norm.payload)) {
      return { index, ok: false, error: EXPIRED_SESSION_MESSAGE };
    }

    // A rotated server token must not be overwritten by a stale exported token.
    const preserveExistingCredentials = preserveStoredCodexCredentials(
      existing,
      norm.payload,
      sameRefreshToken,
      validation
    );
    let conn;
    if (preserveExistingCredentials) {
      conn = await updateExistingCodexImportMetadata(existing, norm.payload);
    } else {
      // Keep operator-managed state (priority and providerSpecificData) when
      // the upsert matches an existing connection.
      const payload = preserveExistingCodexConnectionState(norm.payload, connections);
      conn = await createProviderConnection(payload as Record<string, unknown>);
    }
    return {
      index,
      ok: true,
      connectionId: String(conn.id),
      email: String(conn.email ?? norm.payload.email),
      ...(preserveExistingCredentials ? { unchanged: true as const } : {}),
    };
  } catch (error) {
    return {
      index,
      ok: false,
      error: sanitizeErrorMessage(error instanceof Error ? error.message : String(error)),
    };
  }
}

export async function POST(request: Request) {
  const authResponse = await requireAuth(request);
  if (authResponse) return authResponse;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid or empty JSON body" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Invalid request body" },
      { status: 400 }
    );
  }

  const flat = flattenCodexImportPayload(parsed.data.accounts);
  if (!flat.ok) {
    return NextResponse.json({ error: flat.error }, { status: 400 });
  }
  if (flat.records.length === 0) {
    return NextResponse.json({ error: "No accounts found in payload" }, { status: 400 });
  }

  const results: CodexImportRecordResult[] = [];
  let imported = 0;
  let failed = 0;

  for (let i = 0; i < flat.records.length; i++) {
    const result = await importOneCodexRecord(flat.records[i], i);
    results.push(result);
    if (result.ok) imported += 1;
    else failed += 1;
  }

  return NextResponse.json({
    success: failed === 0,
    imported,
    failed,
    total: flat.records.length,
    results,
  });
}
