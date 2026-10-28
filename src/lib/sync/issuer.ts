import {
  requireOperatorCredential,
  type OperatorCredentialKind,
} from "@/lib/api/operatorCredential";

/**
 * Who may issue a sync token.
 *
 * A sync token opens GET /api/sync/bundle, which returns decrypted provider credentials and
 * plaintext API keys. Every other surface keeps those away from machine credentials: GET
 * /api/providers masks them, /api/keys/{id}/reveal is off unless enabled, and /api/cloud/auth
 * gives a manage key only fragments. So issuing a sync token needs more than the `manage` scope:
 *
 *   - `session`  — the signed-in dashboard owner;
 *   - `cli`      — the machine-bound local CLI token (loopback only);
 *   - `internal` — the trusted loopback internal-service token.
 *
 * API keys (any scope) and remote CLI access tokens (`oma_…`) are refused: a manage key can mint
 * an `admin` access token, so accepting either would reopen the same path.
 *
 * Login being disabled (`requireLogin=false`) does not make the caller the operator here: the
 * bundle is the same material `/api/settings/export-json` hands out, and that route stays
 * authenticated in open mode, so issuance does too (`alwaysRequireAuth`). `open` is kept only to
 * type the rows earlier releases minted without a credential; `validateSyncToken()` refuses them.
 */
export type SyncTokenIssuer = "session" | "cli" | "internal" | "open";

export type SyncTokenIssuerVerdict =
  { ok: true; issuer: SyncTokenIssuer } | { ok: false; response: Response };

const ISSUER_BY_OPERATOR: Record<OperatorCredentialKind, SyncTokenIssuer> = {
  open_instance: "open",
  dashboard_session: "session",
  internal_service: "internal",
  local_cli: "cli",
};

export async function authorizeSyncTokenIssuer(request: Request): Promise<SyncTokenIssuerVerdict> {
  const verdict = await requireOperatorCredential(request, {
    allowInternalService: true,
    alwaysRequireAuth: true,
    forbiddenMessage:
      "Sync tokens can only be issued from a signed-in dashboard session or the local CLI.",
  });
  if (verdict.ok === false) return verdict;
  return { ok: true, issuer: ISSUER_BY_OPERATOR[verdict.operator] };
}
