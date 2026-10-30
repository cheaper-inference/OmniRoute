export function bufferPressure(
  queued: number,
  limit: { high: number; stall: number },
  highFor: number
): "read" | "pause" | "abort" {
  if (queued <= limit.high) return "read";
  if (highFor > limit.stall) return "abort";
  return "pause";
}

/**
 * With a high-water mark of zero the queue holds nothing by intent, so the
 * desired size is 0 while the consumer keeps up and negative once a chunk is
 * waiting. Reading `desiredSize <= 0` as "behind" would stall a fresh stream
 * forever, which is what happened when the mark moved to the strategy argument.
 */
export function backlogged(desiredSize: number | null): number {
  if (desiredSize === null) return 0;
  return desiredSize < 0 ? 1 : 0;
}
