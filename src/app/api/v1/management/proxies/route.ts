import { listProxies } from "@/lib/db/proxies";
import { parseIntegerQueryParam } from "@/lib/api/queryIntegerParam";
import {
  handleProxyCreate,
  handleProxyDelete,
  handleProxyUpdate,
  resolveProxyLookupResponse,
} from "@/lib/api/proxyRegistryRouteHandlers";
import { createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

function toPagination(searchParams: URLSearchParams): { limit: number; offset: number } | Response {
  const parsedLimit = parseIntegerQueryParam(searchParams, "limit", 50);
  if (parsedLimit.ok === false) return parsedLimit.response;
  const parsedOffset = parseIntegerQueryParam(searchParams, "offset", 0);
  if (parsedOffset.ok === false) return parsedOffset.response;
  return {
    limit: Math.max(1, Math.min(200, parsedLimit.value)),
    offset: Math.max(0, parsedOffset.value),
  };
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const lookupResponse = await resolveProxyLookupResponse(searchParams, "where_used");
    if (lookupResponse) return lookupResponse;

    const pagination = toPagination(searchParams);
    if (pagination instanceof Response) return pagination;
    const { limit, offset } = pagination;
    const result = await listProxies({ includeSecrets: false, limit, offset });
    return Response.json({
      items: result.items,
      page: { limit, offset, total: result.total },
    });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to load proxies");
  }
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  return handleProxyCreate(request);
}

export async function PATCH(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  return handleProxyUpdate(request);
}

export async function DELETE(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  return handleProxyDelete(request);
}
