import {
  FalError,
  falTrackingUrl,
  normalizeFalOutput,
} from "@omniroute/open-sse/handlers/fal/client";
import { falRecord } from "@omniroute/open-sse/handlers/fal/schema";
import { loadFalJob, saveFalJob, type FalJob } from "@/lib/db/fal";
import { falContext } from "@/lib/fal/runtime";
import { falErrorResponse, falOptions } from "@/lib/fal/http";
import { getConfiguredTimeout } from "@/shared/utils/fetchTimeout";
import { closeFalRealtime, sendFalRealtime, loadFalArtifact } from "@/lib/fal/realtime";
import { recordFalDispatch } from "@/lib/fal/accounting";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { createInjectionGuard } from "@/middleware/promptInjectionGuard";

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
    if (!("client" in context)) return context.rejection;
    if (context.owner !== job.owner) throw new FalError("Fal job not found", 404);
    const artifactId = new URL(request.url).searchParams.get("artifact");
    if (artifactId && !cancel) return download(job, artifactId);
    if (socketTransport(job)) return socketStatus(job, cancel);
    if (!pollable(job)) return pendingReceipt(job);
    const signal = AbortSignal.any([request.signal, AbortSignal.timeout(getConfiguredTimeout())]);
    return cancel ? cancelQueue(job, context, signal) : pollQueue(job, context, signal, request);
  } catch (error) {
    return falErrorResponse(error);
  }
}

type Authorized = Extract<Awaited<ReturnType<typeof falContext>>, { client: unknown }>;
function socketTransport(job: FalJob) {
  return job.transport === "realtime" || job.transport === "http-websocket";
}
function pollable(job: FalJob) {
  return job.requestId && job.statusUrl && job.responseUrl;
}
function pendingReceipt(job: FalJob) {
  return Response.json(
    { id: job.id, status: job.status, request_id: job.requestId ?? null },
    { status: 202, headers: { "Cache-Control": "no-store" } }
  );
}
function socketStatus(job: FalJob, cancel: boolean) {
  if (cancel) {
    closeFalRealtime(job.id);
    job.status =
      loadFalJob(job.id)?.status === "SUBMISSION_UNKNOWN" ? "SUBMISSION_UNKNOWN" : "CLOSED";
    saveFalJob(job);
  }
  return Response.json({ id: job.id, status: job.status });
}
function download(job: FalJob, artifactId: string) {
  const file = loadFalArtifact(job.id, artifactId);
  if (!file) throw new FalError("Fal file expired or belongs to another worker", 410);
  const type = /^[\w.+-]+\/[\w.+-]+(?:;[^\r\n]*)?$/.test(file.type)
    ? file.type
    : "application/octet-stream";
  return new Response(new Uint8Array(file.bytes), {
    headers: {
      "Content-Type": type,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
      "Content-Disposition": `attachment; filename="${file.name.replace(/[^a-zA-Z0-9_.-]/g, "_")}"`,
    },
  });
}
async function cancelQueue(job: FalJob, context: Authorized, signal: AbortSignal) {
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
async function pollQueue(job: FalJob, context: Authorized, signal: AbortSignal, request: Request) {
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
    if (!job || !["realtime", "http-websocket"].includes(job.transport ?? ""))
      throw new FalError("Fal WebSocket job not found", 404);
    const context = await falContext(request, job.endpoint, job.connectionId);
    if (!("client" in context)) return context.rejection;
    if (context.owner !== job.owner) throw new FalError("Fal job not found", 404);
    const parsed = z
      .object({ input: z.record(z.string(), z.unknown()) })
      .strict()
      .safeParse(await request.json());
    if (!parsed.success) throw parsed.error;
    const body = parsed.data;
    const guard = createInjectionGuard()({ prompt: JSON.stringify(body.input) });
    if (guard.blocked) throw new FalError("Request blocked: potential prompt injection detected");
    sendFalRealtime(id, body.input);
    await recordFalDispatch(
      { ...job, id: randomUUID(), createdAt: Date.now() },
      context.apiKeyInfo?.id ?? null,
      200
    );
    return Response.json({
      id,
      status: job.transport === "realtime" ? "REALTIME" : "HTTP_WEBSOCKET",
    });
  } catch (error) {
    return falErrorResponse(error);
  }
}
