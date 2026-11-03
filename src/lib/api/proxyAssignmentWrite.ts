import { assignProxyToScope } from "@/lib/db/proxies";
import { proxyAssignmentSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { clearDispatcherCache } from "@omniroute/open-sse/utils/proxyDispatcher";

export async function handleProxyAssignmentPut(request: Request, failureMessage: string) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

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

  try {
    const validation = validateBody(proxyAssignmentSchema, rawBody);
    if (isValidationFailure(validation)) {
      return createErrorResponse({
        status: 400,
        message: validation.error.message,
        details: validation.error.details,
        type: "invalid_request",
      });
    }

    const { scope, scopeId, proxyId } = validation.data;
    const assignment = await assignProxyToScope(scope, scopeId || null, proxyId || null);
    clearDispatcherCache();

    return Response.json({ success: true, assignment });
  } catch (error) {
    return createErrorResponseFromUnknown(error, failureMessage);
  }
}
