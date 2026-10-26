/**
 * Batch status (raw + composite "with failures") → Badge adapter tone. Shared by the list and
 * the detail modal so both paint a status the same way (KEA-7886: kit Badge tones instead of
 * hand-picked palette classes).
 */
export type BatchStatusTone = "success" | "error" | "info" | "warning" | "primary" | "default";

export const BATCH_STATUS_TONES: Record<string, BatchStatusTone> = {
  completed: "success",
  completed_with_failures: "error",
  failed: "error",
  in_progress: "info",
  in_progress_with_failures: "warning",
  finalizing: "primary",
  finalizing_with_failures: "warning",
  validating: "warning",
  cancelling: "warning",
  cancelled: "default",
  cancelled_with_failures: "error",
  expired: "default",
  expired_with_failures: "warning",
};

export function batchStatusTone(status: string): BatchStatusTone {
  return BATCH_STATUS_TONES[status] ?? "default";
}
