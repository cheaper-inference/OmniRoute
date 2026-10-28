import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { pingCodexAccountNow, type ManualPingResult } from "@/lib/services/quotaAutoPingManual";

/**
 * POST /api/providers/{id}/ping — manual "Ping now" for one Codex OAuth connection.
 *
 * Sends one tiny request through the Codex executor so the account's quota window
 * starts now. Consumes real quota; it does not change the opt-in auto-ping setting.
 * Outcomes are `{ status, reason }` codes (localized by the dashboard), never upstream
 * error text.
 */

const paramsSchema = z
  .object({
    id: z
      .string()
      .trim()
      .min(1)
      .max(200)
      .regex(/^[A-Za-z0-9._:-]+$/),
  })
  .strict();

type Context = { params: Promise<{ id: string }> };

function errorResponse(message: string, reason: string, status: number) {
  return Response.json({ error: { message: sanitizeErrorMessage(message) }, reason }, { status });
}

const ERROR_STATUS: Partial<Record<ManualPingResult["reason"], [number, string]>> = {
  not_found: [404, "Connection not found"],
  unsupported: [400, "Ping now is only available for Codex OAuth connections"],
};

export async function POST(request: Request, context: Context) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const parsed = paramsSchema.safeParse(await context.params);
  if (!parsed.success) return errorResponse("Invalid connection id", "invalid", 400);
  try {
    const result = await pingCodexAccountNow(parsed.data.id);
    const mapped = ERROR_STATUS[result.reason];
    if (mapped) return errorResponse(mapped[1], result.reason, mapped[0]);
    return Response.json(result);
  } catch (error) {
    return errorResponse(sanitizeErrorMessage(error), "error", 500);
  }
}
