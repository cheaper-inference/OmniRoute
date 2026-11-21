// Opt-in OAUTH_MAX_SESSIONS_PER_ACCOUNT: when the selected OAuth account already serves that many
// other live sessions, move the new session to the next OAuth account that has room. If every
// account is full, keep the selection so the request is never refused by this feature.
import { hasOAuthSessionRoom } from "@omniroute/open-sse/services/oauthSessionOccupancy.ts";

function maxSessionsPerAccount(): number {
  const n = Number.parseInt(process.env.OAUTH_MAX_SESSIONS_PER_ACCOUNT || "", 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function applyOAuthSessionCap<T extends { id: string; authType?: string | null }>(
  selected: T,
  ordered: T[],
  sessionKey: string | null | undefined
): T {
  const max = maxSessionsPerAccount();
  if (!max || hasOAuthSessionRoom(selected.id, sessionKey, max)) return selected;
  const next = ordered.find(
    (candidate) =>
      candidate.authType === "oauth" && hasOAuthSessionRoom(candidate.id, sessionKey, max)
  );
  return next ?? selected;
}
