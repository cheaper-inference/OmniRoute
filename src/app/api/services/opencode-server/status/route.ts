import { createErrorResponse } from "@/lib/api/errorResponse";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { getOpencodeServerStatus } from "@omniroute/open-sse/services/opencodeServerLauncher.ts";

import { toServiceStatus } from "../_status";

// Local-only: every /api/services/* route is classified by isLocalOnlyPath()
// (src/server/authz/routeGuard.ts) and enforced on the socket peer before auth.
export async function GET(): Promise<Response> {
  try {
    return Response.json(toServiceStatus(await getOpencodeServerStatus()));
  } catch (err) {
    return createErrorResponse({ status: 500, message: sanitizeErrorMessage(err) });
  }
}
