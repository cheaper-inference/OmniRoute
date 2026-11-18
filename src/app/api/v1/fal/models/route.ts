import { canonicalFalEndpoint } from "@omniroute/open-sse/config/falEndpoint";
import { falCapabilities } from "@omniroute/open-sse/handlers/fal/schema";
import { falContext, resolveFalDefinition } from "@/lib/fal/runtime";
import { falErrorResponse, falNativeDisabled, falOptions } from "@/lib/fal/http";

export const dynamic = "force-dynamic";
export async function OPTIONS() {
  return falOptions("GET, OPTIONS");
}
export async function GET(request: Request) {
  const disabled = falNativeDisabled();
  if (disabled) return disabled;
  try {
    const query = new URL(request.url).searchParams;
    const endpoint = query.has("endpoint_id")
      ? canonicalFalEndpoint(query.get("endpoint_id")!)
      : null;
    const context = await falContext(request, endpoint, query.get("connection_id") ?? undefined);
    if (!("client" in context)) return context.rejection;
    if (endpoint) {
      const definition = await resolveFalDefinition(
        context.client,
        context.connectionId,
        endpoint,
        request.signal,
        query.get("refresh") === "true"
      );
      return Response.json(
        { ...definition, capabilities: falCapabilities(definition) },
        { headers: { "Cache-Control": "no-store" } }
      );
    }
    return Response.json(await context.client.discover(query, request.signal), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return falErrorResponse(error);
  }
}
