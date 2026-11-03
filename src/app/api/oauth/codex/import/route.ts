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
 * Returns `null` when the token is valid (or the check was inconclusive, e.g.
 * a transient network error) — the import proceeds normally in that case,
 * optionally with rotated tokens already applied to `payload`. Returns an
 * error string when the refresh_token is confirmed dead and the import
 * should be rejected.
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
  priority?: unknown;
  providerSpecificData?: unknown;
};

function codexAccountId(providerSpecificData: unknown): string | null {
  if (!providerSpecificData || typeof providerSpecificData !== "object") return null;
  const data = providerSpecificData as Record<string, unknown>;
  const value = data.chatgptAccountId ?? data.workspaceId;
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

async function findExistingCodexConnection(
  payload: CodexImportPayload
): Promise<ExistingCodexConnection | null> {
  const accountId = codexAccountId(payload.providerSpecificData);
  if (!accountId) return null;
  const connections = (await getProviderConnections({
    provider: "codex",
    authType: "oauth",
  })) as ExistingCodexConnection[];
  return (
    connections.find(
      (connection) => codexAccountId(connection.providerSpecificData) === accountId
    ) ?? null
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
  if (payload.priority !== undefined) update.priority = payload.priority;
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
  accounts: z.union([z.record(z.unknown()), z.array(z.unknown())], {
    errorMap: () => ({ message: "accounts must be an object or an array of objects" }),
  }),
});

async function requireAuth(request: Request): Promise<Response | null> {
  // GHSA-mg76: importing a provider connection is a state-mutating admin action;
  // require management scope (or a dashboard session), not any valid client key.
  return requireManagementAuth(request, { invalidApiKeyStatus: 401 });
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

  const results: Array<
    | { index: number; ok: true; connectionId: string; email: string; unchanged?: true }
    | { index: number; ok: false; error: string }
  > = [];
  let imported = 0;
  let failed = 0;

  for (let i = 0; i < flat.records.length; i++) {
    const norm = normalizeCodexImportRecord(flat.records[i]);
    if (!norm.ok) {
      failed += 1;
      results.push({ index: i, ok: false, error: norm.error });
      continue;
    }

    try {
      const existing = await findExistingCodexConnection(norm.payload);
      const sameRefreshToken =
        existing !== null &&
        typeof existing.refreshToken === "string" &&
        existing.refreshToken === norm.payload.refreshToken;
      const validation = sameRefreshToken ? "valid" : await validateCodexRefreshToken(norm.payload);

      if (validation === "invalid" && !existing && !hasUsableAccessToken(norm.payload)) {
        failed += 1;
        results.push({ index: i, ok: false, error: EXPIRED_SESSION_MESSAGE });
        continue;
      }

      // A server-side refresh rotates Codex refresh tokens. CodexSwitcher can
      // therefore keep an older token after OmniRoute has already persisted the
      // rotated one. Re-importing that stable account is a successful metadata
      // sync, not a reason to overwrite the working server credentials.
      const preserveExistingCredentials =
        existing !== null &&
        !sameRefreshToken &&
        (validation === "invalid" || validation === "inconclusive");

      let conn;
      if (preserveExistingCredentials) {
        conn = await updateExistingCodexImportMetadata(existing, norm.payload);
      } else {
        // Preserve operator-managed state (priority and providerSpecificData)
        // when the normal upsert path matches an existing connection.
        const allExisting = await getProviderConnections({ provider: "codex", authType: "oauth" });
        const payload = preserveExistingCodexConnectionState(
          norm.payload,
          allExisting as Array<Record<string, unknown>>
        );
        conn = await createProviderConnection(payload as Record<string, unknown>);
      }
      imported += 1;
      results.push({
        index: i,
        ok: true,
        connectionId: String(conn.id),
        email: String(conn.email ?? norm.payload.email),
        ...(preserveExistingCredentials ? { unchanged: true as const } : {}),
      });
    } catch (error) {
      failed += 1;
      results.push({
        index: i,
        ok: false,
        error: sanitizeErrorMessage(error instanceof Error ? error.message : String(error)),
      });
    }
  }

  return NextResponse.json({
    success: failed === 0,
    imported,
    failed,
    total: flat.records.length,
    results,
  });
}
