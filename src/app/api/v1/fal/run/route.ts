import { canonicalFalEndpoint } from "@omniroute/open-sse/config/falEndpoint";
import { FalError } from "@omniroute/open-sse/handlers/fal/client";
import {
  compileFalInput,
  falCapabilities,
  falRecord,
} from "@omniroute/open-sse/handlers/fal/schema";
import { falContext, resolveFalDefinition, recoverFalReceipt } from "@/lib/fal/runtime";
import { falErrorResponse, falOptions, readFalRun } from "@/lib/fal/http";
import { dispatchFalJob } from "@/lib/fal/dispatch";
import { getConfiguredTimeout } from "@/shared/utils/fetchTimeout";
import { createInjectionGuard } from "@/middleware/promptInjectionGuard";

export const dynamic = "force-dynamic";
export async function OPTIONS() {
  return falOptions("POST, OPTIONS");
}

export async function POST(request: Request) {
  try {
    const body = await readFalRun(request);
    const endpoint = canonicalFalEndpoint(body.endpoint_id);
    if (body.transport === "queue" && request.headers.has("idempotency-key")) {
      const recovered = await recoverFalReceipt(
        request,
        endpoint,
        body.input,
        request.headers.get("idempotency-key")!,
        body.connection_id
      );
      if (recovered) return recovered;
    }
    const context = await falContext(request, endpoint, body.connection_id);
    if (!("client" in context)) return context.rejection;
    const signal = AbortSignal.any([request.signal, AbortSignal.timeout(getConfiguredTimeout())]);
    const definition = await resolveFalDefinition(
      context.client,
      context.connectionId,
      endpoint,
      signal
    );
    const capabilities = falCapabilities(definition);
    if (!capabilities.transports[body.transport])
      throw new FalError(`Fal ${body.transport} transport is not documented for this endpoint`);
    const streamSchema =
      body.transport === "stream" &&
      Object.keys(falRecord(definition.openapi.paths)).some((path) => path.endsWith("/stream"));
    const inputTransport =
      body.transport === "realtime" ? "realtime" : streamSchema ? "stream" : "direct";
    const input = compileFalInput(definition, inputTransport)(body.input);
    const guard = createInjectionGuard()({ prompt: JSON.stringify(input) });
    if (guard.blocked) throw new FalError("Request blocked: potential prompt injection detected");
    if (body.transport !== "queue" && request.headers.has("idempotency-key")) {
      throw new FalError("Idempotency-Key is supported for queue submissions only");
    }
    return dispatchFalJob({
      context,
      definition,
      transport: body.transport,
      input,
      inputTransport,
      signal,
      key: request.headers.get("idempotency-key"),
      kind: capabilities.kind,
    });
  } catch (error) {
    return falErrorResponse(error);
  }
}
