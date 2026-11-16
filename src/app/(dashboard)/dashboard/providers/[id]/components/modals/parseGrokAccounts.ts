/**
 * e0274 — parse pasted/uploaded Grok Build auth documents for import.
 *
 * A Grok Build auth file (`~/.grok/auth.json` after `grok login`) is a map of
 * issuer entries; at least one entry carries a JWT `key` (starts with "eyJ").
 * One document = one account. A bulk paste is an array of such documents.
 */

export interface GrokAuthAccount {
  /** The whole auth document, posted verbatim to /api/oauth/grok-cli/import-token. */
  doc: Record<string, unknown>;
  email: string | null;
  hasRefreshToken: boolean;
}

function readAuthEntry(entry: unknown): { email: string | null; hasRefreshToken: boolean } | null {
  if (!entry || typeof entry !== "object") return null;
  const obj = entry as Record<string, unknown>;
  const key = typeof obj.key === "string" ? obj.key : "";
  if (!key.startsWith("eyJ")) return null;
  return {
    email: typeof obj.email === "string" ? obj.email : null,
    hasRefreshToken: typeof obj.refresh_token === "string" && obj.refresh_token.length > 0,
  };
}

function parseSingleDoc(json: unknown): GrokAuthAccount | null {
  if (!json || typeof json !== "object" || Array.isArray(json)) return null;
  const doc = json as Record<string, unknown>;
  for (const entry of Object.values(doc)) {
    const auth = readAuthEntry(entry);
    if (auth) return { doc, email: auth.email, hasRefreshToken: auth.hasRefreshToken };
  }
  return null;
}

/**
 * Accept a single auth document or an array of them. Returns the valid accounts
 * (original order kept) and how many entries had to be rejected.
 */
export function parseGrokAccounts(json: unknown): {
  accounts: GrokAuthAccount[];
  rejected: number;
} {
  if (Array.isArray(json)) {
    const accounts: GrokAuthAccount[] = [];
    let rejected = 0;
    for (const item of json) {
      const account = parseSingleDoc(item);
      if (account) accounts.push(account);
      else rejected += 1;
    }
    return { accounts, rejected };
  }
  const account = parseSingleDoc(json);
  return { accounts: account ? [account] : [], rejected: account ? 0 : 1 };
}
