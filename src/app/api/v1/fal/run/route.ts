import { canonicalFalEndpoint } from "@omniroute/open-sse/config/falEndpoint";
import {
  FalError,
  falTrackingUrl,
  normalizeFalOutput,
} from "@omniroute/open-sse/handlers/fal/client";
import {
  compileFalInput,
  falCapabilities,
  falRecord,
} from "@omniroute/open-sse/handlers/fal/schema";
import { reserveFalJob, saveFalJob, claimFalAccounting } from "@/lib/db/fal";
import { falContext, resolveFalDefinition, recoverFalReceipt } from "@/lib/fal/runtime";
import { falErrorResponse, falOptions, readFalRun } from "@/lib/fal/http";
import { recordFalDispatch } from "@/lib/fal/accounting";
import { getConfiguredTimeout } from "@/shared/utils/fetchTimeout";
import { createInjectionGuard } from "@/middleware/promptInjectionGuard";
import { connectFalRealtime, falRealtimePath } from "@omniroute/open-sse/handlers/fal/realtime";
import { registerFalRealtime, removeFalRealtime } from "@/lib/fal/realtime";

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
    if (context.rejection) return context.rejection;
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
    const input = compileFalInput(definition, streamSchema ? "stream" : "direct")(body.input);
    const guard = createInjectionGuard()({ prompt: JSON.stringify(input) });
    if (guard.blocked) throw new FalError("Request blocked: potential prompt injection detected");
    if (body.transport !== "queue" && request.headers.has("idempotency-key")) {
      throw new FalError("Idempotency-Key is supported for queue submissions only");
    }
    const reservation = reserveFalJob(
      context.owner,
      context.connectionId,
      endpoint,
      input,
      request.headers.get("idempotency-key")
    );
    const job = reservation.job;
    const headers = { "X-Request-ID": job.id, "Cache-Control": "no-store" };
    if (!reservation.fresh)
      return Response.json(
        { id: job.id, status: job.status, request_id: job.requestId },
        { status: 202, headers }
      );
    try {
      if (body.transport === "realtime") {
        job.transport = "realtime";
        const connection = await connectFalRealtime({
          path: falRealtimePath(definition)!,
          token: context.realtime.token,
          proxyUrl: context.realtime.proxyUrl(),
          signal,
          onClose() {
            removeFalRealtime(job.id);
            saveFalJob({ ...job, status: "CLOSED" });
          },
        });
        registerFalRealtime(job.id, connection, compileFalInput(definition));
        connection.send(input);
        job.status = "REALTIME";
        saveFalJob(job);
        if (claimFalAccounting(job.id))
          await recordFalDispatch(job, context.apiKeyInfo?.id ?? null, 200);
        return new Response(connection.output, {
          headers: { ...headers, "Content-Type": "text/event-stream" },
        });
      }
      const response = await context.client.execute(
        endpoint,
        input,
        body.transport,
        signal,
        typeof definition.metadata?.stream_url === "string"
          ? definition.metadata.stream_url
          : undefined
      );
      if (body.transport === "queue") {
        const receipt = falRecord(await response.json());
        if (
          typeof receipt.request_id !== "string" ||
          !/^[a-zA-Z0-9_-]+$/.test(receipt.request_id)
        ) {
          throw new FalError("Fal did not return a usable request ID", 502);
        }
        // Persist the upstream request ID even if a malformed tracking URL prevents polling.
        job.requestId = receipt.request_id;
        job.status = "SUBMITTED";
        saveFalJob(job);
        job.statusUrl = falTrackingUrl(receipt.status_url, receipt.request_id);
        job.responseUrl = falTrackingUrl(receipt.response_url, receipt.request_id);
        if (receipt.cancel_url !== undefined)
          job.cancelUrl = falTrackingUrl(receipt.cancel_url, receipt.request_id);
        job.status = "IN_QUEUE";
        saveFalJob(job);
        if (claimFalAccounting(job.id))
          await recordFalDispatch(job, context.apiKeyInfo?.id ?? null, 202);
        return Response.json(
          {
            id: job.id,
            request_id: job.requestId,
            status: job.status,
            kind: capabilities.kind,
            status_url: `/v1/fal/jobs/${job.id}`,
            response_url: `/v1/fal/jobs/${job.id}?result=true`,
            cancel_url: job.cancelUrl ? `/v1/fal/jobs/${job.id}` : null,
          },
          { status: 202, headers }
        );
      }
      job.status = body.transport === "stream" ? "STREAMING" : "COMPLETED";
      saveFalJob(job);
      if (claimFalAccounting(job.id))
        await recordFalDispatch(job, context.apiKeyInfo?.id ?? null, 200);
      if (body.transport === "stream") {
        if (!response.headers.get("content-type")?.includes("text/event-stream")) {
          throw new FalError("Fal returned a non-streaming response", 502);
        }
        // Pass native events in order, including partial/final and reasoning fields.
        return new Response(response.body, {
          headers: { ...headers, "Content-Type": "text/event-stream" },
        });
      }
      return Response.json(normalizeFalOutput(await response.json()), { headers });
    } catch (error) {
      job.status =
        error instanceof FalError && error.status < 500
          ? "FAILED"
          : job.requestId
            ? "SUBMITTED"
            : "SUBMISSION_UNKNOWN";
      saveFalJob(job);
      // A lost response can still be billable. Keep its receipt and fail closed on unknown cost.
      if (!(error instanceof FalError && error.status < 500) && claimFalAccounting(job.id)) {
        await recordFalDispatch(job, context.apiKeyInfo?.id ?? null, 502);
      }
      const result = falErrorResponse(error);
      result.headers.set("X-Request-ID", job.id);
      return result;
    }
  } catch (error) {
    return falErrorResponse(error);
  }
}
