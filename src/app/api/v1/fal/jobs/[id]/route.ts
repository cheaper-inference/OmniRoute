import {
  FalError,
  falTrackingUrl,
  normalizeFalOutput,
} from "@omniroute/open-sse/handlers/fal/client";
import { falRecord } from "@omniroute/open-sse/handlers/fal/schema";
import { loadFalJob, saveFalJob } from "@/lib/db/fal";
import { falContext } from "@/lib/fal/runtime";
import { falErrorResponse, falOptions } from "@/lib/fal/http";
import { getConfiguredTimeout } from "@/shared/utils/fetchTimeout";
import { closeFalRealtime, sendFalRealtime } from "@/lib/fal/realtime";
import { recordFalDispatch } from "@/lib/fal/accounting";
import { z } from "zod";
import { randomUUID } from "node:crypto";

export const dynamic = "force-dynamic";
type Context = { params: Promise<{ id: string }> };
export async function OPTIONS() {
  return falOptions("GET, POST, DELETE, OPTIONS");
}

async function track(request: Request, route: Context, cancel: boolean) {
  try {
    const { id } = await route.params;
    const job = loadFalJob(id);
    if (!job) throw new FalError("Fal job not found", 404);
    const context = await falContext(request, job.endpoint, job.connectionId, true);
    if (context.rejection) return context.rejection;
    if (context.owner !== job.owner) throw new FalError("Fal job not found", 404);
    if (job.transport === "realtime") {
      if (cancel) {
        closeFalRealtime(job.id);
        job.status = "CLOSED";
        saveFalJob(job);
      }
      return Response.json({ id: job.id, status: job.status });
    }
    if (!job.requestId || !job.statusUrl || !job.responseUrl) {
      return Response.json(
        { id: job.id, status: job.status, request_id: job.requestId ?? null },
        { status: 202, headers: { "Cache-Control": "no-store" } }
      );
    }
    const signal = AbortSignal.any([request.signal, AbortSignal.timeout(getConfiguredTimeout())]);
    if (cancel) {
      if (!job.cancelUrl) throw new FalError("Fal did not provide cancellation for this job", 409);
      const response = await context.client.request(falTrackingUrl(job.cancelUrl, job.requestId), {
        method: "PUT",
        signal,
      });
      const payload = falRecord(await response.json());
      job.status = payload.status === "OK" ? "CANCELLED" : "CANCELLATION_REQUESTED";
      saveFalJob(job);
      return Response.json({ id: job.id, status: job.status }, { status: response.status });
    }
    if (job.status === "CANCELLED") return Response.json({ id: job.id, status: job.status });
    const response = await context.client.request(falTrackingUrl(job.statusUrl, job.requestId), {
      signal,
    });
    const payload = falRecord(await response.json());
    if (typeof payload.status !== "string") throw new FalError("Invalid fal job status", 502);
    job.status = payload.status;
    saveFalJob(job);
    if (
      payload.status === "COMPLETED" &&
      new URL(request.url).searchParams.get("result") === "true"
    ) {
      const result = await context.client.request(falTrackingUrl(job.responseUrl, job.requestId), {
        signal,
      });
      return Response.json(
        { id: job.id, status: job.status, ...normalizeFalOutput(await result.json()) },
        { headers: { "Cache-Control": "no-store", "X-Request-ID": job.id } }
      );
    }
    return Response.json(
      {
        id: job.id,
        request_id: job.requestId,
        status: job.status,
        queue_position: payload.queue_position ?? null,
        metrics: payload.metrics ?? null,
      },
      { headers: { "Cache-Control": "no-store", "X-Request-ID": job.id } }
    );
  } catch (error) {
    return falErrorResponse(error);
  }
}

export async function GET(request: Request, context: Context) {
  return track(request, context, false);
}
export async function DELETE(request: Request, context: Context) {
  return track(request, context, true);
}

/** Submit one more validated input on an existing realtime WebSocket. This spends inference. */
export async function POST(request: Request, route: Context) {
  try {
    const { id } = await route.params;
    const job = loadFalJob(id);
    if (!job || job.transport !== "realtime") throw new FalError("Fal realtime job not found", 404);
    const context = await falContext(request, job.endpoint, job.connectionId);
    if (context.rejection) return context.rejection;
    if (context.owner !== job.owner) throw new FalError("Fal job not found", 404);
    const body = z
      .object({ input: z.record(z.string(), z.unknown()) })
      .strict()
      .parse(await request.json());
    sendFalRealtime(id, body.input);
    await recordFalDispatch(
      { ...job, id: randomUUID(), createdAt: Date.now() },
      context.apiKeyInfo?.id ?? null,
      200
    );
    return Response.json({ id, status: "REALTIME" });
  } catch (error) {
    return falErrorResponse(error);
  }
}
