/**
 * GET /api/tools/agent-bridge/cert/download
 * Streams the PEM certificate clients must trust for the active cert model:
 * the root CA (`ca.crt`) under the root-CA model, the legacy leaf
 * (`server.crt`) on a legacy-leaf install. Resolved through
 * `resolveActiveMitmCert()` so it always matches what the MITM server serves.
 * LOCAL_ONLY: registered in routeGuard.ts
 */
import fs from "fs";
import {
  activeCertDownloadName,
  activeCertMissingMessage,
  resolveActiveMitmCert,
} from "@/mitm/cert/activeCert";
import { createErrorResponse } from "@/lib/api/errorResponse";

export async function GET(): Promise<Response> {
  const { certPath, mode } = resolveActiveMitmCert();

  if (!fs.existsSync(certPath)) {
    return createErrorResponse({ status: 404, message: activeCertMissingMessage(mode) });
  }

  try {
    const pem = fs.readFileSync(certPath);
    return new Response(pem, {
      status: 200,
      headers: {
        "Content-Type": "application/x-pem-file",
        "Content-Disposition": `attachment; filename="${activeCertDownloadName(mode)}"`,
        "Content-Length": String(pem.length),
      },
    });
  } catch {
    return createErrorResponse({ status: 500, message: "Failed to read certificate file" });
  }
}
