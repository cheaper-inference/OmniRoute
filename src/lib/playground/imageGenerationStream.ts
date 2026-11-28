import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { DEFAULT_SSE_HEARTBEAT_INTERVAL_MS } from "@omniroute/open-sse/utils/sseHeartbeat.ts";
import { createStreamDeadlineSignal } from "@omniroute/open-sse/utils/streamDeadlineSignal.ts";
import { waitForRequiredApiKeyAuthorization } from "@/shared/utils/requiredApiKeyTransport";
import * as log from "@/sse/utils/logger";
import { PLAYGROUND_IMAGE_RESULT_EVENT } from "@/shared/utils/playgroundImageStream";

const PLAYGROUND_STREAM_ENCODER = new TextEncoder();
const PLAYGROUND_HEARTBEAT = PLAYGROUND_STREAM_ENCODER.encode(": keepalive\n\n");

type PlaygroundImagePost = (request: Request, context?: unknown) => Response | Promise<Response>;

function resultFrame(response: {
  status: number;
  body: string;
  headers?: Record<string, string>;
}): Uint8Array {
  return PLAYGROUND_STREAM_ENCODER.encode(
    `event: ${PLAYGROUND_IMAGE_RESULT_EVENT}\ndata: ${JSON.stringify(response)}\n\n`
  );
}

export function createPlaygroundImageStreamResponse(
  request: Request,
  context: unknown,
  dispatch: PlaygroundImagePost,
  heartbeatIntervalMs = DEFAULT_SSE_HEARTBEAT_INTERVAL_MS
): Response {
  const upstreamAbort = new AbortController();
  const forwardedRequest = new Request(request, { signal: upstreamAbort.signal });
  return streamImageResult(
    request,
    upstreamAbort,
    () => dispatch(forwardedRequest, context),
    heartbeatIntervalMs
  );
}

export async function createAuthorizedImageStreamResponse(
  request: Request,
  context: unknown,
  dispatch: PlaygroundImagePost
): Promise<Response> {
  const { signal, deadlineController } = createStreamDeadlineSignal(request.signal);
  const forwardedRequest = new Request(request, { signal });
  const { handler, earlyResponse } = await waitForRequiredApiKeyAuthorization(
    () => dispatch(forwardedRequest, context),
    signal,
    deadlineController
  );
  if (earlyResponse) return earlyResponse;
  return streamImageResult(
    request,
    deadlineController,
    () => handler,
    DEFAULT_SSE_HEARTBEAT_INTERVAL_MS
  );
}

function streamImageResult(
  request: Request,
  upstreamAbort: AbortController,
  dispatch: () => ReturnType<PlaygroundImagePost>,
  heartbeatIntervalMs: number
): Response {
  let closed = false;
  let intervalId: ReturnType<typeof setInterval> | undefined;
  let streamController: ReadableStreamDefaultController<Uint8Array> | undefined;

  const stop = () => {
    if (intervalId !== undefined) {
      globalThis.clearInterval(intervalId);
      intervalId = undefined;
    }
    request.signal.removeEventListener("abort", abortFromRequest);
  };

  const closeWithoutResult = () => {
    if (closed) return;
    closed = true;
    stop();
    try {
      streamController?.close();
    } catch {
      // The consumer may already have cancelled the stream.
    }
  };

  const abortFromRequest = () => {
    if (!upstreamAbort.signal.aborted) upstreamAbort.abort(request.signal.reason);
    closeWithoutResult();
  };

  const finish = (
    controller: ReadableStreamDefaultController<Uint8Array>,
    result: { status: number; body: string; headers?: Record<string, string> }
  ) => {
    if (closed) return;
    closed = true;
    stop();
    controller.enqueue(resultFrame(result));
    controller.close();
  };

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      streamController = controller;
      request.signal.addEventListener("abort", abortFromRequest, { once: true });
      if (request.signal.aborted) {
        abortFromRequest();
        return;
      }

      controller.enqueue(PLAYGROUND_HEARTBEAT);
      intervalId = globalThis.setInterval(() => {
        if (closed) return;
        controller.enqueue(PLAYGROUND_HEARTBEAT);
      }, heartbeatIntervalMs);
      if (intervalId && typeof intervalId === "object" && "unref" in intervalId) {
        intervalId.unref?.();
      }

      void Promise.resolve()
        .then(dispatch)
        .then(async (response: Response) => {
          const body = await response.text();
          const contentType = response.headers.get("content-type");
          finish(controller, {
            status: response.status,
            body,
            ...(contentType ? { headers: { "content-type": contentType } } : {}),
          });
        })
        .catch(() => {
          if (closed) return;
          log.error("IMAGE", "Playground image stream failed before producing a response");
          finish(controller, {
            status: HTTP_STATUS.SERVER_ERROR,
            body: JSON.stringify(
              buildErrorBody(HTTP_STATUS.SERVER_ERROR, "Image generation failed")
            ),
            headers: { "content-type": "application/json" },
          });
        });
    },

    cancel(reason) {
      if (!upstreamAbort.signal.aborted) upstreamAbort.abort(reason);
      closed = true;
      stop();
    },
  });

  return new Response(stream, {
    headers: {
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "Content-Type": "text/event-stream; charset=utf-8",
      "X-Accel-Buffering": "no",
    },
  });
}
