import { sanitizeQuotaWindowThresholds, sanitizeRateLimitOverrides } from "./columns";

type JsonRecord = Record<string, unknown>;

/**
 * Mirror the sanitization the create path applies to an update's merged record —
 * keep the returned object in lockstep with what we persist. Rejected keys abort
 * the write; the key is always carried forward (even as null) so the read path
 * surfaces the cleared state to callers that merged it.
 */
export function sanitizeMergedConnectionOverrides(merged: JsonRecord): void {
  if ("quotaWindowThresholds" in merged) {
    const result = sanitizeQuotaWindowThresholds(merged.quotaWindowThresholds);
    if (result.rejected.length > 0) {
      throw new Error(
        `Refusing to persist quotaWindowThresholds with rejected keys: ${result.rejected.join(", ")}`
      );
    }
    merged.quotaWindowThresholds = result.sanitized;
  }
  if ("rateLimitOverrides" in merged) {
    const result = sanitizeRateLimitOverrides(merged.rateLimitOverrides);
    if (result.rejected.length > 0) {
      throw new Error(
        `Refusing to persist rateLimitOverrides with rejected keys: ${result.rejected.join(", ")}`
      );
    }
    merged.rateLimitOverrides = result.sanitized;
  }
}
