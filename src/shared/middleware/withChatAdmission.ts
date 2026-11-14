/**
 * Compose process-wide chat admission in front of a route handler.
 *
 * Uses the shipped `admitChatRequest` budget/fairness controller — it does not
 * introduce a second admission path. Call this *outside* `withInjectionGuard`
 * so a large `/v1/responses` or `/v1/messages` body is reserved (or 503-shed)
 * before `request.clone()` / `.json()`.
 */
import {
  admitChatRequest,
  admitChatStructure,
  CHAT_ADMISSION_QUEUE_MAX_MS,
  releaseChatAdmissionAfterHandler,
  resolveSessionId,
  type ChatAdmissionController,
  type ChatAdmissionLease,
} from "./chatBodyAdmission";
import { logAdmissionRejection } from "@/sse/handlers/admissionRejectionLog";
import { resolveIncomingCorrelationId } from "@/shared/utils/correlationPreserve.ts";

type RouteHandler = (request: Request, ...args: any[]) => Promise<Response> | Response;

/**
 * A body that is small in bytes can still be heavy in structure (many messages or tools), and a
 * large body already holds the lease admitChatRequest took. Read a small body once, on a clone,
 * and let admitChatStructure decide: it takes a lease only for a structurally heavy body and
 * keeps the one this request already has. A body that is not JSON is left to the handler.
 */
async function admitSmallBodyStructure(
  request: Request,
  lease: ChatAdmissionLease | null,
  options: { controller?: ChatAdmissionController; heapPressureCheck?: () => boolean }
) {
  if (lease) return { admit: true as const, lease };
  let parsed: unknown;
  try {
    parsed = await request.clone().json();
  } catch {
    return { admit: true as const, lease };
  }
  return admitChatStructure(parsed, lease, {
    controller: options.controller,
    heapPressureCheck: options.heapPressureCheck,
    sessionId: resolveSessionId(request),
    queueMs: CHAT_ADMISSION_QUEUE_MAX_MS,
    signal: request.signal,
  });
}

export function withChatAdmission(
  handler: RouteHandler,
  options: {
    controller?: ChatAdmissionController;
    queueMs?: number;
    largeBodyBytes?: number;
    hardMaxBytes?: number;
    /** Test seam: the heap-pressure probe admitChatStructure consults (defaults to live V8 stats). */
    heapPressureCheck?: () => boolean;
  } = {}
): RouteHandler {
  return async function admittedHandler(request: Request, ...args: any[]) {
    const sessionId = resolveSessionId(request);
    const admission = await admitChatRequest(request, {
      sessionId,
      queueMs: options.queueMs ?? CHAT_ADMISSION_QUEUE_MAX_MS,
      controller: options.controller,
      largeBodyBytes: options.largeBodyBytes,
      hardMaxBytes: options.hardMaxBytes,
    });
    if (admission.admit === false) {
      void logAdmissionRejection(admission.response, {
        path: new URL(request.url).pathname,
        model: "-",
        requestBody: null,
        apiKeyId: null,
        apiKeyName: null,
        correlationId: resolveIncomingCorrelationId(request.headers.get("x-correlation-id")),
      });
      return admission.response;
    }
    let lease = admission.lease;
    try {
      const structure = await admitSmallBodyStructure(admission.request, lease, options);
      if (structure.admit === false) {
        void logAdmissionRejection(structure.response, {
          path: new URL(request.url).pathname,
          model: "-",
          requestBody: null,
          apiKeyId: null,
          apiKeyName: null,
          correlationId: resolveIncomingCorrelationId(request.headers.get("x-correlation-id")),
        });
        return structure.response;
      }
      lease = structure.lease;
      return await releaseChatAdmissionAfterHandler(
        Promise.resolve(handler(admission.request, ...args)),
        lease,
        { signal: request.signal }
      );
    } catch (error) {
      lease?.release();
      throw error;
    }
  };
}
