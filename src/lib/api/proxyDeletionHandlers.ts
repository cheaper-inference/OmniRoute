import { z } from "zod";

import { clearDispatcherCache } from "@omniroute/open-sse/utils/proxyDispatcher";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/errorSanitization.ts";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { createErrorResponse, createErrorResponseFromUnknown } from "./errorResponse";
import { deleteProxyWithManagedCleanup } from "./managedProxyRegistry";

export type ProxyDeletion = (request: Request, id: string, force: boolean) => Promise<boolean>;

const batchDeleteSchema = z.object({
  ids: z.array(z.string()).min(1).max(100),
  force: z.boolean().optional().default(false),
});

export async function handleProxyDelete(
  request: Request,
  remove: ProxyDeletion = deleteProxyWithManagedCleanup
): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const force = searchParams.get("force") === "1";
    if (!id)
      return createErrorResponse({
        status: 400,
        message: "id is required",
        type: "invalid_request",
      });
    if (!(await remove(request, id, force)))
      return createErrorResponse({ status: 404, message: "Proxy not found", type: "not_found" });
    return Response.json({ success: true });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to delete proxy");
  }
}

export async function handleProxyBatchDelete(
  request: Request,
  remove: ProxyDeletion = deleteProxyWithManagedCleanup
): Promise<Response> {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return createErrorResponse({
      status: 400,
      message: "Invalid JSON body",
      type: "invalid_request",
    });
  }
  const validation = validateBody(batchDeleteSchema, rawBody);
  if (isValidationFailure(validation))
    return createErrorResponse({
      status: 400,
      message: validation.error.message,
      type: "invalid_request",
    });
  const { ids, force } = validation.data;
  try {
    const results: Array<{ id: string; success: boolean; error?: string }> = [];
    let deletedCount = 0;
    for (const id of ids) {
      try {
        if (await remove(request, id, force)) {
          results.push({ id, success: true });
          deletedCount++;
        } else results.push({ id, success: false, error: "Proxy not found" });
      } catch (error) {
        results.push({
          id,
          success: false,
          error: sanitizeErrorMessage(error instanceof Error ? error.message : "Unknown error"),
        });
      }
    }
    if (deletedCount > 0) {
      try {
        clearDispatcherCache();
      } catch {
        /* non-critical */
      }
    }
    return Response.json({
      success: deletedCount > 0,
      deleted: deletedCount,
      failed: ids.length - deletedCount,
      results,
    });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to batch delete proxies");
  }
}
