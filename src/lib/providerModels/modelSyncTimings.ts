import { randomUUID } from "node:crypto";

type SyncPhase =
  | "discovery"
  | "discovery-body"
  | "managed-import"
  | "stale-combo"
  | "stale-combo-prune"
  | "call-log";

/** Opt-in diagnostics: never accept request, account, catalog or error payloads. */
export function createModelSyncTimings() {
  const enabled = process.env.OMNIROUTE_MODEL_SYNC_TIMINGS === "1";
  const requestId = enabled ? randomUUID() : "";
  const requestStart = performance.now();

  function emit(
    phase: SyncPhase | "request",
    event: "start" | "end",
    started?: number,
    outcome?: "ok" | "error"
  ) {
    if (!enabled) return;
    const now = performance.now();
    try {
      console.info(
        "[ModelSyncTiming]",
        JSON.stringify({
          requestId,
          phase,
          event,
          elapsedMs: Math.round((now - requestStart) * 1000) / 1000,
          ...(started === undefined
            ? {}
            : { durationMs: Math.round((now - started) * 1000) / 1000 }),
          ...(outcome ? { outcome } : {}),
        })
      );
    } catch {
      // A diagnostic sink must not change the sync result or replace its error.
    }
  }

  emit("request", "start");
  return {
    async measure<T>(phase: SyncPhase, operation: () => T | Promise<T>): Promise<T> {
      if (!enabled) return operation();
      const started = performance.now();
      emit(phase, "start");
      let outcome: "ok" | "error" = "ok";
      try {
        return await operation();
      } catch (error) {
        outcome = "error";
        throw error;
      } finally {
        emit(phase, "end", started, outcome);
      }
    },
    finish() {
      // Request completion is independent of HTTP success; phase errors stay explicit.
      emit("request", "end", requestStart);
    },
  };
}
