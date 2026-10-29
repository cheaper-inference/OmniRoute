import { createErrorResponse } from "@/lib/api/errorResponse";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { startOpencodeServer } from "@omniroute/open-sse/services/opencodeServerLauncher.ts";

import { toServiceStatus } from "../_status";

// Spawns `opencode serve` (Hard Rules #15/#17). Local-only through the
// /api/services/ prefix of isLocalOnlyPath(); takes no input, so nothing from the
// request reaches the spawn — binary from env, argv from the configured loopback URL.
export async function POST(): Promise<Response> {
  try {
    return Response.json(toServiceStatus(await startOpencodeServer()));
  } catch (err) {
    return createErrorResponse({ status: 503, message: sanitizeErrorMessage(err) });
  }
}
