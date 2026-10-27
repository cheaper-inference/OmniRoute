/**
 * POST /api/tools/agent-bridge/cert/regenerate
 * Regenerates the active MITM cert without ever changing the cert model
 * (`regenerateActiveMitmCert()`): a legacy-leaf install gets a fresh
 * `server.crt`; a root-CA install gets a rotated `ca.crt` (the old CA is
 * untrusted first when trusted; refused while the bridge is running).
 * Body (optional): { sudoPassword?: string } — needed only to untrust a
 * trusted root CA when no password is cached.
 * LOCAL_ONLY: registered in routeGuard.ts
 */
import { z } from "zod";
import { checkCertInstalled, uninstallCert } from "@/mitm/cert/install";
import { isRegenerateFailure, regenerateActiveMitmCert } from "@/mitm/cert/regenerate";
import { getCachedPassword } from "@/mitm/manager";
import { isMitmSudoPasswordRequired, resolveMitmSudoPassword } from "@/mitm/sudoGate";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { createErrorResponse } from "@/lib/api/errorResponse";

const RegenerateBodySchema = z.object({ sudoPassword: z.string().optional() });

export async function POST(request?: Request): Promise<Response> {
  try {
    const raw = request ? await request.json().catch(() => ({})) : {};
    const parsed = RegenerateBodySchema.safeParse(raw);
    const sudoPassword = resolveMitmSudoPassword(
      parsed.success ? parsed.data.sudoPassword : undefined,
      getCachedPassword()
    );
    // manager.runtime bypasses the Turbopack alias that maps @/mitm/manager
    // to its stub, so the running check reads the real process state.
    const { getMitmStatus } = await import("@/mitm/manager.runtime");
    const { running } = await getMitmStatus();
    const result = await regenerateActiveMitmCert(
      { sudoPassword, running },
      { checkCertInstalled, uninstallCert, isSudoPasswordRequired: isMitmSudoPasswordRequired }
    );
    if (isRegenerateFailure(result)) {
      return createErrorResponse({ status: result.status, message: result.message });
    }
    return Response.json(result);
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
