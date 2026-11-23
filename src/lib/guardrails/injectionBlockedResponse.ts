import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { createLogger } from "@/shared/utils/logger";

const log = createLogger("injection-guard");

type BlockedDetection = { pattern?: unknown; severity?: unknown };

function safeId(value: unknown): string {
  return typeof value === "string" && /^[A-Za-z0-9_.-]{1,64}$/.test(value) ? value : "unknown";
}

/**
 * Attributable SECURITY_001 body + server-side log for a route-level prompt-injection block
 * (#20526). Only rule ids and severities are exposed — never the matched content.
 */
export function buildInjectionBlockedBody(detections: BlockedDetection[], model?: unknown) {
  const rules = detections.map((d) => ({
    pattern: safeId(d.pattern),
    severity: safeId(d.severity),
  }));
  const body = buildErrorBody(
    400,
    "Request blocked: potential prompt injection detected",
    undefined,
    { type: "injection_detected", code: "SECURITY_001" }
  );
  // buildErrorBody projects unknown identifiers to status defaults; keep the stable public contract.
  Object.assign(body.error, {
    type: "injection_detected",
    code: "SECURITY_001",
    detections: rules.length,
    rules,
  });
  try {
    log.warn(
      { rules, model: typeof model === "string" ? model.slice(0, 100) : undefined },
      "Request blocked by prompt injection guard"
    );
  } catch {
    /* logging must never break the rejection */
  }
  return body;
}
