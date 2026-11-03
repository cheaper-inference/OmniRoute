import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getProviderConnectionById } from "@/lib/db/providers";
import { saveFalDefinition, deleteFalDefinition } from "@/lib/db/fal";
import { resolveProxyForConnection } from "@/lib/db/settings";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch";
import { canonicalFalEndpoint } from "@omniroute/open-sse/config/falEndpoint";
import { FalClient, FalError } from "@omniroute/open-sse/handlers/fal/client";
import { falCapabilities, compileFalInput } from "@omniroute/open-sse/handlers/fal/schema";
import { resolveFalDefinition } from "@/lib/fal/runtime";
import { falErrorResponse } from "@/lib/fal/http";

type Context = { params: Promise<{ id: string }> };
const registration = z
  .object({
    endpoint_id: z.string().min(3).max(300),
    openapi: z.record(z.string(), z.unknown()),
    metadata: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

async function connectionContext(id: string) {
  const connection = await getProviderConnectionById(id);
  if (connection?.provider !== "fal-ai") throw new FalError("Fal connection not found", 404);
  const proxy = await resolveProxyForConnection(id, undefined, "fal-ai");
  return new FalClient(String(connection.apiKey || connection.accessToken || ""), (url, init) =>
    runWithProxyContext(proxy.proxy, () => fetch(url, init))
  );
}

export async function GET(request: Request, route: Context) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { id } = await route.params;
    const client = await connectionContext(id);
    const query = new URL(request.url).searchParams;
    if (query.has("endpoint_id")) {
      const definition = await resolveFalDefinition(
        client,
        id,
        canonicalFalEndpoint(query.get("endpoint_id")!),
        request.signal,
        query.get("refresh") === "true"
      );
      return Response.json({ ...definition, capabilities: falCapabilities(definition) });
    }
    return Response.json(await client.discover(query, request.signal));
  } catch (error) {
    return falErrorResponse(error);
  }
}

export async function PUT(request: Request, route: Context) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { id } = await route.params;
    await connectionContext(id);
    const parsed = registration.safeParse(await request.json());
    if (!parsed.success) throw parsed.error;
    const definition = parsed.data;
    definition.endpoint_id = canonicalFalEndpoint(definition.endpoint_id);
    const capabilities = falCapabilities(definition);
    compileFalInput(definition);
    if (definition.openapi["x-fal-realtime"]) compileFalInput(definition, "realtime");
    saveFalDefinition(id, definition, true);
    return Response.json({
      endpoint_id: definition.endpoint_id,
      capabilities,
      verification: "schema-validated",
      execution_path: "/v1/fal/run",
    });
  } catch (error) {
    return falErrorResponse(error);
  }
}

export async function DELETE(request: Request, route: Context) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { id } = await route.params;
    await connectionContext(id);
    const endpoint = canonicalFalEndpoint(
      new URL(request.url).searchParams.get("endpoint_id") ?? ""
    );
    deleteFalDefinition(id, endpoint);
    return Response.json({ endpoint_id: endpoint, deleted: true });
  } catch (error) {
    return falErrorResponse(error);
  }
}
