import { AsyncLocalStorage } from "node:async_hooks";

import {
  SLOW_PATH_DEADLINE_MS,
  withEarlyStreamKeepalive,
  type EarlyStreamKeepaliveOptions,
} from "@omniroute/open-sse/utils/earlyStreamKeepalive";
import { errorResponse } from "@omniroute/open-sse/utils/error";

import { getProcessStore } from "./processSingleton";
import {
  requiredApiKeyUnavailable,
  resolveRequiredApiKey,
  usesNativeRequiredApiKeyTransport,
} from "./requiredApiKeyContext";

type Authorization = {
  authorized: boolean;
  decision: PromiseWithResolvers<"authorized" | "unavailable">;
};

const authorizations = getProcessStore(
  "requiredApiKeyStreamAuthorization",
  () => new AsyncLocalStorage<Authorization>()
);

function cancelledResponse(): Response {
  return errorResponse(499, "Request cancelled", { code: "client_closed_request" });
}

/** Keep an unavailable bound key as an HTTP rejection when a target reports it. */
export function rejectUnavailableRequiredApiKeyStream(): Response {
  authorizations.getStore()?.decision.resolve("unavailable");
  return requiredApiKeyUnavailable();
}

/** Called after key policy checks and before provider dispatch. */
export async function authorizeRequiredApiKeyStream(
  signal?: AbortSignal | null
): Promise<Response | null> {
  const authorization = authorizations.getStore();
  if (!authorization) return null;
  if (signal?.aborted) return cancelledResponse();
  if (authorization.authorized) return null;

  const key = await resolveRequiredApiKey();
  if (signal?.aborted) return cancelledResponse();
  if (authorization.authorized) return null;
  if (!key) return rejectUnavailableRequiredApiKeyStream();

  authorization.authorized = true;
  authorization.decision.resolve("authorized");
  return null;
}

/** Wait for a per-dispatch decision, an early HTTP response or a disconnect. */
export async function waitForRequiredApiKeyAuthorization(
  dispatch: () => Response | Promise<Response>,
  signal: AbortSignal,
  deadlineController: AbortController,
  deadlineMs = SLOW_PATH_DEADLINE_MS
): Promise<{ handler: Promise<Response>; earlyResponse: Response | null }> {
  const authorization: Authorization = {
    authorized: false,
    decision: Promise.withResolvers(),
  };
  const handler = authorizations.run(authorization, () => Promise.resolve().then(dispatch));
  const stopped = Promise.withResolvers<Response>();
  const cancelLateResponse = () => {
    void handler.then((response) => response.body?.cancel()).catch(() => undefined);
  };
  const stop = () => {
    stopped.resolve(
      deadlineController.signal.aborted
        ? errorResponse(504, "Request authorization timed out", { code: "gateway_timeout" })
        : cancelledResponse()
    );
    cancelLateResponse();
  };

  signal.addEventListener("abort", stop, { once: true });
  if (signal.aborted) stop();
  const timer =
    Number.isFinite(deadlineMs) && deadlineMs > 0
      ? setTimeout(() => deadlineController.abort(), deadlineMs)
      : undefined;
  try {
    const earlyResponse = await Promise.race([
      stopped.promise,
      handler,
      authorization.decision.promise.then((decision) => {
        if (decision === "authorized") return null;
        // A multi-target handler can still be unwinding the rejected attempt.
        cancelLateResponse();
        return requiredApiKeyUnavailable();
      }),
    ]);
    return { handler, earlyResponse };
  } finally {
    clearTimeout(timer);
    signal.removeEventListener("abort", stop);
  }
}

export async function withRequiredApiKeyKeepalive(
  dispatch: () => Promise<Response>,
  options: EarlyStreamKeepaliveOptions & {
    signal: AbortSignal;
    deadlineController: AbortController;
    thresholdMs: number;
  }
): Promise<Response> {
  if (!usesNativeRequiredApiKeyTransport()) return withEarlyStreamKeepalive(dispatch(), options);

  const started = performance.now();
  const deadlineMs = options.slowPathDeadlineMs ?? SLOW_PATH_DEADLINE_MS;
  const { handler, earlyResponse } = await waitForRequiredApiKeyAuthorization(
    dispatch,
    options.signal,
    options.deadlineController,
    deadlineMs
  );
  if (earlyResponse) return earlyResponse;

  const elapsed = performance.now() - started;
  return withEarlyStreamKeepalive(handler, {
    ...options,
    thresholdMs: Math.max(0, options.thresholdMs - elapsed),
    slowPathDeadlineMs:
      Number.isFinite(deadlineMs) && deadlineMs > 0
        ? Math.max(1, deadlineMs - elapsed)
        : deadlineMs,
    abortOnCancel: true,
  });
}
