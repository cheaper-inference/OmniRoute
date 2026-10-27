import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { getSettings, updateSettings } from "@/lib/db/settings";
import {
  ensurePersistentManagementPasswordHash,
  getStoredManagementPassword,
  hasManagementPasswordConfigured,
  hashManagementPassword,
  verifyManagementPassword,
} from "@/lib/auth/managementPassword";
import { consumeBootstrapToken } from "@/lib/auth/bootstrapToken";
import { createErrorResponse } from "@/lib/api/errorResponse";
import {
  requireOperatorCredential,
  type OperatorCredentialKind,
} from "@/lib/api/operatorCredential";
import { deriveSettingsAuditActor, emitSettingsFailureAudit } from "@/lib/api/settingsAudit";
import { BOOTSTRAP_TOKEN_HEADER } from "@/server/authz/headers";
import {
  getDashboardJwtSecret,
  verifyDashboardSessionToken,
  DASHBOARD_SESSION_COOKIE,
} from "@/shared/utils/dashboardSessionToken";
import { getNodeRuntimeSupport } from "@/shared/utils/nodeRuntimeSupport.ts";
import { updateRequireLoginSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

/**
 * 403 for API keys of any scope and `oma_` access tokens. Whoever sets the password owns the
 * dashboard — and a dashboard session passes every operator-only boundary (sync tokens,
 * credential export) that refuses the same machine credential directly.
 */
const LOGIN_SETTINGS_FORBIDDEN_MESSAGE =
  "Changing login settings requires a signed-in dashboard session or the local CLI; API keys and access tokens cannot set the management password or toggle the login requirement.";

async function checkSessionAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(DASHBOARD_SESSION_COOKIE)?.value;
    return (await verifyDashboardSessionToken(token, getDashboardJwtSecret())) !== null;
  } catch {
    return false;
  }
}

// Node.js compatibility check — reflect the supported secure runtime floors used by CLI/CI.
function getNodeCompatibility() {
  const { nodeVersion, nodeCompatible } = getNodeRuntimeSupport();
  return { nodeVersion, nodeCompatible };
}

function hasConfiguredPassword(settings: Record<string, unknown>) {
  return hasManagementPasswordConfigured(settings);
}

function isBootstrapSecurityWindow(settings: Record<string, unknown>) {
  return !hasConfiguredPassword(settings);
}

export async function GET() {
  const nodeInfo = getNodeCompatibility();
  try {
    const settings = await getSettings();
    const requireLogin = settings.requireLogin !== false;
    const authenticated = await checkSessionAuthenticated();
    const hasPassword = hasManagementPasswordConfigured(settings);
    const setupComplete = !!settings.setupComplete;
    const oidcEnabled = !!settings.oidcEnabled;
    const oidcDisablePasswordLogin =
      oidcEnabled &&
      (settings.oidcDisablePasswordLogin === true ||
        isFeatureFlagEnabled("OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN") ||
        process.env.OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN === "true" ||
        process.env.OIDC_DISABLE_PASSWORD_LOGIN === "true");
    return NextResponse.json({
      authenticated,
      requireLogin,
      hasPassword,
      setupComplete,
      oidcEnabled,
      oidcDisablePasswordLogin,
      ...nodeInfo,
    });
  } catch (error) {
    console.error("[API] Error fetching require-login settings:", error);
    return NextResponse.json(
      {
        authenticated: false,
        requireLogin: true,
        hasPassword: true,
        setupComplete: true,
        oidcEnabled: false,
        oidcDisablePasswordLogin: false,
        ...nodeInfo,
      },
      { status: 200 }
    );
  }
}

type LoginSettingsWriter = { operator: OperatorCredentialKind | null } | { response: Response };

/**
 * Who may write. Inside the bootstrap window (no password configured yet) the first-run path
 * stays open exactly as before (`operator: null`). Outside it, only an operator credential —
 * dashboard session, local CLI, open instance — may change login settings; machine
 * credentials get 403 and an audit row, and a missing credential keeps the historical 401.
 */
async function authorizeLoginSettingsWrite(
  request: Request,
  settings: Record<string, unknown>
): Promise<LoginSettingsWriter> {
  if (isBootstrapSecurityWindow(settings)) return { operator: null };

  const verdict = await requireOperatorCredential(request, {
    forbiddenMessage: LOGIN_SETTINGS_FORBIDDEN_MESSAGE,
  });
  if (verdict.ok === false) {
    if (verdict.response.status === 401) {
      return { response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
    }
    if (verdict.response.status === 403) {
      const actor = await deriveSettingsAuditActor(request);
      emitSettingsFailureAudit(request, actor, "OPERATOR_REQUIRED", []);
    }
    return { response: verdict.response };
  }
  return { operator: verdict.operator };
}

/**
 * A dashboard session must prove it knows the current password before replacing it, so a
 * copied cookie cannot lock the operator out. Recovery path, deliberately without
 * `currentPassword`: (1) the bootstrap window — no password exists yet (`operator` is null);
 * (2) the machine-bound local CLI and an instance with login disabled — both are bound to the
 * host that already owns the data directory, which is how a forgotten password is reset.
 */
async function rejectPasswordChangeWithoutReauth(
  request: Request,
  operator: OperatorCredentialKind | null,
  settings: Record<string, unknown>,
  currentPassword: string | undefined
): Promise<Response | null> {
  if (operator !== "dashboard_session") return null;

  // Lazy-hash a plaintext / INITIAL_PASSWORD bootstrap value before verifying against it.
  const passwordState = await ensurePersistentManagementPasswordHash({
    settings,
    source: "settings.require_login_password_change",
  });
  const storedHash = getStoredManagementPassword(passwordState.settings);
  const reason = !currentPassword
    ? "PASSWORD_REQUIRED"
    : (await verifyManagementPassword(currentPassword, storedHash))
      ? null
      : "PASSWORD_MISMATCH";
  if (!reason) return null;

  emitSettingsFailureAudit(request, "dashboard", reason, ["password"]);
  return createErrorResponse({
    status: 403,
    message:
      reason === "PASSWORD_REQUIRED"
        ? "currentPassword is required to change the management password"
        : "Invalid current password",
    type: "invalid_request",
  });
}

/**
 * POST /api/settings/require-login — Set password and/or toggle requireLogin.
 * Unauthenticated writes are only allowed during the initial bootstrap window; afterwards the
 * write is operator-only and a dashboard session needs `currentPassword` to replace the password.
 */
export async function POST(request: Request) {
  const settings = await getSettings();
  const writer = await authorizeLoginSettingsWrite(request, settings);
  if ("response" in writer) return writer.response;

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(updateRequireLoginSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const body = validation.data;
    const { requireLogin, password, currentPassword } = body;

    if (password) {
      const denied = await rejectPasswordChangeWithoutReauth(
        request,
        writer.operator,
        settings,
        currentPassword
      );
      if (denied) return denied;
    }

    const updates: Record<string, any> = {};

    if (typeof requireLogin === "boolean") {
      updates.requireLogin = requireLogin;
    }

    if (password) {
      const hashedPassword = await hashManagementPassword(password);
      updates.password = hashedPassword;
    }

    await updateSettings(updates);
    // #14296: one-shot — a Docker/NAT-forwarded operator that authenticated
    // this write via the bootstrap token cannot replay it for a second write.
    // A no-op when the header is absent or stale (never matches).
    consumeBootstrapToken(request.headers.get(BOOTSTRAP_TOKEN_HEADER));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API] Error updating require-login settings:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update settings" },
      { status: 500 }
    );
  }
}
