/**
 * In-memory PII detection counters for the dashboard.
 *
 * Counts only — never the matched values. Reset on process restart. Only
 * incremented while masking is actually on (the opt-in flags), so an operator
 * who never enabled PII masking sees nothing here.
 */

export type PiiStatsSide = "request" | "response";

interface PiiDetectionLike {
  type?: string;
  pattern?: string;
  count: number;
}

const counters: Record<PiiStatsSide, Map<string, number>> = {
  request: new Map(),
  response: new Map(),
};
let since = new Date().toISOString();

export function recordPiiDetections(
  side: PiiStatsSide,
  detections: readonly PiiDetectionLike[] | null | undefined
): void {
  if (!detections || detections.length === 0) return;
  const bucket = counters[side];
  for (const detection of detections) {
    const type = detection.type ?? detection.pattern;
    if (!type || !Number.isFinite(detection.count) || detection.count <= 0) continue;
    bucket.set(type, (bucket.get(type) ?? 0) + detection.count);
  }
}

function toObject(map: Map<string, number>): Record<string, number> {
  return Object.fromEntries(Array.from(map.entries()).sort((a, b) => b[1] - a[1]));
}

export function getPiiDetectionStats() {
  const sum = (map: Map<string, number>) => Array.from(map.values()).reduce((a, b) => a + b, 0);
  return {
    since,
    total: sum(counters.request) + sum(counters.response),
    request: toObject(counters.request),
    response: toObject(counters.response),
  };
}

export function resetPiiDetectionStats(): void {
  counters.request.clear();
  counters.response.clear();
  since = new Date().toISOString();
}
