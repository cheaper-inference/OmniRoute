type CompletionDrainController = {
  clientDisconnectGracePeriodMs?: number;
  abort: () => void;
  handleComplete: () => void;
  handleError: (error: unknown) => void;
};

/** Keep pulling after client completion so upstream transforms can flush their finalizers. */
export function createCompletionDrain(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  writer: Pick<WritableStreamDefaultWriter<Uint8Array>, "abort">,
  controller: CompletionDrainController,
  getTimeoutReason: () => string
) {
  let started = false;
  return {
    isStarted: () => started,
    start() {
      if (started) return;
      started = true;
      const gracePeriodMs = Math.max(0, Number(controller.clientDisconnectGracePeriodMs) || 0);
      const timeoutReason = getTimeoutReason();
      const timeout = setTimeout(() => {
        controller.abort();
        void Promise.allSettled([reader.cancel(timeoutReason), writer.abort(timeoutReason)]);
      }, gracePeriodMs);

      void (async () => {
        try {
          while (true) {
            const { done } = await reader.read();
            if (done) break;
          }
          controller.handleComplete();
        } catch (error) {
          controller.handleError(error);
        } finally {
          clearTimeout(timeout);
        }
      })();
    },
  };
}
