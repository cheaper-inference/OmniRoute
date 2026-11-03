import { createErrorResponse } from "@/lib/api/errorResponse";
import { isTrustedLoopbackInternalServiceRequest } from "@/lib/api/internalServiceAuth";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isCliTokenAuthValid } from "@/lib/middleware/cliTokenAuth";
import { AUTHZ_HEADER_AUTH_KIND, AUTHZ_HEADER_AUTH_LABEL } from "@/server/authz/headers";
import { isAuthRequired, isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth";

export type OperatorCredentialKind =
  "open_instance" | "dashboard_session" | "internal_service" | "local_cli";

export interface OperatorCredentialOptions {
  /**
   * Also accept the trusted loopback internal-service token. Off by default: only surfaces
   * an internal service actually calls (sync token issuance) should opt in.
   */
  allowInternalService?: boolean;
  /**
   * The action is a credential surface that stays authenticated even when login is disabled
   * (the `ALWAYS_PROTECTED_API_PATHS` tier): an open instance no longer counts as the operator,
   * so an API key presented on an open instance is still refused. Off by default.
   */
  alwaysRequireAuth?: boolean;
}

/**
 * Is the caller the instance operator, as opposed to a machine credential?
 *
 * Operator credentials are the ones only the owner of the instance holds:
 *   - an instance with login disabled (every management surface is already open),
 *   - an authenticated dashboard session (password / OIDC login),
 *   - the machine-bound local CLI credential — the subject stamped by the authz pipeline,
 *     or validated here (loopback-only) for raw callers that skip the pipeline,
 *   - optionally (`allowInternalService`), the trusted loopback internal-service token.
 *
 * API keys (whatever their scope) and `oma_` access tokens are machine credentials: they
 * can be handed to automation, so actions that hand out top-level privilege must not be
 * reachable with them alone. Returns `null` when the caller is not an operator.
 *
 * Throws when the auth backend fails — callers map that to a 503, never to an allow.
 */
export async function resolveOperatorCredential(
  request: Request,
  options: OperatorCredentialOptions = {}
): Promise<OperatorCredentialKind | null> {
  if (!options.alwaysRequireAuth && !(await isAuthRequired(request, { ignorePublicRoute: true }))) {
    return "open_instance";
  }
  if (await isDashboardSessionAuthenticated(request)) return "dashboard_session";
  if (options.allowInternalService && isTrustedLoopbackInternalServiceRequest(request)) {
    return "internal_service";
  }
  if (await isLocalCliCredential(request)) return "local_cli";
  return null;
}

/**
 * Is the caller the machine-bound local CLI? Either the authz pipeline already validated
 * the loopback CLI token and stamped the subject, or (raw callers that skip the pipeline)
 * the token is validated here, loopback-only.
 */
export async function isLocalCliCredential(request: Request): Promise<boolean> {
  if (
    request.headers.get(AUTHZ_HEADER_AUTH_KIND) === "management_key" &&
    request.headers.get(AUTHZ_HEADER_AUTH_LABEL) === "local-cli-token"
  ) {
    return true;
  }
  return isCliTokenAuthValid(request);
}

export type OperatorAuthVerdict =
  { ok: true; operator: OperatorCredentialKind } | { ok: false; response: Response };

/**
 * Route guard for operator-only management actions (issuing a sync token, exporting stored
 * credentials). Runs the regular management auth first — so a missing credential is still a
 * 401 and an invalid one keeps its usual status — then refuses machine credentials (API keys
 * of any scope, `oma_` access tokens) with a 403 carrying `forbiddenMessage`.
 */
export async function requireOperatorCredential(
  request: Request,
  options: OperatorCredentialOptions & { forbiddenMessage: string }
): Promise<OperatorAuthVerdict> {
  const authError = await requireManagementAuth(request, {
    alwaysRequireAuth: options.alwaysRequireAuth,
  });
  if (authError) return { ok: false, response: authError };

  let operator: OperatorCredentialKind | null;
  try {
    operator = await resolveOperatorCredential(request, {
      allowInternalService: options.allowInternalService,
      alwaysRequireAuth: options.alwaysRequireAuth,
    });
  } catch {
    return {
      ok: false,
      response: createErrorResponse({
        status: 503,
        message: "Service temporarily unavailable",
        type: "server_error",
      }),
    };
  }

  if (operator) return { ok: true, operator };

  return {
    ok: false,
    response: createErrorResponse({
      status: 403,
      message: options.forbiddenMessage,
      type: "invalid_request",
    }),
  };
}

/** 403 message shared by every route that downloads stored credentials or a database copy. */
export const CREDENTIAL_EXPORT_FORBIDDEN_MESSAGE =
  "Exporting stored credentials requires a signed-in dashboard session or the local CLI; API keys and access tokens cannot download backups.";

/** 403 message shared by every route that restores a backup over the live database or settings. */
export const CREDENTIAL_IMPORT_FORBIDDEN_MESSAGE =
  "Restoring a backup requires a signed-in dashboard session or the local CLI; API keys and access tokens cannot replace the database.";
