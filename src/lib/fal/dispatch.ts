import {
  FalError,
  falTrackingUrl,
  normalizeFalOutput,
} from "@omniroute/open-sse/handlers/fal/client";
import {
  compileFalInput,
  falRecord,
  type FalDefinition,
  type FalRecord,
  type FalTransport,
} from "@omniroute/open-sse/handlers/fal/schema";
import { connectFalRealtime, falRealtimePath } from "@omniroute/open-sse/handlers/fal/realtime";
import { connectFalHttpWebsocket } from "@omniroute/open-sse/handlers/fal/httpWebsocket";
import {
  reserveFalJob,
  saveFalJob,
  claimFalAccounting,
  loadFalJob,
  type FalJob,
} from "@/lib/db/fal";
import {
  registerFalRealtime,
  removeFalRealtime,
  closeFalRealtime,
  storeFalArtifact,
} from "./realtime";
import { recordFalDispatch } from "./accounting";
import { falErrorResponse } from "./http";
import type { falContext } from "./runtime";
import { getConfiguredTimeout } from "@/shared/utils/fetchTimeout";

type Context = Extract<Awaited<ReturnType<typeof falContext>>, { client: unknown }>;
type Dispatch = {
  context: Context;
  definition: FalDefinition;
  transport: FalTransport;
  input: FalRecord;
  signal: AbortSignal;
  key: string | null;
  inputTransport: FalTransport;
  kind: unknown;
};
function headers(job: FalJob) {
  return { "X-Request-ID": job.id, "Cache-Control": "no-store" };
}
async function account(job: FalJob, context: Context, status: number) {
  if (!claimFalAccounting(job.id)) return;
  job.accounted = true;
  await recordFalDispatch(job, context.apiKeyInfo?.id ?? null, status);
}
function closed(job: FalJob, uncertain = false) {
  removeFalRealtime(job.id);
  saveFalJob({
    ...(loadFalJob(job.id) ?? job),
    status: uncertain ? "SUBMISSION_UNKNOWN" : "CLOSED",
  });
}
async function openSocket(args: Dispatch, job: FalJob, dispatched: () => void) {
  job.transport = args.transport;
  const common = {
    token: args.context.realtime.token,
    signal: args.signal,
    proxyUrl: args.context.realtime.proxyUrl(
      args.transport === "http-websocket" ? "https://ws.fal.run" : "https://fal.run"
    ),
    artifact: (bytes: Uint8Array, type: string, name: string) =>
      storeFalArtifact(job.id, bytes, type, name),
  };
  const connection =
    args.transport === "http-websocket"
      ? await connectFalHttpWebsocket({
          ...common,
          endpoint: job.endpoint,
          timeoutMs: getConfiguredTimeout(),
          onClose: (uncertain) => closed(job, uncertain),
        })
      : await connectFalRealtime({
          ...common,
          path: falRealtimePath(args.definition)!,
          onClose: () => closed(job),
        });
  registerFalRealtime(job.id, connection, compileFalInput(args.definition, args.inputTransport));
  connection.send(args.input);
  dispatched();
  job.status = args.transport === "realtime" ? "REALTIME" : "HTTP_WEBSOCKET";
  saveFalJob(job);
  await account(job, args.context, 200);
  return new Response(connection.output, {
    headers: { ...headers(job), "Content-Type": "text/event-stream" },
  });
}
async function acceptQueue(response: Response, job: FalJob, args: Dispatch) {
  const receipt = falRecord(await response.json());
  if (typeof receipt.request_id !== "string" || !/^[a-zA-Z0-9_-]+$/.test(receipt.request_id))
    throw new FalError("Fal did not return a usable request ID", 502);
  // Retain the upstream ID even if its tracking URLs are malformed.
  job.requestId = receipt.request_id;
  job.status = "SUBMITTED";
  saveFalJob(job);
  job.statusUrl = falTrackingUrl(receipt.status_url, receipt.request_id);
  job.responseUrl = falTrackingUrl(receipt.response_url, receipt.request_id);
  if (receipt.cancel_url !== undefined)
    job.cancelUrl = falTrackingUrl(receipt.cancel_url, receipt.request_id);
  job.status = "IN_QUEUE";
  saveFalJob(job);
  await account(job, args.context, 202);
  return Response.json(
    {
      id: job.id,
      request_id: job.requestId,
      status: job.status,
      kind: args.kind,
      status_url: `/v1/fal/jobs/${job.id}`,
      response_url: `/v1/fal/jobs/${job.id}?result=true`,
      cancel_url: job.cancelUrl ? `/v1/fal/jobs/${job.id}` : null,
    },
    { status: 202, headers: headers(job) }
  );
}
async function executeHttp(args: Dispatch, job: FalJob) {
  const streamUrl =
    typeof args.definition.metadata?.stream_url === "string"
      ? args.definition.metadata.stream_url
      : undefined;
  const response = await args.context.client.execute(
    job.endpoint,
    args.input,
    args.transport as "direct" | "queue" | "stream",
    args.signal,
    streamUrl
  );
  if (args.transport === "queue") return acceptQueue(response, job, args);
  job.status = args.transport === "stream" ? "STREAMING" : "COMPLETED";
  saveFalJob(job);
  await account(job, args.context, 200);
  if (args.transport === "stream") {
    if (!response.headers.get("content-type")?.includes("text/event-stream"))
      throw new FalError("Fal returned a non-streaming response", 502);
    return new Response(response.body, {
      headers: { ...headers(job), "Content-Type": "text/event-stream" },
    });
  }
  return Response.json(normalizeFalOutput(await response.json()), { headers: headers(job) });
}
async function failure(args: Dispatch, job: FalJob, error: unknown, dispatched: boolean) {
  if (args.transport === "realtime" || args.transport === "http-websocket")
    closeFalRealtime(job.id);
  const definite = !dispatched || (error instanceof FalError && error.status < 500);
  job.status = definite ? "FAILED" : job.requestId ? "SUBMITTED" : "SUBMISSION_UNKNOWN";
  saveFalJob(job);
  if (!definite) await account(job, args.context, 502);
  const response = falErrorResponse(error);
  response.headers.set("X-Request-ID", job.id);
  return response;
}
export async function dispatchFalJob(args: Dispatch) {
  const { job, fresh } = reserveFalJob(
    args.context.owner,
    args.context.connectionId,
    args.definition.endpoint_id,
    args.input,
    args.key
  );
  if (!fresh)
    return Response.json(
      { id: job.id, status: job.status, request_id: job.requestId },
      { status: 202, headers: headers(job) }
    );
  let dispatched = false;
  try {
    if (args.transport === "realtime" || args.transport === "http-websocket")
      return await openSocket(args, job, () => {
        dispatched = true;
      });
    dispatched = true;
    return await executeHttp(args, job);
  } catch (error) {
    return failure(args, job, error, dispatched);
  }
}
