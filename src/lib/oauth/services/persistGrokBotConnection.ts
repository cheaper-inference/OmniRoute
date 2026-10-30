/**
 * Persist a Grok Bot OAuth connection from the Cursor deep-control login.
 * Separate from the Cursor connection: a Bot grant cannot call Cursor APIs
 * and a Cursor grant cannot call GrokBotService.
 */

import {
  createProviderConnection,
  getProviderConnections,
  updateProviderConnection,
} from "@/models";
import type { CursorTokenCredentials } from "./cursorLogin";

export type PersistGrokBotConnectionInput = CursorTokenCredentials & {
  machineId?: string | null;
};

function readEmail(row: { email?: unknown }): string | null {
  return typeof row.email === "string" && row.email.length > 0 ? row.email.toLowerCase() : null;
}

function readAccountId(row: { providerSpecificData?: unknown }): string | null {
  const data = row.providerSpecificData;
  if (!data || typeof data !== "object") return null;
  const value = (data as { accountId?: unknown }).accountId;
  return typeof value === "string" && value.length > 0 ? value : null;
}

export type GrokBotConnectionRow = {
  id: string;
  email?: unknown;
  providerSpecificData?: unknown;
};

/**
 * Pick the existing row a fresh login should refresh.
 * Email wins: it is what the operator sees. When the mailbox lookup failed,
 * the JWT subject still identifies the account, so a second login refreshes
 * the same row instead of adding another one with no name.
 */
export function matchGrokBotConnection(
  rows: GrokBotConnectionRow[],
  email: string | null,
  accountId: string | null
): GrokBotConnectionRow | null {
  const wanted = email ? email.toLowerCase() : null;
  if (wanted) {
    const byEmail = rows.find((row) => readEmail(row) === wanted);
    if (byEmail) return byEmail;
  }
  if (accountId) {
    const byAccount = rows.find((row) => readAccountId(row) === accountId);
    if (byAccount) return byAccount;
  }
  return null;
}

/**
 * Create or update a grok-bot connection. Matches an existing row by email so
 * a second login for the same mailbox refreshes the tokens instead of adding
 * a duplicate account.
 */
export async function persistGrokBotConnection(input: PersistGrokBotConnectionInput) {
  const email = input.email ? input.email.toLowerCase() : null;
  const providerSpecificData = {
    machineId: input.machineId || null,
    authMethod: "deep_control",
    accountId: input.accountId || null,
    importedFrom: "dashboard-login",
  };

  if (email || input.accountId) {
    const existing = (await getProviderConnections({ provider: "grok-bot" })) as GrokBotConnectionRow[];
    const match = matchGrokBotConnection(existing, email, input.accountId || null);
    if (match) {
      return updateProviderConnection(match.id, {
        accessToken: input.accessToken,
        refreshToken: input.refreshToken,
        expiresAt: input.expiresAt.toISOString(),
        email,
        providerSpecificData,
        testStatus: "active",
        lastError: null,
        lastErrorType: null,
        errorCode: null,
      });
    }
  }

  return createProviderConnection({
    provider: "grok-bot",
    authType: "oauth",
    name: email,
    accessToken: input.accessToken,
    refreshToken: input.refreshToken,
    expiresAt: input.expiresAt.toISOString(),
    email,
    providerSpecificData,
    testStatus: "active",
  });
}
