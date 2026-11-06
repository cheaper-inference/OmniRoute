import { createErrorResponse } from "@/lib/api/errorResponse";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { stopOpencodeServer } from "@omniroute/open-sse/services/opencodeServerLauncher.ts";

import { toServiceStatus } from "../_status";

// Stops only the server this OmniRoute process started (local-only via /api/services/).
export async function POST(): Promise<Response> {
  try {
    return Response.json(toServiceStatus(await stopOpencodeServer()));
  } catch (err) {
    return createErrorResponse({ status: 500, message: sanitizeErrorMessage(err) });
  }
}
