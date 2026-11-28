import { acquire } from "../services/accountSemaphore.ts";
import type { ExecuteInput, ExecutorExecuteResult } from "./base.ts";

function holdSlotForBody(
  body: ReadableStream<Uint8Array>,
  release: () => void,
  signal?: AbortSignal | null
) {
  const reader = body.getReader();
  let closing = false;
  let cancellation: Promise<void> | undefined;
  let onAbort: (() => void) | undefined;
  function finish() {
    if (onAbort) signal?.removeEventListener("abort", onAbort);
    release();
  }
  function cancel(reason: unknown) {
    closing = true;
    return (cancellation ??= reader.cancel(reason).finally(finish));
  }
  return new ReadableStream<Uint8Array>({
    start(controller) {
      onAbort = () => {
        controller.error(signal?.reason);
        void cancel(signal?.reason).catch(() => {});
      };
      signal?.addEventListener("abort", onAbort, { once: true });
      if (signal?.aborted) onAbort();
    },
    async pull(controller) {
      try {
        const { done, value } = await reader.read();
        if (closing) return;
        if (done) {
          finish();
          controller.close();
        } else controller.enqueue(value);
      } catch (error) {
        if (closing) return;
        finish();
        controller.error(error);
      }
    },
    cancel,
  });
}

/**
 * Stream recovery and validation can call the executor directly. Guard the actual
 * upstream request for its whole body lifetime, including an in-progress cancellation.
 * The routing semaphore also coordinates global/provider/model limits and selection.
 */
export async function withKimiAccountSlot(
  input: ExecuteInput,
  send: () => Promise<ExecutorExecuteResult>
): Promise<ExecutorExecuteResult> {
  const { connectionId, maxConcurrent } = input.credentials;
  const dispatch = async () => {
    const queue = input.kimiQueue;
    if (queue && !(await queue.canDispatch())) {
      throw Object.assign(new Error("Kimi account is no longer available for this request"), {
        code: "KIMI_ACCOUNT_UNAVAILABLE",
        status: 409,
      });
    }
    input.signal?.throwIfAborted();
    if (queue && Date.now() >= queue.deadline)
      throw Object.assign(new Error("Kimi queue deadline expired"), { code: "SEMAPHORE_TIMEOUT" });
    queue?.onDispatch();
    return send();
  };
  if (!connectionId || !Number.isInteger(maxConcurrent) || !(Number(maxConcurrent) > 0))
    return dispatch();
  const release = await acquire("kimi-wire:" + connectionId, {
    maxConcurrency: maxConcurrent,
    timeoutMs: input.kimiQueue ? Math.max(1, input.kimiQueue.deadline - Date.now()) : 30_000,
    signal: input.signal,
    maxQueueSize: input.kimiQueue?.maxQueueSize || 20,
  });
  try {
    input.signal?.throwIfAborted();
    const result = await dispatch();
    const response = result instanceof Response ? result : result.response;
    if (!response.body) {
      release();
      return result;
    }
    const held = new Response(holdSlotForBody(response.body, release, input.signal), response);
    return result instanceof Response ? held : { ...result, response: held };
  } catch (error) {
    release();
    throw error;
  }
}
